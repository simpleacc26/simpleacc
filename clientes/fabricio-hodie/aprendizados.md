# Aprendizados — Fabrício · HODIE

Log do que funciona e do que não funciona com este cliente.

| Data | Aprendizado / decisão | Origem |
| ---------- | --------------------- | ------ |
| 15/09/2026 | O Canvas do Drive tem **dois produtos** dentro: HODIE (clínica) e "Comando Estrutural" (B2B de 21 dias). Confirmado com o Renan que o funil é da HODIE. Não assumir sozinho em sessão futura. | Construção do quiz |
| 15/09/2026 | Nicho médico **proíbe depoimento de paciente e antes/depois**. O bloco 7 do relatório, que na estrutura canônica é de depoimentos, virou **casos de consultório**: relato clínico anonimizado narrado pela médica, com o número dentro da história. | `contexto/compliance-cfm.md` |
| 15/09/2026 | O canvas proíbe publicar preço em peça pública. Por isso a porteira de ICP do quiz pergunta pelo **hábito de investir em saúde**, nunca por faixa de valor ou renda. | Construção do quiz |
| 15/09/2026 | Num quiz de sintomas, peso 3 em quase toda opção faz o índice marcar ~100% para todo mundo e virar número vazio. Respostas de impacto emocional e neutras levam **peso 0**, e aí as três faixas passam a existir de verdade (varredura das 1.600 combinações: 59% alto, 39% médio, 2% baixo). | Teste do IMF |
| 15/09/2026 | A pergunta sobre a relação dela com a classe de medicações (quer usar com médico / já usou e reganhou / não pode ou não quer) é a informação mais útil que o funil entrega para o atendimento. Veio das "três portas de entrada" do canvas. | Canvas + construção do quiz |
| 15/09/2026 | Brandbook e wordmark dizem "Endocrinologia", mas publicar especialidade exige RQE. O funil usa só "Médica · CRM-SP 239430" até a confirmação. | Revisão de compliance |
| 15/09/2026 | `try/catch` não pega promise rejeitada: sem `.catch(() => {})` no `fetch` do lead, webhook fora do ar vira erro não tratado no console do visitante. Pego num teste de navegador ponta a ponta, não em revisão de código. | Teste do funil |
| 15/09/2026 | Planilha criada a partir de CSV nasce com a aba chamada `Untitled` (gid 113802194), nunca "Página1". Confirmado via RPC `google-sheets@2/rpcSheet` antes de montar o `addRow`. | Integração Make |
| 16/09/2026 | Buckets do método ASK implementados no relatório. O eixo de medicação sozinho só dá 3 buckets; para chegar a 5 a atribuição virou uma **cascata de duas perguntas** (P7 relação com medicação, depois P5 o que já tentou), com a última regra sem condição para nenhum lead ficar sem bucket. Varredura das 20 combinações: todos os 5 buckets alcançáveis, nenhuma combinação órfã. | Pedido do Renan |
| 16/09/2026 | Bucket e índice são **eixos independentes**: o bucket decide QUAL diagnóstico, o IMF decide QUÃO intenso. Isso evita ter que criar um bucket por faixa de gravidade. | Implementação ASK |
| 16/09/2026 | No módulo `google-sheets:updateCell` do Make o parâmetro é `cell`, não `cellAddress`. Com o nome errado o erro que volta é enganoso: "Unable to parse range". | Integração Make |
| 16/09/2026 | Arquivo grande (7,9MB) **derruba a sessão do conector do Google Drive** no `download_file_content`, com erro enganoso de "session expired". Falha nas 4 tentativas, enquanto arquivos de dezenas de KB baixam normal. Saída: liberar o link e baixar por `drive.usercontent.google.com/download?id=<ID>&export=download&confirm=t`. | Foto da Dra. Lailla |
| 16/09/2026 | Num funil médico, o pixel da Meta recebe **só o nome do evento**. As respostas do quiz e o índice são sinais de saúde e não podem ir para plataforma de anúncio. O motor da casa mandava o objeto `data` inteiro para o `fbq` por padrão. | Instalação do pixel |

## Sobre extrair a copy do funil para o cliente ler (17/09/2026)

- O documento de copy que o cliente lê e comenta é **gerado por script**
  (`ferramentas/extrai-copy-do-funil.mjs`), a partir do próprio `flow.js` do
  funil. Não se edita à mão: se a página mudar, roda de novo.
- 🚨 **Valide contra a tela, não contra o arquivo.** Os relatórios se montam em
  tempo de execução e a variação está em três eixos independentes: 5 perfis, 3
  faixas do índice e 3 rotas de convite. São 44 combinações, e todas foram
  renderizadas semeando `sessionStorage` antes de dar o documento por conferido.
- **Ângulo e Atenção não vão para o cliente.** São nota interna de quem escreve.
  Criativo, título, descrição e CTA são peça e ficam.
