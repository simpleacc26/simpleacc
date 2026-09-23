global.window = global;
global.sessionStorage = { getItem(){return null}, setItem(){}, removeItem(){} };
const D = "/home/user/simpleacc/clientes/adriana-brunelly/funis/quiz-divida-de-valor/";
require(D+"flow.js"); require(D+"calculo.js");
const F = window.FLOW, M = window.MOTOR;
function ctxDe(a){return {a,valor:s=>M.valor(s,a),frase:s=>M.frase(s,a),label:s=>M.label(s,a),opcao:s=>M.opcaoDe(s,a),brl:M.brl};}
// Perfil de exemplo: o ICP dela (decoradora/buffet de R$ 40 a 80 mil por mes).
const exemplo = {segmento:"buffet",volume:"9a15",orcamento:"desconto",extras:"absorvo",
  ticket:"15a30",desconto:"10a20",equipe:"20a30",comissao:"5a8",tentativas:"curso",
  sentimento:"nao_sobra",objetivo:"menos_mais",faturamento:"40a80"};
const out = {
  config: F.config, marca: F.marca, hero: F.hero, captura: F.captura,
  loading: F.loading, steps: F.steps, buckets: F.buckets,
  calculo: F.calculo, ofertaEntrada: F.ofertaEntrada,
  interseccoes: {},
  exemplo: {
    respostas: exemplo,
    divida: M.calcularDivida(exemplo),
    custos: M.custosDeOperacao(exemplo, M.calcularDivida(exemplo)),
    bucket: M.definirBucket(exemplo).chave,
    nivel: M.classificarLead(exemplo),
  },
};
["orcamento","desconto","tentativas"].forEach(k=>{
  out.interseccoes[k] = F.interseccoes[k].monta(ctxDe(exemplo));
});
require("fs").writeFileSync(__dirname+"/flow2.json", JSON.stringify(out,null,1));
console.log("ok", Object.keys(out.interseccoes), out.exemplo.divida.fmt.mes, out.exemplo.divida.fmt.ano, out.exemplo.bucket, out.exemplo.nivel);
