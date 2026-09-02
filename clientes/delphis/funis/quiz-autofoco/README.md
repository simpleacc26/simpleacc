# Diagnóstico AUTOFOCO · funil de quiz do Delphis Fonseca

Quiz de 10 perguntas + página de diagnóstico personalizada, na identidade da marca
dele (preto e dourado, extraída de `metodoautofoco.com.br`).

- **No ar:** https://diagnostico-autofoco-simpleacc.vercel.app
- **Planilha de leads:** [Leads · Diagnóstico AUTOFOCO](https://docs.google.com/spreadsheets/d/1I5dn9kDWkCBteLKKaO3-V5y7va2pyZJGGp_KwLPk3H8/edit) (pasta `3. Estratégia e Tráfego` no Drive do cliente)
- **Vercel:** time Simpleacc · projeto `diagnostico-autofoco`
- **Copy aprovada:** `../../estrategia/2026-08-28-estrategia-completa-delphis.html` (seções 2 e 3)

## Como o anúncio deve apontar

Sempre para a **raiz com os parâmetros**, nunca para `/index.html`:

```
https://diagnostico-autofoco-simpleacc.vercel.app/?utm_source=meta&utm_medium=cpc&utm_campaign=diagnostico-autofoco&utm_content=angulo-1-cena
```

As UTMs são capturadas no carregamento e vão junto com o lead para a planilha.

## Arquivos

| Arquivo | O que é |
| ------- | ------- |
| `index.html` | O quiz. A primeira pergunta já aparece na primeira tela. |
| `flow.js` | **Toda a copy do quiz.** Perguntas, opções, hero, captura e o WhatsApp da marca. É aqui que se edita texto. |
| `app.js` | Motor: render, auto-avanço, máscara de WhatsApp, validação, UTMs, sessionStorage, classificação do lead e envio para a planilha. |
| `diagnostico.html` / `diagnostico.js` | Página pós-quiz: leitura personalizada por padrão, botão Baixar PDF e botão WhatsApp. |
| `styles.css` | Tema da marca. A paleta está no bloco `:root`. |
| `integracao-planilha.gs` | Apps Script que grava os leads na planilha. |
| `vercel.json` | `cleanUrls` ligado (a URL fica sem `.html`). |

## Como o lead é classificado

O cruzamento acontece no `app.js` e vai gravado na planilha, na coluna **Classificação**:

- **QUALIFICADO** · P2 (momento profissional) em empresário, executivo ou profissional liberal **e** P10 (prontidão) em "estou pronto" ou "quero entender como funciona". Vai para a fila de sessão estratégica.
- **A NUTRIR** · P10 em "não é o meu momento". Fica na base de conteúdo.
- **FORA POR ORA** · P10 em "só quero o diagnóstico", ou perfil em construção de carreira. Recebe a oferta do Detonando a Timidez no fim da página.

A coluna **Padrão** vem da P3 e define a leitura que a pessoa recebe: O Invisível,
O Travado, O Personagem ou O Correto. É também o gancho da primeira mensagem no WhatsApp.

## O que falta para a integração ficar completa

O `LEADS_ENDPOINT` no `app.js` está vazio. Para ligar (2 minutos, uma vez só):

1. Abrir a planilha de leads → **Extensões → Apps Script**
2. Colar todo o conteúdo de `integracao-planilha.gs` e salvar
3. **Implantar → Nova implantação → App da Web**, executar como "Eu", acesso "Qualquer pessoa"
4. Autorizar e copiar a URL que termina em `/exec`
5. Mandar a URL para a Simple: colamos em `LEADS_ENDPOINT`, republicamos e testamos com um lead real

Enquanto isso não acontece, o quiz funciona normal e entrega o diagnóstico; o lead
só não cai na planilha sozinho.

## Pendências do cliente

- **Logo em PNG ou SVG com fundo transparente.** Hoje o topo usa um wordmark provisório em HTML (a palavra AutoFoco com o alvo no lugar do "o"), fiel ao logo atual dele, que só existe em JPG com marca d'água e reflexo.
- **Número de WhatsApp comercial.** Está apontando para `5511944659466`, o número que ele publica no próprio site. Quando existir um número dedicado ao comercial, trocar em `flow.js`.
- **Depoimentos.** A página tem dois espaços `[DEPOIMENTO]` reservados. Só entram com autorização escrita de nome e imagem.
- **VSL de 5 minutos.** Prevista na estratégia para o topo da página de diagnóstico. Não bloqueia a subida do funil, entra depois.

## Republicar

O deploy foi manual, pelo MCP da Vercel, no time Simpleacc. Ao editar qualquer
arquivo, republique o projeto `diagnostico-autofoco` (target production) e confira
a URL com `curl -s -o /dev/null -w "%{http_code}"`.

A proteção de deploy (Vercel Authentication) foi **desligada** neste projeto, senão
a URL pedia login e o lead não entrava.
