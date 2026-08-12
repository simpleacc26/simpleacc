# Carrossel Instagram: Escala em 3 frentes (Alivance Club)

Carrossel de 4 slides para o Instagram do Rafael Granella (Alivance Club), no
formato **1:1**, exportado em **1080×1080 PNG** pronto para subir.

## O que é

Condensação de uma copy longa fornecida pelo Daniel, mantendo os quatro beats
do storytelling original, um por card:

| Slide | Beat | Fundo |
| ----- | ---- | ----- |
| 1 | O gargalo: ticket, modelo e aquisição | creme |
| 2 | A falsa saída: virar infoprodutor e lançar curso barato | índigo |
| 3 | A tese: mexer nas três frentes ao mesmo tempo | creme |
| 4 | CTA: "Clique em Saiba Mais" e faça o diagnóstico | dourado |

Frases da copy original preservadas quase literalmente por serem as mais
fortes: "mais um item de prateleira", "volta pro mesmo lugar seis meses
depois" e o filtro de qualificação (R$30 mil/mês, cansado de agência de
tráfego e de gente empurrando curso).

**Mudança em relação ao original:** a copy de origem fechava pedindo um "oi no
WhatsApp". O CTA aqui é "Clique em Saiba Mais" + diagnóstico, conforme pedido.

### Atenção ao ICP

Este carrossel qualifica em **R$30 mil/mês**. O quiz em produção
(`quiz-alivance/src/data/questions.ts`) usa outras faixas e o carrossel dos 4
pilares não cita valor. Vale conferir se R$30 mil é o corte oficial agora.

## Regras de copy e de criativo (definidas pelo Daniel)

1. **Sem travessões.** Nem na copy dos slides, nem na legenda.
2. **Sem a construção "não é X, é Y"** e variantes. Tem cara de texto de IA.
3. **Sem labels/tags** acima dos títulos.
4. **Sem logo, sem nome de marca e sem URL** nos slides.
5. **Texto centralizado na vertical**, longe das bordas e da barra de progresso.
6. **Formato 1:1.**

> A copy original entregue para condensar usa a construção da regra 2 em dois
> pontos ("o que trava não é a sua entrega, é a estrutura"; "curso barato não
> escala o seu negócio, ele rebaixa o seu ticket"). Como a regra 2 é explícita,
> a condensação virou afirmação direta, preservando o sentido: "Faturamento
> empacado começa na estrutura" e "Curso barato rebaixa o seu ticket".

## Identidade visual

A mesma do carrossel dos 4 pilares e do quiz. Ver
`../2026-08-12-carrossel-4-pilares/README.md` para a tabela completa de tokens.

Dourado `#C8B28B`, índigo `#1C1C42`, superfície `#292859`, títulos em Fahkwang
e corpo em Inter. Ritmo: creme, índigo, creme, dourado.

## Arquivos

```
carrossel.html     preview swipeable no frame do Instagram + fonte dos slides
slides/            os 4 PNGs 1080x1080 prontos para postar
export_slides.py   gera os PNGs a partir do carrossel.html
embed_fonts.py     embute as fontes em base64 no HTML (rodar só se trocar de fonte)
```

## Como mexer

1. Edite o array `SLIDES` no fim do `carrossel.html`.
2. Abra o `carrossel.html` no navegador para revisar.
3. Regenere os PNGs:

```bash
cd clientes/rafael-granella/copy/2026-08-12-carrossel-escala-3-frentes
python3 export_slides.py
```

O `export_slides.py` **aborta se algum slide não couber** na altura, em vez de
gerar imagem com texto cortado. O card 1 é o mais apertado (título de 3 linhas
mais 3 itens), então qualquer acréscimo de copy nele provavelmente vai estourar.
Os detalhes de por que a checagem é do jeito que é estão no README do carrossel
dos 4 pilares.
