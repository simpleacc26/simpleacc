# Documento de Estratégia — Funil de Quiz (PDF formatado)

Fonte do PDF `Estrategia_Simple_Acc__Romulo_Heleno__Funil_de_Quiz.pdf` (pasta acima).

Identidade visual: modelo **Simple Acc / Pâmella Mello** — fundo claro editorial,
capa navy com gradiente, títulos em Playfair Display, corpo em EB Garamond, labels
em caixa-alta espaçada, cards de métrica, blocos de citação navy e callouts laterais.

## Como re-renderizar

Requisitos: Node + Playwright (Chromium) e as fontes `.woff2` desta pasta (subsets
estáticos de Playfair Display e EB Garamond, já com glifos latinos).

```bash
node render.cjs   # gera o PDF a partir de estrategia-funil-quiz.html
```

O `render.cjs` usa header/footer nativos do Chromium (repetidos em todas as páginas)
e margens Letter 64/56/56/56. Editar o conteúdo em `estrategia-funil-quiz.html`.

## Estrutura (8 seções)

Capa · 00 Contexto · 01 Big Idea · 02 Quiz (10 perguntas SPIN) · 03 Página de
Aplicação · 04 Anúncios · 05 Diagnóstico · 06 Cadência 12 dias · 07 Tarefas ·
08 Recomendações · Fechamento.
