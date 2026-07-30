# Carrossel de anúncio: 3 erros que comem a margem

**Cliente:** Gustavo Ono (@gustavo_ono)
**Data:** 2026-07-30
**Formato:** carrossel 4:5, 6 slides, 1080x1350
**Destino:** quiz de diagnóstico gratuito

## Arquivos

- `carrossel.template.html` — **é este que você edita.** As imagens são marcadores.
- `assets/` — as faixas já recortadas.
- `embutir-imagens.py` — gera o `carrossel.html` a partir do template.
- `carrossel.html` — **gerado, não edite na mão.**
- `slides/slide_1.png` … `slide_6.png` — as peças finais.

## Estrutura

| # | Fundo | Faixa de foto | Conteúdo |
|---|---|---|---|
| 1 | cacau | caixa e fileiras de bombons | 3 erros que estão comendo a margem da sua chocolateria, sem você perceber |
| 2 | creme | bombom cortado, recheio à mostra | Erro 01: você não conta seu tempo no custo |
| 3 | cacau | bandejas e a caixa da marca | Erro 02: você vende o que o cliente pede |
| 4 | creme | a mão dele segurando um bombom | Erro 03: você não tem produto âncora |
| 5 | cacau | sem faixa | Esses erros aparecem no extrato no fim do mês |
| 6 | salmão | sem faixa | Clique em Saiba mais, responda o quiz e descubra qual está te custando mais |

A copy é a do cliente. Os 5 blocos numerados viraram os slides 1 a 5, e a
chamada final, que veio solta depois do bloco 5, virou o slide 6. Nada foi
reescrito.

**Uma alteração de pontuação:** o bloco 3 tinha travessão ("não funciona assim
— você define o cardápio"). Pela regra da casa virou dois-pontos. Nenhuma
palavra mudou.

## O sistema visual, e o que muda em relação aos outros dois

Terceira composição para o mesmo cliente. Identidade igual, estrutura diferente:

| | fatura bem x fatura pouco | 4 sinais | 3 erros (este) |
|---|---|---|---|
| Espinha | bloco "Uma / A outra" | numerais gigantes | **layout partido**: faixa de foto no topo, corte reto, texto embaixo |
| Rótulo | kicker solto | kicker solto | **selo preenchido** em salmão |
| Fotografia | emoldurada | sangrando e recortada | **faixa fixa de 200px**, uma por slide, sempre no mesmo lugar |
| Fecho | gradiente de chocolate | creme com recorte | **salmão cheio**, cor que nenhum dos dois usou de fundo |
| Ritmo | alternado o tempo todo | alternado o tempo todo | quebra no slide 5, que perde a faixa antes da chamada |

Permanece: creme `#EFE5D6`, cacau `#3B2A20`, marrom `#7A5540`, salmão `#E08A8A`,
Playfair Display no título, Plus Jakarta Sans no corpo, `@gustavo_ono` no rodapé,
sem assinatura no topo.

A faixa na mesma altura em todos os slides é o que faz a peça ler como série. O
slide 5 perde a faixa de propósito: é o único momento em que o texto ocupa a peça
inteira, e é onde a copy vira o jogo ("aparecem no extrato").

## Imagens, e de onde vieram

Todas do Drive, em `Simple <> Gustavo Ono / 2. Material Visual / Fotos`. Cada
faixa é um recorte diferente, escolhido pelo que o slide precisa dizer:

| Arquivo | Origem | Por que este recorte |
|---|---|---|
| `faixa-fileira.jpg` | `IMG_4438.jpg` | muitos produtos: é o negócio inteiro, serve à abertura |
| `faixa-corte.jpg` | `morango.png` | o bombom cortado mostra o trabalho que existe dentro, serve ao erro do tempo no custo |
| `faixa-prato.jpg` | `IMG_4438.jpg` | bandejas e caixa da marca: é o cardápio, serve ao erro de vender o que pedem |
| `faixa-mao.jpg` | `IMG_4438.jpg` | **um** bombom erguido: é o produto âncora, serve ao erro 3 |
| `avatar.png` | `gustavo.png` | só o avatar da moldura de preview, não sai nos PNGs |

## Como regerar

```bash
# 1. embute as imagens e gera o carrossel.html
python3 clientes/gustavo-ono/copy/carrosseis/2026-07-30-3-erros-margem/embutir-imagens.py

# 2. exporta os PNGs
python3 .claude/skills/carrossel-instagram/assets/exportar-slides.py \
  --html  clientes/gustavo-ono/copy/carrosseis/2026-07-30-3-erros-margem/carrossel.html \
  --saida clientes/gustavo-ono/copy/carrosseis/2026-07-30-3-erros-margem/slides
```

## Legenda do post

> Tem margem sumindo da sua chocolateria, e ela não aparece na sua cara. Aparece
> no extrato no fim do mês.
>
> São 3 erros: não contar seu tempo no custo, vender o que o cliente pede em vez
> do que dá margem, e não ter produto âncora.
>
> Clique em Saiba mais, responda o quiz e descubra qual está te custando mais.
