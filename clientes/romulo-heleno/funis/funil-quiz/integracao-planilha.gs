/* ============================================================
   INTEGRAÇÃO LEADS → GOOGLE SHEETS  (Google Apps Script)
   Recebe os leads do funil e grava na planilha automaticamente.

   COMO ATIVAR (2 minutos, uma vez só):
   1. Abra a planilha "Leads · Funil de Quiz · Mentoria Cabelo de Segunda"
   2. Menu  Extensões  →  Apps Script
   3. Apague o conteúdo e cole TODO este arquivo. Salve (💾).
   4. Botão  Implantar  →  Nova implantação
   5. Tipo:  App da Web
        - Executar como:  Eu
        - Quem pode acessar:  Qualquer pessoa
   6. Implantar  →  Autorizar acesso (escolha sua conta, "Avançado" → permitir)
   7. Copie a  URL do app da Web  (termina em /exec)
   8. Mande essa URL pra mim (ou cole em app.js → LEADS_ENDPOINT) e a gente
      republica. Pronto: cada lead cai na planilha sozinho.
   ============================================================ */

var CABECALHO = [
  "Data/Hora", "Nome", "WhatsApp", "E-mail", "Instagram", "Qualificação",
  "Tempo de carreira", "Relação com mecha", "Maior travamento", "Impacto do erro",
  "Custo de continuar", "Já tentou", "Objetivo", "Perfil", "Frequência", "Intenção",
  "Frente", "Origem",
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
    var ans = d.answers || {};
    var utm = d.utms || {};
    var meta = d.meta || {};
    sheet.appendRow([
      meta.timestamp || new Date(),  // Data/Hora (horário de Brasília, vem do funil)
      d.name || "",                  // Nome
      d.whatsapp || "",              // WhatsApp
      d.email || "",                 // E-mail
      d.instagram || "",             // Instagram
      d.qualificacao || "",          // Qualificação (qualificado / nutrir)
      ans.q1 || "",                  // Tempo de carreira
      ans.q2 || "",                  // Relação com mecha
      ans.q3 || "",                  // Maior travamento
      ans.q4 || "",                  // Impacto do erro
      ans.q5 || "",                  // Custo de continuar
      ans.q6 || "",                  // Já tentou
      ans.q7 || "",                  // Objetivo
      ans.q8 || "",                  // Perfil
      ans.q9 || "",                  // Frequência
      ans.q10 || "",                 // Intenção
      d.frente || "Mentoria Mecha",  // Frente
      meta.page_url || "",           // Origem
      utm.utm_source || "",          // UTM Source
      utm.utm_medium || "",          // UTM Medium
      utm.utm_campaign || "",        // UTM Campaign
      utm.utm_content || "",         // UTM Content
      utm.utm_term || ""             // UTM Term
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
    name: "Teste", whatsapp: "(51) 99999-9999", email: "teste@email.com", instagram: "@teste",
    qualificacao: "qualificado", frente: "Mentoria Mecha",
    answers: {
      q1: "Entre 1 e 3 anos", q2: "Faço, mas com insegurança", q3: "Insegurança na aplicação",
      q4: "A cliente não volta", q5: "Perder clientes", q6: "Curso online",
      q7: "Me posicionar como especialista", q8: "Tenho meu próprio salão",
      q9: "4 a 7 atendimentos", q10: "Sim" },
    utms: { utm_source: "meta", utm_medium: "cpc", utm_campaign: "mecha-jul", utm_content: "criativo-a", utm_term: "curso-mecha" },
    meta: { timestamp: "02/07/2026 20:00:00", page_url: "teste" } }) } });
}
