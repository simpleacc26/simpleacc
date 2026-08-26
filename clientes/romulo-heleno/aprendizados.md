# Aprendizados — Rômulo Heleno

Log do que funciona e do que não funciona com este cliente. Toda sessão pode
adicionar uma linha. É a memória que se acumula ao longo do tempo.

| Data | Aprendizado / decisão | Origem (campanha, teste, call) |
| ---------- | --------------------- | ------------------------------ |
| 08/06/2026 | Cliente não executou nenhuma etapa do roadmap até a call de revisão. Precisou de apresentação ponto a passo com compartilhamento de tela para compreender o plano. | Call de checkpoint 08/06 |
| 08/06/2026 | Lista quente tem público misto (não só cabeleireiros) → abordar não-cabeleireiros pedindo indicações de profissionais do perfil ideal | Call de checkpoint 08/06 |
| 08/06/2026 | Tráfego pago bloqueado até min. 3-5 vendas manuais. Não negociar ticket, só forma de pagamento. | Roadmap v2.0 |
| 08/06/2026 | ICP documentado por escrito é pré-requisito para uso de IA na criação de conteúdo/copy | Call de checkpoint 08/06 |
| 29/06/2026 | Call agendada — verificar cumprimento do checklist do Dia 14 | Próxima call |
| 29/06/2026 | Doc de estratégia do Funil de Quiz gerado em PDF na identidade visual Pâmella Mello (Playfair+EB Garamond, capa navy, cards). Fonte e fontes versionadas em estrategia/funil-quiz-doc/. | Pedido Carlos/Daniel |
| 29/06/2026 | Checkpoint: conteúdo avançou (postagens diárias + filmagem com modelo); travaram PDF de vendas e esboço do curso por gestão de tempo. | Call 29/06 |
| 29/06/2026 | Lista do evento Beleza e Movimento caiu muito (evento aberto, nem só cabeleireiros) → entra social selling para leads frios, com apoio da Maria Cecília (Inova). | Call 29/06 |
| 29/06/2026 | Vender pela transformação/emocional, não pela técnica do curso. Tráfego pago só após validar a estratégia. | Call 29/06 |
| 02/07/2026 | Funil de quiz publicado: https://romulo-heleno.vercel.app (Vercel/time Simpleacc). Planilha de leads criada no Drive. Falta publicar o Apps Script (passo manual) para ligar a integração. | Skill gerar-quiz-diag-pag-pos-quiz |
| 02/07/2026 | Integração de leads do funil via Make (webhook instant → Sheets, cenário 5560422), testada de ponta a ponta. Dispara só quando chega lead (scheduling immediately, sem polling). Aba da planilha criada via CSV chama-se 'Untitled'. | Skill criar-funil-quiz |
| 26/08/2026 | Funil de quiz **refeito na estrutura da Luana Isse** (blueprint fechado da casa): 9 passos SPIN, porteiras no fim, tela de carregamento, relatório em 9 blocos, 3 CTAs distribuídos, índice e resultado nomeado. No ar em https://romulo-heleno.vercel.app | Skill gerar-quiz-diag-pag-pos-quiz |
| 26/08/2026 | Índice do cliente: **IIM, Índice de Improviso na Mecha** (quanto do resultado ainda depende de sorte em vez de método). Pesos calibrados sobre as 1024 combinações: 20% a 100%, com 45,9% Alto, 53,3% Médio, 0,8% Baixo. | Calibração 26/08 |
| 26/08/2026 | **A porteira de caixa aqui é ticket praticado na mecha, nunca faturamento** (regra do doc de estratégia + aprendizado do Thiago Menegão). Só filtra para fora quem não atende cliente e não tem previsão. Diverge da Luana de propósito. | Decisão de projeto |
| 26/08/2026 | Planilha e cenário do Make **refeitos no esquema novo** (27 colunas, payload plano com índice/pilar/resultado/qualificação). A planilha antiga de 22 colunas ficou obsoleta: só tinha linha de teste. Lead testado de ponta a ponta. | Integração 26/08 |
| 26/08/2026 | **Binário sobe corrompido pelo MCP da Vercel:** favicon-32.png voltou com 1 byte trocado e apple-touch-icon.png com 9, abrindo normalmente e só pegos pelo SHA256. Solução: funil 100% texto, só favicon.svg. **Vale para todos os clientes.** | Deploy 26/08 |
| 26/08/2026 | Relatório entra **sem depoimento e sem placeholder**: o cliente não tem case com autorização. O bloco existe no código e renderiza sozinho quando o array for preenchido. Bloco de autoridade só usa o que está escrito no material dele. | Decisão de projeto |
