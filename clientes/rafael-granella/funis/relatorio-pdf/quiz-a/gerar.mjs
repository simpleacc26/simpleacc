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

  /* Sem transform: ele quebra a paginação (o Chromium fatia o elemento
     transformado). Deixamos o layout refluir na largura da folha A4. */
  #root { width: 794px; }
  #root .max-w-4xl { max-width: 794px; }
  #root .p-12 { padding: 28px; }
  #root .p-10 { padding: 26px; }
  #root .p-6 { padding: 18px; }

  /* Nenhum bloco visual é cortado ao meio pela quebra de página. */
  .rounded-3xl, .rounded-xl, .rounded-2xl { break-inside: avoid; page-break-inside: avoid; }
  h1, h2, h3 { break-after: avoid; page-break-after: avoid; }
  p, li { break-inside: avoid; orphans: 3; widows: 3; }
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
    format: 'A4',
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
