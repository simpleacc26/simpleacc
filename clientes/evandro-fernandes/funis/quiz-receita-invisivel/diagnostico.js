/* ============================================================
   DIAGNÓSTICO · monta o relatório a partir das respostas do quiz
   (sessionStorage). CTAs distribuídos, prova em ordem narrativa.
   ============================================================ */
const STORE_KEY = "evandro_receita_invisivel";
const F = window.FLOW;
const report = document.getElementById("report");

function getState() { try { return JSON.parse(sessionStorage.getItem(STORE_KEY)) || {}; } catch (e) { return {}; } }

/* frase de relatório (campo "report") da opção escolhida num passo */
function frase(stepId) {
  const step = F.steps.find(s => s.id === stepId);
  const val = (getState().answers || {})[stepId];
  const opt = step && step.options.find(o => o.value === val);
  return (opt && opt.report) || "";
}
/* rótulo curto da opção escolhida (o que o lead leu na tela) */
function rotulo(stepId) {
  const step = F.steps.find(s => s.id === stepId);
  const val = (getState().answers || {})[stepId];
  const opt = step && step.options.find(o => o.value === val);
  return (opt && opt.label) || "";
}
function valor(stepId) { return (getState().answers || {})[stepId]; }
function esc(s) { return String(s == null ? "" : s).replace(/[<>&]/g, c => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c])); }

const a = getState().answers || {};
const nutrir = ["ate-100", "100-300"].includes(valor("qualificacao"));

/* Citação final, amarrada ao objetivo que o lead declarou.
   PENDENTE: validar as falas com o Evandro antes de subir tráfego. */
const CITACOES = {
  cac:             "Quando você devolve o comportamento real para a mídia, o lead não fica mais barato por sorte. Ele fica mais barato porque a plataforma finalmente sabe quem procurar.",
  conversao:       "O vendedor não precisa de mais lead. Precisa saber o que aconteceu com o lead antes de ele chegar na conversa.",
  "churn-ltv":     "Cliente não cancela do nada. Ele avisa, só que avisa num lugar que ninguém está olhando.",
  previsibilidade: "Enquanto marketing, comercial e CS forem três ilhas, a decisão vai continuar sendo palpite bem embalado.",
};
const CITACAO_PADRAO = "O dinheiro que falta não está no anúncio que você ainda não comprou. Está na receita que já entrou e vazou.";

/* botão de CTA reutilizado ao longo do relatório */
function ctaInline(texto, sub) {
  return `
    <div class="cta-inline no-print">
      <button class="btn btn-primary btn-block js-wa">${texto}</button>
      ${sub ? `<p class="sub">${sub}</p>` : ""}
    </div>`;
}

/* sem respostas? (abriu a página direto) */
if (!a._completedAt && !a.problema) {
  report.innerHTML = `
    <h2>Ainda não temos suas respostas</h2>
    <p class="lead">Parece que você chegou aqui sem fazer o diagnóstico. Leva 2 minutos.</p>
    <div class="actions"><a class="btn btn-primary btn-block" href="index.html">Fazer o diagnóstico agora</a></div>`;
} else {
  const nome = esc((a.nomeResp || "").split(" ")[0]) || "tudo bem";
  const situacao = frase("situacao") || "os dados espalhados entre as áreas";
  const problema = frase("problema") || "a receita que escapa no meio do caminho";
  const implicacao = frase("implicacao") || "seguir investindo mais para o mesmo resultado";
  const tentativa = frase("necessidade") || "buscar uma solução";
  const objetivo = frase("objetivo") || "crescer com previsibilidade";
  const citacao = CITACOES[valor("objetivo")] || CITACAO_PADRAO;

  report.innerHTML = `
    <div class="report-head">
      <span class="selo">Diagnóstico de Receita Invisível</span>
      <h1>Onde a receita da sua empresa está escapando</h1>
      <p class="hint">Elaborado com base nas suas respostas · ${new Date().toLocaleDateString("pt-BR")}</p>
    </div>

    <div class="etapa">
      <h3>Antes de tudo</h3>
      <p>Oi, ${nome}. Li com atenção o que você respondeu, e quero começar por uma boa
      notícia: <strong>o dinheiro que falta na sua empresa não sumiu. Ele vaza, e o que
      vaza dá para recuperar.</strong></p>
    </div>

    <div class="etapa">
      <h3>O seu cenário hoje</h3>
      <p>Pelo que você contou, hoje a situação é <strong>${situacao}</strong>, e o que mais
      trava o seu resultado é <strong>${problema}</strong>. Você já chegou a ${tentativa}, e
      mesmo assim a receita continua escapando. Se nada mudar, o caminho provável é
      ${implicacao}.</p>
      <p>Esse padrão se repete em quase toda empresa digital que cresceu rápido. E ele tem
      uma explicação.</p>
    </div>

    <div class="etapa">
      <h3>Por que não resolveu até agora</h3>
      <p>Existe uma diferença entre <em>gerar mais lead</em> e <em>gerir a evasão nos 3
      funis</em>. A maioria trata Marketing, Comercial e CS como ilhas separadas, cada um
      com o próprio número. Só que o comportamento do lead não respeita essa divisão: ele
      clica, conversa, compra e reclama, e cada pedaço fica preso numa ilha. Ninguém vê o
      todo, então ninguém age a tempo.</p>
      <p>O problema nunca foi o seu tráfego. Foi a <strong>Receita Invisível</strong>: a
      receita que já entrou e escapa entre os funis.</p>
    </div>

    ${ctaInline(
      nutrir ? "Quero organizar meus dados" : "Quero saber quanto estou perdendo",
      "Conversa direta com o time do Evandro, sem compromisso."
    )}

    <div class="etapa">
      <h3>Dois caminhos lado a lado</h3>
      <div class="compare">
        <div class="col bad">
          <h4>Sem gestão da evasão</h4>
          <ul><li>Dados em ilhas</li><li>Mais verba no tráfego</li><li>Lead que some sem rastro</li><li>Receita escapando todo mês</li></ul>
        </div>
        <div class="col good">
          <h4>Com o método HDM</h4>
          <ul><li>Os 3 funis como um organismo</li><li>Comportamento real lido (Endognose)</li><li>Cada lead rastreado até o fim</li><li>Receita recuperada em R$</li></ul>
        </div>
      </div>
    </div>

    <div class="etapa">
      <h3>O que precisa acontecer na sua empresa</h3>
      <p>O caminho começa por um <strong>Diagnóstico 360°</strong>: a Endognose lê o
      comportamento real do seu lead e calcula, em R$, quanto está vazando nos 3 funis. A
      partir daí os funis são desenhados como um organismo único, e a recuperação é
      implementada junto com a sua equipe.</p>
      <p>O que você quer, <strong>${objetivo}</strong>, é totalmente possível. E sem
      precisar aumentar o tráfego.</p>
    </div>

    <div class="etapa">
      <h3>Por que acreditar nisso</h3>
      <div class="prova">
        <div class="rot">O resultado</div>
        <p><strong>Case JusExpert: mais de R$ 30 milhões</strong> de receita acumulada a
        partir da metodologia HDM de gestão de evasão nos 3 funis.</p>
      </div>
      <div class="prova">
        <div class="rot">Sobre o investimento</div>
        <p>A recuperação sai de uma receita que <strong>já existe</strong> na sua operação,
        sem aumentar mídia. O diagnóstico mostra o valor em R$ antes de qualquer decisão,
        então você decide com o número na mão.</p>
      </div>
      <div class="prova">
        <div class="rot">Sobre o seu tipo de negócio</div>
        <p>O método é de <strong>receita, não de nicho</strong>. Agência, infoproduto, B2B
        ou SaaS: onde existem 3 funis, existe evasão para recuperar.</p>
      </div>
      <div class="prova">
        <div class="rot">Onde isso chega</div>
        <p>Marketing, Comercial e CS operando como <strong>um organismo só</strong>, com o
        que o CS aprende voltando para o Marketing, e decisão por dado real no lugar do
        achismo.</p>
      </div>
      <p class="citacao">${citacao}
        <span class="fonte">Evandro Fernandes, criador da metodologia HDM</span>
      </p>
    </div>

    ${ctaInline("Falar com o time agora", "")}

    <div class="cta-box">
      <h2>O próximo passo, ${nome}</h2>
      ${nutrir
        ? `<p>Pelo momento do seu negócio, o caminho mais inteligente agora é começar
           organizando os dados na plataforma HDM, e escalar depois. O time te mostra por
           onde iniciar, no seu ritmo.</p>`
        : `<p>Uma <strong>sessão estratégica gratuita</strong> com o Evandro: o diagnóstico
           do seu momento e o desenho do próximo passo para recuperar a sua Receita
           Invisível. Sem compromisso e sem enrolação.</p>`}
      <div class="actions" style="justify-content:center">
        <button class="btn btn-primary btn-block js-wa">${nutrir ? "Quero começar pela plataforma" : "Quero minha sessão estratégica"}</button>
      </div>
      ${nutrir ? "" : `<p class="clube">As agendas da semana são limitadas pelo próprio Evandro, no máximo 2 sessões por dia.</p>`}
    </div>

    <div class="salvar no-print">
      <button class="link" id="pdf">Salvar este diagnóstico em PDF</button>
    </div>`;
}

/* ---------- WhatsApp + PDF ---------- */
function abrirWhatsApp() {
  const nome = (a.nomeResp || "").split(" ")[0] || "";
  const gargalo = rotulo("problema") || "receita escapando nos 3 funis";
  const msg = (F.marca.whatsappMsg || "")
    .replace("{nome}", nome)
    .replace("{gargalo}", gargalo);
  window.open(`https://wa.me/${F.marca.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
}
document.addEventListener("click", (e) => {
  const t = e.target;
  if (!t) return;
  if (t.classList && t.classList.contains("js-wa")) abrirWhatsApp();
  if (t.id === "pdf") window.print();
});
