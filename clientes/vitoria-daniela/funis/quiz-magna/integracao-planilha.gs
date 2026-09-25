/* ============================================================
   VITÓRIA DANIELA · Quizzes Magna → Planilha de Leads
   UM script para os DOIS funis:
     - Quiz Genérico (funis/quiz-magna)       → aba "Genérico"
     - Quiz Saúde    (funis/quiz-magna-saude) → aba "Saúde"
   Planilha: "Leads | New Quizzes - Vitória Daniela"
   (mesmo arquivo nas duas pastas; só precisa colar e implantar UMA vez)

   COMO ATIVAR (uma vez só, ~3 minutos):
   1. Abra a planilha "Leads | New Quizzes - Vitória Daniela".
   2. Menu  Extensões  →  Apps Script
   3. Apague o conteúdo e cole TODO este arquivo. Salve (ícone de disquete).
   4. No topo, escolha a função "configurar" e clique em Executar.
      Autorize o acesso (escolha a conta → "Avançado" → "Acessar (não seguro)"
      → Permitir). Isso escreve o cabeçalho nas duas abas.
   5. Botão  Implantar  →  Nova implantação
      - Tipo (engrenagem):  App da Web
      - Executar como:      Eu
      - Quem pode acessar:  Qualquer pessoa
   6. Implantar → copie a  URL do app da Web  (termina em /exec)
      e mande para a Simple. Ela vai no LEADS_ENDPOINT dos dois funis.
   ============================================================ */

var PLANILHA_ID = "1iBvdFUw3hjc-17FUfeKYespZx5pEfT6ucdxUuegbo1o";

/* [cabeçalho da coluna, campo enviado pelo funil] */
var BASE_INICIO = [["Data/Hora", "_data"], ["Nome", "nome"], ["WhatsApp", "whatsapp"], ["E-mail", "email"]];
var BASE_FIM = [
  ["Balde", "balde"], ["Camada", "camada"], ["Origem (URL de entrada)", "origem"], ["Referrer", "referrer"],
  ["UTM Source", "utm_source"], ["UTM Medium", "utm_medium"], ["UTM Campaign", "utm_campaign"],
  ["UTM Content", "utm_content"], ["UTM Term", "utm_term"]
];

var FRENTES = {
  "Quiz Magna": {
    aba: "Genérico",
    colunas: BASE_INICIO.concat([
      ["Segmento", "segmento"], ["Maior desafio", "desafio"], ["Momento", "momento"],
      ["Estrutura", "estrutura"], ["Faturamento", "faturamento"], ["Urgência", "urgencia"],
      ["Quer análise?", "quer_analise"]
    ], BASE_FIM)
  },
  "Quiz Saúde": {
    aba: "Saúde",
    colunas: BASE_INICIO.concat([
      ["Contatos pela internet", "contato"], ["Estrutura", "estrutura"], ["Maior desafio", "desafio"],
      ["Ticket médio", "ticket"], ["Urgência", "urgencia"], ["Faturamento", "faturamento"],
      ["Quer análise?", "quer_analise"]
    ], BASE_FIM)
  }
};

function frenteDe(d) {
  if (d.frente && FRENTES[d.frente]) return FRENTES[d.frente];
  return d.contato ? FRENTES["Quiz Saúde"] : FRENTES["Quiz Magna"];
}

function getSheet(cfg) {
  var ss = SpreadsheetApp.openById(PLANILHA_ID);
  return ss.getSheetByName(cfg.aba) || ss.insertSheet(cfg.aba);
}

function ensureHeader(sheet, cfg) {
  if (sheet.getLastRow() > 0) return; /* nunca sobrescreve uma aba já em uso */
  var header = cfg.colunas.map(function (c) { return c[0]; });
  sheet.getRange(1, 1, 1, header.length).setValues([header]).setFontWeight("bold");
  sheet.setFrozenRows(1);
}

function gravar(d) {
  var cfg = frenteDe(d);
  var sheet = getSheet(cfg);
  ensureHeader(sheet, cfg);
  var linha = cfg.colunas.map(function (c) {
    if (c[1] === "_data") return new Date();
    var s = d[c[1]] == null ? "" : String(d[c[1]]);
    /* texto começando com = + - @ viraria fórmula na planilha */
    if (/^[=+\-@\t\r]/.test(s)) s = "'" + s;
    return s.slice(0, 500);
  });
  sheet.appendRow(linha);
  return cfg.aba;
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(20000);
    var d = JSON.parse(e.postData.contents);
    var aba = gravar(d);
    return json({ ok: true, aba: aba });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  } finally {
    try { lock.releaseLock(); } catch (e2) {}
  }
}

/* Abrir a URL /exec no navegador mostra se a implantação está no ar. */
function doGet() { return json({ ok: true, status: "online" }); }

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

/* Executar → configurar: cria/deixa pronto o cabeçalho das duas abas. */
function configurar() {
  Object.keys(FRENTES).forEach(function (k) {
    var cfg = FRENTES[k];
    ensureHeader(getSheet(cfg), cfg);
  });
}

/* Executar → _teste: grava uma linha de teste em cada aba (apague depois). */
function _teste() {
  gravar({ frente: "Quiz Saúde", nome: "Teste Saúde", whatsapp: "(33) 99999-9999", email: "teste@email.com",
    contato: "Chegam muitos curiosos sem dinheiro, que somem quando passo o preço.",
    estrutura: "Tenho equipe fixa na clínica (recepção, outros profissionais), mas nada voltado ao digital.",
    desafio: "Ter previsibilidade de faturamento e organização", ticket: "Entre R$3.000 e R$10.000",
    urgencia: "Quero viabilizar o investimento em uma solução definitiva se fizer sentido para o meu crescimento.",
    faturamento: "Entre 40 e 70 mil", quer_analise: "Sim, quero que um especialista na área da saúde me traga o caminho para atrair pacientes com previsibilidade.",
    balde: "Sem Previsibilidade", camada: "A", origem: "teste", utm_source: "teste" });
  gravar({ frente: "Quiz Magna", nome: "Teste Genérico", whatsapp: "(33) 99999-9999", email: "teste@email.com",
    segmento: "Consultoria, mentoria ou educação", desafio: "Ter previsibilidade de faturamento e estratégia para crescer.",
    momento: "Já vendo com consistência no digital, mas preciso escalar meu negócio.",
    estrutura: "Tenho uma estrutura completa (equipe de marketing e equipe comercial)",
    faturamento: "Entre 40 e 70 mil",
    urgencia: "Quero viabilizar o investimento em uma solução definitiva se fizer sentido para o meu crescimento.",
    quer_analise: "Sim, quero que um especialista em high ticket me traga o caminho para atrair clientes com previsibilidade.",
    balde: "Sem Previsibilidade", camada: "A", origem: "teste", utm_source: "teste" });
}
