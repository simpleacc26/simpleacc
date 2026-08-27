---
name: estrategia-completa-clientes
description: >-
  Gera o documento de Estratégia Completa de um cliente (modelo Simple Acc) a
  partir da transcrição ou das notas de uma reunião de onboarding, e entrega
  como PDF diagramado na identidade da Simple. Use sempre que alguém do time
  precisar montar a estratégia inicial de um cliente novo, "replicar a
  estratégia da Luana/Thaina para o cliente X", transformar um onboarding em
  documento de estratégia, gerar copy de funil/quiz/anúncios/criativos/cadência
  para um cliente, ou criar o material que inicia um projeto, mesmo que não
  digam explicitamente "documento de estratégia". Cobre desde a extração das
  informações do onboarding até o PDF validado e versionado.
---

# Estratégia Completa para Clientes: gerador do documento Simple Acc

## O que esta skill faz

Pega o **levantamento de um onboarding** (transcrição, notas do Gemini/Meet,
áudio transcrito ou um resumo escrito) e produz a **Estratégia Completa** do
cliente: o PDF diagramado, na identidade da Simple, que abre o projeto e
sustenta a call de estratégia.

O valor está em quatro coisas que o time erra quando faz na mão:

1. **Extrair a estratégia certa** do onboarding, interpretando e não transcrevendo.
2. **Seguir a estrutura comprovada**, adaptada ao tipo de funil e ao público.
3. **Escrever copy que não exclui metade do público** (ver `regras-de-copy.md`).
4. **Entregar diagramado**, uma ideia por página, não um textão convertido.

## Mudou desde a versão anterior desta skill

- **O entregável é um PDF diagramado**, não mais um Google Doc formatado.
  Validado na Thaina Elvira e repetido na Luana Isse, 23 páginas. O caminho do
  Doc virou alternativa, para quando o cliente precisa de documento editável.
- **Existe `references/regras-de-copy.md`**, com sete regras que saíram de erro
  em cliente real. A primeira delas, linguagem neutra em gênero, foi o erro mais
  caro do projeto Luana e não estava escrito em lugar nenhum.
- **A seção do quiz define o índice, os pesos, o resultado nomeado, as 4 faixas
  e a regra de corte**, e não só as perguntas. Sem isso, quem implementa decide
  sozinho e o funil sai diferente da estratégia.
- **Os 20 criativos entram escritos**, não como lista de ideia.

## Arquivos desta skill

- **`references/extracao-onboarding.md`**: o que extrair do onboarding e como
  inferir o que faltar.
- **`references/regras-de-copy.md`**: as regras inegociáveis de escrita.
  **Leia antes de escrever a primeira linha.**
- **`references/estrutura-documento.md`**: as seções, o detalhe de cada uma e a
  adaptação por tipo de funil e por público.
- **`references/entrega-pdf.md`**: a forma do PDF, a sequência de páginas, a
  validação obrigatória e a geração.
- **`references/entrega-drive.md`**: o caminho alternativo, Google Doc
  formatado, para quando o cliente precisa editar e comentar.

Referência viva no repositório:
`clientes/luana-isse/estrategia/2026-08-06-estrategia-completa-luana-isse.html`
(fonte editável do PDF de 23 páginas).

## O fluxo (siga nesta ordem)

```
1. EXTRAÇÃO    → ler o onboarding inteiro e preencher o mapa estratégico
2. ARQUITETURA → tipo de funil, frentes, índice do quiz, big idea, inimigo
3. REDAÇÃO     → escrever no template, uma ideia por página
4. VALIDAÇÃO   → travessões + placeholders + paginação + leitura de gênero
5. PDF         → navegador headless, A4, sem margens
6. ENTREGA     → PDF na sessão + HTML e PDF versionados + aprendizados + PR
```

Não pule a extração. Gerar copy sem entender o ICP, as frentes e o gargalo é o
caminho mais rápido para refazer tudo. Se o onboarding não cobrir um ponto
crítico, **assuma o padrão mais provável, sinalize a premissa no documento** e
siga. Não trave esperando informação.

### Passo 1: Extração

Leia o material inteiro antes de escrever qualquer coisa: transcrições
completas, não só resumos. O que personaliza o documento mora nas falas.

Use o framework de **`references/extracao-onboarding.md`**. Três campos que a
versão anterior desta skill não pedia e que mudam a copy inteira:

- **O que o cliente se recusa a prometer.** A Luana não promete resultado
  financeiro porque ela mesma ainda não está no número.
- **Termos proibidos em anúncio.** Clientes maduros têm palavras que são entrega,
  não promessa.
- **O gênero real do público.** Não o do cliente. Ver `regras-de-copy.md`.

Ao final, escreva um resumo de 8 a 12 linhas do que extraiu e confirme com a
pessoa. Rodando de forma autônoma, registre as premissas numa nota no topo.

### Passo 2: Arquitetura

Antes de redigir, feche: tipo de funil, frentes e split de mídia, **o inimigo
nomeado**, a big idea por frente, o índice do quiz com sigla e nome, e a régua
de qualificação em 4 faixas.

**O inimigo nomeado é a âncora.** Um problema com nome próprio faz o documento
fechar: o quiz mede o tamanho dele, o anúncio o acusa, o método o elimina. Se o
cliente tem palavra própria para o problema, use a dele.

### Passo 3: Redação

Escreva seguindo `references/estrutura-documento.md`, com a forma e a sequência
de páginas de `references/entrega-pdf.md`.

- **Uma ideia por página.** Seção que não cabe vira parte 1 e parte 2. Nunca
  esprema, nunca desça a fonte abaixo de 10pt.
- **Nada genérico.** Cada box, exemplo e número vem do mapa da extração.
- **Peça a frase do cliente antes de escrever do zero.** Alguns produzem
  narrativa melhor que a maioria dos redatores, e a validação é imediata porque
  reconhecem a própria voz.

### Passo 4: Validação (obrigatória)

`grep -c '{{'` = 0, `grep -c '—'` = 0, paginação `TODAS-AS-PAGINAS-OK`, e a
**leitura de gênero**, que nenhum script pega. Detalhe em `entrega-pdf.md`.

### Passo 5: PDF

Navegador headless, A4, sem margens e sem cabeçalho do navegador. Sem navegador
no ambiente, entregue o HTML paginado com a instrução de imprimir pelo Chrome.

### Passo 6: Entrega e memória

1. Envie o PDF na sessão.
2. Salve **HTML e PDF** em `clientes/<cliente>/estrategia/`, com data no nome.
   O HTML é a fonte: é ele que permite gerar a `-v2` quando a oferta mudar.
3. Registre em `clientes/<cliente>/aprendizados.md`: data, "estratégia completa
   criada", e as decisões estruturais (inimigo nomeado, índice, faixas).
4. Se a oferta ou o ticket mudarem no documento, **atualize os arquivos vivos do
   cliente** (CLAUDE.md, README, contexto) para não deixar divergência.
5. Commit numa branch `cliente/<cliente>/estrategia` e PR.

## Checklist antes de entregar

- [ ] Onboarding lido por inteiro; mapa preenchido; premissas sinalizadas
- [ ] Extraído o que o cliente se recusa a prometer e os termos proibidos
- [ ] Inimigo nomeado definido e usado como âncora do documento
- [ ] Quiz com 9 passos, as 2 porteiras no fim, índice, pesos, resultado nomeado, 4 faixas e regra de corte
- [ ] **Pesos rodados em todas as combinações**, com a distribuição documentada
- [ ] 20 criativos escritos: 5 estáticos, 5 carrosséis, 10 roteiros de vídeo
- [ ] **Leitura de gênero feita**: nenhum adjetivo concorda com quem lê
- [ ] Nenhuma promessa de resultado financeiro, se o cliente recusa
- [ ] Prova social dentro da régua acordada, com autorização pendente sinalizada
- [ ] Zero travessões; zero placeholders; separadores com "·"; intervalos com "a"
- [ ] Paginação OK e PDF gerado do HTML final
- [ ] PDF enviado; HTML e PDF versionados; aprendizados; arquivos vivos; PR
