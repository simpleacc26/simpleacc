/* ============================================================
   FLOW · Funil de Quiz · Stella Grützmann (Consultoria de Imagem)
   Copy da estratégia aprovada. Sem travessão.
   ============================================================ */
window.FLOW = {
  config: {
    storeKey: "stella_funil_imagem",
    frente: "Consultoria de Imagem",
    diagnosticoUrl: "diagnostico.html",
  },

  marca: {
    nome: "Stella Grützmann",
    expert: "Stella Grützmann",
    // WhatsApp da Stella (+55 46 9938-7066). Formato internacional, só dígitos.
    whatsapp: "5546999387066",
    whatsappMsg: "Oi Stella! Sou {nome}, acabei de fazer a leitura de imagem no seu site e quero falar sobre a avaliação estratégica.",
  },

  hero: {
    selo: "Consultoria de imagem & estilo · Atendimento online",
    titulo: "Descubra o que a sua imagem está comunicando, e o que muda a percepção sobre você.",
    subtitulo: "Responda 8 perguntas rápidas e receba uma leitura personalizada do que hoje enfraquece a sua autoridade visual, e o primeiro passo para alinhar imagem e competência.",
    tempo: "Leva ~2 minutos · 100% confidencial",
    cta: "Começar",
  },

  steps: [
    {
      id: "situacao",
      etapa: "Situação",
      pergunta: "Como você descreveria a sua relação com a própria imagem hoje?",
      options: [
        { value: "nao-resolvida", label: "Invisto em roupa, mas nunca sinto que estou bem resolvida", report: "investir em roupa e ainda assim não se sentir bem resolvida" },
        { value: "automatico", label: "Me visto no automático, sempre nas mesmas peças", report: "se vestir no automático, sempre nas mesmas peças" },
        { value: "falta-estrategia", label: "Tenho bom gosto, mas falta estratégia e intenção", report: "ter bom gosto, mas sentir que falta estratégia e intenção" },
        { value: "nao-acompanha", label: "Minha imagem não acompanha o meu momento profissional", report: "sentir que a imagem não acompanha o seu momento profissional" },
      ],
    },
    {
      id: "problema",
      etapa: "Problema",
      pergunta: "O que mais te incomoda na hora de se vestir?",
      options: [
        { value: "nao-combina", label: "Tenho muita roupa e não sei combinar o que já tenho", report: "ter muita roupa e não saber combinar o que já tem" },
        { value: "paradas", label: "Compro peças que acabam paradas no armário", report: "comprar peças que acabam paradas no armário" },
        { value: "tempo", label: "Perco tempo e energia decidindo o que vestir todo dia", report: "perder tempo e energia decidindo o que vestir todo dia" },
        { value: "eventos", label: "Nunca sei o que usar em reuniões e eventos importantes", report: "nunca saber o que usar em reuniões e eventos importantes" },
      ],
    },
    {
      id: "implicacao",
      etapa: "Implicação",
      pergunta: "Como isso aparece na sua vida profissional?",
      options: [
        { value: "menos-autoridade", label: "Sinto que passo menos autoridade do que realmente tenho", report: "passar menos autoridade do que você realmente tem" },
        { value: "menos-preparada", label: "Já vi gente menos preparada ser levada mais a sério", report: "ver gente menos preparada ser levada mais a sério que você" },
        { value: "insegura", label: "Fico insegura em reuniões, eventos e fotos", report: "ficar insegura em reuniões, eventos e fotos" },
        { value: "duvida", label: "Minha imagem gera dúvida no cliente antes de eu falar", report: "a sua imagem gerar dúvida no cliente antes de você falar" },
      ],
    },
    {
      id: "custo",
      etapa: "O custo de não agir",
      pergunta: "Se nada mudar nos próximos meses, o que isso representa?",
      options: [
        { value: "subestimada", label: "Continuar sendo subestimada pela imagem", report: "continuar sendo subestimada pela sua imagem" },
        { value: "oportunidades", label: "Perder oportunidades para quem se posiciona melhor", report: "perder oportunidades para quem se posiciona melhor" },
        { value: "gastando", label: "Seguir insegura e gastando com roupa sem resolver", report: "seguir insegura e gastando com roupa sem resolver" },
        { value: "tudo", label: "Tudo isso ao mesmo tempo", report: "tudo isso ao mesmo tempo" },
      ],
    },
    {
      id: "tentativas",
      etapa: "O que já tentou",
      pergunta: "O que você já tentou para resolver?",
      options: [
        { value: "mais-roupa", label: "Comprei mais roupa, mas o problema continuou", report: "comprar mais roupa, sem que o problema mudasse" },
        { value: "dicas", label: "Segui dicas de moda e influenciadoras", report: "seguir dicas de moda e de influenciadoras" },
        { value: "ajuda", label: "Pedi ajuda a amigas ou a vendedoras", report: "pedir ajuda a amigas ou a vendedoras" },
        { value: "nada", label: "Ainda não tentei nada estruturado", report: "ainda não ter tentado nada estruturado" },
      ],
    },
    {
      id: "objetivo",
      etapa: "Objetivo",
      pergunta: "O que você mais quer conquistar com a sua imagem?",
      options: [
        { value: "autoridade", label: "Ser vista como a autoridade que eu já sou", report: "ser vista como a autoridade que você já é" },
        { value: "praticidade", label: "Ter segurança e praticidade para me vestir todo dia", report: "ter segurança e praticidade para se vestir todo dia" },
        { value: "criterio", label: "Aprender a comprar e combinar com critério", report: "aprender a comprar e combinar com critério" },
        { value: "presenca", label: "Presença e confiança em reuniões e eventos", report: "ter presença e confiança em reuniões e eventos" },
      ],
    },
    {
      id: "perfil",
      etapa: "Para quem é",
      pergunta: "Qual cenário descreve melhor você hoje?",
      options: [
        { value: "saude", label: "Profissional da saúde (médica, dentista, dermatologista)" },
        { value: "juridico", label: "Advogada, executiva ou gestora" },
        { value: "empresaria", label: "Empresária ou dona do próprio negócio" },
        { value: "liberal", label: "Profissional liberal em outra área" },
      ],
    },
    {
      id: "prontidao",
      etapa: "O próximo passo",
      pergunta: "Se existisse um processo que alinha a sua imagem à sua competência, com estratégia e não só dicas, você investiria nele nos próximos 30 dias?",
      options: [
        { value: "sim", label: "Sim, se eu entender que é o caminho certo para mim" },
        { value: "entender", label: "Talvez, dependendo do formato e do valor" },
        { value: "pontual", label: "Prefiro esperar mais um tempo", nutrir: true },
        { value: "pesquisando", label: "Só estou pesquisando por enquanto", nutrir: true },
      ],
    },
  ],

  captura: {
    titulo: "Sua leitura personalizada está pronta.",
    subtitulo: "Pra onde enviamos? Deixe seu WhatsApp que a Stella te envia a sua leitura de imagem e o próximo passo, sem compromisso.",
    campos: [
      { id: "nomeResp", label: "Seu nome", type: "text", required: true, autocomplete: "name", placeholder: "Como podemos te chamar?" },
      { id: "whatsapp", label: "Seu WhatsApp (com DDD)", type: "tel", required: true, autocomplete: "tel", placeholder: "(41) 99999-9999", mask: "phone" },
      { id: "email", label: "Seu e-mail", type: "email", required: true, autocomplete: "email", placeholder: "voce@email.com" },
    ],
    cta: "Ver minha leitura personalizada",
    privacidade: "🔒 Seus dados são confidenciais e usados apenas para o seu atendimento. Nada de spam.",
  },
};
