---
name: quiz-pesquisa-estrategia
description: >
  Fase de Pesquisa & Estratégia da construção de um funil de quiz (Fábrica de Quiz Simple).
  Lê a matéria-prima do cliente (input contract + dados de pesquisa/Deep Dive + dados de performance, se houver),
  faz recon do mercado (YouTube, Instagram, LinkedIn, Biblioteca de Anúncios da Meta, Hotmart/Kiwify/Hubla),
  roda análise de ciência de dados pra achar padrões ocultos, DECIDE 3 a 5 buckets usando o critério high ticket
  (Dor + Urgência + Caixa × Facilidade de Provar), escolhe o tipo de quiz (Type/Killer/Score) e cria a
  Big Idea ancorada no produto do cliente e no comprador real. USE SEMPRE que for iniciar um quiz para um cliente,
  ou quando alguém disser "fazer a pesquisa do quiz", "definir os buckets", "qual tipo de quiz usar", "estratégia
  do quiz", "analisar o Deep Dive", "espiar o mercado do cliente", "qual a Big Idea do quiz", ou subir
  material de onboarding/pesquisa de um cliente para começar um funil de quiz. É a PRIMEIRA skill do
  pipeline — roda antes de perguntas, páginas ou ads.
---

# Skill 1 — Pesquisa & Estratégia do Quiz

Primeira etapa da Fábrica de Quiz Simple. Funciona pra **qualquer cliente high ticket**. Transforma a matéria-prima de um cliente em uma **estratégia de quiz decidida**: recon de mercado + voz do mercado + buckets + tipo de quiz + Big Idea. Tudo que vem depois (perguntas, páginas, ads) herda o que sai daqui — por isso esta é a raiz e a mais cuidadosa.

## Diretriz: decida com confiança; o estrategista revisa

Esta skill **decide os buckets** — não fica sugerindo timidamente. A análise de ciência de dados acha padrões ocultos na fala/dados do cliente melhor que um humano lendo à mão, e ela aplica o critério high ticket pra que a decisão seja comercialmente sólida, não só estatística.

O **estrategista** (quem roda a fábrica) revisa e pode sobrescrever — não porque a skill não saiba decidir, mas porque há coisas que o dado não vê: a **capacidade de entrega do cliente** e a **saturação do mercado**. Por isso: decisão confiante + raciocínio transparente + caminho de override.

## Fonte de verdade

Esta skill nasceu como parte da **Fábrica de Quiz**, cujo documento raiz é o
**Método-Mestre** (seções §0, §1, §3, §4 e §8). Se o Método-Mestre estiver
disponível, leia-o antes de executar: **se algo aqui conflitar com ele, o
Método-Mestre vence.**

> ⚠️ **O Método-Mestre ainda não está neste repositório.** Enquanto não estiver,
> esta skill é autossuficiente: a estrutura embutida aqui basta para decidir
> buckets, tipo de quiz e Big Idea. Se a pessoa enviar o Método-Mestre na
> conversa, use-o como fonte de verdade. Quando ele for versionado, o lugar é
> `metodo/metodo-mestre-quiz.md` na raiz do repositório, e este bloco vira o
> ponteiro direto.

## Input — e a PRIMEIRA coisa a cravar

A skill precisa do **input contract preenchido** (`clientes/[cliente]/input/input-contract.md`). Dois pontos inegociáveis:

1. **Matéria-prima de pesquisa (Bloco 3).** Transcrições de calls, objeções, depoimentos, DMs. **Se estiver vazio ou raso, PARE e peça.** Bucket inventado é o erro fatal nº 1. *(Se o cliente também tiver dados de performance — revenue ops, ROAS por narrativa, preditores de comprador vs. calote — leia junto; ver passo 5.)*
2. **A transformação única do cliente.** Crave com precisão: **o que o cliente vende, o mecanismo único dele, e a transformação de valor específica que entrega.** Isso ancora a Big Idea inteira. **Se a oferta não deixar isso cristalino, PARE e peça** — chutar o que o cliente entrega gera quiz genérico.

## O critério high ticket do bucket (use em toda decisão de bucket)

No high ticket, um bucket não é só um cluster de problema — tem que ter dinheiro e pressa atrás:

> **Avatar Ideal = (Dor Alta + Urgência Alta + Caixa Real) × Facilidade de Provar**

- **Dor** — tem a dor/desejo/frustração de verdade
- **Urgência** — precisa resolver agora, não "algum dia"
- **Caixa** — tem **$$$** pra pagar o ticket (sem isso, é lead bonito que não fecha)
- **× Facilidade de Provar** — quão fácil é demonstrar o resultado pra esse avatar

Pontue cada bucket nessas 4 dimensões (0-10). Dor alta com caixa baixo ou urgência baixa = bucket **fraco pra high ticket**. Priorize os de maior produto.

## O comprador REAL — em quem ancorar (e quem repelir)

O critério acima diz quão forte é um bucket. Este bloco diz em QUEM ancorar — e é onde a Big Idea ganha ou perde dinheiro no high ticket.

- **Dor de crescimento, não dor de queda.** O comprador ideal está estagnado e frustrado, MAS tem caixa e quer crescer (investe). Quem está em queda de faturamento sabe que precisa vender, mas não investe na crise. Os dois parecem "frustrado estagnado" — a postura de compra é oposta. Ancore na dor de crescimento.
- **A dor não discrimina — filtre por caixa.** Em muitos mercados, dor/desejo/nicho são iguais entre quem compra e quem não compra; o que separa é caixa, cargo, ticket próprio, já-roda-[mecanismo]. A Big Idea não pode vender só a dor — tem que **embutir um proxy de caixa** que só ressoa em quem pode pagar (ex.: "você já roda tráfego e trocou tudo", "você vende acima de R$X"). **Teste do Filtro:** se um descapitalizado se identifica igual, falta proxy de caixa. Big Idea boa **repele o quebrado pela própria âncora.**
- **Ancore no comprador real, não no sósia.** O avatar é definido por quem COMPRA, não por quem PARECE. (Caso real: um funil mirava "líderes" e atraía o gerente que ganha R$2k e parece o avatar — mas o comprador é o executivo que paga o preço do cargo.) A Big Idea carrega o **traço distintivo** que separa o comprador real do sósia.
- **Calibre no north-star (maior LTV), não no mais fácil de fechar.** Nomeie um cliente real de maior LTV/menor churn e calibre a Big Idea-mestra nele. Segmentos mais fracos (mais perto do calote) são pegos nos buckets/ads, nunca no gancho-mestre.
- **Se houver dado de comprador, perfile-o** (faturamento, cargo, ticket próprio, já-roda-[mecanismo] dos que fecharam vs. dos que não fecharam). O ouro é o **traço distintivo + os filtros duros**, mais que a distribuição precisa: high ticket tem amostra pequena, então média/mediana/desvio são **direcionais**, e o sinal costuma ser qualitativo. *(A versão pesada disso — análise estatística estruturada de comprador — é a futura "Skill 0 — Perfil do Comprador". Aqui, faça a versão leve se o dado existir; se não, infira do qualitativo.)*

## A âncora da Big Idea — o que separa específico de genérico (regra central)

A falha mais comum desta skill: a Big Idea sai **genérica** e atrai gente com dor e caixa mas **sem intenção de comprar ESTE produto**.

**Ancore no problema específico que SÓ o produto do cliente resolve — na linguagem da dor do prospect.** Não num resultado genérico ("faça R$X/mês"), nem necessariamente no nome-jargão do mecanismo. *(Validação Levesque: o gancho do ionizador de água era o medo do que tem na torneira — não "seu gargalo de ionização"; o do tênis era "o que está matando seu saque". Ele ancora no problema específico do produto, na emoção do prospect.)*

**Teste de Intencionalidade (gate obrigatório):**
> O gargalo/resultado que a Big Idea promete poderia ser resolvido por um produto que NÃO é o do cliente?

Se sim → genérica, **re-ancore no problema que só o produto resolve.**

**Largo só na pesquisa, específico no gancho.** O Deep Dive é aberto pra *descobrir* os buckets; o gancho é específico do produto. Não aplique a largura da pesquisa no gancho — foi esse o erro que gerou Big Idea genérica.

**Quão específico? Mais que o Levesque.** Ele vende infoproduto (volume importa, gancho mais largo, filtra nos buckets). High ticket por call é o oposto: cada lead sem intenção **queima call**. Então deslize pro lado da intenção — mais específico que o default do Levesque. *(Divergência Ask→Simple deliberada.)*

**Ressalva — não estreite até secar o tráfego frio.** Específico o bastante pra atrair intenção, largo o bastante pra ter mercado. Botão de ajuste:
- **Mecanismo nomeado/implícito no gancho** = intenção máxima, volume menor.
- **Dor que implica o mecanismo** = mais volume, intenção filtrada nos buckets e na P6.

Default high ticket: leve pra intenção. Mas confira o tamanho da poça de frio do nicho antes de estreitar demais.

**Ancore o herói na categoria que o cliente quer DOMINAR** (identidade + lane menos disputada), mesmo que a entrega seja mais ampla — e venda na língua do que o avatar QUER, entregando o que ele PRECISA por dentro do mecanismo. Não ancore numa categoria adjacente saturada só porque o cliente também resolve aquilo.

Frameworks: `references/big-idea.md` (a Big Idea em detalhe) e `references/lentes-mentores.md` (as lentes Hormozi × Brunson + o gate de dupla revisão).

## Workflow

1. **Ler o input + cravar a transformação única** — entender oferta, ICP, mecanismo único, próximo passo. Parar e pedir se Bloco 3 ou a transformação estiverem vagos.
2. **Recon de mercado** — espie o que o mercado JÁ oferece pro ICP: YouTube, Instagram, LinkedIn, **Biblioteca de Anúncios da Meta**, **Hotmart/Kiwify/Hubla**. Anote ângulos dominantes, Big Ideas em uso, promessas queimadas, lacunas, linguagem do mercado. *(Versão profunda: skill `pd-content-market-intelligence`.)*
3. **Extrair a voz do mercado** — 20-25 frases reais, nas palavras EXATAS do cliente (literal, não parafraseado).
4. **Identificar hiper-responsividade** — priorizar as expressões mais longas e intensas de dor. São esses que viram comprador.
5. **Análise de ciência de dados** — cruzar fala + dados pra achar **padrões ocultos** (correlações dor/comportamento/perfil que não saltam à vista). **Se houver dados de performance**, ranqueie narrativas por **caixa coletado** (não CPL/CAC — o CAC engana), liste os preditores de bom cliente vs. calote, e cheque se o gargalo do funil é **mensagem** (atrai errado) ou **seleção** (deixa fechar errado): a Big Idea resolve o 1º, o quiz-como-gate resolve o 2º.
6. **Decidir 3 a 5 buckets** — clusterizar e cravar. Cada bucket: passa na regra de bucket-worthiness (muda mensagem/prova/oferta/CTA/script — §4) E é pontuado no critério high ticket. Meta: ~80% do mercado com 3-5. Consolidar grupos pequenos (80/20).
7. **Detalhar cada bucket + nomear o north-star** — nome · dor central · linguagem exata · ângulo de mecanismo · objeções · score Dor/Urgência/Caixa/Facilidade de Provar. Nomeie qual cliente real de maior LTV é o north-star e o traço que o separa do sósia.
8. **Escolher o tipo de quiz** — Type/Killer/Score. Os três funcionam em qualquer mercado; a matriz (§3) guia o ideal. **Deixe o herói da promessa puxar o tipo:** número que ele quer melhorar → Score; erro/gargalo oculto → Killer; identidade → Type (detalhe em `references/lentes-mentores.md`). Justifique com a situação real.
9. **Criar a Big Idea (ancorada no produto e no comprador real)** — leia `references/big-idea.md` e `references/lentes-mentores.md`. Aplique a regra central: problema-que-só-o-produto-resolve, na linguagem do prospect, passando no Teste de Intencionalidade. **Diagnostique a variável travada (Equação de Valor):** no avançado o Desejo está saturado → ancore na Probabilidade (diagnóstico), nunca no resultado. **Calibre pelo nível de consciência:** problem-aware ("não sei onde está o erro") → "descubra ONDE está o erro"; solution-aware ("sei que é X") → "o que TRAVA seu [X]"; "como fazer" atrai iniciante, quase nunca em high ticket. Produza 2-3 variações e **explique o porquê de cada ângulo**. NUNCA transplante o frame do exemplo-ouro.
10. **Validar** — 3 filtros (Atrai/Diagnostica/Prescreve) + o **gate de dupla revisão (passe Brunson E passe Hormozi)** de `references/lentes-mentores.md` + checklist (§Anexos do Método-Mestre).
11. **Formatar como DECISÃO** — template abaixo, com raciocínio transparente e pontos de override.

## Regras críticas (e o porquê)

- **Buckets vêm do dado, nunca da cabeça.** Sem dado, pare e peça.
- **Aplique o critério high ticket sempre.** Dor sem caixa e sem urgência não é bucket de high ticket.
- **Ancore a Big Idea no problema que só o produto do cliente resolve.** Se outro produto resolveria o mesmo gargalo, está genérica — re-ancore.
- **Filtre por caixa e calibre no comprador real (north-star), não no sósia nem no mais fácil de fechar.**
- **3 a 5 buckets, nunca 15.** Voz do mercado = palavras exatas.
- **Decida com confiança, mas deixe o override claro** — o estrategista pega o que o dado não vê (entrega, saturação, volume do nicho).
- **Recon antes de Big Idea.** Sem recon, sai genérica.

## Template de saída

Use EXATAMENTE esta estrutura:

```
# Estratégia de Quiz — [Cliente] — DECISÃO (estrategista revisa antes de produzir)

## 0. Transformação única do cliente
- O que vende / mecanismo único / transformação de valor específica:

## 1. Recon de mercado
- O que o mercado já oferece pro ICP / ângulos e Big Ideas dominantes (e o que está queimado) / lacuna que vou usar:

## 2. Voz do mercado (frases reais)
[20-25 frases literais, agrupadas por tema]

## 3. Buckets decididos (3 a 5)
- **North-star (comprador real de maior LTV):** [cliente real + o traço distintivo que o separa do sósia]
### Bucket 1 — [nome]
- Dor central / Linguagem do cliente / Ângulo de mecanismo / Objeções típicas
- Score high ticket: Dor _/10 · Urgência _/10 · Caixa _/10 · Facilidade de Provar _/10 → produto:
[repetir para cada bucket]

## 4. Tipo de quiz escolhido
- Tipo [Type/Killer/Score] + justificativa (herói da promessa + situação do cliente + matriz)

## 5. Big Idea (2-3 variações — ancoradas no produto e no comprador real)
- **Categoria-rei + variável travada (Hormozi):** [categoria que o cliente quer dominar · qual variável da Equação de Valor a Big Idea ataca]
[para cada variação: o problema específico do produto que ela ancora · emoção (Medo/Ganância) · curiosidade · benefício · POR QUE esse ângulo · Intencionalidade + Transferência + Filtro (proxy de caixa?) · passe Brunson E passe Hormozi · onde cai no botão intenção↔volume]

## 6. Validação
- Atrai? / Diagnostica? / Prescreve? + gate de dupla revisão (Brunson × Hormozi) + Checklist (X de N)

## 7. Pontos para o estrategista revisar/sobrescrever
[north-star confirmado? · dado raso ou amostra pequena (direção, não projeção) · gargalo é mensagem ou seleção? · risco de entrega · risco de saturação · poça de tráfego frio se o gancho ficou estreito · se houver dado de performance: otimizar por caixa, não CAC · onde tive baixa confiança]
```

A seção 7 é obrigatória — é onde a skill é honesta sobre o que o dado não alcança.

## Exemplo-ouro

Para ver uma saída boa preenchida, leia `references/exemplo-simple-acc.md` (a Simple aplicada nela mesma). Use como referência de QUALIDADE e FORMATO — **nunca copie o conteúdo nem o frame da Big Idea**.

## Antes de entregar, confira

- [ ] Bloco 3 tinha matéria-prima real E cravei a transformação única (ou parei e pedi)
- [ ] Fiz recon de mercado antes da Big Idea
- [ ] Voz do mercado literal, não parafraseada
- [ ] 3 a 5 buckets, cada um pontuado no critério high ticket, nenhum inventado
- [ ] Nomeei o north-star (comprador real de maior LTV) e calibrei a Big Idea-mestra nele
- [ ] Tipo de quiz justificado pelo herói da promessa + situação real
- [ ] A Big Idea ancora no problema que só o produto do cliente resolve e passou no Teste de Intencionalidade
- [ ] O gancho passa no Teste do Filtro (proxy de caixa — repele o quebrado, não vende só a dor)
- [ ] Diagnostiquei a variável travada (Probabilidade no avançado) e calibrei o nível de consciência
- [ ] A Big Idea sobreviveu ao passe Brunson E ao passe Hormozi
- [ ] A Big Idea não é o frame do exemplo-ouro reaproveitado, e fala com quem já está no jogo
- [ ] Se havia dado de performance: ranqueei por caixa e cheguei a mensagem vs. seleção
- [ ] Apontei na seção 7 onde o gancho pode ter ficado estreito demais pro frio
- [ ] Entreguei como DECISÃO com a seção 7 de override
