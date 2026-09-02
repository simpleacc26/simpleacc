/* ============================================================
   INTEGRAÇÃO LEADS → GOOGLE SHEETS  (Google Apps Script)
   Funil: Diagnóstico AUTOFOCO · Delphis Fonseca

   COMO ATIVAR (2 minutos, uma vez só):
   1. Abra a planilha "Leads · Diagnóstico AUTOFOCO · Delphis Fonseca"
   2. Menu  Extensões  →  Apps Script
   3. Apague o conteúdo e cole TODO este arquivo. Salve.
   4. Botão  Implantar  →  Nova implantação
   5. Tipo:  App da Web
        - Executar como:  Eu
        - Quem pode acessar:  Qualquer pessoa
   6. Implantar  →  Autorizar acesso (escolha sua conta, "Avançado" → permitir)
   7. Copie a  URL do app da Web  (termina em /exec) e mande para a Simple.
      A gente cola em app.js (LEADS_ENDPOINT), republica e testa.
   ============================================================ */

var CABECALHO = [
  "Data/Hora", "Nome", "WhatsApp", "E-mail", "Classificação", "Padrão",
  "Onde a comunicação pesa", "Momento profissional", "O que se repete",
  "O que acontece depois", "Há quanto tempo", "O que já custou", "Já tentou",
  "Objetivo", "Prontidão", "Frente", "Origem",
  "UTM Source", "UTM Medium", "UTM Campaign", "UTM Content", "UTM Term"
];

/* Garante que a 1a linha tem o cabeçalho certo (corrige nomes e adiciona as
   colunas de UTM automaticamente, sem ninguém mexer na planilha). */
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
      new Date(),               // Data/Hora
      d.nome || "",             // Nome
      d.whatsapp || "",         // WhatsApp
      d.email || "",            // E-mail
      d.classificacao || "",    // QUALIFICADO / A NUTRIR / FORA POR ORA
      d.padrao || "",           // O Invisível, O Travado, O Personagem, O Correto
      d.situacao || "",         // Onde a comunicação pesa
      d.profissao || "",        // Momento profissional
      d.problema || "",         // O que se repete
      d.depois || "",           // O que acontece depois
      d.tempo || "",            // Há quanto tempo
      d.custo || "",            // O que já custou
      d.tentativas || "",       // Já tentou
      d.objetivo || "",         // Objetivo
      d.prontidao || "",        // Prontidão
      d.frente || "Diagnóstico AUTOFOCO",
      d.origem || "",           // Origem
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

/* Rode uma vez no editor (Executar → configurar) para já deixar o cabeçalho pronto. */
function configurar() {
  ensureHeader(SpreadsheetApp.getActiveSpreadsheet().getSheets()[0]);
}

/* Teste rápido pelo editor (Executar → _teste) */
function _teste() {
  doPost({ postData: { contents: JSON.stringify({
    nome: "Teste Simple", whatsapp: "(11) 99999-9999", email: "teste@simpleacc.com.br",
    classificacao: "QUALIFICADO", padrao: "O Invisível",
    situacao: "Reuniões, apresentações e decisões na empresa",
    profissao: "Sou empresário ou sócio",
    problema: "Dou branco justamente no que eu mais domino",
    depois: "Fico remoendo o que eu deveria ter dito",
    tempo: "De 5 a 10 anos", custo: "Todas as anteriores",
    tentativas: "Curso de oratória ou de falar em público",
    objetivo: "Eu seria reconhecido pelo que realmente sei",
    prontidao: "Estou pronto, é prioridade e tenho condição de investir",
    frente: "Diagnóstico AUTOFOCO", origem: "teste",
    utm_source: "meta", utm_medium: "cpc", utm_campaign: "diagnostico-autofoco",
    utm_content: "angulo-1-cena", utm_term: "" }) } });
}
