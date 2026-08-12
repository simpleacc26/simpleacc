# Export: de HTML para PNG 1080x1350

Depois que a pessoa aprovou o preview, cada slide vira **um PNG 1080x1350**,
pronto para subir no Instagram sem passar por editor nenhum.

## Rodando

```bash
pip install playwright      # só na primeira vez
python3 .claude/skills/carrossel-instagram/assets/exportar-slides.py caminho/carrossel.html
```

Saída padrão: `slides/slide_1.png ... slide_N.png` ao lado do HTML.

| Flag | Para quê |
|------|----------|
| `-o pasta/` | outra pasta de saída |
| `-n 7` | forçar a quantidade (o padrão conta os `.slide` da página) |
| `--prefix nome` | prefixo dos arquivos |
| `--font-wait 5000` | fonte pesada demorando para carregar |
| `--chromium /caminho` | apontar o binário na mão |

No Claude Code na web o Chromium do playwright quase nunca bate com o do
ambiente. O script já cai sozinho no `/opt/pw-browsers/chromium`. **Nunca rode
`playwright install`** aqui.

## As 3 regras que não se quebram

1. **Gere o HTML com Python** (`Path.write_text()`), nunca com heredoc de shell.
   Shell interpola `$`, crase e número dentro do HTML e corrompe o conteúdo de
   um jeito silencioso.
2. **Imagem sempre em base64** dentro do HTML. Confira o formato real com `file`
   antes: JPEG salvo como `.png` com MIME errado some no export sem erro.
3. **O layout continua a 420px.** Quem escala é o `device_scale_factor`
   (1080 / 420 = 2,5714...). Viewport 1080 de largura refluiria tudo.

## Como o script funciona

```python
VIEW_W, VIEW_H = 420, 525
SCALE = 1080 / VIEW_W

page = await browser.new_page(
    viewport={"width": VIEW_W, "height": VIEW_H},
    device_scale_factor=SCALE,
)
await page.goto(html_path.resolve().as_uri(), wait_until="networkidle")
await page.wait_for_timeout(3000)     # Google Fonts
```

Depois ele:

1. **Esconde a moldura**: `.ig-header, .ig-dots, .ig-actions, .ig-caption`
   viram `display:none`; `.ig-frame` e `.carousel-viewport` são fixados em
   420x525 sem borda, sombra ou margem.
2. **Anda no track**: `transition:none` e
   `transform: translateX(-i * 420px)` para o slide encaixar na hora.
3. **Fotografa com clip**: `clip={"x":0,"y":0,"width":420,"height":525}`.

O `device_scale_factor` é o pulo do gato: o navegador renderiza em alta
densidade e o elemento de 420px sai com 1080px de largura, com fonte,
espaçamento e posição idênticos ao preview.

> O script usa `page.goto(file://...)` no lugar de `set_content`. O resultado é
> o mesmo e ainda funciona se algum asset local tiver ficado de fora. A regra
> do base64 continua valendo: o HTML entregue precisa abrir sozinho.

## Erros clássicos

| Erro | O que acontece | Como evitar |
|------|----------------|-------------|
| Viewport em 1080x1350 | layout reflui: fonte minúscula, espaçamento quebrado | viewport 420x525 + `device_scale_factor` |
| Gerar HTML por shell script | `$`, crase e número viram variável de shell | gerar com Python |
| Não esperar as fontes | título sai na fonte de sistema | `wait_for_timeout(3000)` |
| Não esconder a moldura | o PNG sai com cabeçalho, dots e legenda | esconder as 4 classes `.ig-*` |
| Mudar a largura da `.ig-frame` | nada bate com o preview | 420px, sempre |
| MIME errado no base64 | a imagem simplesmente não aparece | `file arquivo` antes de embutir |

## Conferência final

- [ ] `N` PNGs, um por slide, todos **1080x1350** (`python3 -c "import struct;..."` ou `file *.png`)
- [ ] Título na fonte certa (não caiu para Times/Arial)
- [ ] Nenhum texto encostando ou passando por cima da barra de progresso
- [ ] Barra crescendo de slide em slide, contador batendo com o total
- [ ] Seta presente em todos, **menos** no último
- [ ] Imagens embutidas aparecendo
