# Carrossel Instagram: Os 4 pilares (Alivance Club)

Carrossel de 7 slides para o Instagram do Rafael Granella (Alivance Club), no
formato **1:1**, exportado em **1080×1080 PNG** pronto para subir.

## O que é

Tema: **os 4 pilares que definem o teto de um negócio de mentoria** (Método,
Modelo de negócio, Processo de vendas, Mentalidade), fechando no CTA do
Diagnóstico (o quiz).

Todo o conteúdo veio do material que já existe do cliente, nada foi inventado:

| Slide | O que é | Fonte |
| ----- | ------- | ----- |
| 1 | Hook "Agenda cheia. Receita estagnada." | `quiz-alivance/src/data/questions.ts` (implicação: "Minha receita está estagnada mesmo com agenda cheia") |
| 2 | O que já tentaram e não resolveu | `questions.ts` (necessidade: aumentar preço, formato em grupo, tráfego pago) |
| 3 | O teto e os quatro pilares | `ReportScreen.tsx` (`PILLARS`) |
| 4 | Pilares 01 Método, 02 Modelo de negócio | `ReportScreen.tsx` (`PILLARS`) |
| 5 | Pilares 03 Processo de vendas, 04 Mentalidade | `ReportScreen.tsx` (`PILLARS`) |
| 6 | Como funciona o diagnóstico (3 passos) | fluxo do quiz + `ReportScreen.tsx` (copy do CTA) |
| 7 | CTA "Clique em Saiba Mais" | pensado para anúncio, sem URL no slide |

## Regras de copy (definidas pelo Daniel)

Valem para qualquer alteração futura neste carrossel:

1. **Sem travessões.** Nem na copy dos slides, nem na legenda.
2. **Sem a construção "não é X, é Y"** (e variantes como "seu problema não é X,
   é Y"). Tem cara de texto de IA.
3. **Sem labels/tags** acima dos títulos.
4. **Sem logo, sem nome de marca e sem URL** nos slides. O carrossel não se
   assina: o destino vem do botão do anúncio ou do link da bio.
5. **Texto centralizado na vertical**, longe das bordas e da barra de progresso.
6. **Formato 1:1.** É o que menos corre risco de corte em qualquer
   reaproveitamento (feed, anúncio, outros formatos).

> Nota: o pilar 03 no relatório original do cliente diz "Depender de indicação e
> networking não é uma estratégia. É uma aposta." Como é exatamente a construção
> da regra 2, foi reescrito aqui. A frase original continua no `ReportScreen.tsx`.

## Identidade visual

Puxada do quiz (`clientes/rafael-granella/quiz-alivance/`), a pedido do Daniel:
mesma paleta e mesma tipografia dos criativos e do site.

| Token | Valor | De onde vem |
| ----- | ----- | ----------- |
| `BRAND_PRIMARY` | `#C8B28B` | dourado do quiz |
| `BRAND_LIGHT` | `#DDCBAD` | derivado (+20%) |
| `BRAND_DARK` | `#8C7857` | derivado (menos 30%) |
| `LIGHT_BG` | `#F6F2E9` | creme quente, derivado do dourado |
| `LIGHT_BORDER` | `#E6DECD` | derivado |
| `DARK_BG` | `#1C1C42` | índigo do quiz |
| superfície | `#292859` | card do quiz |

- **Títulos:** Fahkwang. **Corpo:** Inter. As duas do quiz.
- **Ritmo:** creme, índigo, dourado, creme, índigo, creme, dourado.
- Os slides de gradiente usam **dourado com texto índigo**, que é o padrão do
  quiz (opção selecionada e botão de CTA são `bg #C8B28B` + `texto #1c1c42`).

## Arquivos

```
carrossel.html     preview swipeable no frame do Instagram + fonte dos slides
slides/            os 7 PNGs 1080x1080 prontos para postar
export_slides.py   gera os PNGs a partir do carrossel.html
embed_fonts.py     embute as fontes em base64 no HTML (rodar só se trocar de fonte)
```

## Como mexer

1. Edite o array `SLIDES` no fim do `carrossel.html` (cada slide é um objeto com
   `theme`, `align` e `html`).
2. Abra o `carrossel.html` no navegador para revisar (dá pra arrastar/swipar e
   navegar com as setas do teclado).
3. Regenere os PNGs:

```bash
cd clientes/rafael-granella/copy/2026-08-11-carrossel-4-pilares
python3 export_slides.py
```

### Detalhes que importam

- O layout é desenhado a **420px** de largura (1:1 = 420×420). O export usa
  `device_scale_factor = 1080/420` para sair em 1080×1080 **sem** reflowar o
  layout. Nunca mude a largura do `.ig-frame` nem coloque o viewport em 1080.
- O `export_slides.py` **aborta se algum slide não couber** na altura. Vale
  entender por que a checagem é do jeito que é: `scrollHeight` não serve
  (com `justify-content:center` o texto transborda para os dois lados e
  `scrollHeight` só vê o de baixo), e medir contra o `.slide-inner` também
  não serve (ele é flex item com `flex:1` e cresce junto com o conteúdo por
  causa do `min-height:auto`). A referência tem que ser a caixa do `.slide`,
  que é quem recorta.
- As fontes estão **embutidas em base64** no HTML. Isso é de propósito: garante
  que o export não saia com fonte fallback se a rede falhar. O
  `export_slides.py` aborta se as fontes não carregarem.
- O `.slide-inner` tem `padding-right: 54px` porque a seta de swipe ocupa 48px.
  Sem isso o texto passa por baixo dela.
- O `padding-top` e o `padding-bottom` são iguais (52px) de propósito: com
  `justify-content:center`, se só a base tivesse padding o texto centralizaria
  na área acima da barra de progresso, e não no meio real do slide.
- O último slide não tem seta (sinaliza o fim) e tem a barra de progresso em 100%.

## Pendências

- **Confirmar o @ do Instagram do Rafael.** Está `@rafaelgranella` no frame de
  preview, inferido do domínio `rafaelgranella.com.br`. Não achei o handle
  versionado no repo. Isso só afeta o preview, não os PNGs.
- O `CLAUDE.md` do cliente diz que `quiz-alivance/` é "teste antigo, fora de
  uso", mas o `README.md` dele lista o quiz como ativo em produção
  (`quiz.rafaelgranella.com.br`). Vale alinhar, porque a paleta daqui saiu do quiz.
