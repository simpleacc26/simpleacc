# Que perfil de lead cada criativo traz

> Análise de 22/09/2026 sobre a aba **V4 - Quiz** da planilha
> `[Simple_ACC Juliana] Lead Score - Tráfego`, cruzando `utm_content` com a faixa
> de faturamento declarada. 135 leads entre 18/08 e 19/09/2026, mais 13 linhas na
> aba Desqualificados.
> MQL aqui é lead de **R$ 10 mil ou mais**, que é a régua da rota de mentoria.

---

## Tabela criativo × MQL × faixa de faturamento

| Criativo | n | % MQL (10k+) | até 5k | 5 a 10k | 10 a 20k | 20k+ |
|---|---:|---:|---:|---:|---:|---:|
| **AD01 · Eu tenho clínica desde 2011** | 73 | **45%** | 27% | 27% | 37% | 8% |
| **AD04 · A gente sempre acha** | 52 | **25%** | 60% | 15% | 12% | 13% |
| (sem utm_content) | 4 | 25% | 50% | 25% | 25% | 0% |
| AD14 · Fatura entre 15 e 50 | 2 | 0% | 50% | 50% | 0% | 0% |
| AD02 · Você, assim como eu | 1 | 100% | 0% | 0% | 100% | 0% |
| AD05 · A cliente perguntou o preço | 1 | 0% | 100% | 0% | 0% | 0% |
| AD10 · Tem semana | 1 | 0% | 100% | 0% | 0% | 0% |
| AD11 · Você já percebeu | 1 | 0% | 0% | 100% | 0% | 0% |

**Só os dois primeiros têm amostra.** Juntos são 125 dos 135 leads. Os outros
seis têm de 1 a 2 leads cada e não sustentam leitura nenhuma. Qualquer conclusão
tirada deles é ruído.

### A diferença entre AD01 e AD04 é real

```
AD01   33/73 = 45,2% MQL
AD04   13/52 = 25,0% MQL
diferença +20,2 pontos · z = 2,31 · p = 0,021
```

E não é efeito de período. Os dois rodaram na mesma janela (18/08 a 19/09) e a
diferença aparece separada em cada mês, aumentando no segundo:

| Mês | AD01 | AD04 |
|---|---|---|
| Agosto | 16/39 = 41% | 6/22 = 27% |
| Setembro | 17/34 = 50% | 7/30 = 23% |

### O que a taxa de desqualificação diz

| Criativo | Desqualificados | Sobre o total que trouxe |
|---|---:|---:|
| AD01 | 5 | 6,4% |
| AD04 | 3 | 5,5% |

Praticamente iguais. **A desqualificação não separa os dois criativos**, então o
filtro de escopo da P1 não é onde a diferença acontece. A diferença está na faixa
de faturamento de quem passa.

---

## A conclusão: o que qualifica não é o criativo, é o estado do problema

O cruzamento mais forte da base não é criativo contra faturamento. É **gargalo
diagnosticado** contra faturamento:

| Gargalo que o quiz diagnosticou | n | % MQL |
|---|---:|---:|
| **A agenda virou o seu teto** | 53 | **53%** |
| A promoção virou o seu jeito de vender | 9 | 33% |
| Você cobra menos do que entrega | 16 | 31% |
| **Sempre as mesmas clientes** | 57 | **21%** |

```
teto de capacidade   28/53 = 53% MQL
falta de cliente nova 12/57 = 21% MQL
z = 3,46 · p = 0,00054
```

Esse resultado é **seis vezes mais significativo** que o do criativo. E explica o
do criativo, porque cada gancho puxa um estado diferente:

| Criativo | Puxa "teto de capacidade" | Puxa "falta de cliente nova" |
|---|---:|---:|
| AD01 · clínica desde 2011 | **49%** | 38% |
| AD04 · a gente sempre acha | 27% | **50%** |

**A cadeia é essa:** o gancho decide qual estado de problema se reconhece, e o
estado de problema é que correlaciona com faturamento. Quem tem agenda cheia e
bateu no teto já fatura. Quem não tem fluxo de cliente nova ainda não fatura.

### A régua que sai daqui, e serve para a carteira inteira

> **Copy que qualifica fala de teto. Copy que desqualifica fala de falta.**

Gancho ancorado em **limite de capacidade de quem já está cheio** ("você já não
dá conta", "a agenda não cabe mais", "trabalhar mais parou de funcionar") atrai
quem já tem operação girando, e operação girando é dinheiro.

Gancho ancorado em **ausência** ("falta cliente", "a agenda está vazia", "ninguém
te encontra") atrai quem ainda está construindo, e quem está construindo não tem
caixa para high ticket.

É o mesmo princípio de estrato social que está sendo aplicado no Fabrício e na
Dani, com uma precisão a mais: o marcador não é o tema do anúncio, é **se a dor
descrita pressupõe abundância ou escassez na operação de quem lê**.

### Um detalhe que contraria a régua e vale registrar

O AD04 traz menos MQL no geral e, ao mesmo tempo, **mais lead de 20k+** que o
AD01 (13% contra 8%). Ele é polarizado: puxa muita gente pequena e, quando puxa
grande, puxa maior. Com n=52 isso ainda pode ser acaso, e só mais volume resolve.
Não desligar o AD04 achando que ele só traz lead ruim.

---

## O que esta análise não conseguiu responder

**A copy literal dos anúncios não está no repositório.** Só existem os nomes dos
ganchos, vindos do `utm_content`. A leitura acima sai do cruzamento dos dados e
do que o nome do gancho indica, e não da leitura dos textos. Para fechar a
pergunta "o que essa copy tem que a outra não tem" no nível da frase, falta puxar
os textos no gerenciador ou na Biblioteca de Anúncios.

**O material do Simple.OS não está neste repositório.** O script de cruzamento
GHL x Meta e o `playbook-gestor-ia-meta-ads.md` citados na task vivem em outro
lugar, então o desempenho por criativo do lado da Meta (impressão, CTR, custo)
não entrou. Esta análise é só do lado do lead, a partir da planilha.

**Consequência prática disso:** os percentuais aqui são de **composição de
lead**, não de **custo por MQL**. Se o AD01 custar o dobro do AD04 por lead, a
conclusão de alocação de verba muda, mesmo com a composição sendo melhor. Cruzar
com o custo antes de mexer em distribuição de orçamento.

---

## Próximo passo sugerido

Produzir dois criativos novos com o gancho ancorado explicitamente em teto de
capacidade, subir contra o AD01 como controle e ler em 30 dias pela composição de
faixa de faturamento, e não por CPL. Se a régua estiver certa, os dois novos
passam de 45% de MQL.
