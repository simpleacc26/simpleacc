# Aprendizados — Luana Isse

Log do que funciona e do que não funciona com este cliente. Toda sessão pode
adicionar uma linha. É a memória que se acumula ao longo do tempo.

| Data | Aprendizado / decisão | Origem (campanha, teste, call) |
| ---------- | --------------------- | ------------------------------ |
| 2026-07-24 | Funil de aplicação (anúncio → formulário → aula gratuita) **não funciona** para ela: R$ 7 mil de fee + R$ 50/dia por 1,5 mês → ~20 leads, 1 reunião, 0 venda. Sem métrica e sem dono do comercial, tráfego só queima caixa. | Call de vendas |
| 2026-07-24 | O que já vende sozinho é a **consultoria individual de movimento/posicionamento por indicação** (R$ 15 mil, políticos). A base validada é essa — escalar o que existe antes de inventar produto novo. | Call de vendas |
| 2026-07-24 | Janela de trabalho é inegociável: **não trabalha de manhã** (Deus e família primeiro, filha em homeschooling). Todo processo tem que caber em tarde/noite. | Call de vendas |
| 2026-07-24 | Ela **se recusa a prometer resultado financeiro** ("chega a 50k") porque ela mesma ainda não está no número. Promessa do funil precisa ser de autoridade/invisibilidade, não de faturamento. | Call de vendas |
| 2026-07-29 | **Público decidido: mentores/especialistas iniciantes.** Perfis avançados ficaram de fora de propósito, para não desalinhar com o que a mentoria entrega. Encerra a indefinição que travava copy e segmentação. | Onboarding |
| 2026-07-29 | Usar **IA ao vivo na call (Furion) para construir o avatar** funcionou muito bem: destravou em uma sessão o que estava em branco no canvas há dias. Repetir esse padrão com outros clientes que travam no cliente ideal. | Onboarding |
| 2026-07-29 | Preços novos: consultoria **R$ 10 mil → R$ 15 mil**, mentoria em grupo **R$ 6 mil → R$ 7 mil**, individual high ticket a **R$ 30 mil** a estruturar. | Onboarding |
| 2026-07-29 | Ferramentas travadas: quiz no **Inlead** (ela já contratou) e CRM **Sales** (o dela) — integrar em vez de trocar. **Sem VSL** na versão inicial do funil. | Onboarding |
| 2026-07-29 | Depoimentos: coletar **mesmo sem resultado financeiro**, focando em valor percebido e transformação. Material não pode parecer produzido demais — autenticidade converte mais que produção. | Onboarding |
| 2026-07-29 | **Perfil de execução: muitas ideias em paralelo.** Ela mesma aceita direcionamento quando ele vem firme e com número. Manter uma prioridade por vez e uma fila datada para as ideias novas. | Call de vendas + onboarding |
| 2026-08-12 | **Funil de quiz no ar** (`funis/quiz-luana-isse/`), construído sobre o blueprint `estrutura-invisivel.md` com a copy e o índice dela: IRV, Índice de Ruptura de Valor. O índice sai só das perguntas de diagnóstico e o pilar dominante (Mentalidade/Movimento/Posicionamento/Vendas) personaliza a leitura do relatório. Amarrou o inimigo nomeado por ela ao produto: o quiz mede a ruptura, o MMPV a elimina. | Entrega Simple |
| 2026-08-18 | **Barra de progresso sem número nenhum**, nem "Pergunta X de N" nem porcentagem. Número ali faz o quiz parecer longo e medido, e derruba conclusão. Só a barra enchendo. Vale como padrão para os próximos funis. | Pedido do cliente + Thaina/Thiago |
| 2026-08-18 | **Rodar todas as combinações de peso antes de publicar o índice.** No IRV da Luana, a primeira calibragem dava "Alta" em 89% das 1024 combinações e "Baixa" era impossível: o número era teatro. Com 0 e 1 nas alternativas mais leves, foi para 20% a 100% e ~50/49/1. Se o quiz não tem alternativa de "está tudo bem", a faixa baixa quase não acontece, e isso tem que estar documentado. | Thaina/Thiago aplicado na Luana |
| 2026-08-18 | **Resultado nomeado** (aqui: Excelente e escondida / sem causa / intercambiável / sem caminho de venda) entra na mensagem de WhatsApp e vira coluna na planilha. É o que transforma a planilha em roteiro de atendimento: quem atende abre a conversa já sabendo o diagnóstico. | Thaina/Thiago |
| 2026-08-18 | **Quatro faixas de qualificação na planilha** (fila-quente, qualificado, nutrir, fora) mesmo com 3 CTAs na página. A quarta prioriza a fila. E a **regra de corte cruzada vira código** em `classificarLead()`, não fica só no doc de estratégia. | Thaina/Thiago |
| 2026-08-18 | **Trava de WhatsApp mudo:** se o número estiver vazio ou com placeholder, os CTAs não abrem nada e a página mostra aviso no topo. Evita publicar com botão morto e descobrir depois que o tráfego já rodou. | Thaina/Thiago |
| 2026-08-18 | **Bloco de autoridade é breve:** foto, nome, o que a pessoa faz, @ do Instagram e uma fala dela. Método, etapas e duração não entram, porque já aparecem no bloco do método logo acima. Grade de credenciais só com números reais e escritos no material do cliente. | Thaina/Thiago |
| 2026-08-18 | **Make por webhook instantâneo, não por agendamento:** 2 operações por lead, sem varredura. Duas armadilhas: a aba de planilha criada de CSV nasce "Untitled" e o addRow referencia a aba pelo nome, então renomear quebra o cenário com "400 Unable to parse range"; e o envio validado SEMPRE lendo a planilha, nunca pelo status HTTP, porque com no-cors o navegador devolve 0 mesmo quando gravou. | Thaina/Thiago aplicado na Luana |
| 2026-08-18 | **Deploy pelo MCP da Vercel exige conferir SHA256 e todos os assets com curl:** publicação substitui a árvore inteira, arquivo faltando vira 404 mudo e payload pode ser cortado em silêncio. O nome do projeto vira a URL e não dá para renomear. O link público é o curto, sem o sufixo do time. | Thaina/Thiago |
| 2026-08-18 | **Máscara de telefone quebrava o número da lead** (bug de produção pego no funil da Thaina, mesmo motor aqui). O autofill do iPhone entrega "+55 11 99991-2039" de uma vez, o `maxLength` cortava a string antes da máscara rodar e o 55 do país entrava como DDD: chegava "(55) 11999-9120" na planilha, com o final perdido e sem conserto. Regras: tirar o país ANTES de cortar, nunca usar `maxLength` em campo mascarado, ouvir `change` e `blur` além de `input`, normalizar também o que vai no payload, e cuidar do DDD 55 (Santa Maria/RS) que é real. Teste de entrega: colar `+55 11 99991-2039` e conferir campo e payload. | Thaina/Thiago aplicado na Luana |
| 2026-08-20 | **Copy de funil não pode ter concordância de gênero com quem lê.** O quiz da Luana saiu todo no feminino ("sou muito boa", "ser lembrada", "quero virar mentora") e o ICP dela tem médicos, advogados e coaches homens. Metade do público lia uma frase que não era sobre ele. Regra: ao escrever opção de quiz, ler em voz alta como homem e como mulher antes de aprovar. | Revisão do Daniel |
| 2026-08-20 | **Placeholder de telefone leva DDD nacional (11), não o DDD do cliente.** Estava com 48, o DDD da Luana em SC. O público é nacional e DDD regional no campo sinaliza atendimento local. | Revisão do Daniel |
| 2026-08-20 | **A validação de WhatsApp barrar um número não é bug.** Celular brasileiro tem 11 dígitos com 9 no nono. Um teste com 11111-1111 é barrado corretamente. Testamos 10 celulares reais de DDDs diferentes: zero falso negativo. O que fica de fora de propósito é telefone fixo, que tem 10 dígitos, e isso custa o lead raro que usa WhatsApp Business em fixo. | Revisão do Daniel |
| 2026-08-31 | **Cada carrossel anda numa família de cor só, letra inclusive.** O carrossel do mecanismo tinha fundo verde petróleo mas título em escuro institucional `#030118`, que puxa para o azul: azul e verde no mesmo card não uniformizam, brigam. Título passou a ser petróleo também. Regra: quando o carrossel troca o escuro institucional por outra cor do manual, a letra troca junto. | Revisão do Daniel |
| 2026-08-31 | **Vinho com dourado o cliente vetou, e vinho com dourado e azul junto ainda mais.** O comparativo técnico/percebido virou **vinho e bege**, sem dourado nenhum. Perder a cor principal numa das cinco peças não tirou a marca do material: logo, tipografia e as outras quatro peças seguram. Vale como padrão: a peça que precisa destoar pode abrir mão do dourado, não do resto. | Revisão do Daniel |
| 2026-08-31 | **Destaque por opacidade em vez de cor.** Sem dourado, o realce do card final do carrossel 4 ia virar uma cor nova fora do manual (tentei um pêssego `#E8C9B6`). A saída foi baixar a opacidade do resto da frase e deixar o trecho de destaque em creme cheio. Realce sem inventar cor. | Entrega Simple |
| 2026-08-31 | **CTA passou a ser "Toque em Saiba Mais" com a seta para baixo.** "Toque no link" e seta para o lado apontam para lugar nenhum: no anúncio o botão Saiba Mais fica embaixo do criativo. A seta indica para onde a pessoa vai de verdade. | Revisão do Daniel |
| 2026-08-31 | **Texto claro em cima de layout dividido some quando cruza a emenda.** No carrossel 4 a arroba do topo, em creme, atravessava para a metade bege e ficava invisível. Em card com fundo partido, todo elemento do topo precisa terminar antes da emenda, ou mudar de cor junto com ela. O conferidor não pega isso: para ele o elemento está dentro da área segura. | Entrega Simple |
| 2026-08-31 | **Carrossel curto converte melhor que carrossel completo: teto de 4 cards.** A primeira versão tinha 7 e 8 cards, um por frase da copy, e sobrava espaço vazio em card com uma linha só. Card quase vazio não segura swipe e ainda faz o carrossel parecer longo. Unir as frases em 4 cards resolveu as duas coisas de uma vez. | Revisão do Daniel |
| 2026-08-31 | **Cinco carrosséis com o mesmo layout leem como uma peça só repetida.** A primeira versão usava um único sistema (etiqueta, título, alternância bege/escuro) nos cinco. Agora cada um tem desenho próprio: duas batidas, fichas em fundo dourado, o vão em petróleo, coluna dividida vinho e dourado, e retrato editorial. Mesma paleta e mesma tipografia, gramáticas diferentes. | Revisão do Daniel |
| 2026-08-31 | **O dourado #B49055 aguenta ser fundo de card inteiro, com #030118 na letra.** Testado no carrossel 2 (card inteiro) e em faixa de rodapé nos carrosséis 3 e 4. Fica premium e é o que mais destoa dos outros no feed. Duas exigências: a barra de progresso e a seta precisam virar escuras junto, senão somem, e a arroba do topo não pode ficar em creme quando cai em cima do dourado. | Entrega Simple |
| 2026-08-31 | **A paleta do manual tem seis cores e a gente estava usando três.** Vinho `#441529` e verde petróleo `#07292E` estavam parados. São exatamente o que diferencia um carrossel do outro sem sair da marca: petróleo virou o escuro do carrossel do mecanismo, vinho virou a metade do técnico no comparativo. | Entrega Simple |
| 2026-08-31 | **`conferir.py`: medir a área segura do card em vez de olhar.** Conferir 20 cards a olho não escala. Duas lições de como medir: medir a **tinta** do texto (via `Range.getClientRects`) e não a caixa do elemento, porque um `<h2>` de bloco ocupa a largura toda mesmo quando a frase quebra antes e acusa card limpo; e reservar **só o retângulo do chevron** da seta, não a faixa de 46px, que é degradê transparente. Com a régua certa, sobraram 4 estouros reais que eu tinha deixado passar no olho. | Entrega Simple |
| 2026-08-31 | **Estouro e oclusão são bugs diferentes.** O conferidor pega conteúdo que sai da área segura, mas não pega faixa desenhada por cima de texto que está dentro dela: a faixa dourada do carrossel 3 cobria a última linha do título e passou na medição. Oclusão continua sendo olho, ou vira outra checagem. | Entrega Simple |
| 2026-08-31 | **A copy aprovada da Estratégia anunciava "Cinco frases" e listava quatro.** Passou pela estratégia, pela revisão e pela primeira versão do criativo. Publicado como "Quatro frases". Lição: contar o que a copy promete contar, principalmente quando o número está no primeiro card. | Entrega Simple |
| 2026-08-31 | **Carrossel de Instagram sai de gerador em Python, não de HTML escrito à mão.** Os 5 carrosséis de largada (36 slides) vêm de `gerar.py`: a copy vive em estrutura de dados e o layout em componentes. Trocar uma frase ou a paleta é uma linha, não uma varredura em 5 arquivos de 250 KB. Vale como padrão para qualquer peça em série. | Entrega Simple |
| 2026-08-31 | **Export de slide: manter o layout em 420px e escalar com `device_scale_factor`, nunca abrir o viewport em 1080.** Viewport largo refluia o texto e quebrava tipografia e espaçamento; com `device_scale_factor = 1080/420` o PNG sai em 1080x1350 idêntico ao preview. | Entrega Simple |
| 2026-08-31 | **Fonte embutida em base64 no HTML, não link para o Google Fonts.** Em navegador headless a fonte por rede chega tarde e o slide é fotografado com fonte de sistema. Montserrat e Playfair são variable fonts: um arquivo por família cobre 300 a 700, e o subset latin já cobre os acentos. 343 KB viraram 102 KB. | Entrega Simple |
| 2026-08-31 | **Pílula que repete o título é ruído, não design.** Três slides tinham título e pílulas com exatamente as mesmas palavras. Onde a lista tem sentido visual, o tratamento entra dentro da própria frase: em "Postar mais não resolve. Curso não resolve", o risco vai nas palavras, não numa fila de chips embaixo. | Revisão visual |
| 2026-08-31 | **Marca d'água grande em slide de CTA colide com o lockup de rodapé.** Saiu. O slide final já tem logo no topo, foto, botão, link e assinatura: uma sexta marca só suja. Regra: marca d'água só onde o slide está de fato vazio. | Revisão visual |
| 2026-08-31 | **"Link na bio" não serve para anúncio pago.** As copies dos criativos nasceram para orgânico. Em anúncio não existe bio, e mandar a pessoa procurar derruba conversão. Trocado por "Toque no link" com o domínio do funil escrito no slide. | Revisão do Daniel |
| 2026-08-31 | **A regra de gênero neutro pegou de novo, agora no criativo.** "Se eu fosse bom mesmo" virou "Se eu fosse mesmo excelente": é frase em primeira pessoa, então concorda com quem lê, e metade do ICP é mulher. "Excelente" não flexiona e é a palavra da própria Luana no resultado do quiz. O erro de 20/08 no quiz reapareceu na copy aprovada da estratégia, o que mostra que a revisão precisa acontecer na peça, não só na origem. | Revisão do Daniel |
| 2026-08-31 | **Playwright do pip não casa com o Chromium do ambiente.** O pacote pedia a build 1234 e o ambiente tem a 1194. Não rodar `playwright install`: passar `executable_path="/opt/pw-browsers/chromium"`. Vale para qualquer script de screenshot daqui em diante. | Entrega Simple |
| 2026-08-31 | **As artes que a Luana produz não estão no Drive do cliente.** A pasta `2. Material Visual > Criativos` está vazia; os estáticos dela vivem no grupo do WhatsApp. Sem isso, a referência de identidade tem que ser o manual de marca. Vale subir antes que suma no histórico. | Entrega Simple |
| 2026-08-20 | **Chegou o manual de marca oficial da Luana** e ele corrigiu a identidade do funil. A paleta que estávamos usando foi inferida das artes da conferência: perto no espírito, errada nos valores. O oficial é dourado `#B49055`, escuro `#030118`, vinho `#441529`, petróleo `#07292E` e branco, com Montserrat no corpo e Humble Nostalgia nos títulos (paga; usamos Playfair Display no lugar). Lição: enquanto não existe manual, inferir e **marcar como provisório**; quando chega, refazer. | Manual de marca |
| 2026-08-20 | **Fonte externa em página de conversão entra sem bloquear a renderização** (`media="print"` + `onload`). O Google Fonts travando derruba o `load` da página inteira, e numa página de formulário isso é um ponto único de falha por nada. | Entrega Simple |
| 2026-08-20 | **Depoimento com print de faturamento não sobe na página.** Dos três que a Luana mandou, dois eram captura de valor em reais. Vai contra a regra dela de não prometer resultado financeiro e arrisca o anúncio, porque a Meta lê a página de destino. Só entrou o que fala de transformação. | Entrega Simple |
| 2026-08-20 | **Imagem no deploy pelo MCP da Vercel vai em base64 e pode sair com byte trocado.** Aconteceu na foto dela: um único byte diferente, a imagem abria normal e só o SHA256 pegou. Comparar hash de TODOS os arquivos depois de cada publicação, não só dos que mudaram. | Entrega Simple |
| 2026-08-06 | **A Estratégia Completa é um PDF diagramado na identidade Simple** (navy + dourado, capa, runhead, boxes e chips), não um markdown convertido. Estrutura: capa · O Funil em Uma Página · 6 seções quebradas em partes de uma página cada · 20 criativos escritos (5 estáticos, 5 carrosséis, 10 vídeos) · estrutura de largada da campanha. Padrão validado no doc da Thaina Elvira. | Entrega Simple |
| 2026-08-05 | **Inimigo nomeado pela cliente: "Ruptura de Valor Percebido"** (a distância entre o valor que o especialista tem e o que consegue comunicar). Era a peça que faltava na narrativa: dá nome ao problema e justifica o método. O quiz passa a medir o tamanho dessa ruptura. | Grupo do projeto |
| 2026-08-05 | **MMPV virou "Método de Multiplicação do Valor Percebido"**, mantendo os quatro pilares. A sigla passa a comunicar resultado, não só estrutura. | Grupo do projeto |
| 2026-08-05 | **Refinamento da regra de linguagem:** o proibido é a identidade abstrata. A virada concreta **especialista técnico → especialista percebido** deve entrar na copy, e é o eixo mais forte que ela produziu até agora. | Grupo do projeto |
| 2026-08-05 | Padrão confirmado com esta cliente: **ela produz narrativa melhor do que a maioria dos clientes**. O trabalho da Simple aqui é menos escrever do zero e mais organizar, nomear onde usar e proteger de risco (ex.: citar valores em anúncio pago). | Grupo do projeto |
| 2026-08-04 | **Regra de linguagem definida pela cliente: não falar em "resgatar identidade" na comunicação.** Isso é entrega e overdelivery, não anúncio. A copy pública é "quem é visto, vende mais", deixar de ser ignorado, valor percebido e mais vendas. Lição geral: o mecanismo interno raramente é a promessa que vende. | Grupo do projeto |
| 2026-08-04 | **A promessa passou a incluir "vender mais"**, por decisão dela (o movimento dela é contra a invisibilidade digital E pelo aumento das vendas). Continua proibido prometer número de faturamento. | Grupo do projeto |
| 2026-08-04 | **Conferência "O Fim da Invisibilidade" (19/08) entrou como fase do roadmap.** Evento já marcado por ela vira caixa, lista e prova antes do funil subir. Padrão a repetir: quando o cliente já tem evento marcado, absorver no plano em vez de tratar como distração. | Grupo do projeto |
| 2026-08-04 | Ela **produz as próprias artes e copies**, em identidade visual consistente. Combinado que sempre manda no grupo. Economiza rodada de criativo e mantém a linguagem alinhada. | Grupo do projeto |
| 2026-08-04 | **Posicionamento evoluiu para "restaurar a identidade"**, formulação dela: "você não precisa parecer maior, precisa tornar visível quem realmente é". Melhor que "sair da invisibilidade" porque legitima ela falar de mentalidade, neurociência e vendas **dentro do mesmo produto**. Resolveu a inquietação de "sinto que posso entregar mais" sem criar produto novo. | Grupo do projeto |
| 2026-08-04 | **Produto principal passa a ser a mentoria MMPV (R$ 7 mil)**, não a consultoria de R$ 15 mil. Racional do Daniel: a mentoria gera caixa com volume, o caixa compra estrutura, e o mercado indica o próximo produto conforme ela entrega as turmas. Consultoria vira porta lateral por indicação. | Áudio do Daniel |
| 2026-08-04 | **Nome MMPV confirmado**, sai de "em revisão". O que muda é o mecanismo, recontado a partir de quem a pessoa é. | Carlos no grupo |
| 2026-08-04 | Contenção funciona melhor com nuance: não é "não faça nada", é **"produto novo não entra, mas posicionamento e conteúdo das outras frentes seguem em paralelo"**. Foi essa distinção que fez ela aceitar o foco ("vamos seguir na mentoria, então"). | Áudio do Daniel |
| 2026-08-04 | Ela traz **copy própria de boa qualidade**. Vale sempre pedir a frase dela antes de escrever do zero: sai melhor e a validação é imediata. Três frases dela já entraram no material aprovado. | Grupo do projeto |
| 2026-07-30 | **Guia de captação de depoimentos** entregue. Particularidade: os depoimentos dela não podem falar de faturamento, só de valor percebido e virada de posicionamento. | Entrega Simple |
| 2026-07-30 | **Roadmap de 90 dias** montado no Perfil B (a Simple implementa). Decisões estruturais: carro-chefe é a **consultoria de R$ 15 mil** (não a mentoria, porque é a que já vende por indicação e consome menos tempo dela), mentoria de R$ 7 mil como downsell de call, individual de R$ 30 mil até o dia 30. Meta: R$ 50 mil/mês = 4 vendas = ~13 sessões/mês = 3 por semana, cabendo na janela da tarde. Incluída uma **"regra da fila"** para conter as ideias novas. | Entrega Simple |
| 2026-07-29 | Caixa apertado no início do contrato (entrada de R$ 1 mil, sem reserva). Sequência obrigatória: **caixa rápido na base existente → funil no ar → processo comercial**. Estrutura antes de receita quebra o projeto. | Call de vendas + onboarding |

## 24/08/2026 · Depoimento em vídeo com valor em reais na tela

Os três depoimentos em vídeo (Ali Klemt, Allan, Caroline Seyler) entraram no
relatório pós-quiz. O da Ali tem **"47k em Mentoria" queimado na imagem** nos
primeiros 5 segundos.

Levantei que isso rompe a régua que a gente aplicou nos depoimentos escritos
(nenhum valor em reais, porque a Luana não promete resultado financeiro e a Meta
lê a página de destino do anúncio) e **o cliente decidiu publicar assim mesmo**.
Fica registrado nos três lugares que alguém abriria depois: aqui, no
`depoimentos/README.md` e no comentário do `diagnostico.js`.

Os três vídeos foram **assistidos inteiros e aprovados pelo Daniel em 24/08**, e
as **três pessoas autorizaram** o uso em página pública. Vale como modelo: essas
duas checagens não são minhas para fazer (não ouço áudio, não falo com as
pessoas), então em vídeo de depoimento elas entram como pendência nomeada até
alguém confirmar, e não como suposição.

Aprendizado prático, independente da decisão: **letreiro queimado em vídeo não
tem conserto por filtro.** Tentei `delogo` e o resultado ficou pior que o
problema, porque o texto caía sobre o cabelo dela e a quina da parede, e o
filtro só interpola a partir das bordas da caixa. Sobrou um borrão óbvio.
Quando o letreiro estiver sobre fundo liso dá para tentar; sobre pessoa ou
textura, não. **Pedir reexport é mais rápido que tentar limpar.**

Dois detalhes que valem para qualquer vídeo de depoimento:

- **Vídeo editado no CapCut costuma vir com 8 segundos de marca d'água no fim.**
  Conferir o fim de todo vídeo que o cliente manda, e cortar.
- **Pôster nunca no primeiro quadro.** Vídeo de celular quase sempre começa com
  a pessoa de olho fechado ou virando o rosto. Escolher um quadro do meio.

## 24/08/2026 · Bug que fazia o lead evaporar sem deixar rastro

O funil estava no ar e **nenhum lead chegava na planilha**. Nenhum erro em
lugar nenhum: nem no navegador, nem no Make, nem na planilha.

Causa: o `fetch` usava `mode: "no-cors"`. Nesse modo o navegador **descarta em
silêncio** o header `Content-Type: application/json`, porque em no-cors só
passam os três tipos de formulário. O POST chegava no Make como `text/plain`, o
Make respondia **200 "Accepted"** e jogava fora. Comprovado lado a lado: mesmo
corpo, mesma URL, só mudando o content-type, um grava e o outro some.

Correção: tirar o `mode: "no-cors"`. O webhook do Make responde ao preflight
(`access-control-allow-origin: *`, `allow-headers: content-type`), então CORS
normal funciona e o content-type chega de verdade.

**A lição que vale para todo funil:** eu tinha "validado" a integração com curl
e lendo a planilha, e passou. **Curl não testa o caminho do navegador**, porque
curl manda o content-type certo e passa mesmo com o bug em pé. Validação de
integração de funil é **responder o quiz inteiro no navegador** e depois ler a
planilha. Qualquer coisa menos que isso não é validação.

E não confie em status HTTP com webhook do Make: ele devolve 200 tanto para o
que grava quanto para o que descarta.

**Checar se os outros funis têm o mesmo `mode: "no-cors"`.** Não mexi neles
porque a sessão era da Luana, mas o padrão veio do mesmo molde.

## 26/08/2026 · Pixel da Meta instalado, com evento de qualidade

Pixel `486556150328290` no ar nas duas páginas do funil. O evento de conversão é
o **`Lead`**, na captura do contato.

O que vale repetir nos outros funis: **o `Lead` leva os parâmetros de
qualificação** (`qualificacao`, `faixa`, `irv`, `resultado`, pilar). Com isso dá
para criar Conversão Personalizada filtrando `qualificacao = fila-quente` e
mandar o algoritmo perseguir **lead bom em vez de lead barato**.

É a diferença entre otimizar por volume e otimizar por qualidade, e não custa
nada: o dado já existia no funil, só não estava indo para o Pixel. Vale
especialmente aqui, onde tráfego já falhou uma vez por encher de lead ruim.

Também entrou o **`Contact`** no clique do WhatsApp do relatório: é o sinal de
intenção mais forte do funil e um bom candidato a evento de otimização quando
houver volume para isso.

**Nenhum dado pessoal vai para o Pixel.** Só qualificação.

Detalhe técnico que quase passou: `node --check` valida sintaxe, **não valida
referência indefinida**. Chamei uma função que existe no `app.js` mas não no
`diagnostico.js`, passou no check e teria quebrado o relatório inteiro no
navegador. Renderizar de verdade pegou. **Checagem de sintaxe não substitui
abrir a página.**

## 27/08/2026 · Conversão Personalizada da Meta não filtra por parâmetro

Tentamos criar Conversão Personalizada filtrando `qualificacao = fila-quente`,
que era o plano para otimizar por qualidade de lead. **Não dá:** o construtor de
regra da Meta oferece **só "URL contém"**, não expõe parâmetro de evento.

**Solução, e vale para todo funil daqui em diante:** dispare um **evento
personalizado por faixa** (`LeadFilaQuente`, `LeadQualificado`, `LeadNutrir`,
`LeadFora`) junto com o `Lead` padrão. Evento sempre aparece no seletor de
Conversão Personalizada; parâmetro nem sempre. Mantenha o parâmetro também, que
serve para relatório.

Nome do evento em CamelCase: a Meta não aceita hífen.

**A parte estratégica, que é a que mais importa:** com R$ 66/dia **não se otimiza
por fila-quente**. A Meta precisa de ~50 conversões por semana por conjunto para
sair do aprendizado, e fila-quente rende talvez 7. Otimizar por evento raro mata
o algoritmo por falta de sinal e encarece o lead.

O certo nesse orçamento: **otimizar por `Lead`** e usar as conversões
personalizadas **para medir**, decidindo na mão onde pôr dinheiro. Trocar o
evento de otimização só quando o volume justificar.
