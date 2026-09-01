import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

// playwright pode estar instalado globalmente (ambiente remoto) ou local
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const dir = path.dirname(fileURLToPath(import.meta.url));
const template = path.join(dir, 'relatorio-pdf.html');

const PILARES = [
  ['M', 'relatorio-metodo'],
  ['N', 'relatorio-modelo-de-negocio'],
  ['V', 'relatorio-processo-de-vendas'],
  ['T', 'relatorio-mentalidade'],
];

const browser = await chromium.launch();
const page = await browser.newPage();

for (const [codigo, nome] of PILARES) {
  await page.goto(`file://${template}?pilar=${codigo}`, { waitUntil: 'networkidle' });
  await page.emulateMedia({ media: 'print' });
  await page.pdf({
    path: path.join(dir, `${nome}.pdf`),
    format: 'A4',
    printBackground: true,
    margin: { top: '0', right: '0', bottom: '0', left: '0' },
  });
  console.log(`gerado: ${nome}.pdf`);
}

await browser.close();
