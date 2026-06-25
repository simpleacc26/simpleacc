/* ============================================================
   FLOW. Funil de Hipnose · Pâmella Mello
   Toda a copy do quiz e do relatório vive aqui.
   Conteúdo da ESTRATÉGIA aprovada pela cliente. Para editar
   perguntas/textos, mexa só neste arquivo.
   Padrão de escrita: nunca usar travessões (traço longo).
   ============================================================ */
window.FLOW = {
  config: {
    storeKey: "pamella_funil_hipnose",
    frente: "Hipnose",
    diagnosticoUrl: "diagnostico.html",
  },

  marca: {
    nome: "Pâmella Mello",
    expert: "Pâmella Mello",
    // Número no formato internacional, só dígitos
    whatsapp: "5531993196471",
    // O {nome} é trocado pelo primeiro nome de quem respondeu
    whatsappMsg:
      "Oi! Sou {nome}, acabei de fazer a leitura emocional no site e quero falar sobre a Sessão de Avaliação.",
  },

  hero: {
    selo: "Hipnose Clínica · Leis Biológicas · Neurociência",
    titulo: "Descubra a origem emocional do que te trava e o caminho para resolver de vez.",
    subtitulo:
      "Responda algumas perguntas rápidas e receba uma leitura personalizada do seu cenário emocional e do acompanhamento que faz sentido pra você.",
    tempo: "Leva ~2 minutos · 100% confidencial",
    cta: "Começar",
  },

  /* Ordem SPIN: baixa fricção primeiro, qualificação (perfil + geografia +
     prontidão) por último. Cada opção tem 'report' = frase usada no relatório. */
  steps: [
    {
      id: "situacao",
      etapa: "Situação",
      pergunta: "Como você descreveria seu momento emocional hoje?",
      options: [
        { value: "automatico", label: "Sobrecarregado(a), funcionando no automático",
          report: "viver sobrecarregado(a), funcionando no automático" },
        { value: "ansiedade", label: "Ansioso(a) a maior parte do tempo",
          report: "conviver com a ansiedade na maior parte do tempo" },
        { value: "vazio", label: 'Sinto um vazio, mesmo quando tudo "parece bem"',
          report: "sentir um vazio mesmo quando tudo parece bem" },
        { value: "padroes", label: "Travado(a), repetindo os mesmos padrões há tempos",
          report: "estar travado(a), repetindo os mesmos padrões" },
      ],
    },
    {
      id: "problema",
      etapa: "Problema",
      pergunta: "O que mais pesa no seu dia a dia?",
      options: [
        { value: "mente", label: "Não consigo desligar a mente, não descanso de verdade",
          report: "não conseguir desligar a mente e não descansar de verdade" },
        { value: "cobranca", label: "Me cobro demais e nunca está bom o suficiente",
          report: "se cobrar demais, sentindo que nunca está bom o suficiente" },
        { value: "sabotagem", label: "Sabotei coisas importantes pra mim sem entender por quê",
          report: "sabotar coisas importantes sem entender por quê" },
        { value: "incompreendido", label: "Sinto que ninguém entende de verdade o que eu sinto",
          report: "sentir que ninguém entende de verdade o que você sente" },
      ],
    },
    {
      id: "tempo",
      etapa: "Há quanto tempo",
      pergunta: "Há quanto tempo você convive com isso?",
      options: [
        { value: "recente", label: "Começou recentemente (últimos meses)", report: "alguns meses" },
        { value: "ano", label: "Mais de 1 ano", report: "mais de um ano" },
        { value: "anos", label: "Vários anos, virou parte de como eu funciono", report: "vários anos" },
        { value: "sempre", label: 'Desde sempre, parece que é "do meu jeito"', report: "praticamente a vida toda" },
      ],
    },
    {
      id: "impacto",
      etapa: "Impacto",
      pergunta: "Como isso já afetou o que importa pra você?",
      options: [
        { value: "relacionamentos", label: "Meus relacionamentos", report: "os seus relacionamentos" },
        { value: "trabalho", label: "Meu trabalho e minha renda", report: "o seu trabalho e a sua renda" },
        { value: "saude", label: "Minha saúde (sono, corpo, energia)", report: "a sua saúde, no sono, no corpo e na energia" },
        { value: "tudo", label: "Tudo isso ao mesmo tempo", report: "tudo isso ao mesmo tempo" },
      ],
    },
    {
      id: "necessidade",
      etapa: "O que já tentou",
      pergunta: "O que você já tentou para melhorar?",
      options: [
        { value: "terapia", label: "Terapia convencional, que ajudou mas não resolveu a raiz",
          report: "fazer terapia convencional, que ajudou mas não resolveu a raiz" },
        { value: "medicacao", label: "Medicação", report: "recorrer à medicação" },
        { value: "autoajuda", label: "Conteúdo, autoajuda, força de vontade",
          report: "tentar conteúdo, autoajuda e força de vontade" },
        { value: "nada", label: "Ainda não tentei nada estruturado",
          report: "ainda não ter tentado nada estruturado" },
      ],
    },
    {
      id: "objetivo",
      etapa: "Objetivo",
      pergunta: "Se você pudesse mudar uma coisa nos próximos meses, seria:",
      options: [
        { value: "paz", label: "Parar de viver em estado de alerta e ter paz",
          report: "parar de viver em estado de alerta e ter paz" },
        { value: "padroes", label: "Quebrar os padrões que eu repito",
          report: "quebrar os padrões que se repetem" },
        { value: "entender", label: "Entender de uma vez por que eu sinto o que sinto",
          report: "entender de uma vez por que você sente o que sente" },
        { value: "leveza", label: "Voltar a sentir prazer e leveza na vida",
          report: "voltar a sentir prazer e leveza na vida" },
      ],
    },
    {
      id: "perfil",
      etapa: "Para quem é",
      pergunta: "Este atendimento é para:",
      options: [
        { value: "mim", label: "Mim" },
        { value: "filho", label: "Meu filho(a) ou adolescente" },
        { value: "parceiro", label: "Meu parceiro(a) ou familiar" },
        { value: "naosei", label: "Ainda não sei" },
      ],
    },
    {
      id: "geografia",
      etapa: "Onde você está",
      pergunta: "De onde você é? Atendemos Contagem/BH presencialmente e o Brasil todo no online.",
      options: [
        { value: "bh", label: "Contagem, Belo Horizonte e região (posso ir presencialmente)" },
        { value: "mg", label: "Em Minas, mas fora da região metropolitana" },
        { value: "online", label: "Em outro estado (faria por atendimento online)" },
        { value: "fora", label: "Fora do Brasil", foraDeArea: true },
      ],
    },
    {
      id: "prontidao",
      etapa: "O próximo passo",
      pergunta:
        "Você busca um processo terapêutico estruturado e definitivo, mesmo que represente um investimento maior do que uma sessão avulsa?",
      options: [
        { value: "sim", label: "Sim, quero resolver de vez e entendo que isso é um investimento" },
        { value: "entender", label: "Sim, mas preciso entender melhor como funciona antes" },
        { value: "pontual", label: "No momento, busco algo mais pontual ou de menor custo", nutrir: true },
        { value: "pesquisando", label: "Só estou pesquisando por enquanto", nutrir: true },
      ],
    },
  ],

  captura: {
    titulo: "Sua leitura personalizada está pronta. 💛",
    subtitulo:
      "Pra onde enviamos? Deixe seu WhatsApp que a equipe da Pâmella te manda a sua leitura e os próximos passos, sem compromisso.",
    campos: [
      { id: "nomeResp", label: "Seu nome", type: "text", required: true, autocomplete: "name", placeholder: "Como podemos te chamar?" },
      { id: "whatsapp", label: "Seu WhatsApp (com DDD)", type: "tel", required: true, autocomplete: "tel", placeholder: "(31) 99999-9999", mask: "phone" },
      { id: "email", label: "Seu e-mail", type: "email", required: false, autocomplete: "email", placeholder: "voce@email.com" },
    ],
    cta: "Ver minha leitura personalizada",
    privacidade: "🔒 Seus dados são confidenciais e usados apenas para o seu atendimento. Nada de spam.",
  },
};
