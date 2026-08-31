#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Baixa Montserrat e Playfair Display do Google Fonts e grava um CSS com as
fontes embutidas em base64 (assets/fonts/fontes-embutidas.css).

Por que embutir: o export roda em navegador headless e fonte que depende de
rede chega tarde ou não chega, e o slide sai com fonte de sistema. Embutida,
o HTML é autocontido e o PNG sai sempre igual.

Só o subset "latin" entra, que já cobre os acentos do português. As duas
famílias são variable fonts, então um arquivo por família cobre 300 a 700.

Rode só quando quiser atualizar as fontes. O CSS gerado fica versionado.
"""
import base64
import hashlib
import re
import urllib.request
from pathlib import Path

DESTINO = Path(__file__).resolve().parent / "assets" / "fonts"
UA = ("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) "
      "Chrome/120 Safari/537.36")
CSS_URL = ("https://fonts.googleapis.com/css2?"
           "family=Playfair+Display:wght@400;500;600;700&"
           "family=Montserrat:wght@300;400;500;600;700&display=swap")


def buscar(url):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    return urllib.request.urlopen(req, timeout=30).read()


def main():
    DESTINO.mkdir(parents=True, exist_ok=True)
    css = buscar(CSS_URL).decode()
    blocos = re.findall(r"/\*\s*([\w-]+)\s*\*/\s*(@font-face\s*\{.*?\})", css, re.S)

    familias = {}
    for subset, bloco in blocos:
        if subset != "latin":
            continue
        url = re.search(r"src:\s*url\((https://[^)]+)\)", bloco).group(1)
        familia = re.search(r"font-family:\s*'([^']+)'", bloco).group(1)
        dados = buscar(url)
        familias.setdefault(familia, {})[hashlib.sha256(dados).hexdigest()] = dados

    regras = []
    for familia, arquivos in familias.items():
        print("  %-18s %d arquivo(s) para 300..700" % (familia, len(arquivos)))
        for dados in arquivos.values():
            regras.append(
                "@font-face{font-family:'%s';font-style:normal;font-weight:300 700;"
                "font-display:block;src:url(data:font/woff2;base64,%s) format('woff2');}"
                % (familia, base64.b64encode(dados).decode())
            )

    saida = DESTINO / "fontes-embutidas.css"
    saida.write_text("\n".join(regras), encoding="utf-8")
    print("\n%s · %d bytes" % (saida.name, saida.stat().st_size))


if __name__ == "__main__":
    print("Baixando fontes do Google Fonts\n")
    main()
