const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const HEAD = `<div style="font-family:Arial,sans-serif; font-size:6.5px; letter-spacing:2px; color:#9aa6b6; text-transform:uppercase; width:100%; padding:0 56px; box-sizing:border-box; display:flex; justify-content:space-between;"><span>Simple Acc</span><span>Estrategia &middot; Romulo Heleno</span></div>`;
const FOOT = `<div style="font-family:Arial,sans-serif; font-size:6.5px; letter-spacing:2px; color:#9aa6b6; text-transform:uppercase; width:100%; padding:0 56px; box-sizing:border-box; display:flex; justify-content:space-between;"><span>Confidencial</span><span>Funil de Quiz &middot; Mentoria Cabelo de Segunda</span></div>`;
(async () => {
  const dir='/tmp/claude-0/-home-user-simpleacc/9850fd48-ca90-578a-9728-ca254849f639/scratchpad';
  const b = await chromium.launch();
  const p = await b.newPage();
  await p.goto('file://'+dir+'/romulo.html', {waitUntil:'networkidle'});
  await p.pdf({ path:dir+'/romulo-estrategia.pdf', format:'Letter', printBackground:true,
    displayHeaderFooter:true, headerTemplate:HEAD, footerTemplate:FOOT,
    margin:{ top:'64px', bottom:'56px', left:'56px', right:'56px' } });
  await b.close(); console.log('PDF OK');
})();
