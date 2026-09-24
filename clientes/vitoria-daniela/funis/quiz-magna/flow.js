/* ============================================================
   FLOW — Quiz Diagnóstico · Vitória Daniela / Grupo Magna
   Toda a copy do quiz e da lógica de balde/camada vive aqui.
   TEXTO das perguntas e opções = exatamente como a Vitória escreveu
   (QUIZ.docx). A Vitória pediu para não alterar redação nem opções,
   só a ORDEM (Método ASK) e as perguntas novas que ela validou.
   ============================================================ */
window.FLOW = {
  marca: {
    nome: "Vitória Daniela",
    expert: "Vitória Daniela · Grupo Magna",
    whatsapp: "5533997064731",
    whatsappMsg: "Oi! Sou {nome}, acabei de fazer o diagnóstico e quero entender o próximo passo pro meu negócio.",
  },

  hero: {
    selo: "Diagnóstico gratuito · 2 minutos",
    titulo: "Empresária que vende alto ticket: descubra o que está travando a atração de clientes e a previsibilidade de vendas no seu negócio.",
    subtitulo:
      "Tenha clareza dos erros que estão impedindo seu negócio de atrair o público de maior poder aquisitivo, e que estão te fazendo perder tempo com o que não funciona.",
    tempo: "Leva ~2 minutos · 7 perguntas",
  },

  /* Ordem seguindo o Método ASK (pergunta sensível de faturamento por
     último). Textos e opções = exatamente como a Vitória escreveu.
     'balde' marca a pergunta-chave de diagnóstico (Q3). */
  steps: [
    {
      id: "momento",
      etapa: "Seu momento",
      pergunta: "Qual dessas opções descreve o seu momento?",
      options: [
        { value: "zero", label: "Estou começando do absoluto zero (ainda não realizo vendas)." },
        { value: "trafego-sem-resultado", label: "Crio conteúdo e/ou invisto em tráfego pago, mas não tenho os resultados que preciso." },
        { value: "offline-sem-digital", label: "Já vendo no offline / por indicações, mas não consigo trazer isso para o digital." },
        { value: "digital-precisa-escalar", label: "Já vendo com consistência no digital, mas preciso escalar o negócio." },
      ],
    },
    {
      id: "estrutura",
      etapa: "Sua estrutura",
      pergunta: "Como está desenhada a estrutura da sua empresa hoje?",
      options: [
        { value: "sozinha", label: "Faço tudo sozinha e cuido de todas as áreas (desde o atendimento até o marketing)." },
        { value: "equipe-sem-digital", label: "Tenho funcionários fixos ou sócios, mas nenhum braço voltado para o digital." },
        { value: "agencia-terceirizada", label: "Tenho uma agência ou profissionais de marketing trabalhando para mim." },
        { value: "estrutura-completa", label: "Tenho uma estrutura completa (equipe de marketing e equipe comercial)." },
      ],
    },
    {
      id: "desafio",
      etapa: "Seu maior desafio",
      balde: true,
      pergunta: "Qual vem sendo o maior desafio do seu negócio?",
      options: [
        { value: "visibilidade", label: "Ter visibilidade e se tornar uma referência no mercado.", balde: "Sem Posicionamento",
          report: "não ter a visibilidade que você merece nem ser reconhecida como referência no seu mercado" },
        { value: "atrair", label: "Atrair pessoas qualificadas para comprar meu serviço.", balde: "Marketing Sem Sistema",
          report: "atrair pessoas qualificadas de verdade, prontas para investir no seu serviço" },
        { value: "tempo-escala", label: "Falta de tempo e de uma estratégia de escala para o negócio crescer.", balde: "Refém da Operação",
          report: "a falta de tempo e de uma estratégia de escala travando o crescimento do seu negócio" },
        { value: "previsibilidade", label: "Ter previsibilidade de faturamento e estratégia para crescer.", balde: "Sem Previsibilidade",
          report: "a falta de previsibilidade de faturamento, vivendo de mês bom, mês ruim" },
      ],
    },
    {
      id: "ticket",
      etapa: "Seu ticket",
      pergunta: "Qual é o ticket médio do serviço que você vende hoje?",
      options: [
        { value: "ate-1000", label: "Até R$1.000" },
        { value: "1000-3000", label: "Entre R$1.000 e R$3.000" },
        { value: "3000-10000", label: "Entre R$3.000 e R$10.000" },
        { value: "acima-10000", label: "Acima de R$10.000" },
      ],
    },
    {
      id: "urgencia",
      etapa: "Momento de investir",
      pergunta: "Qual seu momento de urgência em resolver isso?",
      options: [
        { value: "nao-prioridade", label: "Eu sei que preciso resolver isso, mas não é uma prioridade pra mim agora." },
        { value: "nao-posso-investir", label: "Eu quero resolver mas não posso investir em nada agora." },
        { value: "viabilizo", label: "Quero viabilizar o investimento em uma solução definitiva se fizer sentido para o meu crescimento." },
      ],
    },
    {
      id: "faturamento",
      etapa: "Faturamento",
      pergunta: "Meu faturamento mensal é de:",
      options: [
        { value: "ate-10mil", label: "Até 10 mil" },
        { value: "10-20mil", label: "Entre 10 e 20 mil" },
        { value: "20-40mil", label: "Entre 20 e 40 mil" },
        { value: "40-70mil", label: "Entre 40 e 70 mil" },
        { value: "70-150mil", label: "Entre 70 e 150 mil" },
        { value: "150-400mil", label: "Entre 150 mil e 400 mil" },
        { value: "acima-400mil", label: "Acima de 400 mil" },
      ],
    },
    {
      id: "quer-analise",
      etapa: "Último passo",
      pergunta: "Você quer que um especialista analise o seu cenário e te mostre o caminho para atrair e converter clientes premium com previsibilidade?",
      options: [
        { value: "sim", label: "Sim, quero que um especialista em vender high ticket me traga o caminho para atrair clientes com previsibilidade." },
        { value: "nao", label: "Não, prefiro continuar tentando sozinho e já estou satisfeito com meus resultados." },
      ],
    },
  ],

  captura: {
    titulo: "Seu diagnóstico está pronto para ser gerado.",
    subtitulo:
      "Pra onde enviamos o resultado? Deixe seu WhatsApp e e-mail que a equipe te envia o diagnóstico completo e os próximos passos.",
    campos: [
      { id: "nomeResp", label: "Seu nome", type: "text", required: true, autocomplete: "name", placeholder: "Como podemos te chamar?" },
      { id: "whatsapp", label: "Seu WhatsApp (com DDD)", type: "tel", required: true, autocomplete: "tel", placeholder: "(33) 99999-9999", mask: "phone" },
      { id: "email", label: "Seu e-mail", type: "email", required: true, autocomplete: "email", placeholder: "voce@email.com" },
    ],
    cta: "Gerar meu diagnóstico",
    privacidade: "Usamos seus dados só para te enviar o diagnóstico e o contato do time. Nada de spam.",
  },

  /* ---------- Lógica de balde e camada (Método ASK) ----------
     Balde: definido pela pergunta-chave "desafio" (Q3).
     Camada: cruza faturamento + ticket + estrutura + urgência para
     decidir se o lead é roteado pra Camada A, B ou nutrição.
     Faixas escaladas a partir do diagnóstico de 2026-07-06
     (piso ICP ~R$20mil, ideal R$50mil+ com equipe e ticket R$3k+). */
  getBalde(answers) {
    const step = this.steps.find((s) => s.id === "desafio");
    const opt = step.options.find((o) => o.value === answers.desafio);
    return opt ? opt.balde : "Sem Previsibilidade";
  },

  getCamada(answers) {
    const faturamentoIdx = this.steps.find((s) => s.id === "faturamento")
      .options.findIndex((o) => o.value === answers.faturamento);
    const ticketAlto = answers.ticket === "3000-10000" || answers.ticket === "acima-10000";
    const temEquipe = answers.estrutura && answers.estrutura !== "sozinha";
    const pronta = answers.urgencia === "viabilizo";

    if (answers["quer-analise"] === "nao") return "desqualificado";
    if (!pronta) return "desqualificado";
    if (faturamentoIdx <= 1) return "desqualificado"; // até 20 mil, abaixo do piso do ICP
    if (faturamentoIdx === 2) return "B"; // 20-40 mil
    if (faturamentoIdx >= 3 && ticketAlto && temEquipe) return "A"; // 40 mil+, ticket 3k+, com equipe
    return "B";
  },
};
