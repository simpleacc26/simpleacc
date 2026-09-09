# Quem são os leads com dinheiro, e o que os trouxe

**Data:** 2026-09-09
**Fonte:** planilha de leads, abas `diagnostico gustavo`, `Quiz NOVO` e a aba do Quiz 2 (Inlead)
**Objetivo:** achar o padrão de resposta e os criativos que trazem lead acima de R$ 10.000 e acima de R$ 5.000, para orientar os próximos criativos

## Como foi feito

155 leads reais, depois de tirar as linhas de teste. As três abas fazem a mesma
pergunta de faturamento do negócio, então dão para consolidar. As respostas
vieram com grafias diferentes entre as abas (hífen e travessão nas faixas de
tempo, "carro chefe" e "carro-chefe"), o que estava partindo as contagens em
dois, e foram normalizadas antes de contar.

Ao lado de cada resposta vai a participação dela dentro do grupo, a participação
na base inteira e o **lift**, que é a razão entre as duas. Lift 3,0 quer dizer
que aquela resposta aparece três vezes mais entre quem fatura alto do que na
média. Contagem sozinha engana: "paixão e prazer" é a motivação mais comum entre
os que faturam acima de 10k, mas é a mais comum em todo mundo, então não
diferencia ninguém.

**Ficou de fora:** a quarta aba da planilha, de outro quiz (trufas, 17
perguntas), porque ela pergunta renda pessoal e não faturamento do negócio, que é
outra escala. E a pergunta 8, porque mudou de conteúdo entre as versões do quiz:
no Quiz 2 e no Quiz NOVO era "se você dominasse mais técnicas, isso te ajudaria a
vender mais", no V3 virou "você já fez algum curso". Somar as duas na mesma
coluna daria um resultado que não significa nada.

## O tamanho da base

| | leads | acima de 5k | acima de 10k |
|---|---|---|---|
| Total | 155 | 52 (34%) | 15 (10%) |
| Quiz 2, Inlead, mai a jul | 55 | 28 (51%) | 7 (13%) |
| Quiz NOVO, Vercel, jul | 37 | 14 (38%) | 8 (22%) |
| **Quiz V3, campanha atual, ago** | **63** | **10 (16%)** | **0 (0%)** |

## O achado que muda a conversa

A campanha que está rodando agora traz o pior público das três, e não é por
pouco. Ela trouxe 63 leads, mais que qualquer outra, e **nenhum** acima de
R$ 10.000. As duas anteriores, com menos leads, entregaram 15 dos 15 leads
qualificados que existem na base.

A diferença mais provável não está no criativo, está no objetivo da campanha:

| Campanha | Objetivo | Leads | Acima de 5k | Acima de 10k |
|---|---|---|---|---|
| `[Compra] [Inlead] Quiz` | Compra | 54 | 50% | 13% |
| `[Compra] [Vercel] Quiz 02` | Compra | 35 | 34% | 17% |
| `[Solicitação] Quiz V3` | Solicitação | 62 | 15% | 0% |

As duas campanhas otimizadas para Compra trouxeram metade e um terço de leads
com dinheiro. A que otimiza para Solicitação trouxe volume e quase nenhum
qualificado. Faz sentido: pedir ao algoritmo que encontre quem preenche
formulário entrega exatamente isso, gente que preenche formulário.

Antes de trocar criativo, vale voltar o objetivo para Compra. Nenhum criativo
novo compensa um algoritmo procurando o público errado.

## Perfil de quem fatura acima de R$ 10.000 (n=15)

As respostas com lift alto, que são as que realmente separam esse grupo:

| Pergunta | Resposta | No grupo | Na base | Lift |
|---|---|---|---|---|
| Como se define | Minha margem de lucro é baixa | 53% | 15% | **3,4x** |
| Tempo de ateliê | Mais de 10 anos | 53% | 17% | **3,1x** |
| Canal de vendas | Eventos (aniversários, casamentos, festas) | 53% | 22% | **2,4x** |
| Impedimento | Falta de demanda na minha região | 27% | 12% | 2,3x |
| Impedimento | Concorrência alta e desleal | 13% | 6% | 2,3x |
| Motivação | Reconhecimento profissional | 20% | 10% | 2,1x |
| Carro-chefe | Os chocolates são menos de 50% das vendas | 27% | 14% | 2,0x |
| Como se define | Estou em crescimento mas preciso melhorar | 40% | 21% | 1,9x |
| Carro-chefe | Sim, são meu carro-chefe | 40% | 23% | 1,8x |
| Canal de vendas | Vendas à pronta entrega na loja | 27% | 16% | 1,7x |
| Frustração | Falta de segurança técnica | 47% | 31% | 1,5x |

**O retrato que sai daí:** é uma mulher com mais de dez anos de ateliê, negócio
montado, que vende em eventos e na loja, e que descreve o próprio problema como
margem baixa e não como falta de venda. Ela fatura, o dinheiro passa pela mão
dela, e mesmo assim sobra pouco. O que a incomoda no dia a dia é insegurança
técnica, não preço, e o que ela quer de verdade é reconhecimento profissional.

Dois detalhes que contrariam a copy atual:

- **"Não saber cobrar preço" não é a dor dela.** Aparece em 33% do grupo contra
  37% da base, ou seja, abaixo da média. É a dor de quem fatura pouco.
- **Ela não é iniciante e não está começando.** "Menos de 1 ano" é 42% da base e
  só 20% desse grupo.

## Perfil de quem fatura acima de R$ 5.000 (n=52)

Grupo maior, sinal mais suave, mesma direção:

| Pergunta | Resposta | No grupo | Na base | Lift |
|---|---|---|---|---|
| Canal de vendas | Vendas à pronta entrega na loja | 31% | 16% | 1,9x |
| Motivação | Reconhecimento profissional | 17% | 10% | 1,8x |
| Tempo de ateliê | Mais de 10 anos | 31% | 17% | 1,8x |
| Impedimento | Concorrência alta e desleal | 13% | 6% | 2,3x |
| Tempo de ateliê | 6 a 10 anos | 17% | 11% | 1,6x |
| Carro-chefe | Os chocolates são menos de 50% das vendas | 21% | 14% | 1,6x |
| Como se define | Estou em crescimento mas preciso melhorar | 33% | 21% | 1,5x |
| Canal de vendas | Eventos | 33% | 22% | 1,5x |
| Tempo de ateliê | 3 a 6 anos | 25% | 17% | 1,5x |
| Carro-chefe | Sim, são meu carro-chefe | 35% | 23% | 1,5x |

O que muda em relação ao grupo dos 10k: aqui entram os ateliês de 3 a 10 anos, e
"estou em crescimento mas preciso melhorar" passa na frente de "margem baixa".
É o mesmo perfil um degrau antes.

## Quem a campanha atrai e não deveria

Respostas com forte sub-representação entre os qualificados, ou seja, marcadores
de lead que não vai comprar mentoria de R$ 5.000:

| Resposta | Na base | Entre os 5k+ | Lift |
|---|---|---|---|
| Menos de 1 ano de ateliê | 42% | 17% | 0,4x |
| Ainda quero começar a vender chocolates | 27% | 13% | 0,5x |
| Ainda estou começando e quero fazer certo desde o início | 15% | 4% | 0,25x |
| Medo de errar e perder material | 18% | 8% | 0,4x |
| Ter tempo de focar nas vendas, pois fico presa na produção | 12% | 6% | 0,5x |

Quase metade da base tem menos de um ano de ateliê. Esse é o público que a
campanha atual está comprando, e é o mais distante da oferta de R$ 5.000.

## Criativos

Comparação feita **dentro de cada campanha**, porque comparar entre campanhas
seria injusto: os criativos do V3 competem com um objetivo diferente e um quiz
diferente.

### `[Compra] [Inlead] Quiz` (54 leads, 50% acima de 5k)

| Leads | >5k | >10k | Criativo |
|---|---|---|---|
| 25 | 56% | 12% | AD16 - VD - Toda chocolateria |
| 10 | 30% | 10% | AD10 - IM - Você não é iniciante |
| 6 | 50% | 17% | AD17 - IM - Chocolate bom |
| 5 | 60% | 20% | AD17 - IM - Um único detalhe |

### `[Compra] [Vercel] Quiz 02` (35 leads, 34% acima de 5k)

| Leads | >5k | >10k | Criativo |
|---|---|---|---|
| 9 | 44% | **33%** | AD17 - IM - Chocolate bom |
| 8 | 13% | 0% | AD17 - VD - Tem uma mentira |
| 7 | 29% | **29%** | AD14 - VD - Se você tem confeitaria |

### `[Solicitação] Quiz V3` (62 leads, 15% acima de 5k, zero acima de 10k)

| Leads | >5k | >10k | Criativo |
|---|---|---|---|
| 37 | 22% | 0% | AD03 - VD - Você abriu o Instagram |
| 17 | **0%** | 0% | AD02 - VD - Deixa eu te fazer uma pergunta |
| 7 | 14% | 0% | AD02 - IM - Você acabou |

### O que dá para dizer com honestidade

**AD17 - IM - Chocolate bom** é o único criativo que apareceu nas duas campanhas
de Compra e sustentou qualificação nas duas (50% e 44% acima de 5k, 17% e 33%
acima de 10k, 15 leads somados). É o mais confiável da base.

**AD14 - VD - Se você tem confeitaria** tem a maior taxa de 10k entre os que têm
alguma amostra (9 leads, 33%), e o nome dele já diz por que: ele fala com quem
**tem** confeitaria, não com quem quer ter.

**AD02 - VD - Deixa eu te fazer uma pergunta** trouxe 17 leads e nenhum acima de
5k. É o pior resultado individual da base inteira e o único com zero absoluto num
volume relevante.

Os estáticos (IM) se saem melhor que os vídeos em qualificação, e isso aparece
também nos conjuntos: o público "Estáticos [20%]" tem lift 2,4x no grupo dos 10k.
Com 15 leads no grupo, trato isso como pista, não como conclusão.

## O que isso vira nos próximos criativos

Três direções que saem direto dos números, para a matriz de ângulos:

1. **Falar com margem, não com faturamento.** O sinal mais forte de todos (3,4x)
   é ela se descrever como "minha margem de lucro é baixa". Ela não acha que
   vende pouco, acha que sobra pouco. Criativo que promete vender mais fala com
   o público errado.
2. **Falar com quem já tem casa montada.** Dez anos de ateliê, vende em evento e
   na loja. Todo gancho de "comece do jeito certo" ou "primeiros passos" está
   comprando o público que não converte.
3. **Insegurança técnica é a porta, preço não é.** No grupo dos 10k a frustração
   é técnica (1,5x) e o preço fica abaixo da média. Ela já cobra, o que ela não
   sabe é se o produto sustenta o preço que ela quer cobrar.

E um ângulo que a base entrega de graça, ainda não usado: **"falta de demanda na
minha região" e "concorrência alta e desleal"** aparecem com 2,3x entre quem
fatura alto. É a dona de ateliê estabelecida que sente o mercado local apertando,
e nenhum criativo da rodada atual toca nisso.

## Ressalvas

- **O grupo dos 10k tem 15 pessoas.** Cada lead vale quase 7 pontos percentuais.
  Os lifts acima de 2,0x se sustentam, os entre 1,3x e 1,7x são direcionais.
- **Nenhum lead do V3 chegou aos 10k**, então todo o perfil dos 10k vem dos
  quizzes anteriores, que tinham faixa de faturamento e perguntas ligeiramente
  diferentes.
- **4 leads chegaram sem `utm_content`** e todos os quatro faturam acima de 5k,
  sendo dois acima de 10k. Provavelmente tráfego direto ou orgânico. Vale
  descobrir de onde vieram, porque é a melhor taxa da planilha inteira.
- A pergunta 8 e a quarta aba ficaram fora, pelos motivos explicados no começo.
