/* ============================================================
   FLOW · HODIE (Dra. Lailla de Oliveira)
   Toda a copy do quiz vive aqui. Fonte: brandbook HODIE v2.0 +
   Canvas de Produto e Cliente Ideal (pasta do Fabrício no Drive).

   COMPLIANCE (CFM 2.336/2023). Leia contexto/compliance-cfm.md antes de
   editar qualquer linha deste arquivo. Em resumo:
     - Nada de promessa de resultado, de quilos ou de prazo.
     - Nada de "única", "exclusiva", "segredo", "só aqui".
     - Nunca citar nome ou marca de remédio: sempre "classe de medicações".
     - Nada de foto antes e depois nem depoimento de paciente.
     - O índice é uma leitura educativa de sinais, nunca um diagnóstico.
   Padrão de escrita da casa: nunca usar travessão.
   ============================================================ */
window.FLOW = {
  config: {
    storeKey: "hodie_quiz",
    frente: "Quiz IMF",
    diagnosticoUrl: "diagnostico.html",
  },

  marca: {
    nome: "HODIE",
    expert: "Dra. Lailla de Oliveira",
    /* PENDENTE: WhatsApp do consultório, formato internacional só dígitos
       (ex.: 5511999999999). Enquanto estiver vazio, os CTAs avisam na tela
       que o canal ainda não foi configurado, em vez de mandar o lead para um
       número errado. NÃO subir tráfego antes de preencher. */
    whatsapp: "",
    whatsappMsg: "Olá! Sou {nome}, acabei de fazer a leitura do metabolismo da fome no site da HODIE e quero falar sobre a consulta de investigação.",
    /* Foto da Dra. Lailla no bloco de autoridade. Deixe vazio e o relatório
       usa o monograma H da marca. Assim que o arquivo existir na pasta do
       funil, basta escrever o nome dele aqui (ex.: "dra-lailla.webp") e
       republicar: nenhuma outra linha muda. */
    foto: "dra-lailla.webp",
  },

  /* O índice do cliente. É o ativo que a HODIE leva para o Instagram e para
     o atendimento. Calculado só nas perguntas de diagnóstico (peso). */
  indice: {
    sigla: "IMF",
    nome: "Índice do Metabolismo da Fome",
    explicacao: "Uma leitura de quantos sinais de desregulação do metabolismo da fome aparecem nas suas respostas.",
    ressalva: "Não é diagnóstico. Diagnóstico se faz em consulta, com investigação e exames.",
    faixas: {
      alto: { titulo: "Sinais fortes", resumo: "As suas respostas reúnem a maior parte dos sinais que investigamos em consulta." },
      medio: { titulo: "Sinais moderados", resumo: "As suas respostas reúnem parte dos sinais que investigamos em consulta." },
      baixo: { titulo: "Sinais leves", resumo: "As suas respostas reúnem poucos dos sinais que investigamos em consulta." },
    },
  },

  /* ============================================================
     BUCKETS (método ASK, Ryan Levesque)
     O bucket decide QUAL diagnóstico o lead recebe. O IMF decide QUÃO
     intenso. São eixos independentes de propósito: tipo e gravidade.

     Fonte: as "três portas de entrada" que o cliente mapeou no Canvas a
     partir do banco de pesquisa dele, abertas em 5 pelo cruzamento com
     o que a paciente já tentou (pergunta 5). Todas convergem para o
     mesmo produto, mas cada uma exige uma explicação diferente do porquê
     não se resolveu até agora.

     ATRIBUIÇÃO: cascata, primeira regra que casar vence. A última não
     tem condição, é o fallback, então todo lead sempre cai em um bucket.
     Para trocar o eixo, mexa só em bucketRegras.
     ============================================================ */
  bucketRegras: [
    { bucket: "reganho",        perfil: ["usou_reganhou"] },
    { bucket: "conducao",       perfil: ["quer_com_medico"] },
    { bucket: "exames_normais", tentou: ["exames_normais"] },
    { bucket: "sem_medicacao",  perfil: ["nao_pode"] },
    { bucket: "disciplina" },
  ],

  buckets: {
    /* NORTH-STAR. Maior dor, maior urgência, maior caixa: já pagou pela
       medicação, que é cara, e está vendo o peso voltar agora.
       Dor 10 · Urgência 9 · Caixa 9 · Facilidade de provar 9 */
    reganho: {
      nome: "Reganho depois do tratamento",
      chamada: "Você já provou que o seu corpo responde. O que faltou veio depois.",
      porque: `Você já emagreceu. Isso é informação clínica, não detalhe: o seu corpo
      respondeu quando a fome foi tratada. Então a pergunta certa não é por que você não
      emagrece, é <strong>por que o resultado não se sustentou</strong>.
      E a resposta quase nunca é falta de disciplina sua. O tratamento terminou e a
      estrutura que segura o peso depois não existia. A literatura mostra que boa parte do
      peso perdido tende a voltar no primeiro ano quando o tratamento é interrompido sem
      uma fase de manutenção. Você não falhou no fim. O fim é que não foi tratado.`,
      caminhos: {
        ruim: { titulo: "Recomeçar do zero de novo", itens: [
          "Mais um ciclo com o mesmo desfecho",
          "A causa do reganho continua sem nome",
          "Voltar à medicação sem saber por quanto tempo",
          "A culpa aumentando a cada rodada" ] },
        bom: { titulo: "Entrar pela fase que faltou", itens: [
          "Investigar o que mudou no seu metabolismo",
          "Um plano que já nasce pensando no depois",
          "Ajuste e espaçamento conduzidos por médica",
          "Monitoramento para o peso não desabar de novo" ] },
      },
      enfase: "sustentar",
      agora: `No seu caso a investigação tem um alvo a mais: entender o que mudou no seu
      metabolismo depois do ciclo que você já fez. É isso que define como a fase de
      manutenção precisa ser desenhada para você.`,
    },

    /* Dor 8 · Urgência 8 · Caixa 9 · Facilidade de provar 8 */
    conducao: {
      nome: "Tratamento conduzido, não receita avulsa",
      chamada: "Você está certa em não querer fazer isso sozinha.",
      porque: `Você não está atrás de um atalho, está atrás de condução. E o que costuma
      faltar no mercado não é a receita: é <strong>o que vem antes e o que vem depois
      dela</strong>. Antes, a investigação que diz se a medicação é indicada para o seu
      caso e o que mais está travando o seu metabolismo. Depois, a dose ajustada retorno a
      retorno, o manejo de efeitos e a fase de manutenção. Sem essas duas pontas, a
      medicação vira um atalho que ninguém está conduzindo. É por isso que aqui a consulta
      começa por escuta e exame, nunca por prescrição.`,
      caminhos: {
        ruim: { titulo: "Conseguir a receita e se virar", itens: [
          "Dose padrão, sem ajuste ao seu caso",
          "Efeito colateral sem ninguém para perguntar",
          "Nenhuma investigação do que te trouxe até aqui",
          "Nada preparado para quando o tratamento acabar" ] },
        bom: { titulo: "Ser conduzida do início ao fim", itens: [
          "Exames dirigidos antes de qualquer prescrição",
          "Indicação e dose definidas para o seu caso",
          "Retornos frequentes com ajuste de conduta",
          "Uma fase desenhada para sustentar o resultado" ] },
      },
      enfase: "investigar",
      agora: `A consulta de investigação é onde essa decisão é tomada com critério: se a
      medicação entra no seu caso, em qual dose, e o que precisa ser tratado junto para
      ela funcionar.`,
    },

    /* A paciente que já procurou médico e saiu sem resposta. Narrativa
       muito forte no banco de pesquisa do cliente.
       Dor 9 · Urgência 7 · Caixa 8 · Facilidade de provar 7 */
    exames_normais: {
      nome: "Exames normais, pergunta sem resposta",
      chamada: "Normal e investigado não são a mesma coisa.",
      porque: `Você fez o que era para fazer: procurou um médico. E saiu com a mesma
      pergunta que entrou, mais a sensação de que o problema era você.
      <strong>Exame normal não quer dizer investigado.</strong> O painel padrão de um
      check-up não foi desenhado para explicar fome que não passa nem resistência ao
      emagrecimento. Para isso a investigação precisa ser dirigida: resistência à insulina,
      sinalização hormonal da fome e da saciedade, deficiências nutricionais, sono,
      histórico de dietas restritivas. São exames pedidos com uma pergunta clínica na mão,
      não por rotina. É por isso que aqui o retorno existe para explicar cada resultado, um
      a um, e terminar com a causa escrita em um laudo.`,
      caminhos: {
        ruim: { titulo: "Repetir o mesmo check-up", itens: [
          "Painel de rotina que volta normal",
          "Sair da consulta sem explicação",
          "Concluir de novo que a culpa é sua",
          "Continuar sem saber o que investigar" ] },
        bom: { titulo: "Investigar com uma pergunta clínica", itens: [
          "Exames escolhidos para a sua queixa",
          "Cada resultado explicado um a um",
          "A causa nomeada no Mapa da Causa",
          "Conduta que nasce do que foi encontrado" ] },
      },
      enfase: "investigar",
      agora: `O primeiro passo no seu caso não é tratamento nenhum, é uma investigação
      feita com a pergunta certa. É ela que transforma a sua queixa em uma causa com nome,
      e é a partir dela que o caminho é definido.`,
    },

    /* Impedimento ou escolha real sobre a medicação.
       Dor 8 · Urgência 6 · Caixa 8 · Facilidade de provar 7 */
    sem_medicacao: {
      nome: "Causa antes da medicação",
      chamada: "Tratamento não é sinônimo de medicação.",
      porque: `Provavelmente já te disseram que o caminho é a medicação e, por um motivo ou
      outro, ela não é a sua rota. Isso não te deixa sem tratamento, e aqui mora o
      mal-entendido mais caro desse mercado: <strong>a medicação é uma ferramenta dentro da
      estrutura, nunca o tratamento inteiro</strong>. Resistência à insulina, alterações
      hormonais, deficiências nutricionais, sono e o histórico de dietas restritivas
      continuam sendo investigáveis e tratáveis, com ou sem ela. O que muda o jogo não é a
      receita. É saber qual é a sua causa, com nome, em um laudo.`,
      caminhos: {
        ruim: { titulo: "Concluir que não sobrou caminho", itens: [
          "Achar que sem medicação não há tratamento",
          "Voltar para a dieta da vez",
          "A causa continua sem investigação",
          "A dúvida sobre o seu corpo sem resposta" ] },
        bom: { titulo: "Começar pela causa", itens: [
          "Investigação dirigida ao seu histórico",
          "A causa nomeada no Mapa da Causa",
          "Conduta desenhada para a sua realidade",
          "Cada recurso avaliado pelo que o seu caso pede" ] },
      },
      enfase: "investigar",
      agora: `A investigação vem primeiro justamente para o seu tratamento não depender de
      uma única ferramenta. Primeiro a causa aparece. Depois, com ela na mesa, o caminho é
      definido junto com você.`,
    },

    /* Fallback. Nunca usou medicação e tentou por esforço e dieta.
       Dor 9 · Urgência 6 · Caixa 7 · Facilidade de provar 6 */
    disciplina: {
      nome: "Disciplina no limite, corpo sem resposta",
      chamada: "A disciplina é justamente a variável que a fisiologia derruba.",
      porque: `Olhe a sua própria lista de tentativas. Ela não é a lista de alguém que não
      se esforça, é a lista de alguém que se esforçou muitas vezes. E é exatamente aí que
      está o problema: <strong>quase tudo que você tentou apostava na disciplina</strong>,
      comer menos, resistir mais, aguentar. Só que quando a sinalização da saciedade está
      alterada, a fome aumenta e o controle alimentar fica mais difícil por fisiologia, não
      por caráter. Pedir mais esforço para quem já está no limite não trata a causa: cansa
      a pessoa e confirma a sentença errada sobre ela.`,
      caminhos: {
        ruim: { titulo: "Apostar mais uma vez no esforço", itens: [
          "Outro plano que exige disciplina perfeita",
          "Segunda-feira como eterno recomeço",
          "A fome tratada como falha de caráter",
          "A causa nunca investigada" ] },
        bom: { titulo: "Tratar a fome como sintoma", itens: [
          "Investigação do que desregula a sua fome",
          "A causa nomeada no Mapa da Causa",
          "Plano individualizado, não força de vontade",
          "Acompanhamento próximo com ajuste de conduta" ] },
      },
      enfase: "tratar",
      agora: `O próximo passo não é tentar de novo com mais vontade. É uma consulta de
      investigação que olhe o que o seu corpo está fazendo com a sua fome, para o plano
      parar de depender exclusivamente do seu esforço.`,
    },
  },

  hero: {
    selo: "Consultório HODIE · Jundiaí-SP e on-line para todo o Brasil",
    titulo: "Sua fome não é fraqueza. É um sintoma.",
    subtitulo: "Responda algumas perguntas e receba o seu Índice do Metabolismo da Fome, com a leitura do que pode estar por trás da sua dificuldade de emagrecer.",
    tempo: "Leva cerca de 2 minutos · Confidencial",
    cta: "Começar a minha leitura",
  },

  steps: [
    {
      id: "situacao",
      etapa: "Situação",
      pergunta: "Qual dessas frases mais parece escrita por você?",
      options: [
        { value: "tudo_certo", label: "Faço tudo certo e mesmo assim não emagreço", peso: 2,
          report: "fazer tudo certo e mesmo assim não ver a balança responder" },
        { value: "sanfona", label: "Eu emagreço, mas sempre volta tudo", peso: 3,
          report: "emagrecer com esforço e ver o peso voltar todas as vezes" },
        { value: "fome_sem_freio", label: "Minha fome não tem freio, principalmente à noite", peso: 3,
          report: "conviver com uma fome que não tem freio, principalmente à noite" },
        { value: "nao_sustento", label: "Eu começo animada e não consigo sustentar", peso: 0,
          report: "começar animada e não conseguir sustentar até o fim" },
      ],
    },
    {
      id: "problema",
      etapa: "Problema",
      pergunta: "No seu dia a dia, o que mais pesa hoje?",
      options: [
        { value: "pensa_comida", label: "Penso em comida o dia inteiro", peso: 3,
          report: "pensar em comida o dia inteiro" },
        { value: "doce", label: "A vontade de doce que aperta à tarde e à noite", peso: 3,
          report: "a vontade de doce que aperta à tarde e à noite" },
        { value: "perde_controle", label: "Seguro o dia todo e perco o controle à noite", peso: 3,
          report: "segurar o dia inteiro e perder o controle à noite" },
        { value: "culpa", label: "A culpa que vem depois de comer", peso: 2,
          report: "a culpa que vem depois de comer" },
        { value: "cansaco", label: "O cansaço e a falta de disposição", peso: 0,
          report: "o cansaço e a falta de disposição" },
      ],
    },
    {
      id: "tempo",
      etapa: "Há quanto tempo",
      pergunta: "Há quanto tempo você convive com isso?",
      options: [
        { value: "ate2", label: "Menos de 2 anos", report: "há menos de dois anos" },
        { value: "2a5", label: "De 2 a 5 anos", report: "há alguns anos" },
        { value: "5a10", label: "De 5 a 10 anos", report: "há muitos anos" },
        { value: "mais10", label: "Mais de 10 anos, virou rotina", report: "há mais de dez anos" },
      ],
    },
    {
      id: "impacto",
      etapa: "Implicação",
      pergunta: "Quando você imagina os próximos anos exatamente assim, o que mais incomoda?",
      options: [
        { value: "saude", label: "A saúde começando a cobrar: exames, joelho, fôlego", peso: 3,
          report: "ver a saúde começando a cobrar" },
        { value: "falhar", label: "Tentar mais uma vez e falhar de novo", peso: 2,
          report: "o receio de tentar mais uma vez e falhar de novo" },
        { value: "energia", label: "Envelhecer sem disposição para o que eu gosto", peso: 2,
          report: "envelhecer sem disposição para o que você gosta" },
        { value: "esconder", label: "Continuar me escondendo em foto, praia e roupa", peso: 0,
          report: "continuar se escondendo em foto, praia e roupa" },
      ],
    },
    {
      id: "necessidade",
      etapa: "O que já tentou",
      pergunta: "O que você já tentou até aqui?",
      options: [
        { value: "exames_normais", label: "Procurei médico e ouvi que meus exames estão normais", peso: 3,
          report: "procurar médico e ouvir que os seus exames estavam normais" },
        { value: "medicacao", label: "Já usei a classe de medicações do momento", peso: 3,
          report: "já ter usado a classe de medicações do momento" },
        { value: "por_conta", label: "Dietas por conta própria, aplicativos, jejum", peso: 2,
          report: "dietas por conta própria, aplicativos e jejum" },
        { value: "nutri", label: "Acompanhamento com nutricionista e plano alimentar", peso: 2,
          report: "acompanhamento com nutricionista e plano alimentar" },
        { value: "treino", label: "Academia e treino, sem a balança acompanhar", peso: 1,
          report: "academia e treino, sem a balança acompanhar" },
      ],
    },
    {
      id: "objetivo",
      etapa: "Objetivo",
      pergunta: "Se desse para escolher uma coisa só, o que você mais quer?",
      options: [
        { value: "tregua", label: "Que essa fome finalmente dê uma trégua",
          report: "que a fome finalmente dê uma trégua" },
        { value: "entender", label: "Entender de uma vez o que trava o meu corpo",
          report: "entender de uma vez o que trava o seu corpo" },
        { value: "ultima_vez", label: "Emagrecer sem precisar recomeçar nunca mais",
          report: "emagrecer sem precisar recomeçar nunca mais" },
        { value: "energia", label: "Ter energia e disposição de volta",
          report: "ter energia e disposição de volta" },
      ],
    },
    {
      id: "perfil",
      etapa: "Seu perfil",
      pergunta: "Sobre a classe de medicações usada no tratamento da obesidade, onde você está hoje?",
      options: [
        { value: "quer_com_medico", label: "Quero usar, mas só com médica acompanhando de perto", peso: 2,
          report: "querer usar com acompanhamento médico de perto" },
        { value: "usou_reganhou", label: "Já usei, parei e o peso voltou", peso: 3,
          report: "já ter usado, parado e visto o peso voltar" },
        { value: "nao_pode", label: "Não posso, não me adaptei ou não quero usar", peso: 2,
          report: "não poder ou não querer usar a medicação" },
        { value: "nunca_usou", label: "Nunca usei e não sei se seria para mim", peso: 0,
          report: "nunca ter usado e não saber se seria para você" },
      ],
    },

    /* ---- PORTEIRA 1: ICP. O canvas proíbe publicar valor em peça pública
       (a faixa é informada no 1:1, antes do agendamento). Então a porteira de
       porte pergunta pelo HÁBITO de investir em saúde, nunca por faixa de
       preço nem por renda. ---- */
    {
      id: "investimento",
      etapa: "Momento",
      pergunta: "Como você cuida da sua saúde hoje?",
      options: [
        { value: "particular_sempre", label: "Faço acompanhamento particular e invisto nisso com regularidade" },
        { value: "particular_quando_vale", label: "Pago particular quando entendo que vale a pena" },
        { value: "convenio", label: "Uso o convênio e evito pagar particular", nutrir: true },
        { value: "publico", label: "Uso a rede pública", fora: true },
        { value: "parada", label: "Hoje eu não estou cuidando disso", fora: true },
      ],
    },

    /* ---- PORTEIRA 2: prontidão. Mede intenção de investir, não interesse.
       High ticket: a opção de nutrir NÃO ancora em "algo mais barato",
       enquadra como prioridade e momento. ---- */
    {
      id: "prontidao",
      etapa: "O próximo passo",
      pergunta: "Você busca um tratamento médico conduzido, com investigação, exames e acompanhamento próximo, mesmo que represente um investimento maior do que uma consulta avulsa?",
      options: [
        { value: "sim", label: "Sim, quero resolver de vez e entendo que é um investimento" },
        { value: "entender", label: "Sim, mas preciso entender melhor como funciona antes" },
        { value: "depois", label: "Ainda não é prioridade para mim neste momento", nutrir: true },
        { value: "pesquisando", label: "Só estou pesquisando por enquanto", nutrir: true },
      ],
    },
  ],

  captura: {
    titulo: "A sua leitura está pronta.",
    subtitulo: "Para onde enviamos? Deixe o seu WhatsApp e o consultório envia a sua leitura e os próximos passos, sem compromisso.",
    campos: [
      { id: "nomeResp", label: "Seu nome", type: "text", required: true, autocomplete: "name", placeholder: "Como podemos te chamar?" },
      { id: "whatsapp", label: "Seu WhatsApp (com DDD)", type: "tel", required: true, autocomplete: "tel", placeholder: "(11) 99999-9999", mask: "phone" },
      { id: "email", label: "Seu e-mail", type: "email", required: true, autocomplete: "email", placeholder: "voce@email.com" },
    ],
    cta: "Ver a minha leitura",
    privacidade: "Seus dados são confidenciais e usados apenas para o seu atendimento. Sigilo médico. Nada de spam.",
  },
};
