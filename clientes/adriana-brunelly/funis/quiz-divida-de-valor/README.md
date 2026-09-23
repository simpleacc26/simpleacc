# Quiz · Diagnóstico da Dívida de Valor

Funil de quiz da **Adriana Brune'lly** (mercado de eventos, Londrina/PR). Leva o
lead do anúncio até a sessão de diagnóstico, calculando **quanto ele deixa na
mesa por ano** a partir das próprias respostas.

HTML, CSS e JavaScript puros. Sem build, sem framework, sem dependência externa
(nem fonte remota). Sobe em qualquer servidor estático.

## No ar

**<https://quiz-adriana-brunelly.vercel.app>** (projeto `quiz-adriana-brunelly`
na Vercel, time Simpleacc). URL pública, sem proteção de acesso.

Os leads caem na planilha
[**Leads · Diagnóstico da Dívida de Valor**](https://docs.google.com/spreadsheets/d/1CkGhLbXycspD3NZ0QpwU2LlaVZqtS4QPZjA_-9-PQcA/edit),
em `3. Estratégia e Tráfego`, pelo cenário **[Adriana Brunelly] Diagnóstico da
Dívida de Valor → Sheets** no Make (webhook + Google Sheets, ativo e testado).

O lead é gravado uma vez, no fim, quando já existem **respostas e contato** na
mesma linha: padrão, conta em reais, as 12 respostas e as UTMs. São 32 colunas.
A primeira linha da planilha é o teste de conferência do mapeamento, e pode ser
apagada à vontade.

> ⚠️ A API do Drive não edita célula, então **mexer nas perguntas obriga a criar
> planilha nova** com o conjunto completo de colunas e a repontar o cenário. As
> versões anteriores ficam na mesma pasta, renomeadas com `[OBSOLETA...]`, e não
> são apagadas.

## De onde vem cada coisa

| Camada | Fonte |
| ------ | ----- |
| Método e arquitetura | Apostila **Funil de Lead Dinâmico** (Daniel Souza · Simple), no Drive |
| Copy do quiz e do diagnóstico | `flow.js` e `diagnostico.js` são a fonte; o documento de validação é gerado a partir deles |
| Feedback da cliente sobre o funil | [`../../contexto/2026-09-22-feedback-da-adriana-sobre-o-quiz.md`](../../contexto/2026-09-22-feedback-da-adriana-sobre-o-quiz.md) |
| Narrativa, inimigo e régua de linguagem | `../../CLAUDE.md` |
| Perguntas que ficaram de fora, para a sessão | [`../../estrategia/2026-09-21-perguntas-da-sessao-de-diagnostico.md`](../../estrategia/2026-09-21-perguntas-da-sessao-de-diagnostico.md) |
| Identidade visual | Preto, dourado e cristal, definida em 21/09/2026 |

## A arquitetura

**A ordem do funil é QUIZ, depois CAPTURA, depois DIAGNÓSTICO.** A pessoa
responde primeiro e só deixa o contato quando a conta dela já está pronta do
outro lado: aí o dado é a chave do resultado, não um pedágio na porta. O hero
fica na primeira pergunta, sem tela de intro no meio, que só gera quebra.

> ⚠️ A apostila, no Procedimento 8, manda o contrário (página de captura como
> pouso do tráfego, indo direto para a P1). **A prática da casa é a de cima**, e
> é ela que vale. Vale reconciliar isso na apostila, porque o template da casa
> (`criar-funil-quiz`) também põe a captura no fim.

O resto segue a apostila:

1. **Quiz do tipo Killer** (Procedimento 4). Promete a causa ("onde o seu
   dinheiro está saindo"), não a solução. É o tipo certo para público frio que
   já tentou curso técnico e planilha e continuou sem margem.
2. **12 perguntas da mais fácil para a mais reflexiva.** Abre com o que se
   responde sem pensar (o que você faz, quantos eventos entrega), passa pelo
   comportamento reconhecível (o que acontece com o orçamento, os extras),
   depois pelos números (ticket, desconto), e só no fim chega no que exige
   parar para pensar (o que você sente no fim do mês, o que mudaria em 3
   meses). A qualificação financeira é sempre a última.

   | # | Pergunta | Por que aqui |
   | - | -------- | ------------ |
   | 1 | Segmento | Identificação, zero fricção |
   | 2 | Eventos por mês | Factual, responde de cabeça |
   | 3 | O que acontece com o orçamento | Cena reconhecível, define o padrão |
   | 4 | Extras fora do combinado | Comportamento, sem conta |
   | 5 | Ticket médio | Primeiro número |
   | 6 | Desconto no fechamento | Número e um tanto de desconforto |
   | 7 | Custo de mão de obra | Número de saída |
   | 8 | Comissão a parceiros | Número de saída, e o mais polêmico |
   | 9 | O que já tentou | Memória, já aquecida |
   | 10 | O que sente no fim do mês | Emocional |
   | 11 | O que mudaria em 3 meses | Projeção, a mais pensada |
   | 12 | Faturamento | Porteira, sempre por último |

   **São 12, que é o teto da apostila para high ticket. Não passe disso.**

   As perguntas de ticket e de faturamento têm **7 faixas** de propósito: quem
   marca a menor descobre, na mesma tela, que a maior é ocupada por gente do
   mesmo mercado.
3. **3 interseções de implicação**, depois das perguntas 3, 7 e 9, e
   **montadas com as respostas da própria pessoa**. Cada uma tem um `monta(c)`
   em `flow.js` que recebe só o que já foi respondido até ali: a de depois da P3
   fala de volume (ainda não existe valor cobrado), a de depois da P7 é a
   **tela de impacto**, com o total de 12 meses e a pergunta do sonho, e a de
   depois da P9 responde à tentativa que a pessoa marcou.

   > A tela de impacto conta pelo **piso** das faixas de valor e de volume, não
   > pelo meio delas. Ela roda antes da pergunta de faturamento, então não tem
   > como aplicar o teto que o diagnóstico aplica. Contando por baixo, o número
   > de lá é chão e não teto, e o do resultado quase sempre vem maior, que é a
   > direção certa: **subir é presente, descer é desmentido.** Quando ainda
   > assim o teto morde, a página assume a diferença em voz alta.

   > ⚠️ **Nunca volte a usar texto fixo aqui.** A primeira versão tinha, com um
   > evento de R$ 15 mil que não era o da pessoa, e a cliente perguntou, com
   > razão, de onde saiu aquele número. Se a tela existe para gerar implicação,
   > ela deriva da resposta ou não existe.
4. **4 buckets** com página de resultado própria (Procedimentos 5 e 6), mais a
   rota de desqualificado que sai da pergunta porteira.
5. **Cinco segundos de carregamento** entre o quiz e o diagnóstico, com barra e
   porcentagem subindo até 100% e duas frases ("Analisando as suas respostas",
   "Gerando o seu diagnóstico"). Não é espera técnica: é a pausa que faz o
   resultado parecer calculado para aquela pessoa, e não tirado da prateleira.
   Tempo e frases ficam em `flow.js > loading`.
6. **Roteamento pós-quiz**: qualificado e a nutrir vão para o WhatsApp dela,
   com a mensagem já trazendo o padrão e a conta; fora da faixa recebe a leitura
   completa e a oferta de entrada de R$ 47.
7. **Zero scroll é regra, não preferência.** Nenhuma alternativa e nenhum
   botão pode ficar escondido atrás de rolagem, em nenhum celular. É a regra
   mais dura do documento de premissas da Adriana, e ela autoriza tirar o
   cabeçalho com logo sempre que for preciso para caber.

   O cabeçalho da marca só existe na tela de entrada (`body.sem-topbar`, ligada
   por `ajustarCabecalho()` em `app.js`), e o modo compacto de `styles.css` tem
   duas faixas: `max-width:560px ou max-height:820px`, e um segundo aperto em
   `max-height:700px` para Android pequeno.

   > ⚠️ **Mexeu em pergunta, rode o medidor antes de publicar.** O teste de
   > ponta a ponta mede a altura de cada tela em quatro tamanhos de celular
   > (360×640, 390×664, 414×736, 390×844). A pior tela é a de valor cobrado,
   > com sete faixas: é ela que define os números do CSS compacto.
8. **Vocabulário do público, não da agência.** Fora do quiz e da página:
   faturamento, margem, lucratividade, pró-labore, ponto de equilíbrio, ticket
   médio, precificação e ROI. A única exceção é proposital e é dela:
   **"fatura (vende)"** na última pergunta, com a tradução entre parênteses.
9. **O nome "Dívida de Valor" tem um arco.** Ele é plantado na P11 sem
   explicação, reforçado no título da captura, e só explicado no diagnóstico.
   Não use o termo nas perguntas de diagnóstico: a curiosidade é o gancho.

## Os 4 buckets

| Bucket | Onde a perda acontece | O que ainda não aconteceu |
| ------ | --------------------- | ------------------------- |
| A Agenda Cheia | no volume | escolher para quem vende |
| O Extra Invisível | na entrega | colocar o escopo no papel |
| O Desconto Automático | no fechamento | aprender a conduzir o fechamento |
| O Orçamento que Some | antes do preço | construir valor antes do número |

A ordem da tabela é a **hierarquia de desempate**: em empate de pontos, o lead
sobe para o bucket de maior perda, nunca desce (regra da apostila).

## A conta da Dívida de Valor

```
base       = min(ticket médio × eventos por mês, teto da faixa de faturamento)
desconto   = base × percentual de desconto (P5)
extras     = base × percentual absorvido (P6)
dívida/mês = desconto + extras
```

Duas travas de credibilidade:

- **Teto pelo faturamento declarado.** Se ticket vezes volume der mais que a
  faixa que a pessoa marcou na P10, vale a faixa. Número que a pessoa não
  reconhece derruba a página inteira.
- **Piso de R$ 500.** Abaixo disso a página troca o bloco do número por uma
  leitura sem número ("a sua perda está antes, no orçamento que some"), em vez
  de mostrar R$ 0 ou inventar estimativa.

## Arquivos

| Arquivo | O que é |
| ------- | ------- |
| `index.html` | captura + quiz |
| `diagnostico.html` | página de resultado, com o CSS próprio do relatório |
| `flow.js` | **toda a copy**: hero, 12 perguntas, interseções (com `monta`), captura, buckets, oferta de entrada |
| `calculo.js` | motor compartilhado: conta, bucket e classificação do lead |
| `app.js` | motor do quiz: telas, validação, persistência, tracking, envio do lead |
| `diagnostico.js` | monta o relatório por bucket e roteia os CTAs |
| `styles.css` | sistema visual preto, dourado e cristal |
| `favicon.svg` | monograma A em ouro sobre preto |
| `adriana.webp` | retrato dela na página de diagnóstico (760px, 106 KB) |

### Os dois custos de operação

As perguntas de **mão de obra** e **comissão** não entram na soma da Dívida de
Valor, de propósito: são custos legítimos do negócio, não dinheiro deixado na
mesa. Somar tudo no mesmo número inflaria a conta e derrubaria a credibilidade
da página. Elas viram dois blocos próprios, ao lado do número:

- **Mão de obra:** mostra o custo em reais e, quando passa de 20% e ainda há
  desconto, faz o cruzamento ("o desconto sai de uma margem que já estava
  apertada"). Quem marca "nunca fiz essa conta" recebe outra leitura.
- **Comissão:** a conta é sobre a margem, não sobre o faturamento. Com 20% de
  lucro líquido, 10% de comissão é metade do lucro daquela festa. Acima de 40%
  do lucro, a página nomeia: o parceiro virou sócio.

Para mudar texto, mexa **só no `flow.js`**. Para mudar cor, só no `:root` do
`styles.css`. Para mudar a ordem das perguntas, basta reordenar o array `steps`
no `flow.js`: o motor não depende da posição. **Só não esqueça das interseções**,
que são ancoradas pelo `id` da pergunta que vem antes delas.

> A ordem e o microcopy aqui divergem de propósito do PDF da estratégia de
> 11/09, que trazia as perguntas noutra sequência e um "10 perguntas · 2
> minutos" sob o título. O funil no ar é a versão boa.

## Rodar local

```bash
cd clientes/adriana-brunelly/funis/quiz-divida-de-valor
npx http-server -p 5173 -c-1
# abre http://localhost:5173
```

Abrir o `index.html` direto pelo arquivo também funciona.

## Pendências

**Trava o funil de verdade:**

Nenhuma. O funil está no ar e funcionando.

**Já resolvido:**

- [x] ~~WhatsApp~~: `554388081317` (+55 43 8808-1317, conta WhatsApp Business
      dela). Os CTAs abrem a conversa com o padrão e a conta na mensagem.
- [x] ~~`LEADS_ENDPOINT`~~: webhook do Make ligado e testado ponta a ponta.
- [x] ~~Planilha de leads~~: criada, com as 30 colunas mapeadas.
- [x] ~~Publicação~~: no ar, URL pública.

**Quando existir:**

- [ ] **Logo** no lugar do monograma, nas duas páginas, quando ela enviar.
- [ ] **Mais fotos.** A pasta de fotos do Drive tem o material do Coco Bambu;
      hoje o funil usa uma só, no bloco em que ela fala de si. Vale usar outra
      na abertura quando a identidade estiver fechada.
- [ ] **Depoimentos** reais em `flow.js` (`depoimentos: []`). Enquanto o array
      estiver vazio a galeria não aparece, e é assim que tem que ser: nunca
      publicar com depoimento inventado. Ver o guia de captação em
      `../../estrategia/`.
- [ ] **VSL** em `flow.js` (`vsl.ativo` e `vsl.embed`) quando o vídeo existir.
- [ ] Confirmar a **conta que recebe o checkout** do WhatsApp de Valor antes de
      mandar tráfego (as contas dela estão no nome da irmã).
- [ ] Apagar as **4 linhas de teste** da planilha (marcadas com "TESTE"), que
      ficaram da validação da integração.
- [ ] Compartilhar a planilha com ela, se o time quiser que ela acompanhe.
      Hoje a planilha está na pasta interna, que a cliente não acessa.

**Sobre agendamento:** o link de agenda (`config.agendamentoUrl`) está vazio de
propósito. Ver a seção "O destino do lead qualificado" abaixo.

## O destino do lead qualificado

Na call de 10/09 o que ficou combinado **não** foi link de agendamento. O Carlos
descreveu assim: a página pós-quiz "bate mais na dor de forma personalizada e
leva ele para a reunião contigo", o lead manda mensagem, e a Simple entrega os
scripts de atendimento para a Adriana chamar essa pessoa para a reunião.

A agenda direta (tipo Calendly) é o padrão da **apostila**, não deste projeto, e
tem três motivos para não entrar agora: ela é leiga em tecnologia, não tem
cartão de crédito para assinar ferramenta, e a cadência de 12 dias da estratégia
é toda escrita para WhatsApp, na voz dela.

Então o CTA do qualificado abre o WhatsApp com a mensagem já preenchida, trazendo
o padrão e a conta da pessoa, para ela abrir a conversa sabendo com quem fala.
Se o time decidir adotar agenda depois, basta preencher `config.agendamentoUrl`:
o CTA passa a abrir a agenda sozinho, sem mexer em mais nada.

## Deploy

O projeto **não está ligado ao GitHub** (a conta da Vercel não tem escrita no
repositório). A publicação foi feita pela API, mandando os arquivos direto:

```bash
# precisa de um token da Vercel com acesso ao time Simpleacc
curl -X POST "https://api.vercel.com/v13/deployments?teamId=<TEAM_ID>&forceNew=1" \
  -H "Authorization: Bearer $VERCEL_TOKEN" -H "Content-Type: application/json" \
  -d '{"name":"quiz-adriana-brunelly","target":"production","files":[...]}'
```

Cada arquivo entra em `files` como `{file, data (base64), encoding:"base64"}`.
Depois, o alias limpo é atribuído à parte, senão a Vercel gera a URL com o nome
do time dentro (`...-simpleacc.vercel.app`):

```bash
curl -X POST "https://api.vercel.com/v2/deployments/<DEPLOY_ID>/aliases?teamId=<TEAM_ID>" \
  -H "Authorization: Bearer $VERCEL_TOKEN" -H "Content-Type: application/json" \
  -d '{"alias":"quiz-adriana-brunelly.vercel.app"}'
```

**Nunca commite o token.** Ele vive só na sessão de quem publica.

## Contatos

| Papel | Quem |
| ----- | ---- |
| Cliente | Adriana Brunelly · `diretodaproprietaria@gmail.com` · (43) 9 9880-8803 |
| Condução do projeto | Renan Martini |
| Responsável SimpleAcc | Daniel Souza |
