/* ============================================================
   DIAGNÓSTICO · GES360 · Guilherme Eduardo
   Calcula o IDR (Índice de Dependência de Receita) e monta o
   relatório personalizado a partir das respostas do quiz.
   Estrutura invisível espelhada do quiz de alta conversão da
   Pâmella, igual ao funil do Felipe: espelho do cenário, reframe,
   dois caminhos, método, CTAs distribuídos, autoridade,
   depoimentos e CTA final adaptado à qualificação.
   Regra: zero travessões.
   ============================================================ */
const F = window.FLOW;
const STORE_KEY = (F.config && F.config.storeKey) || "ges360_funil_quiz";
const report = document.getElementById("report");

function getState() { try { return JSON.parse(sessionStorage.getItem(STORE_KEY)) || {}; } catch (e) { return {}; } }
function opcao(stepId) {
  const step = F.steps.find(s => s.id === stepId);
  const val = (getState().answers || {})[stepId];
  return (step && step.options.find(o => o.value === val)) || null;
}
function frase(stepId) { const o = opcao(stepId); return (o && o.report) || ""; }
function valor(stepId) { return (getState().answers || {})[stepId]; }
function esc(s) { return String(s == null ? "" : s).replace(/[<>&]/g, c => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c])); }

/* primeiro nome real: pula títulos como Dr., Dra., Doutor */
function primeiroNome(full) {
  const partes = String(full || "").trim().split(/\s+/).filter(Boolean);
  const titulo = /^(dr|dra|doutor|doutora|sr|sra|prof)\.?$/i;
  const p = partes.find(x => !titulo.test(x));
  return p || "";
}

/* ---------- IDR: Índice de Dependência de Receita ----------
   Média ponderada dos pesos de cada resposta. Quanto maior,
   mais o faturamento depende da consulta avulsa e da presença
   do médico. As perguntas de tempo e prontidão não entram no
   cálculo, só na leitura e na qualificação. ---------------- */
const PESOS = { situacao: 1, cobranca: 3, problema: 2.5, implicacao: 1.5, tentativas: 1, objetivo: 0.5, qualificacao: 1.5 };
function calcularIDR() {
  let soma = 0, total = 0;
  Object.keys(PESOS).forEach(id => {
    const o = opcao(id);
    if (o && typeof o.score === "number") { soma += o.score * PESOS[id]; total += PESOS[id]; }
  });
  if (!total) return 70;
  return Math.round(soma / total);
}
function faixaIDR(idr) {
  if (idr >= 78) return { nome: "Dependência crítica", classe: "critico",
    resumo: "praticamente todo o seu faturamento depende de você atender mais" };
  if (idr >= 60) return { nome: "Dependência alta", classe: "alto",
    resumo: "a maior parte da sua receita ainda nasce da consulta avulsa" };
  if (idr >= 40) return { nome: "Dependência moderada", classe: "moderado",
    resumo: "você já começou a construir receita recorrente, mas ela ainda não sustenta a clínica" };
  return { nome: "Modelo em transição", classe: "transicao",
    resumo: "a sua clínica já caminha para um modelo de receita previsível" };
}

const a = getState().answers || {};

if (!a._completedAt && !a.problema) {
  report.innerHTML = `
    <p class="eyebrow">Diagnóstico</p>
    <h2>Ainda não temos as suas respostas</h2>
    <p class="lead">Parece que você chegou aqui sem responder o diagnóstico. Leva 2 minutos.</p>
    <div class="actions"><a class="btn btn-primary btn-block" href="index.html">Fazer o diagnóstico agora</a></div>`;
} else {
  const idr = calcularIDR();
  const faixa = faixaIDR(idr);
  const nome = esc(primeiroNome(a.nomeResp)) || "doutor";
  const problemaOpt = opcao("problema");
  const gargalo = (problemaOpt && problemaOpt.gargalo) || "modelo de receita";
  const problema = frase("problema") || "o modelo de cobrança da clínica";
  const cobranca = frase("cobranca") || "depender da consulta avulsa";
  const tempo = frase("tempo") || "um tempo";
  const implicacao = frase("implicacao") || "seguir no mesmo patamar";
  const tentativa = frase("tentativas") || "buscar uma saída";
  const objetivo = frase("objetivo") || "faturar mais sem atender mais";

  /* qualificação: ICP (faturamento) + intenção (prontidão) */
  const qualOpt = opcao("qualificacao");
  const foraDeArea = !!(qualOpt && qualOpt.foraDeArea);
  const prontOpt = opcao("prontidao");
  const nutrir = !!(prontOpt && prontOpt.nutrir);

  /* próximo passo personalizado pelo gargalo da P3 */
  const proximoPasso = {
    "modelo de receita": "montar o seu primeiro programa de acompanhamento e definir o preço certo antes de qualquer ação de captação",
    "precificação e apresentação do programa": "revisar a precificação e a forma como o programa é apresentado dentro da consulta",
    "conversão dentro da consulta": "instalar a Metodologia de Conversão em Consulta, que tira a venda do improviso",
    "estruturação da oferta": "estruturar do zero um programa de acompanhamento com protocolo e preço definidos",
  }[gargalo];

  /* CTA final adaptado ao nível de qualificação */
  let ctaLabel, ctaExtra, clube;
  if (foraDeArea) {
    ctaLabel = "Falar com a equipe no WhatsApp";
    ctaExtra = '<p class="hint">Pelo momento da sua clínica, o primeiro passo pode ser mais enxuto: montar o seu primeiro programa e já faturar com ele, antes de qualquer coisa maior. Me chama no WhatsApp que eu te mostro por onde começar.</p>';
    clube = "";
  } else if (nutrir) {
    ctaLabel = "Quero entender melhor como funciona";
    ctaExtra = '<p class="hint">Sem compromisso. A equipe te explica o GES360 e tira as suas dúvidas no seu tempo.</p>';
    clube = '<p class="clube">Quando fizer sentido pra você, o primeiro passo é um <strong>diagnóstico estratégico</strong>: um mapeamento da sua clínica, sem compromisso de seguir.</p>';
  } else {
    ctaLabel = "Quero agendar meu diagnóstico estratégico";
    ctaExtra = '<p class="hint">Uma conversa de 30 a 45 minutos para desenhar o modelo de receita dentro da sua clínica. É gratuita e sem compromisso. Vagas limitadas por semana.</p>';
    clube = '<p class="clube">A partir do diagnóstico, conduzimos a implementação do <strong>GES360</strong> dentro da sua clínica, pensada para o seu caso.</p>';
  }
  /* CTA reutilizável, distribuído pela página (o lead clica quando se sentir pronto) */
  const ctaInline = `<div class="cta-inline"><button class="btn btn-primary cta-wpp">${ctaLabel}</button></div>`;

  report.innerHTML = `
    <div class="report-head">
      <span class="selo">Diagnóstico personalizado</span>
      <h1>O que está travando o faturamento da sua clínica</h1>
      <p class="hint">Elaborado com base nas suas respostas · ${new Date().toLocaleDateString("pt-BR")}</p>
    </div>

    <div class="idr-box ${faixa.classe}">
      <span class="idr-label">Seu IDR · Índice de Dependência de Receita</span>
      <div class="idr-num">${idr}<span>/100</span></div>
      <div class="idr-track"><div class="idr-fill" style="width:${idr}%"></div></div>
      <div class="idr-faixa">${faixa.nome}</div>
      <p class="idr-resumo">Isso significa que ${faixa.resumo}.</p>
    </div>

    <div class="etapa">
      <h3>Antes de tudo</h3>
      <p>Olá, ${nome}. Li com atenção tudo o que você respondeu, e quero começar por uma coisa que
      talvez ninguém tenha te dito: <strong>o que você vive não é falta de competência clínica, nem
      falta de esforço.</strong> É um problema de modelo. E tem solução. O seu IDR ficou em
      <strong>${idr} de 100</strong>, na faixa de <strong>${faixa.nome.toLowerCase()}</strong>. Esse
      número não mede a sua medicina. Ele mede o quanto o faturamento da sua clínica ainda depende
      de você atender mais uma pessoa.</p>
    </div>

    <div class="etapa">
      <h3>O seu cenário hoje</h3>
      <p>Pelo que você me contou, hoje a sua clínica vive de <strong>${cobranca}</strong>, e o que
      mais trava o seu faturamento é <strong>${problema}</strong>. Você convive com esse modelo há
      <strong>${tempo}</strong>, e, se nada mudar, o cenário em 12 meses é
      <strong>${implicacao}</strong>. Esse é o retrato clássico do médico bom de clínica preso à
      agenda: a demanda cresceu, mas o faturamento continua do tamanho das horas que você consegue
      atender.</p>
    </div>

    <div class="etapa">
      <h3>Por que ainda não destravou</h3>
      <p>Você já chegou a <strong>${tentativa}</strong> e mesmo assim o número não mudou de patamar.
      Faz sentido: a clínica cresce por três alavancas, o <strong>modelo de receita</strong> (o que
      você vende), a <strong>conversão na consulta</strong> (transformar atendimento em programa) e
      a <strong>atração</strong> (paciente certo chegando). O seu gargalo hoje está em
      <strong>${gargalo}</strong>. Enquanto essa alavanca não é resolvida, mais paciente só aumenta
      o volume de trabalho, não o faturamento. <strong>Não é falta de paciente. É falta de um modelo
      que funcione.</strong></p>
    </div>

    <div class="etapa">
      <h3>Dois caminhos lado a lado</h3>
      <div class="compare">
        <div class="col bad">
          <h4>Continuando como está</h4>
          <ul>
            <li>Cada mês recomeça do zero</li>
            <li>O faturamento é do tamanho da agenda</li>
            <li>Crescer significa atender mais</li>
            <li>${esc(implicacao.charAt(0).toUpperCase() + implicacao.slice(1))}</li>
          </ul>
        </div>
        <div class="col good">
          <h4>Com modelo de receita</h4>
          <ul>
            <li>O mesmo paciente vale várias vezes mais</li>
            <li>Receita previsível todo mês</li>
            <li>Faturar mais sem aumentar atendimentos</li>
            <li>A secretária conduz o processo com você</li>
          </ul>
        </div>
      </div>
    </div>

    ${ctaInline}

    <div class="etapa">
      <h3>Como o GES360 trabalha</h3>
      <p>Uma implementação assistida, ao vivo, dentro da sua clínica, em três pilares:</p>
      <ol class="metodo">
        <li><strong>Modelo de Receita:</strong> sair da consulta avulsa para o programa de
        acompanhamento recorrente, com protocolo e precificação definidos.</li>
        <li><strong>Atração de Pacientes:</strong> posicionamento, reativação da sua base e
        aquisição do paciente certo, não de mais paciente.</li>
        <li><strong>Comercial:</strong> a Metodologia de Conversão em Consulta, o treinamento da
        recepção e o processo que sustenta a venda sem improviso.</li>
      </ol>
      <p class="hint">O segredo está na ordem: preço e protocolo primeiro, tráfego depois. De nada
      adianta trazer mais paciente para um sistema que ainda não converte nem retém.</p>
    </div>

    <div class="etapa">
      <h3>O que precisa acontecer agora</h3>
      <p>Pelo seu perfil, o primeiro movimento é <strong>${proximoPasso}</strong>. O caminho começa
      por um <strong>diagnóstico estratégico</strong>: um mapeamento da sua clínica e dos pontos
      onde o faturamento está travando, com a definição de um plano individual. Você sai dele com o
      gap entre o que fatura hoje e o que a sua clínica já poderia faturar bem claro. O que você
      quer, <strong>${objetivo}</strong>, é totalmente possível dentro desse caminho.</p>
    </div>

    ${ctaInline}

    <div class="etapa">
      <h3>Quem é o Guilherme</h3>
      <div class="autor">
        <div>
          <span class="autor-nome">GUILHERME EDUARDO</span>
          <span class="autor-cargo">GES Consultoria Médica · Método GES360</span>
        </div>
      </div>
      <p>Passou anos dentro do mercado médico antes de consultar: começou como representante
      comercial de farmácia de manipulação, visitando clínicas todo dia, e depois foi para o mercado
      de implante hormonal. Foi aí que mapeou de perto as três dores que todo médico dono de clínica
      vive, atração, conversão e retenção de paciente, e estruturou o GES360 para resolvê-las na
      ordem certa.</p>
      <div class="cred-grid">
        <div class="cred"><div class="n">+322%</div><div class="d">de faturamento em um mês na clínica do Dr. Kayo, de R$ 20,5 mil para R$ 86,7 mil</div></div>
        <div class="cred"><div class="n">R$ 50,8 mil</div><div class="d">fechados em 3 dias de atendimento, sem aumentar a agenda</div></div>
        <div class="cred"><div class="n">R$ 71,8 mil</div><div class="d">o patamar sustentado no mês seguinte, provando que não foi pico</div></div>
        <div class="cred"><div class="n">R$ 48 mil</div><div class="d">em 7 dias na clínica do Dr. André, nutrólogo</div></div>
      </div>
    </div>

    <div class="etapa">
      <h3>Isso já aconteceu antes</h3>
      <div class="depo">Uma clínica saiu de R$ 20.546 em abril para R$ 86.771 em maio e sustentou
      R$ 71.800 em junho, sem aumentar dias de atendimento. O que mudou não foi a agenda, foi o
      modelo de receita.</div>
      <div class="depo">Em outro caso, foram 3 programas apresentados e 3 fechados no mesmo dia,
      somando R$ 16 mil em um único dia de atendimento.</div>
      <p class="hint">O que esses casos têm em comum: nenhum deles precisou de mais pacientes
      para faturar mais.</p>
    </div>

    <div class="cta-box">
      <h2 style="margin-top:0">O próximo passo, ${nome}</h2>
      <p>Dar o primeiro passo é simples, e no seu tempo.</p>
      ${ctaExtra}
      <div class="actions" style="justify-content:center">
        <button class="btn btn-primary cta-wpp">${ctaLabel}</button>
      </div>
      ${clube}
      <p class="clube">Leve o seu IDR para a conversa: ele é o ponto de partida do diagnóstico.</p>
    </div>`;
}

/* ---------- WhatsApp (CTAs distribuídos) ---------- */
function abrirWhatsApp() {
  const nome = primeiroNome(a.nomeResp);
  const idr = calcularIDR();
  const msg = (F.marca.whatsappMsg || "")
    .replace("{nome}", nome)
    .replace("{idr}", idr)
    .replace("{faixa}", faixaIDR(idr).nome.toLowerCase());
  window.open(`https://wa.me/${F.marca.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
}
/* qualquer CTA com a classe .cta-wpp (são 3, distribuídos) abre o WhatsApp */
document.addEventListener("click", (e) => {
  if (e.target.closest && e.target.closest(".cta-wpp")) abrirWhatsApp();
});
