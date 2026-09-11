/* ============================================================
   TESTE DE PONTA A PONTA, sem dependência externa.
   Usa o Chromium que já vem no ambiente e file://, então roda offline.

   node testar.js            responde o quiz inteiro e checa o diagnóstico

   RODE NA RAIZ DA PASTA, nunca dentro de dist/: no dist os <script src> são
   URLs absolutas dos projetos de asset e o Chromium daqui não alcança HTTPS,
   então tudo falha por falta de JS e não por defeito.
   node testar.js --shot     também salva um print da página de diagnóstico

   O que ele verifica:
   1. o quiz avança pelas 11 perguntas e pelos 3 intersticiais sem erro de JS
   2. a máscara de telefone sobrevive ao autofill do iPhone ("+55 11 ...")
   3. a página de diagnóstico monta para os cinco baldes
   4. nenhuma tela estoura a largura em 320px, 390px e 430px
   5. nenhuma opção nasce pré-selecionada, e as telas de carregamento têm botão
   6. rolar com o dedo sobre uma opção não seleciona (guarda de arrasto)

   Os arquivos temporários do teste ficam FORA da pasta do funil, para não
   subirem no deploy (publicação substitui a árvore inteira).
   ============================================================ */
const fs = require("fs"), os = require("os"), path = require("path");
const { execFileSync } = require("child_process");

const FUNIL = __dirname;
const TMP = fs.mkdtempSync(path.join(os.tmpdir(), "quiz-teste-"));
const CANDIDATOS = [
  "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
  "/usr/bin/chromium", "/usr/bin/chromium-browser", "/usr/bin/google-chrome",
];
const CHROME = CANDIDATOS.find((c) => fs.existsSync(c));
if (!CHROME) { console.error("Chromium não encontrado. Ajuste CANDIDATOS em testar.js."); process.exit(1); }

const BASE = ["--headless", "--disable-gpu", "--no-sandbox", "--hide-scrollbars",
              "--allow-file-access-from-files", "--force-device-scale-factor=1"];
function chrome(args) {
  return execFileSync(CHROME, BASE.concat(args), { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"], maxBuffer: 64e6 });
}
const dentro = (dom, id) => {
  const m = dom.match(new RegExp(`<pre id="${id}">([\\s\\S]*?)</pre>`));
  return m ? m[1].replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&") : "";
};

/* O harness do diagnóstico é gerado a partir do diagnostico.html REAL, com um
   único acréscimo: o stub de sessionStorage, porque file:// tem origem opaca e
   as respostas não sobrevivem à troca de página. Assim o teste enxerga
   exatamente o CSS e o HTML que vão ao ar. */
const STUB = `<script>
  const RESP = JSON.parse(new URLSearchParams(location.search).get("a") || "{}");
  Object.defineProperty(window, "sessionStorage", { value: {
    getItem: () => JSON.stringify({ answers: RESP }), setItem(){}, removeItem(){} } });
  </script>\n`;
fs.writeFileSync(path.join(TMP, "diag.html"),
  fs.readFileSync(path.join(FUNIL, "diagnostico.html"), "utf8")
    .replace('<script src="flow.js" defer></script>', STUB + '  <script src="flow.js" defer></script>')
    .replace(/(src|href)="(?!http)/g, `$1="${FUNIL}/`));

let falhas = 0;
const ok = (cond, msg) => { console.log((cond ? "  ok   " : "  FALHA") + "  " + msg); if (!cond) falhas++; };

/* ---------- 1. quiz de ponta a ponta ---------- */
fs.writeFileSync(path.join(TMP, "quiz.html"), `<!DOCTYPE html><meta charset="utf-8">
<pre id="log"></pre><iframe id="f" src="${FUNIL}/index.html" width="390" height="900"></iframe>
<script>
const log=(m)=>{document.getElementById("log").textContent+=m+"\\n"};
const f=document.getElementById("f"), ERROS=[];
f.addEventListener("load",()=>{
  const w=f.contentWindow,d=f.contentDocument;
  w.addEventListener("error",(e)=>ERROS.push(e.message));
  let n=0; const vistas=new Set();
  const t=setInterval(()=>{
    if(n>400){clearInterval(t);log("ERROS:"+(ERROS.join(" | ")||"nenhum"));return}
    n++;
    if(d.querySelector(".inter-card")){
      const tit=d.querySelector(".inter-titulo").textContent.trim();
      log("INTER "+tit);
      // clica o botao de avancar em vez de esperar a barra: testa o botao E
      // mantem a corrida curta. Se o botao disparasse duas vezes, uma tela
      // sumiria e a contagem de perguntas acusaria.
      const segue=d.querySelector(".inter-avancar");
      if(segue){log("BOTAO "+tit);segue.click();}
      return;
    }
    const opts=d.querySelectorAll(".opt"), form=d.querySelector("#form");
    if(opts.length){
      const q=d.querySelector("h2").textContent.trim();
      log("PERGUNTA "+q);
      if(!vistas.has(q)){vistas.add(q);
        log("PRESELECIONADAS "+d.querySelectorAll('.opt[aria-checked="true"]').length);}
      opts[n%opts.length].click(); return;
    }
    if(form&&!form.dataset.done){
      form.dataset.done="1";
      d.querySelector("#nomeResp").value="Marcos Vinicius Andrade";
      const tel=d.querySelector("#whatsapp");
      tel.value="+55 11 99991-2039";                       // autofill do iPhone
      tel.dispatchEvent(new w.Event("change",{bubbles:true}));
      log("TELEFONE "+tel.value);
      d.querySelector("#email").value="marcos@empresa.com.br";
      d.querySelector("#oquevende").value="consultoria de gestao";
      d.querySelector("#submit").click(); log("SUBMIT");
    }
  },250);
});
</script>`);
/* O teste avança as telas de carregamento PELO BOTÃO, não esperando a barra.
   Foi o que permitiu subir as durações para 20s, 20s e 30s sem que a corrida
   estourasse: esperar as três somaria 82 segundos só de espera.
   Duas travas cuidam do tempo: o teto de iterações do loop acima (400, a 250ms
   por volta) e o orçamento de tempo virtual abaixo. Se mexer em `duracao` no
   flow.js e o teste passar a falhar no item 1, é aqui que se olha, não no
   funil. */
const logQuiz = dentro(chrome(["--virtual-time-budget=300000", "--dump-dom", "file://" + path.join(TMP, "quiz.html")]), "log");
const perguntas = new Set(logQuiz.split("\n").filter((l) => l.startsWith("PERGUNTA")));
const inters = new Set(logQuiz.split("\n").filter((l) => l.startsWith("INTER")));
console.log("\n1. quiz de ponta a ponta");
ok(perguntas.size === 11, `11 perguntas na tela (achou ${perguntas.size})`);
ok(inters.size === 4, `3 intersticiais + a tela de carregamento (achou ${inters.size})`);
ok(logQuiz.includes("TELEFONE (11) 99991-2039"), "máscara tira o +55 do autofill sem perder dígito");
ok(logQuiz.includes("SUBMIT") && logQuiz.includes("INTER Preparando o seu diagnóstico"),
   "captura envia e cai na tela de carregamento antes do diagnóstico");
/* Por tela DISTINTA: o loop do harness repete o log enquanto a tela está no ar,
   então contar linhas contaria a mesma tela muitas vezes. */
const botoes = new Set(logQuiz.split("\n").filter((l) => l.startsWith("BOTAO"))).size;
ok(botoes === 4, `botão de avançar nas 4 telas de carregamento (achou ${botoes})`);
ok(!/PRESELECIONADAS [^0]/.test(logQuiz), "nenhuma opção nasce pré-selecionada");
ok(logQuiz.includes("ERROS:nenhum"), "nenhum erro de JS: " + (logQuiz.match(/ERROS:(.*)/) || [, "?"])[1]);

/* ---------- 2. diagnóstico nos cinco baldes ---------- */
const PERFIS = [
  ["Posição de Condutor", { origem: "time", perda: "falar_com", trava: "condutor", custo: "concorrente", tentativa: "closer", desafio: "condutor", objetivo: "time", estrutura: "time_completo", conta: "mais60", ticket: "acima50", urgencia: "marcada" }],
  ["Leitura de Perfil", { origem: "trafego", perda: "elogia", trava: "perfil", custo: "sem_entender", tentativa: "script", desafio: "perfil", objetivo: "converter", estrutura: "closer", conta: "30a60", ticket: "25a50", urgencia: "proxima_call" }],
  ["Camada do Lead", { origem: "indicacao_conteudo", perda: "vou_pensar", trava: "camada", custo: "agenda", tentativa: "trafego", desafio: "camada", objetivo: "auditar", estrutura: "agendador", conta: "15a30", ticket: "5a25", urgencia: "media" }],
  ["Empilhamento Desproporcional", { origem: "indicacao", perda: "sem_verba", trava: "empilhamento", custo: "desconto", tentativa: "treinamento", desafio: "empilhamento", objetivo: "estrutura", estrutura: "sozinho", conta: "menos8", ticket: "ate3", urgencia: "estudando" }],
  ["Consultoria Gratuita", { origem: "indicacao", perda: "elogia", trava: "carencia", custo: "agenda", tentativa: "script", desafio: "carencia", objetivo: "converter", estrutura: "sozinho", conta: "8a15", ticket: "3a5", urgencia: "media" }],
];
console.log("\n2. diagnóstico nos cinco baldes");
PERFIS.forEach(([esperado, resp]) => {
  const a = encodeURIComponent(JSON.stringify(Object.assign({ nomeResp: "Marcos Vinicius", oquevende: "consultoria", _completedAt: "x" }, resp)));
  const dom = chrome(["--force-prefers-reduced-motion", "--virtual-time-budget=5000", "--dump-dom",
                      `file://${path.join(TMP, "diag.html")}?a=${a}`]);
  const trava = (dom.match(/trava-nome">([^<]+)/) || [, "??"])[1];
  const conta = (dom.match(/id="conta-num"[^>]*>([^<]+)/) || [, "??"])[1];
  const iic = (dom.match(/id="iic-num"[^>]*>([^<]+)/) || [, "??"])[1];
  ok(trava === esperado, `${esperado.padEnd(28)} IIC ${iic.padStart(4)} · conta ${conta.replace(/\u00a0|&nbsp;/g, " ")}`);
  ok(!/\{\{|\{resposta\}|undefined|NaN|R\$ 0\b/.test(dom), `${esperado.padEnd(28)} sem variável vazada, NaN ou conta zerada`);
});

/* ---------- 3. largura em celular ---------- */
console.log("\n3. largura, sem rolagem horizontal");
[["index.html", ""], ["diag.html", "?a=" + encodeURIComponent(JSON.stringify(Object.assign({ nomeResp: "Marcos", _completedAt: "x" }, PERFIS[0][1])))]]
  .forEach(([pagina, query]) => {
    const src = pagina === "index.html" ? `${FUNIL}/index.html` : `${path.join(TMP, "diag.html")}${query}`;
    [320, 390, 430].forEach((W) => {
      const h = path.join(TMP, `w${W}-${pagina}.html`);
      fs.writeFileSync(h, `<!DOCTYPE html><meta charset="utf-8"><pre id="out"></pre>
<iframe id="f" src="${src}" width="${W}" height="900" style="border:0"></iframe>
<script>let tentativas=0;
const t=setInterval(()=>{
 tentativas++;
 const d=document.getElementById("f").contentDocument;
 if(!d||!d.body||!d.body.children.length){if(tentativas>40)clearInterval(t);return}
 if(tentativas<6)return;                        // deixa o JS da página montar
 clearInterval(t);
 const w=d.documentElement;
 const bad=[...d.querySelectorAll("*")].filter(e=>e.getBoundingClientRect().right>${W}+.5)
   .map(e=>e.tagName+"."+(e.className||"")).slice(0,4);
 document.getElementById("out").textContent=w.scrollWidth+"|"+w.clientWidth+"|"+(bad.join(", ")||"nenhum");
},200);</script>`);
      const out = dentro(chrome(["--force-prefers-reduced-motion", "--virtual-time-budget=6000", "--dump-dom", "file://" + h]), "out");
      const [sw, cw, bad] = out.split("|");
      ok(Number(sw) <= Number(cw) && bad === "nenhum", `${pagina.padEnd(11)} ${W}px  scrollWidth ${sw} <= clientWidth ${cw}  estouros: ${bad}`);
    });
  });

/* ---------- 4. rolar não pode selecionar ----------
   Regressão do bug achado no celular do cliente em 08/09: as opções ocupam
   quase a tela inteira, então todo gesto de rolagem termina em cima de uma
   delas e o navegador dispara `click` ao soltar. Sem a guarda de arrasto
   (motor.js > arrastou), rolar selecionava e o quiz avançava sozinho, o que do
   lado do lead aparece como "a tela desceu e não sobe".
   O teste encena os dois gestos: dedo que anda (rolagem) e dedo parado
   (toque). O primeiro não pode marcar nada, o segundo tem que marcar. */
console.log("\n4. rolar não seleciona, tocar seleciona");
{
  const h = path.join(TMP, "gesto.html");
  fs.writeFileSync(h, `<!DOCTYPE html><meta charset="utf-8"><pre id="out"></pre>
<iframe id="f" src="${FUNIL}/index.html" width="390" height="700" style="border:0"></iframe>
<script>let tentativas=0;
const t=setInterval(()=>{
 tentativas++;
 const d=document.getElementById("f").contentDocument;
 const w=document.getElementById("f").contentWindow;
 if(!d||!d.querySelector(".opt")){if(tentativas>40)clearInterval(t);return}
 if(tentativas<6)return;
 clearInterval(t);
 const marcadas=()=>d.querySelectorAll('.opt[aria-checked="true"]').length;
 const opt=d.querySelector(".opt");
 const r=opt.getBoundingClientRect();
 const cx=Math.round(r.left+r.width/2), cy=Math.round(r.top+r.height/2);
 const manda=(el,tipo,x,y)=>el.dispatchEvent(new w.MouseEvent(tipo,{bubbles:true,cancelable:true,clientX:x,clientY:y}));
 // gesto 1: dedo encosta e ARRASTA 180px antes de soltar em cima da opção
 manda(opt,"pointerdown",cx,cy+180);
 manda(opt,"click",cx,cy);
 const depoisDeRolar=marcadas();
 // gesto 2: dedo encosta e solta no mesmo lugar
 manda(opt,"pointerdown",cx,cy);
 manda(opt,"click",cx,cy);
 const depoisDeTocar=marcadas();
 document.getElementById("out").textContent=depoisDeRolar+"|"+depoisDeTocar;
},200);</script>`);
  const [rolou, tocou] = dentro(chrome(["--force-prefers-reduced-motion", "--virtual-time-budget=6000", "--dump-dom", "file://" + h]), "out").split("|");
  ok(rolou === "0", `arrastar o dedo sobre a opção não seleciona (marcadas: ${rolou})`);
  ok(tocou === "1", `tocar sem arrastar seleciona (marcadas: ${tocou})`);
}

/* ---------- print opcional ---------- */
if (process.argv.includes("--shot")) {
  const a = encodeURIComponent(JSON.stringify(Object.assign({ nomeResp: "Marcos Vinicius", oquevende: "consultoria", _completedAt: "x" }, PERFIS[1][1])));
  const alvo = path.join(TMP, "diagnostico.png");
  chrome(["--force-prefers-reduced-motion", "--window-size=390,11500", "--screenshot=" + alvo,
          "--virtual-time-budget=7000", `file://${path.join(TMP, "diag.html")}?a=${a}`]);
  console.log("\nprint salvo em " + alvo);
}

console.log("\n" + (falhas ? falhas + " FALHA(S)" : "tudo passou") + "\ntemporários em " + TMP);
process.exit(falhas ? 1 : 0);
