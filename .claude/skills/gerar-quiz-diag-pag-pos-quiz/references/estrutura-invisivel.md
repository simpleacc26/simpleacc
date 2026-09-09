# A Estrutura Invisível do funil de quiz da Simple

Este é o **blueprint canônico**. Origem: quiz da **Pâmella Mello** (o de maior
conversão da casa), refinado em Lucas Sobreiro, Rômulo Heleno e **fechado na
versão do Felipe Damasceno** (quiz-felipe-damasceno.vercel.app), que é a
referência atual.

"Invisível" porque o lead não percebe: para ele é só um quiz rápido. Por baixo,
cada tela tem função de conversão. **Não improvise a ordem.** Se for mudar algo
aqui, mude sabendo o que está trocando.

Se você é uma sessão nova implementando um funil: **leia este arquivo inteiro
antes de escrever a primeira linha.** Ele existe para o usuário não ter que
repetir estas decisões toda vez.

---

## Parte 1: o quiz

### Regra estrutural
- **Uma pergunta por tela.**
- **A 1ª pergunta já aparece na 1ª tela**, junto do hero. Nada de tela de
  "Começar" antes: cada clique a mais derruba conclusão.
- **Auto-avanço**: escolher a opção já leva pra próxima (~300ms). Sem botão
  "Continuar". Mantém o "Voltar".
- **Barra de progresso** sempre visível ("Começando", "Pergunta X de N",
  "Última pergunta").

### ⚠️ Sem título repetido acima de cada pergunta
**O pedido que mais se repete.** Só a **tela 1** leva hero (título + subtítulo +
estimativa de tempo). Da tela 2 em diante a tela **começa direto na pergunta**,
sem rótulo de etapa ("Situação", "Problema", "Implicação") em cima.

Aqueles rótulos são **organização interna do flow.js**, não copy de tela. Repetir
um cabeçalho a cada tela deixa o quiz com cara de formulário e cansa.

```js
// app.js, dentro de renderStep(i)
const intro = i === 0 ? `
    <h1>${F.hero.titulo}</h1>
    <p class="lead">${F.hero.subtitulo}</p>
    <p class="hint">${F.hero.tempo}</p>` : "";   // vazio nas demais telas
```

Mantenha o campo `etapa` no `flow.js` (serve pra você se organizar e pra planilha),
só **nunca renderize** na tela.

### Ordem SPIN, 9 passos
As perguntas leves primeiro; as que dão preguiça ou geram desconfiança ficam no
fim, quando o lead já investiu 2 minutos e quer o resultado.

| # | Papel | Pergunta faz o quê | Entra no score? |
|---|---|---|---|
| 1 | **Situação** | Onde ele está hoje | Sim |
| 2 | **Problema** | O que mais dói / consome | Sim |
| 3 | **Há quanto tempo** | Cronifica a dor | Não |
| 4 | **Implicação** | Custo de não resolver (a mais forte) | Sim |
| 5 | **O que já tentou** | Mata as objeções antes | Sim |
| 6 | **Objetivo** | O que ele quer de verdade | Não |
| 7 | **Perfil** | Autoimagem, frase que o representa | Sim |
| 8 | **QUALIFICAÇÃO: faturamento** | Porteira de ICP | Não |
| 9 | **QUALIFICAÇÃO: prontidão** | Porteira de intenção | Não |

**As duas porteiras vão no fim, sempre.** Perguntar faturamento cedo derruba o
preenchimento.

### As duas porteiras
**Faturamento**: 6 faixas, para captar da empresa pequena à grande e ainda
mostrar que o especialista atende empresas grandes. As faixas de baixo ficam para
**ver e filtrar** os desqualificados, não para escondê-los.

**Prontidão**: mede intenção de investir, não interesse. Formato validado:

> "Você busca um processo estruturado para resolver isso de vez, mesmo que
> represente um investimento maior do que um curso ou uma ferramenta?"

- Sim, quero resolver de vez e entendo que é um investimento → pronto
- Sim, mas preciso entender melhor como funciona antes → pronto
- Ainda não é prioridade pra mim agora → `nutrir: true`
- Só estou pesquisando por enquanto → `nutrir: true`

⚠️ **High ticket:** a opção de nutrir **nunca** ancora em "algo mais barato" ou
"uma solução pontual". Enquadre como *prioridade/momento*, não como preço. Ancorar
em barato ensina o lead a pedir desconto.

### Score do diagnóstico (o índice)
O índice personalizado (IDE, e equivalentes) sai de `peso` (0 a 3) só nas
perguntas de **diagnóstico**. Tempo, objetivo e as duas porteiras **não pontuam**.

```
Índice% = soma dos pesos / soma dos máximos possíveis
≥66% = Alto   ·   33 a 65% = Médio   ·   <33% = Baixo
```

O índice é **o ativo do cliente**: é o que ele leva pro Instagram e pra call. Dê
nome próprio, sigla e explicação de uma linha.

### Captura (última tela)
Nome · WhatsApp (com máscara `(XX) XXXXX-XXXX`) · E-mail (obrigatório).
Enquadre como "pra onde enviamos o seu diagnóstico", nunca como cadastro.
Valide só no envio, nunca enquanto digita.

---

## Parte 2: a tela de carregamento

**Item obrigatório que vive sendo esquecido.** Entre o envio do formulário e o
relatório, nunca vá direto.

Ela faz três coisas: dá **valor percebido** (parece que algo está sendo
calculado), cria **expectativa** pelo resultado, e dá **tempo real** do lead
chegar na planilha antes da troca de página.

```js
function renderLoading() {
  const dur = reduce ? 800 : 4700;          // ~4,7s
  const msgs = [
    "Analisando as suas respostas...",
    "Calculando o seu __INDICE__...",
    "Montando o seu __RELATORIO__ personalizado...",
  ];
  // barra que enche em `dur`, mensagens trocando a cada dur/3,
  // redireciona em dur + 350ms
}
```

Regras: **3 mensagens** (as duas primeiras genéricas, a terceira nomeando a
entrega), barra que enche de ponta a ponta, e respeite
`prefers-reduced-motion` (cai pra 800ms). Reescreva as mensagens com o
vocabulário do cliente.

---

## Parte 3: o relatório pós-quiz

Não é "resultado de quiz", é uma **carta de vendas personalizada**. Ordem exata:

| # | Bloco | Função |
|---|---|---|
| 0 | **Cabeçalho + selo do índice** | Entrega o número prometido. Badge grande, colorido por faixa. |
| 1 | **Antes de tudo** | Acolhe e tira a culpa: "não é falta de capacidade nem de esforço, é estrutura". |
| 2 | **O seu cenário hoje** | **Espelho.** Devolve as respostas dele em texto corrido. É o que faz ele sentir que foi lido. |
| 3 | **Por que não resolveu até agora** | **Reframe.** Explica por que contratar/comprar/estudar não resolveu. Mata objeção sem atacar. |
| 4 | **Dois caminhos lado a lado** | Comparação visual: continuar como está × o jeito novo. |
| | **→ CTA distribuído #1** | |
| 5 | **Como o método funciona** | O mecanismo único, em pilares numerados. |
| 6 | **O que precisa acontecer agora** | Nomeia o próximo passo e devolve o objetivo dele (pergunta 6). |
| | **→ CTA distribuído #2** | |
| 7 | **Depoimentos** | Prova social de terceiros. Prints reais. |
| 8 | **Quem é o especialista** | **Autoridade.** Ver Parte 4. |
| 9 | **CTA final adaptado** | Fechamento, muda conforme a qualificação. |

### O espelho é o que faz o relatório funcionar
Cada opção no `flow.js` carrega um campo `report`: a frase em 3ª pessoa que
entra no texto. Não é a label da opção.

```js
{ value: "incendios", label: "Apagar incêndios e resolver urgências", peso: 3,
  report: "apagar incêndios e resolver urgências" }
```

E o relatório costura:

> "Pelo que você me contou, o que mais consome o seu tempo é **apagar incêndios**.
> Você convive com isso há **vários anos**, e se ficasse 15 dias fora o resultado
> seria **a operação travar rapidamente**."

Escreva os `report` já pensando na frase montada. Teste a costura de várias
combinações; frase truncada ou concordância errada mata a credibilidade na hora.

### CTAs distribuídos
**Nunca um CTA só no fim.** Espalhe botões `.cta-wpp` idênticos ao longo da
página (mínimo 3 no total). Um único handler pega todos:

```js
document.addEventListener("click", (e) => {
  if (e.target.closest && e.target.closest(".cta-wpp")) abrirWhatsApp();
});
```

O lead convence em pontos diferentes. Quem já se decidiu no bloco 4 não deve
precisar rolar até o fim.

### CTA final adaptado à qualificação
Três saídas, decididas por `classificarLead()`. **Nenhum lead vê "não serve pra
você".**

```js
function classificarLead(a) {
  if (a.qualificacao === "__FAIXA_BAIXA_1__" ||
      a.qualificacao === "__FAIXA_BAIXA_2__") return "fora";
  if (a.prontidao === "depois" || a.prontidao === "pesquisando") return "nutrir";
  return "qualificado";
}
```

| Faixa | CTA | Enquadramento |
|---|---|---|
| **qualificado** | "Quero agendar minha Sessão Estratégica" | Direto. Escassez real (vagas por semana). |
| **nutrir** | "Quero entender melhor como funciona" | Sem compromisso, no tempo dele. |
| **fora** | "Falar com a equipe no WhatsApp" | Direciona pra conteúdo/produto de entrada. Sem porta na cara. |

---

## Parte 4: o bloco de autoridade (obrigatório)

**Depoimento e autoridade não são substitutos, são complementares.** Depoimento
prova que **funciona**; autoridade prova **por que confiar em quem entrega**. Em
high ticket os dois trabalham juntos, e a autoridade costuma pesar mais, porque o
lead está comprando acesso a uma pessoa.

Quando ainda não há depoimentos reais (caso comum em cliente novo), **este bloco
sustenta a prova social sozinho** e o funil sobe assim mesmo. Foi o que fizemos no
Felipe.

Anatomia:

1. **Foto + nome + cargo.** Foto redonda 92px com borda na cor primária, nome em
   caixa alta na serifada, cargo em uppercase espaçado ("Empresário · Estrategista · Mentor").
2. **Parágrafo de origem.** O que ele viveu na pele que o levou a criar o método.
   Conecta a dor do lead com a história de quem entrega.
3. **Grade de credenciais.** Números reais, 4 itens (grade 2x2 fecha certinho).
   Um 5º vira `.cred.full`. Cada um é número grande + contexto curto.
4. **Chips do ecossistema** (opcional): empresas, marcas, veículos.

### 🚨 Regra de fonte: objeto de cena não é credencial
**Só vira claim o que está escrito como texto afirmativo no material do cliente**
(deck, bio, site, one-pager).

Elemento que aparece **dentro de uma arte** (capa de livro sobre a mesa, tela de
celular, gráfico de fundo, troféu, selo) é **cenário, não fonte**.

> Caso real, Felipe Damasceno: a apresentação comercial tinha, na foto, um livro
> com a capa "Líderes Não Nascem Prontos". Foi publicado um "Autor de ..." na
> faixa de autoridade. **O livro não existia.** O cliente avisou. A faixa escrita
> do próprio slide tinha só 4 números, e o livro não estava nela.

Redobre o cuidado quando o PDF do cliente **não tem camada de texto** e você está
lendo slides como imagem: aí tudo que você "lê" é interpretação visual. Na dúvida,
**pergunte antes de publicar**.

---

## Parte 5: tom e escrita

- **Nunca use travessão** (traço longo). Regra fixa da casa: "fica com cara de
  IA". Use vírgula, dois-pontos, parênteses, ponto final. Faixas: "de X a Y".
- **Emoji: só com autorização.** O padrão é **sem**. Público de empresário homem,
  jurídico, médico e afins estranha. (No Felipe tiveram que ser removidos
  depois; não repita.) Se usar, um só, e nunca na tela de carregamento.
- **Fale com o decisor**, sempre. Nunca com gestor ou funcionário.
- **Sem promessa de prazo rígido** quando o cliente não garante o prazo. Ancore
  no método, não em "30 dias".
- **Reescreva 100% da copy** ao adaptar a base, inclusive a tela de loading e
  todas as labels de opção. Resíduo do funil-modelo (falar em "leitura emocional"
  num funil de negócio) é o erro mais comum.

---

## Parte 6: detalhes técnicos que já quebraram na prática

### `text/plain` engole o lead em silêncio
O jeito antigo (`mode: "no-cors"` + `Content-Type: text/plain`) faz o webhook do
Make **não parsear o JSON**: responde "Accepted" e grava **linha vazia**. Nenhum
erro aparece. Os webhooks do Make devolvem `Access-Control-Allow-Origin: *`,
então mande `application/json` de verdade.

```js
fetch(LEADS_ENDPOINT, { method: "POST", keepalive: true,
  headers: { "Content-Type": "application/json" }, body: JSON.stringify(lead) })
  .catch(() => {});
```

**Valide a integração lendo a planilha, nunca o status HTTP.**

### `:hover` gruda no celular
No iOS o `:hover` fica no último item tocado e dispara ao arrastar o dedo: as
opções parecem **pré-selecionadas**. Sempre:

```css
.opt { -webkit-tap-highlight-color: transparent; }
@media (hover: hover) and (pointer: fine) {
  .opt:hover { /* realce só no mouse */ }
}
.opt:active { /* feedback de toque */ }
```

A seleção real mora só no `aria-checked`.

### Deploy substitui a árvore inteira
Arquivo que faltar no envio vira **404 silencioso** (já aconteceu duas vezes: um
deploy sem `styles.css` e outro com metade dos arquivos). Depois de **toda**
publicação:

```bash
for f in index.html diagnostico.html styles.css app.js flow.js diagnostico.js favicon.svg; do
  echo "$f $(curl -s -o /dev/null -w '%{http_code}' "$BASE/$f")"
done
```

### Nome do projeto na Vercel = URL
Não dá pra renomear pelo MCP. Para mudar o domínio, publique num **projeto novo**
com o nome desejado. Escolha o nome logo na primeira publicação
(`quiz-<cliente>` é o padrão atual).

### Aba de CSV importado nasce "Untitled"
Não é "Página1" nem "Sheet1". Descubra a aba real antes de montar o `addRow`, via
RPC `google-sheets@2/rpcSheet`. Isso também confirma que a conexão enxerga a
planilha.

### Outros
- `<meta name="robots" content="noindex">` nas duas páginas (funil de anúncio não indexa).
- `favicon.svg` com o emblema do cliente.
- Anúncio aponta pra **raiz com query** (`/?utm_source=...`), nunca `/index.html`.
- Zero dependência externa. Sem Google Fonts, sem CDN.

---

## Checklist da estrutura invisível

- [ ] 1ª pergunta na 1ª tela, sem tela de "Começar"
- [ ] **Sem título/rótulo de etapa repetido** da tela 2 em diante
- [ ] Auto-avanço + Voltar + barra de progresso
- [ ] 9 passos na ordem SPIN, **as 2 porteiras no fim**
- [ ] Prontidão sem ancorar em "mais barato"
- [ ] Índice com nome próprio, calculado só nas perguntas de diagnóstico
- [ ] **Tela de carregamento** com 3 mensagens e barra (~4,7s)
- [ ] Relatório com os 9 blocos na ordem
- [ ] Espelho do cenário costurando os campos `report`, testado em várias combinações
- [ ] **Mínimo 3 CTAs distribuídos** pela página
- [ ] CTA final adaptado às 3 faixas, ninguém leva porta na cara
- [ ] Depoimentos (prints reais, WebP ~520px) **e** bloco de autoridade
- [ ] Autoridade só com claim escrito no material, nada de objeto de cena
- [ ] Sem travessão, sem emoji não autorizado
- [ ] `application/json` no envio do lead, validado **lendo a planilha**
- [ ] Hover isolado em `@media (hover: hover)`
- [ ] Todos os assets em 200 depois do deploy
