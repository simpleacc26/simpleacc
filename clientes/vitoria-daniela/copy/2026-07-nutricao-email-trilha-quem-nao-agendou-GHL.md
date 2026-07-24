# Trilha de e-mail "Quem não marcou a reunião" — versão GHL-ready

Copy final da Vitória (documento aprovado por ela), formatada pra montar o
Workflow de e-mail no GHL. **A copy é dela, preservada; só ajustei o que é
técnico:** merge fields, links dos botões, referência ao anexo e limpeza de
notas internas.

## Configuração geral (para o Workflow)

- **Objetivo:** levar quem respondeu o quiz (e não agendou) a **agendar a
  conversa estratégica**. (Não é a trilha do R$97 — essa fica separada pra depois.)
- **Gatilho de entrada:**
  - Base de leads: contato ganha a tag `lead_quiz` (vem do quiz).
  - Prospecção ativa: contato ganha a tag `prospeccao_ativa` (adição manual/import).
- **Saída obrigatória:** se o contato **agendar** (tag `agendou` ou a oportunidade
  mudar pra etapa de reunião marcada), ele **sai do workflow** e para de receber.
- **Remetente:** contatovitoriadaniela@gmail.com (precisa estar conectado/verificado
  no GHL como e-mail de envio).
- **Personalização:** onde estiver `{{contact.first_name}}`, o GHL preenche o
  primeiro nome. (No doc original vinha como `{{primeiro_nome}}` / `[Nome]`.)
- **Cadência:** e-mail 1 imediato ao entrar; os demais a cada **2 dias úteis**
  (pular fins de semana). No GHL: passo **Wait 2 dias** com a opção de continuar
  só em dias de semana (seg a sex).

### Link único dos botões de CTA (WhatsApp, número ativo 5533997064731)

```
https://api.whatsapp.com/send/?phone=5533997064731&text=Ol%C3%A1%2C%20vim%20pelo%20e-mail%20e%20quero%20agendar%20minha%20an%C3%A1lise%20estrat%C3%A9gica.&type=phone_number&app_absent=0
```
Todos os botões ([QUERO CLAREAR MEU CAMINHO], [QUERO CONVERSAR COM VOCÊ], etc.)
apontam pra esse link.

### Pendências de asset (a Vitória vai enviar)

- **E-mail 3:** link do vídeo de debriefing (case Fernanda) → `[LINK DEBRIEFING]`.
- **E-mail 4:** prints/provas (Carol Rache, Portes Contabilidade, pasta de
  consultoria) → marcados como `[inserir imagem/prova]`.

---

## Cronograma (dias úteis)

| # | Quando | Assunto |
|---|--------|---------|
| 1 | Imediato | recebi suas respostas do QUIZ |
| 2 | +2 dias úteis | a resposta para a falta de resultados |
| 3 | +2 dias úteis | 28 mil em 40 dias mudaria seu negócio? |
| 4 | +2 dias úteis | Vitória? Quem? |
| 5 | +2 dias úteis | Talvez meu método não funcione pra você. |
| 6 | +2 dias úteis | o que eu realmente faço? |
| 7 | +2 dias úteis | uma ação só nunca é suficiente |
| 8 | +2 dias úteis | girar todas as engrenagens sozinha? |
| 9 | +2 dias úteis | isso funciona pro meu caso específico? |
| 10 | +2 dias úteis | isso funciona pro meu caso específico? |

---

## E-mail 1 — Entrega do diagnóstico (imediato)

**Assunto:** recebi suas respostas do QUIZ
**Prévia:** e uma coisa me chamou atenção
**Anexo:** Diagnóstico Estratégico (PDF)

Oii, {{contact.first_name}}, aqui é a Vitória Daniela. Você respondeu o QUIZ para entender como seu negócio pode crescer com previsibilidade na internet e seu diagnóstico está pronto!

Dentro dele você vai entender os 3 gargalos ocultos que provavelmente estão drenando sua energia agora (a maioria de quem responde o quiz como você tem pelo menos dois dos três rodando ao mesmo tempo, sem perceber), e por que rodar em círculos, colocando energia onde não traz resultado, é como passar batom em quem está sangrando.

**O seu diagnóstico está no anexo deste e-mail.**

E falando nisso, as respostas que você trouxe me chamaram atenção. Percebo que você tem vontade de crescer, de se tornar conhecida no seu mercado e vender mais.

Mas isso é o básico de um negócio, né? Chega a ser óbvio…

O que ninguém te conta é o motivo pelo qual, mesmo sabendo disso há anos, você ainda tenta resolver do mesmo jeito que tentou no mês passado, e no anterior também.

Não é preguiça, e pelas suas respostas, também não é falta de tentativa, você já testou coisa, já gastou tempo, talvez até já tenha pago alguém pra ajudar. O problema é mais chato de admitir: seu negócio hoje tem pedaços que não conversam entre si.

Você cria conteúdo de um jeito, capta cliente de outro, vende meio no improviso, e as vendas seguem no talento mesmo, sem processo validado por trás.

Cada pedaço até funciona sozinho. Só que juntos, eles não estão te levando pra lugar nenhum, e é por isso que parece que você trabalha o dobro pra crescer nem a metade do que devia.

O diagnóstico que você acabou de receber mostra exatamente onde esses pedaços estão desconectados no seu caso. Mas ele só aponta a falha geral, o plano pro seu ticket específico, pro seu produto, é individual, e isso só sai numa conversa com olhar voltado pro seu negócio.

Vou entender seu momento, seu produto, e te mostrar o que fazer para alcançar o próximo degrau da escada do seu negócio.

É isso que você quer?

**[BOTÃO: QUERO CLAREAR MEU CAMINHO]** → link CTA

Agora, você tem um mapa preciso da raiz do problema e está num lugar seguro para resolvê-lo.

Aproveite o que descobriu. O que você faz a partir de agora pode mudar tudo.

Att: Vitória Daniela | Grupo Magna

---

## E-mail 2 — Aumentando nível de consciência (+2 dias úteis)

**Assunto:** a resposta para a falta de resultados
**Prévia:** a visão que vai mudar o seu negócio

Oii, {{contact.first_name}}. Esses dias eu ouvi de uma cliente assim: não faz sentido ter a bagagem que eu tenho e não estar no nível que eu deveria.

Com isso, eu quero te trazer uma visão que pode mudar a sua forma de enxergar o seu próprio negócio daqui pra frente.

O mercado de marketing vende a ideia de que basta uma ÚNICA ação para construir um negócio dentro da internet. Exemplo: rodar mais tráfego, postar todo dia, gravar mais reels...

É por isso inclusive, que tem muito profissional que contrata alguém pra fazer algo dentro da empresa, ou até mesmo tenta fazer sozinho, não tem resultados e acaba se sentindo MEGA frustrado.

E pior ainda é ver que tem gente bem pior chegando mais longe do que você.

Já aconteceu com você?

**A visão estratégica para um negócio ter resultados previsíveis**

Pense numa empresa que você conhece. Ela não chegou onde está hoje fazendo SÓ UMA AÇÃO ou rodando apenas um setor.

Uma empresa não sobrevive apenas com marketing, apenas com comercial ou apenas com o RH. Uma empresa de verdade precisa de todos os setores rodando em sincronia.

No digital, o mercado tentou te convencer de que basta "rodar tráfego" ou "fazer vídeos todo dia" para vender. Isso é uma ilusão e você já vive isso na pele todos os dias.

O negócio digital não é diferente de um negócio físico: ele exige a concepção de um ecossistema completo para dar certo.

Você já cria seus posts, já tenta crescer, vende, atende e entrega o seu serviço. A única questão é: essas ações estão organizadas e gerando retorno, ou estão te deixando exausta sem sair do lugar?

Na Magna trabalhamos 3 pilares:
1. Captação de clientes
2. Marketing e presença digital
3. Direcionamento comercial e conversão

E é justamente esse olhar de sistema 360º, não de ação isolada, que eu levo pra dentro de cada negócio que passa pela Magna.

Na nossa reunião individual, eu e você, vamos entender o seu momento e o que você precisa para ir para o próximo degrau, e como podemos aplicar o método Magna para trazer previsibilidade dentro do digital pro seu negócio.

**[BOTÃO: QUERO CONVERSAR COM VOCÊ]** → link CTA

Agora você entende o que é preciso para construir um negócio no digital.

Te vejo na nossa conversa.

Att: Vitória Daniela | Grupo Magna

---

## E-mail 3 — Prova social (+2 dias úteis)

**Assunto:** 28 mil em 40 dias mudaria seu negócio?
**Prévia:** veja o que fizemos

Oii, {{contact.first_name}}. Esses dias venho te mandando alguns emails, e depois de tudo que eu te expliquei sobre sistema, sobre as peças que precisam conversar entre si, eu quero te mostrar isso acontecendo de verdade, não só na teoria.

A Fernanda chegou até mim já vendendo, mas ela sabia que poderia chegar mais longe, que poderia desafogar de funções que ela não estudou pra fazer e sabia que precisava de um caminho que olhasse pro negócio dela de forma personalizada.

Depois de estudar por ANOS, ela sabia que precisava de alguém que respeitasse sua trajetória e cuidasse do seu negócio com seriedade.

Gravei um debriefing contando o que eu implementei pra ela, o que ajustamos e o que mudou depois que implementamos o método Magna.

Se você está no mesmo momento da Fernanda, esse é um vídeo que vai mudar seu negócio.

**[BOTÃO: Assiste o debriefing aqui]** → `[LINK DEBRIEFING]`

Se em algum momento você reconhecer o seu próprio negócio nesse vídeo, guarde esse ponto. Vale trazer isso pra nossa conversa.

Nessa conversa, eu e você, vamos entender o seu momento e o que você precisa para ir para o próximo degrau, e como podemos aplicar o método Magna para trazer previsibilidade dentro do digital pro seu negócio.

**[BOTÃO: QUERO CONVERSAR COM VOCÊ]** → link CTA

Te vejo em breve.

Att: Vitória Daniela | Grupo Magna

---

## E-mail 4 — Quem é a Vitória (+2 dias úteis)

**Assunto:** Vitória? Quem?
**Prévia:** quem sou eu na fila do pão?

{{contact.first_name}}, você preencheu o QUIZ de diagnóstico de vendas e marketing da sua empresa, e já deve ter passado pela sua cabeça: Quem que é essa Vitória? O que ela faz?

**POR QUE VOCÊ DEVERIA ME ESCUTAR?**

Sinceramente? Não deveria.

Pelo menos não baseado em promessas vazias ou frases de efeito.

Hoje no mercado de marketing, você chuta uma pedra e saem 5 "especialistas". E na Internet é muito fácil parecer expert em alguma coisa. Você na sua área deve conseguir pensar em alguns exemplos…

Mas talvez você devesse considerar alguns fatos, antes de decidir se eu sou mais um desses gurus de marketing digital:

- Faturo múltiplos 6 dígitos aplicando esse mesmo nível de pensamento estratégico no meu próprio negócio, na Magna.
- Sou CEO do Grupo Magna desde 2021, e tenho mais de 8 anos de mercado sendo estrategista e copywriter.
- Nesses bons anos eu trabalhei no background de centenas de empresas e em diversas funções: gerência de marketing, estrategista e copywriter. Trabalhei em agências grandes do Brasil, já fui copywriter principal de grandes experts e lançamentos.
- Investi tempo e dinheiro estudando, mas 90% do que eu sei hoje veio de fazer. Pra mim, pros meus clientes, dentro de cada projeto que passou pela Magna.

**Veja alguns dos clientes que já atendi:**

- Carol Rache — Lançamento. Em 2025 fui copywriter do lançamento dela, fizemos 3 milhões em 7 dias. `[inserir imagem/prova]`
- Portes Contabilidade — Implementação. Tem 1 ano que implementamos o funil Magna, e hoje a empresa tem mais de 120 clientes ativos, gerando receita de mais de 60.000 por mês. `[inserir imagem/prova]`
- Clientes de consultoria e aceleração. `[inserir imagem/prova]`

E fora outros tantos que já atendi.

A minha ideia aqui não é te convencer que eu sou a "bambambam", mas sim facilitar a sua visão e deixar pra você decidir se é esse tipo de parceiro que você quer ter no seu negócio.

Porque no fim, a pergunta não é se eu sou boa o suficiente ou se sou especialista pra te ajudar. É se o jeito como eu penso em negócio, combina com o que você quer construir no seu.

Se combinar, é hora da gente conversar.

Vou entender seu momento, seu produto, e te mostrar o que fazer para alcançar o próximo degrau da escada do seu negócio.

É isso que você quer?

**[BOTÃO: QUERO CLAREAR MEU CAMINHO]** → link CTA

Vamos entender o seu momento e o que você precisa para ir para o próximo degrau, e como podemos aplicar o método Magna para trazer previsibilidade dentro do digital pro seu negócio.

Te vejo em breve!

Att: Vitória Daniela | Grupo Magna

---

## E-mail 5 — Exclusão de perfil (+2 dias úteis)

**Assunto:** Talvez meu método não funcione pra você.
**Prévia:** Acontece…

{{contact.first_name}}, posso ser sincera? Talvez meu método não funcione pra você.

Eu prefiro te falar isso de forma direta do que gastar seu tempo e o meu, te levar pra uma reunião e te mostrar um método que não vai funcionar pra você.

Depois de mais de 300 projetos, aprendi que o método Magna só faz sentido quando existe um encaixe de fatores.

**Eu NÃO consigo te ajudar a vender mais se:**

- Você não quer estruturar um negócio de longo prazo
- Você não tem um serviço/produto validado
- Não quer gastar energia ou tempo pra fazer as coisas darem certo
- Você não quer fazer nada e quer um milagre amanhã
- Você quer tudo caindo do céu, sem se comprometer com o processo.
- Você não está disposta a investir financeiramente numa solução pro que está passando.

Se você se identificou com esses pontos, sem problema nenhum. Só que essa não é a hora certa pra gente conversar, e prefiro ser honesta com você agora do que te fazer perder tempo com uma reunião que não vai levar a lugar nenhum.

Mas se você chegou até aqui e nada disso te representa, se o que te trava não é falta de vontade e você tem sangue no olho pra chegar no próximo nível do seu negócio, então essa conversa faz total sentido.

Eu consigo te ajudar a vender mais, e a construir seu negócio de forma previsível pra que você tenha:
- autonomia
- liberdade
- resultados
- e menos dores de cabeça com marketing e vendas.

Se você já sabe que precisa investir energia e dinheiro pra fazer dar certo, e só falta o direcionamento certo pra juntar as peças que já existem no seu negócio, chegou a hora da gente conversar.

**[BOTÃO: QUERO CONVERSAR COM VOCÊ]** → link CTA

Te vejo em breve.

Att: Vitória Daniela | Grupo Magna

---

## E-mail 6 — Sobre o que eu vendo (+2 dias úteis)

**Assunto:** o que eu realmente faço?
**Prévia:** Saiba se é o que você precisa pro seu negócio.

{{contact.first_name}}, aqui é a Vitória Daniela, do Grupo Magna.

Vou ser bem direta com você: Eu ajudo profissionais e empresários que já vendem produto ou serviço de ticket alto a construir um negócio que gera resultados previsíveis na internet, estruturando três frentes:

- Marketing e presença digital
- Captação de clientes de forma recorrente
- Conversão e suporte comercial

Não vou te vender curso e também não somos agência de marketing.

E sendo bem transparente aqui, eu consigo te atender de duas formas:

- **Direcionamento**: eu te acompanho pessoalmente e direciono você e/ou seu time pra melhor estratégia de vendas, marketing, organização e suporte comercial.

OU

- **Direcionamento + Execução**: além de tudo isso, minha equipe toca o operacional da presença digital do seu negócio. Sua única função vai ser gravar vídeo, vender, entregar e gerir seu negócio. O resto a gente implementa 100% e tira essa burocracia das suas costas.

É de algum desses acompanhamentos que seu negócio precisa?

Você quer ter direcionamento baseado no que vai funcionar pro SEU negócio, para vender seu trabalho e cuidar daquilo que você não quer/gosta de fazer?

Você quer um time, além de especialistas, que se preocupa com seu negócio?

Então você precisa ter uma conversa diretamente comigo pra gente bolar o seu plano de ação.

Fale com meu time no WhatsApp e marque seu horário comigo essa semana ainda e bora fazer isso acontecer.

**[BOTÃO: QUERO MINHA CONVERSA ESTRATÉGICA]** → link CTA

Te vejo no próximo nível do seu negócio,

Vitória Daniela | Grupo Magna

---

## E-mail 7 — Uma ação só nunca é suficiente (+2 dias úteis)

**Assunto:** uma ação só nunca é suficiente
**Prévia:** o que separa quem cresce de quem trava

{{contact.first_name}}

Quando falamos de um negócio sério que você quer construir, não estamos falando de criar conteúdo no instagram.

Isso é um ponto no meio de um todo.

Pra construir seu trabalho até aqui, com certeza você não se preocupou só com uma área, né? Na internet é a mesma coisa.

O mercado tenta vender a ideia que é só fazer UMA AÇÃO nas redes sociais que você vai estourar de vender e não é assim.

Pra ter resultados previsíveis e de longo prazo, é necessário três coisas:

**1. Entender o SEU momento e o que você precisa.**
Existem dezenas de formas de vender online, mas nem todas cabem no seu negócio agora, e a maioria dos empresários bate cabeça tentando copiar o que vê dando certo no perfil dos outros.

**2. Estruturar o que é necessário pra você subir de degrau.**
Não adianta ter conteúdo bom sem captação, nem captar gente sem estrutura comercial pra converter. Sem as peças conversando entre si, você fica numa torneira aberta de tempo, energia e dinheiro.

**3. Sair de uma fase e ir pra próxima, com assertividade.**
Depois de resolver o que trava hoje, faz sentido pensar em escala, crescimento e outros patamares.

Repara numa coisa: todo profissional que chegou no topo teve, em algum momento, alguém de fora olhando pro jogo inteiro junto com ele.

Não porque não soubesse jogar, mas porque de dentro da própria operação, o dia a dia consome o espaço que seria pra enxergar o tabuleiro completo.

O que eu posso fazer é te entregar de forma personalizada e individual, a estrutura completa que você precisa pra construir um negócio previsível, de acordo com o que você merece depois de ter gastado anos estudando a sua profissão.

Na Magna, você vai ter acompanhamento 360º dentro das três áreas: marketing, vendas e captação.

Você só precisa tomar UMA decisão.

Clica no botão aqui embaixo, fale com meu time e marque um horário comigo ainda essa semana pra gente bolar o seu plano de ação.

**[BOTÃO: QUERO MINHA CONVERSA ESTRATÉGICA]** → link CTA

Bora que tem muito trabalho pra executar e resolver os desafios que você vem passando no seu negócio.

Te vejo no próximo nível do seu negócio,

Vitória Daniela | Grupo Magna

---

## E-mail 8 — Expor a dor (+2 dias úteis)

**Assunto:** girar todas as engrenagens sozinha?
**Prévia:** você não estudou pra isso

{{contact.first_name}}, essa semana ouvi de uma cliente algo que já ouvi de tantas outras: "eu não estudei pra fazer marketing, tô cansada de girar todas as engrenagens sozinha".

Ela não estava reclamando de não vender. O problema era outro: precisar aprender marketing, criar post, entender de algoritmo, gastar tempo pensando como vender mais, sendo que ela não estudou anos para isso.

Você já sabe que a internet pode ser uma ferramenta poderosa de vendas e construção de autoridade pro seu negócio. Já acompanhou especialista, já deve ter comprado curso ou mentoria, já testou estratégia sozinha, e pode ser que já tenha contratado alguém para ajudar sem ter o resultado que precisa.

Mesmo depois de tanto esforço, ainda sente falta de algo para transformar seu negócio num reflexo do profissional que você é fora das telas e receber o reconhecimento que merece.

Isso gera frustração, cansaço, e muitas vezes até vontade de desistir ou a sensação de que nada disso funciona, só porque existe informação demais no mercado e nenhuma direção clara pro seu caso específico.

E o pior: no fundo você sabe que tem um serviço excelente, mas cansa de ver gente com menos experiência vendendo mais só porque entende de se posicionar e captar cliente.

Eu acredito fielmente que algo que você precisa, se você se identificou com isso, é de uma estrutura pensada pro seu negócio específico. Um plano de ação para chegar nos seus objetivos e com expertise no que você vende.

A visão que eu trago pros meus clientes na Magna é: um negócio previsível precisa de um sistema onde marketing, captação e vendas conversem entre si, pra você fazer só o que só você precisa fazer: entregar seu trabalho com excelência, atender seus clientes e gerir seu negócio.

Se você vê que essa visão é o que você precisa para ir pro próximo degrau, eu vou bolar o plano de ação do seu negócio com você.

Você só precisa tomar UMA decisão.

Clica no botão aqui embaixo, fale com meu time e marque um horário comigo ainda essa semana pra gente bolar o seu plano de ação.

**[BOTÃO: QUERO MINHA CONVERSA ESTRATÉGICA]** → link CTA

Te vejo no próximo nível do seu negócio,

Vitória Daniela | Grupo Magna

---

## E-mail 9 — Quebrando objeção (+2 dias úteis)

**Assunto:** isso funciona pro meu caso específico?
**Prévia:** ou é molde pronto que vocês encaixam em qualquer perfil?

{{contact.first_name}}, tem uma pergunta que quase todo mundo tem antes da nossa conversa, mesmo sem dizer em voz alta: "será que isso funciona pra mim, ou é molde pronto que vocês enfiam em qualquer pessoa?"

E é muito importante e pertinente essa pergunta.

Quero começar aqui te falando que: não vendemos curso e também não somos agência de marketing.

O formato de agência ou de curso é vender uma fórmula pronta, e só copiar e colar a mesma coisa. Porém, você tem noção de quantas formas existem de vender hoje?

Existem no MÍNIMO, 50 formas e estratégias de venda dentro da internet. Não tem cabimento copiar e colar a mesma estrutura pra todo mundo.

Existem sim estratégias que funcionam mais que outras dependendo do seu nicho, mas mesmo assim não é copiar e colar pra todo mundo.

Na Magna, a gente organiza isso entendendo a fundo seu negócio, seu público e seu produto/serviço pra decidir o melhor caminho, dentro do seu momento e estrutura atual.

Seu negócio tem particularidades que precisam ser respeitadas e ter uma estratégia. Só assim conseguimos trazer resultados satisfatórios.

É por isso que na nossa conversa estratégica eu vou:
- Entender seu momento e sua estrutura atual
- Entender o que você precisa fazer para chegar no próximo nível
- Montar seu plano de ação

Você quer ter um olhar específico e cuidadoso pro seu negócio?

Quer um plano de ação pra resolver de uma vez por todas os desafios que seu negócio e você, vem passando?

Está pronta pra ter uma solução e implementar ela no seu negócio?

Se a resposta for sim, o seu próximo passo é avançar pra uma conversa comigo e assim a gente bater todos esses pontos.

Clica no botão aqui embaixo, fale com meu time e marque um horário comigo ainda essa semana pra gente bolar o seu plano de ação e dar o próximo passo.

**[BOTÃO: QUERO CONVERSAR COM VOCÊ, VITÓRIA]** → link CTA

Te vejo no próximo nível do seu negócio,

Vitória Daniela | Grupo Magna

---

## E-mail 10 — Urgência e decisão (+2 dias úteis)

**Assunto:** isso funciona pro meu caso específico?
**Prévia:** ou é molde pronto que vocês encaixam em qualquer perfil?

_(Assunto/prévia mantidos conforme o documento da Vitória.)_

{{contact.first_name}}, vou ser direta com você.

Eu reviso pessoalmente cada resposta de quem responde o QUIZ de diagnóstico de venda e marketing, antes de marcar uma reunião de fato.

Faço isso pra poder não perder nem o tempo dos profissionais e nem o meu, e pra eu poder me dedicar e olhar o seu momento, seu produto, seu ticket, com atenção e realmente poder bolar um plano de ação pro seu negócio.

E por causa disso, o número de conversas que eu consigo sustentar por semana, mantendo esse nível de atenção, é baixo.

Não dá pra empilhar quarenta conversas na mesma semana e continuar entregando o mesmo olhar individual e personalizado.

Isso não é discurso de vendedor pra te apressar, nem gatilho de escassez. É matemática simples.

Você quer esse olhar individual no seu negócio, ou prefere continuar tentando ajustar sozinha o que já vem tentando há meses sem conseguir chegar no patamar que você quer?

Você já sabe que precisa desse direcionamento, mas você precisa decidir colocar isso em prática e investir tempo, energia e dinheiro no seu projeto.

Eu já te enviei vários emails e você já viu tudo que precisava ver, a bola tá com você agora.

Se você já sabe que chegou a hora de sair do improviso, clica no botão aqui embaixo, fala com meu time e marca seu horário ainda essa semana.

**[BOTÃO: ESTOU PRONTA E QUERO IMPLEMENTAR]** → link CTA

Te vejo no próximo nível do seu negócio,
Vitória Daniela | Grupo Magna

---

## Blueprint do Workflow no GHL (passo a passo pra montar)

1. **Criar Workflow** (Automation → Workflows → Create): nome
   "Nutrição E-mail · Trilha Quem Não Agendou".
2. **Trigger(s):** "Contact Tag" adicionada = `lead_quiz`. Adicionar um 2º trigger
   "Contact Tag" = `prospeccao_ativa` (mesmo workflow).
3. **(Recomendado) Filtro/limpeza inicial:** um passo "If/Else" logo no começo
   pra sair se já tiver a tag `agendou` (não recomeçar quem já marcou).
4. **E-mail 1** (Send Email): colar assunto/prévia/corpo, anexar o PDF do
   diagnóstico, botão com o link CTA.
5. **Wait 2 dias** (marcar a opção de continuar só em dias de semana) → **E-mail 2**.
6. Repetir Wait + E-mail até o **E-mail 10**.
7. **Saída da trilha:** configurar o workflow com "Remove from workflow" quando a
   tag `agendou` for adicionada (ou usar um "Goal"/"Wait for trigger" de
   agendamento). Assim, quem marca a reunião para de receber.
8. **Remetente:** definir contatovitoriadaniela@gmail.com como e-mail de envio
   (conectar/validar no GHL antes).
9. **Testar:** rodar com um contato de teste (tag `lead_quiz`) e conferir
   recebimento, merge do nome, anexo e botão.

### Observações importantes
- **Prospecção ativa:** vários e-mails dizem "você respondeu o QUIZ". Pra quem foi
  prospectado ativamente (não fez o quiz), o e-mail 1 não encaixa. Decidir depois:
  (a) fazer essas pessoas passarem pelo quiz antes, ou (b) criar uma variação do
  e-mail 1 pra elas.
- **Entregabilidade:** enviar automação em volume de um @gmail.com comum tem
  limite diário e pode cair em spam. Se o volume crescer, avaliar um domínio
  próprio de envio no GHL (ex.: contato@dominiodavitoria) com SPF/DKIM.
