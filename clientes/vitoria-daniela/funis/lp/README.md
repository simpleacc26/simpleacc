# LP / Página de agendamento v2 — Vitória Daniela

Item 2 da ordem de execução (`estrategia/2026-07-06-diagnostico-leads-desqualificados.md`).
Ajustes de texto pedidos pela Vitória no documento `QUIZ_1.docx`, mantendo o
layout, fotos e componentes exatamente como estão.

## Onde está o arquivo real

https://www.figma.com/make/mN7RiQmFOADqTQPRdxJVOO/LP-%7C-Vit%C3%B3ria--Copy-

Publicado em: https://lp.vitoriadaniela.com.br/

Mesma limitação já registrada para o quiz: as ferramentas desta sessão só leem
arquivos Figma Make, não escrevem. Aplicar exige colar o conteúdo no chat do
Figma Make (prompt pronto abaixo).

## Mapeamento das "dobras" do documento para os componentes reais

A LP é montada em `App.tsx` a partir de vários componentes em
`src/app/components/power/`. Nem todo componente do projeto está em uso —
`Services.tsx`, `Portfolio.tsx` e `TrustedBy.tsx` existem no arquivo mas não
são importados em `App.tsx` (sobras de template, ignorar).

| Dobra no documento | Componente real | Status |
| --- | --- | --- |
| Dobra 1 (hero) | `Hero.tsx` | ✅ Mapeado, pronto em `Hero.v2.tsx` |
| Dobra 2 (3 desafios) | `components/power/Quiz.tsx` (é uma seção de "desafios" da LP, **não é** o app do quiz) | ✅ Mapeado, pronto em `PowerQuiz.v2.tsx` |
| Dobra 3 (engrenagem de 3 fases do Método Magna) | — | ⚠️ **Sem componente correspondente hoje**, ver abaixo |
| Dobra 4 em diante | `Methodology.tsx`, `SessionDetails.tsx`, `Testimonials.tsx`, `AboutExpert.tsx`, `FAQ.tsx`, `FooterCTA.tsx`, `Footer.tsx` | Mantidos sem alteração — o próprio documento cita o início exato de `Methodology.tsx` como o ponto a partir do qual é "para manter o resto" |

## Dobra 1 → `Hero.tsx`

- **Headline:** "Tenha uma presença online que demonstre a autoridade que você
  já tem no offline e atraia clientes de alto valor."
- **Subheadline:** parágrafo do documento + a frase "Toque abaixo para agendar
  uma análise estratégica..." juntos no mesmo `<h2>` (a seção só tem
  headline + subheadline + botão, sem espaço para uma frase extra sem alterar
  o layout).
- **Botão:** texto trocado de "QUERO AGENDAR MINHA ANÁLISE ESTRATÉGICA" para
  "AGENDAR MINHA ANÁLISE ESTRATÉGICA" (documento pede sem o "quero"). Mantive
  a mesma caixa alta/estilo visual do botão original — se ela quiser o texto
  em caixa mista mesmo, é só falar.

## Dobra 2 → `components/power/Quiz.tsx` (seção de desafios)

- Título e as 3 dores trocados pelos itens do documento.
- **Atenção:** o documento só deu o título de cada dor (bullet), sem a frase
  de descrição que aparece embaixo de cada card no layout atual. Para não
  deixar os cards com espaço vazio, **escrevi eu mesmo uma descrição curta
  para cada uma** (uma frase, tentando manter o tom já em uso). São sugestões
  minhas, não da Vitória — revisem antes de publicar:
  - *Falta de clareza do caminho a seguir* → "Você sabe que precisa estruturar
    sua presença online, mas não sabe por onde começar nem o que priorizar
    primeiro."
  - *Já tentou sozinho ou com agências de marketing* → "Você já investiu tempo
    ou dinheiro tentando resolver isso, mas não teve o resultado ou a
    organização que esperava."
  - *Se sente abarrotado de informações* → "Tanto conteúdo e tanta opinião
    diferente só deixam mais difícil saber o que realmente funciona para o
    seu negócio."
- Os dois parágrafos abaixo dos cards e a frase antes do botão também foram
  trocados pelo texto do documento. Botão igual ao da Dobra 1.

## Dobra 3 → `MagnaMethod.tsx` (componente novo)

Confirmado com o Daniel: como não existia bloco correspondente, a Dobra 3
vira uma **seção nova** (única exceção à regra de "só texto" nesta rodada),
inserida entre a seção de desafios (Dobra 2) e `Methodology.tsx` (Dobra 4,
mantida sem alteração). Visual consistente com o resto da página: mesmo
padrão de cards escuros com borda dourada usado em `Methodology.tsx` e na
seção de desafios (`bg-[#111]/80`, borda `#222`, hover dourado), 3 colunas
numeradas (01/02/03) com ícone, título e descrição, fechando com o mesmo
parágrafo + botão verde do WhatsApp que todas as outras seções usam.

Conteúdo (direto do documento da Vitória, sem invenção):
- **Título:** "Para crescer com consistência e previsibilidade, o Método
  Magna organiza a sua operação através de uma engrenagem de 3 fases:"
- **01 — Presença digital nas redes sociais**
- **02 — Captação de novos clientes**
- **03 — Organização nas vendas**
- Fechamento: "Toque abaixo para agendar sua Análise Estratégica. Nessa
  conversa, nós vamos mapear a sua estrutura atual para identificar
  exatamente o que falta para implementar essa engrenagem de forma
  personalizada no seu momento."

Precisa de uma linha a mais no `App.tsx`: importar `MagnaMethod` e renderizar
`<MagnaMethod />` entre `<Quiz />` e `<Methodology />`.

## Para aplicar tudo no Figma Make

São 4 alterações para colar no chat do Figma Make, cada uma por completo:

1. `src/app/components/power/Hero.tsx` ← conteúdo de `Hero.v2.tsx`
2. `src/app/components/power/Quiz.tsx` ← conteúdo de `PowerQuiz.v2.tsx`
3. **Novo arquivo** `src/app/components/power/MagnaMethod.tsx` ← conteúdo de
   `MagnaMethod.tsx`
4. `src/app/App.tsx` ← adicionar o import de `MagnaMethod` e renderizar
   `<MagnaMethod />` logo depois de `<Quiz />` e antes de `<Methodology />`

Nenhum outro arquivo do projeto precisa mudar.
