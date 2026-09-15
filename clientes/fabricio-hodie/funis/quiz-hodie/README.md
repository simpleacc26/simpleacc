# Quiz IMF · HODIE

Funil de quiz da **HODIE** (Dra. Lailla de Oliveira), cliente Fabrício.
Entrega a **leitura do Índice do Metabolismo da Fome (IMF)** e leva a paciente
para o WhatsApp do consultório, para agendar a consulta de investigação.

**No ar:** https://quiz-hodie-simpleacc.vercel.app
(Vercel, time Simpleacc, projeto `quiz-hodie`, target production)

**Planilha de leads:** [Leads · Índice do Metabolismo da Fome · HODIE](https://docs.google.com/spreadsheets/d/1S8c-A31ackttwLUqr2ciij6Ao4e3ZvQCXuFsbXc1hfY/edit)

**Captação de leads:** ligada e testada. Webhook do Make ativo, cenário
`[HODIE] Quiz IMF → Sheets` rodando, lead caindo na planilha com as UTMs.

> ## 🚨 Antes de subir tráfego
> 1. **Aprovação da Dra. Lailla** em toda a copy, e consentimento assinado dos
>    dois casos clínicos usados no relatório. Ver `../../contexto/compliance-cfm.md`.
> 2. **CTA sem destino.** Por decisão do Daniel, o WhatsApp do consultório não
>    foi configurado (`flow.js` → `marca.whatsapp` vazio). O funil captura o lead
>    normalmente, mas quem clica no CTA vê o aviso de canal em configuração em
>    vez de abrir uma conversa. O atendimento acontece pela planilha, com a
>    equipe puxando o lead. Se um dia quiserem o CTA ativo, basta preencher o
>    número e republicar.

## O que é

| Página | Arquivo | O que faz |
| --- | --- | --- |
| Quiz | `index.html` | 9 perguntas, uma por tela, auto-avanço, depois a captura |
| Relatório | `diagnostico.html` | A leitura personalizada e os CTAs |

Stack: HTML, CSS e JS puros. Zero dependência, zero build, zero Google Fonts.

| Arquivo | Papel |
| --- | --- |
| `flow.js` | **Toda a copy do quiz.** É o arquivo que mais muda |
| `indice.js` | Cálculo do IMF e qualificação em 3 faixas, usado pelas duas páginas |
| `app.js` | Motor do quiz: render, validação, máscara, UTMs, loading, envio do lead |
| `diagnostico.js` | Monta o relatório de 9 blocos e trata os CTAs |
| `styles.css` | Identidade HODIE, tokenizada no `:root` |
| `favicon.svg` | Monograma H com o acento tipográfico da marca |
| `integracao-planilha.gs` | Script de apoio para a planilha de leads |

## O índice (IMF)

`Índice% = soma dos pesos das respostas de diagnóstico / soma dos máximos`

Pontuam só as perguntas de diagnóstico (situação, problema, implicação, o que já
tentou, perfil). Tempo, objetivo e as duas porteiras **não** pontuam, por desenho.

| Faixa | Corte | Rótulo |
| --- | --- | --- |
| Alto | 66% ou mais | Sinais fortes |
| Médio | 33% a 65% | Sinais moderados |
| Baixo | abaixo de 33% | Sinais leves |

O peso mede **quanto a resposta sinaliza desregulação do metabolismo da fome**,
não a gravidade do caso. Respostas de impacto emocional (se esconder em foto) ou
neutras (nunca usou medicação) têm peso 0 de propósito: elas não dizem nada sobre
a fome. Sem isso o índice marcava quase sempre 100% e perdia o sentido.

O IMF **não é diagnóstico** e as duas páginas dizem isso explicitamente.

## Qualificação em 3 faixas

Lida das flags das opções escolhidas nas duas porteiras (quem manda é o
`flow.js`, não o código). Nenhum lead vê porta na cara.

| Faixa | Quem cai aqui | CTA |
| --- | --- | --- |
| `qualificado` | Investe em saúde e tem prontidão | "Quero agendar a minha consulta de investigação" |
| `nutrir` | Convênio, ou "ainda não é prioridade" / "só pesquisando" | "Quero entender melhor como funciona" |
| `fora` | Rede pública, ou não está cuidando disso agora | "Falar com a equipe no WhatsApp" |

## Rodar local

```bash
cd clientes/fabricio-hodie/funis/quiz-hodie
python3 -m http.server 8099
# abre http://127.0.0.1:8099
```

## Publicar

Deploy na conta/time **da Simple** na Vercel, nunca em conta pessoal, publicando
**apenas esta subpasta**. Nome do projeto define a URL e não dá para renomear
depois. Depois de todo deploy, confira cada arquivo com `curl`, porque a
publicação substitui a árvore inteira e arquivo faltante vira 404 silencioso.

```bash
for f in index.html diagnostico.html styles.css app.js flow.js indice.js diagnostico.js favicon.svg; do
  echo "$f $(curl -s -o /dev/null -w '%{http_code}' "$BASE/$f")"
done
```

O anúncio aponta para a **raiz com query** (`/?utm_source=...`), nunca para
`/index.html`, senão as UTMs se perdem.

## Ligar a planilha de leads

Está tudo ligado e testado:

- [x] Planilha criada na pasta do cliente no Drive, com as 23 colunas na ordem
      do payload (link acima)
- [x] Webhook no Make, time Simple Acc:
      `https://hook.us2.make.com/vuvci258shxi12m92b40q9ycmkeb6w9i`
      (nome: `[HODIE] Quiz IMF → Sheets`, id 2818523)
- [x] Cenário `[HODIE] Quiz IMF → Sheets` (id 6288590) ativo, webhook → `addRow`
- [x] `LEADS_ENDPOINT` preenchido no `app.js` e publicado
- [x] Testado ponta a ponta, validando **lendo a planilha**: o payload gerado
      pelo funil real caiu com as 9 respostas, o IMF, a qualificação e as 4 UTMs
      nas colunas certas. Linhas de teste apagadas depois.

Como o cenário está montado (`gateway:CustomWebHook` → `google-sheets:addRow`,
conexão Google id 5139463):

| Campo | Valor |
| --- | --- |
| Spreadsheet | `1S8c-A31ackttwLUqr2ciij6Ao4e3ZvQCXuFsbXc1hfY` |
| Sheet | **`Untitled`** |
| Table contains headers | sim |

⚠️ A aba chama **`Untitled`**, não "Página1". Planilha criada a partir de CSV
nasce assim, e já foi confirmado via RPC `google-sheets@2/rpcSheet`.

Mapeamento coluna a coluna (o `addRow` grava por posição, então a ordem importa):

| Col | Cabeçalho | Campo |
| --- | --- | --- |
| A | Data e hora | `meta.timestamp` |
| B | Nome | `name` |
| C | WhatsApp | `whatsapp` |
| D | E-mail | `email` |
| E | Qualificação | `qualificacao` |
| F | IMF % | `indice_pct` |
| G | Faixa IMF | `indice_faixa` |
| H a P | Q1 a Q9 | `answers.q1` a `answers.q9` |
| Q a U | UTMs | `utms.utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term` |
| V | Página | `meta.page_url` |
| W | Referrer | `meta.referrer` |

Atenção para quem for mexer nisso: o Make só estrutura o lead com `application/json` (já tratado em
`enviarLead`). Com `text/plain` ele responde "Accepted" e grava linha vazia, sem
erro nenhum na tela. E confira o cabeçalho da planilha contra o mapeamento antes
de ativar: o `addRow` grava por posição.

## Pendências do cliente

- [ ] WhatsApp oficial do consultório (dispensado pelo Daniel por ora, ver topo)
- [ ] Logo em SVG ou PNG com fundo transparente (hoje o wordmark é feito em CSS)
- [ ] Foto da Dra. Lailla para o bloco de autoridade
- [ ] Confirmação do RQE, para poder publicar "Endocrinologia" (hoje o funil usa
      só "Médica · CRM-SP 239430")
- [ ] Consentimento assinado dos dois casos clínicos do relatório
- [ ] IDs de GA4 e Pixel da Meta, se quiserem tracking (`TRACKING_CONFIG` no `app.js`)
