# Quiz IMF · HODIE

Funil de quiz da **HODIE** (Dra. Lailla de Oliveira), cliente Fabrício.
Entrega a **leitura do Índice do Metabolismo da Fome (IMF)** e leva a paciente
para o WhatsApp do consultório, para agendar a consulta de investigação.

> ## 🚨 NÃO SUBIR TRÁFEGO AINDA
> Três bloqueios abertos:
> 1. **WhatsApp do consultório não configurado.** `flow.js` → `marca.whatsapp`
>    está vazio. Enquanto estiver, os CTAs avisam na tela em vez de abrir uma
>    conversa com um número errado.
> 2. **Integração com a planilha de leads** ainda não ligada (`LEADS_ENDPOINT`
>    em `app.js`). Sem ela, o lead responde e não é registrado em lugar nenhum.
> 3. **Aprovação da Dra. Lailla** em toda a copy, e consentimento assinado dos
>    dois casos clínicos usados no relatório. Ver `../../contexto/compliance-cfm.md`.

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

1. Criar a planilha na pasta do cliente no Drive.
2. Montar webhook + cenário no Make (webhook instant → Google Sheets `addRow`).
3. Colar a URL do webhook em `LEADS_ENDPOINT`, no topo do `app.js`.
4. Republicar e **testar de verdade**: enviar um lead e conferir a linha na
   planilha, com as UTMs. Validar lendo a planilha, nunca o status HTTP.
5. Apagar a linha de teste.

Atenção: o Make só estrutura o lead com `application/json` (já tratado em
`enviarLead`). Com `text/plain` ele responde "Accepted" e grava linha vazia, sem
erro nenhum na tela. E confira o cabeçalho da planilha contra o mapeamento antes
de ativar: o `addRow` grava por posição.

## Pendências do cliente

- [ ] WhatsApp oficial do consultório
- [ ] Logo em SVG ou PNG com fundo transparente (hoje o wordmark é feito em CSS)
- [ ] Foto da Dra. Lailla para o bloco de autoridade
- [ ] Confirmação do RQE, para poder publicar "Endocrinologia" (hoje o funil usa
      só "Médica · CRM-SP 239430")
- [ ] Consentimento assinado dos dois casos clínicos do relatório
- [ ] IDs de GA4 e Pixel da Meta, se quiserem tracking (`TRACKING_CONFIG` no `app.js`)
