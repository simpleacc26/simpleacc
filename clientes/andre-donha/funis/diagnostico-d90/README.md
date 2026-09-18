# Diagnóstico D-90 · direção visual do funil

Protótipo navegável do quiz e da página de diagnóstico da Musikalis, na identidade
visual oficial do cliente.

## No ar

- **https://musikalis-diagnostico-simpleacc.vercel.app**
- Projeto Vercel: `musikalis-diagnostico` (time Simpleacc, plano Hobby)
- Deploy por conteúdo inline via MCP da Vercel, sem repositório ligado
- `noindex, nofollow` no head: é peça interna, não deve aparecer em busca
- Proteção de deploy desligada, senão o link pede login do Vercel

> A URL carrega o sufixo `-simpleacc` porque em conta Hobby a Vercel anexa o slug
> do time ao domínio de produção. Para uma URL limpa, adicionar
> `musikalis-diagnostico.vercel.app` em Settings → Domains do projeto (é grátis).

## Como rodar e editar

Arquivo único, sem build e sem dependências. Abra `index.html` no navegador.
As fontes vêm do Google Fonts; o resto é inline.

Para republicar, use o MCP da Vercel com `target: production` e o conteúdo do
`index.html`, ou suba pela dashboard.

## Identidade, extraída de musikalis.com.br

Os tokens saíram do CSS do site (`/assets/index-QxTebQNO.css`), onde estão em HSL.

| Token | Hex | Papel no funil |
| --- | --- | --- |
| off-white | `#F4F7FB` | fundo de toda tela |
| navy | `#070C5F` | texto e títulos |
| azul royal | `#0A138A` | primário, seleção e progresso |
| azul claro | `#CCDCF0` | preenchimento do selecionado |
| borda | `#BFCFE3` | bordas de card |
| ouro | `#D9A520` | só o botão de conversão (no site é a cor do upgrade) |
| alerta | `#C52020` | dimensão que vaza e valor perdido |

Tipografia: **Montserrat** (display), **Inter** (texto), **JetBrains Mono** (dados).
Raio de borda 6px e sombra de card copiados do site.

## Decisões de estrutura

- **Sem tela de abertura.** A primeira pergunta abre junto com a página.
- **Avanço automático** na seleção, com 330ms de respiro para a marcação aparecer.
- **A régua é a linha do tempo oficial** do site: D-90 Concepção, D-60 Estruturação,
  D-30 Ativação, D-7 Pré-show, D-Day Execução, D+7 Pós-show.
- **Os elos do diagnóstico são as dimensões reais da plataforma:** Orçamento e
  Resultados, Operação, Legal e Negociação, Marketing.
- **Assinatura da marca** ("Para quem não pode se dar ao luxo de improvisar") na
  tela de carregamento. É a frase do hero do site.

## Pendências antes do funil real

1. CTA definitivo. O workshop foi cancelado em 18/09 e era o destino do funil; o
   protótipo usa "Criar conta grátis" e "Falar com produção", que são os CTAs do site.
2. Chancela do André nas faixas de vazamento (o número em vermelho).
3. Logotipo em vetor. O microfone do protótipo foi redesenhado à mão.
4. Domínio, acessos (Meta, Instagram, admin da plataforma) e a planilha de leads.
