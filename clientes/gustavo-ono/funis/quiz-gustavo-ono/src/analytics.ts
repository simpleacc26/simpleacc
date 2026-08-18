/**
 * Rastreamento do funil.
 *
 * Tudo o que o funil mede sai daqui para o dataLayer do GTM, e o container
 * decide quem recebe: GA4, Meta Pixel, o que entrar depois. Até 18/08 o código
 * chamava o `fbq` direto, com o Pixel carregado por um script solto no
 * `index.html`. Isso amarrava a medição ao deploy: cada ferramenta nova ou
 * cada ajuste de evento pedia build e subida.
 *
 * Nomes dos eventos, que são exatamente os acionadores do GTM:
 *
 *   quiz_iniciado       primeira resposta, ainda na landing
 *   quiz_pergunta       cada resposta seguinte, com o número da pergunta
 *   quiz_formulario     lead chegou no formulário
 *   quiz_lead           formulário enviado
 *   relatorio_visto     relatório abriu
 *   clique_whatsapp     clique no CTA da sessão diagnóstica (só Rota A)
 *   clique_treinamento  clique no botão do treinamento de R$ 97
 *
 * Os parâmetros seguem o vocabulário da Meta (`content_name`, `value`,
 * `currency`) porque as tags do Pixel no GTM leem direto deles. Não renomeie
 * sem ajustar as tags lá.
 */

export function gtmTrack(event: string, params?: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  // O snippet do GTM no index.html já cria o dataLayer, mas se algum bloqueador
  // impedir o script de rodar o array não existe e o push quebraria a página.
  const dataLayer = (window.dataLayer = window.dataLayer ?? []);
  dataLayer.push({ event, ...(params ?? {}) });
}

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}
