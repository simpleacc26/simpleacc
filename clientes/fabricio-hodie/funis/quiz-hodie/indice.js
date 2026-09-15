/* ============================================================
   ÍNDICE E QUALIFICAÇÃO · HODIE
   Compartilhado pelas duas páginas (quiz e relatório), por isso vive
   num arquivo próprio: index.html e diagnostico.html carregam scripts
   clássicos no mesmo escopo global, e duplicar as funções colidiria.
   Padrão de escrita: nunca usar travessão.
   ============================================================ */

/* Índice do Metabolismo da Fome. Só as perguntas de diagnóstico pontuam
   (as que têm "peso" nas opções). Tempo, objetivo e as duas porteiras não
   entram na conta, por desenho. */
window.calcularIndice = function (answers) {
  const F = window.FLOW;
  let soma = 0, maximo = 0;
  F.steps.forEach((step) => {
    const pesos = step.options.map((o) => o.peso).filter((p) => typeof p === "number");
    if (!pesos.length) return;
    maximo += Math.max.apply(null, pesos);
    const escolhida = step.options.find((o) => o.value === answers[step.id]);
    if (escolhida && typeof escolhida.peso === "number") soma += escolhida.peso;
  });
  const pct = maximo ? Math.round((soma / maximo) * 100) : 0;
  const faixa = pct >= 66 ? "alto" : (pct >= 33 ? "medio" : "baixo");
  return { pct, faixa };
};

/* Qualificação em 3 faixas, lida das flags das opções escolhidas nas duas
   porteiras (quem manda é o flow.js, não este arquivo). Nenhum lead vê porta
   na cara: quem cai em "fora" recebe um CTA mais suave no relatório. */
window.classificarLead = function (answers) {
  const F = window.FLOW;
  const flag = (stepId, nome) => {
    const step = F.steps.find((s) => s.id === stepId);
    const opt = step && step.options.find((o) => o.value === answers[stepId]);
    return !!(opt && opt[nome]);
  };
  if (flag("investimento", "fora")) return "fora";
  if (flag("investimento", "nutrir") || flag("prontidao", "nutrir")) return "nutrir";
  return "qualificado";
};
