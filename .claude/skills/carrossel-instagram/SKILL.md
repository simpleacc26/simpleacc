---
name: carrossel-instagram
description: >-
  Cria carrossel de Instagram na identidade do cliente: HTML swipeable com
  preview na moldura do Instagram e export de cada slide em PNG 1080x1350 (4:5)
  pronto pra postar, mais a legenda. Deriva a paleta inteira de UMA cor da
  marca, monta o arco de 7 slides (gancho, dor, virada, entregáveis, detalhe,
  passo a passo, CTA) com barra de progresso e seta de swipe embutidas na
  imagem. Use sempre que alguém pedir "carrossel pro Instagram", "carrossel do
  cliente X", "posts em carrossel", "slides pro feed", "transforma esse
  conteúdo/estratégia/roteiro em carrossel", "criativo de carrossel pro
  anúncio", ou quiser exportar slides prontos pra postagem. Pergunta a marca
  antes de gerar, não inventa identidade.
---

# Carrossel de Instagram: do gancho ao PNG pronto pra postar

## O que esta skill faz

Transforma um tema (ou uma estratégia, um roteiro, uma copy que já existe) em
**carrossel de Instagram completo**:

1. um **HTML autocontido** com os slides em 4:5 e a moldura do Instagram em
   volta, para a pessoa arrastar e aprovar antes de qualquer export;
2. os **PNGs 1080x1350**, um por slide, prontos para subir direto no app;
3. a **legenda** do post.

Cada slide já sai com **barra de progresso e seta de swipe embutidas na
imagem** (não é UI por cima: é parte do PNG), na identidade do cliente.

## Arquivos desta skill

- **`references/intake-marca.md`**: as 7 perguntas de marca, os atalhos
  (site, brandbook, pasta do cliente no repo) e como embutir imagem em base64.
- **`references/sistema-visual.md`**: como derivar os 6 tokens de cor de uma
  única cor, o gradiente, os pares de fonte e a escala de tamanhos.
- **`references/slides-e-componentes.md`**: anatomia do slide, barra e seta,
  a sequência dos 7 slides e a biblioteca de componentes.
- **`references/exportacao.md`**: como rodar o export, por que funciona e os
  erros clássicos.
- **`assets/modelo-carrossel.html`**: carrossel de 7 slides funcionando, com o
  bloco "PALETA, TROQUE AQUI" no topo. É daqui que você parte.
- **`assets/exportar-slides.py`**: o export (Playwright, PNG 1080x1350).

## O fluxo (siga nesta ordem)

```
1. INTAKE     → marca, cor, fonte, tom, imagens + tema e CTA do post
2. SISTEMA    → derivar os 6 tokens e escolher o par de fontes
3. ROTEIRO    → escrever os 7 slides em texto e confirmar antes de codar
4. HTML       → montar em cima do modelo (420px, moldura do IG)
5. REVISÃO    → mostrar o preview, corrigir slide a slide
6. EXPORT     → PNGs 1080x1350 + conferência
7. ENTREGA    → salvar na pasta do cliente + legenda + commit/PR + aprendizados
```

### Passo 1: Intake

Siga **`references/intake-marca.md`**. Nome da marca, @, cor principal, logo,
fonte, tom, imagens, mais tema, público e CTA.

**Se o cliente já existe no repo**, leia `clientes/<cliente>/CLAUDE.md`,
`contexto/` e `aprendizados.md` primeiro: metade das respostas está lá. Se a
pessoa mandou URL do site ou brandbook, tire de lá e confirme a paleta.

Sem marca definida, **não gere**. Carrossel bonito com identidade inventada é
retrabalho garantido. A única exceção é sessão autônoma: assuma o mais
provável, registre a premissa na entrega e siga.

### Passo 2: Sistema visual

Derive os 6 tokens (`--brand-primary`, `--brand-light`, `--brand-dark`,
`--light-bg`, `--light-border`, `--dark-bg`) e escolha o par de fontes conforme
**`references/sistema-visual.md`**. Cheque o contraste do texto branco sobre o
gradiente e do botão de CTA antes de seguir: marca clara costuma reprovar.

### Passo 3: Roteiro antes do código

Escreva os 7 slides **em texto** (tag, título, corpo, componente de cada um) e
confirme. Corrigir copy em lista é rápido; corrigir depois de montado o HTML,
não. A sequência padrão está em **`references/slides-e-componentes.md`**, e ela
se adapta ao tema: nem todo carrossel precisa de slide de "problema".

O slide 1 tem uma função só: **parar o scroll**. Promessa ou afirmação ousada,
nunca descrição da empresa.

### Passo 4: Montar o HTML

Copie o `assets/modelo-carrossel.html`, troque os 6 tokens, as fontes e o
conteúdo. Guarde em
`clientes/<cliente>/copy/AAAA-MM-DD-carrossel-<tema>/carrossel.html`.

Inegociáveis:

- **`.ig-frame` com 420px exatos.** Todo o layout foi calibrado nessa base e o
  export depende dela.
- **Gere o arquivo com Python** (`Path.write_text()`), nunca com heredoc de
  shell: shell interpola `$`, crase e número dentro do HTML.
- **Imagem em base64** dentro do HTML, com o MIME conferido no `file`.
- **Zero travessões** na copy (regra da casa: "fica com cara de IA"). Vírgula,
  dois-pontos, ponto ou parênteses. Vale para os slides e para a legenda;
  comentário interno do código pode.

### Passo 5: Revisão

Mostre o preview e peça para a pessoa arrastar os 7 slides. Corrija **o slide
apontado**, não o carrossel inteiro. Só refaça do zero se a direção mudar.

Antes de exportar, confira você mesmo: texto encostando na barra de progresso,
título estourando para uma quarta linha, contraste em cima do gradiente.

### Passo 6: Export

```bash
pip install playwright      # só na primeira vez
python3 .claude/skills/carrossel-instagram/assets/exportar-slides.py \
  clientes/<cliente>/copy/AAAA-MM-DD-carrossel-<tema>/carrossel.html
```

Detalhes e solução de problemas em **`references/exportacao.md`**. Confira que
os PNGs saíram **1080x1350** e abra pelo menos o slide 1, um do meio e o
último antes de entregar.

### Passo 7: Entrega

Na pasta do cliente:

```
clientes/<cliente>/copy/AAAA-MM-DD-carrossel-<tema>/
├── carrossel.html        # fonte editável
├── legenda.md            # legenda + hashtags + CTA
└── slides/               # slide_1.png ... slide_7.png (1080x1350)
```

Mande os PNGs na conversa, na ordem. Escreva a legenda com o mesmo tom do
carrossel: primeira linha que segura o scroll, contexto curto, CTA igual ao do
slide final.

Depois: `git add`, commit em português no imperativo, push e PR (branch
`cliente/<cliente>/<assunto>`). E registre em
`clientes/<cliente>/aprendizados.md` o que funcionou (ângulo do gancho, paleta,
tom) para o próximo carrossel começar melhor.

## Checklist antes de dizer "pronto"

- [ ] Identidade é a do cliente (cor, fonte e tom confirmados, nada inventado)
- [ ] 6 tokens no `:root`, zero cor solta no meio do HTML
- [ ] Slide 1 é gancho, não descrição
- [ ] Fundos alternando claro e escuro; último slide em gradiente
- [ ] Barra de progresso em todos; seta em todos **menos** no último
- [ ] Nenhum texto por cima da barra (`padding-bottom:52px`)
- [ ] Zero travessões na copy e na legenda
- [ ] Imagens embutidas em base64, com o MIME certo
- [ ] PNGs conferidos: quantidade certa, todos 1080x1350, fonte carregada
- [ ] Salvo na pasta do cliente, com legenda, commit e PR
- [ ] `aprendizados.md` atualizado
