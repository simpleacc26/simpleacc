#!/usr/bin/env python3
"""Exporta cada slide do carrossel como PNG 1080x1350, pronto para o Instagram."""
import asyncio
from pathlib import Path
from playwright.async_api import async_playwright

BASE = Path(__file__).resolve().parent
INPUT_HTML = BASE / "carrossel.html"
OUTPUT_DIR = BASE / "slides"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

TOTAL_SLIDES = 5
VIEW_W = 420
VIEW_H = 525
SCALE = 1080 / 420

# O container já traz o Chromium; o pacote pip espera outro build, então apontamos direto.
CHROMIUM = "/opt/pw-browsers/chromium-1194/chrome-linux/chrome"


async def export_slides():
    async with async_playwright() as p:
        browser = await p.chromium.launch(executable_path=CHROMIUM)
        page = await browser.new_page(
            viewport={"width": VIEW_W, "height": VIEW_H},
            device_scale_factor=SCALE,
        )

        await page.set_content(INPUT_HTML.read_text(encoding="utf-8"), wait_until="networkidle")
        await page.wait_for_timeout(3000)  # fontes do Google

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
        }"""
        )
        await page.wait_for_timeout(500)

        for i in range(TOTAL_SLIDES):
            await page.evaluate(
                """(idx) => {
                const track = document.querySelector('.carousel-track');
                track.style.transition = 'none';
                track.style.transform = 'translateX(' + (-idx * 420) + 'px)';
            }""",
                i,
            )
            await page.wait_for_timeout(400)
            await page.screenshot(
                path=str(OUTPUT_DIR / f"slide_{i + 1}.png"),
                clip={"x": 0, "y": 0, "width": VIEW_W, "height": VIEW_H},
            )
            print(f"slide {i + 1}/{TOTAL_SLIDES}")

        await browser.close()


asyncio.run(export_slides())
