# Aprendizados — Ayla Rica

Log do que funciona e do que não funciona com este cliente.

| Data | Aprendizado / decisão | Origem |
| ---------- | --------------------- | ------ |
| 2026-07-14 | Pivô decidido: abandonar lançamentos gratuitos da Carol e migrar para funil de quiz dinâmico com high ticket R$3-4k. | Call de vendas 06/07 + onboarding 14/07 |
| 2026-07-14 | ICP da Ayla valoriza proximidade/atendimento pessoal acima de preço; dor central é trauma com agências que não entregam. Usar isso na copy. | Onboarding 14/07 |
| 2026-07-14 | Mentoria comercial da Ayla não deve ser vendida solta para closers; posicionar como upsell B2B da empresa de implementação. | Call de vendas 06/07 |
| 2026-07-14 | Cadência comercial de referência: agendamento em média no 5º contato; "técnica do quem morreu" (3 ligações seguidas). | Onboarding 14/07 |
| 2026-07-14 | Guia de captação de depoimentos criado (skill guia-captacao-depoimentos). Prioridade de prova social: experts com produto validado ("expert assiste expert"); depoente da saúde exige cuidado com conselhos de classe. | estrategia/2026-07-14-guia-captacao-depoimentos.pdf |
| 2026-07-15 | Canvas pré-preenchido entregue no Drive. Decisão pendente da Ayla: confirmar se o produto do funil é a mentoria dela para experts ou o funil da Carol; faltam estrutura de entrega, preço oficial, nome do método, cases e concorrentes diretos. | estrategia/2026-07-15-canvas-produto-e-cliente-ideal.md |
| 2026-07-15 | Skill gerar-canvas-produto-cliente: o símbolo 🔸 TAMBÉM corrompe na conversão markdown→Google Doc (vira "ð¸"), apesar de a referência da skill dizer que é seguro. Usar ◆ no lugar; corrigir a skill na branch de origem (claude/lucas-alife-client-setup-ctcezk). | Entrega do canvas Ayla |
| 2026-07-20 | Roadmap de 90 dias criado (Perfil B). Decisão: dois produtos em paralelo (high ticket da Carol + mentoria da Ayla p/ experts), meta somada R$50k/mês. Premissas a validar: ticket médio R$3.500, conversão de call 30%, Ayla nas primeiras calls. Posicionamento arranca em 7 dias; funil de quiz da Carol implementado pela Simple em até 7 dias. | estrategia/2026-07-20-roadmap-estrategico-ayla-rica.pdf |
| 2026-07-21 | Correção da skill aplicada: gerar-canvas-produto-cliente vendorada nesta branch (entra na main por este PR) com o fix do 🔸→◆ documentado. | Fechamento da sessão |

| 2026-09-14 | **Cliente retornou depois de dois meses parada.** Projeto reiniciado com dia 1 em segunda, 14/09 (dia 10 em 23/09, dia 30 em 13/10, dia 60 em 12/11, dia 90 em 12/12). Causa do sumiço tratada como risco no próprio documento: a operação dos clientes dela comia a agenda. Combinado novo: bloco diário de 2h30 e sinal de vida toda sexta com três números no grupo. | estrategia/2026-09-14-roadmap-estrategico-ayla-rica.pdf |
| 2026-09-14 | **Decisão de foco (a mais importante):** o funil vende a **mentoria da própria Ayla para experts**, não o funil da Carol. A Carol vira case de entrega (produto validado em 2 meses). Isso resolve a pergunta que estava aberta no canvas desde julho, mas **ainda precisa do aceite dela**. | Roadmap e Estratégia de 14/09 |
| 2026-09-14 | Arquitetura do funil definida: inimigo nomeado **"A Audiência Parada"**, número calculado **"Receita Parada"** (base que nunca recebeu oferta × 1% × ticket), método **OCC (Oferta, Conversa, Constância)** e 4 padrões de perda (A Plateia, O Teto do Barato, O Lançamento Refém, A Base Esquecida). | estrategia/2026-09-14-estrategia-completa-ayla-rica.pdf |
| 2026-09-14 | Matemática refeita: ticket premissa R$ 15 mil, de 3 a 4 vendas/mês para R$ 50 mil. Cascata de 100 abordagens (18 respondem, 9 conversam, 2 agendam, 1,3 comparece), com 50/70/100 abordagens por dia útil nos meses 1, 2 e 3. Resultado projetado: 15 vendas e R$ 225 mil no trimestre. | Roadmap de 14/09 |
| 2026-09-14 | Premissas que **seguem pendentes de validação da Ayla** e que, se mudarem, derrubam a matemática dos dois documentos: preço da mentoria (R$ 15 mil) e nome do método (OCC). Registradas na página 2 da estratégia e na Seção 6. | Ambos os documentos |

## Pendências abertas (para a próxima sessão / call de roadmap)

Atualizadas em 14/09/2026, com o retorno da cliente.

- **Fechar a grade da mentoria até 27/09 (dia 14).** É o gargalo real e está
  aberto desde julho: formato, duração, entregáveis, **preço oficial** e **nome
  do método**. Os dois documentos assumem R$ 15 mil e Método OCC; se o número
  for outro, a matemática do roadmap e a copy da página mudam junto.
- **Confirmar a decisão de foco:** o funil vende a mentoria da Ayla para
  experts (Carol vira case). Está escrito assim nos dois documentos.
- **Nome do gestor de tráfego:** os documentos usam **Renan Martini**, que é
  quem aparece como gestor de tráfego no roadmap da Adriana (11/09). Confirmar
  se é ele no projeto da Ayla e trocar se não for.
- **Scripts de caixa rápido até 15/09 (dia 2)** e planilha de leads: entrega da
  Simple, prometida dentro do roadmap.
- **Próximo passo de execução:** implementar o funil (skill `criar-funil-quiz`
  ou `gerar-quiz-diag-pag-pos-quiz`) a partir da copy já escrita na Estratégia
  Completa, e criar a planilha de leads no Drive.
- **Subir os dois PDFs** na pasta `3. Estratégia e Tráfego` do Drive da cliente
  (o MCP do Drive não sobe binário desse tamanho, é upload manual).
