# Automação Make — Sabrina Siqueira (2 funis)

Guia passo a passo para montar **manualmente** no Make a automação dos dois
funis da Sabrina, espelhando o modelo aprovado da **Carol e José - V2**.

> **Estrutura do funil:** Anúncio → Quiz → Relatório (gerado **na página**) →
> Botão WhatsApp. O Make **não** gera o relatório; ele só recebe o lead do quiz
> e cuida de **CRM (GoHighLevel) + planilha (Google Sheets)**.

## Decisões desta montagem
- Relatório é gerado **na própria página** (não no Make). → o cenário **não**
  usa OpenAI nem Google Docs.
- **2 cenários separados**, 1 por funil (institucional e implantes).
- Daniel monta manualmente; este doc é o roteiro.

---

## A estrutura-alvo (igual Carol e José - V2)

```
[1] Webhook (Custom webhook)
      │
      ▼
[2] GoHighLevel → Create a Contact      (com tratamento de erro: Ignore)
      │
      ▼
[3] GoHighLevel → Create an Opportunity  (usa o Contact ID do passo 2)
      │
      ▼
[4] Google Sheets → Add a Row            (registra o lead na planilha)
```

O ramo **"Skip"** que aparece no print da Carol e José é só o **tratamento de
erro** do módulo *Create a Contact*: um módulo **`Ignore`** ligado em
*right-click no módulo → Add error handler*. Serve para a automação **não
travar** se o contato já existir / der erro — ele ignora e segue.

---

## Dados já existentes (reaproveitar) — Funil INSTITUCIONAL / Autismo

Recuperados do cenário **"[Simple] Sabrina"** (id 3310938) que já roda esse
funil. Dá para **clonar esse cenário e só remover os módulos de OpenAI + Google
Docs**, deixando Webhook → Contact → Opportunity → Sheets.

- **Conexão GoHighLevel (location da Sabrina):** connection id `6040053`
- **Pipeline (Create Opportunity):** `JZRPFoyQXKKFUM2DM2FU`
- **Stage (Create Opportunity):** `63d0e786-4c1d-4651-9e23-23be4440047c`
- **Conexão Google (Sheets):** connection id `5139463` (ssouzadaniel.ads@gmail.com)
- **Planilha:** `1XbK1GiWFqFMvy9QtSh-Gc66dwWJG9-t-MArlhHWvNSY`
  - Aba: `V01 Descubra quanto você poderia faturar`

**Payload que o quiz institucional manda no webhook:**
```json
{
  "nome": "...",
  "email": "...",
  "whatsapp": "(19) 98218-2890",
  "respostas": {
    "pergunta1_area_atuacao": "...",
    "pergunta2_tipo_consultorio": "...",
    "pergunta3_faturamento_mensal": "...",
    "pergunta4_atendimento_autistas": "...",
    "pergunta5_objetivo_principal": "..."
  },
  "utm_source": "...", "utm_medium": "...", "utm_campaign": "...",
  "utm_content": "...", "utm_term": "...", "utm_origem": "...",
  "data_envio": "2025-11-23T23:24:30.255Z"
}
```

**Custom fields do GoHighLevel (Create a Contact) — institucional:**

| Campo do quiz                         | Custom Field ID (GHL)    |
| ------------------------------------- | ------------------------ |
| respostas.pergunta1_area_atuacao      | `VUlFALZxLIN3ZTTop5ot`   |
| respostas.pergunta2_tipo_consultorio  | `krsPQH1ICbL4Gx0O4Lt7`   |
| respostas.pergunta3_faturamento_mensal| `FsXeWF8rDMVNdWOkNxVy`   |
| respostas.pergunta4_atendimento_autistas | `G71x2rbIdsvIpwT6nKmO`|
| respostas.pergunta5_objetivo_principal| `HCw70DrYTsmg021MTogd`   |
| utm_source                            | `XpWeq93qhcw4c3eAxPlj`   |
| utm_medium                            | `oW1yXIceGVdWFam7QbNy`   |
| utm_campaign                          | `zeKg336jWQZCGc5OsHFE`   |
| utm_content                           | `AB8SPLek59wRhpCLEcWh`   |
| utm_term                              | `iDy4FuxbkRuX6wOGnfhu`   |

**Colunas da planilha (Add a Row) — institucional:**

| Col | Conteúdo                               |
| --- | -------------------------------------- |
| A   | nome                                   |
| B   | whatsapp                               |
| C   | email                                  |
| D   | respostas.pergunta1_area_atuacao       |
| E   | respostas.pergunta2_tipo_consultorio   |
| F   | respostas.pergunta3_faturamento_mensal |
| G   | respostas.pergunta4_atendimento_autistas |
| H   | respostas.pergunta5_objetivo_principal |
| I   | utm_source                             |
| J   | utm_medium                             |
| K   | utm_campaign                           |
| L   | utm_term                               |
| M   | utm_content                            |

---

## Passo a passo (faça para CADA funil)

### Passo 0 — Preparar antes de abrir o Make
- [ ] Confirmar a **location/sub-conta no GoHighLevel** de cada funil.
      (Institucional já usa a connection `6040053`.)
- [ ] Para o funil de **implantes**: criar no GHL os **custom fields** das
      perguntas do quiz de implantes (1 campo por pergunta) e anotar os IDs.
      Criar/confirmar o **pipeline** e o **stage** de entrada.
- [ ] Criar **uma planilha Google** por funil (ou uma aba por funil) e anotar o
      Spreadsheet ID. Colocar o cabeçalho na linha 1 (A1:…).

### Passo 1 — Webhook (gatilho)
1. Novo cenário → primeiro módulo **Webhooks → Custom webhook**.
2. **Add** → dê um nome claro (ex.: `Sabrina Institucional` /
   `Sabrina Implantes`) → **Save**.
3. **Copie a URL do webhook.** É ela que vai no funil (ver Passo 5).
4. Clique em **Redetermine data structure** e **dispare um envio de teste do
   quiz** (ou cole um JSON de exemplo) para o Make aprender os campos
   (`nome`, `email`, `whatsapp`, `respostas.*`, `utm_*`).

### Passo 2 — GoHighLevel → Create a Contact
1. Adicione **GoHighLevel → Create a Contact** depois do webhook.
2. **Connection:** a da location da Sabrina (institucional = `6040053`).
3. Mapeie:
   - **First Name** = `{{nome}}`
   - **Email** = `{{email}}`
   - **Phone** = `{{whatsapp}}`
   - **Custom Fields:** ligue cada pergunta ao seu custom field (tabela acima
     para o institucional; criar os do implantes).
   - (Opcional) **Tags:** se o quiz mandar um campo de **resultado/balde**,
     adicione uma tag tipo `Quiz Sabrina <resultado>` — assim você segmenta no
     GHL como na Carol e José. Se não mandar, pode deixar uma tag fixa por funil
     (ex.: `quiz-institucional` / `quiz-implantes`).
4. **Tratamento de erro (o "Skip"):** clique com o botão direito no módulo
   *Create a Contact* → **Add error handler** → escolha **`Ignore`**. Isso evita
   travar quando o contato já existe.

### Passo 3 — GoHighLevel → Create an Opportunity
1. Adicione **GoHighLevel → Create an Opportunity**.
2. **Connection:** a mesma do Passo 2.
3. Mapeie:
   - **Pipeline:** o pipeline do funil (institucional = `JZRPFoyQXKKFUM2DM2FU`).
   - **Stage:** o estágio de entrada (institucional = `63d0e786-4c1d-4651-9e23-23be4440047c`).
   - **Select a Method:** *Use an existing contact*.
   - **Contact ID:** `{{ID do passo 2 / Create a Contact}}`.
   - **Status:** `Open`.
   - **Opportunity Name:** `{{nome}}`.

### Passo 4 — Google Sheets → Add a Row
1. Adicione **Google Sheets → Add a Row**.
2. **Connection:** Google `5139463` (ou a conta do cliente).
3. **Spreadsheet / Sheet:** a planilha e aba do funil.
4. **Values:** mapeie coluna a coluna (tabela do institucional acima; montar a
   equivalente para o implantes). Dica: a última coluna pode receber `{{now}}`
   para registrar a data/hora.

### Passo 5 — Ligar o funil ao webhook
1. Pegue a **URL do webhook** (Passo 1).
2. No funil (Vercel), configure essa URL como destino do POST do quiz —
   normalmente uma **variável de ambiente** (ex.: `WEBHOOK_URL` /
   `VITE_WEBHOOK_URL`) em **Vercel → Project → Settings → Environment
   Variables** e **redeploy**.
3. Garanta que o quiz envia o JSON no formato esperado (mesmos nomes de campo).

### Passo 6 — Testar e ativar
1. Faça um envio real pelo quiz (dados de teste).
2. Confira no Make a execução: Contato criado no GHL, Oportunidade no pipeline,
   linha na planilha.
3. **Scheduling:** `Immediately`. **Ative** o cenário (toggle ON).
4. Repita tudo para o segundo funil.

---

## Pendências para o funil de IMPLANTES (a preencher)
- [ ] Location/sub-conta GHL (mesma da Sabrina ou outra?).
- [ ] Perguntas do quiz de implantes + custom fields criados (IDs).
- [ ] Pipeline + stage de entrada.
- [ ] Spreadsheet ID + cabeçalho das colunas.
- [ ] Webhook criado e URL colada no funil da Vercel.

> Quando esses dados existirem, registre-os aqui (mesmo formato da seção do
> institucional) para a próxima sessão já encontrar tudo pronto.
