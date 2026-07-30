/**
 * Gera playbook-call-vendas-simpleacc.pdf a partir do HTML diagramado.
 *
 *   node gerar-pdf.js
 *
 * Requer Chromium + playwright disponíveis na sessão (no Claude Code remoto já vêm
 * instalados). O HTML é escrito sem <html>/<head>/<body> porque também é publicado
 * como artifact — este script envolve o conteúdo antes de renderizar.
 */
const fs = require('fs');
const os = require('os');
const path = require('path');

const SRC = path.join(__dirname, 'playbook-call-vendas-simpleacc.html');
const OUT = path.join(__dirname, 'playbook-call-vendas-simpleacc.pdf');
const CHROME = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';

function resolvePlaywright() {
  try {
    return require('playwright');
  } catch (e) {
    return require('/opt/node22/lib/node_modules/playwright');
  }
}

(async () => {
  const { chromium } = resolvePlaywright();

  const tmp = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'playbook-')), 'print.html');
  fs.writeFileSync(
    tmp,
    '<!doctype html>\n<html lang="pt-BR" data-theme="light">\n<head>\n' +
      '<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n' +
      '<style>*,*::before,*::after{box-sizing:border-box}body{margin:0}img{max-width:100%}</style>\n' +
      '</head>\n<body>\n' +
      fs.readFileSync(SRC, 'utf8') +
      '\n</body>\n</html>\n'
  );

  const launchOpts = fs.existsSync(CHROME) ? { executablePath: CHROME } : {};
  const browser = await chromium.launch(launchOpts);
  const page = await browser.newPage();
  await page.goto('file://' + tmp, { waitUntil: 'networkidle' });
  await page.emulateMedia({ media: 'print', colorScheme: 'light' });

  const bar =
    'width:100%;font-family:Helvetica,Arial,sans-serif;color:#8197B6;' +
    'padding:0 16mm;display:flex;justify-content:space-between;';

  await page.pdf({
    path: OUT,
    format: 'A4',
    printBackground: true,
    displayHeaderFooter: true,
    margin: { top: '19mm', bottom: '17mm', left: '16mm', right: '16mm' },
    headerTemplate:
      `<div style="${bar}font-size:7pt;letter-spacing:.14em;text-transform:uppercase;">` +
      '<span>Simple Acc &middot; Playbook de call de vendas</span><span>Interno &middot; Carlos</span></div>',
    footerTemplate:
      `<div style="${bar}font-size:7.5pt;">` +
      '<span>Mentoria 3 meses &middot; R$ 2.497</span><span class="pageNumber"></span></div>',
  });

  await browser.close();
  console.log('PDF gerado: ' + OUT);
})();
