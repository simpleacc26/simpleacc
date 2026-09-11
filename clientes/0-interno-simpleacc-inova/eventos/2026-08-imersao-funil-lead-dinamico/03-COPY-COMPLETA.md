# COPY COMPLETA — pronta pra colar

> Tudo entre `[COLCHETES]` é link pendente. Centralize os links no ManyChat como
> **Custom Fields** — assim, se o Daniel mudar o link do Meet em cima da hora,
> você troca num lugar só e não em oito mensagens.

Links a criar como Custom Field:
`LINK_CHECKOUT` · `LINK_GRUPO_VIP` · `LINK_GRUPO_GRATUITO` · `LINK_MEET_N1` ·
`LINK_MEET_N2` · `LINK_GRUPO_INDECISOS`

---

## 1. Sequência dentro da janela (mensagens livres)

Copy da árvore original preservada, com ajustes pontuais marcados.

### MSG 02 — Contexto · 45 s após o clique

```
Perfeito, {{first_name}}.

Foi exatamente assim que eu construí uma operação que já faturou mais de R$2 milhões utilizando quiz.

E o mais interessante é que você não precisa virar produtor de conteúdo nem ficar dependendo de indicação pra fazer isso.

Vou te explicar.
```

> No ManyChat, configure o fallback do `{{first_name}}`: clique na variável →
> "Set fallback" → deixe em branco e ajuste a frase para `Perfeito!` quando
> vazio. Sem fallback, sai "Perfeito, ." para quem não tem nome na base.

### MSG 03 — Mecanismo · +2 min

```
A maioria dos especialistas tenta entrar no digital fazendo mais conteúdo ou colocando dinheiro em tráfego.

Só que existe outro caminho:

criar um sistema que identifica quem realmente tem interesse no que você vende e conduz essa pessoa até a sua oferta.

Eu chamo isso de Funil de Lead Dinâmico.
```

### MSG 04 — Evento + oferta · +2 min

```
E semana que vem eu vou abrir meu processo e ensinar como construir isso do zero usando IA.

São 2 noites comigo, dias 26 e 27, das 20h às 22h30.

A ideia é você sair entendendo como montar um Funil de Lead Dinâmico pra vender a sua mentoria.

E eu coloquei um valor simbólico pra participar: R$9,90.
```
**Botão (URL):** `QUERO PARTICIPAR` → `[LINK_CHECKOUT]`
**Action:** `Add Tag → EVENTO_FL_CHECKOUT`

### MSG 05 — Prova · +3 h · ⟨só se NÃO comprador⟩

```
{{first_name}}, só pra você entender por que eu resolvi fazer essa imersão:

eu já gerei R$2 milhões através de quiz e vou mostrar o processo que existe por trás disso.

Não é uma aula sobre teoria de marketing.

Vou abrir o mecanismo e mostrar como você pode aplicar isso à sua própria mentoria.
```
**Botão (URL):** `GARANTIR MINHA VAGA` → `[LINK_CHECKOUT]`

> Esta é a mensagem que mais ganha com um **case real** (nome, nicho, número,
> prazo). Se o Daniel mandar um, insira entre o segundo e o terceiro parágrafo.
> Não invente case.

### MSG 06 — Objeção / identificação · +8 h · ⟨só se NÃO comprador⟩

```
E tem uma coisa importante:

essa imersão não é só pra quem já vende mentoria no digital.

Ela foi pensada principalmente pra quem já tem conhecimento e resultado no que faz, mas ainda depende muito de indicação, networking ou atendimento presencial pra vender.

Se você se identifica com isso, provavelmente vai aproveitar bastante as duas noites.

O ingresso está R$9,90.
```
**Botão (URL):** `QUERO PARTICIPAR` → `[LINK_CHECKOUT]`

### Resposta ao "AGORA NÃO" — imediata

```
Sem problema.

Vou abrir um grupo gratuito no WhatsApp onde compartilho como estruturar aquisição de clientes pra quem vende conhecimento.

Se quiser acompanhar por lá, é só entrar. Sem custo e sem compromisso.
```
**Botão (URL):** `ENTRAR NO GRUPO` → `[LINK_GRUPO_GRATUITO]`

---

## 2. Comprador — mensagem 1:1

### C01 — Confirmação imediata · gatilho: tag `EVENTO_FL_COMPRADOR`

```
Inscrição confirmada!

Dias 26 e 27, às 20h, estaremos juntos na Imersão Funil de Lead Dinâmico.

Criei um grupo VIP onde vou enviar todos os avisos, os links das salas e os materiais da imersão.

Entra agora — é por lá que tudo acontece:
```
**Botão (URL):** `ENTRAR NO GRUPO VIP` → `[LINK_GRUPO_VIP]`

> Essa mensagem é o ponto único de falha do fluxo de comprador. Se a pessoa não
> entrar no grupo, ela não recebe mais nada (a janela dela fecha). Por isso o
> texto insiste que é lá que tudo acontece. Na segunda à noite, cheque quantos
> compradores entraram no grupo; para os que faltarem, use o template T5.

---

## 3. Grupo VIP — avisos (postar manualmente, ou agendar)

Estas são as antigas C02 a C08. Vão **no grupo**, não no 1:1: sem janela, sem
template, sem custo.

**Terça 25, 19h — véspera**
```
Amanhã começamos.

E quero que você chegue com uma pergunta na cabeça:

se as suas indicações parassem hoje, por quanto tempo o seu negócio continuaria vendendo?

Amanhã eu te mostro por que previsibilidade não começa no tráfego. Começa no sistema de aquisição.

20h.
```

**Quarta 26, 09h — noite 1, manhã**
```
É hoje.

Às 20h começa a nossa primeira noite.

Hoje eu vou te mostrar por que tantos especialistas excelentes continuam presos à indicação — e o que muda quando você constrói um sistema previsível pra gerar oportunidades.

Separa papel e caneta.
```

**Quarta 26, 19h — falta 1 hora**
```
Falta 1 hora.

Hoje às 20h começamos. Link da sala:

[LINK_MEET_N1]
```

**Quarta 26, 19h45 — faltam 15 minutos**
```
15 minutos. A sala já vai abrir.

[LINK_MEET_N1]
```

**Quarta 26, ~22h40 — pós-live**
```
Primeira noite concluída.

Hoje você entendeu por que o problema não é falta de conhecimento — é falta de um sistema de aquisição.

Amanhã muda o jogo: vamos entrar na construção prática do Funil de Lead Dinâmico usando IA.

20h. Não perde a segunda noite.
```

**Quinta 27, 09h — noite 2, manhã**
```
Hoje é mão na massa.

Ontem falamos sobre o problema. Hoje, às 20h, eu vou mostrar o Funil de Lead Dinâmico funcionando e como a IA entra na construção.

É provavelmente a noite mais importante da imersão.
```

**Quinta 27, 19h45 — faltam 15 minutos**
```
15 minutos. Segunda e última noite.

[LINK_MEET_N2]
```

---

## 4. Pós-pitch — noite 2 (novo; não estava na árvore)

O plano prevê pitch nos últimos 30–45 min da noite 2 e carrinho aberto por 10
dias, mas nenhuma copy foi definida. O mínimo pra não perder venda na hora H:

**Quinta 27, no minuto do pitch — no grupo VIP**
```
Link do Estrategista de Quiz, com as condições que acabei de apresentar:

[LINK_CHECKOUT_MENTORIA]

Os bônus dos primeiros 3 e dos primeiros 10 valem só hoje.
```

**Quinta 27, logo após o fim — no grupo VIP**
```
Se você quer entrar mas ficou com alguma dúvida — sobre condição de pagamento, sobre se serve pro seu caso, sobre tempo — me chama no grupo abaixo que eu te respondo pessoalmente.

[LINK_GRUPO_INDECISOS]
```

> Precisa do link de checkout da mentoria (R$2.997) e da confirmação dos bônus.
> Ambos pendentes do Daniel — mas só são necessários na quinta, não hoje.

---

## 5. E-mails

O plano previa 5 e-mails. **Recomendo cortar.** Não há ferramenta de e-mail
definida, ninguém alocado, e o próprio plano coloca o WhatsApp como fonte nº 1.
Com o tempo que resta, e-mail mal feito consome a atenção que o WhatsApp precisa.
Se o Daniel insistir, o mínimo é 2: abertura na segunda e "é hoje" na quarta,
reaproveitando os textos T1-A e T3.

---

## 6. Automação da pesquisa — proposta pra aprovar

O Daniel pediu "automação da pesquisa" mas nunca disse qual. A árvore original
deixou como AGUARDANDO BRIEFING — correto, não se inventa pesquisa. Mas dá pra
destravar com um sim.

**Proposta:** pesquisa curta **logo após a confirmação de compra** (C01), dentro
da janela, gratuita, para segmentar o pitch da noite 2. Três perguntas, tudo em
Quick Reply, sem formulário externo:

**P1 — o que você faz hoje?**
`Consultoria/mentoria presencial` · `Já vendo no digital` · `Ainda não vendo`

**P2 — quanto você fatura por mês hoje?**
`Até R$10 mil` · `R$10 a R$30 mil` · `Acima de R$30 mil`

**P3 — qual o seu maior travamento?**
`Não sei atrair cliente` · `Atraio mas não converto` · `Falta tempo/estrutura`

Cada resposta vira tag. Serve pra: (a) o Daniel saber com quem está falando
antes de subir na live de quarta, (b) priorizar o atendimento 1:1 do carrinho
por quem tem caixa, (c) alimentar a base pra próximos lançamentos.

**Pergunta pro Daniel:** "é isso que você chamou de pesquisa, ou é outra coisa?"
Se for outra coisa, precisa do briefing. Se ele aprovar essa, monto junto com a
Automação 02 amanhã cedo — são 15 minutos a mais.
