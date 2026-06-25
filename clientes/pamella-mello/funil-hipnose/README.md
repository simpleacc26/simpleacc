# Funil de Hipnose — Pâmella Mello

Funil de aquisição da clínica: **Hero → Quiz (leitura emocional) → Captura de
lead → Relatório de diagnóstico personalizado**, com CTA para a Sessão de
Avaliação no WhatsApp. Implementa a **Estratégia aprovada** pela cliente
(ver [`../materiais/`](../materiais/) e o doc no Drive).

Segue a **estrutura-padrão de funil da Simple Acc** (mesma do Instituto Sabrina
Siqueira): site estático, sem build, sem dependências.

## Estrutura (estática — sem build)

```
index.html        Hero + barra de progresso + container do quiz
styles.css        Sistema visual (CSS vars; paleta ametista/lilás)
flow.js           TODA a copy: marca, hero, 9 perguntas, captura (window.FLOW)
app.js            Motor do quiz: render, auto-avanço, máscara, validação,
                  persistência (sessionStorage), "continuar de onde parou",
                  tracking plugável e envio de lead → redireciona p/ diagnóstico
diagnostico.html  Página do relatório
diagnostico.js    Monta a leitura personalizada a partir das respostas + CTA
```

Para editar perguntas/textos, mexa **só no `flow.js`**.

## Fluxo

1. **Hero + Quiz** — 9 perguntas na ordem SPIN (situação → problema → tempo →
   impacto → tentativas → objetivo → e qualificação por último: para quem é ·
   onde está · prontidão). Auto-avanço ao escolher; barra de progresso; "Voltar".
2. **Captura** — Nome\* + WhatsApp\* (com máscara) + e-mail (opcional). Respostas
   + UTMs vão para o `LEADS_ENDPOINT` (se configurado) e ficam em sessionStorage.
3. **Diagnóstico** — leitura personalizada (frases `report` de cada resposta)
   com CTA adaptado ao nível de qualificação, levando ao WhatsApp da clínica.

## Lógica de qualificação (do doc de Estratégia)

- **Qualificado** (prontidão = "resolver de vez"/"entender antes" **e** no Brasil)
  → CTA forte: *Quero agendar minha Sessão de Avaliação*.
- **Nutrição** (prontidão = "algo pontual"/"só pesquisando", flag `nutrir`) → CTA
  suave: *Quero entender melhor como funciona*.
- **Fora do Brasil** (flag `foraDeArea`) → mensagem respeitosa + *Falar com a equipe*.

Qualifica por **intenção e prontidão**, não por pergunta crua de renda (premissa
do doc — público emocionalmente sensível).

## O que falta preencher (sem segredos no repo)

| Onde            | O quê                                                                 |
| --------------- | --------------------------------------------------------------------- |
| `flow.js`       | `marca.whatsapp` — número comercial (DDI+DDD+número, só dígitos).      |
| `app.js`        | `LEADS_ENDPOINT` — webhook do Make/Apps Script p/ planilha de leads.  |
| `app.js`        | `TRACKING_CONFIG` — GA4 / Meta Pixel / webhook quando a cliente liberar.|
| `diagnostico.js`| Trocar `[DEPOIMENTO 1/2]` por provas sociais reais.                    |
| `styles.css`    | Paleta/logo provisórios — ajustar ao brand kit oficial.               |

## Como rodar

É estático: basta abrir o `index.html`, ou servir a pasta:

```bash
npx serve .        # ou: python3 -m http.server
```

## Deploy (Vercel)

Projeto **estático** (framework "Other"), publicado como projeto próprio na conta
Vercel da Simple Acc — padrão dos demais funis (deploy direto da pasta, sem
git connect).

- **Projeto Vercel:** `funil-pamella-mello` (team `simpleacc`)
- **URL de produção:** https://funil-pamella-mello.vercel.app
- **Redeploy:** `vercel deploy --prod --yes --scope simpleacc` de dentro da pasta
  (precisa de um token Vercel — nunca commitar o token).
