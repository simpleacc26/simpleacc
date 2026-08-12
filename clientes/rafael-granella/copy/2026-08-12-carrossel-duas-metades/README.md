# Carrossel Instagram: As duas metades (Alivance Club)

Carrossel de 5 slides para o Instagram do Rafael Granella (Alivance Club), no
formato **1:1**, exportado em **1080×1080 PNG** pronto para subir.

## O que é

Condensação de uma copy longa fornecida pelo Daniel sobre a **escolha falsa
entre individual e curso gravado**, e sobre separar a parte da entrega que
precisa do mentor da que não precisa.

A copy original tem **seis** beats e o limite era cinco cards. A escolha falsa
e a virada foram fundidas no card 1: a virada virou o título e a escolha falsa
virou o corpo. Os outros quatro beats ficaram inteiros.

| Slide | Beat | Fundo |
| ----- | ---- | ----- |
| 1 | A escolha falsa (individual x curso gravado) e a virada: a falha é achar que precisa escolher | creme |
| 2 | As duas partes: a que precisa de você e a que não precisa | índigo |
| 3 | O erro: quase todo mundo inverte as duas | creme |
| 4 | O resultado, com o case da Camila (R$120 mil no primeiro mês) | índigo |
| 5 | CTA: "Clique em Saiba Mais" e faça o diagnóstico | dourado |

Preservados quase literais: "grava justamente a parte que deveria ser conversa
e continua fazendo na mão a parte que já poderia estar em sistema", "o curso
não vende caro e a operação não alivia em nada" e o case inteiro.

**Mudança em relação ao original:** a copy de origem fechava pedindo um "oi no
WhatsApp" com a descrição da entrega. O CTA aqui é "Clique em Saiba Mais" mais
o diagnóstico, conforme pedido.

### Atenção

- **Case da Camila.** É a primeira prova social nominal usada em peça deste
  cliente. Veio da copy enviada pelo Daniel. Vale confirmar com o Rafael se o
  nome e o número (R$120 mil no primeiro mês) podem ser publicados.
- **ICP.** Qualifica em **R$30 mil/mês**, igual aos outros dois carrosséis de
  copy longa e diferente das faixas do quiz em produção. Ver `aprendizados.md`.

## Regras de copy e de criativo (definidas pelo Daniel)

1. **Sem travessões.** Nem na copy dos slides, nem na legenda.
2. **Sem a construção "não é X, é Y"** e variantes. Tem cara de texto de IA.
3. **Sem labels/tags** acima dos títulos.
4. **Sem logo, sem nome de marca e sem URL** nos slides.
5. **Texto centralizado na vertical**, longe das bordas e da barra de progresso.
6. **Formato 1:1.**

> A copy original usa a construção da regra 2 no ponto mais importante dela:
> "A falha não está em escolher errado. É achar que precisa escolher." Virou
> "A falha está em achar que você precisa escolher", que é o título do card 1.

## Identidade visual

A mesma dos outros carrosséis e do quiz. Ver
`../2026-08-12-carrossel-4-pilares/README.md` para a tabela completa de tokens.

Dourado `#C8B28B`, índigo `#1C1C42`, superfície `#292859`, títulos em Fahkwang
e corpo em Inter. Ritmo: creme, índigo, creme, índigo, dourado.

## Arquivos

```
carrossel.html     preview swipeable no frame do Instagram + fonte dos slides
slides/            os 5 PNGs 1080x1080 prontos para postar
export_slides.py   gera os PNGs a partir do carrossel.html
embed_fonts.py     embute as fontes em base64 no HTML (rodar só se trocar de fonte)
```

## Como mexer

1. Edite o array `SLIDES` no fim do `carrossel.html`.
2. Abra o `carrossel.html` no navegador para revisar.
3. Regenere os PNGs:

```bash
cd clientes/rafael-granella/copy/2026-08-12-carrossel-duas-metades
python3 export_slides.py
```

O `export_slides.py` **aborta se algum slide não couber** na altura ou se as
fontes não carregarem, em vez de gerar imagem com texto cortado ou em fonte
fallback. Os cards 4 e 5 são os mais cheios deste conjunto.
