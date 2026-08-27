/* ============================================================
   FLOW. Toda a copy do quiz vive aqui.
   Cliente: Luana Isse · Método MMPV (Multiplicação do Valor Percebido)
   Índice: IRV, Índice de Ruptura de Valor.
   Estrutura: blueprint "estrutura invisível" da Simple (9 passos SPIN,
   as 2 porteiras no fim, índice só nas perguntas de diagnóstico).
   Padrão de escrita: nunca usar travessões. Sem emoji.
   LINGUAGEM NEUTRA EM GÊNERO: o ICP dela tem homens e mulheres (psicólogos,
   advogados, médicos, nutricionistas, coaches). Nenhum adjetivo pode concordar
   com o leitor. Ao escrever opção nova, leia em voz alta como homem e como
   mulher: se soar errado numa das duas, reescreva.
   ============================================================ */
window.FLOW = {
  config: {
    storeKey: "luana_isse_quiz",
    frente: "Diagnóstico de Autoridade",
    diagnosticoUrl: "diagnostico.html",
    indice: { sigla: "IRV", nome: "Índice de Ruptura de Valor" },
  },

  marca: {
    nome: "Luana Isse",
    expert: "Luana Isse",
    tagline: "Método MMPV",
    instagram: "@luana.isse",
    // WhatsApp comercial, só dígitos, formato internacional.
    whatsapp: "5547992730303",
    /* A mensagem leva o RESULTADO NOMEADO, não só o nome: quem atende abre a
       conversa já sabendo o diagnóstico. Placeholders: {nome} {resultado}
       {irv} {faixa} {pilar}. */
    whatsappMsg: "Oi, Luana! Sou {nome}. Fiz o Diagnóstico de Autoridade e o meu resultado foi {resultado}, com IRV de {irv} (ruptura {faixa}) concentrada em {pilar}. Quero falar sobre a sessão de posicionamento.",
  },

  /* Resultado nomeado por pilar. É o que vai no WhatsApp, na planilha e no
     topo do relatório. Escrito na linguagem dela: chega de ser excelente e
     continuar invisível. */
  resultados: {
    Mentalidade:    "Excelente na sombra",
    Movimento:      "Excelente sem causa",
    Posicionamento: "Excelente e intercambiável",
    Vendas:         "Excelente sem caminho de venda",
  },

  hero: {
    titulo: "Existe um motivo pelo qual o mercado ainda ignora você",
    subtitulo: "Responda e descubra o tamanho da sua Ruptura de Valor Percebido, a distância entre o que você sabe e o que o mercado enxerga, e onde exatamente ela está travando as suas vendas.",
    tempo: "Leva cerca de 2 minutos e o resultado é seu na hora",
  },

  /* Ordem SPIN. peso 0 a 3 entra no IRV (só nas perguntas de diagnóstico:
     situação, problema, impacto, o que já tentou e perfil). Tempo, objetivo e
     as duas porteiras não pontuam.
     PESOS CALIBRADOS: rodamos as 1024 combinações antes de publicar. Com os
     pesos iniciais, 89% caíam em "Alta" e "Baixa" era impossível, ou seja, o
     número era teatro. Baixando as alternativas mais leves para 0 e 1, a
     amplitude foi para 20% a 100% e a distribuição para ~50% Alta, ~49% Média,
     ~1% Baixa. A faixa Baixa é rara de propósito: o quiz não tem alternativa
     de "está tudo bem", porque quem responde já se reconhece no problema.
     Se mexer em qualquer peso, RODE A DISTRIBUIÇÃO DE NOVO. */
  steps: [
    {
      id: "situacao",
      etapa: "Situação",
      pergunta: "Como as pessoas chegam até você hoje?",
      options: [
        { value: "so_indicacao", label: "Quase tudo por indicação de quem já me conhece", peso: 3,
          report: "receber gente quase só por indicação de quem já te conhece" },
        { value: "indicacao_insta", label: "Indicação e, de vez em quando, alguém do Instagram", peso: 2,
          report: "viver de indicação e, de vez em quando, alguém que chega pelo Instagram" },
        { value: "chega_gente", label: "Já recebo mensagens de gente que não me conhecia", peso: 1,
          report: "já receber mensagens de gente que ainda não te conhecia" },
        { value: "fluxo", label: "Tenho fluxo constante de gente me procurando", peso: 0,
          report: "já ter um fluxo constante de gente te procurando" },
      ],
    },
    {
      id: "problema",
      etapa: "Problema",
      pergunta: "O que mais te trava hoje?",
      options: [
        { value: "expor", label: "Me expor. Sinto que estou fazendo papel de outra pessoa", peso: 3, pilar: "Mentalidade",
          report: "travar na hora de aparecer, sentindo que está fazendo papel de outra pessoa" },
        { value: "sem_causa", label: "Não sei o que eu defendo. Falo do meu serviço, não de uma ideia", peso: 3, pilar: "Movimento",
          report: "falar do seu serviço sem ter clareza do que você defende" },
        { value: "generico", label: "O que eu falo poderia ser dito por qualquer colega da minha área", peso: 2, pilar: "Posicionamento",
          report: "dizer o que qualquer colega da sua área também poderia dizer" },
        { value: "sem_oferta", label: "Sei comunicar, mas não tenho oferta nem processo para vender", peso: 1, pilar: "Vendas",
          report: "comunicar bem, mas sem uma oferta e um processo que sustentem a venda" },
      ],
    },
    {
      id: "tempo",
      etapa: "Há quanto tempo",
      pergunta: "Há quanto tempo isso se repete?",
      options: [
        { value: "recente", label: "Começou nos últimos meses", report: "alguns meses" },
        { value: "ano", label: "Mais de um ano", report: "mais de um ano" },
        { value: "anos", label: "Vários anos, virou o normal", report: "vários anos" },
        { value: "sempre", label: "Desde que comecei, nunca foi diferente", report: "praticamente desde que você começou" },
      ],
    },
    {
      id: "impacto",
      etapa: "Impacto",
      pergunta: "Se nada mudar, como você imagina os próximos 12 meses?",
      options: [
        { value: "igual", label: "Igual: continuo excelente e o mercado não me enxerga", peso: 3,
          report: "seguir excelente no que faz enquanto o mercado segue sem te enxergar" },
        { value: "preco", label: "Continuo competindo por preço", peso: 2,
          report: "continuar competindo por preço, como se fosse mais um nome na lista" },
        { value: "esteira", label: "Continuo trocando hora por dinheiro, sem escalar", peso: 1,
          report: "continuar trocando hora por dinheiro, sem conseguir escalar" },
        { value: "desistir", label: "Não sei se continuo tentando o digital", peso: 2,
          report: "a dúvida real sobre continuar ou não tentando o digital" },
      ],
    },
    {
      id: "necessidade",
      etapa: "O que já tentou",
      pergunta: "O que você já tentou para mudar isso?",
      options: [
        { value: "cursos", label: "Cursos de marketing digital que não saíram do papel", peso: 3,
          report: "fazer cursos de marketing digital que nunca saíram do papel" },
        { value: "social_media", label: "Contratei social media ou agência, e não veio cliente", peso: 2,
          report: "contratar social media ou agência sem que viesse cliente" },
        { value: "constancia", label: "Postei com constância, por conta própria, e nada mudou", peso: 1,
          report: "postar com constância, por conta própria, sem que nada mudasse" },
        { value: "nada", label: "Ainda não tentei nada estruturado", peso: 0,
          report: "ainda não ter tentado nada estruturado" },
      ],
    },
    {
      id: "objetivo",
      etapa: "Objetivo",
      pergunta: "O que você mais quer nos próximos 6 meses?",
      options: [
        { value: "clareza", label: "Ter clareza do que eu falo e para quem", report: "ter clareza do que você fala e para quem" },
        { value: "referencia", label: "Virar referência no que eu faço", report: "virar referência no que faz" },
        { value: "cobrar", label: "Cobrar o que o meu trabalho realmente vale", report: "cobrar o que o seu trabalho realmente vale" },
        { value: "mentoria", label: "Lançar a minha mentoria", report: "lançar a sua mentoria" },
      ],
    },
    {
      id: "perfil",
      etapa: "Seu perfil",
      pergunta: "Qual frase mais representa você hoje?",
      options: [
        { value: "bom_invisivel", label: "Faço um trabalho muito bom e quase ninguém sabe disso", peso: 3,
          report: "fazer um trabalho muito bom que quase ninguém conhece" },
        { value: "sem_linha", label: "Tenho conteúdo demais na cabeça e nenhuma linha clara", peso: 3,
          report: "ter conteúdo demais na cabeça e nenhuma linha clara" },
        { value: "audiencia_fria", label: "Já tenho audiência, mas ela não me vê como autoridade", peso: 2,
          report: "ter audiência que ainda não te enxerga como autoridade" },
        { value: "virar_mentor", label: "Quero migrar para mentoria e não sei por onde começar", peso: 1,
          report: "querer migrar para mentoria sem saber por onde começar" },
      ],
    },

    /* ---- PORTEIRA 1: faturamento. 6 faixas. As duas primeiras filtram. ---- */
    {
      id: "faturamento",
      etapa: "Momento",
      pergunta: "Quanto você fatura por mês hoje com o seu trabalho?",
      options: [
        { value: "sem_constancia", label: "Ainda não faturo de forma constante", fora: true },
        { value: "ate5", label: "Até R$ 5 mil", fora: true },
        { value: "5a10", label: "De R$ 5 mil a R$ 10 mil" },
        { value: "10a25", label: "De R$ 10 mil a R$ 25 mil" },
        { value: "25a50", label: "De R$ 25 mil a R$ 50 mil" },
        { value: "acima50", label: "Acima de R$ 50 mil" },
      ],
    },

    /* ---- PORTEIRA 2: prontidão. A opção de nutrir enquadra como momento,
       nunca como "algo mais barato". ---- */
    {
      id: "prontidao",
      etapa: "O próximo passo",
      pergunta: "Você busca um processo estruturado para resolver isso de vez, mesmo que represente um investimento maior do que um curso ou uma ferramenta?",
      options: [
        { value: "sim", label: "Sim, quero resolver de vez e entendo que é um investimento" },
        { value: "entender", label: "Sim, mas preciso entender melhor como funciona antes" },
        { value: "depois", label: "Ainda não é prioridade para mim agora", nutrir: true },
        { value: "pesquisando", label: "Só estou pesquisando por enquanto", nutrir: true },
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
