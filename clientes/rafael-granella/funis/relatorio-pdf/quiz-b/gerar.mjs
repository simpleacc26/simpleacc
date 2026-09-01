// Gera o PDF do relatório do Quiz B já preenchido com o nome do lead.
//
// A página de relatório do Quiz B (../../2026-07-15-relatorio-B-web.html) é a
// mesma que está no ar e já monta o conteúdo a partir de ?pilar= e &nome=.
// Aqui só abrimos ela com os dados do lead e imprimimos, então o PDF sai igual
// ao que o lead viu na tela, com o nome dele.
//
// Uso:
//   node gerar.mjs saida.pdf "João Carlos" "Mentalidade"

import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';
import path from 'node:path';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const dir = path.dirname(fileURLToPath(import.meta.url));
const paginaRelatorio = path.join(dir, '..', '..', '2026-07-15-relatorio-B-web.html');
const fontesEmbutidas = path.join(dir, '..', 'fontes-embed.css');

// O nome do pilar que aparece pro lead (e que o Make grava no GHL e na planilha)
// vira o código de uma letra que a página de relatório espera na URL.
export const CODIGO_DO_PILAR = {
  'Método': 'M',
  'Modelo de negócio': 'N',
  'Processo de vendas': 'V',
  'Mentalidade': 'T',
};

// Roda dentro do navegador. Tira o que não vai pro PDF e distribui os cards em
// folhas, agrupando o máximo que cabe em cada uma. O CSS centraliza o grupo na
// vertical, então o espaço que sobra fica dividido entre topo e rodapé em vez de
// se acumular embaixo.
function paginar({ alturaFolha, respiro, espaco }) {
  const doc = document.querySelector('.doc');

  // No PDF o lead já está com o relatório em mãos: o botão de agendar não
  // funciona num arquivo, e a assinatura do rodapé é redundante.
  doc.querySelector('.rep-foot')?.remove();
  doc.querySelector('.cta')?.remove();

  const blocos = Array.from(doc.children);
  const util = alturaFolha - 2 * respiro;

  const folhas = [];
  let atual = [];
  let altura = 0;

  for (const bloco of blocos) {
    const h = bloco.getBoundingClientRect().height;
    const gap = atual.length ? espaco : 0;
    if (atual.length && altura + gap + h > util) {
      folhas.push(atual);
      atual = [];
      altura = 0;
    }
    atual.push(bloco);
    altura += (atual.length > 1 ? espaco : 0) + h;
  }
  if (atual.length) folhas.push(atual);

  doc.innerHTML = '';
  for (const grupo of folhas) {
    const folha = document.createElement('div');
    folha.className = 'folha-pdf';
    for (const bloco of grupo) folha.appendChild(bloco);
    doc.appendChild(folha);
  }
  return folhas.length;
}

export async function gerarPdf({ nome, pilar }, destino) {
  const codigo = CODIGO_DO_PILAR[pilar] || pilar;
  if (!['M', 'N', 'V', 'T'].includes(codigo)) {
    throw new Error(`Pilar não reconhecido: "${pilar}". Use um de: ${Object.keys(CODIGO_DO_PILAR).join(', ')}`);
  }

  const navegador = await chromium.launch();
  const pagina = await navegador.newPage({ viewport: { width: 1100, height: 1400 } });

  // Sem internet no gerador: as fontes da marca entram embutidas em base64.
  await pagina.addInitScript(() => {
    window.dataLayer = window.dataLayer || [];
  });

  const url = `file://${paginaRelatorio}?pilar=${codigo}&nome=${encodeURIComponent(nome)}`;
  await pagina.goto(url, { waitUntil: 'networkidle' });
  await pagina.addStyleTag({ content: fs.readFileSync(fontesEmbutidas, 'utf8') });
  await pagina.addStyleTag({
    content: `
      @page { size: A4; margin: 0; }
      * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      #previewBar { display: none !important; }

      .card, .rep-head, .scen, .case, .scarcity, .diag-pill, .cta-wrap {
        break-inside: avoid;
        page-break-inside: avoid;
      }
      h1, h2, h3 { break-after: avoid; page-break-after: avoid; }
      p { orphans: 3; widows: 3; }

      /* Cada folha é uma caixa de altura fixa com os cards centralizados
         na vertical, então não sobra um vazio grande só no rodapé. */
      .doc { padding-top: 0 !important; padding-bottom: 0 !important; }
      .folha-pdf {
        height: 296mm;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 24px;
        break-after: page;
        page-break-after: always;
      }
      .folha-pdf > * { margin-bottom: 0 !important; margin-top: 0 !important; }
      .folha-pdf:last-child { break-after: auto; page-break-after: auto; }
    `,
  });
  await pagina.emulateMedia({ media: 'print' });
  await pagina.waitForTimeout(400);

  await pagina.evaluate(paginar, { alturaFolha: 296 * 96 / 25.4, respiro: 30, espaco: 24 });
  await pagina.waitForTimeout(200);
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
  const [destino = 'relatorio.pdf', nome = 'Lead', pilar = 'Mentalidade'] = process.argv.slice(2);
  await gerarPdf({ nome, pilar }, destino);
  console.log('gerado:', destino);
}
