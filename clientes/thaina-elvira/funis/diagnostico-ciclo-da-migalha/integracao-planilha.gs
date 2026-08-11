/* ============================================================
   INTEGRAÇÃO LEADS -> GOOGLE SHEETS  (Google Apps Script)
   Recebe os leads do funil e grava na planilha automaticamente.

   ⚠️ Neste funil o Apps Script é a rota PRINCIPAL, não o plano B: ele é
   gratuito e não consome operação do Make (decisão do Daniel em 11/08).

   Planilha: "Planilha de Leads - Thaina e Thiago (Diagnóstico do Ciclo) -
   Simple Acc", na pasta "3. Estratégia e Tráfego" do Drive do cliente.
   ID 1aAl3LvOLWJVAmC64IhvbA4B3reiHTPoi5d2sYWsJap4
   O cabeçalho abaixo já está na planilha, e o ensureHeader() o mantém.

   COMO ATIVAR (2 minutos, uma vez só):
   1. Abra a planilha acima
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
  "Data/Hora", "Nome", "WhatsApp", "E-mail", "Situação", "Gatilho", "Reação",
  "Tempo", "Implicação", "Já tentou", "Objetivo", "Perfil", "Prontidão",
  "Padrão", "Classificação", "Frente", "Origem",
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
      d.gatilho || "",       // Gatilho (elo 1)
      d.reacao || "",        // Reação (elo 2)
      d.tempo || "",         // Tempo
      d.implicacao || "",    // Implicação
      d.tentativas || "",    // Já tentou
      d.objetivo || "",      // Objetivo
      d.perfil || "",        // Perfil (qualificação de ICP)
      d.prontidao || "",     // Prontidão
      d.padrao || "",        // Padrão nomeado no diagnóstico
      d.classificacao || "", // fora / nutrir / fila-quente / qualificado
      d.frente || "Mulher que Escolhe", // Frente
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
    situacao: "Estou vivendo algo com alguém, mas nada se define",
    gatilho: "Ele desaparece e volta como se nada tivesse acontecido",
    reacao: "Mando uma mensagem longa explicando como me sinto",
    tempo: "Se repete em mais de uma relação",
    implicacao: "Do mesmo jeito, e isso me assusta",
    tentativas: "Cursos e conteúdos sobre relacionamento e feminilidade",
    objetivo: "Parar de aceitar menos do que eu quero",
    perfil: "Separada ou divorciada, recomeçando",
    prontidao: "Sim, é prioridade para mim neste momento",
    padrao: "Ciclo da Explicação", classificacao: "fila-quente",
    frente: "Mulher que Escolhe", origem: "teste",
    utm_source: "meta", utm_medium: "cpc", utm_campaign: "ciclo-da-migalha",
    utm_content: "angulo-dor", utm_term: "estatico-01" }) } });
}
