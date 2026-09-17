# Lucas Sobreiro · Método BIO

Mentoria de evolução empresarial para donos de clínica e profissionais da saúde.
Produto principal: **BIO Society** (high ticket). Degrau de entrada: **BIO Essential**.

## O que tem aqui

- `estrategia/` — a proposta aprovada dos dois quizzes (método ASK) e os documentos de estratégia.
- `funis/diagnostico-clinica/` — Quiz A "O Vazamento", tipo Killer.
- `funis/raio-x-clinica/` — Quiz B "Índice de Dependência", tipo Score.

## Os dois funis

| | Quiz A | Quiz B |
| --- | --- | --- |
| Tipo ASK | Killer | Score |
| Âncora | o dinheiro que já entra e some | a cena de sair e algo parar |
| Entrega | vazamento nomeado + estimativa em reais | índice de 0 a 100 + três fatores |
| Aba na planilha | `Quiz A` | `Quiz B` |
| URL | https://lucas-diagnostico-clinica.vercel.app | https://lucas-raio-x-clinica.vercel.app |
| Projeto na Vercel | `lucas-diagnostico-clinica` | `lucas-raio-x-clinica` |

Rodam em sequência, não em paralelo: com o volume atual um teste simultâneo
não é legível. A Versão A sobe primeiro.

## Como rodar local

```bash
cd clientes/lucas-sobreiro/funis/diagnostico-clinica
python3 -m http.server 8111   # abre em http://127.0.0.1:8111
```

Zero dependência, zero build. É HTML, CSS e JS puro.

## Integrações

- **Planilha de leads:** a mesma do funil anterior, segmentada por aba
  (`Quiz A` e `Quiz B`).
- **Make:** cenário `[Lucas Sobreiro] Funil Clínica → Sheets` (id 5747069), webhook instant
  com router de três saídas, filtrando pelo campo `quiz` do payload:
  `A` → aba `Quiz A`, `B` → aba `Quiz B`, ausente → aba `Untitled` (funil antigo).
  A rota do funil antigo tem filtro negativo explícito: sem ele o Make a trata como
  "sempre roda" e cada lead novo era gravado duas vezes.
  As rotas Quiz A e Quiz B gravam com `valueInputOption: RAW`, não `USER_ENTERED`.
  Com USER_ENTERED o Sheets lê o `utm_id` como número e o ID de 18 dígitos do Meta
  perde precisão: `120248121169420701` vira `120248121169420704`, e o cruzamento
  entre planilha e Meta quebra sem erro nenhum. RAW também mantém a data legível.
- **Meta Pixel:** `1096905346357097`, o mesmo nos dois. Evento de conversão: `Lead`.
  Eventos de leitura do funil: `InitiateCheckout`, `QuizStep`, `QuizCaptura`,
  `ViewContent`, `Contact`.
- **WhatsApp do CTA:** 55 51 98111-5195.

## Pendências do cliente

- A qual dos quatro grupos pertence cada depoimento, para casar a prova com o lead.
- Validação das taxas de referência de fechamento de orçamento.
