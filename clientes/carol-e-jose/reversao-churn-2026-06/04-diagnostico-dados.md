# Diagnóstico de dados — base de leads do quiz (ÚNICOS Club)

> Bases analisadas: `materiais/leads-organizados.csv` (export completo, 472
> leads) e `materiais/leads-76-mqls.csv` (recorte "só os 76", >R$1M).
> Reprodução: `python3 materiais/analise-leads.py`.
> Alimenta o **Passo 1 (Diagnóstico)** do plano do Daniel.

## Veredito

Os **76 leads de maior valor (faturamento > R$ 1M) JÁ deixaram WhatsApp e
e-mail** — mas o contato deles foi capturado num **segundo conjunto de campos do
quiz** que **não chega ao comercial / ao GHL**. É por isso que o José só
"enxerga" e só consegue abordar lead de baixo valor: o contato do ICP existe,
mas está **silado** num formulário paralelo. Isto é majoritariamente um problema
**técnico/de funil (mapeamento de campos + integração InLead→GHL)**, não de
"lead que não responde".

> Correção de uma análise anterior: olhando só o conjunto de campos primário
> (`field: whatsapp`), parecia que só 3 leads do ICP eram contatáveis. **Isso
> estava errado** — o ICP preenche o conjunto secundário. Auditando os dois
> campos, **69 dos 114 leads do ICP são contatáveis**. Fica registrado como
> lembrete de auditar o dado antes de concluir.

## A prova: cada faixa de faturamento preenche um campo diferente

O quiz tem **dois conjuntos de campos de contato**:

- **Primário:** `field: nome` / `field: email` / `field: whatsapp`
- **Secundário:** `field: e02yKB` / `field: Oen6ic` / `field: UX3WQn`

E o preenchimento **se divide exatamente na faixa de R$ 1M** (é uma ramificação/
versão de formulário diferente para cada faixa):

| Faturamento | Usou campo primário | Usou campo secundário |
| --- | ---: | ---: |
| Até R$ 500 mil | 37 | 0 |
| R$ 500 mil – 1M | 38 | 0 |
| R$ 1M – 3M | 4 | 28 |
| R$ 3M – 5M | 1 | 15 |
| Acima de R$ 5M | 1 | 33 |

Ou seja: quem fatura **≤ R$ 1M cai no campo primário**; quem fatura **> R$ 1M
cai no campo secundário** (os 76). Como só o conjunto primário parece estar
chegando ao GHL, o comercial recebe quase exclusivamente o público de baixo
valor — o "balconista / líder de mercearia" que o José relatou.

## A contatabilidade NÃO é o gargalo

Auditando os **dois** campos juntos, a taxa de quem deixa WhatsApp é parecida em
todas as faixas — o ICP deixa contato tanto quanto o público de baixo valor:

| Faturamento | Total | Contatável (qualquer campo) | % |
| --- | ---: | ---: | ---: |
| Até R$ 500 mil | 66 | 37 | 56,1% |
| R$ 500 mil – 1M | 53 | 38 | 71,7% |
| R$ 1M – 3M | 48 | 32 | 66,7% |
| R$ 3M – 5M | 29 | 16 | 55,2% |
| Acima de R$ 5M | 60 | 34 | 56,7% |
| (em branco) | 217 | 36 | 16,6% |

Total: **193 leads contatáveis** (117 no campo primário + 76 no secundário, sem
sobreposição). O problema nunca foi "o ICP não deixa telefone" — foi **para onde
esse telefone vai**.

## Os 76 MQLs (o ativo para reativar agora)

O arquivo "só os 76" = todos os leads **> R$ 1M com contato capturado** (no campo
secundário). Composição:

- **Faturamento:** 33 acima de R$ 5M · 28 entre 1–3M · 15 entre 3–5M.
- **Setor:** 37 prestação de serviços · 29 comércio/e-commerce · **10 indústria**
  (que a Carol não atende → excluir) → sobram **66 MQLs no ICP**.
- **Cargo:** 27 gestor c/ autonomia parcial · 19 promovido há pouco (pouca
  autonomia) · 15 diretor/gerente c/ autonomia · **15 dono/sócio**.

**Todos os 76 têm WhatsApp e e-mail** e clicaram para receber o diagnóstico — e,
pela queixa do José, muitos **nunca receberam uma mensagem sequer**. São o alvo
imediato da ação de reativação/caixa rápido.

> Ressalva de qualificação (válida): o José já checou no Perplexity/Comet que
> parte de quem marca ">R$ 5M" é funcionário reportando o faturamento *da
> empresa onde trabalha*, ou perfil sem rastro (possível fake). Então dos 66 nem
> todos converterão — mas têm contato e estão dentro do critério declarado.
> Priorizar por cargo (dono/sócio e diretor c/ autonomia) e por rastreabilidade.

## Faturamento declarado — a média engana

Proxy pelo ponto médio das faixas (N=256 que responderam): média ≈ R$ 2,69 mi,
mediana R$ 2,0 mi, desvio R$ 2,64 mi. Número "bonito" que não diz nada sozinho —
o que importa é que o valor declarado **não está amarrado à posição** de quem
responde, o que infla as faixas altas.

## Hipóteses (em ordem de força)

1. **Mapeamento de campos / integração (mais forte, e acionável já).** O
   formulário do ICP grava contato em campos (`e02yKB/Oen6ic/UX3WQn`) que não
   estão mapeados para o GHL. Bate com a falha InLead→GHL de 17/06 e com "leads
   com mensagem não enviada / que nunca receberam nada".
2. **Quiz com duas versões/ramos.** O split limpo em R$ 1M indica dois caminhos
   de captura. Unificar/auditar o formulário para que todo contato caia num só
   lugar mapeado.
3. **Qualificação autodeclarada sem âncora.** Ancorar faturamento à posição do
   respondente (dono vs. funcionário) para limpar as faixas altas.
4. **Comunicação aberta demais (funil).** Modelar pelo concorrente e excluir
   não-decisor na abertura — relevante para o Passo 3, mas não é a causa de o
   contato do ICP não chegar.

## O que o dado NÃO permite concluir ainda

- **Por que** o campo secundário não chega ao GHL (precisa ver a config do
  InLead + automação do GHL). É a verificação nº 1 a fazer.
- Qual **criativo/campanha** traz lead ruim (há `utm_campaign`/`utm_term` no CSV,
  mas falta o gasto por campanha do gerenciador para cruzar CAC).
- Quantos dos 76 são realmente alcançáveis (validar amostra antes da ação em
  massa, para não queimar a régua de novo).

## Implicações diretas para o plano

- **Prioridade nº 1 (técnica):** descobrir por que o contato do campo secundário
  não chega ao GHL e **trazer os 76 para o GHL com tag de origem** — isso
  sozinho destrava o ICP que já entrou.
- **Passo 2 (caixa rápido):** os 76 (66 no ICP) têm WhatsApp/e-mail → são o alvo
  direto de reativação, além da base de clientes ativos. Priorizar dono/sócio +
  diretor c/ autonomia.
- **Passo 3 (ajuste de funil):** unificar a captura de contato num campo só
  mapeado, ancorar faturamento à posição, reposicionar comunicação para o
  executivo/dono.
