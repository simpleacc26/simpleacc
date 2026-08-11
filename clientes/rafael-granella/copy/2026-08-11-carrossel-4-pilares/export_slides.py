#!/usr/bin/env python3
"""Exporta cada slide do carrossel como PNG 1080x1350 pronto pro Instagram.

O carrossel é desenhado a 420px de largura (4:5 = 420x525). O export NÃO mexe
no viewport: usa `device_scale_factor` pra renderizar em alta densidade e sair
em 1080x1350. Mudar o viewport pra 1080 refluiria o layout e quebraria tudo.
"""

import asyncio
import os
from pathlib import Path

from playwright.async_api import async_playwright

HERE = Path(__file__).parent
INPUT_HTML = HERE / "carrossel.html"
OUTPUT_DIR = HERE / "slides"

VIEW_W = 420
VIEW_H = 525
SCALE = 1080 / 420  # 2.5714... -> 1080x1350

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
        await page.evaluate("""() => {
            document.querySelectorAll('.ig-header,.ig-dots,.ig-actions,.ig-caption')
                .forEach(el => el.style.display = 'none');

            const frame = document.querySelector('.ig-frame');
            frame.style.cssText = 'width:420px;height:525px;max-width:none;' +
                'border-radius:0;box-shadow:none;overflow:hidden;margin:0;';

            const viewport = document.querySelector('.carousel-viewport');
            viewport.style.cssText = 'width:420px;height:525px;aspect-ratio:unset;' +
                'overflow:hidden;cursor:default;';

            document.body.style.cssText =
                'padding:0;margin:0;display:block;overflow:hidden;background:#fff;';
        }""")
        await page.wait_for_timeout(300)

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

    print(f"\nOK — {total} PNGs em {OUTPUT_DIR}")


if __name__ == "__main__":
    asyncio.run(export_slides())
