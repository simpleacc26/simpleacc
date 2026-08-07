#!/usr/bin/env python3
"""
Exporta cada slide do carrossel como PNG pronto para o Instagram.

Uso:
    python3 exportar-slides.py carrossel.html slides/
    python3 exportar-slides.py carrossel-story.html slides-story/ --formato story
    python3 exportar-slides.py carrossel.html slides/ --largura 405 --altura 720

Formatos prontos:
    feed   420 x 525  ->  1080 x 1350  (4:5, padrão de carrossel)
    story  405 x 720  ->  1080 x 1920  (9:16, Story e Reels)

Como funciona (e por que não pode ser diferente):
  O carrossel é desenhado numa largura pequena (420 ou 405). A exportação NÃO
  muda a viewport para 1080px, isso reflui o layout e destrói fontes e
  espaçamentos. Em vez disso usamos o device_scale_factor do Playwright: o
  navegador renderiza em alta densidade e a largura de base vira 1080px na
  imagem final, com o layout idêntico ao do preview.

Requisitos:
    pip install playwright
    (o Chromium já vem instalado no ambiente remoto da Simple)
"""

import argparse
import asyncio
import os
import sys
from pathlib import Path

from playwright.async_api import async_playwright

LARGURA_SAIDA = 1080

FORMATOS = {
    "feed":  (420, 525),   # 4:5   -> 1080x1350
    "story": (405, 720),   # 9:16  -> 1080x1920
}

ESPERA_FONTES_MS = 3000

# Elementos do frame do Instagram que não entram na imagem.
CHROME_IG = ".ig-header,.ig-dots,.ig-actions,.ig-caption"

PREPARAR_PAGINA = """([sel, w, h]) => {
  document.querySelectorAll(sel).forEach(el => el.style.display = 'none');

  const frame = document.querySelector('.ig-frame');
  if (frame) frame.style.cssText =
    `width:${w}px;height:${h}px;max-width:none;border-radius:0;box-shadow:none;overflow:hidden;margin:0;`;

  const viewport = document.querySelector('.carousel-viewport');
  viewport.style.cssText =
    `width:${w}px;height:${h}px;aspect-ratio:unset;overflow:hidden;cursor:default;`;

  document.body.style.cssText = 'padding:0;margin:0;display:block;overflow:hidden;';
}"""

IR_PARA_SLIDE = """([idx, w]) => {
  const track = document.querySelector('.carousel-track');
  track.style.transition = 'none';
  track.style.transform = 'translateX(' + (-idx * w) + 'px)';
}"""

# No ambiente remoto da Simple o Chromium já vem instalado, mas às vezes numa
# versão diferente da que o pacote playwright espera. Quando o launch padrão
# falha, caímos no binário que existe na máquina em vez de baixar outro.
CHROMIUM_LOCAL = Path(os.environ.get("CHROMIUM_PATH", "/opt/pw-browsers/chromium"))


async def _lancar_navegador(p):
    try:
        return await p.chromium.launch()
    except Exception as erro:
        if not CHROMIUM_LOCAL.exists():
            raise
        print(f"Launch padrão falhou ({type(erro).__name__}); usando {CHROMIUM_LOCAL}")
        return await p.chromium.launch(
            executable_path=str(CHROMIUM_LOCAL), args=["--no-sandbox"]
        )


async def exportar(entrada: Path, saida: Path, largura: int, altura: int, total_forcado):
    saida.mkdir(parents=True, exist_ok=True)
    escala = LARGURA_SAIDA / largura

    async with async_playwright() as p:
        navegador = await _lancar_navegador(p)
        pagina = await navegador.new_page(
            viewport={"width": largura, "height": altura},
            device_scale_factor=escala,
        )

        await pagina.goto(entrada.resolve().as_uri(), wait_until="networkidle")
        await pagina.wait_for_timeout(ESPERA_FONTES_MS)

        total = total_forcado or await pagina.evaluate(
            "() => document.querySelectorAll('.carousel-track .slide').length"
        )
        if not total:
            print("ERRO: nenhum slide encontrado (.carousel-track .slide).", file=sys.stderr)
            await navegador.close()
            return 1

        await pagina.evaluate(PREPARAR_PAGINA, [CHROME_IG, largura, altura])
        await pagina.wait_for_timeout(500)

        for i in range(total):
            await pagina.evaluate(IR_PARA_SLIDE, [i, largura])
            await pagina.wait_for_timeout(400)
            await pagina.screenshot(
                path=str(saida / f"slide_{i + 1}.png"),
                clip={"x": 0, "y": 0, "width": largura, "height": altura},
            )
            print(f"Slide {i + 1}/{total} exportado")

        await navegador.close()

    print(f"\nPronto: {total} PNGs em {saida} ({LARGURA_SAIDA}x{round(altura * escala)})")
    return 0


def main() -> int:
    ap = argparse.ArgumentParser(description="Exporta os slides do carrossel em PNG.")
    ap.add_argument("html", type=Path, help="arquivo HTML do carrossel")
    ap.add_argument("saida", type=Path, nargs="?", default=Path("slides"), help="pasta de saída")
    ap.add_argument("--formato", choices=sorted(FORMATOS), default="feed",
                    help="feed (1080x1350) ou story (1080x1920)")
    ap.add_argument("--largura", type=int, default=None, help="largura de base, sobrepõe o formato")
    ap.add_argument("--altura", type=int, default=None, help="altura de base, sobrepõe o formato")
    ap.add_argument("--slides", type=int, default=None, help="força a quantidade de slides")
    args = ap.parse_args()

    if not args.html.is_file():
        print(f"ERRO: arquivo não encontrado: {args.html}", file=sys.stderr)
        return 1

    largura_padrao, altura_padrao = FORMATOS[args.formato]
    largura = args.largura or largura_padrao
    altura = args.altura or altura_padrao

    return asyncio.run(exportar(args.html, args.saida, largura, altura, args.slides))


if __name__ == "__main__":
    raise SystemExit(main())
