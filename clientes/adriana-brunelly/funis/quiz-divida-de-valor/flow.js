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
    /* Retrato usado na página de diagnóstico, no bloco em que ela fala de si.
       Original: "FOTO NO COCO BAMBU 7.png", na pasta de fotos do Drive. */
    foto: "adriana.webp",
    fotoAlt: "Adriana Brune'lly",
  },

  /* ---------------------------------------------------------
     TELA DE CARREGAMENTO
     Os 5 segundos entre o quiz e o diagnóstico não são espera
     técnica: são a pausa que faz o resultado parecer calculado
     para aquela pessoa, e não entregue de prateleira.
     --------------------------------------------------------- */
  loading: {
    duracaoMs: 5000,
    eyebrow: "Quase lá",
    titulo: "Fechando a sua conta",
    mensagens: [
      "Analisando as suas respostas...",
      "Gerando o seu diagnóstico...",
    ],
    nota: "O seu resultado é montado com o que você respondeu, não com média de mercado.",
  },

  /* ---------------------------------------------------------
     HERO + CAPTURA
     ORDEM DO FUNIL, e ela não muda: QUIZ -> CAPTURA -> DIAGNÓSTICO.
     A pessoa responde primeiro e só deixa o contato quando a conta
     dela já está pronta do outro lado. Pedir o dado antes de dar
     qualquer coisa em troca é pedágio na porta, e derruba o topo.
     O hero vive na primeira pergunta, sem tela de intro no meio.
     --------------------------------------------------------- */
  /* A abertura é dela, palavra por palavra (feedback da Tela 01). A versão
     anterior falava em "orçamento" e "caixa" como conceitos de gestão, e
     para este público "orçamento" é o valor que se cobra por um evento,
     não uma peça financeira. A pergunta no espelho funciona melhor: a
     pessoa lê e pensa "já me perguntei isso sim". */
  hero: {
    selo: "Diagnóstico gratuito · 2 minutos",
    titulo: "Você já se fez essa pergunta? <em>Quanto de dinheiro estou perdendo</em> em meu negócio?",
    subtitulo: "Em 2 minutos você vai saber por onde está perdendo dinheiro no seu negócio.",
    cta: "Quero ver a minha conta",
  },

  /* Formulário aprovado por ela tela a tela, e é curto de propósito: o
     botão tem que aparecer sem rolar a tela. Saíram o e-mail (a cadência
     dela é toda de WhatsApp, e-mail era campo que ninguém ia usar) e o
     tempo de mercado (não coube nas 12 perguntas nem no formulário sem
     empurrar o botão para fora da tela).
     O título é dela: "conta" remetia a cadastro justo no momento de maior
     tensão, e "por ano" é o número que faz preencher. */
  captura: {
    titulo: "Você está mais perto de saber quanto a sua Dívida de Valor está fazendo você perder em dinheiro por ano, dentro do seu negócio!",
    campos: [
      { id: "nomeResp", label: "Como eu te chamo?", type: "text", required: true, autocomplete: "name", placeholder: "Seu nome" },
      { id: "whatsapp", label: "Seu WhatsApp (com DDD)", type: "tel", required: true, autocomplete: "tel", placeholder: "(43) 99999-9999", mask: "phone" },
      { id: "cidade", label: "Cidade e Estado", type: "text", required: true, autocomplete: "address-level2", placeholder: "Londrina, PR" },
      { id: "instagram", label: "Seu Instagram", type: "text", required: true, placeholder: "@seuperfil" },
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
     passa pelo comportamento reconhecível, depois pelos números de
     entrada e de saída, e só no fim chega no que exige parar para
     pensar (o que você sente no fim do mês, o que mudaria em 3
     meses). A qualificação financeira é sempre a última.

     São 12 perguntas, o teto da apostila para high ticket. Não
     passe disso: o lead deste funil é justamente o que não tem
     tempo.

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
      /* Assessoria e cerimonial saíram: não são o foco do Método ACA®.
         Entrou quem faz as duas coisas, que é fatia grande do mercado dela. */
      options: [
        { value: "buffet",     label: "Tenho um buffet",                                report: "buffet" },
        { value: "decoracao",  label: "Trabalho com decoração de festas",               report: "decoração de festas" },
        { value: "doceira",    label: "Sou doceira ou confeiteira",                     report: "doces e confeitaria" },
        { value: "buffet_deco", label: "Tenho um buffet e também trabalho com decoração", report: "buffet e decoração" },
      ],
    },
    {
      id: "volume",
      etapa: "O seu volume",
      pergunta: "Quantos eventos ou pedidos você entrega por mês, em média?",
      options: [
        { value: "ate3",   label: "Até 3",        report: "até 3",       valor: 2,  min: 2,  peso: { agenda: 0 } },
        { value: "4a8",    label: "De 4 a 8",     report: "de 4 a 8",    valor: 6,  min: 4 },
        { value: "9a15",   label: "De 9 a 15",    report: "de 9 a 15",   valor: 12, min: 9,  peso: { agenda: 1 } },
        { value: "mais15", label: "Mais de 15",   report: "mais de 15",  valor: 18, min: 15, peso: { agenda: 2 } },
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
      pergunta: "E os extras: no fechamento do contrato ou após ele, o cliente pede algo fora do combinado?",
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
      etapa: "Quanto você cobra",
      pergunta: "Qual é o valor médio de um evento ou pedido seu?",
      options: [
        { value: "ate3",      label: "Até R$ 3 mil",                report: "até R$ 3 mil",              valor: 2000,   min: 2000 },
        { value: "3a8",       label: "De R$ 3 mil a R$ 8 mil",      report: "de R$ 3 mil a R$ 8 mil",    valor: 5500,   min: 3000 },
        { value: "8a15",      label: "De R$ 8 mil a R$ 15 mil",     report: "de R$ 8 mil a R$ 15 mil",   valor: 11500,  min: 8000 },
        { value: "15a30",     label: "De R$ 15 mil a R$ 30 mil",    report: "de R$ 15 mil a R$ 30 mil",  valor: 22500,  min: 15000 },
        { value: "30a60",     label: "De R$ 30 mil a R$ 60 mil",    report: "de R$ 30 mil a R$ 60 mil",  valor: 45000,  min: 30000 },
        { value: "60a120",    label: "De R$ 60 mil a R$ 120 mil",   report: "de R$ 60 mil a R$ 120 mil", valor: 90000,  min: 60000 },
        { value: "acima120",  label: "Acima de R$ 120 mil",         report: "acima de R$ 120 mil",       valor: 150000, min: 120000 },
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
      id: "comissao",
      etapa: "As indicações",
      /* A pergunta anterior soava como julgamento, como se ela escolhesse
         pagar. Quem pede a comissão é o parceiro: ela responde a uma
         demanda de fora. E "festa" exclui doceira e confeiteira, então
         virou "contrato" em todas as alternativas. */
      pergunta: "Quando um parceiro ou agência traz um contrato e pede comissão pela indicação, quanto você costuma pagar?",
      options: [
        { value: "nao_trabalho", label: "Não trabalho com indicação de parceiros",
          report: "não trabalhar com indicação de parceiros",     valor: 0 },
        { value: "ate3",         label: "Até 3% do valor do contrato",
          report: "até 3% do valor do contrato",                  valor: 0.03 },
        { value: "3a5",          label: "De 3% a 5%",
          report: "de 3% a 5% do valor do contrato",              valor: 0.04 },
        { value: "5a8",          label: "De 5% a 8%",
          report: "de 5% a 8% do valor do contrato",              valor: 0.065, peso: { desconto: 1 } },
        { value: "dez_mais",     label: "10% ou mais",
          report: "10% ou mais do valor do contrato",             valor: 0.10,  peso: { desconto: 2 } },
      ],
    },
    {
      id: "equipe",
      etapa: "A sua equipe",
      pergunta: "Somando equipe fixa e freelancer, quanto a mão de obra absorve de um evento seu?",
      options: [
        { value: "ate10",     label: "Até 10% do valor do evento",
          report: "até 10% do valor do evento",                  valor: 0.08 },
        { value: "10a20",     label: "De 10% a 20%",
          report: "de 10% a 20% do valor do evento",             valor: 0.15 },
        { value: "20a30",     label: "De 20% a 30%",
          report: "de 20% a 30% do valor do evento",             valor: 0.25, peso: { agenda: 1 } },
        { value: "mais30",    label: "Mais de 30%",
          report: "mais de 30% do valor do evento",              valor: 0.35, peso: { agenda: 2 } },
        { value: "nunca_fiz", label: "Nunca fiz essa conta",
          report: "que nunca fez essa conta",                    valor: 0,    peso: { extra: 2 } },
      ],
    },
    {
      id: "tentativas",
      etapa: "O crescimento",
      /* Ela não acorda querendo "resolver a precificação": acorda querendo
         crescer. A pergunta fala a língua do que a pessoa acredita, e o
         diagnóstico é que entrega a leitura real depois. As alternativas
         são por TIPO de tentativa, não por segmento: arte floral não diz
         nada para confeiteira, e confeitaria não diz nada para buffet. */
      pergunta: "Para crescer o seu negócio, o que você já buscou fazer?",
      options: [
        { value: "curso",     label: "Busquei cursos técnicos para melhorar minha entrega",
          report: "buscou cursos técnicos para melhorar a entrega" },
        { value: "redes",     label: "Investi em presença nas redes sociais",
          report: "investiu em presença nas redes sociais",            peso: { orcamento: 1 } },
        { value: "financeiro", label: "Procurei curso ou planilha de gestão financeira",
          report: "procurou curso ou planilha de gestão financeira",   peso: { extra: 1 } },
        { value: "mentoria",  label: "Busquei mentoria ou consultoria de negócios",
          report: "buscou mentoria ou consultoria de negócios" },
        { value: "nada",      label: "Nunca tentei nada específico, fui levando",
          report: "nunca tentou nada específico, foi levando" },
      ],
    },
    {
      id: "sentimento",
      etapa: "O fim do mês",
      pergunta: "No fim do mês, quando você olha a conta, o que você sente?",
      /* Escala emocional, do mais controlado ao mais crítico: a pessoa
         percorre de cima para baixo e para quando se reconhece. A segunda
         opção é dela e preenche o buraco do perfil que enxerga a falta mas
         não sabe onde está a causa, que é justamente quem mais precisa do
         diagnóstico. */
      options: [
        { value: "ok",           label: "Está bom, sobra o que eu planejei",
          report: "que está bom, e sobra o que você planejou" },
        { value: "sem_solucao",  label: "Não sobra o que preciso e não sei a solução para isso",
          report: "que não sobra o que você precisa, e que você não sabe a solução", peso: { orcamento: 1, extra: 1 } },
        { value: "nao_sobra",    label: "Entrou muito dinheiro e não sobrou quase nada",
          report: "que entrou muito dinheiro e não sobrou quase nada",  peso: { agenda: 2 } },
        { value: "sobrou_menos", label: "Sobrou menos que no mês passado e eu não sei explicar por quê",
          report: "que sobrou menos que no mês passado, sem explicação", peso: { extra: 1, agenda: 1 } },
        { value: "evito",        label: "Eu evito olhar",
          report: "que prefere não olhar",                              peso: { agenda: 1, extra: 1 } },
      ],
    },
    {
      id: "objetivo",
      etapa: "O seu objetivo",
      /* É aqui que o nome "Dívida de Valor" aparece pela primeira vez, sem
         explicação nenhuma. A curiosidade é o gancho: a pessoa lê, pensa
         "o que é isso? eu tenho isso?", e o diagnóstico é a resposta. */
      pergunta: "Se em 3 meses você aprendesse como parar de perder dinheiro com a sua Dívida de Valor, e começasse a ter um negócio mais lucrativo, o que você mudaria?",
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
      /* Única exceção ao vocabulário simples: o termo técnico fica, com a
         tradução entre parênteses, para não excluir nem quem usa o termo
         nem quem nunca usou. */
      pergunta: "Quanto o seu negócio fatura (vende) por mês, em média?",
      options: [
        { value: "ate10",     label: "Até R$ 10 mil",                report: "até R$ 10 mil",              fora: true },
        { value: "10a25",     label: "De R$ 10 mil a R$ 25 mil",     report: "de R$ 10 mil a R$ 25 mil",   nutrir: true, fatMax: 25000 },
        { value: "25a40",     label: "De R$ 25 mil a R$ 40 mil",     report: "de R$ 25 mil a R$ 40 mil",   nutrir: true, fatMax: 40000 },
        { value: "40a80",     label: "De R$ 40 mil a R$ 80 mil",     report: "de R$ 40 mil a R$ 80 mil", fatMax: 80000 },
        { value: "80a150",    label: "De R$ 80 mil a R$ 150 mil",    report: "de R$ 80 mil a R$ 150 mil", fatMax: 150000 },
        { value: "150a300",   label: "De R$ 150 mil a R$ 300 mil",   report: "de R$ 150 mil a R$ 300 mil", fatMax: 300000 },
        { value: "acima300",  label: "Acima de R$ 300 mil",          report: "acima de R$ 300 mil", fatMax: 300000 },
      ],
    },
  ],

  /* ---------------------------------------------------------
     INTERSEÇÕES (apostila, Parte 2)
     Telas curtas de implicação entre as perguntas. Não são pitch:
     são consequência. Começam a vender dentro do marketing.

     REGRA, e ela custou caro para ser aprendida: a interseção é
     montada COM AS RESPOSTAS DA PRÓPRIA PESSOA. A primeira versão
     tinha texto fixo, com um evento de R$ 15 mil que não era o
     dela, e a reação foi a certa: "de onde ele tirou esse
     número?". Cada tela recebe um `monta(c)` e devolve num, texto
     e fonte a partir do que já foi respondido até ali.

     Dentro de `monta` só existe o que a pessoa JÁ marcou: a tela
     do orçamento roda antes do ticket, então ali não se fala em
     dinheiro. E a tela do desconto usa valor POR EVENTO, nunca
     total do ano, porque o total só ganha o teto do faturamento
     na última pergunta e sairia brigando com o número final.
     --------------------------------------------------------- */
  interseccoes: {
    /* Depois da P3. Ainda não existe ticket respondido, então aqui não se
       fala em dinheiro: a implicação é de volume, com a conta de entregas
       que a própria pessoa acabou de marcar. */
    orcamento: {
      monta: function (c) {
        var porMes = c.valor("volume") || 0;
        var porAno = porMes * 12;
        var abre = porAno
          ? "São cerca de " + porAno + " entregas por ano, no ritmo que você marcou agora. "
          : "";
        return {
          num: porAno ? porAno + " eventos por ano" : "13 eventos em 1 semana",
          texto: abre + "Em 2017 eu entreguei treze numa única semana. Passei 72 horas sem dormir, ficou tudo impecável, e na segunda-feira fui olhar os números: não tinha sobrado quase nada. <strong>Trabalhar mais nunca foi o que faltou.</strong>",
          fonte: "Adriana Brune'lly, 2017",
        };
      },
    },

    /* A TELA DE IMPACTO. Depois da P7 (comissão), que é o último dado que
       entra na conta. Vem depois de propósito: com ticket, volume,
       desconto, extras e comissão na mão, o número que aparece é o dela,
       calculado com o que ela mesma respondeu, e não um exemplo.

       O número é ANUAL. O cérebro não sente R$ 1.500 por evento, sente
       R$ 144 mil por ano, e é o anual que faz a pessoa parar.

       Fecha com a pergunta do sonho: perda em reais é abstrata, carro e
       viagem não são. É aí que ela decide que precisa mudar. */
    comissao: {
      monta: function (c) {
        /* Conta pelo PISO das duas faixas, não pelo meio. Esta tela roda
           antes da pergunta de faturamento, então ela não tem como aplicar
           o teto que o diagnóstico aplica. Contando por baixo, o número
           daqui é chão e não teto, e quase nunca vai ser maior que o do
           resultado. Quando for (respostas que não fecham entre si), a
           página assume a diferença em voz alta em vez de escondê-la. */
        var oTicket = c.opcao("ticket"), oVol = c.opcao("volume");
        var ticket = (oTicket && (oTicket.min || oTicket.valor)) || 0;
        var eventos = (oVol && (oVol.min || oVol.valor)) || 0;
        var pctDesc = c.valor("desconto") || 0;
        var pctExtra = c.valor("extras") || 0;
        var pctCom = c.valor("comissao") || 0;
        var pctTotal = pctDesc + pctExtra + pctCom;

        if (!ticket || !eventos || !pctTotal) {
          return {
            num: "Você fechou as três portas",
            texto: "Você não dá desconto, o seu contrato segura os extras e você não paga comissão de indicação. São os três lugares por onde o dinheiro mais escapa neste mercado, e nenhum deles está em você. <strong>Então a sua perda está em outro lugar.</strong> As próximas perguntas dizem onde.",
            fonte: "Leitura das suas respostas até aqui",
          };
        }

        var porEvento = ticket * pctTotal;
        var anual = porEvento * eventos * 12;
        var itens = [];
        if (pctDesc > 0)  itens.push("o desconto que você dá para fechar");
        if (pctExtra > 0) itens.push("o extra que você entrega e não cobra");
        if (pctCom > 0)   itens.push("a comissão que o parceiro pede");
        var lista = itens.length === 1 ? itens[0]
          : itens.slice(0, -1).join(", ") + " e " + itens[itens.length - 1];

        return {
          num: c.brl(anual) + " em 12 meses",
          texto: "Você já fez essa conta? Você entrega " + c.frase("volume") +
            " eventos por mês e cobra " + c.frase("ticket") + " em cada um. Vou fazer por baixo, com " +
            eventos + " eventos de " + c.brl(ticket) + ": somando " + lista +
            ", saem <strong>" + c.brl(porEvento) + " de cada contrato</strong>. " +
            "Em 12 meses, <strong>" + c.brl(anual) + " que saíram do seu negócio sem você perceber.</strong>",
          sonho: "Com esse valor você poderia ter comprado um carro, feito uma viagem com a sua família, trocado os equipamentos da sua operação, ou simplesmente guardado.",
          fonte: "Conta feita com o que você respondeu até aqui",
        };
      },
    },

    /* Depois da P9. Responde à tentativa que ela marcou, uma a uma, e
       fecha com a virada da Adriana na frase que ela mesma pediu, sem
       porcentagem de margem no meio. */
    tentativas: {
      monta: function (c) {
        var mapa = {
          curso:      { num: "Não era a entrega",        linha: "Curso técnico melhora a entrega, e a sua entrega já é boa. O problema nunca esteve ali." },
          redes:      { num: "Não era o alcance",        linha: "Rede social traz mais gente pedir orçamento. Mais gente pedindo o mesmo orçamento não muda o que sobra no fim do mês." },
          financeiro: { num: "Não era a planilha",       linha: "Planilha mostra o preço certo. Ela não te ensina a defender esse preço na hora do sim." },
          mentoria:   { num: "Não era falta de ajuda",   linha: "Você já buscou orientação, e isso conta a seu favor. Só que quase toda mentoria de eventos ensina a entregar melhor, não a cobrar melhor." },
          nada:       { num: "Não era falta de esforço", linha: "Você foi levando, que é o que quase todo mundo faz. Trabalhar mais nunca foi o que faltou aqui." },
        };
        var m = mapa[c.a.tentativas] || mapa.nada;
        return {
          num: m.num,
          texto: m.linha + " Eu tentei todas elas, uma por uma, antes de entender que o que precisava mudar era para quem eu vendia. <strong>Eu trabalhava mais e lucrava menos. Hoje eu trabalho menos e lucro mais.</strong>",
          fonte: "Adriana Brune'lly, antes e depois da virada",
        };
      },
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
      resumo: "O contrato termina e o serviço continua. É dinheiro saindo pela porta dos fundos, e é o padrão que menos se enxerga.",
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
