# Carrosséis de largada · Luana Isse

Os **5 carrosséis** dos 20 criativos de largada do funil de quiz, prontos para
subir no Instagram. Copy aprovada na Estratégia Completa de 06/08, com os
ajustes registrados abaixo.

- **Formato:** 1080x1350 (4:5).
- **Até 4 cards por carrossel**, 20 no total. As copies que estavam soltas em
  cards separados foram unidas: card com uma frase e o resto vazio não segura
  swipe e ainda entrega o carrossel mais longo do que ele precisa ser.
- **Destino do tráfego:** https://quiz-luana-isse.vercel.app

## Os cinco, e o sistema visual de cada um

Os cinco saem do mesmo manual de marca, mas **cada um tem desenho próprio**.
Se os cinco forem iguais, o feed lê como uma peça só repetida.

| # | Eixo | Tema | Sistema visual | Cards | Foto |
| - | ---- | ---- | -------------- | ----- | ---- |
| 1 | Cena | O dia do especialista invisível | **Duas batidas** · bege e escuro; a montagem em cima, o soco embaixo, filete dourado no meio | 4 | só no fim |
| 2 | Cena | As frases que você já disse pra si mesmo | **Fichas** · abre e fecha com o card inteiro em dourado e letra escura; no meio, fichas de citação sobre o escuro | 4 | começo e fim |
| 3 | Mecanismo | A Ruptura de Valor Percebido | **O vão** · verde petróleo do manual **também na letra**, faixa dourada no rodapé com a frase-chave, e o vão medido virando gráfico | 4 | só no fim |
| 4 | Mecanismo | Técnico ou percebido | **Coluna dividida** · vinho contra bege, e a divisão anda de um lado para o outro conforme quem está falando. **Sem dourado** | 4 | só no começo |
| 5 | Autoridade | O que eu vi em quase 30 especialistas | **Retrato** · coluna editorial com filete dourado na margem, o tema correndo na vertical e a foto grande | 4 | começo e fim |

O uso da foto **varia de propósito**, para testar qual abertura segura mais o
scroll. Quando houver dado de retenção por card, ele decide o padrão.

## Como rodar

```bash
cd clientes/luana-isse/copy/2026-08-31-carrosseis-largada
python3 gerar.py       # escreve os 5 HTML autocontidos
python3 conferir.py    # mede se algum conteúdo estoura a área segura
python3 exportar.py    # escreve os 20 PNG em slides/
```

`conferir.py` e `exportar.py` precisam do Playwright (`pip install playwright`).
Os dois apontam para o Chromium já instalado no ambiente e **não baixam
navegador**.

`baixar-fontes.py` só é necessário para atualizar as fontes; o CSS embutido já
está versionado.

## Arquivos

| Arquivo | O que é |
| ------- | ------- |
| `gerar.py` | Gera os 5 HTML. É onde a copy e o desenho de cada card vivem |
| `conferir.py` | Mede card a card se algo encosta na barra, na seta ou nas bordas |
| `exportar.py` | Playwright, 420px de layout com `device_scale_factor` para 1080 |
| `baixar-fontes.py` | Regenera `assets/fonts/fontes-embutidas.css` |
| `carrossel-*.html` | Preview navegável, com moldura do Instagram e arrasto |
| `slides/carrossel-*/slide-NN.png` | **O que sobe no Instagram**, 1080x1350 |
| `assets/` | Foto, variações do logo e fontes, tudo embutido em base64 nos HTML |

Os HTML são **autocontidos**: abrem sem rede, sem CDN e sem servidor.

## Por que existe o `conferir.py`

O erro que mais aparece aqui é silencioso: o texto cresce uma linha, encosta na
barra de progresso, e ninguém vê até abrir o PNG. Conferir 20 cards a olho não
escala; medir escala.

Ele mede a **tinta** do texto, não a caixa do bloco. Um `<h2>` ocupa a largura
inteira mesmo quando a frase quebra bem antes, e medir a caixa acusava card
limpo. E reserva **só o retângulo do chevron** da seta, não a faixa de 46px
inteira, porque a faixa é um degradê transparente e a arroba do topo nunca
encosta nele.

Na primeira rodada ele pegou quatro coisas reais que passaram no olho:
o rodapé do card 4 do carrossel 2 por cima da barra, o rótulo vertical do
carrossel 4 em cima da seta, e a foto do carrossel 5 encostando nela.

## Identidade

Do **manual de marca oficial** (o que ela mandou em 20/08), não inferida das
artes:

| Token | Valor | Uso |
| ----- | ----- | --- |
| Dourado | `#B49055` | destaque, e **fundo inteiro** no carrossel 2 e na faixa do 3 |
| Dourado claro | `#C9AC7E` | destaque sobre fundo escuro |
| Dourado escuro | `#8A6E3F` | filete sobre fundo dourado |
| Escuro institucional | `#030118` | fundo e letra dos carrosséis 1, 2 e 5 |
| Vinho | `#441529` | metade do técnico no carrossel 4, e a letra sobre o bege ali |
| Vinho profundo | `#2C0E1B` | vinho escurecido ~35%, base do carrossel 4 |
| Verde petróleo | `#07292E` | fundo **e letra** do carrossel 3 |
| Bege | `#F5EFE4` | fundo claro, nunca branco puro |

**Cada carrossel anda numa família de cor só**, e a letra segue o fundo. O 3 é
petróleo do começo ao fim, inclusive nos títulos sobre bege e sobre a faixa
dourada: o escuro institucional puxava para o azul e brigava com o verde. O 4 é
vinho e bege, **sem dourado nenhum**, porque vinho com dourado é combinação que
o cliente vetou; o destaque no card final é de opacidade, não de cor, para não
precisar de uma cor fora do manual.

A única cor do manual que continua de fora é o marrom `#491F13`.

**Tipografia:** Montserrat no corpo (manual) e Playfair Display nos títulos,
substituta da Humble Nostalgia, que é paga e não temos o arquivo. Se ela mandar
a Humble Nostalgia, dá para trocar em `gerar.py`.

## Regras de copy aplicadas

1. **Linguagem neutra em gênero.** Nenhum adjetivo concorda com quem lê. O ICP
   tem médicos, advogados e coaches dos dois gêneros.
2. **Nunca prometer resultado financeiro.** Regra da própria Luana. A promessa é
   autoridade e fim da invisibilidade.
3. **Não usar "resgatar identidade".** A virada que entra em copy é a concreta:
   de especialista técnico a especialista percebido.
4. **Sem travessão e sem emoji.**
5. **CTA:** o botão diz **"Toque em Saiba Mais"** com a seta **para baixo**, que
   é onde fica o botão Saiba Mais do anúncio. O domínio do funil vem escrito
   logo abaixo.
6. Big idea: **"Quem é visto, vende mais."**

## Três ajustes na copy aprovada

1. **"Se eu fosse bom mesmo" virou "Se eu fosse mesmo excelente"** (carrossel 2).
   O original está no masculino numa frase em primeira pessoa, ou seja, concorda
   com quem lê. "Excelente" não flexiona em gênero e é a palavra que a própria
   Luana usa nos resultados do quiz. É o mesmo erro que obrigou a revisão do
   quiz inteiro em 20/08.
2. **"Link na bio" virou "Toque no link"** nos cards finais. As copies nasceram
   para orgânico; em anúncio não existe bio, e mandar procurar a bio derruba
   conversão. O link vai no próprio criativo.
3. **"Cinco frases" virou "Quatro frases"** (carrossel 2). A copy aprovada
   anuncia cinco e lista quatro. Corrigido para o número que existe. Se a Luana
   tiver a quinta frase, é uma linha em `gerar.py` para voltar a cinco.

## Pendências

- **Os estáticos que ela produziu não estão no Drive do cliente.** A pasta
  `2. Material Visual > Criativos` está vazia; as artes estão no grupo do
  WhatsApp ou na pasta pessoal dela. Vale subir na pasta do cliente antes que
  sumam no histórico do grupo. Sem elas, a referência de identidade aqui é o
  manual de marca, não as artes.
- **Logo em vetor.** O que temos é o PNG da assinatura extraído do PDF do
  manual. Vale pedir o pacote em SVG ou PNG transparente.
