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

- `Diagnostico-Estrategico-Vitoria-Daniela.html` e `template.html` — hoje são
  idênticos (não há mais placeholder de foto/link pra substituir). É o
  arquivo "fonte" pra editar texto e regerar o PDF.
- `Diagnostico-Estrategico-Vitoria-Daniela.pdf` — versão PDF gerada a partir
  do HTML, pronta pra enviar como está hoje.

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

## Pendências / próximos passos

- **Confirmar com a Vitória** se a copy, a remoção da foto e o novo design de
  legibilidade (rodada 4) estão de acordo antes de considerar o item 3
  fechado de vez — inclusive a decisão tomada na seção "Resultados" (placeholder
  de prints em vez do texto `(colocar prints feedbacks)` do Word).
- Se ela quiser o layout literalmente idêntico ao arquivo Figma original
  (`fiASU8LAlKiSqhhEqt4iI2`), só dá pra fazer com acesso de edição a esse
  arquivo (ou prints/export de cada tela) — ver rodada 4.
- Publicar: como esse HTML não está hospedado em lugar nenhum ainda (ao
  contrário do quiz/LP, que são o site ao vivo), falta decidir onde ele vai
  morar de fato — pode virar um projeto Vercel próprio dentro dessa mesma
  pasta, ou ser o arquivo que a automação do GHL manda como anexo.
