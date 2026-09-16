const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const DIR = __dirname;
const HEAD = `<div style="font-family:Arial,sans-serif; font-size:6.5px; letter-spacing:2px; color:#9aa6b6; text-transform:uppercase; width:100%; padding:0 56px; box-sizing:border-box; display:flex; justify-content:space-between;"><span>Simple Acc</span><span>Copies de Aquisicao &middot; Romulo Heleno</span></div>`;
const FOOT = `<div style="font-family:Arial,sans-serif; font-size:6.5px; letter-spacing:2px; color:#9aa6b6; text-transform:uppercase; width:100%; padding:0 56px; box-sizing:border-box; display:flex; justify-content:space-between;"><span>Confidencial</span><span>20 criativos &middot; Diagnostico das Mechas</span></div>`;
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  const p = await b.newPage();
  await p.goto('file://' + DIR + '/copies-aquisicao.html', { waitUntil: 'networkidle' });
  await p.pdf({ path: DIR + '/../Copies_Aquisicao__Romulo_Heleno.pdf', format: 'Letter', printBackground: true,
    displayHeaderFooter: true, headerTemplate: HEAD, footerTemplate: FOOT,
    margin: { top: '64px', bottom: '56px', left: '56px', right: '56px' } });
  await b.close(); console.log('PDF OK');
})();
