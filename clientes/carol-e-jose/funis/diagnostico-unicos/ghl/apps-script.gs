/**
 * ÚNICOS — Diagnóstico de Maturidade: ingestão de leads + painel de métricas.
 *
 * Instalação (uma vez):
 *  1. Abra a planilha de leads no Google Sheets.
 *  2. Extensões > Apps Script. Cole este arquivo inteiro (substituindo o conteúdo). Salve.
 *  3. Rode a função `setup` (menu Executar > setup) e autorize. Ela cria/alinha as abas
 *     "Qualificados", "Desqualificados" e "Painel" com os cabeçalhos e as fórmulas.
 *  4. Implantar > Nova implantação > tipo "App da Web".
 *       - Executar como: Eu.
 *       - Quem tem acesso: Qualquer pessoa.
 *  5. Copie a URL do app da Web (termina em /exec) e cole em CONFIG.LEADS_ENDPOINT
 *     no diagnostico.html.
 *
 * Depois do setup, pode APAGAR as abas antigas (as com "Q1 - Papel", "Bucket" etc.),
 * elas foram substituídas pela nova estrutura.
 *
 * Roteamento: o funil envia o campo "aba" = "qualificado" ou "desqualificado".
 *  - qualificado    -> aba "Qualificados" (linha completa)
 *  - desqualificado -> aba "Desqualificados" (só contagem: data, motivo, balde, UTMs)
 */

var ABA_QUALIF = 'Qualificados';
var ABA_DESQ = 'Desqualificados';
var ABA_PAINEL = 'Painel';

// A ordem das colunas de HEADERS_QUALIF é a mesma que gravarQualificado() escreve.
// Tier = coluna I (9) ; UTM Content = coluna U (21). O Painel depende disso.
var HEADERS_QUALIF = [
  'Data', 'Nome', 'WhatsApp', 'Email', 'Empresa', 'Telefone comercial',
  'Estágio', 'Balde', 'Tier',
  'Autonomia (dias sem depender de você)', 'Setor', 'Papel',
  'Camada de liderança', 'Tamanho do time', 'Como decide', 'Já tentou',
  'Faturamento',
  'UTM Source', 'UTM Medium', 'UTM Campaign', 'UTM Content', 'UTM Term'
];

var HEADERS_DESQ = [
  'Data/Hora', 'Motivo', 'Balde',
  'UTM Source', 'UTM Medium', 'UTM Campaign', 'UTM Content', 'UTM Term'
];

// ---------------------------------------------------------------------------
// SETUP: cria/alinha as abas e monta o Painel. Idempotente (pode rodar de novo).
// ---------------------------------------------------------------------------
function setup() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  ensureHeaders(ss, ABA_QUALIF, HEADERS_QUALIF);
  ensureHeaders(ss, ABA_DESQ, HEADERS_DESQ);
  montarPainel(ss);
  // Deixa as 3 abas novas no começo.
  [ABA_QUALIF, ABA_DESQ, ABA_PAINEL].forEach(function (nome, i) {
    var sh = ss.getSheetByName(nome);
    if (sh) { ss.setActiveSheet(sh); ss.moveActiveSheet(i + 1); }
  });
}

function ensureHeaders(ss, nome, headers) {
  var sh = ss.getSheetByName(nome) || ss.insertSheet(nome);
  sh.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight('bold');
  sh.setFrozenRows(1);
  return sh;
}

function montarPainel(ss) {
  var sh = ss.getSheetByName(ABA_PAINEL) || ss.insertSheet(ABA_PAINEL);
  sh.clear();
  sh.getRange('A1:F1')
    .setValues([[
      'Criativo (utm_content)', 'Aprovados pleno', 'Aprovados tier 2',
      'Aprovados (total)', 'Verba do criativo (R$)', 'Custo por lead aprovado (R$)'
    ]])
    .setFontWeight('bold');
  sh.setFrozenRows(1);

  // Lista automática de criativos e contagens de aprovados por criativo.
  sh.getRange('A2').setFormula(
    '=IFERROR(SORT(UNIQUE(FILTER(Qualificados!U2:U, Qualificados!U2:U<>""))),)');
  sh.getRange('B2').setFormula(
    '=IFERROR(MAP(A2#, LAMBDA(c, COUNTIFS(Qualificados!$U:$U, c, Qualificados!$I:$I, "pleno"))),)');
  sh.getRange('C2').setFormula(
    '=IFERROR(MAP(A2#, LAMBDA(c, COUNTIFS(Qualificados!$U:$U, c, Qualificados!$I:$I, "tier2"))),)');
  sh.getRange('D2').setFormula(
    '=IFERROR(MAP(A2#, LAMBDA(c, COUNTIFS(Qualificados!$U:$U, c, Qualificados!$I:$I, "pleno") + COUNTIFS(Qualificados!$U:$U, c, Qualificados!$I:$I, "tier2"))),)');

  // Coluna E = verba investida por criativo (preenchida à mão).
  // Coluna F = custo por lead aprovado = verba / aprovados. Pré-preenchida para 300 linhas.
  var custo = [];
  for (var r = 2; r <= 300; r++) {
    custo.push(['=IF(N($D' + r + ')>0, IF($E' + r + '<>"", $E' + r + '/$D' + r + ', ""), "")']);
  }
  sh.getRange(2, 6, custo.length, 1).setFormulas(custo);
  sh.getRange('E2:F300').setNumberFormat('#,##0.00');

  // Resumo rápido.
  sh.getRange('H2').setValue('Resumo').setFontWeight('bold');
  sh.getRange('H3').setValue('Aprovados (total)');
  sh.getRange('I3').setFormula('=COUNTA(Qualificados!A2:A)');
  sh.getRange('H4').setValue('Desqualificados (total)');
  sh.getRange('I4').setFormula('=COUNTA(Desqualificados!A2:A)');
  sh.getRange('H6').setValue('Preencha a coluna E (verba por criativo). O resto é automático.')
    .setFontStyle('italic').setFontColor('#5c6672');

  sh.setColumnWidth(1, 230);
  sh.setColumnWidths(2, 5, 130);
}

// ---------------------------------------------------------------------------
// INGESTÃO
// ---------------------------------------------------------------------------
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
  if (!sh) sh = ensureHeaders(ss, nome, headers);
  if (sh.getLastRow() === 0) ensureHeaders(ss, nome, headers);
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
  var sh = getSheet(ABA_DESQ, HEADERS_DESQ);
  sh.appendRow([
    agora(), p.motivo || '', p.balde || '',
    p.utm_source || '', p.utm_medium || '', p.utm_campaign || '', p.utm_content || '', p.utm_term || ''
  ]);
}

/** Teste rápido no editor: Executar > testar. Cria linhas de exemplo nas duas abas. */
function testar() {
  gravarQualificado({ aba: 'qualificado', nome: 'Teste Dono', whatsapp: '51999999999', email: 'teste@empresa.com.br',
    empresa: 'Empresa Teste', estagio: 'Estágio 2: No Limite', balde: 'lideranca', tier: 'pleno',
    autonomia: 'Nenhum, sempre me procuram', setor: 'Indústria', papel: 'Dono ou sócio, decido os rumos',
    faturamento: 'De R$3 a R$10 milhões', utm_source: 'meta', utm_content: 'card-a-industria' });
  gravarDesqualificado({ aba: 'desqualificado', motivo: 'papel', balde: 'decisao', utm_source: 'meta', utm_content: 'teste-3-genz' });
}
