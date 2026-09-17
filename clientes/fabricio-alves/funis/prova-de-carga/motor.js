/* Prova de Carga · lógica compartilhada entre o quiz e a página de resultado.
   ---------------------------------------------------------------------------
   Vive num arquivo próprio de propósito: no funil anterior da casa, app.js e
   diagnostico.js declararam `const F` no mesmo escopo global e a página de
   resultado quebrou calada. Tudo que as duas páginas precisam ler mora aqui, e
   só aqui.

   Quatro leituras saem das respostas:
     definirEixo        qual dos três eixos cede primeiro  (o bucket ASK)
     definirSustentacao quão concentrado está o sinal      (o índice)
     definirDialeto     em que vocabulário falar
     calcularConta      a conta do vazamento, em faixa
   --------------------------------------------------------------------------- */

(function () {
  "use strict";

  /* Devolve o objeto da opção escolhida num passo, pelo id do passo. */
  function opcaoDe(answers, stepId) {
    var F = window.FLOW;
    if (!F || !answers) return null;
    for (var i = 0; i < F.steps.length; i++) {
      var s = F.steps[i];
      if (s.id !== stepId || !s.opcoes) continue;
      for (var j = 0; j < s.opcoes.length; j++) {
        if (s.opcoes[j].value === answers[stepId]) return s.opcoes[j];
      }
    }
    return null;
  }

  /* Todas as opções escolhidas, na ordem das perguntas. */
  function opcoesEscolhidas(answers) {
    var F = window.FLOW, out = [];
    if (!F) return out;
    for (var i = 0; i < F.steps.length; i++) {
      var s = F.steps[i];
      if (!s.id || !s.opcoes) continue;
      var o = opcaoDe(answers, s.id);
      if (o) out.push(o);
    }
    return out;
  }

  /* Alguma resposta marcou "não meço" / "não sei"? */
  function naoMede(answers) {
    return opcoesEscolhidas(answers).some(function (o) { return !!o.naoMede; });
  }

  /* ---------------------------------------------------------------- eixo */
  /* Soma das perguntas 3, 4 e 5. Empate sobe para o eixo mais a montante:
     causa vem antes de sintoma na ordem de reconstrução. */
  var ORDEM = ["desejo", "oferta", "caminho"];

  function pontosPorEixo(answers) {
    var pts = { desejo: 0, oferta: 0, caminho: 0 };
    opcoesEscolhidas(answers).forEach(function (o) {
      if (!o.eixo) return;
      Object.keys(o.eixo).forEach(function (k) {
        if (pts[k] === undefined) pts[k] = 0;
        pts[k] += o.eixo[k];
      });
    });
    return pts;
  }

  function definirEixo(answers) {
    var pts = pontosPorEixo(answers);
    var melhor = ORDEM[0];
    for (var i = 1; i < ORDEM.length; i++) {
      if (pts[ORDEM[i]] > pts[melhor]) melhor = ORDEM[i];
    }
    return melhor;
  }

  /* Diferença de um ponto entre os dois maiores: a página do maior ganha um
     parágrafo de "segundo eixo em observação". Nunca dois diagnósticos. */
  function segundoEixo(answers) {
    var pts = pontosPorEixo(answers);
    var eixo = definirEixo(answers);
    var cand = null;
    ORDEM.forEach(function (k) {
      if (k === eixo) return;
      if (pts[k] < 1) return;          /* sinal zero nao e segundo eixo */
      if (pts[eixo] - pts[k] !== 1) return;
      if (cand === null) cand = k;
    });
    return cand;
  }

  /* -------------------------------------------------------- sustentação */
  /* Índice em linguagem de carga, nunca nota, nunca percentual na tela.
     Lê quanto sinal acumulou e quão espalhado ele está, não gravidade do caso.
       sinal alto, ou alto e nos três eixos  -> sustentação baixa
       sinal ainda baixo                     -> em observação
       o meio                                -> média
     O total possível vai de 2 a 9. Os cortes foram calibrados varrendo as 64
     combinações de P6, P7 e P8 para que as três faixas fossem alcançáveis e
     nenhuma engolisse as outras: dá 20, 17 e 27 das 64. Sem isso o índice
     marcava "baixa" em dois terços dos casos e parava de significar alguma
     coisa, que foi exatamente o que aconteceu no primeiro índice da casa. */
  function definirSustentacao(answers) {
    var pts = pontosPorEixo(answers);
    var total = pts.desejo + pts.oferta + pts.caminho;
    if (!total) return "media";
    var eixosComSinal = ORDEM.filter(function (k) { return pts[k] > 0; }).length;

    if (total >= 8 || (eixosComSinal >= 3 && total >= 7)) return "baixa";
    if (total <= 5) return "alta";
    return "media";
  }

  /* ------------------------------------------------------------ dialeto */
  function definirDialeto(answers) {
    var o = opcaoDe(answers, "operacao");
    return (o && o.dialeto) || "operador";
  }

  /* --------------------------------------------------------------- rota */
  /* Empate de qualificação sobe para a rota maior, nunca desce.
     Regras da tabela 3.5 do documento de arquitetura do cliente. */
  function definirRota(answers) {
    var operacao = opcaoDe(answers, "operacao");
    var custo = opcaoDe(answers, "custo");
    var faturamento = opcaoDe(answers, "faturamento");
    var execucao = opcaoDe(answers, "execucao");

    if (operacao && operacao.fora) return "fora";
    if (!faturamento) return "fora";
    if (faturamento.fora) return "fora";

    var semTrafego = !!(custo && custo.semTrafego);
    var temEquipe = !!(execucao && execucao.equipe);
    var faixaAlta = faturamento.value === "100a300" || faturamento.value === "acima300";

    if (faixaAlta) {
      if (semTrafego) return "diagnostico";
      return temEquipe ? "aplicacao" : "diagnostico";
    }

    /* R$50 mil a R$100 mil */
    if (semTrafego) return "fora";
    return "diagnostico";
  }

  /* -------------------------------------------------------------- conta */
  /* Vazamento mensal = custo por venda × (Δ ÷ (1 + Δ)) × vendas do mês.
     Conservadora usa o piso de cada faixa; realista usa o ponto médio.
     Faixas abertas para cima usam o piso nas duas contas, regra do cliente.
     Faixas abertas para baixo ("Até R$500", "Até 10") usam metade do teto como
     piso: o piso literal seria zero e a conta perderia o sentido. Está
     registrado no README como decisão a confirmar com ele. */
  function arredondaCentena(n) { return Math.round(n / 100) * 100; }

  function calcularConta(answers) {
    var alta = opcaoDe(answers, "alta");
    var vendas = opcaoDe(answers, "vendas");
    var custo = opcaoDe(answers, "custo");

    if (!alta || !vendas || !custo) return { executavel: false };
    if (!alta.conta || !vendas.conta || !custo.conta) return { executavel: false };

    function calc(chave) {
      var d = alta.conta[chave];
      return custo.conta[chave] * (d / (1 + d)) * vendas.conta[chave];
    }

    var conservadora = arredondaCentena(calc("piso"));
    var realista = arredondaCentena(calc("medio"));
    if (realista < conservadora) realista = conservadora;

    return { executavel: true, conservadora: conservadora, realista: realista };
  }

  function moeda(n) {
    return "R$" + Math.round(n).toLocaleString("pt-BR");
  }

  /* --------------------------------------------------------- exportação */
  window.MOTOR = {
    opcaoDe: opcaoDe,
    opcoesEscolhidas: opcoesEscolhidas,
    naoMede: naoMede,
    pontosPorEixo: pontosPorEixo,
    definirEixo: definirEixo,
    segundoEixo: segundoEixo,
    definirSustentacao: definirSustentacao,
    definirDialeto: definirDialeto,
    definirRota: definirRota,
    calcularConta: calcularConta,
    moeda: moeda,
  };
})();
