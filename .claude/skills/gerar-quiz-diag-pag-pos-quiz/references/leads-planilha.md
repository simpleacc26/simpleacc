# Planilha de leads no Drive do cliente + integração (feita e TESTADA)

Meta: cada lead do funil cai sozinho numa planilha no Drive do cliente. Entregue
**só depois de testar de ponta a ponta**.

## 1. Criar a planilha no Drive do cliente

Crie um Google Sheets na pasta do cliente (via MCP de Drive: `create_file` com
`contentMimeType: text/csv` e o cabeçalho; o Drive converte em planilha). Colunas
(ordem), inclua sempre a coluna **Qualificação** e as **5 de UTM**:

```
Data/Hora, Nome, WhatsApp, E-mail, [campos do quiz...], Qualificação,
Frente, Origem, UTM Source, UTM Medium, UTM Campaign, UTM Content, UTM Term
```

Os "campos do quiz" são as respostas (situação, problema, etc.) em texto legível.
`Qualificação` vem do `app.js` (régua por faturamento + prontidão). Se o funil tem
índice nomeado (IDE, IDR, etc.), inclua também **índice, faixa do índice e
gargalo**: é o que o comercial usa para priorizar a fila.

> **A aba de um CSV importado nasce com o nome "Untitled"**, não "Página1". Guarde
> isso: os módulos do Make referenciam a aba pelo NOME.

## 2. Integração: Make (padrão)

**Use Make, não Apps Script.** O Apps Script exige que o **dono da conta Google do
cliente** autorize a implantação, e esse passo trava a entrega por dias: a
integração fica "pronta" no papel e sem gravar nada. Com Make a Simple resolve
sozinha, com a conexão Google que já existe no time.

Fluxo padrão da casa, **sem polling** (dispara só quando chega lead):

```
gateway:CustomWebHook  →  google-sheets:addRow
```

### Receita (toda via MCP do Make)

1. `organizations_list` → pegue `organizationId` e o `teamId` do time da Simple.
2. `connections_list` → localize a **conexão Google** já existente do time.
3. `hooks_create` com `typeName: "gateway-webhook"`, nome
   `[Cliente] Webhook <nome do diagnóstico>`. Guarde a `url`.
4. **Descubra o NOME REAL da aba antes de montar o `addRow`.** Não confie em
   "Página1". Use o RPC do conector `google-sheets@2/rpcSheet` (com o
   `spreadsheetId`), que lista as abas reais.
5. `scenarios_create` com dois módulos:
   - `gateway:CustomWebHook` (parâmetro `hook`: o id do passo 3)
   - `google-sheets:addRow` com `mode: "fromAll"`, `spreadsheetId`,
     `sheetId` (o nome real da aba), `includesHeaders: true`,
     `useColumnHeaders: false`, e `values` mapeando **por posição**
     (`"0"`, `"1"`, ...) para as colunas A, B, C...
   - `scheduling: { type: "immediately" }` e `metadata.instant: true`
6. `scenarios_activate`.

Um cenário já existente de outro cliente é o melhor molde: leia com
`scenarios_get` e adapte. Não invente nomes de módulo: confirme com
`app-modules_list`.

> **Cuidado:** o `addRow` referencia a aba pelo NOME. Se renomearem a aba (ex.:
> "Untitled" → "Leads"), o módulo quebra com `400 Unable to parse range` e o Make
> **desativa o cenário**. Ao renomear a aba, atualize o "Sheet Name" do módulo.

### ⚠️ Confira o cabeçalho ANTES de ativar

O `addRow` grava **por posição**, não por nome de coluna. Se o cabeçalho da
planilha tiver menos colunas que o seu mapeamento (ou outra ordem), os dados
entram calados nas colunas erradas.

Compare o cabeçalho real com o seu mapa antes de ligar. Para corrigir sem depender
de ninguém, um cenário temporário com `google-sheets:makeAPICall` resolve, e você
apaga depois:

```
url:    spreadsheets/<ID>/values/A1:Z1
method: PUT
qs:     valueInputOption=RAW
body:   {"values":[["Data/Hora","Nome", ...]]}
```

Aconteceu no GES360: a planilha tinha 23 colunas e o mapa 26. Sem essa
conferência, todo lead entraria desalinhado a partir da 8ª coluna.

### Custo (para responder quando perguntarem)

**2 operações por lead** (receber + gravar). Sem agendamento e sem polling: custo
zero enquanto ninguém responde o quiz. Num plano de 10.000 operações isso dá cerca
de 5.000 leads/mês. **Nunca** use gatilho de polling/intervalo, que queima crédito
parado.

## 3. Ligar no funil

No `app.js`, preencha `const LEADS_ENDPOINT = "<URL do webhook>";` e **republique**.

### O par content-type + mode muda com o destino

| Destino | Content-Type | mode | Por quê |
| --- | --- | --- | --- |
| **Make** (padrão) | `application/json` | normal (CORS) | O webhook responde ao preflight OPTIONS com `Access-Control-Allow-Origin: *`. Com `text/plain` o Make não parseia e nenhuma linha cai |
| **Apps Script** (fallback) | `text/plain;charset=utf-8` | `no-cors` | O Web App **não responde** ao preflight; com JSON o POST falha |

Trocar de destino sem trocar esse par quebra a integração **em silêncio**: a tela
não acusa nada e o lead some. Deixe os dois lados escritos no comentário do código.

Use `keepalive: true` sempre: a página troca para o diagnóstico logo depois do
envio, e sem isso o request morre no meio.

## 4. Alternativa: Google Apps Script (.gs)

Quando não houver Make disponível, use o `integracao-planilha.gs` da base. Adapte
as colunas (`CABECALHO`) e a ordem do `appendRow`. Ele:
- `doPost(e)` grava o lead na planilha;
- `ensureHeader()` define/corrige o cabeçalho sozinho (inclui UTMs);
- `configurar()` roda uma vez para já deixar o cabeçalho pronto.

A **autorização do Google é do usuário** (você não autoriza a conta dele):
1. Planilha → Extensões → Apps Script → colar o `.gs` → salvar.
2. Implantar → App da Web → "Quem pode acessar: Qualquer pessoa" → Autorizar.
3. Copiar a URL `/exec` e colar em `LEADS_ENDPOINT`.

**Nunca deixe os dois caminhos ligados ao mesmo tempo:** vira gravação duplicada.
Ao migrar para o Make, apague o `.gs` do projeto.

## 5. TESTAR de verdade (não pule)

- Abra o funil **no ar** com UTMs:
  `https://<url>/?utm_source=teste&utm_medium=cpc&utm_campaign=teste`
- Preencha e envie um lead de teste.
- **Confirme a linha na planilha**, com respostas, qualificação e UTMs.
- Confirme a execução no Make (`executions_list`): status 1 e 2 operações.

Se o navegador do ambiente não tiver saída para a internet, dá para fechar o ciclo
assim: rode o funil com Playwright, **capture o corpo exato** que o `fetch` monta,
e mande esse mesmo corpo por `curl`. Isso prova as duas metades (o que o navegador
envia + o que o Make faz com aquilo).

Se não caiu, antes de mexer no código **descubra onde parou**: `executions_list`
vazio e fila do webhook zerada = o request nunca saiu do navegador (endpoint
errado, página velha em cache, funil publicado em outro endereço). Execução com
erro = problema no mapeamento, no nome da aba ou na planilha.

## Entrega

Link da planilha + confirmação de que um lead de teste caiu nela. **Apague as
linhas de teste** antes de entregar, para o cliente abrir a planilha limpa
(`values/A2:Z<n>:clear` via `makeAPICall`, no mesmo esquema do cabeçalho).
