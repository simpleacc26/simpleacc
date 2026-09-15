/* ============================================================
   FLOW. Toda a copy do quiz vive aqui.
   Cliente: Luana Isse · Método Gatilho Único (R$ 1.997, vendido por VSL)

   ESTE FUNIL SUBSTITUI O ANTERIOR, ELE NÃO É UMA EVOLUÇÃO DELE.
   O anterior falava com o especialista que o mercado não enxerga e vendia a
   mentoria MMPV de R$ 7 mil. Este fala com quem JÁ VENDE e cansou de depender
   de call. Outro público, outro problema, outro preço.

   TIPO DE QUIZ: Killer. O resultado é um erro nomeado, não uma nota.
   NÃO EXISTE ÍNDICE DE 0 A 100 AQUI, e isso é decisão: no funil anterior o
   índice existia e 89% das combinações caíam na mesma faixa. Era decoração.

   A PERGUNTA 8 É A DE SEGMENTAÇÃO. É ela, e só ela, que define o diagnóstico.
   Ela vem imediatamente antes da captura de propósito (método ASK).

   RECORTE: o funil fala com QUEM JÁ VENDE. Decisão de 14/09, para priorizar
   qualificação. Quem ainda não vende não tem call que funcione para extrair,
   que é a matéria-prima do método.

   Padrão de escrita: nunca usar travessões. Sem emoji.
   LINGUAGEM NEUTRA EM GÊNERO: o público tem homens e mulheres. Nenhum adjetivo
   pode concordar com quem lê. Ao escrever opção nova, leia em voz alta como
   homem e como mulher: se soar errado numa das duas, reescreva.
   ============================================================ */
window.FLOW = {
  config: {
    storeKey: "luana_gatilho_unico",
    frente: "Diagnóstico Gatilho Único",
    diagnosticoUrl: "diagnostico.html",
  },

  marca: {
    nome: "Luana Isse",
    expert: "Luana Isse",
    tagline: "Método Gatilho Único",
    instagram: "@luana.isse",
    whatsapp: "5547992730303",
    /* A mensagem leva o RESULTADO NOMEADO: quem atende abre a conversa já
       sabendo o diagnóstico. Placeholders: {nome} {resultado} */
    whatsappMsg: "Oi, Luana! Sou {nome}. Fiz o Diagnóstico Gatilho Único e o meu resultado foi \"{resultado}\". Quero entender como resolver isso.",
    /* CTA principal do relatório. Enquanto estiver vazio, o botão cai no
       WhatsApp. Assim que a VSL estiver no ar, é só preencher aqui. */
    vslUrl: "",
  },

  /* Os quatro diagnósticos. Cada um é uma das quatro tarefas que o conteúdo
     único precisa cumprir para substituir a call: ter uma oferta, apresentar,
     quebrar objeção e conduzir até a compra. Se uma falha, a venda não
     sobrevive fora do ao vivo. */
  resultados: {
    oferta:   "Oferta que só existe na conversa",
    pitch:    "Pitch que mora na sua cabeça",
    objecao:  "Fechamento que depende de improviso",
    conducao: "Convence, mas não conduz",
  },

  hero: {
    titulo: "Qual parte da sua venda só existe quando você está ao vivo?",
    subtitulo: "Responda e descubra o que impede a sua mentoria de ser vendida sem você dentro de uma call.",
    tempo: "Leva cerca de 2 minutos e o resultado é seu na hora",
  },

  steps: [
    {
      id: "vende",
      etapa: "O que você vende",
      pergunta: "O que você vende hoje?",
      options: [
        { value: "mentoria_ind", label: "Mentoria individual", report: "vender mentoria individual" },
        { value: "mentoria_gru", label: "Mentoria em grupo", report: "vender mentoria em grupo" },
        { value: "consultoria", label: "Consultoria", report: "vender consultoria" },
        { value: "curso", label: "Curso ou formação", report: "vender curso ou formação" },
        { value: "estruturando", label: "Ainda estou estruturando", report: "ainda estar estruturando o que vende" },
      ],
    },
    {
      id: "como",
      etapa: "Como vende",
      pergunta: "Como a venda acontece hoje?",
      options: [
        { value: "call", label: "Call de vendas, um a um", report: "fechar em call de vendas, uma pessoa por vez" },
        { value: "aula_call", label: "Aula ou live e depois a call", report: "levar para uma aula e fechar na call depois" },
        { value: "direct", label: "Conversa no direct ou no WhatsApp", report: "vender conversando no direct ou no WhatsApp" },
        { value: "pagina", label: "Página de vendas, sem call", report: "já vender por página, sem call" },
        { value: "sem_constancia", label: "Não vendo com constância", report: "ainda não vender com constância" },
      ],
    },
    {
      id: "volume",
      etapa: "Volume",
      pergunta: "Quantas calls de venda você fez nos últimos 30 dias?",
      options: [
        { value: "zero", label: "Nenhuma", report: "não ter feito nenhuma call no último mês" },
        { value: "1a5", label: "De 1 a 5", report: "uma a cinco calls no último mês" },
        { value: "6a15", label: "De 6 a 15", report: "seis a quinze calls no último mês" },
        { value: "16a30", label: "De 16 a 30", report: "de dezesseis a trinta calls no último mês" },
        { value: "mais30", label: "Mais de 30", report: "mais de trinta calls no último mês" },
      ],
    },
    {
      id: "peso",
      etapa: "O que pesa",
      pergunta: "O que mais pesa hoje nesse formato?",
      options: [
        { value: "tempo", label: "O tempo que some da minha semana", report: "o tempo que some da sua semana" },
        { value: "repetir", label: "Repetir a mesma conversa do zero toda vez", report: "recomeçar a mesma conversa do zero toda vez" },
        { value: "noshow", label: "Gente que agenda e não aparece", report: "gente que agenda e não aparece" },
        { value: "sem_caixa", label: "Gente que chega sem poder pagar", report: "gente que chega na call sem poder pagar" },
        { value: "dependencia", label: "Depender de mim para qualquer venda acontecer", report: "toda venda depender de você estar presente" },
      ],
    },
    {
      id: "tentou",
      etapa: "O que já tentou",
      pergunta: "O que você já fez para depender menos da call?",
      options: [
        { value: "gravou", label: "Gravei uma VSL ou aula e não converteu como eu esperava", report: "ter gravado uma VSL ou aula que não converteu como você esperava" },
        { value: "pagina", label: "Escrevi a oferta numa página e continuei precisando da call", report: "ter escrito a oferta numa página e continuado preso à call" },
        { value: "outra_pessoa", label: "Coloquei outra pessoa para vender por mim", report: "ter colocado outra pessoa para vender no seu lugar" },
        { value: "nada", label: "Nunca tentei, não sei por onde começar", report: "ainda não ter tentado nada nessa direção" },
      ],
    },

    /* ---- PORTEIRA 1: tamanho da operação. A primeira opção filtra. ---- */
    {
      id: "faturamento",
      etapa: "O seu momento",
      pergunta: "Quanto você fatura por mês hoje com o seu trabalho?",
      options: [
        { value: "nao_constante", label: "Ainda não faturo de forma constante", fora: true },
        { value: "ate5", label: "Até R$ 5 mil" },
        { value: "5a15", label: "De R$ 5 mil a R$ 15 mil" },
        { value: "15a30", label: "De R$ 15 mil a R$ 30 mil" },
        { value: "acima30", label: "Acima de R$ 30 mil" },
      ],
    },

    /* ---- PORTEIRA 2: prontidão. Mantida junto com a de faturamento porque
       medem coisas diferentes: uma diz o tamanho, a outra diz se a pessoa se
       mexe. A R$ 1.997 dinheiro quase não discrimina, intenção discrimina. ---- */
    {
      id: "prontidao",
      etapa: "O próximo passo",
      pergunta: "Se existisse um caminho para a sua venda acontecer sem você na call, quando você começaria?",
      options: [
        { value: "semana", label: "Essa semana" },
        { value: "mes", label: "Neste mês" },
        { value: "entender", label: "Quero entender melhor antes" },
        { value: "pesquisando", label: "Só estou pesquisando" },
      ],
    },

    /* ---- PERGUNTA DE SEGMENTAÇÃO. É ela que define o diagnóstico. ----
       Repare que ela pede uma PROJEÇÃO, não uma confissão: a pessoa não
       precisa admitir uma falha, só imaginar uma cena. Se perguntássemos
       "qual é o seu erro", quase todo mundo escolheria o que pega menos mal.
       Se mexer nas alternativas, mexa no `diag` junto. */
    {
      id: "cena",
      etapa: "Uma cena",
      pergunta: "Imagine que você gravou um único conteúdo e mandou para alguém que tem o perfil certo. O que você acha que aconteceria?",
      options: [
        { value: "sem_oferta", diag: "oferta",
          label: "Ia travar antes: eu nem sei qual oferta colocaria, monto na hora para cada pessoa",
          report: "nem saber qual oferta colocaria, porque ela é montada na hora para cada pessoa" },
        { value: "perco_fio", diag: "pitch",
          label: "Eu não saberia o que falar. Ao vivo sai fácil, gravando eu perco o fio",
          report: "não saber o que falar gravando, mesmo sendo fácil ao vivo" },
        { value: "duvida", diag: "objecao",
          label: "Ia até bem, mas na primeira dúvida sem eu lá para responder, a pessoa desiste",
          report: "a pessoa desistir na primeira dúvida, sem você lá para responder" },
        { value: "elogia", diag: "conducao",
          label: "A pessoa ia gostar, elogiar, e não comprar",
          report: "a pessoa gostar, elogiar e não comprar" },
      ],
    },
  ],

  captura: {
    titulo: "Seu diagnóstico está pronto.",
    subtitulo: "Deixe o seu contato para acessar o diagnóstico agora e receber uma cópia no WhatsApp.",
    campos: [
      { id: "nomeResp", label: "Seu nome", type: "text", required: true, autocomplete: "name", placeholder: "Como podemos te chamar?" },
      { id: "whatsapp", label: "Seu WhatsApp (com DDD)", type: "tel", required: true, autocomplete: "tel", placeholder: "(11) 99999-9999", mask: "phone" },
      { id: "email", label: "Seu e-mail", type: "email", required: true, autocomplete: "email", placeholder: "voce@email.com" },
    ],
    cta: "Ver meu diagnóstico",
    privacidade: "Seus dados são confidenciais e usados apenas para o seu atendimento. Nada de spam.",
  },
};
