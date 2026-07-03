/* ============================================================
   DIAGNÓSTICO. Monta o relatório personalizado a partir das
   respostas do quiz (sessionStorage) e habilita os CTAs de WhatsApp.
   Qualificação por intenção adapta o CTA; CTAs distribuídos (.cta-wpp).
   Padrão de escrita: nunca usar travessões (traço longo).
   ============================================================ */
const STORE_KEY = "romulo_funil_mecha";
const F = window.FLOW;
const report = document.getElementById("report");

function getState() { try { return JSON.parse(sessionStorage.getItem(STORE_KEY)) || {}; } catch (e) { return {}; } }
function frase(stepId) {
  const step = F.steps.find(s => s.id === stepId);
  const val = (getState().answers || {})[stepId];
  const opt = step && step.options.find(o => o.value === val);
  return (opt && opt.report) || "";
}
function valor(stepId) { return (getState().answers || {})[stepId]; }
function esc(s) { return String(s == null ? "" : s).replace(/[<>&]/g, c => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c])); }

const a = getState().answers || {};

/* foco por gargalo (P3) para a etapa "o que precisa acontecer" */
const FOCO_POR_GARGALO = {
  tonalidade: "calibrar a leitura do fio e a construção de base antes da aplicação, para a tonalidade sair exatamente como a cliente pediu",
  aplicacao: "revisar a técnica de divisão, folha e timing por tipo de cabelo, até a aplicação ficar consistente atendimento após atendimento",
  tipos: "montar um diagnóstico capilar rápido antes de cada procedimento, para adaptar a técnica a cada tipo de cabelo com segurança",
  ticket: "documentar a sua consistência técnica em fichas, para você se posicionar como especialista e sustentar um ticket maior",
};

if (!a._completedAt && !a.travamento) {
  report.innerHTML = `
    <p class="eyebrow">Diagnóstico</p>
    <h2>Ainda não temos suas respostas</h2>
    <p class="lead">Parece que você chegou aqui sem fazer o quiz. Leva ~3 minutos.</p>
    <div class="actions"><a class="btn btn-primary btn-block" href="index.html">Fazer o quiz agora</a></div>`;
} else {
  const nome = esc((a.nomeResp || "").split(" ")[0]) || "tudo bem";
  const travamento = frase("travamento") || "o que trava a sua técnica de mecha";
  const impacto = frase("impacto") || "o resultado ficar abaixo do que você gostaria";
  const custo = frase("custo") || "continuar no mesmo lugar";
  const tentativa = frase("tentativas") || "buscar uma forma de evoluir";
  const objetivo = frase("objetivo") || "dominar a técnica com segurança";
  const foco = FOCO_POR_GARGALO[valor("travamento")] || "trabalhar o seu maior gargalo técnico com método e correção";

  const intencaoVal = valor("intencao");
  const nutrir = intencaoVal === "esperar" || intencaoVal === "nao";

  // CTA adaptado ao nível de qualificação
  let ctaLabel, ctaExtra, fecho;
  if (nutrir) {
    ctaLabel = "Quero entender melhor como funciona";
    ctaExtra = '<p class="hint">Sem compromisso. O Rômulo te explica o método e tira suas dúvidas no seu tempo.</p>';
    fecho = '<p class="clube">Quando fizer sentido pra você, o primeiro passo é a <strong>sessão estratégica gratuita</strong>: a gente olha o seu caso juntos, sem compromisso de seguir.</p>';
  } else {
    ctaLabel = "Quero agendar minha sessão gratuita";
    ctaExtra = '<p class="hint">Uma conversa de 30 minutos, individual e sem compromisso de compra. Você já sai com clareza do seu gargalo, decida ou não seguir.</p>';
    fecho = '<p class="clube">A partir da sessão, conduzimos a <strong>Mentoria Cabelo de Segunda</strong>: correção de vídeo, fichas técnicas e acompanhamento pensado pro seu caso.</p>';
  }
  const ctaInline = `<div class="cta-inline"><button class="btn btn-primary cta-wpp">${ctaLabel}</button></div>`;

  report.innerHTML = `
    <div class="report-head">
      <span class="selo">Diagnóstico personalizado</span>
      <h1>O caminho para você dominar a sua mecha</h1>
      <p class="hint">Elaborado com base nas suas respostas · ${new Date().toLocaleDateString("pt-BR")}</p>
    </div>

    <div class="etapa">
      <h3>Antes de tudo</h3>
      <p>Oi, ${nome}! Aqui é o Rômulo. 💛 Li com atenção tudo o que você respondeu.
      E quero começar com uma coisa que talvez ninguém tenha te dito:
      <strong>o que te trava na mecha não é falta de talento, é falta de método corrigido.</strong></p>
    </div>

    <div class="etapa">
      <h3>O seu cenário hoje</h3>
      <p>Pelo que você me contou, o seu maior travamento é <strong>${travamento}</strong>.
      E isso vem custando caro: ${impacto}. Você já chegou a ${tentativa}, e mesmo assim
      a insegurança continua. Esse padrão se repete em quase todo profissional que chega
      até mim. E ele tem uma explicação.</p>
    </div>

    <div class="etapa">
      <h3>Por que não resolveu até agora</h3>
      <p>Curso gravado te mostra o que fazer. Não corrige o que você está fazendo de errado.
      Você pode assistir 40 horas de conteúdo e continuar errando na folha, no timing ou na
      dosagem, porque o erro é seu, é específico, e ninguém está olhando pra ele. Domínio
      técnico vem de prática corrigida: alguém que vê o que você faz, identifica o erro e te
      diz exatamente o que mudar.</p>
    </div>

    <div class="etapa">
      <h3>Dois caminhos lado a lado</h3>
      <div class="compare">
        <div class="col bad">
          <h4>Sem método</h4>
          <ul><li>Improviso a cada atendimento</li><li>Erro que se repete sem correção</li><li>Resultado que depende da sorte</li><li>Insegurança para cobrar mais</li></ul>
        </div>
        <div class="col good">
          <h4>Com o Método Cabelo de Segunda</h4>
          <ul><li>Correção de vídeo do seu atendimento real</li><li>Fichas técnicas por tipo de mecha</li><li>Resultado que você replica</li><li>Segurança para subir o ticket</li></ul>
        </div>
      </div>
    </div>

    ${ctaInline}

    <div class="etapa">
      <h3>Como a mentoria trabalha</h3>
      <p>A Mentoria Cabelo de Segunda é um acompanhamento individual de 3 meses, em quatro frentes:</p>
      <ol class="metodo">
        <li><strong>Sessão semanal individual:</strong> revisão do que você fez, dúvidas respondidas em tempo real, ajuste de rota imediato.</li>
        <li><strong>Correção de vídeo:</strong> você grava o atendimento no salão e recebe feedback específico do que errou e como ajustar.</li>
        <li><strong>Banco de fichas técnicas:</strong> os parâmetros certos por tipo de mecha, para você parar de improvisar.</li>
        <li><strong>Suporte por WhatsApp:</strong> a dúvida que surge antes de um atendimento difícil, resolvida na hora.</li>
      </ol>
      <p class="hint">É um processo com começo, meio e fim. A maioria nota diferença nas primeiras semanas.</p>
    </div>

    <div class="etapa">
      <h3>O custo de continuar como está</h3>
      <p>Você disse que, sem dominar a mecha nos próximos meses, o risco é <strong>${custo}</strong>.
      O mercado de beleza está se especializando: quem não tem método vai perdendo espaço.
      E atender sem método é acumular erro sem corrigir. Você não melhora fazendo mais do mesmo.</p>
    </div>

    <div class="etapa">
      <h3>O que precisa acontecer agora</h3>
      <p>Baseado no que você respondeu, o primeiro foco da sua evolução seria
      <strong>${foco}</strong>. A partir daí, cada atendimento fica melhor que o anterior.
      O que você quer, <strong>${objetivo}</strong>, é totalmente possível. Eu acompanho isso
      de perto, no seu trabalho, com o seu cabelo.</p>
    </div>

    ${ctaInline}

    <div class="etapa">
      <h3>Quem já viveu isso</h3>
      <div class="depo">[DEPOIMENTOS]: inserir prints/vídeos de alunos em ./depoimentos/ (antes e depois, aumento de ticket, saída da insegurança). Imagens inteiras.</div>
      <p class="hint">O que essas histórias têm em comum: não mudou o talento. Mudou o método.</p>
    </div>

    <div class="cta-box">
      <h2 style="margin-top:0">O próximo passo, ${nome}</h2>
      <p>Dar o primeiro passo é simples, e no seu tempo.</p>
      ${ctaExtra}
      <div class="actions" style="justify-content:center">
        <button class="btn btn-primary cta-wpp">${ctaLabel}</button>
      </div>
      ${fecho}
    </div>`;
}

/* ---------- WhatsApp ---------- */
function abrirWhatsApp() {
  const nome = (a.nomeResp || "").split(" ")[0] || "";
  const msg = (F.marca.whatsappMsg || "").replace("{nome}", nome);
  const url = `https://wa.me/${F.marca.whatsapp}?text=${encodeURIComponent(msg)}`;
  window.open(url, "_blank", "noopener");
}
document.addEventListener("click", (e) => {
  if (e.target.closest && e.target.closest(".cta-wpp")) abrirWhatsApp();
});
