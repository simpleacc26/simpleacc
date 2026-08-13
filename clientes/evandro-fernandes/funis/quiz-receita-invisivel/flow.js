/* ============================================================
   FLOW · Funil Diagnóstico de Receita Invisível · Evandro Fernandes (HDM)
   Toda a copy do quiz e do relatório vive aqui.
   Para editar perguntas/textos, mexa só neste arquivo.
   ============================================================ */
window.FLOW = {
  marca: {
    nome: "Evandro Fernandes",
    expert: "Evandro Fernandes",
    // WhatsApp dos CTAs (só dígitos, com DDI). Conta comercial da DigiEnge,
    // +55 11 5194-1273. São 12 dígitos porque é WhatsApp Business em linha fixa,
    // não celular: confirmado no perfil em 13/08/2026, não falta o 9.
    whatsapp: "551151941273",
    // Texto que abre no WhatsApp. {nome} vira o nome do lead e {gargalo} vira o
    // índice do diagnóstico dele, para o SDR já abrir a conversa com contexto.
    whatsappMsg: "Olá! Sou {nome}. Concluí o Diagnóstico de Receita Invisível e o meu ponto principal foi: {gargalo}. Gostaria de entender onde a minha empresa está perdendo receita.",
  },

  hero: {
    // selo é opcional: apagar a linha tira o selo sem mexer no motor.
    selo: "Diagnóstico de Receita Invisível",
    titulo: "Descubra quanto de receita a sua empresa perde sem perceber.",
    subtitulo:
      "Responda algumas perguntas rápidas e receba um diagnóstico de quanto escapa nos seus 3 funis (Marketing, Comercial e CS) e qual é o próximo passo para recuperar, sem aumentar o tráfego.",
    // Tempo pode e ajuda (fala de esforço). Quantidade de perguntas, não.
    tempo: "Leva 2 minutos",
    cta: "Começar",
  },

  /* Cada passo: id, etapa (rótulo SPIN), pergunta e opções.
     Em 'report' fica a frase usada no relatório de diagnóstico. */
  steps: [
    {
      id: "situacao",
      etapa: "Situação",
      pergunta: "Como os dados de Marketing, Comercial e CS conversam hoje na sua empresa?",
      options: [
        { value: "isolados", label: "Cada área trabalha com o próprio número, em ferramentas separadas",
          report: "cada área trabalhar com o próprio número, em ferramentas separadas" },
        { value: "crm-parcial", label: "Tenho um CRM, mas marketing e CS ficam de fora",
          report: "ter um CRM, mas com o marketing e o CS de fora" },
        { value: "planilha", label: "Junto na mão, com planilhas e WhatsApp",
          report: "juntar os dados na mão, com planilhas e WhatsApp" },
        { value: "sem-ideia", label: "Não sei ao certo onde estão os dados",
          report: "não saber ao certo onde estão os seus dados" },
      ],
    },
    {
      id: "problema",
      etapa: "Problema",
      pergunta: "O que mais trava o seu resultado neste momento?",
      options: [
        { value: "lead-caro", label: "Lead caro que chega e não vira cliente",
          report: "o lead caro que chega e não vira cliente" },
        { value: "morre-comercial", label: "Oportunidade que morre no comercial sem follow-up",
          report: "a oportunidade que morre no comercial, sem follow-up" },
        { value: "churn", label: "Cliente que cancela no CS sem aviso",
          report: "o cliente que cancela no CS sem nenhum aviso" },
        { value: "nao-sei", label: "Sei que perco receita, mas não sei onde",
          report: "saber que perde receita, mas não conseguir apontar onde" },
      ],
    },
    {
      id: "implicacao",
      etapa: "Implicação",
      pergunta: "Se nada mudar, como fica a sua empresa daqui a 12 meses?",
      options: [
        { value: "mais-trafego", label: "Investindo mais em tráfego para o mesmo resultado",
          report: "investir cada vez mais em tráfego para o mesmo resultado" },
        { value: "margem", label: "Com a margem apertando e o CAC subindo",
          report: "ver a margem apertar com o custo de aquisição subindo" },
        { value: "incomoda", label: "Não sei, e isso me incomoda",
          report: "seguir sem enxergar por onde a receita escapa" },
        { value: "queima-caixa", label: "Crescendo, mas queimando caixa que não precisava",
          report: "crescer queimando caixa que não precisava queimar" },
      ],
    },
    {
      id: "necessidade",
      etapa: "O que já tentou",
      pergunta: "O que você já tentou para destravar isso?",
      options: [
        { value: "trafego", label: "Mais tráfego ou trocar de gestor",
          report: "investir em mais tráfego ou trocar de gestor" },
        { value: "crm", label: "Implantar um CRM ou ferramenta de dados",
          report: "implantar um CRM ou uma ferramenta de dados" },
        { value: "consultoria", label: "Consultoria ou treinamento de vendas",
          report: "contratar consultoria ou treinamento de vendas" },
        { value: "nada", label: "Ainda não tentei nada estruturado",
          report: "ainda não ter tentado nada estruturado" },
      ],
    },
    {
      id: "objetivo",
      etapa: "Objetivo",
      pergunta: "O que você mais quer nos próximos 6 meses?",
      options: [
        { value: "cac", label: "Reduzir o custo de aquisição sem perder volume",
          report: "reduzir o custo de aquisição sem perder volume" },
        { value: "conversao", label: "Aumentar a conversão do comercial",
          report: "aumentar a conversão do comercial" },
        { value: "churn-ltv", label: "Reduzir o churn e aumentar o LTV",
          report: "reduzir o churn e aumentar o LTV" },
        { value: "previsibilidade", label: "Previsibilidade e decidir por dado, não por achismo",
          report: "ter previsibilidade e decidir por dado, não por achismo" },
      ],
    },
    {
      id: "perfil",
      etapa: "Perfil",
      pergunta: "Qual é o seu papel na empresa?",
      options: [
        { value: "dono", label: "Dono ou CEO" },
        { value: "socio", label: "Sócio" },
        { value: "diretor", label: "Diretor comercial ou de marketing" },
        { value: "gestor", label: "Gestor ou coordenador" },
      ],
    },
    {
      id: "qualificacao",
      etapa: "Momento do negócio",
      pergunta: "Qual é o faturamento mensal da sua empresa hoje?",
      options: [
        { value: "ate-100", label: "Até R$ 100 mil por mês", nutrir: true },
        { value: "100-300", label: "De R$ 100 a 300 mil por mês", nutrir: true },
        { value: "300-1mi", label: "De R$ 300 mil a 1 milhão por mês" },
        { value: "1mi-mais", label: "Acima de R$ 1 milhão por mês" },
      ],
    },
  ],

  captura: {
    titulo: "Seu diagnóstico está pronto.",
    subtitulo:
      "Para onde devemos enviar? Informe seu WhatsApp e e-mail: a equipe do Evandro enviará o seu diagnóstico de Receita Invisível e o próximo passo recomendado, sem compromisso.",
    campos: [
      { id: "nomeResp", label: "Nome", type: "text", required: true, autocomplete: "name", placeholder: "Nome e sobrenome" },
      { id: "whatsapp", label: "WhatsApp (com DDD)", type: "tel", required: true, autocomplete: "tel", placeholder: "(11) 99999-9999", mask: "phone" },
      { id: "email", label: "E-mail corporativo", type: "email", required: true, autocomplete: "email", placeholder: "nome@empresa.com.br" },
    ],
    cta: "Ver meu diagnóstico",
    privacidade: "🔒 Seus dados serão utilizados apenas para o envio do diagnóstico e o contato da equipe, conforme a LGPD e com o seu consentimento. Sem spam.",
  },
};
