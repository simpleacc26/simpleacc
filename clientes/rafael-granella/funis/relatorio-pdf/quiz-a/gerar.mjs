// Gera o PDF do relatório do Quiz A já preenchido com as respostas do lead.
// O corpo do documento é o HTML capturado do app de produção, então o PDF sai
// idêntico ao que o lead viu na tela.
//
// Uso:
//   node gerar.mjs saida.pdf '{"nome":"Fulano","objetivo":"...","gargalo":"...","custo":"...","tentou":"..."}'

import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';
import path from 'node:path';
import { PROXIMO_PASSO, PROXIMO_PASSO_PADRAO } from './dados.mjs';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const dir = path.dirname(fileURLToPath(import.meta.url));

const escaparHtml = (s) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

export function montarHtml(lead) {
  const corpo = fs.readFileSync(path.join(dir, 'corpo-template.html'), 'utf8');
  const css = fs.readFileSync(path.join(dir, 'estilos-producao.css'), 'utf8');
  const fontes = fs.readFileSync(path.join(dir, '..', 'fontes-embed.css'), 'utf8');

  const valores = {
    NOME: lead.nome,
    OBJETIVO: lead.objetivo,
    GARGALO: lead.gargalo,
    CUSTO: lead.custo,
    TENTOU: lead.tentou,
    PROXPASSO: PROXIMO_PASSO[lead.gargalo] || PROXIMO_PASSO_PADRAO,
  };

  const preenchido = Object.entries(valores).reduce(
    (html, [chave, valor]) => html.split(`{{${chave}}}`).join(escaparHtml(valor)),
    corpo,
  );

  return `<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8" />
<title>Diagnóstico do seu negócio de mentoria</title>
<style>${fontes}</style>
<style>${css}</style>
<style>
  @page { size: A4; margin: 0; }
  * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  html, body { background: #1c1c42; margin: 0; padding: 0; }
  /* o app usa largura de tela; no A4 reduzimos pra caber sem cortar */
  #root { width: 1000px; transform: scale(0.7); transform-origin: top left; }
  .rounded-3xl, .rounded-xl { break-inside: avoid; }
</style>
</head><body><div id="root">${preenchido}</div></body></html>`;
}

export async function gerarPdf(lead, destino) {
  const navegador = await chromium.launch();
  const pagina = await navegador.newPage();
  await pagina.setContent(montarHtml(lead), { waitUntil: 'networkidle' });
  await pagina.emulateMedia({ media: 'print' });
  await pagina.pdf({
    path: destino,
    width: '210mm',
    printBackground: true,
    margin: { top: '0', right: '0', bottom: '0', left: '0' },
  });
  await navegador.close();
  return destino;
}

const executadoDiretamente = process.argv[1] && process.argv[1].endsWith('gerar.mjs');
if (executadoDiretamente) {
  const destino = process.argv[2] || 'relatorio.pdf';
  const lead = JSON.parse(process.argv[3] || '{}');
  await gerarPdf(lead, destino);
  console.log('gerado:', destino);
}
