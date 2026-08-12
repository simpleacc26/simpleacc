# Planilha de leads no Drive do cliente + integração (feita e TESTADA)

Meta: cada lead do funil cai sozinho numa planilha no Drive do cliente. Entregue
**só depois de testar de ponta a ponta**.

## 1. Criar a planilha no Drive do cliente
Crie um Google Sheets na pasta do cliente (via MCP de Drive: `create_file` com
`contentMimeType: text/csv` e o cabeçalho; o Drive converte em planilha). Colunas
(ordem), inclua sempre a coluna **Qualificacao** e as **5 de UTM**:
```
Nome | Email | WhatsApp | Data | <perguntas q1..qN> | Qualificacao |
utm_source | utm_medium | utm_campaign | utm_content | utm_term | Origem
```
Os "campos do quiz" (`q1..qN`) são as respostas (situação, problema, etc.) em
texto legível. `Qualificacao` = `qualificado` / `nutrir` (vem do `app.js`, régua
por faturamento + prontidão).

> **Some também a coluna do RESULTADO NOMEADO** (o padrão/perfil que o
> diagnóstico deu para o lead), ao lado da classificação. É o que transforma a
> planilha em roteiro de atendimento: antes de responder, a pessoa olha a linha
> e já sabe o diagnóstico, sem abrir mais nada.
>
> **Vale usar 4 faixas de classificação** (`fila-quente`, `qualificado`,
> `nutrir`, `fora`) mesmo que a página mostre só 3 CTAs. A quarta serve para
> priorizar a fila do atendimento e não muda nada na página.
>
> Na entrega, mande ao cliente um **resumo do que cada coluna significa**,
> principalmente as faixas. Ele vai operar essa planilha todo dia.

> **A aba de um CSV importado nasce com o nome "Untitled"** (não "Página1"). Guarde
> isso: os módulos do Make referenciam a aba pelo NOME.

## 2. Integração primária: Make (webhook instant → Google Sheets addRow)
Fluxo padrão da casa, **sem polling** (não fica varrendo, não queima crédito):
dispara só quando chega lead.

```
gateway:CustomWebHook  →  google-sheets:addRow
```

Passos:
1. **Crie o cenário** com trigger **Webhook (instantâneo)**. Copie a URL do webhook.
2. **Cole a URL no `app.js`** em `const LEADS_ENDPOINT = "..."` e republique. O
   `enviarLead()` já manda **`application/json` + `keepalive`** (o Make só
   estrutura o lead em `application/json`; `text/plain` não é parseado e nenhuma
   linha cai; `keepalive` faz o POST sobreviver ao redirect pro diagnóstico).
3. **Rode um lead de teste** para o webhook "aprender" a estrutura do payload
   (`hooks_learn_start` / enviar 1 lead / `hooks_learn_stop`).
4. **Descubra o NOME REAL da aba antes de montar o `addRow`.** Não confie em
   "Página1". Use o RPC do conector:
   ```
   google-sheets@2/rpcSheet   (spreadsheetId = ID da planilha)
   ```
   Ele lista as abas reais (uma planilha vinda de CSV costuma ter só a aba
   **"Untitled"**). Use exatamente esse nome no "Sheet Name" do módulo `addRow`.
5. **Configure o `addRow`** (mode `fromAll`, conexão Google compartilhada do time),
   mapeando cada coluna da planilha para o campo do payload
   (`{ name, email, whatsapp, qualificacao, answers.q1..qN, utms, meta.timestamp }`).
6. **Ative o cenário.**

> **Cuidado:** o `addRow` referencia a aba pelo NOME. Se renomearem a aba (ex.:
> "Untitled" → "Leads"), o módulo quebra com `400 Unable to parse range` e o Make
> desativa o cenário. Ao renomear a aba, atualize o "Sheet Name" do módulo.

## 3. Alternativa secundária: Google Apps Script (.gs)
Quando não houver Make disponível, use o `integracao-planilha.gs` da base como
**alternativa** (grátis, sem polling). Adapte as colunas (`CABECALHO`) e a ordem
do `appendRow`. Ele:
- `doPost(e)` grava o lead na planilha;
- `ensureHeader()` define/corrige o cabeçalho sozinho (inclui UTMs);
- `configurar()` roda uma vez para já deixar o cabeçalho pronto.

O passo de **autorização do Google é do usuário** (você não autoriza a conta dele):
1. Planilha → Extensões → Apps Script → colar o `.gs` → salvar.
2. Implantar → App da Web → "Quem pode acessar: Qualquer pessoa" → Autorizar.
3. Copiar a URL `/exec` e colar em `LEADS_ENDPOINT`.

## 4. TESTAR de verdade (não pule)
Depois de ligar e republicar:
- Abra o funil no ar com UTMs: `https://<url>/?utm_source=teste&utm_medium=cpc&utm_campaign=teste`
- Preencha e envie um lead de teste.
- **Confirme que a linha apareceu na planilha** (com nome, whatsapp, e-mail,
  respostas, `Qualificacao` e as UTMs). Se não caiu, depure: URL do webhook/`/exec`
  correta? nome da aba certo (via `rpcSheet`)? mapeamento das colunas? Só diga
  "pronto" quando o teste passar.

## Entrega
Link da planilha + confirmação de que um lead de teste caiu nela. Remova a linha
de teste, se quiser, antes de subir o tráfego.
