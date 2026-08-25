# Reunião com a Pulsar — novo fluxo do funil, divisão de escopo e prioridades

**Data:** agosto/2026
**Participantes:** Simple Acc (Renan), Pulsar (Graziano, Pablo), Grokker (Priscila), Dani

## O que originou a mudança

A Meta está bloqueando e limitando a entrega de **modelo de mensagem para lead frio**, ou seja, quem nunca mandou mensagem para o número antes. Mesmo o lead que clicou no anúncio, foi pago e respondeu o quiz pode simplesmente não receber a mensagem. A Meta avalia o perfil de cada usuário e restringe entrega para quem tende a ignorar ou bloquear esse tipo de conteúdo.

A solução é **inverter quem inicia a conversa**. Se o lead manda a primeira mensagem, abre uma janela gratuita de 24 horas: cai o custo de template, some o bloqueio, e libera o DS Voice, que permite áudio, indicador de "gravando áudio" e fluxo humanizado.

Isso não é ajuste de copy. É uma restrição técnica que redefiniu a função da página pós-quiz.

## O fluxo acordado

1. Anúncio → quiz. **A Etapa 1 fica exatamente como está**, consenso de todos.
2. Cenário aparece na tela ao final do quiz.
3. **Novo:** botão em destaque levando o lead a chamar no WhatsApp para receber o diagnóstico completo.
4. Lead manda a mensagem → dispara o fluxo: áudio da Dani → PDF do diagnóstico → link da Etapa 2.
5. Etapa 2 preenchida → calendário para agendar a Sessão Estratégica. Isso não muda.
6. Não preencheu? Follow-up dentro das 24h.
7. Nunca chamou no WhatsApp? Cai no fluxo atual de template e o SDR aborda. Nada se perde.

## Decisões travadas na reunião

**A Etapa 2 continua sendo link, não vira conversa com IA.** Chegou a ser proposto um agente fazendo as perguntas dentro do WhatsApp. O grupo convergiu que, logo depois de chamar, o lead quer ser atendido, não responder outro questionário.

**Tráfego direto para WhatsApp foi descartado.** Já testaram e veio lead muito ruim. O quiz permanece como filtro.

**A objeção às duas etapas foi resolvida.** O medo era desistência. O desenho novo endereça isso porque a segunda etapa chega depois de um contato humanizado, não como formulário frio.

## Divisão de escopo, Simple e Pulsar

Dois princípios que evitam briga depois:

1. **A fronteira é o momento em que o lead vira registro no CRM.** Antes disso é nosso, depois é da Pulsar.
2. **Responsabilidade segue acesso.** Não temos acesso ao CRM, então não assumimos responsabilidade por automação que roda dentro de um sistema que não enxergamos.

| Simple Acc | Pulsar |
| --- | --- |
| Anúncios: criativo, copy, campanha, verba, otimização | Receber o webhook e criar o card do lead |
| Quiz Etapa 1: perguntas, ramificação P0, pontuação, cálculo do cenário | Campos customizados para P0 a P7, cenário, pontuação, blocos A a E e TD |
| Entrega do diagnóstico do cenário na tela | Agenda do closer e confirmação do horário |
| Formulário da Etapa 2 e cálculo dos blocos e do TD | Disparos de WhatsApp, API oficial, aprovação de template |
| Página, hospedagem, velocidade e UX | Lembretes, cadência de follow-up e fluxo de nutrição |
| Enviar os dados para o CRM | Discador e telefonia |
| Métricas até o lead: conversão, conclusão da Etapa 2, CPL, custo por MQL | Métricas do comercial: agendamento, comparecimento, proposta e venda |

### Os três pontos que sempre quebram e precisam ser combinados

**Contrato de dados.** Alguém precisa escrever, antes de qualquer um dos dois construir, a lista exata de campos do webhook: nome, formato, valores possíveis. Se mandarmos `faturamento: "200-300k"` e o CRM esperar número, quebra. É meia hora de conversa que economiza semanas.

**Onde mora o calendário.** Se a agenda é nativa da Pulsar, a última tela da Etapa 2 precisa redirecionar ou embutir o widget deles. Se for Calendly ou similar, alguém integra ao CRM. Isso decide de quem é a última tela do funil, e segue indefinido.

**Quem atende quando quebra.** Um responsável de cada lado e um prazo combinado, senão quiz fora do ar vira ping-pong.

### Argumento técnico a favor da ordem que recomendamos

Na versão dos documentos originais da Dani, a Etapa 2 era disparada **pela confirmação do agendamento**. Ali a Pulsar precisaria: detectar a confirmação, disparar o WhatsApp com o link, rastrear se preencheu, mandar lembrete de 24h e de 4h, e avisar o SDR de quem não preencheu. Cinco automações e dois webhooks.

Na ordem que recomendamos, com a **Etapa 2 antes do agendamento**, tudo acontece no mesmo fluxo do nosso lado. A Pulsar recebe **um webhook só**, no fim, com tudo preenchido. Menos integração é menos coisa para quebrar. É um argumento técnico somado ao motivo original, que era comparecimento.

## Ranking de prioridade do lado da Simple

Ordenado por dois critérios: o que trava o trabalho de outra pessoa e o que é caro de corrigir depois.

### Bloco 1 — decisões que destravam tudo

**1. Cravar quantas perguntas e quanto tempo tem a Etapa 2.**
É insumo das copies, do áudio e dos PDFs. A especificação tem 15 perguntas (2 no bloco A, 2 no B, 2 no C, 4 no D, 5 no E), mas o texto de transição promete 5 e a Dani calculou 3 minutos. O "5" provavelmente veio de "5 blocos".
**Decidido em ago/26:** manter os 3 minutos e não alterar os PDFs. **Revisto em 25/08:** a equipe da Dani pediu 5 minutos e "algumas perguntas" no lugar de "5 perguntas", e os PDFs foram regerados. Todas as peças estão em 5 minutos, e nenhuma cita quantidade.

**2. Definir quem constrói e hospeda a Etapa 2.**
Ficou aberto na reunião inteira. Tem consequência em cadeia: onde mora o cálculo do TD, para onde vai o webhook, onde fica o calendário da última tela.

### Bloco 2 — as entregas da Simple

**3. Copy da página pós-quiz.** Virou o novo ponto único de falha do funil: todo o contorno da restrição da Meta só funciona se o lead clicar naquele botão. A página mudou de função, de vender a sessão para entregar o diagnóstico. **Entregue** em `copy/pagina-pos-quiz-diagnostico.html`.

**4. Roteiro do áudio da Dani.** Trava a cliente, que precisa gravar. **Entregue** em `copy/whatsapp-entrega-diagnostico.md`.

**5. Follow-ups dentro das 24h.** Não pode ser a régua padrão da Simple: o objetivo é específico, fazer clicar no link da Etapa 2. E precisa caber na janela de 24h, então são uma ou duas mensagens. **Entregue** no mesmo arquivo acima.

### Bloco 3 — medição

**6. Instrumentar a taxa de clique do botão de WhatsApp.** Entrou um degrau novo no funil e ninguém está medindo. Sem isso, em duas semanas não dá para saber se o problema está na copy da página, no áudio ou no fluxo do WhatsApp.
**Escopo definido:** medir **só a quantidade de cliques**, via GTM. Agendamento é medido e reportado pelo time comercial da Dani.

**7. Reconfigurar os eventos de conversão para a Meta.** Os dados do quiz continuam caindo na planilha, então o MQL sobrevive. O que quebra é o sinal de conversão final, porque o agendamento agora acontece fora da página. Sem isso a campanha volta a otimizar por volume, e a degradação aparece em duas ou três semanas sem ninguém ligar uma coisa à outra.

## Fora do escopo da Simple

**Dani:** gravar o áudio.

**Pulsar:** refazer as automações, porque os endpoints mudam com a landing nova. Montar o fluxo DS Voice. Criar duas entradas de card, separando quem chamou ativamente de quem só preencheu o quiz. Automação de mudança de coluna quando a Etapa 2 for preenchida. Pediram 48 horas depois de receberem as copies.
