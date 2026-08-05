# Carrossel de anúncio — Os seus padrões estão desatualizados

Terceiro criativo de carrossel para Instagram (@carolbatista) que leva ao **funil de
quiz V3** da ÚNICOS, o *Diagnóstico de Maturidade do Negócio*.

- **Cliente:** Carol e José (ÚNICOS Leadership Club)
- **Data:** 04/08/2026
- **Ângulo:** o balde `processo` do funil, quem já tentou tudo e nada mudou
- **Recorte:** indústria acima de R$ 5 milhões
- **Destino:** https://unicos-diagnostico.vercel.app (projeto Vercel `unicos-diagnostico`)

## Arquivos

| Arquivo | O que é |
| ------- | ------- |
| `carrossel.html` | Carrossel autocontido, com preview em frame do Instagram. Fotos embutidas em base64, sem dependências. |
| `slides/slide_1..4.png` | Os 4 slides em 1080×1350, prontos para subir no Instagram. |
| `build_carrossel.py` · `export_slides.py` | Build e export, rodam standalone dentro da pasta. |
| `assets/carol-banda.jpg` | Foto da Carol em banda 3:2, dessaturada e esquentada para conversar com o creme. |

## A copy (4 cards, um parágrafo por card)

Copy aprovada pelo cliente, aplicada **sem alteração de texto**.

1. Você já fez de tudo para ter uma equipe mais produtiva e para o negócio depender menos de você. Treinou, cobrou, trocou gente, mudou o organograma...
2. Os seus padrões não estão errados. Eles estão desatualizados, e é por isso que o que funcionou até aqui parou de responder.
3. Não é só com você. Toda indústria que passou dos R$ 5 milhões chega no ponto em que a receita antiga para de funcionar, e cada mês nesse ponto custa margem e oportunidade.
4. Clique em Saiba mais e responda o Diagnóstico de Maturidade do Negócio: descubra o que falta para você construir o futuro do seu negócio.

## O conceito: ficha de diagnóstico

Enquanto os outros dois se resolvem na tipografia, este se resolve em **componentes**.
A peça é uma ficha em papel: creme do começo ao fim, cabeçalho com rótulo, estrela e
fio horizontal cruzando toda página, conteúdo dentro de caixas, foto emoldurada.
Fecha em navy, o único card escuro da sequência.

O card 1 usa a própria copy como recurso visual: a lista de tentativas
("Treinou, cobrou, trocou gente, mudou o organograma...") entra **riscada em dourado**
dentro de uma caixa, o que diz "tudo isso você já fez" sem precisar de mais uma linha
de texto. O texto continua literal, o risco é só tratamento.

## Comparação com os outros dois carrosséis da série

| | Recorte indústria | Decisão solitária | Este |
| - | ----------------- | ----------------- | ---- |
| Peso geral | Claro, arejado | Escuro, denso | Creme de papel, estruturado |
| Ritmo de fundo | Alterna claro e escuro | Escurece em degraus | Três cards em creme e um navy no fim |
| Título | Playfair serifada | Jakarta ExtraBold | Jakarta Bold em corpo médio |
| Serifada | Conduz todos | Uma vez, no card 3 | Uma vez na caixa navy e uma no fecho |
| Rotulagem | Tag dourada solta | Numeração com fio vertical | Cabeçalho de ficha com fio horizontal |
| Recurso principal | Espaço em branco | Contraste de peso | Caixas, risco e moldura |
| Foto | Natural, full bleed com overlay | Duotone, full bleed | Banda emoldurada, dessaturada |

O que se mantém igual nos três, porque é o que os coloca no mesmo sistema:
paleta da marca, barra de progresso, seta de swipe, formato 4:5 e o lockup ÚNICOS
fechando no último card.

## Estrutura

| # | Fundo | Papel |
| - | ----- | ----- |
| 1 | Creme `#f5efe3` | O que já foi tentado, riscado dentro da caixa |
| 2 | Creme, com caixa navy | O diagnóstico, a virada em serifada itálica sobre navy |
| 3 | Creme, com foto emoldurada | Normalização e custo, a autoridade entra aqui |
| 4 | Gradiente navy | Oferta, com o lockup da marca, sem seta |

O card 4 não traz botão desenhado: quem cumpre esse papel é o CTA nativo "Saiba mais"
do anúncio, que é o que a copy manda clicar.

## Identidade

Creme de papel `#f5efe3` · Creme `#f3eee2` · Navy `#16314f` · Navy fechado `#0f2338` ·
Navy claro `#1e3d61` · Dourado `#a9802f` · Dourado claro `#d4a84b`

Tipografia: Plus Jakarta Sans (400 a 700) com Playfair Display em dois momentos.

Regras de tom aplicadas, conforme o Framework: sem travessões, sem emoji, sem as
palavras banidas (gargalo, próximo nível, sustentação, travando), tom diagnóstico
e não conselho.

## Como regerar

```bash
python3 build_carrossel.py   # gera carrossel.html com as fotos em base64
python3 export_slides.py     # exporta slides/slide_1..4.png em 1080×1350
```

O layout é desenhado em **420px de largura**. O export usa `device_scale_factor`
de 1080/420 para chegar a 1080px sem reflow. Não mude a largura do `.ig-frame`.

A banda vem de `img1012.jpg` (camisa poá branca e saia preta), das fotos da Carol no
Drive. É a única do lote sem o pink que briga com o navy, e sobra para este carrossel
sem repetir a foto usada nos outros dois.
