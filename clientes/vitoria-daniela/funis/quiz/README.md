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
Plugin API) explicitly só funciona em arquivos `/design/`, `/board/` e `/slides/`,
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

Nenhum componente visual foi tocado — `Quiz.tsx`, `Question.tsx`, `LeadForm.tsx`,
`ProgressBar.tsx`, cores, tipografia, animações (motion/confetti) e o hero
("Descubra quanto lucro sua empresa pode gerar a mais...") continuam
exatamente como estão. A mudança é só no conteúdo das perguntas e na lógica de
classificação, em `useQuizLogic.ts`.

## Pendente

- Aplicar no Figma Make (ver limitação acima) e visualizar/testar lá antes de
  mandar para a Vitória validar.
- Confirmar com quem administra o Make.com o impacto da mudança de payload.
- Depois de aprovado por ela: seguir para os próximos itens da ordem de
  execução (copy da LP, diagnósticos por balde, anúncios).
