# Carrossel de anúncio — Diagnóstico de Maturidade do Negócio (recorte indústria)

Criativo de carrossel para Instagram (@carolbatista) que leva ao **funil de quiz V3**
da ÚNICOS, o *Diagnóstico de Maturidade do Negócio*.

- **Cliente:** Carol e José (ÚNICOS Leadership Club)
- **Data:** 04/08/2026
- **Recorte:** indústria acima de R$5 milhões de faturamento anual
- **Destino:** https://unicos-diagnostico.vercel.app (projeto Vercel `unicos-diagnostico`)

## Arquivos

| Arquivo | O que é |
| ------- | ------- |
| `carrossel.html` | Carrossel autocontido, com preview em frame do Instagram. Abra no navegador e arraste para passar os slides. Fotos embutidas em base64, sem dependências. |
| `slides/slide_1..5.png` | Os 5 slides em 1080×1350, prontos para subir no Instagram. |

## A copy (5 cards, um parágrafo por card)

Copy aprovada pelo cliente, aplicada **sem alteração de texto**.

1. Sua indústria já passa dos R$5 milhões. Mas quando você não está em cima, as coisas não andam do jeito que deveriam.
2. Não é que o time não saiba o que fazer. Ele sabe. As pessoas só aprenderam que nada anda sem o seu aval.
3. A mesma gestão que trouxe a sua empresa até aqui está com a validade vencida.
4. Não é só com você. Todo dono de negócio que cresce rápido chega nesse ponto, e cada mês assim custa margem e oportunidades que não voltam.
5. Clique em Saiba mais e responda o Diagnóstico de Maturidade do Negócio: descubra o que falta para você construir o futuro do seu negócio.

## Estrutura visual

Segue a sequência argumentativa do Framework de Comunicação ÚNICOS: reconhecimento,
dor, verdade, normalização, oferta. A autoridade (foto da Carol) entra no card 4,
depois da dor, nunca antes.

| # | Fundo | Papel | Tag |
| - | ----- | ----- | --- |
| 1 | Claro `#faf8f4` | Reconhecimento, com o lockup da marca | INDÚSTRIA · ACIMA DE R$5 MILHÕES |
| 2 | Navy `#16314f` | Diagnóstico, sem culpar o time | O QUE ACONTECE NA PRÁTICA |
| 3 | Gradiente navy | Frase-âncora sozinha, em serifada itálica | O DIAGNÓSTICO |
| 4 | Foto + overlay navy | Normalização e custo, com a Carol | O CUSTO DE MANTER |
| 5 | Gradiente navy | Oferta, botão Saiba mais, sem seta | — |

## Identidade

House style do funil V3, para o criativo ser continuação visual da página que o lead abre:

- Navy `#16314f` · Navy profundo `#0f2338` · Navy claro `#1e3d61`
- Dourado `#a9802f` · Dourado claro `#d4a84b` · Laranja da estrela `#d4601a`
- Fundo claro `#faf8f4` · Borda `#e6e1d6`
- Tipografia: Playfair Display (títulos) + Inter (corpo)

Regras de tom aplicadas, conforme o Framework: sem travessões, sem emoji, sem as
palavras banidas (gargalo, próximo nível, sustentação, travando), tom diagnóstico
e não conselho.

## Como regerar

Os scripts de build e export ficam versionados junto:

```bash
python3 build_carrossel.py   # gera carrossel.html com as fotos em base64
python3 export_slides.py     # exporta slides/slide_1..5.png em 1080×1350
```

O layout é desenhado em **420px de largura**. O export usa `device_scale_factor`
de 1080/420 para chegar a 1080px sem reflow. Não mude a largura do `.ig-frame`.

As fotos de origem vivem no Drive do cliente, na pasta compartilhada de fotos da
Carol. `build_slide4.jpg` e `build_avatar.jpg` são recortes de `carol-pagina.jpg`
e `img1012.jpg`.
