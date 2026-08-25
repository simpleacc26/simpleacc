# Funil de Quiz · GES360 (Diagnóstico IDR)

Funil de Lead Dinâmico do Guilherme Eduardo (GES Consultoria Médica), gerado pela skill
`gerar-quiz-diag-pag-pos-quiz` a partir da **Estratégia Completa aprovada em 24/07/2026**
(`estrategia/2026-07-24-estrategia-completa-funil-quiz.md`), com a estrutura de **índice nomeado**
do quiz do Felipe Damasceno (lá o IDE, aqui o **IDR**).

Segue a **estrutura invisível do quiz de alta conversão da Pâmella Mello**, a mesma aplicada no
funil do Felipe (ver `clientes/felipe-damasceno/funis/diagnostico-executivo/`): uma pergunta por
tela sem título repetido, ordem SPIN com a qualificação no fim, tela de carregamento antes do
resultado e relatório com CTAs distribuídos. Identidade visual, copy e o IDR são 100% do Guilherme.

## No ar

- **Quiz (link do anúncio):** https://quiz-guilhermeeduardo.vercel.app
  O anúncio deve apontar para a **raiz com UTMs**: `https://quiz-guilhermeeduardo.vercel.app/?utm_source=meta&utm_medium=cpc&utm_campaign=...`
  (nunca para `/index.html`, o servidor limpa a URL e derruba a query).
- **Página pós-quiz:** `/diagnostico.html` (gerada automaticamente, não é link de anúncio).
- **Projeto Vercel:** `quiz-guilhermeeduardo` no time **Simpleacc**.
  O endereço antigo (`diagnostico-ges360.vercel.app`) agora só **redireciona** para cá,
  preservando as UTMs (ver `redirect-dominio-antigo/`). Ele chegou a servir uma cópia
  parada do funil, **sem o webhook**, e por isso engolia leads em silêncio. Não use em
  anúncio: use sempre o endereço oficial.
- **Planilha de leads:** https://docs.google.com/spreadsheets/d/1S_ANYgaapyLVf7oQoGwNyxYkASRXlzHFs-QgfHGvt_Q/edit
  (Drive do cliente, pasta "3. Estratégia e Tráfego").

## Estrutura do quiz (10 passos, ordem SPIN)

situação → cobrança → problema → **há quanto tempo** → implicação → o que já tentou → objetivo →
perfil → **faturamento** (qualificação de ICP) → **prontidão** (qualificação de intenção).

As duas últimas ficam no fim, como no quiz da Pâmella. `tempo` e `prontidao` **não entram no
cálculo do IDR**, só na leitura do relatório e na qualificação.

## Qualificação e CTA adaptado

`classificarLead()` (em `app.js`, mesma régua do relatório) roteia o lead em três faixas, e o
relatório troca o CTA final:

| Faixa | Quando | CTA final |
| --- | --- | --- |
| **fora** | faturamento até R$ 20 mil ou R$ 20 a 50 mil (fora do ICP) | "Falar com a equipe no WhatsApp", com o caminho enxuto de 45 dias |
| **nutrir** | é ICP, mas marcou "não é prioridade" ou "só pesquisando" | "Quero entender melhor como funciona" |
| **qualificado** | é ICP e está pronto | "Quero agendar meu diagnóstico estratégico" |

A classificação também vai para a planilha, para o comercial priorizar a fila.

## O que é o IDR

**Índice de Dependência de Receita** (0 a 100): mede o quanto o faturamento da clínica depende da
consulta avulsa e da presença do médico. É o entregável do diagnóstico e o gancho da abordagem
comercial (o lead chega na conversa já sabendo o próprio número).

Cálculo: média ponderada dos pesos (`score`) de cada resposta, com pesos por pergunta em
`PESOS` (cobrança pesa 3, problema 2.5, implicação e faturamento 1.5, situação e tentativas 1,
objetivo 0.5). Faixas: 78+ crítica · 60 a 77 alta · 40 a 59 moderada · abaixo de 40 em transição.

> ⚠️ O cálculo existe em **dois lugares** (`app.js` no envio do lead e `diagnostico.js` no
> relatório). Se mudar peso ou score, altere nos dois.

## Arquivos

| Arquivo | O que é |
| --- | --- |
| `index.html` | Quiz (1ª pergunta já na 1ª tela) |
| `flow.js` | **Toda a copy do quiz** + `config` + WhatsApp da marca. É aqui que se edita texto. |
| `app.js` | Motor: render, auto-avanço, máscara, validação, tela de carregamento, UTMs, sessionStorage, `classificarLead()`, `enviarLead()` |
| `diagnostico.html` / `diagnostico.js` | Página pós-quiz: calcula o IDR e monta o relatório personalizado com os 3 CTAs |
| `styles.css` | Identidade GES360 (navy `#001824`, dourado `#B49024`, CTA verde `#249C3C`) |
| `logo.webp` | Logo GES360 oficial, enviada pelo cliente em 11/08 (520x137, fundo transparente). Substituiu o recorte de baixa qualidade que tinha sido extraído da apresentação comercial. |
| `favicon.png` | Ícone da aba: o **G** da logo, recortado do arquivo oficial, sobre o navy da marca (180x180) |

## Pendências para ficar 100%

1. ✅ **WhatsApp de destino confirmado e no ar:** `+55 48 99678-4333`, em `flow.js`
   (`marca.whatsapp = 5548996784333`). O primeiro número informado tinha 8 dígitos depois do
   DDD; o Daniel confirmou em 11/08 que o certo é com 9.
2. ✅ **Integração da planilha pronta e testada, via Make.** O lead vai para o webhook
   `https://hook.us2.make.com/r18d4hny5o7c7hce9cfcn09fhyja8d6c` (`LEADS_ENDPOINT` em `app.js`),
   e o cenário **"[Guilherme Eduardo] Diagnóstico IDR (GES360) → Sheets"** (time Simple Acc,
   ID 5924272) grava as 26 colunas na planilha. Testado ponta a ponta.
3. ✅ **Depoimentos reais no ar**: 4 prints do Dr. Kayo em ordem narrativa mais 1 citação que
   varia com o objetivo do lead (ver `depoimentos/README.md`).
   ⚠️ Dos 8 aprovados, **só 4 estão publicados**, e 2 deles em versão recomprimida (400 px),
   porque o deploy pelo MCP da Vercel embute os arquivos na chamada e imagem grande não passa.
   Ligando o projeto ao repositório, entram os 8 em qualidade cheia.
4. **Foto do Guilherme** no bloco "Quem é o Guilherme". O CSS `.autor-foto` já está pronto: basta
   colocar `guilherme.webp` na pasta e adicionar
   `<img class="autor-foto" src="guilherme.webp" alt="Guilherme Eduardo" />` dentro de `.autor`,
   em `diagnostico.js` (é assim no funil do Felipe).

## Como republicar

O deploy foi feito pelo MCP da Vercel no time Simpleacc, projeto `quiz-guilhermeeduardo`.
Pelo CLI: `vercel deploy <esta pasta> --prod --yes --scope <TEAM_ID da Simpleacc>`.
A URL de produção (`quiz-guilhermeeduardo.vercel.app`) é a pública; as URLs com sufixo do time
ficam atrás do Deployment Protection (302 para login).

## Teste local

```bash
python3 -m http.server 8899   # dentro desta pasta
# abrir http://127.0.0.1:8899/?utm_source=teste
```
Validado em 05/08 (Playwright + Chromium headless): 10 perguntas com auto-avanço e **sem título
repetido**, máscara de WhatsApp, validação barrando campos vazios, **tela de carregamento** com as
3 mensagens girando, relatório com IDR calculado, **3 CTAs de WhatsApp** e o CTA final trocando
certo nos 3 caminhos (fora / nutrir / qualificado).

> ⚠️ O Chromium deste container não tem saída para a internet, então o teste roda contra o
> servidor local. Depois de publicar, confira que os arquivos no ar batem com os do repo
> (`curl` + `cmp`), que é o que garante o mesmo comportamento em produção.

## ⚠️ Como está publicado hoje (arranjo temporário)

O deploy pelo MCP da Vercel embute os arquivos na chamada e **substitui o snapshot
inteiro**. O funil completo não cabe numa chamada só, então ele foi quebrado em
projetos separados na Vercel. **Isto é gambiarra e precisa ser desfeito.**

| Projeto Vercel | O que serve |
| --- | --- |
| `quiz-guilhermeeduardo` | `index.html`, `diagnostico.html`, `flow.js`, `app.js` (o link público) |
| `ges360-cdn` | `styles.css` |
| `ges360-relatorio` | `diagnostico.js`, `kayo-4767.webp`, `kayo-4763.webp` |
| `ges360-assets` | `kayo-4756.webp`, `kayo-4750.webp` |
| **jsDelivr** (não é Vercel) | `logo.webp` e `favicon.png`, direto deste repositório |

Por isso os HTMLs publicados apontam para URLs absolutas, enquanto **os arquivos
deste repositório usam caminhos relativos e são autocontidos** (a versão certa).

### ⚠️ O logo vem do repositório, via jsDelivr

O logo é servido por
`https://cdn.jsdelivr.net/gh/simpleacc26/simpleacc@<commit>/clientes/guilherme-eduardo/funis/quiz-ges360/logo.webp`,
com o **commit fixado** (imutável, nunca quebra por mudança de branch).

Isso existe porque arquivo binário passa pelo MCP em base64 e um único caractere
trocado no caminho corrompe a imagem, o que aconteceu de fato aqui. Servir do
repositório tira o binário da jogada.

**A dependência a conhecer:** isso só funciona porque `simpleacc26/simpleacc` é um
repositório **público**. Se ele virar privado, o logo some da página. Duas coisas
a fazer com essa informação:

1. Se o repo for fechado, ligar o projeto ao Git na Vercel **antes** (resolve tudo);
2. vale revisar se este monorepo deve mesmo ser público: ele tem estratégia,
   precificação e material de clientes.

Ao trocar o `logo.webp` ou o `favicon.png`, é preciso **atualizar o commit fixado na
URL** e republicar os dois HTMLs, senão a página continua mostrando a versão antiga.

### Como desfazer (2 minutos, resolve de vez)

Na Vercel, projeto `quiz-guilhermeeduardo` → Settings → Git → conectar em
`simpleacc26/simpleacc`, root `clientes/guilherme-eduardo/funis/quiz-ges360`.
A partir daí:

- todo push publica sozinho, sem passar por chamada de ferramenta;
- os **8 prints** entram, não só 4, e em qualidade cheia (hoje 2 estão recomprimidos);
- o logo volta a ser servido pelo próprio projeto, sem depender do jsDelivr nem
  de o repositório ser público;
- os 3 projetos extras podem ser apagados.

Enquanto isso não acontece, quem editar este funil precisa republicar **cada
projeto separadamente**, respeitando a tabela acima.
