---
name: carrossel-instagram
description: >-
  Gera um carrossel de Instagram completo e pronto para postar (modelo Simple
  Acc): slides swipeáveis em HTML no formato 4:5, cada slide desenhado para ser
  exportado como imagem individual, e exportação final em PNGs 1080x1350 prontos
  para subir no Instagram. Deriva todo o sistema visual a partir de UMA cor de
  marca e monta a sequência narrativa (gancho → problema → solução → CTA). Use
  sempre que alguém pedir "criar um carrossel", "carrossel para o Instagram do
  cliente X", "posts em carrossel", "slides para o Insta", "carousel", "montar um
  post carrossel", transformar um conteúdo/tema em carrossel, ou gerar os PNGs de
  um carrossel para postar — mesmo que não digam "carrossel" com todas as letras.
---

# Carrossel de Instagram — gerador de posts swipeáveis + export em PNG

## O que esta skill faz

Transforma um **tema/conteúdo** num **carrossel de Instagram** pronto para postar:
um arquivo HTML autocontido com slides swipeáveis no formato **4:5**, onde **cada
slide é desenhado para virar uma imagem individual**. Depois de aprovado, exporta
cada slide como um **PNG 1080×1350** pronto para o upload no Instagram.

O sistema é **guiado por marca**: a partir de **uma única cor primária** ele
deriva a paleta completa (6 tokens), escolhe a tipografia, e mantém tudo coeso
entre os slides. A UI (barra de progresso, seta de swipe) é **assada dentro de
cada slide** — não é overlay — então o que você vê no preview é exatamente o que
sai no PNG.

O valor está em três coisas que o time costuma errar quando faz na mão:
1. **Sistema visual coeso** — todas as cores saem de uma só cor de marca; nada de
   paleta improvisada slide a slide.
2. **Arco narrativo que segura o swipe** — gancho → problema → solução → CTA, com
   alternância claro/escuro para dar ritmo.
3. **Export fiel** — os PNGs saem idênticos ao preview (layout 420px + `device_scale_factor`),
   sem reflow, sem fonte de fallback, sem chrome do frame.

## O fluxo (siga nesta ordem)

```
1. MARCA      → coletar os dados de marca (nome, @, cor, logo, fonte, tom, imagens)
2. SISTEMA    → derivar a paleta (6 tokens) e a tipografia a partir da cor primária
3. SLIDES     → montar o HTML: elementos obrigatórios + sequência de slides + componentes
4. PREVIEW    → mostrar no chat dentro do frame de Instagram e iterar por slide
5. EXPORT     → exportar cada slide em PNG 1080x1350 (Playwright + Python)
6. VERSIONAR  → salvar HTML + PNGs na pasta do cliente e registrar o aprendizado
```

Não pule o passo 1. **Sem os dados de marca, não gere** — pergunte antes. Se o
usuário disser só "faz um carrossel sobre X" sem detalhes de marca, colete os
dados primeiro; não assuma defaults (a única coisa que você pode inferir é a
paleta, e mesmo assim a partir da cor que ele der).

---

### Passo 1 — Coletar os dados de marca

Antes de gerar qualquer coisa, colete o que está em
**`references/sistema-visual.md`** (seção "Passo 1"): nome da marca, @ do
Instagram, cor primária, logo (SVG/inicial/sem logo), preferência de fonte, tom
e imagens a incluir.

Se você já estiver **dentro da pasta de um cliente** (`clientes/<cliente>/`),
leia o `CLAUDE.md`, a pasta `contexto/` e `aprendizados.md` desse cliente antes
de perguntar — muita coisa (cor, @, tom, logo, oferta) já está registrada, então
chegue nas perguntas só com o que faltar. Se o usuário passou um site ou assets
da marca, derive as cores e o estilo deles.

### Passo 2 — Derivar o sistema visual

A partir da **única cor primária**, derive a paleta de **6 tokens** e escolha a
**tipografia** (fonte de título + fonte de corpo) seguindo
**`references/sistema-visual.md`** (seções "Passo 2" e "Passo 3"). Ali estão as
regras de derivação (light bg quente/frio, dark bg com tint de marca, gradiente
de marca), a tabela de pares de fontes e a escala de tamanhos fixa.

### Passo 3 — Montar os slides

Monte o HTML seguindo **`references/arquitetura-slides.md`**. Ele traz:
- o formato (4:5, alternância claro/escuro);
- os **elementos obrigatórios em todo slide** (barra de progresso + seta de swipe,
  com o JS pronto) — a seta **some no último slide**;
- os **padrões de conteúdo** por slide (tag, logo lockup, watermark);
- a **sequência-padrão de 7 slides** (gancho → problema → solução → features →
  detalhes → passo a passo → CTA) — flexível de 5 a 10;
- os **componentes reutilizáveis** (pills, quote box, feature list, steps,
  swatches, botão de CTA) com o HTML pronto;
- o **frame de Instagram** do preview (largura fixa de **420px** — não mude).

### Passo 4 — Preview e iteração

Mostre o carrossel no chat dentro do frame de Instagram (header + viewport
swipeável + dots + ações + caption). Peça pra pessoa passar pelos slides e
apontar problemas. **Itere no slide específico** — não regenere o carrossel
inteiro a cada ajuste, a menos que a direção mude de vez.

### Passo 5 — Exportar os PNGs

Depois de aprovado, exporte cada slide como um **PNG 1080×1350** seguindo
**`references/exportacao.md`** — que traz as regras críticas (gerar o HTML com
**Python**, nunca shell; imagens em **base64**; manter o layout em **420px** e
escalar com `device_scale_factor`) e o **script Playwright** pronto.

### Passo 6 — Versionar no repositório (memória = Git)

A sessão é descartável; o que permanece é o Git. Salve o carrossel na pasta do
cliente:

1. Crie uma pasta autocontida em
   `clientes/<cliente>/copy/carrossel-<tema>/` (slug do tema em minúsculas, sem
   acento, com hífen — ex.: `clientes/sense-clinic/copy/carrossel-implantes/`).
2. Dentro dela salve:
   - `carrossel.html` — o carrossel completo (com as imagens em base64);
   - `slides/slide_1.png … slide_N.png` — os PNGs exportados;
   - `README.md` — o que é, tema, marca, quantos slides, data e a legenda sugerida.
3. Se for trabalho **interno** da Simple, salve em
   `clientes/0-interno-simpleacc-inova/copy/carrossel-<tema>/`.
4. Registre uma linha em `clientes/<cliente>/aprendizados.md` (data + "carrossel
   de <tema> criado" + o que funcionou / não funcionou).
5. Commit numa branch `cliente/<cliente>/carrossel-<tema>` (ou `interno/carrossel-<tema>`)
   e abra um PR.

> Assim, da próxima vez, o time lê o carrossel anterior no repo e cria a próxima
> versão em vez de recomeçar do zero.

---

## Checklist antes de entregar

- [ ] Dados de marca coletados (ou lidos do `contexto/` do cliente) — nada de default assumido
- [ ] Paleta de 6 tokens derivada da cor primária; light bg **nunca** `#fff` puro
- [ ] Par de fontes (título + corpo) definido e aplicado via `.serif` / `.sans`
- [ ] Barra de progresso e seta de swipe em **todo** slide; **seta some no último**
- [ ] Alternância claro/escuro para dar ritmo; último slide em gradiente de marca com CTA
- [ ] Frame de Instagram com **420px** de largura (o export depende disso)
- [ ] Preview mostrado e iterado por slide antes do export
- [ ] Export em **PNG 1080×1350** (HTML gerado por Python, imagens em base64, layout 420px)
- [ ] Nenhum conteúdo sobrepõe a barra de progresso (`padding-bottom: 52px`)
- [ ] HTML + PNGs salvos em `clientes/<cliente>/copy/carrossel-<tema>/` e aprendizado registrado
- [ ] Branch no padrão + PR aberto
