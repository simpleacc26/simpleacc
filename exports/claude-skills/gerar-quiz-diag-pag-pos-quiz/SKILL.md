---
name: gerar-quiz-diag-pag-pos-quiz
description: >-
  Implementa e PUBLICA o funil visual de um cliente (Simple Acc): o quiz, a
  página pós-quiz (relatório/diagnóstico) e o PDF, seguindo a estrutura aprovada
  (modelo Sabrina / referência de quiz de alta conversão). Publica na Vercel e
  entrega o link no final, cria a planilha de leads no Drive do cliente e deixa
  a integração funil→planilha feita E testada, aplicando a identidade visual do
  cliente. Use sempre que alguém pedir para "montar/implementar o funil", "criar
  o quiz", "subir a página do cliente", "publicar o funil na Vercel", "fazer a
  página pós-quiz / o PDF do diagnóstico", ou transformar a copy/estratégia
  aprovada em páginas no ar. Pergunte ao usuário o que faltar do cliente
  (identidade, logo, WhatsApp, pasta do Drive, conta Vercel) — não invente.
---

# Gerar Quiz + Diagnóstico + Página Pós-Quiz — implementar, publicar e integrar

## O que esta skill faz
Transforma a **copy/estratégia já aprovada** de um cliente em **páginas no ar**:
1. **Quiz** (uma pergunta por tela, alta conversão)
2. **Página pós-quiz** = relatório/diagnóstico auto-preenchido + botão Baixar PDF + WhatsApp
3. **Publicação na Vercel** (URL limpa, entregue no final)
4. **Planilha de leads no Drive do cliente** + **integração funil→planilha feita e testada**

Tudo na **identidade visual do cliente** (a que for definida na hora).

Stack: HTML/CSS/JS puro, sem dependências, sem build. Há uma **base de
referência aprovada** (a da cliente Sabrina) em `assets/funil-referencia/` —
**duplique essa estrutura e adapte para o novo cliente**. Nunca publique com a
copy/identidade da Sabrina; ela é só o ponto de partida que já converteu.

## Regra de ouro: pergunte o que falta, não invente
Antes de construir, levante o que o cliente precisa fornecer. Se faltar algo
crítico, **pergunte ao usuário** (ou peça o material). Veja a lista completa em
`references/intake-cliente.md`. O essencial:
- A **copy aprovada** (do doc de estratégia / skill `estrategia-completa-clientes`). Sem copy aprovada, não há o que publicar — peça.
- **Identidade visual**: paleta (hex), logo (PNG/SVG), fontes — ou autorização para você propor.
- **WhatsApp** do cliente (destino do CTA).
- **Pasta do cliente no Drive** (onde criar a planilha de leads).
- **Conta Vercel** onde publicar (geralmente o time da empresa).
- Quais **frentes** (se o cliente tiver mais de uma).

Nunca use travessão "—" na copy (regra do cliente: "fica com cara de IA"). Use
vírgula/dois-pontos.

## Fluxo (siga na ordem)

```
1. INTAKE   → levantar copy + identidade + assets + contas (perguntar o que faltar)
2. BUILD    → duplicar a base e customizar (copy no flow.js, identidade no styles.css, logo)
3. DEPLOY   → publicar na Vercel (URL limpa) — só a subpasta do funil
4. LEADS    → criar planilha no Drive + Apps Script + TESTAR de ponta a ponta
5. ENTREGA  → mandar o link do funil + link da planilha + confirmação de teste
```

### Passo 1 — Intake
Use `references/intake-cliente.md`. Confirme a copy aprovada e colete/peça os
assets. Resuma o que recebeu e o que assumiu antes de construir.

### Passo 2 — Build
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

### Passo 3 — Deploy
Use `references/deploy-vercel.md`. Publique **apenas a subpasta do funil**
(nunca a raiz do workspace) na conta/time Vercel do cliente, com **nome de
projeto limpo** para a URL ficar branded e pública.

> 🔒 **TRAVA OBRIGATÓRIA — conta da Simple.** Antes de QUALQUER deploy, confirme
> que está publicando na **conta/time da Simple na Vercel**, nunca numa conta
> pessoal. Rode `vercel whoami` e `vercel teams ls` e cheque se o time da Simple
> aparece e é o alvo do `--scope`. Se aparecer uma **conta pessoal** (ou o time
> da Simple não estiver disponível), **PARE e peça ao usuário para logar/dar
> acesso à conta da Simple** — não deploye. Nunca use a Personal Account como
> escopo. (Passo detalhado em `references/deploy-vercel.md`.)

### Passo 4 — Leads + integração (feita E testada)
Use `references/leads-planilha.md`. Crie a planilha no Drive do cliente, configure
o Apps Script, ligue o `LEADS_ENDPOINT` no `app.js`, republique e **teste de
verdade**: envie um lead de teste e confirme que a linha caiu na planilha (com
UTMs). Só considere "pronto" depois do teste passar.

### Passo 5 — Entrega
Informe: **link do funil** (raiz, com instrução de usar `?utm_...` no anúncio),
**link da planilha**, e a confirmação de que a integração foi testada. Liste
pendências do cliente, se houver (ex.: depoimentos reais).

## Checklist final
- [ ] Copy 100% do cliente (zero texto da Sabrina), sem travessões
- [ ] Identidade do cliente aplicada (cores + logo + fontes)
- [ ] 1ª pergunta na 1ª tela · auto-avanço · máscara WhatsApp · e-mail obrigatório · UTMs
- [ ] **Conta confirmada: deploy na conta/time da Simple (NUNCA pessoal)** — `vercel whoami`/`teams ls` checados
- [ ] Publicado na Vercel do cliente, URL limpa e pública (testada com curl/navegador)
- [ ] Planilha criada no Drive do cliente, com colunas certas (+ UTM)
- [ ] Integração funil→planilha **testada** (lead de teste caiu na planilha)
- [ ] Links entregues + pendências sinalizadas
