#!/usr/bin/env python3
"""Recorta o fundo de pergaminho das gravuras da image-bible.

As tres pecas vieram como PNG com fundo de pergaminho vinhetado. Fundo vinhetado
nao casa com fundo chapado nenhum: por cima do #EDE8DC da pagina aparece um
retangulo fantasma, e mix-blend-mode nao resolve porque a vinheta varia.

A solucao e alfa por diferenca de luminancia contra uma estimativa LOCAL de
papel (um blur gaussiano largo do proprio cinza). Como a tinta e esparsa, o blur
fica proximo do papel e acompanha a vinheta, entao a diferenca isola so o traco.
Preserva hachura fina e preserva o carmim das jesses.

Uso:
    pip install pillow numpy
    python3 recorte-gravuras.py <pasta-com-os-png> <pasta-de-saida>
"""

import os
import sys

import numpy as np
from PIL import Image, ImageChops, ImageFilter

PERGAMINHO = (0xED, 0xE8, 0xDC)
CARMIM_CLARO = (0xD9, 0x40, 0x40)   # sobre fundo de tinta o carmim some; sobe um pouco

PECAS = [
    # (arquivo de origem, nome de saida, largura final)
    ("falcao-encapuzado-punho", "falcao-punho", 400),
    ("capuz-selo", "capuz-selo", 200),
    ("mergulho-stoop", "mergulho-stoop", 260),
]


def recorta(caminho, largura):
    im = Image.open(caminho).convert("RGB")
    altura = int(largura * im.size[1] / im.size[0])
    im = im.resize((largura, altura), Image.LANCZOS)

    cinza = im.convert("L")
    papel = cinza.filter(ImageFilter.GaussianBlur(radius=max(10, largura // 14)))
    tinta = ImageChops.subtract(papel, cinza)

    alfa = np.clip(np.asarray(tinta).astype(np.float32) / 105.0, 0, 1)
    alfa[alfa < 0.09] = 0                      # corta o residuo da vinheta

    margem = max(2, int(largura * 0.022))      # anel de borda zerado, senao a
    alfa[:margem, :] = 0                       # vinheta vira fantasma retangular
    alfa[-margem:, :] = 0
    alfa[:, :margem] = 0
    alfa[:, -margem:] = 0

    return np.asarray(im).astype(np.float32), (alfa * 255).astype(np.uint8)


def salva(destino, rgb, alfa, para_fundo_escuro=False):
    if para_fundo_escuro:
        r, g, b = rgb[..., 0], rgb[..., 1], rgb[..., 2]
        vermelho = (r > g + 26) & (r > b + 26)
        saida = np.zeros_like(rgb)
        for i in range(3):
            saida[..., i] = np.where(vermelho, CARMIM_CLARO[i], PERGAMINHO[i])
        rgb = saida

    arr = np.dstack([rgb.astype(np.uint8), alfa])
    Image.fromarray(arr, "RGBA").save(destino, "WEBP", quality=86, method=6)
    print(destino, os.path.getsize(destino), "bytes")


def main():
    if len(sys.argv) != 3:
        print(__doc__)
        return 1
    origem, saida = sys.argv[1], sys.argv[2]
    os.makedirs(saida, exist_ok=True)

    for arquivo, nome, largura in PECAS:
        rgb, alfa = recorta(os.path.join(origem, arquivo + ".png"), largura)
        salva(os.path.join(saida, nome + ".webp"), rgb, alfa)
        if nome == "mergulho-stoop":
            salva(os.path.join(saida, nome + "-claro.webp"), rgb, alfa, True)
    return 0


if __name__ == "__main__":
    sys.exit(main())
