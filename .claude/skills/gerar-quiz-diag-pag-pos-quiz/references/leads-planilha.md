# Planilha de leads no Drive do cliente + integração (feita e TESTADA)

Meta: cada lead do funil cai sozinho numa planilha no Drive do cliente. Entregue
**só depois de testar de ponta a ponta**.

## 1. Criar a planilha no Drive do cliente
Crie um Google Sheets na pasta do cliente (via MCP de Drive: `create_file` com
`contentMimeType: text/csv` e o cabeçalho; o Drive converte em planilha). Colunas
(ordem) — inclua sempre as **5 de UTM** no fim:
```
Data/Hora, Nome, WhatsApp, E-mail, [campos do quiz...], Frente, Origem,
UTM Source, UTM Medium, UTM Campaign, UTM Content, UTM Term
```
Os "campos do quiz" são as respostas (situação, problema, etc.) em texto legível.

## 2. Integração: Google Apps Script (recomendado — grátis, sem polling)
Use o `integracao-planilha.gs` da base (adapte as colunas). Ele:
- `doPost(e)` grava o lead na planilha;
- `ensureHeader()` define/corrige o cabeçalho sozinho (inclui UTMs);
- `configurar()` pode ser rodado uma vez para já deixar o cabeçalho pronto.

### O passo que é do usuário (autorização do Google — inevitável)
Você não pode autorizar acesso ao Google do cliente. Oriente o usuário (2 min):
1. Abrir a planilha → Extensões → Apps Script → colar o `.gs` → salvar.
2. Implantar → App da Web → "Quem pode acessar: Qualquer pessoa" → Autorizar.
3. Copiar a URL `/exec` e te mandar.

## 3. Ligar no funil
No `app.js`, preencha `const LEADS_ENDPOINT = "<URL /exec>";` e **republique**.
O `enviarLead()` faz POST `no-cors` (text/plain) com as respostas legíveis + UTMs.

## 4. TESTAR de verdade (não pule)
Depois de religar e republicar:
- Abra o funil no ar com UTMs: `https://<url>/?utm_source=teste&utm_medium=cpc&utm_campaign=teste`
- Preencha e envie um lead de teste.
- **Confirme que a linha apareceu na planilha** (com nome, whatsapp, e-mail,
  respostas e as UTMs). Se não caiu, depure (URL /exec correta? implantação como
  "Qualquer pessoa"? cabeçalho ok?). Só diga "pronto" quando o teste passar.

## Se usar Make (conta do Daniel) em vez de Apps Script
- **NUNCA** use gatilho de polling/intervalo (queima crédito parado). Use
  **Webhook (instantâneo)** como trigger → módulo Google Sheets "Add a Row".
  Roda só quando chega lead. Cuidado: precisa de uma conexão Google já existente
  no Make. Apps Script costuma ser mais simples e 100% grátis.

## Entrega
Link da planilha + confirmação de que um lead de teste caiu nela. Remova a linha
de teste, se quiser, antes de subir o tráfego.
