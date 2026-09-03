window.FLOW = {
  marca: {
    nome: "Método AUTOFOCO",
    expert: "Delphis Fonseca",
    whatsapp: "5511944659466",
    whatsappMsg:
      "Olá, Delphis! Sou {nome}, acabei de fazer o Diagnóstico AUTOFOCO e meu padrão deu {padrao}. Quero conversar sobre a sessão estratégica.",
    /* Quem não se qualifica na P2 x P10 cai na oferta de entrada, e a mensagem
       do WhatsApp precisa combinar com o botão que a pessoa viu. */
    whatsappMsgEntrada:
      "Olá, Delphis! Sou {nome}, acabei de fazer o Diagnóstico AUTOFOCO e meu padrão deu {padrao}. Quero saber como começar.",
  },

  hero: {
    selo: "Método AUTOFOCO · Delphis Fonseca",
    titulo: "Você sabe o que dizer. Na hora, não sai como sai na sua cabeça.",
    subtitulo:
      "Não é falta de conteúdo e não é falta de talento. São quatro padrões de travamento, e cada um destrava de um jeito. Responda com sinceridade e descubra qual é o seu.",
    cta: "Quero descobrir o meu padrão",
  },

  steps: [
    {
      id: "situacao",
      pergunta: "Onde a sua comunicação mais pesa hoje?",
      options: [
        { value: "empresa", label: "Reuniões, apresentações e decisões na empresa",
          report: "reuniões, apresentações e decisões dentro da empresa" },
        { value: "camera", label: "Vídeo, câmera e redes sociais",
          report: "vídeo, câmera e redes sociais" },
        { value: "palco", label: "Palco, aula, palestra ou evento",
          report: "palco, aula e eventos" },
        { value: "venda", label: "Conversa de venda, negociação e atendimento",
          report: "conversa de venda, negociação e atendimento" },
      ],
    },
    {
      id: "profissao",
      pergunta: "E a sua vida profissional?",
      options: [
        { value: "empresario", label: "Sou empresário ou sócio", report: "empresário", qualifica: true },
        { value: "executivo", label: "Sou executivo ou ocupo cargo de liderança", report: "executivo", qualifica: true },
        { value: "liberal", label: "Sou profissional liberal (médico, advogado, consultor, arquiteto)", report: "profissional liberal", qualifica: true },
        { value: "transicao", label: "Sou CLT, estudante ou estou em transição de carreira", report: "em construção de carreira", qualifica: false },
      ],
    },
    {
      id: "padrao",
      pergunta: "Qual dessas frases mais parece ter saído da sua boca?",
      options: [
        { value: "invisivel", label: "“Eu sei do assunto, mas na hora não sai como eu penso”",
          report: "saber do assunto e não conseguir traduzir isso na hora de falar", padrao: "O Invisível" },
        { value: "travado", label: "“Eu evito, adio e invento desculpa para não aparecer”",
          report: "evitar, adiar e inventar desculpa para não aparecer", padrao: "O Travado" },
        { value: "personagem", label: "“Quando ligo a câmera, eu viro outra pessoa”",
          report: "virar outra pessoa no momento em que a câmera liga", padrao: "O Personagem" },
        { value: "correto", label: "“Eu falo bem, mas não causo o impacto que poderia”",
          report: "falar bem e mesmo assim não causar o impacto que poderia", padrao: "O Correto" },
      ],
    },
    {
      id: "problema",
      pergunta: "O que mais se repete quando você precisa se comunicar?",
      options: [
        { value: "branco", label: "Dou branco justamente no que eu mais domino",
          report: "dar branco justamente no assunto que você mais domina" },
        { value: "observando", label: "Fico me observando enquanto falo",
          report: "ficar se observando enquanto fala" },
        { value: "ensaio", label: "Ensaio a frase na cabeça e não falo",
          report: "ensaiar a frase na cabeça e não falar" },
        { value: "perco", label: "Falo demais, me perco e não fecho a ideia",
          report: "falar demais, se perder e não fechar a ideia" },
      ],
    },
    {
      id: "depois",
      pergunta: "E depois que passa, o que acontece?",
      options: [
        { value: "remoendo", label: "Fico remoendo o que eu deveria ter dito",
          report: "ficar remoendo o que deveria ter dito" },
        { value: "evito", label: "Me cobro e evito a próxima oportunidade",
          report: "se cobrar e evitar a próxima oportunidade" },
        { value: "sem-eco", label: "Acho que fui bem, mas vejo que não gerou nada",
          report: "achar que foi bem e depois ver que não gerou nada" },
        { value: "outro-assume", label: "Deixo outra pessoa assumir e me arrependo depois",
          report: "deixar outra pessoa assumir e se arrepender depois" },
      ],
    },
    {
      id: "tempo",
      pergunta: "Há quanto tempo isso se repete?",
      options: [
        { value: "ate2", label: "Menos de 2 anos", report: "há menos de 2 anos" },
        { value: "2a5", label: "De 2 a 5 anos", report: "de 2 a 5 anos" },
        { value: "5a10", label: "De 5 a 10 anos", report: "de 5 a 10 anos" },
        { value: "mais10", label: "Mais de 10 anos, em fases diferentes da carreira",
          report: "há mais de 10 anos, em fases diferentes da sua carreira" },
      ],
    },
    {
      id: "custo",
      pergunta: "O que isso já custou a você?",
      options: [
        { value: "oportunidade", label: "Oportunidade, promoção ou cliente que foi para outro",
          report: "oportunidade, promoção ou cliente que acabou indo para outra pessoa" },
        { value: "credito", label: "Reconhecimento por algo que eu mesmo construí",
          report: "o reconhecimento por algo que você mesmo construiu" },
        { value: "convites", label: "Convites que eu recusei e depois me arrependi",
          report: "convites recusados dos quais você se arrependeu depois" },
        { value: "tudo", label: "Todas as anteriores", report: "tudo isso junto" },
      ],
    },
    {
      id: "tentativas",
      pergunta: "O que você já tentou para resolver?",
      options: [
        { value: "oratoria", label: "Curso de oratória ou de falar em público",
          report: "fez curso de oratória ou de falar em público" },
        { value: "terapia", label: "Terapia ou trabalho de autoconhecimento",
          report: "fez terapia ou trabalho de autoconhecimento" },
        { value: "sozinho", label: "Treino sozinho, gravando e repetindo",
          report: "treinou sozinho, gravando e repetindo" },
        { value: "nada", label: "Nunca tratei isso a sério",
          report: "nunca tratou isso a sério" },
      ],
    },
    {
      id: "objetivo",
      pergunta: "Se em 3 meses isso destravasse de vez, o que mudaria primeiro?",
      options: [
        { value: "aparecer", label: "Eu apareceria e me posicionaria sem sofrer",
          report: "aparecer e se posicionar sem sofrer" },
        { value: "vender", label: "Eu venderia e negociaria com outra segurança",
          report: "vender e negociar com outra segurança" },
        { value: "palco", label: "Eu assumiria o palco, a aula ou a liderança que hoje evito",
          report: "assumir o palco, a aula ou a liderança que hoje você evita" },
        { value: "reconhecido", label: "Eu seria reconhecido pelo que realmente sei",
          report: "ser reconhecido pelo que você realmente sabe" },
      ],
    },
    {
      id: "prontidao",
      pergunta: "Se existisse um caminho estruturado para resolver isso, qual frase te descreve hoje?",
      options: [
        { value: "pronto", label: "Estou pronto, é prioridade e tenho condição de investir", report: "pronto para começar", nivel: "alto" },
        { value: "entender", label: "Quero muito, mas preciso entender como funciona", report: "querendo entender como funciona", nivel: "alto" },
        { value: "momento", label: "Tenho interesse, mas não é o meu momento", report: "com interesse, mas fora de momento", nivel: "nutrir" },
        { value: "so-diagnostico", label: "Só quero o diagnóstico por enquanto", report: "buscando só o diagnóstico agora", nivel: "baixo" },
      ],
    },
  ],

  captura: {
    titulo: "Seu diagnóstico está pronto.",
    subtitulo:
      "Coloque seu WhatsApp abaixo e receba agora a leitura completa do seu caso, feita a partir do método que formou mais de 4.000 comunicadores em 40 anos.",
    campos: [
      { id: "nomeResp", label: "Seu nome", type: "text", required: true, autocomplete: "name", placeholder: "Como posso te chamar?" },
      { id: "whatsapp", label: "Seu WhatsApp (com DDD)", type: "tel", required: true, autocomplete: "tel", placeholder: "(11) 99999-9999", mask: "phone" },
      { id: "email", label: "Seu e-mail", type: "email", required: true, autocomplete: "email", placeholder: "voce@email.com" },
    ],
    cta: "Receber meu diagnóstico",
    privacidade: "Seus dados ficam entre você e a nossa equipe. Nada de disparo em massa.",
  },
};
