---
name: estrategia-completa-clientes
description: >-
  Gera a Estratégia Completa e as Copies do Funil de um cliente da Simple: PDF
  diagramado na identidade navy + dourado, com big idea e inimigo nomeado,
  régua de linguagem, quiz com os padrões nomeados, página de diagnóstico em 9
  blocos, 25 criativos escritos, cadência de 12 dias e recomendações
  estratégicas. É o documento irmão do Roadmap de 90 dias. Use sempre que
  alguém do time precisar montar a estratégia inicial de um cliente novo,
  "replicar a estratégia da Luana para o cliente X", transformar um onboarding
  ou uma call de vendas em documento de estratégia, gerar copy de funil, quiz,
  anúncios ou cadência para um cliente, ou criar o material que inicia um
  projeto, mesmo que não digam explicitamente "documento de estratégia".
---

# Estratégia Completa e Copies do Funil

## O que esta skill faz

Pega o **material de base de um cliente** (transcrição da call de vendas, call
de onboarding, canvas de produto e ICP, pesquisa que o cliente enviou) e produz
a **Estratégia Completa**: o PDF de aproximadamente 21 a 25 páginas que
acompanha o Roadmap de 90 dias e traz a **copy inteira do funil, pronta para
implementar**.

É o **documento irmão do roadmap**. O roadmap diz o que fazer e em que ordem; a
estratégia entrega o texto de cada peça. Mesma identidade visual, mesmo CSS,
mesma régua de qualidade.

O valor está em três coisas:

1. **Extrair a estratégia certa** do material (interpretar, não transcrever).
2. **Seguir a estrutura validada** de 6 seções, adaptada ao nicho e ao ticket.
3. **Entregar em PDF**, paginado, com zero travessões e paginação validada.

> **O entregável é um PDF paginado, não um Google Doc.** Versões antigas desta
> skill mandavam entregar como Doc formatado no Drive, com 8 seções. Isso está
> errado e gerou retrabalho em clientes diferentes. Se encontrar um documento de
> cliente no formato antigo, ele é legado.

**Referências vivas.** Os exemplos completos já entregues ficam em
**`assets/exemplos/`** e acompanham a skill, então servem em qualquer sessão,
sem depender do repositório. O padrão atual da casa foi fixado pela estratégia
do **Delphis Fonseca** (08/2026) e seguido na **Adriana Brunelly** (09/2026);
os exemplos commitados da **Luana Isse** (11/08, B2B com SDR) e do **Rafael
Cobra** (13/08, B2C e cliente que executa sozinho) trazem o mapa de páginas e
os componentes a copiar, e o do Rafael tem uma tabela do que muda de um cliente
para o outro. **Leia pelo menos um dos dois antes de escrever.** Se a pessoa
enviar algum desses PDFs na conversa, use como calibragem de tom.

## Relação com o roadmap

São dois documentos diferentes e não se misturam:

- **Roadmap Estratégico de 90 dias** (skill `roadmap-estrategico-90-dias`): o
  plano de execução, fases, passos, metas e checkpoints. É o que o cliente faz.
- **Estratégia Completa** (esta skill): a copy do funil, pronta para
  implementar. É o que o cliente publica.

Por isso a Estratégia Completa **não tem** bloco de tarefas de onboarding, nem
divisão de responsabilidades, nem matemática de abordagens por dia: tudo isso
vive no roadmap. Repetir aqui só cria duas fontes de verdade que divergem.

Os dois usam o mesmo CSS e **nenhum número pode divergir entre eles**: esteira,
ticket, meta, conversão e verba são os mesmos. Quem for gerado depois se ajusta
ao primeiro.

## Arquivos desta skill

- **`references/extracao-onboarding.md`**: o que extrair do material de base.
- **`references/estrutura-documento.md`**: o documento página a página, as 6
  seções, e como adaptar por tipo de funil e por nicho.
- **`assets/modelo-estrategia.html`**: template HTML com a identidade visual e o
  CSS validado (altura A4 fixa), com o esqueleto das páginas.
- **`references/validacao-e-pdf.md`**: validações obrigatórias e geração do PDF.
- **`references/entrega-pdf.md`**: nome do arquivo, pasta do cliente no Drive e
  os limites reais de upload (PDF de estratégia não sobe pelo MCP).
- **`assets/exemplos/`**: as estratégias reais já entregues, com mapa de páginas
  e os componentes a copiar.

## O fluxo (siga nesta ordem)

```
1. EXTRAÇÃO   → ler todo o material e preencher o mapa estratégico
2. DECISÕES   → inimigo e big idea, régua de linguagem, padrões do quiz,
                esteira, régua de segmentação e premissas numéricas
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

Se faltar dado crítico (ticket, quem opera o WhatsApp, corte de qualificação),
pergunte tudo de uma vez. Se estiver rodando de forma autônoma, **assuma o
padrão mais provável, registre a premissa na página 2 do documento** e siga.
Não trave.

### Passo 2 · As decisões que vêm antes da copy

Nenhuma linha é escrita antes destas seis:

1. **O inimigo nomeado e a big idea.** Um nome proprietário para o problema
   real (Luana: "Ruptura de Valor Percebido"; Camila: "Ruído de Sala"; Adriana:
   "o orçamento seco"), e a virada de chave que reposiciona o problema. Não é o
   produto, é a frase que faz o ICP pensar "é exatamente sobre mim".
2. **O método e seus pilares.** De 3 a 5 pilares, **em ordem**, com a frase
   "nessa ordem, porque fora dela não funciona". Os pilares sustentam o
   resultado do quiz e o bloco 6 da página de diagnóstico.
3. **A régua de linguagem.** O que o projeto **fala** e o que **não fala**, com
   as palavras exatas. É o que impede a copy de escorregar para jargão de
   marketing ou para promessa que a plataforma reprova.
4. **Os padrões do quiz** (3 a 5, normalmente 4). O quiz não devolve um texto
   genérico: devolve **o nome do padrão da pessoa**. Nomeie o fenômeno, nunca
   a pessoa. Defina qual pergunta determina o padrão e como o empate resolve.
5. **A esteira e a régua de segmentação.** Carro-chefe (o que este funil vende),
   portas laterais (só na sessão, nunca na mídia), produto de entrada (existe ou
   não, e por quê); e o destino de qualificado, a nutrir e fora por ora, com o
   critério numérico de cada um.
6. **As premissas numéricas.** Conversão de sessão, comparecimento, corte de
   qualificação, verba diária de validação e a régua de **custo por sessão
   qualificada comparecida** (referência: até 5% do ticket).

### Passo 3 · Redação

Copie `assets/modelo-estrategia.html` para
`clientes/<cliente>/estrategia/AAAA-MM-DD-estrategia-completa-<cliente>.html` e
escreva seção a seção seguindo **`references/estrutura-documento.md`**. Regras:

- **Tudo na realidade do cliente.** Cada cena, exemplo, número e frase vem do
  material dele. A linguagem é a do nicho, não a de marketeiro, e o que ele
  falou nas calls vale mais que paráfrase de marketing.
- **A copy é escrita, não descrita.** "Ângulo 1: falar da dor" não serve. O
  documento entrega o texto pronto para colar no gerenciador.
- **Zero travessões.** Vírgula, dois-pontos, ponto ou parênteses. Separador de
  kicker: "·". Intervalos com "a" (de 30 a 60 segundos).
- Onde não houver prova real, use `[DEPOIMENTO]` como espaço reservado.
  **Nunca invente case, número ou depoimento.**
- Páginas com altura fixa: se um bloco crescer, crie outra parte da mesma
  seção (parte 1, parte 2) em vez de espremer.

### Passo 4 · Validação (obrigatória)

Mesma régua do roadmap, em **`references/validacao-e-pdf.md`**: `grep -c '{{'`
na estrutura do template deve dar 0 (as variáveis `{{nome}}` da copy são
conteúdo, não placeholder do template, e ficam), `grep -c '—'` deve dar 0, e o
script de estouro de página precisa retornar `TODAS-AS-PAGINAS-OK`.

### Passo 5 · PDF

Comandos e fallbacks em `references/validacao-e-pdf.md`. Confira ao menos uma
página densa por screenshot antes de entregar.

### Passo 6 · Entrega e memória

1. **Envie o PDF na sessão.** É o entregável.
2. Salve **HTML + PDF** em `clientes/<cliente>/estrategia/`.
3. Suba o PDF na pasta do cliente no Drive (`3. Estratégia e Tráfego`) quando o
   time pedir. O Drive é distribuição, o Git é memória. Detalhes de nome de
   arquivo e limites de upload em `references/entrega-pdf.md`.
4. Registre em `clientes/<cliente>/aprendizados.md`: data, "estratégia completa
   criada", o inimigo nomeado, a big idea, os pilares, os padrões do quiz, a
   esteira e a régua de segmentação.
5. Atualize `CLAUDE.md` do cliente com a big idea e a régua de linguagem, que
   valem para toda peça futura.
6. Commit na branch do trabalho e PR.

## Sobre entregar no Drive

O PDF é o entregável. Se pedirem uma versão editável, o MCP do Drive
**converte HTML em Google Doc formatado direto no upload** (`create_file` com
`contentMimeType: "text/html"`): títulos, negrito, listas e tabelas vêm certos.
**Cuidado:** formatação dentro de célula de tabela se perde e vira `**`
literal, então células de tabela vão em texto puro.

## Checklist antes de entregar

- [ ] Todo o material lido por inteiro, e o roadmap lido se já existir
- [ ] Nenhum número diverge do roadmap (esteira, ticket, meta, conversão, verba)
- [ ] Inimigo nomeado, big idea, pilares em ordem, régua de linguagem, padrões
      do quiz, esteira e premissas decididos antes da copy
- [ ] As 6 seções presentes, nada genérico copiado de outro cliente
- [ ] Página 2 ("O Funil em Uma Página") com caminho do lead, esteira, o que a
      copy precisa compensar e as premissas assumidas
- [ ] Quiz com a pergunta de qualificação por último e regra de segmentação
- [ ] Página de diagnóstico com os 9 blocos e as variáveis listadas
- [ ] 25 criativos **escritos** (15 roteiros de vídeo, 5 estáticos, 5 carrosséis)
- [ ] Regras de compliance do nicho explícitas na seção de anúncios
- [ ] Cadência de 12 dias na voz do cliente, com os 5 níveis de follow-up,
      nomeando quem dispara
- [ ] Recomendações apontando o gargalo real, sem suavizar
- [ ] Zero travessões, zero placeholders, paginação OK, PDF gerado e conferido
- [ ] PDF enviado, HTML e PDF versionados, aprendizados e CLAUDE.md atualizados, PR aberto
