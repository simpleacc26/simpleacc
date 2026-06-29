/* ============================================================
   FLOW. Toda a copy do quiz e do relatório vive aqui.
   É O ÚNICO arquivo que muda de cliente pra cliente (junto com a
   paleta no styles.css e os depoimentos). Preencha com a ESTRATÉGIA
   aprovada pelo cliente.
   Padrão de escrita: NUNCA usar travessões (traço longo).
   ============================================================ */
window.FLOW = {
  config: {
    storeKey: "funil_quiz_CLIENTE",   // chave única do sessionStorage
    frente: "Frente",                 // rótulo do projeto (vai pro lead)
    diagnosticoUrl: "diagnostico.html",
  },

  marca: {
    nome: "__MARCA__",
    expert: "__EXPERT__",
    // Número internacional, só dígitos (ex: 5531999999999)
    whatsapp: "55DDDNUMERO",
    // {nome} é trocado pelo primeiro nome de quem respondeu
    whatsappMsg: "Oi! Sou {nome}, acabei de fazer o quiz no site e quero falar sobre __OFERTA__.",
  },

  hero: {
    selo: "__SELO__",                 // ex: "Especialidade · Cidade e online"
    titulo: "__TITULO_FORTE__",       // promessa central
    subtitulo: "__SUBTITULO__",       // o que a pessoa recebe ao responder
    tempo: "Leva ~2 minutos · 100% confidencial",
    cta: "Começar",
  },

  /* Ordem SPIN: baixa fricção primeiro; qualificação por último
     (para quem é · onde está · prontidão). Cada opção pode ter:
       - report: frase usada no relatório (interpolada em diagnostico.js)
       - foraDeArea: true  -> lead fora da área de atendimento
       - nutrir: true      -> lead de baixa prontidão (CTA mais suave)
     O motor (app.js) faz auto-avanço ao escolher e mostra a barra. */
  steps: [
    {
      id: "situacao",
      etapa: "Situação",
      pergunta: "__PERGUNTA_1__",
      options: [
        { value: "a", label: "__OPCAO__", report: "__frase pro relatório__" },
        { value: "b", label: "__OPCAO__", report: "__frase pro relatório__" },
        { value: "c", label: "__OPCAO__", report: "__frase pro relatório__" },
        { value: "d", label: "__OPCAO__", report: "__frase pro relatório__" },
      ],
    },

    // ... repita os passos SPIN: problema, tempo, impacto, tentativas, objetivo ...

    {
      id: "perfil",
      etapa: "Para quem é",
      pergunta: "Este atendimento é para:",
      options: [
        { value: "mim", label: "Mim" },
        { value: "outro", label: "Outra pessoa (filho, parceiro, familiar)" },
      ],
    },
    {
      id: "geografia",
      etapa: "Onde você está",
      pergunta: "De onde você é? Atendemos __CIDADE__ presencialmente e o Brasil todo no online.",
      options: [
        { value: "local", label: "__CIDADE__ e região (posso ir presencialmente)" },
        { value: "online", label: "Em outro estado (faria por atendimento online)" },
        { value: "fora", label: "Fora do Brasil", foraDeArea: true },
      ],
    },
    {
      id: "prontidao",
      etapa: "O próximo passo",
      pergunta: "Você busca um processo estruturado e definitivo, mesmo que seja um investimento maior do que algo avulso?",
      options: [
        { value: "sim", label: "Sim, quero resolver de vez e entendo que é um investimento" },
        { value: "entender", label: "Sim, mas preciso entender melhor como funciona antes" },
        { value: "pontual", label: "No momento, busco algo mais pontual ou de menor custo", nutrir: true },
        { value: "pesquisando", label: "Só estou pesquisando por enquanto", nutrir: true },
      ],
    },
  ],

  captura: {
    titulo: "__TITULO_CAPTURA__ 💛",
    subtitulo: "Pra onde enviamos? Deixe seu WhatsApp que a equipe te manda o resultado e os próximos passos, sem compromisso.",
    campos: [
      { id: "nomeResp", label: "Seu nome", type: "text", required: true, autocomplete: "name", placeholder: "Como podemos te chamar?" },
      { id: "whatsapp", label: "Seu WhatsApp (com DDD)", type: "tel", required: true, autocomplete: "tel", placeholder: "(31) 99999-9999", mask: "phone" },
      { id: "email", label: "Seu e-mail", type: "email", required: true, autocomplete: "email", placeholder: "voce@email.com" },
    ],
    cta: "Ver meu resultado personalizado",
    privacidade: "🔒 Seus dados são confidenciais e usados apenas para o seu atendimento. Nada de spam.",
  },
};
