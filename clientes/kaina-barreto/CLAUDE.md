# Cliente: Kainã Barreto

Base de conhecimento do cliente **Kainã Barreto** — personal trainer / consultoria
online de treino e nutrição (marca **Shape10X**). Cliente da **mentoria de 3 meses**
da SimpleAcc (fechada em 30/07/2026).

## Estado em 10/08/2026 · comece por aqui

**O que já está pronto e entregue** (tudo em `estrategia/`, PDF + fonte HTML editável):

| Entregável | Estado |
| --- | --- |
| Roadmap de 90 dias (14 pág.) | **v1.2** · entregável contratado |
| Estratégia Completa do funil (23 pág.) | **v1.0** · quiz, página pós-quiz, 20 criativos, cadência |
| Guia de captação de depoimentos (4 pág.) | **v1.0** |
| Revisão do quiz que ele mesmo montou | entregue |

**As decisões que não se reabrem sem motivo novo:**

- Ticket: **R$ 1.800 em 12x de R$ 150**. Meta de R$ 20 mil/mês é **valor contratado**
  (11 vendas), não caixa recebido.
- **Antecipação de recebíveis é regra**, não opção: em 12x, uma venda entra R$ 150 no mês.
- Quiz fecha em **6 perguntas**, sem pergunta aberta (decisão de priorizar volume de lead).
- Tratamento em **"você"**, nunca "tu", em qualquer documento.
- **Não posicionar a Simple como auditora** do trabalho dele. Ele executa; se tiver dúvida,
  procura a gente. Isso não precisa estar escrito no documento.
- Mecanismo nomeado da marca: **as 4 travas do ciclo** (estímulo, constância, recuperação,
  nutrição). É o que faz o quiz devolver diagnóstico com nome.

**O que está aberto, em ordem de prioridade:**

1. **Implementar o quiz e a página pós-quiz.** Toda a copy está pronta na Estratégia Completa.
   É o Passo 12 do roadmap e o gargalo real do negócio.
2. **Ler o relatório de execução dele** (artifact do Claude compartilhado em 08/08). Diz
   "14 calls, 6 sales" no subtítulo, o que seria 43% de conversão contra os ~30% registrados.
   Não consegui ler: artifact público do claude.ai é SPA e o WebFetch só devolve o esqueleto.
   **Pedir export em PDF ou o conteúdo colado.**
3. ⚠️ **Confirmar a política da Meta sobre antes e depois em anúncio.** Toda a copy de prova
   usa `[ANTES E DEPOIS]` e o criativo que já funciona para ele é antes/depois. Checar com o
   gestor de tráfego antes de escalar verba.
4. **Coletar de 3 a 5 depoimentos** (o guia já está pronto). Destrava o ângulo 3, um estático,
   um vídeo e o bloco de prova da página.
5. **Reposicionamento de ticket** para R$ 4 a 5 mil: só com 30 calls ou mais vindas do funil.

**Duas premissas ainda não confirmadas:** taxa de agendamento (25%) e comparecimento (60%) são
estimativas de modelo, não medição. E não se sabe quanto do anual sai à vista contra 12x.

---

## Como se orientar nesta pasta

- `contexto/`   — quem é, oferta, ICP, concorrentes, Instagram, linguagem do público, números.
- `contexto/fontes/` — matéria-prima bruta (transcrição da call, canvas). Não editar; só consultar.
- `estrategia/` — o que foi vendido, diagnóstico, planos (roadmap de 90 dias).
- `copy/`       — copy de páginas e de anúncios/criativos.
- `roteiros/`   — roteiros de vídeo (datados).
- `funis/`      — quiz, landing pages e páginas pós-quiz.
- `aprendizados.md` — o que funciona/não funciona (atualize sempre).

## Ao trabalhar para este cliente

1. **Antes de criar**, leia `contexto/` e `aprendizados.md`.
2. Leia também `estrategia/2026-07-30-o-que-foi-vendido.md` — ele define **o escopo**
   (é mentoria, não implementação feita por nós). Não prometa entrega fora disso.
3. Para gerar funil/página/anúncios, rode **`/prompt-mestre`**.
4. Salve na pasta certa e **registre o aprendizado**.
5. Branch `cliente/kaina-barreto/<assunto>` + PR.

## Contexto rápido

- **Quem é:** Kainã Barreto, personal trainer em Pelotas/RS, atleta de powerbuilding
  (total 600 kg). Está migrando do presencial para a consultoria online.
- **Produto dele (Shape10X):** consultoria online 100% acompanhamento — diagnóstico,
  plano individual pelo método **WNS** (ciclos de 90 dias em 3 blocos), check-in diário,
  reavaliação a cada 30 dias, suporte no WhatsApp, garantia de continuidade com 80%+ de aderência.
  Entrega no portal `shape10x.com` + WhatsApp.
- **Ticket atual:** plano anual **R$ 1.800, cobrado em 12x de R$ 150** (confirmado 10/08/2026).
  Meta de reposicionamento: R$ 4–5 mil, com downsells mais baratos.
- **Público / ICP dele:** 25–45 anos, ~55% homens / ~45% mulheres, classe média,
  **já treina com consistência** e travou — "eu treino, mas não mudo".
  Tese central: **"o problema não é disciplina, é ajuste."**
- **Situação:** ~R$ 2 mil/mês no online (4 alunos no anual), maior parte da renda ainda
  vem do presencial. Meta da mentoria: **R$ 20 mil/mês em 3 meses**.
- **Gargalo real:** não é conversão (~30% nas calls) — é **volume de lead qualificado**.
- **Links:** Instagram [@kainabarreto.treinador](https://www.instagram.com/kainabarreto.treinador/)
  · Portal `shape10x.com` · WhatsApp `wa.me/message/ZPBRZWZ5NUZ5F1`
- **Contato principal:** Kainã Barreto (WhatsApp — grupo individual com o time SimpleAcc).
- **Responsável SimpleAcc:** Daniel Souza.

## Cuidados de comunicação com o Kainã

- Ele **valoriza simplicidade acima de tudo**: "quanto mais complexo, menos eu consigo
  manter consistência". Entregue passo a passo curto, não plano gigante.
- Ele vem de uma mentoria de **R$ 12 mil que não resolveu** (social selling) e **ainda
  está pagando** por ela. Ceticismo com promessa e sensibilidade a custo são reais.
- Estava **à beira de burnout** (16h/dia de trabalho). Evite empilhar tarefa; priorize.
- Ele é atleta e entende tudo por analogia de treino/dieta/métrica — use essa linguagem.
- Ele já usa IA no operacional (montou um app que reduz a criação de plano para 5 min).
  Dá para acelerar entregas com ferramenta; ele adota rápido.
