/* Prova de Carga · a página de leitura.
   ---------------------------------------------------------------------------
   Não é resultado de quiz. É o laudo preliminar: veredito, espelho, causa-raiz
   nomeada, a conta em reais com a fórmula exposta, os cenários, o que não
   adianta mexer, o método, a prova e o próximo passo por rota.

   A fronteira que sustenta a escada: aqui entra o O QUÊ (o eixo, a faixa, o que
   não adianta mexer). O COMO (o critério exato dentro do eixo e a ordem de
   reconstrução) sai do Exame, que é pago. Não mova essa linha.
   --------------------------------------------------------------------------- */

(function () {
  "use strict";

  var FL = window.FLOW;
  var M = window.MOTOR;
  var KEY = (FL.config && FL.config.storeKey) || "fa_prova_de_carga";

  function estado() {
    try { return JSON.parse(sessionStorage.getItem(KEY)) || {}; } catch (e) { return {}; }
  }

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  var st = estado();
  var a = st.answers || {};
  var lead = st.lead || {};
  var raiz = document.getElementById("leitura");

  /* Sem respostas na sessão não há leitura para montar. */
  if (!a.faturamento) {
    raiz.innerHTML =
      "<h1>A sua medição não está mais aberta nesta aba.</h1>" +
      '<p class="lead">A leitura é montada com as suas respostas e vive só nesta sessão do navegador. ' +
      "Se você fechou a aba ou abriu o link em outro aparelho, a medição precisa ser refeita. " +
      "São três minutos.</p>" +
      '<div class="btn-linha"><a class="btn" href="index.html">Refazer a medição</a></div>';
    return;
  }

  var primeiroNome = String(lead.name || "").trim().split(/\s+/)[0] || "";
  var eixoId = M.definirEixo(a);
  var E = FL.eixos[eixoId];
  var segundoId = M.segundoEixo(a);
  var sustId = M.definirSustentacao(a);
  var S = FL.sustentacao[sustId];
  var dialeto = FL.dialetos[M.definirDialeto(a)];
  var rota = M.definirRota(a);
  var R = FL.rotas[rota === "aplicacao" ? "aplicacao" : "diagnostico"];
  var conta = M.calcularConta(a);

  function r(id) {
    var o = M.opcaoDe(a, id);
    return o ? o.report : "";
  }
  function v(id) { return a[id]; }

  /* ----------------------------------------------------------- o espelho */
  /* Devolve as respostas dele em texto corrido. É o bloco que faz a pessoa
     sentir que foi lida, então cada frase é montada com a sua própria moldura
     e os casos de "não meço" têm frase própria. */
  function espelho() {
    var f = [];
    f.push("Você vende " + r("operacao") + ".");

    if (v("alta") === "nao_sei") {
      f.push("Quanto o custo por venda subiu nos últimos meses, você ainda não sabe dizer.");
    } else {
      f.push("Nos últimos seis a doze meses, o custo por venda " + r("alta") + ".");
    }

    if (v("custo") === "sem_trafego") {
      f.push("A oferta principal faz " + r("vendas") + ", sem mídia paga rodando hoje.");
    } else if (v("custo") === "nao_meco") {
      f.push("A oferta principal faz " + r("vendas") + ", e o custo de cada uma ainda não é medido.");
    } else {
      f.push("A oferta principal faz " + r("vendas") + ", a um custo de mídia " + r("custo") + ".");
    }

    f.push("O último movimento para segurar esse custo foi " + r("ajuste") + ".");
    f.push("Sobre quem disputa o mesmo clique: " + r("concorrencia") + ".");
    f.push("No fechamento, quem chega interessado costuma " + r("fechamento") + ".");
    f.push("Quem se perde, se perde " + r("vazamento") + ".");
    f.push("Na execução: " + r("execucao") + ".");
    return f;
  }

  /* -------------------------------------------------------------- a conta */
  function blocoConta() {
    if (!conta.executavel) {
      return (
        '<div class="conta">' +
        '<p class="conta-faixa">A medição não é executável com os dados que você informou.</p>' +
        "<p>Isso também é um resultado. Uma operação que não mede o custo por venda está subindo verba " +
        "no escuro, e a primeira coisa que a estrutura devolve quando é medida é a possibilidade de " +
        "conferir a própria conta.</p>" +
        '<p class="conta-formula">A fórmula serve para você fazer a conta esta semana: ' +
        "<code>(custo por venda atual menos custo por venda anterior) vezes vendas do mês</code>. " +
        "O eixo abaixo continua valendo, e o Exame refaz a conta com o seu extrato.</p>" +
        "</div>"
      );
    }
    /* Quando as três faixas marcadas são abertas para cima, o piso e o ponto
       médio coincidem e a conta deixa de ser faixa. Sai como número único, em
       vez de "R$X a R$X", que parece defeito. */
    var unico = conta.conservadora === conta.realista;
    var valor = unico
      ? M.moeda(conta.conservadora)
      : M.moeda(conta.conservadora) + ' <span class="ate">a</span> ' + M.moeda(conta.realista);

    return (
      '<div class="conta">' +
      '<p class="conta-faixa">' + valor +
      '<br><span class="ate" style="font-size:.42em">por mês, pelo mesmo resultado</span></p>' +
      "<p>Com o volume e a alta que você marcou, é o que a sua operação já paga a mais hoje, " +
      "todo mês, para vender o mesmo que vendia." +
      (unico
        ? " As três faixas que você marcou são abertas para cima, então esta conta usa o piso de " +
          "cada uma: o número real é maior, nunca menor."
        : "") +
      "</p>" +
      '<p class="conta-formula">Faixa, não número mágico, e você pode refazer com os valores exatos: ' +
      "<code>(custo por venda atual menos custo por venda anterior) vezes vendas do mês</code>. " +
      (unico ? "" : "A conservadora usa o piso das faixas que você marcou; a realista usa o ponto médio. ") +
      "O Exame usa o seu extrato.</p>" +
      "</div>"
    );
  }

  /* --------------------------------------------------------- os cenários */
  function blocoCenarios() {
    var linhas = [
      {
        rot: "Hoje",
        txt: "A estrutura sustenta parte da decisão, e o resto é compensado por " +
          dialeto.verba + ", por desconto ou pela sua presença na conversa.",
      },
      {
        rot: "Com o dobro",
        txt: "A mesma estrutura recebendo o dobro de carga. Entra mais " + dialeto.publico +
          ", e " + dialeto.publico + " decide pela estrutura, não pela sua autoridade. " +
          "O que hoje é compensado passa a ser compensado em dobro" +
          (conta.executavel ? ", e a faixa acima acompanha na mesma proporção." : "."),
      },
      {
        rot: "Recomposta",
        txt: "O eixo que cede volta a sustentar a decisão sozinho. A verba deixa de ser aposta " +
          "e passa a ser decisão, porque o número que cada venda custa passa a ser o número " +
          "que a estrutura foi desenhada para custar.",
        destaque: true,
      },
    ];
    return (
      '<div class="cenarios">' +
      linhas
        .map(function (l) {
          return (
            '<div class="cenario' + (l.destaque ? " destaque" : "") + '">' +
            '<div class="cenario-rot">' + esc(l.rot) + "</div>" +
            '<p class="cenario-txt">' + esc(l.txt) + "</p>" +
            "</div>"
          );
        })
        .join("") +
      "</div>" +
      '<p class="nota" style="margin-top:14px">Nenhuma dessas linhas é uma promessa de faturamento. ' +
      "São três estados da mesma estrutura sob cargas diferentes.</p>"
    );
  }

  /* ---------------------------------------------------------- as três fases */
  function blocoFases() {
    var fases = [
      { chave: "desejo", nome: "Desejo, mensagem e acordo", txt: "Análise de concorrência promessa por promessa, mensagem recomposta e oferta canônica." },
      { chave: "oferta", nome: "Lastro", txt: "Arquitetura de preço e risco, e o inventário do que já é crível hoje e do que falta construir." },
      { chave: "caminho", nome: "Caminho e implantação comandada", txt: "As peças do anúncio ao pagamento escritas, implantadas pela sua equipe e testadas de ponta a ponta." },
    ];
    return (
      '<ul class="fases">' +
      fases
        .map(function (f) {
          var ch = f.chave === eixoId;
          return (
            '<li class="' + (ch ? "chave" : "") + '"><strong>' + esc(f.nome) + "</strong>" +
            (ch ? '<span class="rot">o seu ponto de partida</span>' : "") +
            "<br>" + esc(f.txt) + "</li>"
          );
        })
        .join("") +
      "</ul>"
    );
  }

  /* ------------------------------------------------------------------ CTA */
  function cta(nota) {
    var destino = R.destino === "whatsapp" ? "#" : R.destino;
    var attrs = R.destino === "whatsapp" ? ' data-wpp href="#"' : ' href="' + destino + '"';
    return (
      '<div class="btn-linha">' +
      "<a class=\"btn\"" + attrs + ">" + esc(R.botao) + "</a>" +
      '<p class="btn-micro">' + esc(nota || R.micro) + "</p>" +
      '<div class="aviso" data-aviso>O canal de atendimento ainda está em configuração. ' +
      "Se você chegou até aqui, me chame no perfil e diga que fez a medição: eu respondo pessoalmente.</div>" +
      "</div>"
    );
  }

  function blocoCasos() {
    return (
      FL.casos
        .map(function (c) {
          return (
            '<div class="caso">' +
            '<div class="caso-num">' + esc(c.numero) +
            ' <span class="janela">' + esc(c.janela) + "</span></div>" +
            '<div class="caso-nome">' + esc(c.nome) + " · " + esc(c.marca) + "</div>" +
            "<p>" + esc(c.texto) + "</p>" +
            "</div>"
          );
        })
        .join("") +
      '<p class="nota" style="margin-top:16px">' + esc(FL.casosNota) + "</p>"
    );
  }

  function blocoAutoridade() {
    var A = FL.autoridade;
    return (
      '<div class="autor-topo">' +
      '<div class="autor-selo"><img src="' + FL.marca.selo + '" alt="" aria-hidden="true"></div>' +
      "<div><div class=\"autor-nome\">" + esc(A.nome) + "</div>" +
      '<div class="autor-cargo">' + esc(A.cargo) + "</div></div>" +
      "</div>" +
      "<p>" + esc(A.origem) + "</p>" +
      '<div class="creds">' +
      A.credenciais
        .map(function (c) {
          return (
            '<div class="cred"><div class="cred-num">' + esc(c.num) + "</div>" +
            '<div class="cred-ctx">' + esc(c.ctx) + "</div></div>"
          );
        })
        .join("") +
      "</div>"
    );
  }

  /* ------------------------------------------------- o próximo passo, por rota */
  var agora =
    rota === "aplicacao"
      ? "O próximo passo não é uma call de vendas. É uma aplicação escrita, que eu leio e respondo " +
        "em 24 horas. Se o caso tiver sinal de falha relevante neste eixo e a sua operação tiver quem " +
        "execute, o passo seguinte é o Exame: a mesma medição, feita com o seu extrato em vez das " +
        "faixas que você marcou."
      : "O próximo passo é o Exame Estrutural: a mesma medição, feita com os seus números reais em " +
        "vez das faixas que você marcou. Ele termina em um de três vereditos, e um deles é " +
        "«não é caso estrutural agora». Nesse cenário a conversa encerra ali, você fica com a " +
        "medição e não paga mais nada.";

  var garantia =
    "O raio-x grátis termina em pitch. Este exame pode terminar em «não é caso». " +
    "É a diferença entre um instrumento e uma isca, e é por isso que o exame é pago: " +
    "ele vale por si, e o valor é integralmente creditado se você seguir para a intervenção.";

  /* ------------------------------------------------------------- montagem */
  var seg = segundoId
    ? "<p><strong>Segundo eixo em observação: " + esc(FL.eixos[segundoId].nome) + ".</strong> " +
      "A diferença entre os dois é de um ponto só, o que quase nunca significa dois problemas. " +
      "Significa que o eixo " + esc(FL.eixos[segundoId].nome) + " está absorvendo parte da pressão " +
      "que nasce no eixo " + esc(E.nome) + ". A ordem de conserto continua sendo a de cima para " +
      "baixo: causa antes de sintoma.</p>"
    : "";

  raiz.innerHTML =
    /* Bloco 0 · abertura e veredito */
    '<p class="res-abertura">' +
    (primeiroNome ? esc(primeiroNome) + ", esta" : "Esta") +
    " leitura foi montada com as suas respostas.</p>" +

    '<div class="veredito">' +
    "<div>" +
    '<p class="eyebrow">O eixo que cede primeiro</p>' +
    '<p class="veredito-eixo">' + esc(E.nome) + "</p>" +
    '<p class="veredito-selo">' + esc(E.selo) + "</p>" +
    '<p class="veredito-sust">' + esc(S.nome) + "</p>" +
    '<p class="veredito-leitura">' + esc(S.leitura) + "</p>" +
    "</div>" +
    '<div class="veredito-fig"><img src="' + FL.marca.conceito + '" alt="" aria-hidden="true"></div>' +
    "</div>" +

    /* Bloco 1 · antes de tudo */
    '<div class="bloco">' +
    "<h2>" + esc(E.chamada) + "</h2>" +
    "<p>Antes de qualquer coisa: o que esta medição encontrou não é falta de capacidade nem falta de " +
    "esforço. Você fez o que se faz. Testou, trocou, investiu, montou time. O que a medição encontrou " +
    "é uma camada abaixo disso, e ela não responde a esforço, responde a estrutura.</p>" +
    "<p>" + esc(E.papel) + "</p>" +
    "</div>" +

    /* Bloco 2 · o espelho */
    '<hr class="regua">' +
    '<div class="bloco">' +
    '<p class="eyebrow">O seu cenário, nas suas respostas</p>' +
    "<h2>O que você me contou</h2>" +
    "<p>" + espelho().map(esc).join(" ") + "</p>" +
    '<p class="nota">' + esc(dialeto.exemplo) + "</p>" +
    "</div>" +

    /* Bloco 3 · causa-raiz nomeada */
    '<span class="linha-diag"></span>' +
    '<div class="bloco">' +
    '<p class="eyebrow">A causa, com nome</p>' +
    "<h2>Por que isso não se resolveu até agora</h2>" +
    "<p>" + esc(E.causa) + "</p>" +
    "<p>O nome disso é <strong>erosão estrutural</strong>: o mercado copia a oferta até ela perder " +
    "distinção e deixar de sustentar a decisão sozinha. Não é um defeito do que você construiu. " +
    "É o que acontece com toda estrutura que ficou boa o bastante para ser copiada, e nenhuma " +
    "operação escapa disso por esforço. Escapa por recomposição.</p>" +
    seg +
    '<ul class="sintomas">' +
    E.sintomas.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") +
    "</ul>" +
    "</div>" +

    /* Bloco 4 · a conta */
    '<hr class="regua">' +
    '<div class="bloco">' +
    '<p class="eyebrow">A sua conta, com os seus números</p>' +
    "<h2>O que a estrutura em erosão já custa</h2>" +
    blocoConta() +
    "</div>" +

    /* Bloco 5 · cenários */
    '<div class="bloco">' +
    '<p class="eyebrow">A pergunta-controle, respondida</p>' +
    "<h2>A mesma operação sob três cargas</h2>" +
    blocoCenarios() +
    "</div>" +

    /* Bloco 6 · o que não adianta mexer */
    '<div class="bloco">' +
    '<div class="nao-adianta"><h3>' + esc(E.naoAdianta.titulo) + "</h3>" +
    "<p>" + esc(E.naoAdianta.texto) + "</p></div>" +
    "</div>" +

    /* CTA distribuído 1 */
    cta() +

    /* Bloco 7 · o método */
    '<span class="linha-diag"></span>' +
    '<div class="bloco">' +
    '<p class="eyebrow">' + esc(FL.metodo.eyebrow) + "</p>" +
    "<h2>" + esc(FL.metodo.titulo) + "</h2>" +
    "<p>" + esc(FL.metodo.texto) + "</p>" +
    blocoFases() +
    "<p style=\"margin-top:16px\">" + esc(E.faseTexto) + "</p>" +
    "<p>" + esc(FL.metodo.remate) + "</p>" +
    "</div>" +

    /* Bloco 8 · o que precisa acontecer agora */
    '<hr class="regua">' +
    '<div class="bloco">' +
    '<p class="eyebrow">O que precisa acontecer agora</p>' +
    "<h2>Medir com o extrato, não com faixas</h2>" +
    "<p>" + esc(agora) + "</p>" +
    "<p>" + esc(garantia) + "</p>" +
    "</div>" +

    /* CTA distribuído 2 */
    cta() +

    /* Bloco 9 · prova */
    '<hr class="regua">' +
    '<div class="bloco">' +
    '<p class="eyebrow">Quem já passou pelo instrumento</p>' +
    "<h2>Dois números, com nome</h2>" +
    blocoCasos() +
    "</div>" +

    /* Bloco 10 · autoridade */
    '<hr class="regua">' +
    '<div class="bloco">' +
    '<p class="eyebrow">Quem assina a medição</p>' +
    blocoAutoridade() +
    "</div>" +

    /* Bloco 11 · CTA final */
    '<span class="linha-diag"></span>' +
    '<div class="bloco">' +
    "<h2>" +
    (rota === "aplicacao"
      ? "A sua operação tem carga e tem quem execute."
      : "A sua operação tem carga. O que falta é a medição com os seus números.") +
    "</h2>" +
    "<p>" +
    (rota === "aplicacao"
      ? "É o perfil que o Comando atende: decisão que ainda mora no dono, tráfego rodando e uma equipe " +
        "que implanta. A aplicação é escrita e leva dez minutos. Eu leio e respondo em 24 horas, e a " +
        "resposta é uma mensagem, não uma reunião."
      : "O Exame mede os três eixos com o seu extrato, nomeia o gargalo dominante, converte o " +
        "vazamento em reais e entrega a ordem de conserto. Se não entregar os três, não é cobrado.") +
    "</p>" +
    cta() +
    "</div>";

  /* ----------------------------------------------------------- CTA handler */
  /* Um handler só pega todos os botões distribuídos pela página. */
  document.addEventListener("click", function (e) {
    var b = e.target.closest && e.target.closest("[data-wpp]");
    if (!b) return;
    e.preventDefault();
    var num = (FL.marca.whatsapp || "").replace(/\D/g, "");
    if (!num) {
      var av = b.closest(".btn-linha").querySelector("[data-aviso]");
      if (av) av.classList.add("visivel");
      return;
    }
    var msg =
      "Fabrício, fiz a Prova de Carga. O eixo que apareceu foi " + E.nome +
      (conta.executavel
        ? ", e a faixa foi de " + M.moeda(conta.conservadora) + " a " + M.moeda(conta.realista) + " por mês."
        : ".") +
      " Quero pedir o Exame Estrutural.";
    window.open("https://wa.me/" + num + "?text=" + encodeURIComponent(msg), "_blank", "noopener");
  });
})();
