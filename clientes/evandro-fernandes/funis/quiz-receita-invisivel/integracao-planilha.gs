/* ============================================================
   INTEGRACAO LEADS para GOOGLE SHEETS  (Google Apps Script)
   Recebe os leads do funil e grava na planilha automaticamente.

   COMO ATIVAR (2 minutos, uma vez so):
   1. Abra a planilha "Leads · Diagnostico de Receita Invisivel · Evandro Fernandes"
   2. Menu  Extensoes  para  Apps Script
   3. Apague o conteudo e cole TODO este arquivo. Salve.
   4. Botao  Implantar  para  Nova implantacao
   5. Tipo:  App da Web
        - Executar como:  Eu
        - Quem pode acessar:  Qualquer pessoa
   6. Implantar  para  Autorizar acesso (escolha sua conta, "Avancado" e permitir)
   7. Copie a  URL do app da Web  (termina em /exec)
   8. Cole em app.js na constante LEADS_ENDPOINT e republique. Pronto: cada lead
      cai na planilha sozinho.
   ============================================================ */

var CABECALHO = [
  "Data/Hora", "Nome", "WhatsApp", "E-mail", "Situacao (dados)", "Problema", "Implicacao",
  "Ja tentou", "Objetivo", "Papel", "Faturamento", "Frente", "Origem",
  "UTM Source", "UTM Medium", "UTM Campaign", "UTM Content", "UTM Term"
];

/* Garante que a 1a linha tem o cabecalho certo (corrige nomes e adiciona as
   colunas de UTM automaticamente, sem voce mexer na planilha). */
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
      d.situacao || "",      // Situacao (dados)
      d.problema || "",      // Problema
      d.implicacao || "",    // Implicacao
      d.necessidade || "",   // Ja tentou
      d.objetivo || "",      // Objetivo
      d.perfil || "",        // Papel
      d.qualificacao || "",  // Faturamento
      d.frente || "Receita Invisível", // Frente
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

/* Rode uma vez no editor (Executar e configurar) pra ja deixar o cabecalho pronto. */
function configurar() {
  ensureHeader(SpreadsheetApp.getActiveSpreadsheet().getSheets()[0]);
}

/* Opcional: teste rapido pelo editor (Executar e testar) */
function _teste() {
  doPost({ postData: { contents: JSON.stringify({
    nome: "Teste", whatsapp: "(11) 99999-9999", email: "teste@empresa.com",
    situacao: "Cada area com o proprio numero", problema: "Lead caro que nao vira cliente",
    implicacao: "Margem apertando", necessidade: "Mais trafego",
    objetivo: "Reduzir o CAC", perfil: "Dono ou CEO", qualificacao: "De R$ 300 mil a 1 milhao por mes",
    frente: "Receita Invisível", origem: "teste",
    utm_source: "meta", utm_medium: "cpc", utm_campaign: "receita-invisivel",
    utm_content: "criativo-dor", utm_term: "3-funis" }) } });
}
