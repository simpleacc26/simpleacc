// Confere a Pontuação de TODAS as combinações de qualificador dos dois caminhos
// contra a tabela da especificação, que está escrita aqui em ESPEC e também em
// estrategia/integracao-pulsar-webhooks.md.
//
//     node teste-pontos.js index.html
//
// Existe porque a régua já esteve errada sem ninguém notar: o caminho A somava
// a P4 no lugar da P8, e o número continuava parecendo plausível. Rode depois
// de mexer em ponto de qualquer pergunta.
//
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const path = require('path');
// aceita caminho relativo e cai no index.html desta pasta se nada for passado
const arquivo = path.resolve(process.argv[2] || path.join(__dirname, 'index.html'));

const ESPEC = {
  aColab: {"Acima de 500":10,"Entre 200 e 500":8,"Entre 100 e 200":6,
           "Entre 50 e 100":4,"Entre 20 e 50":2,"Menos de 20":1},
  a6: {"Até R$ 100.000":0,"De R$ 100.000 até R$ 200.000":1,
       "De R$ 200.000 até R$ 300.000":4,"De R$ 300.000 até R$ 500.000":8,
       "Acima de R$ 500.000":10},
  b6: {"Total, a decisão é minha":10,"Parcial, decido até um determinado valor":6,
       "Quase nenhuma, preciso de aprovação":0,"Nenhuma":0},
  bColab: {"Mais de 30":10,"Entre 16 e 30":8,"Entre 11 e 15":6,
           "Entre 05 e 10":4,"Entre 1 e 4":2,"Nenhum":0},
  b7: {"Até R$ 5.000":1,"De R$ 5.000 até R$ 10.000":2,"De R$ 10.000 até R$ 20.000":4,
       "De R$ 20.000 até R$ 50.000":6,"De R$ 50.000 até R$ 100.000":8,
       "Acima de R$ 100.000":10}
};

(async () => {
  const nav = await chromium.launch();
  const pag = await nav.newPage();
  await pag.route('**://www.googletagmanager.com/**', r => r.abort());
  await pag.goto('file://' + arquivo);

  // roda o cálculo direto na página, sem clicar 300 vezes
  const res = await pag.evaluate(() => {
    const saida = [];
    for(const via of ["A","B"]){
      const chaves = PONTUAM[via];
      const listas = chaves.map(c => P[c].ops);
      const combina = (k, acc) => {
        if(k === listas.length){
          R = {via: via};
          chaves.forEach((c, n) => { R["pt_"+c] = acc[n].pt; R["_"+c] = acc[n].t; });
          saida.push({via: via, respostas: acc.map(o => o.t), pontos: pontos()});
          return;
        }
        listas[k].forEach(o => combina(k+1, acc.concat([o])));
      };
      combina(0, []);
    }
    return saida;
  });
  await nav.close();

  let erros = 0;
  const chavesDe = v => v === "A" ? ["aColab","a6"] : ["b6","bColab","b7"];
  for(const r of res){
    const esperado = chavesDe(r.via).reduce((s,c,n) => s + ESPEC[c][r.respostas[n]], 0);
    if(esperado !== r.pontos){
      erros++;
      console.log(`ERRO ${r.via}: ${r.respostas.join(' | ')} -> página ${r.pontos}, espec ${esperado}`);
    }
  }
  const porVia = v => res.filter(r => r.via === v);
  for(const v of ["A","B"]){
    const p = porVia(v).map(r => r.pontos);
    console.log(`caminho ${v}: ${p.length} combinações · pontuação de ${Math.min(...p)} a ${Math.max(...p)}`);
  }
  console.log(erros === 0 ? "\nTODAS as combinações batem com a especificação" : `\n${erros} divergência(s)`);
  process.exit(erros ? 1 : 0);
})();
