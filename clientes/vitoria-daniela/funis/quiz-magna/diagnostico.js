/* ============================================================
   DIAGNÓSTICO — monta o relatório a partir das respostas do quiz
   (sessionStorage), personalizado por BALDE (o que trava) e por
   CAMADA (o quão pronta a pessoa está pra investir agora).
   ============================================================ */
const STORE_KEY = "magna_quiz_diagnostico";
const F = window.FLOW;
const report = document.getElementById("report");

function getState() { try { return JSON.parse(sessionStorage.getItem(STORE_KEY)) || {}; } catch (e) { return {}; } }
function frase(stepId) {
  const step = F.steps.find(s => s.id === stepId);
  const val = (getState().answers || {})[stepId];
  const opt = step && step.options.find(o => o.value === val);
  return (opt && opt.report) || "";
}
function esc(s) { return String(s == null ? "" : s).replace(/[<>&]/g, c => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c])); }

const a = getState().answers || {};

/* ---------- textos por balde ---------- */
const DIAGNOSTICOS = {
  "Sem Posicionamento": {
    titulo: "O Balde do Posicionamento",
    cenario: "Você tem competência, entrega resultado e já construiu autoridade no offline. Só que essa autoridade não está chegando ao público certo no digital. Sua comunicação ainda não deixa claro, num primeiro olhar, por que você é a referência do seu mercado.",
    raiz: "Isso não é falta de talento. É falta de sistema de posicionamento: quando não existe uma linha clara de comunicação, o público de maior poder aquisitivo passa direto pelo seu perfil, porque não te reconhece como a opção premium que você já é na prática.",
    caminho: "O que precisa acontecer agora é desenhar o seu posicionamento como um negócio de verdade, não como um perfil solto no Instagram. Alinhar mensagem, conteúdo e prova social pra que quem paga alto ticket te reconheça em segundos.",
  },
  "Marketing Sem Sistema": {
    titulo: "O Balde do Marketing Sem Sistema",
    cenario: "Você já tentou de tudo: conteúdo, tráfego pago, talvez até uma agência. Só que continua sem conseguir atrair pessoas qualificadas, prontas para investir no seu serviço de alto ticket.",
    raiz: "O problema não é uma peça isolada, é a ausência de um sistema. Ações soltas geram picos de curiosos, não um fluxo constante de gente pronta para comprar. Sem um processo desenhado, cada campanha nova é começar do zero de novo.",
    caminho: "O que resolve isso é montar um ecossistema de captação pensado pro seu ticket e pro seu público, não mais uma tática solta testada às cegas.",
  },
  "Refém da Operação": {
    titulo: "O Balde da Operação Refém de Você",
    cenario: "Seu negócio depende de você em praticamente tudo, do atendimento ao marketing. Isso rouba o tempo que você deveria estar usando para crescer, não para apagar incêndio.",
    raiz: "Sem uma estrutura clara de processos e responsabilidades, todo crescimento vira mais carga pra você carregar sozinha. Escala nunca vem de fazer mais, vem de depender menos.",
    caminho: "O que muda isso é ter uma estratégia e uma equipe rodando em sincronia, com processos definidos, pra você parar de ser a única engrenagem do sistema.",
  },
  "Sem Previsibilidade": {
    titulo: "O Balde da Previsibilidade",
    cenario: "Seu faturamento vive de mês bom, mês ruim. Você não sabe, no início do mês, se vai fechar bem ou vai ter que correr atrás até o último dia.",
    raiz: "Isso acontece quando marketing, captação e comercial não conversam entre si. Sem esse ecossistema integrado, os resultados dependem de sorte e esforço isolado, não de processo.",
    caminho: "O que traz previsibilidade de verdade é ter as três frentes (presença digital, captação de clientes e organização nas vendas) desenhadas juntas, como engrenagens de um único sistema.",
  },
};

const CTA = {
  A: {
    selo: "Seu perfil se encaixa na Implementação Magna",
    texto: "Pelas suas respostas, você já tem estrutura e ticket pra dar o próximo passo com o acompanhamento completo da Magna. O próximo passo é simples: uma conversa estratégica pra entender seu momento a fundo e desenhar o plano pro seu negócio.",
    botao: "Quero minha análise estratégica",
  },
  B: {
    selo: "Você está no caminho certo",
    texto: "Pelas suas respostas, você já saiu do início e está pronta pra dar o próximo passo com mais direção. Vale uma conversa pra entender qual caminho faz mais sentido pro seu momento agora.",
    botao: "Quero entender meu próximo passo",
  },
  desqualificado: {
    selo: "Um passo de cada vez",
    texto: "Pelas suas respostas, talvez o momento ainda não seja o de investir numa solução completa, e tudo bem. Guarde esse diagnóstico e, quando fizer sentido pro seu momento, fale com a equipe.",
    botao: "Tenho dúvidas, quero falar com a equipe",
  },
};

if (!a._completedAt) {
  report.innerHTML = `
    <p class="eyebrow">Diagnóstico</p>
    <h2>Ainda não temos suas respostas</h2>
    <p class="lead">Parece que você chegou aqui sem fazer o teste. Leva ~2 minutos.</p>
    <div class="actions"><a class="btn btn-primary btn-block" href="index.html">Fazer o diagnóstico agora</a></div>`;
} else {
  const nome = esc((a.nomeResp || "").split(" ")[0]) || "";
  const balde = a._balde || F.getBalde(a);
  const camada = a._camada || F.getCamada(a);
  const d = DIAGNOSTICOS[balde] || DIAGNOSTICOS["Sem Previsibilidade"];
  const cta = CTA[camada] || CTA.desqualificado;
  const desafioFrase = frase("desafio") || "os gargalos que travam o seu crescimento";

  report.innerHTML = `
    <div class="report-head">
      <span class="selo">Diagnóstico personalizado</span>
      <h1>${nome ? nome + ", seu" : "Seu"} diagnóstico está pronto</h1>
      <span class="balde-tag">${d.titulo}</span>
    </div>

    <div class="etapa">
      <h3>O que suas respostas revelam</h3>
      <p>${nome ? "Oi, " + nome + ". " : ""}Você foi clara sobre o que mais te trava hoje: ${desafioFrase}. ${d.cenario}</p>
    </div>

    <div class="etapa">
      <h3>Por que isso ainda não resolveu sozinho</h3>
      <p>${d.raiz}</p>
    </div>

    <div class="etapa">
      <h3>Dois caminhos lado a lado</h3>
      <div class="compare">
        <div class="col bad">
          <h4>Ação isolada</h4>
          <ul><li>Testa uma tática por vez</li><li>Depende de sorte e esforço</li><li>Recomeça do zero a cada campanha</li><li>Resultado imprevisível</li></ul>
        </div>
        <div class="col good">
          <h4>Ecossistema Magna</h4>
          <ul><li>Posicionamento, captação e comercial juntos</li><li>Processo, não improviso</li><li>Cada ação soma na anterior</li><li>Previsibilidade real</li></ul>
        </div>
      </div>
    </div>

    <div class="etapa">
      <h3>O que precisa acontecer agora</h3>
      <p>${d.caminho} Não é sobre mais uma tática isolada, é sobre um olhar de sistema, com posicionamento, captação e organização comercial trabalhando juntos.</p>
    </div>

    <div class="etapa">
      <h3>Quem já viveu isso</h3>
      <div class="depo-img"><img src="assets/depoimento-sessao.jpg" alt="Depoimento de cliente: clareou o posicionamento e fechou dois contratos de R$5 mil após a primeira sessão" loading="lazy"></div>
      <div class="depo-img"><img src="assets/depoimento-marco.jpg" alt="Depoimento de cliente: recorde de vendas depois de estruturar o processo" loading="lazy"></div>
    </div>

    <div class="cta-box">
      <img class="expert-photo" src="assets/vitoria-daniela.jpg" alt="Vitória Daniela">
      <span class="eyebrow">${cta.selo}</span>
      <h2>Seu próximo passo</h2>
      <p>${cta.texto}</p>
      <div class="actions" style="justify-content:center">
        <button class="btn btn-primary" id="whatsapp-2">${cta.botao}</button>
      </div>
    </div>`;
}

/* ---------- WhatsApp + PDF ---------- */
function abrirWhatsApp() {
  const nome = (a.nomeResp || "").split(" ")[0] || "";
  const msg = (F.marca.whatsappMsg || "").replace("{nome}", nome);
  const url = `https://wa.me/${F.marca.whatsapp}?text=${encodeURIComponent(msg)}`;
  window.open(url, "_blank", "noopener");
}
document.getElementById("whatsapp")?.addEventListener("click", abrirWhatsApp);
document.getElementById("pdf")?.addEventListener("click", () => window.print());
document.addEventListener("click", (e) => { if (e.target && e.target.id === "whatsapp-2") abrirWhatsApp(); });
