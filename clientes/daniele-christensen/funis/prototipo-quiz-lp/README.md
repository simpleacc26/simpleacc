# Protótipo navegável: quiz novo + página pós-quiz

Arquivo único e autocontido (`index.html`), sem dependências. Abrir no navegador
ou hospedar em qualquer lugar estático.

**Para que serve:** validar com a cliente a conexão entre as duas peças, ou
seja, que a promessa do quiz e a promessa da página são a mesma. Não é o funil
de produção.

## O que ele implementa

- As 8 perguntas da proposta (`estrategia/proposta-quiz-metodo-ask.html`), com a
  **ramificação P0**: quem responde "proprietário, dono ou sócio" segue pelo
  Caminho A (faturamento e margem) e o restante pelo Caminho B (autonomia de
  investimento e remuneração). Cada lead responde 8 perguntas nos dois casos.
- A definição do cenário pela **P2**, com os 4 diagnósticos.
- A **pontuação** validada pela cliente: Caminho A soma P4 + P6, Caminho B soma
  P6 + P7. O piso de faturamento de R$200 mil no Caminho A está aplicado, então
  um lead com muita dor e pouco porte não fura a régua por acúmulo de pontos.
- Captura de contato entre o quiz e a página, que é onde o lead vira lead.
- A página pós-quiz aprovada, com o cenário identificado injetado na linha de
  apoio do topo e a situação correspondente destacada.

## Barra de demonstração

A faixa do topo **não faz parte da página real**. Ela existe só para avaliação:

- **Refazer o quiz** volta ao início.
- **Cenário 1 a 4** pula direto para a página com aquele cenário, para conferir
  os quatro sem refazer o quiz.
- **Dados capturados** abre o painel com o que o CRM receberia ao fim do quiz:
  caminho, cenário, qual PDF seria enviado, respostas de porte, pontuação e o
  resultado da régua.

## Limites

- Nada é enviado nem armazenado. O formulário de contato não integra com nada.
- Os botões de WhatsApp usam o link real, com a mensagem pré-preenchida de
  produção. Ao clicar, uma conversa de verdade é aberta com o número da cliente.
- O Bloco 2 (Etapa 2, o instrumento completo) não está no protótipo. Ele entra
  depois do WhatsApp no fluxo real.
- A personalização do topo da página ("Seu cenário: O Adiador") é uma adição
  deste protótipo, não estava na copy aprovada. Precisa de validação.
