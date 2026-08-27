/* ============================================================
   FLOW · Funil de Quiz · GES360 · Guilherme Eduardo
   Toda a copy do quiz vive aqui. Copy aprovada na Estratégia
   Completa de 24/07/2026. Estrutura de índice nomeado (IDR)
   seguindo o modelo do Diagnóstico Executivo (IDE).
   Estrutura invisível espelhada do quiz de alta conversão da
   Pâmella (SPIN de 10 passos, qualificação no fim, tela de
   loading, relatório com CTAs distribuídos), igual ao Felipe.
   Regra: zero travessões.
   ============================================================ */
window.FLOW = {
  config: {
    storeKey: "ges360_funil_quiz",
    frente: "GES360",
    funil: "ges360",
    diagnosticoUrl: "diagnostico.html",
  },

  marca: {
    nome: "GES360",
    expert: "Guilherme Eduardo",
    // Número internacional, só dígitos. Confirmado com o Daniel em 11/08: +55 48 99678-4333
    whatsapp: "5548996784333",
    whatsappMsg:
      "Oi Guilherme! Sou {nome}, acabei de fazer o diagnóstico e meu IDR deu {idr} ({faixa}). Quero entender como sair da dependência da consulta avulsa.",
  },

  /* Sem número de perguntas em lugar nenhum, e sem selo. Dizer "responda 10
     perguntas" antes de começar dá ao lead o tamanho da tarefa e um motivo para
     desistir. O "leva 2 minutos" fica, porque fala de esforço, não de volume.
     O `selo` é opcional: se voltar a existir aqui, o app volta a mostrá-lo. */
  hero: {
    titulo: "Descubra o que está travando o faturamento da sua clínica.",
    subtitulo:
      "Responda abaixo e receba o seu IDR, o Índice de Dependência de Receita, com o diagnóstico do que trava o seu faturamento hoje.",
    tempo: "Leva 2 minutos · resultado na hora",
    cta: "Começar meu diagnóstico",
  },

  /* Ordem SPIN: baixa fricção primeiro, qualificação (faturamento + prontidão)
     por último, igual ao quiz da Pâmella e ao do Felipe.
     Cada opção tem:
     - report: frase usada no relatório
     - score:  peso no IDR (0 a 100, quanto maior, maior a dependência)
     As perguntas "tempo" e "prontidao" não têm score: não entram no cálculo do
     IDR, só na leitura do relatório e na qualificação do lead. */
  steps: [
    {
      id: "situacao",
      etapa: "Situação",
      pergunta: "Como é a sua clínica hoje?",
      options: [
        { value: "sozinho", label: "Clínica ou consultório próprio, atendo e cuido de tudo",
          report: "cuidar sozinho da clínica, atendendo e administrando ao mesmo tempo", score: 85 },
        { value: "divide", label: "Divido clínica com outros profissionais",
          report: "dividir a estrutura da clínica com outros profissionais", score: 70 },
        { value: "equipe", label: "Tenho clínica com secretária e equipe",
          report: "já ter uma estrutura com secretária e equipe", score: 45 },
        { value: "estruturando", label: "Estou estruturando o negócio agora",
          report: "estar estruturando o negócio agora", score: 90 },
      ],
    },
    {
      id: "cobranca",
      etapa: "Situação",
      pergunta: "Como você cobra hoje?",
      options: [
        { value: "so-avulsa", label: "Só consulta avulsa",
          report: "depender exclusivamente da consulta avulsa", score: 100 },
        { value: "tento-vender", label: "Consulta avulsa e, às vezes, tento vender acompanhamento",
          report: "viver da consulta avulsa e tentar vender acompanhamento de vez em quando", score: 80 },
        { value: "vende-pouco", label: "Já tenho programa de acompanhamento, mas vende pouco",
          report: "ter um programa de acompanhamento que ainda vende pouco", score: 55 },
        { value: "acompanhamento", label: "O acompanhamento já é a maior parte da minha receita",
          report: "já ter o acompanhamento como maior parte da receita", score: 15 },
      ],
    },
    {
      id: "problema",
      etapa: "Problema",
      pergunta: "O que mais trava o seu faturamento neste momento?",
      options: [
        { value: "avulsa", label: "Dependo de consulta avulsa e não sobra no fim do mês",
          report: "depender da consulta avulsa e não ver sobrar no fim do mês",
          gargalo: "modelo de receita", score: 95 },
        { value: "acha-caro", label: "Ofereço o programa e o paciente acha caro, não fecha",
          report: "oferecer o programa e ouvir que está caro",
          gargalo: "precificação e apresentação do programa", score: 70 },
        { value: "vender", label: "Tenho dificuldade ou vergonha de vender",
          report: "a dificuldade de conduzir a conversa até o fechamento",
          gargalo: "conversão dentro da consulta", score: 75 },
        { value: "sem-programa", label: "Não tenho um programa estruturado para oferecer",
          report: "não ter um programa estruturado para oferecer",
          gargalo: "estruturação da oferta", score: 90 },
      ],
    },
    {
      id: "tempo",
      etapa: "Há quanto tempo",
      pergunta: "Há quanto tempo a sua clínica funciona nesse modelo?",
      options: [
        { value: "recente", label: "Comecei nos últimos meses", report: "alguns meses" },
        { value: "ano", label: "Mais de 1 ano", report: "mais de um ano" },
        { value: "anos", label: "Vários anos, virou o jeito que a clínica funciona", report: "vários anos" },
        { value: "sempre", label: "Desde que eu abri a clínica", report: "desde que você abriu a clínica" },
      ],
    },
    {
      id: "implicacao",
      etapa: "Implicação",
      pergunta: "Se nada mudar, como fica a sua clínica daqui a 12 meses?",
      options: [
        { value: "igual", label: "Igual: trabalhando muito para o mesmo faturamento",
          report: "seguir trabalhando muito para o mesmo faturamento", score: 85 },
        { value: "pior", label: "Pior: mais cansado e com menos tempo para a família",
          report: "ficar mais cansado e com menos tempo para a família", score: 95 },
        { value: "nao-sei", label: "Não sei, e isso me preocupa",
          report: "não ter clareza do que vem pela frente", score: 75 },
        { value: "custa-saude", label: "Vou crescer, mas à custa da minha saúde e da minha vida",
          report: "crescer à custa da própria saúde", score: 80 },
      ],
    },
    {
      id: "tentativas",
      etapa: "O que já tentou",
      pergunta: "O que você já tentou para faturar mais?",
      options: [
        { value: "trafego", label: "Tráfego pago ou anúncios",
          report: "investir em tráfego pago antes de arrumar o modelo de receita", score: 70 },
        { value: "cursos", label: "Cursos e mentorias de gestão ou marketing médico",
          report: "fazer cursos e mentorias sem implementação assistida", score: 60 },
        { value: "instagram", label: "Postar mais no Instagram",
          report: "postar mais no Instagram esperando que o paciente certo aparecesse", score: 75 },
        { value: "nada", label: "Ainda não tentei nada estruturado",
          report: "ainda não ter tentado nada estruturado", score: 85 },
      ],
    },
    {
      id: "objetivo",
      etapa: "Objetivo",
      pergunta: "O que você mais quer nos próximos 6 meses?",
      options: [
        { value: "sem-atender-mais", label: "Faturar mais sem aumentar o número de atendimentos",
          report: "faturar mais sem aumentar o número de atendimentos", score: 50 },
        { value: "previsibilidade", label: "Previsibilidade de receita todo mês",
          report: "ter previsibilidade de receita todo mês", score: 50 },
        { value: "vender-natural", label: "Vender os meus programas com naturalidade",
          report: "vender os seus programas com naturalidade", score: 55 },
        { value: "sair-plantao", label: "Sair dos plantões e focar só na clínica",
          report: "sair dos plantões e focar só na clínica", score: 60 },
      ],
    },
    {
      id: "perfil",
      etapa: "Perfil",
      pergunta: "Qual é a sua especialidade?",
      options: [
        { value: "nutro", label: "Nutrologia, medicina integrativa ou emagrecimento", score: 50 },
        { value: "gineco", label: "Ginecologia ou urologia", score: 50 },
        { value: "esportiva", label: "Medicina esportiva ou tricologia", score: 50 },
        { value: "outra", label: "Outra especialidade ou dono de clínica", score: 50 },
      ],
    },
    {
      id: "qualificacao",
      etapa: "Faturamento",
      pergunta: "Qual o faturamento mensal da sua clínica hoje?",
      options: [
        { value: "ate-20", label: "Até R$ 20 mil", score: 90, icp: false, foraDeArea: true },
        { value: "20-50", label: "De R$ 20 mil a R$ 50 mil", score: 75, icp: false, foraDeArea: true },
        { value: "50-100", label: "De R$ 50 mil a R$ 100 mil", score: 55, icp: true },
        { value: "acima-100", label: "Acima de R$ 100 mil", score: 40, icp: true },
      ],
    },
    {
      id: "prontidao",
      etapa: "O próximo passo",
      pergunta:
        "Você busca um processo estruturado para montar o seu modelo de receita recorrente, mesmo que represente um investimento maior do que um curso ou uma ferramenta?",
      options: [
        { value: "sim", label: "Sim, quero resolver de vez e entendo que é um investimento" },
        { value: "entender", label: "Sim, mas preciso entender melhor como funciona antes" },
        { value: "depois", label: "Ainda não é prioridade pra mim agora", nutrir: true },
        { value: "pesquisando", label: "Só estou pesquisando por enquanto", nutrir: true },
      ],
    },
  ],

  captura: {
    titulo: "Seu diagnóstico está pronto.",
    subtitulo:
      "Preencha abaixo para ver o seu IDR e receber o relatório no seu WhatsApp. Leva 30 segundos.",
    campos: [
      { id: "nomeResp", label: "Seu nome", type: "text", required: true, autocomplete: "name", placeholder: "Como podemos te chamar?" },
      { id: "whatsapp", label: "Seu WhatsApp (com DDD)", type: "tel", required: true, autocomplete: "tel", placeholder: "(48) 99999-9999", mask: "phone" },
      { id: "email", label: "Seu e-mail", type: "email", required: true, autocomplete: "email", placeholder: "voce@email.com" },
    ],
    cta: "Ver meu diagnóstico agora",
    privacidade: "Seus dados são usados apenas para enviar o seu diagnóstico e o contato da equipe. Sem spam.",
  },
};
