/* ============================================================
   DIAGNÓSTICO DO CICLO. Monta o relatório a partir das respostas do
   quiz (sessionStorage), nomeia o padrão, calcula o ICM e habilita os
   CTAs de WhatsApp distribuídos pela página.

   Segue o blueprint canônico da casa
   (.claude/skills/gerar-quiz-diag-pag-pos-quiz/references/estrutura-invisivel.md):
   cabeçalho com selo do índice, "antes de tudo", espelho do cenário,
   reframe, dois caminhos, método, próximo passo, CTAs distribuídos,
   bloco de autoridade e CTA final adaptado às 3 faixas.

   ⚠️ Sem preço, sem checkout e sem pré-agendamento pago. Um único
   destino: o WhatsApp. Decisão da call de 04/08.
   Padrão de escrita: nunca usar travessões (traço longo).
   ============================================================ */
const STORE_KEY = (window.FLOW.config && window.FLOW.config.storeKey) || "thaina_diagnostico_ciclo";
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
function opcao(stepId) {
  const step = F.steps.find(s => s.id === stepId);
  const val = (getState().answers || {})[stepId];
  return (step && step.options.find(o => o.value === val)) || null;
}
function esc(s) { return String(s == null ? "" : s).replace(/[<>&]/g, c => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c])); }

/* ICM, Índice do Ciclo da Migalha. Sai dos pesos (0 a 3) só das perguntas de
   diagnóstico: situação, gatilho, reação, implicação e tentativas. Tempo,
   objetivo e as duas porteiras (perfil e prontidão) não pontuam.
   Corte padrão da casa: ≥66% Alto, 33 a 65% Médio, abaixo disso Baixo.
   Observação honesta: este quiz não tem alternativa de "está tudo bem", então o
   piso real é ~53%. Na prática o ICM sai Alto ou Médio, nunca Baixo. */
function calcICM() {
  const a = getState().answers || {};
  let soma = 0, max = 0;
  ["situacao", "gatilho", "reacao", "implicacao", "tentativas"].forEach(id => {
    const step = F.steps.find(s => s.id === id);
    if (!step) return;
    max += Math.max(...step.options.map(o => o.peso || 0));
    const opt = step.options.find(o => o.value === a[id]);
    soma += (opt && opt.peso) || 0;
  });
  const pct = max ? Math.round((soma / max) * 100) : 0;
  let nivel = "Baixo", cor = "icm-baixo";
  if (pct >= 66) { nivel = "Alto"; cor = "icm-alto"; }
  else if (pct >= 33) { nivel = "Médio"; cor = "icm-medio"; }
  return { pct, nivel, cor };
}

/* Régua de qualificação. Mesma do app.js, repetida aqui porque o relatório é
   uma página separada e não carrega o app.js. */
function classificar(ans) {
  if (ans.perfil === "casada" && ans.situacao !== "sem-valor") return "fora";
  if (ans.prontidao === "depois") return "nutrir";
  if (ans.prontidao === "prioridade" || ans.prontidao === "se-funciona") return "fila-quente";
  return "qualificado";
}

const a = getState().answers || {};
const optReacao = opcao("reacao");
const padrao = (optReacao && optReacao.padrao) || "Ciclo da Migalha";

/* sem respostas? (abriu a página direto) */
if (!a._completedAt && !a.reacao) {
  report.innerHTML = `
    <p class="eyebrow">Diagnóstico do Ciclo</p>
    <h2>Ainda não temos as suas respostas</h2>
    <p class="lead">Parece que você chegou aqui sem responder o diagnóstico. Leva ~2 minutos.</p>
    <div class="actions"><a class="btn btn-primary btn-block" href="index.html">Fazer o diagnóstico agora</a></div>`;
} else {
  const nome = esc((a.nomeResp || "").split(" ")[0]);
  const saud = nome ? nome + ", " : "";
  const icm = calcICM();
  const padraoDesc = (optReacao && optReacao.padraoDesc) || "o ciclo se sustenta na busca por um alívio que vem de fora.";

  const situacao = frase("situacao") || "o que você está vivendo hoje";
  const gatilho = frase("gatilho") || "a incerteza";
  const reacao = frase("reacao") || "buscar alívio do jeito que aprendeu";
  const tempo = frase("tempo") || "um tempo";
  const implicacao = frase("implicacao") || "tudo continuar do mesmo jeito";
  const tentativa = frase("tentativas") || "buscar uma saída";
  const objetivo = frase("objetivo") || "parar de aceitar menos do que você quer";

  const classe = classificar(a);

  /* CTA final adaptado às 3 faixas. Ninguém leva porta na cara. */
  let ctaLabel, ctaExtra, fecho;
  if (classe === "fora") {
    ctaLabel = "Falar com a equipe no WhatsApp";
    ctaExtra = '<p class="hint">Pelo momento que você descreveu, o primeiro passo pode ser acompanhar o conteúdo do Thiago por um tempo. Se quiser conversar mesmo assim, é só chamar. Sem compromisso.</p>';
    fecho = "";
  } else if (classe === "nutrir") {
    ctaLabel = "Quero entender melhor como funciona";
    ctaExtra = '<p class="hint">Sem compromisso e no seu tempo. A equipe te explica como funciona a Sessão Mapa do Ciclo e responde o que você quiser perguntar.</p>';
    fecho = '<p class="fecho">Quando fizer sentido para você, o primeiro passo é a <strong>Sessão Mapa do Ciclo</strong>: uma hora individual com o Thiago para desenhar o seu ciclo e definir a direção dos próximos 30 dias.</p>';
  } else {
    ctaLabel = "Quero entender o meu ciclo completo";
    ctaExtra = '<p class="hint">Fale com a nossa equipe no WhatsApp. A gente te explica como funciona a sessão, tira as suas dúvidas e vê se faz sentido para o seu momento. Sem compromisso.</p>';
    fecho = '<p class="fecho">A agenda do Thiago é limitada por semana, porque cada sessão é individual e preparada antes.</p>';
  }
  /* CTA reutilizável, distribuído pela página (ela clica quando se sentir
     pronta). Mínimo 3 no total: depois dos dois caminhos, depois do método e no
     fim. Quem se convenceu no meio não precisa rolar até o fim. */
  const ctaInline = (texto) => `
    <div class="cta-inline">
      <button class="btn btn-primary cta-wpp">${ctaLabel}</button>
      <p class="hint">${texto}</p>
    </div>`;

  report.innerHTML = `
    <div class="report-head">
      <span class="selo">Diagnóstico do Ciclo</span>
      <h1>O seu padrão tem nome</h1>
      <div class="padrao-badge">
        <span class="padrao-nome">${esc(padrao)}</span>
        <span class="padrao-elo">Elo dominante: a reação</span>
      </div>
      <div class="icm-badge ${icm.cor}">
        <span class="icm-num">${icm.pct}%</span>
        <span class="icm-label">ICM ${icm.nivel}</span>
      </div>
      <p class="icm-exp"><strong>ICM, Índice do Ciclo da Migalha:</strong> mede o quanto o seu ciclo está ativo hoje, a partir de cinco das suas respostas.</p>
      <p class="hint">Elaborado com base nas suas respostas · ${new Date().toLocaleDateString("pt-BR")}</p>
    </div>

    <div class="etapa">
      <h3>Antes de tudo</h3>
      <p>${saud}li com atenção tudo o que você respondeu. E quero começar por uma coisa que talvez
      ninguém tenha te dito: <strong>o que você vive não é burrice, não é carência e não é falta de
      sorte.</strong> É um mecanismo, e mecanismo tem como desmontar.</p>
    </div>

    <div class="etapa">
      <h3>O seu resultado</h3>
      <p>Pelas suas respostas, o que dispara o seu ciclo é <strong>${gatilho}</strong>, e a forma como
      você busca alívio é <strong>${reacao}</strong>. É daí que vem o nome: <strong>${esc(padrao)}</strong>,
      onde ${padraoDesc}</p>
      <p>Continue lendo: em dois minutos você vai entender exatamente por que a mesma história se repete.</p>
    </div>

    <div class="etapa">
      <h3>O que isso já custou</h3>
      <p>Você provavelmente já viveu isso mais de uma vez. Começa intenso, ele fala do futuro nas primeiras
      semanas, e de repente as respostas ficam mornas. Você pergunta o que está acontecendo, ele diz que está
      corrido. Você dá espaço. Ele volta com um "oi sumida", e aquele mínimo de atenção acalma por dois dias.</p>
      <p>E tem a parte que ninguém conta para as amigas: a conversa relida três vezes procurando onde deu
      errado. O celular na mão de madrugada. A mensagem longa escrita e apagada antes de enviar.</p>
      <p>Você resolveu a sua vida inteira. Construiu carreira, se sustenta, é a referência que as amigas
      procuram quando precisam de conselho. Só essa parte não obedece.</p>
      <p><strong>E o tempo é o preço.</strong> Você descreveu ${situacao}, e disse que esse padrão se repete
      há ${tempo}. Cada ciclo desses leva meses. Alguns levam anos. Quando perguntamos como seria a sua vida
      amorosa daqui a dois anos sem nada mudar, a sua resposta foi <strong>${implicacao}</strong>. É esse
      pensamento que quase ninguém fala em voz alta.</p>
    </div>

    <div class="etapa">
      <h3>Você viu um elo. O seu ciclo tem cinco.</h3>
      <p>O que prende uma mulher inteligente numa história que ela mesma sabe que não leva a lugar nenhum
      não é falta de inteligência. É um mecanismo, e ele funciona assim:</p>
      <ol class="elos">
        <li><strong>O gatilho.</strong> Uma incerteza dispara: a demora, o esfriamento, a frase ambígua.
          <span class="seu">No seu caso: ${gatilho}.</span></li>
        <li><strong>A reação.</strong> Você busca alívio do jeito que aprendeu.
          <span class="seu">No seu caso: ${reacao}.</span></li>
        <li><strong>A migalha.</strong> Ele devolve o mínimo. Uma resposta, um elogio, um convite de última hora.</li>
        <li><strong>O alívio.</strong> Acalma. E o seu cérebro registra: funcionou.</li>
        <li><strong>O elo que sustenta.</strong> É aqui que o seu ciclo se prende com mais força. E é aqui
          que a mudança precisa começar. <span class="seu">Este é o elo que a sessão localiza.</span></li>
      </ol>
      <p>O detalhe que muda tudo: <strong>cada mulher tem um elo dominante diferente</strong>. É por isso que
      conselho genérico não funciona no seu caso. Enquanto a intervenção mira no elo errado, o ciclo continua
      girando, com ele ou com o próximo.</p>
      <div class="compare">
        <div class="col bad">
          <h4>O ciclo girando</h4>
          <ul><li>Cada gatilho pega de surpresa</li><li>A reação vem no automático</li><li>O alívio dura horas</li><li>A história se repete na próxima relação</li></ul>
        </div>
        <div class="col good">
          <h4>O ciclo mapeado</h4>
          <ul><li>Você reconhece o gatilho quando ele chega</li><li>Sabe o que fazer e o que não fazer</li><li>A ansiedade passa sem depender dele</li><li>A escolha volta a ser sua</li></ul>
        </div>
      </div>
    </div>

    ${ctaInline("Se você já entendeu o seu padrão, não precisa rolar até o fim.")}

    <div class="etapa">
      <h3>Por que o que você tentou não funcionou</h3>
      <p>Você contou que já chegou a <strong>${tentativa}</strong>, e mesmo assim o padrão voltou. Existe um
      motivo para isso.</p>
      <p>Se você já tentou despertar sua energia feminina, virar a mulher de alto valor ou aprender a se
      fazer de difícil para ele correr atrás, repare no que todas essas estratégias têm em comum:
      <strong>todas miram na reação dele</strong>. E o que sustenta o ciclo não está nele.</p>
      <p>Pior: algumas dessas técnicas <strong>alimentam o ciclo</strong>. Fingir indiferença para ele vir
      atrás é, na prática, mais uma forma de esperar a migalha. Muda a roupa, mantém o mecanismo.</p>
      <p>Terapia ajuda, e muito, mas trabalha em outro tempo e em outro lugar. O que quase ninguém te
      ofereceu foi o mapa: o desenho do seu ciclo específico, com o ponto exato onde intervir.
      <strong>Não é falta de esforço seu; é a causa que não foi endereçada.</strong></p>
    </div>

    <div class="etapa">
      <h3>O método e o que acontece na sessão</h3>
      <p><strong>O Método Mulher que Escolhe</strong> tem quatro etapas:</p>
      <ol class="metodo">
        <li><strong>Regulação:</strong> atravessar a ansiedade sem buscar alívio nele.</li>
        <li><strong>Reconstrução:</strong> autoestima e suficiência.</li>
        <li><strong>Clareza:</strong> o que você realmente quer.</li>
        <li><strong>Escolha:</strong> critérios, limites e seleção consciente.</li>
      </ol>
      <p>O primeiro passo é uma <strong>Sessão Mapa do Ciclo</strong>: 60 minutos individuais e ao vivo com o
      Thiago. Antes dela você responde um formulário curto, e ele chega tendo estudado o seu caso, então a
      hora inteira é sua.</p>
      <p><strong>Nessa hora, você sai com:</strong></p>
      <ul class="entrega">
        <li>o seu <strong>Mapa do Ciclo</strong> preenchido, com os cinco elos e o que sustenta o seu</li>
        <li>a <strong>direção dos próximos 30 dias</strong>: o que fazer e o que parar de fazer no próximo gatilho</li>
        <li>o mapa por escrito em uma página e a <strong>gravação da conversa</strong>, para rever quando a ansiedade bater</li>
      </ul>
      <p>Em uma frase: você entra confusa e com culpa, e sai com mapa, direção e um caminho possível. O que
      você disse querer, <strong>${objetivo}</strong>, começa por aí. E não começa por ele: começa por você.</p>
    </div>

    ${ctaInline("A equipe responde no WhatsApp e explica como funciona.")}

    <div class="etapa">
      <h3>Para quem é e para quem não é</h3>
      <div class="compare">
        <div class="col good">
          <h4>É para você se</h4>
          <ul>
            <li>já tentou de tudo e percebe que o padrão se repete</li>
            <li>quer entender a raiz, não decorar mais uma técnica de conquista</li>
            <li>está disposta a olhar a sua própria parte na história, sem culpa</li>
          </ul>
        </div>
        <div class="col bad">
          <h4>Não é para você se</h4>
          <ul>
            <li>quer aprender a manipular ou a fazer ele voltar</li>
            <li>procura acompanhamento terapêutico de longo prazo</li>
            <li>espera que alguém resolva no seu lugar</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="etapa">
      <h3>Perguntas que sempre aparecem</h3>
      <details class="faq"><summary>Uma hora resolve mesmo?</summary>
        <p>A sessão não trata, ela localiza. Direção não exige tratamento, exige saber onde você está. As
        situações que parecem únicas se repetem num padrão mapeável, e é ele que a gente desenha na hora.</p></details>
      <details class="faq"><summary>Isso é terapia?</summary>
        <p>Não. Terapia trata e acompanha ao longo do tempo, e é valiosa. Aqui é diagnóstico e direção
        prática sobre a sua vida amorosa, com um olhar masculino que a terapia não te dá.</p></details>
      <details class="faq"><summary>É mais um curso de feminilidade?</summary>
        <p>Não. Não vamos falar em despertar energia para atrair. Vamos olhar o ciclo que faz você aceitar
        menos, e as técnicas de conquista costumam ser parte do que mantém ele girando.</p></details>
      <details class="faq"><summary>Preciso falar da minha vida com um estranho?</summary>
        <p>Você fala o que quiser. A sessão é gravada só para você, e o Thiago já chega tendo lido o seu
        contexto.</p></details>
      <details class="faq"><summary>E se eu não estiver pronta agora?</summary>
        <p>Chama no WhatsApp mesmo assim. A conversa não tem compromisso, e você sai dela sabendo mais sobre
        o seu caso do que entrou.</p></details>
    </div>

    <div class="etapa">
      <h3>Quem é o Thiago</h3>
      <div class="autor">
        <img class="autor-foto" src="thiago.webp" alt="Thiago Vitório" width="104" height="104" />
        <div>
          <span class="autor-nome">THIAGO VITÓRIO</span>
          <span class="autor-cargo">Orientador de pessoas em colapso</span>
          <span class="autor-handle">@thiagorvitorio</span>
        </div>
      </div>
      <p>Empresário e orientador de pessoas em colapso emocional.</p>
      <p class="autor-fala">"Passei pelos meus próprios colapsos, nas três frentes que mais importam:
      profissional, pessoal e familiar. Não saí deles com fórmula pronta. Saí enxergando o padrão que mantém
      alguém preso, e sabendo devolver direção quando tudo parece sem saída."</p>
      <p>Nos atendimentos que ele faz, o padrão que mais aparece é esse: uma mulher inteligente, que dá conta
      de todas as áreas da vida, mas que diante do sumiço de um homem volta a aceitar o que jurou que não
      aceitaria. <strong>Não por fraqueza: porque na hora da crise, a ansiedade decide antes dela.</strong></p>
      <p>É por isso que ele ocupa um lugar diferente de quase todo conselho que você recebe. Não está
      tentando te conquistar e não está defendendo os homens: é um homem dizendo, sem julgamento e sem passar
      a mão na sua cabeça, o que costuma acontecer do outro lado.</p>
    </div>

    <div class="cta-box">
      <h2 style="margin-top:0">O próximo passo${nome ? ", " + nome : ""}</h2>
      <p>Você já sabe o nome do seu padrão. Falta o mapa inteiro.</p>
      ${ctaExtra}
      <div class="actions" style="justify-content:center">
        <button class="btn btn-primary cta-wpp">${ctaLabel}</button>
      </div>
      ${fecho}
      <p class="fecho">A conversa é discreta e fica só entre nós.</p>
    </div>`;
}

/* ---------- WhatsApp (CTAs distribuídos) ---------- */
const WPP_OK = /^\d{12,13}$/.test(String(F.marca.whatsapp || ""));
function abrirWhatsApp() {
  if (!WPP_OK) {
    console.warn("[SETUP] Número de WhatsApp não configurado em flow.js -> marca.whatsapp");
    return;
  }
  const nome = (a.nomeResp || "").split(" ")[0] || "";
  const msg = (F.marca.whatsappMsg || "")
    .replace("{nome}", nome)
    .replace("{padrao}", padrao);
  const url = `https://wa.me/${F.marca.whatsapp}?text=${encodeURIComponent(msg)}`;
  window.open(url, "_blank", "noopener");
}
// qualquer CTA com a classe .cta-wpp (distribuídos pela página) abre o WhatsApp
document.addEventListener("click", (e) => {
  if (e.target.closest && e.target.closest(".cta-wpp")) abrirWhatsApp();
});

/* Aviso de configuração pendente. Some sozinho assim que o número entrar em
   flow.js. Serve para ninguém publicar com os CTAs mudos. */
if (!WPP_OK) {
  const warn = document.createElement("div");
  warn.className = "setup-warn";
  warn.textContent = "Configuração pendente: preencha o WhatsApp em flow.js (marca.whatsapp) antes de publicar.";
  report.prepend(warn);
}
