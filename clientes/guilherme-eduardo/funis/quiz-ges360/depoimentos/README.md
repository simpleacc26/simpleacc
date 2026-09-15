# Depoimentos · prints do Dr. Kayo Andrade

Prints de conversas reais de WhatsApp entre o Guilherme e o **Dr. Kayo Andrade**, o case
principal. Recortados (sem barra de status e sem teclado) e convertidos para WebP.

O Dr. Kayo **autorizou em contrato** o uso de print e vídeo (ver `CLAUDE.md` do cliente).

## Como aparecem na página

**Conjunto trocado em 15/09/2026**, a pedido do Guilherme: saiu toda a prova social antiga
(os 4 prints de maio e junho mais as 3 citações que variavam com o objetivo do lead) e entrou
esta série de 6, que cobre **janeiro a agosto**. O motivo é simples: o conjunto antigo provava
um mês bom, e este prova uma curva que se sustentou por quatro meses.

| Posição | Papel na narrativa | Print |
| --- | --- | --- |
| 1º | dado duro (aconteceu e se sustentou) | `kayo-evolucao-mensal` (a planilha de jan a ago) |
| 2º | o topo, com a reação dele | `kayo-agosto-104k` ("nunca vi tanto dinheiro na minha vida") |
| 3º | derruba a objeção de preço | `kayo-6680-quinta` (programa de R$ 6.680 à vista) |
| 4º | é rotina, não pico | `kayo-17600-segunda` (R$ 17.600 numa segunda comum) |
| 5º | escala | `kayo-36400-dois-dias` (R$ 36.400 e 4 protocolos em 2 dias) |
| 6º | aspiração (a vida depois) | `kayo-23200-plantao` (plantão de menos de R$ 1k virou R$ 23.200) |

Não há mais citação em texto: a carga emocional que elas traziam agora vem dentro do 2º print,
no mesmo lugar em que está o número. Tudo isso vive em `diagnostico.js`, no array `PRINTS`.

## ⚠️ Os números da planilha, e o que não pode ir para a página

A planilha completa que o Guilherme enviou tem as colunas RECEITAS, DESPESAS, IMPOSTO, LUCRO
LÍQUIDO e MARGEM. **Só a de receitas pode ser publicada.** Da linha de maio em diante a despesa
está travada em R$ 1.589,00 até dezembro, o que empurra a margem para 84 a 86%. Isso é planilha
não preenchida, não resultado: se um médico olhar com atenção, derruba junto a credibilidade das
colunas que estão certas. Por isso o print publicado é o recorte **MÊS + RECEITAS**.

A série de receitas, que é a que vale:

| | jan | fev | mar | abr | mai | jun | jul | ago |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| R$ mil | 26,3 | 19,8 | 43,8 | 20,5 | 86,8 | 61,8 | 119,7 | 104,1 |

Média dos 4 meses antes da virada: **R$ 27,6 mil**. Dos 4 depois: **R$ 93,1 mil**. Salto de
**3,4x**. Soma do ano até agosto: R$ 482.690, que bate com o TOTAL ANO da planilha.

> **Junho era R$ 71.800 na página até 15/09/2026, e estava errado.** A planilha diz
> **R$ 61.800**. O número antigo vivia no parágrafo do case e num card de credencial. Corrigido.
> Lição: número de prova social sai do documento, não da memória de quem contou a história.

## ⚠️ Prints que ficaram de fora, e por quê

### Da série nova (15/09/2026)

O print de **R$ 36.400** chegou com **nome de paciente**: a mensagem citava "o que recebi do
flavio" e, na linha de planilha visível no topo, aparecia "Programa Adriano". Foi **recortado**
para começar em "Faturamento de segunda e terça", que é onde está o dado, e o original
**não entra no repositório**, que é público. Se um dia for preciso a conversa inteira, o caminho
é pedir ao Dr. Kayo um print novo com iniciais, não borrar este.

### Da primeira rodada (25/08/2026)

Dos 22 enviados, **6 não podem ir para uma página pública**: têm **nome de paciente** visível
(planilhas de faturamento e o resumo de fechamentos), e um deles traz ainda **dado clínico**
(IMC e medicação). O Dr. Kayo autorizou o uso da conversa dele; os pacientes dele não
autorizaram nada.

`IMG_4751` · `IMG_4752` · `IMG_4753` · `IMG_4754` · `IMG_4757` · `IMG_4765`

O `IMG_4751` é uma pena, porque tem a melhor frase do lote ("se não fosse por você, seriamente,
eu teria faturado 60% disso"). Se o Guilherme quiser usar, o caminho é **pedir ao Dr. Kayo um
print novo** com os nomes trocados por iniciais, não borrar o atual.

Os demais que sobraram (4746, 4749, 4755, 4758, 4760, 4762, 4764, 4766) são bons mas redundantes.

## Acervo: os `kayo-4xxx.webp`

Os 8 prints da primeira rodada continuam aqui, mas **não estão mais na página** desde 15/09/2026.
São material aprovado e seguem servindo para o time usar no WhatsApp e como reserva. Os
`pub-*.webp` foram apagados: eram cópias recomprimidas a 400px que existiam só para caber no
deploy por chamada de ferramenta da Vercel, e o jsDelivr aposentou essa necessidade.

## ⚠️ Legenda que contradiz o texto

Regra que veio da primeira rodada e continua valendo: **se o print mostra um mês em curso e o
texto cita o fechamento, a legenda tem que dizer a data**, senão os dois números parecem se
contradizer. Foi o caso do antigo `4756` (print de 22 de maio, com o mês em R$ 64.761, ao lado de
um texto que citava o fechamento de R$ 86.771).

Na série nova o problema não aparece, porque a planilha e o texto falam dos mesmos meses
fechados. Se entrar print novo de mês em curso, aplique a regra.

## Reprocessar

**Série nova (15/09/2026).** Os originais chegaram em resoluções diferentes (591x1280 a
1106x1280). Recorte manual em cada um, tirando barra de status, cabeçalho do contato, barra de
digitação e teclado, deixando **só os balões** (é a convenção dos prints da casa). Depois
redimensiona para **560px de largura** e WebP qualidade 86.

O teclado do iPhone come cerca de 42% da altura do print: sem cortar, a imagem entra na página
quase metade vazia.

**Primeira rodada (25/08/2026).** Recorte usado: `top=290`, `bottom=1600` (prints com teclado
aberto) ou `2530` (sem teclado), sobre o original de 1284x2778. Depois `thumbnail(720)` e WebP
qualidade 82.
