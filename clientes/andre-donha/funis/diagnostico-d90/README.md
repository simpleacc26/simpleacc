# Diagnóstico D-90 · funil da Musikalis

Quiz de 9 perguntas + página de diagnóstico personalizada, na identidade visual
oficial de musikalis.com.br.

**No ar: https://musikalis-diagnostico.vercel.app**

## O que é

Arquivo único, sem build e sem dependências. O fluxo inteiro roda numa página:

`9 perguntas → captura de lead → tela de leitura → diagnóstico personalizado`

- **Sem tela de abertura.** A primeira pergunta abre junto com a página.
- **Avanço automático** na seleção, com 330ms de respiro. Sem botão de continuar.
- **A régua do topo é a linha do tempo oficial do site:** D-90 Concepção, D-60
  Estruturação, D-30 Ativação, D-7 Pré-show, D-Day Execução, D+7 Pós-show. Cada
  pergunta declara em que etapa da produção ela vive.

## Como o índice é calculado

Quatro perguntas pontuam, somando 100:

| Pergunta | Peso | Pontos por alternativa |
| --- | --- | --- |
| P3 antecedência | 40 | 0 · 12 · 24 · 40 |
| P6 controle | 30 | 0 · 10 · 20 · 30 |
| P5 custo já pago | 15 | 0 · 5 · 15 · 10 |
| P7 tentativas | 15 | 0 · 5 · 8 · 15 |

Faixas: **0 a 30** produção sem método · **31 a 55** reativa · **56 a 80**
organizada · **81 a 100** D-90.

O vazamento em reais aplica um percentual da faixa sobre o orçamento médio
informado na P9 (R$ 3 mil, R$ 12 mil, R$ 50 mil ou R$ 120 mil):
20 a 35% na primeira faixa, 12 a 20%, 5 a 12% e até 5% na última.

> **Pendente:** essas faixas são estimativas derivadas da metodologia e precisam
> da chancela do André antes de rodar tráfego. É o número em vermelho da página.

A P4 define o elo dominante entre as dimensões reais da plataforma: Orçamento e
Resultados, Operação, Legal e Negociação, Marketing. A P9 é a porteira de
qualificação.

## Identidade, extraída do CSS do site

| Token | Hex | Papel |
| --- | --- | --- |
| off-white | `#F4F7FB` | fundo |
| navy | `#070C5F` | texto e títulos |
| azul royal | `#0A138A` | primário, seleção, progresso |
| azul claro | `#CCDCF0` | preenchimento do selecionado |
| borda | `#BFCFE3` | bordas de card |
| ouro | `#D9A520` | só o CTA (no site é a cor do upgrade) |
| alerta | `#C52020` | dimensão crítica e vazamento |

Montserrat (display), Inter (texto), JetBrains Mono (dados). Raio 6px e sombra
de card copiados do site.

## Deploy

Projeto Vercel `musikalis-diagnostico` (time Simpleacc). A pasta já está
vinculada via `.vercel/project.json`, que não vai para o Git.

```bash
cd clientes/andre-donha/funis/diagnostico-d90
npx vercel deploy --prod --yes --token $VERCEL_TOKEN
```

O alias limpo `musikalis-diagnostico.vercel.app` está atribuído ao projeto e
aponta para a produção automaticamente.

## Migração para dentro da plataforma (decidida em 22/09)

O quiz deixa de ser página externa e vira o onboarding da Musikalis. O André
replica no Lovable a partir de **`PROMPT-LOVABLE.md`**, que é o arquivo
canônico: traz as 9 perguntas, os pesos, as faixas, os textos do diagnóstico, o
contrato de dados e os eventos do pixel.

No fim do quiz o lead sai com as duas coisas: o relatório **e** a conta free já
criada, com o perfil preenchido pelas respostas.

Os outros dois arquivos de apoio:

- **`PIXEL-META.md`** — snippet, mapa de eventos e o passo a passo de criação no
  gerenciador.
- **`PLANILHA-DE-LEADS.md`** + `planilha-leads-cabecalho.csv` — o contrato de
  colunas que a planilha da Simple e a saída do Lovable precisam compartilhar.

## Pendências antes de rodar tráfego

1. **Gravar o lead.** Hoje o formulário valida e segue, mas não persiste. Falta
   ligar na planilha do Drive e no CRM (GoHighLevel).
2. **Chancela das faixas de vazamento** com o André.
3. **CTA final.** Aponta para musikalis.com.br. O workshop foi cancelado em
   18/09, então "Criar conta grátis" e "Falar com produção" são os CTAs do site.
   Dentro da plataforma o botão principal passa a concluir o cadastro, o que
   resolve metade. Falta decidir o que leva da conta free ao GPM.
4. **Logotipo em vetor.** O microfone do topo foi redesenhado à mão.
5. **Pixel da Meta.** Falta o Renan criar no gerenciador e o André instalar.
   Ver `PIXEL-META.md`.
6. **Domínio próprio**, se for o caso.
