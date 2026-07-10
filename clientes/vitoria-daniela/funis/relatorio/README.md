# Relatório (Diagnóstico Estratégico) — Vitória Daniela

Item 3 da ordem de execução. A cliente decidiu manter **um único relatório
genérico** (não por balde) — então este é o escopo final do item 3, não uma
etapa intermediária.

## Por que isso existe fora do Figma

O relatório original vive em Figma Make
(`https://www.figma.com/make/fiASU8LAlKiSqhhEqt4iI2/Relatorio-Vitoria--Copy-`),
mas o Daniel só tem acesso de **visualização** nesse arquivo (não é dono, e o
dono não pode dar acesso de edição no momento). Sem edição, também não dá
pra ler o código-fonte por API (o mesmo `get_design_context` que funcionou
pro quiz e pra LP devolveu "sem acesso de edição" aqui).

Por pedido do Daniel, recriei o relatório **fora do Figma**, em HTML puro,
pra dar autonomia total de edição sem depender de acesso a esse arquivo.

## Como foi recriado

O conteúdo (texto) veio 1:1 do PDF que já é enviado hoje pros leads
("Diagnóstico Estratégico Personalizado - Vitória Daniela.pdf", na pasta do
cliente no Drive) — 10 blocos ("slides"): capa, carta de abertura, os 3
motivos, por que já tentou de tudo, prova social, os 4 passos da sessão,
sobre a Vitória, pra quem é/não é, recapitulando, e a chamada final com as 2
opções.

O visual (fundo preto/dourado `#Cfb36e`, cards com borda `#222`) segue a
**mesma identidade** já usada no quiz e na LP — não tive acesso ao visual
exato do arquivo original do Figma, então recriei com o sistema visual que a
Vitória já aprovou nos outros dois funis, pra manter tudo consistente. Desde
a rodada 4, o documento não usa fotos (removidas a pedido dela) nem depende
de fonte externa (ver rodada 4 abaixo).

## Arquivos

- `template.html` — arquivo "fonte" pra editar (texto + layout). Usa
  placeholders `{{FONTS}}` (fonte Montserrat embutida), `{{PHOTO}}`, `{{T1}}`,
  `{{T2}}`, `{{T3}}` (foto da Vitória e os 3 prints de depoimento). É aqui que
  se edita.
- `assets/fonts/` — fonte **Montserrat** (Google Fonts, OFL) usada no
  documento: `montserrat-latin.woff2` e `montserrat-latin-ext.woff2` (fonte
  variável, cobre pesos 100–900) e `montserrat-embed.css` (os `@font-face`
  com a fonte em base64, prontos pra injetar no `{{FONTS}}`). Ver rodada 9.
- `Diagnostico-Estrategico-Vitoria-Daniela.html` — HTML final autocontido,
  gerado do template com as imagens embutidas em base64 (abre offline em
  qualquer navegador). Regenerar depois de editar o template (ver "Como regerar").
- `Diagnostico-Estrategico-Vitoria-Daniela.pdf` — PDF gerado do HTML final,
  pronto pra enviar.
- `assets/` — imagens-fonte embutidas no HTML: `vitoria-daniela.jpg` (foto),
  `depoimento-marco.jpg` e `depoimento-sessao.jpg` (prints reais),
  `depoimento-15mil-recriado.jpg` (print recriado, ver rodada 5, ponto 7).

## Como regerar (HTML final + PDF)

O HTML final embute fonte e imagens como data-URI (pra ficar autocontido). Fluxo:
1. Editar `template.html`.
2. Substituir os placeholders no template e salvar como
   `Diagnostico-Estrategico-Vitoria-Daniela.html`:
   - `{{FONTS}}` → conteúdo de `assets/fonts/montserrat-embed.css` (os
     `@font-face` da Montserrat em base64);
   - `{{PHOTO}}` → data-URI de `assets/vitoria-daniela.jpg`;
   - `{{T1}}`/`{{T2}}`/`{{T3}}` → data-URIs dos 3 prints ("15 mil", "março",
     "sessão").
3. Gerar o PDF do HTML com Chromium headless
   (`--headless --print-to-pdf --no-pdf-header-footer`). O `@page { margin:0 }`
   + as faixas `thead`/`tfoot` já cuidam das margens pretas.

**Nada de rede na geração do PDF**: a Montserrat vai embutida em base64, então
o Chromium não precisa buscar fonte externa (era o que quebrava na rodada 4).
Se algum dia precisar atualizar a fonte, baixe os `.woff2` (latin + latin-ext)
da API do Google Fonts e regenere o `montserrat-embed.css` (ver rodada 9).

## Rodada 2 — realinhamento com o quiz v2 e a LP nova (2026-07-08)

Depois da primeira versão (recriação 1:1 do relatório antigo), a Vitória
pediu para revisar a comunicação e alinhar com o gancho novo do quiz e da
LP ("autoridade que você já tem no offline → presença online → clientes de
alto valor"). Mudanças aplicadas:

1. **Capa e carta de abertura** reescritas em cima do gancho novo (autoridade
   offline → digital), em vez do gancho antigo ("quanto lucro... com
   previsibilidade").
2. **"Os 3 motivos" virou "Os 4 motivos"**, um pra cada balde real do quiz v2
   (Sem Previsibilidade, Marketing Sem Sistema, Refém da Operação, e o que
   faltava: **Sem Posicionamento**). Assim, seja qual for a resposta da
   pessoa na pergunta-chave do quiz, ela reconhece o próprio gargalo aqui.
3. **Nova seção — Método Magna**, com as 3 fases (presença digital,
   captação, organização nas vendas) que hoje são o mecanismo central da LP,
   mas não apareciam em lugar nenhum do relatório.
4. **"Por que já tentou de tudo"** ajustado pra reforçar autoridade/presença
   online em vez de só "diagnóstico do negócio" genérico.
5. **"Pra quem é"** ganhou um critério a mais: já ter alguma estrutura
   rodando (equipe, ainda que pequena) — reflete o filtro que também existe
   no quiz v2.
6. **Todos os botões foram removidos.** A Vitória esclareceu que o relatório
   é a entrega de valor dentro da conversa de WhatsApp, não uma página com
   CTA — o convite pra sessão acontece na conversa, não no documento. Os
   trechos que levavam ao botão foram reescritos como fechamento (sem pedir
   clique em nada).
7. **Sem travessão em lugar nenhum** (troquei por "·" nos títulos com
   numeração) e revisado pra fugir de linguagem de guru/IA, batendo direto
   na dor — seguindo o feedback de tom já registrado em `contexto/README.md`
   e o histórico de feedback de copy da própria Vitória (`[Vitória] COPY
   2026`, Drive).

## Rodada 3 — paginação do PDF (2026-07-08)

Depois de ver o PDF, a Vitória apontou 3 problemas de quebra de página:
- Página com só a frase de fechamento dos "4 motivos" ("E o pior...") sobrando
  sozinha, quase toda vazia.
- Página do bloco "Resultados" (prova social) também quase vazia, por ser
  uma seção curta com página própria.
- "Passo 4" (dentro de "O que você vai ganhar na sessão") caindo sozinho no
  topo da página seguinte, separado dos Passos 1 a 3.

Causa: o CSS de página (`@media print`) tinha respiro generoso demais
(padding de seção, padding de card, margens) para o tanto de conteúdo de
cada bloco, e cada seção forçava sua própria quebra de página
(`.pagebreak`), inclusive a seção "Resultados", que é curta demais para
merecer uma página só dela.

Corrigido:
- Adicionado um bloco de regras **só para impressão/PDF** (compacta o
  espaçamento sem alterar a versão em tela no navegador): padding de seção,
  padding e margem dos cards, e espaçamento de parágrafos/listas reduzidos.
- Removido o `.pagebreak` da seção "Resultados" — ela não força mais página
  própria, flui depois do bloco anterior.

Resultado: o PDF caiu de 13 para 10 páginas, com os 4 motivos + fechamento
numa página só, os 4 passos numa página só, e sem página órfã quase vazia.

## Rodada 4 — copy final revisada + redesign de legibilidade (2026-07-08)

A Vitória enviou a copy final revisada por ela (Word) em cima do PDF da
rodada 3, com feedback escrito adicional: *"o layout como um todo precisa ser
pensado melhor. Mto pequeno, mto texto na pagina. a pessoa abre e tem q dar
zoom p conseguir ler. Isso tudo faz o resultado cair pq a retenção é baixa
pela 'dificuldade' e falta de experiência de design pro usuário ler o
diagnóstico."* Pediu também: remover a foto dela do documento, e deixar o
design "bem idêntico ao primeiro modelo do Figma" (arquivo original,
`fiASU8LAlKiSqhhEqt4iI2`).

Sobre a referência do Figma: tentei de novo (inclusive com o link reenviado
pela Vitória) e continua "sem acesso de edição" — a mesma limitação da
rodada 1. `get_screenshot` também não serve aqui, o Figma MCP não suporta
URLs `/make/`. Perguntei ao Daniel como prosseguir; ele optou por eu seguir
sem a referência visual exata, aplicando o padrão pedido no feedback escrito
(fonte grande, 1 ideia por vez, sem vão entre páginas) em vez de adivinhar o
layout do arquivo que não dá pra abrir.

Mudanças aplicadas:

1. **Copy inteiramente substituída** pelo texto do Word, 1:1, na ordem em que
   aparece lá (isso reordenou "não é pra você" antes de "é pra você", e
   trocou a redação de vários trechos — ex.: "Os 4 motivos" virou 3 blocos
   narrativos mais longos: "Os gargalos ocultos", "A lógica da metodologia
   Magna", "A prioridade do seu momento"). Os rótulos "Dobra N" do documento
   não entraram no relatório (eram só marcação de referência da própria
   Vitória); usei o subtítulo real de cada bloco como título visível.
2. **Foto da capa removida.** A seção "Sobre Vitória Daniela" também ficou
   sem foto (não havia instrução de manter só numa das duas, então apliquei
   nas duas).
3. **"(mantém como tá)"** — o trecho em vermelho no documento, na seção "O
   que fazer agora" — foi interpretado como instrução para manter o
   comparativo Opção 1 / Opção 2 exatamente como já estava no relatório
   (rodada 3), em vez do texto reduzido do Word.
4. **Nova frase de fechamento com CTA de texto**: "Me envie uma mensagem:
   'Estou pronta pra fazer a análise estratégica'". Isso substitui o
   fechamento sem CTA da rodada 2 — a Vitória adicionou esse convite direto
   no próprio documento desta vez (mudança de direção em relação à regra
   anterior de "convite só na conversa, nunca no documento").
5. **Decisão que precisa confirmação**: a seção "Resultados" tinha, no lugar
   do texto, a instrução `(colocar prints feedbacks)` — não veio marcada em
   vermelho, mas exibir esse parênteses literalmente no documento do cliente
   não fazia sentido. Troquei por uma caixa tracejada "Prints e depoimentos
   de clientes entram aqui", sinalizando que é um espaço pendente de
   conteúdo real (prints/depoimentos), em vez de inventar texto ou publicar
   a instrução como se fosse copy. **Confirmar com a Vitória se é isso que
   ela quis dizer.**
6. **Fonte trocada de Montserrat para uma pilha de fontes de sistema**
   (`Helvetica Neue`/Arial/Liberation Sans). O `@import` do Google Fonts
   dependia de rede em tempo de geração do PDF, e o Chromium headless deste
   ambiente não conseguiu buscar `fonts.gstatic.com` (falha de handshake
   TLS) — o HTML deixaria de ser realmente autocontido/offline, que é um
   requisito explícito desde a rodada 1. Fonte de sistema resolve isso sem
   depender de internet.
7. **Paginação redesenhada**: em vez de forçar quebra de página no início de
   cada seção (`.pagebreak`), o conteúdo agora flui livremente e o navegador
   decide onde cada página termina; só cards, boxes e a assinatura têm
   `break-inside: avoid` (pra não partir no meio), e títulos têm
   `break-after: avoid` (pra não ficarem sozinhos no fim de uma página). Isso
   eliminou as páginas quase vazias que voltariam a aparecer com o texto
   maior. Tipografia aumentada de ~16px/1.6 de altura de linha para
   ~18px/1.75 (tela) e ~17px no PDF — o objetivo era não precisar de zoom
   pra ler no celular.
8. Fotos não usadas (`assets/vitoria-hero.png`, `assets/vitoria-about.png`)
   removidas do repositório.

Resultado: PDF com 10 páginas (igual à rodada 3), sem foto, fonte
sensivelmente maior, sem página quase vazia.

## Rodada 5 — copy final revisada + redesign "1 dobra por página" (2026-07-08)

A Vitória revisou a copy da rodada 4 e mandou uma lista de feedbacks de
layout, mais a foto dela e 3 depoimentos (via pastas do Drive). Aplicado:

1. **Copy revisada dela aplicada** (a versão do Word que ela editou).
2. **Modelo de paginação trocado para "1 dobra = 1 página"** (pedido explícito
   dela: "cada dobra diz respeito a uma página, deixe-as totalmente alinhadas
   com a página de modo que preencha todo o espaço"). Cada seção agora é uma
   `.page` que ocupa a folha A4 inteira, com o conteúdo **centralizado
   verticalmente** e padding próprio (margens). Isso resolve de uma vez os
   problemas que ela apontou: caixa colada no topo (rodada anterior, pág. 5),
   tópicos órfãos quebrando entre páginas (págs. 7→8 e 9→10) e páginas quase
   vazias. Substitui a abordagem de "deixar fluir" da rodada 4 — que, com a
   fonte maior, voltava a criar quebras feias.
3. **Cabeçalho fantasma removido**: o "Vitória Daniela | Grupo Magna /
   Estrategista..." que vazava pro topo da página dos gargalos era a
   assinatura da carta transbordando. Com 1 seção = 1 página, a assinatura
   fica na carta e não aparece mais em outro lugar.
4. **Dobra 1 (gargalos) com as 3 caixas na mesma página** (a 3ª, "Frustração
   com estratégias desintegradas", estava sobrando pra página seguinte).
5. **Capa com parágrafos separados** (ela achou "blocado"): espaçamento entre
   parágrafos aumentado, leitura mais arejada.
6. **Foto da Vitória** adicionada na seção "Quem vai conduzir a análise"
   (`assets/vitoria-daniela.jpg`, arquivo `DSC_2820 (2).jpg` do Drive dela).
7. **Seção "Resultados"** traz os 3 depoimentos que ela mandou, cada um como
   um "print" separado (card branco com sombra), do jeito que ela pediu
   ("quero os prints originais, trazem mais autoridade e veracidade").
   - `assets/depoimento-marco.jpg` — print real (Drive `Feedback farmacia.jpeg`).
   - `assets/depoimento-sessao.jpg` — print real (Drive `mmmmmm.png`).
   - `assets/depoimento-15mil-recriado.jpg` — **recriado**, não é o print
     original. O arquivo original (`Feedback .jpeg`, id `1MaAun...`) é pequeno
     (28 KB) e a ferramenta de Drive só o devolvia inline (não salvava em
     arquivo decodificável), então não consegui extrair os bytes íntegros
     nesta sessão. Recriei a bolha no mesmo estilo (iMessage cinza, igual ao
     print do "março") com o **texto exato** do original. **Se quiser o print
     literal, é só reenviar esse arquivo** (ou deixá-lo acessível de outro
     jeito) que eu troco. Obs.: criei uma cópia `feedback-15mil-copy.jpg`
     dentro da pasta de depoimentos do Drive durante a tentativa de extração —
     pode apagar.
8. **Legibilidade geral**: fonte base 17px, títulos maiores, cards com
   respiro — atacando direto a queixa de retenção/leitura.

Resultado: PDF com 11 páginas, uma dobra por página, sem página órfã, com
foto e depoimentos.

## Rodada 6 — layout "documento corrido ABNT" (2026-07-09)

A Vitória revisou a rodada 5 e **afrouxou a regra de "1 dobra por página"**:
o modelo de página cheia + conteúdo centralizado verticalmente deixava vãos
grandes em cima E embaixo nas páginas de seção curta. Feedbacks (numerados por
página do PDF da rodada 5): capa com headline grande demais e texto
apertado/pequeno; várias páginas (2, 5, 6, 7, 10, 11) com margem sobrando
demais; "Sobre" (pág. 8) com foto desproporcional ao texto; pedido de margens
consistentes padrão ABNT em cima e embaixo, podendo deixar **tudo corrido**.

Mudanças:

1. **Trocado o modelo de paginação**: de "cada seção = 1 página A4
   centralizada" para **documento corrido** — o conteúdo flui de cima pra
   baixo e o `@page { margin: 24mm 22mm }` dá margem consistente em toda
   página. Acabaram os vãos de centralização. As seções **fluem e quebram
   livremente** entre páginas; só os blocos indivisíveis (cards, opções,
   prints, foto+bio) têm `break-inside: avoid`.
2. **Capa**: headline reduzida (33→24px) e alargada (menos linhas), corpo
   maior (17px) com mais respiro entre parágrafos. Cabe em 1 página.
3. **"Sobre" proporcional**: foto reduzida pra 46mm ao lado do texto,
   alinhada ao topo — sem mais desproporção nem margem sobrando.
4. **Sem página órfã**: compactado o espaçamento entre seções (16→8mm) e o
   bloco final (opções/CTA) o suficiente pra puxar o CTA de volta e fechar em
   9 páginas cheias (a rodada 5 tinha a última página quase vazia).
5. **Prints**: trocado o container de `flex` pra fluxo normal (block
   centralizado) — flexbox paginava mal e deixava vão; block quebra certo.

Observação: a página do "Sobre + Resultados" pode terminar com um respiro
(~1/4 da folha) porque os 3 prints são imagens indivisíveis e não cabem todos
após o bloco "Sobre" numa página só — comportamento normal de figura em
documento corrido (a próxima quebra empurra os prints maiores pra página
seguinte). É o único respiro que sobra; todas as outras páginas preenchem até
a margem inferior.

Resultado: PDF com 9 páginas, margens consistentes (ABNT) em todas, sem página
órfã/quase vazia.

### Correção — margens PRETAS (não brancas)

Na primeira versão da rodada 6 as margens saíram **brancas**: o `@page { margin }`
reserva a margem, mas no Chrome headless essa área é **sempre pintada de branco
(papel)** — e nada cobre ela (testei: fundo do `html`, fundo do `body`,
`position:fixed` cobrindo a folha — nenhum pinta a área da margem do `@page`).
O documento é preto, então a margem tinha que ser preta.

Solução que funcionou (a robusta pra PDF de fundo escuro):
1. `@page { margin: 0 }` — única forma da borda não sair branca; o preto
   (`body`) preenche a folha de borda a borda.
2. **Margem preta de topo/rodapé em TODA página** via `<table>` com
   `thead`/`tfoot`: `thead` e `tfoot` **se repetem em toda página impressa**,
   então uma célula vazia de 15mm neles vira uma faixa preta de margem no topo
   e no rodapé de cada página (o `tbody` com o conteúdo flui no meio, sem
   encostar na borda). Laterais: padding de 16mm na célula do conteúdo.
3. Prints com **moldura escura** (não branca): mesmo que um print caia na
   borda, nunca aparece branco — a imagem clara fica dentro de um card escuro.

Conteúdo expandido (margens 15mm topo/rodapé, 16mm laterais). Padrão a repetir:
**`@page` não pinta margem no Chrome — pra margem colorida use `@page margin:0`
+ `thead`/`tfoot` de tabela como faixas de margem que se repetem por página.**

## Rodada 7 — leitura no celular + 1 assunto por página (2026-07-09)

A Vitória testou a rodada 6 no **celular** e trouxe 4 pontos: (1) um assunto não
pode terminar no meio de uma página e o próximo começar logo abaixo — atrapalha a
retenção; o espaço que sobrar deve ser preenchido com conteúdo do próprio assunto
(ex.: a assinatura na carta); (2) usar **negrito** em textos longos pra facilitar a
leitura; (3) as fontes estavam "do tamanho de uma formiga" no celular — o formato é
vertical (feito pra celular), mas a experiência de leitura estava dimensionada pra
computador; (4) o design tem que **facilitar a leitura e funcionar**, ser dinâmico,
não só "texto blocado e alguns quadrados".

Mudanças:

1. **Fonte dimensionada pra celular**: corpo 27px (era ~17px), títulos/leads
   proporcionais. Um A4 aberto "ajustado à largura" no celular reduz a ~0,52x —
   então a fonte-fonte precisa ser ~2x a de desktop pra ficar legível sem zoom.
2. **Um assunto por página**: cada `<section class="topic">` força
   `break-before: page`. Assim nenhum assunto começa numa folha onde outro
   terminou. O espaço restante é preenchido pela frase de fechamento (pull-quote
   dourada) de cada bloco e, na carta, pela assinatura.
3. **Cards viraram passos numerados** (`.step` com círculo dourado 01/02/03): mais
   dinâmico e mais escaneável que as caixas cheias da rodada 6 — ataca direto a
   queixa de "só texto blocado e alguns quadrados" — e **mais compacto**, o que faz
   cada assunto de 3 itens caber numa página só.
4. **Negrito nos trechos-chave** (`<strong>`) ao longo de todo o texto, pra criar
   ritmo de leitura e destacar a ideia central de cada parágrafo.
5. **Ajuste fino de paginação por medição**: medi a altura real de cada seção com
   Playwright (`emulateMedia('print')`, viewport 794px) contra a altura útil da
   página (297mm − 22mm de margem = **1039px**). O assunto "gargalos" (o de texto
   mais longo) media 1041px e estourava 2px, jogando o fechamento sozinho pra
   página seguinte; reduzir o padding de cada passo (15→13px) trouxe pra 1029px e
   fechou tudo em 1 página. **Padrão a repetir: quando um bloco "quase cabe", medir
   com Playwright em vez de chutar espaçamento.**

Resultado: PDF com 11 páginas, cada assunto na sua própria folha (sem órfãos nem
página quase vazia), fonte grande pra celular, passos numerados dinâmicos, margens
pretas em todas as bordas (confirmado por amostragem de pixel = `9,8,6`).

## Rodada 8 — centralização vertical + carta dinâmica (2026-07-09)

O Daniel juntou o feedback da Vitória com o dele e chegou num ponto em comum: (1) a
carta (pág. 2) estava "blocada", precisava ser mais dinâmica, com a assinatura
"Vitória Daniela…" menor e no **canto inferior direito**, e destaques em **dourado**
(não só negrito branco) pra dar dinâmica; (2) várias páginas de assunto curto (5, 6,
7, 8) tinham **espaço grande sobrando no rodapé** — o bloco de texto ficava colado no
topo.

O ponto em comum resolvido: não dá pra ter *ao mesmo tempo* "um assunto por página"
(retenção, pedido da Vitória) **e** "toda página 100% cheia" quando os assuntos têm
tamanhos diferentes — alguma coisa cede. A saída de documento profissional é manter
um assunto por página **e centralizar o conteúdo verticalmente**, pra a sobra virar
**margem simétrica em cima e embaixo** (padrão ABNT), nunca amontoada só no rodapé.
Isso é o que a rodada 6 errou (centralizou *e* deixou o conteúdo esparso); aqui a
correção é centralizar **+** dar mais respiro nas páginas curtas pra a margem
simétrica ficar pequena.

Mudanças:

1. **Centralização vertical por assunto**: cada `.topic` virou um flex-column de
   `min-height: 272mm` com `justify-content: center`. O conteúdo fica no meio da
   folha, com a mesma margem em cima e embaixo. (Cuidado: `min-height` acima de
   ~272mm estoura pra 2 páginas no A4 com as faixas de 11mm — 272mm é o teto seguro.)
2. **Páginas curtas com mais respiro** (`.roomy`: recapitulando, próximo passo,
   sobre): espaçamento maior de lista/intro/fechamento e foto do "Sobre" de 62→66mm
   com bio mais espaçada, pra preencher melhor antes de centralizar.
3. **Carta redesenhada** (`.letter`): texto e assinatura viram dois blocos num
   `justify-content: space-between` — texto no topo, **assinatura fixada no canto
   inferior direito** (fonte reduzida de 29→24px, subtítulo 22→18px). Destaques da
   carta trocados de negrito branco (`<strong>`) para **dourado** (`.g` = dourado +
   bold) pra criar o "salto de leitura" que a Vitória pediu. A carta é densa (~980px
   de texto puro, quase uma folha cheia), então não dá pra aumentar a fonte sem
   estourar — o dinamismo veio do dourado + respiro entre parágrafos + assinatura no
   canto, não de fonte maior. Confirmei o limite por varredura de medição (27px/1.5
   cabe; 28px já estoura pra 2 páginas).

Resultado: PDF com 11 páginas, cada assunto centralizado na sua folha (margem
simétrica em cima/embaixo, sem rodapé vazio), carta com destaques dourados e
assinatura no canto inferior direito, margens pretas em todas as bordas (pixel de
borda = `9,8,6`).

## Rodada 9 — Montserrat, sem travessões e foto maior (2026-07-10)

Feedback da Vitória (4 pontos, pediu atenção especial):

1. **Tirar TODOS os travessões** ("não quero linguagem de IA em nada"). Removi
   os 3 travessões que sobravam na copy (intro da metodologia, passo
   "Organização e vendas", passo "Mapeamento de maturidade"), reescrevendo com
   vírgula/ponto ("basta uma ação isolada, seja rodar tráfego…"; "…vender com
   qualidade. Processo comercial…"; "…mais urgente, seja em marketing…"). Os
   `·` (ponto mediano) de "Opção 1 · …" e do rodapé **não** são travessões
   (são separador tipográfico) e ficaram.
2. **Fonte Montserrat.** Voltou a ser Montserrat, mas agora **embutida em
   base64** (não via `@import` do Google Fonts, que quebrava a geração do PDF
   na rodada 4 por falha de TLS no Chromium headless). Como pegar a fonte sem
   rede no render: `curl` na API do Google Fonts (`fonts.googleapis.com/css2`)
   com User-Agent de navegador devolve os `.woff2`; a Montserrat vem como
   **fonte variável** (um `.woff2` por subset cobre todos os pesos 100–900).
   Baixei os subsets **latin** e **latin-ext** (cobre acentos do português,
   aspas curvas, `º`, `·`), converti pra base64 num `@font-face` com
   `font-weight: 100 900` e injeto no `{{FONTS}}`. Arquivos em `assets/fonts/`.
3. **Foto da Vitória (pág. "Sobre") estava pequena.** Aumentei de 62→82mm de
   largura e centralizei verticalmente ao lado da bio (`align-items: center`),
   deixando a foto bem mais presente.
4. **Mais dinamismo/"respiro"** (sugestão dela, sem certeza): mantidos os
   destaques em dourado (rodada 8) e as frases de fechamento como pull-quotes
   dourados centralizados, que já quebram o texto. Sem imagens novas pra não
   arriscar a paginação nem inventar recurso visual sem direção.

**Reajuste de paginação obrigatório após a troca de fonte**: Montserrat é mais
larga que a Helvetica, então no mesmo `px` o texto quebra mais linhas e cresce.
Isso estourou as páginas de 3 passos (gargalos ia a 1207px, metodologia a
1145px) e a carta (1045px). Remedi por **medição** (Playwright, altura útil
1039px): mantive o corpo em 27px (as páginas de checklist ainda cabem) e reduzi
só o que vive nas páginas de passo (passo 26→24px, título de passo 28→25px,
intro 28→25px, fechamento 29→26px, h2 36→33px, padding do passo 13→11px) e a
carta (27→26px). Todas as 11 páginas voltaram a caber em 1 folha cada. **Padrão
a repetir: trocar a família de fonte muda a paginação — sempre remedir e
reajustar tamanhos depois de trocar a fonte.**

## Rodada 10 — layout da página "Sobre" em L (2026-07-10)

A pedido do Daniel/Vitória, a página "Sobre" deixou de ser foto+bio lado a lado
e virou um layout em "L": o **1º parágrafo** ("Há mais de 8 anos… 5, 6 e 7
dígitos.") fica **ao lado da foto**, e os **2 parágrafos restantes** ("Na Magna…"
e "Meu papel…") descem **corridos em largura total**, de uma margem lateral à
outra, embaixo da foto e do 1º texto. Implementação: `.about` virou bloco com
`.about-top` (flex: foto + 1º parágrafo) e `.about-rest` (parágrafos full-width).
Continua cabendo em 1 página (medido).

## Pendências / próximos passos

- **Confirmar com a Vitória** o resultado da rodada 9 (Montserrat, sem
  travessões, foto maior) antes de fechar o item 3.
- **Dinamismo/"respiro"**: ela levantou (sem certeza) a ideia de frases
  impactantes maiores ou imagens pra quebrar os textos. Hoje isso vive nos
  destaques dourados + pull-quotes de fechamento. Se ela quiser ir além,
  decidir COM ela onde/como (ex.: uma frase-manifesto grande numa página, ou
  imagens de apoio) pra não inflar a paginação já ajustada.
- **Trocar o print recriado do "15 mil" pelo original** se/quando o arquivo
  `Feedback .jpeg` chegar de forma extraível (ver rodada 5, ponto 7).
- Se ela quiser o layout literalmente idêntico ao arquivo Figma original
  (`fiASU8LAlKiSqhhEqt4iI2`), só dá pra fazer com acesso de edição a esse
  arquivo (ou prints/export de cada tela) — ver rodada 4.
- Publicar: como esse HTML não está hospedado em lugar nenhum ainda (ao
  contrário do quiz/LP, que são o site ao vivo), falta decidir onde ele vai
  morar de fato — pode virar um projeto Vercel próprio dentro dessa mesma
  pasta, ou ser o arquivo que a automação do GHL manda como anexo.
