/* ============================================================
   FLOW. Toda a copy do quiz vive aqui.
   Cliente: Rafael Cobra · psicanalista · Método Cobra
   Índice: IRP, Índice de Repetição do Padrão.
   Estrutura: blueprint "estrutura invisível" da Simple (SPIN, as 2 porteiras
   no fim, índice só nas perguntas de diagnóstico).
   Copy aprovada: estrategia/2026-08-13-estrategia.html, seções 2 e 3.
   Padrão de escrita: nunca usar travessões. Sem emoji.

   GÊNERO: aqui é o oposto do padrão. O ICP deste funil é exclusivamente
   feminino (mulher de 35 a 60, carreira consolidada), então a concordância é
   no feminino em todo o texto: "presa", "sozinha", "cansada". Não neutralize.

   RÉGUA DA MARCA (seção 1 da estratégia). Fala: padrão, origem, repetir a
   história, aceitar menos do que merece, parar de aceitar, quem você se torna
   dentro da relação. Não fala: conquistar, reconquistar, fazer ele correr
   atrás, carente, promessa de encontrar alguém, caso clínico.
   ============================================================ */
window.FLOW = {
  config: {
    storeKey: "rafael_cobra_quiz",
    frente: "Diagnóstico do Padrão Afetivo",
    diagnosticoUrl: "diagnostico.html",
    indice: { sigla: "IRP", nome: "Índice de Repetição do Padrão" },
  },

  marca: {
    nome: "Rafael Cobra",
    expert: "Rafael Cobra",
    tagline: "Método Cobra",
    instagram: "@orafaelcobra",
    /* PENDENTE: WhatsApp comercial, só dígitos, formato internacional
       (ex.: 5521999999999). Enquanto estiver vazio, os CTAs não abrem
       conversa e a página de diagnóstico mostra um aviso no topo. É de
       propósito: melhor um aviso visível do que um botão mudo no ar. */
    whatsapp: "",
    /* A mensagem leva o RESULTADO NOMEADO, não só o nome: ele abre a conversa
       já sabendo o padrão dela. Placeholders: {nome} {resultado} {irp}
       {faixa} {padrao}. */
    whatsappMsg: "Oi, Rafael! Sou {nome}. Fiz o Diagnóstico do Padrão Afetivo e o meu resultado foi {resultado}, com IRP de {irp} (repetição {faixa}). Quero falar sobre a sessão de diagnóstico.",
  },

  /* Os 4 padrões da seção 3 da estratégia. O nome é o resultado: é o que vai
     no WhatsApp, na planilha e no topo do relatório. */
  resultados: {
    "Provedora Emocional":   "A Provedora Emocional",
    "Espera a Definição":    "A Que Espera a Definição",
    "Sabe e Não Sai":        "A Que Sabe e Não Sai",
    "Blindada":              "A Blindada",
  },

  hero: {
    titulo: "Por que você atrai homens que não te escolhem?",
    subtitulo: "Não é azar, não é dedo podre e não é falta de opção. É um padrão, e todo padrão tem origem.",
    tempo: "10 perguntas, cerca de 2 minutos, e o resultado é seu na hora",
  },

  /* Ordem SPIN. peso 0 a 3 entra no IRP (só nas perguntas de diagnóstico).
     Objetivo e as duas porteiras não pontuam.
     PESOS CALIBRADOS sobre as 16.384 combinações possíveis das 7 perguntas
     que pontuam. Distribuição publicada: 42% Alta, 57% Média, 0,3% Baixa, amplitude de 19% a 100%.
     A faixa Baixa é rara de propósito: quem responde este quiz já se
     reconhece no problema, e não existe alternativa de "está tudo bem".
     Se mexer em qualquer peso, RODE A DISTRIBUIÇÃO DE NOVO (ver README). */
  steps: [
    {
      id: "situacao",
      etapa: "Situação",
      pergunta: "Como está a sua vida amorosa hoje?",
      options: [
        { value: "solteira", label: "Solteira, e faz tempo que não aparece nada sério", peso: 1,
          report: "estar solteira há um tempo, sem que apareça nada sério" },
        { value: "insegura", label: "Num relacionamento que me deixa mais insegura do que em paz", peso: 3,
          report: "estar numa relação que te deixa mais insegura do que em paz" },
        { value: "sem_definir", label: "Saindo com alguém que não define nada", peso: 2,
          report: "estar com alguém que não define nada" },
        { value: "recompondo", label: "Acabei de sair de uma relação e ainda estou me recompondo", peso: 0,
          report: "estar se recompondo de uma relação que acabou" },
      ],
    },
    {
      id: "problema",
      etapa: "O que se repete",
      pergunta: "Qual dessas frases mais parece ter saído da sua boca?",
      options: [
        { value: "incrivel", label: "\"Ele fala que sou incrível, maravilhosa, mas não me namora\"", peso: 2, padrao: "Espera a Definição",
          report: "ouvir que é incrível de homens que não te namoram" },
        { value: "dou_mais", label: "\"Eu sempre dou mais do que recebo\"", peso: 3, padrao: "Provedora Emocional",
          report: "dar sempre mais do que recebe" },
        { value: "nao_saio", label: "\"Eu sei que ele não me faz bem, mas eu não consigo sair\"", peso: 3, padrao: "Sabe e Não Sai",
          report: "saber que a relação não te faz bem e ainda assim não conseguir sair" },
        { value: "conquistei", label: "\"Eu conquistei tudo, menos uma relação que preste\"", peso: 1, padrao: "Blindada",
          report: "ter conquistado tudo, menos uma relação que preste" },
      ],
    },
    {
      id: "repeticao",
      etapa: "O padrão",
      pergunta: "O que mais se repete nas suas relações?",
      options: [
        { value: "indisponiveis", label: "Escolho homens emocionalmente indisponíveis", peso: 2, padrao: "Espera a Definição",
          report: "escolher homens emocionalmente indisponíveis" },
        { value: "me_anulo", label: "Me anulo para a relação dar certo", peso: 3, padrao: "Provedora Emocional",
          report: "se anular para a relação dar certo" },
        { value: "migalha", label: "Aceito migalha achando que vai virar mais", peso: 3, padrao: "Provedora Emocional",
          report: "aceitar migalha achando que um dia vira mais" },
        { value: "afasto", label: "Afasto quem é bom para mim e corro atrás de quem não me quer", peso: 1, padrao: "Blindada",
          report: "afastar quem é bom e correr atrás de quem não te quer" },
      ],
    },
    {
      id: "reacao",
      etapa: "Quando dói",
      pergunta: "Quando a relação começa a te machucar, o que você faz?",
      options: [
        { value: "justifico", label: "Tento entender e justificar o comportamento dele", peso: 2,
          report: "entender e justificar o comportamento dele" },
        { value: "cobro", label: "Cobro, ele promete mudar, e nada muda", peso: 1,
          report: "cobrar, ouvir promessa de mudança e não ver nada mudar" },
        { value: "engulo", label: "Engulo para não parecer difícil", peso: 3,
          report: "engolir o que incomoda para não parecer difícil" },
        { value: "volto", label: "Termino, mas volto", peso: 3,
          report: "terminar e voltar" },
      ],
    },
    {
      id: "tempo",
      etapa: "Há quanto tempo",
      pergunta: "Há quanto tempo esse padrão se repete?",
      options: [
        { value: "ate2", label: "Menos de 2 anos", peso: 0, report: "menos de dois anos" },
        { value: "2a5", label: "De 2 a 5 anos", peso: 1, report: "de dois a cinco anos" },
        { value: "5a10", label: "De 5 a 10 anos", peso: 2, report: "de cinco a dez anos" },
        { value: "mais10", label: "Mais de 10 anos, com pessoas diferentes", peso: 3, report: "mais de dez anos, com pessoas diferentes" },
      ],
    },
    {
      id: "custo",
      etapa: "O custo",
      pergunta: "O que isso já custou a você?",
      options: [
        { value: "autoestima", label: "Minha autoestima", peso: 1, report: "a sua autoestima" },
        { value: "anos", label: "Anos da minha vida em relações sem futuro", peso: 2, report: "anos da sua vida em relações sem futuro" },
        { value: "vontade", label: "Minha vontade de tentar de novo", peso: 2, report: "a sua vontade de tentar de novo" },
        { value: "todas", label: "Todas as anteriores", peso: 3, report: "a autoestima, os anos e a vontade de tentar de novo" },
      ],
    },
    {
      id: "tentativas",
      etapa: "O que já tentou",
      pergunta: "O que você já tentou para resolver isso?",
      options: [
        { value: "terapia", label: "Terapia", peso: 1, report: "fazer terapia" },
        { value: "conteudo", label: "Livros, cursos e conteúdo sobre relacionamento", peso: 1, report: "ler os livros e consumir conteúdo sobre relacionamento" },
        { value: "ambos", label: "Terapia e conteúdo, e mesmo assim repeti", peso: 3, report: "fazer terapia, estudar o assunto, e ainda assim repetir" },
        { value: "nada", label: "Nunca tratei isso a sério", peso: 0, report: "nunca ter tratado isso a sério" },
      ],
    },
    {
      id: "objetivo",
      etapa: "Objetivo",
      pergunta: "Se em 3 meses você rompesse esse padrão de vez, o que mudaria primeiro?",
      options: [
        { value: "parar_aceitar", label: "Eu pararia de aceitar menos do que mereço", report: "parar de aceitar menos do que você merece" },
        { value: "confiar", label: "Eu confiaria em mim para escolher de novo", report: "voltar a confiar em você para escolher" },
        { value: "sair", label: "Eu sairia da relação em que estou", report: "sair da relação em que você está" },
        { value: "paz", label: "Eu me sentiria em paz comigo, com ou sem alguém", report: "estar em paz com você mesma, com ou sem alguém" },
      ],
    },

    /* ---- PORTEIRA 1: perfil. Define o ICP da mentoria de R$ 12 mil. ---- */
    {
      id: "perfil",
      etapa: "Sobre você",
      pergunta: "E a sua vida profissional, como está hoje?",
      options: [
        { value: "empresaria", label: "Sou empresária ou sócia" },
        { value: "executiva", label: "Sou executiva ou ocupo cargo de liderança" },
        { value: "liberal", label: "Sou profissional liberal (médica, advogada, psicóloga, dentista)" },
        { value: "transicao", label: "Sou CLT, em transição ou recomeço" },
      ],
    },

    /* ---- PORTEIRA 2: prontidão. A opção de nutrir enquadra como momento,
       nunca como "algo mais barato". ---- */
    {
      id: "prontidao",
      etapa: "O próximo passo",
      pergunta: "Você quer resolver isso com acompanhamento, mesmo que represente um investimento maior do que uma terapia avulsa ou um curso?",
      options: [
        { value: "pronta", label: "Sim, é prioridade e tenho condição de investir" },
        { value: "entender", label: "Sim, mas preciso entender como funciona antes" },
        { value: "sem_condicao", label: "Quero muito, mas não é o meu momento financeiro", nutrir: true },
        { value: "so_diagnostico", label: "Só quero o diagnóstico por enquanto", fora: true },
      ],
    },
  ],

  captura: {
    titulo: "Seu diagnóstico está pronto.",
    subtitulo: "Deixe o seu contato para ver a leitura completa agora e receber uma cópia no WhatsApp.",
    campos: [
      { id: "nomeResp", label: "Seu nome", type: "text", required: true, autocomplete: "name", placeholder: "Como posso te chamar?" },
      { id: "whatsapp", label: "Seu WhatsApp (com DDD)", type: "tel", required: true, autocomplete: "tel", placeholder: "(11) 99999-9999", mask: "phone" },
      { id: "email", label: "Seu e-mail", type: "email", required: true, autocomplete: "email", placeholder: "voce@email.com" },
    ],
    cta: "Ver meu diagnóstico",
    privacidade: "Seus dados ficam entre você e o consultório. Sigilo é regra aqui.",
  },
};
