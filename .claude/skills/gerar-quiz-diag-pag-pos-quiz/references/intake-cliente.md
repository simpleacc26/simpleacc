# Intake — o que coletar do cliente (pergunte o que faltar)

Antes de construir, confirme cada item. Se faltar, **pergunte ao usuário ou peça
o material**. Não invente dados do cliente (nome, número, cor, depoimento).

## Obrigatório
- **Copy aprovada**: o conteúdo do quiz, da página pós-quiz e do relatório. Vem
  do documento de estratégia (skill `estrategia-cliente`) já aprovado pelo
  cliente. Se não existir, avise que precisa disso primeiro.
- **Qual frente** (se o cliente tiver mais de uma, ex.: inclusão x implantes).
  Construa uma por vez, salvo pedido contrário.
- **WhatsApp do cliente** (número com DDD) — destino do CTA. Formato pra usar no
  link: só dígitos com país, ex.: `5533999999999`.
- **Pasta do cliente no Google Drive** — onde criar a planilha de leads. Se não
  souber, busque pelo nome do cliente ou pergunte.
- **Conta/Time Vercel** onde publicar (normalmente o time da empresa). Confirme
  qual e que o CLI/login tem acesso (veja `deploy-vercel.md`).

## Identidade visual (peça ou ofereça propor)
- **Paleta** (hex de primária/realce/fundo/texto) ou o brandbook.
- **Logo** em PNG (fundo transparente) ou SVG. Foto/mockup não serve para
  produção — peça o arquivo. Enquanto não vier, use um wordmark provisório e
  deixe o slot pronto.
- **Fontes** da marca (se houver). Por padrão, use stack de sistema (sem
  dependência externa). Veja `identidade-visual.md`.
- Se o cliente não tiver identidade definida, ofereça **propor** uma coerente com
  o nicho e o tom, e siga após o ok.

## Opcional / quando houver
- **Depoimentos/antes-e-depois** reais (com autorização) para o relatório. Sem
  eles, deixe placeholders `[DEPOIMENTO]` e sinalize como pendência.
- **UTMs/Tracking**: IDs de GA4/Meta Pixel se quiserem (vão em `TRACKING_CONFIG`
  no `app.js`). Sem IDs, o tracking só loga no console (ok).
- **Domínio próprio**: se houver, dá pra apontar depois; por padrão usa `*.vercel.app`.

## Saída do intake
Um resumo curto do que recebeu + o que assumiu + o que ficou pendente, e
confirmação para seguir para o build.
