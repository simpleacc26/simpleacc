# Validação e geração do PDF

Estas validações são obrigatórias antes de qualquer PDF. Vieram de erros reais:
travessão tira a naturalidade do texto, e página sem altura fixa corta conteúdo
na quebra sem ninguém perceber até o cliente abrir o arquivo.

## 1. Travessões (tem que retornar 0)

```bash
grep -c '—' <arquivo>.html
```

Se sobrar, reescreva com vírgula, dois-pontos, ponto final ou parênteses.
Cabeçalhos e kickers usam "·". Intervalos usam "a" (de 60 a 100, 1 a 2
minutos). Não use traço nem para intervalos nem para apartes. Vale também para
a meia-risca "–".

## 2. Placeholders do modelo (tem que retornar 0)

```bash
grep -c 'ADAPTAR' <arquivo>.html
grep -o '{{[A-Z_]*}}' <arquivo>.html | sort -u
```

**Atenção, específico desta skill:** `{{nome}}`, `{{elo_dominante}}` e afins em
minúsculas **são conteúdo**, não placeholder. São as variáveis do funil e
aparecem no documento de propósito. O que não pode sobrar é placeholder do
modelo, que está em MAIÚSCULAS. Por isso o grep acima filtra por maiúsculas.

## 3. Estouro de página (esperado: TODAS-AS-PAGINAS-OK)

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

Para ver a folga de cada página (útil para decidir para onde mover um box),
troque a condição por `out.push('PG'+(i+1)+':'+Math.round(contentBottom))` e
leia todos os números. Abaixo de 1032 é o teto.

Se alguma página apertar, nesta ordem de preferência:

1. **Dividir a seção em parte 1 e parte 2** (nova `div.page`, com
   "Seção N · Parte M" no `.sk`). É o normal neste documento, não a exceção:
   o exemplo da Luana tem 6 seções em 23 páginas.
2. Mover um box inteiro para a página vizinha que tenha folga.
3. Enxugar texto (fundir bullets, cortar redundância).

Nunca: fonte abaixo de 10pt, mexer nas margens da `.page`, deixar conteúdo
encostar no rodapé.

**Se você dividir ou inserir páginas, renumere tudo.** O cabeçalho corrido traz
"Página N" e fica mentindo em silêncio. Renumere pela ordem do documento:

```python
import re
c=[1]
def ren(m):
    c[0]+=1
    return '<span>Página %d</span>'%c[0]
s=re.sub(r'<span>Página (?:\d+|X)</span>', ren, s)   # a capa não tem cabeçalho
```

## 4. Coerência de números (a validação que nenhum script pega)

Antes do PDF, releia as premissas da página 2 contra os números das outras
seções. O erro clássico: a premissa diz conversão de 30% e a projeção do
primeiro mês só fecha com 13%. Se os dois números existem, **o documento tem
que explicar a rampa**, não escolher um e esquecer o outro.

Mesmo teste para: ticket x meta mensal, número de sessões x capacidade real do
cliente, volume de abordagem x quem executa.

## 5. Encontrar o navegador

```bash
for BIN in "$PLAYWRIGHT_BROWSERS_PATH/chromium" /opt/pw-browsers/chromium \
  chromium chromium-browser google-chrome google-chrome-stable \
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"; do
  command -v "$BIN" >/dev/null 2>&1 || [ -x "$BIN" ] && { echo "$BIN"; break; }
done
```

## 6. Gerar o PDF

```bash
<navegador> --headless --disable-gpu --no-sandbox --no-pdf-header-footer \
  --print-to-pdf="<nome de entrega>.pdf" "file://<caminho-absoluto>/<arquivo>.html"
```

Confira abrindo um screenshot de ao menos uma página densa
(`--screenshot` com `--window-size=794,1123`; para ver a página N, esconda as
anteriores com um CSS temporário `.page:nth-of-type(-n+X){display:none;}`).

**Reduzir o tamanho** (útil para envio, e obrigatório se for tentar upload):

```python
import pikepdf   # pip install pikepdf
pdf = pikepdf.open("bruto.pdf")
pdf.save("final.pdf", compress_streams=True, recompress_flate=True,
         object_stream_mode=pikepdf.ObjectStreamMode.generate)
```

Tirou 38% num PDF de 26 páginas (385 KB para 240 KB) sem perder nada.

## 7. Fallback sem navegador

Entregue o HTML final e oriente: abrir no Chrome, imprimir, destino "Salvar
como PDF", papel A4, margens "Nenhuma", sem cabeçalho e rodapé. O HTML já está
paginado; o resultado é idêntico ao headless.
