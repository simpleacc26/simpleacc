# Automação Make — Sabrina Siqueira (2 funis)

Guia passo a passo para montar **manualmente** no Make a automação dos dois
funis da Sabrina, espelhando o modelo aprovado da **Carol e José - V2**.

> **Estrutura do funil:** Anúncio → Quiz → Relatório (gerado **na página**) →
> Botão WhatsApp. O Make **não** gera o relatório; ele só recebe o lead do quiz
> e cuida de **CRM (GoHighLevel) + planilha (Google Sheets)**.

## Decisões desta montagem
- Relatório gerado **na própria página** → cenário **sem** OpenAI/Google Docs.
- **2 cenários separados**, 1 por funil (institucional e implantes).
- **1 planilha só, com 1 aba por funil.**
- Daniel monta manualmente; este doc é o roteiro.

---

## ⚠️ Fatos importantes (lidos no código dos funis em 2026-06-30)

1. **Os funis no ar são PARA PACIENTES**, não para dentistas. O cenário antigo
   "[Simple] Sabrina" (id 3310938) era de um funil B2B (vendia método p/
   dentistas) — **custom fields, pipeline e planilha dele NÃO servem**. Só
   reaproveitamos as **conexões**.
2. **Os dois quizzes mandam o MESMO conjunto de campos** (mudam só os textos das
   respostas e o `frente`). Isso deixa o mapeamento idêntico nos 2 cenários.
3. **`LEADS_ENDPOINT` está vazio** no `app.js` dos dois funis → hoje **nada é
   enviado**. Tem que colar a URL do webhook do Make ali e publicar (Passo 5).
4. **WhatsApp é placeholder** (`5533000000000`) nos dois `flow.js`. O "Botão
   WhatsApp" só funciona com o número real (trocar em `flow.js → marca.whatsapp`).

## Decisões confirmadas (Daniel, 2026-06-30)
- **Mesma location GoHighLevel** para os 2 funis (conexão `6040053`;
  location "Sabrina s cantarino's", id `xjmQeTDpbkAomQ52IPwU`).
- **GHL enxuto (Opção 1):** o contato leva só **nome, WhatsApp, e-mail + tag**.
  As 7 respostas + UTMs vão **só para a planilha**. (Custom fields no GHL ficam
  para depois — ver seção "Opção 2 (adiada)".)
- **Pipeline:** usar o existente **"Funil de Marketing"**, 1º stage **"Novo lead"**.
- **Tag por funil:** `quiz-inclusao` (institucional) e `quiz-implantes`.
- **WhatsApp real:** `(33) 99866-8858` → no código: **`5533998668858`**
  (trocar `marca.whatsapp` nos 2 `flow.js`).

## Conexões a reaproveitar (do cenário antigo)
- **GoHighLevel (location da Sabrina):** connection id `6040053`.
- **Google (Sheets):** connection id `5139463` (ssouzadaniel.ads@gmail.com).

> Pipeline, stage, custom fields e planilha: **criar novos** para os funis de
> paciente (ver passos abaixo).

---

## Estrutura-alvo (igual Carol e José - V2)

```
[1] Webhook (Custom webhook)
      │   (se os campos não vierem separados, ver "Gotcha JSON" no Passo 1)
      ▼
[2] GoHighLevel → Create a Contact      (com error handler: Ignore = o "Skip")
      │
      ▼
[3] GoHighLevel → Create an Opportunity  (usa o Contact ID do passo 2)
      │
      ▼
[4] Google Sheets → Add a Row            (registra o lead na aba do funil)
```

O **"Skip"** do print da Carol e José é só o **error handler** `Ignore` do
*Create a Contact* (botão direito no módulo → *Add error handler* → `Ignore`):
evita travar se o contato já existir.

---

## Payload que CADA quiz envia (idêntico nos dois)

```json
{
  "data": "2026-06-30T12:00:00.000Z",
  "nome": "...",
  "whatsapp": "(33) 99999-9999",
  "email": "...",
  "situacao": "texto da opção escolhida",
  "problema": "texto da opção escolhida",
  "implicacao": "texto da opção escolhida",
  "necessidade": "texto da opção escolhida",
  "objetivo": "texto da opção escolhida",
  "perfil": "texto da opção escolhida",
  "qualificacao": "texto da opção escolhida",
  "frente": "Inclusão",          // institucional. No de implantes: "Implantes"
  "origem": "https://...",
  "utm_source": "...", "utm_medium": "...", "utm_campaign": "...",
  "utm_content": "...", "utm_term": "..."
}
```

### As 7 perguntas (rótulos SPIN) — mesmas chaves nos 2 funis
| Chave         | Institucional (autismo)                | Implantes                          |
| ------------- | -------------------------------------- | ---------------------------------- |
| `situacao`    | Como são hoje as idas ao dentista…     | Como está sua boca hoje?           |
| `problema`    | Maior dificuldade na consulta…         | O que mais te incomoda nisso hoje? |
| `implicacao`  | Como isso afeta vocês hoje?            | Como isso afeta o seu dia a dia?   |
| `necessidade` | O que você já tentou…                  | O que você já tentou até aqui?     |
| `objetivo`    | O que mais deseja para a relação…      | O que você quer alcançar?          |
| `perfil`      | Me conta sobre seu filho (autista…)    | Qual opção combina mais com você…  |
| `qualificacao`| De onde vocês são?                     | De onde você fala?                 |

### Campos de captura (final do quiz)
`nomeResp` (nome), `whatsapp`, `email`. (No payload, `nomeResp` vai como `nome`.)

---

## Opção 2 (adiada) — Custom fields no GoHighLevel
> **Não usados agora** (escolhemos a Opção 1: respostas só na planilha). Se um
> dia quiser as respostas visíveis em cada contato no GHL, crie estes campos em
> *Settings → Custom Fields* (tipo Texto), anote os IDs e ligue no Create a
> Contact. Não exige refazer nada do resto.

| Campo do payload | Sugestão de nome no GHL          | ID (anotar) |
| ---------------- | -------------------------------- | ----------- |
| situacao         | Diag - Situação                  |             |
| problema         | Diag - Problema                  |             |
| implicacao       | Diag - Implicação                |             |
| necessidade      | Diag - O que já tentou           |             |
| objetivo         | Diag - Objetivo                  |             |
| perfil           | Diag - Perfil/Momento            |             |
| qualificacao     | Diag - Localização               |             |
| frente           | Funil (Inclusão/Implantes)       |             |
| utm_source       | utm_source                       |             |
| utm_medium       | utm_medium                       |             |
| utm_campaign     | utm_campaign                     |             |
| utm_content      | utm_content                      |             |
| utm_term         | utm_term                         |             |

> Os mesmos custom fields servem para os 2 funis (payload idêntico). Para
> separar os funis no CRM, use o campo `frente` e/ou uma **tag por funil**.

---

## Passo a passo (faça para CADA funil)

### Passo 0 — Preparar antes do Make
- [ ] No GoHighLevel: criar os custom fields acima (1 vez, serve p/ os 2 funis).
- [ ] No GoHighLevel: definir **1 pipeline** e o **stage** de entrada dos leads
      de paciente. A separação dos funis é feita por **tag** (`quiz-inclusao` /
      `quiz-implantes`), não por pipeline.
- [ ] No Google Sheets: criar **1 planilha** com **2 abas** (ex.:
      `Institucional` e `Implantes`), com cabeçalho na linha 1.

### Passo 1 — Webhook (gatilho)
1. Novo cenário → módulo **Webhooks → Custom webhook** → **Add** → nome claro
   (`Sabrina Institucional` / `Sabrina Implantes`) → **Save**.
2. **Copie a URL do webhook** (vai no funil, Passo 5).
3. **Redetermine data structure** e dispare um envio de teste do quiz.
4. **Gotcha JSON:** o funil envia com `Content-Type: text/plain` (necessário
   pelo `mode: no-cors`). Se o Make **não** separar os campos automaticamente,
   adicione logo após o webhook um módulo **JSON → Parse JSON** apontando para o
   corpo bruto, e mapeie os passos seguintes a partir do Parse JSON.

### Passo 2 — GoHighLevel → Create a Contact
1. **Connection:** `6040053` (location da Sabrina).
2. Mapeie:
   - **First Name** = `{{nome}}`
   - **Email** = `{{email}}`
   - **Phone** = `{{whatsapp}}`
   - **Tags:** a tag do funil — `quiz-inclusao` (institucional) ou
     `quiz-implantes`.
   - **Custom Fields:** *nenhum* (Opção 1 — respostas só na planilha).
3. **Error handler (o "Skip"):** botão direito no módulo → *Add error handler*
   → **`Ignore`**.

### Passo 3 — GoHighLevel → Create an Opportunity
1. **Connection:** a mesma.
2. **Pipeline:** "Funil de Marketing". **Stage:** "Novo lead".
3. **Select a Method:** *Use an existing contact* → **Contact ID** = `{{ID do
   Create a Contact}}`.
4. **Status:** `Open`. **Opportunity Name:** `{{nome}}`.

### Passo 4 — Google Sheets → Add a Row
1. **Connection:** `5139463`.
2. **Spreadsheet:** a planilha única. **Sheet:** a aba do funil
   (`Institucional` ou `Implantes`).
3. **Values** (sugestão de colunas):
   A=`{{nome}}` · B=`{{whatsapp}}` · C=`{{email}}` · D=`{{situacao}}` ·
   E=`{{problema}}` · F=`{{implicacao}}` · G=`{{necessidade}}` ·
   H=`{{objetivo}}` · I=`{{perfil}}` · J=`{{qualificacao}}` · K=`{{frente}}` ·
   L=`{{utm_source}}` · M=`{{utm_medium}}` · N=`{{utm_campaign}}` ·
   O=`{{utm_content}}` · P=`{{utm_term}}` · Q=`{{data}}`

### Passo 5 — Ligar o funil ao webhook (na Vercel)
1. Pegue a **URL do webhook** (Passo 1).
2. No código do funil, em **`app.js`**, troque:
   `const LEADS_ENDPOINT = "";` → `const LEADS_ENDPOINT = "URL_DO_WEBHOOK";`
3. Em `flow.js`, troque o WhatsApp placeholder
   `marca.whatsapp: "5533000000000"` pelo número real `"5533998668858"`
   (nos 2 funis).
4. **Publique de novo na Vercel.**

> O código dos funis hoje mora na Vercel (sem repositório Git). Para versionar e
> a SimpleAcc conseguir manter, o ideal é trazer o código para
> `clientes/sabrina-siqueira/funis/<projeto>/` num próximo passo.

### Passo 6 — Testar e ativar
1. Envio real pelo quiz (dados de teste).
2. Conferir no Make: Contato no GHL, Oportunidade no pipeline, linha na aba.
3. **Scheduling:** `Immediately` → **Ativar** o cenário.
4. Repetir para o segundo funil.

---

## Status / pendências
- [x] Implantes usa a **mesma location GHL** (6040053). ✓
- [x] GHL enxuto (Opção 1) — sem custom fields por enquanto. ✓
- [x] Pipeline "Funil de Marketing" / stage "Novo lead" (já existem). ✓
- [ ] Tags `quiz-inclusao` / `quiz-implantes` (criadas no Create a Contact).
- [ ] Criar planilha única com abas `Institucional` e `Implantes` + cabeçalhos.
- [ ] Criar os 2 webhooks e colar as URLs nos respectivos `app.js` (LEADS_ENDPOINT).
- [ ] Trocar o WhatsApp real nos 2 `flow.js` e republicar.
