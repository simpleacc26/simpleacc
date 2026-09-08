/* ============================================================
   FLOW — Funil de Implantes e Reabilitação · Instituto Sabrina Siqueira
   Toda a copy do quiz e os dados da marca vivem aqui.
   Para editar perguntas/textos, mexa só neste arquivo.
   O texto do relatório fica em diagnostico.js (mesma pasta).
   ============================================================ */
window.FLOW = {
  /* Cada funil tem sua própria "gaveta" (storeKey) e nome de frente,
     pra não misturar respostas com o funil de Inclusão. */
  config: {
    storeKey: "siqueira_funil_implantes",
    frente: "Implantes",
    diagnosticoUrl: "/diagnostico.html", // absoluto: funciona com ou sem barra no fim da URL
  },

  marca: {
    nome: "Instituto Sabrina Siqueira",
    expert: "Dra. Sabrina Siqueira",
    // ATENÇÃO: número placeholder. Trocar pelo WhatsApp real (só dígitos, formato internacional, ex: 5533999999999)
    whatsapp: "5533998668858",
    whatsappMsg: "Oi! Sou {nome}, acabei de fazer o diagnóstico no site e quero agendar minha avaliação de reabilitação.",
  },

  hero: {
    selo: "Implantes e reabilitação oral · Governador Valadares e região",
    titulo: "Descubra o caminho para voltar a mastigar de tudo e sorrir sem se esconder.",
    subtitulo:
      "Responda algumas perguntas rápidas e receba uma orientação sobre o tipo de reabilitação mais indicada para o seu caso, antes mesmo de pisar no consultório.",
    tempo: "Leva ~2 minutos · 7 perguntas",
    cta: "Começar",
  },

  /* Cada passo: id, etapa (rótulo SPIN), pergunta e opções.
     O campo 'report' é a frase usada no relatório de diagnóstico. */
  steps: [
    {
      id: "situacao",
      etapa: "Situação",
      pergunta: "Como está sua boca hoje?",
      options: [
        { value: "poucos", label: "Falta um ou poucos dentes",
          report: "um implante unitário ou a reposição de poucos elementos" },
        { value: "varios", label: "Faltam vários dentes ou uso prótese que não me agrada",
          report: "uma reabilitação com múltiplos implantes ou a troca da prótese por algo fixo" },
        { value: "comprometidos", label: "Tenho dentes muito comprometidos que provavelmente vou perder",
          report: "um planejamento que cuide dos dentes comprometidos antes de partir para a reabilitação" },
        { value: "tudo", label: "Quero reabilitar tudo e ter um sorriso novo",
          report: "uma reabilitação completa, para devolver todo o seu sorriso" },
      ],
    },
    {
      id: "problema",
      etapa: "Problema",
      pergunta: "O que mais te incomoda nisso hoje?",
      options: [
        { value: "mastigar", label: "Dificuldade pra mastigar e me alimentar bem",
          report: "a dificuldade pra mastigar e se alimentar bem" },
        { value: "vergonha", label: "Tenho vergonha de sorrir, falar ou aparecer em foto",
          report: "a vergonha de sorrir, falar ou aparecer em foto" },
        { value: "protese", label: "A prótese móvel solta, machuca ou é desconfortável",
          report: "a prótese móvel que solta, machuca ou é desconfortável" },
        { value: "medo", label: "Sei que preciso resolver, mas tenho medo de começar",
          report: "o medo de começar, mesmo sabendo que precisa resolver" },
      ],
    },
    {
      id: "implicacao",
      etapa: "Implicação",
      pergunta: "Como isso afeta o seu dia a dia?",
      options: [
        { value: "evito", label: "Evito certos alimentos e situações sociais",
          report: "evitar certos alimentos e situações sociais" },
        { value: "autoestima", label: "Minha autoestima caiu, me sinto mais velho(a) do que sou",
          report: "a autoestima cair e você se sentir mais velho(a) do que é" },
        { value: "oportunidades", label: "Já perdi oportunidades por não me sentir confiante",
          report: "já ter perdido oportunidades por não se sentir confiante" },
        { value: "empurrando", label: "Vou empurrando com a barriga, mas sei que está na hora",
          report: "ir empurrando com a barriga, mesmo sabendo que está na hora" },
      ],
    },
    {
      id: "necessidade",
      etapa: "O que já tentou",
      pergunta: "O que você já tentou até aqui?",
      options: [
        { value: "orcamento", label: "Fiz orçamento, mas achei caro ou não passei confiança",
          report: "fazer orçamento e achar caro, ou não sentir confiança" },
        { value: "protese-ruim", label: "Usei prótese móvel e não me adaptei",
          report: "usar prótese móvel e não se adaptar" },
        { value: "adiei", label: "Adiei por medo de dor ou de não dar certo",
          report: "adiar por medo de dor ou de não dar certo" },
        { value: "buscando", label: "Ainda não comecei nada, estou buscando agora",
          report: "começar a buscar uma solução agora" },
      ],
    },
    {
      id: "objetivo",
      etapa: "Objetivo",
      pergunta: "O que você quer alcançar?",
      options: [
        { value: "mastigar-tudo", label: "Voltar a mastigar de tudo, sem dor e sem incômodo",
          report: "voltar a mastigar de tudo, sem dor e sem incômodo" },
        { value: "sorrir", label: "Sorrir e me sentir bem comigo de novo",
          report: "sorrir e se sentir bem consigo de novo" },
        { value: "fixa", label: "Uma solução fixa e definitiva, não um quebra-galho",
          report: "uma solução fixa e definitiva, não um quebra-galho" },
        { value: "seguranca", label: "Resolver com segurança, com quem eu confie",
          report: "resolver com segurança, com quem você confie" },
      ],
    },
    {
      id: "perfil",
      etapa: "Momento",
      pergunta: "Qual opção combina mais com você hoje?",
      options: [
        { value: "agora", label: "Quero resolver o quanto antes" },
        { value: "organizar", label: "Quero entender o caminho e me organizar pra fazer" },
        { value: "comparando", label: "Estou comparando profissionais antes de decidir" },
        { value: "familiar", label: "É para um familiar (pai, mãe, cônjuge)" },
      ],
    },
    {
      id: "qualificacao",
      etapa: "Onde você fica",
      pergunta: "De onde você fala? Atendemos Governador Valadares e região.",
      options: [
        { value: "valadares", label: "Governador Valadares" },
        { value: "vizinha", label: "Cidade vizinha (até ~1h30 de Valadares)" },
        { value: "longe-ok", label: "Mais distante, mas posso me deslocar" },
        { value: "outra", label: "Outra região", foraDeArea: true },
      ],
    },
  ],

  captura: {
    titulo: "Sua orientação inicial está pronta. 💛",
    subtitulo:
      "Pra onde enviamos? Deixe seu WhatsApp que a equipe do Instituto te manda a orientação do seu caso e agenda sua avaliação, sem compromisso.",
    campos: [
      { id: "nomeResp", label: "Seu nome completo", type: "text", required: true, autocomplete: "name", placeholder: "Como podemos te chamar?" },
      { id: "whatsapp", label: "Seu WhatsApp (com DDD)", type: "tel", required: true, autocomplete: "tel", placeholder: "(33) 99999-9999", mask: "phone" },
      { id: "email", label: "Seu e-mail", type: "email", required: true, autocomplete: "email", placeholder: "voce@email.com" },
    ],
    cta: "Ver minha orientação agora",
    privacidade: "🔒 Usamos seus dados só para te enviar a orientação e o contato do consultório. Nada de spam.",
  },
};
