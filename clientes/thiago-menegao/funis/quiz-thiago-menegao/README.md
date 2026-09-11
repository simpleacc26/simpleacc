# Quiz Diagnóstico de Condução · Thiago Menegão

Funil de lead dinâmico do **Protocolo PRIMAL PITCH**. HTML, CSS e JS puro, sem
build e sem nenhuma dependência externa (nem fonte, nem CDN): a página abre
igual offline e nada quebra se um terceiro cair.

```
anúncio → quiz (9 perguntas, 3 telas de carregamento) → captura
        → tela de carregamento real → página de diagnóstico e oferta → checkout
```

**Não existe reunião neste funil.** É venda direta. A hora de consultoria do
Thiago custa R$ 9 mil e o produto custa R$ 2 mil: uma hora dele vale quatro
vendas e meia, então nenhuma etapa pode exigir a presença dele. Toda vez que
aparecer a ideia de colocá-lo para atender, a resposta é não.

## No ar

| | |
| --- | --- |
| **Funil** | **https://quiz-thiago-menegao-simpleacc.vercel.app** |
| Diagnóstico | `/diagnostico.html` (o quiz leva sozinho) |

O anúncio aponta para a **raiz com query** (`/?utm_source=...`), nunca para
`/index.html`. As UTMs seguem sozinhas para o checkout quando ele existir: sem
isso a venda chega lá sem origem e não dá para saber qual criativo pagou.

### Como publicar uma alteração

```bash
node build-deploy.js     # gera dist/, que é o que sobe
node testar.js           # 25 checagens antes de qualquer deploy
```

Depois suba o conteúdo de `dist/` para os projetos da Vercel listados em
`deploy-config.json`, **na conta/time da Simple, nunca numa conta pessoal**.
Confira cada arquivo com `curl` + `cmp` contra o `dist/` depois de subir:
publicação substitui a árvore inteira e arquivo faltando vira 404 silencioso.

### Por que cinco projetos na Vercel

A publicação é feita por envio direto de arquivos, o envio tem limite de tamanho
por chamada, e cada deploy **substitui a árvore inteira**. Os 86 KB do funil não
cabem numa chamada só, então os JS moram em projetos de asset separados, no mesmo
padrão que o time já usa (`ges360-assets`, `quiz-go-imgs`):

| Projeto | Serve |
| --- | --- |
| `quiz-thiago-menegao` | as duas páginas, o CSS e o favicon |
| `quiz-thiago-menegao-js` | `flow.js`, `motor.js` |
| `quiz-thiago-menegao-js2` | `app.js` |
| `quiz-thiago-menegao-js3` | `diagnostico.js` |
| `quiz-thiago-menegao-img` | `thiago.webp`, e qualquer binário futuro |

**Isso colapsa para um projeto só quando a Vercel receber acesso de escrita ao
repositório no GitHub.** Hoje a tentativa de ligar o projeto ao Git falha com
`repo_no_access`. Com o acesso concedido (Vercel > Settings > Git > GitHub App,
autorizando `simpleacc26/simpleacc`), dá para criar um projeto único com
`rootDirectory` nesta pasta: todo push publica sozinho, `build-deploy.js` e
`deploy-config.json` deixam de ser necessários e os `<script src>` voltam a ser
relativos.

**O projeto de imagem existe separado de propósito.** Cada publicação substitui
a árvore inteira do projeto, e binário viaja em base64 na chamada. Junto do
código, a foto teria que ser reenviada a cada ajuste de JS, com risco de
corromper em silêncio, que é exatamente o que já aconteceu uma vez neste
projeto. Sozinha, ela sobe uma vez e não se mexe mais.

A proteção de deployment (Vercel Authentication) foi **desligada nos cinco
projetos**. Com ela ligada, que é o padrão do time, até a produção respondia 302
e o link não abria para quem não está logado na Vercel.

## Arquivos

| Arquivo | O que é |
| --- | --- |
| `index.html` | o quiz |
| `flow.js` | **toda a copy, os pesos e a oferta.** É aqui que se mexe |
| `motor.js` | cálculo do IIC, das travas, da conta e do telefone. Fonte única, usada pelas duas páginas |
| `app.js` | motor do quiz: render, validação, intersticiais, tracking, envio do lead |
| `diagnostico.html` | a página de diagnóstico e oferta (estilos próprios no `<style>` do final do `<head>`) |
| `diagnostico.js` | monta o relatório personalizado e a oferta |
| `styles.css` | identidade preto e dourado, compartilhada pelas duas páginas |
| `build-deploy.js` | gera `dist/`, a árvore que vai ao ar (sem comentários, com os `<script src>` apontando para os projetos de asset) |
| `deploy-config.json` | quais projetos da Vercel servem o quê |
| `calibrar.js` | `node calibrar.js` mostra a distribuição do IIC em todas as combinações |
| `testar.js` | `node testar.js` roda o funil de ponta a ponta num Chromium headless |
| `depoimentos/` | vazia por enquanto. Ver "O que falta" |

## Como rodar

```bash
cd clientes/thiago-menegao/funis/quiz-thiago-menegao
python3 -m http.server 8080     # e abrir http://localhost:8080
node calibrar.js                # distribuição do índice
node testar.js                  # 20 checagens de ponta a ponta
node testar.js --shot           # idem, mais um print da página de diagnóstico
```

`testar.js` responde o quiz inteiro num Chromium headless e confere: as 9
perguntas, os 3 intersticiais, a máscara de telefone contra o autofill do
iPhone, o redirecionamento, os cinco baldes no relatório, a ausência
de variável vazada ou de conta zerada, a largura em 320px, 390px e 430px, e que
nenhuma opção nasce pré-selecionada. Ele escreve os temporários fora desta
pasta de propósito: publicação substitui a árvore inteira, e arquivo de teste
não pode subir junto.

## O que este funil tem de diferente

### 1. Telas de carregamento simuladas no meio do quiz
Vieram da referência que o Daniel mandou modelar (`mssquiz.fullsalessystem.com`,
mapeada tela a tela em `contexto/2026-09-01-referencia-quiz-full-sales-system.md`).
Lá são quatro, e o achado é que **não são espera, são argumento com barra em
cima**. O blueprint da casa só previa uma, entre a captura e o relatório.

As três daqui vivem em `flow.js > intersticiais` e a especificação de copy está
em `copy/2026-09-01-telas-de-carregamento-funil-quiz.md`:

- depois da P2, **o espelho do fim da conversa**, que devolve a resposta que a
  pessoa acabou de dar;
- depois da P4, **o reframe da causa** ("reunião perdida quase nunca morre no
  preço"), que é a tela mais importante das três porque o avatar tem
  consciência alta do problema e baixa da causa;
- depois da P6, **quem assina a análise**, no mesmo ponto em que a referência
  põe os depoimentos de peso. Como o produto ainda não tem depoimento, a
  autoridade entra pelo lastro corporativo.

### 2. Toda barra cresce até o número
Foi o detalhe que o cliente destacou na referência, e virou regra: a barra dos
intersticiais, o percentual do IIC, a régua das sete etapas, as quatro barras de
trava e o valor da conta **animam de zero até o valor**, nunca aparecem prontos.
No relatório o gatilho é `IntersectionObserver`, uma vez por elemento, e
`prefers-reduced-motion` cai para o valor final direto.

### 3. A régua das sete etapas, no lugar do medidor comparativo
A referência mostra um medidor com dois pinos, "Você" e "Concorrente". O pino do
concorrente é um número inventado, e este público confere número. Aqui a barra
cresce **até o ponto em que o controle escapa**, que é a primeira etapa afetada
pelo balde dominante: quem trava em Posição de Condutor vê a barra quase vazia,
quem trava em Consultoria Gratuita vê a barra quase cheia. O eixo é o próprio
método, não um terceiro.

### 4. A conta
Com o volume de reuniões (P8) e o ticket (P9), a página devolve **quanto ficou
na mesa nos últimos doze meses**. É a conta que o canvas diz que ele faz de
madrugada, e é a ponte para a oferta.

É deliberadamente conservadora, e a página mostra a fórmula: **uma reunião a
mais fechada a cada dez**, com o **piso** de cada faixa que a pessoa marcou,
nunca o teto. Dá de R$ 14 mil a R$ 540 mil conforme o perfil. Ela substitui o
gráfico "Você hoje x Após 6 meses" da referência, que é projeção de futuro e
está vetada neste projeto: passado inegável no lugar de futuro provável.

### 5. O quiz é curto, a oferta é longa
Mesmo contraste da referência, e é proposital: uma pergunta por tela e quase
nenhuma rolagem no quiz; uma página única de rolagem longa (cerca de 11 mil px
no celular) depois, porque quem chegou lá já se comprometeu.

## Regras de copy deste cliente, que valem para qualquer alteração

Estão repetidas no topo do `flow.js` porque quebrá-las custa a venda:

1. **Nunca usar travessão.** Vírgula, dois-pontos, parênteses, ponto.
2. **Sem emoji.**
3. **Nada de future pacing.** O gatilho é o custo de continuar adiando.
   *"Quando você vende o futuro, o futuro é provável. Quando eu vendo o custo de
   você não agir, ele é inegável."*
4. **Nada de ancoragem irreal.** Nada de "valia 10 mil, leva por 2 mil", nada de
   contador de 24 horas. O comprador maduro desdenha, e contradiria o próprio
   método que está sendo vendido.
5. **O avatar acredita que conduzir é manipular.** Nenhuma frase pode soar a
   pressão, dominação ou controle do lead. A linguagem que abre é condução,
   responsabilidade e clareza.
6. **Entrar pela causa, nunca pela solução.** Diferencial é mecanismo, nunca
   promessa. Sofisticação de mercado 4 a 5: este mercado já viu promessa de
   conversão e já viu neurociência aplicada a vendas.
7. **Descrever a cena, nunca acusar a pessoa.** Acusar um vendedor de não saber
   vender ativa exatamente o alarme primal que o método ensina a desligar.

## Os cinco baldes

A personalização inteira do relatório gira em torno dos **cinco baldes**
definidos pelo Daniel, que são os cinco pontos onde a reunião de alto valor
trava no método do Thiago. Eles vivem em `flow.js > travas` e a **P3** tem uma
opção para cada um, na ordem em que aparecem na reunião.

| Balde (nome do Daniel) | Nome na página | Etapas afetadas | Régua para em |
|---|---|---|---|
| Não posicionamento como Condutor/Consultor | Posição de Condutor | Abertura e Condução | 7% |
| Não identificação do Perfil do lead | Leitura de Perfil | Diagnóstico e Espelho | 21% |
| Não identificação da Camada do lead | Camada do Lead | Espelho e Contexto | 36% |
| Empilhamento Desproporcional | Empilhamento Desproporcional | Condução e Prescrição | 64% |
| Carência Emocional / Consultoria Gratuita | Consultoria Gratuita | Prescrição e Decisão | 79% |

**Por que os nomes na página são diferentes.** Os baldes do Daniel são descritos
pela falta ("não posicionamento", "carência emocional"). Na página eles entram
pelo nome do que precisa acontecer, nunca pela acusação: a ferida dominante
deste avatar é injustiça, seguida de humilhação, e "você é carente" fecha a
leitura na primeira linha. Mesmo balde, entrada pela cena.

### O que cada balde troca na página

Cada balde entrega cinco campos, e quatro deles trocam blocos inteiros do
relatório. O resto da página é igual para os cinco de propósito: é a parte que
sustenta a venda.

| Campo | Onde entra | Comum ou personalizado |
|---|---|---|
| `nome` | h1 do resultado e rótulo da barra dominante | personalizado |
| `etapas` / `etapasIdx` | régua das sete etapas, onde a barra para | personalizado |
| `resumo` | barra dominante e leitura do cenário | personalizado |
| `cena` | abre o bloco do espelho, antes da lista comum | personalizado |
| `custo` | abre "o custo de continuar como está" | personalizado |
| `caminho` | "o que precisa acontecer no seu caso" | personalizado |
| barras de afinidade | ordem muda conforme as respostas | personalizado |
| argumento da conta | calibrado pelo ticket, não pelo balde | personalizado |
| mecanismo, tentativas mortas, oferta, prova, FAQ, decisão | resto da página | comum |

As cinco barras de afinidade não são só decoração: elas somam o campo `travas`
de cada opção escolhida em P1, P2, P3, P4 e P5, então **duas pessoas com o mesmo
balde dominante veem ordens diferentes** nos outros quatro. Nenhum número da
página é inventado, todos saem das respostas.

**Se mexer nos baldes:** `motor.js` já lê as chaves de `flow.js`, então
acrescentar ou tirar um balde não exige tocar no motor. O que precisa
acompanhar é a P3 (uma opção por balde), o campo `travas` de toda opção que
pontua, os perfis do `testar.js` e a calibragem.

## O índice (IIC)

**Índice de Inversão de Camada**, de 0 a 100. Sai só das perguntas com `peso`
(P1 a P5). Desafio, objetivo, estrutura, volume, ticket e urgência não pontuam:
servem para o espelho, para as barras, para calibrar o argumento e para priorizar
a fila na planilha.

`node calibrar.js` roda as 1920 combinações. Hoje: amplitude de 29% a 100%, com
53% em Alta, 47% em Média e 0,1% em Baixa. A faixa Baixa é rara de propósito,
porque o quiz não tem alternativa de "está tudo bem": quem responde já se
reconhece no problema. **Se mexer em qualquer peso, rode a calibragem de novo.**

## Segmentação: aqui ninguém é barrado

Este funil vende um produto de R$ 2 mil, não uma agenda. **Todo mundo que
conclui o quiz recebe a oferta**, independente do ticket. P7 e P9 calibram o
argumento (quem vende caro perde contrato, quem vende ticket de entrada perde
volume de reunião) e marcam na planilha o segmento.

A exceção que vale ouro: quem marca **ticket acima de R$ 25 mil com time
comercial estruturado** entra na planilha como `topo`. Esse perfil compra o
gravado e é candidato natural ao que o Thiago já vende caro, inclusive treinar o
time inteiro. **O funil não aborda, apenas entrega o nome.**

Não se pergunta faturamento, e é regra dele: a pessoa mente, e faturamento não é
lucro. Ticket praticado e estrutura comercial dizem a verdade sobre o jogo que a
pessoa joga.

## Planilha de leads e integração

| | |
| --- | --- |
| **Planilha** | [Leads · Quiz Diagnóstico de Condução · Thiago Menegão](https://docs.google.com/spreadsheets/d/1pbw3MXztt0BiYKqhCPC8FPnww5abnANPP_bpaZ8iENU/edit) |
| Pasta no Drive | `Simple <> Thiago Menegão` |
| Cenário no Make | `[Thiago Menegão] Diagnóstico de Condução → Sheets` (Time Simple Acc, id 6197898) |
| Webhook | `app.js > LEADS_ENDPOINT` |
| Aba | **`Untitled`** |

São **29 colunas**, na mesma ordem dos campos de `enviarLead()` no `app.js`.
Além dos dados de contato, cada linha traz o **balde dominante**, o IIC com a
faixa, o segmento de ticket, a conta de 12 meses e as nove respostas do quiz em
texto legível (inclusive o **maior desafio** e a **urgência**), mais as cinco
UTMs e a URL de origem. É o suficiente para abrir a linha e saber com quem se
está falando, e com que pressa, antes de responder.

> ⚠️ **A planilha foi REFEITA em 11/09** para caber o cabeçalho de 29 colunas.
> O Drive não deixa reescrever o cabeçalho de uma planilha existente por aqui, e
> o `addRow` grava por posição, então não dava para acrescentar coluna no meio.
> A antiga, de 27 colunas, continua na mesma pasta renomeada para **"ANTIGA
> (não usar)"**: pode apagar quando quiser.

**Três armadilhas deste conjunto, todas já pisadas pela casa:**

1. O `addRow` do Make grava **por posição**. Mexeu na ordem dos campos de
   `enviarLead()` ou no cabeçalho da planilha, o mapeamento sai do lugar em
   silêncio, sem erro nenhum.
2. O `addRow` referencia a aba **pelo nome**, e o nome é `Untitled`, não
   "Página1": planilha criada a partir de CSV nasce assim. Renomear a aba quebra
   o módulo com `400 Unable to parse range` e o Make desativa o cenário.
3. Testar com `curl` exercita o Make, **não o funil**. O teste que vale é
   responder o quiz inteiro no navegador e depois LER a planilha.

## O que falta antes de subir mídia

Todos os pontos abaixo têm trava no código: enquanto não forem preenchidos, ou o
bloco não renderiza, ou a página avisa no topo.

| Pendência | Onde | O que acontece hoje |
| --- | --- | --- |
| **URL do checkout** | `flow.js > marca.checkoutUrl` | os botões não navegam e a página mostra um aviso vermelho no topo |
| **Pixel da Meta** | `index.html`, `diagnostico.html` (bloco comentado) e `app.js > TRACKING_CONFIG` | nenhum evento sobe |
| **Logos das marcas** | `diagnostico.js > LOGOS` | entram os nomes em chip. O Thiago **autorizou usar as imagens** em 11/09, mas os arquivos ainda não chegaram, e logo de marca registrada não se desenha de memória |
| **Texto da tela de autoridade** | `flow.js > intersticiais`, id `autoridade` | está o nosso texto provisório. O Thiago disse em 11/09 que vai mandar "um texto mais estratégico" |
| **Depoimentos** | `diagnostico.js > DEPOIMENTOS` | o bloco inteiro não renderiza |
| **Prazo da garantia** | `flow.js > oferta.prazoGarantia` | a página fala em garantia sem citar prazo |
| **Data da Turma de Fundadores** | `flow.js > oferta.dataLimiteFundadores` | o bloco de fundadores não aparece |

Sobre as duas últimas, é decisão consciente e não descuido: prazo inventado com
este público custa mais caro que a venda que traria. **O prazo da Turma de
Fundadores só entra se a data for real e o preço subir mesmo.**

### A confirmar com o cliente antes de publicar

1. **Citar as marcas nominalmente** (Mercedes, Itaú, Honda, John Deere,
   Electrolux e Philips), o "desde 1993", os "20 anos" e os "50+ projetos".
   Tudo isso está escrito na estratégia entregue a ele em 06/08, mas nunca foi
   confirmado como claim público.
2. **Expor a hora de R$ 9 mil** na página. É o texto aprovado na estratégia e
   funciona como âncora real, mas é o preço de outro produto dele ficando
   público.
3. **Brandbook.** A paleta preto e dourado do `styles.css` foi amostrada da arte
   da área de membros, não veio de manual de marca.
4. **O nome do inimigo, Inversão de Camada.** É proposta da Simple para o
   problema que ele já descreve, e atravessa quiz, página e anúncios.

### Divergências abertas no canvas

Vieram do canvas v2 e continuam sem resposta: o preço aparece como R$ 2.000 no
campo mas a tabela de objeções trata "R$ 500 é barato demais", e o texto cita
"Aula 1" e "Aula 2" como se existisse uma sequência de aulas planejada.

## Verificação do que está no ar

Em 11/09/2026 os **nove** arquivos servidos (as duas páginas, o CSS, o favicon,
os quatro JS e a `thiago.webp`) foram conferidos com `curl` + `cmp` contra o
`dist/` local e são **byte a byte idênticos** ao build que passou nas 25
checagens do `testar.js`. Refaça essa conferência depois de todo deploy.

Comando, rodando dentro de `dist/`:

```bash
curl -s -o /tmp/x https://quiz-thiago-menegao-simpleacc.vercel.app/diagnostico.html
cmp /tmp/x diagnostico.html
```

E assim por diante para cada arquivo, contra a base do projeto dele em
`deploy-config.json`. **Status 200 não prova integridade**, só que o arquivo
existe.
