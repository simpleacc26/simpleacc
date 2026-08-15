# Prompts mestres (padrões compartilhados)

Aqui ficam os **prompts mestres** da SimpleAcc — a "inteligência de especialistas"
que a gente reaproveita para todos os clientes. Cada prompt tem **uma fonte de
verdade** (um arquivo `.md` nesta pasta) e um **comando** correspondente em
`.claude/commands/` para rodar fácil em qualquer sessão.

## Prompts disponíveis

| Comando   | Fonte                      | Para quê |
| --------- | -------------------------- | -------- |
| `/prompt-mestre`  | `prompts/funil-html.md`    | Criar funil/página completa em HTML puro ou anúncios (copy + criativo). Conduz diagnóstico → aprofundamento → geração. |

## Skills disponíveis

Skills ficam em `.claude/skills/` e são acionadas automaticamente pela IA quando
a tarefa combina (ou você pode pedir pelo nome).

Ordem aproximada em que entram no ciclo de um cliente:

| # | Skill (nome interno) | Para quê |
| - | -------------------- | -------- |
| 1 | `estrategia-completa-clientes` | **Estratégia Completa para Clientes** — a partir do onboarding (transcrição/notas), gera o documento de estratégia de 8 seções e entrega como Google Doc formatado na pasta do cliente no Drive. |
| 2 | `gerar-canvas-produto-cliente` | **Canvas de Produto + Cliente Ideal** — pré-preenche o canvas com os dados reais extraídos das transcrições e deixa em branco, com perguntas marcadas, o que só o cliente pode responder. Entrega como Google Doc na pasta dele. |
| 3 | `roadmap-estrategico-90-dias` | **Roadmap Estratégico de 90 dias** — transforma os materiais de base (onboarding, canvas, calls) no PDF de roadmap na identidade navy + dourado: decisões fundamentais, caixa rápido, fases com passos e metas, checkpoints e fechamento personalizado. Sem travessões e com paginação validada. |
| 4 | `quiz-pesquisa-estrategia` | **Pesquisa & Estratégia do Quiz** — primeira etapa da fábrica de quiz: recon de mercado, voz do mercado, decide os 3 a 5 buckets pelo critério high ticket, o tipo de quiz (Type/Killer/Score) e a Big Idea. Roda **antes** de perguntas, páginas ou anúncios. |
| 5 | `criar-funil-quiz` | **Criar Funil (HTML puro)** — conduz diagnóstico → aprofundamento → confirmação → geração e entrega o funil em HTML/CSS/JS vanilla, com quiz SPIN, tela de loading, CTAs distribuídos, envio de lead para a planilha e tracking. |
| 6 | `gerar-quiz-diag-pag-pos-quiz` | **Gerar Quiz + Diagnóstico + Página Pós-Quiz** — pega a copy aprovada, monta o quiz + página pós-quiz + PDF na identidade do cliente, **publica na Vercel** (confere a conta da Simple antes), cria a planilha de leads no Drive e testa a integração. |
| 7 | `leitura-pdf-whatsapp` | **PDF da leitura emocional (SDR)** — gera a versão genérica do diagnóstico em página única para o SDR mandar no WhatsApp, com botões `wa.me` clicáveis e os depoimentos embutidos. |
| 8 | `guia-captacao-depoimentos` | **Guia de Captação de Depoimentos** — PDF de 4 páginas com o direcionamento para o cliente pedir e coletar depoimentos em vídeo: mensagem pronta com 4 tópicos, dicas de gravação, erros a evitar e checklist. |

> **Regra:** skill do time mora **aqui, no repositório**. Skill instalada só na
> conta pessoal de alguém não existe para o resto do time e vira uma segunda
> versão que desanda. Melhorou numa sessão? Commite a melhoria.

## Como usar

Em qualquer sessão, digite o comando (ex.: **`/prompt-mestre`**) e o agente assume o papel
do prompt mestre. Se você estiver na pasta de um cliente, ele já puxa o contexto
daquele cliente antes de começar.

## Como adicionar um novo prompt mestre

1. Crie o conteúdo em `prompts/<nome>.md` (a fonte de verdade, editável por todos).
2. Crie o comando em `.claude/commands/<nome>.md` apontando para esse arquivo
   (use o `prompt-mestre.md` como modelo).
3. Adicione uma linha na tabela acima.

> Editar o prompt = editar o arquivo em `prompts/`. O comando só aponta para ele,
> então a melhoria vale para todos os clientes de uma vez.
