# Página pós-quiz — entrega do diagnóstico

**Arquivo da proposta:** `pagina-pos-quiz-diagnostico.html` (abrir no navegador)
**Substitui:** a página atual em `https://quiz.grokkeronline.com/lp`, que vende a Sessão Diagnóstica
**Status:** proposta para validação com a Dani

## O que muda

A página tinha uma função e passou a ter outra. Antes ela vendia a **sessão
estratégica**. Agora ela precisa fazer o lead **chamar no WhatsApp para receber o
diagnóstico**, porque é a mensagem dele que abre a janela de 24h do Meta e
destrava todo o resto do fluxo (ver `estrategia/reuniao-pulsar-novo-fluxo-e-prioridades.md`).

O pedido encolheu de propósito: sair de "agende uma sessão" para "receba um
documento" derruba a barreira no exato ponto do funil que hoje mais perde lead.
O agendamento não desapareceu, mudou de lugar, e acontece no fim da Etapa 2.

## Estrutura

1. Hero: o cenário já tem nome, falta saber por que se instalou
2. O que você acabou de responder (ecoa as 4 opções da pergunta que define o cenário)
3. O que costuma aparecer junto (as 4 situações-problema da página antiga, reescritas para terminar em falta de critério)
4. O que você vai receber (espelha a estrutura dos 4 PDFs)
5. Por que pelo WhatsApp
6. Quem assina o Diagnóstico (bio completa + faixa de credenciais)
7. Para quem esse Diagnóstico foi escrito (é para você se / não é se)
8. FAQ, 6 perguntas
9. Fechamento em duas saídas

## Regras de implementação

- **4 CTAs**, todos com o mesmo texto ("Receber meu Diagnóstico no WhatsApp") e
  apontando para o mesmo link, com a mesma mensagem pré-preenchida:
  `https://wa.me/5555996185023?text=Quero%20receber%20meu%20Diagn%C3%B3stico%20de%20Lideran%C3%A7a`
- Esse texto pré-preenchido **precisa bater exatamente com o gatilho configurado
  na Pulsar**. É a única dependência externa da página: se mudar de um lado só, o
  fluxo não dispara.
- **"Liderança", "Gestão" e "Diagnóstico" sempre com inicial maiúscula**, em
  qualquer posição da frase. Pedido da cliente, vale para toda peça desta conta.
- A página **não cita quantidade de perguntas** da Etapa 2, só o tempo: "menos
  de 3 minutos", igual aos PDFs e ao áudio. A cliente tinha pedido 5 minutos
  aqui; fechado em 3 em ago/26, depois que o protótipo da Etapa 2 permitiu
  cronometrar.

## Correções pedidas pela cliente (12/08/2026)

- **Saiu a linha laranja do topo** ("Diagnóstico de Liderança · Seu resultado" /
  "Seu cenário: X"). O respiro que ela dava passou para a margem do h1.
- **Fim da duplicação do pedido.** A cliente apontou que o lead clicava para
  receber o Diagnóstico no fim do quiz e clicava de novo para receber o
  Diagnóstico na página. Agora o quiz entrega o **cenário** na tela (botão "Ver
  o meu cenário", e a tela de contato diz "Falta só identificar você") e a
  página é o único lugar que pede o **documento** ("Receber meu Diagnóstico no
  WhatsApp"). Verbos e objetos diferentes, um pedido só.

## Pendências para alinhar com a cliente

- **Título da seção "Por que pelo WhatsApp".** Ela pediu "Diagnóstico e
  documento, e documento se entrega em mãos", que está aplicado literalmente. A
  frase provavelmente deveria ser "Diagnóstico **é** documento, e documento se
  entrega em mãos", que é o sentido original. Confirmar antes de publicar.
- Tema escuro único, deliberado, espelhando a página atual da cliente.
- A copy precisa continuar amarrada ao quiz novo (`estrategia/proposta-quiz-metodo-ask.html`):
  a promessa da página é a continuação direta do cenário entregue no fim do quiz.

## Medição

Só a **quantidade de cliques** nos botões, via GTM. Agendamento é medido e
reportado pelo time comercial da Dani.
