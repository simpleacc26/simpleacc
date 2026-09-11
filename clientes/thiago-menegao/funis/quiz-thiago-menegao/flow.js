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
    /* TEXTO DOS BOTÕES. Fica aqui porque é copy, e para mudar num lugar só.
       Não é "Quero o PRIMAL PITCH": ninguém quer um produto, quer a mudança.
       O que este avatar quer está na promessa central do projeto, converter
       mais das reuniões que já existem, sem aumentar tráfego e sem baixar
       preço. Sem número e sem projeção de futuro: é o desejo dele em primeira
       pessoa, não uma promessa nossa. */
    /* "Aumentar as conversões", não "fechar mais". Thiago levantou a ambiguidade
       em 11/09 e o Daniel confirmou que a copy antiga confundia: "fechar mais
       reuniões" se lê como FAZER mais reuniões, que é o contrário exato da
       promessa do projeto (converter mais das que já existem, sem aumentar
       tráfego). "Conversão" não tem essa leitura dupla. */
    cta: "Quero aumentar as conversões das reuniões que já tenho",
    /* Turma de Fundadores. TRAVA DELIBERADA: o bloco só aparece se houver data
       real preenchida aqui, no formato "12 de outubro". Prazo inventado com
       este público custa mais caro que a venda que traria (nota de copy da
       estratégia, Seção 3 Parte 4). Vazio = o bloco inteiro não renderiza. */
    dataLimiteFundadores: "",
    /* Idem para a garantia: o prazo sai do checkout, não do nosso chute.
       Vazio = o bloco fala em garantia sem número, como na estratégia. */
    prazoGarantia: "",
  },

  /* ============================================================
     OS CINCO BALDES.  Fonte: os cinco baldes definidos pelo Daniel para este
     funil, que são os cinco pontos onde a reunião de alto valor trava segundo
     o método do Thiago.  A P3 define o balde dominante e ele comanda a
     personalização da página inteira: régua, barras, espelho, custo e caminho.

     Cada balde entrega CINCO textos, e é isso que faz o diagnóstico ser
     personalizado sem virar cinco páginas diferentes:
       nome     título do resultado e rótulo da barra
       etapas   quais das sete etapas do Primal Closing ele afeta
       resumo   uma linha, usada na barra dominante e na leitura do cenário
       cena     o que a pessoa reconhece na própria reunião (bloco do espelho)
       custo    o que ESTE balde especificamente cobra (bloco do custo)
       caminho  o que precisa mudar, pelo mecanismo (bloco do que fazer)
     O resto da página (mecanismo, tentativas mortas, oferta, prova, FAQ) é
     comum aos cinco.

     NOMES: os baldes do Daniel são descritos pela falta ("não posicionamento
     como condutor", "carência emocional").  Na página eles entram pelo nome do
     que falta acontecer, nunca pela acusação: este avatar tem ferida dominante
     de injustiça e humilhação, e "você é carente" ou "você não sabe se
     posicionar" fecha a leitura na primeira linha.  Mesmo balde, entrada pela
     cena.
     ============================================================ */
  travas: {
    condutor: {
      nome: "Posição de Condutor",
      etapas: "Abertura e Condução",
      etapasIdx: [1, 5],
      resumo: "o lead te classifica como vendedor nos primeiros segundos, e a partir dali quem faz as perguntas é ele.",
      cena: "Você entrou na reunião para conduzir e saiu dela tendo respondido. As perguntas foram dele, o ritmo foi dele, e no fim a decisão também.",
      custo: "Quem responde não conduz. E quem não conduz depende da iniciativa do lead para a conversa avançar, o que transfere para ele um trabalho que ele não sabe fazer, e ele resolve isso da forma mais barata que existe: adiando.",
      caminho: "Existe um enquadramento que define, antes da primeira pergunta, quem está sentado na cadeira de consultor. Enquanto você ocupar a cadeira de quem apresenta, cada argumento seu vira mais um motivo para ele se proteger. A Abertura tem função, critério de saída e sinal de travamento próprios, e é ela que decide o resto da reunião.",
    },
    perfil: {
      nome: "Leitura de Perfil",
      etapas: "Diagnóstico e Espelho",
      etapasIdx: [2, 3],
      resumo: "você conduz todos do mesmo jeito, e a frase que aproxima um perfil é exatamente a que afasta o outro.",
      cena: "Com um cliente a reunião flui e fecha. Com o seguinte, mesma preparação, mesmo roteiro, a conversa esfria, e depois você não consegue apontar o que mudou.",
      custo: "Sem leitura de perfil a sua conversão vira sorte de encaixe. Você fecha com quem já pensa parecido com você e perde os outros três, sem nunca ter tido como saber por quê.",
      caminho: "Ler o lead são duas leituras, não uma. A primeira é o PERFIL: Competidor, Analítico, Caridoso e Social, cada um pedindo tipo de prova, ritmo e pergunta diferentes. A segunda é o ESTRATO, a camada de maturidade em que ele está. O Estrato 5 precisa provar do que é capaz, e número de dinheiro não move ele. O 6 quer resultado que dê para medir, e apelo emocional não move ele. O 7 quer cumprir com excelência o papel que ocupa. O 8 avalia a própria trajetória e quer sentido. A maioria das negociações acontece no 5 e no 6, e a mesma frase que energiza um esvazia o outro. Perfil sem Estrato acerta o tom e erra a altura; Estrato sem perfil acerta a altura e erra o tom. O Diagnóstico existe para fazer as duas leituras antes de escolher o que dizer.",
    },
    camada: {
      nome: "Camada do Lead",
      etapas: "Espelho e Contexto",
      etapasIdx: [3, 4],
      resumo: "você responde na camada racional uma dúvida que nasceu na camada primal, e a resposta certa chega no lugar errado.",
      cena: "Ele entende tudo, concorda com tudo, elogia o raciocínio, e mesmo assim diz que vai pensar. Não faltou informação. Faltou chegar na camada onde a decisão estava sendo tomada.",
      custo: "É a perda mais cara porque é invisível: nada dá errado na tela. Você reabre a gravação, assiste inteira, e não encontra o erro, porque ele não está no que foi dito, está na camada em que foi dito.",
      caminho: "A decisão acontece em três camadas, sempre nesta ordem: primal, emocional e racional. Não confunda com o Estrato, que é a maturidade da pessoa: aqui a questão é a altura da DECISÃO dentro daquela conversa, que muda de minuto a minuto. O trabalho é identificar em qual camada o lead está antes de responder, e subir com ele, em vez de responder de cima. É exatamente isso que o índice deste diagnóstico mede.",
    },
    empilhamento: {
      nome: "Empilhamento Desproporcional",
      etapas: "Condução e Prescrição",
      etapasIdx: [5, 6],
      resumo: "você empilha argumento, prova e entrega em cima de um problema que o lead ainda não dimensionou, e a solução fica maior que a dor.",
      cena: "Quanto mais você mostra, mais pesada a conversa fica. Você acrescenta para convencer, e cada acréscimo faz o preço parecer maior, porque do outro lado ainda não existe um problema do mesmo tamanho.",
      custo: "É o que transforma preço justo em preço caro sem ninguém mexer no preço. Não foi o valor que subiu, foi o problema que ficou pequeno na cabeça dele enquanto a solução crescia.",
      caminho: "Empilhar é consequência, não causa: você acrescenta porque sentiu que não convenceu. O ajuste é dimensionar o problema antes de apresentar qualquer coisa, para que a prescrição saia proporcional ao que ele acabou de reconhecer. Prescrição não é lista de entregas, é o passo seguinte óbvio de um diagnóstico que ele aceitou.",
    },
    carencia: {
      nome: "Consultoria Gratuita",
      etapas: "Prescrição e Decisão",
      etapasIdx: [6, 7],
      resumo: "a solução inteira é entregue dentro da reunião, o lead sai satisfeito, e não sobra nada para ele comprar.",
      cena: "Ele agradece bastante, diz que a conversa foi ótima e que aprendeu muito. Você desliga com a sensação de que foi bem, e a resposta nunca vem.",
      custo: "Reunião que resolve o problema de graça não gera venda, gera gratidão. Gratidão não tem prazo, então o follow-up começa a soar como cobrança, você faz menos, e a conversa morre de silêncio.",
      caminho: "Mostrar que você sabe e entregar o que você sabe são coisas diferentes, e a diferença entre as duas é limite. A Prescrição nomeia o caminho sem executá-lo, e a Decisão precisa acontecer dentro da reunião, com passo definido e prazo, para que a conversa termine em resposta e não em elogio.",
    },
  },

  /* As sete etapas do Primal Closing, na ordem. Viram a régua visual do
     relatório: a barra cresce até o ponto em que o controle escapa, ou seja,
     até a PRIMEIRA etapa afetada pela trava (`etapasIdx` de cada trava, em
     base 1). Quem trava em Posição de Condutor vê a barra quase vazia, quem
     trava em Consultoria Gratuita vê a barra quase cheia. */
  etapas: ["Abertura", "Diagnóstico", "Espelho", "Contexto", "Condução", "Prescrição", "Decisão"],

  hero: {
    titulo: "Existe uma etapa exata em que você perdeu aquela venda",
    subtitulo: "Responda e descubra em qual das sete etapas da sua reunião o controle escapa, por que o lead diz que vai pensar e o que precisa mudar antes da sua próxima call.",
    /* SEM estimativa de tempo aqui (decisão do cliente em 08/09). Prometer "2
       minutos" na primeira tela cria uma régua que o lead cobra, e as telas de
       carregamento agora seguram mais tempo de propósito, para dar tempo de
       ler. Deixar vazio faz o app.js não renderizar a linha. */
    tempo: "",
  },

  /* ============================================================
     PERGUNTAS
     Ordem aprovada na estratégia (Seção 2). Pontuam no IIC apenas P1 a P5.
     P6 (objetivo), P7 (estrutura), P8 (a conta) e P9 (ticket) não pontuam:
     servem para o espelho, para a conta e para calibrar o argumento.

     `travas`: afinidade da opção com cada um dos cinco baldes. É o que
     alimenta as cinco barras do relatório. A P3 pesa mais porque é a que
     define o dominante.

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
          travas: { condutor: 0, perfil: 1, camada: 1, empilhamento: 1, carencia: 2 } },
        { value: "indicacao_conteudo", label: "Indicação e, de vez em quando, alguém do meu conteúdo", peso: 1,
          report: "viver de indicação e, de vez em quando, alguém que chega pelo seu conteúdo",
          travas: { condutor: 1, perfil: 1, camada: 2, empilhamento: 1, carencia: 1 } },
        { value: "trafego", label: "Tenho tráfego rodando e agenda entrando", peso: 2,
          report: "ter tráfego rodando e agenda entrando",
          travas: { condutor: 2, perfil: 1, camada: 2, empilhamento: 1, carencia: 0 } },
        { value: "time", label: "Tenho time comercial agendando para mim", peso: 2,
          report: "ter um time comercial agendando para você",
          travas: { condutor: 2, perfil: 2, camada: 1, empilhamento: 1, carencia: 0 } },
      ],
    },
    {
      id: "perda",
      etapa: "Situação",
      pergunta: "Como costumam terminar as reuniões que você não fecha?",
      options: [
        { value: "vou_pensar", label: "Ele diz que vai pensar e some", peso: 3,
          report: "ouvir que ele vai pensar e não ter mais notícia",
          travas: { condutor: 1, perfil: 1, camada: 3, empilhamento: 1, carencia: 1 } },
        { value: "proposta", label: "Pede para mandar a proposta por escrito", peso: 1,
          report: "ouvir o pedido de mandar a proposta por escrito",
          travas: { condutor: 3, perfil: 1, camada: 1, empilhamento: 2, carencia: 0 } },
        { value: "elogia", label: "Concorda com tudo, elogia, e não avança", peso: 3,
          report: "ver a pessoa concordar com tudo, elogiar, e não avançar",
          travas: { condutor: 0, perfil: 2, camada: 1, empilhamento: 1, carencia: 3 } },
        { value: "condicao", label: "Só avança se eu melhorar a condição", peso: 2,
          report: "só ver a conversa avançar quando você melhora a condição",
          travas: { condutor: 1, perfil: 1, camada: 1, empilhamento: 3, carencia: 1 } },
        /* As duas objeções clássicas, pedido do Thiago em 11/09: faltavam as
           saídas mais comuns da mesa. "Falar com alguém" é falha de condução
           (não se definiu quem decide antes de apresentar), "não tem verba" é
           empilhamento (a solução ficou maior que o problema reconhecido). */
        { value: "falar_com", label: "Diz que precisa falar com o sócio, com a esposa ou com o marido", peso: 2,
          report: "ouvir que ele precisa falar com o sócio ou com quem decide junto",
          travas: { condutor: 3, perfil: 1, camada: 2, empilhamento: 0, carencia: 1 } },
        { value: "sem_verba", label: "Diz que não tem verba agora", peso: 2,
          report: "ouvir que não tem verba agora",
          travas: { condutor: 1, perfil: 1, camada: 1, empilhamento: 3, carencia: 1 } },
      ],
    },
    {
      /* P3. É A PERGUNTA QUE DEFINE O BALDE DOMINANTE, e por isso ela tem uma
         opção por balde, na ordem em que os baldes aparecem na reunião.
         As cinco opções descrevem a CENA, nunca o diagnóstico: quem trava em
         Leitura de Perfil não sabe que trava em leitura de perfil, sabe que
         com um cliente flui e com o outro não. Nomear o balde na opção faria
         a pessoa escolher pelo que soa melhor, não pelo que acontece com ela. */
      id: "trava",
      etapa: "Problema · define o seu balde",
      /* NÃO dizer "perde o controle" aqui. "Controle" é conceito do método do
         Thiago e ainda não foi apresentado ao lead neste ponto do funil: ele
         não tem consciência de controle, tem consciência de que perdeu a
         negociação. Palavra do lead, não palavra nossa (nota dele, 11/09). */
      pergunta: "Em que momento da conversa você sente que perdeu a negociação?",
      options: [
        { value: "condutor", label: "Logo no começo. Ele me trata como mais um vendedor, e quem passa a fazer as perguntas é ele", peso: 3,
          trava: "condutor",
          report: "sentir a conversa endurecer logo no começo, quando ele te trata como mais um vendedor",
          travas: { condutor: 5, perfil: 1, camada: 1, empilhamento: 0, carencia: 1 } },
        { value: "perfil", label: "Depende do cliente. Com um tipo de pessoa flui e fecha, com outro a mesma conversa esfria", peso: 2,
          trava: "perfil",
          report: "ver a mesma conversa fluir com um tipo de cliente e esfriar com outro",
          travas: { condutor: 1, perfil: 5, camada: 1, empilhamento: 1, carencia: 0 } },
        { value: "camada", label: "Ele entende tudo, concorda com tudo, e mesmo assim não decide", peso: 3,
          trava: "camada",
          report: "ver que ele entende tudo, concorda com tudo, e mesmo assim não decide",
          travas: { condutor: 0, perfil: 1, camada: 5, empilhamento: 1, carencia: 1 } },
        { value: "empilhamento", label: "Quando percebo que já falei demais. Explico, mostro, acrescento, e a conversa fica pesada", peso: 2,
          trava: "empilhamento",
          report: "perceber que explicou, mostrou e acrescentou até a conversa ficar pesada",
          travas: { condutor: 1, perfil: 1, camada: 1, empilhamento: 5, carencia: 1 } },
        { value: "carencia", label: "No fim. Ele sai com a solução na mão, agradecendo, e não sobra nada para comprar", peso: 1,
          trava: "carencia",
          report: "ver ele sair com a solução na mão, agradecendo, sem nada para comprar",
          travas: { condutor: 1, perfil: 0, camada: 1, empilhamento: 1, carencia: 5 } },
      ],
    },
    {
      id: "custo",
      etapa: "Implicação",
      /* "causou", não "custou" (pedido do Thiago, 11/09). As opções viraram
         consequência e não ação, para lerem naturalmente depois do verbo. */
      pergunta: "O que essa situação já te causou?",
      options: [
        { value: "desconto", label: "Desconto dado em contrato que valia o preço cheio", peso: 1,
          report: "dar desconto em contrato que valia o preço cheio",
          travas: { condutor: 1, perfil: 1, camada: 1, empilhamento: 3, carencia: 1 } },
        { value: "agenda", label: "Reunião de retorno que nunca acontece e agenda ocupada com quem não decide", peso: 2,
          report: "encher a agenda com reunião de retorno que nunca acontece",
          travas: { condutor: 1, perfil: 1, camada: 2, empilhamento: 1, carencia: 3 } },
        { value: "concorrente", label: "Concorrente com produto pior fechando no meu lugar", peso: 3,
          report: "ver concorrente com produto pior fechando no seu lugar",
          travas: { condutor: 2, perfil: 3, camada: 1, empilhamento: 1, carencia: 1 } },
        { value: "sem_entender", label: "Reunião que termina sem eu entender o que aconteceu, e o erro se repete na seguinte", peso: 3,
          report: "sair de reunião sem entender o que aconteceu e repetir o erro na seguinte",
          travas: { condutor: 1, perfil: 2, camada: 2, empilhamento: 1, carencia: 1 } },
      ],
    },
    {
      id: "tentativa",
      etapa: "O que já tentou",
      pergunta: "O que você já tentou para mudar isso?",
      options: [
        { value: "script", label: "Troquei de script mais de uma vez", peso: 1,
          report: "trocar de script mais de uma vez",
          travas: { condutor: 1, perfil: 2, camada: 1, empilhamento: 1, carencia: 1 } },
        { value: "treinamento", label: "Comprei treinamento de vendas ou mentoria comercial", peso: 1,
          report: "comprar treinamento de vendas ou mentoria comercial",
          travas: { condutor: 1, perfil: 1, camada: 1, empilhamento: 1, carencia: 1 } },
        { value: "closer", label: "Contratei closer ou SDR para tirar isso de mim", peso: 2,
          report: "contratar closer ou SDR para tirar isso de você",
          travas: { condutor: 3, perfil: 1, camada: 1, empilhamento: 1, carencia: 1 } },
        { value: "trafego", label: "Aumentei o investimento em tráfego para compensar no volume", peso: 3,
          report: "aumentar o investimento em tráfego para compensar no volume",
          travas: { condutor: 1, perfil: 1, camada: 2, empilhamento: 2, carencia: 1 } },
      ],
    },
    {
      /* PERGUNTA NOVA, pedido do Thiago em 11/09. A P3 pergunta QUANDO a
         negociação escapa; esta pergunta QUAL é o desafio. Mesmo eixo dos cinco
         baldes, entrada diferente: quem não se reconhece no momento se
         reconhece no desafio, e as duas respostas juntas deixam a barra
         dominante muito mais firme.
         Sem `peso`: o IIC continua saindo de P1 a P5, como calibrado. Esta
         alimenta só a afinidade das barras. */
      id: "desafio",
      etapa: "O maior desafio",
      pergunta: "Qual é o seu maior desafio nas negociações?",
      options: [
        { value: "condutor", label: "Entrar na conversa como consultor, e não como mais um vendedor",
          report: "entrar na conversa como consultor e não como mais um vendedor",
          travas: { condutor: 4, perfil: 1, camada: 1, empilhamento: 0, carencia: 1 } },
        { value: "perfil", label: "Ajustar a conversa para cada tipo de cliente, sem usar o mesmo roteiro com todo mundo",
          report: "ajustar a conversa para cada tipo de cliente",
          travas: { condutor: 1, perfil: 4, camada: 1, empilhamento: 1, carencia: 0 } },
        { value: "camada", label: "Fazer o cliente decidir de verdade, e não só concordar comigo",
          report: "fazer o cliente decidir de verdade, e não só concordar",
          travas: { condutor: 0, perfil: 1, camada: 4, empilhamento: 1, carencia: 1 } },
        { value: "empilhamento", label: "Sustentar o preço sem precisar acrescentar mais entrega para justificar",
          report: "sustentar o preço sem precisar acrescentar mais entrega",
          travas: { condutor: 1, perfil: 1, camada: 1, empilhamento: 4, carencia: 1 } },
        { value: "carencia", label: "Terminar a reunião com uma resposta, e não com um elogio",
          report: "terminar a reunião com uma resposta e não com um elogio",
          travas: { condutor: 1, perfil: 0, camada: 1, empilhamento: 1, carencia: 4 } },
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
         canvas diz que ele faz de madrugada. `reunioes` é o valor CONSERVADOR
         usado no cálculo: piso da faixa, nunca o teto.

         MUDOU EM 11/09, pedido do Thiago: o teto antigo parava em 30 por mês,
         que é uma reunião por dia útil, e deixava de fora quem faz duas ou mais
         por dia. Entraram as faixas de 30 a 60 e acima de 60.
         A taxa de fechamento saiu do rótulo: ela não entra em conta nenhuma (o
         cálculo é sempre "uma a mais a cada dez", independente do que a pessoa
         fecha hoje) e, com cinco faixas de volume, o rótulo composto virava uma
         lista longa demais para escolher no celular. */
      id: "conta",
      etapa: "A conta",
      pergunta: "Quantas reuniões de venda você faz por mês?",
      options: [
        { value: "menos8", label: "Menos de 8 reuniões", reunioes: 6,
          report: "fazer menos de oito reuniões por mês" },
        { value: "8a15", label: "De 8 a 15 reuniões", reunioes: 10,
          report: "fazer de oito a quinze reuniões por mês" },
        { value: "15a30", label: "De 15 a 30 reuniões", reunioes: 18,
          report: "fazer de quinze a trinta reuniões por mês" },
        { value: "30a60", label: "De 30 a 60 reuniões", reunioes: 30,
          report: "fazer de trinta a sessenta reuniões por mês" },
        { value: "mais60", label: "Mais de 60 reuniões", reunioes: 60,
          report: "fazer mais de sessenta reuniões por mês" },
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
        /* Duas faixas novas no topo, pedido do Thiago em 11/09: "acima de
           R$ 25 mil" juntava num balde só quem vende 30 mil e quem vende 300. */
        { value: "25a50", label: "De R$ 25 mil a R$ 50 mil", ticket: 25000, faixa: "alto", topo: true,
          report: "vender de R$ 25 mil a R$ 50 mil por contrato" },
        { value: "acima50", label: "Acima de R$ 50 mil", ticket: 50000, faixa: "alto", topo: true,
          report: "vender acima de R$ 50 mil por contrato" },
      ],
    },
    {
      /* PERGUNTA NOVA, pedido do Thiago em 11/09, e é a ÚLTIMA antes da
         captura de propósito: é a porteira de prontidão que faltava no funil.
         NÃO barra ninguém, porque este funil vende um produto de R$ 2 mil e
         todo mundo que conclui recebe a oferta. Serve para priorizar a fila na
         planilha: quem tem negociação marcada vale contato antes de quem está
         estudando o assunto.
         As opções de menor urgência NÃO ancoram em "algo mais barato depois",
         que é regra do projeto para high ticket. Enquadram como prioridade. */
      id: "urgencia",
      etapa: "Urgência",
      pergunta: "Qual é a sua urgência para resolver esse desafio?",
      options: [
        { value: "marcada", label: "Alta. Tenho negociação importante já marcada", prontidao: "alta",
          report: "ter negociação importante já marcada" },
        { value: "proxima_call", label: "Alta. Quero corrigir isso antes da próxima call", prontidao: "alta",
          report: "querer corrigir isso antes da próxima call" },
        { value: "media", label: "Média. Quero resolver, mas não é a prioridade deste mês", prontidao: "media",
          report: "querer resolver, sem ser a prioridade deste mês" },
        { value: "estudando", label: "Baixa. Por enquanto estou entendendo o assunto", prontidao: "baixa",
          report: "estar entendendo o assunto por enquanto" },
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
     `duracao` = quanto a tela segura, em ms.

     TERCEIRA CALIBRAGEM (11/09, pedido do Thiago): "o tempo está muito curto
     para uma pessoa normal ler. Deixa um tempo para passar automaticamente BEM
     MAIOR e adiciona um botão para a pessoa ir para o próximo", e ele fez
     questão de dizer que vale para TODAS as transições.

     Com o botão no ar, o tempo automático deixou de ser um cronômetro e virou
     rede de segurança: quem lê rápido clica e segue, quem lê devagar nunca é
     atropelado. Por isso os valores subiram muito e sem medo.
     Se apagar o campo, o app.js calcula sozinho por tamanho de texto, mas com
     teto de 10s, que hoje é bem menos do que estas telas precisam.
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
      duracao: 20000,
    },
    {
      id: "reframe",
      after: "custo",
      /* Título e texto escritos pelo próprio Thiago em 11/09, no lugar dos
         nossos. Mantidos ao pé da letra: "negociação" no lugar de "reunião",
         e "liderança da condução" no lugar de "condução", que é a palavra do
         método dele. */
      titulo: "A Negociação quase nunca é perdida quando você apresenta o preço.",
      texto: "Você perde a negociação bem antes, quando a liderança da condução troca de lado da mesa e o preço vira a única coisa que sobrou para analisar e discutir.",
      barra: "Cruzando com as sete etapas",
      duracao: 20000,
    },
    {
      id: "autoridade",
      after: "objetivo",
      titulo: "Quem monta essa análise não veio de vendas.",
      texto: "Thiago Menegão é engenheiro de computação e passou quase duas décadas em estratégia, comunicação e comportamento dentro de empresas como Mercedes, Itaú, Honda, John Deere, Electrolux e Philips, antes de precisar fechar os próprios contratos. A leitura aqui é de comportamento e de decisão, não de técnica de fechamento.",
      barra: "Preparando sua análise",
      /* 30s: é a tela com mais texto do funil e a última antes do formulário, e
         é ela que carrega o lastro corporativo. Quem lê isto inteiro chega na
         captura sabendo quem assina a análise, então vale segurar. Com o botão
         no ar, ninguém fica preso esperando.
         ⚠️ PENDENTE: o Thiago disse em 11/09 que vai mandar "um texto mais
         estratégico" para esta tela. O texto abaixo é o nosso, provisório.
         Quando o dele chegar, trocar aqui e conferir se 30s ainda cabem. */
      duracao: 30000,
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
