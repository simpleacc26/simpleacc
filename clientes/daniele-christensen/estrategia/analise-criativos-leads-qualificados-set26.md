# Quais criativos trazem lead qualificado (base de 24/06 a 27/08/26)

**Data da análise:** 01/09/2026
**Fonte:** planilha `Grokker | Leads Quiz (novo)`, aba `Quiz 1`, 457 linhas
**Atribuição de criativo:** campo `utm_content`

## Como a base foi limpa

Saíram 28 linhas: 23 de teste (inclui a do Carlos Durães, cadastrada como
"Carlos TESTE SIMPLE ACC"), 4 do Grasiano e 1 da própria Dani. Sobraram **429
leads válidos**, e 417 depois de tirar 12 telefones repetidos. Os números abaixo
usam os 429; com a base sem repetição eles mudam no máximo um ponto, então a
leitura é a mesma.

## Critério de qualificação

Cargo de Dono, Sócio, Diretor ou Proprietário **e** faturamento acima de
R$ 100 mil por mês (as faixas "De R$ 100.000 a R$ 300.000" e "Acima de
R$ 300.000").

A pergunta de cargo do quiz antigo tem quatro opções, e uma delas é
**"Diretor ou gerente com autonomia para decidir sobre pessoas"**. Ela junta
Diretor e gerente na mesma resposta, então **não dá para separar os dois nesta
base**. Por isso a análise tem dois cortes, e a diferença entre eles é grande o
bastante para mudar decisão de verba.

## Composição de cargo da base

| Cargo declarado | Leads | % |
|---|---:|---:|
| Gestor, com autonomia parcial | 161 | 37,5% |
| Diretor ou gerente com autonomia para decidir sobre pessoas | 113 | 26,3% |
| Fui promovido recentemente à Liderança e não tenho quase autonomia | 113 | 26,3% |
| Dono ou sócio com responsabilidade direta sobre resultados | 42 | 9,8% |

Dos 42 Donos e Sócios, **metade fatura menos de R$ 100 mil** (21 acima, 21
abaixo). O funil entrega 429 leads e 21 deles são Dono ou Sócio com o porte
certo, ou seja **4,9%**.

## Corte 1: só Dono ou Sócio (o ICP de ago/26)

21 qualificados, 20 com criativo atribuído.

| Criativo | Qualif. | % dos qualif. | Total de leads | Taxa de qualificação |
|---|---:|---:|---:|---:|
| AD09 - VD - Você lidera com critério | 7 | 35,0% | 82 | **8,5%** |
| AD04 - IM - Lidera com critério | 7 | 35,0% | 297 | **2,4%** |
| AD05 - IM - Estratégias | 3 | 15,0% | 18 | 16,7% |
| AD04 - CARD - Os 3 motivos | 2 | 10,0% | 17 | 11,8% |
| AD16 - VD - Ano passado | 1 | 5,0% | 6 | 16,7% |

## Corte 2: Dono, Sócio e a opção "Diretor ou gerente"

100 qualificados, 99 com criativo atribuído.

| Criativo | Qualif. | % dos qualif. | Total de leads | Taxa de qualificação |
|---|---:|---:|---:|---:|
| AD04 - IM - Lidera com critério | 62 | 62,6% | 297 | **20,9%** |
| AD09 - VD - Você lidera com critério | 21 | 21,2% | 82 | **25,6%** |
| AD05 - IM - Estratégias | 9 | 9,1% | 18 | 50,0% |
| AD04 - CARD - Os 3 motivos | 6 | 6,1% | 17 | 35,3% |
| AD16 - VD - Ano passado | 1 | 1,0% | 6 | 16,7% |

Quatro criativos (AD08, AD10, AD13, AD14) têm 1 lead cada e nenhum qualificado.
Com essa amostra não dá para dizer nada sobre eles.

## O que os números dizem

**O AD04 estático ganha em volume e perde em qualidade.** Ele traz 297 dos 429
leads, quase 70% do funil, e por isso aparece no topo da coluna de porcentagem
nos dois cortes. Só que a taxa dele é a pior da lista: **2,4% no corte estrito**,
contra 8,5% do AD09. O AD09 é a versão em vídeo da mesma mensagem e qualifica
**três vezes e meia melhor** com um quarto do volume.

**A porcentagem de composição engana aqui.** Dizer que o AD04 responde por 62,6%
dos qualificados é verdade e é quase só reflexo de ele ter quase toda a verba.
A coluna que decide investimento é a taxa.

**Os dois melhores em taxa têm amostra pequena.** AD05 com 18 leads e AD04-CARD
com 17 apontam 16,7% e 11,8% no corte estrito, acima do AD09, mas com essa
quantidade um lead a mais ou a menos move o número vários pontos. Servem para
justificar um teste com verba, não para realocar a campanha.

## Recomendação

1. **Tirar verba do AD04 estático e colocar no AD09.** É a troca com mais
   evidência: mesma mensagem, formato diferente, e o vídeo qualifica muito
   melhor. Bate também com o que já estava no `aprendizados.md`, que o AD04 é o
   criativo âncora desde março com CPL subindo mês a mês.
2. **Subir AD05 e AD04-CARD para uma amostra decente** antes de concluir
   qualquer coisa sobre eles.
3. **A leitura reforça a direção dos criativos v4 e dos roteiros de 01/09:**
   vídeo com filtro de cargo e porte no gancho. O AD09 é vídeo e já qualifica
   melhor sem nem ter o piso de faturamento na fala.

## Limitação que precisa ser resolvida na fonte

Enquanto a pergunta de cargo juntar "Diretor ou gerente" numa opção só, todo
relatório de qualificação vai ter esses dois cortes e nenhum deles vai ser o
número real. **O quiz novo já corrige isso**, com "Diretor (CLT ou PJ)" e
"Gestor ou Coordenador (CLT ou PJ)" separados. A partir da base do quiz novo dá
para responder essa pergunta com um corte só.
