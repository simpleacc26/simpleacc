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

/** Índice da pergunta "Qual é a média do seu faturamento mensal hoje?" */
const Q_FATURAMENTO = 8;

/** Resposta de Q_FATURAMENTO que fica abaixo do piso da formação. */
const FATURAMENTO_ABAIXO_DO_PISO = "1"; // "Até R$ 5.000"

export type Rota = "A" | "B";

/**
 * Decide a rota da lead a partir das respostas do quiz.
 *
 * O critério é só faturamento, decidido em 12/08. A versão anterior exigia
 * também ter operação de chocolate rodando (pergunta do carro-chefe), e isso
 * qualificava apenas 10 dos 86 leads da base. Só por faturamento são 38.
 * Para um produto de R$ 5.000, a restrição que manda é capacidade de pagar,
 * não maturidade da operação: a agenda do Gustavo estava vazia com o critério
 * estreito, e as duas únicas vendas que existiram vieram de gente sem operação
 * montada.
 *
 * Sem a resposta de faturamento, cai na Rota B. É o padrão seguro: oferecer o
 * produto de entrada custa menos do que ocupar a agenda com quem não deveria
 * estar lá.
 */
export function getRota(answers: Record<number, string>): Rota {
  const faturamento = answers[Q_FATURAMENTO];
  if (!faturamento) return "B";
  return faturamento !== FATURAMENTO_ABAIXO_DO_PISO ? "A" : "B";
}
