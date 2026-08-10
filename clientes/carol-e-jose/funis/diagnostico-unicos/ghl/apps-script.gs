/**
 * ÚNICOS — Diagnóstico de Maturidade: ingestão de leads + painel de métricas.
 *
 * Instalação (uma vez):
 *  1. Abra a planilha de leads no Google Sheets.
 *  2. Extensões > Apps Script. Cole este arquivo inteiro (substituindo o conteúdo). Salve.
 *  3. Rode a função `setup` (menu Executar > setup) e autorize (aceite também a
 *     permissão de gatilhos). Ela cria/alinha as abas "Qualificados", "Desqualificados"
 *     e "Painel" e instala os gatilhos que mantêm o Painel atualizado sozinho.
 *  4. Implantar > Nova implantação > tipo "App da Web".
 *       - Executar como: Eu.
 *       - Quem tem acesso: Qualquer pessoa.
 *  5. Copie a URL do app da Web (termina em /exec) e cole em CONFIG.LEADS_ENDPOINT
 *     no diagnostico.html.
 *
 * IMPORTANTE (locale): esta planilha está em pt-BR, onde o separador de fórmulas é
 * ";". Por isso o Painel NÃO usa fórmulas (davam "#ERRO!") — ele é calculado no
 * código e gravado como valores, e se atualiza sozinho (a cada lead, num gatilho de
 * 5 min e quando você edita a coluna "Verba"). Se editar o código depois, rode
 * `setup` de novo para reinstalar os gatilhos.
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
  atualizarPainel(ss);
  instalarGatilhos();
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

// ---------------------------------------------------------------------------
// PAINEL
// A planilha está em locale pt-BR (separador de argumentos = ";"), então
// fórmulas com vírgula (MAP/LAMBDA/FILTER/COUNTIFS) dão "#ERRO!". Para não
// depender de locale, o Painel é calculado em JavaScript e gravado como VALORES.
// Ele se atualiza sozinho: a cada lead novo (doPost), num gatilho de tempo e
// quando você edita a coluna "Verba" (onEdit). Nada de fórmula frágil.
// ---------------------------------------------------------------------------

// Monta só a estrutura (cabeçalhos, larguras, resumo). Não mexe nos dados.
function montarPainel(ss) {
  var sh = ss.getSheetByName(ABA_PAINEL) || ss.insertSheet(ABA_PAINEL);
  sh.getRange('A1:F1')
    .setValues([[
      'Criativo (utm_content)', 'Aprovados pleno', 'Aprovados tier 2',
      'Aprovados (total)', 'Verba do criativo (R$)', 'Custo por lead aprovado (R$)'
    ]])
    .setFontWeight('bold');
  sh.setFrozenRows(1);
  sh.getRange('E2:F1000').setNumberFormat('#,##0.00');

  // Resumo rápido (valores, gravados por atualizarPainel).
  sh.getRange('H2').setValue('Resumo').setFontWeight('bold');
  sh.getRange('H3').setValue('Aprovados (total)');
  sh.getRange('H4').setValue('Desqualificados (total)');
  sh.getRange('H6').setValue('Preencha a coluna E (verba por criativo). O resto atualiza sozinho.')
    .setFontStyle('italic').setFontColor('#5c6672');

  sh.setColumnWidth(1, 230);
  sh.setColumnWidths(2, 5, 130);
}

// Recalcula o Painel a partir da aba Qualificados. Preserva a Verba (col E)
// que você digita, casando pelo nome do criativo (utm_content).
function atualizarPainel(ss) {
  // Cuidado: o gatilho de tempo chama esta função passando um evento como 1º
  // argumento. Só aceitamos um Spreadsheet de verdade; senão, pega o ativo.
  if (!ss || typeof ss.getSheetByName !== 'function') {
    ss = SpreadsheetApp.getActiveSpreadsheet();
  }
  var painel = ss.getSheetByName(ABA_PAINEL) || ss.insertSheet(ABA_PAINEL);
  var qualif = ss.getSheetByName(ABA_QUALIF);

  // 1) Guarda a verba já digitada, por criativo, antes de reescrever.
  var verbaPorCriativo = {};
  var ultLinha = painel.getLastRow();
  if (ultLinha >= 2) {
    var atuais = painel.getRange(2, 1, ultLinha - 1, 5).getValues(); // A..E
    atuais.forEach(function (r) {
      var nome = String(r[0] || '').trim();
      if (nome && r[4] !== '' && r[4] !== null) verbaPorCriativo[nome] = r[4];
    });
  }

  // 2) Agrega os aprovados por criativo (col U = utm_content, col I = tier).
  var COL_TIER = 9, COL_CONTENT = 21;
  var mapa = {}; // criativo -> {pleno, tier2}
  if (qualif && qualif.getLastRow() >= 2) {
    var dados = qualif.getRange(2, 1, qualif.getLastRow() - 1, COL_CONTENT).getValues();
    dados.forEach(function (row) {
      var criativo = String(row[COL_CONTENT - 1] || '(sem utm_content)').trim() || '(sem utm_content)';
      var tier = String(row[COL_TIER - 1] || '').trim().toLowerCase();
      if (!mapa[criativo]) mapa[criativo] = { pleno: 0, tier2: 0 };
      if (tier === 'pleno') mapa[criativo].pleno++;
      else if (tier === 'tier2') mapa[criativo].tier2++;
      else mapa[criativo].pleno++; // sem tier definido conta como aprovado pleno
    });
  }

  // 3) Monta as linhas ordenadas por criativo.
  var criativos = Object.keys(mapa).sort();
  var linhas = criativos.map(function (c) {
    var pleno = mapa[c].pleno, tier2 = mapa[c].tier2, total = pleno + tier2;
    var verba = verbaPorCriativo.hasOwnProperty(c) ? verbaPorCriativo[c] : '';
    var custo = (verba !== '' && total > 0) ? (Number(verba) / total) : '';
    return [c, pleno, tier2, total, verba, custo];
  });

  // 4) Limpa a área de dados e grava os valores.
  painel.getRange('A2:F1000').clearContent();
  if (linhas.length) {
    painel.getRange(2, 1, linhas.length, 6).setValues(linhas);
  }

  // 5) Resumo.
  var totalQ = qualif ? Math.max(0, qualif.getLastRow() - 1) : 0;
  var desq = ss.getSheetByName(ABA_DESQ);
  var totalD = desq ? Math.max(0, desq.getLastRow() - 1) : 0;
  painel.getRange('I3').setValue(totalQ);
  painel.getRange('I4').setValue(totalD);
}

// Gatilhos: recalcula sozinho a cada 5 min e ao editar a coluna Verba.
function instalarGatilhos() {
  var existentes = ScriptApp.getProjectTriggers();
  var jaTempo = false, jaEdit = false;
  existentes.forEach(function (t) {
    var fn = t.getHandlerFunction();
    if (fn === 'atualizarPainel') jaTempo = true;
    if (fn === 'aoEditar') jaEdit = true;
  });
  if (!jaTempo) {
    ScriptApp.newTrigger('atualizarPainel').timeBased().everyMinutes(5).create();
  }
  if (!jaEdit) {
    ScriptApp.newTrigger('aoEditar').forSpreadsheet(SpreadsheetApp.getActiveSpreadsheet())
      .onEdit().create();
  }
}

// Editou a coluna Verba (E) no Painel? Recalcula o custo daquela linha na hora.
function aoEditar(e) {
  try {
    if (!e || !e.range) return;
    var sh = e.range.getSheet();
    if (sh.getName() !== ABA_PAINEL) return;
    if (e.range.getColumn() !== 5 || e.range.getRow() < 2) return;
    var linha = e.range.getRow();
    var total = Number(sh.getRange(linha, 4).getValue());
    var verba = sh.getRange(linha, 5).getValue();
    var custo = (verba !== '' && verba !== null && total > 0) ? (Number(verba) / total) : '';
    sh.getRange(linha, 6).setValue(custo);
  } catch (err) { /* silencioso */ }
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
    try { atualizarPainel(); } catch (e2) { /* painel não pode derrubar a ingestão */ }
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
  atualizarPainel();
}
