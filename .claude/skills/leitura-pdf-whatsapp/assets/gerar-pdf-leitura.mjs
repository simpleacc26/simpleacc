/* ============================================================
   Gerador do PDF da leitura emocional (pro SDR enviar no WhatsApp).
   Node puro + Chromium do ambiente (sem dependências npm).

   Faz o que o --print-to-pdf sozinho não faz:
     1) PÁGINA ÚNICA: mede a altura real do conteúdo (na largura de
        celular) e emite UMA folha desse tamanho, sem espaço em branco.
     2) LINKS wa.me: monta o href de cada botão a partir do atributo
        data-wa (mensagem pronta) + o número passado em WHATSAPP.
     3) IMAGENS EMBUTIDAS: converte <img src="...jpeg/png"> em data URI.

   Uso:
     SRC=.../leitura.html OUT=.../leitura.pdf WHATSAPP=5531993196471 \
     WIDTH=400 node gerar-pdf-leitura.mjs

   Acha o Chromium sozinho (prefere headless_shell). Força com EXEC=<caminho>.
   ============================================================ */
import { readFileSync, writeFileSync, existsSync, mkdtempSync } from 'node:fs';
import { dirname, resolve, join } from 'node:path';
import { tmpdir } from 'node:os';
import { execSync, execFileSync } from 'node:child_process';

function findChromium() {
  if (process.env.EXEC) return process.env.EXEC;
  const patterns = [
    '/opt/pw-browsers/chromium_headless_shell-*/chrome-linux/headless_shell',
    '/opt/pw-browsers/chromium-*/chrome-linux/chrome',
    '/usr/bin/chromium', '/usr/bin/chromium-browser', '/usr/bin/google-chrome',
  ];
  for (const g of patterns) {
    try {
      const p = execSync(`ls -1 ${g} 2>/dev/null | head -1`).toString().trim();
      if (p && existsSync(p)) return p;
    } catch { /* segue */ }
  }
  throw new Error('Chromium não encontrado. Passe EXEC=<caminho do binário>.');
}

const SRC = process.env.SRC;
if (!SRC) { console.error('Falta SRC (caminho do HTML).'); process.exit(1); }
const OUT = process.env.OUT || SRC.replace(/\.html?$/i, '.pdf');
const WIDTH = parseInt(process.env.WIDTH || '400', 10);
const WHATSAPP = (process.env.WHATSAPP || '').replace(/\D/g, '');
if (!WHATSAPP) console.warn('Aviso: WHATSAPP não informado; os botões ficam sem link.');

const EXEC = findChromium();
const base = dirname(SRC);
let html = readFileSync(SRC, 'utf8');

// 1) embute imagens locais como data URI
html = html.replace(/src="([^"]+\.(?:jpe?g|png|webp))"/gi, (m, rel) => {
  if (/^data:|^https?:/i.test(rel)) return m;
  const p = resolve(base, rel);
  if (!existsSync(p)) { console.warn('Imagem não encontrada:', rel); return m; }
  const ext = rel.split('.').pop().toLowerCase().replace('jpg', 'jpeg');
  return `src="data:image/${ext};base64,${readFileSync(p).toString('base64')}"`;
});

// 2) monta os links do WhatsApp a partir de data-wa
if (WHATSAPP) {
  html = html.replace(/<a\s+class="btn"\s+data-wa="([^"]*)"/gi, (m, msg) =>
    `<a class="btn" href="https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}" data-wa="${msg}"`);
}

const dir = mkdtempSync(join(tmpdir(), 'leitura-'));
const chromeFlags = ['--headless', '--no-sandbox', '--disable-gpu'];

// 3) mede a altura real do conteúdo na largura de celular
const measureHtml = html.replace(/<\/body>/i,
  `<script>document.title=Math.ceil(document.body.getBoundingClientRect().height)+'px'</script></body>`);
const measurePath = join(dir, 'measure.html');
writeFileSync(measurePath, measureHtml);
const dom = execFileSync(EXEC, [...chromeFlags, `--window-size=${WIDTH},900`,
  '--virtual-time-budget=3000', '--dump-dom', `file://${measurePath}`],
  { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
const mt = dom.match(/<title>(\d+)px<\/title>/);
const h = (mt ? parseInt(mt[1], 10) : 1200) + 2; // +2px evita página fantasma

// 4) injeta @page de página única e gera o PDF
const finalHtml = html.replace(/<\/style>/i,
  `\n  @page{ size:${WIDTH}px ${h}px; margin:0 }\n</style>`);
const finalPath = join(dir, 'final.html');
writeFileSync(finalPath, finalHtml);
execFileSync(EXEC, [...chromeFlags, '--no-pdf-header-footer',
  `--print-to-pdf=${OUT}`, `file://${finalPath}`], { stdio: 'ignore' });

console.log(`PDF gerado: ${OUT} (${WIDTH}x${h}px, 1 página)`);
