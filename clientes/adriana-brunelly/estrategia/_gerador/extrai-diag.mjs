import { chromium } from 'playwright';
import http from 'http'; import fs from 'fs'; import path from 'path';
const DIR = '/home/user/simpleacc/clientes/adriana-brunelly/funis/quiz-divida-de-valor';
const TYPES = {'.html':'text/html','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.webp':'image/webp'};
const srv = http.createServer((q,r)=>{
  let f=q.url.split('?')[0]; if(f==='/')f='/index.html';
  const p=path.join(DIR,f);
  if(!fs.existsSync(p)){r.writeHead(404);return r.end();}
  r.writeHead(200,{'Content-Type':TYPES[path.extname(p)]||'text/plain'}); r.end(fs.readFileSync(p));
});
await new Promise(res=>srv.listen(4322,res));
const perfis = {
  agenda:   {segmento:"buffet",volume:"9a15",orcamento:"desconto",extras:"absorvo",ticket:"15a30",desconto:"10a20",equipe:"20a30",comissao:"5a8",tentativas:"curso",sentimento:"nao_sobra",objetivo:"menos_mais",faturamento:"40a80",nomeResp:"Adriana"},
  orcamento:{segmento:"decoracao",volume:"ate3",orcamento:"some",extras:"quase_nunca",ticket:"8a15",desconto:"nenhum",equipe:"nunca_fiz",comissao:"nao_trabalho",tentativas:"instagram",sentimento:"sobrou_menos",objetivo:"procurada",faturamento:"25a40",nomeResp:"Adriana"},
};
const b = await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
const res = {};
for (const [k,a] of Object.entries(perfis)) {
  const pg = await b.newPage();
  await pg.addInitScript(([key,ans])=>{ sessionStorage.setItem(key, JSON.stringify({view:0,answers:ans,started:true})); },
    ["adriana_divida_de_valor", a]);
  await pg.goto('http://localhost:4322/diagnostico.html');
  await pg.waitForSelector('.etapa, .numerao', {timeout:8000});
  res[k] = await pg.evaluate(()=>{
    const pega = el => [...el.children].filter(n=>!/^(H3|FIGURE)$/.test(n.tagName)).map(n=>n.outerHTML);
    const blocos = [...document.querySelectorAll('.etapa')].map(e=>({
      titulo: (e.querySelector('h3')||{}).textContent || "",
      html: pega(e).join("\n"),
      destaque: e.classList.contains('destaque'),
    }));
    const topo = document.querySelector('.resultado-topo, header.resultado, .abre');
    return {
      titulo: (document.querySelector('h1')||{}).textContent||"",
      lead: (document.querySelector('h1')||{}).nextElementSibling?.outerHTML||"",
      blocos,
      numerao: (document.querySelector('.numerao')||{}).outerHTML||"",
      cta: (document.querySelector('.cta-box')||{}).outerHTML||"",
      entrada: (document.querySelector('.entrada')||{}).outerHTML||"",
      corpoInteiro: document.body.innerHTML.length,
    };
  });
  await pg.close();
}
fs.writeFileSync('diag-extraido.json', JSON.stringify(res,null,1));
console.log(Object.keys(res).map(k=>k+": "+res[k].blocos.length+" blocos, h1='"+res[k].titulo.slice(0,60)+"'").join("\n"));
console.log("\n--- titulos (agenda) ---\n"+res.agenda.blocos.map((b,i)=>i+". "+b.titulo).join("\n"));
await b.close(); srv.close();
