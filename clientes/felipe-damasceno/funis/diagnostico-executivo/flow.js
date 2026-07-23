/* ============================================================
   FLOW. Diagnóstico Executivo (IDE) · Felipe Damasceno
   Toda a copy do quiz e do relatório vive aqui.
   Para editar perguntas/textos, mexa só neste arquivo.
   Estrutura invisível espelhada do quiz de alta conversão da Pâmella
   (SPIN de 9 passos, qualificação no fim, loading, CTAs distribuídos).
   Padrão de escrita: nunca usar travessões (traço longo).
   ============================================================ */
window.FLOW = {
  config: {
    storeKey: "felipe_diagnostico_executivo",
    frente: "Governo Empresarial",
    funil: "governo-empresarial",
    diagnosticoUrl: "diagnostico.html",
  },

  marca: {
    nome: "Felipe Damasceno",
    expert: "Felipe Damasceno",
    // TODO: número do WhatsApp do Felipe, formato internacional, só dígitos (ex: 5531999999999)
    whatsapp: "5500000000000",
    // Texto que abre no WhatsApp (o {nome} é trocado pelo nome do lead)
    whatsappMsg: "Oi! Sou {nome}, acabei de fazer o Diagnóstico Executivo e quero entender como reduzir a dependência da minha empresa.",
  },

  hero: {
    selo: "Governo Empresarial · Método Potência Empresarial",
    titulo: "A sua empresa cresceu. E hoje quem trabalha mais é você.",
    subtitulo:
      "Descubra o seu IDE, o Índice de Dependência Empresarial, e o caminho para governar a sua empresa através de pessoas, processos e indicadores, em vez de continuar sendo o gargalo dela.",
    tempo: "Leva ~2 minutos · 9 perguntas rápidas",
    cta: "Fazer meu Diagnóstico Executivo",
  },

  /* Ordem SPIN: baixa fricção primeiro, qualificação (faturamento + prontidão)
     por último. Em 'report' fica a frase usada no relatório de diagnóstico.
     'peso' alimenta o cálculo do IDE (3 = mais dependente, 0 = menos).
     tempo e prontidao não têm peso: não entram no IDE, só na leitura/qualificação. */
  steps: [
    {
      id: "situacao",
      etapa: "Situação",
      pergunta: "Como você definiria o seu papel na empresa hoje?",
      options: [
        { value: "operacao", label: "Sou o dono e ainda vivo dentro da operação", peso: 3 },
        { value: "divido", label: "Divido o tempo, mas puxo mais para o operacional", peso: 2 },
        { value: "estrategico", label: "Já atuo mais no estratégico, com a equipe tocando o dia a dia", peso: 1 },
        { value: "investidor", label: "Atuo como líder e investidor, fora da operação", peso: 0 },
      ],
    },
    {
      id: "problema",
      etapa: "Problema",
      pergunta: "O que mais consome o seu tempo hoje?",
      options: [
        { value: "incendios", label: "Apagar incêndios e resolver urgências", peso: 3,
          report: "apagar incêndios e resolver urgências" },
        { value: "aprovar", label: "Aprovar decisões que só passam por mim", peso: 3,
          report: "aprovar decisões que só passam por você" },
        { value: "cobrar", label: "Cobrar e acompanhar a equipe o tempo todo", peso: 2,
          report: "cobrar e acompanhar a equipe o tempo todo" },
        { value: "estrategia", label: "Estratégia, crescimento e novos projetos", peso: 0,
          report: "cuidar de estratégia, crescimento e novos projetos" },
      ],
    },
    {
      id: "tempo",
      etapa: "Há quanto tempo",
      pergunta: "Há quanto tempo a sua empresa depende tanto de você?",
      options: [
        { value: "recente", label: "Começou nos últimos meses", report: "alguns meses" },
        { value: "ano", label: "Mais de 1 ano", report: "mais de um ano" },
        { value: "anos", label: "Vários anos, virou o jeito que a empresa funciona", report: "vários anos" },
        { value: "sempre", label: "Desde que a empresa existe", report: "desde que a empresa existe" },
      ],
    },
    {
      id: "implicacao",
      etapa: "Implicação",
      pergunta: "Se você ficasse 15 dias totalmente fora, o que aconteceria?",
      options: [
        { value: "travaria", label: "A operação travaria rapidamente", peso: 3,
          report: "a operação travar rapidamente" },
        { value: "cairia", label: "Cairia muito de performance", peso: 2,
          report: "a empresa cair muito de performance" },
        { value: "erros", label: "Funcionaria, mas com muitos erros", peso: 1,
          report: "a empresa funcionar, mas com muitos erros" },
        { value: "normal", label: "Rodaria normalmente sem mim", peso: 0,
          report: "a empresa rodar normalmente sem você" },
      ],
    },
    {
      id: "necessidade",
      etapa: "O que já tentou",
      pergunta: "O que você já tentou para reduzir essa dependência?",
      options: [
        { value: "nada", label: "Não busquei nada consistente ainda", peso: 3,
          report: "resolver isso sozinho, no dia a dia" },
        { value: "pessoas", label: "Contratei pessoas, mas continuo no centro de tudo", peso: 2,
          report: "contratar pessoas" },
        { value: "ferramentas", label: "Investi em ferramentas e tecnologia", peso: 1,
          report: "investir em ferramentas e tecnologia" },
        { value: "cursos", label: "Fiz cursos, mentorias ou consultorias", peso: 1,
          report: "fazer cursos, mentorias ou consultorias" },
      ],
    },
    {
      id: "objetivo",
      etapa: "Objetivo",
      pergunta: "Se você resolvesse isso nos próximos meses, o que mudaria primeiro?",
      options: [
        { value: "tempo", label: "Ter tempo para a família, a saúde e a minha vida",
          report: "ter tempo para a família, a saúde e a sua vida" },
        { value: "crescer", label: "Crescer a empresa sem aumentar a minha sobrecarga",
          report: "crescer a empresa sem aumentar a sua sobrecarga" },
        { value: "vender", label: "Preparar a empresa para funcionar (ou ser vendida) sem mim",
          report: "preparar a empresa para funcionar, ou ser vendida, sem você" },
        { value: "paz", label: "Recuperar paz, clareza e o prazer de empreender",
          report: "recuperar paz, clareza e o prazer de empreender" },
      ],
    },
    {
      id: "perfil",
      etapa: "Perfil",
      pergunta: "Qual frase mais representa você hoje?",
      options: [
        { value: "trabalho-mais", label: "Tenho um time, mas na prática trabalho mais do que todos", peso: 3 },
        { value: "renderia", label: "Sei que meu negócio poderia render muito mais", peso: 2 },
        { value: "independente", label: "Tenho controle, mas quero um negócio independente de mim", peso: 1 },
        { value: "falta-algo", label: "Venci financeiramente, mas sinto que ainda falta algo", peso: 1 },
      ],
    },
    {
      id: "qualificacao",
      etapa: "Faturamento",
      pergunta: "Qual o faturamento médio mensal da sua empresa hoje?",
      options: [
        { value: "ate-50", label: "Até R$ 50 mil", foraDeArea: true },
        { value: "50-100", label: "De R$ 50 mil a R$ 100 mil", foraDeArea: true },
        { value: "100-500", label: "De R$ 100 mil a R$ 500 mil" },
        { value: "500-1mi", label: "De R$ 500 mil a R$ 1 milhão" },
        { value: "1-5mi", label: "De R$ 1 milhão a R$ 5 milhões" },
        { value: "5mi+", label: "R$ 5 milhões ou mais" },
      ],
    },
    {
      id: "prontidao",
      etapa: "O próximo passo",
      pergunta:
        "Você busca um processo estruturado para reduzir de vez essa dependência, mesmo que represente um investimento maior do que um curso ou uma ferramenta?",
      options: [
        { value: "sim", label: "Sim, quero resolver de vez e entendo que é um investimento" },
        { value: "entender", label: "Sim, mas preciso entender melhor como funciona antes" },
        { value: "depois", label: "Ainda não é prioridade pra mim agora", nutrir: true },
        { value: "pesquisando", label: "Só estou pesquisando por enquanto", nutrir: true },
      ],
    },
  ],

  captura: {
    titulo: "Seu Diagnóstico Executivo está pronto.",
    subtitulo:
      "Informe seus dados para receber o seu IDE e o caminho personalizado para reduzir a dependência da sua empresa em relação a você.",
    campos: [
      { id: "nomeResp", label: "Seu nome", type: "text", required: true, autocomplete: "name", placeholder: "Como podemos te chamar?" },
      { id: "whatsapp", label: "Seu WhatsApp (com DDD)", type: "tel", required: true, autocomplete: "tel", placeholder: "(11) 99999-9999", mask: "phone" },
      { id: "email", label: "Seu e-mail", type: "email", required: true, autocomplete: "email", placeholder: "voce@email.com" },
    ],
    cta: "Ver meu Diagnóstico Executivo",
    privacidade: "Usamos seus dados só para te enviar o diagnóstico e o contato da equipe. Nada de spam.",
  },
};
