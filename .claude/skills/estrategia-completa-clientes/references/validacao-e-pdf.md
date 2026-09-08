# Validação e geração do PDF da Estratégia Completa

Mesmas regras do roadmap, porque a identidade e o CSS são os mesmos: travessões
tiram a naturalidade do texto e páginas sem altura fixa cortavam conteúdo na
quebra. As validações abaixo são obrigatórias antes de qualquer PDF.

## 1. Placeholders e comentários (tem que retornar 0)

```bash
grep -c 'ADAPTAR' <arquivo>.html          # tem que dar 0
grep -o '{{[A-Z_]*}}' <arquivo>.html      # tem que vir vazio
```

Atenção: as variáveis de **copy** em minúscula (`{{nome}}`,
`{{estagio_dominante}}`, `{{h1}}`) são **conteúdo do documento e ficam**. Só os
campos de template em MAIÚSCULA precisam sumir.

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
1. Mover um box inteiro para a página vizinha (ex.: um dos boxes da página 2 para a 3).
2. Dividir a seção em parte 1 e parte 2 (nova `div.page`, mesmo sec-header
   apenas na primeira).
3. Enxugar texto (fundir bullets, cortar redundância).
Nunca: fonte abaixo de 10pt, mexer nas margens da `.page`, deixar conteúdo
encostar no rodapé.

## 3b. Renumerar depois de dividir

Se você dividiu ou inseriu páginas, **renumere tudo**: o cabeçalho corrido traz
"Página N" e passa a mentir em silêncio.

```python
import re
c=[1]                                   # a capa não tem cabeçalho
def ren(m):
    c[0]+=1
    return '<span>Página %d</span>'%c[0]
s=re.sub(r'<span>Página (?:\d+|X)</span>', ren, s)
```

Para ver a folga de cada página e decidir para onde mover um box, troque a
condição do script de validação por
`out.push('PG'+(i+1)+':'+Math.round(contentBottom))` e leia todos os números.

## 3c. Coerência de números (a validação que nenhum script pega)

Antes do PDF, releia as premissas contra os números das outras seções. O erro
clássico: a premissa diz conversão de 30% e a projeção do primeiro mês só fecha
com 13%. Quando os dois números existem, **o documento tem que explicar a
rampa** (13%, 20%, 30% ao longo do trimestre), e não escolher um e esquecer o
outro.

Mesmo teste para: ticket x meta mensal, número de sessões x capacidade real do
cliente, volume de abordagem x quem executa, e calendário dentro dos 90 dias.

**E nunca invente dado de pessoa.** Nome de filho, de sócio ou de cliente que
não está em nenhuma fonte não entra no documento, nem como detalhe humano.

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

## 5b. Reduzir o tamanho do PDF

```python
import pikepdf   # pip install pikepdf
pdf = pikepdf.open("bruto.pdf")
pdf.save("final.pdf", compress_streams=True, recompress_flate=True,
         object_stream_mode=pikepdf.ObjectStreamMode.generate)
```

Tirou 38% num PDF de 26 páginas (385 KB para 240 KB), sem perder nada.

## 6. Fallback sem navegador

Entregue o HTML final e oriente: abrir no Chrome, imprimir, destino "Salvar
como PDF", papel A4, margens "Nenhuma", sem cabeçalho e rodapé. O HTML já
está paginado; o resultado é idêntico ao headless.
