/* ============================================================
   DIAGNÓSTICO — monta o relatório a partir das respostas do quiz,
   personalizado por BALDE (o que mais trava), TIPO DE CONTATO,
   ESTRUTURA e CAMADA (o quão pronta a clínica está para investir).
   As respostas vêm da URL (valores das opções + primeiro nome, para o
   link funcionar em outra aba/navegador) ou, na falta, do sessionStorage.
   Frases de apoio tiradas da própria LP/VSL Saúde da Vitória.
   ============================================================ */
const STORE_KEY = "magna_quiz_saude";
const F = window.FLOW;
const report = document.getElementById("report");

function esc(s) { return String(s == null ? "" : s).replace(/[<>&"]/g, c => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;" }[c])); }
function valido(stepId, v) { const s = F.steps.find(x => x.id === stepId); return !!(s && s.options.some(o => o.value === v)); }

function respostas() {
  const p = new URLSearchParams(location.search);
  const mapa = { c: "contato", e: "estrutura", d: "desafio", t: "ticket", u: "urgencia", f: "faturamento", q: "quer-analise" };
  if (p.get("d")) {
    const a = {};
    Object.entries(mapa).forEach(([k, id]) => { if (valido(id, p.get(k))) a[id] = p.get(k); });
    if (a.desafio) {
      a.nomeResp = (p.get("n") || "").slice(0, 40);
      a._completedAt = "url";
      return a;
    }
  }
  try { return (JSON.parse(sessionStorage.getItem(STORE_KEY)) || {}).answers || {}; } catch (e) { return {}; }
}
const a = respostas();
function opcao(stepId) {
  const step = F.steps.find(s => s.id === stepId);
  return (step && step.options.find(o => o.value === a[stepId])) || null;
}

const ICON = {
  pulso: '<path d="M2.5 12.5h4l2.2-5.5 4 11 2.6-7 1.4 1.5h4.8"/>',
  equipe: '<circle cx="9" cy="8.5" r="3"/><path d="M3.5 19c.6-3 2.8-4.8 5.5-4.8s4.9 1.8 5.5 4.8"/><circle cx="16.5" cy="9.5" r="2.4"/><path d="M15.5 14.4c2.5-.2 4.4 1.3 5 4.1"/>',
  diamante: '<path d="M6.5 3.5h11l4 5.5L12 20.5 2.5 9z"/><path d="M2.5 9h19M9.5 3.5 12 20.5l2.5-17"/>',
  grafico: '<path d="M3.5 20h17"/><path d="M5.5 16l4.5-4.5 3.5 3.5 6-6.5"/><path d="M15 8.5h4.5V13"/>',
  alvo: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r=".9"/>',
  check: '<path d="M6 12.5l4 4 8-9"/>',
  x: '<path d="M7.5 7.5l9 9M16.5 7.5l-9 9"/>',
  chat: '<path d="M20.5 11.6a8.4 8.4 0 0 1-12.4 7.4L3.5 20.5l1.5-4.4a8.4 8.4 0 1 1 15.5-4.5z"/>',
};
function icon(name) {
  return `<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICON[name]}</svg>`;
}

/* ---------- textos por balde (com variações por estrutura) ---------- */
const DIAGNOSTICOS = {
  "Sem Posicionamento": {
    tag: "Posicionamento premium",
    cenario: "Você estudou anos, entrega um resultado excelente e é reconhecida por quem já passou pelo seu consultório. Só que, na internet, essa autoridade ainda não aparece com a mesma força. Quem tem alto poder aquisitivo olha o seu perfil e não entende, em poucos segundos, por que você é a escolha certa.",
    raiz: "Competência você já tem. O que falta é um posicionamento pensado para o paciente premium. Quando a comunicação da clínica fala com todo mundo, ela não convence quem paga alto ticket, e você acaba sendo comparada pelo preço com quem entrega muito menos.",
    caminho: "O próximo movimento é tratar a sua clínica como um negócio, e não apenas como um perfil no Instagram: alinhar mensagem, conteúdo e prova social para que o público de alto padrão te reconheça como referência antes mesmo da primeira consulta.",
    pilar: 0,
  },
  "Marketing Sem Sistema": {
    tag: "Atração sem sistema",
    cenario: "Você já tentou atrair pacientes pela internet com conteúdo, anúncio, agência ou freelancer. Mesmo assim, as pessoas certas, que de fato querem fechar tratamento, não chegam com constância.",
    cenarioPorEstrutura: {
      "agencia-sem-comercial": "Você já tem uma agência ou um profissional cuidando da atração. Mesmo assim, as pessoas certas, que de fato querem fechar tratamento, não chegam com constância.",
    },
    raiz: "O que falta é sistema. Gravar mais vídeos, postar mais stories ou colocar mais dinheiro em tráfego sem um caminho desenhado gera pico de curiosos, e não fluxo de pacientes prontos para investir. E cada campanha nova vira um recomeço.",
    caminho: "O que resolve é um ecossistema de atração desenhado para o seu ticket e para o seu público: posicionamento, captação e comercial conversando entre si, para afastar os curiosos e trazer quem tem condição de pagar pelo seu tratamento.",
    pilar: 0,
  },
  "Refém da Operação": {
    tag: "Clínica que depende só de você",
    cenario: "A clínica cresceu, mas continua girando em torno de você. Você atende, resolve o financeiro, cuida da equipe e ainda tenta dar conta do Instagram nas horas vagas. Sobra pouco tempo para pensar no crescimento, e menos ainda para você.",
    cenarioPorEstrutura: {
      "equipe-sem-digital": "Você já tem equipe na clínica, mas as decisões, a venda e a presença na internet ainda passam por você. A equipe executa, e você continua sendo quem resolve tudo o que importa. Sobra pouco tempo para pensar no crescimento, e menos ainda para você.",
      "agencia-sem-comercial": "Você já tem quem cuide do marketing, mas a venda continua passando por você: é você quem responde, negocia e fecha. A clínica cresce até o limite da sua agenda, e sobra pouco tempo para pensar no crescimento.",
      "estrutura-completa": "Você já tem marketing e comercial rodando, e mesmo assim a clínica continua dependendo de você para funcionar. Sem processos claros e metas definidas, a estrutura existe, mas não anda sozinha, e o seu tempo continua preso na operação.",
    },
    raiz: "Sem processos claros e uma equipe bem direcionada, todo crescimento vira mais carga no seu colo. Para escalar, a clínica precisa depender menos de você para vender.",
    caminho: "O próximo movimento é organizar fluxos, metas e o papel de cada pessoa da equipe na venda, para que a clínica funcione como empresa e você volte a ter tempo para aquilo que estudou anos para fazer.",
    caminhoPorEstrutura: {
      sozinha: "O próximo movimento é definir quem vai assumir cada parte da venda e organizar fluxos e metas simples, para que a clínica funcione como empresa e você volte a ter tempo para aquilo que estudou anos para fazer.",
    },
    pilar: 2,
  },
  "Sem Previsibilidade": {
    tag: "Previsibilidade de faturamento",
    cenario: "O faturamento da clínica vive numa montanha-russa: tem mês que a agenda lota, tem mês que a recepção fica vazia. No começo do mês você ainda não sabe quanto vai entrar, e isso tira o seu sono.",
    raiz: "Isso acontece quando marketing e comercial não se conversam. Sem um processo que ligue a atração ao fechamento, o resultado depende de sorte e de indicação, e não de método.",
    caminho: "O que traz previsibilidade é um ecossistema de vendas integrado: atração qualificada, um caminho comercial desenhado para o paciente de alto padrão e uma equipe que sabe conduzir o contato até o fechamento.",
    pilar: 1,
  },
};

/* Os 3 Pilares de Previsibilidade (VSL Saúde da Vitória). */
const PILARES = [
  { n: "I", titulo: "Inteligência de Atração High Ticket",
    texto: "Posicionamento e comunicação direcionados ao público de alto poder aquisitivo, para a clínica parar de atrair curiosos e passar a atrair quem pode pagar pelo seu tratamento." },
  { n: "II", titulo: "Modelagem do Caminho Comercial",
    texto: "Jornada, pontos de contato e fechamento desenhados para o comportamento de compra do paciente de alto padrão. Quem compra um procedimento de R$10.000 não se comporta como quem compra um produto comum." },
  { n: "III", titulo: "Direcionamento e Processos Internos",
    texto: "Fluxos, metas e treinamento para que a sua equipe saiba conduzir o contato até a venda, sem depender de táticas genéricas nem de você em tudo." },
];

const CTA = {
  A: {
    selo: "Sua clínica está pronta para o próximo nível",
    texto: "Pelas suas respostas, a sua clínica já tem faturamento, ticket e estrutura para dar o próximo passo com o acompanhamento completo da Magna. O caminho agora é uma análise estratégica: olhar os bastidores da sua clínica, identificar onde o dinheiro está vazando e desenhar o mapa para escalar com previsibilidade.",
    botao: "Agendar minha análise estratégica",
    msg: "Oi! Sou {nome}, acabei de fazer o diagnóstico da minha clínica e quero agendar minha análise estratégica.",
  },
  B: {
    selo: "Você está no caminho certo",
    texto: "Pelas suas respostas, a sua clínica já saiu do início e está pronta para crescer com mais direção. Vale uma conversa com a equipe para entender qual caminho faz mais sentido para o seu momento agora.",
    botao: "Quero entender meu próximo passo",
    msg: "Oi! Sou {nome}, acabei de fazer o diagnóstico da minha clínica e quero entender o meu próximo passo.",
  },
  /* quer investir e pediu a análise, mas o faturamento ainda está abaixo do piso */
  base: {
    selo: "Um passo de cada vez",
    texto: "Pelas suas respostas, a sua clínica ainda está construindo a base de faturamento para um acompanhamento completo. Este diagnóstico mostra por onde começar agora, e a equipe pode te ajudar a enxergar o próximo passo.",
    botao: "Quero falar com a equipe",
    msg: "Oi! Sou {nome}, fiz o diagnóstico da minha clínica e quero entender por onde começar.",
  },
  desqualificado: {
    selo: "Um passo de cada vez",
    texto: "Pelas suas respostas, talvez agora ainda não seja o momento de investir numa solução completa, e tudo bem. Guarde este diagnóstico: ele mostra por onde começar. Quando fizer sentido para você, a equipe está aqui para conversar.",
    botao: "Tenho dúvidas, quero falar com a equipe",
    msg: "Oi! Sou {nome}, fiz o diagnóstico da minha clínica e fiquei com algumas dúvidas.",
  },
};

const temRespostas = !!a._completedAt;
const nomeRaw = F.primeiroNome(a.nomeResp);
const balde = temRespostas ? F.getBalde(a) : "";
const camada = temRespostas ? F.getCamada(a) : "desqualificado";
const querInvestir = a.urgencia === "viabilizo" && a["quer-analise"] === "sim";
const cta = camada === "desqualificado" && querInvestir ? CTA.base : (CTA[camada] || CTA.desqualificado);
const waUrl = `https://wa.me/${F.marca.whatsapp}?text=${encodeURIComponent((cta.msg || F.marca.whatsappMsg).replace("{nome}", nomeRaw || "eu"))}`;

if (!temRespostas) {
  report.innerHTML = `
    <div class="report-head">
      <p class="eyebrow eyebrow-center">Diagnóstico</p>
      <h1>Ainda não temos as suas respostas</h1>
      <p class="lead">Parece que você chegou aqui sem responder o diagnóstico. São 7 perguntas, cerca de 2 minutos.</p>
      <div class="actions" style="justify-content:center"><a class="btn btn-primary" href="index.html">Fazer o diagnóstico agora</a></div>
    </div>`;
  document.querySelector(".toolbar")?.remove();
} else {
  const nome = esc(nomeRaw);
  const d = DIAGNOSTICOS[balde] || DIAGNOSTICOS["Sem Previsibilidade"];
  const cenario = (d.cenarioPorEstrutura && d.cenarioPorEstrutura[a.estrutura]) || d.cenario;
  const caminho = (d.caminhoPorEstrutura && d.caminhoPorEstrutura[a.estrutura]) || d.caminho;
  const desafio = opcao("desafio");
  const contato = opcao("contato");
  const estrutura = opcao("estrutura");
  const ticket = opcao("ticket");
  const faturamento = opcao("faturamento");

  /* "Atração sem sistema" + chegam curiosos = o gargalo é conversão → Pilar II. */
  const pilarFoco = (balde === "Marketing Sem Sistema" && a.contato === "curiosos") ? 1 : d.pilar;

  const tile = (k, ic, v) => v ? `<div class="rx"><span class="rx-k">${icon(ic)}<span>${k}</span></span><span class="rx-v">${esc(v)}</span></div>` : "";
  const raiox = `
    <div class="raiox">
      <div class="rx hi"><span class="rx-flag">Prioridade</span><span class="rx-k">${icon("alvo")}<span>Maior desafio</span></span><span class="rx-v">${esc(desafio ? desafio.curto : "")}</span></div>
      ${tile("Contatos pela internet", "pulso", contato && contato.curto)}
      ${tile("Estrutura", "equipe", estrutura && estrutura.curto)}
      ${tile("Ticket médio", "diamante", ticket && ticket.label)}
      ${tile("Faturamento mensal", "grafico", faturamento && faturamento.label)}
    </div>`;

  const oscilacao = balde === "Sem Previsibilidade" || a.contato === "inconstante";
  const secoes = [
    { titulo: "Raio-X das suas respostas", html: raiox },
    { titulo: "O que suas respostas revelam", html: `
      <p>${nome ? `${nome}, você` : "Você"} deixou claro qual é o seu maior desafio hoje: ${desafio ? desafio.report : "os gargalos que travam o crescimento da clínica"}. ${contato ? contato.report : ""}</p>
      <p>${cenario}</p>` },
    { titulo: "Por que isso ainda não se resolveu sozinho", html: `
      <p>${d.raiz}</p>
      <blockquote class="quote">O erro não é o seu marketing, e também não é só o seu comercial. O erro é que essas áreas não se conversam.<cite>Vitória Daniela</cite></blockquote>` },
    { titulo: "Dois caminhos", html: `
      <div class="compare">
        <div class="col bad">
          <h4>Ações isoladas</h4>
          <ul>
            <li>${icon("x")}Mais um post, mais um anúncio</li>
            <li>${icon("x")}Curiosos perguntando o preço</li>
            <li>${icon("x")}Agenda que depende de indicação</li>
            <li>${icon("x")}Faturamento em montanha-russa</li>
          </ul>
        </div>
        <div class="col good">
          <h4>Ecossistema Magna</h4>
          <ul>
            <li>${icon("check")}Atração, comercial e equipe integrados</li>
            <li>${icon("check")}Pacientes com condição de investir</li>
            <li>${icon("check")}Processo no lugar da sorte</li>
            <li>${icon("check")}Previsibilidade mês a mês</li>
          </ul>
        </div>
      </div>` },
    { titulo: "O que precisa acontecer agora", html: `
      <p>${caminho}</p>
      <p>Na Magna, isso é feito com um método baseado em 3 Pilares de Previsibilidade. No seu caso, a prioridade é esta:</p>
      <div class="pilares">
        ${PILARES.map((p, idx) => `
          <div class="pilar${idx === pilarFoco ? " on" : ""}">
            ${idx === pilarFoco ? `<span class="prio">${icon("alvo")}Prioridade no seu caso</span>` : ""}
            <div class="pilar-h"><span class="pn">${p.n}</span><h4>${p.titulo}</h4></div>
            <p>${p.texto}</p>
          </div>`).join("")}
      </div>` },
  ];
  if (camada !== "desqualificado") {
    secoes.push({ titulo: "O custo de esperar", html: `
      <div class="custo"><p>${oscilacao ? "Cada mês nessa oscilação" : "Cada mês sem resolver isso"} não é neutro: é paciente de alto ticket fechando com a concorrente que comunicou melhor, é agenda cheia de avaliação que não vira fechamento. Esperar mais um mês não é ficar parada. É continuar pagando o preço de não ter processo.</p></div>` });
  }
  secoes.push({ titulo: "O que diz uma cliente da Magna", html: `
    <div class="depo-img"><img src="assets/depoimento-sessao.jpg" width="607" height="879" alt="Mensagens de cliente no WhatsApp: depois da primeira sessão clareou o que a travava e fechou dois contratos de R$5 mil só ajustando o posicionamento; agradece por mostrar um caminho sem se expor ao ridículo nem queimar dinheiro" loading="lazy" decoding="async"></div>` });

  const hoje = new Date().toLocaleDateString("pt-BR");
  report.innerHTML = `
    <div class="report-head">
      <span class="selo">${icon("diamante")}Diagnóstico personalizado da sua clínica</span>
      <h1>${nome ? `${nome}, seu` : "Seu"} diagnóstico está pronto</h1>
      <p class="hint">Elaborado com base nas suas respostas <span class="nowrap">· ${hoje}</span></p>
      <div class="balde"><span class="balde-k">Ponto de maior atenção</span><span class="balde-tag"><span class="dot" aria-hidden="true"></span>${d.tag}</span></div>
    </div>
    ${secoes.map((s, idx) => `
      <section class="sec reveal">
        <div class="sec-title"><span class="num">${String(idx + 1).padStart(2, "0")}</span><h3>${s.titulo}</h3></div>
        ${s.html}
      </section>`).join("")}
    <div class="cta-box reveal">
      <img class="expert-photo" src="assets/vitoria-daniela-256.jpg" width="84" height="84" decoding="async" alt="Vitória Daniela, fundadora do Grupo Magna">
      <p class="eyebrow">${cta.selo}</p>
      <h2>Seu próximo passo</h2>
      <p>${cta.texto}</p>
      <a class="btn btn-gold" id="whatsapp-2" href="${waUrl}" target="_blank" rel="noopener">${icon("chat")}${cta.botao}</a>
      <p class="fine">Você fala direto com a equipe da Vitória pelo WhatsApp.</p>
    </div>`;

  const reveals = [...report.querySelectorAll(".reveal")];
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -8% 0px" });
    reveals.forEach((r) => io.observe(r));
  } else {
    reveals.forEach((r) => r.classList.add("in"));
  }
  window.addEventListener("beforeprint", () => reveals.forEach((r) => r.classList.add("in")));
  trackEvent("diagnostico_view", { balde, camada });
}

/* ---------- WhatsApp + PDF ---------- */
const waTopo = document.getElementById("whatsapp");
if (waTopo) waTopo.href = waUrl;
waTopo?.addEventListener("click", () => trackEvent("whatsapp_click", { balde, camada, origem: "topo" }));
document.getElementById("whatsapp-2")?.addEventListener("click", () => trackEvent("whatsapp_click", { balde, camada, origem: "cta" }));

/* No navegador interno do Instagram/Facebook o "imprimir" não funciona. */
const pdfBtn = document.getElementById("pdf");
if (pdfBtn && /FBAN|FBAV|Instagram/i.test(navigator.userAgent)) {
  const dica = document.createElement("p");
  dica.className = "hint inapp";
  dica.textContent = "Para salvar em PDF, abra esta página no navegador (menu ··· › Abrir no navegador).";
  pdfBtn.replaceWith(dica);
} else {
  pdfBtn?.addEventListener("click", () => { trackEvent("pdf_click", { balde, camada }); window.print(); });
}
