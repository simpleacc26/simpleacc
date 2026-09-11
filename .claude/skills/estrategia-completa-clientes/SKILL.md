---
name: estrategia-completa-clientes
description: >-
  Gera a Estratégia Completa e as Copies do Funil de um cliente da Simple: PDF
  diagramado na identidade navy + dourado, com big idea, régua de linguagem,
  quiz com os padrões nomeados, página de diagnóstico em 9 blocos, 25 criativos
  escritos, cadência de 12 dias e recomendações estratégicas. É o documento
  irmão do Roadmap de 90 dias. Use sempre que alguém do time precisar montar a
  estratégia inicial de um cliente novo, transformar um onboarding em documento
  de estratégia, gerar copy de funil, quiz, anúncios ou cadência para um
  cliente, ou criar o material que inicia um projeto, mesmo que não digam
  explicitamente "documento de estratégia".
---

# Estratégia Completa e Copies do Funil

## O que esta skill faz

Pega o **material de base de um cliente** (transcrição da call de vendas, call
de onboarding, canvas, pesquisa que o cliente enviou) e produz a **Estratégia
Completa**: o PDF que acompanha o Roadmap de 90 dias e traz a **copy inteira do
funil, pronta para implementar**.

É o **documento irmão do roadmap**. O roadmap diz o que fazer e em que ordem; a
estratégia entrega o texto de cada peça. Mesma identidade visual, mesmo CSS,
mesma régua de qualidade.

Referências vivas (o padrão atual da casa):
`clientes/delphis-fonseca/` e `clientes/adriana-brunelly/estrategia/2026-09-11-estrategia-completa-funil-quiz.html`.

> **Mudou em 09/2026.** A versão anterior desta skill entregava um Google Doc de
> texto com 8 seções. **Não é mais isso.** O padrão é PDF diagramado, 6 seções e
> as peças listadas abaixo. Se você encontrar um documento de cliente no formato
> antigo, ele é legado.

## O fluxo (siga nesta ordem)

```
1. EXTRAÇÃO   → ler todo o material e preencher o mapa estratégico
2. DECISÕES   → big idea, régua de linguagem, padrões do quiz, régua de segmentação
3. REDAÇÃO    → escrever as 6 seções no template, 100% na realidade do cliente
4. VALIDAÇÃO  → zero travessões + zero placeholders + paginação OK
5. PDF        → navegador headless (mesmos comandos do roadmap)
6. ENTREGA    → enviar o PDF + versionar HTML e PDF + aprendizados + commit/PR
```

### Passo 1 · Extração

Leia **todo** o material antes de escrever qualquer coisa: transcrições
inteiras, não só resumos. Use o mapa de **`references/extracao-onboarding.md`**.

Se o cliente já tiver roadmap, **leia o roadmap primeiro**: a esteira, a
matemática, a narrativa e a régua de linguagem já foram decididas lá e os dois
documentos não podem divergir em nenhum número.

### Passo 2 · As quatro decisões que vêm antes da copy

Nenhuma linha é escrita antes destas quatro:

1. **A big idea.** A virada de chave que reposiciona o problema. Não é o
   produto, é a frase que faz o ICP pensar "é exatamente sobre mim".
2. **A régua de linguagem.** O que o projeto **fala** e o que **não fala**,
   com as palavras exatas. É o que impede a copy de escorregar para jargão de
   marketing ou para promessa que a plataforma reprova.
3. **Os padrões do quiz** (3 a 5, normalmente 4). O quiz não devolve um texto
   genérico: devolve **o nome do padrão da pessoa**. Nomeie o fenômeno, nunca
   a pessoa. Defina qual pergunta determina o padrão e como o empate resolve.
4. **A régua de segmentação.** Qualificado, a nutrir e fora por ora, com o
   critério numérico e o destino de cada um.

### Passo 3 · Redação

Copie `assets/modelo-estrategia.html` para
`clientes/<cliente>/estrategia/AAAA-MM-DD-estrategia-completa.html` e escreva
seção a seção seguindo **`references/estrutura-documento.md`**. Regras:

- **Tudo na realidade do cliente.** Cada exemplo, número e frase vem do
  material dele. A linguagem é a do nicho, não a de marketeiro.
- **Zero travessões.** Vírgula, dois-pontos, ponto ou parênteses. Separador de
  kicker: "·". Intervalos com "a" (de 30 a 60 segundos).
- Onde não houver prova real, use `[DEPOIMENTO]` como espaço reservado.
  **Nunca invente case, número ou depoimento.**
- Páginas com altura fixa: se um bloco crescer, crie outra parte da mesma
  seção em vez de espremer.

### Passo 4 · Validação (obrigatória)

Mesma régua do roadmap, em **`references/validacao-e-pdf.md`**: placeholders,
travessões e o script de estouro de página (esperado: `TODAS-AS-PAGINAS-OK`).

### Passo 5 · PDF

Comandos e fallbacks em `references/validacao-e-pdf.md`.

### Passo 6 · Entrega e memória

1. Envie o PDF na sessão.
2. Salve **HTML + PDF** em `clientes/<cliente>/estrategia/`.
3. Registre em `aprendizados.md`: data, "estratégia criada", a big idea, os
   padrões do quiz e a régua de segmentação.
4. Atualize `CLAUDE.md` do cliente com a big idea e a régua de linguagem, que
   valem para toda peça futura.
5. Commit na branch da sessão e PR.

## Sobre entregar no Drive

O PDF é o entregável. Se pedirem uma versão editável, o MCP do Drive
**converte HTML em Google Doc formatado direto no upload** (`create_file` com
`contentMimeType: "text/html"`): títulos, negrito, listas e tabelas vêm certos.
**Cuidado:** formatação dentro de célula de tabela se perde e vira `**`
literal, então células de tabela vão em texto puro.

## Checklist antes de entregar

- [ ] Todo o material lido por inteiro, e o roadmap lido se já existir
- [ ] Nenhum número diverge do roadmap (esteira, ticket, meta, conversão, verba)
- [ ] Big idea, régua de linguagem, padrões do quiz e régua de segmentação decididos antes da copy
- [ ] As 6 seções presentes, nada genérico copiado de outro cliente
- [ ] 25 criativos escritos (15 roteiros de vídeo, 5 estáticos, 5 carrosséis)
- [ ] Cadência na voz do cliente, com os 5 níveis de follow-up
- [ ] Recomendações com o olhar crítico da Simple, sem suavizar
- [ ] Zero travessões, zero placeholders, paginação OK, PDF gerado
- [ ] PDF enviado, HTML e PDF versionados, aprendizados e CLAUDE.md atualizados, PR aberto
