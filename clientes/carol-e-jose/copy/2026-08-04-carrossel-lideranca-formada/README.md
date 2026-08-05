# Carrossel de anúncio — Falta liderança formada, não mão de obra

Quarto criativo de carrossel para Instagram (@carolbatista) que leva ao **funil de
quiz V3** da ÚNICOS, o *Diagnóstico de Maturidade do Negócio*.

- **Cliente:** Carol e José (ÚNICOS Leadership Club)
- **Data:** 04/08/2026
- **Ângulo:** o balde `lideranca` do funil, contratar braço não resolve
- **Recorte:** indústria acima de R$5 milhões
- **Destino:** https://unicos-diagnostico.vercel.app (projeto Vercel `unicos-diagnostico`)

## Arquivos

| Arquivo | O que é |
| ------- | ------- |
| `carrossel.html` | Carrossel autocontido, com preview em frame do Instagram. Fotos embutidas em base64, sem dependências. |
| `slides/slide_1..4.png` | Os 4 slides em 1080×1350, prontos para subir no Instagram. |
| `build_carrossel.py` · `export_slides.py` | Build e export, rodam standalone dentro da pasta. |
| `assets/carol-faixa.jpg` | Foto da Carol em faixa 1.54:1, quase dessaturada. |

## A copy (4 cards, um parágrafo por card)

Copy aprovada pelo cliente, aplicada **sem alteração de texto**.

1. Sua indústria já passa dos R$5 milhões. Você contratou mais gente e mesmo assim continua puxando tudo. Contratar mais braço não resolveu porque não era braço que faltava.
2. O que falta é gente formada para assumir a entrega, e não mais um par de mãos esperando a sua ordem.
3. Não é só com você. É o padrão mais comum em quem cresce mais rápido do que consegue formar novas lideranças, e enquanto isso, mais faturamento gera mais sobrecarga em cima de você.
4. Clique em Saiba mais e responda o Diagnóstico de Maturidade do Negócio: descubra quem, do time que você já tem, tem condição de assumir mais.

## O conceito: arquitetura de faixas

Os três carrosséis anteriores são fundo cheio com texto por cima. Este é **composição**:
cada card se divide em uma zona navy no alto e uma zona creme embaixo, separadas por um
fio dourado que **muda de altura a cada card**. No último card as faixas se fundem e a
peça inteira vira navy.

A estrutura conversa com o próprio assunto, que é camada de liderança, e ainda organiza
a copy sozinha: no card 1 a frase do faturamento vive na zona navy e a dor cai na zona
creme, sem precisar de recurso tipográfico para separar as duas.

Alturas da divisória: card 1 em 36%, card 2 em 26%, card 3 em 50% (a foto ocupa a zona
navy inteira), card 4 sem divisão.

## Comparação com os outros três da série

| | Recorte indústria | Decisão solitária | Padrões desatualizados | Este |
| - | --- | --- | --- | --- |
| Organização | Fundo cheio, texto solto | Fundo cheio, texto solto | Ficha com caixas | Duas zonas por card |
| Peso | Claro, arejado | Escuro, denso | Papel, estruturado | Navy sobre creme |
| Título | Playfair | Jakarta ExtraBold | Jakarta Bold médio | Playfair em zona creme |
| Rotulagem | Tag dourada solta | Fio vertical numerado | Cabeçalho de ficha | Rótulo dentro da zona navy |
| Recurso principal | Espaço em branco | Contraste de peso | Caixas, risco, moldura | Divisória que se move |
| Foto | Natural, full bleed | Duotone, full bleed | Banda emoldurada | Ocupa a zona navy inteira |

O que se mantém igual nos quatro, porque é o que os coloca no mesmo sistema:
paleta da marca, barra de progresso, seta de swipe, formato 4:5 e o lockup ÚNICOS
fechando no último card.

## Estrutura

| # | Composição | Papel |
| - | ---------- | ----- |
| 1 | Navy 36% + creme | Reconhecimento: faturamento no navy, dor no creme |
| 2 | Navy 26% + creme | O que falta, com "gente formada" em dourado |
| 3 | Foto 50% + creme | Normalização e custo, a autoridade entra aqui |
| 4 | Navy inteiro | Oferta, com o lockup da marca, sem seta |

O card 4 não traz botão desenhado: quem cumpre esse papel é o CTA nativo "Saiba mais"
do anúncio, que é o que a copy manda clicar.

## Detalhe de implementação

Nos cards em faixa a **seta de swipe fica presa à zona creme**. Se ocupasse a altura
toda, como nos outros carrosséis, metade dela cairia sobre a foto navy do card 3 e o
traço escuro sumiria. Presa ao creme, ela lê em todos os cards.

## Identidade

Creme de papel `#f5efe3` · Creme `#f3eee2` · Navy `#16314f` · Navy fechado `#0f2338` ·
Navy claro `#1e3d61` · Dourado `#a9802f` · Dourado claro `#d4a84b`

Tipografia: Playfair Display nas frases da zona creme, Plus Jakarta Sans no resto.

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

A faixa vem de `img1136.jpg`, a única foto em paisagem do lote, o que resolve bem a
zona horizontal. Tem uma poltrona vazia ao lado da Carol, que conversa com o assunto
do carrossel. É quase dessaturada no arquivo e o navy do overlay em CSS fecha o tom,
tratamento diferente do duotone usado no carrossel da decisão solitária.
