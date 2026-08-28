# Revisão do quiz publicado · omega-painel.vercel.app/quiz

**Data:** 28/08/2026 · **Para:** devolutiva pedida por ele no grupo ("fiz o quizz, queria um
feedback pra saber quais melhorias fazer e já alinhar o próximo passo")
**Base da análise:** o quiz no ar (percorrido tela a tela e lido no código publicado), a
Estratégia Completa de 10/08 (`2026-08-10-estrategia-completa-funil-quiz.pdf`) e os ajustes
validados da casa (`.claude/skills/gerar-quiz-diag-pag-pos-quiz/references/ajustes-validados.md`).

---

## Veredito em três linhas

Ele implementou a **Seção 2 da estratégia (o quiz) com fidelidade alta**, e não implementou a
**Seção 3 (a página pós-quiz, 9 blocos)**. O que está no ar é um quiz bem construído que termina
exatamente onde os três concorrentes terminam: nome da trava e botão de WhatsApp.

O diferencial inteiro do funil mora na parte que faltou. E a copy dela já está escrita e
entregue, nas páginas 6 a 9 da Estratégia Completa.

---

## O que ele acertou

Vale registrar antes de qualquer ajuste, porque é bastante coisa e boa parte é decisão fina:

- **As 6 perguntas da estratégia estão lá, na ordem certa.** A P1 corrigida para acompanhamento
  (não mistura mais constância), a nova P2 de tempo de travamento e a P4 de "quanto já gastou"
  com as faixas exatas que a gente propôs.
- **Captura depois de todas as perguntas**, nunca antes.
- **Tela de boas-vindas**, escrita na voz dele.
- **Barra de progresso** implementada.
- **As 4 travas viraram código**, com classificação rodando no servidor: `classificacao_icp`,
  `prioridade_p0_p4` e `tendencia_plano` (anual, semestral, trimestral, mensal, calculada a
  partir de quanto já gastou somado à urgência).
- **Instrumentação melhor do que a maioria das agências entrega:** `session_started`,
  `page_view`, `question_viewed`, `question_answered`, `question_abandoned` (com `sendBeacon`
  no `pagehide`, ou seja, captura quem fecha a aba), `cta_whatsapp_viewed` e
  `whatsapp_clicked`. Com isso dá para achar exatamente qual pergunta derruba a conclusão.
- **Captura de origem completa:** as 5 UTMs mais `creative_id`, `ad_id`, `campaign_id` e
  `adset_id`. Isso é o que o gestor de tráfego precisa.
- **Honeypot anti-spam** no formulário.
- **Mensagem do WhatsApp pré-preenchida com o resultado nomeado**, não só com o nome: "meu
  resultado apontou trava de estímulo. Sobre o momento agora: estou pronto pra um trabalho
  sério e de longo prazo". É exatamente o padrão validado da casa (ajustes validados, item 5).
  O atendimento abre a conversa já sabendo o diagnóstico.
- **Falha graciosa:** se o salvamento falhar, a tela ainda manda a pessoa para o WhatsApp em vez
  de perder o lead.
- **Validação real** de nome, telefone (10 a 11 dígitos) e Instagram.
- A linha **"Isso não é diagnóstico de preguiça. É o oposto: só trava assim quem estava fazendo
  a parte dele"** saiu da estratégia e está no lugar certo. É a tese da marca, bem colocada.

---

## O que muda dinheiro, na ordem de execução

### 1. Não tem Pixel da Meta nem Conversions API ⭐ trava o plano de tráfego inteiro

Conferido no código publicado: zero `fbq`, zero `gtag`, zero `dataLayer`, nenhum pixel de
nenhuma plataforma.

Sem evento de conversão, **a Meta otimiza por clique e visualização de página, não por lead**.
Ele vai pagar mais caro por lead desde o primeiro real investido, e o algoritmo não consegue
aprender quem é comprador. É o item mais barato de resolver aqui e é o que bloqueia a fase
seguinte do roadmap.

Como ele já tem rota de servidor (`/api/quiz/resposta`), dá para fazer as duas pontas:

- **Pixel no navegador:** evento `Lead` no envio da captura, evento de contato no clique do
  WhatsApp.
- **Conversions API no servidor:** mesma conversão enviada pelo backend, o que resolve iOS e
  bloqueador de anúncio. Ele tem a estrutura pronta para isso, é pouco trabalho.

### 2. A pergunta aberta voltou, e está obrigatória

A decisão de 10/08 foi tirar a pergunta aberta para não perder volume. Ela voltou como
**pergunta 6 de 7, obrigatória** (mínimo de 3 caracteres, sem opção de pular), e está
**imediatamente antes da captura**. Campo de texto é o maior ponto de abandono de qualquer
formulário, e nessa posição o abandono custa o lead inteiro.

Só que tem um detalhe no código que explica por que ela ficou, e que precisa ser resolvido
junto: **a trava de nutrição só é alcançável pelo texto dessa pergunta.** O código procura uma
lista de palavras (comer, comida, dieta, aliment, caloria, proteina, nutri) na resposta escrita.
Nenhuma alternativa da P3 leva a nutrição. Se a pergunta aberta sair hoje, **nutrição vira uma
trava impossível de acontecer**.

Solução em duas partes, nesta ordem:

**a)** Alternativas da P3 remapeadas, uma por trava (detalhe no ponto 3 abaixo).
**b)** Com nutrição alcançável pelas alternativas, a pergunta aberta pode virar **opcional, com
um "pular"**. Quem quiser escrever escreve, e ele mantém a matéria-prima qualitativa. Quem não
quiser vira lead do mesmo jeito.

### 3. A distribuição das travas está torta e uma delas está mapeada errado

Mapeamento atual da P3:

| Alternativa | Trava que ela gera |
| --- | --- |
| "Eu treino, mas não vejo mudança no corpo" | estímulo |
| "Minha rotina não me deixa treinar com constância" | constância |
| "Já tentei várias coisas diferentes, mas nada trouxe resultado que durasse" | estímulo |
| "Sinto que meu treino é genérico, acho que teria mais resultado com algo individualizado" | **recuperação** |

Dois problemas:

**Estímulo pega 2 de 4 alternativas e nutrição pega nenhuma.** Na prática a maioria dos leads
vai receber o mesmo diagnóstico, e aí a personalização (que é o diferencial) deixa de existir.
Esse é exatamente o furo que a casa já pegou no funil do Thiago, onde 95% das combinações davam
o mesmo resultado e o número virava teatro. O ajuste validado é explícito: **antes de publicar,
rodar todas as combinações e olhar a distribuição** (ajustes validados, item 3).

**A quarta alternativa está no lugar errado.** "Meu treino é genérico, teria mais resultado com
algo individualizado" é problema de prescrição, não de recuperação. A pessoa vai ler "sua trava
é de Recuperação" sem ter falado de sono, dor ou descanso em momento nenhum, e a primeira
impressão do diagnóstico vai ser a de que ele errou. Na tela que mais importa.

**Mapeamento sugerido**, usando os ganchos que ele já usa nos Reels (que foi de onde as 4 travas
saíram):

| Alternativa | Trava |
| --- | --- |
| "Eu treino, mas não vejo mudança no corpo" | estímulo |
| "Já tentei várias coisas diferentes, mas nada trouxe resultado que durasse" | estímulo |
| "Minha rotina não me deixa treinar com constância" | constância |
| "Durmo mal, sinto dor e mesmo assim continuo treinando" | recuperação |
| "Eu treino certo, mas a alimentação não acompanha" | nutrição |

Estímulo continua sendo a mais provável (correto, é a mais comum em quem treina há anos), mas as
outras três passam a existir de verdade. A alternativa do "treino genérico" rende mais como
gancho de anúncio do que como opção de quiz: ela é desejo de solução, não descrição de sintoma.

### 4. A página pós-quiz não existe, e é ela o diferencial

O que está no ar hoje, depois da captura: o nome da trava, uma frase de apoio **igual para as
quatro travas** e o botão do WhatsApp. A pessoa responde 7 perguntas sobre o próprio corpo e
recebe uma palavra.

Isso é literalmente o que a gente documentou que os três concorrentes fazem, e é o vácuo que a
tese dele existia para preencher.

Na Estratégia Completa, Seção 3 (páginas 6 a 9), estão os 9 blocos escritos e prontos. Falta no
ar, hoje, do bloco 2 em diante:

- **Bloco 2 · a leitura do cenário com as respostas dele**, incluindo a devolutiva do valor já
  gasto ("você já colocou R$ 3 mil nisso e continua travado, então não é falta de investimento,
  é falta de ajuste")
- **Bloco 3 · por que aquela trava se formou**
- **Bloco 4 · por que o que ele já tentou não funcionou** (trocar de treino sozinho, app pronto,
  treinar mais, mexer só na comida)
- **Bloco 5 · o custo de continuar igual**
- **Bloco 6 · o método WNS**, que é o único ativo que nenhum concorrente consegue copiar sem
  copiar o método. Hoje o WNS **não aparece em lugar nenhum do funil.**
- **Bloco 7 · para quem é e para quem não é**
- **Bloco 8 · FAQ** (as 5 objeções já escritas)
- **Bloco 9 · CTA final**

E as **quatro versões do bloco 1**, uma por trava, também já escritas. Hoje só o título muda, e
o texto de apoio é o mesmo para todo mundo.

### 5. Acabamento

Coisas pequenas, várias delas de minutos, que somam:

- **Erro de texto na tela mais importante.** O título do resultado renderiza
  "Carlos diagnóstico está pronto". Falta a vírgula e o "seu". No código a linha monta
  `[primeiroNome, " diagnóstico está pronto"]`.
- **Tirar o "PERGUNTA 3 DE 7".** Padrão validado da casa, decisão do Daniel em duas rodadas:
  barra de progresso **sem número nenhum**, nem contador nem percentual. Número ali faz o quiz
  parecer longo e medido, e derruba a conclusão.
- **A barra está um passo atrasada.** A conta é `f / total`, então a pergunta 1 mostra 0% e a
  pergunta 7 mostra 86%, sem nunca chegar a 100%. Se o número sair (acima), sobra corrigir a
  barra para `(f + 1) / total`.
- **Rodapé repetido em todas as telas** ("Suas respostas são usadas só para te qualificar...").
  Padrão da casa: sem rodapé nas páginas do funil, porque rouba atenção do CTA. Essa frase cabe
  só na tela de captura, junto dos campos.
- **Sem máscara no telefone.** A validação está certa (10 a 11 dígitos), mas o campo aceita
  dígito cru. A máscara pronta da casa está em
  `.claude/skills/criar-funil-quiz/template/app.js:222`.
- **Sem tela de análise.** Vai direto do envio para o resultado. O padrão da casa tem um passo
  curto de análise antes de revelar. Diagnóstico instantâneo parece barato, e esse é justamente
  o produto grátis dele.
- **UTMs só na URL, sem persistência.** É o furo que a casa já corrigiu (ajustes validados,
  item 6.1): se a pessoa recarrega ou volta pelo histórico numa URL sem os parâmetros, o lead
  cai sem origem nenhuma. E como não há `sessionStorage` nem `localStorage`, **um reload no meio
  do quiz apaga todas as respostas** e a pessoa recomeça do zero.
- **Sem `og:image` e `og:title`.** O link vai circular no WhatsApp, que é o canal principal dele,
  e hoje aparece sem preview nenhum.
- **Identidade é a do OMEGA, não a do Shape10X.** Azul e ciano com logo Ω, que é a ferramenta
  interna dele. O topo diz "SHAPE10X · FUNIL DINÂMICO", e "funil dinâmico" é jargão nosso que
  avisa a pessoa que ela está dentro de um funil. Não tem foto dele, nem nome completo, nem
  prova. Para tráfego frio da Meta, **a pessoa não faz ideia de quem é o Kainã.** Padrão da
  casa: identidade tirada do que o cliente já tem no ar, topo com o nome completo do
  especialista e bloco de autoridade com foto, nome, o que faz, @ do Instagram e uma fala dele.
- **Domínio.** `omega-painel.vercel.app` não diz Shape10X para quem clica num anúncio. Vale um
  `quiz.shape10x.com` ou `shape10x.com/diagnostico`. Atenção ao registrado no item 7 dos ajustes
  validados: trocar domínio na Vercel exige projeto novo, e o projeto antigo continua
  respondendo, então tem que pedir a remoção para ninguém divulgar o link errado.

---

## O que eu não consigo ver de fora (perguntar para ele)

1. **O corte de "Não qualificado".** Existe esse caminho no código, e nele o botão do WhatsApp
   não aparece: a pessoa recebe "quando estiver pronto(a) para priorizar isso, me chama aqui". A
   regra roda no servidor, então não dá para saber quem cai nesse corte. **O gargalo dele é
   volume**, então se o corte estiver apertado ele está jogando fora lead que daria para nutrir.
   Padrão da casa: 4 faixas na fila de atendimento (fila-quente, qualificado, nutrir, fora),
   mesmo que a tela mostre menos.
2. **Onde o lead cai e se ele é avisado na hora.** Velocidade da primeira resposta é a variável
   de maior alavanca do funil inteiro e não dá para ver de fora.
3. **A troca de "idade" por "Instagram" na captura foi deliberada?** A estratégia pedia idade. O
   Instagram é uma troca defensável (dá contexto antes da call), só vale registrar a escolha.

---

## Próximo passo, na ordem

**Bloco 1, esta semana (destrava o tráfego):** Pixel mais evento `Lead` mais Conversions API ·
pergunta aberta opcional · alternativas da P3 remapeadas, com a distribuição conferida rodando
as combinações · acabamento de texto (o "seu" no título, barra sem número, rodapé, máscara).

**Bloco 2, na sequência (é o diferencial):** a página pós-quiz, blocos 2 a 9, com a copy que já
está na Estratégia Completa. É o que separa o funil dele do dos concorrentes.

**Bloco 3, antes de subir verba:** domínio próprio · `og:` · foto e bloco de autoridade · teste
com um lead real conferindo a UTM de ponta a ponta.

**Só depois disso, ligar os criativos.** Os 20 já estão escritos na Seção 4 da estratégia.

Continua de pé o alerta já registrado: **confirmar a política da Meta sobre imagem de antes e
depois** antes de escalar verba, porque toda a copy de prova depende disso.
