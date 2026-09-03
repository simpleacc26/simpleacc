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
| `whatsapp_click` (custom) | clique em qualquer botão de WhatsApp na página de diagnóstico | sinal de intenção, leitura interna. Vai com `origem` (`topo`, `leitura-2`... `leitura-5`), então dá para ver **qual** botão converte |
| `step_view` com `step_id: "gerando"` | tela de carregamento entre o quiz e o diagnóstico | mede quem desiste nos 5 segundos |
| `step_view`, `step_complete`, `funnel_start`, `funnel_complete`, `funnel_abandon`, `field_error` (custom) | ao longo do quiz | onde o lead desiste, pergunta a pergunta |

O `funnel_abandon` só dispara em quem **não** concluiu, então não polui quem converteu.

## Arquivos

| Arquivo | O que é |
| ------- | ------- |
| `index.html` | O quiz. A primeira pergunta já aparece na primeira tela. Carrega o pixel. |
| `delphis.jpg` | Foto do Delphis para o bloco "Quem conduz" (veja a nota abaixo). |
| `flow.js` | **Toda a copy do quiz.** Perguntas, opções, hero, captura e o WhatsApp da marca. É aqui que se edita texto. |
| `app.js` | Motor: render, auto-avanço, máscara de WhatsApp, validação, UTMs, sessionStorage, classificação do lead, evento `Lead` e envio para a planilha. |
| `diagnostico.html` / `diagnostico.js` | Página pós-quiz: leitura personalizada por padrão, botão Baixar PDF e botão WhatsApp. Carrega o pixel. |
| `styles.css` | Tema da marca. A paleta está no bloco `:root`. |
| `vercel.json` | `cleanUrls` ligado (a URL fica sem `.html`). |

## A foto do Delphis

O bloco "Quem conduz" mostra a foto dele. O arquivo está versionado aqui como
`delphis.jpg`, mas **a página busca a foto pela URL do Drive do cliente**
(`2. Material Visual > Fotos`), na constante `FOTO_DELPHIS` do `diagnostico.js`.

O motivo é operacional: o deploy é feito por MCP, e o binário não sobrevive
íntegro ao caminho até a Vercel. Quem publicar de uma máquina com o arquivo em
disco deve **trocar `FOTO_DELPHIS` por `"delphis.jpg"`** e subir o arquivo junto,
para o funil voltar a ser 100% autocontido. Enquanto isso, se o Drive falhar, a
foto some sozinha (`onerror`) e o resto do bloco continua de pé.

Quando o Delphis mandar uma foto em alta, troque `delphis.jpg` por ela: a atual
tem só 150x150 e é exibida a 104px.

## Os botões de WhatsApp

São **5**, distribuídos ao longo da leitura (1%, 31%, 60%, 78% e 95% da página):

1. Topo, na barra de ferramentas, junto do "Baixar PDF".
2. Depois de **O espelho**, o momento em que a pessoa se reconhece.
3. Depois do **custo de continuar como está**, o pico de urgência.
4. Depois de **Quem conduz**, logo após a prova de autoridade.
5. Na caixa dourada do fim, com a oferta completa.

Os três do meio saem do helper `ctaMeio()` no `diagnostico.js`: para acrescentar,
tirar ou reescrever um, é lá. Cada um recebe dois rótulos, e o código escolhe pela
classificação do lead, para **não oferecer sessão estratégica a quem caiu na oferta
de entrada**. A mensagem que abre no WhatsApp segue a mesma regra: `whatsappMsg`
para quem se qualifica, `whatsappMsgEntrada` para os demais (as duas ficam em
`flow.js`).

## Os depoimentos em vídeo

Três clipes verticais no bloco "Quem conduz", numa faixa que desliza no dedo. O
card mostra a miniatura e o player só carrega no toque, num modal em tela cheia
(fecha no ×, no fundo ou no Esc, e zera o iframe para o vídeo não seguir tocando).

| Quem | Credencial na legenda | Arquivo no Drive |
| ---- | --------------------- | ---------------- |
| Rafa Brites | Apresentadora e escritora. Repórter do Mais Você e do SuperStar (Globo), hoje no Power Couple Brasil (Record). | `RAFA BRITES depo edit.mov` |
| Warley Santana | Ator, apresentador e ventríloquo. Repórter do Chega Mais (SBT), ex-CQC (Band). | `WARLEY SANTANA edit depo.MOV` |
| Gabriela Prioli | Advogada criminalista, professora e apresentadora. Conhecida no O Grande Debate (CNN Brasil), hoje no GNT. | `GABRIELA PRIOLI edit depo.MOV` |

A lista fica na constante `DEPOIMENTOS` do `diagnostico.js` (id do Drive, nome e
credencial). Para trocar ou acrescentar, é lá. Na pasta do Drive ainda há dois
outros depoimentos não usados, de Marília Moreno e Patrícia Fazan.

**Onde os vídeos moram:** direto no Drive do cliente, via `drive.google.com/file/d/<id>/preview`,
com a miniatura em `drive.google.com/thumbnail`. Vale o mesmo alerta da foto: para
tráfego pago, o certo é subir os três para um YouTube não listado (ou Vimeo) da
conta do Delphis e trocar o `id` pelo embed de lá. O Drive não é CDN e pode
recusar quando o volume de visualizações sobe.

**Autorização de imagem:** os três são pessoas públicas. Os arquivos foram
subidos pelo próprio Delphis, mas **antes de rodar mídia paga é preciso ter a
autorização escrita de nome e imagem de cada um**, e no caso da Gabriela Prioli
o clipe é trecho de um podcast, o que envolve também o direito do programa.

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
arquivos do projeto, não faz merge; subir só um arquivo apaga os outros) e confira
as URLs:

```
for f in "" app.js flow.js styles.css diagnostico diagnostico.js; do
  curl -sL -o /dev/null -w "%{http_code} /$f\n" "https://autofoco.vercel.app/$f"
done
```

A proteção de deploy (Vercel Authentication) está **desligada** neste projeto, senão
a URL pediria login e o lead não entraria.
