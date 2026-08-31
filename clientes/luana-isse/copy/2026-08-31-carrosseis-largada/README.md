# Carrosséis de largada · Luana Isse

Os **5 carrosséis** dos 20 criativos de largada do funil de quiz, prontos para
subir no Instagram. Copy aprovada na Estratégia Completa de 06/08, com dois
ajustes registrados abaixo.

- **Formato:** 1080x1350 (4:5), um slide por ideia.
- **Destino do tráfego:** https://quiz-luana-isse.vercel.app
- **36 slides no total** (7 + 7 + 7 + 8 + 7).

## Os cinco

| # | Eixo | Tema | Slides | Foto da Luana |
| - | ---- | ---- | ------ | ------------- |
| 1 | Cena | O dia do especialista invisível | 7 | só no fim |
| 2 | Cena | As frases que você já disse pra si mesmo | 7 | começo e fim |
| 3 | Mecanismo | A Ruptura de Valor Percebido | 7 | só no fim |
| 4 | Mecanismo | Técnico ou percebido | 8 | só no começo |
| 5 | Autoridade | O que eu vi em quase 30 especialistas | 7 | começo e fim |

O uso da foto **varia de propósito**, para testar qual abertura segura mais o
scroll. Quando houver dado de retenção por slide, ele decide o padrão.

## Como rodar

```bash
cd clientes/luana-isse/copy/2026-08-31-carrosseis-largada
python3 gerar.py       # escreve os 5 HTML autocontidos
python3 exportar.py    # escreve os 36 PNG em slides/
```

`exportar.py` precisa do Playwright (`pip install playwright`). Ele aponta para
o Chromium já instalado no ambiente e **não baixa navegador**.

`baixar-fontes.py` só é necessário para atualizar as fontes; o CSS embutido
já está versionado.

## Arquivos

| Arquivo | O que é |
| ------- | ------- |
| `gerar.py` | Gera os 5 HTML. É onde a copy e o layout de cada slide vivem |
| `exportar.py` | Playwright, 420px de layout com `device_scale_factor` para 1080 |
| `baixar-fontes.py` | Regenera `assets/fonts/fontes-embutidas.css` |
| `carrossel-*.html` | Preview navegável, com moldura do Instagram e arrasto |
| `slides/carrossel-*/slide-NN.png` | **O que sobe no Instagram**, 1080x1350 |
| `assets/` | Foto, variações do logo e fontes, tudo embutido em base64 nos HTML |

Os HTML são **autocontidos**: abrem sem rede, sem CDN e sem servidor.

## Identidade

Do **manual de marca oficial** (o que ela mandou em 20/08), não inferida das
artes:

| Token | Valor | Uso |
| ----- | ----- | --- |
| Dourado | `#B49055` | destaque, barra de progresso, etiquetas |
| Dourado claro | `#C9AC7E` | destaque sobre fundo escuro |
| Dourado escuro | `#7E653B` | grifo em itálico sobre bege |
| Escuro institucional | `#030118` | fundo dos slides escuros |
| Bege | `#F5EFE4` | fundo dos slides claros, nunca branco puro |
| Divisória bege | `#E3D8C5` | linhas sobre bege |

**Tipografia:** Montserrat no corpo (manual) e Playfair Display nos títulos,
substituta da Humble Nostalgia, que é paga e não temos o arquivo. Se ela mandar
a Humble Nostalgia, dá para trocar em `gerar.py`.

**Direção:** fundo escuro ou bege alternando, tipografia serifada, dourado só no
destaque. É a mesma família das artes da conferência, que ela produziu.

## Regras de copy aplicadas

1. **Linguagem neutra em gênero.** Nenhum adjetivo concorda com quem lê. O ICP
   tem médicos, advogados e coaches dos dois gêneros.
2. **Nunca prometer resultado financeiro.** Regra da própria Luana. A promessa é
   autoridade e fim da invisibilidade.
3. **Não usar "resgatar identidade".** A virada que entra em copy é a concreta:
   de especialista técnico a especialista percebido.
4. **Sem travessão e sem emoji.**
5. Big idea: **"Quem é visto, vende mais."**

## Dois ajustes na copy aprovada

1. **"Se eu fosse bom mesmo" virou "Se eu fosse mesmo excelente"** (carrossel 2,
   card 2). O original está no masculino numa frase em primeira pessoa, ou seja,
   concorda com quem lê. "Excelente" não flexiona em gênero e é a palavra que a
   própria Luana usa nos resultados do quiz. É o mesmo erro que obrigou a
   revisão do quiz inteiro em 20/08.
2. **"Link na bio" virou "Toque no link"** nos cards finais. As copies nasceram
   para orgânico; em anúncio não existe bio, e mandar procurar a bio derruba
   conversão. O link vai no próprio criativo.

## Pendências

- **Os estáticos que ela produziu não estão no Drive do cliente.** A pasta
  `2. Material Visual > Criativos` está vazia; as artes estão no grupo do
  WhatsApp ou na pasta pessoal dela. Vale subir na pasta do cliente antes que
  sumam no histórico do grupo. Sem elas, a referência de identidade aqui é o
  manual de marca, não as artes.
- **Logo em vetor.** O que temos é o PNG da assinatura extraído do PDF do
  manual. Vale pedir o pacote em SVG ou PNG transparente.
