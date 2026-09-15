# Quiz · Diagnóstico Gatilho Único (Luana Isse)

Funil de quiz da Luana Isse. Anúncio ou bio → quiz de 8 passos → captura →
tela de carregamento → diagnóstico personalizado com CTA de WhatsApp.

> **REFEITO EM 14/09, não ajustado.** A oferta mudou na call de 11/09: saiu a
> mentoria MMPV de R$ 7 mil, entrou o **Método Gatilho Único, R$ 1.997, vendido
> por VSL**, e o público passou a ser **quem já vende** e está cansado de
> depender de call. Funil novo, promessa nova, perguntas novas. O quiz antigo
> (Diagnóstico de Autoridade, com IRV e os pilares do MMPV) não existe mais.
> Antes de mexer aqui, leia
> `estrategia/2026-09-14-skill1-estrategia-quiz-gatilho-unico.md`.

**No ar:** https://quiz-luana-isse.vercel.app

> O link público é o curto. O alias com sufixo do time
> (`quiz-luana-isse-simpleacc.vercel.app`) também responde, mas é o interno.
> O nome do projeto na Vercel vira a URL e não dá para renomear: trocar de
> domínio exige projeto novo e remover o antigo no painel.

## O que é

Segue o blueprint `references/estrutura-invisivel.md` da skill
`gerar-quiz-diag-pag-pos-quiz`, com os ajustes validados no projeto
Thaina/Thiago aplicados por cima, e com a copy e a identidade visual da Luana.

**A estratégia é ASK (Ryan Levesque), não pontuação.** É um **quiz Killer**: o
resultado nomeia um erro que a pessoa não sabia que estava cometendo, e não
devolve nota nenhuma. A **pergunta de segmentação vem imediatamente antes da
captura**, e é ela, sozinha, que define o diagnóstico. Os buckets saíram da
linguagem do comprador real, não dos pilares do método da Luana: inventar
bucket a partir do próprio método é o erro fatal que o ASK nomeia, e foi
exatamente o que a versão anterior deste quiz fez.

**Identidade visual vem do manual de marca oficial dela**, não de inferência:
cores em `contexto/marca/`, com o dourado `#B49055` e o escuro `#030118`.
Montserrat no corpo (do manual) e Playfair Display nos títulos, substituta da
Humble Nostalgia, que é paga. As fontes carregam sem bloquear a renderização,
então Google Fonts fora do ar não trava a página.

- **Sem índice numérico.** Quiz Killer não mede, nomeia. O IRV foi removido:
  era decoração (89% das combinações caíam na mesma faixa) e prometia precisão
  que o quiz não tem.
- **Resultado nomeado**, um dos quatro: Oferta que só existe na conversa ·
  Pitch que mora na sua cabeça · Fechamento que depende de improviso · Convence,
  mas não conduz. Cada um é uma das quatro tarefas que o conteúdo único precisa
  cumprir para substituir a call. Vai no topo do relatório, na mensagem de
  WhatsApp e na planilha.
- **O diagnóstico sai da pergunta de segmentação (`cena`)**, a última antes da
  captura, e de nenhuma outra. A pessoa escolhe uma cena concreta ("mandei o
  conteúdo para alguém e...") e cada opção carrega o seu `diag` no `flow.js`.
  Sem peso, sem soma, sem inferência.
- **Duas porteiras no fim:** `faturamento` (a primeira opção, "ainda não faturo
  de forma constante", marca `fora: true`) e `prontidao`.
- **Qualificação em 4 faixas** na planilha (fila-quente, qualificado, nutrir,
  fora) e **3 CTAs** na página: fila-quente e qualificado veem o mesmo botão.
  A quarta faixa serve para priorizar a fila do atendimento.
- **3 CTAs de WhatsApp distribuídos** no diagnóstico, não um só no fim.
- **3 depoimentos em vídeo** no relatório, um deles de homem, o que ajuda no
  equilíbrio do público. No desktop os três cabem lado a lado; no celular vira
  carrossel. `preload="none"`, então o relatório não puxa os 5 MB de quem não
  aperta play.
- **3 depoimentos em print**, os originais que ela mandou, logo abaixo dos
  vídeos. Nem todo mundo aperta play: a prova precisa existir também num
  formato que se lê de relance. Cada print abre em tamanho real ao tocar.

## Arquivos

| Arquivo | O que é |
|---|---|
| `index.html` | Casca do quiz (marca + barra de progresso) |
| `flow.js` | **Toda a copy, os 8 passos e os resultados nomeados.** Mexer aqui |
| `app.js` | Motor: render, validação, persistência, tracking, envio do lead |
| `diagnostico.html` | Casca do relatório |
| `diagnostico.js` | Monta o diagnóstico personalizado |
| `styles.css` | Identidade visual, cores do manual de marca |
| `logo.png` | Assinatura da marca, extraída do manual |
| `luana.jpg` | Foto dela, no bloco de autoridade |
| `depoimentos/` | Depoimentos em vídeo. Ver o README de lá antes de mexer |

## Decisões que valem para o próximo funil

1. **Barra de progresso sem número nenhum.** Nem "Pergunta X de N", nem
   porcentagem. Número ali faz o quiz parecer longo e medido, e derruba
   conclusão. Só a barra enchendo.
2. **Sem rodapé** nas páginas do funil.
3. **Índice numérico só entra se sobreviver ao teste da distribuição.** A
   primeira versão deste funil tinha o IRV: 89% das combinações caíam na mesma
   faixa e "Baixa" era praticamente impossível. Era teatro de precisão.
   Removido em 14/09. Se um dia alguém quiser pontuação de volta, rode a
   distribuição sobre todas as combinações ANTES de publicar: se uma faixa
   engole mais de dois terços, o índice não está medindo nada.
   **A distribuição atual das 200.000 combinações** (com as 4 faixas de
   qualificação) está em ~23% fora, ~38% nutrir, ~29% fila-quente, ~10%
   qualificado. Rode de novo se mexer em `classificarLead()`.
4. **Regra de corte cruzada vive no código**, em `classificarLead()`, não só no
   documento de estratégia.
5. **Mensagem de WhatsApp leva o resultado nomeado**, não só o nome. Quem
   atende abre a conversa já sabendo o diagnóstico.
6. **Trava no código:** se `marca.whatsapp` estiver vazio ou inválido, os CTAs
   não abrem nada e a página mostra um aviso no topo. Evita publicar mudo.
7. **Máscara de telefone: tire o +55 antes de cortar, e nunca use `maxLength`
   num campo mascarado.** O autofill do iPhone entrega `+55 11 99991-2039` de
   uma vez, o código do país entrava como DDD e o final do número se perdia,
   sem conserto. Ouça `input`, `change` e `blur`, porque autofill nem sempre
   dispara `input`, e normalize também o valor enviado, não só o da tela.
   Cuidado com o DDD 55 (Santa Maria/RS): é real, por isso a regra é
   `length > 11 && startsWith("55")`.
8. **Linguagem neutra em gênero.** O ICP da Luana tem homens e mulheres
   (psicólogos, advogados, médicos, nutricionistas, coaches). Nenhum adjetivo
   pode concordar com quem lê. Teste ao escrever opção nova: leia em voz alta
   como homem e como mulher; se soar errado numa das duas, reescreva.
9. **Placeholder de telefone com DDD nacional (11), não o DDD do cliente.**
   O público é nacional; DDD regional no campo sinaliza atendimento local.
10. **Valor em reais na prova social: decisão do cliente, não descuido.** A
   régua original desta conta era não citar faturamento em depoimento (a Luana
   não promete resultado financeiro, e a Meta lê a página de destino). Levantei
   o ponto e **em 24/08 o cliente decidiu publicar assim mesmo**: o vídeo da Ali
   Klemt com "47k em Mentoria" queimado, o print do Diego com R$ 62.400 e o do
   Mairon com 10k. Registrado aqui, no `depoimentos/README.md` e nos
   comentários do `diagnostico.js` para ninguém achar que passou batido.
11. **Print de depoimento entra original, não transcrito.** Print de conversa
   converte mais porque é verificável: a pessoa reconhece a interface. Duas
   regras ao adicionar um: **cortar terceiros que aparecem no enquadramento** (o
   print da Nathy foi cortado para tirar dois nomes do grupo que não têm relação
   com o depoimento) e **transcrever o conteúdo no `alt`**, para leitor de tela e
   para quando a imagem não carrega.
12. **Bloco de autoridade é breve:** foto (aqui, monograma), nome, o que ela faz,
   @ do Instagram e uma fala dela. Método e etapas não entram, porque já estão
   no bloco do método logo acima. A grade de credenciais só existe porque os
   quatro números são reais e estão escritos no material dela.

## Rastreamento

**Pixel da Meta `486556150328290`**, instalado em 26/08. A biblioteca carrega nas
duas páginas (o `PageView` sai do bloco base) e o ID também vive em
`app.js > TRACKING_CONFIG`, que é quem decide os eventos de funil.

| Evento | Tipo | Quando dispara |
| --- | --- | --- |
| `PageView` | padrão | Abertura de qualquer uma das duas páginas |
| `ViewContent` | padrão | Primeira resposta do quiz, e abertura do relatório |
| **`Lead`** | **padrão** | **Envio do contato. É o evento de conversão** |
| `Contact` | padrão | Clique em qualquer CTA de WhatsApp no relatório |
| `LeadFilaQuente` / `LeadQualificado` / `LeadNutrir` / `LeadFora` | personalizado | Junto com o `Lead`, um por faixa |
| `step_view`, `step_complete`, `funnel_abandon`, ... | personalizado | Análise de passo a passo |

**`Lead` é o que a campanha otimiza.** Ele leva parâmetros de qualificação:
`qualificacao` (fila-quente, qualificado, nutrir, fora), `resultado` e
`content_category` (o diagnóstico). `faixa` e `irv` saíram junto com o índice.

### Por que existe um evento por faixa, além do parâmetro

**O construtor de Conversão Personalizada da Meta só oferece regra por URL.**
Testado em 27/08 na conta desta cliente: a lista de regras traz "URL" e mais
nada. O parâmetro `qualificacao` que vai no `Lead` serve para relatório, mas
**não dá para filtrar por ele**.

Por isso o funil dispara também um **evento personalizado por faixa**. Evento
sempre aparece no seletor de Conversão Personalizada; parâmetro nem sempre.
Com ele dá para medir **qualidade de criativo**, não só volume, que é o que
importa aqui: tráfego já falhou uma vez com ela por encher de lead ruim.

Nome em CamelCase porque a Meta não aceita hífen em nome de evento.

⚠️ **A R$ 66/dia, NÃO otimize a campanha por `LeadFilaQuente`.** A Meta precisa
de ~50 conversões por semana por conjunto para sair do aprendizado, e fila-quente
não chega perto disso nesse orçamento. **Otimize por `Lead`** e use as conversões
personalizadas **para ler qualidade e decidir onde pôr dinheiro**. Trocar o
evento de otimização só quando o volume justificar.

**Nada de dado pessoal vai para o Pixel.** Nome, telefone e e-mail não entram em
parâmetro de evento, e não há Advanced Matching ligado. Se um dia for ligar,
é decisão do cliente, não nossa.

## Planilha e integração

**Leads · Diagnóstico · Luana Isse**, no Drive dela, pasta
"3. Estratégia e Tráfego":
https://docs.google.com/spreadsheets/d/14QWEtzfTYxLcImWQW_Pcw0BJtNK1BY14jthvCUKhxLo/edit

**22 colunas** desde 15/09 (eram 26). Nesta ordem, que é a ordem do payload em
`app.js > enviarLead()`:

```
Data/Hora | Nome | WhatsApp | E-mail | Resultado | Qualificacao | Vende |
Como vende | Volume de calls | O que pesa | Ja tentou | Faturamento |
Prontidao | Cena | Frente | Origem | Pagina | utm_source | utm_medium |
utm_campaign | utm_content | utm_term
```

> ⚠️ **O cabeçalho da planilha precisa ser trocado à mão.** O cenário do Make já
> foi remapeado para estas 22 colunas em 15/09, mas a aba ainda tem o cabeçalho
> antigo (26 colunas, com IRV/faixa/pilar). Antes de mandar tráfego:
> **1)** duplique a aba atual como arquivo histórico (os leads antigos só fazem
> sentido sob o cabeçalho antigo); **2)** limpe a aba `Untitled` e cole o
> cabeçalho acima na linha 1. Não renomeie a aba (ver abaixo).

Cenário no Make (time Simple Acc):
**[Luana Isse] Diagnóstico Gatilho Único → Sheets**, id `5982387`, webhook
instantâneo. Só roda quando chega lead: **2 operações por lead, sem varredura
e sem agendamento**. Nada de crédito queimando à toa.

Detalhes que quebram se alguém mexer:

- A aba da planilha chama **"Untitled"** (nome de nascença de planilha criada a
  partir de CSV). O `addRow` do Make referencia a aba pelo **nome**:
  **renomear quebra o cenário** com "400 Unable to parse range" e o Make
  desativa sozinho. Não renomeie.
- O mapeamento é **por posição**, não por cabeçalho. Inserir coluna no meio
  desalinha tudo.
- O POST vai em `application/json` com `keepalive`. **Validar sempre lendo a
  planilha**, nunca pelo status HTTP: com `no-cors` o navegador devolve 0
  mesmo quando gravou.

## Teste obrigatório antes de qualquer publicação

Cole `+55 11 99991-2039` no campo de WhatsApp e confirme que o campo mostra
`(11) 99991-2039` **e** que é isso que sai no payload. Os dois, não só o campo.

## Pendências

- [x] ~~Autorização de todo mundo que aparece na prova social~~ e ~~assistir os
      três vídeos com áudio~~. Confirmados pelo Daniel em 24/08: Ali Klemt,
      Allan e Caroline Seyler nos vídeos, Diego, Mairon Ribas e Nathy nos
      prints. Prova social liberada para tráfego.
- [ ] **Pacote de logos** em SVG ou PNG transparente. O que está no ar foi
      extraído do PDF do manual.
- [ ] **GA4** em `app.js > TRACKING_CONFIG`, se for usar. O Pixel da Meta já está.
- [ ] **URL da VSL** em `flow.js > marca.vslUrl`. Enquanto estiver vazio, todos
      os CTAs do relatório caem no WhatsApp, que é o comportamento seguro. Assim
      que a VSL do Gatilho Único estiver no ar, preencher ali e republicar: o
      botão passa a levar direto para a VSL para todo mundo, menos quem caiu em
      `fora`, que continua no WhatsApp.
- [ ] **Trocar o cabeçalho da planilha** para as 22 colunas novas (ver acima).
      Até isso acontecer, os leads novos entram sob nomes de coluna errados.

## Como rodar e publicar

Site estático puro, sem build e sem dependência. Para ver local, abra
`index.html` no navegador ou sirva a pasta (`python3 -m http.server`).

Deploy na Vercel, **time Simpleacc**, projeto `quiz-luana-isse`, target
production. Nunca publicar em conta pessoal. Publicação substitui a árvore
inteira: **confira todos os assets com curl depois de cada deploy**, porque
arquivo faltando vira 404 mudo.

**Imagem no deploy pelo MCP vai como base64 e pode sair corrompida.** Aconteceu
aqui: um byte da foto saiu trocado e só o SHA256 pegou (a imagem abria normal).
Encolha a imagem antes, e **compare o SHA256 do publicado contra o local em
todos os arquivos**, não só nos que você mexeu.

**Para binário grande (vídeo), não use o MCP: use a API REST da Vercel**, que
manda o arquivo cru do disco e não passa por base64 nenhum.

1. Para cada arquivo, `POST /v2/files` com `--data-binary @arquivo` e o header
   `x-vercel-digest: <sha1 do arquivo>`.
2. Depois, `POST /v13/deployments` com a lista de todos os arquivos
   (`file`, `sha`, `size`), `target: production` e o `teamId` do time.

Duas coisas que mordem: **upload de arquivo de megabytes falha por timeout de
vez em quando** (deu 3 de 13 na primeira rodada), então repita com backoff e
confira o código 200 de cada um; e a lista do passo 2 tem que trazer **a árvore
inteira**, porque a publicação substitui tudo, não faz merge.
