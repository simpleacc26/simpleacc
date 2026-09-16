/* ============================================================
   FLOW. Quiz A "O Vazamento" · Lucas Sobreiro · Método BIO
   Tipo ASK: Killer (procura o erro escondido).
   Big Idea: tem dinheiro saindo da clínica por uma porta que ninguém olha.
   Copy aprovada em 16/09/2026 (proposta "Duas rotas para o funil do Lucas").
   Padrão de escrita: nunca usar travessão.
   ============================================================ */
window.FLOW = {
  config: {
    quizId: "A",
    quizNome: "O Vazamento",
    storeKey: "lucas_quiz_a",
    diagnosticoUrl: "diagnostico.html",
    pixelId: "1096905346357097",
    leadsEndpoint: "https://hook.us2.make.com/xiiny36asyfrjgrxfc2el43v6nuciu1l",
  },

  marca: {
    nome: "Método BIO",
    expert: "Lucas Sobreiro",
    whatsapp: "5551981115195",
    whatsappMsg:
      "Oi! Sou {nome}. Acabei de fazer o diagnóstico e o meu vazamento principal é: {vazamento}. Quero falar sobre a sessão estratégica.",
  },

  hero: {
    titulo: "Tem dinheiro saindo da sua clínica todo mês, por uma porta que ninguém está olhando.",
    subtitulo:
      "Descubra qual dos quatro vazamentos está levando esse dinheiro embora, e quanto ele custa por mês na sua conta.",
    tempo: "Toque na opção que mais combina. Avança sozinho.",
  },

  /* Ordem ASK: micro compromisso primeiro, porteiras no fim. */
  steps: [
    {
      id: "conduz",
      etapa: "Situação",
      pergunta: "Quando um paciente novo chega, quem conduz a conversa sobre o tratamento?",
      options: [
        { value: "dono", label: "Eu mesmo, no meio dos atendimentos",
          report: "conduzir você mesmo a conversa de tratamento, no meio dos atendimentos" },
        { value: "recepcao", label: "A recepção ou a secretária, do jeito dela",
          report: "deixar a conversa de tratamento com a recepção, sem um roteiro combinado" },
        { value: "comercial", label: "Tenho alguém dedicado ao comercial",
          report: "já ter alguém dedicado ao comercial" },
        { value: "ninguem", label: "Ninguém conduz, o paciente decide sozinho",
          report: "deixar o paciente decidir sozinho, sem ninguém conduzindo" },
      ],
    },
    {
      id: "problema",
      etapa: "Problema",
      bucket: true,
      pergunta: "Pensando nos últimos três meses, o que mais se repete na sua clínica?",
      options: [
        { value: "balcao", label: "Apresento o orçamento e o paciente some",
          bucket: "balcao",
          report: "apresentar o orçamento e ver o paciente sumir" },
        { value: "lucro", label: "Agenda cheia e o lucro não corresponde",
          bucket: "lucro",
          report: "ter a agenda cheia sem o lucro correspondente" },
        { value: "dono_so", label: "Quando eu saio, a clínica desanda",
          bucket: "dono_so",
          report: "ver a clínica desandar toda vez que você sai" },
        { value: "indicacao", label: "Mês bom e mês fraco, conforme a indicação",
          bucket: "indicacao",
          report: "depender da indicação e conviver com mês bom e mês fraco" },
      ],
    },
    {
      id: "fechamento",
      etapa: "Quantificação",
      pergunta: "Dos orçamentos que a sua clínica apresenta, quantos viram tratamento?",
      options: [
        { value: "ate3", label: "Menos de 3 em cada 10", taxa: 0.25,
          report: "fechar menos de 3 de cada 10 orçamentos" },
        { value: "3a5", label: "Entre 3 e 5 em cada 10", taxa: 0.40,
          report: "fechar entre 3 e 5 de cada 10 orçamentos" },
        { value: "mais5", label: "Mais de 5 em cada 10", taxa: 0.60,
          report: "fechar mais de 5 de cada 10 orçamentos" },
        { value: "naosei", label: "Não sei, a gente não acompanha", taxa: null,
          report: "não acompanhar quantos orçamentos viram tratamento" },
      ],
    },
    {
      id: "followup",
      etapa: "Vazamento",
      pergunta: "Quando o paciente diz que vai pensar, o que acontece depois?",
      options: [
        { value: "ate48", label: "Alguém retoma o contato em até 48 horas",
          report: "retomar o contato em até 48 horas" },
        { value: "lembramos", label: "Retomamos quando lembramos",
          report: "retomar o contato só quando alguém lembra" },
        { value: "espera", label: "A gente espera ele voltar",
          report: "esperar o paciente voltar sozinho" },
        { value: "naosei", label: "Não tenho certeza do que acontece",
          report: "não ter certeza do que acontece depois do orçamento" },
      ],
    },
    {
      id: "preco",
      etapa: "Vazamento",
      pergunta: "Quando foi a última vez que a clínica reajustou os preços?",
      options: [
        { value: "6m", label: "Nos últimos 6 meses",
          report: "ter reajustado os preços nos últimos 6 meses" },
        { value: "1ano", label: "Entre 6 meses e 1 ano",
          report: "estar há quase um ano sem reajustar os preços" },
        { value: "mais1ano", label: "Mais de 1 ano",
          report: "estar há mais de um ano sem reajustar os preços" },
        { value: "naolembro", label: "Não lembro",
          report: "não lembrar da última vez que reajustou os preços" },
      ],
    },
    {
      id: "implicacao",
      etapa: "Implicação",
      pergunta: "Se a clínica seguir exatamente assim por 12 meses, o que mais incomoda você?",
      options: [
        { value: "mesmo", label: "Faturar o mesmo trabalhando o mesmo tanto",
          report: "faturar o mesmo trabalhando o mesmo tanto" },
        { value: "concorrente", label: "Ver clínica menor crescendo mais rápido",
          report: "ver uma clínica menor crescendo mais rápido que a sua" },
        { value: "peca", label: "Continuar sendo a peça que não pode faltar",
          report: "continuar sendo a peça que não pode faltar" },
        { value: "dinheiro", label: "Fechar o ano sem saber para onde foi o dinheiro",
          report: "fechar o ano sem saber para onde foi o dinheiro" },
      ],
    },
    {
      id: "tentativas",
      etapa: "Tentativas",
      pergunta: "O que você já tentou para aumentar o faturamento?",
      options: [
        { value: "trafego", label: "Tráfego pago ou agência",
          report: "investir em tráfego pago ou agência" },
        { value: "curso", label: "Curso ou treinamento, para mim ou para a equipe",
          report: "fazer curso ou treinamento, para você ou para a equipe" },
        { value: "contratar", label: "Contratei mais gente",
          report: "contratar mais gente" },
        { value: "nada", label: "Ainda não tentei nada estruturado",
          report: "ainda não ter tentado nada estruturado" },
      ],
    },
    {
      id: "faturamento",
      etapa: "Porteira",
      pergunta: "Qual o faturamento mensal da clínica hoje?",
      options: [
        { value: "ate15",    label: "Até R$ 15 mil",          base: 12000 },
        { value: "15a30",    label: "De R$ 15 a 30 mil",      base: 22000 },
        { value: "30a50",    label: "De R$ 30 a 50 mil",      base: 40000 },
        { value: "50a80",    label: "De R$ 50 a 80 mil",      base: 65000 },
        { value: "80a100",   label: "De R$ 80 a 100 mil",     base: 90000 },
        { value: "acima100", label: "Acima de R$ 100 mil",    base: 130000 },
      ],
    },
    {
      id: "prontidao",
      etapa: "Porteira",
      pergunta:
        "Você busca um processo comercial instalado na clínica, com acompanhamento, mesmo que represente um investimento maior do que um curso avulso?",
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
    titulo: "Seu diagnóstico está pronto.",
    subtitulo:
      "Para onde enviamos? Deixe o seu WhatsApp que a equipe do Lucas te manda o diagnóstico e o próximo passo, sem compromisso.",
    campos: [
      { id: "nomeResp", label: "Seu nome", type: "text", autocomplete: "name", placeholder: "Como podemos te chamar?" },
      { id: "whatsapp", label: "Seu WhatsApp (com DDD)", type: "tel", autocomplete: "tel", placeholder: "(11) 99999-9999", mask: "phone" },
      { id: "email", label: "Seu e-mail", type: "email", autocomplete: "email", placeholder: "voce@email.com" },
    ],
    cta: "Ver meu diagnóstico",
    privacidade: "Seus dados são confidenciais e usados apenas para o seu atendimento. Nada de spam.",
  },

  /* Os quatro vazamentos: o nome que aparece no selo e a prescrição. */
  vazamentos: {
    balcao: {
      nome: "O balcão que não fecha",
      resumo: "o orçamento sai da sua mão e não volta",
      porque:
        "O paciente não some porque achou caro. Ele some porque ninguém conduziu a decisão até o fim, e a clínica tratou o orçamento como um papel entregue em vez de uma conversa com próximo passo marcado.",
      primeiro:
        "Instalar uma conversa de orçamento com roteiro e data de retorno combinada na hora, antes do paciente sair da recepção.",
    },
    lucro: {
      nome: "A agenda que trabalha de graça",
      resumo: "o movimento existe e a margem não acompanha",
      porque:
        "Agenda cheia esconde preço defasado e mix de procedimento errado. A clínica fica ocupada o mês inteiro sustentando o custo fixo e sobra pouco, porque o que enche a agenda não é o que paga a conta.",
      primeiro:
        "Separar, dos seus procedimentos, quais sustentam a margem e quais só ocupam cadeira, e corrigir a tabela antes de buscar mais paciente.",
    },
    dono_so: {
      nome: "A clínica que só anda com você dentro",
      resumo: "o crescimento tem o tamanho da sua agenda",
      porque:
        "Quando toda decisão passa por uma pessoa, o negócio cresce até onde essa pessoa aguenta e para ali. Não é falta de equipe, é falta de processo escrito que permita a equipe decidir sem você.",
      primeiro:
        "Escolher a decisão que mais te interrompe no dia e escrever o critério dela, para que outra pessoa possa tomá-la amanhã.",
    },
    indicacao: {
      nome: "O fluxo refém da indicação",
      resumo: "entra paciente quando alguém lembra de indicar",
      porque:
        "Indicação é ótimo sinal de qualidade e péssimo plano de crescimento, porque você não controla o volume nem o momento. O mês bom e o mês fraco não são sorte, são a ausência de um fluxo que não dependa de terceiros.",
      primeiro:
        "Montar um caminho de entrada que você controla, para deixar de depender de quem lembra de te indicar.",
    },
  },
};
