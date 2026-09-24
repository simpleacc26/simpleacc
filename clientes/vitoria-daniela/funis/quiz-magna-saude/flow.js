/* ============================================================
   FLOW — Quiz Diagnóstico Saúde · Vitória Daniela / Grupo Magna
   Toda a copy do quiz e a lógica de balde/camada vivem aqui.

   TEXTO da headline, das perguntas e das opções = exatamente como a
   Vitória escreveu no doc "QUIZ" (aba QUIZ SAUDE), inclusive a ordem
   das opções dentro de cada pergunta. Ela pediu para não alterar a
   redação, só a ORDEM das perguntas (Método ASK).
   Exceções: "estrutura" e "ticket" são as 2 perguntas novas criadas na
   revisão de 08/09 (estrategia/2026-09-08-revisao-quiz-metodo-ask.html),
   que ela validou com essas opções.
   ============================================================ */
window.FLOW = {
  marca: {
    nome: "Vitória Daniela",
    whatsapp: "5533997064731",
    whatsappMsg: "Oi! Sou {nome}, acabei de fazer o diagnóstico da minha clínica e quero agendar minha análise estratégica.",
  },

  hero: {
    selo: "Diagnóstico gratuito para clínicas e consultórios",
    destaque: "Empresária da saúde:",
    titulo: "Empresária da saúde: descubra o que está travando a atração de pacientes qualificados e a previsibilidade de vendas na sua clínica/consultório.",
    subtitulo:
      "Mapeie os erros que impedem a sua clínica de atrair o público de maior poder aquisitivo. Em poucos minutos, você receberá um direcionamento personalizado com os ajustes necessários para construir um ecossistema de vendas previsível e garantir estabilidade, lucro e autoridade.",
    tempo: "7 perguntas · cerca de 2 minutos",
  },

  /* Ordem Método ASK: abre com uma pergunta de situação (não sensível),
     pergunta-chave de balde no meio, faturamento no fim e o convite para
     análise fechando o quiz. 'toast' = micro-recompensa ao responder. */
  steps: [
    {
      id: "contato",
      etapa: "Seus contatos hoje",
      pergunta: "Qual dessas opções descreve o tipo de contato que chega até o WhatsApp da sua clínica através da internet?",
      options: [
        { value: "indicacoes", label: "Quase não chegam; dependo 100% de indicações e do boca a boca.",
          curto: "Quase não chegam, depende de indicações",
          report: "Hoje quase nenhum contato chega pela internet: a agenda depende de indicações e do boca a boca." },
        { value: "curiosos", label: "Chegam muitos curiosos sem dinheiro, que somem quando passo o preço.",
          curto: "Chegam muitos curiosos sem dinheiro",
          report: "Pela internet chegam muitos curiosos, que somem assim que você passa o preço." },
        { value: "inconstante", label: "Chegam pessoas qualificadas, mas o fluxo é totalmente inconstante.",
          curto: "Chegam qualificadas, mas sem constância",
          report: "Já chegam pessoas qualificadas pela internet, mas o fluxo é totalmente inconstante." },
      ],
    },
    {
      id: "estrutura",
      etapa: "Sua estrutura",
      pergunta: "Como está desenhada a estrutura da sua clínica/consultório hoje?",
      options: [
        { value: "sozinha", label: "Faço praticamente tudo sozinha, do atendimento ao marketing da clínica.",
          curto: "Faz praticamente tudo sozinha" },
        { value: "equipe-sem-digital", label: "Tenho equipe fixa na clínica (recepção, outros profissionais), mas nada voltado ao digital.",
          curto: "Equipe fixa, nada voltado ao digital" },
        { value: "agencia-sem-comercial", label: "Tenho uma agência ou profissional de marketing cuidando da atração, mas nada de comercial estruturado.",
          curto: "Marketing terceirizado, sem comercial" },
        { value: "estrutura-completa", label: "Tenho estrutura completa (marketing e comercial rodando) na clínica.",
          curto: "Marketing e comercial rodando" },
      ],
    },
    {
      id: "desafio",
      etapa: "Seu maior desafio",
      balde: true,
      toast: "Anotado. Essa é a resposta mais importante do seu diagnóstico.",
      pergunta: "Qual vem sendo o maior desafio da sua clínica/consultório?",
      options: [
        { value: "atrair", label: "Atrair pessoas para comprar", balde: "Marketing Sem Sistema",
          curto: "Atrair pessoas para comprar",
          report: "atrair pessoas que de fato chegam para comprar" },
        { value: "visibilidade", label: "Ter visibilidade e ser referência no meu mercado", balde: "Sem Posicionamento",
          curto: "Visibilidade e ser referência",
          report: "ter visibilidade e ser reconhecida como referência no seu mercado" },
        { value: "previsibilidade", label: "Ter previsibilidade de faturamento e organização", balde: "Sem Previsibilidade",
          curto: "Previsibilidade e organização",
          report: "ter previsibilidade de faturamento e organização na clínica" },
        { value: "tempo-escala", label: "Falta de tempo e estratégia de escala para o negócio crescer.", balde: "Refém da Operação",
          curto: "Falta de tempo e de estratégia de escala",
          report: "a falta de tempo e de uma estratégia de escala para a clínica crescer" },
      ],
    },
    {
      id: "ticket",
      etapa: "Seu ticket médio",
      pergunta: "Qual é o ticket médio do procedimento/tratamento que você vende hoje?",
      options: [
        { value: "ate-1000", label: "Até R$1.000" },
        { value: "1000-3000", label: "Entre R$1.000 e R$3.000" },
        { value: "3000-10000", label: "Entre R$3.000 e R$10.000" },
        { value: "acima-10000", label: "Acima de R$10.000" },
      ],
    },
    {
      id: "urgencia",
      etapa: "Seu momento",
      toast: "Falta pouco: só mais 2 perguntas.",
      pergunta: "Qual seu momento de urgência em resolver isso?",
      options: [
        { value: "nao-prioridade", label: "Eu sei que preciso resolver isso, mas não é uma prioridade pra mim agora" },
        { value: "nao-posso-investir", label: "Eu quero resolver mas não posso investir em nada agora" },
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
      pergunta: "Você quer que um especialista analise o seu cenário e te mostre o caminho para atrair e converter pacientes premium com previsibilidade?",
      options: [
        { value: "sim", label: "Sim, quero que um especialista na área da saúde me traga o caminho para atrair pacientes com previsibilidade." },
        { value: "nao", label: "Não, prefiro continuar tentando sozinho e já estou satisfeito com meus resultados." },
      ],
    },
  ],

  captura: {
    titulo: "Seu diagnóstico está pronto para ser gerado.",
    subtitulo:
      "Para onde enviamos o resultado? Deixe seu WhatsApp e seu e-mail para receber o diagnóstico completo da sua clínica e os próximos passos.",
    campos: [
      { id: "nomeResp", label: "Seu nome", type: "text", required: true, autocomplete: "name", placeholder: "Como podemos te chamar?" },
      { id: "whatsapp", label: "Seu WhatsApp (com DDD)", type: "tel", required: true, autocomplete: "tel", placeholder: "(33) 99999-9999", mask: "phone" },
      { id: "email", label: "Seu e-mail", type: "email", required: true, autocomplete: "email", placeholder: "voce@email.com" },
    ],
    cta: "Gerar meu diagnóstico",
    privacidade: "Usamos seus dados só para enviar o diagnóstico e para o contato da equipe. Nada de spam.",
  },

  /* ---------- Lógica de balde e camada (Método ASK) ----------
     Balde: definido pela pergunta-chave "desafio".
     Camada: cruza faturamento + ticket + estrutura + urgência + convite.
     Mesmas faixas do Quiz Genérico (piso do ICP ~R$20 mil; ideal
     R$40 mil+ com equipe e ticket R$3 mil+). Primeira aproximação:
     ajustar quando houver dados reais. */
  getBalde(answers) {
    const step = this.steps.find((s) => s.id === "desafio");
    const opt = step.options.find((o) => o.value === answers.desafio);
    return opt ? opt.balde : "Sem Previsibilidade";
  },

  /* "Dra. Camila Souza" → "Dra. Camila" (o público costuma assinar com o título). */
  primeiroNome(nomeCompleto) {
    const partes = String(nomeCompleto || "").trim().split(/\s+/).filter(Boolean);
    if (!partes.length) return "";
    if (partes.length > 1 && /^(dra?|doutora?)\.?$/i.test(partes[0])) return partes[0] + " " + partes[1];
    return partes[0];
  },

  getCamada(answers) {
    const faturamentoIdx = this.steps.find((s) => s.id === "faturamento")
      .options.findIndex((o) => o.value === answers.faturamento);
    const ticketAlto = answers.ticket === "3000-10000" || answers.ticket === "acima-10000";
    const temEquipe = !!answers.estrutura && answers.estrutura !== "sozinha";
    const pronta = answers.urgencia === "viabilizo";

    if (answers["quer-analise"] === "nao") return "desqualificado";
    if (!pronta) return "desqualificado";
    if (faturamentoIdx <= 1) return "desqualificado"; // até 20 mil, abaixo do piso do ICP
    if (faturamentoIdx === 2) return "B"; // 20 a 40 mil
    if (ticketAlto && temEquipe) return "A"; // 40 mil+, ticket 3 mil+, com equipe
    return "B";
  },
};
