# Entregáveis da call Conexão Meta (22/09) — painel de controle

Tudo que o Renan combinou de providenciar para o André naquela call, com o
estado de cada item e onde ele mora no repositório.

## O que o Renan combinou de entregar

| # | Compromisso | Estado | Onde está |
| --- | --- | --- | --- |
| 1 | Roteiros de vídeo destrinchados, com falas e CTA prontos | **Pronto** | `roteiros/2026-09-22-roteiros-videos-andre.md` |
| 2 | O prompt do diagnóstico, com a estrutura do quiz e a lógica do cálculo | **Pronto** | `funis/diagnostico-d90/PROMPT-LOVABLE.md` |
| 3 | O código do pixel da Meta | **Parcial** | `funis/diagnostico-d90/PIXEL-META.md` — o snippet e o mapa de eventos estão prontos; falta o Renan criar o pixel no gerenciador e trocar o ID |
| 4 | A planilha de leads, link ou estrutura | **Parcial** | `funis/diagnostico-d90/PLANILHA-DE-LEADS.md` e `planilha-leads-cabecalho.csv` — contrato fechado; falta publicar o webhook e mandar a URL |
| 5 | Instruções para desativar os impulsionamentos do Instagram | **Pronto** | `estrategia/2026-09-22-desativar-impulsionamentos-instagram.md` |
| 6 | Criativos repaginados | **Copy pronta, arte pendente** | `copy/2026-09-22-anuncios-diagnostico-d90.md` — a arte depende dos PDFs das aulas e do acervo do Drive |

**Prazo combinado na call:** informações até a manhã do dia 23, criativos até o
fim do dia 23.

## As duas coisas que só o Renan pode fazer

Nenhuma das duas dá para resolver dentro do repositório, porque dependem de
acesso a contas.

**1. Criar o pixel no gerenciador.** O passo a passo está em `PIXEL-META.md`.
Assim que o ID existir, ele entra em dois lugares: no `PROMPT-LOVABLE.md`, no
lugar de `{{PIXEL_ID}}`, e na página da Vercel.

**2. Publicar o webhook da planilha.** O contrato de colunas está fechado. Falta
alinhar a planilha que a Simple já usa a esse cabeçalho, publicar o Apps Script
como Web App e colocar a URL no lugar de `{{URL_WEBHOOK_PLANILHA}}`.

## O que o André combinou de entregar

| Compromisso | Para quê |
| --- | --- |
| PDFs e PPTs das 4 aulas do GPM | Base dos criativos e do segundo bloco de roteiros |
| A matéria sobre o índice da Marida | Ele quer cruzar com o índice D-90 do diagnóstico |
| O link do Drive com os vídeos capturados | Matéria-prima de criativo |
| Implementar o quiz no Lovable | A partir do prompt |
| Instalar o pixel na página do quiz | A partir do código |
| Automatizar a exportação para a planilha | A cada novo lead |
| Gravar os vídeos | Depois de receber os roteiros |

## Decisões que saíram da call e mudam o projeto

**O quiz migra para dentro da plataforma.** Deixa de ser uma página externa e
passa a ser o onboarding da Musikalis. Isso resolve a colisão que o André
mostrou na tela: hoje, quem termina nosso quiz e clica em "acessar plataforma"
cai no onboarding interno e responde tudo de novo.

**No fim, o lead sai com as duas coisas:** o relatório e a conta free criada,
com o perfil preenchido pelas respostas. Foi pergunta direta do André e resposta
direta do Renan.

**Todos os campos viram obrigatórios.** É a correção de um problema real: existem
cadastrados na base sem telefone, e sem telefone o lead não existe para o
comercial.

**O onboarding antigo de 8 telas só sai do ar depois** que a gravação do lead
estiver confirmada em produção. Desligar antes deixa o André cego no painel dele.

## Riscos abertos, em ordem de urgência

**1. O formulário que está no ar não grava nada.** A página da Vercel valida os
quatro campos e mostra o diagnóstico, mas o lead morre ali. **Não rodar mídia
antes de resolver isso**, por qualquer um dos dois caminhos: ligar o webhook na
Vercel agora, ou esperar a versão do Lovable subir.

**2. As faixas de vazamento ainda não têm a chancela do André.** São estimativas
derivadas da metodologia, não estatística de mercado. É o número em vermelho que
carrega a página inteira, e ele é PMP e ex-consultoria. A ressalva está escrita
no fim do `PROMPT-LOVABLE.md`, com as três saídas possíveis.

**3. O CTA final continua indefinido.** O workshop foi cancelado em 18/09 e era o
destino do funil. Hoje a página aponta para "Criar conta grátis" e "Falar com
produção". Dentro da plataforma, o botão principal passa a concluir o cadastro,
o que resolve metade do problema. A outra metade, o que vem depois da conta
free para levar ao GPM de R$ 1.497, ainda precisa de decisão.

**4. A cadência de WhatsApp de 10 dias convida para o workshop em 7 das 10
mensagens.** Precisa ser reescrita para convidar para o diagnóstico e para a
conta free.

**5. A meta do trimestre pressupunha duas turmas puxadas por três workshops.** Sem
workshop, a conta de 20 matrículas e R$ 30 mil precisa de outro mecanismo de
conversão, ou de outra meta.
