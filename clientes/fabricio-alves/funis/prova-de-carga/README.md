# Prova de Carga · Fabrício Alves

Funil de medição estrutural da oferta. Não vende nada: **mede e roteia**.
Entrega o eixo do Scorecard DOC que cede primeiro (Desejo, Oferta ou Caminho), o
Índice de Sustentação e a conta em reais do vazamento, e manda o lead para a rota
que couber.

**No ar:** _(preencher depois do deploy)_

> 🚨 **A palavra "quiz" não aparece em nenhuma superfície pública.** Na página,
> no anúncio e na conversa diz-se **medição**. Regra do cliente.

## A geometria

```
Anúncio no Meta
   ↓
index.html          captura + 10 perguntas + 3 telas de implicação + carregamento
   ↓
   ├── leitura.html        rota A (aplicação) e rota B (Exame), por eixo
   │      ├── Aplicar ao Comando  → aplicacao.html
   │      └── Pedir o Exame       → WhatsApp
   └── fora-de-fase.html   rota 0, sem oferta e sem cadência comercial
```

Três frases resumem o desenho, e elas são do cliente: **o quiz não vende, mede e
roteia. O Exame é a única porta paga, e vale por si. A Conversa de Veredito é o
único lugar onde o preço aparece.**

## Arquivos

| Arquivo | Papel |
| --- | --- |
| `flow.js` | **Toda a copy pública.** Perguntas, telas de implicação, os três eixos, o índice, os dialetos, os casos |
| `motor.js` | A leitura: eixo, índice, dialeto, rota e a conta do vazamento. Compartilhado pelas duas páginas |
| `app.js` | Motor do quiz: render, auto-avanço, máscara, UTMs, carregamento, envio do lead |
| `leitura.js` | Monta a página de leitura em onze blocos |
| `index.html` · `leitura.html` · `aplicacao.html` · `fora-de-fase.html` | As quatro telas |
| `styles.css` | Identidade visual do Fabrício, tokenizada no `:root` |
| `fonts/` | Cormorant Garamond e IBM Plex Sans servidas do projeto |
| `img/` | As três gravuras, recortadas com alfa |

Stack: HTML, CSS e JS puros. Zero dependência, zero build, **zero requisição
externa** (nem Google Fonts, nem CDN).

> `motor.js` existe separado de propósito. No funil anterior da casa, `app.js` e
> `diagnostico.js` declararam `const F` no mesmo escopo global e a página de
> resultado quebrou calada. Toda lógica que as duas páginas precisam mora ali.

## Os três baldes (método ASK)

O **eixo** decide QUAL leitura o lead recebe; o **Índice de Sustentação** decide
QUÃO intensa; o **dialeto** decide o vocabulário. Eixos independentes.

| Eixo | Selo | Causa-raiz que a página nomeia | Reflexo que não resolve |
| --- | --- | --- | --- |
| **Desejo** | A promessa entre iguais | A promessa deixou de se distinguir das vizinhas | Trocar criativo de novo |
| **Oferta** | O sim que ficou caro | O acordo não sustenta a decisão sozinho | Baixar preço, empilhar bônus |
| **Caminho** | O percurso que vaza | A decisão nasce pronta e se perde até o pagamento | Comprar mais tráfego, trocar ferramenta |
| **Fora de fase** | — | Não há erosão a medir: a estrutura ainda não recebeu carga | Nenhum |

Pontuação: soma das perguntas 6, 7 e 8. Empate sobe para o eixo mais **a
montante** (Desejo antes de Oferta, Oferta antes de Caminho), porque causa vem
antes de sintoma. Diferença de um ponto entre os dois maiores, e o segundo com
pelo menos um ponto: a página ganha um parágrafo de "segundo eixo em observação",
nunca dois diagnósticos.

Varredura das 64 combinações de P6 x P7 x P8: Desejo 19, Oferta 24, Caminho 21.
Nenhum eixo órfão.

Para trocar o eixo de balde, mexa só nos campos `eixo` das opções em `flow.js`.

## O Índice de Sustentação

Resolve um `[aberto]` do cliente: índice em três graus, **em linguagem de carga,
nunca de nota**. Não aparece percentual na tela, e nunca vai aparecer: nota
humilha, e o instrumento de 21 critérios é pago.

| Grau | Quando | Nas 64 combinações |
| --- | --- | --- |
| Sustentação em observação | Total de sinal até 5 | 20 |
| Sustentação média | O meio | 17 |
| Sustentação baixa | Total 8 ou mais, ou 7 com sinal nos três eixos | 27 |

Os cortes foram calibrados varrendo as 64 combinações. **Sem isso o índice
marcava "baixa" em dois terços dos casos** e parava de significar alguma coisa,
que é exatamente o que aconteceu no primeiro índice da casa.

## A conta do vazamento

```
Vazamento mensal = custo por venda × (Δ ÷ (1 + Δ)) × vendas do mês
```

Onde Δ é a alta percentual do custo por venda. **Conservadora usa o piso de cada
faixa; realista usa o ponto médio.** Arredondado para centenas.

Confere com o exemplo do próprio cliente: custo de R$2.000 a R$8.000, alta de 20%
a 50%, 10 a 30 vendas → **R$3.300 e R$25.900**. Bate.

Três regras do cliente, não negociáveis: a conta é feita **por delta**, com os
números dele, nunca por estimativa de fora. Sai em **faixa**, nunca em número
mágico. E **nunca se apresenta como auditoria**.

Se qualquer das três perguntas numéricas vier como "não meço" ou "não sei", a
conta não roda e a página diz isso, com a fórmula para ele fazer em casa. Isso
também é um resultado.

> ⚠️ **Uma decisão a confirmar com o Fabrício.** O documento dele diz que faixas
> abertas **para cima** ("Acima de R$8.000") usam o piso nas duas contas. Ele não
> cobre as faixas abertas **para baixo** ("Até R$500", "Até 10", "Até 20%"), onde
> o piso literal é zero e a conta perde o sentido. Aqui elas usam **metade do
> teto como piso** e o ponto médio dessa metade como realista. Está tudo em
> `flow.js`, no campo `conta` de cada opção, e muda em uma linha.

Quando as três faixas marcadas são abertas para cima, o piso e o ponto médio
coincidem: a página então mostra um número único e diz que é o piso, em vez de
"R$X a R$X", que pareceria defeito. Acontece em 1 das 64 combinações.

## Identidade visual

A referência é **prancha de tratado**, não página de produto. Gravura clássica
sobre pergaminho, preto profundo, carmim sempre mínimo, muito espaço negativo.

| Token | Hex |
| --- | --- |
| Pergaminho | `#EDE8DC` |
| Preto profundo | `#0D0D0D` |
| Carmim | `#A61C1C` |

Tipografia: **Cormorant Garamond** (títulos) e **IBM Plex Sans** (texto), servidas
de `fonts/`. Contraste conferido: preto sobre pergaminho 15,8:1, carmim sobre
pergaminho 6,2:1. As duas passam em AA.

### A linha de diagnóstico

O visual hammer da marca (o falcão em stoop com o ponto de falha marcado)
reduzido a duas primitivas: **um fio fino que termina num ponto carmim**. Está
reproduzido em CSS puro e aparece como barra de progresso (o ponto caminha), como
divisor de bloco e no fim de cada régua. É o que amarra a identidade sem depender
de imagem.

### As gravuras

As três peças vieram da image-bible com fundo de pergaminho vinhetado, que não
casa com nenhum fundo chapado. Foram **recortadas com alfa** por diferença de
luminância contra o papel local (blur gaussiano como estimativa de papel), o que
preserva as hachuras finas e o carmim das jesses.

| Arquivo | Onde | Regra do cliente |
| --- | --- | --- |
| `falcao-punho.webp` | Topo do quiz e da aplicação | Marca pública |
| `capuz-selo.webp` | Bloco de autoridade e rodapé | Selo, carimbo de autoridade |
| `mergulho-stoop.webp` | Ornamento da dobra 4 da aplicação | Conceito. **Uso explicativo é privado**: proposta, diagnóstico, deck |
| `mergulho-stoop-claro.webp` | Bloco de veredito da leitura | A mesma peça, para fundo de tinta |

O stoop não entra em anúncio. Regra do cliente: se a legenda explica **como** o
corte é feito, fica privada; se apenas nomeia que o corte existe, é feed.

Para refazer o recorte a partir dos PNG originais, o procedimento está em
`../../../../docs/` nenhum lugar ainda: está no histórico desta branch, no script
que gerou os `.webp`. Resumo: redimensiona, `L = grayscale`, `papel =
GaussianBlur(L, raio = largura/14)`, `alfa = clip((papel - L) / 105, 0, 1)`, zera
alfa abaixo de 0,09 e num anel de 2,2% da borda (senão a vinheta vira um fantasma
retangular).

## O que foi testado

- **Lógica, as 64 combinações de eixo:** os três eixos alcançáveis, nenhum órfão.
- **A conta, as 64 combinações numéricas:** nenhuma incoerência, conservadora
  nunca maior que a realista, e o exemplo do cliente bate no centavo arredondado.
- **Tabela de rotas:** 11 casos da tabela 3.5 do documento de arquitetura,
  zero divergência.
- **Quatro percursos completos no navegador:** Desejo/aplicação, Oferta/Exame com
  "não meço", Caminho/aplicação, e as duas portas de "fora de fase" (faturamento
  e falta de tráfego). Zero erro de console em todos.
- **Responsivo de 320 a 1280:** nenhum transbordo horizontal em nenhuma página.
- **Regras de linguagem:** zero travessão, zero emoji, a palavra "quiz" ausente,
  nenhum preço fora da primeira pergunta do formulário de aplicação.
- **Celular:** nenhuma opção aparece pré-selecionada ao carregar a tela.

## Pendências antes de subir tráfego

- [ ] **WhatsApp do Fabrício.** `flow.js` → `marca.whatsapp`. Enquanto vazio, o
      botão da rota B mostra um aviso em vez de abrir conversa. O lead continua
      sendo capturado.
- [ ] **Instagram.** `flow.js` → `marca.instagram`. É o único destino da Página 0.
- [ ] **Webhook do Make** em `app.js` → `LEADS_ENDPOINT`, e a planilha de leads no
      Drive dele. Enquanto vazio, **nenhum lead é gravado**.
- [ ] **Webhook das aplicações** em `aplicacao.html` → `APLICACAO_ENDPOINT`.
      Enquanto vazio, a página avisa o candidato que a aplicação não foi enviada,
      em vez de engolir em silêncio.
- [ ] **Pixel da Meta e GA4**, se ele quiser tracking (`TRACKING` no `app.js`).
      Para a Meta vai **só o nome do evento, nunca o payload**: os números que o
      lead informa são dados da operação dele e não saem daqui.
- [ ] **Confirmar a vigência do dado dos 12,15%** da Meta antes de publicar. Está
      na tela de implicação 1. Dado de mercado sem fonte não entra em tela nenhuma.
- [ ] **Vídeo de leitura do eixo** (7 a 12 minutos na página de leitura) e **vídeo
      de 90 segundos** no topo da aplicação. Os dois seguem `[aberto]` no
      documento de arquitetura. As páginas sobem sem eles; o slot da aplicação
      está marcado em comentário no HTML.
- [ ] **Prints de faturamento dos casos**, sem identificação. Autorizados pelo
      cliente, mas ainda não enviados.
- [ ] Conferir a régua de qualificação: dois dos três Diagnósticos já vendidos
      foram para operações **abaixo** do piso que este funil usa.

## Rodar local

```bash
cd clientes/fabricio-alves/funis/prova-de-carga
python3 -m http.server 8123
# abre http://127.0.0.1:8123
```

## Publicar

Deploy na conta/time **da Simple** na Vercel, nunca em conta pessoal, publicando
**apenas esta subpasta**. Nome do projeto define a URL e não dá para renomear
depois. A publicação substitui a árvore inteira: arquivo que faltar vira 404
silencioso. Confira cada arquivo com `curl` depois de todo deploy.

```bash
for f in index.html leitura.html aplicacao.html fora-de-fase.html styles.css \
         flow.js motor.js app.js leitura.js favicon.svg \
         img/falcao-punho.webp img/capuz-selo.webp img/mergulho-stoop.webp \
         img/mergulho-stoop-claro.webp \
         fonts/cormorant-garamond-latin-400-normal.woff2 \
         fonts/cormorant-garamond-latin-600-normal.woff2 \
         fonts/ibm-plex-sans-latin-400-normal.woff2 \
         fonts/ibm-plex-sans-latin-500-normal.woff2 \
         fonts/ibm-plex-sans-latin-600-normal.woff2; do
  echo "$f $(curl -s -o /dev/null -w '%{http_code}' "$BASE/$f")"
done
```

O anúncio aponta para a **raiz com query** (`/?utm_source=...`), nunca para
`/index.html`, senão as UTMs se perdem.
