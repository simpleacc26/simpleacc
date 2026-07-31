# Plano de publicação e métricas — Diagnóstico ÚNICOS

Status: peças prontas e testadas (quiz = v4, página = v8, relatório = copy do cliente).
**Em validação com Carol e José.** Este é o checklist para ir ao ar rápido assim que aprovar.

## 1. O que precisamos de vocês (só configuração, não dá para inventar)

| Item | Para quê | Quem |
|---|---|---|
| **Apps Script publicado** na planilha de leads → URL `/exec` | gravar o lead (`LEADS_ENDPOINT`) | vocês rodam o `ghl/apps-script.gs` |
| **Página pós-diagnóstico criada no GHL** → URL pública | destino do aprovado (`POS_URL`) | vocês criam a página |
| **Acesso ao GHL** (quem cola os blocos de código) | publicar as duas páginas | definir |
| **GTM** (container já é `GTM-MP9NJX24`) | ligar as conversões | confirmar acesso |
| **Disparo do relatório no WhatsApp** | como a análise chega ao lead (workflow do GHL? Make?) | definir |

## 2. Passo a passo de go-live (depois da aprovação)

1. **Planilha:** colar `ghl/apps-script.gs` no Apps Script, rodar `testar` (cria as abas),
   Implantar → App da Web → copiar a URL `/exec`.
2. **GHL – diagnóstico:** criar a página, colar `ghl/diagnostico.html` num bloco de código,
   preencher no `CONFIG`: `LEADS_ENDPOINT` (passo 1) e `POS_URL` (passo 3).
3. **GHL – pós-diagnóstico:** criar a página, colar `ghl/pos-diagnostico.html`, copiar a URL
   pública → jogar em `POS_URL` do passo 2.
4. **Teste ponta a ponta:** 1 lead qualificado (deve cair na aba *Qualificados*), 1
   desqualificado (deve contar na aba *Desqualificados*), conferir redirects e o calendário.
5. **GTM:** publicar as tags (ver seção 3).

## 3. Métrica: custo por lead aprovado, por criativo

O funil já emite estes eventos no `dataLayer`, cada um com `utm_content` (criativo) +
`aprovacao` (pleno/tier2) + `balde`:

`diag_inicio` · `diag_pergunta` · `diag_resultado` · `diag_lead` · `diag_lead_aprovado`
· `diag_fora_papel` · `diag_abaixo_piso` · `diag_agendamento_click` · `diag_comunidade_click`

- **No GTM:** criar gatilhos para `diag_lead_aprovado` e `diag_agendamento_click` e mandar
  como conversão para a Meta e/ou GA4, carregando `utm_content`.
- **Na planilha:** a aba *Qualificados* grava `tier` + `utm_content`. A aba **Painel** (criada
  automaticamente pelo `setup()` do Apps Script) já lista os criativos, conta os aprovados
  (pleno/tier2) por criativo e calcula o **custo por lead aprovado por criativo** = verba ÷
  aprovados. Basta preencher a coluna "Verba do criativo" por `utm_content`.

## 4. Convenção de UTM (para anúncio, GTM e planilha baterem)

Cada anúncio precisa carregar UTMs no link do "Saiba mais":

- `utm_source=meta` · `utm_medium=paid`
- `utm_campaign=<campanha>` (ex.: `diagnostico-ago`)
- `utm_content=<id do criativo>` → **é a chave do "por criativo"** (ex.: `card-a-industria`,
  `card-e-oportunidade`, `teste-3-genz`). Um valor único por criativo/variação.
- `utm_term` opcional (ângulo/teste).

Sem `utm_content` único por criativo, não dá para fechar o custo por criativo.

## 5. Pendências de conteúdo (a confirmar na validação)

- **Depoimentos:** o v8 usa Tamiris Felippin, Patrícia Librelotto e Juliane Marques.
  Confirmar se ficam esses.
- **Relatório no WhatsApp:** validar a copy (é a que montamos com o material do cliente) e
  definir como dispara.
- **"4x o faturamento em 4 meses":** confirmar que a prova pode ser usada assim.
