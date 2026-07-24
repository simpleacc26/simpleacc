---
name: gerar-quiz-diag-pag-pos-quiz
description: >-
  Implementa e PUBLICA o funil visual de um cliente (Simple Acc): o quiz, a
  página pós-quiz (relatório/diagnóstico) e o PDF, seguindo a estrutura aprovada
  (modelo Lucas Sobreiro, estrutura espelhada no funil validado da Pâmella). Publica na Vercel e
  entrega o link no final, cria a planilha de leads no Drive do cliente e deixa
  a integração funil→planilha feita E testada, aplicando a identidade visual do
  cliente. Use sempre que alguém pedir para "montar/implementar o funil", "criar
  o quiz", "subir a página do cliente", "publicar o funil na Vercel", "fazer a
  página pós-quiz / o PDF do diagnóstico", ou transformar a copy/estratégia
  aprovada em páginas no ar. Pergunte ao usuário o que faltar do cliente
  (identidade, logo, WhatsApp, pasta do Drive, conta Vercel), não invente.
---

# Gerar Quiz + Diagnóstico + Página Pós-Quiz: implementar, publicar e integrar

## O que esta skill faz
Transforma a **copy/estratégia já aprovada** de um cliente em **páginas no ar**:
1. **Quiz** (uma pergunta por tela, alta conversão)
2. **Página pós-quiz** = relatório/diagnóstico auto-preenchido + botão Baixar PDF + WhatsApp
3. **Publicação na Vercel** (URL limpa, entregue no final)
4. **Planilha de leads no Drive do cliente** + **integração funil→planilha feita e testada**

Tudo na **identidade visual do cliente** (a que for definida na hora).

Stack: HTML/CSS/JS puro, sem dependências, sem build. Há uma **base de
referência aprovada e CONCRETA** em `assets/funil-referencia/`: é o **funil real
do Lucas Sobreiro (identidade Método BIO)**, live em quiz-lucas-sobreiro.vercel.app,
com a estrutura espelhada no funil validado da Pâmella. É o formato top da casa,
já no acabamento final: 9 passos SPIN, qualificação por 2 perguntas-porteira no
fim, tela de loading, relatório com as seções certas e CTAs distribuídos, wordmark,
favicon e paleta reais.

**Use como referência para DUPLICAR e ADAPTAR.** Ao adaptar para o novo cliente,
troque **100%**, não só a copy:
- **Copy** do quiz e do relatório (nunca publique com o texto do Lucas).
- **Identidade**: paleta no `:root` do `styles.css`, wordmark (`.brand-name`/
  `.brand-tag`), favicon, CSS crítico inline nas duas páginas. (A base vem na
  paleta Método BIO só como exemplo de acabamento.)
- **Tela de loading** e **todas as labels de opção** (não deixe resíduo do funil
  do Lucas, ex.: "clínica" num cliente que não é clínica).
- **WhatsApp** (`marca.whatsapp`), **webhook** (`LEADS_ENDPOINT`) e **depoimentos**
  (troque pelos prints reais do cliente). Na base esses três já vêm vazios/genéricos
  de propósito, para não misrotear dados de um cliente para outro.

## Regra de ouro: pergunte o que falta, não invente
Antes de construir, levante o que o cliente precisa fornecer. Se faltar algo
crítico, **pergunte ao usuário** (ou peça o material). Veja a lista completa em
`references/intake-cliente.md`. O essencial:
- A **copy aprovada** (do doc de estratégia / skill `estrategia-completa-clientes`). Sem copy aprovada, não há o que publicar, peça.
- **Identidade visual**: paleta (hex), logo (PNG/SVG), fontes, ou autorização para você propor.
- **WhatsApp** do cliente (destino do CTA).
- **Pasta do cliente no Drive** (onde criar a planilha de leads).
- **Conta Vercel** onde publicar (geralmente o time da empresa).
- Quais **frentes** (se o cliente tiver mais de uma).

Nunca use travessão (traço longo) na copy (regra do cliente: "fica com cara de
IA"). Use vírgula, dois-pontos, parênteses ou ponto final. Faixas como "de X a Y".

## Fluxo (siga na ordem)

```
1. INTAKE   → levantar copy + identidade + assets + contas (perguntar o que faltar)
2. BUILD    → duplicar a base e customizar (copy no flow.js, identidade no styles.css, logo)
3. DEPLOY   → publicar na Vercel (URL limpa), só a subpasta do funil
4. LEADS    → criar planilha no Drive + Apps Script + TESTAR de ponta a ponta
5. ENTREGA  → mandar o link do funil + link da planilha + confirmação de teste
```

### Passo 1: Intake
Use `references/intake-cliente.md`. Confirme a copy aprovada e colete/peça os
assets. Resuma o que recebeu e o que assumiu antes de construir.

### Passo 2: Build
Use `references/arquitetura-funil.md` (estrutura de arquivos, o motor, e os
padrões de conversão obrigatórios: 1ª pergunta já na 1ª tela, auto-avanço,
máscara de WhatsApp, e-mail obrigatório, captura de UTMs, sessionStorage,
acessibilidade, zero dependências). E `references/identidade-visual.md` para
aplicar a identidade do cliente (tokens no `:root`, fontes, logo).
- Duplique `assets/funil-referencia/` para a pasta do novo cliente.
- Troque **toda a copy** em `flow.js` e o texto do relatório em `diagnostico.js`
  pela copy aprovada do cliente.
- Troque os tokens de cor em `styles.css` e o logo.
- Ajuste o número de WhatsApp em `flow.js`.

### Passo 3: Deploy
Use `references/deploy-vercel.md`. Publique **apenas a subpasta do funil**
(nunca a raiz do workspace) na conta/time Vercel do cliente, com **nome de
projeto limpo** para a URL ficar branded e pública.

> 🔒 **TRAVA OBRIGATÓRIA, conta da Simple.** Antes de QUALQUER deploy, confirme
> que está publicando na **conta/time da Simple na Vercel**, nunca numa conta
> pessoal. Rode `vercel whoami` e `vercel teams ls` e cheque se o time da Simple
> aparece e é o alvo do `--scope`. Se aparecer uma **conta pessoal** (ou o time
> da Simple não estiver disponível), **PARE e peça ao usuário para logar/dar
> acesso à conta da Simple**, não deploye. Nunca use a Personal Account como
> escopo. (Passo detalhado em `references/deploy-vercel.md`.)

### Passo 4: Leads + integração (feita E testada)
Use `references/leads-planilha.md`. Crie a planilha no Drive do cliente, configure
o Apps Script, ligue o `LEADS_ENDPOINT` no `app.js`, republique e **teste de
verdade**: envie um lead de teste e confirme que a linha caiu na planilha (com
UTMs). Só considere "pronto" depois do teste passar.

### Passo 5: Entrega
Informe: **link do funil** (raiz, com instrução de usar `?utm_...` no anúncio),
**link da planilha**, e a confirmação de que a integração foi testada. Liste
pendências do cliente, se houver (ex.: depoimentos reais).

## Particularidades e aprendizados (funil Lucas)

Modelo Lucas Sobreiro (estrutura espelhada no funil validado da Pâmella), live em
quiz-lucas-sobreiro.vercel.app. Respeite sempre:

1. **Reescreva 100% da copy** ao adaptar, INCLUSIVE a tela de loading e TODAS as
   labels de opção. Nunca deixe resíduo do funil-modelo (ex.: falar em "leitura
   emocional" num funil de negócio).
2. **Qualificação por 2 perguntas-porteira** (ex.: faturamento + prontidão):
   defina o corte (qualificado vs nutrir). As demais perguntas alimentam o
   diagnóstico, não pontuam.
3. **High ticket:** as opções de "nutrir" NÃO devem ancorar em "algo mais
   barato/pontual"; enquadre como "ainda não é prioridade investir agora".
4. **Não ancore a promessa numa sub-persona única** que parte do público não tem
   (ex.: "a secretária"); mantenha a promessa no nível do negócio (do dono ou de
   quem atende).
5. **Identidade = marca REAL do cliente** (Instagram/brandbook), não uma paleta
   genérica inventada; paleta de exemplo só até o brandbook chegar.
6. **Depoimentos:** prints reais, convertidos para WebP ~520px (funil leve).
   Nunca inventar depoimento.
7. **Make -> Sheets:** a aba de um CSV importado nasce "Untitled" (não "Página1");
   descubra a aba real via RPC `google-sheets@2/rpcSheet` antes de montar o
   `addRow`; envie `application/json` com `keepalive`.
8. **Deploy:** use o `vercel` CLI com token da conta (não o deploy inline do MCP
   Vercel para funil COM imagens: o payload base64 é cortado e há risco de imagem
   corrompida); publique a partir de uma subpasta com nome limpo para dar domínio
   limpo; use o TEAM_ID no `--scope`; confira `whoami`/`teams` antes.

Base técnica (já no motor): loading ~5s, envio do lead em `application/json` +
`keepalive`, data em horário de Brasília, qualificação por intenção, sem travessão.

## Checklist final
- [ ] Copy 100% do cliente (zero texto do modelo), sem travessões
- [ ] Identidade do cliente aplicada (cores + logo + fontes)
- [ ] 1ª pergunta na 1ª tela · auto-avanço · máscara WhatsApp · e-mail obrigatório · UTMs
- [ ] **Conta confirmada: deploy na conta/time da Simple (NUNCA pessoal)**, `vercel whoami`/`teams ls` checados
- [ ] Publicado na Vercel do cliente, URL limpa e pública (testada com curl/navegador)
- [ ] Planilha criada no Drive do cliente, com colunas certas (+ UTM)
- [ ] Integração funil→planilha **testada** (lead de teste caiu na planilha)
- [ ] Links entregues + pendências sinalizadas
