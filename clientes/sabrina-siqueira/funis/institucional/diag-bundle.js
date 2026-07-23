
window.FLOW = {
  marca: {
    nome: "Instituto Sabrina Siqueira",
    expert: "Dra. Sabrina Siqueira",
    // Coloque o número no formato internacional, só dígitos (ex: 5533999999999)
    whatsapp: "5533998668858",
    // Texto que abre no WhatsApp (o {nome} é trocado pelo nome do responsável)
    whatsappMsg: "Oi! Sou {nome}, acabei de fazer o diagnóstico no site e quero falar sobre o atendimento do meu filho.",
  },

  hero: {
    selo: "Odontologia humanizada · Governador Valadares e região",
    titulo: "Seu filho merece um dentista que entende de manejo, não só de dente.",
    subtitulo:
      "Responda algumas perguntas rápidas e descubra o caminho certo para o seu filho ter uma relação tranquila e sem trauma com o dentista.",
    tempo: "Leva ~2 minutos · 7 perguntas",
    cta: "Começar",
  },

  
  steps: [
    {
      id: "situacao",
      etapa: "Situação",
      pergunta: "Como são hoje as idas ao dentista do seu filho?",
      options: [
        { value: "nunca", label: "Ele nunca foi, tenho receio de como vai reagir" },
        { value: "dificil", label: "Já fomos, mas foi difícil: choro, contenção ou a consulta não rolou" },
        { value: "falta-alguem", label: "Vamos quando dá, mas sinto que falta alguém que entenda ele de verdade" },
        { value: "ja-paciente", label: "Ele já é meu paciente e quero manter o acompanhamento" },
      ],
    },
    {
      id: "problema",
      etapa: "Problema",
      pergunta: "Qual é a maior dificuldade na hora da consulta odontológica hoje?",
      options: [
        { value: "nao-senta", label: "Ele não senta na cadeira / não deixa examinar",
          report: "ele não conseguir sentar na cadeira ou deixar examinar" },
        { value: "ambiente", label: "O ambiente o desregula: barulho, luz, cheiro, espera",
          report: "o ambiente desregular ele, com barulho, luz, cheiro e espera" },
        { value: "sem-manejo", label: "Já encontrei dentista bom, mas nenhum sabe lidar com o comportamento",
          report: "encontrar dentistas bons, mas nenhum que saiba lidar com o comportamento dele" },
        { value: "medo-trauma", label: "Tenho medo de uma experiência ruim criar um trauma que dure anos",
          report: "o medo de uma experiência ruim virar um trauma que dure anos" },
      ],
    },
    {
      id: "implicacao",
      etapa: "Implicação",
      pergunta: "E como isso afeta vocês hoje?",
      options: [
        { value: "saude-de-lado", label: "A saúde bucal dele está sendo deixada de lado por falta de quem atenda",
          report: "a saúde bucal dele ficar em segundo plano por falta de quem atenda" },
        { value: "inseguros", label: "Cada tentativa frustrada deixa ele (e eu) mais inseguros",
          report: "cada tentativa frustrada deixar vocês dois mais inseguros" },
        { value: "gastei", label: "Já rodei vários consultórios e gastei sem resolver",
          report: "já ter rodado vários consultórios e gasto sem resolver" },
        { value: "improviso", label: "Vivo no improviso, sem um acompanhamento de verdade",
          report: "viver no improviso, sem um acompanhamento de verdade" },
      ],
    },
    {
      id: "necessidade",
      etapa: "O que já tentou",
      pergunta: "O que você já tentou para resolver isso?",
      options: [
        { value: "comum", label: "Levei em dentista comum, mas não soube fazer o manejo",
          report: "levar em dentista comum, que não soube fazer o manejo" },
        { value: "plano", label: "Tentei dentista de plano, mas indicaram sedação ou contenção como única saída",
          report: "tentar dentista de plano, que indicou sedação ou contenção como única saída" },
        { value: "adiei", label: "Adiei porque não achei ninguém de confiança na região",
          report: "adiar por não achar ninguém de confiança na região" },
        { value: "pesquisando", label: "Ainda não tentei, estou pesquisando agora",
          report: "começar a pesquisar agora por alguém de confiança" },
      ],
    },
    {
      id: "objetivo",
      etapa: "Objetivo",
      pergunta: "O que você mais deseja para a relação do seu filho com o dentista?",
      options: [
        { value: "sem-trauma", label: "Que ele consiga ser atendido sem trauma e sem contenção",
          report: "ser atendido sem trauma e sem contenção" },
        { value: "sozinho", label: "Que um dia ele entre sozinho e tranquilo na cadeira",
          report: "um dia entrar sozinho e tranquilo na cadeira" },
        { value: "referencia", label: "Ter um dentista de referência, que conhece ele e a rotina dele",
          report: "ter um dentista de referência, que conheça ele e a rotina dele" },
        { value: "acompanhamento", label: "Manter a saúde bucal em dia com acompanhamento contínuo",
          report: "manter a saúde bucal em dia com acompanhamento contínuo" },
      ],
    },
    {
      id: "perfil",
      etapa: "Perfil",
      pergunta: "Me conta um pouco sobre seu filho:",
      options: [
        { value: "autista", label: "Autista (com ou sem diagnóstico fechado)" },
        { value: "tdah", label: "TDAH / outra neurodivergência" },
        { value: "investigacao", label: "Em investigação / aguardando diagnóstico" },
        { value: "ansiosa", label: "Criança típica, mas muito ansiosa/medrosa com dentista" },
      ],
    },
    {
      id: "qualificacao",
      etapa: "Onde vocês ficam",
      pergunta: "De onde vocês são? Atendemos Governador Valadares e região.",
      options: [
        { value: "valadares", label: "Governador Valadares" },
        { value: "vizinha", label: "Cidade vizinha (até ~1h30 de Valadares)" },
        { value: "longe-ok", label: "Mais distante, mas o deslocamento não é problema pra nós" },
        { value: "outra", label: "Outra região", foraDeArea: true },
      ],
    },
  ],

  captura: {
    titulo: "Seu diagnóstico está pronto. 💛",
    subtitulo:
      "Pra onde enviamos? Deixe seu WhatsApp que a equipe da Dra. Sabrina te manda o diagnóstico do seu filho e os próximos passos, sem compromisso.",
    campos: [
      { id: "nomeResp", label: "Seu nome", type: "text", required: true, autocomplete: "name", placeholder: "Como podemos te chamar?" },
      { id: "whatsapp", label: "Seu WhatsApp (com DDD)", type: "tel", required: true, autocomplete: "tel", placeholder: "(33) 99999-9999", mask: "phone" },
      { id: "email", label: "Seu e-mail", type: "email", required: true, autocomplete: "email", placeholder: "voce@email.com" },
    ],
    cta: "Ver meu diagnóstico agora",
    privacidade: "🔒 Usamos seus dados só para te enviar o diagnóstico e o contato do consultório. Nada de spam.",
  },
};


const STORE_KEY = "siqueira_funil_inclusao";
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


if (!a._completedAt && !a.problema) {
  report.innerHTML = `
    <p class="eyebrow">Diagnóstico</p>
    <h2>Ainda não temos suas respostas</h2>
    <p class="lead">Parece que você chegou aqui sem fazer o teste. Leva ~2 minutos.</p>
    <div class="actions"><a class="btn btn-primary btn-block" href="index.html">Fazer o teste agora</a></div>`;
} else {
  const nome = esc((a.nomeResp || "").split(" ")[0]) || "tudo bem";
  const criancaRaw = (a.crianca || "").trim();
  const crianca = esc(criancaRaw ? criancaRaw.split(",")[0].trim() : "seu filho");
  const problema = frase("problema") || "as consultas odontológicas";
  const implicacao = frase("implicacao") || "a saúde bucal ficar em segundo plano";
  const tentativa = frase("necessidade") || "buscar uma solução";
  const objetivo = frase("objetivo") || "uma relação tranquila com o dentista";
  const foraDeArea = valor("qualificacao") === "outra";

  report.innerHTML = `
    <div class="report-head">
      <span class="selo">Diagnóstico personalizado</span>
      <h1>O caminho do sorriso ${criancaRaw ? "de " + crianca : "do seu filho"}</h1>
      <p class="hint">Elaborado com base nas suas respostas · ${new Date().toLocaleDateString("pt-BR")}</p>
    </div>

    <div class="etapa">
      <h3>Antes de tudo</h3>
      <p>Oi, ${nome}! Aqui é da equipe da Dra. Sabrina. 💛 Li com atenção tudo o que você
      respondeu sobre ${crianca}. E quero começar com uma coisa que talvez ninguém tenha te dito:
      <strong>o que vocês viveram nas consultas até aqui não foi culpa sua, nem dele.</strong></p>
    </div>

    <div class="etapa">
      <h3>O seu cenário hoje</h3>
      <p>Pelo que você me contou, a maior dificuldade tem sido <strong>${problema}</strong>.
      E isso vem custando caro: ${implicacao}. Você já chegou a ${tentativa}, e mesmo assim
      não resolveu. Esse padrão se repete em quase todas as famílias que chegam até a gente.
      E ele tem uma explicação.</p>
    </div>

    <div class="etapa">
      <h3>Por que não resolveu até agora</h3>
      <p>Existe uma diferença entre um <em>bom dentista</em> e um <em>dentista que sabe manejo</em>.
      A maioria é excelente tecnicamente, mas nunca estudou o comportamento da criança
      neurodivergente. Sem manejo, a única ferramenta que sobra é a contenção. E é aí que a
      consulta vira trauma. O problema nunca foi a capacidade técnica de quem atendeu ${crianca}.
      Foi a ausência de manejo.</p>
    </div>

    <div class="etapa">
      <h3>Dois caminhos lado a lado</h3>
      <div class="compare">
        <div class="col bad">
          <h4>Sem manejo</h4>
          <ul><li>Ambiente que desregula</li><li>Pressa</li><li>Contenção como saída</li><li>A criança sai pior do que entrou</li></ul>
        </div>
        <div class="col good">
          <h4>Com manejo (como fazemos aqui)</h4>
          <ul><li>Ambiente preparado</li><li>Tempo respeitado</li><li>Vínculo antes do procedimento</li><li>A criança colabora porque se sente segura</li></ul>
        </div>
      </div>
    </div>

    <div class="etapa">
      <h3>O que precisa acontecer com ${crianca}</h3>
      <p>O caminho começa do jeito certo: uma <strong>primeira consulta de vínculo</strong>, sem
      pressa de procedimento, construindo segurança no tempo dele. A partir daí, cada consulta
      fica melhor que a anterior. O que você deseja, <strong>${objetivo}</strong>, é totalmente
      possível. A gente faz isso todos os dias.</p>
    </div>

    <div class="etapa">
      <h3>Quem já viveu isso</h3>
      <div class="depo">
        <p style="margin:0 0 10px">"Dra. Sabrina, estou sem palavras. Nunca imaginei ver o Miguel sentado na cadeira do dentista, realizando um tratamento e até recebendo anestesia com tanta tranquilidade que avanço. Obrigada pela sua paciência, pelo carinho e pelo manejo tão humanizado. Hoje meu coração se encheu de alegria ao ver o Miguel conquistando algo que antes parecia impossível. Gratidão por todo o cuidado e acolhimento. Você faz a diferença na vida das nossas crianças e das nossas famílias."</p>
        <p style="margin:0;font-size:13px;opacity:.75">— Mãe do Miguel</p>
      </div>
      <div class="depo">
        <p style="margin:0 0 10px">"Você é sensacional! Quero deixar minha gratidão por todo acolhimento, desde a recepção até o atendimento. Dá pra ver o carinho em cada detalhe. Como mãe atípica, eu sei o quanto isso faz diferença. A gente se sente realmente acolhida. Parabéns a você e a toda equipe! Vocês merecem esse reconhecimento."</p>
        <p style="margin:0;font-size:13px;opacity:.75">— Mãe atípica, paciente do Instituto</p>
      </div>
      <p class="hint">O que essas histórias têm em comum: não mudou a criança. Mudou o atendimento.</p>
    </div>

    <div class="cta-box">
      <h2 style="margin-top:0">O próximo passo é simples, ${nome}</h2>
      <p>Agendar a avaliação de ${crianca} com a Dra. Sabrina. Sem contenção como primeira opção. No tempo dele.</p>
      ${foraDeArea ? '<p class="hint">Vi que vocês ficam um pouco mais longe, mas me chama mesmo assim que a gente vê o que é possível, tá?</p>' : ""}
      <div class="actions" style="justify-content:center">
        <button class="btn btn-primary" id="whatsapp-2">Quero agendar a avaliação</button>
      </div>
      <p class="clube">E se fizer sentido pra rotina de vocês, te apresento o <strong>Clubinho do Sorriso</strong>, nosso acompanhamento contínuo pensado pra famílias como a sua.</p>
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
