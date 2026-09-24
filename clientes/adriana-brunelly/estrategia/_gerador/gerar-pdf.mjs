import { chromium } from 'playwright';
const SRC='file:///home/user/simpleacc/clientes/adriana-brunelly/estrategia/2026-09-23-quiz-e-diagnostico-v3-para-validacao.html';
const OUT='/home/user/simpleacc/clientes/adriana-brunelly/estrategia/Quiz e Diagnóstico v3 - Adriana Brunelly - 23.09.26.pdf';
const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
const p=await b.newPage();
await p.goto(SRC,{waitUntil:'networkidle'});
await p.pdf({path:OUT,format:'A4',printBackground:true,margin:{top:0,right:0,bottom:0,left:0}});
await b.close();
console.log('pdf ok');
