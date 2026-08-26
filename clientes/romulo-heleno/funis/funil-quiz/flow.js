/* ============================================================
   FLOW. Toda a copy do quiz vive aqui.
   Cliente: Rômulo Heleno · Mentoria Cabelo de Segunda (técnica de mecha)
   Índice: IIM, Índice de Improviso na Mecha.
   Estrutura: blueprint "estrutura invisível" da Simple, na versão fechada no
   funil da Luana Isse (9 passos SPIN, as 2 porteiras no fim, índice só nas
   perguntas de diagnóstico, resultado nomeado por pilar).
   Padrão de escrita: nunca usar travessões. Sem emoji.
   LINGUAGEM NEUTRA EM GÊNERO: o público é majoritariamente feminino, mas tem
   homens na cadeira. Nenhum adjetivo pode concordar com quem lê, e nada de
   "cabeleireira(o)" com parênteses no meio da frase. Ao escrever opção nova,
   leia em voz alta como homem e como mulher: se soar errado numa das duas,
   reescreva.
   ============================================================ */
window.FLOW = {
  config: {
    storeKey: "romulo_heleno_quiz",
    frente: "Diagnóstico da Mecha",
    diagnosticoUrl: "diagnostico.html",
    indice: { sigla: "IIM", nome: "Índice de Improviso na Mecha" },
  },

  marca: {
    nome: "Rômulo Heleno",
    expert: "Rômulo Heleno",
    tagline: "Método Cabelo de Segunda",
    instagram: "",
    // WhatsApp comercial, só dígitos, formato internacional. (51) 99799-0520.
    whatsapp: "5551997990520",
    /* A mensagem leva o RESULTADO NOMEADO, não só o nome: quem atende abre a
       conversa já sabendo o diagnóstico. Placeholders: {nome} {resultado}
       {indice} {faixa} {pilar}. */
    whatsappMsg: "Oi, Rômulo! Sou {nome}. Fiz o Diagnóstico da Mecha e o meu resultado foi {resultado}, com IIM de {indice} (improviso {faixa}) concentrado em {pilar}. Quero falar sobre a sessão estratégica.",
  },

  /* Resultado nomeado por pilar. É o que vai no WhatsApp, na planilha e no
     topo do relatório. Escrito na tese do projeto: o problema não é técnica,
     é método. Nenhum deles concorda em gênero com quem lê. */
  resultados: {
    Leitura:        "Refém da tonalidade",
    Execução:       "Mão boa, método nenhum",
    Adaptação:      "Uma receita para todo tipo de cabelo",
    Posicionamento: "Trabalho de especialista, preço de iniciante",
  },

  hero: {
    titulo: "Existe um motivo para a sua mecha sair diferente a cada cliente",
    subtitulo: "Responda e descubra o seu Índice de Improviso na Mecha, o quanto do seu resultado ainda depende de sorte em vez de método, e onde exatamente isso trava a sua técnica e o seu ticket.",
    tempo: "Leva cerca de 2 minutos e o resultado é seu na hora",
  },

  /* Ordem SPIN. peso 0 a 3 entra no IIM (só nas perguntas de diagnóstico:
     situação, problema, impacto, o que já tentou e perfil). Tempo, objetivo e
     as duas porteiras não pontuam.
     PESOS CALIBRADOS: rodamos as 1024 combinações antes de publicar (o script
     está no README). Amplitude de 20% a 100%, com 45,9% Alto, 53,3% Médio e
     0,8% Baixo. A faixa Baixa é rara de propósito: o quiz não tem alternativa
     de "está tudo certo", porque quem responde já se reconhece no problema.
     Se mexer em qualquer peso, RODE A DISTRIBUIÇÃO DE NOVO. */
  steps: [
    {
      id: "situacao",
      etapa: "Situação",
      pergunta: "Como a mecha entra na sua agenda hoje?",
      options: [
        { value: "nao_faco", label: "Ainda não faço mecha, quero começar do jeito certo", peso: 3,
          report: "ainda não fazer mecha e querer começar do jeito certo" },
        { value: "quando_pedem", label: "Faço quando a cliente pede, não é um atendimento que eu procure", peso: 2,
          report: "só fazer mecha quando a cliente pede, sem procurar esse atendimento" },
        { value: "varia", label: "Faço com regularidade, mas o resultado varia de cliente para cliente", peso: 2,
          report: "fazer mecha com regularidade e ver o resultado variar de cliente para cliente" },
        { value: "carro_chefe", label: "Mecha já é o atendimento que mais me dá retorno", peso: 0,
          report: "já ter na mecha o atendimento que mais te dá retorno" },
      ],
    },
    {
      id: "problema",
      etapa: "Problema",
      pergunta: "O que mais te trava numa mecha?",
      options: [
        { value: "tonalidade", label: "Errar a tonalidade e o resultado sair diferente do que a cliente pediu", peso: 3, pilar: "Leitura",
          report: "o medo de errar a tonalidade e o resultado sair diferente do que a cliente pediu" },
        { value: "aplicacao", label: "A aplicação: folha, textura, timing, divisão de mecha", peso: 2, pilar: "Execução",
          report: "a insegurança na aplicação: folha, textura, timing e divisão de mecha" },
        { value: "tipos", label: "Adaptar a técnica quando o cabelo é diferente do que eu conheço", peso: 2, pilar: "Adaptação",
          report: "a dificuldade de adaptar a técnica quando o cabelo foge do que você já conhece" },
        { value: "ticket", label: "Cobrar como especialista sem me sentir uma referência", peso: 1, pilar: "Posicionamento",
          report: "não se sentir referência o bastante para cobrar como especialista" },
      ],
    },
    {
      id: "tempo",
      etapa: "Há quanto tempo",
      pergunta: "Há quanto tempo isso se repete?",
      options: [
        { value: "recente", label: "Começou nos últimos meses", report: "alguns meses" },
        { value: "ano", label: "Mais de um ano", report: "mais de um ano" },
        { value: "anos", label: "Vários anos, virou o normal", report: "vários anos" },
        { value: "sempre", label: "Desde que comecei, nunca foi diferente", report: "praticamente desde que você começou" },
      ],
    },
    {
      id: "impacto",
      etapa: "Impacto",
      pergunta: "Se nada mudar, como você imagina os próximos 12 meses?",
      options: [
        { value: "refaz", label: "Continuo refazendo mecha sem cobrar, com prejuízo de tempo e de produto", peso: 3,
          report: "continuar refazendo mecha sem cobrar, com prejuízo de tempo e de produto" },
        { value: "evita", label: "Sigo evitando a mecha e vivendo de procedimento mais simples", peso: 2,
          report: "seguir evitando a mecha e vivendo de procedimento mais simples" },
        { value: "perde_cliente", label: "Perco cliente para quem já ocupa o lugar de especialista", peso: 2,
          report: "perder cliente para quem já ocupa o lugar de especialista" },
        { value: "mesmo_ticket", label: "Continuo com o mesmo ticket, sem conseguir cobrar mais", peso: 1,
          report: "continuar com o mesmo ticket, sem conseguir cobrar mais" },
      ],
    },
    {
      id: "necessidade",
      etapa: "O que já tentou",
      pergunta: "O que você já tentou para destravar isso?",
      options: [
        { value: "curso", label: "Curso online: aprendi bastante e na prática travei", peso: 3,
          report: "fazer curso online, aprender bastante e na hora do atendimento travar" },
        { value: "youtube", label: "Vídeo no YouTube e perfil de referência", peso: 2,
          report: "assistir vídeo no YouTube e seguir perfil de referência" },
        { value: "colegas", label: "Fui aprendendo observando colegas de salão", peso: 1,
          report: "aprender observando colegas de salão" },
        { value: "nada", label: "Nada além da formação inicial", peso: 0,
          report: "não ter tentado nada além da formação inicial" },
      ],
    },
    {
      id: "objetivo",
      etapa: "Objetivo",
      pergunta: "O que você mais quer nos próximos 6 meses?",
      options: [
        { value: "seguranca", label: "Fazer mecha sem medo de errar", report: "fazer mecha sem medo de errar" },
        { value: "ticket", label: "Cobrar mais por atendimento", report: "cobrar mais por atendimento" },
        { value: "referencia", label: "Ser referência em mecha na minha cidade", report: "virar referência em mecha na sua cidade" },
        { value: "agenda", label: "Encher a agenda com o atendimento que paga melhor", report: "encher a agenda com o atendimento que paga melhor" },
      ],
    },
    {
      id: "perfil",
      etapa: "Seu perfil",
      pergunta: "Qual frase mais representa você hoje?",
      options: [
        { value: "ansiedade", label: "Sei fazer, mas cada mecha ainda tem uma dose de ansiedade", peso: 3,
          report: "saber fazer e ainda sentir ansiedade a cada mecha" },
        { value: "sem_explicar", label: "Acerto na maioria das vezes e não sei explicar o que fiz diferente", peso: 2,
          report: "acertar na maioria das vezes sem saber explicar o que fez diferente" },
        { value: "sem_clientela", label: "Tenho técnica e falta clientela que pague por ela", peso: 2,
          report: "ter técnica e faltar clientela que pague por ela" },
        { value: "comecando", label: "Quero entrar na mecha agora, do jeito certo", peso: 1,
          report: "querer entrar na mecha agora, do jeito certo" },
      ],
    },

    /* ---- PORTEIRA 1: momento de atendimento e ticket praticado. ----
       Decisão desta conta, e ela diverge da Luana de propósito: aqui NÃO se
       pergunta faturamento. O documento de estratégia é explícito ("o filtro é
       por intenção e momento, nunca por pergunta crua de renda") e o aprendizado
       do Thiago Menegão diz o mesmo: ticket praticado, nunca faturamento.
       Só UMA alternativa filtra, a de quem não atende cliente e não tem
       previsão de atender, que é exatamente o "para quem não é" do documento.
       Quem atende outros serviços e ainda não faz mecha CONTINUA no funil: é o
       "quero começar do jeito certo", que é ICP. */
    {
      id: "ticket",
      etapa: "Momento",
      pergunta: "Quanto você cobra hoje por uma mecha completa?",
      options: [
        { value: "nao_atendo", label: "Ainda não atendo clientes e não tenho previsão de atender", fora: true },
        { value: "fora_da_tabela", label: "Atendo outros serviços, mecha ainda não entrou na minha tabela" },
        { value: "ate200", label: "Até R$ 200" },
        { value: "200a400", label: "De R$ 200 a R$ 400" },
        { value: "400a700", label: "De R$ 400 a R$ 700" },
        { value: "acima700", label: "Acima de R$ 700" },
      ],
    },

    /* ---- PORTEIRA 2: prontidão. A opção de nutrir enquadra como momento,
       nunca como "algo mais barato". ---- */
    {
      id: "prontidao",
      etapa: "O próximo passo",
      pergunta: "Você busca um acompanhamento que corrija a sua técnica dentro do seu próprio atendimento, mesmo que represente um investimento maior do que um curso gravado?",
      options: [
        { value: "sim", label: "Sim, quero resolver de vez e entendo que é um investimento" },
        { value: "entender", label: "Sim, mas preciso entender melhor como funciona antes" },
        { value: "depois", label: "Ainda não é prioridade para mim agora", nutrir: true },
        { value: "pesquisando", label: "Só estou pesquisando por enquanto", nutrir: true },
      ],
    },
  ],

  captura: {
    titulo: "Seu diagnóstico está pronto.",
    subtitulo: "Deixe o seu contato para acessar o diagnóstico agora e receber uma cópia no WhatsApp.",
    campos: [
      { id: "nomeResp", label: "Seu nome", type: "text", required: true, autocomplete: "name", placeholder: "Como podemos te chamar?" },
      { id: "whatsapp", label: "Seu WhatsApp (com DDD)", type: "tel", required: true, autocomplete: "tel", placeholder: "(11) 99999-9999", mask: "phone" },
      { id: "email", label: "Seu e-mail", type: "email", required: true, autocomplete: "email", placeholder: "voce@email.com" },
      /* Instagram é opcional e fica: no mercado de beleza o perfil é o portfólio,
         e quem atende abre a conversa já tendo visto o trabalho da pessoa. */
      { id: "instagram", label: "Seu @ do Instagram", type: "text", required: false, autocomplete: "off", placeholder: "@seuperfil" },
    ],
    cta: "Ver meu diagnóstico",
    privacidade: "Seus dados são confidenciais e usados apenas para o seu atendimento. Nada de spam.",
  },
};
