# Quiz · Diagnóstico de Autoridade (Luana Isse)

Funil de quiz da Luana Isse. Anúncio ou bio → quiz de 9 passos → captura →
tela de carregamento → diagnóstico personalizado com CTA de WhatsApp.

**No ar:** https://quiz-luana-isse-simpleacc.vercel.app

## O que é

Segue o blueprint `references/estrutura-invisivel.md` da skill
`gerar-quiz-diag-pag-pos-quiz` (a estrutura que converte, mapeada do funil da
Pâmella Mello e refinada no do Felipe Damasceno), com a copy, o índice e a
identidade visual da Luana por cima.

- **Índice:** IRV, Índice de Ruptura de Valor. Só as perguntas de diagnóstico
  pontuam (situação, problema, impacto, o que já tentou, perfil). Faixas:
  ≥ 66% Alta · 33 a 65% Média · < 33% Baixa.
- **Pilar dominante:** sai da pergunta de problema e mapeia para um dos quatro
  pilares do MMPV (Mentalidade, Movimento, Posicionamento, Vendas). É o que
  personaliza a leitura e o "o que precisa acontecer agora".
- **Qualificação em 3 faixas:** qualificado · nutrir · fora. Ninguém leva porta
  na cara: o CTA final muda de texto conforme a faixa.
- **3 CTAs de WhatsApp distribuídos** no diagnóstico, não um só no fim.

## Arquivos

| Arquivo | O que é |
|---|---|
| `index.html` | Casca do quiz (marca + barra de progresso) |
| `flow.js` | **Toda a copy e a lógica de pontuação.** Mexer aqui, não no app.js |
| `app.js` | Motor: render, validação, persistência, tracking, envio do lead |
| `diagnostico.html` | Casca do relatório |
| `diagnostico.js` | Monta o diagnóstico personalizado |
| `styles.css` | Identidade visual (marfim, dourado, serifada) |
| `integracao-planilha.gs` | Apps Script que grava o lead na planilha |

## Decisões que fogem da base da skill (todas de propósito)

1. **Sem contador "Pergunta X de N".** Pedido do cliente: o número faz o quiz
   parecer longo. Ficou a barra, a porcentagem e um rótulo neutro
   (Começando → Seu diagnóstico → Última pergunta).
2. **Apps Script no lugar do Make.** Gratuito, não consome operação e não fica
   varrendo nada. Dispara só quando chega lead.
3. **`text/plain` no POST do lead.** O `/exec` do Apps Script não responde ao
   preflight OPTIONS, então `application/json` quebraria por CORS. `text/plain`
   é requisição simples e passa direto; o `.gs` faz `JSON.parse` do mesmo jeito.
   A regra de `application/json` do blueprint vale para webhook do Make.

## Planilha de leads

**Leads · Diagnóstico de Autoridade · Luana Isse**, no Drive dela, pasta
"3. Estratégia e Tráfego":
https://docs.google.com/spreadsheets/d/14QWEtzfTYxLcImWQW_Pcw0BJtNK1BY14jthvCUKhxLo/edit

Cabeçalho de 25 colunas já criado: data, contato, IRV, faixa, pilar,
qualificação, as 9 respostas por extenso, frente, origem, página e as 5 UTMs.

Para ligar, siga o passo a passo no topo de `integracao-planilha.gs` e mande a
URL `/exec` para colarmos em `app.js > LEADS_ENDPOINT`.

## Pendências antes de mandar tráfego

- [ ] **WhatsApp comercial da Luana** em `flow.js > marca.whatsapp` (só dígitos,
      ex.: `5548999999999`). Sem isso os 3 CTAs não abrem conversa.
- [ ] **URL `/exec`** do Apps Script em `app.js > LEADS_ENDPOINT`.
- [ ] Pixel da Meta e GA4 em `app.js > TRACKING_CONFIG`, se for rodar tráfego pago.

## Como rodar e publicar

Site estático puro, sem build e sem dependência. Para ver local, abra
`index.html` no navegador ou sirva a pasta (`python3 -m http.server`).

Deploy na Vercel, **time Simpleacc**, projeto `quiz-luana-isse`, target
production. Nunca publicar em conta pessoal.
