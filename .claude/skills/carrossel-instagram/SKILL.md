---
name: carrossel-instagram
description: >-
  Cria carrossel de Instagram no formato 4:5, na identidade visual do cliente, e
  exporta cada slide como PNG 1080x1350 pronto para postar. Gera um HTML
  autocontido com preview em frame do Instagram (arrastável) e roda a exportação
  em Playwright sem deformar o layout. Use sempre que alguém pedir "monta um
  carrossel pro Instagram", "carrossel sobre X para o cliente Y", "quero os
  slides em PNG pra postar", "transforma essa copy em carrossel", ou quando uma
  copy/roteiro aprovado precisar virar peça visual para o feed. Pergunte a
  identidade da marca antes de gerar, não invente cor, fonte nem @.
---

# Carrossel de Instagram: gerar, revisar e exportar

## O que esta skill faz

Transforma um tema ou uma copy aprovada em um **carrossel de Instagram completo**:

1. Um arquivo HTML autocontido, com preview em frame do Instagram (arrastável).
2. Slides em **4:5**, com barra de progresso e seta de swipe embutidas em cada slide.
3. Exportação de cada slide como **PNG 1080x1350**, pronto para upload.

Cada slide é uma imagem independente: a barra e a seta fazem parte da arte, não são
interface por cima.

## Arquivos desta skill

- **`assets/modelo-carrossel.html`** — o template. Duplique e edite. Já vem com 7 slides de
  exemplo demonstrando todos os componentes.
- **`assets/exportar-slides.py`** — exportação em Playwright, já testada.

## Regra de ouro: pergunte a identidade antes de gerar

Não invente marca. Levante antes (ou peça):

1. **Nome da marca** (aparece no primeiro e no último slide)
2. **@ do Instagram**
3. **Cor primária** (hex). Se não tiver, proponha e confirme.
4. **Logo** (SVG, inicial da marca, ou sem logo)
5. **Tipografia**: serifada no título + sans no corpo (editorial), tudo sans (moderno), ou
   fontes específicas do Google Fonts
6. **Tom**: profissional, direto, provocativo, minimalista
7. **Imagens** (foto de perfil, prints, produto)

Se o cliente já tem pasta em `clientes/<cliente>/`, leia `contexto/` e `CLAUDE.md` antes de
perguntar: boa parte disso já está lá. Salve o resultado em `clientes/<cliente>/copy/`.

---

## Passo 1: derivar a paleta de UMA cor

A partir da cor primária, monte os 6 tokens (é o objeto `BRAND` no template):

| Token | Como derivar |
| --- | --- |
| `primary` | a cor do cliente. Barra de progresso, ícones, tags |
| `light` | primária clareada ~20%. Tags no escuro, pills |
| `dark` | primária escurecida ~30%. Texto do CTA, âncora do gradiente |
| `lightBg` | branco quebrado com a temperatura da marca. **Nunca `#fff` puro** |
| `lightBorder` | um tom mais escuro que `lightBg`. Divisórias |
| `darkBg` | quase preto com tinta da marca (quente `#1A1918`, frio `#0F172A`) |

Gradiente da marca: `linear-gradient(165deg, dark 0%, primary 50%, light 100%)`.

## Passo 2: tipografia

| Estilo | Título | Corpo |
| --- | --- | --- |
| Editorial / premium | Playfair Display | DM Sans |
| Moderno / limpo | Plus Jakarta Sans 700 | Plus Jakarta Sans 400 |
| Acolhedor | Lora | Nunito Sans |
| Técnico / afiado | Space Grotesk | Space Grotesk |
| Expressivo | Fraunces | Outfit |
| Clássico | Libre Baskerville | Work Sans |

Escala fixa: título 28 a 34px peso 600, entrelinha 1.1 a 1.15 · corpo 14px entrelinha 1.5 ·
tag 10px peso 600 espaçamento 2px em caixa alta · número de passo 26px peso 300 · miúdo 11 a 12px.

**Ao trocar a fonte, troque também o `<link>` do Google Fonts no `<head>`.**

## Passo 3: escrever os slides

Sequência padrão (7 é o ideal, pode variar de 5 a 10):

| # | Tipo | Fundo | Função |
| --- | --- | --- | --- |
| 1 | Capa | claro | O gancho. Tem que segurar o scroll |
| 2 | Problema | escuro | O que está quebrado |
| 3 | Virada | gradiente | A resposta, com caixa de citação |
| 4 | Entregas | claro | Lista de benefícios |
| 5 | Profundidade | escuro | Diferenciais, pills |
| 6 | Como fazer | claro | Passos numerados |
| 7 | CTA | gradiente | **Sem seta. Barra em 100%** |

Regras:

- **Alterne claro e escuro** para criar ritmo.
- O primeiro slide lidera com proposta de valor ou afirmação forte, nunca com descrição.
- O último não tem seta: é assim que a pessoa sabe que acabou.
- Adapte a sequência ao conteúdo. Nem todo carrossel precisa de slide de problema.

No template, cada slide é um objeto no array `SLIDES` com `fundo` (`light`, `dark` ou
`gradient`) e `corpo`. A barra de progresso e a seta são **geradas automaticamente** a
partir do índice, então nunca ficam fora de sincronia com a quantidade de slides.

Componentes prontos no template: `tag()`, `titulo()`, `paragrafo()`, `lockup()`, `pill()`,
`pillRiscada()`, `caixaCitacao()`, `linhaBeneficio()`, `passo()`, `amostraCor()`, `botaoCta()`.

### Layout

- Padding padrão `0 36px`, e **`padding-bottom: 52px` sempre**, para o texto não encostar na
  barra de progresso.
- Capa e CTA usam `justify-content: center`. Slides de conteúdo usam `flex-end`, com o texto
  embaixo e respiro em cima.

---

## Passo 4: exportar

```bash
python3 exportar-slides.py carrossel.html slides/
```

Sai `slide_1.png` ... `slide_N.png`, todos 1080x1350. O script detecta a quantidade de
slides sozinho.

### Por que o layout não pode ser redimensionado

O carrossel é desenhado com **420px** de largura. A exportação usa o `device_scale_factor`
do Playwright (1080 / 420 = 2.5714) para renderizar em alta densidade. O layout continua em
420px e a imagem sai em 1080px, idêntica ao preview.

**Se alguém trocar a viewport para 1080px, o layout reflui e tudo quebra:** fonte minúscula,
espaçamento errado, imagem redimensionada. Nunca altere a largura do `.ig-frame`.

### Erros que já custaram retrabalho

| Erro | O que acontece | Correção |
| --- | --- | --- |
| Viewport em 1080x1350 | Layout reflui e distorce | Viewport 420x525 + `device_scale_factor` |
| Gerar HTML por shell script | `$`, crase e número viram variável de shell | Gere o HTML com Python ou com a ferramenta de escrita de arquivo |
| Não esperar as fontes | Título sai na fonte de fallback | `wait_for_timeout(3000)` após carregar |
| Não esconder o frame do Instagram | O PNG sai com cabeçalho, dots e legenda | Esconder `.ig-header,.ig-dots,.ig-actions,.ig-caption` |
| Imagem local com extensão errada | Não renderiza | Cheque com `file` e use o MIME certo no base64 |

Imagens do cliente devem ir **embutidas em base64** no HTML, para o arquivo ser
autocontido. O script também aceita imagem em caminho relativo, porque abre o arquivo via
`file://`.

### Chromium no ambiente remoto

O Chromium já vem instalado. Se a versão do pacote `playwright` não bater com a do binário,
o script cai sozinho em `/opt/pw-browsers/chromium`. **Não rode `playwright install`.**
Para apontar outro binário: `CHROMIUM_PATH=/caminho/para/chrome`.

---

## Passo 5: revisar antes de entregar

Mostre o preview e **passe slide a slide** antes de exportar. Corrija o slide específico que
estiver errado, não regenere o carrossel inteiro, a não ser que a direção mude de verdade.

Checklist:

- [ ] O slide 1 para o scroll sozinho?
- [ ] Nenhum texto encosta na barra de progresso?
- [ ] Claro e escuro alternam?
- [ ] O último slide está sem seta e com a barra em 100%?
- [ ] O contador bate com a quantidade real de slides?
- [ ] As fontes carregaram no PNG (não caiu em fallback)?
- [ ] Cor, @ e nome da marca conferem com a identidade do cliente?
