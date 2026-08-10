/* ============================================================
   INTEGRAÇÃO LEADS PARA GOOGLE SHEETS  (Google Apps Script)
   Funil de Quiz GES360 · Guilherme Eduardo
   Recebe os leads do funil e grava na planilha automaticamente.

   COMO ATIVAR (2 minutos, uma vez só):
   1. Abra a planilha "GES360 · Leads do Funil de Quiz (Diagnóstico IDR)"
   2. Menu  Extensões  para  Apps Script
   3. Apague o conteúdo e cole TODO este arquivo. Salve.
   4. Botão  Implantar  para  Nova implantação
   5. Tipo:  App da Web
        - Executar como:  Eu
        - Quem pode acessar:  Qualquer pessoa
   6. Implantar  para  Autorizar acesso (escolha a conta, "Avançado" e permitir)
   7. Copie a  URL do app da Web  (termina em /exec)
   8. Mande essa URL para a Simple (ou cole em app.js na constante
      LEADS_ENDPOINT) e a gente republica. Pronto: cada lead cai na planilha.
   ============================================================ */

var CABECALHO = [
  "Data/Hora", "Nome", "WhatsApp", "E-mail",
  "IDR", "Faixa IDR", "Perfil do Lead", "Classificação", "Gargalo",
  "Situação", "Cobrança", "Problema", "Há quanto tempo", "Implicação", "Tentativas", "Objetivo",
  "Especialidade", "Faturamento", "Prontidão", "Frente", "Origem",
  "UTM Source", "UTM Medium", "UTM Campaign", "UTM Content", "UTM Term"
];

/* Garante que a 1ª linha tem o cabeçalho certo. */
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
      new Date(),               // Data/Hora
      d.nome || "",             // Nome
      d.whatsapp || "",         // WhatsApp
      d.email || "",            // E-mail
      d.idr === 0 ? 0 : (d.idr || ""), // IDR
      d.faixa_idr || "",        // Faixa IDR
      d.perfil_lead || "",      // Perfil do Lead (ICP ou não)
      d.classificacao || "",    // Classificação (fora / nutrir / qualificado)
      d.gargalo || "",          // Gargalo principal
      d.situacao || "",         // Situação
      d.cobranca || "",         // Cobrança
      d.problema || "",         // Problema
      d.tempo || "",            // Há quanto tempo
      d.implicacao || "",       // Implicação
      d.tentativas || "",       // Tentativas
      d.objetivo || "",         // Objetivo
      d.especialidade || "",    // Especialidade
      d.faturamento || "",      // Faturamento
      d.prontidao || "",        // Prontidão
      d.frente || "GES360",     // Frente
      d.origem || "",           // Origem
      d.utm_source || "",       // UTM Source
      d.utm_medium || "",       // UTM Medium
      d.utm_campaign || "",     // UTM Campaign
      d.utm_content || "",      // UTM Content
      d.utm_term || ""          // UTM Term
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

/* Rode uma vez no editor (Executar, configurar) para deixar o cabeçalho pronto. */
function configurar() {
  ensureHeader(SpreadsheetApp.getActiveSpreadsheet().getSheets()[0]);
}

/* Opcional: teste rápido pelo editor (Executar, _teste) */
function _teste() {
  doPost({ postData: { contents: JSON.stringify({
    nome: "Dr. Teste Simple", whatsapp: "(48) 99911-2233", email: "teste@simpleacc.com.br",
    idr: 86, faixa_idr: "Dependência crítica", perfil_lead: "ICP (agendar diagnóstico)",
    classificacao: "qualificado",
    gargalo: "modelo de receita",
    situacao: "Clínica ou consultório próprio, atendo e cuido de tudo",
    cobranca: "Só consulta avulsa",
    problema: "Dependo de consulta avulsa e não sobra no fim do mês",
    tempo: "Vários anos, virou o jeito que a clínica funciona",
    implicacao: "Pior: mais cansado e com menos tempo para a família",
    tentativas: "Tráfego pago ou anúncios",
    objetivo: "Faturar mais sem aumentar o número de atendimentos",
    especialidade: "Nutrologia, medicina integrativa ou emagrecimento",
    faturamento: "De R$ 50 mil a R$ 100 mil",
    prontidao: "Sim, quero resolver de vez e entendo que é um investimento",
    frente: "GES360", origem: "teste",
    utm_source: "meta", utm_medium: "cpc", utm_campaign: "ges360-diagnostico",
    utm_content: "angulo-dor", utm_term: "" }) } });
}
