# Diagnóstico de dados — MQLs do quiz (ÚNICOS Club)

> **Base autoritativa:** `materiais/leads-76-mqls.csv` — os **76 leads com
> faturamento > R$ 1M**, com contato completo.
> O export completo (`leads-organizados.csv`, 472 linhas) tem muitos campos
> faltantes e **não é usado como base de conclusão** — fica só como material
> bruto. Reprodução: `python3 materiais/analise-leads.py`.

## Veredito

Existem **76 MQLs reais** (faturamento > R$ 1M) que **já deixaram nome, e-mail e
WhatsApp** e clicaram para receber o diagnóstico — **66 deles dentro do ICP** (a
Carol não atende indústria). Pela queixa do José, **esses leads nunca foram
contatados / nunca chegaram ao GHL**. Ou seja: o gargalo **não é gerar lead
qualificado** — ele já entrou e está com contato completo. O gargalo é o
**handoff/integração**: leads bons capturados que não chegam ao comercial.

## Os 76 MQLs em números

Todos os 76 têm **nome + e-mail + WhatsApp** preenchidos (100%) e clicaram em
"receber diagnóstico".

**Faturamento (todos > R$ 1M):**

| Faixa | Leads |
| --- | ---: |
| Acima de R$ 5M | 33 |
| Entre R$ 1M e R$ 3M | 28 |
| Entre R$ 3M e R$ 5M | 15 |

**Setor:**

| Setor | Leads |
| --- | ---: |
| Prestação de serviços | 37 |
| Comércio / e-commerce | 29 |
| Indústria (a Carol **não atende** → excluir) | 10 |

→ **66 MQLs dentro do ICP** (fora da indústria).

**Cargo:**

| Cargo | Leads |
| --- | ---: |
| Gestor, com autonomia parcial | 27 |
| Promovido recentemente / pouca autonomia | 19 |
| Diretor ou gerente com autonomia decisória | 15 |
| Dono ou sócio | 15 |

→ **30 decisores** (dono/sócio + diretor c/ autonomia decisória); **26 são, ao
mesmo tempo, ICP e decisor** — é o alvo prioritário.

**Distribuição geográfica:** espalhada pelo Brasil, concentrada no eixo
Sul-Sudeste (DDDs mais comuns: 11-SP, 21-RJ, 51-RS, 41/47-PR-SC, 19-SP).

## A pista do "porquê não chegou"

No arquivo dos 76, o contato (nome/e-mail/WhatsApp) está gravado nos campos
`field: e02yKB / Oen6ic / UX3WQn` — e **nenhum** dos 76 preencheu o campo de
contato "primário" (`field: nome`). Isso sugere que o formulário do público
> R$ 1M grava o contato num **conjunto de campos diferente**, que provavelmente
**não está mapeado para o GHL** — o que explica os "leads que nunca receberam
mensagem" relatados pelo José e bate com a falha de integração InLead→GHL
levantada em 17/06.

> A confirmar (tarefa técnica): abrir a config do InLead + automação do GHL e
> verificar por que esse conjunto de campos não sincroniza. É a verificação nº 1.

## Ressalvas honestas

- **A lista completa (200+) não é confiável** para conclusão: muitos leads sem
  faturamento, sem setor e sem contato. Por isso o diagnóstico se apoia nos 76.
- **Faturamento é autodeclarado** e por faixa — não dá média/mediana significativa
  (e o José já viu que parte de quem marca ">5M" é funcionário reportando o
  faturamento da empresa, ou perfil sem rastro). Por isso priorizamos por
  **cargo** (decisor) e validaremos uma **amostra** antes da ação em massa.

## Implicações diretas para o plano

- **Prioridade nº 1 (técnica):** descobrir por que o contato desses leads não
  chega ao GHL e **subir os 76 para o GHL com tag de origem**. Isso sozinho já
  destrava o ICP que entrou.
- **Passo 2 (caixa rápido):** os 76 (66 no ICP, 26 ICP+decisor) têm WhatsApp e
  e-mail → são o **alvo direto da reativação**, junto com a base de clientes
  ativos. Começar pelos 26 ICP+decisor; validar amostra antes de escalar.
- **Passo 3 (ajuste de funil):** unificar a captura de contato num **único campo
  mapeado**, ancorar a pergunta de faturamento à **posição do respondente** e
  reposicionar a comunicação para o **executivo/dono**.
