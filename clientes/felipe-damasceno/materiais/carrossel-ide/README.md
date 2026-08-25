# Carrossel Instagram · Diagnóstico Executivo (IDE)

Carrossel de 7 slides para @felipedamasceno.1, montado **em cima da copy
aprovada** em `clientes/felipe-damasceno/estrategia/2026-07-20-estrategia.md`
(Big Idea, bloco de dor, frase de virada, reframe, método e CTA primário).

## Arquivos
- `build.py` — gera o `carousel.html`. **Edite a copy aqui**, não no HTML.
- `carousel.html` — preview no frame do Instagram (arrasta ou setas). Autossuficiente: fontes em base64, abre offline.
- `export.py` — exporta os slides em 1080x1350 via Playwright.
- `slides/slide_1..7.png` — os arquivos prontos pra postar, na ordem.
- `fonts/fonts-embedded.css` — Playfair Display + DM Sans em base64 (latin).

## Como regerar
```bash
python3 build.py     # reconstrói o HTML
python3 export.py    # reexporta os 7 PNGs (Chromium do ambiente)
```

## Estrutura dos slides
| # | Slide | Fundo | Fonte na estratégia |
|---|-------|-------|---------------------|
| 1 | Hero | claro | Headline da Página de Aplicação + Big Idea |
| 2 | O espelho | escuro | Bloco de dor (5 marcadores) |
| 3 | A virada | gradiente | Frase de virada (citada literal) |
| 4 | Por que não resolveu | claro | Reframe (mecanismo do problema) |
| 5 | O mecanismo | escuro | Definição do IDE |
| 6 | O método | claro | Método Potência Empresarial (5 pilares) |
| 7 | CTA | gradiente | CTA primário + microcopy |

## Decisões que valem revisar antes de repetir o modelo
1. **Slide 6 usa os 5 pilares** (Diagnosticar, Organizar, Delegar, Automatizar,
   Governar), que foi a correção oficial aplicada no funil, e não as 4 etapas do
   PDF da estratégia (Mapear, Diagnosticar, Transferir, Governar).
2. **Sem número de perguntas.** O PDF diz 7, o funil no ar tem 9. Ficou só
   "2 minutos", que é verdade nos dois casos.
3. **Sem bloco de autoridade**, de propósito: assim o carrossel não depende da
   decisão pendente sobre o livro "Líderes Não Nascem Prontos".

## Padrão visual
Derivado do primário `#E0A63A`: claro `#F2EEE6`, escuro `#0A0E16` (o navy da
marca, mantido no lugar do quase-preto genérico), gradiente
`#8C5E0A → #E0A63A → #F2C775`. Playfair Display (títulos) + DM Sans (corpo).
Barra de progresso e seta de swipe são parte da imagem, não overlay.
Sem travessão e sem emoji, conforme o padrão do cliente.

## Legenda sugerida
> A sua empresa cresceu. E hoje quem trabalha mais é você.
>
> Você aprova quase tudo, apaga incêndio e sente que se sair 15 dias a empresa trava. Isso não é sinal de sucesso, é uma prisão bem paga.
>
> O problema não é vender mais. É que você administra a sua empresa, mas ainda não a governa.
>
> Arrasta pro lado e veja se você se reconhece. No último slide tem o Diagnóstico Executivo, gratuito, 2 minutos, e você sai com o seu IDE.
