const STORE_KEY = "delphis_diagnostico_autofoco";
const F = window.FLOW;
const report = document.getElementById("report");

function getState() { try { return JSON.parse(sessionStorage.getItem(STORE_KEY)) || {}; } catch (e) { return {}; } }
function opcao(stepId) {
  const step = F.steps.find(s => s.id === stepId);
  const val = (getState().answers || {})[stepId];
  return (step && step.options.find(o => o.value === val)) || null;
}
function frase(stepId) { const o = opcao(stepId); return (o && o.report) || ""; }
function esc(s) { return String(s == null ? "" : s).replace(/[<>&]/g, c => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c])); }

const a = getState().answers || {};

/* Foto do Delphis. Servida a partir do arquivo dele na pasta do Drive do cliente
   (2. Material Visual > Fotos). O mesmo arquivo está versionado aqui como
   delphis.jpg: quando o funil voltar a ser publicado com o binário junto, trocar
   esta constante por "delphis.jpg" e servir do próprio domínio. */
const FOTO_DELPHIS = "https://lh3.googleusercontent.com/d/1Jqg9HJGqP2dIfo8PKkdWhccJOfOCqZ94=s300";

/* Depoimentos em vídeo. Os arquivos estão na pasta do Drive do cliente
   (2. Material Visual > Depoimentos), subidos pelo próprio Delphis. O card mostra
   a miniatura e só carrega o player quando a pessoa toca, para não pesar a página. */
const DEPOIMENTOS = [
  {
    id: "1K_6TJbw0WqTJJeUuisFzrIfYuRpaZGEa",
    nome: "Rafa Brites",
    quem: "Apresentadora e escritora. Foi repórter do Mais Você e do SuperStar, na Globo, e hoje apresenta o Power Couple Brasil, na Record.",
  },
  {
    id: "17C4_Fr4dAlEVewVC-Lio13G6GdHmx6bA",
    nome: "Warley Santana",
    quem: "Ator, apresentador e ventríloquo. Repórter do Chega Mais, no SBT, e ex-CQC, na Band.",
  },
  {
    id: "1Ioqc-pWbHlz7GMJ7Lt57Gs3-br5-Mx2O",
    nome: "Gabriela Prioli",
    quem: "Advogada criminalista, professora e apresentadora. Ficou conhecida no O Grande Debate, da CNN Brasil, e hoje apresenta no GNT.",
  },
];

const CAMINHO = {
  "O Invisível": {
    resumo: "Você sabe muito, e isso não chega inteiro do outro lado.",
    texto: "O seu trabalho começa pela <strong>intenção</strong>. Você entrega informação, mas não entrega direção. Enquanto o que você diz não tiver um destino claro para quem ouve, vai continuar correto e esquecível. Não falta conteúdo: falta a mensagem chegar organizada em quem recebe.",
  },
  "O Travado": {
    resumo: "A decisão de falar não é sua. É do travamento.",
    texto: "O primeiro passo é a <strong>exposição controlada</strong>, não a coragem. Coragem não se decide, se constrói em dose certa e com orientação. É assim que a timidez sai do comando e para de escolher por você quando falar, quando aparecer e quando se posicionar.",
  },
  "O Personagem": {
    resumo: "Você aprendeu técnica e ela virou uma máscara.",
    texto: "Antes de qualquer coisa, é preciso <strong>desmontar o que você aprendeu</strong>. Você não precisa de mais técnica, precisa devolver a sua identidade para dentro da fala. Enquanto tiver um personagem para sustentar, sobra performance e falta presença.",
  },
  "O Correto": {
    resumo: "Você fala bem, não erra, e não marca.",
    texto: "Aqui não falta técnica, <strong>falta risco</strong>. Presença nasce quando aparece verdade, e verdade tem custo. É o trabalho mais rápido dos quatro e o que muda mais depressa a percepção de autoridade sobre você.",
  },
};

if (!a._completedAt && !a.padrao) {
  report.innerHTML = `
    <p class="eyebrow">Diagnóstico</p>
    <h2>Ainda não temos as suas respostas</h2>
    <p class="lead">Parece que você chegou aqui sem responder o diagnóstico. Leva 2 minutos.</p>
    <div class="actions"><a class="btn btn-primary btn-block" href="index.html">Fazer o diagnóstico agora</a></div>`;
} else {
  const primeiro = (a.nomeResp || "").trim().split(" ")[0] || "";
  const nome = esc(primeiro ? primeiro.charAt(0).toUpperCase() + primeiro.slice(1) : "");
  const abre = nome ? nome + ", o seu padrão é" : "O seu padrão é";
  const optPadrao = opcao("padrao");
  const padrao = (optPadrao && optPadrao.padrao) || "O Invisível";
  const caminho = CAMINHO[padrao] || CAMINHO["O Invisível"];

  const situacao = frase("situacao") || "as situações em que você precisa se comunicar";
  const repeticao = frase("problema") || "o travamento na hora de falar";
  const tempo = frase("tempo") || "há algum tempo";
  const custo = frase("custo") || "oportunidades";
  const tentativas = frase("tentativas") || "tentou resolver por conta própria";
  const objetivo = frase("objetivo") || "ser reconhecido pelo que sabe";

  const optProf = opcao("profissao");
  const optPront = opcao("prontidao");
  const qualificado = !!(optProf && optProf.qualifica) && !!(optPront && optPront.nivel === "alto");

  /* Botão de WhatsApp no meio da leitura. O rótulo muda conforme o lead se
     qualifica ou não, para não oferecer sessão estratégica a quem caiu na
     oferta de entrada. */
  const ctaMeio = (texto, rotuloQualificado, rotuloEntrada) => `
    <div class="cta-inline no-print">
      <p>${texto}</p>
      <button class="btn btn-primary zap" type="button">${qualificado ? rotuloQualificado : rotuloEntrada}</button>
    </div>`;

  report.innerHTML = `
    <div class="report-head">
      <span class="selo">Diagnóstico personalizado</span>
      <h1>${abre} <span class="gold">${padrao}</span></h1>
      <p class="hint">Elaborado a partir das suas respostas · ${new Date().toLocaleDateString("pt-BR")}</p>
    </div>

    <div class="etapa">
      <h3>O seu resultado</h3>
      <p><strong>${caminho.resumo}</strong> Isso não é um julgamento sobre você. É o nome do que se repete, e é o começo do fim dele.</p>
    </div>

    <div class="etapa">
      <h3>A leitura do seu cenário</h3>
      <p>Li as suas respostas com atenção. Vou ser direto com você, porque acho que é disso que você precisa agora, e não de mais uma frase bonita.</p>
      <p>Você me disse que a sua comunicação pesa mais em <strong>${situacao}</strong>, que o que mais se repete é <strong>${repeticao}</strong>, e que isso acontece <strong>${tempo}</strong>. Você marcou que já custou <strong>${custo}</strong>.</p>
      <p>Essa combinação é a assinatura do ${padrao}. E ela diz uma coisa importante: isso não fica parado. Cada ano que passa, a distância entre o que você sabe e o que os outros percebem aumenta um pouco.</p>
    </div>

    <div class="etapa">
      <h3>O espelho</h3>
      <p>Você é competente. Ninguém precisa te dizer isso: o seu trabalho diz. Você resolve o que os outros não resolvem, te procuram quando o assunto é difícil, e você entrega. Aí chega a hora de falar sobre isso, e parece que nada do que você é conta.</p>
      <ul class="mirror">
        <li>Você sai da reunião com a sensação de que não foi entendido, mesmo dominando o assunto.</li>
        <li>A pessoa menos preparada da sala foi a mais lembrada.</li>
        <li>Você dá branco justamente naquilo que sabe de cor.</li>
        <li>Você adia o vídeo, recusa o convite, deixa passar, e depois se cobra.</li>
        <li>No cafezinho você é ótimo. Diante da câmera some a naturalidade.</li>
      </ul>
      <p><strong>Não há nada de errado com você. Há um padrão em você.</strong> E padrão não se resolve com força de vontade, nem decorando mais uma estrutura, nem tentando de novo na próxima reunião.</p>
    </div>

    ${ctaMeio(
      "Se você se reconheceu aí em cima, isso já não é dúvida. É padrão, e padrão tem tratamento.",
      "Falar com o Delphis agora",
      "Falar com o Delphis agora")}

    <div class="etapa">
      <h3>Por que o que você já tentou não resolveu</h3>
      <p>Você marcou que ${tentativas}. Isso não foi desperdício: hoje você entende o próprio funcionamento melhor do que a maioria.</p>
      <p>Só que a técnica de oratória ensina você a se observar mais. Postura, gesto, entonação, texto decorado, tempo de pausa. Ela acrescenta itens à sua lista de vigilância, e o travamento nasce exatamente do excesso de vigilância sobre si mesmo.</p>
      <p><strong>É por isso que o branco aparece justamente no assunto que você mais domina.</strong> Não é falta de memória. É atenção no lugar errado.</p>
    </div>

    <div class="etapa">
      <h3>O mecanismo</h3>
      <p>A maioria ensina técnica: como se portar, como abrir os braços, como respirar, como decorar. Eu vou muito antes disso.</p>
      <p>Passei 40 anos em rádio, televisão, teatro, narração e dublagem, e 22 anos formando apresentadores no SENAC. O que eu aprendi nesse tempo é que dá para falar tecnicamente perfeito e não chegar em ninguém, e dá para falar de um jeito simples, sem truque nenhum, e a sala inteira parar.</p>
      <p>A diferença não está na boca. Está em <strong>para onde vai a sua atenção enquanto você fala</strong>. O Método AUTOFOCO ensina a tirar o foco de si na hora certa e devolver a atenção para a entrega. A técnica serve ao resultado, ela não aparece. E o objetivo não é te fazer parecer nada: é te fazer ser, e ser compreendido.</p>
    </div>

    <div class="etapa">
      <h3>O que precisa acontecer no seu caso</h3>
      <p>${caminho.texto}</p>
      <p>Você disse que, se destravasse, o que mudaria primeiro seria <strong>${objetivo}</strong>. É exatamente esse o alvo.</p>
      <p class="custo"><strong>O custo de continuar como está:</strong> não é só a oportunidade que não veio. É o ano que passa igual, o convite que você recusa em silêncio, e a distância entre o que você construiu e o que os outros enxergam continuando do tamanho que está.</p>
    </div>

    ${ctaMeio(
      "Esse custo só para de correr quando alguém olha o seu caso de perto.",
      "Quero minha sessão estratégica",
      "Quero saber por onde começar")}

    <div class="etapa">
      <h3>Quem conduz</h3>
      <div class="autor">
        <img class="autor-foto" src="${FOTO_DELPHIS}" width="104" height="104" decoding="async"
             referrerpolicy="no-referrer" alt="Delphis Fonseca"
             onerror="this.style.display='none'" />
        <div class="autor-nome">
          <strong>Delphis Fonseca</strong>
          <span>Mentor de comunicação, criador do Método AUTOFOCO</span>
        </div>
      </div>
      <p>Comunicação desde 1984: rádio na Jovem Pan, Antena 1, Gazeta, Transamérica e Band, jornalismo e apresentação na Rede Bandeirantes, narração de documentários ligados a Discovery, National Geographic, BBC e ID, dublagem para produções de Disney, Warner, Paramount, HBO e Netflix, além de teatro, cinema e carreira musical.</p>
      <p>Criador do <strong>primeiro curso de formação de apresentadores de TV do SENAC São Paulo</strong>, reconhecido pelo MEC, ministrado por 22 anos. <strong>Mais de 4.000 pessoas formadas</strong>, e a maior parte delas nunca quis ser apresentador: eram médicos, advogados, executivos, empresários e professores que precisavam ser compreendidos.</p>
      <p class="depos-titulo">Quem passou por aqui</p>
      <div class="depos">
        ${DEPOIMENTOS.map((d) => `
        <figure class="depo-card">
          <button class="depo-play" type="button" data-video="${d.id}" data-quem="${d.nome}"
                  aria-label="Assistir ao depoimento de ${d.nome}">
            <img src="https://drive.google.com/thumbnail?id=${d.id}&sz=w400" alt=""
                 referrerpolicy="no-referrer" loading="lazy" />
            <span class="depo-icone" aria-hidden="true">&#9654;</span>
          </button>
          <figcaption>
            <strong>${d.nome}</strong>
            <span>${d.quem}</span>
          </figcaption>
        </figure>`).join("")}
      </div>
    </div>

    ${ctaMeio(
      "São 40 anos de estrada e mais de 4.000 pessoas formadas. Falta a sua.",
      "Quero conversar com o Delphis",
      "Quero conversar com o Delphis")}

    <div class="etapa">
      <h3>Perguntas que sempre aparecem</h3>
      <p><strong>Isso é curso de oratória?</strong> Não. Oratória é uma parte da comunicação, e a menor delas. O trabalho aqui é sobre o que faz a sua mensagem chegar: presença, clareza, identidade e conexão.</p>
      <p><strong>Já fiz curso de oratória e não resolveu. Por que agora?</strong> Porque aquele curso trabalhou a sua fala, e o seu travamento não está na fala. Está em para onde vai a sua atenção enquanto você fala.</p>
      <p><strong>Eu sou muito tímido, tem jeito?</strong> Tem, e é a origem do método. Eu fui uma criança extremamente tímida e comecei no rádio justamente por não ser visto. O objetivo não é te transformar em outra pessoa, é tirar a timidez do comando.</p>
    </div>

    ${qualificado ? `
    <div class="cta-box">
      <h2 style="margin-top:0">O próximo passo${nome ? ", " + nome : ""}</h2>
      <p>Entre os estúdios, o palco e as mentorias em andamento, eu abro poucas sessões por semana. São 45 minutos, comigo, ao vivo, para olhar a sua comunicação de frente e nomear a origem do que se repete.</p>
      <p>O que sai dali: o nome do seu padrão, a origem provável dele e o caminho concreto para destravar. O que não é: não é aula, não é papo motivacional e não é apresentação de produto disfarçada. Se fizer sentido seguirmos juntos, eu te explico como. Se não fizer, você sai com a leitura mesmo assim.</p>
      <div class="actions" style="justify-content:center">
        <button class="btn btn-primary zap" type="button">Quero minha sessão estratégica</button>
      </div>
      <p class="hint" style="margin-top:14px">Você já esperou tempo demais para ser percebido pelo que sabe.</p>
    </div>` : `
    <div class="cta-box">
      <h2 style="margin-top:0">Por onde começar${nome ? ", " + nome : ""}</h2>
      <p>Se você quer começar agora, no seu ritmo e por conta própria, o <strong>Detonando a Timidez</strong> é o primeiro degrau prático do Método AUTOFOCO: aulas gravadas, exercícios e encontros ao vivo de bônus.</p>
      <p>Detonar a timidez não é deixar de ser tímido. É tirar a timidez do comando.</p>
      <div class="actions" style="justify-content:center">
        <button class="btn btn-primary zap" type="button">Quero saber como começar</button>
      </div>
      <p class="hint" style="margin-top:14px">Se preferir conversar antes, me chama no WhatsApp que eu te oriento.</p>
    </div>`}`;
}

function abrirWhatsApp(origem) {
  const nome = (a.nomeResp || "").split(" ")[0] || "";
  const optPadrao = opcao("padrao");
  const padrao = (optPadrao && optPadrao.padrao) || "";
  const optProf = opcao("profissao");
  const optPront = opcao("prontidao");
  const qualificado = !!(optProf && optProf.qualifica) && !!(optPront && optPront.nivel === "alto");
  /* Sinal de intencao para a Meta. A conversao da campanha continua sendo o Lead
     disparado no envio do quiz; aqui e so um evento custom para leitura interna.
     O `origem` diz qual dos botoes da pagina foi tocado. */
  try {
    if (typeof fbq === "function") fbq("trackCustom", "whatsapp_click", { padrao: padrao, origem: origem || "" });
  } catch (e) { }
  const modelo = qualificado ? F.marca.whatsappMsg : (F.marca.whatsappMsgEntrada || F.marca.whatsappMsg);
  const msg = (modelo || "").replace("{nome}", nome).replace("{padrao}", padrao);
  const url = `https://wa.me/${F.marca.whatsapp}?text=${encodeURIComponent(msg)}`;
  window.open(url, "_blank", "noopener");
}

/* Player dos depoimentos. O iframe do Drive só ganha src no toque e volta a
   about:blank ao fechar, senão o vídeo continua tocando por baixo. */
const modal = document.getElementById("video");
const frame = document.getElementById("video-frame");
const legendaVideo = document.getElementById("video-legenda");

function abrirVideo(id, nome) {
  const d = DEPOIMENTOS.find((x) => x.id === id);
  frame.src = `https://drive.google.com/file/d/${id}/preview`;
  legendaVideo.textContent = d ? d.nome + ". " + d.quem : nome;
  modal.hidden = false;
  document.body.style.overflow = "hidden";
  document.getElementById("video-fechar").focus();
  try { if (typeof fbq === "function") fbq("trackCustom", "depoimento_play", { quem: nome }); } catch (e) { }
}
function fecharVideo() {
  frame.src = "about:blank";
  modal.hidden = true;
  document.body.style.overflow = "";
}

/* Um só ouvinte para tudo que é clicável: os cinco botões de WhatsApp, os
   depoimentos e o fechar do player. */
document.addEventListener("click", (e) => {
  const play = e.target.closest && e.target.closest(".depo-play");
  if (play) { abrirVideo(play.dataset.video, play.dataset.quem); return; }
  if (e.target.closest && e.target.closest("#video-fechar")) { fecharVideo(); return; }
  if (modal && !modal.hidden && e.target === modal) { fecharVideo(); return; }
  const botao = e.target.closest && e.target.closest(".zap");
  if (!botao) return;
  const ctas = [...document.querySelectorAll(".zap")];
  abrirWhatsApp(botao.id === "whatsapp" ? "topo" : "leitura-" + (ctas.indexOf(botao) + 1));
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal && !modal.hidden) fecharVideo();
});
document.getElementById("pdf")?.addEventListener("click", () => window.print());
