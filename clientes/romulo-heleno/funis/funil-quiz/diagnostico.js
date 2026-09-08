/* ============================================================
   DIAGNÓSTICO. Carta de vendas personalizada a partir das respostas.
   Ordem dos blocos conforme o blueprint da Simple (versão Luana Isse):
   0 cabeçalho e selo do índice · 1 antes de tudo · 2 seu cenário ·
   3 por que não resolveu · 4 dois profissionais · CTA · 5 o método ·
   6 o que precisa acontecer · CTA · 7 quem é o Rômulo (autoridade) ·
   7b trabalhos reais + CTA · 8 depoimentos (VAZIO, ver DEPOIMENTOS) ·
   9 CTA final adaptado à qualificação.
   Padrão: nunca usar travessões. Sem emoji. Linguagem neutra em gênero.
   ============================================================ */
const STORE_KEY = "romulo_heleno_quiz";
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

function calcularIndice(answers) {
  let soma = 0, max = 0;
  F.steps.forEach((s) => {
    const pontua = s.options.some((o) => typeof o.peso === "number");
    if (!pontua) return;
    max += Math.max(...s.options.map((o) => o.peso || 0));
    const escolhida = s.options.find((o) => o.value === answers[s.id]);
    if (escolhida && typeof escolhida.peso === "number") soma += escolhida.peso;
  });
  const pct = max ? Math.round((soma / max) * 100) : 0;
  return { pct, faixa: pct >= 66 ? "Alto" : (pct >= 33 ? "Médio" : "Baixo") };
}
function pilarDominante(answers) {
  const s = F.steps.find((x) => x.id === "problema");
  const o = s && s.options.find((op) => op.value === answers.problema);
  return (o && o.pilar) || "Execução";
}

/* Leitura por pilar: o que precisa acontecer no caso de quem respondeu.
   O "caminho" de cada um sai da recomendação por gargalo do documento de
   estratégia (bloco 7 do relatório), não é invenção nova. */
const LEITURA_PILAR = {
  Leitura: {
    resumo: "o seu improviso está concentrado na <strong>Leitura</strong>: a mão já faz, e a cor ainda é decidida no escuro.",
    caminho: "O primeiro trabalho é leitura de fio e construção de base: entender o que aquele cabelo já tem antes de decidir o que fazer nele. Enquanto a tonalidade for aposta, cada cliente vira um resultado diferente. Não é a sua mão que está errada, é a informação que falta antes de você começar.",
  },
  Execução: {
    resumo: "o seu improviso está concentrado na <strong>Execução</strong>: você sabe aonde quer chegar, e o caminho até lá muda a cada atendimento.",
    caminho: "O primeiro trabalho é padronizar divisão, folha e timing por tipo de fio, com o tempo calibrado pelo cabelo e não pelo relógio. É isso que transforma um resultado bom em um resultado que se repete, e é o que separa acertar de saber por que acertou.",
  },
  Adaptação: {
    resumo: "o seu improviso está concentrado na <strong>Adaptação</strong>: você tem uma receita, e o cabelo que senta na cadeira nem sempre é o cabelo da receita.",
    caminho: "O primeiro trabalho é o banco de fichas técnicas: parâmetros por textura, histórico e objetivo. Você para de improvisar justamente quando o cabelo foge do padrão, porque passa a ter de onde partir em vez de decidir na hora.",
  },
  Posicionamento: {
    resumo: "o seu improviso está concentrado no <strong>Posicionamento</strong>: a técnica já está de pé, e o preço ainda é o de quem está começando.",
    caminho: "O primeiro trabalho é consistência documentada: registrar o que você faz, provar o resultado e sustentar o ticket. Ninguém cobra como especialista antes de conseguir repetir o resultado e mostrar isso. Preço acompanha previsibilidade, não tempo de profissão.",
  },
};

/* ============================================================
   DEPOIMENTOS
   Vazio de propósito. O cliente ainda NÃO tem case com autorização: o
   documento de estratégia marca isso como o risco número um do projeto
   ("Risco = sem prova social. Prioridade: coletar depoimentos dos primeiros
   alunos"), e o próprio Carlos levantou na call de 29/06.
   Não invente depoimento e não coloque placeholder no ar. Quando chegarem os
   primeiros, preencha aqui (com autorização de quem aparece) e o bloco passa a
   renderizar sozinho. Formato de vídeo, print ou texto: copie a implementação
   do funil da Luana Isse, que já tem os três.
   ============================================================ */
const DEPOIMENTOS = [];

/* ============================================================
   TRABALHOS (prova visual)
   Fotos reais de mecha feita pelo Rômulo, enviadas por ele em 27/08 com
   autorização de uso das clientes que aparecem.
   ATENÇÃO: isto NÃO é depoimento. Prova a técnica dele, não o resultado de
   aluno. Enquanto DEPOIMENTOS estiver vazio, o relatório fecha na autoridade
   dele mais estas fotos, e nenhuma frase da página pode sugerir que são
   resultados de alunos da mentoria.
   Ele mandou 10 fotos; entraram as 6 em que a mecha aparece. As outras 4
   (cabelo preto, cacheado sem iluminado e uma selfie antiga em baixa
   resolução) ficam em contexto/marca/fotos-trabalhos-originais/ e não foram
   publicadas: numa página que acabou de dizer "o seu problema é a mecha",
   foto sem mecha derruba o bloco inteiro.
   O alt descreve o cabelo, não a pessoa.
   ============================================================ */
const TRABALHOS = [
  { src: "fotos/trabalho-1.jpg", alt: "Mechas em cabelo castanho escuro, com iluminado dourado desenhado no comprimento" },
  { src: "fotos/trabalho-2.jpg", alt: "Mechas loiras com raiz esfumada, em cabelo de ondas longas" },
  { src: "fotos/trabalho-3.jpg", alt: "Mechas em tom mel e caramelo, com movimento do meio às pontas" },
  { src: "fotos/trabalho-4.jpg", alt: "Loiro iluminado com transição suave da raiz, em cabelo longo" },
  { src: "fotos/trabalho-5.jpg", alt: "Mechas acobreadas em cabelo cacheado longo" },
  { src: "fotos/trabalho-6.jpg", alt: "Mechas em cabelo escuro vistas de perfil, mostrando a distribuição da luz" },
];

/* 6 fotos de propósito: divide certinho por 2 (celular) e por 3 (desktop),
   então nenhuma das duas grades fica com buraco na última linha. Se acrescentar
   foto, mantenha o total múltiplo de 6 pelo mesmo motivo.
   As fotos ficam entre dois botões (o de "o que precisa acontecer agora" vem
   logo acima, e o da própria galeria logo abaixo): quem se convence olhando
   não precisa rolar até o fim para agir. */
const blocoTrabalhos = TRABALHOS.length ? `
    <div class="etapa">
      <h3>Mechas feitas por ele</h3>
      <p class="trabalhos-nota">Trabalhos do próprio Rômulo, publicados com autorização das clientes que aparecem.</p>
      <div class="galeria">${TRABALHOS.map(t => `
        <img class="galeria-foto" src="${t.src}" alt="${esc(t.alt)}" width="720" height="900" loading="lazy" decoding="async" />`).join("")}
      </div>
    </div>` : "";

if (!a._completedAt && !a.problema) {
  report.innerHTML = `
    <p class="eyebrow">Seu diagnóstico</p>
    <h2>Ainda não temos as suas respostas</h2>
    <p class="lead">Parece que você chegou aqui sem responder o diagnóstico. Leva cerca de 2 minutos.</p>
    <div class="actions"><a class="btn btn-primary btn-block" href="index.html">Fazer agora</a></div>`;
} else {
  const nome = esc((a.nomeResp || "").split(" ")[0]) || "tudo bem";
  const situacao = frase("situacao") || "o seu momento atual";
  const problema = frase("problema") || "o que mais te trava ao fazer mechas";
  const tempo = frase("tempo") || "um tempo";
  const impacto = frase("impacto") || "seguir no mesmo ponto";
  const tentativa = frase("necessidade") || "buscar uma saída";
  const objetivo = frase("objetivo") || "fazer mechas sem medo de errar";
  const perfil = frase("perfil") || "";

  const indice = calcularIndice(a);
  const pilar = pilarDominante(a);
  const leitura = LEITURA_PILAR[pilar];

  const faixaClasse = indice.faixa === "Alto" ? "alto" : (indice.faixa === "Médio" ? "medio" : "baixo");
  const resultado = (F.resultados && F.resultados[pilar]) || "Mão boa, método nenhum";

  /* Mesma regra do app.js. Quatro faixas para o atendimento, três CTAs na
     página: fila-quente e qualificado veem o mesmo botão. O corte de caixa é
     o ticket praticado na mecha, nunca faturamento. */
  const stepTicket = F.steps.find((s) => s.id === "ticket");
  const optTicket = stepTicket && stepTicket.options.find((o) => o.value === a.ticket);
  const ticketBom = ["200a400", "400a700", "acima700"].indexOf(a.ticket) > -1;
  const nivel = (optTicket && optTicket.fora) ? "fora"
    : ((a.prontidao === "depois" || a.prontidao === "pesquisando") ? "nutrir"
      : ((a.prontidao === "sim" && ticketBom && indice.pct >= 66) ? "fila-quente" : "qualificado"));

  let ctaLabel, ctaExtra, fecho;
  if (nivel === "qualificado" || nivel === "fila-quente") {
    ctaLabel = "Quero agendar minha sessão estratégica";
    ctaExtra = '<p class="hint">São poucos horários por semana, porque cada sessão é preparada antes, em cima do seu diagnóstico.</p>';
    fecho = '<p class="fecho">Na sessão, o Rômulo olha o seu caso, aponta o gargalo com nome e desenha o próximo passo. Você sai com clareza, decida ou não seguir.</p>';
  } else if (nivel === "nutrir") {
    ctaLabel = "Quero entender melhor como funciona";
    ctaExtra = '<p class="hint">Sem compromisso e no seu tempo. O Rômulo te explica o caminho e o que faz sentido para o seu momento.</p>';
    fecho = '<p class="fecho">Não existe hora errada para entender o que está travando a sua técnica. A decisão vem depois, quando fizer sentido para você.</p>';
  } else {
    ctaLabel = "Falar com o Rômulo no WhatsApp";
    ctaExtra = '<p class="hint">Ele te indica por onde começar no seu momento, mesmo que a mentoria ainda não seja o passo agora.</p>';
    fecho = '<p class="fecho">Comece pela base. O caminho existe, e ele tem ordem.</p>';
  }
  const ctaInline = `<div class="cta-inline"><button class="btn btn-primary cta-wpp">${ctaLabel}</button></div>`;

  const blocoDepoimentos = DEPOIMENTOS.length ? `
    <div class="etapa">
      <h3>Quem já fez esse caminho</h3>
      ${DEPOIMENTOS.map(d => `
        <div class="dep"><p>${d.texto}</p><span class="quem">${d.quem}</span></div>`).join("")}
    </div>` : "";

  report.innerHTML = `
    <div class="report-head">
      <span class="selo">Diagnóstico das Mechas</span>
      <h1>O seu ${(F.config && F.config.indice && F.config.indice.nome) || "índice"}</h1>
      <div class="resultado">${resultado}</div>
      <div class="indice ${faixaClasse}">
        <div class="indice-num">${indice.pct}%</div>
        <div class="indice-txt">Improviso ${indice.faixa}<span>quanto do seu resultado ainda depende de sorte em vez de método</span></div>
      </div>
      <p class="hint">Calculado a partir das suas respostas em ${new Date().toLocaleDateString("pt-BR")}</p>
    </div>

    <div class="etapa">
      <h3>Antes de tudo</h3>
      <p>Oi, ${nome}. Li com atenção tudo o que você respondeu, e quero começar por uma coisa que talvez ninguém tenha te dito:
      <strong>o que trava as suas mechas não é falta de talento, nem falta de esforço.</strong>
      Tem explicação, tem nome, e tem caminho.</p>
    </div>

    <div class="etapa">
      <h3>O seu cenário hoje</h3>
      <p>Pelo que você me contou, o seu momento é de <strong>${situacao}</strong>, e o que mais pesa é
      <strong>${problema}</strong>. Isso já dura <strong>${tempo}</strong>, e a tendência, se nada mudar,
      é <strong>${impacto}</strong>.${perfil ? ` Você também se descreveu como alguém que vive <strong>${perfil}</strong>.` : ""}</p>
      <p>Esse padrão se repete em quase todo profissional que chega até aqui. E ele tem um nome.</p>
    </div>

    <div class="etapa">
      <h3>Por que não mudou até agora</h3>
      <p>Você já chegou a <strong>${tentativa}</strong>, e mesmo assim a segurança não veio.
      Faz sentido: todas essas saídas entregam informação, e o que trava um profissional nas mechas não é falta de informação.</p>
      <p>O nome disso é <strong>improviso</strong>: a distância entre o que você faz e o que você consegue repetir de propósito.
      Curso gravado te mostra como fazer. Não corrige o que você está fazendo de errado, porque foi gravado para mil pessoas
      e não enxerga a sua folha, o seu timing, a sua divisão. Você pode assistir quarenta horas de conteúdo e continuar
      repetindo o mesmo erro, porque o erro é seu, é específico, e ninguém está olhando para ele.</p>
      <p>No seu caso, ${leitura.resumo}</p>
    </div>

    <div class="etapa">
      <h3>Dois profissionais, e a diferença entre eles</h3>
      <div class="compare">
        <div class="col bad">
          <h4>Quem fez curso</h4>
          <ul><li>Assistiu horas de conteúdo</li><li>Repete o que viu, sem saber por quê</li><li>Erra e não sabe onde errou</li><li>Segue cobrando o preço da tabela</li></ul>
        </div>
        <div class="col good">
          <h4>Quem foi corrigido</h4>
          <ul><li>Talvez saiba exatamente o mesmo</li><li>Teve alguém olhando o próprio trabalho</li><li>Sabe o que mudar, e por quê</li><li>Repete o resultado e sustenta o ticket</li></ul>
        </div>
      </div>
      <p class="hint">A diferença entre os dois não é talento. É prática corrigida, e isso se constrói.</p>
    </div>

    ${ctaInline}

    <div class="etapa">
      <h3>Como o método funciona</h3>
      <p>O <strong>Método Cabelo de Segunda</strong> existe para tirar o improviso do seu atendimento. São cinco frentes, ao mesmo tempo:</p>
      <ol class="metodo">
        <li><strong>Sessão semanal individual:</strong> uma hora por semana, no Meet, para revisar o que você fez. Não é aula, é correção.</li>
        <li><strong>Correção dos seus vídeos:</strong> você grava o atendimento no salão, manda, e recebe o que errou e o que mudar. Isso não existe em curso nenhum.</li>
        <li><strong>Banco de fichas técnicas:</strong> os parâmetros certos por tipo de cabelo, textura e objetivo. Você para de improvisar e começa a replicar.</li>
        <li><strong>Suporte no WhatsApp:</strong> a dúvida que aparece na véspera do atendimento difícil não espera a próxima sessão.</li>
        <li><strong>Aulas com convidados:</strong> parceiros que já palestraram no evento do Rômulo entram com live ou cedem aula das próprias mentorias, para você ver o mesmo problema resolvido por mais de uma cabeça.</li>
      </ol>
      <p class="hint">Domínio técnico não vem de mais conteúdo. Vem de prática corrigida, toda semana, no seu próprio trabalho.</p>
    </div>

    <div class="etapa">
      <h3>O que precisa acontecer agora</h3>
      <p>${leitura.caminho}</p>
      <p>O que você quer, <strong>${objetivo}</strong>, é totalmente possível. O primeiro passo é uma
      <strong>sessão estratégica</strong>: trinta minutos, individual, em que o Rômulo lê o seu caso e desenha o
      próximo passo. Não é apresentação de produto.</p>
    </div>

    ${ctaInline}

    <div class="etapa">
      <h3>Quem é o Rômulo Heleno</h3>
      <div class="autor">
        <img class="autor-foto" src="logo.svg" alt="" width="96" height="96" loading="lazy" />
        <div>
          <span class="autor-nome">RÔMULO HELENO</span>
          <span class="autor-cargo">Especialista em técnica de mechas · ex-técnico de marca</span>
        </div>
      </div>
      <p>Antes de mentorar, o Rômulo era o profissional que as marcas contratam para treinar equipe de salão. Passou
      2024 dentro de dezenas de salões, olhando o trabalho de outros profissionais e apontando o que corrigir, ao vivo,
      na cadeira. É de lá que vem o método: ele conhece os erros mais comuns das mechas porque passou anos corrigindo
      cada um deles em gente que já estava atendendo.</p>
      <p class="autor-fala"><span class="rot">A tese que sustenta o método</span>
      Quem não domina as mechas não tem um problema de técnica. Tem um problema de método. E método não se aprende em
      vídeo: se corrige na cadeira.</p>
    </div>

    ${blocoTrabalhos}

    ${ctaInline}

    ${blocoDepoimentos}

    <div class="cta-box">
      <h2 style="margin-top:0">O próximo passo, ${nome}</h2>
      <p>Dar o primeiro passo é simples, e no seu tempo.</p>
      ${ctaExtra}
      <div class="actions" style="justify-content:center">
        <button class="btn btn-primary cta-wpp">${ctaLabel}</button>
      </div>
      ${fecho}
    </div>

    <p class="rodape-nota">Este resultado é uma leitura inicial a partir das suas respostas, não um diagnóstico técnico completo. A sessão estratégica é o passo que aprofunda o seu caso.</p>`;
}

/* ---------- WhatsApp: um handler para todos os CTAs distribuídos ----------
   Trava: se o número estiver vazio ou inválido, os CTAs não abrem nada e a
   página mostra um aviso no topo. Evita publicar com botão mudo e só descobrir
   depois que o tráfego já rodou. */
function numeroValido() {
  const n = String((F.marca && F.marca.whatsapp) || "");
  return /^[0-9]{12,13}$/.test(n);
}

function abrirWhatsApp() {
  if (!numeroValido()) {
    console.warn("[funil] WhatsApp não configurado em flow.js > marca.whatsapp");
    return;
  }
  const indice = calcularIndice(a);
  const pilar = pilarDominante(a);
  const msg = (F.marca.whatsappMsg || "")
    .replace("{nome}", (a.nomeResp || "").split(" ")[0] || "")
    .replace("{resultado}", (F.resultados && F.resultados[pilar]) || "")
    .replace("{indice}", indice.pct + "%")
    .replace("{faixa}", indice.faixa.toLowerCase())
    .replace("{pilar}", pilar);
  window.open(`https://wa.me/${F.marca.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
}

document.addEventListener("click", (e) => {
  if (e.target.closest && e.target.closest(".cta-wpp")) abrirWhatsApp();
});

if (!numeroValido()) {
  const aviso = document.createElement("p");
  aviso.className = "aviso";
  aviso.textContent = "Configuração pendente: o WhatsApp comercial não está preenchido em flow.js, então os botões não abrem conversa. Preencha marca.whatsapp antes de mandar tráfego.";
  report.prepend(aviso);
}
