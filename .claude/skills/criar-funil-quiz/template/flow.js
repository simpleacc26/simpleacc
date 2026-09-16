/* ============================================================
   FLOW. Toda a copy do quiz e do relatório vive aqui.
   É O ÚNICO arquivo que muda de cliente pra cliente (junto com a
   paleta no styles.css e os depoimentos). Preencha com a ESTRATÉGIA
   aprovada pelo cliente.

   Estrutura (espelhada no funil de quiz validado da casa):
     hero -> SPIN (situação, problema, tempo, impacto, o que já tentou,
     objetivo, perfil) -> 2 perguntas-porteira (faturamento + prontidão)
     -> captura (nome, whatsapp, email).
   A copy abaixo é NEUTRA (genérica de negócio). Reescreva 100% dela para
   o nicho do cliente, INCLUSIVE labels e frases de report.
   Padrão de escrita: NUNCA usar travessões (traço longo).
   ============================================================ */
window.FLOW = {
  config: {
    storeKey: "funil_quiz",           // troque por algo único do cliente (ex.: "clinica_x_quiz")
    frente: "Funil",                  // rótulo do projeto (vai pro lead)
    diagnosticoUrl: "diagnostico.html",
  },

  marca: {
    nome: "__MARCA__",
    expert: "__EXPERT__",
    // WhatsApp do cliente, formato internacional só dígitos (ex.: 5531999999999)
    whatsapp: "",
    // {nome} é trocado pelo primeiro nome de quem respondeu
    whatsappMsg: "Oi! Sou {nome}, acabei de fazer o diagnóstico no site e quero falar sobre o próximo passo.",
  },

  hero: {
    selo: "__SELO__",                 // ex: "Especialidade · Cidade e online"
    titulo: "__TITULO_FORTE__",       // promessa central (no nível do negócio, não de uma sub-persona)
    subtitulo: "__SUBTITULO__",       // o que a pessoa recebe ao responder
    tempo: "Leva ~2 minutos · 100% confidencial",
    cta: "Começar meu diagnóstico",
  },

  /* Ordem SPIN: baixa fricção primeiro, qualificação por último.
     Cada opção pode ter:
       - report: frase usada no diagnóstico (interpolada em diagnostico.js)
       - nutrir: true  -> lead de baixa prontidão/porte (CTA mais suave)
     As 2 últimas perguntas (faturamento + prontidão) são as PORTEIRAS que
     definem o corte qualificado vs nutrir. As demais alimentam o diagnóstico,
     não pontuam. O motor (app.js) faz auto-avanço ao escolher e mostra a barra. */
  steps: [
    {
      id: "situacao",
      etapa: "Situação",
      pergunta: "Como está o momento do seu negócio hoje?",
      options: [
        { value: "cheio_sem_lucro", label: "Cheio de trabalho, mas o lucro não corresponde",
          report: "ter muito trabalho sem o lucro correspondente" },
        { value: "travou", label: "Cresceu, mas travou num patamar",
          report: "ver o crescimento travado num mesmo patamar" },
        { value: "sobrecarregado", label: "Funciona, mas depende de mim para tudo",
          report: "tocar um negócio que depende de você para tudo" },
        { value: "instavel", label: "Um mês bom, outro fraco, sem previsibilidade",
          report: "conviver com meses bons e fracos, sem previsibilidade" },
      ],
    },
    {
      id: "problema",
      etapa: "Problema",
      pergunta: "O que mais trava o crescimento neste momento?",
      options: [
        { value: "poucos_clientes", label: "Poucos clientes novos entrando",
          report: "a falta de clientes novos entrando" },
        { value: "vende_mal", label: "Atende bem, mas vende mal",
          report: "um negócio que atende bem mas vende mal" },
        { value: "sem_tempo", label: "Falta tempo para pensar no negócio",
          report: "a falta de tempo para pensar no negócio" },
        { value: "sem_processo", label: "Tudo no improviso, sem processo",
          report: "tocar tudo no improviso, sem processo" },
      ],
    },
    {
      id: "tempo",
      etapa: "Há quanto tempo",
      pergunta: "Há quanto tempo o crescimento está travado nesse ponto?",
      options: [
        { value: "recente", label: "Começou nos últimos meses", report: "alguns meses" },
        { value: "ano", label: "Mais de 1 ano", report: "mais de um ano" },
        { value: "anos", label: "Vários anos, virou o normal", report: "vários anos" },
        { value: "sempre", label: "Desde que comecei, nunca destravou de verdade", report: "praticamente desde que você começou" },
      ],
    },
    {
      id: "impacto",
      etapa: "Impacto",
      pergunta: "Se nada mudar, como fica o seu negócio daqui a 12 meses?",
      options: [
        { value: "igual", label: "Igual: trabalhando muito para o mesmo resultado",
          report: "seguir trabalhando muito para o mesmo resultado" },
        { value: "pior", label: "Pior: eu cada vez mais sobrecarregado(a)",
          report: "ficar cada vez mais sobrecarregado(a)" },
        { value: "incerto", label: "Não sei, e isso me incomoda",
          report: "a incerteza sobre onde o negócio vai chegar" },
        { value: "custo_pessoal", label: "Vou crescer, mas às custas da minha vida pessoal",
          report: "crescer às custas da sua vida pessoal" },
      ],
    },
    {
      id: "necessidade",
      etapa: "O que já tentou",
      pergunta: "O que você já tentou para destravar o crescimento?",
      options: [
        { value: "trafego", label: "Tráfego pago ou agência de marketing",
          report: "investir em tráfego pago ou agência de marketing" },
        { value: "cursos", label: "Cursos e treinamentos para mim ou para a equipe",
          report: "fazer cursos e treinamentos para você ou a equipe" },
        { value: "contratar", label: "Contratar mais gente",
          report: "contratar mais gente" },
        { value: "nada", label: "Ainda não tentei nada estruturado",
          report: "ainda não ter tentado nada estruturado" },
      ],
    },
    {
      id: "objetivo",
      etapa: "Objetivo",
      pergunta: "O que você mais quer nos próximos 6 meses?",
      options: [
        { value: "lucro", label: "Aumentar o faturamento com mais lucro",
          report: "aumentar o faturamento com mais lucro" },
        { value: "sem_trabalhar_mais", label: "Crescer sem trabalhar ainda mais",
          report: "crescer sem trabalhar ainda mais" },
        { value: "previsibilidade", label: "Ter previsibilidade de clientes e receita",
          report: "ter previsibilidade de clientes e receita" },
        { value: "equipe", label: "Uma equipe que funciona sem depender de mim",
          report: "uma equipe que funciona sem depender de você" },
      ],
    },
    {
      id: "perfil",
      etapa: "Seu perfil",
      pergunta: "Como você toca o seu negócio hoje?",
      options: [
        { value: "operacional", label: "Sou dono(a) e ainda atuo no operacional" },
        { value: "com_equipe", label: "Sou dono(a) e já tenho equipe" },
        { value: "autonomo", label: "Sou autônomo(a) / profissional liberal" },
        { value: "outro", label: "Outro" },
      ],
    },

    /* ---- PORTEIRA 1: faturamento. Define o corte de porte. Ajuste as faixas
       ao ticket do cliente. As faixas menores levam nutrir: true. ---- */
    {
      id: "faturamento",
      etapa: "Momento do negócio",
      pergunta: "Qual é o faturamento mensal do seu negócio hoje?",
      options: [
        { value: "ate15", label: "Até R$ 15 mil", nutrir: true },
        { value: "15a30", label: "De R$ 15 a 30 mil", nutrir: true },
        { value: "30a80", label: "De R$ 30 a 80 mil" },
        { value: "acima80", label: "Acima de R$ 80 mil" },
      ],
    },

    /* ---- PORTEIRA 2: prontidão. Vendendo high ticket, a opção de nutrir NÃO
       ancora em "algo mais barato/pontual": enquadra como "ainda não é
       prioridade investir agora". ---- */
    {
      id: "prontidao",
      etapa: "O próximo passo",
      pergunta: "Você busca um processo estruturado para destravar o crescimento, mesmo que represente um investimento maior do que um curso avulso?",
      options: [
        { value: "sim", label: "Sim, quero resolver de vez e entendo que é um investimento" },
        { value: "entender", label: "Sim, mas preciso entender melhor como funciona antes" },
        { value: "pontual", label: "No momento, ainda não é prioridade investir para resolver isso", nutrir: true },
        { value: "pesquisando", label: "Só estou pesquisando por enquanto", nutrir: true },
      ],
    },
  ],

  captura: {
    titulo: "Seu diagnóstico personalizado está pronto.",
    subtitulo: "Pra onde enviamos? Deixe seu WhatsApp que a equipe te manda o diagnóstico e os próximos passos, sem compromisso.",
    campos: [
      { id: "nomeResp", label: "Seu nome", type: "text", required: true, autocomplete: "name", placeholder: "Como podemos te chamar?" },
      { id: "whatsapp", label: "Seu WhatsApp (com DDD)", type: "tel", required: true, autocomplete: "tel", placeholder: "(31) 99999-9999", mask: "phone" },
      { id: "email", label: "Seu e-mail", type: "email", required: true, autocomplete: "email", placeholder: "voce@email.com" },
    ],
    cta: "Ver meu diagnóstico personalizado",
    privacidade: "🔒 Seus dados são confidenciais e usados apenas para o seu atendimento. Nada de spam.",
  },
};
