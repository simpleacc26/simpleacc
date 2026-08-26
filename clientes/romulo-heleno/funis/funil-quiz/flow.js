/* ============================================================
   FLOW. Toda a copy do quiz e do relatório vive aqui.
   Funil de Quiz · Mentoria Cabelo de Segunda (Rômulo Heleno).
   Padrão de escrita: NUNCA usar travessões (traço longo).
   ============================================================ */
window.FLOW = {
  config: {
    storeKey: "romulo_funil_mecha",   // chave única do sessionStorage
    frente: "Mentoria Mecha",         // rótulo do projeto (vai pro lead)
    diagnosticoUrl: "diagnostico.html",
  },

  marca: {
    nome: "Rômulo Heleno",
    expert: "Rômulo Heleno",
    // Número internacional, só dígitos. (51) 99799-0520 — confirmar com o cliente.
    whatsapp: "5551997990520",
    // {nome} é trocado pelo primeiro nome de quem respondeu
    whatsappMsg: "Oi, Rômulo! Sou {nome}, acabei de fazer o diagnóstico da minha técnica de mecha e quero falar sobre a sessão estratégica.",
  },

  hero: {
    selo: "Formação técnica em mecha · para cabeleireiros",
    titulo: "Descubra o que está travando a sua técnica de mecha, e o que fazer agora.",
    subtitulo:
      "Responda 10 perguntas rápidas e receba um diagnóstico personalizado com o seu maior gargalo técnico e o caminho exato para resolvê-lo.",
    tempo: "Leva ~3 minutos · 100% confidencial",
    cta: "Começar",
  },

  /* Ordem SPIN: baixa fricção primeiro; qualificação por último.
     report: frase usada no relatório (interpolada em diagnostico.js)
     nutrir: true -> lead de baixa prontidão (CTA mais suave). */
  steps: [
    {
      id: "tempo",
      etapa: "Situação",
      pergunta: "Há quanto tempo você trabalha como cabeleireiro(a)?",
      options: [
        { value: "menos1", label: "Menos de 1 ano, ainda estou me estabelecendo" },
        { value: "1a3", label: "Entre 1 e 3 anos, já atendo mas ainda ganhando experiência" },
        { value: "3a6", label: "Entre 3 e 6 anos, tenho clientela mas quero subir de nível" },
        { value: "mais6", label: "Mais de 6 anos, profissional experiente buscando refinamento" },
      ],
    },
    {
      id: "relacao",
      etapa: "Situação",
      pergunta: "Como você descreveria a sua relação com mecha hoje?",
      options: [
        { value: "nao-faco", label: "Ainda não faço mecha, quero começar do jeito certo",
          report: "estar começando agora na mecha e querer aprender do jeito certo" },
        { value: "inseguranca", label: "Faço, mas com insegurança: cada atendimento me gera ansiedade",
          report: "fazer mecha com insegurança, sentindo ansiedade a cada atendimento" },
        { value: "sem-metodo", label: "Faço com regularidade, mas sem método fixo, dependo da intuição",
          report: "fazer com regularidade, mas sem um método fixo, dependendo da intuição" },
        { value: "evoluir", label: "Tenho algum método, mas sei que posso evoluir muito mais",
          report: "já ter algum método, mas saber que pode evoluir muito mais" },
      ],
    },
    {
      id: "travamento",
      etapa: "Problema",
      pergunta: "Qual é o maior travamento que você sente ao fazer uma mecha?",
      options: [
        { value: "tonalidade", label: "Medo de errar a tonalidade e sair diferente do que a cliente pediu",
          report: "o medo de errar a tonalidade e o resultado sair diferente do que a cliente pediu" },
        { value: "aplicacao", label: "Insegurança na aplicação: folha, textura, timing, divisão de mechas",
          report: "a insegurança na aplicação: folha, textura, timing e divisão de mechas" },
        { value: "tipos", label: "Dificuldade em adaptar a técnica para diferentes tipos de cabelo",
          report: "a dificuldade de adaptar a técnica para diferentes tipos de cabelo" },
        { value: "ticket", label: "Não me sinto especialista o bastante para cobrar um ticket alto",
          report: "não se sentir especialista o bastante para cobrar um ticket alto" },
      ],
    },
    {
      id: "impacto",
      etapa: "Implicação",
      pergunta: "Quando a mecha não sai como esperado, o que normalmente acontece?",
      options: [
        { value: "refaz", label: "Preciso refazer sem cobrar, com prejuízo de tempo e de produto",
          report: "ter que refazer sem cobrar, com prejuízo de tempo e de produto" },
        { value: "perde-cliente", label: "A cliente não volta e eu fico sem saber o que errei",
          report: "a cliente não voltar e você ficar sem saber o que errou" },
        { value: "evita", label: "Fico constrangida(o) e evito indicar o procedimento",
          report: "o constrangimento que faz você evitar indicar o procedimento" },
        { value: "sem-parametro", label: "Aceito qualquer resultado, não tenho parâmetro do que seria certo",
          report: "aceitar qualquer resultado por não ter um parâmetro do que seria certo" },
      ],
    },
    {
      id: "custo",
      etapa: "Implicação",
      pergunta: "Se daqui a 6 meses você ainda não dominar a mecha, o que isso representa?",
      options: [
        { value: "faturamento", label: "Continuar com o mesmo faturamento, sem aumentar o ticket",
          report: "continuar com o mesmo faturamento, sem conseguir aumentar o ticket" },
        { value: "perder", label: "Perder clientes para quem se posiciona como especialista",
          report: "perder clientes para quem se posiciona como especialista" },
        { value: "simples", label: "Continuar dependendo de procedimentos mais simples e baratos",
          report: "continuar dependendo de procedimentos mais simples e baratos" },
        { value: "frustracao", label: "A frustração aumenta, talvez eu considere mudar de área",
          report: "a frustração aumentar a ponto de você considerar mudar de área" },
      ],
    },
    {
      id: "tentativas",
      etapa: "O que já tentou",
      pergunta: "O que você já tentou para dominar a técnica de mecha?",
      options: [
        { value: "curso", label: "Curso online: aprendi bastante, mas na prática trava",
          report: "fazer curso online, aprender bastante, mas na prática travar" },
        { value: "youtube", label: "Perfis de referência e vídeos no YouTube",
          report: "seguir perfis de referência e assistir vídeos no YouTube" },
        { value: "colegas", label: "Aprendi observando colegas de salão",
          report: "aprender observando colegas de salão" },
        { value: "nada", label: "Ainda não tentei nada além da formação inicial",
          report: "ainda não ter tentado nada além da formação inicial" },
      ],
    },
    {
      id: "objetivo",
      etapa: "Objetivo",
      pergunta: "O que você quer conquistar dominando a mecha?",
      options: [
        { value: "ticket", label: "Aumentar o ticket médio e ganhar mais por atendimento",
          report: "aumentar o ticket médio e ganhar mais por atendimento" },
        { value: "especialista", label: "Me posicionar como especialista e atrair clientes exigentes",
          report: "se posicionar como especialista e atrair clientes exigentes" },
        { value: "seguranca", label: "Ter segurança e método, fazer mecha sem medo de errar",
          report: "ter segurança e método, fazendo mecha sem medo de errar" },
        { value: "escalar", label: "Abrir meu próprio espaço ou escalar meu salão",
          report: "abrir o próprio espaço ou escalar o salão" },
      ],
    },
    {
      id: "perfil",
      etapa: "Para quem é",
      pergunta: "Qual cenário descreve melhor a sua situação hoje?",
      options: [
        { value: "terceiros", label: "Trabalho em salão de terceiros e quero crescer" },
        { value: "proprio", label: "Tenho meu próprio salão e quero aumentar o faturamento" },
        { value: "autonomo", label: "Sou autônoma(o): em casa, ateliê ou a domicílio" },
        { value: "formando", label: "Estou finalizando a formação e quero entrar certo no mercado" },
      ],
    },
    {
      id: "frequencia",
      etapa: "Qualificação",
      pergunta: "Com que frequência você faz (ou quer fazer) mecha por semana?",
      options: [
        { value: "nao-faco", label: "Ainda não faço, quero começar" },
        { value: "1a3", label: "1 a 3 atendimentos por semana" },
        { value: "4a7", label: "4 a 7 atendimentos por semana" },
        { value: "mais7", label: "Mais de 7, mecha já é minha principal fonte de renda" },
      ],
    },
    {
      id: "intencao",
      etapa: "O próximo passo",
      pergunta: "Se existisse um método que resolve exatamente o que te trava, você investiria em uma mentoria técnica nos próximos 30 dias?",
      options: [
        { value: "sim", label: "Sim, se eu entender que é o caminho certo para mim" },
        { value: "entender", label: "Sim, mas preciso entender melhor como funciona antes" },
        { value: "esperar", label: "Prefiro esperar mais um tempo", nutrir: true },
        { value: "nao", label: "Não estou pronta(o) agora", nutrir: true },
      ],
    },
  ],

  captura: {
    titulo: "Seu diagnóstico está pronto.",
    subtitulo:
      "Pra onde enviamos? Deixe seu WhatsApp que o Rômulo te manda o diagnóstico da sua técnica e o próximo passo, sem compromisso.",
    campos: [
      { id: "nomeResp", label: "Seu nome", type: "text", required: true, autocomplete: "name", placeholder: "Como podemos te chamar?" },
      { id: "whatsapp", label: "Seu WhatsApp (com DDD)", type: "tel", required: true, autocomplete: "tel", placeholder: "(51) 99999-9999", mask: "phone" },
      { id: "email", label: "Seu e-mail", type: "email", required: true, autocomplete: "email", placeholder: "voce@email.com" },
      { id: "instagram", label: "Seu @ do Instagram", type: "text", required: false, autocomplete: "off", placeholder: "@seuperfil" },
    ],
    cta: "Ver meu diagnóstico agora",
    privacidade: "🔒 Usamos seus dados só para te enviar o diagnóstico e o contato do Rômulo. Nada de spam.",
  },
};
