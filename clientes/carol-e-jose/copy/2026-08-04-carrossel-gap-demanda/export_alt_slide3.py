#!/usr/bin/env python3
"""Exporta uma versão alternativa do card 3, trocando "próximo nível".

O Framework de Comunicação ÚNICOS lista "próximo nível" entre as palavras banidas
e manda usar "próximo patamar" ou "próximo estágio" no lugar. A copy aprovada pelo
cliente usa a expressão banida, então o card oficial sai literal, como pedido, e
esta alternativa fica pronta ao lado para troca imediata caso o cliente concorde.

Gera: slides/slide_3-alt-proximo-patamar.png
"""
import asyncio
from pathlib import Path
from playwright.async_api import async_playwright

BASE = Path(__file__).resolve().parent
INPUT_HTML = BASE / "carrossel.html"
OUTPUT = BASE / "slides" / "slide_3-alt-proximo-patamar.png"

DE = "alcançar o próximo nível."
PARA = "alcançar o próximo patamar."

VIEW_W, VIEW_H = 420, 525
SCALE = 1080 / 420
CHROMIUM = "/opt/pw-browsers/chromium-1194/chrome-linux/chrome"


async def exportar():
    html = INPUT_HTML.read_text(encoding="utf-8")
    if DE not in html:
        raise SystemExit(f"trecho não encontrado no HTML: {DE!r}")
    html = html.replace(DE, PARA)

    async with async_playwright() as p:
        browser = await p.chromium.launch(executable_path=CHROMIUM)
        page = await browser.new_page(
            viewport={"width": VIEW_W, "height": VIEW_H}, device_scale_factor=SCALE
        )
        await page.set_content(html, wait_until="networkidle")
        await page.wait_for_timeout(3000)
        await page.evaluate(
            """() => {
            document.querySelectorAll('.ig-header,.ig-dots,.ig-actions,.ig-caption')
                .forEach(el => el.style.display = 'none');
            const frame = document.querySelector('.ig-frame');
            frame.style.cssText = 'width:420px;height:525px;max-width:none;border-radius:0;'
                + 'box-shadow:none;overflow:hidden;margin:0;';
            const viewport = document.querySelector('.carousel-viewport');
            viewport.style.cssText = 'width:420px;height:525px;aspect-ratio:unset;'
                + 'overflow:hidden;cursor:default;';
            document.body.style.cssText = 'padding:0;margin:0;display:block;overflow:hidden;';
            const track = document.querySelector('.carousel-track');
            track.style.transition = 'none';
            track.style.transform = 'translateX(-840px)';
        }"""
        )
        await page.wait_for_timeout(500)
        await page.screenshot(
            path=str(OUTPUT), clip={"x": 0, "y": 0, "width": VIEW_W, "height": VIEW_H}
        )
        await browser.close()
    print(f"ok: {OUTPUT.name}")


asyncio.run(exportar())
