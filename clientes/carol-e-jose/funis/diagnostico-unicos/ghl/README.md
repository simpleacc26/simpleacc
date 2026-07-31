# Funil ÚNICOS para o GHL (self-contained)

Duas páginas em HTML/CSS/JS puro, sem build e sem dependências, para colar em blocos
"Custom Code / HTML" dentro de páginas do GHL. Toda a copy, lógica de qualificação, baldes
e identidade (logo + paleta reais do ÚNICOS) já estão embutidas.

## Arquivos
- `diagnostico.html` — o diagnóstico (8 perguntas + captura de lead).
- `pos-diagnostico.html` — a página pós-diagnóstico / agendamento, com o **calendário do
  GHL já embutido**. Copy 100% do v8 do cliente (sem adições).
- `apps-script.gs` — recebe os leads e grava na planilha (qualificado → aba completa,
  desqualificado → contagem).

## Passo a passo

### 1. Planilha (Apps Script)
1. Abra a planilha de leads → Extensões → Apps Script. Cole `apps-script.gs` e salve.
2. Rode a função **`setup`** (menu Executar) e autorize (aceite também a permissão de
   **gatilhos**). Ela cria/alinha as abas **Qualificados**, **Desqualificados** e
   **Painel** e instala os gatilhos que mantêm o Painel atualizado. Depois, apague as
   abas antigas (as com "Q1 - Papel", "Bucket" etc.).
   > O Painel é calculado no código e gravado como **valores** (não usa fórmula, porque
   > a planilha está em pt-BR e fórmulas com vírgula davam `#ERRO!`). Ele se atualiza
   > sozinho: a cada lead novo, num gatilho de 5 min e quando você edita a coluna
   > *Verba*. Se editar o código, rode `setup` de novo.
3. Opcional: rode `testar` para gerar uma linha de exemplo em cada aba (apague depois).
4. Implantar → Nova implantação → App da Web (Executar como: eu · Acesso: qualquer pessoa).
5. Copie a URL `.../exec`.
6. No **Painel**, preencha a coluna **Verba do criativo (R$)** por `utm_content`; o custo
   por lead aprovado é calculado sozinho.

### 2. Página do diagnóstico (GHL)
1. Crie a página do diagnóstico. Adicione um elemento **Custom Code / HTML** e cole
   `diagnostico.html` inteiro.
2. No topo do `<script>`, preencha o bloco **CONFIG**:
   - `LEADS_ENDPOINT` → a URL `.../exec` do Apps Script.
   - `POS_URL` → a URL pública da página pós-diagnóstico no GHL (item 3). Se deixar em
     branco, o aprovado vai direto ao calendário do GHL.
   - `AGENDAMENTO_URL` e `COMUNIDADE_URL` já vêm preenchidos (calendário GHL e grupo
     do WhatsApp).

### 3. Página pós-diagnóstico (GHL)
1. Crie a página de agendamento. Adicione um **Custom Code / HTML** e cole
   `pos-diagnostico.html`. O calendário do GHL (`leFMFKegfdvDRIE1b42I`) já está embutido.
2. Copie a URL pública dessa página e cole em `POS_URL` no diagnóstico.

## Fluxo
```
Anúncio ─▶ diagnostico.html
             ├─ dono/sócio + faturamento ≥ R$1M  (QUALIFICADO)
             │     └▶ Webhook do Make ─▶ GHL Criar Contato ─▶ GHL Criar Oportunidade
             │                        ─▶ Google Sheets (aba Qualificados) ─▶ Painel
             │     └▶ POS_URL?balde=…  (agendamento)
             └─ não-dono OU < R$1M  (DESQUALIFICADO)
                   └▶ Apps Script (aba Desqualificados + contagem) ─▶ grupo do WhatsApp
```

### Integração V3 (Make)
- **Cenário:** `Carol e José - V3 (Diagnóstico)` (Make, time Simple Acc).
- **Webhook:** `https://hook.us2.make.com/58lppb76g43dm59fk9w2sne4tupeqjgn`
  → é o `MAKE_ENDPOINT` do `diagnostico.html` (recebe só os qualificados).
- **GHL:** conexão `Time - Únicos`; contato com tags `lead quiz` + `diagnostico-v3`
  e custom fields `tier`/`balde`; oportunidade no mesmo pipeline/etapa do V2.
- **Sheets:** grava na aba **Qualificados** da planilha de leads (mesmas 22 colunas
  que o Painel lê). O Painel recalcula sozinho (gatilho de 5 min), então funciona
  mesmo o Make gravando direto na planilha.
- **Desqualificados** continuam indo para o Apps Script (`LEADS_ENDPOINT`).

## Valores já configurados
- Calendário GHL: `https://api.leadconnectorhq.com/widget/booking/leFMFKegfdvDRIE1b42I`
- Comunidade (WhatsApp): `https://chat.whatsapp.com/B6rtIEWe7jcHseToLdfSBE`
- `LEADS_ENDPOINT` (Apps Script) **já configurado e testado** (retorna `{"ok":true}` e
  grava na aba *Qualificados*).
- A preencher: `POS_URL` (página pós-diagnóstico do GHL, quando criada).

## Deploy oficial na Vercel (páginas para rodar tráfego)

Os `ghl/*.html` são fragmentos. O script **`build-site.sh`** embrulha cada um num
HTML completo (charset/viewport/title), aponta o `POS_URL` do quiz para
`/agendamento` (mesma origem) e ainda copia as páginas de validação. Gera assim:

```
site/
├─ index.html        (quiz)          →  /
├─ agendamento.html  (pós-diagnóstico)→  /agendamento
├─ funil.html        (validação)     →  /funil
├─ proposta.html     (validação)     →  /proposta
├─ quiz.html         (validação)     →  /quiz
└─ vercel.json       (cleanUrls)
```

Publicar:

```bash
./build-site.sh /caminho/saida
cd /caminho/saida
vercel deploy --prod --yes --scope simpleacc     # token via VERCEL_TOKEN
```

**No ar (time Simpleacc):**
- Quiz oficial: <https://unicos-diagnostico.vercel.app/>
- Pós-diagnóstico: <https://unicos-diagnostico.vercel.app/agendamento>
- Validação: `/funil`, `/proposta`, `/quiz`

O GTM (`GTM-T9XG58XR`) já está embutido, e o `LEADS_ENDPOINT` aponta para o Web
App do Apps Script (leads caem na aba *Qualificados*). Para o GHL, o destino de
produção continua sendo os fragmentos colados nas páginas do GHL.

## Tracking
Os eventos vão para o `dataLayer` (use o GTM da própria página do GHL): `diag_inicio`,
`diag_pergunta`, `diag_resultado`, `diag_lead`, `diag_lead_aprovado`, `diag_fora_papel`,
`diag_abaixo_piso`, `diag_agendamento_click`. Cada um carrega `utm_content` (criativo) +
`aprovacao` + `balde`, para medir **custo por lead aprovado, por criativo**.

> A versão React (pasta acima) permanece como referência de manutenção. Para o GHL, o que
> vai para produção são estes dois arquivos.
