/* ============================================================
   DIAGNÓSTICO — monta o relatório a partir das respostas do quiz
   (sessionStorage) e habilita "Baixar PDF" + WhatsApp.
   ============================================================ */
const STORE_KEY = "romulo_funil_mecha";
const F = window.FLOW;
const report = document.getElementById("report");

function getState() { try { return JSON.parse(sessionStorage.getItem(STORE_KEY)) || {}; } catch (e) { return {}; } }

/* pega a frase de relatório (campo "report") da opção escolhida num passo */
function frase(stepId) {
  const step = F.steps.find(s => s.id === stepId);
  const val = (getState().answers || {})[stepId];
  const opt = step && step.options.find(o => o.value === val);
  return (opt && opt.report) || "";
}
function valor(stepId) { return (getState().answers || {})[stepId]; }
function esc(s) { return String(s == null ? "" : s).replace(/[<>&]/g, c => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c])); }

const a = getState().answers || {};

/* mapa de foco por gargalo (P3) para a etapa "o que precisa acontecer" */
const FOCO_POR_GARGALO = {
  tonalidade: "calibrar a leitura do fio e a construção de base antes da aplicação, para a tonalidade sair exatamente como a cliente pediu",
  aplicacao: "revisar a técnica de divisão, folha e timing por tipo de cabelo, até a aplicação ficar consistente atendimento após atendimento",
  tipos: "montar um diagnóstico capilar rápido antes de cada procedimento, para adaptar a técnica a cada tipo de cabelo com segurança",
  ticket: "documentar a sua consistência técnica em fichas, para você se posicionar como especialista e sustentar um ticket maior",
};

/* sem respostas? (abriu a página direto) */
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

  report.innerHTML = `
    <div class="report-head">
      <span class="selo">Diagnóstico personalizado</span>
      <h1>O caminho para você dominar a sua mecha</h1>
      <p class="hint">Elaborado com base nas suas respostas · ${new Date().toLocaleDateString("pt-BR")}</p>
    </div>

    <div class="etapa">
      <h3>Antes de tudo</h3>
      <p>Oi, ${nome}! Aqui é o Rômulo. Li com atenção tudo o que você respondeu.
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

    <div class="etapa">
      <h3>O custo de continuar como está</h3>
      <p>Você disse que, sem dominar a mecha nos próximos meses, o risco é <strong>${custo}</strong>.
      O mercado de beleza está se especializando: quem não tem método vai perdendo espaço.
      E atender sem método é acumular erro sem corrigir. Você não melhora fazendo mais do mesmo.</p>
    </div>

    <div class="etapa">
      <h3>O que precisa acontecer com a sua técnica</h3>
      <p>Baseado no que você respondeu, o primeiro foco da sua evolução seria
      <strong>${foco}</strong>. A partir daí, cada atendimento fica melhor que o anterior.
      O que você quer, <strong>${objetivo}</strong>, é totalmente possível. Eu acompanho isso
      de perto, no seu trabalho, com o seu cabelo.</p>
    </div>

    <div class="etapa">
      <h3>Quem já viveu isso</h3>
      <div class="depo">[DEPOIMENTO 1]: inserir print/vídeo de aluno(a) que saiu da insegurança para a referência em mecha.</div>
      <div class="depo">[DEPOIMENTO 2]: inserir caso de aumento de ticket por atendimento depois de dominar a técnica.</div>
      <p class="hint">O que essas histórias têm em comum: não mudou o talento. Mudou o método.</p>
    </div>

    <div class="cta-box">
      <h2 style="margin-top:0">O próximo passo é simples, ${nome}</h2>
      <p>Uma sessão estratégica gratuita de 30 minutos comigo. Você apresenta o seu cenário,
      a gente identifica com precisão o seu gargalo e você entende como o método resolve.
      Sem compromisso de compra.</p>
      <div class="actions" style="justify-content:center">
        <button class="btn btn-primary" id="whatsapp-2">Quero agendar minha sessão gratuita</button>
      </div>
      <p class="clube">Na sessão eu te mostro, na prática, como a Mentoria Cabelo de Segunda
      corrige o que hoje te trava.</p>
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
