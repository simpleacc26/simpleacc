/* ============================================================
   FLOW · Diagnóstico da Dívida de Valor · Adriana Brunelly

   Toda a copy do funil vive aqui. Construído sobre a apostila
   "Funil de Lead Dinâmico" (Daniel Souza · Simple), na ordem que
   ela manda: oferta -> tipo de quiz -> buckets -> página de
   resultado -> engenharia de perguntas -> captura -> headline.

   Tipo de quiz: KILLER (promete a causa, não a solução).
   Público frio, que já tentou e falhou. Apostila, Procedimento 4.

   Padrão de escrita: nunca usar travessão. Vírgula, dois-pontos,
   ponto final ou parênteses. Faixas com "a" (de 30 a 60).
   ============================================================ */
window.FLOW = {
  config: {
    storeKey: "adriana_divida_de_valor",
    frente: "Diagnóstico da Dívida de Valor",
    diagnosticoUrl: "diagnostico.html",
    /* ATENCAO: link de agendamento NAO foi o que se alinhou com ela.
       Na call de 10/09 o combinado foi: a pagina leva o lead a mandar
       mensagem, e a Adriana o chama para a reuniao usando os scripts
       que a Simple entrega. O CTA do qualificado vai para o WhatsApp.
       Isto aqui fica vazio de proposito. Se um dia o time decidir
       colocar agenda (Calendly e o padrao da apostila), basta preencher:
       o CTA passa a abrir a agenda sozinho, sem mexer em mais nada. */
    agendamentoUrl: "",
  },

  marca: {
    nome: "Adriana Brune'lly",
    monograma: "A",
    tagline: "Estrategista em Negócios para Eventos",
    expert: "Adriana",
    /* WhatsApp Business dela: +55 43 8808-1317, confirmado no perfil.
       Formato internacional, só dígitos, sem o 9 (o número tem 8 dígitos). */
    whatsapp: "554388081317",
    whatsappMsg: "Oi, Adriana! Sou {nome}, acabei de fazer o diagnóstico da Dívida de Valor. O meu padrão deu {padrao} e a conta deu {divida}. Quero conversar sobre isso.",
  },

  /* ---------------------------------------------------------
     HERO + CAPTURA
     ORDEM DO FUNIL, e ela não muda: QUIZ -> CAPTURA -> DIAGNÓSTICO.
     A pessoa responde primeiro e só deixa o contato quando a conta
     dela já está pronta do outro lado. Pedir o dado antes de dar
     qualquer coisa em troca é pedágio na porta, e derruba o topo.
     O hero vive na primeira pergunta, sem tela de intro no meio.
     --------------------------------------------------------- */
  hero: {
    selo: "Diagnóstico gratuito · 2 minutos",
    titulo: "Quanto o seu negócio de eventos deixa na mesa <em>todo ano</em>?",
    subtitulo: "Não é falta de cliente e não é falta de talento. Existem quatro pontos onde o dinheiro escapa entre o seu orçamento e o seu caixa, e todos eles têm conta.",
    cta: "Quero ver a minha conta",
  },

  captura: {
    titulo: "A sua conta está pronta.",
    subtitulo: "Coloque o seu WhatsApp abaixo e receba agora o seu número e a leitura completa do seu caso.",
    campos: [
      { id: "nomeResp", label: "Seu nome", type: "text", required: true, autocomplete: "name", placeholder: "Como eu te chamo?" },
      { id: "whatsapp", label: "Seu WhatsApp (com DDD)", type: "tel", required: true, autocomplete: "tel", placeholder: "(43) 99999-9999", mask: "phone" },
      { id: "email", label: "Seu e-mail", type: "email", required: true, autocomplete: "email", placeholder: "voce@email.com" },
      { id: "cidade", label: "Cidade e estado", type: "text", required: true, autocomplete: "address-level2", placeholder: "Londrina, PR" },
    ],
    cta: "Ver a minha Dívida de Valor",
    privacidade: "Os seus dados ficam entre você e a nossa equipe. Nada de disparo em massa.",
  },

  /* ---------------------------------------------------------
     AS 10 PERGUNTAS (apostila, Procedimento 7)
     Camadas: identificação, situação, problema, implicação,
     tentativas, objetivo, qualificação financeira por último.

     Campos de cada opção:
       report  frase usada no texto do diagnóstico
       peso    pontos por bucket { orcamento, desconto, extra, agenda }
       valor   entra no cálculo da Dívida de Valor (ver calculo)
       nutrir  marca faixa de baixa prontidão na pergunta porteira
     --------------------------------------------------------- */
  /* ---------------------------------------------------------
     AS 10 PERGUNTAS (apostila, Procedimento 7)

     ORDEM: da mais fácil para a mais reflexiva. Abre com o que se
     responde sem pensar (o que você faz, quantos eventos entrega),
     passa pelo comportamento reconhecível, depois pelos números, e
     só no fim chega no que exige parar para pensar (o que você
     sente no fim do mês, o que mudaria em 3 meses). A qualificação
     financeira é sempre a última.

     Campos de cada opção:
       report  frase usada no texto do diagnóstico
       peso    pontos por bucket { orcamento, desconto, extra, agenda }
       valor   entra no cálculo da Dívida de Valor (ver calculo)
       nutrir  marca faixa de baixa prontidão na pergunta porteira
     --------------------------------------------------------- */
  steps: [
    {
      id: "segmento",
      etapa: "Seu perfil",
      pergunta: "O que você faz hoje no mercado de eventos?",
      options: [
        { value: "buffet",     label: "Tenho um buffet",                      report: "buffet" },
        { value: "decoracao",  label: "Trabalho com decoração de festas",     report: "decoração de festas" },
        { value: "doceira",    label: "Sou doceira ou confeiteira",           report: "doces e confeitaria" },
        { value: "assessoria", label: "Sou assessora ou cerimonialista",      report: "assessoria e cerimonial" },
      ],
    },
    {
      id: "volume",
      etapa: "O seu volume",
      pergunta: "Quantos eventos ou pedidos você entrega por mês, em média?",
      options: [
        { value: "ate3",   label: "Até 3",        report: "até 3",       valor: 2,  peso: { agenda: 0 } },
        { value: "4a8",    label: "De 4 a 8",     report: "de 4 a 8",    valor: 6 },
        { value: "9a15",   label: "De 9 a 15",    report: "de 9 a 15",   valor: 12, peso: { agenda: 1 } },
        { value: "mais15", label: "Mais de 15",   report: "mais de 15",  valor: 18, peso: { agenda: 2 } },
      ],
    },
    {
      id: "orcamento",
      etapa: "O orçamento",
      pergunta: "Quando você manda um orçamento, o que mais acontece?",
      options: [
        { value: "some",      label: "A pessoa agradece e some",
          report: "a pessoa agradecer e sumir",                        peso: { orcamento: 3 } },
        { value: "desconto",  label: "Ela responde pedindo desconto",
          report: "ela responder pedindo desconto",                    peso: { desconto: 3 } },
        { value: "compara",   label: "Ela compara com alguém mais barato e volta pedindo para cobrir",
          report: "ela comparar com alguém mais barato e pedir para cobrir", peso: { desconto: 2, orcamento: 1 } },
        { value: "cobrei_pouco", label: "Fecha, mas eu fico com a sensação de que cobrei pouco",
          report: "fechar com a sensação de ter cobrado pouco",        peso: { extra: 2, desconto: 1 } },
      ],
    },
    {
      id: "extras",
      etapa: "A entrega",
      pergunta: "E os extras: o cliente pede algo fora do combinado durante o evento?",
      options: [
        { value: "quase_nunca", label: "Quase nunca, meu contrato é bem fechado",
          report: "quase nunca, porque o seu contrato é bem fechado",  valor: 0 },
        { value: "as_vezes",    label: "Às vezes, e eu cobro à parte",
          report: "às vezes, e você cobra à parte",                    valor: 0.02 },
        { value: "absorvo",     label: "Acontece bastante, e eu acabo absorvendo",
          report: "acontece bastante, e você acaba absorvendo",        valor: 0.06, peso: { extra: 2 } },
        { value: "nem_lanco",   label: "Acontece sempre, e eu nem lanço na conta",
          report: "acontece sempre, e você nem lança na conta",        valor: 0.10, peso: { extra: 3 } },
      ],
    },
    {
      id: "ticket",
      etapa: "O seu ticket",
      pergunta: "Qual é o valor médio de um evento ou pedido seu?",
      options: [
        { value: "ate3",      label: "Até R$ 3 mil",                report: "até R$ 3 mil",              valor: 2000 },
        { value: "3a8",       label: "De R$ 3 mil a R$ 8 mil",      report: "de R$ 3 mil a R$ 8 mil",    valor: 5500 },
        { value: "8a15",      label: "De R$ 8 mil a R$ 15 mil",     report: "de R$ 8 mil a R$ 15 mil",   valor: 11500 },
        { value: "15a30",     label: "De R$ 15 mil a R$ 30 mil",    report: "de R$ 15 mil a R$ 30 mil",  valor: 22500 },
        { value: "30a60",     label: "De R$ 30 mil a R$ 60 mil",    report: "de R$ 30 mil a R$ 60 mil",  valor: 45000 },
        { value: "60a120",    label: "De R$ 60 mil a R$ 120 mil",   report: "de R$ 60 mil a R$ 120 mil", valor: 90000 },
        { value: "acima120",  label: "Acima de R$ 120 mil",         report: "acima de R$ 120 mil",       valor: 150000 },
      ],
    },
    {
      id: "desconto",
      etapa: "O fechamento",
      pergunta: "Na hora de fechar, quanto costuma sair de desconto?",
      options: [
        { value: "nenhum",  label: "Não dou desconto",            report: "nenhum desconto",        valor: 0 },
        { value: "ate10",   label: "Até 10%",                     report: "até 10%",                valor: 0.07, peso: { desconto: 1 }, fatMax: 10000 },
        { value: "10a20",   label: "De 10% a 20%",                report: "de 10% a 20%",           valor: 0.15, peso: { desconto: 2 } },
        { value: "mais20",  label: "Mais de 20%, ou dou algum brinde que sai do meu bolso",
          report: "mais de 20%, ou um brinde que sai do seu bolso", valor: 0.25, peso: { desconto: 3 } },
      ],
    },
    {
      id: "tentativas",
      etapa: "O que já tentou",
      pergunta: "O que você já tentou para resolver isso?",
      options: [
        { value: "curso",     label: "Fiz curso técnico para melhorar ainda mais a entrega",
          report: "fez curso técnico para melhorar ainda mais a entrega" },
        { value: "instagram", label: "Comecei a postar mais e a cuidar do Instagram",
          report: "começou a postar mais e a cuidar do Instagram",     peso: { orcamento: 1 } },
        { value: "planilha",  label: "Procurei planilha de precificação",
          report: "procurou planilha de precificação" },
        { value: "nada",      label: "Nunca tentei nada específico, fui levando",
          report: "nunca tentou nada específico, foi levando" },
      ],
    },
    {
      id: "sentimento",
      etapa: "O fim do mês",
      pergunta: "No fim do mês, quando você olha a conta, o que você sente?",
      options: [
        { value: "ok",         label: "Está bom, sobra o que eu planejei",
          report: "que está bom, e sobra o que você planejou" },
        { value: "nao_sobra",  label: "Entrou muito dinheiro e não sobrou quase nada",
          report: "que entrou muito dinheiro e não sobrou quase nada", peso: { agenda: 2 } },
        { value: "sobrou_menos", label: "Sobrou menos que no mês passado e eu não sei explicar por quê",
          report: "que sobrou menos que no mês passado, sem explicação", peso: { extra: 1, agenda: 1 } },
        { value: "evito",      label: "Eu evito olhar",
          report: "que prefere não olhar",                             peso: { agenda: 1, extra: 1 } },
      ],
    },
    {
      id: "objetivo",
      etapa: "O seu objetivo",
      pergunta: "Se em 3 meses isso mudasse de vez, o que mudaria primeiro?",
      options: [
        { value: "cobrar",      label: "Eu cobraria o que vale sem medo de perder o cliente",
          report: "cobrar o que vale sem medo de perder o cliente",    peso: { desconto: 1 } },
        { value: "procurada",   label: "Eu pararia de correr atrás e passaria a ser procurada",
          report: "parar de correr atrás e passar a ser procurada",    peso: { orcamento: 1 } },
        { value: "menos_mais",  label: "Eu faria menos eventos e ganharia mais em cada um",
          report: "fazer menos eventos e ganhar mais em cada um",      peso: { agenda: 2 } },
        { value: "referencia",  label: "Eu seria a referência da minha cidade",
          report: "ser a referência da sua cidade" },
      ],
    },
    /* PORTEIRA · qualificação financeira sempre por último.
       As sete faixas existem pelo contraste: quem marca a primeira
       vê, na mesma tela, que a última é ocupada por gente do mesmo
       mercado. É o primeiro trabalho de consciência do funil. */
    /* fatMax: teto da faixa. A conta da Dívida de Valor nunca passa do
       faturamento que a própria pessoa declarou aqui, mesmo que ticket
       vezes volume dê mais. Número que a pessoa não reconhece derruba a
       página inteira, então a conta fica sempre do lado conservador. */
    {
      id: "faturamento",
      etapa: "Última pergunta",
      pergunta: "Quanto o seu negócio fatura por mês, em média, nos últimos 6 meses?",
      options: [
        { value: "ate10",     label: "Até R$ 10 mil",                report: "até R$ 10 mil",              fora: true },
        { value: "10a25",     label: "De R$ 10 mil a R$ 25 mil",     report: "de R$ 10 mil a R$ 25 mil",   nutrir: true, fatMax: 25000 },
        { value: "25a40",     label: "De R$ 25 mil a R$ 40 mil",     report: "de R$ 25 mil a R$ 40 mil",   nutrir: true, fatMax: 40000 },
        { value: "40a80",     label: "De R$ 40 mil a R$ 80 mil",     report: "de R$ 40 mil a R$ 80 mil", fatMax: 80000 },
        { value: "80a150",    label: "De R$ 80 mil a R$ 150 mil",    report: "de R$ 80 mil a R$ 150 mil", fatMax: 150000 },
        { value: "150a300",   label: "De R$ 150 mil a R$ 300 mil",   report: "de R$ 150 mil a R$ 300 mil", fatMax: 300000 },
        { value: "acima300",  label: "Acima de R$ 300 mil",          report: "acima de R$ 300 mil" },
      ],
    },
  ],

  /* ---------------------------------------------------------
     INTERSEÇÕES (apostila, Parte 2)
     Telas curtas de implicação entre as perguntas. Não são pitch:
     são consequência. Começam a vender dentro do marketing.
     Todas ancoradas em fato verificável da própria Adriana ou em
     aritmética pura. Nada inventado.
     --------------------------------------------------------- */
  interseccoes: {
    orcamento: {
      num: "13 eventos em 1 semana",
      texto: "Foi a semana que mudou o meu negócio. Entreguei os treze, passei 72 horas sem dormir e ficou tudo impecável. Na segunda-feira fui olhar os números e não tinha sobrado quase nada. <strong>Volume não é margem.</strong>",
      fonte: "Adriana Brune'lly, 2017",
    },
    desconto: {
      num: "R$ 108 mil por ano",
      texto: "É o que sai de um negócio que dá 10% de desconto em seis eventos de R$ 15 mil por mês. São R$ 1.500 por evento, R$ 9 mil por mês. <strong>Ninguém lança esse número em lugar nenhum.</strong>",
      fonte: "Conta simples, com os números do próprio mercado",
    },
    tentativas: {
      num: "40% menos, 60% mais",
      texto: "Eu faturava R$ 2 milhões com 15% de margem. Depois que mudei para quem eu vendia, faturei R$ 1,2 milhão com 40%. <strong>Faturei 40% menos e lucrei 60% mais.</strong> A diferença não estava na entrega.",
      fonte: "Adriana Brune'lly, antes e depois da virada",
    },
  },

  /* ---------------------------------------------------------
     CÁLCULO DA DÍVIDA DE VALOR
     ticket x volume x (desconto + extras). O número nasce das
     respostas 2, 3, 5 e 6. Sem elas não existe diagnóstico,
     existe texto motivacional.
     --------------------------------------------------------- */
  calculo: {
    pisoParaMostrarNumero: 500,  // abaixo disso a página usa a versão sem número
    regraSobeParaSessao: 3000,   // perda mensal que qualifica mesmo em faixa menor
  },

  /* ---------------------------------------------------------
     OS BUCKETS (apostila, Procedimento 5)
     Quatro padrões de perda, mutuamente exclusivos, cada um com
     causa-raiz, objeção e primeira mudança próprias. O quinto
     caminho, o desqualificado, sai da pergunta porteira, não de
     um padrão: quem está abaixo da faixa recebe a mesma leitura
     e a oferta de entrada no fim.

     A ordem do array é a hierarquia de desempate: em empate, o
     lead sobe para o bucket de maior perda, nunca desce.
     --------------------------------------------------------- */
  buckets: {
    agenda: {
      nome: "A Agenda Cheia",
      onde: "A perda acontece no volume.",
      causaRaiz: "escolheu para quem vende",
      resumo: "Muitos eventos, todos apertados. Entra muito dinheiro, não sobra quase nada, e o cansaço esconde a conta.",
      oQueMuda: "Você não precisa de mais cliente, precisa de outro cliente. Foi exatamente aqui que eu estava em 2017, com 13 eventos numa semana e nada sobrando. A primeira mudança é escolher para quem você vende.",
      ordem: 1,
    },
    extra: {
      nome: "O Extra Invisível",
      onde: "A perda acontece na entrega.",
      causaRaiz: "colocou o escopo no papel",
      resumo: "O contrato termina e o serviço continua. É margem saindo pela porta dos fundos, e é o padrão que menos se enxerga.",
      oQueMuda: "A sua perda está na execução. O contrato termina e o serviço continua. A primeira mudança é no escopo escrito, e ela sozinha costuma recuperar a maior parte da conta acima.",
      ordem: 2,
    },
    desconto: {
      nome: "O Desconto Automático",
      onde: "A perda acontece no fechamento.",
      causaRaiz: "aprendeu a conduzir o fechamento",
      resumo: "Você constrói valor a conversa inteira e devolve esse valor na última mensagem, com medo de perder o cliente que já está na mão.",
      oQueMuda: "Você constrói valor a conversa inteira e devolve tudo na última mensagem. Não é generosidade, é medo de perder o que já está na mão. A primeira mudança é na condução do fechamento.",
      ordem: 3,
    },
    orcamento: {
      nome: "O Orçamento que Some",
      onde: "A perda acontece antes do preço.",
      causaRaiz: "construiu valor antes de mandar o número",
      resumo: "O orçamento sai caprichado e a pessoa agradece e desaparece. Ela nunca chegou a perceber o que estava comprando.",
      oQueMuda: "O seu trabalho começa antes do preço. Hoje o cliente chega no número sem ter percebido o que está comprando, e número sozinho só pode ser comparado com outro número. A primeira mudança é no atendimento, não na tabela.",
      ordem: 4,
    },
  },

  /* VSL da página de resultado (apostila, Procedimento 6).
     Fica desligada enquanto o vídeo não existir. Nada de embed falso. */
  vsl: {
    ativo: false,
    titulo: "Assista antes de ler o resto",
    embed: "",
  },

  /* Oferta de entrada para quem fica fora da faixa da sessão. */
  ofertaEntrada: {
    ativo: true,
    nome: "WhatsApp de Valor",
    preco: "R$ 47",
    promessa: "O primeiro passo, no lugar onde o seu cliente decide: a conversa. São microaulas curtas para você parar de perder o orçamento no WhatsApp.",
    link: "https://payfast.greenn.com.br/3993f3x",
    cta: "Quero começar pelo WhatsApp de Valor",
  },

  /* Depoimentos: prints reais em ./depoimentos/01.webp, 02.webp...
     Enquanto não existirem, a galeria não é renderizada.
     Ver o guia de captação em estrategia/. Nunca inventar depoimento. */
  depoimentos: [],
};
