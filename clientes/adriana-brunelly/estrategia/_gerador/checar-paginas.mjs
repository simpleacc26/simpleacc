import { chromium } from 'playwright';
const DOC='file:///home/user/simpleacc/clientes/adriana-brunelly/estrategia/2026-09-23-quiz-e-diagnostico-v2-para-validacao.html';
const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
const p=await b.newPage({viewport:{width:900,height:1200}});
await p.goto(DOC); await p.waitForTimeout(700);
const r=await p.evaluate(()=>{
  const MM=document.createElement('div'); MM.style.width='297mm'; MM.style.position='absolute';
  document.body.appendChild(MM); const H=MM.getBoundingClientRect().width; MM.remove();
  return [...document.querySelectorAll('.page')].map((pg,i)=>{
    const pr=pg.getBoundingClientRect();
    let fundo=0;
    // mede so o conteudo que flui: ignora runhead (absolute) e runfoot (absolute)
    pg.querySelectorAll('*').forEach(n=>{
      if(n.closest('.runfoot')||n.closest('.runhead')) return;
      const s=getComputedStyle(n); if(s.position==='absolute'||s.position==='fixed') return;
      const b2=n.getBoundingClientRect(); if(b2.height===0) return;
      fundo=Math.max(fundo, b2.bottom-pr.top);
    });
    const util = H - 14*(H/297) - 13*(H/297); // padding top+bottom em px
    return {p:i+1, alturaPagina:Math.round(H), conteudoAte:Math.round(fundo),
      estouro: Math.round(fundo - (H - 13*(H/297))),
      preenchimento: Math.round(100*(fundo - 14*(H/297))/util)};
  });
});
console.log(r.map(x=>`p${String(x.p).padStart(2)} | conteúdo até ${String(x.conteudoAte).padStart(4)}px de ${x.alturaPagina} | ${x.estouro>0?'ESTOURO +'+x.estouro+'px':'ok'} | preenchimento ${x.preenchimento}%`).join('\n'));
const med = Math.round(r.reduce((a,x)=>a+x.preenchimento,0)/r.length);
console.log('\npreenchimento médio:', med+'%', '| estouros:', r.filter(x=>x.estouro>0).map(x=>x.p).join(',')||'nenhum');
for (const n of [2,4,6,9,13]) {
  const el = await p.$$('.page');
  await el[n-1].screenshot({path:`v2-p${n}.png`});
}
await b.close();
