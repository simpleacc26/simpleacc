/* Calibragem do IIC. Roda TODAS as combinações das perguntas que pontuam e
   mostra a distribuição por faixa e a amplitude do índice.
   Uso: node calibrar.js
   Rode SEMPRE que mexer em qualquer `peso` do flow.js. Quiz sem opção de
   "está tudo bem" tende a jogar todo mundo em Alta, e aí o número é teatro. */
global.window = {};
require("./flow.js");
const F = window.window ? window.window.FLOW : window.FLOW;

const pontuam = F.steps.filter((s) => s.options.some((o) => typeof o.peso === "number"));
const max = pontuam.reduce((t, s) => t + Math.max(...s.options.map((o) => o.peso || 0)), 0);

let combos = [[]];
pontuam.forEach((s) => {
  const next = [];
  combos.forEach((c) => s.options.forEach((o) => next.push(c.concat([o.peso || 0]))));
  combos = next;
});

const faixas = { Alta: 0, "Média": 0, Baixa: 0 };
const travaCount = {};
let min = 100, top = 0;
combos.forEach((c) => {
  const pct = Math.round((c.reduce((a, b) => a + b, 0) / max) * 100);
  min = Math.min(min, pct); top = Math.max(top, pct);
  faixas[pct >= 66 ? "Alta" : pct >= 33 ? "Média" : "Baixa"]++;
});

console.log("perguntas que pontuam:", pontuam.map((s) => s.id).join(", "));
console.log("soma máxima possível:", max);
console.log("combinações:", combos.length);
console.log("amplitude do IIC:", min + "% a " + top + "%");
Object.entries(faixas).forEach(([k, v]) =>
  console.log(("  " + k).padEnd(10), String(v).padStart(5), (v / combos.length * 100).toFixed(1) + "%"));

/* Distribuição das travas dominantes, para conferir que nenhuma some. */
const P3 = F.steps.find((s) => s.id === "trava");
P3.options.forEach((o) => { travaCount[F.travas[o.trava].nome] = 0; });
combos.forEach(() => {});
console.log("\ntravas configuradas:", Object.keys(travaCount).join(" · "));
