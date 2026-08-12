#!/usr/bin/env python3
"""Exporta cada slide do carrossel como PNG 1080x1080 pronto pro Instagram.

O carrossel é desenhado a 420px de largura (1:1 = 420x420). O export NÃO mexe
no viewport: usa `device_scale_factor` pra renderizar em alta densidade e sair
em 1080x1080. Mudar o viewport pra 1080 refluiria o layout e quebraria tudo.

Formato 1:1 a pedido do cliente: é o que menos corre risco de corte, porque
serve tanto o feed quanto qualquer reaproveitamento em outro formato.
"""

import asyncio
import os
from pathlib import Path

from playwright.async_api import async_playwright

HERE = Path(__file__).parent
INPUT_HTML = HERE / "carrossel.html"
OUTPUT_DIR = HERE / "slides"

VIEW_W = 420
VIEW_H = 420
SCALE = 1080 / 420  # 2.5714... -> 1080x1080

# Fontes usadas nos slides; conferidas antes de exportar.
REQUIRED_FONTS = [
    "300 26px Fahkwang",
    "500 30px Fahkwang",
    "600 18px Fahkwang",
    "400 14px Inter",
    "600 10px Inter",
]


async def export_slides() -> None:
    OUTPUT_DIR.mkdir(exist_ok=True)
    html = INPUT_HTML.read_text(encoding="utf-8")

    # Alguns ambientes (Claude Code na web) já trazem o Chromium pronto num
    # build diferente do que o pacote playwright espera. Se existir, usa ele em
    # vez de tentar baixar outro.
    launch_kwargs = {}
    for candidate in [
        os.environ.get("CHROMIUM_PATH"),
        "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
    ]:
        if candidate and Path(candidate).exists():
            launch_kwargs["executable_path"] = candidate
            break

    async with async_playwright() as p:
        browser = await p.chromium.launch(**launch_kwargs)
        page = await browser.new_page(
            viewport={"width": VIEW_W, "height": VIEW_H},
            device_scale_factor=SCALE,
        )
        await page.set_content(html, wait_until="load")
        await page.evaluate("document.fonts.ready")

        # As fontes estão embutidas em base64, mas se alguém trocar por <link>
        # e a rede falhar o export sairia com fonte fallback. Falha alto.
        missing = await page.evaluate(
            "fonts => fonts.filter(f => !document.fonts.check(f))", REQUIRED_FONTS
        )
        if missing:
            raise SystemExit(f"ERRO: fontes não carregaram: {missing}")

        total = await page.evaluate("document.querySelectorAll('.slide').length")
        print(f"Fontes OK. {total} slides encontrados.")

        # Esconde o frame do Instagram: o slide é a imagem inteira.
        await page.evaluate("""([w, h]) => {
            document.querySelectorAll('.ig-header,.ig-dots,.ig-actions,.ig-caption')
                .forEach(el => el.style.display = 'none');

            const frame = document.querySelector('.ig-frame');
            frame.style.cssText = `width:${w}px;height:${h}px;max-width:none;` +
                'border-radius:0;box-shadow:none;overflow:hidden;margin:0;';

            const viewport = document.querySelector('.carousel-viewport');
            viewport.style.cssText = `width:${w}px;height:${h}px;aspect-ratio:unset;` +
                'overflow:hidden;cursor:default;';

            document.body.style.cssText =
                'padding:0;margin:0;display:block;overflow:hidden;background:#fff;';
        }""", [VIEW_W, VIEW_H])
        await page.wait_for_timeout(300)

        # O conteúdo tem que caber na altura do slide. Sem isso um slide denso
        # sai com o texto cortado silenciosamente, e só dá pra perceber olhando.
        #
        # Dois cuidados aqui, os dois já custaram um export com texto cortado:
        #
        # 1. Não dá pra usar scrollHeight: com `justify-content:center` o
        #    conteúdo transborda para CIMA e para BAIXO, e scrollHeight só
        #    enxerga o excesso de baixo.
        # 2. Não dá pra medir contra o .slide-inner: ele é um flex item com
        #    `flex:1`, e a regra de min-height:auto deixa ele crescer junto com
        #    o conteúdo. Quem recorta é o .slide (overflow:hidden). Então a
        #    referência tem que ser a caixa do .slide.
        overflow = await page.evaluate("""() => {
            const out = [];
            document.querySelectorAll('.slide').forEach((slide, i) => {
                const inner = slide.querySelector('.slide-inner');
                const kids = inner ? [...inner.children] : [];
                if (!kids.length) return;
                const cs = getComputedStyle(inner);
                const box = slide.getBoundingClientRect();
                const limiteTopo = box.top + parseFloat(cs.paddingTop);
                const limiteBase = box.bottom - parseFloat(cs.paddingBottom);
                const topo = kids[0].getBoundingClientRect().top;
                const base = kids[kids.length - 1].getBoundingClientRect().bottom;
                const excesso = Math.round(
                    Math.max(0, limiteTopo - topo) + Math.max(0, base - limiteBase)
                );
                if (excesso > 1) out.push({ slide: i + 1, excesso });
            });
            return out;
        }""")
        if overflow:
            for o in overflow:
                print(f"  AVISO: slide {o['slide']} estoura {o['excesso']}px")
            raise SystemExit(
                "ERRO: conteudo nao cabe. Encurte a copy ou ajuste o espacamento."
            )

        for i in range(total):
            await page.evaluate("""(idx) => {
                const track = document.querySelector('.carousel-track');
                track.style.transition = 'none';
                track.style.transform = 'translateX(' + (-idx * 420) + 'px)';
            }""", i)
            await page.wait_for_timeout(250)

            out = OUTPUT_DIR / f"slide_{i + 1}.png"
            await page.screenshot(
                path=str(out),
                clip={"x": 0, "y": 0, "width": VIEW_W, "height": VIEW_H},
            )
            print(f"  slide {i + 1}/{total} -> {out.name}")

        await browser.close()

    print(f"\nOK. {total} PNGs em {OUTPUT_DIR}")


if __name__ == "__main__":
    asyncio.run(export_slides())
