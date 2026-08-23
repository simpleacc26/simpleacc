# TEMPLATES META — submeter HOJE

> Onde submeter: **Meta Business Suite → WhatsApp Manager → Modelos de mensagem
> → Criar modelo**. Ou, se o número já estiver conectado ao ManyChat:
> **ManyChat → Settings → WhatsApp → Message Templates → New Template**
> (o ManyChat envia pra Meta e mostra o status ali mesmo).
>
> Idioma: **Português (BR)**. Aprovação: minutos a algumas horas, prazo oficial
> até 24–48h. Por isso: hoje.

---

## Por que 4 templates e não 1

A árvore original assumia **um** template inicial e todo o resto como mensagem
livre. Isso não funciona, porque a janela de 24h fecha antes do evento. Ver o
detalhamento em `02-FLUXO-MANYCHAT.md`, seção "Os 3 furos".

Resumo: com disparo na segunda 24 e evento na quarta 26 / quinta 27, tudo que
precisa sair de terça em diante **exige template**. São 4:

| ID | Quando sai | Para quem | Categoria |
|---|---|---|---|
| **T1** | Segunda 24, 09h | Base inteira | MARKETING |
| **T2** | Terça 25, 17h | Interessados que não compraram | MARKETING |
| **T3** | Quarta 26, 09h | Interessados que não compraram | MARKETING |
| **T4** | Terça 25, 10h | Quem não respondeu ao T1 | MARKETING |

Submeta **todos os 4 de uma vez, hoje**. Aprovar leva o mesmo tempo pra 1 ou pra 4.

---

## T1 — Abertura (o clickbait do Daniel)

Submeta **as duas versões abaixo**. É hedge de aprovação: se a Meta reprovar a
mais agressiva, você ainda tem a outra aprovada e não perde a segunda-feira.

### T1-A — versão recomendada ✅

**Nome do modelo:** `evento_fld_abertura_a`
**Categoria:** Marketing · **Idioma:** Português (BR) · **Sem cabeçalho, sem rodapé**

**Corpo:**
```
Posso te fazer uma pergunta rápida?

Você tem interesse em vender mentoria no digital e faturar de R$10 mil a R$50 mil por mês, sem depender de indicação e sem investir em tráfego?
```

**Botões:** tipo *Resposta rápida* (Quick Reply) — **dois botões**:
- `SIM, CLARO`
- `AGORA NÃO`

### T1-B — versão do Daniel (mais agressiva)

**Nome do modelo:** `evento_fld_abertura_b`
**Categoria:** Marketing · **Idioma:** Português (BR)

**Corpo:**
```
Posso te fazer uma pergunta rápida?

Você tem interesse em fazer mais de R$100 mil por mês com mentoria, sem precisar investir em tráfego?
```

**Botões (Quick Reply):** `SIM, CLARO` / `AGORA NÃO`

> **Ressalva que vale registrar pro Daniel:** o ICP do evento fatura R$10–30k/mês
> e a promessa do próprio evento é R$10k a R$50k em 30 dias. Prometer R$100k/mês
> na porta de entrada (a) atrai clique desqualificado, (b) cria um degrau que o
> conteúdo das 2 noites não entrega, e (c) tem risco maior de reprovação pela
> Meta, que é rigorosa com promessa de ganho financeiro. **Recomendo rodar a
> T1-A.** Se as duas aprovarem e o Daniel quiser a dele, dá pra testar A/B: 50%
> da base em cada e usar a de melhor taxa de resposta no segundo lote.

---

## Três decisões técnicas do T1 que valem explicar

**1. Tirei o `{{first_name}}` de propósito.**
Na Meta, `{{first_name}}` do ManyChat vira a variável `{{1}}`, que exige exemplo
no cadastro e — o problema real — **falha o envio se o contato estiver sem nome
preenchido**. Numa base importada, isso é uma fatia grande. Template sem
variável aprova mais rápido, não quebra e não trava o disparo. A personalização
entra da MSG 02 em diante, que é mensagem livre e aí o `{{first_name}}` funciona
normal com fallback.

**2. Os botões são Quick Reply, não URL.**
Essa é a decisão mais importante do fluxo inteiro. **Clique em botão de link
(URL) não abre a janela de 24h** — não gera mensagem de entrada. Só Quick Reply
e resposta de texto abrem. Se o T1 fosse com botão de link pro checkout, a
janela nunca abriria e nenhuma das mensagens 02 a 06 sairia.

**3. O botão "AGORA NÃO" não é cortesia — é economia.**
Quem clica em "AGORA NÃO" também abre a janela de 24h. Então dá pra mandar o
convite do grupo gratuito **na hora, como mensagem livre, sem gastar template e
sem custo**. Sem esse botão, esse pessoal só seria alcançável via T4.

---

## T2 — Recall dos não-compradores (terça 25, 17h)

**Nome:** `evento_fld_recall`
**Categoria:** Marketing

**Corpo:**
```
Amanhã às 20h começa a Imersão Funil de Lead Dinâmico.

São 2 noites comigo mostrando como montar um sistema que gera oportunidade todo dia, sem depender de indicação e sem produzir conteúdo diariamente.

O ingresso é R$9,90 e as inscrições fecham amanhã.
```

**Botão:** *Visitar site* (URL) → `[CHECKOUT KIWIFY]`
**Enviar para:** tag `EVENTO_FL_INTERESSADO` **sem** `EVENTO_FL_COMPRADOR`

---

## T3 — Última chamada (quarta 26, 09h)

**Nome:** `evento_fld_ultima_chamada`
**Categoria:** Marketing

**Corpo:**
```
É hoje.

Às 20h começa a primeira noite da Imersão Funil de Lead Dinâmico.

Se você quer parar de depender de indicação pra vender sua mentoria, ainda dá tempo de entrar por R$9,90.

As inscrições fecham hoje às 19h.
```

**Botão:** *Visitar site* (URL) → `[CHECKOUT KIWIFY]`
**Enviar para:** tag `EVENTO_FL_INTERESSADO` **sem** `EVENTO_FL_COMPRADOR`

---

## T4 — Convite pro grupo gratuito (terça 25, 10h)

Para quem **não respondeu nada** ao T1. Como nunca houve interação, não existe
janela aberta — só template alcança essa pessoa.

**Nome:** `evento_fld_grupo_gratuito`
**Categoria:** Marketing

**Corpo:**
```
Vou abrir um grupo gratuito no WhatsApp onde compartilho como estruturar aquisição de clientes para quem vende conhecimento.

Sem custo e sem compromisso. Se não fizer sentido, é só sair.
```

**Botão:** *Visitar site* (URL) → `[GRUPO GRATUITO]`
**Enviar para:** tag `EVENTO_FL_NAO_RESPONDEU`

---

## T5 — opcional, só se sobrar tempo

Lembrete do evento para **comprador que não entrou no grupo VIP**. Se todos
entrarem no grupo, não precisa — os avisos vão pelo grupo. Deixe como rede de
segurança.

**Nome:** `evento_fld_lembrete_comprador`
**Categoria:** **Utility** (não é marketing — é sobre uma transação que a pessoa já fez; aprova mais fácil e é mais barato)

**Corpo:**
```
Sua imersão começa hoje às 20h.

Segue o link da sala:
```
**Botão:** *Visitar site* (URL) → `[MEET — NOITE 1]`

---

## Regras que evitam reprovação

- Nada de "clique aqui" isolado, texto todo em CAIXA ALTA, ou excesso de emoji.
- Nada de garantia de resultado ("você VAI faturar"). Use "como faturar", "o
  processo para".
- O texto do botão tem limite de 25 caracteres.
- Não deixe variável no começo nem no fim do corpo — a Meta reprova.
- Se reprovar, o motivo aparece no WhatsApp Manager e **dá pra editar e
  reenviar**; não precisa criar do zero.

## Se nada aprovar a tempo — plano B

Dispara segunda pela **lista de transmissão nativa do WhatsApp** (funciona só
para quem tem o número do Daniel salvo nos contatos, limite de 256 por lista) e
para os contatos mais quentes no 1:1. Perde a automação, mas não perde a
segunda-feira. Em paralelo o ManyChat entra no ar para o recall de terça e
quarta.
