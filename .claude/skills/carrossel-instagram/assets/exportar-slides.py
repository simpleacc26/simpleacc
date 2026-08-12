#!/usr/bin/env python3
"""
Exporta cada slide do carrossel como PNG 1080x1350 (4:5), pronto pro Instagram.

Uso:
    python3 exportar-slides.py carrossel.html
    python3 exportar-slides.py carrossel.html -o slides/ --prefix slide

O layout é desenhado a 420px de largura. O export NÃO mexe nisso: quem sobe pra
1080px é o device_scale_factor (1080 / 420 = 2.5714...). Mudar o viewport pra
1080 refluiria o layout e quebraria tudo (fonte minúscula, espaçamento errado).

Requer: pip install playwright   (o Chromium do ambiente já serve)
"""

import argparse
import asyncio
import sys
from pathlib import Path

from playwright.async_api import async_playwright

# 420 x 525 = 4:5. Saída 1080 x 1350.
VIEW_W = 420
VIEW_H = 525
SCALE = 1080 / VIEW_W

# Esconde a moldura do Instagram: só o slide vira imagem.
PREPARE_PAGE = """() => {
  document.querySelectorAll('.ig-header,.ig-dots,.ig-actions,.ig-caption')
    .forEach(el => el.style.display = 'none');

  const frame = document.querySelector('.ig-frame');
  if (frame) frame.style.cssText =
    'width:420px;height:525px;max-width:none;border-radius:0;box-shadow:none;overflow:hidden;margin:0;';

  const viewport = document.querySelector('.carousel-viewport');
  if (viewport) viewport.style.cssText =
    'width:420px;height:525px;aspect-ratio:unset;overflow:hidden;cursor:default;';

  document.body.style.cssText = 'padding:0;margin:0;display:block;overflow:hidden;';
}"""

GOTO_SLIDE = """(idx) => {
  const track = document.querySelector('.carousel-track');
  track.style.transition = 'none';
  track.style.transform = 'translateX(' + (-idx * 420) + 'px)';
}"""


async def launch_chromium(p, executable: str | None):
    """Sobe o Chromium. Se o bundle do playwright não bater com a versão
    instalada (comum no Claude Code na web), cai no Chromium do ambiente."""
    if executable:
        return await p.chromium.launch(executable_path=executable)
    try:
        return await p.chromium.launch()
    except Exception as erro:
        for candidato in ("/opt/pw-browsers/chromium", "/usr/bin/chromium",
                          "/usr/bin/chromium-browser", "/usr/bin/google-chrome"):
            if Path(candidato).exists():
                print(f"(usando o Chromium do ambiente: {candidato})")
                return await p.chromium.launch(executable_path=candidato)
        raise erro


async def export_slides(html_path: Path, out_dir: Path, total: int | None,
                        prefix: str, font_wait: int, executable: str | None) -> int:
    out_dir.mkdir(parents=True, exist_ok=True)

    async with async_playwright() as p:
        browser = await launch_chromium(p, executable)
        page = await browser.new_page(
            viewport={"width": VIEW_W, "height": VIEW_H},
            device_scale_factor=SCALE,
        )

        # file:// em vez de set_content: mesmo resultado e ainda funciona se
        # algum asset local não estiver embutido. A regra de embutir imagem em
        # base64 continua valendo — o HTML entregue precisa ser autocontido.
        await page.goto(html_path.resolve().as_uri(), wait_until="networkidle")
        await page.wait_for_timeout(font_wait)  # deixa as Google Fonts carregarem

        if total is None:
            total = await page.evaluate("() => document.querySelectorAll('.slide').length")
        if not total:
            print("Nenhum slide encontrado (.slide). Confira o HTML.", file=sys.stderr)
            await browser.close()
            return 1

        await page.evaluate(PREPARE_PAGE)
        await page.wait_for_timeout(500)

        for i in range(total):
            await page.evaluate(GOTO_SLIDE, i)
            await page.wait_for_timeout(400)
            destino = out_dir / f"{prefix}_{i + 1}.png"
            await page.screenshot(
                path=str(destino),
                clip={"x": 0, "y": 0, "width": VIEW_W, "height": VIEW_H},
            )
            print(f"slide {i + 1}/{total} → {destino}")

        await browser.close()

    print(f"\nOK: {total} slides em {out_dir} (1080x1350).")
    return 0


def main() -> int:
    ap = argparse.ArgumentParser(description="Exporta os slides do carrossel em PNG 1080x1350.")
    ap.add_argument("html", type=Path, help="arquivo HTML do carrossel")
    ap.add_argument("-o", "--out", type=Path, default=None,
                    help="pasta de saída (padrão: ./slides ao lado do HTML)")
    ap.add_argument("-n", "--slides", type=int, default=None,
                    help="quantidade de slides (padrão: conta os .slide da página)")
    ap.add_argument("--prefix", default="slide", help="prefixo dos arquivos (padrão: slide)")
    ap.add_argument("--font-wait", type=int, default=3000,
                    help="ms de espera pelas fontes antes do print (padrão: 3000)")
    ap.add_argument("--chromium", default=None,
                    help="caminho do Chromium (padrão: o do playwright, com fallback pro do ambiente)")
    args = ap.parse_args()

    if not args.html.is_file():
        print(f"HTML não encontrado: {args.html}", file=sys.stderr)
        return 1

    out_dir = args.out or args.html.parent / "slides"
    return asyncio.run(
        export_slides(args.html, out_dir, args.slides, args.prefix,
                      args.font_wait, args.chromium)
    )


if __name__ == "__main__":
    raise SystemExit(main())
