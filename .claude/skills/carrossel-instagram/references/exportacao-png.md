# Exportação dos slides em PNG 1080x1350

Depois que a pessoa aprovou o preview, cada slide vira uma imagem pronta para
subir no Instagram.

## O comando

```bash
python3 .claude/skills/carrossel-instagram/assets/exportar-slides.py \
  --html  clientes/<cliente>/copy/carrosseis/<pasta>/carrossel.html \
  --saida clientes/<cliente>/copy/carrosseis/<pasta>/slides
```

O número de slides é detectado sozinho pelo HTML. Use `--slides N` só se quiser
exportar um recorte.

Saída: `slide_1.png` até `slide_N.png`, todos **1080x1350**.

## Por que funciona assim

O carrossel é desenhado a **420px de largura**. A exportação **não redimensiona
o layout**, ela aumenta a densidade de pixels:

- `device_scale_factor = 1080 / 420 = 2.5714` faz o Chromium renderizar em alta
  densidade. Um elemento de 420px vira 1080px na imagem, e fonte, espaçamento e
  posição continuam exatamente como no preview.
- `clip` recorta só a área do slide, sem sobra da página.
- `track.style.transition = 'none'` desliga a animação de swipe para o slide
  encaixar na hora, sem borrão de meio caminho.
- A moldura do Instagram (`.ig-header`, `.ig-dots`, `.ig-actions`,
  `.ig-caption`) é escondida antes do screenshot. Ela existe só para aprovação.

## Os quatro erros que sempre acontecem

| Erro | O que quebra | Como evitar |
|---|---|---|
| Colocar o viewport em 1080x1350 | o layout reflui, a fonte fica minúscula e o espaçamento desmonta | mantenha 420x525 e use `device_scale_factor` |
| Gerar o HTML com script de shell | `$`, crase e números viram variável de shell e corrompem o conteúdo | gere HTML com Python (`Path.write_text()`) |
| Não esperar as fontes | os títulos saem em fonte de sistema, e ninguém percebe até postar | o script já espera `document.fonts.ready` mais 3s |
| Mudar a largura da `.ig-frame` | nada bate com o preview aprovado | 420px é fixo, sempre |

## Imagens do usuário

Sempre em **base64 embutido** no HTML, nunca por caminho relativo. É o que
garante que o arquivo funcione sozinho no navegador headless e na mão do cliente.

Antes de embutir, confira o formato **real**:

```bash
file caminho/da/imagem.png
```

Arquivo com extensão `.png` é JPEG por dentro com muita frequência. Use o MIME
certo (`data:image/jpeg;base64,...` ou `data:image/png;base64,...`), senão a
imagem simplesmente não aparece.

## Ambiente

O Chromium já vem instalado no ambiente remoto. Se faltar o pacote Python:

```bash
pip install playwright
```

**Não rode `playwright install`.** A versão que o pip pede quase nunca é a que
está em disco. O script já detecta isso sozinho e aponta para o Chromium de
`/opt/pw-browsers/`, então é só rodar.

## Conferir antes de entregar

1. Todos os PNGs saíram em **1080x1350**.
2. Os títulos estão na fonte certa, não em fonte de sistema.
3. Nenhum texto encostou na barra de progresso.
4. O **último** slide não tem seta e a barra está cheia.
5. O contador bate: o último é `N/N`.
