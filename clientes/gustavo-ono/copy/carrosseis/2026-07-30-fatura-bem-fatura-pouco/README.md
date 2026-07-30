# Carrossel de anúncio: fatura bem x fatura pouco

**Cliente:** Gustavo Ono (@gustavo_ono)
**Data:** 2026-07-30
**Formato:** carrossel 4:5, 7 slides, 1080x1350
**Destino:** quiz de diagnóstico gratuito

## Arquivos

- `carrossel.html` — preview navegável na moldura do Instagram. Abra no navegador
  e arraste para o lado, ou use as setas do teclado.
- `slides/slide_1.png` … `slide_7.png` — as peças finais, prontas para subir.

## Estrutura

| # | Fundo | Conteúdo |
|---|---|---|
| 1 | creme | "Duas chocolateiras. Mesmo produto. Faturamentos diferentes." |
| 2 | cacau | Não é o produto. Talento não é o diferencial. |
| 3 | creme | Não é o volume. |
| 4 | cacau | É o cardápio. (Uma / A outra) |
| 5 | creme | É a precificação. (Uma / A outra) |
| 6 | cacau | É a estrutura de venda. (Uma / A outra) |
| 7 | gradiente | CTA: o quiz diagnostica as três. Clique em Saiba mais. |

A copy dos slides 1 a 6 é a do cliente, praticamente literal. O slide 7 separa a
frase final do bloco 6 ("essas três coisas são o que o quiz ajuda a diagnosticar")
para virar o CTA, já que o último slide não leva seta e fecha o carrossel.

## Identidade

Espelhada dos criativos de melhor performance, não da linha antiga de "print de
post". Paleta creme `#EFE5D6` e cacau `#3B2A20`, títulos em `#7A5540`, acento
salmão `#E08A8A`. Playfair Display no título e Plus Jakarta Sans no corpo.
Assinatura no topo e `@gustavo_ono` no rodapé de todos os slides.

Device criado para este carrossel: o bloco de contraste **"Uma / A outra"**, com
a chave em serifa itálica, repetido nos slides 4, 5 e 6. É ele que amarra as três
diferenças visualmente.

## Pendência

Os criativos que performam têm **foto de produto** recortada. Este carrossel é só
tipografia, então sobra respiro no topo dos slides 2 a 6. Com o banco de imagens
do cliente (chocolate artístico, trufas, bolo) dá para preencher esse espaço e
subir o nível das peças.

## Como regerar os PNGs

```bash
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
