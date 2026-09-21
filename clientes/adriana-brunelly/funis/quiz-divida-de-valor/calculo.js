/* ============================================================
   CÁLCULO · o motor de leitura das respostas.
   Compartilhado pelo quiz (app.js) e pela página de resultado
   (diagnostico.js), para que os dois nunca divirjam.

   Faz três coisas: calcula a Dívida de Valor em reais, define o
   bucket dominante e classifica o lead para o comercial.
   ============================================================ */
(function (global) {
  var F = global.FLOW;
  var STORE_KEY = (F.config && F.config.storeKey) || "quiz";

  function lerEstado() {
    try { return JSON.parse(sessionStorage.getItem(STORE_KEY)) || {}; } catch (e) { return {}; }
  }
  function respostas() { return lerEstado().answers || {}; }

  function opcaoDe(stepId, a) {
    a = a || respostas();
    var step = F.steps.find(function (s) { return s.id === stepId; });
    if (!step) return null;
    return step.options.find(function (o) { return o.value === a[stepId]; }) || null;
  }
  function frase(stepId, a) { var o = opcaoDe(stepId, a); return (o && o.report) || ""; }
  function valor(stepId, a) { var o = opcaoDe(stepId, a); return o && typeof o.valor === "number" ? o.valor : 0; }
  function label(stepId, a) { var o = opcaoDe(stepId, a); return (o && o.label) || ""; }

  function brl(n) {
    try {
      return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
    } catch (e) { return "R$ " + Math.round(n); }
  }

  /* ---- A Dívida de Valor ----
     ticket médio x eventos por mês x (desconto + extras absorvidos).
     Só sai daqui número que veio das respostas. Nada estimado por fora. */
  function calcularDivida(a) {
    a = a || respostas();
    var ticket = valor("ticket", a);
    var eventos = valor("volume", a);
    var pctDesc = valor("desconto", a);
    var pctExtra = valor("extras", a);

    // Base conservadora: nunca acima do faturamento declarado na porteira.
    var bruto = ticket * eventos;
    var oFat = opcaoDe("faturamento", a);
    var teto = oFat && typeof oFat.fatMax === "number" ? oFat.fatMax : Infinity;
    var faturamento = Math.min(bruto, teto);

    var vDesconto = faturamento * pctDesc;
    var vExtras = faturamento * pctExtra;
    var mes = vDesconto + vExtras;

    var piso = (F.calculo && F.calculo.pisoParaMostrarNumero) || 500;
    return {
      ticket: ticket, eventos: eventos, faturamento: faturamento, baseBruta: bruto,
      pctDesconto: pctDesc, pctExtras: pctExtra,
      valorDesconto: vDesconto, valorExtras: vExtras,
      mes: mes, ano: mes * 12, tresAnos: mes * 36,
      temNumero: mes >= piso,
      fmt: {
        mes: brl(mes), ano: brl(mes * 12), tresAnos: brl(mes * 36),
        desconto: brl(vDesconto), extras: brl(vExtras), ticket: brl(ticket),
      },
    };
  }

  /* ---- O bucket dominante ----
     Pontuação por resposta (campo peso em flow.js). No empate o
     lead SOBE para o bucket de maior perda, nunca desce: é a regra
     de desempate da apostila, e a ordem está em buckets[].ordem. */
  function definirBucket(a) {
    a = a || respostas();
    var placar = { orcamento: 0, desconto: 0, extra: 0, agenda: 0 };

    F.steps.forEach(function (step) {
      var o = opcaoDe(step.id, a);
      if (!o || !o.peso) return;
      Object.keys(o.peso).forEach(function (k) {
        if (placar[k] != null) placar[k] += o.peso[k];
      });
    });

    var chaves = Object.keys(placar).sort(function (x, y) {
      if (placar[y] !== placar[x]) return placar[y] - placar[x];
      return F.buckets[x].ordem - F.buckets[y].ordem;  // empate sobe
    });

    var vencedor = chaves[0];
    // Nenhum peso marcado (caso raro): cai no padrão mais comum do mercado dela.
    if (placar[vencedor] === 0) vencedor = "orcamento";
    return { chave: vencedor, placar: placar, dados: F.buckets[vencedor] };
  }

  /* ---- Classificação para o comercial ----
     Qualificado: faixa de R$ 40 mil por mês em diante.
     A nutrir: faixas de R$ 10 mil a R$ 40 mil, com a exceção que
     vale ouro (perda mensal acima do corte sobe para a sessão).
     Fora por ora: até R$ 10 mil, recebe a leitura e a oferta de entrada. */
  function classificarLead(a, divida) {
    a = a || respostas();
    divida = divida || calcularDivida(a);
    var o = opcaoDe("faturamento", a);
    if (!o) return "nutrir";

    if (o.fora) return "fora";
    if (o.nutrir) {
      var corte = (F.calculo && F.calculo.regraSobeParaSessao) || 3000;
      return divida.mes >= corte ? "qualificado" : "nutrir";
    }
    return "qualificado";
  }

  global.MOTOR = {
    lerEstado: lerEstado, respostas: respostas, opcaoDe: opcaoDe,
    frase: frase, valor: valor, label: label, brl: brl,
    calcularDivida: calcularDivida, definirBucket: definirBucket,
    classificarLead: classificarLead,
  };
})(window);
