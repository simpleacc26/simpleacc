# Aprendizados · Fabrício Alves

O que funciona e o que não funciona neste cliente. Leia antes de criar.

---

## Sobre a marca

- **A lista de palavras proibidas é o posicionamento, não frescura.** O arquétipo
  Sábio-Governante cai inteiro com uma palavra de guru. Ver
  `contexto/regras-de-linguagem.md` antes de escrever qualquer coisa.
- **Posição importa tanto quanto palavra.** "Erosão estrutural" pode aparecer,
  mas só depois da dor, em posição de veredito. Na headline, não. Os 21 critérios
  do Scorecard não aparecem nem por alusão. Preço, em uma única tela do funil.
- **O calor humano entra pelo respeito, nunca pela leveza.** Recusar um cliente
  inadequado comunica mais cuidado do que qualquer post de bastidor. Sempre que a
  peça parecer fria, a correção é ser mais preciso, não mais simpático.

## Sobre o público

- **Ele diz "escalar" e vive "margem".** O funil entra pela palavra que ele diz.
- **Ele terceiriza a causa.** Sente o sintoma e culpa o leilão, o criativo, o
  gestor. Culpar o leilão preserva a autoestima. Copy que acusa o leitor perde;
  copy que troca o réu ganha.
- **A pior etiqueta possível é "parou de vender".** A gramática certa é sempre
  "sua operação já vende; a pergunta é se ela aguenta mais verba sem queimar
  margem". A oferta é o próximo passo de quem cresce, não socorro de quem caiu.
- **A cicatriz da mentoria é a objeção mais forte do mercado inteiro** (86 dos 345
  operadores da pesquisa). Ela morre no formato, não no argumento: escopo fechado,
  artefatos contáveis, data de saída, garantia de entrega.

## Sobre a copy (16/09/2026)

- **Estrato 7 e a conta em reais brigam, e dá para resolver.** O Estrato 7 não
  responde a custo de inação financeiro, e o funil inteiro do Fabrício é
  construído sobre a conta. A solução foi rebaixar a conta de motor para
  **evidência**: o custo de inação principal virou quem depende da operação e não
  está sendo atendido, e o número entra depois, como confirmação. Ver
  `contexto/estratos-primal.md`, seção final.
- **A prova num anúncio dele não pode ser número de caso** (política da Meta). O
  que sobra e funciona: o dado fiscal com fonte, o corpus de 345 operadores, a
  precisão do mecanismo e a postura de risco ("o exame pode terminar em não é
  caso"). A peça 5 usa o corpus e é a prova mais forte que existe sem depender de
  autorização de ninguém.
- **Aspiração não morde no frio.** O teste de junho dele mediu isso: Ansiedade e
  Objeção venceram, Desejo ficou em último. Subir tensão primeiro.

## Sobre o funil (16/09/2026)

- **Três buckets, não cinco, e por um motivo.** Os buckets são os eixos do
  Scorecard DOC, que é o instrumento proprietário. Inventar um quarto eixo para
  bater meta de quantidade quebraria o mecanismo que a oferta vende. A riqueza
  veio de duas camadas independentes: Índice de Sustentação em três graus e dois
  dialetos. Dá 18 leituras distintas sem inventar nada.
- **Índice em linguagem de carga, nunca em nota.** Decisão dele, e está certa:
  nota humilha, e o instrumento pontuado é pago.
- **O índice precisa ser calibrado varrendo as combinações, sempre.** Na primeira
  versão, "sustentação baixa" caía em dois terços dos casos e o índice perdia o
  sentido. É o mesmo erro do primeiro índice da casa, no funil anterior. Varra as
  combinações antes de publicar.
- **A conta bate com o exemplo do próprio cliente** (R$3.300 e R$25.900). Sempre
  confira a aritmética contra o exemplo que ele já calculou, antes de subir.
- **Faixa aberta para baixo quebra a conta.** O documento dele cobre faixa aberta
  para cima ("usa o piso nas duas contas") e não cobre "Até R$500", onde o piso
  literal é zero. Resolvido com metade do teto, e registrado como decisão a
  confirmar.

## Sobre publicar

- 🚨 **O deploy inline do MCP da Vercel não serve para funil com binário.** Este
  tem 77KB entre fontes e gravuras, e o payload em base64 precisa ser transcrito
  à mão: o arquivo maior corrompeu e o deploy foi recusado. É exatamente o que a
  skill da casa avisa. **O que resolveu foi o CLI da Vercel com token da conta**,
  que sobe os arquivos direto do disco. Receita no README do funil.
  Melhor ainda seria projeto ligado ao Git, que publica sozinho a cada push, mas
  isso depende de o Vercel receber acesso a `simpleacc26/simpleacc` no GitHub,
  que hoje ele não tem (`repo_no_access`).
- **Projeto novo na Vercel nasce com proteção de deployment ligada.** Devolve 302
  em tudo, arquivo por arquivo, e a conferência pós-deploy parece um deploy
  quebrado quando na verdade é só o SSO. Desligue o `ssoProtection` antes de
  conferir. Aconteceu nos dois funis desta sessão.
- **Status 200 não prova integridade.** Compare o conteúdo com `cmp`, nunca só o
  código HTTP. São 18 arquivos aqui, e foi assim que a conferência fechou.
- **Fonte de marca sem requisição externa dá certo.** Cormorant Garamond e IBM
  Plex Sans servidas do próprio projeto, com subset dos glifos usados: 117KB
  viraram 66KB, e a regra de zero requisição externa continua de pé.
- **Gravura com fundo vinhetado não casa com fundo chapado.** `mix-blend-mode`
  não resolve, porque a vinheta varia. O que resolve é alfa por diferença de
  luminância contra um blur do próprio cinza. Script em
  `ferramentas/recorte-gravuras.py`.

## Sobre a captura de leads (16/09/2026)

- 🚨 **Status HTTP não valida integração.** O webhook do Make responde
  `Accepted` no instante em que recebe o POST, antes de o Google Sheets ver
  qualquer coisa. Um mapeamento trocado responde `Accepted` igual. **Valide
  lendo a planilha**, coluna a coluna, e só então apague a linha de teste.
- **`addRow` com `includesHeaders: false` mapeia por posição.** Escreva o
  cabeçalho à mão na linha 1 e trate a ordem dele como contrato: mexer numa
  coluna sem mexer no cenário desalinha tudo dali para baixo. São 29 colunas
  neste funil, listadas no README.
- **O sandbox não consegue testar o envio pelo navegador.** O proxy bloqueia o
  domínio do Make e o `fetch` morre em `ERR_CERT_AUTHORITY_INVALID`. Não é bug
  do funil. O contorno que funciona: interceptar o `fetch` na página, capturar o
  payload exato que o funil monta numa passagem completa, e reenviar por `curl`
  fora do navegador. Assim o que se testa é o payload real, não um inventado.
- **Descubra a aba antes de montar o cenário.** O nome padrão em conta em
  português é `Página1`, não `Sheet1`, e o `addRow` falha calado se errar. Dá
  para listar as abas por RPC do Make, sem abrir a planilha.

## Sobre a ordem das perguntas (16/09/2026)

- 🚨 **Pergunta que exige número não pode vir no começo.** A P2 do Prova de
  Carga pedia quanto o custo por venda tinha subido nos últimos seis a doze
  meses: exige memória e medição, logo depois da primeira tela. Feedback do
  cliente: as primeiras têm que ser fáceis, respondidas de cabeça. A ordem agora
  sobe de dificuldade, e os três números ficam nas posições 6, 7 e 8, quando a
  pessoa já investiu tempo e não abandona por causa de um número.
- **Ao reordenar, três coisas quebram calado:** pergunta que cita outra que
  ainda não veio ("segurar esse custo" apontava para uma pergunta que passou
  para o fim), tela de implicação que perde o argumento no ponto onde caiu, e o
  cabeçalho da planilha, que mapeia por posição. As três foram corrigidas juntas.
- **Headline de instrumento soa datada.** "Sua operação já vende. Onde ela cede
  quando a verba dobra?" foi lida pelo cliente como técnica demais, gente falando
  como nos anos 60. O problema era vocabulário de laboratório ("medição
  estrutural", "verba"), não densidade. Trocado por "Sua oferta vende hoje. Ela
  aguenta o dobro de investimento?", que é a palavra do mercado e uma alternativa
  que o próprio brand book autoriza. **Contenção não é arcaísmo.**
