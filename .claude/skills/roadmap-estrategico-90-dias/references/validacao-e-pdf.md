# Validação e geração do PDF do roadmap

Estes ajustes vieram da entrega do Lucas Sobreiro (v1.0 → v1.1): travessões
tiram a naturalidade do texto e páginas sem altura fixa cortavam conteúdo na
quebra. As validações abaixo são obrigatórias antes de qualquer PDF.

## 1. Placeholders e comentários (tem que retornar 0)

```bash
grep -c '{{' <arquivo>.html
grep -c 'ADAPTAR' <arquivo>.html
```

## 2. Travessões (tem que retornar 0)

```bash
grep -c '—' <arquivo>.html
```

Se sobrar, reescreva com vírgula, dois-pontos, ponto final ou parênteses.
Cabeçalhos e kickers usam "·". Intervalos usam "a" (de 60 a 100, 1 a 2
minutos). Não use traço nem para intervalos nem para apartes.

## 3. Estouro de página (resultado esperado: TODAS-AS-PAGINAS-OK)

Copie o HTML para um arquivo temporário, acrescente antes de `</html>`:

```html
<script>
var out = [];
document.querySelectorAll('.page').forEach(function(p, i) {
  var contentBottom = 0;
  Array.from(p.children).forEach(function(c){ if(!c.classList.contains('runfoot')) contentBottom = Math.max(contentBottom, c.offsetTop + c.offsetHeight); });
  if (contentBottom > 1032) out.push('PG' + (i+1) + ':APERTADO(' + Math.round(contentBottom) + 'px)');
});
document.title = out.length ? out.join(' ') : 'TODAS-AS-PAGINAS-OK';
</script>
```

E rode:

```bash
<navegador> --headless --disable-gpu --no-sandbox \
  --dump-dom "file:///caminho/temp.html" 2>/dev/null | grep -o '<title>[^<]*</title>' | head -1
```

Se alguma página apertar, nesta ordem de preferência:
1. Mover um box inteiro para a página vizinha (ex.: "Foco deste roadmap" da
   página 2 para a 3).
2. Dividir a fase em parte 1 e parte 2 (nova `div.page`, mesmo fase-header
   apenas na primeira).
3. Enxugar texto (fundir bullets, cortar redundância).
Nunca: fonte abaixo de 10pt, mexer nas margens da `.page`, deixar conteúdo
encostar no rodapé.

## 4. Encontrar o navegador

```bash
for BIN in "$PLAYWRIGHT_BROWSERS_PATH/chromium" /opt/pw-browsers/chromium \
  chromium chromium-browser google-chrome google-chrome-stable \
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"; do
  command -v "$BIN" >/dev/null 2>&1 || [ -x "$BIN" ] && { echo "$BIN"; break; }
done
```

## 5. Gerar o PDF

```bash
<navegador> --headless --disable-gpu --no-sandbox --no-pdf-header-footer \
  --print-to-pdf="<mesmo-nome>.pdf" "file://<caminho-absoluto>/<arquivo>.html"
```

Confira o resultado abrindo um screenshot de ao menos uma página densa
(`--screenshot` com `--window-size=794,1123`; para ver a página N, esconda as
anteriores com um CSS temporário `.page:nth-of-type(-n+X){display:none;}`).

## 6. Fallback sem navegador

Entregue o HTML final e oriente: abrir no Chrome, imprimir, destino "Salvar
como PDF", papel A4, margens "Nenhuma", sem cabeçalho e rodapé. O HTML já
está paginado; o resultado é idêntico ao headless.
