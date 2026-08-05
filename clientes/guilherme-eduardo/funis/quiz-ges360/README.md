# Funil de Quiz · GES360 (Diagnóstico IDR)

Funil de Lead Dinâmico do Guilherme Eduardo (GES Consultoria Médica), gerado pela skill
`gerar-quiz-diag-pag-pos-quiz` a partir da **Estratégia Completa aprovada em 24/07/2026**
(`estrategia/2026-07-24-estrategia-completa-funil-quiz.md`), com a estrutura de **índice nomeado**
do quiz do Felipe Damasceno (lá o IDE, aqui o **IDR**).

## No ar

- **Quiz (link do anúncio):** https://diagnostico-ges360.vercel.app
  O anúncio deve apontar para a **raiz com UTMs**: `https://diagnostico-ges360.vercel.app/?utm_source=meta&utm_medium=cpc&utm_campaign=...`
  (nunca para `/index.html`, o servidor limpa a URL e derruba a query).
- **Página pós-quiz:** `/diagnostico.html` (gerada automaticamente, não é link de anúncio).
- **Projeto Vercel:** `diagnostico-ges360` no time **Simpleacc**.
- **Planilha de leads:** https://docs.google.com/spreadsheets/d/1S_ANYgaapyLVf7oQoGwNyxYkASRXlzHFs-QgfHGvt_Q/edit
  (Drive do cliente, pasta "3. Estratégia e Tráfego").

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
| `flow.js` | **Toda a copy do quiz** + WhatsApp da marca. É aqui que se edita texto. |
| `app.js` | Motor: render, auto-avanço, máscara, validação, UTMs, sessionStorage, `enviarLead()` |
| `diagnostico.html` / `diagnostico.js` | Página pós-quiz: calcula o IDR e monta o relatório personalizado |
| `styles.css` | Identidade GES360 (navy `#001824`, dourado `#B49024`, CTA verde `#249C3C`) |
| `logo.png` | Logo GES360 (extraído da apresentação comercial, fundo transparente) |
| `integracao-planilha.gs` | Apps Script que grava os leads na planilha |

## Pendências para ficar 100%

1. **WhatsApp de destino.** Hoje está com placeholder em `flow.js` (`marca.whatsapp`).
   Trocar por número real (só dígitos com país, ex.: `5548999112233`) e republicar.
2. **Integração da planilha.** Passo que só o dono da conta Google faz (2 min):
   abrir a planilha → Extensões → Apps Script → colar `integracao-planilha.gs` → Implantar como
   App da Web ("Qualquer pessoa") → copiar a URL `/exec` → colar em `app.js` na constante
   `LEADS_ENDPOINT` → republicar → enviar um lead de teste e conferir a linha na planilha.
3. **Depoimentos reais** no relatório (hoje os cases estão em texto, sem print/vídeo).

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
Validado em 24/07: 8 perguntas com auto-avanço, máscara de WhatsApp, e-mail obrigatório,
validação barrando campos vazios, e relatório com IDR calculado.
