# Diagnóstico de Maturidade do Negócio — ÚNICOS

Funil do cliente Carol e José (ÚNICOS · Leadership Club). Reconstruído do zero a partir
dos documentos reformulados por Carol e José após o Pit Stop de 24/07 (Guia da Nova
Campanha, Diagnóstico v4, Página Pós-Diagnóstico v8) e das decisões do cliente registradas
em `../../estrategia/`.

## O que é

Três telas de funil, uma stack:

1. **Diagnóstico** (`/`) — 8 perguntas, uma por tela (a Q4 tem duas partes na mesma tela),
   abrindo pela dor (dias sem depender de você) e fechando na captura de lead
   ("Estágio 2: No Limite", análise enviada por WhatsApp).
2. **Página pós-diagnóstico** (`/agendamento`) — página de agendamento da sessão estratégica
   (v8), com a **situação/balde** do lead destacada e a reversão de risco.
3. **Comunidade** (`/comunidade`) — caminho dos desqualificados (papel não-dono ou porte
   abaixo do piso), sem formulário, contagem anônima.

Stack: React + Vite + TypeScript. Tracking centralizado no GTM.

> **Produção = GHL.** O que vai para o ar são os arquivos self-contained em [`ghl/`](./ghl/)
> (HTML/CSS/JS puro para colar no GHL, com a logo e a paleta reais + Apps Script da
> planilha). Esta versão React é a **referência de manutenção** da copy e da lógica.

## Decisões que viraram regra (ver `src/lib/scoring.ts`)

1. **Filtro de papel** é o corte real: `Diretor/executivo` e `Nenhuma dessas` saem do
   agendamento e vão para `/comunidade`.
2. **Piso de faturamento** R$1M/ano: `Até R$1 milhão` vai para `/comunidade` (Jornada 1).
3. **Aprovado** = dono/sócio **E** porte ≥ ICP do setor (indústria R$3–10M+, demais R$1–3M+);
   acima do piso mas abaixo do ICP = **tier 2**, contabilizado à parte.
4. **Resultado único** "Estágio 2: No Limite", com **balde** (uma das 4 situações) computado
   por dentro para segmentar leitura, relatório e comercial.
5. **Margem** permanece como pergunta (Q8), fora dos ganchos de comunicação.
6. **Reversão de risco** na sessão (bloco 3 da página).

> ⚠️ Limitação conhecida: as faixas de faturamento da v4 não cortam exatamente em R$5M/R$2M.
> A classificação pleno/tier2 aproxima pela faixa que contém o corte. Para tier 2 nítido em
> serviços, desmembrar as faixas (R$1–2M / R$2–5M). Detalhe em `src/lib/scoring.ts`.

## Rodar local

```bash
npm install
cp .env.example .env.local   # preencha os valores
npm run dev
```

## Configuração (não versionada) — `PREENCHER` antes de publicar

Definir no painel da Netlify (Site settings → Environment):

| Variável | O que é |
|---|---|
| `VITE_LEADS_ENDPOINT` | endpoint do Make/Apps Script que grava o lead na planilha |
| `VITE_WHATSAPP` | WhatsApp destino, só dígitos com DDI (ex.: 5551999999999) |
| `VITE_AGENDAMENTO_URL` | link do Calendário nativo do GHL (aprovados) |
| `VITE_COMUNIDADE_URL` | link da comunidade / Jornada 1 (desqualificados) |
| `VITE_GTM_ID` | opcional, default `GTM-MP9NJX24` |

## Deploy (Netlify)

O `netlify.toml` já aponta `base`/`publish` para esta subpasta e trata o SPA. Conectar o
repositório na conta/time da **Simple** na Netlify e apontar para este diretório; a Netlify
builda a cada push. Preencher as variáveis acima antes do primeiro deploy.

## Tracking e a régua nova

A métrica do contrato passou de "custo por lead" para **"custo por lead aprovado, por
criativo"**. Todo evento carrega `utm_content` (criativo) + `aprovacao` (pleno/tier2) +
`balde`. Eventos no `dataLayer`: `diag_inicio`, `diag_pergunta`, `diag_resultado`,
`diag_lead`, `diag_lead_aprovado`, `diag_fora_papel`, `diag_abaixo_piso`,
`diag_agendamento_click`, `diag_comunidade_click`.

## Pendências do cliente para publicar

- Endpoint de leads + planilha no Drive (colunas já previstas em `src/lib/leads.ts`).
- Número de WhatsApp, link do GHL e link da comunidade.
- Logo oficial do ÚNICOS (hoje usamos wordmark tipográfico).
