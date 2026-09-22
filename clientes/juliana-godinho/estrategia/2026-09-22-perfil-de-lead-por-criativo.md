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

---

# Adendo · a copy literal (22/09)

A copy dos anúncios estava no `[Juliana Godinho] COPY 2026` no Drive, na seção
ANÚNCIOS, organizada por lote de data. Os lotes que cobrem a janela da V4 são o
**14/08** (6 peças) e o **14/09** (10 peças).

## O que o AD01 faz, frase por frase

Copy literal, lote 14/08, peça #001:

> Eu tenho clínica desde 2011 e vivi anos em que a única hora que sobrava pra
> olhar número e pensar no negócio, eram as horas de "descanso". O problema é que
> o negócio inteiro fica na fila desse intervalo. O preço que precisa ser
> revisto, a conversa com quem trabalha com você, a conta do que sobrou, a ideia
> que traria gente nova. Tudo isso espera o seu tempo livre, e o seu tempo livre
> tem onze minutos. Aí chega sexta, você olha pra trás e a semana inteira foi
> atendimento. E crescer desse jeito piora, porque mais faturamento é mais gente
> na agenda, e mais gente na agenda é menos brecha ainda. Se você tem clínica ou
> consultório de estética avançada, **fatura mais de 20 mil por mês** e já
> entendeu que somar horário parou de resolver, o seu gargalo tem nome e dá pra
> ver ele hoje. Clique em Saiba Mais para preencher o diagnóstico de dois
> minutos, e no fim você recebe por escrito o que está segurando o seu
> faturamento e o que muda primeiro.

**Toda frase pressupõe uma agenda já cheia.** "A semana inteira foi atendimento",
"o seu tempo livre tem onze minutos", "o negócio inteiro fica na fila desse
intervalo". Quem tem agenda vazia lê isso e não se reconhece em lugar nenhum.

E a frase que fecha o filtro é dupla, econômica e comportamental ao mesmo tempo:
*fatura mais de 20 mil por mês* **e** *já entendeu que somar horário parou de
resolver*. A segunda metade exclui quem tem o faturamento e ainda acha que a
saída é trabalhar mais.

O detalhe decisivo está em **"crescer desse jeito piora"**. Essa frase só faz
sentido para quem já está cheia. Para quem está construindo, crescer é
exatamente o que ela quer, e a frase soa errada.

## Declarar piso de faturamento não é o que separa

Contei quantas peças de cada lote trazem número de faturamento no corpo:

| Lote | Peças com piso declarado | Piso |
|---|---|---|
| 09.01.26 | 4 de 6 | cerca de 10 mil |
| 24.02 | 5 de 6 | acima de 15k |
| 31/03 | 2 de 6 | |
| 12/05 | 0 de 2 | nenhum |
| 19/05 | 6 de 6 | entre 15 e 40 mil |
| 26/06 | 2 de 7 | entre 15 e 40 mil |
| 30/07 | 9 de 10 | acima de 15 mil |
| **14/08** | **6 de 6** | **mais de 20 mil** |
| **14/09** | **7 de 10** | **acima de 50 mil** |

**As seis peças do lote 14/08 declaram piso**, inclusive as que não performaram.
Então declarar número no corpo é condição necessária e não suficiente. O que
separa é o **estado que a copy pressupõe**, e não o número que ela cita.

Isso refina o aprendizado de 17/08 da conta, que dizia para não levar número de
faturamento na legenda. A leitura correta agora: o número não funciona como
**promessa** no topo, e funciona como **filtro** no corpo, junto de um traço
comportamental.

## Duas lacunas que a leitura da copy revelou

**A copy do AD04 não existe no documento.** Procurei no doc inteiro por "a gente
sempre acha" e variações, zero ocorrência. O AD04 trouxe 52 leads, 40% do volume
da V4, e não está registrado em lugar nenhum. Sem ela não dá para fechar a
comparação frase a frase entre o que qualifica e o que não qualifica, que era o
coração da task. **Puxar essa copy no gerenciador e registrar no doc.**

**O lote 14/09 não gerou lead nenhum.** São dez peças escritas com piso de 50 mil
e linguagem inteira de papel e equipe (domingo à noite a equipe te chama, a
recepção disse que não tinha horário, a segunda unidade nunca ficou igual, alguém
pediu aumento). É exatamente a direção que a mesa do Estrato 7 concluiu. E de
14/09 a 19/09 **as 17 leads do período vieram todas de AD01 e AD04**. Ou o lote
não foi ao ar, ou foi e não está recebendo entrega. Isso precisa ser checado
antes de qualquer conclusão sobre aquela linha de comunicação.

## A previsão que a régua faz, e que dá para testar

Dentro do mesmo lote 14/08, com o mesmo piso de 20 mil declarado, a peça #002
abre com *"faz quanto tempo que não aparece ali um nome que você não conhece?"*.
É estado de **ausência**, não de teto. A régua prevê que ela qualifica pior que a
#001, na faixa dos 21%.

Se essa peça for ao ar com `utm_content` próprio e vier perto de 45%, a régua
está errada. Se vier perto de 21%, está certa. **É o teste mais barato disponível
para validar tudo que está escrito aqui.**
