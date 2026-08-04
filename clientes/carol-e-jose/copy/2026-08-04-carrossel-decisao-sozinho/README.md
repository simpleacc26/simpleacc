# Carrossel de anúncio — A decisão que você toma sozinho

Segundo criativo de carrossel para Instagram (@carolbatista) que leva ao **funil de
quiz V3** da ÚNICOS, o *Diagnóstico de Maturidade do Negócio*.

- **Cliente:** Carol e José (ÚNICOS Leadership Club)
- **Data:** 04/08/2026
- **Ângulo:** o balde `decisao` do funil, a solidão de quem decide sozinho
- **Recorte:** indústria acima de R$5 milhões
- **Destino:** https://unicos-diagnostico.vercel.app (projeto Vercel `unicos-diagnostico`)

## Arquivos

| Arquivo | O que é |
| ------- | ------- |
| `carrossel.html` | Carrossel autocontido, com preview em frame do Instagram. Fotos embutidas em base64, sem dependências. |
| `slides/slide_1..5.png` | Os 5 slides em 1080×1350, prontos para subir no Instagram. |
| `build_carrossel.py` · `export_slides.py` | Build e export, rodam standalone dentro da pasta. |
| `assets/carol-duotone.jpg` | Foto da Carol tratada em duotone navy e dourado. |

## A copy (5 cards, um parágrafo por card)

Copy aprovada pelo cliente, aplicada **sem alteração de texto**.

1. Sua indústria já passa dos R$5 milhões, e as decisões que mais pesam são você com você mesmo.
2. Não é falta de informação. É não ter, no seu nível, alguém com quem trocar antes de bater o martelo.
3. Quando você é a pessoa mais inteligente da sala, o risco não é errar de vez em quando. É ter um viés do próprio negócio, e não ter quem te avise.
4. Todo dono de negócio nesse porte chega nesse ponto sozinho. E decisão nesse nível não custa reunião, custa margem e meses de operação.
5. Clique em Saiba mais e responda o Diagnóstico de Maturidade do Negócio: descubra o que te mantém decidindo tudo sozinho.

## O que muda em relação ao carrossel do recorte indústria

Os dois vivem na mesma marca e no mesmo sistema, mas a direção visual é outra de
propósito, para não parecerem a mesma peça repetida no feed.

| | Recorte indústria | Este |
| - | ----------------- | ---- |
| Peso geral | Claro primeiro, arejado | Escuro do começo ao fim, denso |
| Ritmo de fundo | Alterna claro e escuro | Escurece em degraus, com uma única virada em creme no card 3 |
| Tipografia de título | Playfair Display serifada | Plus Jakarta Sans ExtraBold |
| Papel da serifada | Conduz todos os títulos | Aparece uma vez só, no card 3, como virada de voz |
| Rotulagem | Tag dourada solta acima do título | Numeração editorial `01 · DECISÃO` com fio vertical na lateral |
| Marca d'água | Estrela da marca | Nenhuma, o fio vertical é o motivo estrutural |
| Foto | Natural, com overlay navy | Duotone navy e dourado |
| Alinhamento | Mistura esquerda e centro | Esquerda em todos |

O que se mantém igual, porque é o que faz os dois pertencerem ao mesmo sistema:
paleta da marca, barra de progresso, seta de swipe, formato 4:5 e o lockup ÚNICOS
fechando no último card.

## Estrutura

| # | Fundo | Papel |
| - | ----- | ----- |
| 1 | Navy fechado `#0a1826` | Reconhecimento, com o número do faturamento como gancho |
| 2 | Navy `#14293f` | A causa, nomeada sem culpar o leitor |
| 3 | Creme `#f3eee2` | A virada: o risco, em serifada itálica navy |
| 4 | Foto em duotone | O custo, com a Carol |
| 5 | Gradiente navy | Oferta, com o lockup da marca, sem seta |

O card 5 não traz botão desenhado: quem cumpre esse papel é o CTA nativo "Saiba mais"
do anúncio, que é o que a copy manda clicar.

## Identidade

Navy `#16314f` · Navy fechado `#0a1826` · Navy médio `#14293f` · Navy claro `#1e3d61` ·
Dourado `#a9802f` · Dourado claro `#d4a84b` · Creme `#f3eee2`

Tipografia: Plus Jakarta Sans (400 a 800) com Playfair Display itálica no card 3.

Regras de tom aplicadas, conforme o Framework: sem travessões, sem emoji, sem as
palavras banidas (gargalo, próximo nível, sustentação, travando), tom diagnóstico
e não conselho.

## Como regerar

```bash
python3 build_carrossel.py   # gera carrossel.html com as fotos em base64
python3 export_slides.py     # exporta slides/slide_1..5.png em 1080×1350
```

O layout é desenhado em **420px de largura**. O export usa `device_scale_factor`
de 1080/420 para chegar a 1080px sem reflow. Não mude a largura do `.ig-frame`.

O duotone é gerado a partir de `img1188.jpg` (mão no queixo, olhar fora de câmera),
das fotos da Carol no Drive. O tratamento resolve dois problemas de uma vez: some
com o pink da camisa, que briga com o navy, e cria a distância visual do outro
carrossel.
