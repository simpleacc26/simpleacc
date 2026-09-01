/* ============================================================
   FLOW. Toda a copy do quiz vive aqui.
   Cliente: Thiago Menegão · Protocolo PRIMAL PITCH
   Índice: IIC, Índice de Inversão de Camada.
   Objetivo do funil: venda direta do produto gravado de R$ 2 mil.
   NÃO existe reunião neste funil. A hora de consultoria dele custa R$ 9 mil,
   o produto custa R$ 2 mil: uma hora dele vale quatro vendas e meia. Nenhuma
   etapa pode exigir a presença dele.

   REGRAS DE ESCRITA NÃO NEGOCIÁVEIS NESTE CLIENTE (canvas + onboarding):
   1. Nunca usar travessão. Vírgula, dois-pontos, parênteses, ponto.
   2. Sem emoji.
   3. Nada de future pacing ("imagine daqui três meses"). O gatilho é sempre o
      custo de continuar adiando.
   4. Nada de ancoragem irreal ("valia 10 mil, leva por 2 mil"). Este comprador
      desdenha na hora, e contradiria o método que está sendo vendido.
   5. O avatar acredita que CONDUZIR É MANIPULAR. Nenhuma frase pode soar a
      pressão, dominação ou controle do lead. A linguagem que abre é condução,
      responsabilidade e clareza.
   6. Entrar pela causa, nunca pela solução. Consciência do problema é alta,
      da causa é baixa. Diferencial é mecanismo, nunca promessa.
   7. Descrever a cena, nunca acusar a pessoa. Acusar um vendedor de não saber
      vender ativa exatamente o alarme primal que o método ensina a desligar.
   Copy aprovada em estrategia/2026-08-06-estrategia-completa-copies-funil-quiz
   ============================================================ */
window.FLOW = {
  config: {
    storeKey: "thiago_menegao_quiz",
    frente: "Diagnóstico de Condução",
    diagnosticoUrl: "diagnostico.html",
    indice: { sigla: "IIC", nome: "Índice de Inversão de Camada" },
  },

  marca: {
    nome: "Thiago Menegão",
    expert: "Thiago Menegão",
    produto: "PRIMAL PITCH",
    tagline: "Protocolo PRIMAL PITCH",
    instagram: "@thiagomenegao",

    /* CHECKOUT. É para cá que vão TODOS os CTAs da página de diagnóstico.
       Este funil é venda direta: não existe agendamento, não existe call.
       TRAVA: enquanto estiver vazio, os botões não navegam e a página mostra
       um aviso no topo. Preencher antes de mandar qualquer tráfego. */
    checkoutUrl: "",

    /* WhatsApp de SUPORTE, só para dúvida de compra. Não é canal de venda e
       não pode virar atendimento do Thiago. Só dígitos, formato internacional.
       Vazio = o link de dúvida não aparece na página. */
    whatsapp: "",
    whatsappMsg: "Oi! Sou {nome}. Fiz o Diagnóstico de Condução, a minha trava é {trava} e tenho uma dúvida sobre o PRIMAL PITCH.",
  },

  /* A OFERTA. Preço e condições vivem aqui para não ficarem espalhados no HTML.
     Nada de "de X por Y": o produto custa R$ 2 mil e a justificativa é o
     contrato que a próxima reunião conduzida direito paga. */
  oferta: {
    nome: "PRIMAL PITCH",
    descricao: "O protocolo completo de condução de reuniões de alto valor",
    preco: "R$ 2.000",
    parcelamento: "à vista ou parcelado em até 12 vezes",
    acesso: "Acesso imediato à área de membros após a confirmação do pagamento",
    /* Turma de Fundadores. TRAVA DELIBERADA: o bloco só aparece se houver data
       real preenchida aqui, no formato "12 de outubro". Prazo inventado com
       este público custa mais caro que a venda que traria (nota de copy da
       estratégia, Seção 3 Parte 4). Vazio = o bloco inteiro não renderiza. */
    dataLimiteFundadores: "",
    /* Idem para a garantia: o prazo sai do checkout, não do nosso chute.
       Vazio = o bloco fala em garantia sem número, como na estratégia. */
    prazoGarantia: "",
  },

  /* As quatro travas. A P3 define a dominante e ela comanda a personalização
     da página inteira. Os textos saem da estratégia aprovada, Seção 3. */
  travas: {
    alarme: {
      nome: "Alarme Primal",
      etapas: "Abertura e Diagnóstico",
      etapasIdx: [1, 2],
      resumo: "o lead te classifica como vendedor nos primeiros segundos e passa a conversa inteira defendido.",
      caminho: "Antes de qualquer pergunta, o trabalho é desativar o alarme. Enquanto ele te classificar como vendedor, cada argumento seu vira mais um motivo para ele se proteger.",
    },
    diagnostico: {
      nome: "Diagnóstico Raso",
      etapas: "Diagnóstico e Espelho",
      etapasIdx: [2, 3],
      resumo: "ele responde tudo, mas nunca reconhece o tamanho do próprio problema. Sem reconhecimento, não existe urgência.",
      caminho: "Ele responde, mas não se enxerga. Falta a etapa que devolve a situação dele nas palavras dele, antes de qualquer proposta. Sem reconhecimento não existe urgência, e sem urgência não existe decisão.",
    },
    posicao: {
      nome: "Perda de Posição",
      etapas: "Contexto e Condução",
      etapasIdx: [4, 5],
      resumo: "ele assume a condução, faz as perguntas, e você vira apresentador.",
      caminho: "Quem faz as perguntas conduz a sala. O trabalho aqui é posição, ritmo e limite, para você voltar a conduzir sem endurecer a conversa.",
    },
    ancora: {
      nome: "Prescrição Sem Âncora",
      etapas: "Prescrição e Decisão",
      etapasIdx: [6, 7],
      resumo: "a conversa vai bem até o preço, porque o valor não foi ancorado antes de aparecer.",
      caminho: "O preço não é caro, ele chegou sozinho. Falta ancoragem instalada antes, e falta transformar oferta em prescrição, que é o passo natural de quem acabou de entender o próprio diagnóstico.",
    },
  },

  /* As sete etapas do Primal Closing, na ordem. Viram a régua visual do
     relatório: a barra cresce até o ponto em que o controle escapa, ou seja,
     até a PRIMEIRA etapa afetada pela trava (`etapasIdx` de cada trava, em
     base 1). Quem trava em Alarme Primal vê a barra quase vazia, quem trava em
     Prescrição Sem Âncora vê a barra quase cheia. */
  etapas: ["Abertura", "Diagnóstico", "Espelho", "Contexto", "Condução", "Prescrição", "Decisão"],

  hero: {
    titulo: "Existe uma etapa exata em que você perdeu aquela venda",
    subtitulo: "Responda e descubra em qual das sete etapas da sua reunião o controle escapa, por que o lead diz que vai pensar e o que precisa mudar antes da sua próxima call.",
    tempo: "Leva cerca de 2 minutos e o resultado é seu na hora",
  },

  /* ============================================================
     PERGUNTAS
     Ordem aprovada na estratégia (Seção 2). Pontuam no IIC apenas P1 a P5.
     P6 (objetivo), P7 (estrutura), P8 (a conta) e P9 (ticket) não pontuam:
     servem para o espelho, para a conta e para calibrar o argumento.

     `travas`: afinidade da opção com cada uma das quatro travas. É o que
     alimenta as barras do relatório. A P3 pesa mais porque é a que define a
     dominante.

     PESOS: calibrados rodando todas as combinações (ver calibrar.js). Quiz
     sem opção de "está tudo bem" tende a jogar todo mundo em Alta, que é o
     mesmo que não ter índice. Se mexer em qualquer peso, RODE A CALIBRAGEM
     DE NOVO.
     ============================================================ */
  steps: [
    {
      id: "origem",
      etapa: "Situação",
      pergunta: "Como as suas reuniões de venda chegam até você hoje?",
      options: [
        { value: "indicacao", label: "Quase tudo por indicação e rede", peso: 0,
          report: "receber quase tudo por indicação e rede",
          travas: { alarme: 0, diagnostico: 1, posicao: 1, ancora: 1 } },
        { value: "indicacao_conteudo", label: "Indicação e, de vez em quando, alguém do meu conteúdo", peso: 1,
          report: "viver de indicação e, de vez em quando, alguém que chega pelo seu conteúdo",
          travas: { alarme: 1, diagnostico: 1, posicao: 1, ancora: 1 } },
        { value: "trafego", label: "Tenho tráfego rodando e agenda entrando", peso: 2,
          report: "ter tráfego rodando e agenda entrando",
          travas: { alarme: 2, diagnostico: 1, posicao: 0, ancora: 1 } },
        { value: "time", label: "Tenho time comercial agendando para mim", peso: 2,
          report: "ter um time comercial agendando para você",
          travas: { alarme: 2, diagnostico: 2, posicao: 0, ancora: 1 } },
      ],
    },
    {
      id: "perda",
      etapa: "Situação",
      pergunta: "Como costumam terminar as reuniões que você não fecha?",
      options: [
        { value: "vou_pensar", label: "Ele diz que vai pensar e some", peso: 3,
          report: "ouvir que ele vai pensar e não ter mais notícia",
          travas: { alarme: 1, diagnostico: 2, posicao: 0, ancora: 2 } },
        { value: "proposta", label: "Pede para mandar a proposta por escrito", peso: 1,
          report: "ouvir o pedido de mandar a proposta por escrito",
          travas: { alarme: 0, diagnostico: 1, posicao: 2, ancora: 2 } },
        { value: "elogia", label: "Concorda com tudo, elogia, e não avança", peso: 3,
          report: "ver a pessoa concordar com tudo, elogiar, e não avançar",
          travas: { alarme: 1, diagnostico: 3, posicao: 0, ancora: 1 } },
        { value: "condicao", label: "Só avança se eu melhorar a condição", peso: 2,
          report: "só ver a conversa avançar quando você melhora a condição",
          travas: { alarme: 0, diagnostico: 1, posicao: 1, ancora: 3 } },
      ],
    },
    {
      id: "trava",
      etapa: "Problema · define a trava dominante",
      pergunta: "Em que momento da conversa você sente que perde o controle?",
      options: [
        { value: "alarme", label: "Logo no começo. Ele me trata como mais um vendedor desde o primeiro minuto", peso: 3,
          trava: "alarme",
          report: "sentir a conversa endurecer logo no começo, quando ele te trata como mais um vendedor",
          travas: { alarme: 5, diagnostico: 1, posicao: 1, ancora: 0 } },
        { value: "diagnostico", label: "No meio. Ele responde tudo, mas não reconhece o tamanho do próprio problema", peso: 3,
          trava: "diagnostico",
          report: "ver que ele responde tudo sem reconhecer o tamanho do próprio problema",
          travas: { alarme: 1, diagnostico: 5, posicao: 1, ancora: 1 } },
        { value: "posicao", label: "Quando ele assume a conversa, faz as perguntas e eu viro apresentador", peso: 2,
          trava: "posicao",
          report: "perceber que ele assumiu a conversa e você virou apresentador",
          travas: { alarme: 1, diagnostico: 1, posicao: 5, ancora: 1 } },
        { value: "ancora", label: "Na hora do preço. Até ali estava bom", peso: 1,
          trava: "ancora",
          report: "ver a conversa mudar de clima só na hora do preço",
          travas: { alarme: 0, diagnostico: 1, posicao: 1, ancora: 5 } },
      ],
    },
    {
      id: "custo",
      etapa: "Implicação",
      pergunta: "O que essa situação já te custou?",
      options: [
        { value: "desconto", label: "Dar desconto em contrato que valia o preço cheio", peso: 1,
          report: "dar desconto em contrato que valia o preço cheio",
          travas: { alarme: 0, diagnostico: 1, posicao: 1, ancora: 3 } },
        { value: "agenda", label: "Reunião de retorno que nunca acontece e agenda ocupada com quem não decide", peso: 2,
          report: "encher a agenda com reunião de retorno que nunca acontece",
          travas: { alarme: 1, diagnostico: 3, posicao: 1, ancora: 0 } },
        { value: "concorrente", label: "Ver concorrente com produto pior fechando no meu lugar", peso: 3,
          report: "ver concorrente com produto pior fechando no seu lugar",
          travas: { alarme: 2, diagnostico: 1, posicao: 2, ancora: 1 } },
        { value: "sem_entender", label: "Sair de reunião sem entender o que aconteceu e repetir o erro na seguinte", peso: 3,
          report: "sair de reunião sem entender o que aconteceu e repetir o erro na seguinte",
          travas: { alarme: 2, diagnostico: 2, posicao: 1, ancora: 1 } },
      ],
    },
    {
      id: "tentativa",
      etapa: "O que já tentou",
      pergunta: "O que você já tentou para mudar isso?",
      options: [
        { value: "script", label: "Troquei de script mais de uma vez", peso: 1,
          report: "trocar de script mais de uma vez",
          travas: { alarme: 1, diagnostico: 1, posicao: 1, ancora: 1 } },
        { value: "treinamento", label: "Comprei treinamento de vendas ou mentoria comercial", peso: 1,
          report: "comprar treinamento de vendas ou mentoria comercial",
          travas: { alarme: 1, diagnostico: 1, posicao: 1, ancora: 1 } },
        { value: "closer", label: "Contratei closer ou SDR para tirar isso de mim", peso: 2,
          report: "contratar closer ou SDR para tirar isso de você",
          travas: { alarme: 1, diagnostico: 1, posicao: 3, ancora: 1 } },
        { value: "trafego", label: "Aumentei o investimento em tráfego para compensar no volume", peso: 3,
          report: "aumentar o investimento em tráfego para compensar no volume",
          travas: { alarme: 2, diagnostico: 2, posicao: 1, ancora: 1 } },
      ],
    },
    {
      id: "objetivo",
      etapa: "Objetivo",
      pergunta: "O que você mais quer nos próximos meses?",
      options: [
        { value: "converter", label: "Converter mais das reuniões que já tenho, sem aumentar tráfego",
          report: "converter mais das reuniões que você já tem, sem aumentar tráfego" },
        { value: "estrutura", label: "Parar de improvisar e ter uma estrutura para seguir",
          report: "parar de improvisar e ter uma estrutura para seguir" },
        { value: "auditar", label: "Conseguir olhar uma call perdida e saber exatamente onde errei",
          report: "conseguir olhar uma call perdida e saber exatamente onde ela quebrou" },
        { value: "time", label: "Passar o método para o meu time",
          report: "passar o método para o seu time" },
      ],
    },
    {
      id: "estrutura",
      etapa: "Perfil · estrutura comercial",
      pergunta: "Como está montada a sua operação de vendas hoje?",
      options: [
        { value: "sozinho", label: "Sou eu que faço tudo, da prospecção ao fechamento",
          report: "fazer tudo sozinho, da prospecção ao fechamento" },
        { value: "agendador", label: "Eu fecho, e tenho alguém agendando",
          report: "fechar você mesmo, com alguém agendando" },
        { value: "closer", label: "Tenho closer vendendo junto comigo",
          report: "ter closer vendendo junto com você" },
        { value: "time_completo", label: "Tenho time comercial estruturado, com pré-vendas e closers", topo: true,
          report: "ter um time comercial estruturado, com pré-vendas e closers" },
      ],
    },
    {
      /* A CONTA. Junto com o ticket, permite devolver na página o número que o
         canvas diz que ele faz de madrugada. `reunioes` e `fechadas` são os
         valores CONSERVADORES usados no cálculo (piso da faixa, nunca o teto). */
      id: "conta",
      etapa: "A conta",
      pergunta: "Quantas reuniões de venda você faz por mês e quantas fecham?",
      options: [
        { value: "menos8", label: "Menos de 8 reuniões", reunioes: 6,
          report: "fazer menos de oito reuniões por mês" },
        { value: "8a15", label: "De 8 a 15, e fecho cerca de 2 em cada 10", reunioes: 10,
          report: "fazer de oito a quinze reuniões por mês e fechar cerca de duas em cada dez" },
        { value: "15a30_2", label: "De 15 a 30, e fecho cerca de 2 em cada 10", reunioes: 18,
          report: "fazer de quinze a trinta reuniões por mês e fechar cerca de duas em cada dez" },
        { value: "15a30_3", label: "De 15 a 30, e fecho mais de 3 em cada 10", reunioes: 18,
          report: "fazer de quinze a trinta reuniões por mês e fechar mais de três em cada dez" },
      ],
    },
    {
      /* TICKET. Calibra o argumento, nunca barra. Quem vende abaixo de R$ 3 mil
         precisa ainda mais do protocolo e o preço cabe (regra da estratégia).
         `ticket` é sempre o PISO da faixa, para a conta nunca inflar. */
      id: "ticket",
      etapa: "Ticket",
      pergunta: "Qual é o ticket do que você vende em reunião?",
      options: [
        { value: "ate3", label: "Até R$ 3 mil", ticket: 2000, faixa: "baixo",
          report: "vender até R$ 3 mil por contrato" },
        { value: "3a5", label: "De R$ 3 mil a R$ 5 mil", ticket: 3000, faixa: "medio",
          report: "vender de R$ 3 mil a R$ 5 mil por contrato" },
        { value: "5a25", label: "De R$ 5 mil a R$ 25 mil", ticket: 5000, faixa: "alto",
          report: "vender de R$ 5 mil a R$ 25 mil por contrato" },
        { value: "acima25", label: "Acima de R$ 25 mil", ticket: 25000, faixa: "alto", topo: true,
          report: "vender acima de R$ 25 mil por contrato" },
      ],
    },
  ],

  /* ============================================================
     TELAS DE CARREGAMENTO SIMULADAS
     Modeladas na referência (Full Sales System), que usa quatro intersticiais
     no meio do quiz e não um só no fim. Cada uma carrega argumento, não espera.
     Especificação completa em copy/2026-09-01-telas-de-carregamento-funil-quiz
     `after` = id da pergunta depois da qual a tela entra.
     `campo` = quando presente, o título recebe a resposta daquela pergunta.
     ============================================================ */
  intersticiais: [
    {
      id: "espelho_perda",
      after: "perda",
      campo: "perda",
      semResposta: "ver a conversa terminar sem decisão",
      titulo: "Você acabou de descrever o fim da conversa.",
      texto: "{resposta}: é ali que a conta chega, e quase nunca é ali que o erro acontece. As próximas perguntas procuram o momento anterior.",
      barra: "Organizando suas respostas",
      duracao: 2200,
    },
    {
      id: "reframe",
      after: "custo",
      titulo: "Reunião perdida quase nunca morre no preço.",
      texto: "Ela morre alguns minutos antes, quando a condução troca de lado da mesa e o preço vira a única coisa que sobrou para discutir.",
      barra: "Cruzando com as sete etapas",
      duracao: 2200,
    },
    {
      id: "autoridade",
      after: "objetivo",
      titulo: "Quem monta essa análise não veio de vendas.",
      texto: "Thiago Menegão é engenheiro de computação e passou quase duas décadas em estratégia, comunicação e comportamento dentro de empresas como Mercedes, Itaú, Honda, John Deere, Electrolux e Philips, antes de precisar fechar os próprios contratos. A leitura aqui é de comportamento e de decisão, não de técnica de fechamento.",
      barra: "Preparando sua análise",
      duracao: 2600,
    },
  ],

  captura: {
    titulo: "Seu diagnóstico está pronto.",
    subtitulo: "Preencha abaixo para ver o resultado e receber uma cópia por e-mail.",
    campos: [
      { id: "nomeResp", label: "Seu nome", type: "text", required: true, autocomplete: "name", placeholder: "Como podemos te chamar?" },
      { id: "whatsapp", label: "Seu WhatsApp (com DDD)", type: "tel", required: true, autocomplete: "tel", placeholder: "(11) 99999-9999", mask: "phone" },
      { id: "email", label: "Seu e-mail", type: "email", required: true, autocomplete: "email", placeholder: "voce@email.com" },
      { id: "oquevende", label: "O que você vende", type: "text", required: true, autocomplete: "off", placeholder: "Ex.: consultoria de gestão para indústria" },
    ],
    cta: "Ver meu diagnóstico",
    privacidade: "Seus dados estão seguros. Nada de spam, só o seu diagnóstico e o próximo passo.",
  },
};
