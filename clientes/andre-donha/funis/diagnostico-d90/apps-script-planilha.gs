/**
 * Diagnóstico D-90 → planilha de leads da Simple
 *
 * Planilha: https://docs.google.com/spreadsheets/d/1UFHepDQms_exYAOCIX8lGnkBRLvo5B9WuXwnPeJvcHo/edit
 *
 * COMO PUBLICAR (leva 2 minutos, e só quem é dono da planilha consegue):
 *
 *   1. Abra a planilha → Extensões → Apps Script.
 *   2. Apague o conteúdo do Code.gs e cole este arquivo inteiro.
 *   3. Salve (disquete).
 *   4. Implantar → Nova implantação → engrenagem → App da Web.
 *        Executar como:        Eu
 *        Quem pode acessar:    Qualquer pessoa
 *   5. Implantar → Autorizar acesso → escolher a conta → Avançado →
 *      "Acessar Diagnóstico (não seguro)" → Permitir.
 *   6. Copiar a URL do app da Web (termina em /exec).
 *
 * Essa URL é o webhook. Ela vai em dois lugares:
 *   - na página da Vercel (constante WEBHOOK no index.html)
 *   - no Lovable, para o quiz do André gravar na mesma planilha
 */

var COLUNAS = [
  'data_hora','nome','whatsapp','email','cidade',
  'indice_d90','faixa','elo_dominante',
  'orcamento_faixa','orcamento_referencia','vazamento_min','vazamento_max',
  'p1_papel','p2_producoes_ano','p3_antecedencia','p4_onde_escapa','p5_custo',
  'p6_controle','p7_tentativa','p8_objetivo','p9_orcamento',
  'conta_criada','origem','utm_source','utm_campaign','utm_content'
];

function doPost(e) {
  var trava = LockService.getScriptLock();
  try {
    trava.waitLock(20000);

    var dados = JSON.parse(e.postData.contents);
    var aba = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];

    // Na primeira gravação, escreve e congela o cabeçalho.
    if (aba.getLastRow() === 0) {
      aba.appendRow(COLUNAS);
      aba.getRange(1, 1, 1, COLUNAS.length).setFontWeight('bold');
      aba.setFrozenRows(1);
    }

    var linha = COLUNAS.map(function (coluna) {
      var valor = dados[coluna];
      return (valor === undefined || valor === null) ? '' : valor;
    });
    aba.appendRow(linha);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true, linha: aba.getLastRow() }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (erro) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, erro: String(erro) }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    trava.releaseLock();
  }
}

// Abrir a URL no navegador responde isto. Serve só para conferir que está no ar.
function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, servico: 'Diagnóstico D-90' }))
    .setMimeType(ContentService.MimeType.JSON);
}
