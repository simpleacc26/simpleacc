#!/usr/bin/env python3
"""Baixa as fontes do Google Fonts e as embute no carrossel como data: URIs.

Roda uma vez (ou quando trocar de fonte). Deixa o `carrossel.html` totalmente
self-contained: o preview e o export usam exatamente os mesmos arquivos de
fonte, sem depender da rede na hora de gerar os PNGs, que é o jeito de
garantir que os slides não sejam exportados com a fonte fallback do sistema.
"""

import base64
import re
import subprocess
from pathlib import Path

HERE = Path(__file__).parent
HTML = HERE / "carrossel.html"

CSS_URL = (
    "https://fonts.googleapis.com/css2"
    "?family=Fahkwang:wght@300;500;600"
    "&family=Inter:wght@400;500;600"
    "&display=swap"
)
# UA de navegador moderno: sem isso o Google devolve TTF em vez de woff2.
UA = (
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/120.0 Safari/537.36"
)

MARK_START = "<!-- FONTS:START -->"
MARK_END = "<!-- FONTS:END -->"


def fetch(url: str) -> bytes:
    """curl respeita o proxy e o CA bundle já configurados no ambiente."""
    return subprocess.run(
        ["curl", "-sS", "--fail", "-A", UA, url],
        check=True,
        capture_output=True,
    ).stdout


def main() -> None:
    css = fetch(CSS_URL).decode("utf-8")

    blocks = re.findall(r"@font-face\s*\{[^}]*\}", css)
    # Só o subset latin: cobre acentos do português e aspas curvas.
    latin = [b for b in blocks if "U+0000-00FF" in b]
    if not latin:
        raise SystemExit("Nenhum bloco latin encontrado no CSS do Google Fonts.")

    out = []
    for block in latin:
        m = re.search(r"url\((https://[^)]+\.woff2)\)", block)
        if not m:
            continue
        data = fetch(m.group(1))
        uri = "data:font/woff2;base64," + base64.b64encode(data).decode("ascii")
        # Remove o unicode-range: com só o subset latin embutido ele é ruído.
        block = re.sub(r"\s*unicode-range:[^;]+;", "", block)
        out.append(block.replace(m.group(1), uri))
        fam = re.search(r"font-family:\s*'([^']+)'", block).group(1)
        wgt = re.search(r"font-weight:\s*(\d+)", block).group(1)
        print(f"  embutida: {fam} {wgt}  ({len(data) / 1024:.0f} KB)")

    style = "<style>\n" + "\n".join(out) + "\n</style>"

    html = HTML.read_text(encoding="utf-8")
    if MARK_START not in html or MARK_END not in html:
        raise SystemExit(f"Marcadores {MARK_START}/{MARK_END} não achados no HTML.")

    new = re.sub(
        re.escape(MARK_START) + r".*?" + re.escape(MARK_END),
        MARK_START + "\n" + style + "\n" + MARK_END,
        html,
        flags=re.DOTALL,
    )
    HTML.write_text(new, encoding="utf-8")
    print(f"\nOK. {len(out)} fontes embutidas em {HTML.name} "
          f"({len(new) / 1024:.0f} KB no total).")


if __name__ == "__main__":
    main()
