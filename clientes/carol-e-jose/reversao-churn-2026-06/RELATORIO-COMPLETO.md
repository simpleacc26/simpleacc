# Relatório completo — Reversão de churn · Carol e José (ÚNICOS Club)

**Data:** 23/06/2026 · **Autor:** Simple Acc · **Risco:** churn + chargeback ~R$ 40 mil.

Este relatório consolida, num único lugar, o que foi pedido:
1. Resumo da situação
2. Diagnóstico de dados (o achado central)
3. Lista de **todas as tarefas em aberto** com responsável (ou "a definir")
4. O que o **José** espera e o que precisamos entregar

> Documentos de apoio na mesma pasta: `01-resumo-da-situacao.md`,
> `04-diagnostico-dados.md`, `02-tarefas-em-aberto.md`, `03-expectativas-jose.md`,
> e `materiais/` (transcrições, planilhas e script de análise).

---

## 1. Resumo da situação

O cliente está **frustrado, mas não decidido a cancelar**. Indo para a metade do
contrato (6º mês), foram investidos **~R$ 40 mil** desde o fechamento (18/02) com
**zero venda** e quase nenhuma reunião qualificada. O CEO (Daniel) assumiu fazer
um diagnóstico hoje e enviar a resposta a Carol e José **amanhã de manhã**.

A reunião de hoje teve duas fases: (1) com o cliente (José, desabafo) e (2)
interna (Daniel, Carlos, Renan), onde foi definido o plano de ação.

**A dor do José:**
- ~R$ 40 mil investidos, zero retorno; menos de 1% dos leads respondem.
- Leads fora do ICP (cargos operacionais ganhando R$ 2–5 mil que marcam o
  faturamento da empresa onde *trabalham*).
- WhatsApp dele foi **bloqueado** de tanto forçar contato.
- Ajustes demoram demais (10–15 dias para uma campanha simples).
- Falhas de processo da agência: leads que nunca entraram no GHL, mensagens "não
  enviadas", ausência de **ata** com prazos/responsáveis, GHL subutilizado.
- Ele quer clareza: **o que será feito, como, o que se espera e quando**.

**O plano do Daniel (espinha dorsal da resposta) — 3 passos:**
1. **Diagnóstico** (métricas de tráfego + comercial + base, estilo "Fernanda Face").
2. **Plano de caixa rápido** (rentabilizar base + clientes atuais).
3. **Ajuste de funil** (nova comunicação/quiz para executivo/dono).

**Histórico (17/06):** já havia sido identificada a falha de integração
InLead→GHL, decidido redirecionar <R$1M para a comunidade gratuita e planejada a
reativação da base. Ou seja: o tema vem sendo discutido há semanas — daí a
urgência de **sair do diagnóstico para a execução, com ata e responsáveis**.

---

## 2. Diagnóstico de dados — o achado central

Base: **472 leads** do quiz + recorte **"só os 76"** (>R$1M).
Reprodução: `python3 materiais/analise-leads.py`.

### Veredito

Os **76 leads de maior valor (>R$1M) JÁ deixaram WhatsApp e e-mail** — mas o
contato deles é capturado num **segundo conjunto de campos do quiz que não chega
ao GHL/comercial**. Por isso o José só consegue abordar lead de baixo valor: o
contato do ICP **existe, mas está silado**. É majoritariamente um problema
**técnico (mapeamento de campos + integração InLead→GHL)**, não de "lead que não
responde".

### A prova: cada faixa de faturamento usa um campo diferente

| Faturamento | Campo primário (`whatsapp`) | Campo secundário (`UX3WQn`) |
| --- | ---: | ---: |
| Até R$ 500 mil | 37 | 0 |
| R$ 500 mil – 1M | 38 | 0 |
| R$ 1M – 3M | 4 | 28 |
| R$ 3M – 5M | 1 | 15 |
| Acima de R$ 5M | 1 | 33 |

Quem fatura **≤ R$ 1M cai no campo primário** (que o José vê); quem fatura
**> R$ 1M cai no campo secundário** (os 76, silados).

### A contatabilidade NÃO é o gargalo

Auditando os dois campos juntos, a taxa de quem deixa WhatsApp é parecida em
todas as faixas (56–72%). O ICP deixa contato tanto quanto o público de baixo
valor — total de **193 contatáveis** (117 primário + 76 secundário). O problema
nunca foi "o ICP não deixa telefone"; foi **para onde esse telefone vai**.

### Os 76 MQLs (ativo para reativar agora)

- **Faturamento:** 33 acima de R$ 5M · 28 entre 1–3M · 15 entre 3–5M.
- **Setor:** 37 serviços · 29 comércio · **10 indústria** (excluir) → **66 no ICP**.
- **Cargo:** 27 gestor c/ autonomia parcial · 19 promovido há pouco · 15
  diretor/gerente c/ autonomia · **15 dono/sócio**.
- Todos têm WhatsApp + e-mail e clicaram para receber o diagnóstico; muitos
  **nunca receberam mensagem**.

> Ressalva: o José já validou que parte de quem marca ">5M" é funcionário ou
> perfil sem rastro. Priorizar por cargo (dono/sócio, diretor c/ autonomia) e
> validar uma amostra antes da ação em massa.

> Correção registrada: uma leitura inicial (só o campo primário) sugeria "só 3
> ICP contatáveis / contatabilidade invertida". Auditando os dois campos, são
> **69 dos 114 ICP contatáveis**. Fica o lembrete de auditar o dado antes de
> concluir.

---

## 3. Todas as tarefas em aberto (ata de alocação)

Legenda Simple: **Carlos** (gestão de conta), **Renan** (tráfego/dados/GHL),
**Daniel** (CEO). Cliente: **Carol**, **José**. Sem dono = **A DEFINIR**.

### Passo 1 — Diagnóstico (base até 20h hoje; entrega ao cliente amanhã de manhã)

| # | Tarefa | Responsável | Status |
| --- | --- | --- | --- |
| 1.1 | Diagnóstico de métricas tráfego + comercial (estilo "Fernanda Face") | Carlos + Renan | Aberta — até 20h |
| 1.2 | Análise estatística da base (média, mediana, desvio, distribuição) | Renan (+ Carlos) | **Adiantada** neste relatório; validar |
| 1.3 | Mapear o ICP real cruzando transcrições + clientes que já compraram | O grupo | Aberta |
| 1.4 | Comparar transcrições das reuniões (prometido x feito) | Carlos (c/ Cláudio) | Aberta |
| 1.5 | Diagnóstico final + redação para o cliente | Daniel | Aberta — amanhã |

### Passo 2 — Plano de caixa rápido

| # | Tarefa | Responsável | Status |
| --- | --- | --- | --- |
| 2.1 | Workshop com a base para vender **curso gravado** | Carol | Aberta |
| 2.2 | Oferta de **expansão de valor** para clientes ativos | Carol | Aberta |
| 2.3 | Ação de **indicação** (modelo Fusseus) | Carol + Carlos | Aberta |
| 2.4 | Reativação dos **76 MQLs** (têm WhatsApp/e-mail) + clientes ativos | Renan + Carol | Aberta |
| 2.5 | Priorizar por cargo (15 dono/sócio + 15 diretor); validar amostra antes | Carol | Aberta |

### Passo 3 — Ajuste de funil

| # | Tarefa | Responsável | Status |
| --- | --- | --- | --- |
| 3.1 | Pesquisa concorrencial (biblioteca de anúncios) | O grupo | Aberta |
| 3.2 | 1ª versão do **novo quiz** focado em executivo/dono | O grupo | Aberta — até 20h |
| 3.3 | Reescrever comunicação excluindo não-decisor na abertura | Carlos + Renan | Aberta |
| 3.4 | Ancorar pergunta de faturamento à **posição do respondente** | Renan | Aberta |
| 3.5 | Redirecionar < R$ 1M para a comunidade gratuita | Renan | Aberta (17/06) |
| 3.6 | Novos criativos com corte de público **2M+** | Renan | Em produção |
| 3.7 | Revisar Diagnóstico de Maturidade (estética + análise das respostas) | Carlos / José | Aberta |
| 3.8 | Lead scoring — validar pontuação | Carlos | Aberta |
| 3.9 | Redirecionamento para WhatsApp ao concluir o diagnóstico | O grupo | Aberta (17/06) |
| 3.10 | Revisar follow-up de 14 dias + templates (IA) | Carol / Carlos | Aberta |

### Governança e operação (cobrado pelo José)

| # | Tarefa | Responsável | Status |
| --- | --- | --- | --- |
| G.1 | Criar **ata padrão** (prazo + responsável) — este documento é o início | A DEFINIR | Aberta |
| G.2 | Investigar por que o **campo secundário não chega ao GHL** + corrigir integração | Renan | **Prioridade máxima** |
| G.3 | Subir os **76 MQLs** ao GHL com tag de origem | Renan | Aberta |
| G.4 | Unificar a captura de contato do quiz num campo só mapeado | Renan | Aberta |
| G.5 | Setar o **GHL completo** (automações, tags, funil, integrações) | A DEFINIR | Aberta |
| G.6 | Tag "leads perdidos" no GHL | Renan | Aberta |
| G.7 | Acordar **SLA de implementação** (acabar com os 10–15 dias) | A DEFINIR (Carlos) | Aberta |
| G.8 | Verificar crédito de R$ 2.000 (indicação Rafael Miranela) | Carlos | Aberta |
| G.9 | Carol enviar histórico de conversas testadas | Carol | Aberta |

**Já resolvidas:** exportar/compartilhar planilha de leads; auditoria export × GHL (17/06, confirmou a falha G.2).

---

## 4. O que o José espera — e o que precisamos entregar

### O que o José gostaria

1. **Estratégia clara, não tentativa** — o quê, como, o que se espera e quando.
2. **Lead dentro do ICP** — executivo/dono que fatura >R$1–2M, não cargo operacional.
3. **Velocidade** — ajustes não podem levar 10–15 dias.
4. **A casa setada pela agência** — GHL organizado, métricas integradas num lugar só.
5. **Governança / ata** — registro com prazo e responsável.
6. **Sustentação, não só paliativo** — a ação de caixa "acalma o coração", mas
   ele precisa do funil consertado para sustentar o programa.
7. **Reverter antes da metade do contrato** — a chave precisa virar agora.

### O que entregamos (ligado ao plano)

| Expectativa | O que entregamos | Onde no plano |
| --- | --- | --- |
| Estratégia + prazos | Diagnóstico em dados + plano com donos e datas (este relatório) | Passo 1 + seção 3 |
| Lead no ICP | Novo quiz mirando executivo/dono; corrigir captura; ancorar faturamento | Passo 3 (3.1–3.5) |
| Velocidade | Quiz + criativos até 20h hoje; acordar SLA | Passo 3 + G.7 |
| GHL setado | Corrigir integração, trazer os 76, tags, automações | G.2–G.6 |
| Governança | Adotar este relatório como ata-modelo | G.1 |
| Sustentação | Funil que captura e entrega o contato do ICP ao comercial | Passo 3 |
| Caixa agora | Workshop/curso, oferta de expansão, indicação, reativar os 76 | Passo 2 |
| Reverter churn | Entregar tudo amanhã de manhã + cadência semanal de métrica | Passo 1 |

### Leitura honesta para alinhar internamente

- A maior parte das expectativas é **legítima e resolvível** — o diagnóstico
  mostra que o contato do ICP **já existe**; falta destravar a captura/integração.
  É o "b.o simples de resolver" do Daniel.
- O ponto mais sensível **não é técnico, é de confiança**: atrasos + falta de ata
  + integração quebrada corroeram a percepção. Entregar **clareza, prazo e dono**
  vale tanto quanto o ajuste de mídia.
- A ação de caixa rápido tem que sair **junto** com a promessa de funil — sozinha,
  o José já avisou que não segura o contrato.
