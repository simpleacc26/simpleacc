#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Exporta cada slide dos carrosséis como PNG 1080x1350, pronto para subir no Instagram.

O HTML é desenhado a 420px de largura. O export NÃO mexe no viewport para 1080:
usa device_scale_factor = 1080/420, que renderiza em alta densidade sem refluir
o layout. Mudar a largura do viewport distorceria tipografia e espaçamento.
"""
import asyncio
import re
import sys
from pathlib import Path

from playwright.async_api import async_playwright

# O ambiente traz o Chromium pré-instalado numa build diferente da que o pacote
# do Playwright espera. Apontamos o executável em vez de baixar outro.
CHROMIUM = "/opt/pw-browsers/chromium"

AQUI = Path(__file__).resolve().parent
SAIDA = AQUI / "slides"

VIEW_W, VIEW_H = 420, 525
ESCALA = 1080 / 420          # 2.5714... -> 1080x1350


def descobrir():
    """Cada HTML e quantos slides ele tem (lido do próprio arquivo)."""
    achados = []
    for html in sorted(AQUI.glob("carrossel-*.html")):
        texto = html.read_text(encoding="utf-8")
        total = int(re.search(r"var total = (\d+)", texto).group(1))
        achados.append((html, total))
    return achados


async def exportar():
    arquivos = descobrir()
    if not arquivos:
        sys.exit("Nenhum carrossel-*.html encontrado. Rode gerar.py antes.")

    async with async_playwright() as p:
        navegador = await p.chromium.launch(
            executable_path=CHROMIUM if Path(CHROMIUM).exists() else None
        )
        pagina = await navegador.new_page(
            viewport={"width": VIEW_W, "height": VIEW_H},
            device_scale_factor=ESCALA,
        )
        for html, total in arquivos:
            pasta = SAIDA / html.stem.replace("carrossel-", "carrossel-")
            pasta.mkdir(parents=True, exist_ok=True)

            await pagina.set_content(html.read_text(encoding="utf-8"), wait_until="networkidle")
            await pagina.evaluate("() => document.fonts.ready")
            await pagina.wait_for_timeout(1200)

            # tira a moldura do Instagram: o slide precisa sair sozinho
            await pagina.evaluate("""() => {
                document.querySelectorAll('.ig-header,.ig-dots,.ig-actions,.ig-caption')
                  .forEach(el => el.style.display = 'none');
                const frame = document.querySelector('.ig-frame');
                frame.style.cssText = 'width:420px;height:525px;max-width:none;border-radius:0;'
                  + 'box-shadow:none;overflow:hidden;margin:0;';
                const vp = document.querySelector('.carousel-viewport');
                vp.style.cssText = 'width:420px;height:525px;aspect-ratio:unset;'
                  + 'overflow:hidden;cursor:default;';
                document.body.style.cssText = 'padding:0;margin:0;display:block;overflow:hidden;';
            }""")
            await pagina.wait_for_timeout(400)

            for i in range(total):
                await pagina.evaluate("""(idx) => {
                    const track = document.querySelector('.carousel-track');
                    track.style.transition = 'none';
                    track.style.transform = 'translateX(' + (-idx * 420) + 'px)';
                }""", i)
                await pagina.wait_for_timeout(320)
                await pagina.screenshot(
                    path=str(pasta / ("slide-%02d.png" % (i + 1))),
                    clip={"x": 0, "y": 0, "width": VIEW_W, "height": VIEW_H},
                )
            print("  %-52s %d slides -> %s/" % (html.name, total, pasta.name))

        await navegador.close()


if __name__ == "__main__":
    print("Exportando slides em 1080x1350\n")
    asyncio.run(exportar())
    print("\nPronto. PNGs em %s/" % SAIDA.name)
