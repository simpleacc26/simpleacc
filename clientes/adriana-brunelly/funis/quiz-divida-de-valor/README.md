# Quiz · Diagnóstico da Dívida de Valor

Funil de quiz da **Adriana Brune'lly** (mercado de eventos, Londrina/PR). Leva o
lead do anúncio até a sessão de diagnóstico, calculando **quanto ele deixa na
mesa por ano** a partir das próprias respostas.

HTML, CSS e JavaScript puros. Sem build, sem framework, sem dependência externa
(nem fonte remota). Sobe em qualquer servidor estático.

## De onde vem cada coisa

| Camada | Fonte |
| ------ | ----- |
| Método e arquitetura | Apostila **Funil de Lead Dinâmico** (Daniel Souza · Simple), no Drive |
| Copy do quiz e do diagnóstico | `estrategia/2026-09-11-estrategia-completa-funil-quiz.html` (páginas 4 a 11) |
| Narrativa, inimigo e régua de linguagem | `../../CLAUDE.md` |
| Identidade visual | Preto, dourado e cristal, definida em 21/09/2026 |

## A arquitetura, na ordem da apostila

1. **Captura primeiro** (Procedimento 8). Nome, WhatsApp, e-mail e cidade antes
   da primeira pergunta, e daí direto para a P1, sem tela de intro. Tendo o
   contato, o comercial trabalha o lead mesmo se ele não terminar o quiz.
2. **Quiz do tipo Killer** (Procedimento 4). Promete a causa ("onde o seu
   dinheiro está saindo"), não a solução. É o tipo certo para público frio que
   já tentou curso técnico e planilha e continuou sem margem.
3. **10 perguntas em camadas** (Procedimento 7), com a qualificação financeira
   por último. As perguntas de ticket e de faturamento têm **7 faixas** de
   propósito: quem marca a menor descobre, na mesma tela, que a maior é ocupada
   por gente do mesmo mercado.
4. **3 interseções de implicação** entre as perguntas, depois da P3, da P6 e da
   P8. Todas ancoradas em fato verificável da Adriana ou em aritmética pura.
5. **4 buckets** com página de resultado própria (Procedimentos 5 e 6), mais a
   rota de desqualificado que sai da pergunta porteira.
6. **Roteamento pós-quiz**: qualificado vai para a agenda, a nutrir vai para o
   WhatsApp, fora da faixa recebe a leitura completa e a oferta de entrada.

## Os 4 buckets

| Bucket | Onde a perda acontece | O que ainda não aconteceu |
| ------ | --------------------- | ------------------------- |
| A Agenda Cheia | no volume | escolher para quem vende |
| O Extra Invisível | na entrega | colocar o escopo no papel |
| O Desconto Automático | no fechamento | aprender a conduzir o fechamento |
| O Orçamento que Some | antes do preço | construir valor antes do número |

A ordem da tabela é a **hierarquia de desempate**: em empate de pontos, o lead
sobe para o bucket de maior perda, nunca desce (regra da apostila).

## A conta da Dívida de Valor

```
base       = min(ticket médio × eventos por mês, teto da faixa de faturamento)
desconto   = base × percentual de desconto (P5)
extras     = base × percentual absorvido (P6)
dívida/mês = desconto + extras
```

Duas travas de credibilidade:

- **Teto pelo faturamento declarado.** Se ticket vezes volume der mais que a
  faixa que a pessoa marcou na P10, vale a faixa. Número que a pessoa não
  reconhece derruba a página inteira.
- **Piso de R$ 500.** Abaixo disso a página troca o bloco do número por uma
  leitura sem número ("a sua perda está antes, no orçamento que some"), em vez
  de mostrar R$ 0 ou inventar estimativa.

## Arquivos

| Arquivo | O que é |
| ------- | ------- |
| `index.html` | captura + quiz |
| `diagnostico.html` | página de resultado, com o CSS próprio do relatório |
| `flow.js` | **toda a copy**: hero, captura, 10 perguntas, interseções, buckets, oferta de entrada |
| `calculo.js` | motor compartilhado: conta, bucket e classificação do lead |
| `app.js` | motor do quiz: telas, validação, persistência, tracking, envio do lead |
| `diagnostico.js` | monta o relatório por bucket e roteia os CTAs |
| `styles.css` | sistema visual preto, dourado e cristal |
| `favicon.svg` | monograma A em ouro sobre preto |

Para mudar texto, mexa **só no `flow.js`**. Para mudar cor, só no `:root` do
`styles.css`.

## Rodar local

```bash
cd clientes/adriana-brunelly/funis/quiz-divida-de-valor
npx http-server -p 5173 -c-1
# abre http://localhost:5173
```

Abrir o `index.html` direto pelo arquivo também funciona.

## Antes de publicar (pendências bloqueantes)

- [ ] **WhatsApp da Adriana** em `flow.js` (`marca.whatsapp`, formato
      `5543998808803`). Sem isso os CTAs não abrem nada.
- [ ] **`LEADS_ENDPOINT`** em `app.js`: webhook do Make que grava na planilha de
      leads no Drive dela. Sem isso nenhum lead é registrado.
- [ ] **Link de agendamento** em `flow.js` (`config.agendamentoUrl`). Enquanto
      vazio, o lead qualificado cai no WhatsApp.
- [ ] **Logo** no lugar do monograma, nas duas páginas, quando ela enviar.
- [ ] **Depoimentos** reais em `flow.js` (`depoimentos: []`). Enquanto o array
      estiver vazio a galeria não aparece, e é assim que tem que ser: nunca
      publicar com depoimento inventado. Ver o guia de captação em
      `../../estrategia/`.
- [ ] **VSL** em `flow.js` (`vsl.ativo` e `vsl.embed`) quando o vídeo existir.
- [ ] Confirmar a **conta que recebe o checkout** do WhatsApp de Valor antes de
      mandar tráfego (as contas dela estão no nome da irmã).

## Deploy

Vercel, publicando **só esta subpasta**, sem build (projeto estático).
No painel: `Root Directory` = `clientes/adriana-brunelly/funis/quiz-divida-de-valor`,
`Framework Preset` = Other, `Build Command` vazio, `Output Directory` vazio.

O time tem *Vercel Authentication* ligada por padrão, então a URL nasce fechada.
Desligar só depois de conferir o conteúdo no ar.

## Contatos

| Papel | Quem |
| ----- | ---- |
| Cliente | Adriana Brunelly · `diretodaproprietaria@gmail.com` · (43) 9 9880-8803 |
| Condução do projeto | Renan Martini |
| Responsável SimpleAcc | Daniel Souza |
