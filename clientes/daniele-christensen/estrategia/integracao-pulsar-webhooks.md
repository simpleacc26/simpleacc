# Integração com a Pulsar — os dois webhooks

**Data:** 17/08/2026
**Origem:** pedido da Pulsar (dois webhooks, cenário na grafia exata, telefone
repassado sem reformatar).
**Status:** implementado e no ar dos dois lados. Falta a Pulsar publicar os
endpoints e liberar CORS.

Este documento é o contrato entre as duas pontas. Quem for mexer no quiz ou no
formulário sem ler isto quebra a integração sem perceber.

## Os endereços

| Etapa | Página no ar | Webhook |
|---|---|---|
| 1 — quiz | `grokker-diagnostico.vercel.app` | `https://pulsar.app.n8n.cloud/webhook/grokker-quiz-etapa1` |
| 2 — diagnóstico completo | `grokker-etapa2-diagnostico.vercel.app` | `https://pulsar.app.n8n.cloud/webhook/grokker-quiz-etapa2` |

Os dois disparam `POST` com `Content-Type: application/json`.

## Etapa 1 — o que sai no fim do quiz

```json
{
  "etapa": 1,
  "enviado_em": "2026-08-17T13:05:00.000Z",
  "nome": "Marcelo",
  "email": "marcelo@empresa.com.br",
  "telefone": "5511987654321",
  "telefone_digitado": "(11) 98765-4321",
  "cenario": "O Gargalo",
  "cenario_indice": 1,
  "diagnostico_pdf": "Diagnostico-02-o-gargalo.pdf",
  "caminho": "A",
  "cargo": "...", "setor": "...",
  "faturamento": "...", "margem": "...",
  "autonomia": "...", "remuneracao": "...",
  "pontuacao": 7,
  "qualificado": true,
  "motivo": "...",
  "respostas": { "P0": "...", "P1": "...", "P7": "..." }
}
```

**`cenario`** vem com uma das quatro grafias abaixo, caractere por caractere,
com acento e maiúscula. Foi o pedido da Pulsar e é o que permite casar com o
material sem tabela de tradução no meio:

| `cenario_indice` | `cenario` | `diagnostico_pdf` |
|---|---|---|
| 0 | `O Adiador` | `Diagnostico-01-o-adiador.pdf` |
| 1 | `O Gargalo` | `Diagnostico-02-o-gargalo.pdf` |
| 2 | `Time que não Assume` | `Diagnostico-03-time-que-nao-assume.pdf` |
| 3 | `Plano que não Vira Execução` | `Diagnostico-04-plano-que-nao-vira-execucao.pdf` |

Quem preferir chave estável a texto usa `cenario_indice`. `diagnostico_pdf` já
diz qual dos quatro arquivos enviar, sem `if` do lado de lá.

**`telefone`** vai normalizado: só dígitos, com `55` na frente. Números de 10 ou
11 dígitos recebem o prefixo; o que já vier com DDI passa direto.
`telefone_digitado` guarda o que o lead escreveu, para conferência quando algo
não casar.

`qualificado` e `motivo` são a régua de corte (dono ≥ R$ 200 mil/mês; executivo
≥ R$ 10 mil com autonomia), já aplicada — não precisa recalcular.

## Etapa 2 — o que sai quando as 15 perguntas terminam

```json
{
  "lead_id": "abc123",
  "etapa": 2,
  "cenario_etapa1": "O Gargalo",
  "telefone": "5511987654321",
  "nome": "Marcelo",
  "respostas": { "A1": 10, "A2": 4, "B1": 8, "...": "..." },
  "blocos": { "A": 7, "B": 9, "C": 7, "D": 8, "E": 8 },
  "td": 7.8,
  "bloco_dominante": "B",
  "lead_hot": false
}
```

São as 15 notas cruas, as 5 médias de bloco, o Total Diagnóstico, o bloco
dominante e a etiqueta de Lead Hot. **Tudo calculado do nosso lado**: o Closer
abre o card e lê, não soma nada.

Lembrete de leitura que precisa aparecer no card: **a escala é invertida, nota
alta é problema grave**. `Sempre = 0 · Geralmente = 4 · Às vezes = 8 ·
Nunca = 10`. Ler nota alta como bom desempenho inverte o sentido da call.

`lead_hot` é `true` quando o TD passa de 8,0 **ou** algum dos blocos A, B ou D
bate 10.

## O link da Etapa 2

É a Pulsar que monta, no disparo do WhatsApp:

```
https://grokker-etapa2-diagnostico.vercel.app/?lead=<id>&nome=<primeiro nome>&email=<e-mail>&telefone=<o mesmo telefone da Etapa 1>&cenario=<cenário da Etapa 1>
```

Tudo com `encodeURIComponent` — os cenários têm acento e espaço.

Só `lead` é obrigatório. `nome` e `email` pré-preenchem o Calendly, para o lead
não redigitar o que já informou. `cenario` é o que mostra ao Closer por onde
abrir a call.

**Sobre o telefone, que foi o ponto levantado:** o formulário da Etapa 2 **não
pergunta o telefone e não reformata o que recebe**. O valor que vier no link é o
valor que volta no webhook, idêntico. Se ele recapturasse, o lead poderia
digitar diferente das duas vezes e os dois registros deixariam de casar — que é
exatamente o que a Pulsar pediu para evitar. Mandem no `telefone` o mesmo valor
que a Etapa 1 entregou em `telefone`.

Por tolerância a quem nomeia o parâmetro de outro jeito, também são aceitos
`phone`, `whatsapp`, `zap`, `tel` e `celular`. O primeiro que aparecer vence.

## O que falta do lado do n8n

Três coisas, e sem elas o envio falha calado:

1. **Publicar os dois webhooks.** Enquanto o n8n estiver em modo de teste, o
   endpoint só aceita uma chamada por clique em "Listen".
2. **Liberar CORS** para os domínios das páginas (ou `*`). O navegador do lead é
   quem posta; sem o cabeçalho, o browser bloqueia antes de sair.
3. **Aceitar `text/plain` além de `application/json`.** Se o `fetch` falhar, o
   envio cai para `navigator.sendBeacon`, que manda o mesmo JSON com
   `Content-Type: text/plain` para não precisar de preflight. O corpo é
   idêntico; muda só o cabeçalho.

O envio nunca segura o lead: falhando tudo, ele vê a agenda do mesmo jeito. Isso
é bom para a experiência e ruim para o diagnóstico, porque a falha é silenciosa —
por isso vale rodar um teste ponta a ponta antes de subir tráfego, olhando o que
chega no n8n.

## Como testar sem tráfego real

Na Etapa 1, responder o quiz até o fim com dados de teste.
Na Etapa 2, abrir com os parâmetros e responder as 15 perguntas:

```
https://grokker-etapa2-diagnostico.vercel.app/?lead=teste-001&nome=Marcelo&email=teste@empresa.com.br&telefone=5511987654321&cenario=O%20Gargalo
```

Os atalhos de preenchimento existiam só no protótipo e saíram da produção: o
lead nunca deve ver a nota dele nem o payload do CRM. Para inspecionar o JSON
exato sem publicar nada, abra `funis/prototipo-etapa2/index.html` do disco.

## Pendências fora deste contrato

- **A automação antiga ainda está no ar.** O lead que clica hoje recebe a
  mensagem antiga, que fala em sessão estratégica antes da Etapa 2. A sequência
  aprovada está em `copy/whatsapp-entrega-diagnostico.md`.
- **O domínio próprio.** `quiz.grokkeronline.com/quiz` e `/lp` ainda servem o
  funil antigo. Tudo o que está descrito aqui vive nas URLs da Vercel.
