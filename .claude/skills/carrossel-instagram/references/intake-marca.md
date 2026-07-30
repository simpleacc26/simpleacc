# Intake da marca

Antes de desenhar qualquer slide, levante os itens abaixo. **Pergunte o que
faltar. Não invente cor, fonte nem tom.**

## O que precisa estar respondido

| # | Item | Para que serve | Se faltar |
|---|---|---|---|
| 1 | **Nome da marca** | aparece no primeiro e no último slide | pergunte, é obrigatório |
| 2 | **@ do Instagram** | cabeçalho da moldura e legenda | pergunte, é obrigatório |
| 3 | **Cor primária** (hex) | dela sai a paleta inteira | pergunte, ou peça para descrever e proponha um hex |
| 4 | **Logo** | ícone do lockup e marca d'água | pergunte se tem SVG, se prefere a inicial, ou se é para pular |
| 5 | **Fontes** | par título + corpo | ofereça as três opções abaixo |
| 6 | **Tom** | conduz a copy dos slides | ofereça: profissional, casual, divertido, ousado, minimalista |
| 7 | **Imagens** | foto de perfil, prints, produto | pergunte se tem. Sem imagem o carrossel funciona, com imagem converte mais |

Além disso, você precisa do **tema** e, se a pessoa souber, do **objetivo** do
post (gerar salvamento, levar pro link, aquecer lançamento).

## Como perguntar as fontes sem jargão

Não pergunte "qual Google Font". Pergunte o estilo:

- **Editorial**, título com serifa e corpo sem serifa (tem cara de revista);
- **Moderno**, tudo sem serifa (limpo, tech);
- **Expressivo**, título bem marcante (chama atenção no feed).

Só depois traduza para o par de fontes em `design-system.md`. Se a pessoa já
tiver fontes definidas na marca, use as dela.

## Quando já existe pasta do cliente no repo

Leia **antes de perguntar**:

- `clientes/<cliente>/CLAUDE.md`
- `clientes/<cliente>/contexto/` (ICP, dores, voz do cliente)
- `clientes/<cliente>/aprendizados.md` (o que já funcionou e o que o cliente rejeitou)
- `clientes/<cliente>/estrategia/` e `copy/` (Big Idea, ângulos já usados, paleta se o funil já existe)

Se o cliente já tem funil publicado, a paleta e as fontes estão no `styles.css`
dele. **Reaproveite**, o carrossel tem que parecer da mesma marca que a página.

Chegue na conversa dizendo o que já sabe e pergunte só o buraco que sobrou.

## Quando a pessoa manda um site ou os assets

Derive do material:

- **cor primária**: a cor de botão / destaque, não a cor de fundo;
- **fontes**: as declaradas no CSS do site;
- **tom**: pelo jeito que os títulos do site falam.

Depois **confirme por escrito o que você derivou** ("peguei o azul #3E5C8A do
botão, título em Playfair, tom profissional, fecha?") antes de gerar os slides.

## Imagens enviadas

- Confira o formato real com `file`, um arquivo `.png` costuma ser JPEG por dentro.
- Vão para o HTML em **base64 embutido**, com o MIME correto
  (`data:image/jpeg;base64,...` ou `data:image/png;base64,...`).
- Print de tela é a melhor prova visual para o slide 1, use quando existir.

## Resumo de fechamento do intake

Antes de ir para o desenho, escreva um bloco curto assim:

```
Marca: <nome> (@<handle>)
Cor primária: #XXXXXX  → paleta derivada: primary / light / dark / bg claro / borda / bg escuro
Fontes: <título> + <corpo>
Tom: <tom>
Logo: <svg | inicial | sem logo>
Imagens: <lista, ou "nenhuma">
Tema: <tema>   Objetivo: <objetivo>
Assumi: <o que você decidiu sozinho>
```
