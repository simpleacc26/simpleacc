# Carrossel de anúncio — O GAP entre demanda e entrega

Quinto criativo de carrossel para Instagram (@carolbatista) que leva ao **funil de
quiz V3** da ÚNICOS, o *Diagnóstico de Maturidade do Negócio*. Fecha a cobertura dos
quatro baldes do funil.

- **Cliente:** Carol e José (ÚNICOS Leadership Club)
- **Data:** 04/08/2026
- **Ângulo:** o balde `oportunidade` do funil, a demanda que passa da capacidade
- **Recorte:** indústria acima de R$ 5 milhões
- **Destino:** https://unicos-diagnostico.vercel.app (projeto Vercel `unicos-diagnostico`)

## Atenção antes de publicar: conflito de copy

A copy do card 3 usa **"próximo nível"**, que o Framework de Comunicação ÚNICOS lista
entre as **palavras banidas**, mandando usar "próximo patamar" ou "próximo estágio".

O card oficial (`slide_3.png`) sai **literal, como a copy foi aprovada**. Ao lado dele
fica `slide_3-alt-proximo-patamar.png`, idêntico exceto pela troca, pronto para uso
imediato caso o cliente concorde em seguir o Framework. **Decisão do cliente**, os dois
arquivos estão prontos.

## Arquivos

| Arquivo | O que é |
| ------- | ------- |
| `carrossel.html` | Carrossel autocontido, com preview em frame do Instagram. |
| `slides/slide_1..3.png` | Os 3 slides em 1080×1350, prontos para subir. |
| `slides/slide_3-alt-proximo-patamar.png` | Card 3 alternativo, com a troca da expressão banida. |
| `build_carrossel.py` · `export_slides.py` | Build e export, rodam standalone dentro da pasta. |
| `export_alt_slide3.py` | Gera o card 3 alternativo a partir do mesmo HTML. |

## A copy (3 cards, um parágrafo por card)

Copy aprovada pelo cliente, aplicada **sem alteração de texto**.

1. Sua indústria já passa dos R$ 5 milhões e a demanda cresceu mais rápido que a empresa consegue acompanhar. O time trabalha em hora extra com frequência, os prazos vivem apertados e bons negócios passam.
2. O dinheiro já está na mesa e você só consegue pegar uma fatia dele. E quanto mais demanda entra, maior fica esse GAP.
3. Clique em Saiba mais e responda o Diagnóstico de Maturidade do Negócio: descubra o que falta para o seu negócio alcançar o próximo nível.

## O conceito: o gráfico como peça central

O assunto desta copy é uma **distância que cresce**. Nenhum dos quatro carrosséis
anteriores usou diagrama, então aqui o recurso central é um gráfico: duas curvas
saem do mesmo ponto e se afastam, e a área entre elas é o GAP da copy. Marcas de
escala no topo de cada card dão aos três a mesma linguagem de instrumento de medida.

### O gráfico é conceitual, não plotagem de dados

**Não tem eixo numerado, valor nem grade, de propósito.** Nada ali foi medido, e um
número inventado num criativo viraria alegação falsa sobre o negócio de quem lê.
O diagrama mostra a forma da relação (a demanda sobe mais rápido, a distância
aumenta), que é exatamente o que a copy afirma, e nada além disso.

### Decisões de visualização

- **Uma série destacada, não duas concorrendo.** A história é uma só, então a demanda
  fica em dourado sólido e a capacidade de entrega vira linha recessiva tracejada.
  É o padrão de ênfase correto quando o gráfico tem um ponto só a fazer.
- **Rótulo direto nas duas curvas**, então a identidade nunca depende só da cor.
- **Hachura no lugar de preenchimento sólido.** Dourado sólido sobre navy compõe um
  oliva sujo. Em linha fina o dourado se mantém dourado, e a textura ainda ajuda
  quem não distingue matiz.
- **Uma escala só.** Demanda e capacidade são o mesmo tipo de grandeza, então
  dividem o mesmo eixo. Gráfico de dois eixos inventaria uma correlação que não existe.
- Paleta conferida com o validador da skill `dataviz` contra o navy `#0f2338`:
  contraste, croma e separação para daltonismo passam. A única reprovação é a faixa
  de luminância, que governa consistência entre várias cores categóricas e não se
  aplica a uma série destacada única.
- Sem camada de hover nem tabela de dados: a entrega é PNG estático e não há conjunto
  de dados por trás.

## Comparação com os outros quatro da série

| | C1 indústria | C2 decisão | C3 padrões | C4 liderança | Este |
| - | --- | --- | --- | --- | --- |
| Recurso central | Espaço em branco | Contraste de peso | Caixas e risco | Divisória móvel | **Gráfico** |
| Peso | Claro, arejado | Escuro, denso | Papel | Navy sobre creme | Creme, navy, navy |
| Título | Playfair | Jakarta ExtraBold | Jakarta Bold | Playfair no creme | Jakarta Bold |
| Rotulagem | Tag dourada | Fio vertical numerado | Cabeçalho de ficha | Dentro da zona navy | Marcas de escala |
| Imagem | Foto natural | Foto duotone | Foto emoldurada | Foto em faixa | Sem foto |
| Cards | 5 | 5 | 4 | 4 | 3 |

O que se mantém igual nos cinco: paleta da marca, barra de progresso, seta de swipe,
formato 4:5 e o lockup ÚNICOS fechando no último card.

## Estrutura

| # | Fundo | Papel |
| - | ----- | ----- |
| 1 | Creme `#f5efe3` | A pressão: demanda acima da capacidade |
| 2 | Navy fechado `#0f2338` | O GAP, com o gráfico como peça central |
| 3 | Gradiente navy | Oferta, com o lockup da marca, sem seta |

O card 3 não traz botão desenhado: quem cumpre esse papel é o CTA nativo "Saiba mais"
do anúncio, que é o que a copy manda clicar.

## Identidade

Creme de papel `#f5efe3` · Creme `#f3eee2` · Navy `#16314f` · Navy fechado `#0f2338` ·
Navy claro `#1e3d61` · Dourado `#a9802f` · Dourado claro `#d4a84b`

Tipografia: Plus Jakarta Sans (400 a 700) com Playfair Display no fecho.

Demais regras de tom aplicadas, conforme o Framework: sem travessões, sem emoji,
tom diagnóstico e não conselho. A única exceção é "próximo nível" no card 3, tratada
acima.

## Como regerar

```bash
python3 build_carrossel.py     # gera carrossel.html
python3 export_slides.py       # exporta slides/slide_1..3.png em 1080×1350
python3 export_alt_slide3.py   # exporta o card 3 alternativo
```

O layout é desenhado em **420px de largura**. O export usa `device_scale_factor`
de 1080/420 para chegar a 1080px sem reflow. Não mude a largura do `.ig-frame`.
