/* ============================================================
   FLOW. Funil de Quiz · Lucas Sobreiro (clínicas / saúde)
   Toda a copy do quiz e do relatório vive aqui.
   Estrutura espelhada no funil de quiz validado da Simple Acc.
   Conteúdo da ESTRATÉGIA aprovada (2026-07-20-estrategia.md).
   Padrão de escrita: nunca usar travessões (traço longo).
   ============================================================ */
window.FLOW = {
  config: {
    storeKey: "lucas_funil_clinica",
    frente: "Saude",
    diagnosticoUrl: "diagnostico.html",
  },

  marca: {
    nome: "Lucas Sobreiro",
    expert: "Lucas Sobreiro",
    // TODO: preencher o WhatsApp do time (formato internacional, só dígitos) antes do deploy
    whatsapp: "5500000000000",
    // O {nome} é trocado pelo primeiro nome de quem respondeu
    whatsappMsg:
      "Oi! Sou {nome}, acabei de fazer o diagnóstico da minha clínica no site e quero falar sobre a Sessão Estratégica.",
  },

  hero: {
    selo: "Mentoria de Evolução Empresarial · Saúde",
    titulo: "Descubra o que está travando o crescimento da sua clínica e o próximo passo mais lucrativo.",
    subtitulo:
      "Responda algumas perguntas rápidas e receba um diagnóstico personalizado do momento da sua clínica e do caminho para crescer com lucro, previsibilidade e tempo.",
    tempo: "Leva ~2 minutos · 100% confidencial",
    cta: "Começar meu diagnóstico",
  },

  /* Ordem SPIN: baixa fricção primeiro, qualificação (perfil + faturamento +
     prontidão) por último. Cada opção tem 'report' = frase usada no diagnóstico. */
  steps: [
    {
      id: "situacao",
      etapa: "Situação",
      pergunta: "Como está o momento da sua clínica hoje?",
      options: [
        { value: "cheia_sem_lucro", label: "Agenda cheia, mas o lucro não corresponde",
          report: "ter a agenda cheia sem o lucro correspondente" },
        { value: "travou", label: "Faturamento cresceu, mas travou num patamar",
          report: "ver o faturamento travado num mesmo patamar" },
        { value: "sobrecarregado", label: "Funciona, mas depende de mim para tudo",
          report: "tocar uma clínica que depende de você para tudo" },
        { value: "instavel", label: "Um mês bom, outro fraco, sem previsibilidade",
          report: "conviver com meses bons e fracos, sem previsibilidade" },
      ],
    },
    {
      id: "problema",
      etapa: "Problema",
      pergunta: "O que mais trava o crescimento neste momento?",
      options: [
        { value: "poucos_pacientes", label: "Poucos pacientes novos entrando",
          report: "a falta de pacientes novos entrando" },
        { value: "equipe_nao_vende", label: "A clínica atende bem, mas vende mal",
          report: "uma clínica que atende bem mas vende mal" },
        { value: "sem_tempo", label: "Falta tempo para pensar no negócio",
          report: "a falta de tempo para pensar no negócio" },
        { value: "sem_processo", label: "Tudo é no improviso, sem processo",
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
        { value: "sempre", label: "Desde que abri, nunca destravou de verdade", report: "praticamente desde que você abriu" },
      ],
    },
    {
      id: "impacto",
      etapa: "Impacto",
      pergunta: "Se nada mudar, como fica a sua clínica daqui a 12 meses?",
      options: [
        { value: "igual", label: "Igual: trabalhando muito para o mesmo resultado",
          report: "seguir trabalhando muito para o mesmo resultado" },
        { value: "pior", label: "Pior: eu cada vez mais sobrecarregado(a)",
          report: "ficar cada vez mais sobrecarregado(a)" },
        { value: "incerto", label: "Não sei, e isso me incomoda",
          report: "a incerteza sobre onde a clínica vai chegar" },
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
        { value: "previsibilidade", label: "Ter previsibilidade de pacientes e receita",
          report: "ter previsibilidade de pacientes e receita" },
        { value: "equipe", label: "Uma equipe que funciona sem depender de mim",
          report: "uma equipe que funciona sem depender de você" },
      ],
    },
    {
      id: "perfil",
      etapa: "Sua área",
      pergunta: "Qual é a sua área?",
      options: [
        { value: "odonto", label: "Odontologia" },
        { value: "medicina", label: "Medicina" },
        { value: "fisio_vet", label: "Fisioterapia ou veterinária" },
        { value: "outra_saude", label: "Outra área da saúde / dono(a) de clínica" },
      ],
    },
    {
      id: "faturamento",
      etapa: "Momento da clínica",
      pergunta: "Qual é o faturamento mensal da sua clínica hoje?",
      options: [
        { value: "ate15", label: "Até R$ 15 mil", nutrir: true },
        { value: "15a30", label: "De R$ 15 a 30 mil", nutrir: true },
        { value: "30a80", label: "De R$ 30 a 80 mil" },
        { value: "acima80", label: "Acima de R$ 80 mil" },
      ],
    },
    {
      id: "prontidao",
      etapa: "O próximo passo",
      pergunta:
        "Você busca um processo estruturado para destravar o crescimento da clínica, mesmo que represente um investimento maior do que um curso avulso?",
      options: [
        { value: "sim", label: "Sim, quero resolver de vez e entendo que é um investimento" },
        { value: "entender", label: "Sim, mas preciso entender melhor como funciona antes" },
        { value: "pontual", label: "No momento, busco algo mais pontual ou de menor custo", nutrir: true },
        { value: "pesquisando", label: "Só estou pesquisando por enquanto", nutrir: true },
      ],
    },
  ],

  captura: {
    titulo: "Seu diagnóstico personalizado está pronto.",
    subtitulo:
      "Pra onde enviamos? Deixe seu WhatsApp que a equipe do Lucas te manda o diagnóstico e o próximo passo, sem compromisso.",
    campos: [
      { id: "nomeResp", label: "Seu nome", type: "text", required: true, autocomplete: "name", placeholder: "Como podemos te chamar?" },
      { id: "whatsapp", label: "Seu WhatsApp (com DDD)", type: "tel", required: true, autocomplete: "tel", placeholder: "(11) 99999-9999", mask: "phone" },
      { id: "email", label: "Seu e-mail", type: "email", required: true, autocomplete: "email", placeholder: "voce@email.com" },
    ],
    cta: "Ver meu diagnóstico personalizado",
    privacidade: "🔒 Seus dados são confidenciais e usados apenas para o seu atendimento. Nada de spam.",
  },
};
