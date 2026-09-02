# Diagnóstico AUTOFOCO · funil de quiz do Delphis Fonseca

Quiz de 10 perguntas + página de diagnóstico personalizada, na identidade da marca
dele (preto e dourado, extraída de `metodoautofoco.com.br`).

- **No ar:** https://autofoco.vercel.app
- **Planilha de leads:** [Leads · Diagnóstico AUTOFOCO](https://docs.google.com/spreadsheets/d/1I5dn9kDWkCBteLKKaO3-V5y7va2pyZJGGp_KwLPk3H8/edit) (pasta `3. Estratégia e Tráfego` no Drive do cliente)
- **Vercel:** time Simpleacc · projeto `autofoco`
- **Make:** cenário `[Delphis Fonseca] Diagnóstico AUTOFOCO → Sheets` (id 6134483), time Simple Acc
- **Meta Pixel:** `2308443446594670` (o mesmo do portfólio Delphis Studios, já aquecido)
- **Copy aprovada:** `../../estrategia/2026-08-28-estrategia-completa-delphis.html` (seções 2 e 3)

## Como o anúncio deve apontar

Sempre para a **raiz com os parâmetros**, nunca para `/index.html`:

```
https://autofoco.vercel.app/?utm_source=meta&utm_medium=cpc&utm_campaign=diagnostico-autofoco&utm_content=angulo-1-cena
```

As UTMs são capturadas no carregamento e vão junto com o lead para a planilha.

## Rastreamento (Meta)

O pixel está por código nas duas páginas, no `<head>`, antes do CSS.

| Evento | Onde dispara | Para que serve |
| ------ | ------------ | -------------- |
| `PageView` | quiz e página de diagnóstico | padrão do pixel |
| **`Lead`** | uma vez, no envio do formulário | **é o evento de conversão da campanha** (objetivo Leads). Vai com `content_category` = padrão e `status` = classificação |
| `whatsapp_click` (custom) | clique em qualquer botão de WhatsApp na página de diagnóstico | sinal de intenção, leitura interna |
| `step_view`, `step_complete`, `funnel_start`, `funnel_complete`, `funnel_abandon`, `field_error` (custom) | ao longo do quiz | onde o lead desiste, pergunta a pergunta |

O `funnel_abandon` só dispara em quem **não** concluiu, então não polui quem converteu.

## Arquivos

| Arquivo | O que é |
| ------- | ------- |
| `index.html` | O quiz. A primeira pergunta já aparece na primeira tela. Carrega o pixel. |
| `flow.js` | **Toda a copy do quiz.** Perguntas, opções, hero, captura e o WhatsApp da marca. É aqui que se edita texto. |
| `app.js` | Motor: render, auto-avanço, máscara de WhatsApp, validação, UTMs, sessionStorage, classificação do lead, evento `Lead` e envio para a planilha. |
| `diagnostico.html` / `diagnostico.js` | Página pós-quiz: leitura personalizada por padrão, botão Baixar PDF e botão WhatsApp. Carrega o pixel. |
| `styles.css` | Tema da marca. A paleta está no bloco `:root`. |
| `vercel.json` | `cleanUrls` ligado (a URL fica sem `.html`). |

## Como o lead é classificado

O cruzamento acontece no `app.js` e vai gravado na planilha, na coluna **Classificação**:

- **QUALIFICADO** · P2 (momento profissional) em empresário, executivo ou profissional liberal **e** P10 (prontidão) em "estou pronto" ou "quero entender como funciona". Vai para a fila de sessão estratégica.
- **A NUTRIR** · P10 em "não é o meu momento". Fica na base de conteúdo.
- **FORA POR ORA** · P10 em "só quero o diagnóstico", ou perfil em construção de carreira. Recebe a oferta do Detonando a Timidez no fim da página.

A coluna **Padrão** vem da P3 e define a leitura que a pessoa recebe: O Invisível,
O Travado, O Personagem ou O Correto. É também o gancho da primeira mensagem no WhatsApp.

## Integração com a planilha

Está **no ar e testada**. Não usa Apps Script: usa o mesmo padrão dos outros funis
da casa, um cenário do Make.

```
quiz (app.js) --POST form-urlencoded--> webhook do Make --> Google Sheets: Add a Row
```

- Webhook: `https://hook.us2.make.com/3wzu02g0mdb771irfu6ngavgrp1k6njv` (constante `LEADS_ENDPOINT` no `app.js`)
- Conexão Google usada: `My Google connection (ssouzadaniel.ads@gmail.com)`, a mesma dos demais clientes
- A aba de destino chama `Untitled` e o cabeçalho tem 22 colunas, na ordem do mapeamento do cenário

Para mudar coluna, mexa nos dois lados: no `lead` do `app.js` e no mapeamento do
módulo Google Sheets do cenário.

## Pendências do cliente

- **Logo em PNG ou SVG com fundo transparente.** Hoje o topo usa um wordmark provisório em HTML (a palavra AutoFoco com o alvo no lugar do "o"), fiel ao logo atual dele, que só existe em JPG com marca d'água e reflexo.
- **Número de WhatsApp comercial.** Está apontando para `5511944659466`, o número que ele publica no próprio site. Quando existir um número dedicado ao comercial, trocar em `flow.js`.
- **Depoimentos.** A página tem dois espaços `[DEPOIMENTO]` reservados. Só entram com autorização escrita de nome e imagem.
- **VSL de 5 minutos.** Prevista na estratégia para o topo da página de diagnóstico. Não bloqueia a subida do funil, entra depois.
- **Domínio próprio.** `autofoco.vercel.app` resolve. Se ele quiser em domínio dele, `diagnostico.metodoautofoco.com.br` aponta para o mesmo projeto sem mexer no código.

## Republicar

O deploy é manual, pelo MCP da Vercel, no time Simpleacc, projeto `autofoco`.
Ao editar qualquer arquivo, **suba a árvore inteira** (o deploy substitui todos os
arquivos do projeto, não faz merge) e confira as URLs:

```
for f in "" app.js flow.js styles.css diagnostico diagnostico.js; do
  curl -sL -o /dev/null -w "%{http_code} /$f\n" "https://autofoco.vercel.app/$f"
done
```

A proteção de deploy (Vercel Authentication) está **desligada** neste projeto, senão
a URL pediria login e o lead não entraria.
