#!/usr/bin/env python3
"""
Exporta cada slide do carrossel como PNG 1080x1350, pronto para o Instagram.

    python3 exportar-slides.py \
        --html  clientes/<cliente>/copy/carrosseis/<pasta>/carrossel.html \
        --saida clientes/<cliente>/copy/carrosseis/<pasta>/slides

O carrossel e desenhado a 420px de largura. A exportacao NAO mexe no layout:
ela usa o device_scale_factor do Chromium para renderizar em alta densidade,
420 * 2.5714 = 1080. Trocar o viewport para 1080 refluiria o layout inteiro e
deixaria as fontes minusculas. Ver references/exportacao-png.md.

Requer: pip install playwright  (o Chromium ja vem instalado no ambiente)
"""

import argparse
import asyncio
import sys
from pathlib import Path

from playwright.async_api import async_playwright

# Base do layout. NAO MUDE: e a largura da .ig-frame no HTML.
VIEW_W = 420
VIEW_H = 525
SAIDA_W = 1080
SCALE = SAIDA_W / VIEW_W  # 2.5714...

# Esconde a moldura do Instagram e fixa o palco no tamanho exato do slide.
PREPARAR_PALCO = """() => {
  document.querySelectorAll('.ig-header,.ig-dots,.ig-actions,.ig-caption')
    .forEach(el => el.style.display = 'none');

  const frame = document.querySelector('.ig-frame');
  frame.style.cssText =
    'width:420px;height:525px;max-width:none;border-radius:0;box-shadow:none;overflow:hidden;margin:0;';

  const viewport = document.querySelector('.carousel-viewport');
  viewport.style.cssText =
    'width:420px;height:525px;aspect-ratio:unset;overflow:hidden;cursor:default;';

  document.body.style.cssText = 'padding:0;margin:0;display:block;overflow:hidden;';
}"""

IR_PARA_SLIDE = """(idx) => {
  const track = document.querySelector('.carousel-track');
  track.style.transition = 'none';
  track.style.transform = 'translateX(' + (-idx * 420) + 'px)';
}"""


def achar_chromium() -> str | None:
    """
    O pip do playwright costuma pedir uma versao de Chromium diferente da que
    ja esta instalada no ambiente. Em vez de baixar de novo (nao roda 'playwright
    install' aqui), apontamos para o binario que existe em disco.
    """
    raiz = Path("/opt/pw-browsers")
    if not raiz.is_dir():
        return None
    candidatos = sorted(raiz.glob("chromium-*/chrome-linux/chrome")) + \
        sorted(raiz.glob("chromium_headless_shell-*/chrome-linux/headless_shell"))
    for c in candidatos:
        if c.is_file():
            return str(c)
    return None


async def exportar(html: Path, saida: Path, total: int | None) -> int:
    saida.mkdir(parents=True, exist_ok=True)

    async with async_playwright() as p:
        try:
            browser = await p.chromium.launch()
        except Exception:
            exe = achar_chromium()
            if not exe:
                raise
            print(f"Usando o Chromium do ambiente: {exe}")
            browser = await p.chromium.launch(executable_path=exe)
        page = await browser.new_page(
            viewport={"width": VIEW_W, "height": VIEW_H},
            device_scale_factor=SCALE,
        )

        # file:// em vez de set_content: assim caminhos relativos do HTML
        # continuam resolvendo se o carrossel referenciar algo local.
        await page.goto(html.resolve().as_uri(), wait_until="networkidle")

        # As fontes do Google precisam terminar de carregar antes do screenshot,
        # senao os titulos saem em fonte de sistema.
        try:
            await page.evaluate("() => document.fonts.ready")
        except Exception:
            pass
        await page.wait_for_timeout(3000)

        if total is None:
            total = await page.evaluate("() => document.querySelectorAll('.slide').length")
            if not total:
                print("Nenhum .slide encontrado no HTML.", file=sys.stderr)
                await browser.close()
                return 1
            print(f"Detectados {total} slides.")

        await page.evaluate(PREPARAR_PALCO)
        await page.wait_for_timeout(500)

        for i in range(total):
            await page.evaluate(IR_PARA_SLIDE, i)
            await page.wait_for_timeout(400)
            destino = saida / f"slide_{i + 1}.png"
            await page.screenshot(
                path=str(destino),
                clip={"x": 0, "y": 0, "width": VIEW_W, "height": VIEW_H},
            )
            print(f"slide {i + 1}/{total} -> {destino}")

        await browser.close()

    print(f"\nPronto: {total} PNGs de {SAIDA_W}x{int(VIEW_H * SCALE)} em {saida}")
    return 0


def main() -> int:
    ap = argparse.ArgumentParser(description="Exporta os slides do carrossel em PNG 1080x1350.")
    ap.add_argument("--html", required=True, type=Path, help="caminho do carrossel.html")
    ap.add_argument("--saida", required=True, type=Path, help="pasta onde salvar os PNGs")
    ap.add_argument("--slides", type=int, default=None,
                    help="numero de slides (o padrao e detectar pelo HTML)")
    args = ap.parse_args()

    if not args.html.is_file():
        print(f"Arquivo nao encontrado: {args.html}", file=sys.stderr)
        return 1

    return asyncio.run(exportar(args.html, args.saida, args.slides))


if __name__ == "__main__":
    raise SystemExit(main())
