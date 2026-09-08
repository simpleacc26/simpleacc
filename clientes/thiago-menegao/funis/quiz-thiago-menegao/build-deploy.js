/* ============================================================
   BUILD DO DEPLOY. `node build-deploy.js` gera dist/, que é o que sobe.

   Por que existe: a publicação é feita por envio direto de arquivos, e o
   envio tem limite de tamanho por chamada. O build tira os comentários e a
   indentação (inclusive dentro dos template literals, onde o conteúdo é HTML
   e espaço em branco não altera renderização), e reescreve os <script src>
   para os projetos de asset.

   NÃO é minificação de identificadores e NÃO muda comportamento. A FONTE DA
   VERDADE é a raiz desta pasta; dist/ é descartável.

   ⚠️ NÃO RODE `testar.js` DENTRO DE dist/. Os <script src> do dist são URLs
   absolutas dos projetos de asset, e o Chromium deste ambiente não alcança
   HTTPS, então a página abre sem JS e o teste acusa falha que não existe.
   Rode `node testar.js` na RAIZ desta pasta, onde os caminhos são relativos.

   Divisão em projetos (ver deploy-config.json): a Vercel substitui a árvore
   inteira a cada deploy, então os arquivos que não cabem numa chamada moram
   em projetos separados de asset, no mesmo padrão que o time já usa
   (ges360-assets, quiz-go-imgs). Quando a Vercel ganhar acesso de escrita ao
   repositório no GitHub, tudo isso colapsa num projeto ligado ao Git.
   ============================================================ */
const fs = require("fs"), path = require("path");
const CFG = JSON.parse(fs.readFileSync(path.join(__dirname, "deploy-config.json"), "utf8"));
const OUT = path.join(__dirname, "dist");
const ARQ = ["index.html", "diagnostico.html", "styles.css", "flow.js", "motor.js", "app.js", "diagnostico.js", "favicon.svg"];
/* Binários entram no dist sem tratamento. A foto sobe no projeto js2,
   não junto das páginas: ver deploy-config.json. */
const BIN = ["thiago.webp"];

/* Tokeniza para nunca cortar comentário dentro de string, template ou regex.
   Regex ingênua já cortou "https://" no meio de uma URL em string. */
function tokens(s) {
  const out = []; let i = 0, buf = "";
  while (i < s.length) {
    const c = s[i], d = s[i + 1] || "";
    if (c === "/" && d === "*") { const f = s.indexOf("*/", i + 2); out.push(["code", buf], ["com", ""]); buf = ""; i = f < 0 ? s.length : f + 2; continue; }
    if (c === "/" && d === "/") { const f = s.indexOf("\n", i); out.push(["code", buf], ["com", ""]); buf = ""; i = f < 0 ? s.length : f; continue; }
    if (c === "'" || c === '"' || c === "`") {
      let j = i + 1;
      while (j < s.length) { if (s[j] === "\\") { j += 2; continue; } if (s[j] === c) break; j++; }
      out.push(["code", buf], [c === "`" ? "tpl" : "str", s.slice(i, j + 1)]); buf = ""; i = j + 1; continue;
    }
    if (c === "/") {
      const prev = buf.replace(/\s+$/, "");
      if (prev && "=(,:[!&|?{};+-*%".includes(prev.slice(-1))) {
        let j = i + 1, ok = true;
        while (j < s.length) { if (s[j] === "\\") { j += 2; continue; } if (s[j] === "/") break; if (s[j] === "\n") { ok = false; break; } j++; }
        if (ok && j < s.length) {
          while (j + 1 < s.length && /[a-z]/.test(s[j + 1])) j++;
          out.push(["code", buf], ["str", s.slice(i, j + 1)]); buf = ""; i = j + 1; continue;
        }
      }
    }
    buf += c; i++;
  }
  out.push(["code", buf]);
  return out;
}

const minJs = (s) => tokens(s).map(([t, v]) =>
  t === "com" ? "" :
  t === "str" ? v :
  t === "tpl" ? v.replace(/\n\s*/g, " ") :
  v.replace(/[ \t]*\n[ \t]*/g, "\n").replace(/\n{2,}/g, "\n").replace(/[ \t]{2,}/g, " ")
).join("").trim() + "\n";

const minCss = (s) => s.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\s*([{}:;,>])\s*/g, "$1")
  .replace(/;}/g, "}").replace(/\s+/g, " ").trim() + "\n";

function minHtml(s, mapa) {
  s = s.replace(/<!--(?!\s*PIXEL)[\s\S]*?-->/g, "");
  s = s.replace(/<style>([\s\S]*?)<\/style>/g, (m, css) => "<style>" + minCss(css) + "</style>");
  /* Os <script src> apontam para os projetos de asset. Sem isso a página
     procura os .js na própria raiz, onde eles não cabem. */
  s = s.replace(/<script src="[^"]*?\/?([a-z]+\.js)" defer>/g, (m, arq) => `<script src="${mapa[arq]}/${arq}" defer>`);
  return s.replace(/>\s+</g, "><").replace(/[ \t]*\n[ \t]*/g, "\n").replace(/\n{2,}/g, "\n").trim() + "\n";
}

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT);
const B = CFG.bases;
const MAPA = {
  "index.html": { "flow.js": B.js1, "motor.js": B.js1, "app.js": B.js2 },
  "diagnostico.html": { "flow.js": B.js1, "motor.js": B.js1, "diagnostico.js": B.js3 },
};
let tot = 0;
for (const f of ARQ) {
  let s = fs.readFileSync(path.join(__dirname, f), "utf8");
  if (f.endsWith(".js")) s = minJs(s);
  else if (f.endsWith(".css")) s = minCss(s);
  else if (f.endsWith(".html")) s = minHtml(s, MAPA[f]);
  fs.writeFileSync(path.join(OUT, f), s);
  const n = Buffer.byteLength(s); tot += n;
  console.log(`  ${f.padEnd(20)} ${String(n).padStart(6)}`);
}
for (const f of BIN) {
  fs.copyFileSync(path.join(__dirname, f), path.join(OUT, f));
  const n = fs.statSync(path.join(OUT, f)).size; tot += n;
  console.log(`  ${f.padEnd(20)} ${String(n).padStart(6)}  (binário, copiado)`);
}
console.log(`  ${"TOTAL".padEnd(20)} ${String(tot).padStart(6)} bytes`);
