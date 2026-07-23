/* ============================================================
   FLOW — Funil de Inclusão · Instituto Sabrina Siqueira
   Toda a copy do quiz e do relatório vive aqui.
   Para editar perguntas/textos, mexa só neste arquivo.
   ============================================================ */
window.FLOW = {
  marca: {
    nome: "Instituto Sabrina Siqueira",
    expert: "Dra. Sabrina Siqueira",
    // Coloque o número no formato internacional, só dígitos (ex: 5533999999999)
    whatsapp: "5533998668858",
    // Texto que abre no WhatsApp (o {nome} é trocado pelo nome do responsável)
    whatsappMsg: "Oi! Sou {nome}, acabei de fazer o diagnóstico no site e quero falar sobre o atendimento do meu filho.",
  },

  hero: {
    selo: "Odontologia humanizada · Governador Valadares e região",
    titulo: "Seu filho merece um dentista que entende de manejo, não só de dente.",
    subtitulo:
      "Responda algumas perguntas rápidas e descubra o caminho certo para o seu filho ter uma relação tranquila e sem trauma com o dentista.",
    tempo: "Leva ~2 minutos · 7 perguntas",
    cta: "Começar",
  },

  /* Cada passo: id, tipo (rótulo SPIN), pergunta e opções.
     Em 'report' fica a frase usada no relatório de diagnóstico. */
  steps: [
    {
      id: "situacao",
      etapa: "Situação",
      pergunta: "Como são hoje as idas ao dentista do seu filho?",
      options: [
        { value: "nunca", label: "Ele nunca foi, tenho receio de como vai reagir" },
        { value: "dificil", label: "Já fomos, mas foi difícil: choro, contenção ou a consulta não rolou" },
        { value: "falta-alguem", label: "Vamos quando dá, mas sinto que falta alguém que entenda ele de verdade" },
        { value: "ja-paciente", label: "Ele já é meu paciente e quero manter o acompanhamento" },
      ],
    },
    {
      id: "problema",
      etapa: "Problema",
      pergunta: "Qual é a maior dificuldade na hora da consulta odontológica hoje?",
      options: [
        { value: "nao-senta", label: "Ele não senta na cadeira / não deixa examinar",
          report: "ele não conseguir sentar na cadeira ou deixar examinar" },
        { value: "ambiente", label: "O ambiente o desregula: barulho, luz, cheiro, espera",
          report: "o ambiente desregular ele, com barulho, luz, cheiro e espera" },
        { value: "sem-manejo", label: "Já encontrei dentista bom, mas nenhum sabe lidar com o comportamento",
          report: "encontrar dentistas bons, mas nenhum que saiba lidar com o comportamento dele" },
        { value: "medo-trauma", label: "Tenho medo de uma experiência ruim criar um trauma que dure anos",
          report: "o medo de uma experiência ruim virar um trauma que dure anos" },
      ],
    },
    {
      id: "implicacao",
      etapa: "Implicação",
      pergunta: "E como isso afeta vocês hoje?",
      options: [
        { value: "saude-de-lado", label: "A saúde bucal dele está sendo deixada de lado por falta de quem atenda",
          report: "a saúde bucal dele ficar em segundo plano por falta de quem atenda" },
        { value: "inseguros", label: "Cada tentativa frustrada deixa ele (e eu) mais inseguros",
          report: "cada tentativa frustrada deixar vocês dois mais inseguros" },
        { value: "gastei", label: "Já rodei vários consultórios e gastei sem resolver",
          report: "já ter rodado vários consultórios e gasto sem resolver" },
        { value: "improviso", label: "Vivo no improviso, sem um acompanhamento de verdade",
          report: "viver no improviso, sem um acompanhamento de verdade" },
      ],
    },
    {
      id: "necessidade",
      etapa: "O que já tentou",
      pergunta: "O que você já tentou para resolver isso?",
      options: [
        { value: "comum", label: "Levei em dentista comum, mas não soube fazer o manejo",
          report: "levar em dentista comum, que não soube fazer o manejo" },
        { value: "plano", label: "Tentei dentista de plano, mas indicaram sedação ou contenção como única saída",
          report: "tentar dentista de plano, que indicou sedação ou contenção como única saída" },
        { value: "adiei", label: "Adiei porque não achei ninguém de confiança na região",
          report: "adiar por não achar ninguém de confiança na região" },
        { value: "pesquisando", label: "Ainda não tentei, estou pesquisando agora",
          report: "começar a pesquisar agora por alguém de confiança" },
      ],
    },
    {
      id: "objetivo",
      etapa: "Objetivo",
      pergunta: "O que você mais deseja para a relação do seu filho com o dentista?",
      options: [
        { value: "sem-trauma", label: "Que ele consiga ser atendido sem trauma e sem contenção",
          report: "ser atendido sem trauma e sem contenção" },
        { value: "sozinho", label: "Que um dia ele entre sozinho e tranquilo na cadeira",
          report: "um dia entrar sozinho e tranquilo na cadeira" },
        { value: "referencia", label: "Ter um dentista de referência, que conhece ele e a rotina dele",
          report: "ter um dentista de referência, que conheça ele e a rotina dele" },
        { value: "acompanhamento", label: "Manter a saúde bucal em dia com acompanhamento contínuo",
          report: "manter a saúde bucal em dia com acompanhamento contínuo" },
      ],
    },
    {
      id: "perfil",
      etapa: "Perfil",
      pergunta: "Me conta um pouco sobre seu filho:",
      options: [
        { value: "autista", label: "Autista (com ou sem diagnóstico fechado)" },
        { value: "tdah", label: "TDAH / outra neurodivergência" },
        { value: "investigacao", label: "Em investigação / aguardando diagnóstico" },
        { value: "ansiosa", label: "Criança típica, mas muito ansiosa/medrosa com dentista" },
      ],
    },
    {
      id: "qualificacao",
      etapa: "Onde vocês ficam",
      pergunta: "De onde vocês são? Atendemos Governador Valadares e região.",
      options: [
        { value: "valadares", label: "Governador Valadares" },
        { value: "vizinha", label: "Cidade vizinha (até ~1h30 de Valadares)" },
        { value: "longe-ok", label: "Mais distante, mas o deslocamento não é problema pra nós" },
        { value: "outra", label: "Outra região", foraDeArea: true },
      ],
    },
  ],

  captura: {
    titulo: "Seu diagnóstico está pronto. 💛",
    subtitulo:
      "Pra onde enviamos? Deixe seu WhatsApp que a equipe da Dra. Sabrina te manda o diagnóstico do seu filho e os próximos passos, sem compromisso.",
    campos: [
      { id: "nomeResp", label: "Seu nome", type: "text", required: true, autocomplete: "name", placeholder: "Como podemos te chamar?" },
      { id: "whatsapp", label: "Seu WhatsApp (com DDD)", type: "tel", required: true, autocomplete: "tel", placeholder: "(33) 99999-9999", mask: "phone" },
      { id: "email", label: "Seu e-mail", type: "email", required: true, autocomplete: "email", placeholder: "voce@email.com" },
    ],
    cta: "Ver meu diagnóstico agora",
    privacidade: "🔒 Usamos seus dados só para te enviar o diagnóstico e o contato do consultório. Nada de spam.",
  },
};
