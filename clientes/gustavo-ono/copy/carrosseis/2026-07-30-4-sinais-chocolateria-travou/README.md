# Carrossel de anúncio: 4 sinais de que sua chocolateria travou

**Cliente:** Gustavo Ono (@gustavo_ono)
**Data:** 2026-07-30
**Formato:** carrossel 4:5, 6 slides, 1080x1350
**Destino:** quiz de diagnóstico gratuito

## Arquivos

- `carrossel.template.html` — **é este que você edita.** As imagens aparecem como
  marcadores `__IMG_HERO__` e `__IMG_RECORTE__`.
- `assets/` — as imagens já tratadas.
- `embutir-imagens.py` — gera o `carrossel.html` a partir do template.
- `carrossel.html` — **gerado, não edite na mão.** Preview navegável, autocontido.
- `slides/slide_1.png` … `slide_6.png` — as peças finais.

## Estrutura

| # | Fundo | Imagem | Conteúdo |
|---|---|---|---|
| 1 | foto sangrada | Gustavo no ateliê | 4 sinais de que sua chocolateria travou, mesmo que você ainda esteja vendendo |
| 2 | creme | numeral `01` | Você não sabe qual produto te dá mais lucro |
| 3 | cacau | numeral `02` | Seu preço tem medo embutido |
| 4 | creme | numeral `03` | Você está mais ocupada produzindo do que vendendo |
| 5 | cacau | numeral `04` | Você não consegue explicar por que um mês é bom e outro é ruim |
| 6 | creme | recorte do Gustavo | Se você se identificou com qualquer um desses, o diagnóstico gratuito é o próximo passo |

A copy é a do cliente, um bloco por slide.

**Uma alteração de texto, e o motivo:** a copy veio com travessões ("travou —
mesmo que", "de verdade — e qual te faz", "zero tempo — e zero energia"). A regra
da casa é zero travessões, então viraram vírgulas. Nenhuma palavra foi trocada.

## O que muda em relação ao carrossel "fatura bem x fatura pouco"

Mesma identidade, outro sistema de composição, para as duas peças não parecerem
a mesma no feed:

| | fatura bem x fatura pouco | 4 sinais |
|---|---|---|
| Espinha | bloco de contraste "Uma / A outra" | **numerais gigantes** `01` a `04` |
| Fotografia | emoldurada em canto arredondado | **sangrando** na abertura, **recorte** no fecho |
| Fio | curto, de remate sob o corpo | **longo**, sob o numeral, atravessando o slide |
| Salmão | só nos kickers | **numerais e citação**, com peso de destaque |
| Fecho | gradiente de chocolate | creme, com o recorte do Gustavo |

O que permanece: paleta creme `#EFE5D6` e cacau `#3B2A20`, títulos em `#7A5540`,
Playfair Display no título e Plus Jakarta Sans no corpo, `@gustavo_ono` no rodapé,
sem assinatura no topo.

## Imagens, e de onde vieram

Do Drive do cliente, em `Simple <> Gustavo Ono / 2. Material Visual / Fotos`:

| Arquivo | Origem | Tratamento |
|---|---|---|
| `gustavo-atelie.jpg` | `IMG_4438.jpg` (2268x4032) | enquadrado em 4:5, 840x1050, sob véu de cacau |
| `gustavo-recorte.png` | `IMG_7133.jpg` (5423x3391) | fundo de estúdio removido por chave de luminância e saturação, respingos limpos, 620x795 |

Não usei a `IMG_6202.jpg` (cozinha com os potes coloridos): os azuis, verdes e
vermelhos brigam com a paleta creme e cacau. Serve melhor para thumbnail de vídeo
do que para anúncio nesta identidade.

## Como regerar

```bash
# 1. embute as imagens e gera o carrossel.html
python3 clientes/gustavo-ono/copy/carrosseis/2026-07-30-4-sinais-chocolateria-travou/embutir-imagens.py

# 2. exporta os PNGs
python3 .claude/skills/carrossel-instagram/assets/exportar-slides.py \
  --html  clientes/gustavo-ono/copy/carrosseis/2026-07-30-4-sinais-chocolateria-travou/carrossel.html \
  --saida clientes/gustavo-ono/copy/carrosseis/2026-07-30-4-sinais-chocolateria-travou/slides
```

## Legenda do post

> Dá pra estar vendendo e mesmo assim estar travada.
>
> São 4 sinais: você não sabe qual produto dá lucro, seu preço tem medo embutido,
> você produz mais do que vende, e não consegue explicar por que um mês é bom e o
> outro não.
>
> Clique em Saiba mais, responda o quiz e receba seu diagnóstico gratuito.
