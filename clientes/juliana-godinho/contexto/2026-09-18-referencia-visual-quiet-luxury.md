# Referência visual — quiet luxury

> Definida em 18/09/2026 pelo operador, a partir da identidade da **Julia Ottoni**
> (especialista em posicionamento e arquétipos). O que se aproveita dela é o
> padrão de design, nunca o modelo de comunicação.

## A direção, nas palavras do operador

> "Escolha uma paleta minimalista: use fundos brancos, off-white ou bege claro,
> com detalhes em dourado fosco, marrom acetinado ou preto para os textos. Isso
> transmite luxo silencioso (quiet luxury)."

## Paleta extraída dos sites dela

Levantada do CSS de `juliaottoni.com` (site em Framer), contando cor por
frequência de uso:

| Cor | Papel |
|---|---|
| `#000000` | texto, uso dominante |
| `#FFFFFF` | fundo e superfícies |
| `#A6842A` | **dourado fosco, o acento da marca** |
| `#997922` | dourado mais fechado, variação |
| `#AE9040` | dourado mais claro, variação |

Outros sites ativos dela: `juliaottoni2.com.br`, `lps.juliaottoni2.com.br` e
`juliaacademy.com.br`. Os dois primeiros não responderam à leitura automática.

## Tipografia dela, e por que a nossa diverge

O site usa **Cormorant Garamond** no display, com Montserrat, Lora, Libre
Baskerville e Poppins no apoio.

**Não usamos Cormorant Garamond.** O aprendizado de 12/08 desta conta registra
que ela erra a acentuação em português: o agudo de "clínica" cai sobre o "l" e o
circunflexo de "Você" fica solto. Numa página toda em português isso aparece em
quase todo título. A substituta é a **EB Garamond**, de desenho praticamente
igual e acentuação correta. Montserrat fica no apoio, como nela.

## Paleta aplicada nos nossos materiais

```
--papel      #FBFAF7   fundo
--branco     #FFFFFF   cartões e superfícies elevadas
--tinta      #0A0A0A   texto
--tinta-2    #4A443C   texto secundário, marrom acetinado
--tinta-3    #8B8378   texto de apoio
--ouro       #A6842A   acento, o dourado fosco dela
--ouro-fundo #F3EEDF   lavagem de dourado
--linha      #E7E2D8   fio
```

## Estrutura de layout

Referência de layout, sem as cores: o template de coach do Weblium
(`life-coach.weblium.site`). O padrão que se aproveita é herói com declaração
forte e uma ação principal, faixas de declaração alternando com blocos de
conteúdo, e o mesmo CTA repetido a cada seção.

Referência de formulário: `forms.bethelapps.com/analise-de-perfil`. Vale a
estrutura de quiz, não o visual, porque a página é um SaaS de formulários em
Tailwind com Inter e o CSS é da plataforma e não da identidade de quem publica.

## Onde já está aplicada

- `funis/quiz-b-diagnostico/quiz-c.html` (funil Estrato 7)
