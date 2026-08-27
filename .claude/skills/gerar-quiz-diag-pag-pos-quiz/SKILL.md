---
name: gerar-quiz-diag-pag-pos-quiz
description: >-
  Implementa e PUBLICA o funil visual de um cliente (Simple Acc): o quiz, a
  página pós-quiz (relatório/diagnóstico) e o PDF, seguindo a ESTRUTURA INVISÍVEL
  canônica da casa (linhagem Pâmella Mello → Lucas Sobreiro → Felipe Damasceno,
  documentada em references/estrutura-invisivel.md: sem título repetido acima das
  perguntas, tela de carregamento, 9 passos SPIN com as porteiras no fim,
  relatório em 9 blocos, CTAs distribuídos, depoimentos + bloco de autoridade).
  Publica na Vercel e
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
referência aprovada** em `assets/funil-referencia/`, no **modelo Lucas Sobreiro
(estrutura espelhada no funil validado da Pâmella)**, live em
quiz-lucas-sobreiro.vercel.app. A base já vem NEUTRA, com placeholders `__MARCA__`
e copy genérica de negócio: **duplique essa estrutura e adapte para o novo
cliente**. Reescreva 100% da copy (nunca publique com o texto do modelo); ele é só
o ponto de partida que já converteu.

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
**Emoji: só com autorização**, o padrão é sem (público de empresário estranha).

## 📐 LEIA ISTO ANTES DE CONSTRUIR

**`references/estrutura-invisivel.md` é o blueprint canônico do funil.** Ordem das
telas, o que é obrigatório, o que nunca fazer, e os detalhes técnicos que já
quebraram na prática. Ele existe para o usuário **não ter que repetir estas
decisões toda sessão**. Leia inteiro antes da primeira linha de código.

O resumo do que ele trava (não improvise nenhum destes):
- **Sem título/rótulo de etapa repetido** acima de cada pergunta. Só a tela 1 tem hero.
- **Tela de carregamento** obrigatória entre a captura e o relatório (~4,7s, 3 mensagens).
- **9 passos SPIN**, com as 2 perguntas-porteira (faturamento + prontidão) **no fim**.
- **Relatório em 9 blocos** na ordem, com espelho do cenário e reframe.
- **Mínimo 3 CTAs distribuídos**, e CTA final adaptado às 3 faixas de qualificação.
- **Depoimentos E bloco de autoridade do especialista.** Não é ou/ou.
- Sem travessão, sem emoji não autorizado.

## Fluxo (siga na ordem)

```
1. INTAKE   → levantar copy + identidade + assets + contas (perguntar o que faltar)
2. BUILD    → duplicar a base e customizar (copy no flow.js, identidade no styles.css, logo)
3. DEPLOY   → publicar na Vercel (URL limpa), só a subpasta do funil
4. LEADS    → criar planilha no Drive + webhook no Make + TESTAR de ponta a ponta
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

Prefira **projeto ligado ao Git** (`create_git_project` com `rootDirectory`):
todo push publica sozinho e some a classe inteira de problema de snapshot e de
imagem. Se cair no deploy por MCP, leia as três armadilhas na referência: cada
deploy **substitui o snapshot inteiro**, binário em base64 corrompe calado, e
status 200 não prova integridade (confira com `cmp`).

**Se o funil trocar de endereço, o antigo REDIRECIONA**, nunca continua servindo
uma cópia. Cópia parada envelhece e passa a engolir lead sem erro na tela.

> 🔒 **TRAVA OBRIGATÓRIA, conta da Simple.** Antes de QUALQUER deploy, confirme
> que está publicando na **conta/time da Simple na Vercel**, nunca numa conta
> pessoal. Rode `vercel whoami` e `vercel teams ls` e cheque se o time da Simple
> aparece e é o alvo do `--scope`. Se aparecer uma **conta pessoal** (ou o time
> da Simple não estiver disponível), **PARE e peça ao usuário para logar/dar
> acesso à conta da Simple**, não deploye. Nunca use a Personal Account como
> escopo. (Passo detalhado em `references/deploy-vercel.md`.)

### Passo 4: Leads + integração (feita E testada)
Use `references/leads-planilha.md`. Crie a planilha no Drive do cliente, monte o
**webhook + cenário no Make** (padrão: não depende de o cliente autorizar nada),
ligue o `LEADS_ENDPOINT` no `app.js`, republique e **teste de verdade**: envie um
lead de teste e confirme que a linha caiu na planilha, com as UTMs. Só considere
"pronto" depois do teste passar, e **apague a linha de teste** na entrega.

Confira o cabeçalho da planilha contra o seu mapeamento **antes** de ativar: o
`addRow` grava por posição, então cabeçalho defasado desalinha tudo em silêncio.

### Passo 5: Entrega
Informe: **link do funil** (raiz, com instrução de usar `?utm_...` no anúncio),
**link da planilha**, e a confirmação de que a integração foi testada. Liste
pendências do cliente, se houver (ex.: depoimentos reais).

## Particularidades e aprendizados

Linhagem: Pâmella Mello (o de maior conversão) → Lucas Sobreiro → **Felipe
Damasceno, a referência atual** (quiz-felipe-damasceno.vercel.app). Respeite sempre:

0. **Prova social = depoimentos + autoridade.** O bloco "Quem é o especialista"
   (foto, nome, cargo, parágrafo de origem, grade de credenciais reais, chips do
   ecossistema) é **obrigatório**, com ou sem depoimentos. Se ainda não existem
   depoimentos reais, ele sustenta a prova social sozinho e o funil sobe assim.
   🚨 **Só vira claim o que está ESCRITO como texto afirmativo no material do
   cliente.** Objeto que aparece dentro de uma arte (capa de livro na mesa, tela
   de celular, prêmio) é cenário, não credencial. Já publicamos "autor de um
   livro" que não existia por ter lido a capa numa foto do deck. Na dúvida,
   pergunte antes.

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
9. **Nome do projeto na Vercel = a URL,** e não dá pra renomear pelo MCP. Escolha
   `quiz-<cliente>` já na primeira publicação; trocar depois exige projeto novo.
10. **Publicação substitui a árvore inteira:** arquivo que faltar no envio vira
    404 silencioso (já derrubou o CSS de um funil no ar). **Depois de todo deploy,
    confira cada asset com `curl -o /dev/null -w '%{http_code}'`.** Esse check já
    pegou dois erros reais.
11. **`:hover` gruda no iOS** e faz as opções parecerem pré-selecionadas ao
    arrastar o dedo. Isole em `@media (hover: hover) and (pointer: fine)`, some
    `-webkit-tap-highlight-color: transparent` e use `:active` pro toque.
12. **Preview da Vercel fica atrás do SSO** e o cliente não abre. Só link de
    `target: production` é publicamente acessível.

Base técnica (já no motor): loading ~5s, envio do lead em `application/json` +
`keepalive`, data em horário de Brasília, qualificação por intenção, sem travessão.

## Checklist final
- [ ] **`references/estrutura-invisivel.md` lido e seguido** (checklist próprio no fim dele)
- [ ] Copy 100% do cliente (zero texto do modelo), sem travessões, sem emoji não autorizado
- [ ] Identidade do cliente aplicada (cores + logo + fontes)
- [ ] 1ª pergunta na 1ª tela · **sem título repetido nas demais** · auto-avanço · máscara WhatsApp · e-mail obrigatório · UTMs
- [ ] **Sem contador de perguntas** e sem "responda N perguntas" (nem na meta description)
- [ ] **Tela de carregamento** no ar entre a captura e o relatório
- [ ] **Depoimentos E bloco de autoridade**, com claims só do que está escrito no material
- [ ] **Todos os assets em 200** depois do deploy (curl em cada arquivo)
- [ ] **Conta confirmada: deploy na conta/time da Simple (NUNCA pessoal)**, `vercel whoami`/`teams ls` checados
- [ ] Publicado na Vercel do cliente, URL limpa e pública (testada com curl/navegador)
- [ ] Planilha criada no Drive do cliente, com colunas certas (+ UTM) e **cabeçalho batendo com o mapeamento**
- [ ] Integração funil→planilha **testada** (lead de teste caiu na planilha) e linha de teste apagada
- [ ] Testado **emulando celular**: nenhuma tela abre com opção pré-selecionada, nenhum CTA transbordando
- [ ] Arquivos no ar conferidos contra o repo (`curl` + `cmp`), não só status 200
- [ ] Endereço antigo (se houve troca de URL) redirecionando, não servindo cópia
- [ ] Links entregues + pendências sinalizadas
