#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Confere, card a card, se algum conteúdo estoura a área segura do slide.

Existe porque o erro que mais aparece aqui é silencioso: o texto cresce uma
linha, encosta na barra de progresso e ninguém vê até olhar o PNG. Olhar 20
cards à mão não escala; medir escala.

Área segura de um card de 420x525:
  topo      0
  base      525 menos 42, que é o que a barra de progresso ocupa
  laterais  0 a 420, mais o retângulo do chevron da seta, que é o único
            pedaço opaco dela

Elementos com class="chrome" (a própria barra e a seta) são ignorados.
Uso: python3 conferir.py
"""
import asyncio
import re
import sys
from pathlib import Path

from playwright.async_api import async_playwright

AQUI = Path(__file__).resolve().parent
CHROMIUM = "/opt/pw-browsers/chromium"
LARGURA, ALTURA = 420, 525
ZONA_BARRA = 42
FOLGA = 1.0        # subpixel de arredondamento do layout

# A seta é uma faixa de 46px de largura e altura inteira, mas só o chevron de
# 24px é opaco, e ele fica centrado na vertical: ocupa x de 385 a 409 e y de 250
# a 274. Reservar a faixa inteira acusaria a arroba do topo, que não encosta em
# nada. O que se reserva é o retângulo do chevron, com 4px de folga.
CHEVRON = dict(esq=385 - 4, topo=250 - 4, base=274 + 4)

MEDIDOR = """(cfg) => {
  const fora = [];

  // Mede a TINTA, não a caixa. Um <h2> de bloco ocupa a largura toda mesmo
  // quando a frase quebra bem antes, e medir a caixa acusa o card inteiro.
  function tinta(el) {
    let caixa = null;
    for (const no of el.childNodes) {
      if (no.nodeType !== 3 || !no.textContent.trim()) continue;
      const faixa = document.createRange();
      faixa.selectNodeContents(no);
      for (const r of faixa.getClientRects()) {
        if (!r.width || !r.height) continue;
        caixa = caixa ? {
          top: Math.min(caixa.top, r.top), left: Math.min(caixa.left, r.left),
          bottom: Math.max(caixa.bottom, r.bottom), right: Math.max(caixa.right, r.right),
        } : { top: r.top, left: r.left, bottom: r.bottom, right: r.right };
      }
    }
    return caixa;
  }

  document.querySelectorAll('.slide').forEach((slide, idx) => {
    const r = slide.getBoundingClientRect();
    const temSeta = !!slide.querySelector('.chrome[style*="width:46px"]');
    const limite = { topo: r.top, base: r.bottom - cfg.zonaBarra, esq: r.left, dir: r.right };
    const chevron = temSeta ? {
      esq: r.left + cfg.chevron.esq,
      topo: r.top + cfg.chevron.topo,
      base: r.top + cfg.chevron.base,
    } : null;

    const alvos = [];
    slide.querySelectorAll('*').forEach((el) => {
      if (el.closest('.chrome')) return;
      if (el.tagName === 'IMG') {
        const b = el.getBoundingClientRect();
        if (b.width && b.height) alvos.push({ el: el, b: b, rotulo: 'imagem' });
        return;
      }
      const b = tinta(el);
      if (b) alvos.push({ el: el, b: b, rotulo: (el.textContent || '').trim().slice(0, 52) });
    });

    alvos.forEach(({ el, b, rotulo }) => {
      const erros = [];
      if (b.bottom > limite.base + cfg.folga) erros.push('base +' + (b.bottom - limite.base).toFixed(1));
      if (b.top < limite.topo - cfg.folga) erros.push('topo ' + (b.top - limite.topo).toFixed(1));
      if (b.left < limite.esq - cfg.folga) erros.push('esquerda ' + (b.left - limite.esq).toFixed(1));
      if (b.right > limite.dir + cfg.folga) erros.push('direita +' + (b.right - limite.dir).toFixed(1));
      if (chevron && b.right > chevron.esq && b.bottom > chevron.topo && b.top < chevron.base) {
        erros.push('encosta na seta +' + (b.right - chevron.esq).toFixed(1));
      }
      if (erros.length) {
        fora.push({ card: idx + 1, tag: el.tagName.toLowerCase(), texto: rotulo, erros: erros });
      }
    });
  });
  return fora;
}"""


async def conferir():
    arquivos = sorted(AQUI.glob("carrossel-*.html"))
    if not arquivos:
        sys.exit("Nenhum carrossel-*.html encontrado. Rode gerar.py antes.")

    problemas = 0
    async with async_playwright() as p:
        navegador = await p.chromium.launch(
            executable_path=CHROMIUM if Path(CHROMIUM).exists() else None)
        pagina = await navegador.new_page(viewport={"width": LARGURA, "height": ALTURA})

        for html in arquivos:
            texto = html.read_text(encoding="utf-8")
            total = int(re.search(r"var total = (\d+)", texto).group(1))
            await pagina.set_content(texto, wait_until="networkidle")
            await pagina.evaluate("() => document.fonts.ready")
            await pagina.wait_for_timeout(600)
            # tira a moldura para os cards ficarem no tamanho real
            await pagina.evaluate("""() => {
                document.querySelectorAll('.ig-header,.ig-dots,.ig-actions,.ig-caption')
                  .forEach(el => el.style.display = 'none');
                document.querySelector('.ig-frame').style.cssText =
                  'width:420px;height:525px;max-width:none;border-radius:0;margin:0;';
                document.querySelector('.carousel-viewport').style.cssText =
                  'width:420px;height:525px;aspect-ratio:unset;overflow:visible;';
                document.querySelector('.carousel-track').style.cssText =
                  'display:flex;height:100%;';
                document.body.style.cssText = 'padding:0;margin:0;display:block;';
            }""")
            await pagina.wait_for_timeout(200)
            fora = await pagina.evaluate(MEDIDOR, {
                "zonaBarra": ZONA_BARRA, "chevron": CHEVRON, "folga": FOLGA})

            nome = html.name.replace("carrossel-", "").replace(".html", "")
            if fora:
                problemas += len(fora)
                print("\n  %s (%d cards)" % (nome, total))
                for f in fora:
                    print("     card %d · %-4s %-52s %s"
                          % (f["card"], f["tag"], f["texto"], ", ".join(f["erros"])))
            else:
                print("  %-46s %d cards, tudo dentro" % (nome, total))

        await navegador.close()
    return problemas


if __name__ == "__main__":
    print("Conferindo área segura dos cards\n")
    n = asyncio.run(conferir())
    print("\n%s" % ("Nenhum estouro." if not n else "%d elemento(s) fora da área segura." % n))
    sys.exit(1 if n else 0)
