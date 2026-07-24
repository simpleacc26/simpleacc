# Migrar o funil B (quiz + relatório + agendamento) da Vercel pro GoHighLevel

Objetivo: hospedar as 3 páginas dentro do GHL, mantendo o **mesmo design**, a **lógica de diagnóstico por pilar** e a **captação atual via Make** (webhook → contato + oportunidade + planilha + cadência). Só muda o host e o domínio.

Os blocos prontos pra colar estão nesta pasta:
- `quiz-ghl-embed.html`
- `relatorio-ghl-embed.html`
- `agendamento-ghl-embed.html`

Cada arquivo já vem sem `<html>/<head>/<body>`: é só `<style>` + conteúdo + `<script>`, no formato que o elemento **Custom Code / HTML** do GHL espera.

---

## Passo 1 — Criar o funil e os 3 passos

1. No GHL: **Sites → Funnels → New Funnel**. Nome sugerido: `Alivance - Funil Quiz B`.
2. Crie **3 steps** (passos), nesta ordem, com estes paths (URL):
   - Step 1 — `quiz-b` (path `/quiz-b`)
   - Step 2 — `relatorio-b` (path `/relatorio-b`)
   - Step 3 — `agendamento-b` (path `/agendamento-b`)
3. Em cada step, apague as seções padrão e deixe **uma seção full-width, sem padding** (Section settings → Width: Full, Padding: 0). Isso evita margens sobrando em volta da nossa página.

## Passo 2 — Colar o código de cada página

Para cada step:
1. Arraste um elemento **Custom Code** (ou "Custom JS/HTML") pra dentro da seção.
2. Abra o elemento e **cole o conteúdo inteiro** do arquivo correspondente:
   - `/quiz-b` → `quiz-ghl-embed.html`
   - `/relatorio-b` → `relatorio-ghl-embed.html`
   - `/agendamento-b` → `agendamento-ghl-embed.html`
3. Salve.

> Observação: o GHL só executa o JavaScript na **página publicada** (não no preview do editor). Se no editor parecer "parado", publique e teste na URL real.

## Passo 3 — Ajustar os links internos (redirects do funil)

Como agora tudo vive no GHL, os redirects precisam apontar pros steps do GHL, não pra Vercel.

1. **No `quiz-ghl-embed.html`**, dentro do `<script>`, edite:
   ```
   var RELATORIO_URL = 'https://SEU-DOMINIO/relatorio-b/';
   ```
   (troque `SEU-DOMINIO` pelo domínio do funil no GHL). O `WEBHOOK_URL` do Make já está correto, não mexa.
2. **No `relatorio-ghl-embed.html`**, edite:
   ```
   var AGENDA_BASE = 'https://SEU-DOMINIO/agendamento-b';
   ```
3. O `agendamento` é o último passo, não redireciona (só abre o WhatsApp). Confira o número: `phone=5554933002628`.

> Os parâmetros `?pilar=` e `?nome=` são repassados automaticamente de um step pro outro, então a personalização continua funcionando.

## Passo 4 — GTM (tracking) no GHL

O GTM **não** vai dentro dos blocos de código (por isso removi dos embeds). Coloque uma vez só, no funil inteiro:

1. **Funnel → Settings → Tracking Code**.
2. Em **Head**, cole o snippet de `<head>` do GTM (`GTM-5WS9MLHF`).
3. Em **Body**, cole o snippet `<noscript>` do GTM.

Assim o GTM carrega em todos os steps, e os eventos que a gente já criou (`quiz_b_start`, `quiz_b_lead`, `relatorio_view`, `agendar_click`, `agendamento_view`, `agendamento_whatsapp`) continuam disparando no dataLayer normalmente.

**Snippet Head:**
```html
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5WS9MLHF');</script>
<!-- End Google Tag Manager -->
```
**Snippet Body:**
```html
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5WS9MLHF"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
```

## Passo 5 — Domínio

- **Funnel → Settings → Domain**: aponte pro domínio/subdomínio que você quer (ex.: `quiz.rafaelgranella.com.br` ou um `diagnostico.rafaelgranella.com.br`).
- Depois de definir o domínio, volte no Passo 3 e coloque o domínio real nos `RELATORIO_URL` e `AGENDA_BASE`.

## Passo 6 — Testar ponta a ponta (antes de trocar o anúncio)

1. Publique o funil e abra `https://SEU-DOMINIO/quiz-b?utm_source=teste&utm_campaign=teste`.
2. Responda o quiz, preencha os dados de teste, confira:
   - Loading de 4s + redirect pro `/relatorio-b` com o pilar certo;
   - Relatório personalizado → botão leva ao `/agendamento-b`;
   - Agendamento abre o WhatsApp com a mensagem certa.
3. No **Make**, confirme a execução do cenário e a linha na aba `Quiz B` da planilha (igual fizemos no teste da Vercel).
4. No **GTM (modo Visualizar)** e no Gerenciador de Eventos da Meta, confirme `quiz_b_lead` / SubmitApplication disparando.
5. Só depois troque o link do anúncio pra nova URL do GHL.

## Observações importantes

- **A lógica do quiz continua no nosso JS.** O "Survey" nativo do GHL não faz a soma ponderada dos pilares nem o desempate, então mantivemos o código próprio de propósito.
- **Fontes (Fahkwang/Inter):** já vão no `<link>` dentro de cada bloco, carregam normal.
- **Imagens do agendamento** (logo, foto do Rafa, prints) apontam pra `lp.rafaelgranella.com.br`. Se um dia esse domínio sair do ar, suba as imagens na Mídia do GHL e troque os `src`.
- **Bloco grande:** o `agendamento` tem ~41 KB (CSS do Tailwind embutido). O GHL aceita, mas cole tudo de uma vez; não corte no meio.
- Mantivemos as páginas na Vercel funcionando. Só desligue/redirecione a Vercel depois que o GHL estiver validado.
