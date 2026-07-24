# Exportar os slides como PNGs prontos para o Instagram

Depois que a pessoa aprovar o preview, exporte cada slide como uma imagem
individual **1080×1350px PNG**, pronta para o upload direto no Instagram.

---

## Regras críticas do export

1. **Use Python para gerar o HTML** — nunca use shell script com interpolação de
   variáveis: variáveis de shell corrompem o conteúdo (especialmente números e
   caracteres especiais no HTML). Gere sempre os arquivos HTML com
   `Path.write_text()` ou `open().write()` do Python.

2. **Embuta as imagens em base64** — todas as imagens enviadas pelo usuário
   (prints, fotos de perfil, etc.) precisam ser codificadas em base64 e embutidas
   direto no HTML como URIs `data:image/jpeg;base64,...`. Isso garante que o HTML
   é 100% autocontido e renderiza certo no navegador headless.

3. **Mantenha o layout em 420px** — o carrossel HTML é desenhado a 420px de
   largura. O export usa o `device_scale_factor` do Playwright para escalar para
   1080px de saída **SEM mudar o layout**. Nunca setar o viewport para 1080px de
   largura — isso faria o layout refluir e distorcer tudo.

---

## Script de export

Use exatamente esta abordagem com Playwright:

```python
import asyncio
from pathlib import Path
from playwright.async_api import async_playwright

INPUT_HTML = Path("/path/to/carousel.html")
OUTPUT_DIR = Path("/path/to/output/slides")
OUTPUT_DIR.mkdir(exist_ok=True)

TOTAL_SLIDES = 7  # Atualize para bater com o seu carrossel

# O carrossel é desenhado a 420px de largura, proporção 4:5 = 525px de altura
# Saída alvo: 1080x1350
# Fator de escala: 1080 / 420 = 2.5714...
VIEW_W = 420
VIEW_H = 525
SCALE = 1080 / 420

async def export_slides():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(
            viewport={"width": VIEW_W, "height": VIEW_H},
            device_scale_factor=SCALE,
        )

        html_content = INPUT_HTML.read_text(encoding="utf-8")
        await page.set_content(html_content, wait_until="networkidle")
        await page.wait_for_timeout(3000)  # Espera as fontes carregarem

        # Esconde o chrome do frame de Instagram, mostra só o viewport do slide
        await page.evaluate("""() => {
            document.querySelectorAll('.ig-header,.ig-dots,.ig-actions,.ig-caption')
                .forEach(el => el.style.display='none');
            const frame = document.querySelector('.ig-frame');
            frame.style.cssText = 'width:420px;height:525px;max-width:none;border-radius:0;box-shadow:none;overflow:hidden;margin:0;';
            const viewport = document.querySelector('.carousel-viewport');
            viewport.style.cssText = 'width:420px;height:525px;aspect-ratio:unset;overflow:hidden;cursor:default;';
            document.body.style.cssText = 'padding:0;margin:0;display:block;overflow:hidden;';
        }""")
        await page.wait_for_timeout(500)

        for i in range(TOTAL_SLIDES):
            # Navega até o slide i movendo o track
            await page.evaluate("""(idx) => {
                const track = document.querySelector('.carousel-track');
                track.style.transition = 'none';
                track.style.transform = 'translateX(' + (-idx * 420) + 'px)';
            }""", i)
            await page.wait_for_timeout(400)

            # Screenshot com clip na área exata do viewport
            await page.screenshot(
                path=str(OUTPUT_DIR / f"slide_{i+1}.png"),
                clip={"x": 0, "y": 0, "width": VIEW_W, "height": VIEW_H}
            )
            print(f"Exported slide {i+1}/{TOTAL_SLIDES}")

        await browser.close()

asyncio.run(export_slides())
```

> No ambiente remoto da Simple, o Chromium já vem instalado e o Playwright já sabe
> encontrá-lo (`PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`). **Não rode
> `playwright install`.**

---

## Por que isso funciona

- **`device_scale_factor=2.5714`** diz ao navegador para renderizar em alta DPI.
  Um elemento de 420px de largura vira 1080px na imagem de saída. O layout
  permanece em 420px — fontes, espaçamentos e posições ficam exatamente como no
  preview HTML.
- **`clip`** garante que o screenshot capture só o viewport do carrossel, não o
  chrome do navegador ao redor.
- **`wait_for_timeout(3000)`** dá tempo para o Google Fonts carregar antes do screenshot.
- **`track.style.transition = 'none'`** desliga a animação de swipe para o slide
  entrar na posição instantaneamente.

---

## Erros comuns de export a evitar

| Erro | O que dá errado | Correção |
|------|-----------------|----------|
| Setar o viewport para 1080×1350 | O layout reflui — fontes minúsculas, espaçamento quebra, imagens redimensionam | Mantenha o viewport em 420×525, use `device_scale_factor` |
| Usar shell script para gerar o HTML | Sinais de `$`, crases e números são interpolados como variáveis de shell | Sempre gere o HTML com Python |
| Não esperar as fontes | Títulos renderizam em fonte de sistema (fallback) | `wait_for_timeout(3000)` após o load |
| Não esconder o chrome do frame | O export inclui header, dots e legenda | Esconda `.ig-header,.ig-dots,.ig-actions,.ig-caption` |
| Mudar a largura do `.ig-frame` | O layout inteiro desloca, nada bate com o preview | Sempre mantenha em exatamente 420px |

---

## Boas práticas de layout

1. **O conteúdo nunca pode sobrepor a barra de progresso.** Use `padding-bottom:
   52px` em qualquer conteúdo de slide que se estenda até a base.

2. **Imagens enviadas pelo usuário podem ser JPEG mesmo com extensão `.png`.**
   Sempre confira o formato real com o comando `file` antes de embutir em base64 —
   use o MIME certo (`data:image/jpeg;base64,...` vs `data:image/png;base64,...`).

3. **Teste todo slide visualmente antes do export.** Peça pra pessoa passar pelo
   preview HTML e mandar print de qualquer problema. Itere em slides específicos,
   em vez de regenerar o carrossel inteiro.

---

## Princípios de design (por que o sistema é assim)

1. **Todo slide é pronto para export** — seta e barra de progresso são parte da
   imagem do slide, não UI de overlay.
2. **Alternância claro/escuro** — cria ritmo visual e sustenta a atenção ao longo dos swipes.
3. **Par de fontes título + corpo** — fonte de display para impacto, fonte de corpo para leitura.
4. **Paleta derivada da marca** — todas as cores saem de uma só primária, mantendo tudo coeso.
5. **Revelação progressiva** — a barra de progresso enche e a seta guia o usuário adiante.
6. **O último slide é especial** — sem seta (sinaliza o fim), barra cheia, CTA claro.
7. **Componentes consistentes** — mesmo estilo de tag, de lista, de espaçamento em todos os slides.
8. **Padding do conteúdo respeita a UI** — texto nunca sobrepõe a barra de progresso ou a seta.
9. **Itere rápido** — mostre o preview, colha feedback em slides específicos, corrija esses.
   Não reconstrua do zero, a menos que a direção mude fundamentalmente.
