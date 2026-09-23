# Feedback da Adriana sobre o quiz (22/09/26)

Ela recebeu a URL de validação ([quiz-adriana-brunelly.vercel.app](https://quiz-adriana-brunelly.vercel.app))
e respondeu em duas levas de áudios e vídeos, gravando a tela enquanto respondia.
Este arquivo registra o que ela trouxe, o que foi acatado e o que ficou em aberto.
É a leitura de quem conhece o próprio público melhor que a gente, e a maior parte
tinha razão.

## O que ela trouxe, e o que foi feito

| # | O ponto dela | Decisão | Onde entrou |
| - | ------------ | ------- | ----------- |
| 1 | **"De onde ele tirou esse número?"** As telas de intervalo davam uma conta de um evento de R$ 15 mil que não era o dela. | Acatado, e é a correção mais importante das duas levas. As interseções passaram a ser **montadas com as respostas da própria pessoa**. | `funis/quiz-divida-de-valor/flow.js`, campo `monta(c)` de cada interseção |
| 2 | **Os botões falam pouco de dinheiro.** "Quero minha sessão de diagnóstico" é linguagem da gente, não do público dela. | Acatado. Os CTAs passaram a falar em dinheiro e em perda. | `diagnostico.js`, bloco de CTA por nível |
| 3 | **No celular, a pergunta de ticket cortava a última faixa.** São sete alternativas e o cabeçalho comia a tela. | Acatado. Ela mesma abriu mão do cabeçalho durante as perguntas: ele fica na primeira tela e na captura, e some no meio do quiz. | `app.js` (`ajustarCabecalho`), `styles.css` (`body.sem-topbar`) |
| 4 | **A história dela estava em linguagem de consultoria.** "40% menos, 60% mais" obriga o leitor a fazer conta de cabeça. | Acatado. A versão dela é melhor e entrou literal: *"Eu trabalhava mais e lucrava menos. Hoje eu trabalho menos e lucro mais."* A conta fria ficou depois, em uma linha, como lastro. | `diagnostico.js` (bloco "Quem está te dizendo isso") e a interseção das tentativas |
| 5 | **Faltava empatia antes da autoridade.** O texto contava o caso dela sem dizer que ela já esteve no lugar de quem lê. | Acatado. O bloco abre com "E eu já fui exatamente onde você está". | `diagnostico.js`, mesmo bloco |
| 6 | **Dívida de Valor não é dívida de banco**, e a página não fazia essa distinção em lugar nenhum. É a tese dela, e estava implícita. | Acatado. Entrou logo abaixo do número, recuada, com fio de ouro. | `diagnostico.js` (`.distincao`) e `diagnostico.html` |
| 7 | **Pedir o Instagram do lead.** Ela olha o perfil antes de qualquer conversa, e é assim que ela lê o tamanho do negócio. | Acatado, como campo do formulário de captura e não como pergunta do quiz: é dado de perfil, não de diagnóstico. O quiz fica nas 12 perguntas. | `flow.js` (captura), `app.js` (payload), planilha e cenário do Make |

## O que ficou em aberto, de propósito

- **CTA fixo ou na mesma tela, no diagnóstico.** Ela comentou a posição dos botões.
  Ela disse que ia mandar um documento tela a tela: a reordenação de layout espera
  esse material, para não mexer duas vezes.
- **O resumo de conversa que ela citou** (sobre os botões) não chegou ao time.
  O Renan precisa pedir.

## Aprendizado que vale para qualquer funil da casa

Tela de implicação com **texto fixo** é uma bomba-relógio num funil que promete
conta feita. A pessoa acabou de digitar os próprios números e, na tela seguinte,
leva na cara uma conta que não é a dela: a reação certa é desconfiar da peça
inteira, e foi exatamente a reação dela. Se a tela existe para gerar implicação,
ela deriva da resposta ou não existe.
