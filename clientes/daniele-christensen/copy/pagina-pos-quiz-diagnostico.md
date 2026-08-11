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
6. Quem assina o diagnóstico (bio completa + faixa de credenciais)
7. Para quem esse diagnóstico foi escrito (é para você se / não é se)
8. Depoimentos (espaços reservados para os prints que já rodam na página atual)
9. FAQ, 7 perguntas
10. Fechamento em duas saídas

## Regras de implementação

- **4 CTAs**, todos apontando para o mesmo link, com a mesma mensagem pré-preenchida:
  `https://wa.me/555599768528?text=Quero%20receber%20meu%20Diagn%C3%B3stico%20de%20Lideran%C3%A7a`
- Esse texto pré-preenchido **precisa bater exatamente com o gatilho configurado
  na Pulsar**. É a única dependência externa da página: se mudar de um lado só, o
  fluxo não dispara.
- A página **não cita quantidade de perguntas** da Etapa 2, só o tempo ("cerca de
  3 minutos"). Motivo em `funis/diagnosticos-pdf/README.md`.
- Tema escuro único, deliberado, espelhando a página atual da cliente.
- A copy precisa continuar amarrada ao quiz novo (`estrategia/proposta-quiz-metodo-ask.html`):
  a promessa da página é a continuação direta do cenário entregue no fim do quiz.

## Medição

Só a **quantidade de cliques** nos botões, via GTM. Agendamento é medido e
reportado pelo time comercial da Dani.
