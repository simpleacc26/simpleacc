# Apresentação de Vendas — Simple Acc

Deck de vendas (Full Sales) da **Simple** em HTML, para o closer apresentar na
call. Parte comum (autoridade → diagnóstico → metodologia → produto) + **as 4
ofertas completas** (Implementação, Principal/Consultoria, Downsell, Oferta 3 e
Entrada), com ancoragem de valor, justificativa C.A.F. e preço protagonista.

Base de conteúdo: copy aprovada pelo CEO/closer. Estrutura: modelo Full Sales
(FSS). **Visual: fiel ao Brandbook (Julho)** — off-white dominante + navy
(`#15263C`) + azul dessaturado (`#2E5A99`), fonte **Inter**, limpo e sóbrio.
Sem glow, sem grade 3D, sem azul vívido, sem sobretítulos.

## Stack

- HTML + CSS + JS puro (sem build, sem dependências).
- Fonte **Inter** (auto-hospedada em `assets/fonts/`, variável — funciona offline).
- Sistema de temas por slide: **navy** (capa, seções, preços) e **off-white**
  (conteúdo). Tokens do brandbook ficam no topo de `css/deck.css`.

## Como rodar

Abra `index.html` no navegador. Para servir localmente (recomendado):

```bash
npx serve .       # ou: python3 -m http.server
```

### Controles

| Tecla | Ação |
| ----- | ---- |
| `→` `←` `espaço` | navegar |
| `M` | índice (pular para parte comum ou uma oferta) |
| `F` | tela cheia |
| `P` | imprimir / exportar PDF |
| `#n` na URL | abrir direto no slide `n` (ex.: `index.html#25`) |

## Estrutura do projeto

```
apresentacao-vendas/
├── index.html        → casca + navegação
├── css/deck.css      → sistema visual (tokens, layouts, componentes)
├── js/slides.js      → TODO o conteúdo (textos, entregáveis, preços) ← edite aqui
├── js/deck.js        → render + navegação + índice + scale-to-fit + print
└── assets/           → imagens (ver assets/README.md)
```

**Para editar copy e preços:** mexa só em `js/slides.js`. Cada oferta é montada
pela função `offer({...})` — altere entregáveis, itens de ancoragem (`anchor`),
`total` e os preços (`tablePrice`, `regular`, `hero`, `instal`) em um lugar só.

## O que ainda falta (imagens reais)

O deck está pronto com **placeholders** marcados `[ ... ]`. Veja
`assets/README.md` para a lista do que inserir (foto do Daniel, prints de
depoimentos, tabela de cases com números reais, etc.).

## Deploy

- Plataforma: **Vercel** (site estático, sem build).
- **Root Directory** (na Vercel): `clientes/0-interno-simpleacc-inova/apresentacao-vendas`
- URL de produção: _a definir_

## Status e próximos passos

- [x] Estrutura completa (85 slides): parte comum + 4 ofertas
- [x] Sistema visual fiel ao Figma + navegação + índice + export PDF
- [ ] Inserir imagens reais (foto Daniel, depoimentos, provas, cases)
- [ ] Preencher a tabela de cases com números reais
- [ ] Publicar na Vercel e registrar a URL aqui

## Contatos

- Responsável: Daniel Souza (CEO / closer)
