/* ============================================================
   DIAGNÓSTICO. Quiz B "Índice de Dependência" · Lucas Sobreiro.
   Entrega o número prometido no selo, depois os três fatores que mais
   pesaram, o reframe, os dois caminhos, o mecanismo, prova e CTA.
   Padrão de escrita: nunca usar travessão.
   ============================================================ */
const F = window.FLOW;
const STORE_KEY = F.config.storeKey;
const report = document.getElementById("report");

let a = {};
try { a = (JSON.parse(sessionStorage.getItem(STORE_KEY)) || {}).answers || {}; } catch (e) { a = {}; }

function opt(stepId) {
  const s = F.steps.find((x) => x.id === stepId);
  return (s && s.options.find((o) => o.value === a[stepId])) || null;
}
function rep(stepId) { const o = opt(stepId); return o ? o.report : ""; }
const primeiroNome = String(a.nomeResp || "").trim().split(/\s+/)[0] || "";

const QUALIFICACAO = (() => {
  if (a.faturamento === "ate15" || a.faturamento === "15a30") return "entrada";
  if (a.prontidao === "pontual" || a.prontidao === "pesquisando") return "nutrir";
  return "qualificado";
})();

/* ---------- o índice ---------- */
function calcularIndice() {
  let soma = 0, maximo = 0;
  F.steps.forEach((s) => {
    if (!s.peso) return;
    maximo += Math.max(...s.options.map((o) => Number(o.peso) || 0));
    const esc = s.options.find((o) => o.value === a[s.id]);
    if (esc) soma += Number(esc.peso) || 0;
  });
  return maximo ? Math.round((soma / maximo) * 100) : 0;
}
const IDD = calcularIndice();
const FAIXA = F.faixas.find((f) => IDD >= f.min) || F.faixas[F.faixas.length - 1];

/* Os três fatores que mais pesaram: ordena as perguntas de diagnóstico pelo
   peso que o lead marcou e devolve as três maiores, ignorando as zeradas. */
function topFatores() {
  return F.steps
    .filter((s) => s.peso)
    .map((s) => {
      const esc = s.options.find((o) => o.value === a[s.id]);
      return { fator: s.fator, pontos: esc ? Number(esc.peso) || 0 : 0, frase: esc ? esc.report : "" };
    })
    .filter((x) => x.pontos > 0)
    .sort((x, y) => y.pontos - x.pontos)
    .slice(0, 3);
}

function pixel(nome, dados) {
  try { if (typeof fbq === "function") fbq("track", nome, dados); } catch (e) {}
}

const CTA = {
  qualificado: {
    label: "Quero ler meu índice com o Lucas",
    texto: `O Lucas reserva 40 minutos por semana para ler índices como o seu e desenhar qual dos três
      pontos sai primeiro. Toque no botão aqui embaixo, que abre o WhatsApp com o seu índice já na
      mensagem, e a equipe devolve dois horários ainda hoje. Sem proposta e sem preparação.`,
  },
  nutrir: {
    label: "Quero entender como funciona",
    texto: `Pelo que você respondeu, faz sentido entender o processo antes de decidir qualquer coisa.
      Toque no botão aqui embaixo, que abre o WhatsApp com o seu índice já na mensagem, e a equipe do
      Lucas te explica como funciona, no seu tempo. Sem proposta e sem compromisso.`,
  },
  entrada: {
    label: "Falar com a equipe",
    texto: `Pelo que você respondeu, dá para baixar esse índice em algumas semanas mexendo em um ponto
      só, e faz mais sentido começar por aí. Toque no botão aqui embaixo e chame a equipe do Lucas no
      WhatsApp escrevendo "índice". Eles te mandam o passo a passo desse primeiro ponto, sem call e
      sem compromisso.`,
  },
}[QUALIFICACAO];

function botao(id) {
  return `<a class="cta-wpp" href="#" data-wpp id="${id}">${CTA.label}</a>`;
}

function montarRelatorio() {
  if (!a.ferias) {
    return `<h2>Ainda não temos suas respostas</h2>
      <p>Parece que esta página abriu direto, sem passar pelo diagnóstico.</p>
      <p><a class="cta-wpp" href="index.html">Fazer o diagnóstico</a></p>`;
  }

  const fatores = topFatores();
  const listaFatores = fatores.map((f, i) => `
    <div class="fator">
      <span class="pos">${i + 1}</span>
      <div>
        <p class="ft">${f.fator}</p>
        <p class="fd">Você marcou ${f.frase}.</p>
      </div>
    </div>`).join("");

  return `
    <span class="selo">Seu Índice de Dependência</span>
    <div class="idd-box">
      <span class="idd-num">${IDD}</span>
      <span class="idd-de">de 100</span>
      <p class="idd-faixa">${FAIXA.nome}</p>
    </div>
    <p class="lead">Em uma linha: ${FAIXA.resumo}.</p>

    <div class="etapa">
      <h3>O que esse número mede</h3>
      <p>Esse número mede uma coisa só: o quanto a clínica ainda precisa de você para faturar. Ele não
      tem relação com quantas horas você trabalha, e é aí que costuma surpreender. Quase todo dono de
      clínica com agenda cheia pontua alto aqui, e não por ter feito algo errado${primeiroNome ? ", " + primeiroNome : ""}:
      você construiu o negócio em cima da sua própria capacidade técnica, que era exatamente o ativo
      disponível no começo. O problema aparece depois, quando esse ativo vira o teto.</p>
      <p>${FAIXA.texto}</p>
    </div>

    <div class="etapa">
      <h3>Os três pontos que mais pesaram no seu índice</h3>
      ${listaFatores || "<p>Nenhum ponto crítico apareceu nas suas respostas.</p>"}
    </div>

    ${botao("cta-1")}

    <div class="etapa">
      <h3>O cenário da sua clínica hoje</h3>
      <p>Pelo que você contou, hoje o seu normal é ${rep("ferias")}, e o comercial da clínica funciona
      assim: ${rep("vendas")}. Na semana, o seu tempo é ${rep("tempo")}. Sobre processo, o caso é
      ${rep("processo")}, e a entrada de paciente novo é ${rep("aquisicao")}. Olhando doze meses para
      frente, o que mais te incomodaria é ${rep("implicacao")}, e o que você mais quer nos próximos
      seis meses é ${rep("objetivo")}.</p>
    </div>

    <div class="etapa">
      <h3>Por que isso não se resolveu até agora</h3>
      <p>Porque a saída óbvia sempre parece ser contratar, e contratar sem processo escrito só troca o
      gargalo de lugar: a pessoa nova passa a perguntar tudo para você, e a sua semana fica igual ou
      pior. Delegar sem critério escrito não é delegar, é dividir a mesma sobrecarga com mais gente.
      O que muda o índice é o critério sair da sua cabeça e virar algo que outra pessoa consegue seguir.</p>
    </div>

    <div class="etapa">
      <h3>Dois caminhos daqui para frente</h3>
      <div class="caminhos">
        <div class="caminho hoje">
          <h4>Seguir como está</h4>
          <p>O índice se mantém, o crescimento continua limitado pelas suas horas, e a saída que sobra
          é trabalhar mais. Essa saída tem teto, e o teto é a sua saúde.</p>
        </div>
        <div class="caminho novo">
          <h4>Baixar o índice</h4>
          <p>Cada ponto a menos devolve decisão para a clínica e tempo para você. O faturamento deixa
          de depender da sua presença e passa a depender do processo.</p>
        </div>
      </div>
    </div>

    <div class="etapa">
      <h3>Como o Método BIO trabalha</h3>
      <p>O método instala três coisas na clínica, nessa ordem, porque uma sustenta a outra.</p>
      <p><strong>Vendas.</strong> Processo e conversa de orçamento para a clínica converter sem depender
      de você estar na sala.</p>
      <p><strong>Produtividade.</strong> Gestão de tempo, delegação com critério e prioridade, que é o
      que tira o dono do operacional.</p>
      <p><strong>Autoliderança.</strong> Autoconhecimento e autogestão, que é o que sustenta soltar o
      controle sem sentir que a qualidade vai cair junto.</p>
    </div>

    ${botao("cta-2")}

    <div class="etapa">
      <h3>Quem já passou por isso</h3>
      <p>Donos de clínica e empresários que pararam de só trabalhar mais e foram na causa:</p>
      <div class="depo-gallery">
        <img class="depo-shot" src="depoimentos/01-paula-xavier-dentista.webp" loading="lazy" alt="Paula Xavier, dentista e sócia em clínica de radiologia: cresceu o faturamento da clínica e aumentou a remuneração pessoal em cerca de 50%, saindo do operacional." />
        <img class="depo-shot" src="depoimentos/05-endrigo-g.webp" loading="lazy" alt="Endrigo, consultoria: mais que dobrou o faturamento, reposicionou contrato e ticket e organizou a operação." />
        <img class="depo-shot" src="depoimentos/02-ana-paula.webp" loading="lazy" alt="Depoimento de cliente do Lucas Sobreiro sobre o resultado no negócio." />
        <img class="depo-shot" src="depoimentos/07-paula-l.webp" loading="lazy" alt="Depoimento de cliente do Lucas Sobreiro sobre o resultado no negócio." />
        <img class="depo-shot" src="depoimentos/08-marcia-c-2.webp" loading="lazy" alt="Depoimento de cliente do Lucas Sobreiro sobre o resultado no negócio." />
        <img class="depo-shot" src="depoimentos/09-alejandro-junho.webp" loading="lazy" alt="Depoimento de cliente do Lucas Sobreiro sobre a evolução no negócio." />
      </div>
    </div>

    <div class="autoridade">
      <div class="quem">
        <img class="foto" src="lucas-sobreiro.webp" width="92" height="92"
             alt="Lucas Sobreiro, mentor de evolução empresarial para donos de clínica." />
        <div>
          <p class="nome">Lucas Sobreiro</p>
          <p class="cargo">Mentoria de evolução empresarial</p>
        </div>
      </div>
      <p>Foram 22 anos no comercial do Banco do Brasil atendendo empresas de todo tipo, tempo suficiente
      para ver o padrão se repetir: negócio bom quebrando por falta de processo e negócio mediano
      crescendo por ter um. Quando saiu do banco para mentorar, escolheu o setor onde essa diferença é
      mais gritante, que é a saúde: profissionais excelentes na técnica que nunca aprenderam o negócio.</p>
      <div class="creds">
        <div class="cred"><span class="n">22 anos</span><span class="t">no comercial do Banco do Brasil</span></div>
        <div class="cred"><span class="n">5 anos</span><span class="t">mentorando empresários</span></div>
        <div class="cred"><span class="n">3 pilares</span><span class="t">Vendas, Produtividade e Autoliderança</span></div>
        <div class="cred"><span class="n">Saúde</span><span class="t">foco exclusivo hoje</span></div>
      </div>
    </div>

    <div class="cta-box">
      <h2 style="margin-top:0">O próximo passo${primeiroNome ? ", " + primeiroNome : ""}</h2>
      <p>${CTA.texto}</p>
      <div class="deepdive">
        <label for="dd">Se quiser, escreva em uma frase qual parte da clínica você mais gostaria de não precisar tocar. O Lucas lê antes da conversa.</label>
        <textarea id="dd" rows="2" placeholder="Opcional"></textarea>
      </div>
      ${botao("cta-3")}
    </div>`;
}

function prepararEntao(cb) {
  const box = document.getElementById("preparando");
  const foot = document.querySelector(".foot");
  const mostrar = () => {
    if (box) box.remove();
    report.hidden = false;
    if (foot) foot.hidden = false;
    cb();
  };
  if (!box) return mostrar();

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const dur = reduce ? 800 : 5000;
  const bar = document.getElementById("load-bar");
  const msgEl = document.getElementById("load-msg");
  const msgs = [
    "Lendo as suas respostas...",
    "Calculando o seu Índice de Dependência...",
    "Montando o seu diagnóstico personalizado...",
  ];
  let i = 0;
  msgEl.textContent = msgs[0];
  bar.style.transition = `width ${dur}ms linear`;
  requestAnimationFrame(() => { bar.style.width = "100%"; });
  const troca = setInterval(() => {
    i += 1;
    if (i < msgs.length) msgEl.textContent = msgs[i];
  }, dur / 3);
  setTimeout(() => { clearInterval(troca); mostrar(); }, dur + 350);
}

report.innerHTML = montarRelatorio();

if (a.ferias) {
  prepararEntao(() => {
    pixel("ViewContent", {
      content_name: "Diagnostico Indice de Dependencia",
      content_category: QUALIFICACAO,
      indice: IDD,
    });
  });
} else {
  const box = document.getElementById("preparando");
  if (box) box.remove();
  report.hidden = false;
  const foot = document.querySelector(".foot");
  if (foot) foot.hidden = false;
}

function montarUrlWpp() {
  const dd = document.getElementById("dd");
  const extra = dd && dd.value.trim() ? " " + dd.value.trim() : "";
  const msg = (F.marca.whatsappMsg || "")
    .replace("{nome}", primeiroNome)
    .replace("{indice}", String(IDD)) + extra;
  return `https://wa.me/${F.marca.whatsapp}?text=${encodeURIComponent(msg)}`;
}
document.addEventListener("click", (e) => {
  const link = e.target.closest && e.target.closest("a.cta-wpp[data-wpp]");
  if (!link) return;
  link.href = montarUrlWpp();
  link.target = "_blank";
  link.rel = "noopener";
  pixel("Contact", {
    content_name: "CTA WhatsApp diagnostico",
    content_category: QUALIFICACAO,
    indice: IDD,
  });
});
