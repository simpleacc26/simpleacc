// Textos exatos das opções do Quiz A (produção), usados para montar o relatório.
// Fonte: bundle de produção quiz.rafaelgranella.com.br

// "Qual é o maior gargalo no seu negócio de mentoria hoje?" (pergunta 3 no quiz, resposta_3 no webhook)
export const GARGALOS = [
  'Previsibilidade de aquisição de clientes',
  'Ticket médio abaixo do que meu trabalho vale',
  'Escalar sem depender só de mim',
  'Não tenho clareza sobre qual modelo de negócio faz sentido agora',
];

// Parágrafo de próximo passo, escolhido pelo gargalo. É o único trecho do texto
// fixo que muda de lead pra lead.
export const PROXIMO_PASSO = {
  'Escalar sem depender só de mim':
    'Reconstruir o modelo de entrega para que ele funcione com ou sem você em cada sessão — mantendo a profundidade que diferencia seu trabalho.',
  'Previsibilidade de aquisição de clientes':
    'Estruturar um processo de aquisição que gere leads qualificados de forma previsível — sem depender de indicação ou da sua presença constante nas redes sociais.',
  'Ticket médio abaixo do que meu trabalho vale':
    'Reposicionar sua oferta e ajustar o modelo de entrega para que o ticket reflita o real valor do que você entrega — com um processo de vendas que sustente esse posicionamento.',
  'Não tenho clareza sobre qual modelo de negócio faz sentido agora':
    'Mapear o modelo de negócio correto para o seu momento — e definir o próximo movimento estratégico com clareza, sem tentar resolver tudo ao mesmo tempo.',
};

export const PROXIMO_PASSO_PADRAO = PROXIMO_PASSO['Não tenho clareza sobre qual modelo de negócio faz sentido agora'];
