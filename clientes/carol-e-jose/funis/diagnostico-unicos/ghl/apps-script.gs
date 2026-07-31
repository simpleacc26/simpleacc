/**
 * ÚNICOS — Diagnóstico de Maturidade: recebe os leads do funil e grava na planilha.
 *
 * Instalação (uma vez):
 *  1. Abra a planilha de leads no Google Sheets.
 *  2. Extensões > Apps Script. Cole este arquivo inteiro (substituindo o conteúdo).
 *  3. Implantar > Nova implantação > tipo "App da Web".
 *     - Executar como: Eu.
 *     - Quem tem acesso: Qualquer pessoa.
 *  4. Copie a URL do app da Web (termina em /exec) e cole em CONFIG.LEADS_ENDPOINT
 *     no diagnostico.html.
 *
 * Roteamento: o funil envia o campo "aba" = "qualificado" ou "desqualificado".
 *  - qualificado  -> aba "Qualificados" (linha completa)
 *  - desqualificado -> aba "Desqualificados" (só contagem: data, motivo, balde, UTMs)
 * Os cabeçalhos são criados automaticamente na primeira execução.
 */

var ABA_QUALIF = 'Qualificados';
var ABA_DESQUALIF = 'Desqualificados';

var HEADERS_QUALIF = [
  'Data', 'Nome', 'WhatsApp', 'Email', 'Empresa', 'Telefone comercial',
  'Estágio', 'Balde', 'Tier',
  'Autonomia (dias sem depender de você)', 'Setor', 'Papel',
  'Camada de liderança', 'Tamanho do time', 'Como decide', 'Já tentou',
  'Faturamento',
  'UTM Source', 'UTM Medium', 'UTM Campaign', 'UTM Content', 'UTM Term'
];

var HEADERS_DESQUALIF = [
  'Data/Hora', 'Motivo', 'Balde',
  'UTM Source', 'UTM Medium', 'UTM Campaign', 'UTM Content', 'UTM Term'
];

function doPost(e) {
  try {
    var p = (e && e.parameter) ? e.parameter : {};
    var aba = (p.aba || 'qualificado').toLowerCase();
    if (aba === 'desqualificado') {
      gravarDesqualificado(p);
    } else {
      gravarQualificado(p);
    }
    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function getSheet(nome, headers) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(nome);
  if (!sh) sh = ss.insertSheet(nome);
  if (sh.getLastRow() === 0) {
    sh.appendRow(headers);
    sh.getRange(1, 1, 1, headers.length).setFontWeight('bold');
    sh.setFrozenRows(1);
  }
  return sh;
}

function agora() {
  var tz = Session.getScriptTimeZone() || 'America/Sao_Paulo';
  return Utilities.formatDate(new Date(), tz, 'dd/MM/yyyy HH:mm:ss');
}

function gravarQualificado(p) {
  var sh = getSheet(ABA_QUALIF, HEADERS_QUALIF);
  sh.appendRow([
    agora(), p.nome || '', p.whatsapp || '', p.email || '', p.empresa || '', p.telefone_comercial || '',
    p.estagio || '', p.balde || '', p.tier || '',
    p.autonomia || '', p.setor || '', p.papel || '',
    p.camada_lideranca || '', p.tamanho_time || '', p.como_decide || '', p.ja_tentou || '',
    p.faturamento || '',
    p.utm_source || '', p.utm_medium || '', p.utm_campaign || '', p.utm_content || '', p.utm_term || ''
  ]);
}

function gravarDesqualificado(p) {
  var sh = getSheet(ABA_DESQUALIF, HEADERS_DESQUALIF);
  sh.appendRow([
    agora(), p.motivo || '', p.balde || '',
    p.utm_source || '', p.utm_medium || '', p.utm_campaign || '', p.utm_content || '', p.utm_term || ''
  ]);
}

/** Teste rápido no editor: Executar > testar. Deve criar as duas abas com cabeçalhos. */
function testar() {
  gravarQualificado({ aba: 'qualificado', nome: 'Teste Dono', whatsapp: '51999999999', email: 'teste@empresa.com.br',
    empresa: 'Empresa Teste', estagio: 'Estágio 2: No Limite', balde: 'lideranca', tier: 'pleno',
    autonomia: 'Nenhum, sempre me procuram', setor: 'Indústria', papel: 'Dono ou sócio, decido os rumos',
    faturamento: 'De R$3 a R$10 milhões', utm_source: 'teste' });
  gravarDesqualificado({ aba: 'desqualificado', motivo: 'papel', balde: 'decisao', utm_source: 'teste' });
}
