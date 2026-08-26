# Funil de quiz — Hipnose Clínica (Pâmella Mello)

Quiz de qualificação + página pós-quiz (leitura emocional) do funil de tráfego
pago da cliente. HTML/JS puro, sem build, sem dependências.

## Origem deste código

Este código **não foi versionado desde o início** — o funil foi publicado
direto na Vercel em sessões anteriores, sem passar por este repositório. Os
arquivos aqui foram **reconstruídos em 26/08/2026 a partir do site em produção**
(`https://funil-hipnose.vercel.app`), para que o repo volte a ser a fonte da
verdade. A partir de agora, qualquer alteração deve entrar por aqui e ser
reimplantada, não editada direto na Vercel.

## Estrutura

- `index.html` — o quiz (9 perguntas + captura de lead).
- `flow.js` — **toda a copy do quiz vive aqui** (hero, perguntas, captura).
  Regra de escrita da conta: nunca usar travessão.
- `app.js` — lógica do quiz: navegação, classificação de lead
  (`classificarLead`), envio pro webhook do Make (planilha de leads).
- `diagnostico.html` / `diagnostico.js` — página pós-quiz (leitura
  personalizada), monta o texto a partir das respostas em `sessionStorage`.
- `styles.css` — identidade visual (marfim, espresso, dourado).
- `depoimentos/` — 8 prints reais de avaliação usados na página de
  diagnóstico.

## Deploy

Projeto Vercel `funil-hipnose` (time `simpleacc`), domínio de produção
`quiz.pamellamellohipnoterapia.com.br` (+ `funil-hipnose.vercel.app`).

## Pendência conhecida

`index.html` e `diagnostico.html` referenciam `src="logo.png"`, mas esse
arquivo **retorna 404 no site em produção**. Não achamos a origem — falta
subir o logo ou remover a referência. Não bloqueia o quiz (a tag de imagem
quebrada não impede o funcionamento), mas vale corrigir.

## Contexto de estratégia

Big Idea, ICP, mecanismo e identidade visual completos em
`../../contexto/dossie-cliente.md`.
