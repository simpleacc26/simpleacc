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

**Base autoritativa:** a lista dos **76 MQLs** (>R$1M, com contato completo). O
export de 200+ leads tem muitos campos faltantes e **não é base de conclusão**.
Reprodução: `python3 materiais/analise-leads.py`.

### Veredito

Existem **76 MQLs reais (>R$1M)** que **já deixaram nome, e-mail e WhatsApp** e
clicaram para receber o diagnóstico — **66 deles no ICP** (a Carol não atende
indústria). Pela queixa do José, **esses leads nunca foram contatados / nunca
chegaram ao GHL**. O gargalo **não é gerar lead qualificado** — ele já entrou,
com contato completo. O gargalo é o **handoff/integração**: lead bom capturado
que não chega ao comercial.

### Os 76 MQLs em números (todos com nome + e-mail + WhatsApp)

| Faturamento | Leads | Setor | Leads | Cargo | Leads |
| --- | ---: | --- | ---: | --- | ---: |
| Acima de R$ 5M | 33 | Serviços | 37 | Gestor c/ autonomia parcial | 27 |
| R$ 1M – 3M | 28 | Comércio | 29 | Promovido / pouca autonomia | 19 |
| R$ 3M – 5M | 15 | Indústria (excluir) | 10 | Diretor c/ autonomia | 15 |
| | | | | Dono ou sócio | 15 |

- **66 MQLs no ICP** (fora da indústria).
- **30 decisores** (dono/sócio + diretor c/ autonomia); **26 são ICP + decisor**
  = alvo prioritário.

### A pista do "porquê não chegou"

No arquivo dos 76, o contato está gravado nos campos `e02yKB/Oen6ic/UX3WQn` e
**nenhum** dos 76 usou o campo de contato primário. Isso sugere que o formulário
do público > R$ 1M grava o contato num **conjunto de campos que não está mapeado
para o GHL** — explica os "leads que nunca receberam mensagem" e bate com a falha
InLead→GHL de 17/06. **Verificação técnica nº 1.**

> Ressalva: faturamento é autodeclarado e por faixa (parte de quem marca ">5M" é
> funcionário ou sem rastro). Por isso priorizamos por **cargo** e validamos uma
> **amostra** antes da ação em massa.

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
