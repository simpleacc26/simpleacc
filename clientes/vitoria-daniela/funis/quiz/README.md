# Quiz v2 — Vitória Daniela

Reformulação do quiz publicado em `quiz.vitoriadaniela.com.br`, item 1 da ordem de
execução definida por Daniel em 2026-07-06 (ver
`estrategia/2026-07-06-diagnostico-leads-desqualificados.md` para o diagnóstico
completo). Próximos itens (copy da página de agendamento, diagnósticos por
balde, copy dos novos anúncios) ficam para depois, um de cada vez.

## Onde está o arquivo real

O quiz é um app Figma Make (não um repo git próprio). Arquivo de edição:
https://www.figma.com/make/OZ3R7CNRdGOShABCWyIVza/Quiz-%7C-Vit%C3%B3ria--Copy-

Publicado em: https://quiz.vitoriadaniela.com.br/

## Limitação importante (ler antes de aplicar)

As ferramentas de Figma disponíveis nesta sessão **leem** arquivos Figma Make
(`get_design_context`), mas **não escrevem** neles — o `use_figma` (que edita via
Plugin API) só funciona em arquivos `/design/`, `/board/` e `/slides/`,
não em `/make/`. Ou seja: eu não consigo aplicar esta mudança diretamente no
Figma a partir daqui. Alguém com acesso de edição precisa colar o conteúdo de
`useQuizLogic.v2.ts` (deste diretório) substituindo
`src/app/hooks/useQuizLogic.ts` no arquivo Figma Make acima — ou pedir para o
assistente do Figma Make aplicar esse arquivo. Nenhum outro arquivo do projeto
precisa mudar (ver "o que NÃO muda" abaixo).

## O que muda (`useQuizLogic.ts` → `useQuizLogic.v2.ts`)

1. **Pergunta 1 vira a pergunta-chave de "balde"** (diagnóstico). Fundiu a
   antiga Q1 (realidade) com o antigo Q5 (gap) numa só pergunta decisiva, que
   mapeia direto para 1 dos 4 baldes descritos no diagnóstico: Sem
   Previsibilidade, Marketing Sem Sistema, Refém da Operação, Sem
   Posicionamento (+ uma 5ª opção para quem já tem estrutura, sinaliza
   otimização em vez de dor).
2. **Nova pergunta: momento de investimento** (ideia da própria Vitória,
   adaptada do rascunho que ela mandou) — filtra quem não vai converter agora
   mesmo tendo o faturamento certo.
3. **Faturamento recalibrado** com piso mais granular (R$5 mil e R$20 mil
   viram faixas separadas, em vez de tudo cair em "Até R$20.000") e teto mais
   alto (Acima de R$100 mil), alinhado com o ICP real (Camada A = R$50-100k+).
4. **`getBalde()` e `getCamada()` substituem o antigo `calculateScore`/`getProfile`.**
   Em vez de uma pontuação vaga ("Em estruturação/tração/pronto"), a função
   `getCamada` aplica os filtros reais do ICP (faturamento + momento de
   investimento como filtros duros; estrutura + ticket como filtros de
   qualidade) e retorna `'Camada A (Implementação Magna)'`, `'Camada B
   (Mentoria Magnetizze)'` ou `'Fora do perfil (nutrição)'`. Isso é o que
   faltava: hoje o quiz não desqualifica ninguém.
5. O payload enviado pro webhook (Make.com) passa a incluir `balde` e `camada`
   em vez de `score_total`/`profile`. **Isso muda o formato do payload** — antes
   de publicar, confirme com quem administra o cenário no Make.com se algum
   fluxo depende dos campos antigos, e teste com uma submissão de rascunho.

## O que NÃO muda

`Question.tsx`, `LeadForm.tsx`, `ProgressBar.tsx`, cores, tipografia e animações
(motion/confetti) continuam exatamente como estão. A mudança é só no conteúdo
das perguntas e na lógica de classificação (`useQuizLogic.ts`), e no texto do
hero (`Quiz.tsx`, ver rodada 3 abaixo) — nenhum layout ou componente visual
novo foi criado.

## Pendente

- Aplicar no Figma Make (ver limitação acima) e visualizar/testar lá antes de
  mandar para a Vitória validar.
- Confirmar com quem administra o Make.com o impacto da mudança de payload.
- Depois de aprovado por ela: seguir para os próximos itens da ordem de
  execução (copy da LP, diagnósticos por balde, anúncios).

## Ajustes da própria Vitória (rodada 2, 2026-07-06)

Depois da primeira versão, ela pediu 3 mudanças diretamente pelo Daniel. Já
aplicadas em `useQuizLogic.v2.ts`:

1. **A pergunta de momento de investimento virou a última pergunta** (era a
   4ª). Faturamento agora é a 5ª, investimento é a 6ª (e última).
2. **A pergunta "Se o seu negócio funcionasse com previsibilidade..." (objetivo)
   foi removida** — considerada irrelevante por ela.
3. **Substituída por uma nova pergunta de "modelo de apoio ideal"**, adaptada do
   rascunho original que ela mandou (`contexto/anexos/2026-07-06-quiz-rascunho-vitoria.docx`,
   pergunta 4 de lá): **"O que mais faria a diferença para o seu negócio
   atualmente?"**, com as opções sobre direcionamento/acompanhamento
   individual/profissionais que executam/equilíbrio. A resposta vai no payload
   como `modelo_apoio` (informativo, não entra ainda nos filtros de
   qualificação de `getCamada`).

**Atenção ao reaplicar:** como as perguntas mudaram de posição, os IDs internos
mudaram junto (`faturamento` agora é `q5`, `investimento` é `q6`). Se alguém
for fazer esse ajuste em pedaços pelo chat do Figma Make (só reordenando/
trocando o texto, sem colar o arquivo inteiro), é fácil esquecer de atualizar
essas referências dentro de `getCamada` — e aí a classificação de camada
passa a ler a pergunta errada silenciosamente. Por isso o mais seguro é colar
o arquivo `useQuizLogic.v2.ts` inteiro de novo, em vez de pedir ajustes
pontuais.

## Ajustes da própria Vitória (rodada 3, 2026-07-06) — headline e descrição

Ela pediu para trocar a headline e a descrição do quiz. O texto exato estava
no rascunho que ela mandou (`contexto/anexos/2026-07-06-quiz-rascunho-vitoria.docx`,
bloco "Headline>" antes das perguntas). Aplicado em `Quiz.v2.tsx`
(componente `HeroHeader`, único trecho alterado nesse arquivo):

- **Headline:** "Descubra como trazer a autoridade que você já possui no
  offline para a internet e atraia clientes de alto valor."
- **Descrição:** "Este teste rápido foi desenhado para especialistas,
  profissionais e empresários que possuem um serviço de excelência. Em menos
  de 3 minutos, você receberá uma análise do que precisa fazer para ter uma
  presença digital que traga resultados. Responda às perguntas abaixo para
  entender como atrair o público de maior poder aquisitivo e expandir seu
  negócio com previsibilidade usando o digital."

**Nota estratégica (não bloqueia, só registro):** esse gancho fala de
"autoridade offline → digital", diferente do gancho de "lucro/previsibilidade
de vendas com o Método Magna" usado hoje nos anúncios, na LP e no relatório.
Ela confirmou que é intencional porque os próximos anúncios (item 4 da ordem
de execução) vão ser produzidos a partir dessa nova linha — ou seja, o quiz
está puxando a frente da comunicação, e os anúncios/LP/relatório devem ser
realinhados a esse gancho depois, não o contrário.

## Para aplicar tudo de uma vez no Figma Make

São 2 arquivos para colar, cada um por completo, no chat do Figma Make:

1. `src/app/hooks/useQuizLogic.ts` ← conteúdo de `useQuizLogic.v2.ts`
2. `src/app/components/Quiz.tsx` ← conteúdo de `Quiz.v2.tsx`

Nenhum outro arquivo do projeto precisa mudar.
