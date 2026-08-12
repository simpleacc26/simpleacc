/* ============================================================
   INTEGRAÇÃO LEADS → GOOGLE SHEETS  (Google Apps Script)
   Cliente: Luana Isse · Diagnóstico de Autoridade

   Escolhemos Apps Script em vez de Make de propósito: é gratuito, não
   consome operação/crédito e não fica varrendo nada. Dispara só quando
   chega lead.

   COMO ATIVAR (2 minutos, uma vez só):
   1. Abra a planilha "Leads · Diagnóstico de Autoridade · Luana Isse"
   2. Menu  Extensões  →  Apps Script
   3. Apague o conteúdo e cole TODO este arquivo. Salve.
   4. Execute uma vez a função  configurar  (deixa o cabeçalho pronto).
   5. Botão  Implantar  →  Nova implantação
        Tipo: App da Web
        Executar como: Eu
        Quem pode acessar: Qualquer pessoa
   6. Implantar → Autorizar acesso (sua conta → "Avançado" → permitir)
   7. Copie a URL do app da Web (termina em /exec) e mande para a Simple.
      A gente cola em app.js → LEADS_ENDPOINT e republica.

   Obs. técnica: o funil envia o corpo como text/plain de propósito. O /exec
   do Apps Script não responde ao preflight OPTIONS, então application/json
   quebraria por CORS. O JSON.parse abaixo lê do mesmo jeito.
   ============================================================ */

var CABECALHO = [
  "Data/Hora", "Nome", "WhatsApp", "E-mail",
  "IRV", "Faixa", "Pilar dominante", "Qualificação",
  "Situação", "Problema", "Há quanto tempo", "Impacto",
  "Já tentou", "Objetivo", "Perfil", "Faturamento", "Prontidão",
  "Frente", "Origem", "Página",
  "UTM Source", "UTM Medium", "UTM Campaign", "UTM Content", "UTM Term"
];

function ensureHeader(sheet) {
  var atual = sheet.getRange(1, 1, 1, CABECALHO.length).getValues()[0];
  var ok = CABECALHO.every(function (h, i) { return atual[i] === h; });
  if (!ok) {
    sheet.getRange(1, 1, 1, CABECALHO.length).setValues([CABECALHO]);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, CABECALHO.length).setFontWeight("bold");
  }
}

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    ensureHeader(sheet);
    var d = JSON.parse(e.postData.contents);
    sheet.appendRow([
      d.timestamp || new Date(),
      d.nome || "",
      d.whatsapp || "",
      d.email || "",
      d.irv || "",
      d.irv_faixa || "",
      d.pilar || "",
      d.qualificacao || "",
      d.situacao || "",
      d.problema || "",
      d.tempo || "",
      d.impacto || "",
      d.necessidade || "",
      d.objetivo || "",
      d.perfil || "",
      d.faturamento || "",
      d.prontidao || "",
      d.frente || "Diagnóstico de Autoridade",
      d.origem || "",
      d.page_url || "",
      d.utm_source || "",
      d.utm_medium || "",
      d.utm_campaign || "",
      d.utm_content || "",
      d.utm_term || ""
    ]);
    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/* Rode uma vez no editor para deixar o cabeçalho pronto. */
function configurar() {
  ensureHeader(SpreadsheetApp.getActiveSpreadsheet().getSheets()[0]);
}

/* Teste rápido pelo editor (Executar → _teste). Grava uma linha de exemplo. */
function _teste() {
  doPost({ postData: { contents: JSON.stringify({
    timestamp: "06/08/2026 15:00:00",
    nome: "Teste Simple", whatsapp: "(48) 99999-9999", email: "teste@simpleacc.com.br",
    irv: "73%", irv_faixa: "Alta", pilar: "Movimento", qualificacao: "qualificado",
    situacao: "Quase tudo por indicação de quem já me conhece",
    problema: "Não sei o que eu defendo. Falo do meu serviço, não de uma ideia",
    tempo: "Mais de um ano", impacto: "Igual: continuo excelente e ignorado",
    necessidade: "Cursos de marketing digital que não saíram do papel",
    objetivo: "Ser lembrada como referência no que faço",
    perfil: "Sou muito boa no que faço e quase ninguém sabe disso",
    faturamento: "De R$ 10 mil a R$ 25 mil",
    prontidao: "Sim, quero resolver de vez e entendo que é um investimento",
    frente: "Diagnóstico de Autoridade", origem: "teste", page_url: "teste",
    utm_source: "teste", utm_medium: "cpc", utm_campaign: "teste",
    utm_content: "", utm_term: "" }) } });
}
