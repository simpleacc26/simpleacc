# 21/07/2026 · Diagnóstico de causa raiz — desequilíbrio de leads (Tatuagem x Clareamento)

**Situação:** leads chegam para um procedimento e não para o outro; Ana Luiza relata
**zero leads de tatuagem no WhatsApp desde sexta 17/07**. Tudo roda no **mesmo perfil de
Instagram (Ana Luiza)** e no **mesmo número de WhatsApp**.

**Ressalva de dados:** planilha é acumulada (jun/25 a jul/26) + print de 5 dias (17–21/jul).
Sem série diária, o "zerou na sexta" é a causa mais provável pela mecânica, a confirmar com
detalhamento por dia. O que é inferência está marcado.

## Campanhas ATIVAS hoje (só essas importam)
| Campanha | Orçam/dia | Alcance (5d) | Freq | Resultado (5d) | Custo/result. | Flag |
| --- | --- | --- | --- | --- | --- | --- |
| Tatuagem (WhatsApp CBO Chapecó) | R$80 | 4.676 | 1,99 | 12 conversas | R$13,88 | Custo alto |
| Clareamento (WhatsApp CBO Chapecó) | R$20 | 9.609 | 1,78 | 36 conversas | R$5,27 | ok |
| Tráfego IG (Distribuição) | R$6 | 3.744 | 1,17 | 46 visitas perfil | R$0,61 | Custo alto |

Desativadas: "Cidades próximas" Tatuagem (R$40) e Clareamento (R$20).

Acumulado (planilha) das duas ativas de Chapecó:
| Campanha | Resultados | Custo/result. | CTR link | CTR (todos) | CPM |
| --- | --- | --- | --- | --- | --- |
| Tatuagem | 149 | R$15,77 | 0,32% | 0,75% | R$13,24 |
| Clareamento | 248 | R$7,64 | 0,47% | 1,14% | R$11,81 |

## O que os números gritam
1. **O orçamento está invertido.** R$80/dia no PIOR resultado (tatuagem, R$13,88) e R$20/dia
   no MELHOR (clareamento, R$5,27). Clareamento entrega **3x mais conversas com 1/4 do orçamento**.
2. **Tatuagem está subgastando o próprio orçamento.** 12 conversas × R$13,88 ≈ R$166 em 5 dias
   = ~R$33/dia de um orçamento de R$80. Ou seja, o Meta **não consegue gastar** os R$80. Isso é
   sinal clássico de **público pequeno demais + criativo perdendo o leilão**.
3. **Tatuagem perde o leilão.** Com 4x o orçamento, alcança 4.676 pessoas; o clareamento, com
   1/4 do orçamento, alcança 9.609. A causa está no **CTR mais fraco** (0,32% vs 0,47%): criativo
   que engaja menos → Meta cobra mais (CPM maior) e entrega menos.
4. **Saturação.** Freq ~2 em 5 dias num público de cidade (Chapecó só). R$80/dia num público
   pequeno satura rápido, sobe frequência, sobe custo, e a entrega despenca. É o padrão de
   "zerou do nada".

## Causa raiz (do estrutural pro pontual)
**A) Estrutural — dois funis colidindo no mesmo ponto de entrada.** Mesmo perfil + mesmo
WhatsApp = impossível atribuir qual campanha gera qual lead, e o inbox vira um caos onde não
dá pra distinguir tatuagem de clareamento. A percepção "quando chega de um não chega do outro"
nasce daqui: as duas disputam a MESMA mulher de Chapecó, o MESMO evento (conversa iniciada) e
a MESMA caixa de entrada. Quem tem criativo mais forte (clareamento) leva a atenção; o outro
starva.

**B) Alocação — orçamento contra os dados.** Colocar R$80 no que converte a R$13,88 e R$20 no
que converte a R$5,27 é empurrar dinheiro pro lado errado.

**C) Público — provável gatilho da sexta [INFERÊNCIA].** As campanhas "Cidades próximas"
estão DESATIVADAS. Se foram desligadas por volta de 17/07, o público de tatuagem encolheu pra
Chapecó só, e R$80/dia nesse público pequeno satura e trava a entrega. Tatuagem é ticket alto
e jornada longa: essa cliente VIAJA. Cortar cidades próximas machuca a tatuagem muito mais que
o clareamento.

**D) Mensuração — "conversa iniciada" ≠ lead real.** O Meta conta 12 conversas iniciadas, mas
a Ana Luiza vê zero. "messaging_conversation_started" conta o clique/abertura, não o lead
qualificado. Com público saturado, sobra gente de baixa intenção. Precisa reconciliar o número
do Meta com o inbox real.

## Direcionamentos

### Cabeça de Zuckerberg (mecânica da plataforma)
- **Separe o número de WhatsApp por procedimento.** É a correção nº 1. Resolve atribuição,
  resolve o "não sei de qual campanha veio" e deixa cada funil ser otimizado sozinho.
- **Ideal: perfil de Instagram próprio pra Ana Paula.** Rodar tudo no perfil da Ana Luiza mistura
  marca, público e retargeting. No mínimo, número separado já; perfil separado no médio prazo.
- **Pare de fazer as duas competirem pelo mesmo público.** Ou consolida numa campanha só com
  Advantage+/CBO (mas aí o Meta favorece o mais barato = clareamento, e a tatuagem morre), ou
  mantém separadas COM exclusão mútua de público e orçamento dimensionado. Como o objetivo é
  EQUILÍBRIO, o certo é separado + exclusão + budget controlado.
- **Dimensione o orçamento ao público.** R$80/dia em Chapecó-só pra tatuagem é grande demais.
  Ou baixa pra ~R$30–40, ou reabre "Cidades próximas".
- **Não resete o aprendizado.** Qualquer edição na sexta reinicia a fase de aprendizado; em
  público pequeno saturado, pode não sair mais. Se editou, melhor duplicar do zero.

### Cabeça de Russell Brunson (funil)
- São **dois funis diferentes**: tatuagem = consideração longa (40–60 dias), ticket alto;
  clareamento = conversão rápida. Jogar os dois no MESMO ponto de entrada (mesmo número, mesmo
  perfil) funde dois funis num inbox só. Separe entrada, nutrição e oferta.
- **Um funil, um objetivo.** Dê à tatuagem um ponto de entrada próprio (número/landing/quiz)
  que qualifica e atribui. "Manda a foto" é um ótimo mecanismo de entrada pra tatuagem.
- **Não julgue os dois pelo mesmo CPA.** Clareamento é front-end barato; tatuagem é ticket alto
  que compensa custo por lead maior. Metas diferentes.

### Cabeça de Pedro Sobral (leitura de dados / tráfego BR)
- **Rebalanceie por resultado, não por esperança.** Inverta: mais budget no clareamento (que
  escala barato), corta a tatuagem pra ~R$30–40 ATÉ o criativo melhorar.
- **CTR baixo = criativo/hook fraco.** É a alavanca da tatuagem. Entram os **novos roteiros
  Hormozi** (17/07) pra subir CTR e reganhar o leilão.
- **Suba orçamento devagar** (20–30% a cada 2–3 dias), nunca dobrar de uma vez em público
  pequeno (satura).
- **"Zerou na sexta" — checklist de diagnóstico:** (1) houve edição/mudança de budget que
  resetou aprendizado? (2) algum anúncio de tatuagem foi REPROVADO na sexta? (3) frequência
  estourou? (4) "Cidades próximas" foi desligada? (5) o clareamento passou a comer toda a
  entrega? Puxar **Detalhamento > Por dia (últimos 14 dias)** e a **aba Qualidade do anúncio**.

## Plano de ação (prioridade)
1. **Hoje:** puxar detalhamento por dia (14 dias) das 3 ativas + checar reprovação de anúncios
   de tatuagem. Confirmar o que mudou na sexta.
2. **Hoje:** reconciliar "conversas iniciadas" (Meta) x leads reais no WhatsApp (últimos 7 dias).
3. **Esta semana:** número de WhatsApp separado por procedimento (fix estrutural).
4. **Esta semana:** rebalancear budget (tatuagem R$30–40, clareamento sobe) e **reabrir Cidades
   próximas pra tatuagem** com orçamento próprio (público que viaja pra ticket alto).
5. **Esta semana:** subir os criativos Hormozi de tatuagem pra atacar o CTR baixo.
6. **Médio prazo:** perfil de Instagram próprio da Ana Paula; exclusão mútua de público.

## O que confirmar (dados que faltam)
- Série diária por campanha (14 dias) — pra ver o dia exato do colapso.
- Status de aprovação dos anúncios de tatuagem — reprovação zera entrega.
- Histórico de edições da conta (o que mudou em/na sexta 17/07).
- Nº de leads reais no WhatsApp por procedimento (planilha da clínica) vs Meta.

---

## Atualização 21/07 (novos dados do Daniel) — CORREÇÃO DE TIMELINE
- O **R$80 é de HOJE**. Antes (incluindo a sexta 17/07) a tatuagem rodava **R$40 Chapecó +
  R$40 cidades próximas** em campanhas separadas. Logo, **o R$80 NÃO causou o zero-lead de
  sexta** (a causa C do orçamento/saturação fica invalidada como gatilho).
- Hoje o Daniel **consolidou em 1 campanha CBO de R$80 com 2 conjuntos** (Chapecó + cidades
  próximas). Isso **reseta o aprendizado** → 3 a 7 dias de instabilidade esperada.
- **Causa real do zero-lead de sexta (revisada):** criativo de tatuagem perdendo o leilão pro
  clareamento no perfil/número compartilhado + possível **reprovação de anúncio** + conversas
  de baixa intenção contadas como "conversa iniciada" + atribuição confusa no inbox único.
  Confirmar com detalhamento por dia e aba Qualidade.
- **Atenção com o CBO:** com 2 conjuntos num orçamento só, o Meta empurra a verba pro conjunto
  mais barato e pode secar o outro geo. Se quiser cobertura equilibrada dos dois geos, usar
  **ABO** (orçamento por conjunto); se quiser máximo resultado, manter CBO e monitorar a
  distribuição.

### Plano atualizado (ordem de execução)
1. **Não editar a campanha de tatuagem nos próximos 3–5 dias** (aprendizado rodando). Cada
   edição reinicia o ciclo.
2. **Checar hoje:** aba Qualidade da conta (reprovação de anúncio de tatuagem) + detalhamento
   por dia (14 dias).
3. **Criar a conta de anúncios da Ana Paula** (acesso já cedido): Business Manager → nova conta
   de anúncios → vincular página/perfil dela + pagamento + número de WhatsApp dela → migrar o
   clareamento pra lá. É o que separa os dois funis de vez.
4. **Número de WhatsApp separado por procedimento.**
5. **Reconciliar** conversas do Meta × leads reais no WhatsApp (7 dias).
6. **Subir criativos Hormozi de tatuagem** (atacar CTR).
7. **Rebalancear verba** por resultado depois que o aprendizado estabilizar.
8. Decidir **CBO x ABO** conforme o objetivo (máximo resultado x cobertura dos dois geos).

### Mensagem enviada às clientes (registro)
Ver texto tranquilizador em `estrategia/` / entregue por WhatsApp em 21/07 (explica o
compartilhamento de perfil+número como causa e o plano de separação).
