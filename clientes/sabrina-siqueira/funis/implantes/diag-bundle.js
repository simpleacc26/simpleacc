
window.FLOW = {
  
  config: {
    storeKey: "siqueira_funil_implantes",
    frente: "Implantes",
    diagnosticoUrl: "/diagnostico.html", // absoluto: funciona com ou sem barra no fim da URL
  },

  marca: {
    nome: "Instituto Sabrina Siqueira",
    expert: "Dra. Sabrina Siqueira",
    // ATENÇÃO: número placeholder. Trocar pelo WhatsApp real (só dígitos, formato internacional, ex: 5533999999999)
    whatsapp: "5533998668858",
    whatsappMsg: "Oi! Sou {nome}, acabei de fazer o diagnóstico no site e quero agendar minha avaliação de reabilitação.",
  },

  hero: {
    selo: "Implantes e reabilitação oral · Governador Valadares e região",
    titulo: "Descubra o caminho para voltar a mastigar de tudo e sorrir sem se esconder.",
    subtitulo:
      "Responda algumas perguntas rápidas e receba uma orientação sobre o tipo de reabilitação mais indicada para o seu caso, antes mesmo de pisar no consultório.",
    tempo: "Leva ~2 minutos · 7 perguntas",
    cta: "Começar",
  },

  
  steps: [
    {
      id: "situacao",
      etapa: "Situação",
      pergunta: "Como está sua boca hoje?",
      options: [
        { value: "poucos", label: "Falta um ou poucos dentes",
          report: "um implante unitário ou a reposição de poucos elementos" },
        { value: "varios", label: "Faltam vários dentes ou uso prótese que não me agrada",
          report: "uma reabilitação com múltiplos implantes ou a troca da prótese por algo fixo" },
        { value: "comprometidos", label: "Tenho dentes muito comprometidos que provavelmente vou perder",
          report: "um planejamento que cuide dos dentes comprometidos antes de partir para a reabilitação" },
        { value: "tudo", label: "Quero reabilitar tudo e ter um sorriso novo",
          report: "uma reabilitação completa, para devolver todo o seu sorriso" },
      ],
    },
    {
      id: "problema",
      etapa: "Problema",
      pergunta: "O que mais te incomoda nisso hoje?",
      options: [
        { value: "mastigar", label: "Dificuldade pra mastigar e me alimentar bem",
          report: "a dificuldade pra mastigar e se alimentar bem" },
        { value: "vergonha", label: "Tenho vergonha de sorrir, falar ou aparecer em foto",
          report: "a vergonha de sorrir, falar ou aparecer em foto" },
        { value: "protese", label: "A prótese móvel solta, machuca ou é desconfortável",
          report: "a prótese móvel que solta, machuca ou é desconfortável" },
        { value: "medo", label: "Sei que preciso resolver, mas tenho medo de começar",
          report: "o medo de começar, mesmo sabendo que precisa resolver" },
      ],
    },
    {
      id: "implicacao",
      etapa: "Implicação",
      pergunta: "Como isso afeta o seu dia a dia?",
      options: [
        { value: "evito", label: "Evito certos alimentos e situações sociais",
          report: "evitar certos alimentos e situações sociais" },
        { value: "autoestima", label: "Minha autoestima caiu, me sinto mais velho(a) do que sou",
          report: "a autoestima cair e você se sentir mais velho(a) do que é" },
        { value: "oportunidades", label: "Já perdi oportunidades por não me sentir confiante",
          report: "já ter perdido oportunidades por não se sentir confiante" },
        { value: "empurrando", label: "Vou empurrando com a barriga, mas sei que está na hora",
          report: "ir empurrando com a barriga, mesmo sabendo que está na hora" },
      ],
    },
    {
      id: "necessidade",
      etapa: "O que já tentou",
      pergunta: "O que você já tentou até aqui?",
      options: [
        { value: "orcamento", label: "Fiz orçamento, mas achei caro ou não passei confiança",
          report: "fazer orçamento e achar caro, ou não sentir confiança" },
        { value: "protese-ruim", label: "Usei prótese móvel e não me adaptei",
          report: "usar prótese móvel e não se adaptar" },
        { value: "adiei", label: "Adiei por medo de dor ou de não dar certo",
          report: "adiar por medo de dor ou de não dar certo" },
        { value: "buscando", label: "Ainda não comecei nada, estou buscando agora",
          report: "começar a buscar uma solução agora" },
      ],
    },
    {
      id: "objetivo",
      etapa: "Objetivo",
      pergunta: "O que você quer alcançar?",
      options: [
        { value: "mastigar-tudo", label: "Voltar a mastigar de tudo, sem dor e sem incômodo",
          report: "voltar a mastigar de tudo, sem dor e sem incômodo" },
        { value: "sorrir", label: "Sorrir e me sentir bem comigo de novo",
          report: "sorrir e se sentir bem consigo de novo" },
        { value: "fixa", label: "Uma solução fixa e definitiva, não um quebra-galho",
          report: "uma solução fixa e definitiva, não um quebra-galho" },
        { value: "seguranca", label: "Resolver com segurança, com quem eu confie",
          report: "resolver com segurança, com quem você confie" },
      ],
    },
    {
      id: "perfil",
      etapa: "Momento",
      pergunta: "Qual opção combina mais com você hoje?",
      options: [
        { value: "agora", label: "Quero resolver o quanto antes" },
        { value: "organizar", label: "Quero entender o caminho e me organizar pra fazer" },
        { value: "comparando", label: "Estou comparando profissionais antes de decidir" },
        { value: "familiar", label: "É para um familiar (pai, mãe, cônjuge)" },
      ],
    },
    {
      id: "qualificacao",
      etapa: "Onde você fica",
      pergunta: "De onde você fala? Atendemos Governador Valadares e região.",
      options: [
        { value: "valadares", label: "Governador Valadares" },
        { value: "vizinha", label: "Cidade vizinha (até ~1h30 de Valadares)" },
        { value: "longe-ok", label: "Mais distante, mas posso me deslocar" },
        { value: "outra", label: "Outra região", foraDeArea: true },
      ],
    },
  ],

  captura: {
    titulo: "Sua orientação inicial está pronta. 💛",
    subtitulo:
      "Pra onde enviamos? Deixe seu WhatsApp que a equipe do Instituto te manda a orientação do seu caso e agenda sua avaliação, sem compromisso.",
    campos: [
      { id: "nomeResp", label: "Seu nome completo", type: "text", required: true, autocomplete: "name", placeholder: "Como podemos te chamar?" },
      { id: "whatsapp", label: "Seu WhatsApp (com DDD)", type: "tel", required: true, autocomplete: "tel", placeholder: "(33) 99999-9999", mask: "phone" },
      { id: "email", label: "Seu e-mail", type: "email", required: true, autocomplete: "email", placeholder: "voce@email.com" },
    ],
    cta: "Ver minha orientação agora",
    privacidade: "🔒 Usamos seus dados só para te enviar a orientação e o contato do consultório. Nada de spam.",
  },
};


const F = window.FLOW;
const STORE_KEY = (F.config && F.config.storeKey) || "siqueira_funil_implantes";
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


if (!a._completedAt && !a.problema) {
  report.innerHTML = `
    <p class="eyebrow">Orientação</p>
    <h2>Ainda não temos suas respostas</h2>
    <p class="lead">Parece que você chegou aqui sem fazer o teste. Leva ~2 minutos.</p>
    <div class="actions"><a class="btn btn-primary btn-block" href="/">Fazer o teste agora</a></div>`;
} else {
  const nome = esc((a.nomeResp || "").split(" ")[0]) || "tudo bem";
  const problema = frase("problema") || "o seu sorriso";
  const implicacao = frase("implicacao") || "afetar o seu dia a dia";
  const tentativa = frase("necessidade") || "buscar uma solução";
  const objetivo = frase("objetivo") || "voltar a sorrir com segurança";
  const orientacao = frase("situacao") || "uma avaliação para definir a melhor solução";
  const foraDeArea = valor("qualificacao") === "outra";

  report.innerHTML = `
    <div class="report-head">
      <span class="selo">Orientação personalizada</span>
      <h1>O caminho de volta ao seu sorriso</h1>
      <p class="hint">Elaborada com base nas suas respostas · ${new Date().toLocaleDateString("pt-BR")}</p>
    </div>

    <div class="etapa">
      <h3>Antes de tudo</h3>
      <p>Olá, ${nome}! Aqui é da equipe do Instituto Sabrina Siqueira. 💛 Li com atenção tudo o
      que você respondeu, e já tenho uma orientação inicial sobre o seu caso. Quero começar com
      uma coisa: <strong>dar o primeiro passo é mais simples (e menos assustador) do que parece.</strong></p>
    </div>

    <div class="etapa">
      <h3>O seu cenário hoje</h3>
      <p>Pelo que você me contou, o que mais te incomoda hoje é <strong>${problema}</strong>.
      E isso vem custando caro: ${implicacao}. Você já chegou a ${tentativa}, e mesmo assim
      não resolveu. Faz todo sentido você estar buscando uma solução agora.</p>
    </div>

    <div class="etapa">
      <h3>Por que tanta gente trava nessa hora</h3>
      <p>O que segura a maioria das pessoas <em>não é o dinheiro</em>: é o medo. Medo de dor, de
      não dar certo, de cair num lugar que trata sorriso como linha de produção, faz orçamento no
      susto e some depois. Reabilitação séria é o oposto disso: <strong>começa com avaliação e
      planejamento, não com a furadeira.</strong></p>
    </div>

    <div class="etapa">
      <h3>Dois caminhos lado a lado</h3>
      <div class="compare">
        <div class="col bad">
          <h4>Fábrica de sorriso</h4>
          <ul><li>Orçamento no susto</li><li>Procedimento apressado</li><li>Zero acompanhamento</li><li>Um problema que volta</li></ul>
        </div>
        <div class="col good">
          <h4>Com planejamento (como fazemos aqui)</h4>
          <ul><li>Avaliação real do seu caso</li><li>Plano com etapas e condições</li><li>Acompanhamento do começo ao fim</li><li>Um sorriso que dura</li></ul>
        </div>
      </div>
    </div>

    <div class="etapa">
      <h3>O que o seu caso pede</h3>
      <p>Pelo que você descreveu, o caminho mais indicado tende a ser <strong>${orientacao}</strong>.
      Mas a definição correta (e qualquer valor ou plano) depende de uma <strong>avaliação
      presencial</strong>: dar um número sem te examinar seria irresponsável. O que você deseja,
      <strong>${objetivo}</strong>, é totalmente possível, e começa com esse primeiro passo.</p>
    </div>

    <div class="etapa">
      <h3>Quem já viveu isso</h3>
      <div class="depo">[ANTES E DEPOIS 1]: inserir foto/vídeo de um paciente que voltou a sorrir nas fotos.</div>
      <div class="depo">[DEPOIMENTO 2]: inserir caso de quem trocou a prótese que machucava por algo fixo.</div>
      <p class="hint">Reabilitação bem feita não devolve só dente. Devolve a pessoa.</p>
    </div>

    <div class="cta-box">
      <h2 style="margin-top:0">O próximo passo é simples, ${nome}</h2>
      <p>Uma avaliação para entender o seu caso e te mostrar o caminho e as condições, sem
      compromisso de fechar nada na hora.</p>
      ${foraDeArea ? '<p class="hint">Vi que você fica um pouco mais longe, mas me chama mesmo assim que a gente vê o que é possível, tá?</p>' : ""}
      <div class="actions" style="justify-content:center">
        <button class="btn btn-primary" id="whatsapp-2">Quero agendar minha avaliação</button>
      </div>
      <p class="clube">Você já adiou tempo demais. O primeiro passo é só uma avaliação.</p>
    </div>`;
}


function abrirWhatsApp() {
  const nome = (a.nomeResp || "").split(" ")[0] || "";
  const msg = (F.marca.whatsappMsg || "").replace("{nome}", nome);
  const url = `https://wa.me/${F.marca.whatsapp}?text=${encodeURIComponent(msg)}`;
  window.open(url, "_blank", "noopener");
}
document.getElementById("whatsapp")?.addEventListener("click", abrirWhatsApp);
document.addEventListener("click", (e) => { if (e.target && e.target.id === "whatsapp-2") abrirWhatsApp(); });
