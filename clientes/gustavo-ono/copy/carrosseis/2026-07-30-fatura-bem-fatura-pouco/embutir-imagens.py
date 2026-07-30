#!/usr/bin/env python3
"""
Gera carrossel.html a partir de carrossel.template.html, embutindo as imagens
de assets/ em base64.

    carrossel.template.html   <- este e o arquivo que voce edita
            +  assets/*.jpg|png
            =  carrossel.html  <- gerado, autocontido, nao edite na mao

Embutir em base64 deixa o HTML autossuficiente: abre no navegador de qualquer
pessoa e renderiza no headless do Playwright na hora de exportar os PNGs.

Rode a partir da pasta do carrossel:

    python3 embutir-imagens.py
"""

import base64
import mimetypes
import sys
from pathlib import Path

AQUI = Path(__file__).parent
TEMPLATE = AQUI / "carrossel.template.html"
SAIDA = AQUI / "carrossel.html"

IMAGENS = {
    "__IMG_PRODUTO__": AQUI / "assets" / "produto-bombons.jpg",
    "__IMG_TEXTURA__": AQUI / "assets" / "textura-chocolate.jpg",
    "__IMG_GUSTAVO__": AQUI / "assets" / "gustavo-retrato.png",
}


def data_uri(caminho: Path) -> str:
    mime, _ = mimetypes.guess_type(caminho.name)
    if not mime:
        raise SystemExit(f"Nao descobri o MIME de {caminho.name}")
    dados = base64.b64encode(caminho.read_bytes()).decode("ascii")
    return f"data:{mime};base64,{dados}"


def main() -> int:
    if not TEMPLATE.is_file():
        print(f"Nao achei {TEMPLATE.name}", file=sys.stderr)
        return 1

    html = TEMPLATE.read_text(encoding="utf-8")

    for marcador, imagem in IMAGENS.items():
        if marcador not in html:
            print(f"aviso: {marcador} nao aparece no template")
            continue
        if not imagem.is_file():
            print(f"Nao achei {imagem}", file=sys.stderr)
            return 1
        n = html.count(marcador)
        html = html.replace(marcador, data_uri(imagem))
        print(f"{marcador} -> {imagem.name} ({imagem.stat().st_size // 1024} KB, {n}x)")

    SAIDA.write_text(html, encoding="utf-8")
    print(f"\nPronto: {SAIDA.name} ({SAIDA.stat().st_size // 1024} KB)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
