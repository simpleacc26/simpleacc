/* ============================================================
   INTEGRAÇÃO LEADS -> GOOGLE SHEETS  (Google Apps Script)
   Recebe os leads do funil e grava na planilha automaticamente.

   COMO ATIVAR (2 minutos, uma vez só):
   1. Abra a planilha "Leads · Diagnóstico Executivo · Felipe Damasceno"
   2. Menu  Extensões  ->  Apps Script
   3. Apague o conteúdo e cole TODO este arquivo. Salve.
   4. Botão  Implantar  ->  Nova implantação
   5. Tipo:  App da Web
        - Executar como:  Eu
        - Quem pode acessar:  Qualquer pessoa
   6. Implantar  ->  Autorizar acesso (escolha sua conta, "Avançado" -> permitir)
   7. Copie a  URL do app da Web  (termina em /exec)
   8. Cole essa URL em app.js -> LEADS_ENDPOINT e republique.
      Pronto: cada lead cai na planilha sozinho.
   ============================================================ */

var CABECALHO = [
  "Data/Hora", "Nome", "WhatsApp", "E-mail", "Situação", "Problema", "Implicação",
  "Já tentou", "Objetivo", "Perfil", "Faturamento", "Frente", "Origem",
  "UTM Source", "UTM Medium", "UTM Campaign", "UTM Content", "UTM Term"
];

/* Garante que a 1ª linha tem o cabeçalho certo (corrige nomes e adiciona as
   colunas de UTM automaticamente, sem você mexer na planilha). */
function ensureHeader(sheet) {
  var atual = sheet.getRange(1, 1, 1, CABECALHO.length).getValues()[0];
  var ok = CABECALHO.every(function (h, i) { return atual[i] === h; });
  if (!ok) {
    sheet.getRange(1, 1, 1, CABECALHO.length).setValues([CABECALHO]);
    sheet.setFrozenRows(1);
  }
}

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    ensureHeader(sheet);
    var d = JSON.parse(e.postData.contents);
    sheet.appendRow([
      new Date(),            // Data/Hora
      d.nome || "",          // Nome
      d.whatsapp || "",      // WhatsApp
      d.email || "",         // E-mail
      d.situacao || "",      // Situação
      d.problema || "",      // Problema
      d.implicacao || "",    // Implicação
      d.necessidade || "",   // Já tentou
      d.objetivo || "",      // Objetivo
      d.perfil || "",        // Perfil
      d.qualificacao || "",  // Faturamento
      d.frente || "Governo Empresarial", // Frente
      d.origem || "",        // Origem
      d.utm_source || "",    // UTM Source
      d.utm_medium || "",    // UTM Medium
      d.utm_campaign || "",  // UTM Campaign
      d.utm_content || "",   // UTM Content
      d.utm_term || ""       // UTM Term
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

/* Rode uma vez no editor (Executar -> configurar) pra já deixar o cabeçalho pronto. */
function configurar() {
  ensureHeader(SpreadsheetApp.getActiveSpreadsheet().getSheets()[0]);
}

/* Opcional: teste rápido pelo editor (Executar -> testar) */
function _teste() {
  doPost({ postData: { contents: JSON.stringify({
    nome: "Teste", whatsapp: "(11) 99999-9999", email: "teste@email.com",
    situacao: "Sou o dono e ainda vivo dentro da operação", problema: "Apagar incêndios",
    implicacao: "A operação travaria rapidamente", necessidade: "Contratei pessoas",
    objetivo: "Ter tempo para a família", perfil: "Trabalho mais do que todos",
    qualificacao: "De R$ 500 mil a R$ 1 milhão",
    frente: "Governo Empresarial", origem: "teste",
    utm_source: "meta", utm_medium: "cpc", utm_campaign: "governo-empresarial",
    utm_content: "angulo-dor", utm_term: "dono-empresa" }) } });
}
