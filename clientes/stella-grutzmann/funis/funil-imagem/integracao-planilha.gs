/* ============================================================
   INTEGRAÇÃO LEADS → GOOGLE SHEETS  (Google Apps Script)
   Recebe os leads do funil da Stella e grava na planilha automaticamente.

   COMO ATIVAR (2 minutos, uma vez só):
   1. Abra a planilha "Leads · Funil de Imagem · Stella Grützmann"
   2. Menu  Extensões  →  Apps Script
   3. Apague o conteúdo e cole TODO este arquivo. Salve.
   4. Botão  Implantar  →  Nova implantação
   5. Tipo:  App da Web
        - Executar como:  Eu
        - Quem pode acessar:  Qualquer pessoa
   6. Implantar  →  Autorizar acesso (escolha a conta, "Avançado" → permitir)
   7. Copie a  URL do app da Web  (termina em /exec)
   8. Cole em app.js → LEADS_ENDPOINT e republique. Pronto: cada lead cai na
      planilha sozinho.
   ============================================================ */

var CABECALHO = [
  "Data/Hora", "Nome", "WhatsApp", "E-mail", "Situação", "Problema", "Implicação",
  "Custo de não agir", "Já tentou", "Objetivo", "Perfil", "Prontidão", "Frente", "Origem",
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
      d.custo || "",         // Custo de não agir
      d.tentativas || "",    // Já tentou
      d.objetivo || "",      // Objetivo
      d.perfil || "",        // Perfil
      d.qualificacao || "",  // Prontidão
      d.frente || "Consultoria de Imagem", // Frente
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

/* Rode uma vez no editor (Executar → configurar) pra já deixar o cabeçalho pronto. */
function configurar() {
  ensureHeader(SpreadsheetApp.getActiveSpreadsheet().getSheets()[0]);
}

/* Opcional: teste rápido pelo editor (Executar → _teste) */
function _teste() {
  doPost({ postData: { contents: JSON.stringify({
    nome: "Teste", whatsapp: "(41) 99999-9999", email: "teste@email.com",
    situacao: "Tenho bom gosto, mas falta estratégia", problema: "Tenho muita roupa e não sei combinar",
    implicacao: "Passo menos autoridade do que tenho", custo: "Continuar sendo subestimada",
    tentativas: "Comprei mais roupa", objetivo: "Ser vista como autoridade",
    perfil: "Advogada, executiva ou gestora", qualificacao: "Sim, se for o caminho certo",
    frente: "Consultoria de Imagem", origem: "teste",
    utm_source: "meta", utm_medium: "cpc", utm_campaign: "imagem-jul",
    utm_content: "criativo-a", utm_term: "consultoria-imagem" }) } });
}
