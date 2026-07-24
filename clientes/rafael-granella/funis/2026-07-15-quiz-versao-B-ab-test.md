# Quiz Alivance — Versão B (teste A/B)

**Data:** 15/07/2026
**Versão A (controle):** https://quiz.rafaelgranella.com.br/ — quiz "diagnóstico" neutro, 7 perguntas, qualificação de faturamento no fim.
**Versão B (variante):** esta — mesma quantidade de perguntas, mesmo design, mesma automação GHL. Muda só a **narrativa**.

---

## Hipótese do teste (o que B muda e por quê)

> **A versão A comunica como um "diagnóstico" neutro e lisonjeiro.** Ela atrai volume, mas deixa entrar muito curioso desqualificado (o próprio Rafael relatou lead que auto-declara R$20k mas não tem perfil).
>
> **A versão B pré-qualifica no hero (fala explicitamente com quem já fatura +R$30k/mês), ataca a dor na jugular e amarra desejo em cada pergunta** — sincronizada com os ângulos dos anúncios (dependência de indicação, ticket abaixo do valor, agenda cheia/faturamento parado, empresário vs mentor).
>
> **Predição:** B mantém (ou aumenta) o volume de leads QUALIFICADOS e melhora a taxa de agendamento, porque quem chega já se reconheceu no problema certo e chega com mais intenção — enquanto o sub-30k se auto-seleciona pra fora logo no hero.

**Como saber quem ganhou:** comparar as duas por **qualidade de lead** (distribuição de faturamento declarado + % que agenda + % que comparece), não só por volume bruto ou CPL. Rodar 50/50 até volume estatístico mínimo (ideal: ~30-40 leads de cada, ou 2 semanas — o que vier primeiro).

---

## O que MANTÉM igual (paridade do teste)
- **Design/visual:** idêntico (mesma paleta escura + dourado, Fahkwang/Inter, cards arredondados).
- **Nº de perguntas:** 7 (mesma estrutura SPIN: situação → problema → implicação → necessidade → objetivo → perfil → qualificação).
- **Qualificação (Pergunta 7):** opções de faturamento **idênticas à A** — pra comparação de qualidade ficar limpa.
- **Captura de lead:** mesmos campos (Nome, WhatsApp, E-mail).
- **Automação GHL:** idêntica — mesma tag `lead_quiz` no fim, mesmo pipeline "Leads do Quiz", mesma cadência de follow-up. (Só marcar a origem: usar um `utm_content`/campo que identifique "quiz B" pra separar os leads na análise.)
- **Tracking:** mesmo GTM/eventos (`relatorio_view`/`submit_application`) — só garantir que a versão B dispare os mesmos eventos.

---

## LANDING / HERO (v B) — a mudança mais importante

**Tag superior (pré-qualificação explícita):**
PARA MENTORES, COACHES E TREINADORES QUE JÁ FATURAM +R$30 MIL/MÊS

**Título:**
Você construiu uma mentoria que funciona. E bateu num teto que mais esforço não resolve.

**Subtítulo:**
Em menos de 2 minutos, este diagnóstico mostra por que o seu faturamento travou — mesmo com agenda cheia e resultado comprovado — e qual é o próximo movimento pra romper esse teto sem trabalhar mais.

**Microtexto abaixo do botão (reforça o filtro):**
Feito para quem já vive de mentoria/consultoria e quer parar de operar como mentor pra operar como empresário da educação. Se você ainda está começando, este diagnóstico não é pra você.

**Botão:** Começar meu diagnóstico →

*(Racional: o hero já nomeia o avatar e a dor central. Quem fatura menos de 30k tende a não se identificar e sai — isso é bom, melhora qualidade. Quem é o ICP se vê no espelho e entra com intenção.)*

---

## AS 7 PERGUNTAS (v B)

> Padrão de cada tela: **pergunta** + uma **micro-linha de tensão/contexto** abaixo (é o que dá o tom "jugular + desejo" sem alongar). As opções carregam a linguagem do público.

### PERGUNTA 1 — Situação
**Como funciona a entrega da sua mentoria hoje?**
*(micro-linha: A forma como você entrega hoje já define o teto que você vai bater amanhã.)*
- Sessões individuais, uma a uma, conforme a agenda permite
- Programa fechado com começo, meio e fim (3, 6, 12 meses)
- Clube/grupo com membros recorrentes
- Um mix de individual com grupo, dependendo do cliente

### PERGUNTA 2 — Problema (o gargalo)
**Qual desses é o gargalo que mais trava o seu crescimento hoje?**
*(micro-linha: Quase todo mentor que fatura bem trava em um destes quatro — e quase nenhum sabe qual é o próprio.)*
- Não tenho previsibilidade: não sei de onde vem o próximo cliente
- Meu ticket é menor do que o valor que eu realmente entrego
- Só cresço se eu trabalhar mais — e já não tem mais hora na agenda
- Não tenho clareza de qual modelo de negócio faz sentido agora

### PERGUNTA 3 — Implicação (o custo real)
**E o que esse gargalo já está te custando na prática?**
*(micro-linha: Todo mês que ele continua sem solução, o custo se acumula — e a maioria nem percebe o tamanho da conta.)*
- Minha receita estagnou, mesmo com a agenda lotada
- Dependo de indicação e networking pra fechar — sem controle nenhum
- Passo o dia na operação e quase nada em estratégia
- Sei que preciso escalar, mas não sei qual é o próximo passo certo

### PERGUNTA 4 — Necessidade (o que já tentou)
**O que você já tentou pra destravar isso — e não resolveu de vez?**
*(micro-linha: Se você já tentou de tudo e o teto continua lá, o problema provavelmente não é o que você acha que é.)*
- Aumentei o preço — ajudou um pouco, mas o modelo continua o mesmo
- Criei um grupo pra escalar — mas a entrega ficou genérica ou o ticket caiu
- Investi em tráfego/marketing — veio lead, mas a conversão foi baixa
- Ainda não parei pra estruturar isso de forma séria

### PERGUNTA 5 — Objetivo (o desejo)
**Se o teto fosse embora nos próximos 12 meses, qual seria a sua meta?**
*(micro-linha: A resposta aqui revela se você ainda pensa como mentor — ou se já começou a pensar como empresário.)*
- Romper os R$100k/mês com consistência (e sustentar isso)
- Faturar mais trabalhando MENOS horas por semana
- Transformar minha mentoria num negócio de educação de verdade
- Subir meu ticket sem perder clientes no caminho

### PERGUNTA 6 — Perfil
**Qual dessas frases mais parece com você hoje?**
*(micro-linha: Cada perfil tem um próximo passo diferente — por isso o diagnóstico é individual.)*
- Já atuo como mentor/coach/consultor e quero escalar ou mudar o modelo
- Sou empresário estabelecido e quero criar/estruturar uma mentoria
- Sou reconhecido no meu nicho, mas nunca monetizei isso como mentor
- Ainda estou começando a construir minha presença como mentor

### PERGUNTA 7 — Qualificação financeira *(IDÊNTICA À A — não alterar, é o filtro-métrica)*
**Qual é o seu faturamento médio mensal com mentoria e/ou consultoria?**
*(micro-linha: Essa informação define o tipo de diagnóstico e o próximo passo que vamos te entregar.)*
- Abaixo de R$20.000
- Entre R$20.000 e R$50.000
- Entre R$50.000 e R$100.000
- Entre R$100.000 e R$300.000
- Entre R$300.000 e R$500.000
- Acima de R$500.000

---

## CAPTURA DE LEAD (v B)
**Título:** Seu diagnóstico está pronto.
**Subtítulo:** Preencha para receber a análise completa do seu momento — e o próximo passo pro seu caso específico.
- Nome completo *
- WhatsApp com DDD *
- E-mail
**Botão:** Ver meu diagnóstico agora →
**Aviso:** Seus dados são usados só para te entregar o diagnóstico. Sem spam, sem compartilhar com terceiros.

---

## SINCRONIA ANÚNCIO → QUIZ → RELATÓRIO
Pra o teste ser justo e a comunicação "bater na veia", cada anúncio que aponta pra versão B deve abrir a **mesma dor** que a Pergunta 2/3 nomeia. Sugestão de pareamento (usar os criativos já escritos):
- Ângulo "dependência de indicação" → conversa com Q2 opção 1 e Q3 opção 2.
- Ângulo "ticket abaixo do valor" → Q2 opção 2.
- Ângulo "agenda cheia/faturamento parado" → Q2 opção 3 + Q3 opção 1.
Assim o lead entra no quiz já com a dor "aberta" pelo anúncio e encontra ela nomeada de novo — sensação de "isso é sobre mim".

---

## PARÂMETROS DO TESTE A/B
- **Split:** 50/50 do tráfego (ou campanhas espelhadas, uma apontando pra A e outra pra B).
- **Manter tudo constante** exceto o quiz: mesmos criativos/ângulos nos dois lados, mesmo público, mesma verba. Só assim o resultado isola a variável "narrativa do quiz".
- **Marcar a origem:** garantir que os leads de B cheguem no CRM identificáveis (ex.: `utm_content` com sufixo `-quizB`, ou um campo oculto no form) — senão não dá pra separar na análise.
- **Métrica primária:** % de leads qualificados (faturamento ≥R$30k na P7) **e** taxa de agendamento. Métrica secundária: volume total e CPL.
- **Critério de decisão:** B vence se entregar **mais leads qualificados agendando**, mesmo que o volume bruto seja igual ou um pouco menor. Volume de lixo não conta como vitória.
- **Duração mínima:** ~2 semanas ou ~30-40 leads por versão (o que vier primeiro) — não decidir antes, amostra pequena engana.
- ⚠️ Lembrar do contexto de tracking: o baseline de conversão só ficou limpo em 11/07. Rodar o A/B a partir de agora já usa tracking correto nos dois lados — ok.

---

## Implementação
- É mudança de **código do app** (mesmo projeto Vercel `simpleacc`, sem repo Git conectado). O dev duplica a versão atual, troca os textos por estes, mantém design/eventos/automação, e publica numa rota/deploy separado pro split.
- Se conectarem esse projeto Vercel ao Git, eu consigo fazer essa alteração direto no código em vez de entregar só a copy.
