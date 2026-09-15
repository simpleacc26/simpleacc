/* ============================================================
   DIAGNÓSTICO · Método Gatilho Único
   Monta o relatório personalizado a partir das respostas do quiz.

   Quiz do tipo Killer: o resultado é um ERRO NOMEADO, não uma nota.
   Não existe índice aqui. Ver o comentário no flow.js.

   O diagnóstico sai de UMA pergunta só, a `cena`, que é a última antes da
   captura. Cada alternativa carrega um `diag`.

   Padrão de escrita: sem travessões, sem emoji.
   LINGUAGEM NEUTRA EM GÊNERO em todo texto que a pessoa lê.
   ============================================================ */
const STORE_KEY = (window.FLOW && window.FLOW.config && window.FLOW.config.storeKey) || "luana_gatilho_unico";
const F = window.FLOW;
const report = document.getElementById("report");

function getState() { try { return JSON.parse(sessionStorage.getItem(STORE_KEY)) || {}; } catch (e) { return {}; } }
function frase(stepId) {
  const st = getState().answers || {};
  const s = F.steps.find((x) => x.id === stepId);
  const o = s && s.options.find((op) => op.value === st[stepId]);
  return o ? (o.report || o.label) : "";
}
function esc(s) { return String(s == null ? "" : s).replace(/[<>&]/g, c => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c])); }

const a = getState().answers || {};

function diagnosticoDe(answers) {
  const s = F.steps.find((x) => x.id === "cena");
  const o = s && s.options.find((op) => op.value === answers.cena);
  return (o && o.diag) || "pitch";
}

/* ============================================================
   AS QUATRO LEITURAS
   Uma por diagnóstico. Cada uma tem:
     porque  · o mecanismo do problema, na voz de quem vive ele
     antes   · o que acontece hoje
     depois  · o que passa a acontecer
     passos  · a prescrição, três movimentos concretos
     modulo  · onde o Gatilho Único resolve, para amarrar com a VSL

   REGRA DE TOM: começa reconhecendo o que a pessoa faz bem, e o problema
   aparece como CONSEQUÊNCIA dessa qualidade, nunca como defeito. É isso que
   faz ela continuar lendo em vez de se defender.
   ============================================================ */
const LEITURA = {
  oferta: {
    porque: "Numa conversa, você lê a pessoa e monta a proposta na medida. Escopo, entrega, preço. Isso funciona, e funciona tão bem que virou o seu jeito de vender. Só que significa uma coisa: <strong>hoje você não tem uma oferta, você tem uma conversa.</strong> E conversa não se grava.",
    antes: ["Cada proposta é montada do zero", "O preço muda conforme a pessoa", "Só você sabe explicar o que está vendendo", "Nada disso cabe num vídeo"],
    depois: ["Uma promessa clara, escrita", "Um escopo que não muda a cada conversa", "Qualquer pessoa entende sem você explicar", "E agora existe o que gravar"],
    passos: [
      "<strong>Fechar a oferta antes de gravar qualquer coisa.</strong> Uma promessa, um escopo, um preço. Gravar sem isso é gravar uma dúvida.",
      "<strong>Escolher uma dor só.</strong> A oferta que serve para todo mundo não convence ninguém, e é ela que obriga você a improvisar na hora.",
      "<strong>Escrever a oferta em uma frase.</strong> Se não couber em uma frase, ainda não está fechada."
    ],
    modulo: "É o Módulo 2 do Gatilho Único, de persona, mercado e oferta. O P de Pesquisa."
  },
  pitch: {
    porque: "Numa call você não segue roteiro, você reage. A pessoa fala, você percebe o tom e escolhe o próximo argumento. Funciona tão bem que ficou invisível: você nunca precisou saber qual é a ordem, porque a outra pessoa sempre deu a deixa. <strong>Na gravação não tem deixa.</strong> E aí falta o que nunca existiu escrito, que é a sequência.",
    antes: ["O argumento existe, mas só dentro de você", "Cada call começa do zero", "Sai fácil ao vivo, trava na câmera", "A venda depende da sua presença"],
    depois: ["O argumento está escrito e ordenado", "A mesma conversa roda quantas vezes precisar", "A câmera vira só o meio", "A venda acontece sem você estar lá"],
    passos: [
      "<strong>Extrair o que você já diz.</strong> Não inventar roteiro novo: gravar duas calls suas e transcrever.",
      "<strong>Achar a sequência.</strong> Descobrir a ordem que se repete nas conversas que fecharam. Ela existe, você só nunca olhou para ela.",
      "<strong>Substituir a deixa.</strong> Onde a pessoa dava a deixa, o conteúdo antecipa."
    ],
    modulo: "É o Módulo 3 do Gatilho Único, o coração do programa. O E de Expressão."
  },
  objecao: {
    porque: "Você fecha porque responde na hora. A pessoa hesita, você percebe e devolve o argumento certo. Daí vem a sensação de que, sem você presente, tudo desmonta. <strong>Mas objeção não é imprevisível.</strong> Quem vende há algum tempo ouve as mesmas cinco ou seis, com palavras diferentes. Elas são finitas, e o que é finito cabe num roteiro.",
    antes: ["A dúvida aparece e você improvisa", "Sem você, a pessoa trava e some", "Cada call resolve as mesmas objeções de novo", "Você acredita que só ao vivo funciona"],
    depois: ["A dúvida é respondida antes de aparecer", "A pessoa segue sozinha até o fim", "A objeção é resolvida uma vez, para sempre", "O conteúdo sustenta o que você sustentava"],
    passos: [
      "<strong>Listar as objeções reais.</strong> Não as que você imagina: as que apareceram nas últimas dez conversas.",
      "<strong>Ordenar por frequência.</strong> As duas ou três primeiras respondem pela maioria das perdas.",
      "<strong>Responder dentro do conteúdo, antes da pergunta.</strong> Quem responde antes parece que leu a mente. Quem responde depois parece que está se defendendo."
    ],
    modulo: "É a parte de objeções da Copy Gatilho Único, no Módulo 3."
  },
  conducao: {
    porque: "A pessoa assiste, elogia, diz que era exatamente o que precisava. E não compra. Isso não é falta de interesse: <strong>o seu conteúdo fez o trabalho de convencer e parou ali.</strong> Convencer e vender são coisas diferentes. Uma termina em concordância, a outra termina em decisão, e decisão precisa de um caminho.",
    antes: ["O conteúdo termina e a pessoa fica parada", "Elogio não vira compra", "Falta clareza do próximo passo", "A venda volta a depender de você chamar"],
    depois: ["O conteúdo termina apontando uma ação", "O próximo passo é único e óbvio", "A pessoa decide sozinha", "A compra acontece sem você chamar"],
    passos: [
      "<strong>Definir um próximo passo só.</strong> Duas opções no fim de um conteúdo viram nenhuma.",
      "<strong>Tornar esse passo imediato.</strong> Quanto mais perto do fim do vídeo, menos chance de a vida atravessar.",
      "<strong>Tirar tudo que compete.</strong> Menu, link solto, mais um vídeo depois. Tudo que oferece uma saída, a pessoa usa."
    ],
    modulo: "É a chamada para ação no Módulo 3, mais a estrutura de checkout e follow-up do Módulo 4."
  },
};

/* ============================================================
   DEPOIMENTOS EM PRINT
   São os prints ORIGINAIS que ela mandou em 20/08, não transcrição: print de
   conversa converte mais porque é verificável, a pessoa reconhece a interface.
   Nem todo mundo aperta play nos vídeos, então a prova precisa existir também
   em formato que se lê de relance.
   Sobre valor em reais: dois destes citam faturamento (R$ 62.400 e 10k). Isso
   rompia a régua original desta conta. A decisão do cliente, em 24/08, foi
   publicar. Mesma decisão do vídeo da Ali. Ver o comentário em VIDEOS.
   O print da Nathy foi CORTADO em y=715 do original para tirar o Acassio Aires
   e o "Você adicionou Luana Viertel": são terceiros que aparecem no grupo, não
   têm relação com o depoimento e não autorizaram nada. Se trocar esse print,
   cortar de novo.
   O alt de cada um transcreve o conteúdo, para quem usa leitor de tela e para
   quando a imagem não carrega.
   ============================================================ */
const PRINTS = [
  {
    src: "depoimentos/print-diego.jpg", largo: false,
    quem: "Diego", papel: "mentorado",
    alt: "Conversa no WhatsApp: o mentorado manda o print do painel de vendas com 8 vendas encontradas, a Luana pergunta o valor, ele responde R$ 62.400,00. A Luana responde: Parabéns, Diego! É só o começo. Ele responde: Amém Lu, obrigado.",
  },
  {
    src: "depoimentos/print-mairon.jpg", largo: false,
    quem: "Mairon Ribas", papel: "mentorado",
    alt: "Story da Luana mostrando a carta de compromisso da Kiwify de 10 mil em vendas, com a pulseira e o brinde da plataforma. Legenda: Meu mentorado chegou aos 10k de venda! Parabéns, @mairon.ribas.",
  },
  {
    src: "depoimentos/print-nathy.jpg", largo: true,
    quem: "Nathy", papel: "mentorada",
    alt: "Mensagem no grupo da mentoria: Luanaaa, grupo! Hoje eu vendi a minha primeira mentoria no Método Tekton que criei a partir do MMPV. Eu tô super feliz. 1 mês que fiz minha escolha de estar aqui e já iniciou os resultados. Sei que tem muito mais para vir. A Luana responde: Uau, parabéns Nathy, é só começo!",
  },
];

/* Depoimentos em vídeo. Os três que ela mandou em 20/08 estão no ar.
   ATENÇÃO, não é descuido: o vídeo da Ali Klemt (dep-1) tem "47k em Mentoria"
   queimado na imagem nos primeiros 5 segundos. Isso rompe a régua que vale
   para os depoimentos escritos daqui, que é não citar valor em reais.
   Levantei o ponto (regra da própria Luana de não prometer resultado
   financeiro, e a Meta lê a página de destino do anúncio) e a decisão do
   cliente, em 24/08, foi publicar assim mesmo. Fica registrado para ninguém
   "consertar" isso depois achando que passou batido. Se um dia sair, é
   decisão do cliente também.
   Os prints seguem a mesma decisão: ver o bloco PRINTS acima.
   preload="none": o vídeo só é baixado se a pessoa apertar play, senão o
   relatório abriria puxando megabytes que quase ninguém assiste. */
const VIDEOS = [
  { src: "depoimentos/dep-1.mp4", poster: "depoimentos/dep-1.jpg", nome: "Ali Klemt",       papel: "mentorada" },
  { src: "depoimentos/dep-3.mp4", poster: "depoimentos/dep-3.jpg", nome: "Allan",           papel: "mentorado" },
  { src: "depoimentos/dep-2.mp4", poster: "depoimentos/dep-2.jpg", nome: "Caroline Seyler", papel: "mentorada" },
];

if (!a._completedAt && !a.cena) {
  report.innerHTML = `
    <p class="eyebrow">Seu diagnóstico</p>
    <h2>Ainda não temos as suas respostas</h2>
    <p class="lead">Parece que você chegou aqui sem responder o diagnóstico. Leva cerca de 2 minutos.</p>
    <div class="actions"><a class="btn btn-primary btn-block" href="index.html">Fazer agora</a></div>`;
} else {
  const nome = esc((a.nomeResp || "").split(" ")[0]) || "tudo bem";
  const vende = frase("vende") || "o seu trabalho";
  const como = frase("como") || "vender como vende hoje";
  const volume = frase("volume") || "as calls do último mês";
  const peso = frase("peso") || "o peso desse formato";
  const tentou = frase("tentou") || "buscar uma saída";
  const cena = frase("cena") || "";

  const diag = diagnosticoDe(a);
  const L = LEITURA[diag];
  const resultado = (F.resultados && F.resultados[diag]) || "Pitch que mora na sua cabeça";

  /* Mesma regra do app.js, repetida aqui porque as duas páginas são
     independentes. Se mexer em uma, mexa na outra. */
  const stepFat = F.steps.find((s) => s.id === "faturamento");
  const optFat = stepFat && stepFat.options.find((o) => o.value === a.faturamento);
  const caixaBom = ["5a15", "15a30", "acima30"].indexOf(a.faturamento) > -1;
  const agora = a.prontidao === "semana" || a.prontidao === "mes";
  const nivel = (optFat && optFat.fora) ? "fora"
    : ((a.prontidao === "entender" || a.prontidao === "pesquisando") ? "nutrir"
      : ((agora && caixaBom) ? "fila-quente" : "qualificado"));

  let ctaLabel, ctaExtra, fecho;
  if (nivel === "fila-quente" || nivel === "qualificado") {
    ctaLabel = "Quero construir meu Gatilho Único";
    ctaExtra = '<p class="hint">A Luana explica o método inteiro em uma aula. É ela que mostra como sair daqui.</p>';
    fecho = '<p class="clube">Você já tem o que é mais difícil: uma venda que funciona. O que falta é tirar ela de dentro da call.</p>';
  } else if (nivel === "nutrir") {
    ctaLabel = "Quero entender como funciona";
    ctaExtra = '<p class="hint">Sem compromisso e no seu tempo. A aula mostra o caminho inteiro, e você decide depois.</p>';
    fecho = '<p class="clube">Não existe hora errada para entender o que está travando. A decisão vem quando fizer sentido.</p>';
  } else {
    ctaLabel = "Falar com a equipe no WhatsApp";
    ctaExtra = '<p class="hint">A equipe te indica por onde começar no seu momento.</p>';
    fecho = '<p class="clube">O Gatilho Único parte de uma venda que já funciona. Quando a sua estiver de pé, ele encaixa.</p>';
  }

  /* CTA principal leva para a VSL quando ela existir. Enquanto `vslUrl`
     estiver vazio no flow.js, cai no WhatsApp e nada quebra. */
  const vsl = (F.marca && F.marca.vslUrl) || "";
  const botao = (cls) => vsl && nivel !== "fora"
    ? `<a class="btn btn-primary ${cls}" href="${vsl}" target="_blank" rel="noopener">${ctaLabel}</a>`
    : `<button class="btn btn-primary cta-wpp ${cls}">${ctaLabel}</button>`;
  const ctaInline = `<div class="cta-inline">${botao("")}</div>`;

  report.innerHTML = `
    <div class="report-head">
      <span class="selo">Diagnóstico Gatilho Único</span>
      <h1>A parte da sua venda que só existe ao vivo</h1>
      <div class="resultado">${resultado}</div>
      <p class="hint">A partir das suas respostas em ${new Date().toLocaleDateString("pt-BR")}</p>
    </div>

    <div class="etapa">
      <h3>Antes de tudo</h3>
      <p>Oi, ${nome}. Li tudo o que você respondeu, e quero começar pelo que talvez ninguém tenha te dito:
      <strong>o que trava a sua venda não é falta de competência.</strong> É o contrário.
      O que trava é uma coisa que você faz bem demais, e por isso nunca precisou escrever.</p>
    </div>

    <div class="etapa">
      <h3>O seu cenário hoje</h3>
      <p>Você vende <strong>${vende}</strong>, e a venda acontece ao <strong>${como}</strong>.
      Foram <strong>${volume}</strong>, e o que mais pesa nesse formato é <strong>${peso}</strong>.</p>
      <p>Você já chegou a <strong>${tentou}</strong>. E quando imaginou gravar um único conteúdo,
      a sua resposta foi que <strong>${cena}</strong>.</p>
    </div>

    <div class="etapa">
      <h3>Por que isso acontece</h3>
      <p>${L.porque}</p>
    </div>

    <div class="etapa">
      <h3>O que muda quando resolve</h3>
      <div class="compare">
        <div class="col bad">
          <h4>Como é hoje</h4>
          <ul>${L.antes.map(x => `<li>${x}</li>`).join("")}</ul>
        </div>
        <div class="col good">
          <h4>Como passa a ser</h4>
          <ul>${L.depois.map(x => `<li>${x}</li>`).join("")}</ul>
        </div>
      </div>
      <p class="hint">A mesma conversa que hoje acontece uma vez, com uma pessoa, passa a acontecer com quantas assistirem.</p>
    </div>

    ${ctaInline}

    <div class="etapa">
      <h3>O que precisa acontecer</h3>
      <ol class="metodo">
        ${L.passos.map(x => `<li>${x}</li>`).join("")}
      </ol>
      <p class="hint">${L.modulo}</p>
    </div>

    <div class="etapa">
      <h3>Como o Gatilho Único funciona</h3>
      <p>O método tem três movimentos, nessa ordem:</p>
      <ol class="metodo">
        <li><strong>Pesquisa:</strong> entender o mercado, o desejo e a objeção antes de escrever qualquer coisa.</li>
        <li><strong>Mecanismo:</strong> organizar a oferta e o argumento que sustentam a venda.</li>
        <li><strong>Expressão:</strong> transformar isso em um único conteúdo que apresenta, quebra objeção e conduz até a compra.</li>
      </ol>
      <p class="hint">Fora dessa ordem não funciona. É por isso que gravar antes de fechar a oferta quase nunca converte.</p>
    </div>

    <div class="etapa">
      <h3>Quem é a Luana Isse</h3>
      <div class="autor">
        <img class="autor-foto" src="luana.jpg" alt="Luana Isse" width="160" height="160" loading="lazy" />
        <div>
          <span class="autor-nome">LUANA ISSE</span>
          <span class="autor-cargo">Jornalista · Copywriter · Estrategista · Master Coach</span>
          <a class="autor-ig" href="https://www.instagram.com/luana.isse/" target="_blank" rel="noopener">@luana.isse</a>
        </div>
      </div>
      <p>Passei dez anos construindo narrativa para líderes que precisavam ser lembrados pelo que representam.
      Hoje ajudo especialistas a tirar de dentro da call a venda que já funciona ali.</p>
      <p class="autor-fala">"Durante muito tempo eu achei que o problema eram as calls. Até perceber que eu estava
      tentando resolver o problema errado. O problema nunca foi a call."</p>
      <div class="cred-grid">
        <div class="cred"><div class="n">10 anos</div><div class="d">de comunicação e narrativa para líderes</div></div>
        <div class="cred"><div class="n">30</div><div class="d">especialistas já mentorados</div></div>
        <div class="cred full"><div class="n">87</div><div class="d">pessoas em evento presencial, no orgânico</div></div>
      </div>
    </div>

    <div class="etapa">
      <h3>Quem já fez esse caminho</h3>
      <div class="dep-videos">
        ${VIDEOS.map(v => `
          <figure class="dep-video">
            <video src="${v.src}" poster="${v.poster}" controls playsinline preload="none"></video>
            <figcaption><b>${v.nome}</b>${v.papel}</figcaption>
          </figure>`).join("")}
      </div>
      <div class="dep-prints">
        ${PRINTS.map(d => `
          <figure class="dep-print${d.largo ? " largo" : ""}">
            <a href="${d.src}" target="_blank" rel="noopener">
              <img src="${d.src}" alt="${d.alt}" loading="lazy" />
            </a>
            <figcaption><b>${d.quem}</b>${d.papel}</figcaption>
          </figure>`).join("")}
      </div>
      <p class="dep-dica">Toque em qualquer print para ver em tamanho real.</p>
    </div>

    <div class="cta-box">
      <h2 style="margin-top:0">O próximo passo, ${nome}</h2>
      <p>Dar o primeiro passo é simples, e no seu tempo.</p>
      ${ctaExtra}
      <div class="actions" style="justify-content:center">
        ${botao("")}
      </div>
      ${fecho}
    </div>`;
}

/* ---------- WhatsApp: um handler para todos os CTAs distribuídos ----------
   Trava: se o número estiver vazio ou ainda com X de placeholder, os CTAs não
   abrem nada e a página mostra um aviso no topo. Evita publicar com botão
   mudo e só descobrir depois que o tráfego já rodou. */
function numeroValido() {
  const n = String((F.marca && F.marca.whatsapp) || "");
  return /^[0-9]{12,13}$/.test(n);
}

function abrirWhatsApp() {
  if (!numeroValido()) {
    console.warn("[funil] WhatsApp não configurado em flow.js > marca.whatsapp");
    return;
  }
  const diag = diagnosticoDe(a);
  const msg = (F.marca.whatsappMsg || "")
    .replace("{nome}", (a.nomeResp || "").split(" ")[0] || "")
    .replace("{resultado}", (F.resultados && F.resultados[diag]) || "");
  window.open(`https://wa.me/${F.marca.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
}

/* ============================================================
   PIXEL DA META no relatório
   A biblioteca carrega no diagnostico.html (PageView sai de lá). Aqui saem os
   dois eventos que só existem nesta página.
   Contact no clique do WhatsApp é o sinal de intenção mais forte do funil:
   a pessoa leu o diagnóstico e foi falar com a Luana. Vale acompanhar de perto,
   e é um bom candidato a evento de otimização quando houver volume.
   NUNCA mande nome, telefone ou e-mail para o Pixel. Só qualificação.
   ============================================================ */
function metaPadrao(evento, params) {
  if (typeof fbq !== "function") return;
  try { fbq("track", evento, params || {}); } catch (e) { /* nunca quebra a página */ }
}
function paramsQualificacao() {
  try {
    const a = getState().answers || {};
    const diag = diagnosticoDe(a);
    return {
      content_name: (F.config && F.config.frente) || "Funil",
      content_category: diag,
      diagnostico: diag,
      faturamento: a.faturamento || "",
      prontidao: a.prontidao || "",
      resultado: (F.resultados && F.resultados[diag]) || "",
    };
  } catch (e) { return {}; }   // tracking nunca derruba o relatório
}
if ((getState().answers || {})._completedAt) {
  metaPadrao("ViewContent", paramsQualificacao());
}

document.addEventListener("click", (e) => {
  if (e.target.closest && e.target.closest(".cta-wpp")) {
    metaPadrao("Contact", paramsQualificacao());
    abrirWhatsApp();
  }
});

if (!numeroValido()) {
  const aviso = document.createElement("p");
  aviso.className = "aviso";
  aviso.textContent = "Configuração pendente: o WhatsApp comercial não está preenchido em flow.js, então os botões não abrem conversa. Preencha marca.whatsapp antes de mandar tráfego.";
  report.prepend(aviso);
}
