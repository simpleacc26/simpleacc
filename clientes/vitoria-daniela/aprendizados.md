# Aprendizados — Vitória Daniela

Log do que funciona e do que não funciona com este cliente. Toda sessão pode
adicionar uma linha. É a memória que se acumula ao longo do tempo.

| Data | Aprendizado / decisão | Origem (campanha, teste, call) |
| ---------- | --------------------- | ------------------------------ |
| 2026-07-06 | Baseline de qualificação antes da reformulação do quiz: 86,6% dos 164 leads (Planilha de Leads) declararam faturamento "Até R$ 20.000/mês" (piso do ICP) e 76% ticket médio abaixo de R$3.000. Causa: quiz sem lógica de segmentação/repelência + régua de faturamento larga demais na base + pivô de comunicação de 23/06 ("direção estratégica para quem já está em movimento") nunca terminado nem refletido no quiz. Ver `estrategia/2026-07-06-diagnostico-leads-desqualificados.md`. | Análise de dados a pedido da Vitória (leads desqualificados) |
| 2026-06-23 | Time já identificou que a comunicação atraía quem "quer delegar tudo e não tem equipe"; pivô planejado para "direção estratégica para quem já está em movimento" (mín. 1 pessoa de equipe, já investiu em marketing sem retorno) — mas só o objetivo do criativo #1 ficou registrado, sem copy final nos demais. | `[Vitória] COPY 2026` (Drive) |
| 2026-07-06 | Ordem de execução definida por Daniel para a reformulação: 1) quiz (validar com ela no Figma), 2) copy da LP/agendamento, 3) diagnósticos por balde, 4) copy de anúncios. Um item por vez. | Instrução direta do Daniel |
| 2026-07-06 | Os 3 funis (quiz, LP, relatório) são arquivos Figma Make. As ferramentas de Figma desta sessão só leem esses arquivos (`get_design_context`) — `use_figma` (que escreve via Plugin API) não funciona em URLs `/make/`, só `/design/`, `/board/` e `/slides/`. Qualquer mudança de conteúdo precisa ser aplicada manualmente por quem tem acesso de edição no Figma Make. | Descoberto ao tentar aplicar o quiz v2 |
