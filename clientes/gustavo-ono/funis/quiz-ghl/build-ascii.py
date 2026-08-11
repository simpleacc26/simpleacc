#!/usr/bin/env python3
"""
Gera os embeds ASCII puros a partir das fontes legiveis em src/.

Por que ASCII puro: colando conteudo com bytes acima de 127 no GHL, os acentos
podem virar mojibake ("EMPRESARIOS" vira "EMPRESAoRIOS") porque em algum ponto
do caminho os bytes UTF-8 sao lidos como se fossem de um byte so. O arquivo de
origem fica correto, o que torna o problema dificil de diagnosticar e facil de
repetir. Resolvido no projeto do Rafael Granella da mesma forma: nenhum byte
alto sai daqui.

Como converte, por regiao do arquivo:
  <script> ... </script>   ->  \\uXXXX   (valido em string, regex e template)
  <style>  ... </style>    ->  falha se achar algo nao-ASCII (CSS nao deve ter)
  resto (markup HTML)      ->  &#NNN;

Uso:  python3 build-ascii.py
"""

import re
import sys
from pathlib import Path

AQUI = Path(__file__).parent
PARES = [
    (AQUI / "src" / "quiz.html", AQUI / "quiz-ghl-embed.html"),
    (AQUI / "src" / "relatorio.html", AQUI / "relatorio-ghl-embed.html"),
]

SEGMENTO = re.compile(r"(<script\b[^>]*>.*?</script>|<style\b[^>]*>.*?</style>)", re.S | re.I)


def escapar_js(texto: str) -> str:
    """Cada caractere fora do ASCII vira \\uXXXX (par de surrogates quando preciso)."""
    saida = []
    for ch in texto:
        if ord(ch) < 128:
            saida.append(ch)
            continue
        bruto = ch.encode("utf-16-be")
        for i in range(0, len(bruto), 2):
            saida.append("\\u%04x" % int.from_bytes(bruto[i:i + 2], "big"))
    return "".join(saida)


def escapar_html(texto: str) -> str:
    return "".join(ch if ord(ch) < 128 else "&#%d;" % ord(ch) for ch in texto)


def converter(origem: Path, destino: Path) -> None:
    bruto = origem.read_text(encoding="utf-8")
    partes = SEGMENTO.split(bruto)
    saida = []
    for parte in partes:
        baixo = parte[:8].lower()
        if baixo.startswith("<script"):
            saida.append(escapar_js(parte))
        elif baixo.startswith("<style"):
            if not parte.isascii():
                achados = sorted({c for c in parte if ord(c) >= 128})
                sys.exit(
                    "ERRO: %s tem caracteres nao-ASCII dentro do <style>: %s\n"
                    "CSS nao deveria precisar de acento. Reescreva ou trate aqui."
                    % (origem.name, " ".join(achados))
                )
            saida.append(parte)
        else:
            saida.append(escapar_html(parte))

    final = "".join(saida)
    if not final.isascii():
        restantes = sorted({c for c in final if ord(c) >= 128})
        sys.exit("ERRO: sobrou nao-ASCII em %s: %s" % (destino.name, " ".join(restantes)))

    destino.write_text(final, encoding="ascii")
    print("%-22s -> %-26s %6d bytes  ascii=%s"
          % (origem.name, destino.name, len(final), final.isascii()))


if __name__ == "__main__":
    for origem, destino in PARES:
        converter(origem, destino)
    print("\nPronto. Cole o conteudo dos *-ghl-embed.html nos elementos Custom Code do GHL.")
