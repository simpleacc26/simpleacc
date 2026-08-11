/**
 * Roteamento de leads no fim do quiz (proposta aprovada em 07/08/2026).
 *
 * O quiz já coleta as duas variáveis que decidem qual oferta faz sentido para
 * cada lead. Este módulo é o único lugar onde essa decisão é tomada.
 *
 *   Rota A — já tem negócio de chocolate rodando e fatura acima de R$ 5 mil.
 *            Destino: sessão diagnóstica com o Gustavo (formação R$ 5.000).
 *
 *   Rota B — ainda vai começar, ou fatura até R$ 5 mil.
 *            Destino: Treinamento Bombom Artístico (R$ 97).
 *            Não recebe convite para a sessão, para concentrar a agenda do
 *            Gustavo em quem já tem operação para analisar.
 *
 * Rota C (sessão como benefício de quem compra o treinamento) não é decidida
 * aqui: ela acontece depois da compra, e aparece como bônus dentro da oferta
 * da Rota B.
 */

/** Índice da pergunta "Os chocolates são o carro-chefe do seu negócio?" */
const Q_CARRO_CHEFE = 1;
/** Índice da pergunta "Qual é a média do seu faturamento mensal hoje?" */
const Q_FATURAMENTO = 8;

/** Respostas de Q_CARRO_CHEFE que indicam operação em andamento. */
const OPERACAO_ATIVA = ["1", "2"]; // "Sim, são meu carro-chefe" | "menos de 50% das minhas vendas"

/** Resposta de Q_FATURAMENTO que fica abaixo do piso da formação. */
const FATURAMENTO_ABAIXO_DO_PISO = "1"; // "Até R$ 5.000"

export type Rota = "A" | "B";

/**
 * Decide a rota da lead a partir das respostas do quiz.
 *
 * Na ausência de qualquer uma das duas respostas, cai na Rota B. É o padrão
 * seguro: oferecer o produto de entrada custa menos do que mandar para a
 * agenda do Gustavo alguém que não deveria estar lá.
 */
export function getRota(answers: Record<number, string>): Rota {
  const carroChefe = answers[Q_CARRO_CHEFE];
  const faturamento = answers[Q_FATURAMENTO];

  if (!carroChefe || !faturamento) return "B";

  const temOperacao = OPERACAO_ATIVA.includes(carroChefe);
  const faturaAcimaDoPiso = faturamento !== FATURAMENTO_ABAIXO_DO_PISO;

  return temOperacao && faturaAcimaDoPiso ? "A" : "B";
}
