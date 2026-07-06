# Apostila / Workbook — order bump (Funil de Lead Dinâmico)

Material do order bump **"Apostila digital — lançamento pago"** (R$ 37 / R$ 39,90).
Copy de referência do checkout:

> Acesse os principais insights dos 2 dias de Workshop em um material prático, com
> resumos, checklists e referências para modelar. Um guia de implementação pra
> aproveitar o melhor da nossa estratégia.

## Status: ✅ conteúdo preenchido

- ✅ **Apostila completa** em `apostila.html` — o método inteiro em formato workbook
  (resumo → checklist → templates preenchíveis por parte), na identidade Simple.
- ✅ **PDF pronto:** `apostila.pdf` (gerado do HTML).
- ✅ **Autossuficiente:** as fontes (Inter + Space Grotesk) estão embutidas em base64,
  então o HTML abre e gera PDF igual em qualquer máquina, **offline** — não depende do
  Google Fonts nem de rede.

Fonte do conteúdo: a **gravação/transcrição da aula do Daniel** ("Funil de Lead Dinâmico",
~2h28) + o **deck da apresentação** (`aula-deploy`). Conteúdo do método **não inventado** —
extraído da fonte, com números e falas reais.

## Estrutura da apostila (realinhada ao deck)

- **Parte 0 · A prova** — cases e números (Carol MQL R$32 · Daniele MQL R$5–6 · Ju ROAS 8,4 ·
  contratos R$30–84k · faturamento mês a mês da operação própria).
- **Parte 1 · A virada de visão** — custo por reunião qualificada comparecida.
- **Parte 2 · A arquitetura do quiz** — ordem, 4 erros, promessa dupla, buckets, interseções.
- **Parte 3 · O anúncio e a página** — prende→segmenta, dopamina, página que vende.
- **Parte 4 · Os 9 procedimentos** — o passo a passo de implementação + checklist mestre.
- **Parte 5 · O comercial** — 5 min, SPIN/NEPQ, ancoragem, 6 etapas de follow-up.
- **Fechamento** — os 5 primeiros passos + anexo de fórmulas para modelar.

Cada parte traz **checklists** (☐ pra marcar) e **templates preenchíveis** (oferta, buckets,
headline dupla, anúncio, scripts do comercial).

## Como regerar o PDF (depois de editar o HTML)
```bash
# na pasta apostila/
/opt/pw-browsers/chromium --headless --no-sandbox --disable-gpu \
  --print-to-pdf=apostila.pdf --no-pdf-header-footer "file://$PWD/apostila.html"
```

> As fontes já estão embutidas no HTML — não precisa de internet pra gerar o PDF.
> Se um dia precisar reembutir/trocar as fontes, baixe os `woff2` (subset latin) e
> converta em `data:font/woff2;base64,...` dentro do bloco `@font-face`.
