---
name: lp-aula-ao-vivo
description: >-
  Monta a landing page de um evento ao vivo de baixo ticket (aula, masterclass,
  workshop, imersão online paga de R$ 19 a R$ 97) que abre vagas de um produto
  high ticket no fim, seguindo a ESTRUTURA INVISÍVEL canônica extraída da LP
  "A Paciente que Some Depois do Preço" (Mariana Garrett), documentada em
  references/estrutura-invisivel-lp.md: 21 peças na ordem, bloco de diagnóstico
  com espelho de conversa e dado proprietário, diagnóstico deixado em aberto
  como motor de comparecimento, pitch declarado na página, escassez em três
  camadas, prova em três formatos e CTA distribuído. Entrega HTML+CSS+JS vanilla
  autocontido, sem framework, a partir do modelo em assets/modelo-lp/. Use sempre
  que alguém pedir "página da aula ao vivo", "LP do evento/masterclass/workshop",
  "página de captura do webinário pago", "replicar a estrutura da LP da Mariana
  Garrett para o cliente X", "página de lote zero/ingresso", ou quando um cliente
  for lançar uma aula paga barata que termina com pitch de mentoria. Conduz o
  intake antes de escrever e nunca inventa número, credencial ou escassez.
---

# LP de Aula ao Vivo: montar a página do evento que vende o high ticket

## O que esta skill faz

Produz a **landing page completa** de um evento ao vivo de baixo ticket, em HTML
+ CSS + JS vanilla autocontido, seguindo a estrutura invisível validada da casa.

O arquétipo: **ingresso simbólico (R$ 19 a R$ 97) → aula ao vivo sem gravação →
abertura de vagas do programa de acompanhamento no fim.** O ingresso não é o
negócio, é o filtro. A página diz isso em voz alta, e é justamente essa
honestidade declarada que a faz converter.

## Regra zero: leia antes de escrever

Nesta ordem, sempre:

1. `references/estrutura-invisivel-lp.md` — **o blueprint.** As 21 peças, o que
   cada uma faz no lead, os 4 sistemas que atravessam a página, as 7 armadilhas.
   Leia **inteiro** antes da primeira linha de copy.
2. `references/intake-cliente.md` — o que perguntar e o que nunca inventar.
3. `references/componentes.md` — os 12 componentes técnicos, com o código no ar.
4. `assets/modelo-lp/` — a página de referência montada e funcionando
   (`index.html` + `styles.css` + `app.js`). **Não publique este arquivo como
   está**: é a LP da Mariana Garrett, com a copy, as imagens e o checkout dela.

E, se o trabalho é de um cliente do repo, leia também
`clientes/<cliente>/CLAUDE.md`, `contexto/` e `aprendizados.md` **antes** de
perguntar qualquer coisa ao operador.

## Sequência de trabalho

```
INTAKE → CONFIRMAÇÃO → COPY → MONTAGEM → CONFERÊNCIA → ENTREGA
```

Não pule etapas. Se o operador pedir para ir direto ao HTML, responda que a
estrutura só funciona com matéria-prima real e que o intake são três rodadas
curtas de perguntas, não um formulário.

### 1. Intake

Siga `references/intake-cliente.md`. Três rodadas:

- **Rodada 1 (eliminatória):** o evento (data com fuso, preço, grava ou não,
  lote real ou não, checkout) + o produto de continuidade + **o cliente aceita
  declarar o pitch na página?**
- **Rodada 2:** a dor. Obsessão em dois campos: **a cena exata da conversa que
  morreu, com horários e falas** e **as 4 a 6 etapas entre o primeiro contato e o
  dinheiro**.
- **Rodada 3:** prova (dado proprietário, depoimentos, credenciais), os 4 blocos
  da aula, os entregáveis, identidade visual.

🔒 **Dois campos são eliminatórios.** Se o cliente não aceita declarar o pitch,
ou se não existe nenhuma cena concreta de dor, **pare e negocie com o operador**
antes de escrever. O arquétipo não funciona sem os dois.

### 2. Confirmação

Devolva um resumo curto e peça OK explícito. O resumo tem que destacar: data com
fuso, preço e preço "de", se grava, se o lote é real, a URL do checkout e a frase
do pitch declarado. Só depois escreva.

### 3. Copy

Escreva a copy das 21 peças na ordem do blueprint, **antes** de tocar em HTML.
Entregue em markdown para o operador revisar. As peças que mais decidem a
conversão, e as que mais dão trabalho:

| Peça | O que não pode faltar |
|---|---|
| **H1** | Nomeia um **personagem de dor**, não um benefício. Teste: o lead consegue apontar uma pessoa real da semana dele com esse nome? |
| **Objeções (4)** | As 5 categorias fixas, incluindo "se é barato, não deve prestar" |
| **Espelho (5)** | Cena de conversa com horários que provam o argumento sozinhos |
| **Reframe (6)** | Os 5 movimentos, terminando em **absolvição** (troca defeito de caráter por falta de ferramenta) |
| **Dado (8)** | Dado do cliente, com n amostral honesto, produzindo uma inversão visível |
| **Diagnóstico (9)** | Os números **em aberto** (`?`) e a legenda dizendo que as barras são ilustração |
| **Grade (11)** | Bloco-estrela irreproduzível + a declaração do pitch |
| **Carta (18)** | Os 5 movimentos, com a razão comercial honesta, assinada |

### 4. Montagem

Copie `assets/modelo-lp/` para `clientes/<cliente>/funis/<projeto>/` e adapte:

1. **Tokens** do `:root` em `styles.css` (12 variáveis, ver blueprint Parte 4).
2. **Copy**: reescreva 100%. Nenhuma frase do modelo sobrevive.
3. **Contador**: nova data em `app.js`, com fuso explícito.
4. **CTAs**: os 4 botões + sticky para o checkout do cliente.
5. **UTM**: o seletor de propagação aponta para o domínio do checkout novo.
6. **Imagens**: todas. Nenhuma pode apontar para o domínio da Mariana.
7. **Vídeos**: novos GUIDs e nova library do player.
8. **Peças sem matéria-prima**: remova a peça inteira em vez de preencher com
   invenção, e avise o operador o que saiu e por quê.

### 5. Conferência

Rode o checklist do fim de `estrutura-invisivel-lp.md` e o de
`componentes.md`. Os itens que mais pegam:

```bash
# resíduo do modelo: tem que dar zero
grep -riE "paciente|clínica|cadeira|Mariana|marianagarrett|F107221464F|2026-09-08" .
```

- Contador com o fuso e a data certos
- Mesmo número de escassez no hero e na oferta
- UTM chegando no checkout (teste com `?utm_source=teste`)
- `prefers-reduced-motion` desligando as animações
- Sem JS a página inteira aparece
- Testado em 360px

### 6. Entrega

Salve em `clientes/<cliente>/funis/<projeto>/` com `README.md` (o que é, como
rodar, onde publica, contatos), publique se o operador pedir, e **registre o que
aprendeu** em `clientes/<cliente>/aprendizados.md`.

## Regras de escrita (valem para toda a página)

- 🔒 **Zero travessão.** A LP de referência tem zero em 35 KB. Use vírgula,
  dois-pontos, ponto final. Separador de linha de condições: `·`. Evolução de
  número: `→`.
- **Emoji só nos 3 fatos do hero** (🗓️ 💻 ⚠️), como ícone funcional de linha, e
  só se o público for confortável com isso. Público masculino, jurídico, médico
  ou corporativo: remova.
- **Segunda pessoa do singular**, sempre. A página fala com uma pessoa.
- **Número concreto no lugar de adjetivo.** "9 dias sem resposta", não "muito
  tempo".
- **Zero superlativo comercial.** Nada de "revolucionário", "exclusivo",
  "imperdível". O tom de conversa entre pares é o que sustenta o preço baixo sem
  parecer isca.

## O que nunca fazer

- **Inventar número** (faturamento, alunos, anos, percentual, n amostral).
- **Tirar credencial de objeto de cena** (livro numa foto, troféu, selo). Só vira
  claim o que está escrito como texto no material do cliente.
- **Prometer escassez que o cliente não confirmou** que vai honrar. Contador
  falso que reinicia, lote infinito anunciado como "80% vendido", "sem gravação"
  seguido de replay.
- **Colocar CTA no meio do bloco de diagnóstico** (peças 4 a 9).
- **Fechar os números da peça 9.** Eles ficam em `?`: é o motor de comparecimento.
- **Publicar o `assets/modelo-lp/` como está.**

## Quando NÃO usar esta skill

| Situação | Use |
|---|---|
| Página sem data marcada (evergreen, VSL, página de vendas) | `/prompt-mestre` (`prompts/funil-html.md`) |
| Qualificar lead frio para call | skill `gerar-quiz-diag-pag-pos-quiz` |
| Copy de anúncio ou roteiro de vídeo | `/copy-hormozi` |
| Evento com ticket alto (R$ 297+) | Este arquétipo não serve: preço alto exige VSL, prova longa e garantia |

Evento **gratuito** usa este arquétipo, removendo a ancoragem de preço e a carta
"por que tão barato". A escassez passa a ser só tempo + "sem gravação".
