/* Prova de Carga · Fabrício Alves, Arquiteto de Ofertas
   ---------------------------------------------------------------------------
   Toda a copy pública do funil mora aqui. É o arquivo que mais muda.

   Regras do cliente que este arquivo obedece (contexto/regras-de-linguagem.md):
   sem travessao, sem emoji, sem preco em nenhuma tela, a palavra "quiz" nunca
   aparece na superficie (diz-se "medicao"), "erosao estrutural" so em posicao de
   veredito na pagina de resultado, os 21 criterios do Scorecard nunca aparecem.
   --------------------------------------------------------------------------- */

window.FLOW = {
  config: { storeKey: "fa_prova_de_carga" },

  marca: {
    nome: "FABRÍCIO ALVES",
    assinatura: "Arquiteto de Ofertas",
    // Preencher para ligar a rota B (Diagnóstico). Vazio mostra o aviso de canal
    // em configuração em vez de abrir conversa. Ver README.
    whatsapp: "",
    instagram: "",
    selo: "img/capuz-selo.webp",
    marcaFigura: "img/falcao-punho.webp",
    conceito: "img/mergulho-stoop-claro.webp",   // versão para fundo de tinta
    conceitoEscuro: "img/mergulho-stoop.webp",  // versão para fundo de pergaminho
  },

  hero: {
    eyebrow: "Medição estrutural da oferta",
    titulo: "Sua operação já vende. Onde ela cede quando a verba dobra?",
    subtitulo:
      "Dez perguntas, três minutos. Você sai com o eixo que encarece cada venda, a conta em reais do que já paga a mais por mês e o que não adianta mexer até isso ser corrigido.",
    tempo: "Três minutos. Nenhuma pergunta de dinheiro antes da nona.",
  },

  /* ------------------------------------------------------------------ *
   * As dez perguntas, em seis camadas.
   * papel:  organizacao interna, NUNCA renderizado na tela.
   * eixo:   pontos por eixo (so nas perguntas 6, 7 e 8).
   * marca:  bandeira que a pagina de resultado usa.
   * conta:  faixa que alimenta a aritmetica do vazamento.
   * report: a frase em terceira pessoa que o espelho costura.
   * ------------------------------------------------------------------ */
  steps: [
    {
      id: "operacao",
      papel: "Camada 1 · identificação, sem julgamento",
      pergunta: "O que a sua operação vende hoje pela internet?",
      opcoes: [
        {
          value: "ticket_alto",
          label: "Mentoria, consultoria ou programa de ticket alto",
          report: "uma mentoria ou programa de ticket alto",
        },
        {
          value: "curso_esteira",
          label: "Curso ou programa de ticket médio, com esteira",
          dialeto: "operador",
          report: "um curso de ticket médio com esteira",
        },
        {
          value: "servico_premium",
          label: "Serviço premium, clínica ou agenda de profissional liberal",
          dialeto: "expert",
          report: "um serviço premium com agenda",
        },
        {
          value: "ascensao",
          label: "Produto de ticket baixo, ainda sem degrau acima",
          marca: "ascensao",
          rota: "diagnostico",
          report: "um produto de ticket baixo, ainda sem degrau acima",
        },
        {
          value: "nao_vendo",
          label: "Ainda não vendo pela internet",
          fora: true,
          report: "uma operação que ainda não vende pela internet",
        },
      ],
    },

    {
      id: "alta",
      papel: "Camada 2 · situação",
      pergunta:
        "Nos últimos seis a doze meses, quanto subiu o custo por venda da oferta principal?",
      opcoes: [
        { value: "ate20", label: "Até 20%", conta: { piso: 0.1, medio: 0.15 }, report: "subiu até 20%" },
        { value: "20a50", label: "De 20% a 50%", conta: { piso: 0.2, medio: 0.35 }, report: "subiu entre 20% e 50%" },
        { value: "50a100", label: "De 50% a 100%", conta: { piso: 0.5, medio: 0.75 }, report: "subiu entre 50% e 100%" },
        { value: "dobrou", label: "Mais que dobrou", conta: { piso: 1.0, medio: 1.0 }, report: "mais que dobrou" },
        { value: "nao_sei", label: "Não subiu, ou não sei", naoMede: true, report: "não subiu, ou você ainda não mediu" },
      ],
    },

    {
      id: "vendas",
      papel: "Camada 2 · situação",
      pergunta: "Quantas vendas por mês a oferta principal faz hoje?",
      opcoes: [
        { value: "ate10", label: "Até 10", conta: { piso: 5, medio: 8 }, report: "até 10 vendas por mês" },
        { value: "10a30", label: "De 10 a 30", conta: { piso: 10, medio: 20 }, report: "de 10 a 30 vendas por mês" },
        { value: "30a100", label: "De 30 a 100", conta: { piso: 30, medio: 65 }, report: "de 30 a 100 vendas por mês" },
        { value: "mais100", label: "Mais de 100", conta: { piso: 100, medio: 100 }, report: "mais de 100 vendas por mês" },
      ],
    },

    { implicacao: "leilao" },

    {
      id: "custo",
      papel: "Camada 2 · situação",
      pergunta:
        "Quanto custa hoje uma venda da oferta principal, contando só a mídia?",
      opcoes: [
        { value: "ate500", label: "Até R$500", conta: { piso: 250, medio: 375 }, report: "até R$500 por venda" },
        { value: "500a2k", label: "De R$500 a R$2.000", conta: { piso: 500, medio: 1250 }, report: "de R$500 a R$2.000 por venda" },
        { value: "2ka8k", label: "De R$2.000 a R$8.000", conta: { piso: 2000, medio: 5000 }, report: "de R$2.000 a R$8.000 por venda" },
        { value: "acima8k", label: "Acima de R$8.000", conta: { piso: 8000, medio: 8000 }, report: "acima de R$8.000 por venda" },
        { value: "nao_meco", label: "Não meço", naoMede: true, report: "um custo por venda que você ainda não mede" },
        { value: "sem_trafego", label: "Não faço tráfego pago", semTrafego: true, naoMede: true, report: "nenhuma mídia paga rodando hoje" },
      ],
    },

    {
      id: "ajuste",
      papel: "Camada 3 · comportamento",
      pergunta: "Qual foi o último ajuste que você fez para segurar esse custo?",
      opcoes: [
        { value: "criativo", label: "Troquei criativo, copy ou público", sintoma: "desejo", report: "trocar criativo, copy ou público" },
        { value: "preco", label: "Mexi em preço, bônus, garantia ou parcelamento", sintoma: "oferta", report: "mexer em preço, bônus, garantia ou parcelamento" },
        { value: "percurso", label: "Mexi na página, no formulário, na agenda ou no comercial", sintoma: "caminho", report: "mexer na página, no formulário, na agenda ou no comercial" },
        { value: "verba", label: "Subi ou baixei a verba e esperei", sintoma: "reflexo", report: "subir ou baixar a verba e esperar" },
      ],
    },

    {
      id: "concorrencia",
      papel: "Camada 4 · problema, uma por eixo",
      pergunta: "Quando você olha os anúncios dos concorrentes diretos, o que vê?",
      opcoes: [
        {
          value: "igual_barato",
          label: "Prometem o mesmo que eu, com mecanismo parecido e preço menor",
          eixo: { desejo: 3 },
          report: "prometem o mesmo que você, com mecanismo parecido e preço menor",
        },
        {
          value: "igual_preco",
          label: "Prometem o mesmo que eu, com preço parecido",
          eixo: { desejo: 2 },
          report: "prometem o mesmo que você, com preço parecido",
        },
        {
          value: "distingo",
          label:
            "Prometem coisa diferente. A minha promessa ainda se distingue, e mesmo assim o custo por venda subiu",
          eixo: {},
          marca: "fora_do_desejo",
          report: "prometem coisa diferente, e mesmo assim o seu custo por venda subiu",
        },
        {
          value: "nao_acompanho",
          label: "Não acompanho os concorrentes",
          eixo: { desejo: 1 },
          naoMede: true,
          report: "você não acompanha o que eles prometem",
        },
      ],
    },

    {
      id: "fechamento",
      papel: "Camada 4 · problema, uma por eixo",
      pergunta: "No fechamento, o que mais acontece com quem chega interessado?",
      opcoes: [
        {
          value: "desconto",
          label: "Pede desconto ou parcelamento maior antes de decidir",
          eixo: { oferta: 3 },
          report: "pedir desconto ou mais parcelas antes de decidir",
        },
        {
          value: "prova",
          label: "Pede prova, garantia ou cases antes de decidir",
          eixo: { oferta: 2 },
          report: "pedir prova, garantia ou cases antes de decidir",
        },
        {
          value: "some",
          label: "Some depois de receber a proposta ou a página",
          eixo: { caminho: 2, oferta: 1 },
          report: "sumir depois de receber a proposta",
        },
        {
          value: "chega_menos",
          label:
            "Decide sem negociar. O que mudou é que chega menos gente decidida do que antes",
          eixo: { caminho: 1 },
          report: "decidir sem negociar, e o que mudou é que chega menos gente decidida do que antes",
        },
      ],
    },

    { implicacao: "terco" },

    {
      id: "vazamento",
      papel: "Camada 4 · problema, uma por eixo",
      pergunta: "Do clique ao pagamento, onde mais gente se perde?",
      opcoes: [
        {
          value: "antes_contato",
          label: "Antes de deixar o contato, no anúncio, na página ou no formulário",
          eixo: { caminho: 2, desejo: 1 },
          report: "antes de deixar o contato",
        },
        {
          value: "contato_reuniao",
          label: "Entre o contato e a reunião ou o carrinho",
          eixo: { caminho: 3 },
          report: "entre o contato e a reunião",
        },
        {
          value: "reuniao_pagamento",
          label: "Entre a reunião e o pagamento",
          eixo: { oferta: 2, caminho: 1 },
          report: "entre a reunião e o pagamento",
        },
        {
          value: "nao_sei_onde",
          label: "Não sei medir onde",
          eixo: { caminho: 1 },
          naoMede: true,
          report: "num ponto do percurso que você ainda não consegue medir",
        },
      ],
    },

    { implicacao: "ajustes" },

    {
      id: "faturamento",
      papel: "Camada 5 · porteira de fase",
      pergunta:
        "Qual foi o faturamento médio mensal da operação nos últimos três meses?",
      opcoes: [
        { value: "ate50", label: "Até R$50 mil", fora: true, report: "até R$50 mil por mês" },
        { value: "50a100", label: "De R$50 mil a R$100 mil", rota: "diagnostico", report: "de R$50 mil a R$100 mil por mês" },
        { value: "100a300", label: "De R$100 mil a R$300 mil", rota: "aplicacao", report: "de R$100 mil a R$300 mil por mês" },
        { value: "acima300", label: "Acima de R$300 mil", rota: "aplicacao", report: "acima de R$300 mil por mês" },
      ],
    },

    {
      id: "execucao",
      papel: "Camada 6 · porteira de execução",
      pergunta: "Se a estrutura fosse recomposta, quem executa na sua operação?",
      opcoes: [
        {
          value: "equipe",
          label: "Tenho equipe que executa. Falta quem comande a decisão estrutural",
          equipe: true,
          report: "uma equipe que executa, e falta quem comande a decisão estrutural",
        },
        {
          value: "com_dois",
          label: "Eu executo com uma ou duas pessoas",
          rota: "diagnostico",
          report: "você e mais uma ou duas pessoas",
        },
        { value: "so_eu", label: "Sou só eu", rota: "diagnostico", report: "só você" },
        {
          value: "terceirizar",
          label: "Preferia terceirizar tudo",
          rota: "diagnostico",
          marca: "terceirizar",
          report: "vontade de terceirizar a execução inteira",
        },
      ],
    },
  ],

  /* ------------------------------------------------------------------ *
   * Telas de implicacao. Curtas, quase noticia, sem pitch.
   * So fato com fonte. A versao condicional responde ao ajuste (P5).
   * ------------------------------------------------------------------ */
  implicacoes: {
    leilao: {
      eyebrow: "Enquanto você responde",
      linhas: [
        "Desde janeiro de 2026 o leilão da Meta cobra 12,15% a mais por repasse de impostos, comunicado pela própria plataforma.",
        "Uma operação com R$50 mil de verba paga cerca de R$56 mil pelo mesmo resultado.",
      ],
      remate: "O clique encareceu para todos por decreto. A oferta igual às outras encarece só o seu.",
    },
    terco: {
      eyebrow: "Enquanto você responde",
      linhas: [
        "Conversão de 3% para 2% parece um ponto.",
        "É um terço da receita com a mesma operação.",
      ],
      remate:
        "Quando a conversão ainda não caiu, o mesmo desgaste aparece do outro lado: no custo por venda que sobe junto com a verba.",
    },
    ajustes: {
      eyebrow: "Enquanto você responde",
      geral: {
        linhas: [
          "Você trocou o criativo. Rendeu alguns dias.",
          "Trocou o público. Rendeu alguns dias.",
        ],
        remate:
          "Cada ajuste compra tempo. Nenhum devolve a margem. Enquanto a estrutura não for medida, tudo ao redor precisa compensar.",
      },
      desejo: {
        linhas: [
          "Criativo novo sobre promessa igual à dos vizinhos é a mesma promessa com roupa nova.",
          "Rende alguns dias, e o custo volta a subir.",
        ],
        remate:
          "Cada ajuste compra tempo. Nenhum devolve a margem. Enquanto a estrutura não for medida, tudo ao redor precisa compensar.",
      },
      oferta: {
        linhas: [
          "Desconto compra a venda de hoje.",
          "E ensina o próximo lead a negociar.",
        ],
        remate:
          "O que falta não é incentivo. É acordo que sustente a decisão sem ele. Enquanto isso não for medido, o preço precisa compensar.",
      },
      caminho: {
        linhas: [
          "Mais lead num percurso que vaza é mais vazamento em reais.",
          "Você já viu: dobrou a verba e a agenda não dobrou.",
        ],
        remate:
          "Cada ajuste compra tempo. Nenhum devolve a margem. Enquanto a estrutura não for medida, tudo ao redor precisa compensar.",
      },
      reflexo: {
        linhas: [
          "Subir a verba testa a estrutura. Baixar a verba esconde o teste.",
          "Nos dois casos, a estrutura continua exatamente como estava.",
        ],
        remate:
          "Cada ajuste compra tempo. Nenhum devolve a margem. Enquanto a estrutura não for medida, tudo ao redor precisa compensar.",
      },
    },
  },

  captura: {
    eyebrow: "Última etapa",
    titulo: "Para onde enviamos a sua leitura",
    subtitulo:
      "A leitura abre na tela a seguir. O laudo preliminar em PDF vai para o seu WhatsApp.",
    consentimento:
      "Os números que você informou alimentam só a sua conta. Nada é publicado, comparado ou vendido.",
    botao: "Ver a minha leitura",
  },

  loading: {
    mensagens: [
      "Cruzando as suas respostas nos três eixos...",
      "Calculando o seu Índice de Sustentação...",
      "Montando a sua leitura estrutural...",
    ],
  },

  /* ------------------------------------------------------------------ *
   * Os tres baldes (metodo ASK). O eixo decide QUAL leitura;
   * o Indice de Sustentacao decide QUAO intensa.
   * ------------------------------------------------------------------ */
  eixos: {
    desejo: {
      nome: "Desejo",
      selo: "A promessa entre iguais",
      chamada:
        "A sua promessa continua verdadeira. O que mudou é que ela parou de ser a única a dizer isso.",
      causa:
        "O Desejo cedeu. A promessa deixou de se distinguir das vizinhas: o mercado copiou até ela virar uma entre iguais. Quando a verba sobe, entra público mais frio, e público frio decide pela estrutura, não pela autoridade de quem assina. Uma promessa que não se distingue obriga o criativo a fazer o trabalho que a promessa deveria fazer sozinha.",
      sintomas: [
        "CPM e CPL subindo sem mudança de configuração",
        "Criativo que segurava meses hoje segura semanas",
        "Concorrente prometendo o mesmo, às vezes por menos",
        "Cliente comparando por preço antes de comparar por critério",
      ],
      naoAdianta: {
        titulo: "O que não adianta mexer",
        texto:
          "Trocar o criativo de novo. Testar outro público. Reescrever a copy. Promessa igual à dos vizinhos com criativo novo é a mesma promessa com roupa nova. Rende alguns dias, e o custo volta a subir.",
      },
      fase: "Semana 1 · Desejo, mensagem e acordo",
      faseTexto:
        "A reconstrução começa pela análise de concorrência promessa por promessa, e segue para a mensagem recomposta e a oferta canônica. É onde a sua promessa volta a ter um lugar que as vizinhas não ocupam.",
      papel:
        "Quem chega até você pelo anúncio decide antes de falar com qualquer pessoa da sua equipe. Hoje essa decisão está apoiada numa frase que vinte operações repetem.",
    },
    oferta: {
      nome: "Oferta",
      selo: "O sim que ficou caro",
      chamada:
        "A sua promessa ainda atrai. O que não está de pé é o acordo que vem depois dela.",
      causa:
        "A Oferta cedeu. A promessa ainda traz gente interessada, mas o acordo (prova, garantia, degraus, motivo de agora) não sustenta a decisão sozinho. Quando o acordo não sustenta, alguém precisa sustentar no lugar dele: você na conversa, o desconto na proposta, a insistência no acompanhamento. É por isso que a venda continua acontecendo e continua custando mais.",
      sintomas: [
        "Lead interessado que negocia desconto ou mais parcelas",
        "Pedido de prova, garantia ou case antes de decidir",
        "Ticket que não sobe, por mais que a entrega cresça",
        "Venda que só fecha com esforço no fechamento",
      ],
      naoAdianta: {
        titulo: "O que não adianta mexer",
        texto:
          "Baixar o preço. Empilhar mais um bônus. Abrir mais parcelas. Desconto compra a venda de hoje e ensina o próximo lead a negociar. O que falta não é incentivo, é acordo que sustente a decisão sem ele.",
      },
      fase: "Semana 2 · Lastro",
      faseTexto:
        "A reconstrução passa pela arquitetura de preço e risco (degraus, ancoragem, garantia e a política escrita para quando pedirem desconto) e pelo inventário de prova: o que já é crível hoje e o que falta construir, em ordem.",
      papel:
        "Toda vez que o acordo não se sustenta sozinho, quem sustenta é você. A sua presença virou peça de estrutura, e peça de estrutura não deveria depender da sua agenda.",
    },
    caminho: {
      nome: "Caminho",
      selo: "O percurso que vaza",
      chamada:
        "A decisão está nascendo. Ela só não sobrevive ao trajeto até o pagamento.",
      causa:
        "O Caminho cedeu. A decisão nasce pronta e se perde entre o clique e o pagamento. Cada passo do percurso é um ponto onde a pessoa precisa decidir de novo, e um percurso que não foi desenhado obriga a decidir muitas vezes. É o eixo mais fácil de confundir com falta de lead, porque o sintoma é sempre o mesmo: pouca gente chegando no fim.",
      sintomas: [
        "Muito lead e poucas reuniões ou compras",
        "Falta às reuniões marcadas, de forma crônica",
        "Formulário longo, agenda confusa, comercial sem processo",
        "A frase que você já disse: a página não converte",
      ],
      naoAdianta: {
        titulo: "O que não adianta mexer",
        texto:
          "Comprar mais tráfego. Trocar de ferramenta. Cobrar o closer. Mais lead num percurso que vaza é mais vazamento em reais. Você já viu: dobrou a verba e a agenda não dobrou.",
      },
      fase: "Semanas 2 e 3 · Caminho e implantação comandada",
      faseTexto:
        "A reconstrução escreve as peças do caminho (página, roteiro da mensagem de venda, formulário, sequência de e-mail e roteiro do comercial, do anúncio ao pagamento) e a sua equipe implanta sob comando, com o fluxo testado de ponta a ponta.",
      papel:
        "Quem se perde no meio do percurso tinha decidido. Essa pessoa procurou você, encontrou você e não conseguiu chegar até você.",
    },
  },

  /* Indice de Sustentacao: linguagem de carga, nunca nota, nunca percentual. */
  sustentacao: {
    baixa: {
      nome: "Sustentação baixa",
      leitura:
        "A estrutura está sendo compensada por fora em mais de um ponto ao mesmo tempo. Subir verba agora amplia o vazamento na mesma proporção.",
    },
    media: {
      nome: "Sustentação média",
      leitura:
        "A estrutura ainda sustenta a decisão em parte, e o restante é compensado por esforço. É a faixa em que o custo sobe devagar o bastante para não assustar.",
    },
    alta: {
      nome: "Sustentação em observação",
      leitura:
        "O sinal que a medição encontrou ainda é baixo. A estrutura está cedendo num ponto, e os outros dois eixos continuam absorvendo o que sobra. É a melhor hora possível para medir: a correção é de uma alavanca, não de três.",
    },
  },

  /* Dialeto: muda vocabulario e exemplo, NUNCA o diagnostico. */
  dialetos: {
    operador: {
      custo: "custo por venda",
      verba: "verba",
      publico: "público frio",
      exemplo:
        "No seu vocabulário: o CAC subiu antes de o faturamento cair, e a margem avisou primeiro.",
    },
    expert: {
      custo: "custo por venda",
      verba: "investimento em anúncio",
      publico: "quem chega sem conhecer você",
      exemplo:
        "No seu vocabulário: você vende bem, e crescer ficou caro o bastante para sobrar menos no fim do mês.",
    },
  },

  /* Rotas e botoes da pagina de resultado. */
  rotas: {
    aplicacao: {
      botao: "Aplicar ao Comando",
      micro: "Aplicação escrita. Dez minutos. Resposta em 24 horas. Sem call de vendas.",
      destino: "aplicacao.html",
    },
    diagnostico: {
      botao: "Pedir o Exame Estrutural",
      micro: "Conversa curta. Sem call de vendas, sem apresentação.",
      destino: "whatsapp",
    },
  },

  /* Bloco de autoridade. So claim escrito no material do cliente. */
  autoridade: {
    nome: "Fabrício Alves",
    cargo: "Arquiteto de Ofertas",
    origem:
      "Seis anos construindo, lançando e diagnosticando operações digitais de lançamento, perpétuo e ticket alto. A prática veio antes do método: o Scorecard DOC nasceu de ver a mesma falha aparecer em operações que não tinham nada em comum, exceto a ordem em que foram construídas. Eu meço onde a estrutura cede e recomponho o que sustenta a decisão.",
    credenciais: [
      { num: "6 anos", ctx: "de atuação estratégica no digital" },
      { num: "3 eixos", ctx: "medidos antes de qualquer peça ser tocada" },
      { num: "21 dias", ctx: "de comando, com data de saída marcada" },
      { num: "9 artefatos", ctx: "escritos e entregues, não prometidos" },
    ],
  },

  /* Casos autorizados a aparecer COM numero. Ver contexto/provas-e-casos.md. */
  casos: [
    {
      nome: "Fábio Salgado de Carvalho",
      marca: "Desvendando a Lógica",
      numero: "R$160 mil",
      janela: "em sete dias",
      texto:
        "Tinha base e nenhuma estrutura de decisão. Tese, oferta, campanha e caminho foram construídos do zero, e o primeiro lançamento semente fez esse número.",
    },
    {
      nome: "Rasta",
      marca: "Pergunte ao Rasta",
      numero: "R$85 mil",
      janela: "em sete dias",
      texto:
        "Lançamento desorganizado, promessa difusa, produto de R$400. Reposicionamento e estrutura. Um segundo ciclo, com produto de R$100, ficou perto de R$80 mil.",
    },
  ],
  casosNota:
    "Déa e Tiba, do Família Forte, também foram lançados por mim. Hoje ela passa de um milhão de seguidores e ele de setecentos mil. O resultado que tivemos juntos veio da estrutura, não da base, e o número fica fora daqui porque ainda não pedi autorização para usá-lo.",

  metodo: {
    eyebrow: "O que resolve",
    titulo: "A recomposição começa pelo eixo que cede",
    texto:
      "Uma alavanca por vez. Causa primeiro, sintoma depois. Sem pausar campanha, sem trocar de gestor, sem reescrever o negócio: a intervenção é feita com a máquina em movimento.",
    remate:
      "O procedimento tem nome: Recomposição Estrutural. O eixo, esta medição encontrou. O critério exato dentro do eixo, e a ordem certa de conserto, saem do Exame, com os seus números.",
  },
};
