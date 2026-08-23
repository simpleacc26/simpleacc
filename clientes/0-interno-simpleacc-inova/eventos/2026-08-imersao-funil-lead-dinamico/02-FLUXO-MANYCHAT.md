# FLUXO MANYCHAT — árvore corrigida e passo a passo de montagem

---

## PARTE 1 — Os 3 furos da árvore original

A árvore que veio pronta acertou a estratégia, as tags e a regra de supressão do
comprador. O que ela errou foi a mecânica da API do WhatsApp. Os três furos
abaixo fariam **a maior parte das mensagens simplesmente não ser entregue** — sem
erro visível, sem aviso, só não chegando.

### Furo 1 — A MSG 07 não sai

A regra: fora da janela de 24h desde a última mensagem **de entrada** do
contato, só template passa.

Linha do tempo real: a pessoa clica em "SIM, CLARO" na segunda 24 às 09h. A
janela dela vai até **terça 25 às 09h**. A MSG 07 está agendada para a "véspera
da primeira noite" — terça 25 à noite. Isso é ~35h depois do clique. **Fora da
janela.** A mensagem não é entregue.

→ Corrigido: a MSG 07 virou o **template T2**.

### Furo 2 — A Automação 02 inteira não sai (este é o grave)

Mesma regra, aplicada aos compradores. Alguém que compra na segunda tem janela
até terça de manhã. Mas:

| Mensagem | Quando | Situação |
|---|---|---|
| C01 confirmação | imediata | ✅ dentro da janela |
| C02 véspera | terça 25 | ❌ fora |
| C03 noite 1 manhã | quarta 26 | ❌ fora |
| C04 falta 1 hora | quarta 26, 19h | ❌ fora |
| C05 faltam 15 min | quarta 26, 19h45 | ❌ fora |
| C06 pós-live | quarta 26, 22h30 | ❌ fora |
| C07 noite 2 manhã | quinta 27 | ❌ fora |
| C08 faltam 15 min | quinta 27, 19h45 | ❌ fora |

São **7 de 8 mensagens** não entregues — justamente os lembretes que sustentam
a meta de >50% de comparecimento. A pessoa pagaria R$9,90 e não receberia
lembrete nenhum.

→ Corrigido: **todos os lembretes passam a ir pelo grupo VIP do WhatsApp.**
Grupo não tem janela, não tem template, não tem custo por mensagem e não tem
limite de tier. O 1:1 fica só com o C01, que cabe na janela e entrega o link do
grupo. Isso derruba a necessidade de ~7 templates para zero e é o que torna o
prazo viável.

### Furo 3 — Botão de link não mantém o fluxo vivo

O documento trata o clique em "QUERO PARTICIPAR" (botão de URL pro Kiwify) como
interação. Não é: **clique em link não gera mensagem de entrada e não renova a
janela.** Só Quick Reply e resposta de texto renovam.

Consequência prática: a janela conta a partir do clique em "SIM, CLARO" no T1 e
mais nada a estende. Todas as mensagens livres (02 a 06) têm que caber nessas
24h. O fluxo abaixo já está desenhado assim.

### Ajustes menores

- **7 mensagens → 5.** O Daniel falou em "até 7 mensagens na janela". Sete
  mensagens comerciais em 24h derruba a nota de qualidade do número rápido, e
  número com nota baixa é volume restringido no meio do lançamento. Cinco
  entrega a mesma sequência (contexto → mecanismo → oferta → prova → objeção)
  sem esse risco.
- **Números do plano.** 15–50 ingressos × R$9,90 = **R$148,50 a R$495**, não
  "R$4k a R$6,4k". E "cenário bom R$920k" é typo. Não muda nada na execução,
  mas o caixa do ingresso é irrelevante: o evento é de aquisição, o dinheiro
  está nas vendas de R$2.997 (1 a 7 vendas = R$2.997 a R$20.979).
- **Colisão de nomes.** A apresentação comercial oficial da Simple chama de
  "Implementação de Funil de Lead Dinâmico" um projeto de **105 dias, feito para
  o cliente**, em 3 fases. O evento tem o mesmo nome e vende o "Estrategista de
  Quiz" a R$2.997, que é **o cliente construindo, com acompanhamento em grupo**.
  Quem já viu a apresentação comercial vai achar que está comprando os 105 dias
  por R$2.997. Isso vira atrito e reembolso. No pitch da noite 2, posicionar
  explicitamente: *"o Estrategista de Quiz é você construindo, comigo do lado; a
  implementação completa feita pelo meu time é outro nível de projeto."*

---

## PARTE 2 — Árvore corrigida

```
BASE DE CONTATOS
   │
   └─► [T1] template de abertura ─ segunda 24, 09h
          │
          ├─ clicou "SIM, CLARO" ──► tag EVENTO_FL_INTERESSADO
          │                          + ORIGEM = DISPARO_WHATSAPP
          │                          janela de 24h ABERTA
          │        │
          │        ├─ MSG 02  contexto            (30–60 s)
          │        ├─ MSG 03  mecanismo           (+2 min)
          │        ├─ MSG 04  evento + checkout   (+2 min)   [botão URL]
          │        ├─ MSG 05  prova               (+3 h)     ⟨se não comprador⟩
          │        └─ MSG 06  objeção             (+8 h)     ⟨se não comprador⟩
          │
          ├─ clicou "AGORA NÃO" ───► tag EVENTO_FL_GRUPO_GRATUITO
          │                          janela aberta → manda convite do grupo
          │                          gratuito na hora, como mensagem livre
          │
          └─ não respondeu em 24h ─► tag EVENTO_FL_NAO_RESPONDEU
                                     [T4] terça 25, 10h → grupo gratuito

   NÃO-COMPRADORES com tag INTERESSADO:
      [T2] terça 25, 17h   — recall
      [T3] quarta 26, 09h  — última chamada

   COMPRA APROVADA (webhook Kiwify → Make → ManyChat):
      → tag EVENTO_FL_COMPRADOR
      → sai de TODAS as sequências de venda
      → C01 confirmação + link do grupo VIP   (dentro da janela)
      → daqui em diante, TUDO pelo grupo VIP:
            véspera · noite 1 manhã · 1h antes · 15 min antes
            pós-live · noite 2 manhã · 15 min antes
```

---

## PARTE 3 — Montagem no ManyChat, passo a passo

Você nunca mexeu no ManyChat. Isto é o caminho mínimo, na ordem. Tempo estimado:
60 a 90 minutos.

### Passo 1 — Conectar o número (Victor faz, ou acompanha)

`Settings → Channels → WhatsApp → Connect`. Exige que o número já esteja num
WhatsApp Business Account dentro do Meta Business Manager do Daniel. Um número
que está em uso no app WhatsApp Business comum **precisa ser migrado** para a
Cloud API — e ao migrar, **ele para de funcionar no app**. Confirme com o Daniel
que ele sabe disso antes de migrar; se o número for o de atendimento dele, use
outro.

### Passo 2 — Criar as tags

`Contacts → Tags → New Tag`. Crie exatamente estas seis:

```
EVENTO_FL_INTERESSADO
EVENTO_FL_CHECKOUT
EVENTO_FL_COMPRADOR
EVENTO_FL_NAO_RESPONDEU
EVENTO_FL_GRUPO_GRATUITO
EVENTO_FL_ORIGEM_DISPARO
```

### Passo 3 — Montar a Automação 01

`Automation → New Flow → WhatsApp`. Monte nesta ordem, arrastando os blocos:

1. **Bloco de mensagem** com o template T1 (aparece na lista depois de aprovado).
2. Do botão `SIM, CLARO`, puxe uma seta para um bloco **Action**:
   - `Add Tag → EVENTO_FL_INTERESSADO`
   - `Add Tag → EVENTO_FL_ORIGEM_DISPARO`
3. **Delay** de 45 segundos → **Message** com a MSG 02.
4. **Delay** 2 min → **Message** MSG 03.
5. **Delay** 2 min → **Message** MSG 04, com botão tipo **URL** apontando pro
   checkout Kiwify. Adicione um bloco Action com `Add Tag → EVENTO_FL_CHECKOUT`.
6. **Delay** 3 horas → **Condition**: `Tag EVENTO_FL_COMPRADOR is not set` →
   se verdadeiro, **Message** MSG 05. Se falso, encerra o fluxo.
7. **Delay** 8 horas → mesma **Condition** → **Message** MSG 06.
8. Do botão `AGORA NÃO`: Action `Add Tag → EVENTO_FL_GRUPO_GRATUITO` →
   **Message** com o convite do grupo gratuito.

> **O bloco Condition antes das MSG 05 e 06 não é opcional.** É ele que impede
> um comprador de receber "ainda dá tempo de garantir sua vaga" depois de ter
> pago. Sem ele, você gera pedido de reembolso.

### Passo 4 — Montar a Automação 02 (compradores)

`New Flow`, gatilho = tag `EVENTO_FL_COMPRADOR` aplicada.
Um bloco só: a mensagem C01 com o link do grupo VIP. Mais nada — o resto é grupo.

> Não adicione ninguém ao grupo automaticamente. Além de ser mal visto, a
> API não faz isso. Entrega o link e a pessoa entra.

### Passo 5 — Marcar quem não respondeu

O ManyChat não tem "se não respondeu em 24h" nativo num fluxo de broadcast. Duas
saídas:
- **Simples (recomendada pro prazo):** terça de manhã, em `Contacts`, filtre
  quem recebeu o broadcast e **não tem** a tag `EVENTO_FL_INTERESSADO` nem
  `EVENTO_FL_GRUPO_GRATUITO`, selecione tudo e aplique
  `EVENTO_FL_NAO_RESPONDEU` em massa. Leva 2 minutos.
- **Automática:** um Delay de 24h no início do fluxo com Condition. Mais elegante,
  mas mais coisa pra dar errado num fluxo montado às pressas.

### Passo 6 — Agendar os broadcasts

`Automation → Broadcasting → New Broadcast → WhatsApp`, um para cada:

| Broadcast | Agendar para | Público |
|---|---|---|
| T1 | seg 24, 09h | base inteira (ou os 250 mais quentes, se o tier for baixo) |
| T4 | ter 25, 10h | tag `EVENTO_FL_NAO_RESPONDEU` |
| T2 | ter 25, 17h | `EVENTO_FL_INTERESSADO` sem `EVENTO_FL_COMPRADOR` |
| T3 | qua 26, 09h | `EVENTO_FL_INTERESSADO` sem `EVENTO_FL_COMPRADOR` |

Confira o **fuso horário** da conta ManyChat antes de agendar
(`Settings → General → Timezone` = America/Sao_Paulo). Fuso errado é o erro
mais comum e mais caro aqui.

### Passo 7 — Integração Kiwify → ManyChat

Sem isso, comprador continua recebendo mensagem de venda. **É o item que mais
gera reembolso se falhar.** Detalhamento no arquivo `06-INTEGRACAO-KIWIFY.md`.

Se não der tempo de automatizar: baixe a lista de compradores do Kiwify a cada
2–3 horas na segunda e terça, importe no ManyChat e aplique a tag
`EVENTO_FL_COMPRADOR` em massa. Funciona, mas alguém tem que lembrar de fazer.

---

## PARTE 4 — Sobre o plano do ManyChat

O broadcast por tag e a API exigem **ManyChat Pro**. Se a conta do Daniel for
free, precisa subir hoje. Custa a partir de ~US$15/mês pela faixa inicial de
contatos — e o preço escala com o tamanho da base, então uma base de 3–5k custa
mais. Confirme com o Daniel antes de montar, pra não descobrir na hora do
disparo. Fora isso, o WhatsApp Cloud API cobra por conversa iniciada pela
empresa (marketing), na casa de centavos de real por conversa — para 3–5k
contatos, orce algo na faixa de R$200 a R$400. Vale confirmar o valor atual na
tabela da Meta, que muda com frequência.
