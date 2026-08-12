# Carrossel Instagram: Unidade de venda (Alivance Club)

Carrossel de 4 slides para o Instagram do Rafael Granella (Alivance Club), no
formato **1:1**, exportado em **1080×1080 PNG** pronto para subir.

## O que é

Condensação de uma copy longa fornecida pelo Daniel sobre **por que o ticket
não sobe: o cliente está comprando hora, não resultado.**

A copy original tem **cinco** beats e o limite é de quatro cards, então o
mecanismo e a tentativa que falha foram fundidos no card 2. A virada ficou
sozinha no card 3 de propósito, porque é o pagamento do argumento.

| Slide | Beat | Fundo |
| ----- | ---- | ----- |
| 1 | Diagnóstico: antes de culpar o mercado, olhe a unidade de venda | creme |
| 2 | Mecanismo (o cliente divide pelo número de horas) + a tentativa clássica de subir o preço sem mudar o conteúdo | índigo |
| 3 | A virada: a oferta deixa de ser acesso à agenda e passa a ser resultado, com prazo e método | creme |
| 4 | CTA: "Clique em Saiba Mais" e faça o diagnóstico | dourado |

Preservados quase literais por serem o núcleo do argumento: "sempre vai existir
alguém disposto a cobrar menos pela hora", "subir o preço mantendo a mesma
coisa dentro" e a virada inteira ("acesso à sua agenda" contra "um resultado,
com prazo e método definidos").

**Mudança em relação ao original:** a copy de origem fechava pedindo um "oi no
WhatsApp" com a descrição da oferta em uma frase. O CTA aqui é "Clique em Saiba
Mais" mais o diagnóstico, conforme pedido.

## Regras de copy e de criativo (definidas pelo Daniel)

1. **Sem travessões.** Nem na copy dos slides, nem na legenda.
2. **Sem a construção "não é X, é Y"** e variantes. Tem cara de texto de IA.
3. **Sem labels/tags** acima dos títulos.
4. **Sem logo, sem nome de marca e sem URL** nos slides.
5. **Texto centralizado na vertical**, longe das bordas e da barra de progresso.
6. **Formato 1:1.**

> A copy original entregue para condensar usa a construção da regra 2 em três
> pontos ("o problema não está no preço, está na unidade de venda"; "ele não
> está avaliando o seu valor, está dividindo o total pelo número de horas"; "o
> que muda o ticket não é o número, é o que está sendo comprado"). Cada um
> virou afirmação direta preservando o sentido: "Antes de culpar o mercado,
> olhe a sua unidade de venda", "O cliente divide o total pelo número de horas"
> e "O que muda o ticket é o que está sendo comprado".

### Atenção ao ICP

Qualifica em **R$30 mil/mês**, igual ao carrossel "Escala em 3 frentes" e
diferente das faixas do quiz em produção. Ver `aprendizados.md`.

## Identidade visual

A mesma dos outros carrosséis e do quiz. Ver
`../2026-08-12-carrossel-4-pilares/README.md` para a tabela completa de tokens.

Dourado `#C8B28B`, índigo `#1C1C42`, títulos em Fahkwang e corpo em Inter.
Ritmo: creme, índigo, creme, dourado.

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
cd clientes/rafael-granella/copy/2026-08-12-carrossel-unidade-de-venda
python3 export_slides.py
```

O `export_slides.py` **aborta se algum slide não couber** na altura ou se as
fontes não carregarem, em vez de gerar imagem com texto cortado ou em fonte
fallback. O card 2 é o mais cheio deste conjunto.
