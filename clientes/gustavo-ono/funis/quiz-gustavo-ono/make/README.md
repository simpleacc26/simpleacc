# Integração Make do quiz

O quiz não fala com o Make direto do navegador. O caminho é:

```
quiz (browser) → /api/lead (função serverless na Vercel) → Make → GHL + Planilha
```

A função `api/lead.js` existe porque **ad blockers bloqueiam silenciosamente
`fetch()` do browser para `hook.us2.make.com`**. Em julho de 2026 isso derrubou a
captação por uma semana, com o Make registrando zero execuções e os leads sumindo
sem rastro. O proxy no servidor resolve: para o navegador, a requisição é
same-origin.

> Se algum dia alguém mudar `WEBHOOK_URL` no `App.tsx` para apontar direto ao
> Make, a captação volta a quebrar de forma invisível. Não faça isso.

## Cenário

| | |
|---|---|
| Nome | `[Gustavo Ono] Quiz Novo (quiz-gustavo-ono.vercel.app)` |
| ID | `5619844` |
| Time (Make) | `1317940` — Time Simple Acc |
| Webhook | hook `2557867`, label `quiz-gustavo-ono-novo` |
| Planilha | `1oOgRcaOIWHCMHXgIxywLQ-81qEhosvEGrtKqQfPQnpM`, aba **`diagnostico gustavo`** |
| CRM | GHL, location "CRM Gustavo Ono", pipeline "Funil do Marketing", etapa "New Lead" |

Fluxo dos módulos: **Webhook → gravar linha na planilha → criar contato no GHL →
criar oportunidade.**

### Por que a planilha vem antes do GHL

Até 19/08 a ordem era webhook → GHL → planilha, e isso tinha um buraco: o módulo
de criar contato roda com `onerror: Ignore`, que **encerra o pacote** quando o
GHL recusa. Resultado, uma lead que o GHL rejeitasse (telefone que ele considera
inválido, contato duplicado, conexão expirada, instabilidade) sumia inteira: sem
contato, sem oportunidade e **sem linha na planilha**. Nada aparecia como erro,
a execução ficava marcada como sucesso com 2 operações em vez de 4.

Com a planilha primeiro, a lead está salva antes de qualquer coisa poder falhar.
Uma falha no GHL passa a custar só o registro no CRM, que dá para recuperar
depois olhando a planilha.

Teste que comprova, feito em 19/08 disparando o webhook em produção:

| Telefone | Antes | Depois |
|---|---|---|
| `11900000000` (o GHL recusa) | 2 operações, lead perdida | 3 operações, linha gravada |
| `(11) 98765-4321` | 4 operações | 4 operações |

## Backups

`blueprint-5619844-2026-08-12-antes-rota.json` é o blueprint antes de
acrescentarmos os campos `rota` e `curso_anterior`.

`blueprint-5619844-2026-08-19-antes-planilha-primeiro.json` é o blueprint com a
ordem antiga (GHL antes da planilha).

Para restaurar qualquer um, use `scenarios_update` com o JSON inteiro (o update
**substitui** o blueprint, não faz merge).

## Campos enviados pelo funil

Além de `nome`, `email`, `whatsapp` e os cinco `utm_*`:

| Campo | Origem | Observação |
|---|---|---|
| `combinacao` | Q0 perfil | |
| `carro_chefe` | Q1 | decide a rota junto com `seguranca` |
| `tempo` | Q2 | |
| `motivacao` | Q3 | |
| `frustracao` | Q4 | usado no diagnóstico dos pilares |
| `canal_de_vendas` | Q5 | |
| `impedimento` | Q6 | usado no diagnóstico dos pilares |
| `curso_anterior` | Q7 | **campo novo**, substituiu `dominasse` |
| `seguranca` | Q8 faturamento | nome herdado; o conteúdo é faturamento |
| `rota` | calculado | **campo novo**, `A` ou `B` |

`rota` é o campo que permite medir se a segmentação aprovada em 07/08 funcionou.
Sem ele na planilha, não dá para comparar conversão por rota.

## Estado atual (12/08/2026)

Alterações já aplicadas e testadas em produção:

- Interface do webhook: `dominasse` saiu, entraram `curso_anterior` e `rota`.
- GHL: o custom field `BMPRUmFSEmt7qXObeGe7` passou a receber `curso_anterior`.
  **Esse campo ainda se chama "Dominasse" no GHL** — vale renomear lá para
  "Curso anterior", senão o rótulo engana quem olha o contato.
- Planilha: colunas **R = `Rota`** e **S = `Curso Anterior`** criadas na aba
  `quiz novo`. A coluna L (`Dominasse`) foi mantida com o histórico e simplesmente
  para de receber dados.
- Sheets do cenário: mapeamento atualizado para as duas colunas novas.

Teste feito em 12/08 disparando o webhook direto: a linha entrou com
`Rota = A` e `Curso Anterior` preenchido, com todos os demais campos intactos.
**A linha e o contato de teste ("TESTE SimpleAcc IGNORAR") precisam ser
apagados** da planilha e do GHL.

### O que ainda não foi feito

- `rota` não vai para o GHL, só para a planilha. Levar para o CRM como **tag**
  seria o ideal (o SDR veria na hora se é Rota A ou B), mas o módulo de criação
  de contato tem `onerror: Ignore`: se o formato da tag estiver errado, o contato
  falha em silêncio e a oportunidade seguinte quebra junto. Merece um teste
  dedicado antes de entrar.


## Aba própria da campanha (18/08/2026)

Até 18/08 o cenário gravava na aba `quiz novo`, que é compartilhada com outra
campanha. Como esta é uma campanha nova, ela ganhou aba própria:
**`diagnostico gustavo`**, com 19 colunas, criada já no formato final:

`Data · Nome · WhatsApp · Email · Rota · Combinação · Carro-chefe · Tempo ·
Motivação · Frustração · Canal de Vendas · Impedimento · Curso Anterior ·
Faturamento · UTM Source · UTM Medium · UTM Campaign · UTM Content · UTM Term`

Diferenças em relação à aba antiga:

- `Data` e `Rota` vêm na frente, para dar para escanear a coluna que importa.
- A coluna `Dominasse` não existe mais, já que a pergunta foi aposentada.
- O faturamento aparece como **`Faturamento`**, e não como `Segurança`, que era
  um nome herdado e enganoso.
- Entrou `UTM Medium`, que o webhook já mandava e a aba antiga descartava.

Testado em 18/08 com lead disparado no webhook: as 19 colunas preencheram.

> **Pendência na aba antiga:** as colunas `Rota` (R) e `Curso Anterior` (S) foram
> criadas lá por engano em 12/08 e devem ser removidas, junto das duas linhas de
> teste ("TESTE SimpleAcc IGNORAR" e a que ficou na aba nova).
