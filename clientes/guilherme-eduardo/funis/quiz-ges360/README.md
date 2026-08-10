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

- **Quiz (link do anúncio):** https://diagnostico-ges360.vercel.app
  O anúncio deve apontar para a **raiz com UTMs**: `https://diagnostico-ges360.vercel.app/?utm_source=meta&utm_medium=cpc&utm_campaign=...`
  (nunca para `/index.html`, o servidor limpa a URL e derruba a query).
- **Página pós-quiz:** `/diagnostico.html` (gerada automaticamente, não é link de anúncio).
- **Projeto Vercel:** `diagnostico-ges360` no time **Simpleacc**.
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
| `logo.png` | Logo GES360 (extraído da apresentação comercial, fundo transparente) |
| `integracao-planilha.gs` | Apps Script que grava os leads na planilha |

## Pendências para ficar 100%

1. ✅ **WhatsApp de destino** configurado em `flow.js` (`marca.whatsapp = 554896784333`,
   informado pelo Daniel em 05/08) e no ar.
   ⚠️ **Conferir:** o número tem 8 dígitos depois do DDD (`9678-4333`). Celular/WhatsApp no
   Brasil normalmente tem 9 (`99678-4333` → `5548996784333`). Se for esse o caso, corrigir a
   constante e republicar.
2. **Integração da planilha.** Passo que só o dono da conta Google faz (2 min):
   abrir a planilha → Extensões → Apps Script → colar `integracao-planilha.gs` → Implantar como
   App da Web ("Qualquer pessoa") → copiar a URL `/exec` → colar em `app.js` na constante
   `LEADS_ENDPOINT` → republicar → enviar um lead de teste e conferir a linha na planilha.
3. **Depoimentos reais** no relatório (hoje os cases estão em texto, sem print/vídeo).
4. **Foto do Guilherme** no bloco "Quem é o Guilherme". O CSS `.autor-foto` já está pronto: basta
   colocar `guilherme.webp` na pasta e adicionar
   `<img class="autor-foto" src="guilherme.webp" alt="Guilherme Eduardo" />` dentro de `.autor`,
   em `diagnostico.js` (é assim no funil do Felipe).

## Como republicar

O deploy foi feito pelo MCP da Vercel no time Simpleacc, projeto `diagnostico-ges360`.
Pelo CLI: `vercel deploy <esta pasta> --prod --yes --scope <TEAM_ID da Simpleacc>`.
A URL de produção (`diagnostico-ges360.vercel.app`) é a pública; as URLs com sufixo do time
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
