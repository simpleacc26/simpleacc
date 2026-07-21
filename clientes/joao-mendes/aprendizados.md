# Aprendizados — João Mendes (Reset Mental)

Log do que funciona e do que não funciona com este cliente.

| Data       | Aprendizado / decisão | Origem |
| ---------- | --------------------- | ------ |
| 2026-07-01 | Diagnóstico 1-a-1 converte ~70%: a pessoa "se reconhece na hora". O funil deve reproduzir essa sensação de diagnóstico (quiz/diagnóstico antes da oferta). | Onboarding (canvas) |
| 2026-07-01 | Público compra por emoção e identificação, mas desconfia de promessas grandes — provas (história da Luana, depoimentos, renovações espontâneas) precisam vir cedo na copy. | Onboarding (canvas) |
| 2026-07-02 | VSL (front R$ 297 + R$ 600), low ticket e disparo em listas frias já foram testados e deram prejuízo (~R$ 2.500 de tráfego sem venda). Não repetir; foco em quiz + diagnóstico + 1-a-1. | Call de onboarding |
| 2026-07-02 | João foi lesado por expert que não gravava calls — gravação e transparência de reuniões são regra do projeto (também alimentam a inteligência de avatar). | Call de onboarding |
| 2026-07-02 | Urgência real: seguro-desemprego acaba em julho; ~30 dias para gerar venda ou João volta ao CLT. Roadmap precisa priorizar caixa rápido (1-a-1 + quiz) antes de estrutura. | Call de onboarding |
| 2026-07-17 | Roadmap 90 dias criado (v1.0, skill roadmap-estrategico-90-dias). Perfil A híbrido: João executa com direcionamento da Simple, mas funil de quiz entra cedo (dias 15 a 60) pela urgência. Meta: 10 vendas/mês × R$ 4.497 = R$ 45k/mês; conversão assumida 50% (declarada: 70%) = 20 sessões/mês; agenda da Luana assumida em até 2 sessões/dia. Bônus dia 60+: marca @ojuaomendes + captação de experts da saúde. Premissas a validar com Daniel na call de roadmap. | Roadmap v1.0 |
| 2026-07-17 | Ajustes do Daniel (v1.1): handles corretos são @ojuaomendes e @lufelisminooficial; posicionamento do João antecipado para o dia 7 (abordagens de venda da expert seguem prioridade 1); funil de quiz passa a ser implementado pela Simple em até 7 dias (campanhas sobem no dia 8, criativos prontos até o dia 6). | Daniel (sessão) |
| 2026-07-17 | Estratégia completa criada (8 seções: Big Idea, Quiz, Página, Anúncios, Diagnóstico, Cadência 12 dias, Tarefas, Recomendações) para o João validar as copies antes de implementar o funil. Google Doc formatado na pasta do Drive. Nota: emojis (💛 👀) corromperam na importação HTML→Doc, revisar antes de mandar pro cliente. | Estratégia v1.0 |
| 2026-07-21 | Sessão fechada: base + roadmap v1.1 + estratégia mergeados na main (PR #49). Nenhuma skill nova criada (usei roadmap-estrategico-90-dias e estrategia-completa-clientes, ambas já na main). | Fechamento de sessão |

## Pendências (próxima sessão)

- **João valida as copies** da estratégia (Google Doc) antes de implementar o funil. É o gate para a próxima etapa.
- **Implementar o funil de quiz** (skill `gerar-quiz-diag-pag-pos-quiz`) assim que as copies forem aprovadas: faltam insumos do cliente (identidade visual, logo, WhatsApp dedicado, conta Vercel, pasta de destino da planilha de leads).
- **Corrigir emojis** (💛 👀 viraram `ð`) no Google Doc da estratégia antes de enviar ao João. Regerar o Doc ou editar à mão no Drive.
- **Gravar depoimentos reais** (Fabrícia, Thalita, Carol) em vídeo, com autorização de uso, antes de qualquer copy ir ao ar. Usar a skill `guia-captacao-depoimentos`.
- **Validar premissas com o Daniel**: conversão da sessão (50% assumida vs 70% declarada) e agenda da Luana (até 2 sessões/dia).
- **PDF do roadmap**: está no repo e foi entregue na sessão; não foi subido ao Drive (arquivo grande demais para a API a partir da sessão). Subir manualmente na pasta do cliente se quiser centralizar lá.
- **ClickUp**: tarefa "JOÃO - preparar roadmap (e validar com Daniel)" pode ser marcada com o roadmap pronto.
