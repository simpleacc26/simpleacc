/* ============================================================
   FLOW. Diagnóstico do Ciclo · Mulher que Escolhe (Thiago)
   Toda a copy do quiz e do relatório vive aqui.
   Para editar perguntas/textos, mexa só neste arquivo.
   Estrutura invisível espelhada do quiz de alta conversão da Pâmella,
   no mesmo padrão já ajustado no funil do Felipe Damasceno
   (SPIN de 9 passos, qualificação no fim, loading, CTAs distribuídos).
   Copy aprovada em: clientes/thaina-elvira/estrategia/2026-08-04-estrategia.
   Padrão de escrita: nunca usar travessões (traço longo).
   ============================================================ */
window.FLOW = {
  config: {
    storeKey: "thaina_diagnostico_ciclo",
    frente: "Mulher que Escolhe",
    funil: "ciclo-da-migalha",
    diagnosticoUrl: "diagnostico.html",
  },

  marca: {
    nome: "Mulher que Escolhe",
    expert: "Thiago Vitório",
    /* WhatsApp de atendimento, formato internacional e só dígitos.
       (+55 11 94514-8716, informado pelo Daniel em 11/08.)
       Se algum dia voltar a ter "X", o botão não abre o WhatsApp de propósito,
       para não mandar lead para número errado. */
    whatsapp: "5511945148716",
    // Texto que abre no WhatsApp ({nome} e {padrao} são trocados na hora)
    whatsappMsg: "Oi! Sou {nome}, acabei de fazer o diagnóstico e meu resultado foi {padrao}. Quero entender melhor como funciona a sessão.",
  },

  hero: {
    selo: "Diagnóstico do Ciclo · Método Mulher que Escolhe",
    titulo: "Descubra qual ciclo está travando a sua vida amorosa",
    subtitulo:
      "Responda em 2 minutos e receba um diagnóstico personalizado, com o padrão que se repete nas suas relações.",
    tempo: "Leva ~2 minutos",
    cta: "Começar meu diagnóstico",
  },

  /* Ordem SPIN: baixa fricção primeiro, as duas porteiras (perfil e prontidão)
     por último. Em 'report' fica a frase usada no relatório de diagnóstico.
     'peso' alimenta o cálculo do ICM, o Índice do Ciclo da Migalha
     (3 = ciclo mais ativo, 0 = menos).
     tempo, objetivo, perfil e prontidão não têm peso: não entram no ICM,
     só na leitura e na qualificação.
     O campo 'etapa' é organização interna: NUNCA é renderizado na tela.
     Cada pergunta alimenta um elo do Mapa do Ciclo, então o quiz é ao mesmo
     tempo captação e pré-work da sessão. */
  steps: [
    {
      id: "situacao",
      etapa: "Situação",
      pergunta: "Como está a sua vida amorosa hoje?",
      options: [
        { value: "indefinido", label: "Estou vivendo algo com alguém, mas nada se define", peso: 3,
          report: "viver algo que não se define" },
        { value: "sozinha", label: "Estou sozinha e querendo um relacionamento de verdade", peso: 0,
          report: "estar sozinha e querendo algo de verdade" },
        { value: "saindo", label: "Estou saindo de um relacionamento que me machucou", peso: 2,
          report: "estar saindo de uma relação que machucou" },
        { value: "sem-valor", label: "Tenho um relacionamento, mas não me sinto valorizada nele", peso: 3,
          report: "estar em uma relação em que você não se sente valorizada" },
      ],
    },
    {
      /* elo 1 do Mapa do Ciclo: o gatilho */
      id: "gatilho",
      etapa: "Gatilho",
      pergunta: "O que mais se repete nas suas histórias?",
      options: [
        { value: "esfria", label: "Começa intenso demais e depois ele esfria do nada", peso: 2,
          report: "o esfriamento depois de um começo intenso" },
        { value: "some-volta", label: "Ele desaparece e volta como se nada tivesse acontecido", peso: 3,
          report: "o sumiço seguido do retorno como se nada tivesse acontecido" },
        { value: "indefinicao", label: "Nunca fica claro o que a gente é, e eu não pergunto", peso: 3,
          report: "a falta de definição sobre o que vocês são" },
        { value: "promessa", label: "Ele diz que quer, mas nunca dá o próximo passo", peso: 1,
          report: "a promessa que nunca vira próximo passo" },
      ],
    },
    {
      /* elo 2 do Mapa do Ciclo: a reação. É esta resposta que nomeia o padrão. */
      id: "reacao",
      etapa: "Reação",
      pergunta: "Quando a insegurança bate, o que você costuma fazer?",
      options: [
        { value: "espera", label: "Fico olhando o celular esperando resposta", peso: 2,
          report: "esperar a resposta com o celular na mão",
          padrao: "Ciclo da Espera",
          padraoDesc: "o ciclo se sustenta na espera: a vida entra em pausa até a resposta chegar." },
        { value: "explicacao", label: "Mando uma mensagem longa explicando como me sinto", peso: 3,
          report: "explicar em uma mensagem longa como você se sente",
          padrao: "Ciclo da Explicação",
          padraoDesc: "o ciclo se sustenta na tentativa de ser entendida: explicar vira o jeito de buscar alívio." },
        { value: "cobranca", label: "Cobro, discuto e depois me arrependo", peso: 3,
          report: "cobrar, discutir e depois se arrepender",
          padrao: "Ciclo da Cobrança",
          padraoDesc: "o ciclo se sustenta na cobrança seguida de arrependimento, e o alívio vem quando ele reage." },
        { value: "afastamento", label: "Finjo indiferença e espero que ele venha atrás", peso: 1,
          report: "fingir indiferença e esperar que ele venha atrás",
          padrao: "Ciclo do Afastamento",
          padraoDesc: "o ciclo se sustenta no afastamento estratégico, que é outra forma de esperar a migalha." },
      ],
    },
    {
      /* Passo 3 do blueprint ("há quanto tempo"): cronifica a dor. Enriquece a
         leitura do relatório e não entra no cálculo do ICM. */
      id: "tempo",
      etapa: "Há quanto tempo",
      pergunta: "Há quanto tempo esse padrão se repete na sua vida?",
      options: [
        { value: "recente", label: "Começou nesta relação, é recente", report: "pouco tempo" },
        { value: "ano", label: "Mais de um ano", report: "mais de um ano" },
        { value: "relacoes", label: "Se repete em mais de uma relação", report: "mais de uma relação" },
        { value: "sempre", label: "Desde sempre, é o meu padrão", report: "muito tempo" },
      ],
    },
    {
      id: "implicacao",
      etapa: "Implicação",
      pergunta: "Se nada mudar, como você imagina a sua vida amorosa daqui a 2 anos?",
      options: [
        { value: "igual", label: "Do mesmo jeito, e isso me assusta", peso: 3,
          report: "tudo continuar do mesmo jeito" },
        { value: "sozinha", label: "Sozinha, e é o que mais me dói pensar", peso: 3,
          report: "chegar lá sozinha" },
        { value: "repetindo", label: "Com outra pessoa, repetindo a mesma história", peso: 1,
          report: "repetir a mesma história com outra pessoa" },
        { value: "nao-penso", label: "Não consigo nem imaginar, prefiro não pensar", peso: 2,
          report: "nem conseguir imaginar" },
      ],
    },
    {
      id: "tentativas",
      etapa: "O que já tentou",
      pergunta: "O que você já tentou para mudar isso?",
      options: [
        { value: "terapia", label: "Terapia, e ajudou em mim, mas não nas minhas escolhas", peso: 1,
          report: "fazer terapia" },
        { value: "cursos", label: "Cursos e conteúdos sobre relacionamento e feminilidade", peso: 2,
          report: "estudar relacionamento e feminilidade" },
        { value: "conselhos", label: "Segui conselhos de amigas e testei jogar o jogo dele", peso: 3,
          report: "seguir conselhos e testar jogar o jogo dele" },
        { value: "nada", label: "Nada estruturado, fui levando e esperando melhorar", peso: 3,
          report: "ir levando e esperando melhorar" },
      ],
    },
    {
      id: "objetivo",
      etapa: "Objetivo",
      pergunta: "O que você mais quer nos próximos meses?",
      options: [
        { value: "entender", label: "Entender por que isso se repete comigo",
          report: "entender por que isso se repete" },
        { value: "parar", label: "Parar de aceitar menos do que eu quero",
          report: "parar de aceitar menos do que você quer" },
        { value: "alguem", label: "Estar com alguém que queira ficar de verdade",
          report: "estar com alguém que queira ficar de verdade" },
        { value: "paz", label: "Me sentir em paz, com ou sem relacionamento",
          report: "se sentir em paz, com ou sem relacionamento" },
      ],
    },
    {
      /* Qualificação de ICP. 'casada' só segue se a situação indicar relação
         sem valorização (regra de segmentação da estratégia). */
      id: "perfil",
      etapa: "Perfil",
      pergunta: "Em qual momento da vida você está?",
      options: [
        { value: "separada", label: "Separada ou divorciada, recomeçando" },
        { value: "solteira", label: "Nunca casei, mas já tive relações longas" },
        { value: "casada", label: "Casada ou em um relacionamento fixo", condicional: true },
        { value: "saindo", label: "Saindo de um relacionamento agora" },
      ],
    },
    {
      id: "prontidao",
      etapa: "O próximo passo",
      pergunta:
        "Se você encontrar um caminho que faça sentido, está pronta para investir em você agora?",
      options: [
        { value: "prioridade", label: "Sim, é prioridade para mim neste momento", filaQuente: true },
        { value: "se-funciona", label: "Sim, se eu entender que funciona para o meu caso", filaQuente: true },
        { value: "valor", label: "Só dependendo do valor" },
        { value: "depois", label: "Não neste momento, quero só entender melhor", nutrir: true },
      ],
    },
  ],

  captura: {
    titulo: "Seu diagnóstico está pronto",
    subtitulo:
      "Preencha abaixo para ver o seu resultado completo (leva 30 segundos).",
    campos: [
      { id: "nomeResp", label: "Seu nome", type: "text", required: true, autocomplete: "name", placeholder: "Como podemos te chamar?" },
      { id: "whatsapp", label: "Seu WhatsApp (com DDD)", type: "tel", required: true, autocomplete: "tel", placeholder: "(11) 99999-9999", mask: "phone" },
      { id: "email", label: "Seu e-mail", type: "email", required: true, autocomplete: "email", placeholder: "voce@email.com" },
    ],
    cta: "Ver meu diagnóstico",
    privacidade: "Seus dados ficam seguros e a conversa é entre nós. Nada de spam.",
  },
};
