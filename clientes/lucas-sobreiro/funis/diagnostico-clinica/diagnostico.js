/* ============================================================
   DIAGNÓSTICO. Quiz A "O Vazamento" · Lucas Sobreiro.
   Não é resultado de quiz, é carta de vendas personalizada:
   espelho do cenário, reframe, dois caminhos, mecanismo, prova, CTA.
   Padrão de escrita: nunca usar travessão.
   ============================================================ */
const F = window.FLOW;
const STORE_KEY = F.config.storeKey;
const report = document.getElementById("report");

let a = {};
try { a = (JSON.parse(sessionStorage.getItem(STORE_KEY)) || {}).answers || {}; } catch (e) { a = {}; }

/* ---------- helpers ---------- */
function opt(stepId) {
  const s = F.steps.find((x) => x.id === stepId);
  return (s && s.options.find((o) => o.value === a[stepId])) || null;
}
function rep(stepId) { const o = opt(stepId); return o ? o.report : ""; }
const primeiroNome = String(a.nomeResp || "").trim().split(/\s+/)[0] || "";

const QUALIFICACAO = (() => {
  if (a.faturamento === "ate15" || a.faturamento === "15a30") return "entrada";
  return "qualificado";
})();

const bucket = (opt("problema") || {}).bucket || "balcao";
const V = F.vazamentos[bucket] || F.vazamentos.balcao;

function pixel(nome, dados) {
  try { if (typeof fbq === "function") fbq("track", nome, dados); } catch (e) {}
}
function brl(n) {
  return "R$ " + Math.round(n).toLocaleString("pt-BR");
}

/* A conta em reais sai SÓ dos números que o próprio lead informou:
   a faixa de faturamento e a taxa de fechamento que ele marcou. Não existe
   benchmark de mercado embutido aqui, e a premissa aparece escrita na tela. */
function montarConta() {
  const fat = opt("faturamento");
  const fech = opt("fechamento");
  if (!fat || !fech) return "";
  if (fech.taxa === null) {
    return `
      <div class="conta">
        <span class="valor">Ainda não dá para calcular</span>
        <p>Você marcou que a clínica não acompanha quantos orçamentos viram tratamento, e essa é a
        resposta mais cara do diagnóstico. Sem esse número ninguém sabe se o problema é o preço,
        o atendimento ou o retorno, então as tentativas de correção viram tentativa e erro.</p>
        <p class="obs">Medir a taxa de fechamento é o primeiro movimento, e leva uma semana.</p>
      </div>`;
  }
  const base = fat.base;
  const ganhoMax = base * (0.10 / fech.taxa);
  const ganhoMin = ganhoMax * 0.5;
  return `
    <div class="conta">
      <span class="valor">${brl(ganhoMin)} a ${brl(ganhoMax)} por mês</span>
      <p>É o que representa fechar <strong>um orçamento a mais em cada dez</strong> na sua clínica,
      mantendo exatamente o mesmo volume de pacientes que você já atende hoje. Nenhum paciente novo
      entra nessa conta.</p>
      <p class="obs">Estimativa feita com a faixa de faturamento e a taxa de fechamento que você
      informou. O número exato sai na sessão, com os seus dados reais na tela.</p>
    </div>`;
}

/* ---------- CTA por faixa. Ninguém leva porta na cara. ---------- */
const CTA = {
  qualificado: {
    label: "Quero a sessão estratégica",
    texto: `O próximo passo é uma sessão estratégica de 40 minutos com o Lucas, onde ele abre com você
      a conta desse vazamento e desenha o processo que fecha essa porta na sua clínica. Toque no botão
      aqui embaixo, que abre o WhatsApp com a mensagem já escrita, e a equipe devolve dois horários
      ainda hoje. Não é apresentação de proposta e você não precisa preparar nada.`,
  },
  nutrir: {
    label: "Quero entender como funciona",
    texto: `Pelo que você respondeu, faz sentido entender o processo antes de decidir qualquer coisa,
      e isso é exatamente o que essa conversa resolve. Toque no botão aqui embaixo, que abre o WhatsApp
      com a mensagem já escrita, e a equipe do Lucas te explica como funciona, no seu tempo.
      Sem proposta e sem compromisso.`,
  },
  entrada: {
    label: "Falar com a equipe",
    texto: `Pelo que você respondeu, o seu momento pede um ajuste pontual antes de um processo completo,
      e isso é uma boa notícia, porque sai mais rápido e custa menos. Toque no botão aqui embaixo e chame
      a equipe do Lucas no WhatsApp escrevendo "vazamento". Eles te mandam o material que resolve esse
      ponto específico, sem call e sem compromisso.`,
  },
}[QUALIFICACAO];

function botao(id) {
  return `<a class="cta-wpp" href="#" data-wpp id="${id}">${CTA.label}</a>`;
}

/* ---------- o relatório ---------- */
function montarRelatorio() {
  if (!a.problema) {
    return `<h2>Ainda não temos suas respostas</h2>
      <p>Parece que esta página abriu direto, sem passar pelo diagnóstico.</p>
      <p><a class="cta-wpp" href="index.html">Fazer o diagnóstico</a></p>`;
  }

  return `
    <span class="selo">Seu vazamento principal</span>
    <h1 class="vaza-nome">${V.nome}</h1>
    <p class="lead">Em uma linha: ${V.resumo}.</p>

    ${montarConta()}

    <div class="etapa">
      <h3>Antes de tudo</h3>
      <p>O que apareceu aqui não tem relação com competência clínica${primeiroNome ? ", " + primeiroNome : ""}.
      Você estudou anos para dominar a técnica, e a técnica está funcionando, porque o paciente chega,
      é bem atendido e elogia. O que ninguém ensinou foi o que fazer entre o elogio e a assinatura do
      orçamento, e é exatamente nesse espaço que o dinheiro escapa.</p>
    </div>

    <div class="etapa">
      <h3>O cenário da sua clínica hoje</h3>
      <p>Pelo que você contou, hoje o normal na sua clínica é ${rep("problema")}. Quem conduz a conversa
      de tratamento é o seguinte: ${rep("conduz")}. Quando o paciente diz que vai pensar, o padrão é
      ${rep("followup")}, e sobre a tabela de preços, o seu caso é ${rep("preco")}. Se nada mudar nos
      próximos doze meses, o que mais te incomoda é ${rep("implicacao")}.</p>
    </div>

    <div class="etapa">
      <h3>Por que isso não se resolveu até agora</h3>
      <p>${V.porque}</p>
      <p>E tem um detalhe que explica muita coisa: você já tentou ${rep("tentativas")}. Não funcionou
      porque nenhuma dessas frentes mexe no ponto onde o dinheiro está saindo. Tráfego traz mais gente
      para um balcão que já não fecha o que recebe. Curso ensina técnica para quem já é bom de técnica.
      Contratar adiciona custo fixo a uma operação que ainda não converte o que tem.</p>
    </div>

    ${botao("cta-1")}

    <div class="etapa">
      <h3>Dois caminhos daqui para frente</h3>
      <div class="caminhos">
        <div class="caminho hoje">
          <h4>Seguir como está</h4>
          <p>O vazamento continua aberto, o mês fecha parecido com o anterior, e a saída que sobra é
          trabalhar mais horas. Essa saída tem teto, e o teto é a sua saúde.</p>
        </div>
        <div class="caminho novo">
          <h4>Fechar a porta</h4>
          <p>O mesmo volume de pacientes passa a render mais, porque a clínica para de perder no meio
          do caminho o que já conquistou na cadeira. Nada aqui depende de paciente novo.</p>
        </div>
      </div>
    </div>

    <div class="etapa">
      <h3>Como o Método BIO trabalha</h3>
      <p>O método instala três coisas na clínica, nessa ordem, porque uma sustenta a outra.</p>
      <p><strong>Vendas.</strong> Processo e conversa de orçamento para a clínica conduzir e converter,
      seja você quem conduz, seja quem está no atendimento.</p>
      <p><strong>Produtividade.</strong> Gestão de tempo, delegação e prioridade, para o dono sair do
      operacional e voltar a decidir com agenda de dono.</p>
      <p><strong>Autoliderança.</strong> Autoconhecimento e autogestão, que é o que sustenta cobrar o
      próprio preço e crescer sem culpa.</p>
    </div>

    <div class="etapa">
      <h3>O que precisa acontecer agora</h3>
      <p>${V.primeiro} Esse é o primeiro movimento no seu caso específico, e ele vem antes de qualquer
      investimento em marketing.</p>
    </div>

    ${botao("cta-2")}

    <div class="etapa">
      <h3>Quem já passou por isso</h3>
      <p>Donos de clínica e empresários que pararam de só trabalhar mais e foram na causa:</p>
      <div class="depo-gallery">
        <img class="depo-shot" src="depoimentos/01-paula-xavier-dentista.webp" loading="lazy" alt="Paula Xavier, dentista e sócia em clínica de radiologia: cresceu o faturamento da clínica e aumentou a remuneração pessoal em cerca de 50%, saindo do operacional." />
        <img class="depo-shot" src="depoimentos/05-endrigo-g.webp" loading="lazy" alt="Endrigo, consultoria: mais que dobrou o faturamento, reposicionou contrato e ticket e organizou a operação." />
        <img class="depo-shot" src="depoimentos/03-carlos-eduardo.webp" loading="lazy" alt="Depoimento de cliente do Lucas Sobreiro sobre o resultado no negócio." />
        <img class="depo-shot" src="depoimentos/04-marcia-c-1.webp" loading="lazy" alt="Depoimento de cliente do Lucas Sobreiro sobre o resultado no negócio." />
        <img class="depo-shot" src="depoimentos/06-alejandro-b.webp" loading="lazy" alt="Depoimento de cliente do Lucas Sobreiro sobre o resultado no negócio." />
        <img class="depo-shot" src="depoimentos/09-alejandro-junho.webp" loading="lazy" alt="Depoimento de cliente do Lucas Sobreiro sobre a evolução no negócio." />
      </div>
    </div>

    <div class="autoridade">
      <div class="quem">
        <img class="foto" src="lucas-sobreiro.webp" width="440" height="528" loading="lazy"
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
      ${botao("cta-3")}
    </div>`;
}

/* ---------- tela de preparação: 5 segundos ----------
   Três mensagens, as duas primeiras genéricas e a terceira nomeando a entrega.
   A barra enche de ponta a ponta. Quem tem "reduzir movimento" ligado no
   sistema passa quase direto. */
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
    "Cruzando o seu cenário com os quatro vazamentos...",
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

/* ---------- render ---------- */
report.innerHTML = montarRelatorio();

if (a.problema) {
  prepararEntao(() => {
    /* ViewContent sai quando o relatório aparece na tela, não quando a página
       carrega: durante os 5 segundos ainda não há nada para ver. */
    pixel("ViewContent", {
      content_name: "Diagnostico O Vazamento",
      content_category: QUALIFICACAO,
      vazamento: bucket,
    });
  });
} else {
  const box = document.getElementById("preparando");
  if (box) box.remove();
  report.hidden = false;
  const foot = document.querySelector(".foot");
  if (foot) foot.hidden = false;
}

/* ---------- WhatsApp ----------
   Link de verdade, montado no clique para levar junto o vazamento e a frase
   que o lead escreveu. Sem window.open: dentro do navegador do Instagram ele
   falha calado, e este é o último toque antes da conversa. */
function montarUrlWpp() {
  const msg = (F.marca.whatsappMsg || "")
    .replace("{nome}", primeiroNome)
    .replace("{vazamento}", V.nome);
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
    vazamento: bucket,
  });
});
