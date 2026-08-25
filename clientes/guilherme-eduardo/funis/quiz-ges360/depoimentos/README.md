# Depoimentos · prints do Dr. Kayo Andrade

Prints de conversas reais de WhatsApp entre o Guilherme e o **Dr. Kayo Andrade**, o case
principal. Recortados (sem barra de status e sem teclado) e convertidos para WebP.

O Dr. Kayo **autorizou em contrato** o uso de print e vídeo (ver `CLAUDE.md` do cliente).

## Como aparecem na página

O relatório mostra **4 prints fixos, em ordem narrativa**, e fecha com **1 citação que varia
com o objetivo do lead**:

| Posição | Papel na narrativa | Print |
| --- | --- | --- |
| 1º | dado duro (o resultado existe) | `kayo-4756` (evolução mensal + "achando que ngm ia pagar") |
| 2º | derruba a objeção de preço | `kayo-4750` ("ninguém pediu desconto, ninguém achou caro") |
| 3º | derruba a objeção de público | `kayo-4767` (3 pacientes "sem perfil") |
| 4º | aspiração (a vida depois) | `kayo-4763` (plantão de 18h na UTI por R$ 1.500) |
| citação | objetivo `sair-plantao` | "Estou pisando em nuvens..." (9 de junho) |
| citação | objetivo `vender-natural` | "O que mudou? Minha confiança..." (19 de maio) |
| citação | demais objetivos | "o investimento de maior retorno" (26 de maio) |

A ordem é fixa de propósito: prova que **aconteceu**, depois derruba as duas objeções que o
médico levanta ("meu paciente não paga isso", "meu público não tem perfil") e só então mostra o
que muda na vida dele. Os 4 prints são independentes do gargalo porque as duas objeções aparecem
em praticamente todo lead, não só em quem marcou preço.

A **citação é texto, não imagem**, e leva autor e data. Recriar um print de WhatsApp em HTML
seria fabricar a aparência de um documento, então não se faz: quando a fala não tem print
aprovado, ela entra como citação atribuída.

Tudo isso vive em `diagnostico.js`, nos objetos `PRINTS` e `CITACOES`. Para trocar um print,
mexa só ali. Os 4 aprovados que não entram na página (`4747`, `4748`, `4759`, `4761`) ficam aqui
para o time usar no WhatsApp e como reserva.

## Arquivos `pub-*.webp`

São **cópias recomprimidas** (400 px) de `kayo-4763` e `kayo-4767`, criadas só para caber no
deploy por chamada de ferramenta da Vercel, que embute os arquivos na requisição. **São elas que
estão no ar hoje**, no projeto `ges360-relatorio`. Os `kayo-*.webp` são os originais e a fonte da
verdade. Quando o projeto for ligado ao repositório (ver README do funil), os `pub-*` deixam de
ser necessários e podem ser apagados.

## ⚠️ Prints que ficaram de fora, e por quê

Dos 22 enviados, **6 não podem ir para uma página pública**: têm **nome de paciente** visível
(planilhas de faturamento e o resumo de fechamentos), e um deles traz ainda **dado clínico**
(IMC e medicação). O Dr. Kayo autorizou o uso da conversa dele; os pacientes dele não
autorizaram nada.

`IMG_4751` · `IMG_4752` · `IMG_4753` · `IMG_4754` · `IMG_4757` · `IMG_4765`

O `IMG_4751` é uma pena, porque tem a melhor frase do lote ("se não fosse por você, seriamente,
eu teria faturado 60% disso"). Se o Guilherme quiser usar, o caminho é **pedir ao Dr. Kayo um
print novo** com os nomes trocados por iniciais, não borrar o atual.

Os demais que sobraram (4746, 4749, 4755, 4758, 4760, 4762, 4764, 4766) são bons mas redundantes
com os 8 escolhidos. Ficam como reserva se algum precisar ser trocado.

## ⚠️ Datas nas legendas

Dois prints (`4756` e `4759`) são **do meio de maio**, quando o mês ainda estava em R$ 64.761 e
R$ 75.571. O texto do relatório cita o fechamento, R$ 86.771. Sem contexto isso parece
contradição, então **a legenda diz a data de propósito**. Se mexer nessas legendas, mantenha a
referência temporal.

## Reprocessar

Recorte usado: `top=290`, `bottom=1600` (prints com teclado aberto) ou `2530` (sem teclado),
sobre o original de 1284x2778. Depois `thumbnail(720)` e WebP qualidade 82.
