# Integração Quiz B → Make → GHL + Planilha de Leads

## Funil no ar (produção)

Fluxo: **Quiz → (loading 4s "Gerando seu relatório personalizado") → Relatório → Agendamento → WhatsApp**

| Etapa | URL |
| --- | --- |
| Quiz B | https://quiz-alivance-b.vercel.app |
| Relatório (por pilar) | https://relatorio-alivance-b.vercel.app/?pilar=&nome= |
| Agendamento | https://agendamento-alivance-b.vercel.app/?pilar=&nome= |

A tela de captura do quiz posta o lead no webhook (abaixo), mostra o loading de 4s e
redireciona para o relatório com `?pilar=&nome=`. Quem responde faturamento abaixo de
R$20k cai na tela de saída (não avança e não captura). UTMs da URL do anúncio são
repassados no payload.


Cenário de automação do **Quiz Versão B**, clonado do cenário de produção do Quiz A
(`[Simple] Rafael Granella`), praticamente idêntico. A única diferença estrutural é o
destino no Google Sheets: **mesma planilha, aba separada**.

## Componentes

| Item | Quiz A (produção) | Quiz B (novo) |
| --- | --- | --- |
| Cenário Make | `[Simple] Rafael Granella` (id 4936072) | `[Simple] Rafael Granella - Quiz B` (id 5744483) |
| Webhook | hook 2174227 | **hook 2611315** → `https://hook.us2.make.com/1udj4asnqi1kc6n8je836aunuip1xa63` |
| GHL Contato | tag `lead_quiz`, conexão Rafa | **idêntico** |
| GHL Oportunidade | pipeline "Leads do Quiz", etapa "New Lead" | **idêntico** |
| Planilha | `1eD8ynCpR3wMlVLlb5wk6xXCPui-eMWY0ce3Keor5viw` | **mesma planilha** |
| Aba (sheet) | `Página1` | **`Quiz B`** |

## Fluxo (4 módulos, igual ao Quiz A)

1. **Webhook** (`webhook-rafa-quiz-b`) recebe o payload do quiz.
2. **GHL · Criar Contato** — tag `lead_quiz`, custom fields (resposta_1..7), source = utm concatenadas.
3. **GHL · Criar Oportunidade** — pipeline "Leads do Quiz", etapa "New Lead".
4. **Google Sheets · Add Row** — insere linha na aba `Quiz B` da mesma planilha.

## Payload esperado no webhook (contrato, igual ao Quiz A)

```
nome, email, telefone,
resposta_1 ... resposta_7,
pilar,                         (novo — pilar diagnosticado; opcional)
utm_source, utm_medium, utm_campaign, utm_content, utm_term
```

## Cabeçalho da aba `Quiz B` (linha 1 — 17 colunas, A→Q)

| Col | Cabeçalho |
| --- | --- |
| A | Nome |
| B | Email |
| C | WhatsApp |
| D | Data |
| E | Como você se posiciona hoje? |
| F | Qual é o formato principal da sua entrega hoje? |
| G | Como os seus clientes chegam até você hoje? |
| H | Quem cuida das vendas hoje? |
| I | Como está a sua operação hoje? |
| J | O que mais trava o seu próximo salto de faturamento? |
| K | Qual é o faturamento médio mensal da sua mentoria ou consultoria hoje? |
| L | Pilar diagnosticado |
| M | utm_source |
| N | utm_medium |
| O | utm_campaign |
| P | utm_content |
| Q | utm_term |

## Passos para ativar

1. Na planilha de leads, criar a aba **`Quiz B`** (nome exato) e colar a linha de cabeçalho acima em A1:Q1.
2. Apontar o Quiz B (versão de produção) para o webhook `https://hook.us2.make.com/1udj4asnqi1kc6n8je836aunuip1xa63`, enviando o payload do contrato acima.
3. Rodar um lead de teste e conferir: contato no GHL, oportunidade no pipeline e linha na aba `Quiz B`.
4. Ativar o cenário no Make.

## Observações

- Os **custom fields no GHL** ainda carregam os rótulos das perguntas do Quiz A (o
  cenário foi clonado idêntico). Os dados do Quiz B entram nesses campos por posição.
  Se quiser campos próprios do Quiz B no GHL, criar os campos e remapear o módulo 2.
- A tag `lead_quiz` é a mesma do Quiz A, então os leads do Quiz B entram nas mesmas
  automações (primeira mensagem + cadência de follow-up). Se o Quiz B precisar de uma
  cadência separada, trocar a tag aqui e criar o gatilho correspondente no GHL.
- Coluna **L (Pilar diagnosticado)** é um extra: só preenche se o quiz enviar o campo `pilar`.
