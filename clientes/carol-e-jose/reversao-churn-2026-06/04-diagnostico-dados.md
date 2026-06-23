# Diagnóstico de dados — base de leads do quiz (ÚNICOS Club)

> Base analisada: `materiais/leads-organizados.csv` (export do quiz/InLead).
> Reprodução: `python3 materiais/analise-leads.py`.
> Alimenta o **Passo 1 (Diagnóstico)** do plano do Daniel.

## Veredito

O funil **não tem um problema de volume nem de "MQL%"** — tem um problema de
**contatabilidade invertida**: quem deixa o contato é majoritariamente quem está
**fora** do ICP, e quem está dentro do ICP **não deixa contato**. A métrica de
"40% de MQL" que o tráfego reporta é uma **métrica de vaidade**: mede quem
*marcou* faturamento alto, não quem o José *consegue trabalhar*.

## Os números

Base: **472 leads** no arquivo. Apenas **117 (25%)** deixaram nome + WhatsApp
(ou seja, clicaram para receber o diagnóstico). Os outros 75% abandonaram antes
do contato (217 nem responderam o faturamento).

### O achado central — contatabilidade cai conforme o faturamento sobe

| Faturamento declarado | Total | Deixaram WhatsApp | % contatável |
| --- | ---: | ---: | ---: |
| Até R$ 500 mil | 66 | 37 | **56,1%** |
| R$ 500 mil – 1M | 53 | 38 | **71,7%** |
| R$ 1M – 3M | 48 | 4 | 8,3% |
| R$ 3M – 5M | 29 | 1 | 3,4% |
| Acima de R$ 5M | 60 | 1 | **1,7%** |
| (em branco) | 217 | 36 | 16,6% |

Lê-se de cima para baixo: **quanto maior o faturamento, menor a chance de o lead
deixar contato.** O público abaixo de R$ 1M deixa WhatsApp em 56–72% dos casos;
o público acima de R$ 5M, em **1,7%**.

### A consequência prática

- **ICP real** (faturamento > R$ 1M **e** não-indústria): **114 leads** na base.
- Desses 114, **apenas 3** deixaram contato. Os outros **111 estão "presos"** na
  base sem telefone/e-mail para o comercial trabalhar.
- Dos **117 contatáveis** que o José efetivamente consegue abordar, **só 3** são
  ICP. O resto (≈97%) é abaixo de R$ 1M ou em branco — exatamente os
  "balconista de farmácia / líder de mercearia" que ele relatou.

Por cargo, entre os 117 contatáveis: 34 "dono/sócio", 33 "promovido há pouco /
pouca autonomia", 26 "gestor com autonomia parcial", 24 "diretor/gerente". Ou
seja, mesmo entre os contatáveis o decisor real (dono/sócio) é minoria.

### Faturamento declarado — por que a média engana

Proxy pelo ponto médio de cada faixa (N=256 que responderam): média R$ 2,69 mi,
mediana R$ 2,0 mi, desvio R$ 2,64 mi. **Parece ótimo** — e é justamente a
armadilha. A média/mediana altas escondem que o faturamento declarado **não tem
correlação com o lead ser abordável nem real**. José já validou no Perplexity/
Comet que vários que marcaram R$ 5M "não existem" online ou são funcionários que
preencheram o faturamento *da empresa onde trabalham*, não o próprio.

## Hipóteses (a confirmar, em ordem de força)

1. **Autosseleção comportamental (mais forte).** Curioso/funcionário de baixo
   ticket não tem nada a perder e entrega o WhatsApp; o dono de empresa real é
   cético, protege o contato e abandona no passo de captura. O funil está
   filtrando *a favor* do perfil errado exatamente na etapa do contato.
2. **Comunicação aberta demais.** Anúncio e quiz falam com "líder" de forma
   genérica e atraem cargo operacional. Falta excluir quem não é decisor logo na
   abertura (modelar pelo concorrente que já vende para esse público).
3. **Faturamento autodeclarado sem âncora.** A pergunta deixa o lead reportar o
   faturamento *da empresa* sem amarrar à posição dele — infla a faixa e
   contamina o "MQL".
4. **Resíduo técnico (a descartar com dado).** A falha de integração InLead→GHL
   discutida em 17/06 explica leads "perdidos", mas **neste export os 111 ICP
   simplesmente não deixaram WhatsApp no próprio quiz** — então o gap é
   majoritariamente de funil/comportamento, não só de integração. Vale conferir
   se algum ICP deixou contato e se perdeu na integração.

## O que o dado NÃO permite concluir ainda

- Qual **criativo/campanha** específico traz o lead ruim (o CSV tem `utm_term`/
  `utm_campaign` — dá para quebrar por anúncio, mas exige cruzar com gasto por
  campanha do gerenciador, que não está neste arquivo).
- Se os 111 ICP sem contato são **reativáveis** (precisaria de e-mail/pixel para
  remarketing — WhatsApp não há).

## Implicações diretas para o plano

- **Passo 2 (caixa rápido):** a base abordável por WhatsApp são os **117
  contatáveis** (priorizar os 34 dono/sócio) + a base de **clientes ativos** —
  não os 111 ICP (sem telefone). Reativação dos ICP é via remarketing/conteúdo.
- **Passo 3 (ajuste de funil):** o problema a resolver é **capturar contato do
  ICP**, não gerar mais volume. Travar/excluir quem não é decisor na abertura,
  ancorar a pergunta de faturamento à posição do respondente, e reposicionar a
  oferta do quiz para o executivo/dono.

> Nota sobre "os 76 MQLs": o arquivo recebido (`...corrigidos...`) tem 472 leads
> / 117 contatáveis. O número "76" citado em reunião parece ser do export
> anterior (menor). **Confirmar com o time qual recorte corresponde aos 76**
> para não misturar bases ao montar a ação de reativação.
