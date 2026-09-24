/* ============================================================
   VITÓRIA DANIELA · Quiz Diagnóstico → Planilha de Leads
   Recebe os leads do funil e grava numa aba nova da planilha.

   COMO ATIVAR (2 minutos, uma vez só):
   1. Abra a "Planilha de Leads - Vitória Daniela" (a mesma de sempre).
   2. Crie uma aba nova chamada exatamente "Quiz Magna" (sem essa aba,
      o script cria sozinho na primeira execução).
   3. Menu  Extensões  →  Apps Script
   4. Apague o conteúdo e cole TODO este arquivo. Salve (💾).
   5. Botão  Implantar  →  Nova implantação
   6. Tipo:  App da Web
        - Executar como:  Eu
        - Quem pode acessar:  Qualquer pessoa
   7. Implantar  →  Autorizar acesso (escolha sua conta, "Avançado" → permitir)
   8. Copie a  URL do app da Web  (termina em /exec)
   9. Cole essa URL em app.js → const LEADS_ENDPOINT = "..."; e republique
      o funil na Vercel.
   ============================================================ */

var ABA = "Quiz Magna";
var CABECALHO = [
  "Data/Hora", "Nome", "WhatsApp", "E-mail",
  "Momento", "Estrutura", "Desafio", "Ticket", "Urgência", "Faturamento",
  "Quer análise?", "Balde", "Camada", "Frente", "Origem",
  "UTM Source", "UTM Medium", "UTM Campaign", "UTM Content", "UTM Term"
];

function getSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(ABA);
  if (!sheet) sheet = ss.insertSheet(ABA);
  return sheet;
}

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
    var sheet = getSheet();
    ensureHeader(sheet);
    var d = JSON.parse(e.postData.contents);
    sheet.appendRow([
      new Date(),
      d.nome || "", d.whatsapp || "", d.email || "",
      d.momento || "", d.estrutura || "", d.desafio || "", d.ticket || "",
      d.urgencia || "", d.faturamento || "", d.quer_analise || "",
      d.balde || "", d.camada || "",
      d.frente || "Quiz Magna", d.origem || "",
      d.utm_source || "", d.utm_medium || "", d.utm_campaign || "",
      d.utm_content || "", d.utm_term || ""
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

/* Rode uma vez no editor (Executar → configurar) pra já deixar a aba e o cabeçalho prontos. */
function configurar() {
  ensureHeader(getSheet());
}

/* Teste rápido pelo editor (Executar → _teste) */
function _teste() {
  doPost({ postData: { contents: JSON.stringify({
    nome: "Teste", whatsapp: "(33) 99999-9999", email: "teste@email.com",
    momento: "Já vendo com consistência no digital, mas preciso escalar o negócio.",
    estrutura: "Tenho uma estrutura completa (equipe de marketing e equipe comercial).",
    desafio: "Ter previsibilidade de faturamento e estratégia para crescer.",
    ticket: "Entre R$3.000 e R$10.000",
    urgencia: "Quero viabilizar o investimento em uma solução definitiva se fizer sentido para o meu crescimento.",
    faturamento: "Entre 40 e 70 mil",
    quer_analise: "Sim, quero que um especialista em vender high ticket me traga o caminho para atrair clientes com previsibilidade.",
    balde: "Sem Previsibilidade", camada: "A",
    frente: "Quiz Magna", origem: "teste",
    utm_source: "meta", utm_medium: "cpc", utm_campaign: "quiz-magna-lanc",
    utm_content: "criativo-a", utm_term: "" }) } });
}
