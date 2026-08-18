/**
 * Recebe as aplicações da página do Alivance Day e grava na planilha
 * "Leads - Alivance Day".
 *
 * COMO INSTALAR (leva uns 3 minutos, precisa de acesso de edição na planilha)
 *
 * 1. Abra a planilha "Leads - Alivance Day" no Drive do cliente.
 * 2. Menu Extensões > Apps Script.
 * 3. Apague o conteúdo do arquivo Code.gs e cole este arquivo inteiro.
 * 4. Salve, e clique em Executar uma vez na função criarCabecalho.
 *    O Google vai pedir autorização: autorize com a conta dona da planilha.
 * 5. Clique em Implantar > Nova implantação.
 *    Tipo: App da Web.
 *    Executar como: Eu.
 *    Quem pode acessar: Qualquer pessoa.
 * 6. Copie a URL que termina em /exec e cole no campo webhookLeads do
 *    index.html, dentro do bloco window.CONFIG.
 * 7. Faça uma inscrição de teste na página e confira se a linha apareceu.
 */

var ABA = 'Aplicações';

var COLUNAS = [
  'Data',
  'Etapa',
  'Nome',
  'WhatsApp',
  'Email',
  'O que faz hoje',
  'Faturamento',
  'Maior travamento',
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'Página'
];

function criarCabecalho() {
  var aba = pegarAba();
  if (aba.getLastRow() === 0) {
    aba.appendRow(COLUNAS);
    aba.getRange(1, 1, 1, COLUNAS.length).setFontWeight('bold');
    aba.setFrozenRows(1);
  }
  return 'Cabeçalho pronto na aba ' + ABA;
}

function pegarAba() {
  var planilha = SpreadsheetApp.getActiveSpreadsheet();
  var aba = planilha.getSheetByName(ABA);
  if (!aba) aba = planilha.insertSheet(ABA);
  return aba;
}

function doPost(e) {
  try {
    var d = JSON.parse(e.postData.contents);
    var aba = pegarAba();

    if (aba.getLastRow() === 0) criarCabecalho();

    aba.appendRow([
      Utilities.formatDate(new Date(), 'America/Sao_Paulo', 'dd/MM/yyyy HH:mm:ss'),
      d.etapa || 'aplicacao',
      d.nome || '',
      d.whatsapp || '',
      d.email || '',
      d.atuacao || '',
      d.faturamento || '',
      d.travamento || '',
      d.utm_source || '',
      d.utm_medium || '',
      d.utm_campaign || '',
      d.utm_content || '',
      d.utm_term || '',
      d.pagina || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (erro) {
    // Registra a falha numa aba separada para nenhuma inscrição se perder em silêncio.
    try {
      var planilha = SpreadsheetApp.getActiveSpreadsheet();
      var log = planilha.getSheetByName('Erros') || planilha.insertSheet('Erros');
      log.appendRow([new Date(), String(erro), e && e.postData ? e.postData.contents : '']);
    } catch (x) {}

    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, erro: String(erro) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService.createTextOutput('Webhook do Alivance Day no ar.');
}
