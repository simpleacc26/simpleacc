# Carrossel de anúncio: fatura bem x fatura pouco

**Cliente:** Gustavo Ono (@gustavo_ono)
**Data:** 2026-07-30
**Formato:** carrossel 4:5, 6 slides, 1080x1350
**Destino:** quiz de diagnóstico gratuito

## Arquivos

- `carrossel.template.html` — **é este que você edita.** As imagens aparecem como
  marcadores `__IMG_PRODUTO__`, `__IMG_TEXTURA__` e `__IMG_GUSTAVO__`.
- `assets/` — as imagens já tratadas (recorte, redimensionamento, recorte circular).
- `embutir-imagens.py` — gera o `carrossel.html` a partir do template, com as
  imagens embutidas em base64.
- `carrossel.html` — **gerado, não edite na mão.** Preview navegável na moldura do
  Instagram, autocontido. Abra no navegador e arraste, ou use as setas do teclado.
- `slides/slide_1.png` … `slide_6.png` — as peças finais, prontas para subir.

## Estrutura

| # | Fundo | Imagem | Conteúdo |
|---|---|---|---|
| 1 | creme | foto de produto | O que separa a chocolateira que fatura bem da que fatura pouco, com o mesmo produto |
| 2 | cacau | textura, slide inteiro | Não é o produto. Talento não é o diferencial. |
| 3 | creme | sem imagem | Não é o volume. |
| 4 | cacau | textura, faixa de cima | É o cardápio. (Uma / A outra) |
| 5 | creme | sem imagem | É a precificação. (Uma / A outra) |
| 6 | gradiente | retrato do Gustavo | É a estrutura de venda. (Uma / A outra) + o fecho no quiz |

**A copy é a do cliente, na íntegra, um bloco por slide.** Nada foi reescrito nem
acrescentado. O slide 6 fecha o carrossel: sem seta, barra cheia, e a frase final
do bloco 6 ("essas três coisas são o que o quiz ajuda a diagnosticar no seu
negócio") em destaque sobre o gradiente.

Não há slide de CTA explícito, porque a copy fornecida não tinha um. O botão
"Saiba mais" do anúncio no Meta e a legenda do post cumprem esse papel. Se quiser
um sétimo slide só de chamada, é rápido de acrescentar.

## Identidade

Espelhada dos criativos de melhor performance, não da linha antiga de "print de
post". Paleta creme `#EFE5D6` e cacau `#3B2A20`, títulos em `#7A5540`, acento
salmão `#E08A8A`. Playfair Display no título e Plus Jakarta Sans no corpo.
`@gustavo_ono` no rodapé de todos os slides.

Não há assinatura no topo. O `GUSTAVO ONO | CHOCOLATE | CURSOS` chegou a existir,
espelhando os criativos, mas foi removido a pedido do cliente. O espaço que ele
ocupava passou a ser das imagens.

Device criado para este carrossel: o bloco de contraste **"Uma / A outra"**, com
a chave em serifa itálica, repetido nos slides 4, 5 e 6. É ele que amarra as três
diferenças visualmente.

Os criativos de referência serviram **só como espelho de identidade visual**
(paleta, tipografia, fios, uso de foto). A copy deles não entra nas peças.

## Imagens, e de onde vieram

Todas saíram do Drive do cliente, em `Simple <> Gustavo Ono / 2. Material Visual`:

| Arquivo | Origem | Tratamento |
|---|---|---|
| `produto-bombons.jpg` | `Fotos/morango.png` (1536x1024) | recorte fechando no prato, 960x594 |
| `textura-chocolate.jpg` | base do criativo `Criativos/Estáticos/13.png` | faixa inferior, sem os balões de texto |
| `gustavo-retrato.png` | `Fotos/gustavo.png` (200x276) | recorte circular, fundo de estúdio trocado por cacau |

**Ressalva de qualidade:** a `gustavo.png` do Drive tem só 200x276. Por isso o
retrato entra pequeno, em 66px, onde a resolução não aparece. Para usá-lo grande,
em meia página como nos criativos, é preciso a foto original em alta.

O mesmo vale para produto: `morango.png` é a única foto de produto em boa
resolução na pasta. Com mais fotos dá para variar as peças em vez de repetir a
textura nos dois slides escuros.

## Como regerar

Depois de editar `carrossel.template.html` ou trocar algo em `assets/`, rode os
dois passos, nesta ordem:

```bash
# 1. embute as imagens e gera o carrossel.html
python3 clientes/gustavo-ono/copy/carrosseis/2026-07-30-fatura-bem-fatura-pouco/embutir-imagens.py

# 2. exporta os PNGs
python3 .claude/skills/carrossel-instagram/assets/exportar-slides.py \
  --html  clientes/gustavo-ono/copy/carrosseis/2026-07-30-fatura-bem-fatura-pouco/carrossel.html \
  --saida clientes/gustavo-ono/copy/carrosseis/2026-07-30-fatura-bem-fatura-pouco/slides
```

## Legenda do post

> Duas chocolateiras, o mesmo produto, faturamentos completamente diferentes.
>
> A diferença não está no talento. Não está no volume de produção. Está em três
> coisas que ninguém vê no feed: cardápio, precificação e rotina de venda.
>
> Clique em Saiba mais, responda o quiz e receba o seu diagnóstico gratuito na hora.
