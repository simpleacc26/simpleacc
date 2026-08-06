#!/usr/bin/env python3
"""
Exporta cada slide do carrossel como PNG 1080x1350 pronto para o Instagram.

Uso:
    python3 exportar-slides.py carrossel.html slides/
    python3 exportar-slides.py carrossel.html slides/ --slides 9   # força a contagem

Como funciona (e por que não pode ser diferente):
  O carrossel é desenhado com 420px de largura. A exportação NÃO muda a
  viewport para 1080px — isso reflui o layout e destrói fontes e espaçamentos.
  Em vez disso usamos o device_scale_factor do Playwright: o navegador
  renderiza em alta densidade e 420px viram 1080px na imagem final, com o
  layout idêntico ao do preview.

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

# O carrossel é desenhado em 420px, proporção 4:5 → 525px de altura.
# Saída desejada: 1080x1350. Fator: 1080 / 420 = 2.5714...
LARGURA_VIEW = 420
ALTURA_VIEW = 525
ESCALA = 1080 / 420

# Espera para as fontes do Google carregarem antes do primeiro screenshot.
ESPERA_FONTES_MS = 3000

# Elementos do frame do Instagram que não entram na imagem.
CHROME_IG = ".ig-header,.ig-dots,.ig-actions,.ig-caption"

PREPARAR_PAGINA = """() => {
  document.querySelectorAll('%s').forEach(el => el.style.display = 'none');

  const frame = document.querySelector('.ig-frame');
  frame.style.cssText = 'width:420px;height:525px;max-width:none;border-radius:0;box-shadow:none;overflow:hidden;margin:0;';

  const viewport = document.querySelector('.carousel-viewport');
  viewport.style.cssText = 'width:420px;height:525px;aspect-ratio:unset;overflow:hidden;cursor:default;';

  document.body.style.cssText = 'padding:0;margin:0;display:block;overflow:hidden;';
}""" % CHROME_IG

IR_PARA_SLIDE = """(idx) => {
  const track = document.querySelector('.carousel-track');
  track.style.transition = 'none';
  track.style.transform = 'translateX(' + (-idx * 420) + 'px)';
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


async def exportar(entrada: Path, saida: Path, total_forcado: int | None) -> int:
    saida.mkdir(parents=True, exist_ok=True)

    async with async_playwright() as p:
        navegador = await _lancar_navegador(p)
        pagina = await navegador.new_page(
            viewport={"width": LARGURA_VIEW, "height": ALTURA_VIEW},
            device_scale_factor=ESCALA,
        )

        # Abrimos o arquivo direto (file://) em vez de injetar o HTML como
        # string: assim caminhos relativos continuam funcionando se o carrossel
        # ainda tiver alguma imagem solta na pasta.
        await pagina.goto(entrada.resolve().as_uri(), wait_until="networkidle")
        await pagina.wait_for_timeout(ESPERA_FONTES_MS)

        total = total_forcado or await pagina.evaluate(
            "() => document.querySelectorAll('.carousel-track .slide').length"
        )
        if not total:
            print("ERRO: nenhum slide encontrado (.carousel-track .slide).", file=sys.stderr)
            await navegador.close()
            return 1

        await pagina.evaluate(PREPARAR_PAGINA)
        await pagina.wait_for_timeout(500)

        for i in range(total):
            await pagina.evaluate(IR_PARA_SLIDE, i)
            await pagina.wait_for_timeout(400)
            await pagina.screenshot(
                path=str(saida / f"slide_{i + 1}.png"),
                clip={"x": 0, "y": 0, "width": LARGURA_VIEW, "height": ALTURA_VIEW},
            )
            print(f"Slide {i + 1}/{total} exportado")

        await navegador.close()

    print(f"\nPronto: {total} PNGs em {saida}")
    return 0


def main() -> int:
    ap = argparse.ArgumentParser(description="Exporta os slides do carrossel em PNG 1080x1350.")
    ap.add_argument("html", type=Path, help="arquivo HTML do carrossel")
    ap.add_argument("saida", type=Path, nargs="?", default=Path("slides"), help="pasta de saída")
    ap.add_argument("--slides", type=int, default=None, help="força a quantidade de slides")
    args = ap.parse_args()

    if not args.html.is_file():
        print(f"ERRO: arquivo não encontrado: {args.html}", file=sys.stderr)
        return 1

    return asyncio.run(exportar(args.html, args.saida, args.slides))


if __name__ == "__main__":
    raise SystemExit(main())
