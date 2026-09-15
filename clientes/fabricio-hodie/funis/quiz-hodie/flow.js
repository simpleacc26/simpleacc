/* ============================================================
   FLOW · HODIE (Dra. Lailla de Oliveira)
   Toda a copy do quiz vive aqui. Fonte: brandbook HODIE v2.0 +
   Canvas de Produto e Cliente Ideal (pasta do Fabrício no Drive).

   COMPLIANCE (CFM 2.336/2023). Leia contexto/compliance-cfm.md antes de
   editar qualquer linha deste arquivo. Em resumo:
     - Nada de promessa de resultado, de quilos ou de prazo.
     - Nada de "única", "exclusiva", "segredo", "só aqui".
     - Nunca citar nome ou marca de remédio: sempre "classe de medicações".
     - Nada de foto antes e depois nem depoimento de paciente.
     - O índice é uma leitura educativa de sinais, nunca um diagnóstico.
   Padrão de escrita da casa: nunca usar travessão.
   ============================================================ */
window.FLOW = {
  config: {
    storeKey: "hodie_quiz",
    frente: "Quiz IMF",
    diagnosticoUrl: "diagnostico.html",
  },

  marca: {
    nome: "HODIE",
    expert: "Dra. Lailla de Oliveira",
    /* PENDENTE: WhatsApp do consultório, formato internacional só dígitos
       (ex.: 5511999999999). Enquanto estiver vazio, os CTAs avisam na tela
       que o canal ainda não foi configurado, em vez de mandar o lead para um
       número errado. NÃO subir tráfego antes de preencher. */
    whatsapp: "",
    whatsappMsg: "Olá! Sou {nome}, acabei de fazer a leitura do metabolismo da fome no site da HODIE e quero falar sobre a consulta de investigação.",
  },

  /* O índice do cliente. É o ativo que a HODIE leva para o Instagram e para
     o atendimento. Calculado só nas perguntas de diagnóstico (peso). */
  indice: {
    sigla: "IMF",
    nome: "Índice do Metabolismo da Fome",
    explicacao: "Uma leitura de quantos sinais de desregulação do metabolismo da fome aparecem nas suas respostas.",
    ressalva: "Não é diagnóstico. Diagnóstico se faz em consulta, com investigação e exames.",
    faixas: {
      alto: { titulo: "Sinais fortes", resumo: "As suas respostas reúnem a maior parte dos sinais que investigamos em consulta." },
      medio: { titulo: "Sinais moderados", resumo: "As suas respostas reúnem parte dos sinais que investigamos em consulta." },
      baixo: { titulo: "Sinais leves", resumo: "As suas respostas reúnem poucos dos sinais que investigamos em consulta." },
    },
  },

  hero: {
    selo: "Consultório HODIE · Jundiaí-SP e on-line para todo o Brasil",
    titulo: "Sua fome não é fraqueza. É um sintoma.",
    subtitulo: "Responda algumas perguntas e receba o seu Índice do Metabolismo da Fome, com a leitura do que pode estar por trás da sua dificuldade de emagrecer.",
    tempo: "Leva cerca de 2 minutos · Confidencial",
    cta: "Começar a minha leitura",
  },

  steps: [
    {
      id: "situacao",
      etapa: "Situação",
      pergunta: "Qual dessas frases mais parece escrita por você?",
      options: [
        { value: "tudo_certo", label: "Faço tudo certo e mesmo assim não emagreço", peso: 2,
          report: "fazer tudo certo e mesmo assim não ver a balança responder" },
        { value: "sanfona", label: "Eu emagreço, mas sempre volta tudo", peso: 3,
          report: "emagrecer com esforço e ver o peso voltar todas as vezes" },
        { value: "fome_sem_freio", label: "Minha fome não tem freio, principalmente à noite", peso: 3,
          report: "conviver com uma fome que não tem freio, principalmente à noite" },
        { value: "nao_sustento", label: "Eu começo animada e não consigo sustentar", peso: 0,
          report: "começar animada e não conseguir sustentar até o fim" },
      ],
    },
    {
      id: "problema",
      etapa: "Problema",
      pergunta: "No seu dia a dia, o que mais pesa hoje?",
      options: [
        { value: "pensa_comida", label: "Penso em comida o dia inteiro", peso: 3,
          report: "pensar em comida o dia inteiro" },
        { value: "doce", label: "A vontade de doce que aperta à tarde e à noite", peso: 3,
          report: "a vontade de doce que aperta à tarde e à noite" },
        { value: "perde_controle", label: "Seguro o dia todo e perco o controle à noite", peso: 3,
          report: "segurar o dia inteiro e perder o controle à noite" },
        { value: "culpa", label: "A culpa que vem depois de comer", peso: 2,
          report: "a culpa que vem depois de comer" },
        { value: "cansaco", label: "O cansaço e a falta de disposição", peso: 0,
          report: "o cansaço e a falta de disposição" },
      ],
    },
    {
      id: "tempo",
      etapa: "Há quanto tempo",
      pergunta: "Há quanto tempo você convive com isso?",
      options: [
        { value: "ate2", label: "Menos de 2 anos", report: "há menos de dois anos" },
        { value: "2a5", label: "De 2 a 5 anos", report: "há alguns anos" },
        { value: "5a10", label: "De 5 a 10 anos", report: "há muitos anos" },
        { value: "mais10", label: "Mais de 10 anos, virou rotina", report: "há mais de dez anos" },
      ],
    },
    {
      id: "impacto",
      etapa: "Implicação",
      pergunta: "Quando você imagina os próximos anos exatamente assim, o que mais incomoda?",
      options: [
        { value: "saude", label: "A saúde começando a cobrar: exames, joelho, fôlego", peso: 3,
          report: "ver a saúde começando a cobrar" },
        { value: "falhar", label: "Tentar mais uma vez e falhar de novo", peso: 2,
          report: "o receio de tentar mais uma vez e falhar de novo" },
        { value: "energia", label: "Envelhecer sem disposição para o que eu gosto", peso: 2,
          report: "envelhecer sem disposição para o que você gosta" },
        { value: "esconder", label: "Continuar me escondendo em foto, praia e roupa", peso: 0,
          report: "continuar se escondendo em foto, praia e roupa" },
      ],
    },
    {
      id: "necessidade",
      etapa: "O que já tentou",
      pergunta: "O que você já tentou até aqui?",
      options: [
        { value: "exames_normais", label: "Procurei médico e ouvi que meus exames estão normais", peso: 3,
          report: "procurar médico e ouvir que os seus exames estavam normais" },
        { value: "medicacao", label: "Já usei a classe de medicações do momento", peso: 3,
          report: "já ter usado a classe de medicações do momento" },
        { value: "por_conta", label: "Dietas por conta própria, aplicativos, jejum", peso: 2,
          report: "dietas por conta própria, aplicativos e jejum" },
        { value: "nutri", label: "Acompanhamento com nutricionista e plano alimentar", peso: 2,
          report: "acompanhamento com nutricionista e plano alimentar" },
        { value: "treino", label: "Academia e treino, sem a balança acompanhar", peso: 1,
          report: "academia e treino, sem a balança acompanhar" },
      ],
    },
    {
      id: "objetivo",
      etapa: "Objetivo",
      pergunta: "Se desse para escolher uma coisa só, o que você mais quer?",
      options: [
        { value: "tregua", label: "Que essa fome finalmente dê uma trégua",
          report: "que a fome finalmente dê uma trégua" },
        { value: "entender", label: "Entender de uma vez o que trava o meu corpo",
          report: "entender de uma vez o que trava o seu corpo" },
        { value: "ultima_vez", label: "Emagrecer sem precisar recomeçar nunca mais",
          report: "emagrecer sem precisar recomeçar nunca mais" },
        { value: "energia", label: "Ter energia e disposição de volta",
          report: "ter energia e disposição de volta" },
      ],
    },
    {
      id: "perfil",
      etapa: "Seu perfil",
      pergunta: "Sobre a classe de medicações usada no tratamento da obesidade, onde você está hoje?",
      options: [
        { value: "quer_com_medico", label: "Quero usar, mas só com médica acompanhando de perto", peso: 2,
          report: "querer usar com acompanhamento médico de perto" },
        { value: "usou_reganhou", label: "Já usei, parei e o peso voltou", peso: 3,
          report: "já ter usado, parado e visto o peso voltar" },
        { value: "nao_pode", label: "Não posso, não me adaptei ou não quero usar", peso: 2,
          report: "não poder ou não querer usar a medicação" },
        { value: "nunca_usou", label: "Nunca usei e não sei se seria para mim", peso: 0,
          report: "nunca ter usado e não saber se seria para você" },
      ],
    },

    /* ---- PORTEIRA 1: ICP. O canvas proíbe publicar valor em peça pública
       (a faixa é informada no 1:1, antes do agendamento). Então a porteira de
       porte pergunta pelo HÁBITO de investir em saúde, nunca por faixa de
       preço nem por renda. ---- */
    {
      id: "investimento",
      etapa: "Momento",
      pergunta: "Como você cuida da sua saúde hoje?",
      options: [
        { value: "particular_sempre", label: "Faço acompanhamento particular e invisto nisso com regularidade" },
        { value: "particular_quando_vale", label: "Pago particular quando entendo que vale a pena" },
        { value: "convenio", label: "Uso o convênio e evito pagar particular", nutrir: true },
        { value: "publico", label: "Uso a rede pública", fora: true },
        { value: "parada", label: "Hoje eu não estou cuidando disso", fora: true },
      ],
    },

    /* ---- PORTEIRA 2: prontidão. Mede intenção de investir, não interesse.
       High ticket: a opção de nutrir NÃO ancora em "algo mais barato",
       enquadra como prioridade e momento. ---- */
    {
      id: "prontidao",
      etapa: "O próximo passo",
      pergunta: "Você busca um tratamento médico conduzido, com investigação, exames e acompanhamento próximo, mesmo que represente um investimento maior do que uma consulta avulsa?",
      options: [
        { value: "sim", label: "Sim, quero resolver de vez e entendo que é um investimento" },
        { value: "entender", label: "Sim, mas preciso entender melhor como funciona antes" },
        { value: "depois", label: "Ainda não é prioridade para mim neste momento", nutrir: true },
        { value: "pesquisando", label: "Só estou pesquisando por enquanto", nutrir: true },
      ],
    },
  ],

  captura: {
    titulo: "A sua leitura está pronta.",
    subtitulo: "Para onde enviamos? Deixe o seu WhatsApp e o consultório envia a sua leitura e os próximos passos, sem compromisso.",
    campos: [
      { id: "nomeResp", label: "Seu nome", type: "text", required: true, autocomplete: "name", placeholder: "Como podemos te chamar?" },
      { id: "whatsapp", label: "Seu WhatsApp (com DDD)", type: "tel", required: true, autocomplete: "tel", placeholder: "(11) 99999-9999", mask: "phone" },
      { id: "email", label: "Seu e-mail", type: "email", required: true, autocomplete: "email", placeholder: "voce@email.com" },
    ],
    cta: "Ver a minha leitura",
    privacidade: "Seus dados são confidenciais e usados apenas para o seu atendimento. Sigilo médico. Nada de spam.",
  },
};
