# Carrossel de anúncio: se eu te desse um conselho

**Cliente:** Gustavo Ono (@gustavo_ono)
**Data:** 2026-07-30
**Formato:** carrossel 4:5, 5 slides, 1080x1350
**Destino:** quiz de diagnóstico gratuito

## Arquivos

- `carrossel.template.html` — **é este que você edita.**
- `assets/gustavo-disco.png` — o retrato em disco.
- `embutir-imagens.py` — gera o `carrossel.html` a partir do template.
- `carrossel.html` — **gerado, não edite na mão.**
- `slides/slide_1.png` … `slide_5.png` — as peças finais.

## Estrutura

| # | Fundo | Conteúdo |
|---|---|---|
| 1 | creme | retrato em disco + "se eu te desse um conselho, seria este" |
| 2 | cacau | ~~Não é mais conteúdo no Instagram~~ → **Post não paga conta** |
| 3 | creme | ~~Não é mais um curso de técnica~~ → **Você já sabe fazer** |
| 4 | cacau | a virada: um **diagnóstico honesto**, em salmão |
| 5 | creme | retrato em disco + a chamada |

A copy é a do cliente, um bloco por slide. A divisão interna de cada bloco em
negação, correção e corpo é só hierarquia tipográfica, nenhuma palavra mudou de
lugar nem foi acrescentada.

**Alterações de pontuação**, pela regra da casa de zero travessões:

- bloco 2: "com preço que o cliente entende e valoriza — isso paga" → dois-pontos
- bloco 4: "onde está o gargalo — e o que mudar primeiro" → vírgula

## O sistema visual, e o que muda em relação aos outros três

Quarta composição para o mesmo cliente:

| | fatura bem x fatura pouco | 4 sinais | 3 erros | um conselho (este) |
|---|---|---|---|---|
| Alinhamento | esquerda | esquerda | esquerda | **centralizado**, o único |
| Espinha | bloco "Uma / A outra" | numerais gigantes | faixa de foto no topo | **negação riscada + correção em serifa** |
| Rótulos | kicker | kicker | selo preenchido | **nenhum**, a peça não tem rótulo algum |
| Fotografia | emoldurada | sangrando e recortada | faixa de 200px | **disco**, abrindo e fechando como parênteses |
| Densidade | média | média | alta | **baixa**, um pensamento por slide |

Permanece: creme `#EFE5D6`, cacau `#3B2A20`, marrom `#7A5540`, salmão `#E08A8A`,
Playfair Display no título, Plus Jakarta Sans no corpo, `@gustavo_ono` no rodapé,
sem assinatura no topo.

### Por que este sistema para esta copy

A copy tem outro registro: é conselho em primeira pessoa, e a estrutura dela é
**duas negações seguidas de uma afirmação**. O desenho segue isso literalmente.

A negação aparece riscada e apagada, e a correção vem logo abaixo em serifa
grande. O leitor vê o que foi descartado e o que ficou no lugar, no mesmo golpe
de vista. No slide 4 não há negação: é a única afirmação da série, e é o único
momento em que o salmão aparece no texto. A cor marca a virada.

O rosto abre e fecha a peça, em disco. Conselho é coisa de gente, não de marca,
então quem fala precisa aparecer nas duas pontas.

E é a peça mais silenciosa das quatro de propósito: sem rótulo, sem selo, sem
numeral, muito respiro. Depois de três carrosséis densos, o contraste de ritmo
no feed é um ativo, não um problema.

## Imagem

| Arquivo | Origem | Tratamento |
|---|---|---|
| `gustavo-disco.png` | `Fotos/IMG_7133.jpg` (5423x3391) | recorte quadrado no rosto e torso, máscara circular, ciclorama trocado por cacau para o disco assentar tanto no creme quanto no cacau |

## Como regerar

```bash
# 1. embute a imagem e gera o carrossel.html
python3 clientes/gustavo-ono/copy/carrosseis/2026-07-30-um-conselho/embutir-imagens.py

# 2. exporta os PNGs
python3 .claude/skills/carrossel-instagram/assets/exportar-slides.py \
  --html  clientes/gustavo-ono/copy/carrosseis/2026-07-30-um-conselho/carrossel.html \
  --saida clientes/gustavo-ono/copy/carrosseis/2026-07-30-um-conselho/slides
```

## Legenda do post

> Se eu te desse um conselho antes de você continuar tentando fazer sua
> chocolateria crescer, seria este.
>
> Não é mais conteúdo no Instagram, e não é mais um curso de técnica. Você já
> sabe fazer. O que falta é saber o que fazer com o que você já sabe.
>
> Clique em Saiba mais e responda o quiz.
