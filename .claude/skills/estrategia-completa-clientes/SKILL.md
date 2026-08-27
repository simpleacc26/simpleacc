---
name: estrategia-completa-clientes
description: >-
  Gera a Estratégia Completa de um cliente da Simple: PDF na identidade navy +
  dourado, seguindo a estrutura validada na Luana Isse (funil de lead dinâmico),
  com a copy inteira do funil pronta para implementar (big idea, quiz, página
  pós-quiz, 20 criativos, cadência de 12 dias e recomendações). Use sempre que
  alguém do time precisar montar a estratégia inicial de um cliente novo,
  "replicar a estratégia da Luana para o cliente X", transformar um onboarding
  ou uma call de vendas em documento de estratégia, gerar copy de
  funil/quiz/anúncios/cadência para um cliente, ou criar o material que inicia um
  projeto, mesmo que não digam explicitamente "documento de estratégia".
---

# Estratégia Completa para Clientes · gerador do PDF no modelo Simple Acc

## O que esta skill faz

Pega a **matéria-prima de um cliente** (call de onboarding, call de vendas,
canvas de produto e ICP, anotações) e produz a **Estratégia Completa**: o PDF
de aproximadamente 21 a 23 páginas que entrega a **copy inteira do funil pronta
para implementar**, na identidade visual da Simple.

> **O entregável é um PDF paginado, não um Google Doc.** Versões antigas desta
> skill mandavam entregar como Doc formatado no Drive, com 8 seções. Isso está
> errado e gerou retrabalho, duas vezes, em clientes diferentes.
>
> **A referência agora está commitada, em `assets/exemplos/`:** a Luana Isse
> (11/08, padrão-ouro, B2B com SDR) e o Rafael Cobra (13/08, o mais completo,
> B2C e cliente que executa sozinho). **Leia os dois antes de escrever.** O do
> Rafael traz uma tabela do que muda de um cliente para o outro.
>
> Antes, esse padrão vivia só num PDF no Drive, e foi exatamente por isso que
> duas sessões erraram o formato. **Entregável que define padrão tem que ser
> commitado, não só compartilhado.**

O valor está em três coisas:
1. **Extrair a estratégia certa** da matéria-prima (interpretar, não transcrever).
2. **Seguir a estrutura validada** de 6 seções, adaptada ao nicho e ao ticket.
3. **Entregar em PDF**, paginado, com zero travessões e paginação validada.

## Relação com o roadmap

São dois documentos diferentes e não se misturam:

- **Roadmap Estratégico de 90 dias** (skill `roadmap-estrategico-90-dias`): o
  plano de execução, fases, passos, metas e checkpoints. É o que o cliente faz.
- **Estratégia Completa** (esta skill): a copy do funil, pronta para implementar.
  É o que o cliente publica.

Por isso a Estratégia Completa **não tem** bloco de tarefas de onboarding, nem
divisão de responsabilidades, nem matemática de abordagens por dia: tudo isso
vive no roadmap. Repetir aqui só cria duas fontes de verdade que divergem.

## Arquivos desta skill

- **`references/extracao-onboarding.md`**: o que extrair da matéria-prima.
- **`references/estrutura-documento.md`**: o documento página a página, as 6
  seções, e como adaptar por tipo de funil e por nicho.
- **`assets/modelo-estrategia.html`**: template HTML com a identidade visual e o
  CSS validado (altura A4 fixa), com o esqueleto das páginas.
- **`references/validacao-e-pdf.md`**: validações obrigatórias e geração do PDF.
- **`references/entrega-pdf.md`**: nome do arquivo, pasta do cliente no Drive e
  os limites reais de upload (PDF de estratégia não sobe pelo MCP).
- **`assets/exemplos/`**: as duas estratégias reais já entregues, com mapa de
  páginas e os componentes a copiar.

## O fluxo (siga nesta ordem)

```
1. EXTRAÇÃO   → ler TODA a matéria-prima e preencher o mapa estratégico
2. ARQUITETURA→ nomear o inimigo e o método, definir os pilares do quiz e a esteira
3. REDAÇÃO    → escrever as 6 seções no template, 100% na realidade do cliente
4. VALIDAÇÃO  → zero travessões + zero placeholders + paginação OK
5. PDF        → navegador headless (com fallbacks)
6. ENTREGA    → enviar o PDF + versionar HTML/PDF + aprendizados + commit/PR
```

### Passo 1 · Extração

Leia **toda** a matéria-prima antes de escrever qualquer coisa (transcrições
inteiras, não só resumos). Preencha o mapa de
**`references/extracao-onboarding.md`**.

Se faltar dado crítico (ticket, quem opera o WhatsApp, corte de qualificação),
pergunte tudo de uma vez. Se estiver rodando de forma autônoma, **assuma o
padrão mais provável, registre a premissa na página 2 do documento** e siga.
Não trave.

### Passo 2 · Arquitetura

Antes de escrever, decida quatro coisas. Elas sustentam o documento inteiro:

1. **O inimigo nomeado.** Um nome proprietário para o problema real
   (Luana: "Ruptura de Valor Percebido"; Camila: "Ruído de Sala"). É o que dá
   território livre ao cliente e o que faz o quiz produzir um resultado que não
   é rótulo genérico.
2. **O método e seus pilares.** De 3 a 5 pilares, **em ordem**, com a frase
   "nessa ordem, porque fora dela não funciona". Os pilares viram o resultado do
   quiz (o "elo/estágio dominante") e o bloco 6 da página pós-quiz.
3. **A esteira.** Carro-chefe (o que este funil vende), portas laterais (só na
   sessão, nunca na mídia) e produto de entrada (existe ou não, e por quê).
4. **As premissas numéricas.** Conversão de sessão, comparecimento, corte de
   qualificação, verba diária de validação e a régua de **custo por sessão
   qualificada comparecida** (referência: até 5% do ticket).

### Passo 3 · Redação

Copie `assets/modelo-estrategia.html` para
`clientes/<cliente>/estrategia/AAAA-MM-DD-estrategia-completa-<cliente>.html` e
escreva seção a seção seguindo `references/estrutura-documento.md`. Regras:

- **Tudo na realidade do cliente.** Cada cena, exemplo e número vem da extração.
  Nada de texto genérico sobrando.
- **Zero travessões.** Use vírgula, dois-pontos, ponto final ou parênteses.
  Separador: "·". Intervalos: "de 30 a 60" (nunca traço).
- A linguagem vem do **vocabulário do cliente e do nicho dele**. O que ele falou
  nas calls vale mais que paráfrase de marketing.
- **A copy é escrita, não descrita.** "Ângulo 1: falar da dor" não serve. O
  documento entrega o texto pronto para colar no gerenciador.
- Páginas com altura fixa: se o conteúdo crescer, crie outra página da mesma
  seção (parte 1, parte 2) em vez de espremer.

### Passo 4 · Validação (obrigatória)

Siga `references/validacao-e-pdf.md`: `grep -c '{{'` na estrutura do template
deve dar 0 (as variáveis `{{nome}}` da copy são conteúdo, não placeholder do
template, e ficam), `grep -c '—'` deve dar 0, e o script de estouro precisa
retornar `TODAS-AS-PAGINAS-OK`.

### Passo 5 · PDF

Comando e fallbacks em `references/validacao-e-pdf.md`. Confira ao menos uma
página densa por screenshot antes de entregar.

### Passo 6 · Entrega e memória

1. **Envie o PDF na sessão.** É o entregável.
2. Salve **HTML + PDF** em `clientes/<cliente>/estrategia/`.
3. Suba o PDF na pasta do cliente no Drive (`3. Estratégia e Tráfego`) quando o
   time pedir. O Drive é distribuição, o Git é memória.
4. Registre em `clientes/<cliente>/aprendizados.md`: data, "estratégia completa
   criada", o inimigo nomeado, os pilares e a esteira.
5. Commit na branch do trabalho e PR.

## Checklist antes de entregar

- [ ] Toda a matéria-prima lida por inteiro
- [ ] Inimigo nomeado, método com pilares em ordem, esteira e premissas definidos
- [ ] As 6 seções presentes, nada genérico copiado de outro cliente
- [ ] Página 2 ("O Funil em Uma Página") com caminho do lead, esteira, o que a
      copy precisa compensar e as premissas assumidas
- [ ] Quiz com 8 perguntas, a de qualificação por último, e regra de segmentação
- [ ] Página pós-quiz com os 9 blocos e as variáveis listadas
- [ ] 20 criativos **escritos**: 5 estáticos, 5 carrosséis, 10 vídeos
- [ ] Regras de compliance do nicho explícitas na seção de anúncios
- [ ] Cadência de 12 dias com os 5 níveis, nomeando quem dispara
- [ ] Recomendações apontando o gargalo real, sem suavizar
- [ ] Zero travessões, paginação OK, PDF gerado e conferido
- [ ] PDF enviado + HTML/PDF versionados + aprendizados + commit/PR
