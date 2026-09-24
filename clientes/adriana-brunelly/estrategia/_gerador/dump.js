global.window = global;
global.sessionStorage = { getItem(){return null}, setItem(){}, removeItem(){} };
const D = "/home/user/simpleacc/clientes/adriana-brunelly/funis/quiz-divida-de-valor/";
require(D+"flow.js"); require(D+"calculo.js");
const F = window.FLOW, M = window.MOTOR;
function ctxDe(a){return {a,valor:s=>M.valor(s,a),frase:s=>M.frase(s,a),label:s=>M.label(s,a),opcao:s=>M.opcaoDe(s,a),brl:M.brl};}
// Perfil de exemplo: o ICP dela (decoradora/buffet de R$ 40 a 80 mil por mes).
const exemplo = {segmento:"buffet_deco",volume:"4a8",orcamento:"desconto",extras:"absorvo",
  ticket:"8a15",desconto:"ate10",comissao:"3a5",equipe:"10a20",tentativas:"redes",
  sentimento:"sem_solucao",objetivo:"cobrar",faturamento:"40a80"};
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
["orcamento","comissao","tentativas"].forEach(k=>{
  out.interseccoes[k] = F.interseccoes[k].monta(ctxDe(exemplo));
});
require("fs").writeFileSync(__dirname+"/flow2.json", JSON.stringify(out,null,1));
console.log("ok", Object.keys(out.interseccoes), out.exemplo.divida.fmt.mes, out.exemplo.divida.fmt.ano, out.exemplo.bucket, out.exemplo.nivel);
