# A Estrutura Invisível da LP de Aula ao Vivo

**Blueprint canônico.** Origem: `marianagarrett.com.br/paciente-que-some/`
(agosto/2026), engenharia reversa feita a partir do HTML/CSS/JS publicado. É o
arquétipo da **LP de evento ao vivo de baixo ticket que abre vagas de high ticket
no fim** (aula/masterclass/imersão online paga de R$ 19 a R$ 97).

"Invisível" porque o lead não percebe nada disso. Para ele a página é uma
conversa honesta que termina num botão. Por baixo, **cada seção tem uma função
de conversão e uma ordem que não é negociável.**

Se você é uma sessão nova montando uma LP desse tipo: **leia este arquivo inteiro
antes de escrever a primeira linha de copy.** Ele existe para o operador não ter
que repetir estas decisões toda vez.

---

## Parte 0: quando usar (e quando NÃO usar) este arquétipo

**Use quando** o cliente tem, ao mesmo tempo:

- Um **evento ao vivo com data e hora marcadas** (não é conteúdo evergreen).
- Um **preço simbólico** (o ingresso não é o negócio, é o filtro).
- Um **produto de continuidade** (mentoria, acompanhamento, programa) que será
  aberto no fim da aula.
- Pelo menos **uma dor operacional específica e nomeável** do público. Não
  serve para "vou ensinar marketing digital"; serve para "a paciente que some
  depois do preço".

**Não use quando:**

| Situação | O que usar no lugar |
|---|---|
| Não tem data marcada (evergreen, VSL) | `prompts/funil-html.md` (`/prompt-mestre`) |
| O objetivo é qualificar lead frio para call | skill `gerar-quiz-diag-pag-pos-quiz` |
| O evento é gratuito | Este arquétipo, **removendo** o bloco de ancoragem de preço e a carta "por que tão barato". A escassez passa a ser só tempo + "sem gravação". |
| O ticket do evento é alto (R$ 297+) | Este arquétipo **não serve**. Preço alto exige VSL, prova longa e garantia. Aqui o preço baixo é estrutural: é o que autoriza a página a ser curta e direta. |

### A tese econômica da página (entenda antes de copiar)

A LP inteira é uma **negação da lógica de lucro do ingresso.** O cliente não
ganha dinheiro com o evento e a página **diz isso em voz alta**. Isso não é
generosidade, é conversão: ao explicar o próprio modelo de negócio, a página
neutraliza a maior objeção do lead ("no fim vai ser só venda") transformando-a
em prova de honestidade.

> **Regra:** se o cliente não aceitar declarar o pitch na página, **este
> arquétipo perde o motor.** Não adapte sem isso. Negocie com o cliente antes
> de escrever.

---

## Parte 1: o mapa das 21 peças, na ordem

Ordem exata do DOM. As colunas dizem o que a peça faz **no lead**, não o que ela
mostra. Peças marcadas 🔒 são obrigatórias; sem elas o arquétipo quebra.

| # | Peça | `class` | Função de conversão |
|---|---|---|---|
| 1 | 🔒 **Hero** | `.hero` | Promessa + data + preço + escassez + CTA, tudo acima da dobra |
| 2 | **Ticker 1** | `.ticker` | Repete as condições em movimento. Cria urgência ambiente |
| 3 | 🔒 **Contador** | `.clock` | Transforma "terça" em "faltam 21 dias". Escassez de tempo |
| 4 | 🔒 **Objeções** | `.pain` | Diz as 5 desculpas do lead **antes** dele pensar nelas |
| 5 | 🔒 **Espelho** | `.pain .zap` | Mock de WhatsApp: a cena exata da dor, com horário |
| 6 | 🔒 **Reframe** | `.truth` | Troca o vilão. "O preço não foi o problema, a resposta sim" |
| 7 | **Duas personas** | `.vs` | Auto-classificação. O lead escolhe qual das duas ele é |
| 8 | 🔒 **Dado proprietário** | `.band` | Prova estatística de que o vilão novo é o certo |
| 9 | 🔒 **Diagnóstico em aberto** | `.vs` (2ª) | 5 degraus com `?` no lugar dos números. **O motivo de comparecer** |
| 10 | **Ganhos** | `.gains` | O que ele leva embora, em 4 itens concretos |
| 11 | 🔒 **Grade** | `.grade` | Os 4 blocos da aula + o bloco-estrela + **a declaração do pitch** |
| 12 | **Ticker 2** | `.ticker--deep` | Segunda passada nas condições, meio da página |
| 13 | **Entregáveis** | `.kit` | Materiais físicos entregues na sala, não por e-mail |
| 14 | 🔒 **Autoridade** | `.bio` | Quem conduz + credenciais numéricas |
| 15 | 🔒 **Depoimentos** | `.deps` | Prova pedida: 3 vídeos com resultado numérico |
| 16 | **Mural** | `.mural` | Prova **não** pedida: prints crus do grupo |
| 17 | 🔒 **Oferta** | `.offer` | O card de compra completo, isolado |
| 18 | 🔒 **Carta** | `.letter` | "Por que tão barato": o modelo de negócio explicado e assinado |
| 19 | **FAQ** | `.faq` | 3 dúvidas, nem uma a mais |
| 20 | **Fechamento** | `.final` | Última chamada, sem argumento novo |
| 21 | 🔒 **Barra fixa** | `.sticky` | CTA sempre visível a partir do primeiro scroll |

### As três metades da página

Se você precisar cortar, corte sabendo onde está.

```
PEÇAS 1-3    → PROMESSA      "existe uma resposta certa, é terça, custa R$ 27"
PEÇAS 4-9    → DIAGNÓSTICO   "o seu problema não é o que você acha que é"   ← o coração
PEÇAS 10-21  → OFERTA        "é isso que acontece na terça, e é assim que eu ganho dinheiro"
```

O bloco de **diagnóstico** é o que separa esta LP de uma página de evento comum.
Uma LP de evento normal vai de promessa direto para grade. Aqui, entre as duas,
o lead **muda de opinião sobre o próprio problema**. É por isso que ele compra:
não pelo conteúdo prometido, mas porque a página já entregou uma virada de
entendimento e ele quer a próxima.

---

## Parte 2: peça por peça, com as regras

### 1. Hero (`.hero`) 🔒

Grid de 2 colunas (1.2fr / 0.8fr). Coluna da esquerda em 8 camadas empilhadas,
nesta ordem:

| Camada | Elemento | Conteúdo | Regra |
|---|---|---|---|
| 1 | `.kicker` | "Aula ao vivo · terça, 08 de setembro" | Pílula com ponto vermelho piscando. Formato + data, **nunca** benefício |
| 2 | `h1` | "A Paciente que Some" / *"Depois do Preço"* | **Duas linhas.** A 2ª em itálico com gradiente dourado |
| 3 | `.sub` | "Ela elogiou, agradeceu, perguntou o valor e nunca mais respondeu. **Existe uma resposta certa para essa mensagem.**" | Cena + promessa. Máx. 34ch de largura |
| 4 | `.facts` | 🗓️ Quando · 💻 Onde · ⚠️ Atenção | 3 linhas, rótulo micro em caixa alta + valor em branco |
| 5 | `.anchor` | **R$ 27** ~~de R$ 67~~ *lote zero* | Preço já na dobra. Ancoragem imediata |
| 6 | `.hbar` | barra 60% + "**80%** dos ingressos do lote zero já foram" | Escassez de estoque |
| 7 | `.cta-row` | botão + link fantasma "Ver o que acontece na aula" → `#grade` | O link fantasma é **âncora interna**, nunca saída |
| 8 | `.heroCard` | foto 4/5 rotacionada 2.4° + 2 badges flutuantes | Badges repetem preço e data por cima da foto |

**A regra do H1.** O título nomeia **o personagem da dor**, não o benefício. "A
Paciente que Some Depois do Preço" é um substantivo que o público reconhece de
imediato como algo que aconteceu com ele ontem. Compare:

| ❌ Título de benefício | ✅ Título de personagem |
|---|---|
| "Aprenda a vender mais no WhatsApp" | "A Paciente que Some Depois do Preço" |
| "Como fechar mais orçamentos" | "O Orçamento que Nunca Volta" |
| "Domine a conversa de vendas" | "O Cliente que Some no 'Vou Pensar'" |

O personagem tem que passar no teste: **o lead consegue apontar uma pessoa real
da semana dele com esse nome?** Se não, o título ainda é abstrato demais.

**Os 3 fatos com emoji.** Este é o **único lugar** da página onde emoji é
permitido, e só como ícone funcional de linha (🗓️ 💻 ⚠️). O ⚠️ da terceira
linha carrega a informação mais valiosa: *"Essa aula não ficará gravada"*,
destacada em `--alerta`. Ela é escassez disfarçada de aviso de serviço.

> Para público masculino, jurídico, médico ou corporativo: **remova os emoji** e
> use os rótulos em caixa alta sozinhos. Ver Parte 5.

### 2 e 12. Tickers (`.ticker`, `.ticker--deep`)

Faixa horizontal com marquee CSS infinito (`animation: tick 30s linear infinite`,
conteúdo duplicado em dois `<span>` para o loop fechar). Não é decoração: é a
**repetição das condições** em um formato que o olho lê sem custo.

- Ticker 1 (fundo bronze, logo abaixo do hero): as condições completas.
  `Terça 08/09 · 19h30 · Ao vivo · Sem gravação · 3 conversas reais na tela · R$ 27`
- Ticker 2 (fundo escuro, direção invertida, 38s, depois da grade): versão
  encurtada, com o preço riscado em vermelho.
  `Lote zero · R$ 27 em vez de R$ 67 · Sem gravação · Terça, 19h30`

Dois tickers, nunca três. O segundo existe porque a grade é longa e o lead
chega no meio da página tendo esquecido o preço.

### 3. Contador (`.clock`) 🔒

Barra clara com "A aula começa em" + 4 caixas (dias / horas / min / seg).

```js
var alvo = new Date('2026-09-08T19:30:00-03:00').getTime();
function tick(){
  var s = Math.max(0, Math.floor((alvo - Date.now())/1000));
  campos.d.textContent = Math.floor(s/86400);
  campos.h.textContent = pad(Math.floor(s%86400/3600));
  campos.m.textContent = pad(Math.floor(s%3600/60));
  campos.s.textContent = pad(s%60);
}
tick(); setInterval(tick, 1000);
```

**Regras:**
- Fuso **sempre explícito** (`-03:00`). Sem ele o contador mente para quem abre
  fora do Brasil e para o próprio servidor em UTC.
- `Math.max(0, ...)` obrigatório: depois da hora o contador zera, não vira
  negativo.
- Dias **sem `pad`** (mostra `21`, não `021`), o resto com `pad(2)`.
- `font-variant-numeric: tabular-nums` nos números, senão os segundos tremem.
- **É um contador honesto, não um fake reiniciável.** Não existe versão
  evergreen deste bloco na casa. Se o cliente pedir contador falso, recuse: a
  página inteira aposta em honestidade declarada, e um contador que reinicia
  destrói a carta da peça 18.

### 4. Objeções (`.pain`) 🔒 — "Antes de qualquer coisa"

A peça mais contraintuitiva da página, e a primeira depois do hero.

Cinco itens (`ul.plist`), cada um com um `?` grande pulsando ao lado, escritos
**entre aspas, na primeira pessoa do lead**:

1. "Isso eu já sei. Tenho que responder rápido."    ← *já sei disso*
2. "Na minha cidade toda paciente só quer o mais barato."  ← *meu contexto é diferente*
3. "Eu não tenho clínica ainda. Isso não é para mim."  ← *não sou o público*
4. "Terça à noite eu já estou acabada."  ← *não tenho energia/tempo*
5. "Se custa R$ 27, não deve valer grande coisa."  ← *preço baixo = baixa qualidade*

Fecha com: **"Eu entendo. Você tem todo o direito de desconfiar."**

**As 5 categorias são fixas.** Mude o conteúdo, nunca as categorias:

| # | Categoria | O que neutraliza |
|---|---|---|
| 1 | Já sei | Lead experiente que acha o tema básico |
| 2 | Meu caso é diferente | Objeção geográfica/de nicho |
| 3 | Não sou o público | Lead pequeno demais ou grande demais |
| 4 | Não tenho tempo/energia | Custo de comparecer ao vivo |
| 5 | Barato demais | **A objeção que só existe em evento de baixo ticket** |

A 5ª é a assinatura do arquétipo. Toda LP de ingresso simbólico precisa dela, e
ela só é resolvida de verdade lá na peça 18 (a carta). Aqui ela só é **nomeada**.

### 5. Espelho (`.pain .zap`) 🔒

Ao lado das objeções, um grid com 4 perguntas de diagnóstico (`.asks`) e um
**mock de conversa de WhatsApp** renderizado em HTML/CSS puro (sem print, sem
imagem).

```
[cabeçalho ameixa]  P  Paciente nova · visto por último há 9 dias
[balão entrada]     Oi! Vi o seu Instagram 😍 Quanto fica a avaliação?   20:41
[balão saída]       Oi! A avaliação é R$ 250 😊                          22:15
[balão entrada]     Ah, entendi… vou ver aqui e te falo!                 22:19
[selo silêncio]     9 dias sem resposta
```

**Por que funciona, item por item:**

- **Os horários são a prova.** `20:41 → 22:15` mostra que a profissional demorou
  1h34 para responder, sem que a página precise acusar. E `22:15 → 22:19`
  mostra que a paciente respondeu em 4 minutos: ela **estava lá**. O lead lê
  isso sem ler.
- **A resposta do meio é o crime.** "A avaliação é R$ 250 😊" é exatamente o que
  o lead faria. Ele se vê no balão de saída, não no de entrada.
- **"9 dias sem resposta"** aparece duas vezes (no cabeçalho e no selo final).
  Cronifica.
- **É HTML, não screenshot.** Print de conversa real levanta questão de LGPD,
  fica ilegível no mobile, e não pode ser reescrito para outro cliente. O mock
  em CSS é acessível, nítido em qualquer tela e adaptável em 5 minutos.

> **A regra do espelho:** a cena tem que ser **tão específica que soa como
> vigilância.** Genérico ("o cliente some") não funciona. Específico ("ela
> respondeu em 4 minutos e você em 1h34") funciona.

As 4 perguntas do `.asks` são todas **quantitativas e sem resposta na página**:
"Quantas pacientes perguntaram o preço essa semana e nunca mais responderam?".
O lead começa a contar de cabeça. Isso é o pré-aquecimento da peça 9.

### 6. Reframe (`.truth`) 🔒 — "A parte que dói"

**A troca de vilão.** É o único parágrafo argumentativo da página inteira.

> "O preço não foi o problema, a resposta sim.
> A sua paciente não desistiu quando viu o valor. Ela desistiu quando recebeu um
> número solto, preço e mais nada. [...] **Um número sozinho não vende nada.**
> E aí você acha que precisa cobrar menos, quando o que falta é o que vem antes
> e depois do valor."

Fecha com um `.pull`: *"Você não está com preguiça, está sem roteiro."*

**A anatomia do reframe (copie a estrutura, troque o conteúdo):**

```
1. NEGAÇÃO      "X não foi o problema, Y sim."
2. RECONSTRUÇÃO "Ela não desistiu quando ___. Ela desistiu quando ___."
3. SENTENÇA     Uma frase curta que vira slogan. ("Um número sozinho não vende nada.")
4. CONSEQUÊNCIA "E aí você acha que precisa ___, quando o que falta é ___."
5. ABSOLVIÇÃO   "Você não está com [defeito de caráter], está sem [ferramenta]."
```

A camada 5 é obrigatória e é a mais esquecida. **O reframe tem que terminar
tirando a culpa do lead**, trocando um defeito de caráter (preguiça, incompetência,
falta de jeito) por uma falta de ferramenta (roteiro, processo, estrutura). Sem
isso o diagnóstico vira acusação e o lead fecha a aba.

Ao lado, uma ilustração SVG inline animada (não é foto, não é ícone de banco de
imagens). Ver `componentes.md`.

### 7. Duas personas (`.vs`) — "Onde o dinheiro se perde"

> "Existem duas profissionais perdendo dinheiro agora, e nenhuma das duas sabe."

Dois cards lado a lado, `01` e `02`. O segundo leva a classe `.yes` (borda e
fundo destacados).

- **01 — A que acha que falta paciente nova chegando.** Posta mais, faz promoção,
  baixa o valor. *(o erro)*
- **02 — A que já viu que o dinheiro está na conversa.** Tem quarenta conversas
  paradas desde o mês passado e nunca voltou em nenhuma. *(o erro sofisticado)*

**A sutileza que faz isso funcionar:** as duas estão erradas. A 02 não é a
"certa", é a que **já entendeu o diagnóstico e mesmo assim não age**. O destaque
visual nela não é "seja assim", é "você já sabe e continua parada". Isso impede
que o lead avançado leia o bloco e conclua "ok, eu já sou a 02, não preciso da
aula".

> ❌ Erro comum ao adaptar: escrever o card 02 como o estado desejado. Vira uma
> comparação boba de "antes e depois" e perde a tensão.

### 8. Dado proprietário (`.band`) 🔒 — "O que eu aprendi ouvindo"

Fundo escuro (ameixa/deep). Três pontos numerados + um gráfico de barras
comparando dois grupos.

```
Clínicas que faturam acima de R$ 21 mil/mês   Converter 35%  |  Atrair 17%
Clínicas que faturam até R$ 10 mil/mês        Converter 21%  |  Atrair 27%
```

Fecha com `.bandClose`: *"Repare que as barras trocam de lugar de um grupo para
o outro. A virada acontece quando você para de brigar por paciente nova e vai
olhar a conversa que já chegou."*

E com `.bandSrc` (fonte, em micro): *"Mais de mil formulários recebidos pela
Mariana no último ano. Esta leitura usa as 445 respostas que informaram
faturamento e dificuldade."*

**As 4 regras deste bloco, todas obrigatórias:**

1. **O dado tem que ser do cliente.** Pesquisa própria, formulários, base de
   alunos, planilha de mentorados. Estatística de mercado ("segundo a Forbes")
   não serve: ela prova o tema, não prova **o cliente**.
2. **A leitura tem que ser visual antes de textual.** As barras invertem de
   posição entre os dois grupos. O lead entende o gráfico em 1 segundo, antes de
   ler a legenda. Se o seu dado não produz uma inversão visível, procure outro
   corte.
3. **O n amostral aparece, e o denominador é honesto.** "Mais de mil formulários"
   e em seguida "esta leitura usa as 445 que informaram faturamento". Declarar a
   perda amostral **aumenta** a credibilidade. Não arredonde para 1000.
4. **O dado tem que apontar para o vilão da peça 6.** Ele não está ali para
   impressionar, está para provar que o reframe é verdade. Dado bonito que não
   sustenta o reframe é ruído: corte.

> Se o cliente não tem dado proprietário nenhum, **este bloco vira uma
> observação qualitativa numerada** ("conhecer mais de mil donas de clínica me
> mostrou que..."), sem gráfico. Nunca invente número. Ver Parte 6.

### 9. Diagnóstico em aberto (`.vs` 2ª) 🔒 — "Onde exatamente ela desiste"

**A peça mais importante da página inteira.** É o que faz o lead comprar.

> "Você não tem um problema de alcance. Tem um vazamento."

Um card branco com 5 linhas, cada uma com rótulo, barra e um **`?` no lugar do
número**:

```
A mensagem chegou      ▓▓▓▓▓▓▓▓▓▓  ?
Você respondeu         ▓▓▓▓▓▓▓▓    ?
Ela perguntou o preço  ▓▓▓▓▓▓      ?
Ela agendou            ▓▓▓▓        ?
Ela apareceu           ▓▓          ?
```

Legenda (`.fc`): *"As barras aqui são ilustração. Os cinco números são os seus,
e você calcula os seus ao vivo, na terça 08/09."*

**Este é o motor de comparecimento.** A página inteira até aqui construiu uma
pergunta que o lead agora quer responder, e **a resposta não existe na página**:
ela só existe na sala, com os números dele. É por isso que a legenda declara que
as barras são ilustração. Fingir que os números são reais destruiria o mecanismo
e a honestidade da página junto.

**Como adaptar:** todo negócio tem uma cadeia de 4 a 6 etapas entre o primeiro
contato e o dinheiro. Nomeie as etapas **na linguagem do cliente final**, não em
jargão de funil:

| ❌ Jargão | ✅ Linguagem do lead |
|---|---|
| Topo de funil | A mensagem chegou |
| Taxa de resposta | Você respondeu |
| Objeção de preço | Ela perguntou o preço |
| Conversão | Ela agendou |
| No-show | Ela apareceu |

E dê nome próprio ao conceito: aqui é **"o vazamento"**, e "o Mapa das 5 Etapas"
vira entregável na peça 13. **Nomear o diagnóstico é o que o transforma em
ativo do cliente** (ele leva esse nome para o Instagram, para a call, para a
mentoria).

### 10. Ganhos (`.gains`) — "O que você leva embora"

Quatro itens, cada um com ícone SVG animado. Cada item tem a **entrega em
negrito seguida da explicação**:

> **A resposta para "quanto custa".** A estrutura que faz a paciente continuar a
> conversa em vez de agradecer e desaparecer.

**Regra:** os 4 ganhos são **coisas que o lead sai tendo**, nunca coisas que ele
sai sabendo. Compare:

| ❌ Saber | ✅ Ter |
|---|---|
| "Você vai entender como precificar" | "A sua conta: quantas pacientes entraram e quantas viraram atendimento nos últimos 30 dias" |
| "Você vai aprender a responder melhor" | "A resposta para 'quanto custa'" |
| "Você vai identificar seus gargalos" | "O ponto exato onde a paciente desiste, das 5 etapas" |

O quarto item aponta para o **dinheiro parado** ("o que mandar hoje para a
paciente que já sumiu, que é onde está a maior parte do dinheiro parado"). Deixe
sempre o item de recuperação de valor perdido por último: é o mais fácil de
executar no dia seguinte e o que gera depoimento rápido.

### 11. Grade (`.grade` `#grade`) 🔒

Fundo escuro. É o destino do link fantasma do hero. Quatro `article.slot` +
um quinto de transparência.

| Slot | Título | Papel |
|---|---|---|
| Bloco 01 | A sua conta | Ele faz, ao vivo, com os números dele |
| Bloco 02 | As 5 etapas entre a mensagem e a cadeira | Devolve a peça 9 |
| **Bloco 03** `.star` | **Ao vivo, sem preparação: três conversas de verdade reescritas na tela** | **O coração** |
| Bloco 04 | O que fazer amanhã de manhã | Plano executável por quem trabalha sozinho |
| **No fim** | **As vagas do acompanhamento** | 🔒 **A declaração do pitch** |

**O bloco-estrela.** Um dos quatro blocos recebe `.star` (fundo em gradiente
dourado, borda destacada, tag "Ao vivo, sem preparação") e uma frase de
enquadramento abaixo da grade:

> "O bloco 03 é o coração da noite. Ver a Mariana reescrever uma conversa real,
> com o print na tela, não é aula. É a mentoria acontecendo."

Escolha como estrela o bloco que é **irreproduzível e arriscado**: algo que o
cliente faz na hora, sem preparo, com material do público. É o que separa "aula
gravável" de "não dá para perder". Se nenhum dos 4 blocos tem esse risco,
**invente um com o cliente antes de escrever a página.** Uma LP sem bloco-estrela
converte, uma com converte muito mais.

**A declaração do pitch** 🔒 é um slot igual aos outros, com a tag "Está escrito
aqui":

> "No fim da aula eu abro as vagas do meu programa para quem quiser continuar
> comigo. Você já sabe a hora, e sair antes é permitido."

Três elementos, todos obrigatórios: **vai ter pitch** · **você já sabe a hora** ·
**sair é permitido**. Ela reaparece na carta (peça 18). É a peça que compra
confiança para o resto da página.

Abaixo da grade, `.gradeShot`: uma foto real do cliente conduzindo (aula, sala,
tela compartilhada) com legenda. Prova de que o formato existe.

### 13. Entregáveis (`.kit`) — "Entregue ao vivo, no encerramento"

> "Você não sai com anotação. Sai com material."

Dois cards, cada um com um **rótulo de formato** acima do nome:

- **Planilha** → *O Vazamento* — "A mesma conta que a Mariana faz com as
  mentoradas dela."
- **Uma folha** → *O Mapa das 5 Etapas* — "Para colar do lado do computador."

Fecha com `.close`: **"Não vai por e-mail depois. É entregue na sala, para quem
estiver lá."**

**Três regras:**
1. **Dois entregáveis, não cinco.** Bônus empilhado é linguagem de infoproduto
   de R$ 1.997 e destrói o tom honesto desta página.
2. **Cada um tem nome próprio e formato declarado** ("Planilha", "Uma folha").
   Nome próprio transforma arquivo em ativo.
3. **A entrega é presencial na sala.** É a terceira camada de escassez: mesmo
   quem pagou perde se não comparecer. Se o cliente pretende enviar por e-mail
   depois, **remova esta frase** em vez de mentir.

### 14. Autoridade (`.bio`) 🔒 — "Quem conduz"

Foto + texto. A abertura **nega a categoria óbvia**:

> "Ela não ensina teoria de atendimento. Ela entra na operação de clínica de
> verdade, todo mês, e olha o WhatsApp por dentro.
> **É exatamente isso que ela vai fazer na terça.**"

Depois, `.creds`: 3 credenciais numéricas.

```
17 anos     empreendendo
7 anos      sendo dona de clínica
+4 mil      pacientes atendidas, na própria clínica e nas mentoradas
```

**A regra de fonte vale igual à do funil de quiz:** só vira credencial o que
está **escrito como texto afirmativo** no material do cliente (bio, deck, site,
one-pager). Elemento que aparece **dentro de uma arte** (capa de livro na mesa,
tela de celular, troféu no fundo, selo) é **cenário, não fonte**. Na dúvida,
pergunte antes de publicar.

O segundo parágrafo tem que **amarrar a credencial ao evento** ("é exatamente
isso que ela vai fazer na terça"). Credencial solta é vaidade; credencial
amarrada ao formato do evento é prova de que a aula vai entregar.

### 15. Depoimentos (`.deps`) 🔒 — "Prova real"

> "Não acredite só na Mariana. Acredite nelas."

Três cards em vídeo. Cada um:

- Thumb 9/13 + botão play pulsante (o vídeo só carrega no clique, ver `componentes.md`)
- Tag "Depoimento real"
- **Nome · nicho · cidade/UF** (ex.: "Dra. Dirléia Casagrande · Harmonização
  facial · Joinville, SC")
- **O número, grande**: `R$ 20 mil → R$ 53 mil /mês`
- **A observação, pequena**: "em 4 meses, e já abriu a segunda unidade"

**Os três depoimentos não podem provar a mesma coisa.** Escolha eixos diferentes:

| Card | Eixo | Exemplo |
|---|---|---|
| 1 | **Dinheiro** | R$ 20 mil → R$ 53 mil/mês |
| 2 | **Tempo/vida** | "saía às 23h todo dia. Hoje sai às 18h, no comando" |
| 3 | **Identidade** | "O negócio não é só você" — estruturou consultório que roda sem ela |

Três depoimentos de faturamento provam uma coisa só e o lead que não é movido
por dinheiro sai sem prova. Cobrir dinheiro + tempo + identidade cobre os três
motivos de compra do público.

### 16. Mural (`.mural`) — "O grupo da mentoria por dentro"

> "Isso não é depoimento pedido. É o grupo no dia. Print do que as mentoradas
> mandam quando a meta cai. **Nenhum foi pedido, e nenhum foi retocado.**"

Carrossel horizontal (scroll-snap nativo, sem biblioteca) com 9 prints de
mensagens do grupo, cada um com legenda de uma linha: `Nome` + `o que aconteceu`.

**Por que vem depois dos depoimentos e não antes:** depoimento gravado é prova
**pedida** (o lead sabe que foi selecionado). O print cru é prova **não pedida**.
A ordem pedida → não pedida faz a segunda validar a primeira. Invertida, a
primeira parece encenação da segunda.

**Regras:** LGPD (autorização das pessoas dos prints), nada de valor de terceiro
sem consentimento, e a frase "nenhum foi retocado" só entra se for verdade.
Termina com `.muralhint`: "arraste para o lado →".

### 17. Oferta (`.offer` `#ingresso`) 🔒 — "Garanta sua vaga"

Card único, isolado, com tudo o que a página já disse, junto:

```
Terça, 08 de setembro, às 19h30
A Paciente que Some Depois do Preço
Online e ao vivo, com Mariana Garrett
------------------------------------------
✓ Aula ao vivo com a Mariana, em quatro blocos
✓ Três conversas de verdade reescritas na tela
✓ A Planilha do Vazamento
✓ O Mapa das 5 Etapas
------------------------------------------
[barra] 80% dos ingressos do lote zero já foram
Lote zero · de R$ 67 · R$ 27
"É menos do que o desconto que você deu essa semana para não perder uma paciente."
[ QUERO MINHA VAGA ]
Aula única, ao vivo, sem gravação. O link chega no seu e-mail e no seu WhatsApp.
```

**A frase de ancoragem (`.avista`) é a peça de copy mais importante do card.**
Ela não compara o preço com outro curso, compara com **um custo que o lead já
teve essa semana, por causa do problema da página**. Fórmula:

> "É menos do que **[perda recorrente que o lead teve nos últimos 7 dias por
> não saber isso]**."

Exemplos por nicho: *"menos do que o desconto que você deu essa semana"* ·
*"menos do que uma hora da sua diária"* · *"menos do que você gastou em anúncio
para trazer a conversa que morreu ontem"*.

Repita a barra de escassez **com o mesmo número do hero**. Divergência entre
"80%" no topo e "70%" aqui derruba a credibilidade da página inteira.

### 18. Carta (`.letter`) 🔒 — "Por que tão barato?"

Bloco de texto corrido, assinado. **Fecha a objeção 5 da peça 4.**

> "Porque R$ 27 não é o meu negócio.
> Eu vivo de acompanhar clínicas de perto. E quase nenhuma dona fechou comigo
> depois de ver um anúncio. **Fecharam depois de me ver trabalhando.**
> Então eu faço o caminho ao contrário. Cobro um valor que não pesa no seu mês,
> entrego ao vivo o que eu faço de verdade, e no fim da noite eu abro as vagas do
> meu programa para quem quiser continuar comigo.
> Está escrito aqui, você já sabe a hora.
> E se não for para você, tudo bem. Você sai com a sua conta feita e com a
> resposta pronta para a próxima paciente que perguntar o preço. **Já está pago.**"
>
> — assinatura: *Mariana Garrett*

**Os 5 movimentos, na ordem, todos obrigatórios:**

1. **Negação** — "R$ 27 não é o meu negócio." (diz o que o preço não é)
2. **Modelo real** — "eu vivo de X." (diz de onde vem o dinheiro)
3. **A razão comercial honesta** — "quase ninguém fecha por anúncio, fecham
   depois de me ver trabalhando." (por que vale a pena para o cliente vender
   barato: é aquisição, não caridade)
4. **O pitch, de novo** — "no fim eu abro as vagas. Você já sabe a hora."
5. **A saída sem culpa** — "se não for para você, tudo bem. Já está pago."

O movimento 3 é o que muita gente pula, e é o que faz a carta funcionar. Sem
ele, o preço baixo continua sem explicação econômica e o lead volta a
desconfiar. O movimento 5 é o que permite ao lead comprar sem se comprometer
com o high ticket.

**Assine com o nome do cliente**, em manuscrito ou serifada. A carta é a única
peça da página em primeira pessoa do cliente, e é isso que a torna carta.

### 19. FAQ (`.faq`) — "Três dúvidas que sempre aparecem"

Três `<details>` nativos, nem um a mais. As três são fixas por categoria:

1. **A escassez** — "Vai ter gravação?" → *"Não. É ao vivo, uma vez só. Quem não
   estiver na sala perde."*
2. **A qualificação por baixo** — "Eu ainda não tenho clínica, atendo em uma
   sala. Serve para mim?" → *"Serve."* + por quê
3. **O pré-requisito** — "Preciso ter recepcionista?" → *"Não."* + por quê

Toda pergunta começa com **Sim/Não/Serve** e só depois explica. FAQ que começa
explicando parece defesa.

> ⚠️ **Não coloque a objeção de preço no FAQ.** Ela já foi tratada duas vezes
> (peças 4 e 18) e num lugar melhor. Repetir aqui reabre a discussão de valor no
> momento em que o lead está indo para o botão.

### 20. Fechamento (`.final`)

Fundo escuro, curto, **sem argumento novo**. Data + formato + botão + 3 chips
(`Lote zero · R$ 27` / ~~`de R$ 67`~~ / `Sem gravação`). Se você sentir vontade
de acrescentar um argumento aqui, o argumento estava faltando lá em cima.

### 21. Barra fixa (`.sticky`) 🔒

Fixa no rodapé, sempre visível: preço + data + botão.

```css
.sticky{position:fixed;left:0;right:0;bottom:0;z-index:60;
  background:rgb(46 19 41 / .94);backdrop-filter:blur(10px);
  border-top:1px solid rgb(201 169 114 / .35);padding:12px 20px;
  display:flex;align-items:center;justify-content:center;gap:20px}
@media (max-width:640px){ .sticky .sp{display:none} .sticky .btn{width:100%} }
```

**No mobile o texto some e o botão ocupa 100%.** É a decisão certa: em tela
pequena a barra compete com o conteúdo, e o que importa é o alvo de toque.
Lembre de dar `padding-bottom` ao `footer` para a barra não cobrir os links
legais.

---

## Parte 3: os 4 sistemas que atravessam a página

Estes não são seções, são padrões que se repetem. Errar um deles derruba a
conversão mesmo com todas as 21 peças no lugar.

### Sistema 1: escassez em três camadas 🔒

Nenhuma sozinha convence. As três juntas fecham as saídas.

| Camada | Mecanismo | Onde aparece |
|---|---|---|
| **Tempo** | contador regressivo | contador, kicker, tickers, oferta, final |
| **Estoque** | "80% do lote zero já foram" + barra | hero, oferta |
| **Irreversibilidade** | "sem gravação, uma vez só" | fatos do hero, tickers, FAQ, chips do final, sticky |

A terceira é a mais forte e a mais barata: não exige lote falso nem contador
falso, só a decisão do cliente de não gravar. **Confirme com o cliente antes de
escrever.** Se ele for gravar e disponibilizar, remova a camada inteira, incluindo
o FAQ 1 e o chip do final. Prometer que não grava e depois liberar a gravação
queima a lista.

### Sistema 2: CTA distribuído

**4 botões + 1 âncora + 1 sticky**, todos com o mesmo destino de checkout:

| Onde | Texto | Momento psicológico |
|---|---|---|
| Hero | "Quero minha vaga por R$ 27" | quem já estava decidido antes de entrar |
| (âncora) | "Ver o que acontece na aula" → `#grade` | quem precisa ver o conteúdo primeiro |
| Oferta | "Quero minha vaga" | quem leu a página inteira |
| Final | "Quero minha vaga por R$ 27" | quem rolou até o fim sem decidir |
| Sticky | "Quero minha vaga" | quem decide no meio do scroll |

O preço entra no texto do botão nos pontos de entrada e saída (hero e final) e
sai nos pontos onde o card já mostra o preço logo acima. **Nunca coloque um CTA
no meio do bloco de diagnóstico (peças 4 a 9).** Ali o lead está sendo
convencido de que o problema dele é outro; interromper com um botão mata o
raciocínio.

**Preserve os UTMs.** A página propaga a query string para os links de destino:

```js
var qs = window.location.search;
if (qs && qs.length > 1) {
  document.querySelectorAll('a[href*="__DOMINIO_CHECKOUT__"]').forEach(function(a){
    var href = a.getAttribute('href');
    a.setAttribute('href', href + (href.indexOf('?') === -1 ? '?' : '&') + qs.substring(1));
  });
}
```

Sem isso o tráfego pago chega no checkout sem atribuição e o cliente não sabe
qual criativo vendeu.

### Sistema 3: prova em três formatos, nesta ordem

```
AUTORIDADE (peça 14)  → por que confiar em quem entrega   [credenciais numéricas]
       ↓
PROVA PEDIDA (15)     → funciona para os clientes dele    [vídeos selecionados]
       ↓
PROVA NÃO PEDIDA (16) → e não é encenação                 [prints crus do grupo]
```

Os três são complementares, não substitutos. **Se o cliente ainda não tem
depoimento em vídeo**, a peça 14 sustenta a prova sozinha e você sobe a página
assim mesmo (mesma decisão do funil de quiz). Se tem prints do grupo mas não
vídeos, o mural sobe para o lugar da peça 15. **Nunca** encene depoimento nem
use foto de banco de imagens com nome inventado.

### Sistema 4: o ritmo de fundos

A página alterna fundo claro e escuro para marcar a mudança de assunto. O olho
usa isso para saber que "começou outra coisa" sem precisar ler o título.

```
hero        ESCURO (ameixa→deep)   promessa
ticker      BRONZE                 condições
clock       BLUSH                  urgência
pain        CREME                  ┐
truth       CREME                  │ diagnóstico
vs          CREME                  │ (bloco longo, claro,
band        ESCURO                 │  com uma quebra escura no dado)
vs 2        CREME                  ┘
gains       CREME
grade       ESCURO                 a aula
ticker 2    DEEP                   condições
kit         CREME                  entregáveis
bio         CREME                  autoridade
deps        BLUSH                  prova
mural       CREME                  prova
offer       ESCURO                 oferta
letter      CREME                  carta
faq         CREME                  dúvidas
final       ESCURO                 fechamento
```

**Regra prática:** fundo escuro só nas 5 peças de peso (hero, dado, grade,
oferta, final). Escurecer demais achata a hierarquia e a página parece um deck.

---

## Parte 4: identidade visual e tokens

Toda a paleta vive em `:root`. Reskin de cliente = trocar 12 variáveis.

```css
:root{
  /* primária escura: hero, grade, oferta, final */
  --ameixa:#462444;  --ameixa-2:#5a3358;  --deep:#2e1329;
  /* metálica: botões, rótulos, bordas, gradiente de texto */
  --bronze:#8E6945;  --bronze-lt:#C9A972; --bronze-pale:#E8D9BF;
  /* fundos claros */
  --creme:#FAF6EE;   --blush:#F2EADB;
  /* texto */
  --ink:#2c2129;     --ink-soft:#6d616a;  --line:rgba(142,105,69,.26);
  /* alerta: escassez, números vermelhos, ponto piscante */
  --alerta:#FF6A4D;  --alerta-soft:rgba(255,106,77,.16);
  /* gradientes derivados */
  --grad:linear-gradient(100deg,#C9A972 0%,#8E6945 55%,#C9A972 100%);
  --grad-txt:linear-gradient(100deg,#E8D9BF,#C9A972 60%,#E8D9BF);
  /* tipografia */
  --serif:'Playfair Display',Georgia,serif;
  --sans:'Inter',system-ui,-apple-system,'Segoe UI',Arial,sans-serif;
}
```

**O sistema de 4 papéis** (o que preservar ao trocar as cores):

| Papel | Função | Regra |
|---|---|---|
| **Escura profunda** | fundo das 5 peças de peso | contraste ≥ 7:1 com o creme |
| **Metálica** | botões, rótulos `.lead`, bordas, itálico do H1 | 3 tons: base, claro, pálido |
| **Clara quente** | fundo do corpo | **nunca branco puro.** O off-white é o que dá o ar editorial |
| **Alerta** | só escassez e números negativos | **um único uso.** Se virar cor de destaque genérico, a escassez para de gritar |

**Tipografia:** serifada display só em `h1 h2 h3` e nos números grandes
(`.float b`, `.linha .lp`, `.slot .h`); sans em todo o resto. Rótulos `.lead`
sempre em `.78rem / letter-spacing .3em / uppercase / cor metálica` — é a
assinatura visual que amarra a página.

**Escala fluida:** `h1: clamp(2.6rem, 6.4vw, 4.4rem)` · `h2: clamp(1.9rem,
4.6vw, 3rem)`. Só dois breakpoints na página inteira (900px e 640px). Não
acrescente mais.

---

## Parte 5: tom e escrita

Valem as regras da casa, com os acréscimos deste arquétipo.

- 🔒 **Nunca use travessão.** A LP de referência tem **zero** travessões em 35 KB
  de HTML. Use vírgula, dois-pontos, ponto final. Como separador em linha de
  condições, use `·`. Para evolução de números, use `→` (`R$ 20 mil → R$ 53 mil`).
- **Emoji: só como ícone funcional de linha, e só nos 3 fatos do hero**
  (🗓️ 💻 ⚠️). Em nenhum outro lugar da página. Para público masculino, jurídico,
  médico ou corporativo, remova também esses três.
- **Segunda pessoa do singular, sempre.** "Você deu desconto", nunca "as
  profissionais dão desconto". A página fala com uma pessoa.
- **Números concretos no lugar de adjetivos.** "9 dias sem resposta" e não
  "muito tempo". "445 respostas" e não "centenas". "1h34 de diferença" e não
  "demorou".
- **Frases curtas nos momentos de virada.** Os `.pull` e as sentenças de reframe
  têm 4 a 8 palavras. ("Um número sozinho não vende nada." / "Você não está com
  preguiça, está sem roteiro.")
- **Nada de superlativo comercial.** Não existe "revolucionário", "exclusivo",
  "imperdível", "método infalível" em lugar nenhum da página. O tom é de
  conversa entre pares, e é isso que sustenta o preço baixo sem parecer isca.
- 🔒 **Reescreva 100% da copy** ao adaptar o modelo. Resíduo do arquétipo
  ("paciente", "clínica", "cadeira", "avaliação") num cliente de outro nicho é o
  erro mais comum e o mais visível.

---

## Parte 6: as 7 armadilhas ao adaptar

Erros que já custaram retrabalho ou credibilidade. Leia antes de entregar.

1. **Pular o bloco de diagnóstico (peças 4 a 9) por pressa.** É metade da
   página e dá trabalho porque exige dado e cena reais. Sem ele a LP vira
   página de evento comum, e o preço baixo passa a parecer o único argumento.

2. **Dado inventado ou arredondado.** "Mais de 500 clientes" quando são 340.
   O bloco 8 é a espinha da credibilidade: um número frouxo ali contamina os
   depoimentos e as credenciais. Sem dado real, faça o bloco qualitativo.

3. **Credencial tirada de objeto de cena.** Livro na foto, troféu no fundo,
   selo numa arte. **Só vira claim o que está escrito como texto no material do
   cliente.** (Caso real da casa: um "autor de..." publicado a partir de uma capa
   de livro que aparecia numa foto de deck. O livro não existia.)

4. **Escassez que o cliente não vai honrar.** Prometer "sem gravação" e depois
   mandar o replay; dizer "80% do lote" com lote infinito. Confirme cada camada
   com o cliente **por escrito** antes de publicar.

5. **Card 02 das personas escrito como estado desejado.** Ver peça 7. Vira
   "antes e depois" e o lead avançado sai da página.

6. **CTA no meio do diagnóstico.** Interrompe a virada de entendimento na hora
   exata em que ela está acontecendo.

7. **Publicar com resíduo do modelo.** Antes de subir, rode a busca por:
   `paciente`, `clínica`, `cadeira`, `Mariana`, `pay.hotmart.com/F1072`,
   `marianagarrett.com.br`, `2026-09-08`. Zero ocorrências, sempre.

---

## Checklist da estrutura invisível

Antes de entregar a página, confira item por item.

**Estrutura**
- [ ] As 21 peças na ordem, ou uma justificativa escrita para cada ausência
- [ ] Todas as peças 🔒 presentes
- [ ] Bloco de diagnóstico (4 a 9) completo, com espelho e dado
- [ ] Peça 9 com os números **em aberto** (`?`) e a legenda de "ilustração"
- [ ] Grade com bloco-estrela `.star` marcado
- [ ] Declaração do pitch na grade **e** na carta

**Copy**
- [ ] H1 nomeia um personagem de dor, não um benefício
- [ ] 5 objeções cobrindo as 5 categorias, com a de "barato demais"
- [ ] Reframe com os 5 movimentos, terminando em absolvição
- [ ] Carta com os 5 movimentos, assinada com o nome do cliente
- [ ] Ancoragem de preço comparada a uma perda da semana do lead
- [ ] FAQ com 3 perguntas, nenhuma sobre preço, todas começando com Sim/Não
- [ ] Zero travessões · emoji só nos 3 fatos do hero · zero superlativo
- [ ] Busca por resíduo do modelo: 0 ocorrências

**Prova**
- [ ] Depoimentos em 3 eixos diferentes (dinheiro, tempo, identidade)
- [ ] Credenciais só com claim escrito no material do cliente
- [ ] Autorização (LGPD) dos prints do mural
- [ ] Nada encenado, nada de banco de imagens com nome inventado

**Técnico** (detalhes em `componentes.md`)
- [ ] Contador com fuso explícito, `Math.max(0, …)` e `tabular-nums`
- [ ] Escassez com o **mesmo número** no hero e na oferta
- [ ] 4 CTAs + âncora + sticky, todos para o mesmo checkout
- [ ] Propagação de UTM ativa e testada com `?utm_source=teste`
- [ ] Vídeos de depoimento com carregamento sob clique
- [ ] `prefers-reduced-motion` desliga todas as animações
- [ ] `.js` no `<html>` antes do CSS (senão o conteúdo pisca)
- [ ] `padding-bottom` no rodapé para a sticky não cobrir os links legais
- [ ] Testado em 360px de largura
