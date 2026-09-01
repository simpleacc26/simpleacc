/* ============================================================
   TESTE DE PONTA A PONTA, sem dependência externa.
   Usa o Chromium que já vem no ambiente e file://, então roda offline.

   node testar.js            responde o quiz inteiro e checa o diagnóstico
   node testar.js --shot     também salva um print da página de diagnóstico

   O que ele verifica:
   1. o quiz avança pelas 9 perguntas e pelos 3 intersticiais sem erro de JS
   2. a máscara de telefone sobrevive ao autofill do iPhone ("+55 11 ...")
   3. a página de diagnóstico monta para os quatro perfis de trava
   4. nenhuma tela estoura a largura em 320px, 390px e 430px
   5. nenhuma opção nasce pré-selecionada

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
    if(n>70){clearInterval(t);log("ERROS:"+(ERROS.join(" | ")||"nenhum"));return}
    n++;
    if(d.querySelector(".inter-card")){log("INTER "+d.querySelector(".inter-titulo").textContent.trim());return}
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
const logQuiz = dentro(chrome(["--virtual-time-budget=30000", "--dump-dom", "file://" + path.join(TMP, "quiz.html")]), "log");
const perguntas = new Set(logQuiz.split("\n").filter((l) => l.startsWith("PERGUNTA")));
const inters = new Set(logQuiz.split("\n").filter((l) => l.startsWith("INTER")));
console.log("\n1. quiz de ponta a ponta");
ok(perguntas.size === 9, `9 perguntas na tela (achou ${perguntas.size})`);
ok(inters.size === 4, `3 intersticiais + a tela de carregamento (achou ${inters.size})`);
ok(logQuiz.includes("TELEFONE (11) 99991-2039"), "máscara tira o +55 do autofill sem perder dígito");
ok(logQuiz.includes("SUBMIT") && logQuiz.includes("INTER Preparando o seu diagnóstico"),
   "captura envia e cai na tela de carregamento antes do diagnóstico");
ok(!/PRESELECIONADAS [^0]/.test(logQuiz), "nenhuma opção nasce pré-selecionada");
ok(logQuiz.includes("ERROS:nenhum"), "nenhum erro de JS: " + (logQuiz.match(/ERROS:(.*)/) || [, "?"])[1]);

/* ---------- 2. diagnóstico nos quatro perfis ---------- */
const PERFIS = [
  ["Alarme Primal", { origem: "time", perda: "vou_pensar", trava: "alarme", custo: "sem_entender", tentativa: "trafego", objetivo: "time", estrutura: "time_completo", conta: "15a30_3", ticket: "acima25" }],
  ["Diagnóstico Raso", { origem: "trafego", perda: "elogia", trava: "diagnostico", custo: "concorrente", tentativa: "closer", objetivo: "converter", estrutura: "closer", conta: "15a30_2", ticket: "5a25" }],
  ["Perda de Posição", { origem: "indicacao_conteudo", perda: "proposta", trava: "posicao", custo: "agenda", tentativa: "treinamento", objetivo: "auditar", estrutura: "agendador", conta: "8a15", ticket: "3a5" }],
  ["Prescrição Sem Âncora", { origem: "indicacao", perda: "condicao", trava: "ancora", custo: "desconto", tentativa: "script", objetivo: "estrutura", estrutura: "sozinho", conta: "menos8", ticket: "ate3" }],
];
console.log("\n2. diagnóstico nos quatro perfis de trava");
PERFIS.forEach(([esperado, resp]) => {
  const a = encodeURIComponent(JSON.stringify(Object.assign({ nomeResp: "Marcos Vinicius", oquevende: "consultoria", _completedAt: "x" }, resp)));
  const dom = chrome(["--force-prefers-reduced-motion", "--virtual-time-budget=5000", "--dump-dom",
                      `file://${path.join(TMP, "diag.html")}?a=${a}`]);
  const trava = (dom.match(/trava-nome">([^<]+)/) || [, "??"])[1];
  const conta = (dom.match(/id="conta-num"[^>]*>([^<]+)/) || [, "??"])[1];
  const iic = (dom.match(/id="iic-num"[^>]*>([^<]+)/) || [, "??"])[1];
  ok(trava === esperado, `${esperado.padEnd(22)} IIC ${iic.padStart(4)} · conta ${conta.replace(/\u00a0|&nbsp;/g, " ")}`);
  ok(!/\{\{|\{resposta\}|undefined|NaN|R\$ 0\b/.test(dom), `${esperado.padEnd(22)} sem variável vazada, NaN ou conta zerada`);
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
