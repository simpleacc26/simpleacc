/* ============================================================
   FLOW. Quiz B "Índice de Dependência" · Lucas Sobreiro · Método BIO
   Tipo ASK: Score (entrega um número que a pessoa quer melhorar).
   Big Idea: toda vez que você sai da clínica, alguma coisa para de funcionar.
   Copy aprovada em 16/09/2026 (proposta "Duas rotas para o funil do Lucas").
   Padrão de escrita: nunca usar travessão.

   O índice (IDD) soma APENAS as perguntas com 'peso'. Implicação, objetivo e
   as duas porteiras não pontuam, seguindo a regra da casa.
   ============================================================ */
window.FLOW = {
  config: {
    quizId: "B",
    quizNome: "Indice de Dependencia",
    storeKey: "lucas_quiz_b",
    diagnosticoUrl: "diagnostico.html",
    pixelId: "1096905346357097",
    leadsEndpoint: "https://hook.us2.make.com/xiiny36asyfrjgrxfc2el43v6nuciu1l",
  },

  marca: {
    nome: "Método BIO",
    expert: "Lucas Sobreiro",
    whatsapp: "5551981115195",
    whatsappMsg:
      "Oi! Sou {nome}. Acabei de fazer o diagnóstico e o meu Índice de Dependência deu {indice}. Quero falar sobre a sessão estratégica.",
  },

  hero: {
    titulo: "Toda vez que você sai da clínica, alguma coisa para de funcionar.",
    subtitulo:
      "Descubra, num número de 0 a 100, o quanto a clínica ainda precisa de você para faturar, e os três pontos que mais pesam no seu caso.",
    tempo: "Toque na opção que mais combina. Avança sozinho.",
  },

  steps: [
    {
      id: "ferias",
      etapa: "Situação",
      peso: true,
      fator: "Você é quem sustenta o faturamento",
      pergunta: "Se você tirasse 15 dias de férias começando amanhã, o que aconteceria com o faturamento?",
      options: [
        { value: "quase_tudo", label: "Cairia quase tudo", peso: 3,
          report: "ver o faturamento cair quase todo se você parar 15 dias" },
        { value: "bastante", label: "Cairia bastante", peso: 2,
          report: "ver o faturamento cair bastante se você parar 15 dias" },
        { value: "pouco", label: "Cairia um pouco", peso: 1,
          report: "ver o faturamento cair só um pouco se você parar" },
        { value: "igual", label: "Seguiria igual", peso: 0,
          report: "ter um faturamento que segue igual mesmo sem você" },
      ],
    },
    {
      id: "vendas",
      etapa: "Comercial",
      peso: true,
      fator: "O comercial depende de você",
      pergunta: "Quem vende na sua clínica hoje?",
      options: [
        { value: "so_eu", label: "Só eu, ninguém mais conduz orçamento", peso: 3,
          report: "ser a única pessoa que conduz orçamento" },
        { value: "eu_recepcao", label: "Eu e a recepção, cada um do seu jeito", peso: 2,
          report: "dividir o orçamento com a recepção, cada um do seu jeito" },
        { value: "recepcao_confiro", label: "A recepção conduz e eu confiro", peso: 1,
          report: "deixar a recepção conduzir e conferir depois" },
        { value: "dedicado", label: "Tenho alguém dedicado ao comercial", peso: 0,
          report: "já ter alguém dedicado ao comercial" },
      ],
    },
    {
      id: "tempo",
      etapa: "Tempo",
      peso: true,
      fator: "O seu tempo é todo de atendimento",
      pergunta: "Numa semana normal, quanto do seu tempo é atendimento e quanto é negócio?",
      options: [
        { value: "quase_tudo", label: "Quase tudo atendimento", peso: 3,
          report: "passar quase toda a semana em atendimento" },
        { value: "sobra_pouco", label: "Atendo muito e sobra pouco", peso: 2,
          report: "atender muito e sobrar pouco tempo para o negócio" },
        { value: "um_turno", label: "Consigo separar um turno por semana", peso: 1,
          report: "conseguir separar um turno por semana para o negócio" },
        { value: "agenda_fixa", label: "Tenho agenda fixa de gestão", peso: 0,
          report: "ter agenda fixa de gestão" },
      ],
    },
    {
      id: "processo",
      etapa: "Processo",
      peso: true,
      fator: "Nada está escrito, tudo está com você",
      pergunta: "Se entrasse uma pessoa nova na recepção amanhã, ela teria onde aprender como a clínica funciona?",
      options: [
        { value: "comigo", label: "Não, aprende comigo no dia a dia", peso: 2,
          report: "ensinar tudo pessoalmente, no dia a dia" },
        { value: "anotado", label: "Tem algumas coisas anotadas", peso: 1,
          report: "ter só algumas coisas anotadas" },
        { value: "escrito", label: "Sim, está tudo escrito", peso: 0,
          report: "ter o funcionamento da clínica escrito" },
        { value: "nunca_pensei", label: "Nunca precisei pensar nisso", peso: 2,
          report: "nunca ter precisado pensar em como alguém novo aprenderia" },
      ],
    },
    {
      id: "aquisicao",
      etapa: "Aquisição",
      peso: true,
      fator: "A entrada de paciente não é sua",
      pergunta: "Como entra paciente novo hoje?",
      options: [
        { value: "indicacao", label: "Indicação, quase toda", peso: 2,
          report: "receber quase todo paciente por indicação" },
        { value: "mista", label: "Indicação e um pouco de redes sociais", peso: 1,
          report: "misturar indicação com um pouco de redes sociais" },
        { value: "fluxo", label: "Tenho um fluxo que roda sem mim", peso: 0,
          report: "já ter um fluxo de entrada que roda sem você" },
        { value: "varia", label: "Varia muito, não sei dizer", peso: 2,
          report: "não saber dizer de onde vem o paciente novo" },
      ],
    },
    {
      id: "implicacao",
      etapa: "Implicação",
      pergunta: "O que mais incomodaria você daqui a 12 meses?",
      options: [
        { value: "peca", label: "Seguir sendo a peça que não pode faltar",
          report: "seguir sendo a peça que não pode faltar" },
        { value: "perder", label: "Perder um profissional bom e travar a clínica",
          report: "perder um profissional bom e travar a clínica" },
        { value: "pessoal", label: "Crescer e a vida pessoal pagar a conta",
          report: "crescer com a vida pessoal pagando a conta" },
        { value: "nao_saber", label: "Não saber dizer se cresceu ou não",
          report: "chegar no fim do ano sem saber se cresceu" },
      ],
    },
    {
      id: "objetivo",
      etapa: "Objetivo",
      pergunta: "O que você mais quer nos próximos 6 meses?",
      options: [
        { value: "faturar", label: "Faturar mais sem aumentar minha carga",
          report: "faturar mais sem aumentar a sua carga" },
        { value: "equipe", label: "Uma equipe que funciona sem mim",
          report: "ter uma equipe que funciona sem você" },
        { value: "previsibilidade", label: "Previsibilidade de paciente e de receita",
          report: "ter previsibilidade de paciente e de receita" },
        { value: "margem", label: "Margem melhor com o mesmo movimento",
          report: "ter margem melhor com o mesmo movimento" },
      ],
    },
    {
      id: "faturamento",
      etapa: "Porteira",
      pergunta: "Qual o faturamento mensal da clínica hoje?",
      options: [
        { value: "ate15",    label: "Até R$ 15 mil" },
        { value: "15a30",    label: "De R$ 15 a 30 mil" },
        { value: "30a50",    label: "De R$ 30 a 50 mil" },
        { value: "50a80",    label: "De R$ 50 a 80 mil" },
        { value: "80a100",   label: "De R$ 80 a 100 mil" },
        { value: "acima100", label: "Acima de R$ 100 mil" },
      ],
    },
    {
      id: "prontidao",
      etapa: "Porteira",
      pergunta:
        "Você busca um processo estruturado para sair do centro da operação, mesmo que represente um investimento maior do que um curso avulso?",
      options: [
        { value: "sim", label: "Sim, quero resolver de vez e entendo que é investimento" },
        { value: "entender", label: "Sim, mas preciso entender melhor como funciona" },
        { value: "pontual", label: "No momento não é prioridade investir nisso" },
        { value: "pesquisando", label: "Só estou pesquisando" },
      ],
    },
  ],

  captura: {
    eyebrow: "Quase lá",
    titulo: "Seu Índice de Dependência está pronto.",
    subtitulo:
      "Para onde enviamos? Deixe o seu WhatsApp que a equipe do Lucas te manda o índice e o próximo passo, sem compromisso.",
    campos: [
      { id: "nomeResp", label: "Seu nome", type: "text", autocomplete: "name", placeholder: "Como podemos te chamar?" },
      { id: "whatsapp", label: "Seu WhatsApp (com DDD)", type: "tel", autocomplete: "tel", placeholder: "(11) 99999-9999", mask: "phone" },
      { id: "email", label: "Seu e-mail", type: "email", autocomplete: "email", placeholder: "voce@email.com" },
    ],
    cta: "Ver meu índice",
    privacidade: "Seus dados são confidenciais e usados apenas para o seu atendimento. Nada de spam.",
  },

  /* Faixas do índice. Quanto maior, mais a clínica depende do dono. */
  faixas: [
    {
      min: 66, nome: "A clínica para quando você para",
      resumo: "hoje o negócio funciona porque você está dentro dele todos os dias",
      texto:
        "Nessa faixa o crescimento tem um teto muito claro, que é a sua agenda. Cada paciente a mais exige uma hora a mais sua, e como hora não se multiplica, o faturamento encosta num limite e fica ali. A boa notícia é que esse é o cenário que responde mais rápido, porque quase tudo que trava está concentrado em poucas decisões que ainda passam por você.",
    },
    {
      min: 33, nome: "Dependência alta e administrável",
      resumo: "a clínica já anda um pouco sozinha, mas as decisões que importam ainda são suas",
      texto:
        "Nessa faixa a estrutura existe, só que ela ainda não sustenta uma ausência sua mais longa que alguns dias. É o momento mais produtivo para instalar processo, porque já tem gente e volume para o processo segurar, e ainda não tem o vício que se forma quando a clínica cresce torta por anos.",
    },
    {
      min: 0, nome: "Clínica que anda sozinha",
      resumo: "a operação não depende da sua presença para faturar",
      texto:
        "Nessa faixa o gargalo raramente é dependência, é margem e previsibilidade. A clínica funciona sem você no dia a dia, o que libera a conversa para onde ela realmente rende: preço, mix de procedimento e o próximo degrau de crescimento.",
    },
  ],
};
