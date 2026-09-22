# Prompt do Diagnóstico D-90 para o Lovable

Este é o material que o Renan combinou de enviar ao André na call de 22/09: a
estrutura completa do quiz e a lógica do cálculo do diagnóstico, escritas como
prompt, para ele replicar o diagnóstico dentro da plataforma Musikalis.

**Como usar:** copie tudo que está entre as duas linhas de corte e cole no
Lovable. O prompt é autocontido, não depende de nenhum anexo e já traz as
perguntas, os pesos, as faixas, os textos do diagnóstico e o contrato de saída
dos dados.

**Antes de enviar, o Renan precisa trocar três marcadores:**

| Marcador no prompt | O que colocar |
| --- | --- |
| `{{PIXEL_ID}}` | O ID do pixel criado no gerenciador (ver `PIXEL-META.md`) |
| `{{URL_WEBHOOK_PLANILHA}}` | A URL do app da Web do Apps Script publicado na planilha (ver `apps-script-planilha.gs`) |
| `{{FAIXAS_VAZAMENTO}}` | Só se o André mudar os percentuais. Ver a ressalva no fim deste arquivo |

**A referência viva é https://musikalis-diagnostico.vercel.app.** Se houver
divergência entre o prompt e a página no ar, a página no ar manda: ela é o que
o André já viu e aprovou.

---
✂️ COMEÇA AQUI ✂️
---

# Diagnóstico D-90 da Musikalis

Crie, dentro da plataforma, uma página pública de diagnóstico chamada
**Diagnóstico D-90**. Ela substitui o onboarding atual de novos usuários e é
também a página de destino do tráfego pago da Simple.

Referência visual e funcional no ar: https://musikalis-diagnostico.vercel.app

## 1. O que a página faz

Um fluxo único, numa página só, sem recarregar:

```
9 perguntas → captura de dados → tela de leitura (2,6s) → diagnóstico + conta criada
```

Ao final, o usuário recebe **duas coisas ao mesmo tempo**:

1. O relatório de diagnóstico dele na tela.
2. A conta free na Musikalis já criada, com o perfil pré-preenchido pelas
   respostas do quiz. Ele não responde nada duas vezes.

## 2. Regras de interface, obrigatórias

- **A primeira pergunta aparece junto com a página.** Não existe tela de
  abertura, nem botão de "começar", nem contagem de perguntas, nem promessa de
  tempo de preenchimento.
- **Acima da primeira pergunta, e só dela,** aparece a promessa:

  > **Descubra quanto a sua produção está perdendo antes de o show começar.**
  >
  > Você recebe o **índice D-90 da sua produção**, o **valor estimado que escapa
  > a cada evento** e o ponto exato de onde o dinheiro está saindo: orçamento,
  > operação, negociação ou marketing.

- **Avanço automático.** Ao tocar numa alternativa ela fica marcada e, depois de
  330ms de respiro, a próxima pergunta entra sozinha. **Não existe botão de
  continuar.** Com `prefers-reduced-motion` ativo, o respiro cai para 90ms.
- **Trave o clique durante esses 330ms** para que dois toques rápidos não pulem
  uma pergunta.
- Existe um **"← Voltar"** discreto no rodapé de cada pergunta, a partir da
  segunda. A resposta anterior volta marcada.
- **Uma pergunta por tela.** Nada de rolagem com várias perguntas juntas.
- No topo, uma **régua de progresso com a linha do tempo oficial da metodologia**:
  `D-90 Concepção · D-60 Estruturação · D-30 Ativação · D-7 Pré-show · D-Day
  Execução · D+7 Pós-show`. Cada pergunta acende o marco em que ela vive (o
  campo `fase` na lista abaixo). Isso ensina a metodologia enquanto a pessoa
  responde.
- Mobile primeiro. A maior parte do tráfego vem do Instagram.

## 3. Identidade visual

Use exatamente os tokens da plataforma e do site musikalis.com.br:

| Papel | Cor |
| --- | --- |
| Fundo | `#F4F7FB` |
| Texto e títulos | `#070C5F` |
| Primário, seleção, progresso | `#0A138A` |
| Preenchimento do selecionado | `#CCDCF0` |
| Borda de card | `#BFCFE3` |
| Texto secundário | `#474A85` |
| Alerta, dimensão crítica, vazamento | `#C52020` |
| Ouro | `#D9A520` |

**O ouro é reservado ao momento de conversão**, exatamente como na plataforma,
onde dourado significa upgrade. Não use ouro em elemento decorativo.

Fontes: **Montserrat** para títulos, **Inter** para texto, **JetBrains Mono**
para números e rótulos em caixa alta. Raio de borda 6px.

## 4. As 9 perguntas

Ordem fixa. Os campos `peso`, `elo` e `orcamento` são o que alimenta o cálculo.

**P1 · fase D-90 · não pontua (segmentação)**
Qual é o seu papel quando o show acontece?
1. Sou músico e me viro na produção do meu próprio trabalho
2. Sou produtor: monto shows e eventos para artistas e casas
3. Cuido da produção dentro de uma igreja, empresa ou instituição
4. Tenho produtora, casa de shows ou escola

**P2 · fase D-90 · não pontua (segmentação)**
Quantas produções você toca por ano?
1. De 1 a 3
2. De 4 a 10
3. De 11 a 24
4. Mais de 24

**P3 · fase D-90 · peso `antecedencia`, vale até 40 pontos**
Com quanta antecedência você começa a fechar uma produção?
1. Na semana do evento, no grito — **0 pontos**
2. De 2 a 4 semanas antes — **12 pontos**
3. Cerca de 30 dias antes — **24 pontos**
4. 60 dias ou mais, com cronograma escrito — **40 pontos**

**P4 · fase D-60 · define o elo dominante, não pontua**
Onde a sua produção mais escapa hoje?
1. **Orçamento e Resultados:** fecho o preço no chute e descubro o custo depois
2. **Operação:** equipe, transporte e hospedagem sempre em cima da hora
3. **Legal e Negociação:** acerto no boca a boca e corro atrás do dinheiro depois
4. **Marketing:** o show fica pronto e a casa não enche

**P5 · fase D-30 · peso `custo`, vale até 15 pontos**
O que isso já te custou na última produção?
1. A margem sumiu: o show aconteceu e eu não ganhei nada — **0 pontos**
2. Coloquei dinheiro do meu bolso para o show não cair — **5 pontos**
3. Recebi, mas 30 a 60 dias depois de já ter pago tudo — **15 pontos**
4. Perdi a data ou o contrato por não ter fechado a tempo — **10 pontos**

**P6 · fase D-7 · peso `controle`, vale até 30 pontos**
Como você controla a produção hoje?
1. Grupo de WhatsApp e áudio — **0 pontos**
2. Uma planilha que eu mesmo montei — **10 pontos**
3. Planilha mais um app de tarefas — **20 pontos**
4. Um sistema de gestão de verdade — **30 pontos**

**P7 · fase D-7 · peso `tentativa`, vale até 15 pontos**
O que você já tentou para organizar isso?
1. Nada estruturado, vou aprendendo no tranco — **0 pontos**
2. Curso de produção que era mais teoria do que prática — **5 pontos**
3. Contratei alguém para ajudar e não resolveu — **8 pontos**
4. Montei o meu próprio processo, mas ele só funciona comigo dentro — **15 pontos**

**P8 · fase D-Day · não pontua (desejo declarado)**
O que mudaria mais o seu jogo nos próximos 6 meses?
1. Fechar produção sabendo a margem antes de assinar
2. Parar de apagar incêndio na semana do show
3. Subir o meu cachê e ser levado a sério pelas casas
4. Produzir para outros artistas e transformar isso em renda

**P9 · fase D+7 · define o valor do vazamento e qualifica**
Qual é o orçamento médio de uma produção sua?
1. Até R$ 5 mil — **valor de referência R$ 3.000**
2. De R$ 5 mil a R$ 20 mil — **valor de referência R$ 12.000**
3. De R$ 20 mil a R$ 80 mil — **valor de referência R$ 50.000**
4. Acima de R$ 80 mil — **valor de referência R$ 120.000**

> A P9 é a porteira comercial. Ela não muda o índice, muda o tamanho do número
> em reais que aparece no diagnóstico e diz ao time comercial quem tem verba.

## 5. A captura, depois da P9

Título: **Seu diagnóstico está pronto.**
Subtítulo: *Preencha abaixo para ver o índice da sua produção e receber uma
cópia no WhatsApp. Leva 30 segundos.*

Quatro campos, **todos obrigatórios**, sem exceção:

| Campo | Validação |
| --- | --- |
| Nome | mínimo 2 caracteres |
| WhatsApp | mínimo 10 dígitos depois de remover tudo que não é número |
| E-mail | formato de e-mail válido |
| Cidade | mínimo 2 caracteres |

Botão: **Ver meu diagnóstico**.
Abaixo: *Seus dados estão seguros. Nada de spam, só o seu diagnóstico e o
próximo passo.*

**Ninguém chega ao diagnóstico sem os quatro campos preenchidos.** Esse é o
ponto que hoje falha no onboarding da plataforma: há usuários cadastrados sem
telefone, e sem telefone o lead não existe para o comercial.

## 6. A tela de leitura

Entre a captura e o diagnóstico, 2,6 segundos com três mensagens girando a cada
820ms:

1. Lendo as suas respostas…
2. Cruzando com a metodologia D-90…
3. Calculando o vazamento por produção…

Assinatura embaixo: *"Para quem não pode se dar ao luxo de improvisar."*

Essa tela não é enfeite. Ela é o que transforma "quiz" em "diagnóstico" na
cabeça de quem responde.

## 7. A lógica do cálculo

### 7.1 Índice D-90, de 0 a 100

Some os pontos das quatro perguntas que pontuam. Os pesos somam exatamente 100:

```
indice = pontos(P3) + pontos(P6) + pontos(P5) + pontos(P7)

P3 antecedência  →  0 · 12 · 24 · 40     (peso 40)
P6 controle      →  0 · 10 · 20 · 30     (peso 30)
P5 custo já pago →  0 ·  5 · 15 · 10     (peso 15)
P7 tentativas    →  0 ·  5 ·  8 · 15     (peso 15)
```

**Por que esses pesos, nesta ordem:** o índice mede *o quanto a produção é
decidida antes*, não o quanto a pessoa é competente. Antecedência pesa 40 porque
é a variável que explica sozinha a maior parte do prejuízo. Controle pesa 30
porque é o que sustenta a antecedência quando o volume cresce. Custo e
tentativas pesam 15 cada porque são consequência, não causa.

**Atenção à P5, que não é crescente de propósito.** "Perdi a data ou o contrato"
vale 10, menos que "recebi 30 a 60 dias depois", que vale 15. Perder o contrato
por não fechar a tempo é falha de antecedência e é mais grave que receber
atrasado, que é falha de fluxo. Não "corrija" essa ordem.

### 7.2 Faixa

```
 0 a 30  → Produção sem método    (cor #C52020)
31 a 55  → Produção reativa       (cor #D9A520)
56 a 80  → Produção organizada    (cor #D9A520)
81 a 100 → Produção D-90          (cor #5BA87A)
```

### 7.3 Vazamento estimado por produção

Cada faixa carrega um intervalo percentual. Aplique-o sobre o valor de
referência escolhido na P9:

```
Produção sem método   → 20% a 35% do orçamento
Produção reativa      → 12% a 20%
Produção organizada   →  5% a 12%
Produção D-90         →  1% a  5%

vazamento_min = orcamento_referencia × percentual_min
vazamento_max = orcamento_referencia × percentual_max
```

Formate em reais, arredondado, padrão brasileiro. Exemplo: alguém com índice 28
e orçamento médio de R$ 12 mil vê **R$ 2.400 a R$ 4.200 por produção**.

### 7.4 Elo dominante

A alternativa escolhida na P4 define a dimensão crítica, que são as mesmas
quatro dimensões da plataforma:

| Resposta P4 | Dimensão | Sintoma (usado no texto) | Diagnóstico exibido |
| --- | --- | --- | --- |
| 1 | Orçamento e Resultados | fecha o preço no chute e descobre o custo depois | Você fecha preço antes de conhecer o custo. O primeiro passo é orçar por categoria, com margem alvo definida, antes de dizer sim. |
| 2 | Operação | resolve equipe, transporte e hospedagem em cima da hora | O seu custo não está no cachê, está no calendário. Passagem, hospedagem e transporte decididos em D-60 mudam a conta inteira. |
| 3 | Legal e Negociação | acerta no boca a boca e corre atrás do dinheiro depois | Acerto no boca a boca vira dinheiro atrasado e discussão depois do show. Contrato e condição fechados em D-60 tiram isso da mesa. |
| 4 | Marketing | termina a produção e descobre que a casa não enche | A casa não enche sozinha. Plano de comunicação e venda começando em D-30 é o que separa a casa cheia da casa amiga. |

No diagnóstico, as quatro dimensões aparecem listadas: a escolhida marcada como
**CRÍTICO** em vermelho, as outras três como **OK**.

## 8. A página de diagnóstico

Na ordem, com o primeiro nome do lead usado como `{nome}`:

**1. Placar.** Card azul escuro em gradiente. Rótulo *Índice D-90 da produção de
{nome}*, o número grande sobre `/100`, o nome da faixa na cor da faixa e um
medidor de 24 segmentos preenchidos proporcionalmente, com a escala
`SEM MÉTODO · REATIVA · ORGANIZADA · D-90` embaixo.

**2. Vazamento.** Rótulo *Vazamento estimado por produção*, o intervalo em reais
em destaque vermelho, e a ressalva:

> Faixa estimada pela metodologia D-90 sobre o orçamento médio que você
> informou. Não é um julgamento da sua competência: é a medida de quanto da sua
> produção ainda é decidida em cima da hora.

**3. As quatro dimensões**, com a crítica sinalizada.

**4. A leitura do cenário.** Título *Não falta competência. Falta decidir antes.*

> {nome}, você contou que {sintoma do elo}. Essa combinação tem assinatura: é a
> de quem produz bem e decide tarde.
>
> O show sai, a plateia aplaude, e a conta fecha no zero ou abaixo dele. Não
> porque você cobrou pouco, mas porque **entre o dia em que você fechou e o dia
> do show, o preço de tudo mudou e você já não tinha como negociar.**

**5. O espelho.** Título *Você provavelmente se reconhece aqui*, com seis itens:

- Fechou o cachê do show antes de saber quanto custaria a equipe.
- Emitiu passagem na semana do evento e viu o preço triplicar.
- Mandou o rider por áudio e descobriu no palco que faltava retorno.
- Acertou o mapa de palco na hora da passagem de som, com a casa cobrando pressa.
- Pagou tudo antes e recebeu 40 dias depois do show.
- Fez um show impecável, com a casa cheia, e no fim do mês não sobrou nada.

Fechando o bloco, em destaque:

> Nada disso é falta de competência. É o preço de decidir em cima da hora, e ele
> é previsível: aparece toda vez que uma decisão que podia ter sido tomada com
> 60 dias é tomada com 6.

**6. O que precisa acontecer no seu caso.** Título é o nome do elo, texto é o
diagnóstico da tabela da seção 7.4, e depois:

> **O custo de continuar onde está** não é só a margem desta produção. É a casa
> que não te chama de novo, o artista que troca de produtor, e o ano inteiro
> trabalhando muito para terminar no mesmo lugar.

**7. O mecanismo: Metodologia D-90.** A linha do tempo completa, com as seis
etapas e uma frase cada:

| Marco | Texto |
| --- | --- |
| D-90 | **Concepção.** Escopo, orçamento e margem alvo fechados antes de assinar. |
| D-60 | **Estruturação.** Equipe confirmada, contrato, logística, rider e mapa de palco enviados. |
| D-30 | **Ativação.** Plano de marketing e venda de ingresso rodando. |
| D-7 | **Pré-show.** Conferência final, sem nenhuma decisão nova. |
| D-Day | **Execução.** O dia do show com tudo já resolvido. |
| D+7 | **Pós-show.** Apuração financeira, pesquisa de satisfação e o que ajustar na próxima. |

Fechando: *Dentro da plataforma Musikalis, quem executa essa linha do tempo é a
ferramenta: a assistente de IA gera o rider, o mapa de palco, o orçamento e o
contrato, e o painel mostra a margem antes, durante e depois.*

**8. Quem está por trás.** O número **56** em destaque, legenda *apresentações no
palco do Blue Note*, e:

> A Musikalis foi criada por **André Donha**: engenheiro, formado também em
> regência e composição pelo Conservatório Brasileiro de Música, certificado
> PMP, com 20 anos em consultoria global e atuação em 13 países.
>
> E produz show. Foram 56 apresentações no Blue Note, com os tributos a Aretha
> Franklin, o Divas e o Tina Turner. Nenhuma delas começou no dia do show.
>
> A metodologia nasceu de um prejuízo dele: seis músicos, passagens emitidas na
> semana do evento, R$ 400 por cabeça virando R$ 1.200, e a margem inteira do
> show indo embora.

**9. FAQ**, em acordeão:

- *Isso é mais um curso de produção?* Não. Curso ensina o que fazer, e você já
  sabe o que fazer. O que muda o jogo é *quando* fazer, com uma ferramenta que
  executa a linha do tempo por você.
- *Eu produzo sozinho. Isso serve?* Serve mais ainda. Quanto menor a equipe,
  mais caro sai cada decisão tomada tarde.
- *Já tentei planilha e não parou em pé.* Planilha não te avisa. A linha do
  tempo avisa, e a assistente gera o documento que você deixaria para depois.
- *Minha produção é pequena.* A margem de uma produção pequena é justamente a
  que menos aguenta uma passagem que triplica.
- *Quanto custa?* A conta na plataforma é gratuita e dá acesso ao cadastro de
  equipe, mapa de palco, ensaios e repertório. Os planos pagos e as formações da
  Musikalis Academy ficam visíveis lá dentro.

**10. Convite final.** Título *{nome}, o seu ponto crítico é {nome do elo}.*

> Dentro da Musikalis existe uma tela para exatamente isso, com a linha do tempo
> D-90 aplicada à sua próxima produção.

Botão principal em ouro e botão secundário. **Este é o ponto que muda em relação
à página que está no ar:** aqui dentro da plataforma, o botão principal **não
leva a lugar nenhum, ele conclui o cadastro** e joga a pessoa direto no painel
como usuário free, com o perfil já preenchido.

## 9. O que acontece na conclusão

Ao terminar o quiz, execute nesta ordem:

1. **Crie ou complete a conta** do usuário com nome, e-mail, WhatsApp e cidade.
   Se ele entrou por Google ou Apple e o e-mail já existe, complete o cadastro
   em vez de duplicar.
2. **Preencha o perfil dele com as respostas**, sem pedir nada de novo:
   - P1 vira o tipo de perfil (músico, produtor, institucional, produtora/casa)
   - P2 vira o volume anual de produções
   - P6 vira a ferramenta de controle atual
   - P4 vira a área crítica declarada
   - P8 vira o objetivo declarado
   - P9 vira a faixa de orçamento
   - Índice, faixa e vazamento ficam salvos no perfil e no resumo de onboarding
     que você já enxerga na área de admin
3. **Não dispare o onboarding antigo de 8 telas para quem veio por aqui.** Quem
   completou o diagnóstico já respondeu tudo.
4. **Envie o registro para a planilha de leads da Simple** (seção 10).
5. **Dispare os eventos do pixel** (seção 11).

> **Sequenciamento, importante:** só desligue o onboarding antigo depois que a
> gravação do lead estiver confirmada em produção, com pelo menos um teste ponta
> a ponta gravando na planilha. Desligar antes deixa o admin cego.

## 10. Saída dos dados para a planilha

A planilha de leads da Simple é esta:
https://docs.google.com/spreadsheets/d/1UFHepDQms_exYAOCIX8lGnkBRLvo5B9WuXwnPeJvcHo/edit

Conecte o Lovable nela por integração direta com o Google Sheets, ou envie um
POST em JSON para `{{URL_WEBHOOK_PLANILHA}}`, que é o app da Web publicado na
própria planilha. Nos dois casos, uma linha por lead, nesta ordem exata de
campos, com estes nomes de coluna:

```json
{
  "data_hora": "2026-09-23T14:32:10-03:00",
  "nome": "Fulano de Tal",
  "whatsapp": "11990000000",
  "email": "fulano@email.com",
  "cidade": "São Paulo",
  "indice_d90": 28,
  "faixa": "Produção sem método",
  "elo_dominante": "Orçamento e Resultados",
  "orcamento_faixa": "De R$ 5 mil a R$ 20 mil",
  "orcamento_referencia": 12000,
  "vazamento_min": 2400,
  "vazamento_max": 4200,
  "p1_papel": "Sou produtor: monto shows e eventos para artistas e casas",
  "p2_producoes_ano": "De 4 a 10",
  "p3_antecedencia": "Na semana do evento, no grito",
  "p4_onde_escapa": "Orçamento e Resultados",
  "p5_custo": "A margem sumiu: o show aconteceu e eu não ganhei nada",
  "p6_controle": "Grupo de WhatsApp e áudio",
  "p7_tentativa": "Nada estruturado, vou aprendendo no tranco",
  "p8_objetivo": "Fechar produção sabendo a margem antes de assinar",
  "p9_orcamento": "De R$ 5 mil a R$ 20 mil",
  "conta_criada": true,
  "origem": "quiz-plataforma",
  "utm_source": "",
  "utm_campaign": "",
  "utm_content": ""
}
```

Regras:

- **Grave o WhatsApp só com dígitos**, sem parênteses, traço ou espaço.
- **Propague as UTMs** da URL de entrada. É como a Simple sabe qual criativo
  trouxe cada lead. Se não houver UTM, mande string vazia, nunca omita o campo.
- **Se o POST falhar, guarde e tente de novo.** Nunca deixe o usuário travado
  esperando o webhook: mostre o diagnóstico primeiro, envie depois.
- **Grave também os abandonos**, com os campos respondidos até ali e
  `conta_criada: false`. O André já disse que sanitiza depois, e saber em que
  pergunta as pessoas param é o que permite melhorar o quiz.

## 11. Pixel da Meta

Cole o código base do pixel no `<head>` da página do quiz, com o ID
`{{PIXEL_ID}}`, e dispare estes eventos:

| Momento | Evento |
| --- | --- |
| Página do quiz carrega | `PageView` e `ViewContent` |
| Usuário responde a P1 | `QuizIniciado` (custom) |
| Usuário responde a P5, meio do quiz | `QuizMetade` (custom) |
| Usuário chega à tela de captura | `InitiateCheckout` |
| Formulário validado e enviado | `Lead` |
| Conta free criada com sucesso | `CompleteRegistration` |

No evento `Lead`, envie também o índice e a faixa como parâmetros, para a Meta
aprender com quem tem o perfil certo:

```js
fbq('track', 'Lead', {
  content_name: 'Diagnóstico D-90',
  value: vazamento_max,
  currency: 'BRL',
  indice: indice_d90,
  faixa: faixa,
  elo: elo_dominante
});
```

## 12. O que não fazer

- Não mude as perguntas, a ordem delas, nem o texto das alternativas. Elas já
  foram validadas e a redação carrega o argumento.
- Não acrescente perguntas. O quiz foi cortado de propósito e o André confirmou
  que gosta dele simplificado.
- Não mostre a pontuação de cada alternativa para o usuário.
- Não peça nenhum dado antes da P9. A captura só existe depois das nove.
- Não use ouro fora do botão de conversão.
- Não anuncie quantidade de perguntas nem tempo de preenchimento em lugar nenhum.

---
✂️ TERMINA AQUI ✂️
---

## Ressalva que precisa ir junto para o André

As faixas de vazamento (20 a 35%, 12 a 20%, 5 a 12%, até 5%) são **estimativas
derivadas da metodologia D-90, não estatística de mercado auditada**. É o número
em vermelho que sustenta a página inteira, e o André é PMP e ex-consultoria: ele
vai querer saber de onde vem.

**Pedir a chancela dele antes de rodar tráfego**, com uma destas três saídas:

1. Ele confirma as faixas como estão, com base na experiência dele nas 56
   produções do Blue Note.
2. Ele ajusta os percentuais, e a gente troca no prompt e na página.
3. Ele prefere não afirmar número, e a gente troca "Vazamento estimado" por uma
   faixa de referência da metodologia, com a origem declarada na tela.

Enquanto não houver resposta, a página no ar continua com a ressalva de texto
que já está lá: *"não é um julgamento da sua competência: é a medida de quanto
da sua produção ainda é decidida em cima da hora."*
