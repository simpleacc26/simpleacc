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
