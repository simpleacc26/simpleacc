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

- `template.html` — arquivo "fonte" pra editar (texto + layout). Usa um
  placeholder `{{PHOTO}}` no lugar da foto da Vitória. É aqui que se edita.
- `Diagnostico-Estrategico-Vitoria-Daniela.html` — HTML final autocontido,
  gerado do template com a foto embutida em base64 (abre offline em qualquer
  navegador). Regenerar depois de editar o template (ver "Como regerar").
- `Diagnostico-Estrategico-Vitoria-Daniela.pdf` — PDF gerado do HTML final,
  pronto pra enviar.
- `assets/vitoria-daniela.jpg` — foto-fonte da Vitória (a mesma embutida no
  HTML), guardada pra regeneração.

## Como regerar (HTML final + PDF)

O HTML final embute a foto como data-URI (pra ficar autocontido). Fluxo:
1. Editar `template.html`.
2. Gerar o data-URI da foto (`assets/vitoria-daniela.jpg`, redimensionada
   pra ~520px de largura) e substituir `{{PHOTO}}` no template, salvando como
   `Diagnostico-Estrategico-Vitoria-Daniela.html`.
3. Gerar o PDF do HTML com Chromium headless
   (`--headless --print-to-pdf --no-pdf-header-footer`). O `@page { margin:0 }`
   + o padding de cada `.page` já cuidam das margens.

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
7. **Seção "Resultados"** agora traz os 3 depoimentos que ela mandou, cada um
   num card separado (ela pediu "trate separadamente tudo o que foi enviado
   separado"). **Decisão de design a confirmar:** renderizei os 3 como cards
   de citação em texto (limpos e legíveis), em vez de colar os prints de
   WhatsApp originais. Motivo: o feedback central dela é que o documento
   estava pequeno/ilegível ("tem que dar zoom"); print de conversa em tela
   pequena reintroduz exatamente esse problema. O texto de cada card é o dos
   prints, 1:1. Se ela preferir os prints originais (autenticidade), dá pra
   trocar — os arquivos estão nas pastas do Drive: `Feedback .jpeg`,
   `Feedback farmacia.jpeg`, `mmmmmm.png`. Atribuição atual genérica
   ("Cliente Magna") porque os prints não identificam o autor.
8. **Legibilidade geral**: fonte base 17px, títulos maiores, cards com
   respiro — atacando direto a queixa de retenção/leitura.

Resultado: PDF com 11 páginas, uma dobra por página, sem página órfã, com
foto e depoimentos.

## Pendências / próximos passos

- **Confirmar com a Vitória** o resultado da rodada 5 (novo layout 1
  dobra/página, foto, depoimentos) antes de fechar o item 3.
- **Decisão da seção "Resultados" a validar**: depoimentos como card de texto
  vs. print original do WhatsApp (ver ponto 7 da rodada 5).
- Se ela quiser o layout literalmente idêntico ao arquivo Figma original
  (`fiASU8LAlKiSqhhEqt4iI2`), só dá pra fazer com acesso de edição a esse
  arquivo (ou prints/export de cada tela) — ver rodada 4.
- Publicar: como esse HTML não está hospedado em lugar nenhum ainda (ao
  contrário do quiz/LP, que são o site ao vivo), falta decidir onde ele vai
  morar de fato — pode virar um projeto Vercel próprio dentro dessa mesma
  pasta, ou ser o arquivo que a automação do GHL manda como anexo.
