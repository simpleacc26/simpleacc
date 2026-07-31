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
1. Abra a planilha de leads → Extensões → Apps Script.
2. Cole `apps-script.gs`. Rode `testar` uma vez (autorize) para criar as abas
   **Qualificados** e **Desqualificados** com os cabeçalhos certos. Apague depois as
   linhas de teste.
3. Implantar → Nova implantação → App da Web (Executar como: eu · Acesso: qualquer pessoa).
4. Copie a URL `.../exec`.

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
             ├─ dono/sócio + faturamento ≥ R$1M ─▶ salva lead (aba Qualificados)
             │                                    └▶ POS_URL?balde=…  (agendamento)
             └─ não-dono OU < R$1M ─▶ conta (aba Desqualificados) ─▶ grupo do WhatsApp
```

## Valores já configurados
- Calendário GHL: `https://api.leadconnectorhq.com/widget/booking/leFMFKegfdvDRIE1b42I`
- Comunidade (WhatsApp): `https://chat.whatsapp.com/B6rtIEWe7jcHseToLdfSBE`
- A preencher: `LEADS_ENDPOINT` (Apps Script) e `POS_URL` (página do GHL).

## Tracking
Os eventos vão para o `dataLayer` (use o GTM da própria página do GHL): `diag_inicio`,
`diag_pergunta`, `diag_resultado`, `diag_lead`, `diag_lead_aprovado`, `diag_fora_papel`,
`diag_abaixo_piso`, `diag_agendamento_click`. Cada um carrega `utm_content` (criativo) +
`aprovacao` + `balde`, para medir **custo por lead aprovado, por criativo**.

> A versão React (pasta acima) permanece como referência de manutenção. Para o GHL, o que
> vai para produção são estes dois arquivos.
