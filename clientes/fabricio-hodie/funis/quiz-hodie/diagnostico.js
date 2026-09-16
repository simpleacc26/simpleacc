/* ============================================================
   RELATÓRIO · HODIE. Monta a leitura personalizada a partir das
   respostas do quiz (sessionStorage) e habilita os CTAs.

   Ordem canônica dos 9 blocos (não reordene):
     0 cabeçalho + selo do índice · 1 antes de tudo · 2 o seu cenário
     3 por que não resolveu · 4 dois caminhos · CTA · 5 como funciona
     6 o que precisa acontecer · CTA · 7 casos de consultório
     8 quem conduz · 9 CTA final adaptado

   COMPLIANCE: ver contexto/compliance-cfm.md. Nada de promessa de
   resultado, quilos ou prazo; casos entram como relato clínico
   anonimizado; nunca "única"; sempre "classe de medicações".
   Padrão de escrita: nunca usar travessão.
   ============================================================ */
const STORE_KEY = "hodie_quiz";
const F = window.FLOW;
const report = document.getElementById("report");

function getState() { try { return JSON.parse(sessionStorage.getItem(STORE_KEY)) || {}; } catch (e) { return {}; } }
function esc(s) { return String(s == null ? "" : s).replace(/[<>&]/g, c => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c])); }

const a = getState().answers || {};

/* frase de relatório (campo "report") da opção escolhida num passo */
function frase(stepId) {
  const step = F.steps.find(s => s.id === stepId);
  const opt = step && step.options.find(o => o.value === a[stepId]);
  return (opt && opt.report) || "";
}

if (!a._completedAt && !a.problema && !a.situacao) {
  report.innerHTML = `
    <p class="eyebrow">Sua leitura</p>
    <h2>Ainda não temos as suas respostas</h2>
    <p class="lead">Parece que você chegou aqui sem responder. Leva cerca de 2 minutos.</p>
    <div class="actions"><a class="btn btn-primary btn-block" href="index.html">Responder agora</a></div>`;
} else {
  const nome = esc((a.nomeResp || "").split(" ")[0]);
  const ola = nome ? `Oi, ${nome}.` : "Oi.";

  const situacao = frase("situacao") || "a sua relação com o peso hoje";
  const problema = frase("problema") || "o que mais pesa no seu dia";
  const tempo = frase("tempo") || "há um tempo";
  const impacto = frase("impacto") || "seguir exatamente como está";
  const tentativa = frase("necessidade") || "buscar uma saída";
  const objetivo = frase("objetivo") || "voltar a se sentir bem no seu corpo";
  const medicacao = frase("perfil") || "ter dúvidas sobre a medicação";

  const indice = window.calcularIndice(a);
  const faixa = F.indice.faixas[indice.faixa];
  const qualificacao = window.classificarLead(a);

  /* Bucket (método ASK): decide QUAL diagnóstico. O IMF decide QUÃO intenso.
     Se algum dia o bucket vier vazio, o relatório ainda monta, só sem os
     blocos segmentados, em vez de quebrar na cara do lead. */
  const bucketId = window.definirBucket(a);
  const B = (F.buckets && F.buckets[bucketId]) || null;

  /* CTA final adaptado às 3 faixas. Ninguém leva porta na cara. */
  let ctaLabel, ctaExtra, fechamento;
  if (qualificacao === "fora") {
    ctaLabel = "Falar com a equipe no WhatsApp";
    ctaExtra = '<p class="hint">A equipe responde as suas dúvidas e te indica por onde começar, sem compromisso.</p>';
    fechamento = '<p class="clube">Mesmo que a consulta não seja para agora, entender o que move a sua fome já muda a forma como você escolhe o próximo passo. A equipe pode te orientar sobre o que investigar primeiro.</p>';
  } else if (qualificacao === "nutrir") {
    ctaLabel = "Quero entender melhor como funciona";
    ctaExtra = '<p class="hint">Sem compromisso e no seu tempo. A equipe explica como é a consulta de investigação e o que ela envolve.</p>';
    fechamento = '<p class="clube">Não existe momento perfeito, existe informação suficiente para decidir. Quando quiser dar o passo, a porta está aberta.</p>';
  } else {
    ctaLabel = "Quero agendar a minha consulta de investigação";
    ctaExtra = '<p class="hint">Atendimento individual e confidencial, presencial em Jundiaí ou on-line. A agenda da Dra. Lailla é limitada por semana.</p>';
    fechamento = '<p class="clube">Na consulta de investigação a Dra. Lailla escuta a sua história inteira e define quais exames pedir para o seu caso. No retorno, você recebe o seu Mapa da Causa.</p>';
  }
  const ctaInline = `<div class="cta-inline"><button class="btn btn-primary cta-wpp">${ctaLabel}</button></div>`;

  report.innerHTML = `
    <div class="report-head">
      <span class="selo">Leitura personalizada</span>
      <h1>O seu ${F.indice.nome}</h1>
      <div class="imf imf-${indice.faixa}">
        <span class="imf-num">${indice.pct}%</span>
        <span class="imf-faixa">${faixa.titulo}</span>
      </div>
      <p class="lead" style="margin-top:12px">${faixa.resumo}</p>
      ${B ? `<p class="bucket-selo">Perfil identificado: <strong>${B.nome}</strong></p>` : ""}
      <p class="hint">${F.indice.explicacao} ${F.indice.ressalva}</p>
    </div>

    <div class="etapa">
      <h3>Antes de tudo</h3>
      <p>${ola} Eu li com atenção tudo o que você respondeu. E quero começar pela coisa que
      talvez ninguém tenha te dito nesses anos todos:
      <strong>a sua fome não é fraqueza. Ela é um sintoma.</strong>
      Fome que não passa, vontade de doce que aperta sempre no mesmo horário e peso que
      volta depois do esforço não são falha de caráter. São sinais de um metabolismo da fome
      que pode estar desregulado. E sintoma se investiga.</p>
      ${B ? `<p class="bucket-chamada">${B.chamada}</p>` : ""}
    </div>

    <div class="etapa">
      <h3>O seu cenário hoje</h3>
      <p>Pelo que você me contou, a sua realidade é <strong>${situacao}</strong>, e o que mais
      pesa no seu dia é <strong>${problema}</strong>. Isso acontece <strong>${tempo}</strong>.
      Quando você imagina seguir assim, o que mais incomoda é <strong>${impacto}</strong>.
      Sobre a medicação, o seu momento é <strong>${medicacao}</strong>.
      Esse conjunto se repete no consultório quase todas as semanas.</p>
    </div>

    <div class="etapa">
      <h3>Por que não se resolveu até agora</h3>
      <p>Você já passou por <strong>${tentativa}</strong>, e mesmo assim continua no mesmo
      ponto. Faz sentido, e o motivo é específico do seu caso.</p>
      ${B ? `<p>${B.porque}</p>` : ""}
    </div>

    <div class="etapa">
      <h3>Dois caminhos daqui para a frente</h3>
      ${B ? `<div class="compare">
        <div class="col bad">
          <h4>${B.caminhos.ruim.titulo}</h4>
          <ul>${B.caminhos.ruim.itens.map(i => `<li>${i}</li>`).join("")}</ul>
        </div>
        <div class="col good">
          <h4>${B.caminhos.bom.titulo}</h4>
          <ul>${B.caminhos.bom.itens.map(i => `<li>${i}</li>`).join("")}</ul>
        </div>
      </div>` : ""}
    </div>

    ${ctaInline}

    <div class="etapa">
      <h3>Como funciona o método da HODIE</h3>
      <p>O tratamento é conduzido pela Dra. Lailla em três fases, na ordem:</p>
      <ol class="metodo">
        <li class="${B && B.enfase === "investigar" ? "fase-chave" : ""}"><strong>Investigar.</strong> Consulta aprofundada sobre a sua história de peso,
        comportamento alimentar, sono e rotina, mais exames dirigidos. No retorno, os exames
        são explicados um a um e você recebe o seu laudo individual, o Mapa da Causa.</li>
        <li class="${B && B.enfase === "tratar" ? "fase-chave" : ""}"><strong>Tratar.</strong> Plano individualizado: regulação da fome com a classe de
        medicações quando indicada, plano alimentar e cuidado com a preservação de massa
        muscular, com retornos frequentes para ajuste de conduta.</li>
        <li class="${B && B.enfase === "sustentar" ? "fase-chave" : ""}"><strong>Sustentar.</strong> A fase que o mercado geralmente não oferece.
        Reavaliações periódicas e monitoramento da composição corporal, pensados para o
        período em que o corpo tende a puxar o peso de volta.</li>
      </ol>
      <p class="hint">A medicação, quando entra, é ferramenta dentro da estrutura, com uso
      criterioso e supervisionado. Ela nunca é o tratamento inteiro.</p>
    </div>

    <div class="etapa">
      <h3>O que precisa acontecer agora</h3>
      ${B ? `<p>${B.agora}</p>` : ""}
      <p>O formato é sempre o mesmo: a <strong>consulta de investigação</strong>, onde a sua
      história é ouvida por inteiro e os exames certos para o seu caso são definidos. No
      retorno você sai com a causa nomeada e o caminho recomendado.</p>
      <p>O que você respondeu que mais quer, <strong>${objetivo}</strong>, começa por aí:
      por uma resposta. Não por mais uma tentativa.</p>
    </div>

    ${ctaInline}

    <div class="etapa">
      <h3>Casos do consultório</h3>
      <p>Relatos clínicos reais, anonimizados, contados pela médica. Cada caso é um caso:
      resultado de tratamento é individual e depende da causa encontrada e da adesão.</p>
      <div class="caso">
        <p>Uma paciente chegou depois de anos de dietas e da certeza de que o problema era
        falta de vontade. A investigação mostrou onde o metabolismo dela travava. Com o
        tratamento conduzido, incluindo um mês de pausa no meio do caminho, ela perdeu
        18 quilos ao longo de quatro meses de acompanhamento, com tudo documentado em
        prontuário.</p>
      </div>
      <div class="caso">
        <p>Outra paciente, de 39 anos, está com o tratamento em curso. Até aqui,
        11,3 quilos em cerca de três meses e meio. O que ela mais comenta nos retornos
        não é o número: é ter parado de pensar em comida o dia inteiro.</p>
      </div>
      <p class="hint">Além do peso, o que acompanhamos de perto são os indicadores de saúde
      nos exames, como resistência à insulina e glicemia. É ali que o tratamento aparece
      primeiro.</p>
    </div>

    <div class="etapa">
      <h3>Quem conduz o seu tratamento</h3>
      <div class="autor">
        <div class="autor-marca" aria-hidden="true">H</div>
        <div>
          <span class="autor-nome">Dra. Lailla de Oliveira</span>
          <span class="autor-cargo">Médica · CRM-SP 239430</span>
        </div>
      </div>
      <p>A Dra. Lailla atende mulheres com dificuldade crônica de emagrecimento: aquelas que
      já tentaram muitas vezes e não conseguiram manter o resultado. A convicção que organiza
      todo o consultório é simples e ela repete em toda consulta: a maioria dessas mulheres
      não falhou por falta de disciplina, e sim por uma desregulação do metabolismo da fome
      que nunca foi investigada nem tratada. É por isso que aqui o tratamento começa por
      escuta e investigação, nunca por prescrição.</p>
      <div class="cred-grid">
        <div class="cred"><div class="n">3 fases</div><div class="d">Método próprio: investigar, tratar e sustentar</div></div>
        <div class="cred"><div class="n">Mapa da Causa</div><div class="d">Laudo individual entregue na consulta de retorno</div></div>
        <div class="cred"><div class="n">Só mulheres</div><div class="d">Atende apenas mulheres com dificuldade crônica de emagrecimento</div></div>
        <div class="cred"><div class="n">Brasil todo</div><div class="d">Presencial em Jundiaí-SP ou on-line</div></div>
      </div>
      <p class="hint" style="margin-top:14px">O que sustenta o cuidado</p>
      <div class="eco">
        <span class="eco-chip"><b>Escuta</b> · consulta de investigação aprofundada</span>
        <span class="eco-chip"><b>Evidência</b> · conduta baseada em literatura atual</span>
        <span class="eco-chip"><b>Sigilo</b> · discrição é dever médico</span>
      </div>
    </div>

    <div class="cta-box">
      <h2 style="margin-top:0">O próximo passo${nome ? ", " + nome : ""}</h2>
      <p>A saúde começa hoje. E começar, aqui, é simples.</p>
      ${ctaExtra}
      <div class="actions" style="justify-content:center">
        <button class="btn btn-primary cta-wpp">${ctaLabel}</button>
      </div>
      ${fechamento}
    </div>`;
}

/* ---------- WhatsApp ----------
   Enquanto o número do consultório não estiver preenchido em flow.js, o CTA
   avisa na tela em vez de abrir uma conversa com um número errado. */
function abrirWhatsApp() {
  const numero = (F.marca.whatsapp || "").replace(/\D/g, "");
  if (!numero) {
    let aviso = document.getElementById("wpp-pendente");
    if (!aviso) {
      aviso = document.createElement("p");
      aviso.id = "wpp-pendente";
      aviso.className = "wpp-pendente";
      aviso.setAttribute("role", "alert");
      aviso.textContent = "Canal de atendimento em configuração. O WhatsApp do consultório ainda não foi conectado a esta página.";
      report.appendChild(aviso);
    }
    aviso.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }
  const primeiro = (a.nomeResp || "").split(" ")[0] || "";
  const msg = (F.marca.whatsappMsg || "").replace("{nome}", primeiro);
  window.open(`https://wa.me/${numero}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
}

document.addEventListener("click", (e) => {
  if (e.target.closest && e.target.closest(".cta-wpp")) abrirWhatsApp();
});
