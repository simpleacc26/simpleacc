/* ============================================================
   MOTOR. Cálculo do diagnóstico, compartilhado pelas duas páginas.
   Carregado por index.html (antes do app.js) e por diagnostico.html.

   Por que existe: no funil da Luana as funções de cálculo estavam duplicadas
   entre app.js e diagnostico.js, e qualquer ajuste num lado precisava ser
   lembrado no outro. Aqui existe uma fonte só, exposta em window.PRIMAL.
   ============================================================ */
(function () {
  const F = window.FLOW;

  /* IIC: Índice de Inversão de Camada. Só pontuam as perguntas cujas opções
     têm `peso` (origem, perda, trava, custo, tentativa). Objetivo, estrutura,
     conta e ticket ficam de fora: servem para o espelho e para a calibragem
     do argumento.
     Amplitude conferida em calibrar.js: 29% a 100%, com 56% em Alta e 43% em
     Média. A faixa Baixa é rara de propósito, porque o quiz não tem opção de
     "está tudo bem": quem responde já se reconhece no problema. */
  function calcularIIC(answers) {
    let soma = 0, max = 0;
    F.steps.forEach((s) => {
      if (!s.options.some((o) => typeof o.peso === "number")) return;
      max += Math.max(...s.options.map((o) => o.peso || 0));
      const escolhida = s.options.find((o) => o.value === answers[s.id]);
      if (escolhida && typeof escolhida.peso === "number") soma += escolhida.peso;
    });
    const pct = max ? Math.round((soma / max) * 100) : 0;
    return { pct, faixa: pct >= 66 ? "Alta" : (pct >= 33 ? "Média" : "Baixa") };
  }

  /* Trava dominante: sai da P3, a pergunta que a estratégia definiu para
     comandar a personalização da página inteira. */
  function travaDominante(answers) {
    const s = F.steps.find((x) => x.id === "trava");
    const o = s && s.options.find((op) => op.value === answers.trava);
    return (o && o.trava) || "diagnostico";
  }

  /* Afinidade com as quatro travas: soma o campo `travas` de cada opção
     escolhida e normaliza pelo maior valor. Vira as quatro barras do
     relatório. Como tudo vem das respostas da pessoa, não existe número
     inventado na página. */
  function perfilTravas(answers) {
    const acc = { alarme: 0, diagnostico: 0, posicao: 0, ancora: 0 };
    F.steps.forEach((s) => {
      const o = s.options.find((op) => op.value === answers[s.id]);
      if (!o || !o.travas) return;
      Object.keys(acc).forEach((k) => { acc[k] += o.travas[k] || 0; });
    });
    const topo = Math.max(1, ...Object.values(acc));
    return Object.keys(acc).map((k) => ({
      id: k,
      nome: F.travas[k].nome,
      resumo: F.travas[k].resumo,
      /* piso de 12% só para a barra não sumir da tela quando a afinidade é 0 */
      pct: Math.max(12, Math.round((acc[k] / topo) * 100)),
    })).sort((a, b) => b.pct - a.pct);
  }

  /* A CONTA. Uma reunião a mais fechada a cada dez, doze meses, com o PISO da
     faixa de ticket e o PISO da faixa de volume. Deliberadamente conservadora:
     este comprador confere conta, e número inflado aqui derruba a página
     inteira. Retorna null se faltar alguma das duas respostas, e nesse caso o
     bloco não renderiza. */
  function calcularConta(answers) {
    const sC = F.steps.find((s) => s.id === "conta");
    const sT = F.steps.find((s) => s.id === "ticket");
    const oC = sC && sC.options.find((o) => o.value === answers.conta);
    const oT = sT && sT.options.find((o) => o.value === answers.ticket);
    if (!oC || !oT) return null;
    const reunioes = oC.reunioes, ticket = oT.ticket;
    const aMaisMes = reunioes * 0.1;
    const anual = Math.floor((aMaisMes * 12 * ticket) / 1000) * 1000;  // arredonda para baixo
    return { reunioes, ticket, aMaisMes, anual };
  }

  /* Segmento. NINGUÉM é barrado: este funil vende um produto de R$ 2 mil e
     todo mundo que conclui o quiz recebe a oferta. Serve para calibrar o
     argumento na página e para marcar na planilha o perfil de topo (ticket
     acima de R$ 25 mil com time comercial estruturado), que é candidato
     natural ao que o Thiago já vende caro. O funil não aborda esse perfil,
     apenas entrega o nome. */
  function segmentoLead(a) {
    const sT = F.steps.find((s) => s.id === "ticket");
    const oT = sT && sT.options.find((o) => o.value === a.ticket);
    const sE = F.steps.find((s) => s.id === "estrutura");
    const oE = sE && sE.options.find((o) => o.value === a.estrutura);
    if (oT && oT.topo && oE && oE.topo) return "topo";
    if (oT && oT.faixa === "alto") return "ticket-alto";
    if (oT && oT.faixa === "medio") return "ticket-medio";
    return "ticket-entrada";
  }

  function fmtBRL(v) {
    try { return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }); }
    catch (e) { return "R$ " + v; }
  }

  /* ---------- telefone ----------
     Bug de produção pego no funil da Thaina: o autofill do iPhone entrega
     "+55 11 99991-2039" de uma vez e o código do país entrava como se fosse
     DDD. Chegava na planilha "(55) 11999-9120", com o final perdido e sem
     conserto. O 55 sai ANTES de qualquer corte, e nunca se usa maxLength. */
  function soDigitosTel(v) {
    let d = String(v || "").replace(/\D/g, "");
    if (d.length > 11 && d.startsWith("55")) d = d.slice(2);
    return d.slice(0, 11);
  }
  function fmtTel(v) {
    const d = soDigitosTel(v);
    if (d.length <= 2) return d ? "(" + d : "";
    if (d.length <= 7) return "(" + d.slice(0, 2) + ") " + d.slice(2);
    return "(" + d.slice(0, 2) + ") " + d.slice(2, 7) + "-" + d.slice(7);
  }
  /* O DDD 55 (Santa Maria/RS) é real e continua passando: "55999122039" tem 11
     dígitos, então soDigitosTel() não mexe nele. */
  function celularValido(v) {
    const d = soDigitosTel(v);
    return d.length === 11 && d[2] === "9" && Number(d.slice(0, 2)) >= 11;
  }

  /* Texto em terceira pessoa de uma resposta, para costurar o espelho. */
  function frase(answers, stepId) {
    const s = F.steps.find((x) => x.id === stepId);
    const o = s && s.options.find((op) => op.value === answers[stepId]);
    return (o && o.report) || "";
  }
  function rotulo(answers, stepId) {
    const s = F.steps.find((x) => x.id === stepId);
    const o = s && s.options.find((op) => op.value === answers[stepId]);
    return (o && o.label) || "";
  }

  window.PRIMAL = {
    calcularIIC, travaDominante, perfilTravas, calcularConta, segmentoLead,
    fmtBRL, soDigitosTel, fmtTel, celularValido, frase, rotulo,
  };
})();
