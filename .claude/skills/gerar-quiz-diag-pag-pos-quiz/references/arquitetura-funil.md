# Arquitetura do funil + padrões de conversão

Base de referência aprovada (já converteu) em `assets/funil-referencia/`.
**Duplique e adapte.** Stack: HTML/CSS/JS puro, sem dependências, sem build,
mobile-first. Abre direto no navegador.

## Arquivos
```
funil-<cliente>/
├── index.html        ← quiz (1ª pergunta já na 1ª tela)
├── styles.css        ← TEMA: bloco ":root  PALETA, TROQUE AQUI" + layout
├── flow.js           ← TODA a copy do quiz + dados da marca (whatsapp, hero, perguntas, captura). EDITAR AQUI.
├── app.js            ← motor: render, auto-avanço, validação, sessionStorage, tracking, UTMs, máscara, enviarLead()
├── diagnostico.html  ← página pós-quiz (relatório) + CTAs de WhatsApp distribuídos
├── diagnostico.js    ← monta o relatório com as respostas; TROCAR o texto do diagnóstico pela copy do cliente
└── README.md
```

## O que customizar por cliente
- **`flow.js`**: `marca` (nome, whatsapp, mensagem), `hero` (selo/título/subtítulo),
  `steps` (perguntas SPIN + opções, cada opção com `report` = frase usada no
  diagnóstico), `captura` (campos). Use a copy aprovada. Sem travessões.
- **`diagnostico.js`**: o texto das etapas do relatório (abertura, cenário,
  mecanismo, comparação, o que precisa acontecer, prova, CTA) com os campos
  `{{}}` preenchidos pelas respostas. Adapte ao cliente.
- **`styles.css`**: tokens de cor + logo (ver `identidade-visual.md`).

## Padrões de conversão OBRIGATÓRIOS (do quiz de referência + aprovado)
- **1ª pergunta já na 1ª tela.** Nada de tela de "Começar" antes. O gancho
  (título + subtítulo) aparece junto da pergunta 1, e o lead já responde. (No
  `app.js`, o estado inicia no passo 0 e o passo 0 renderiza o intro + a 1ª
  pergunta.) Só a 1ª tela tem título: repetir rótulo de etapa em cima de cada
  pergunta cansa. Se houver selo, deixe **opcional** no `flow.js`, para tirar
  sem mexer no motor.
- **Auto-avanço**: ao escolher a opção, vai pra próxima sozinho (sem botão
  "Continuar"). Maior conclusão/connect rate. Mantém botão "Voltar".
- **Uma pergunta por tela** + barra de progresso **sem número**: nem
  "Pergunta X de N", nem porcentagem, nem "responda N perguntas" no subtítulo ou
  na meta description. Os dois anunciam o tamanho da fila e fazem o quiz parecer
  longo justo na abertura, que é onde o lead ainda desiste. A barra enchendo já
  diz que anda e que tem fim. Tempo **pode** e ajuda ("leva 2 minutos"): fala de
  esforço, não de volume.
- **Captura no fim**: peça o mínimo. Padrão atual: Nome, **WhatsApp (com máscara
  `(XX) XXXXX-XXXX`)**, **E-mail (obrigatório)**. Enquadre como "pra onde
  enviamos seu diagnóstico" (sobe o connect rate).
- **Máscara de WhatsApp** e validação (telefone completo, e-mail válido) só ao enviar.
- **Captura de UTMs** da URL (`utm_source/medium/campaign/content/term`) e envio
  junto do lead. O anúncio aponta pra **raiz com query** (`/?utm_...`), nunca
  `/index.html` (servidor limpa a URL e derruba a query).
- **sessionStorage**: salva progresso; oferece "continuar de onde parou".
- **Acessibilidade**: navegação por teclado, foco visível, `aria-live` em erros,
  `prefers-reduced-motion`.
- **Zero dependência externa** (sem Google Fonts/CDN), regra de performance.

## Página pós-quiz (relatório)
- `diagnostico.html` + `diagnostico.js` leem as respostas do `sessionStorage` e
  montam um relatório personalizado. Botão **WhatsApp** abre conversa
  pré-preenchida (`wa.me/<numero>?text=...`), já com o índice do lead na mensagem.
- **CTAs distribuídos, não um só no fim.** Três ao longo do relatório, e o
  **último adapta ao tipo de lead** (qualificado / nutrir / fora do perfil).
- **Sem barra de "Baixar PDF" no topo.** Ela compete com o conteúdo logo na
  entrada do relatório. O `@media print` continua existindo para quem imprimir.
- **Depoimentos em ordem narrativa fixa**, não condicionados ao gargalo: prova
  que aconteceu (dado duro) → derruba a objeção de preço → derruba a objeção de
  público → aspiração. As duas objeções aparecem em quase todo lead, então
  condicioná-las ao gargalo declarado só reduz a prova. O que varia bem é uma
  **citação** no fim, ligada ao objetivo.
- **Print de resultado precisa de data na legenda.** Se o print é do meio do mês
  e o texto cita o fechamento, sem a data parece contradição.
- **Nunca recrie um print em HTML.** Isso fabrica a aparência de um documento.
  Sem print aprovado, use citação atribuída com data.

## Armadilhas de CSS que já quebraram funil no celular

**1. `:hover` não pode imitar o estado selecionado.** Em touch o hover **gruda**
depois do toque. Se `.opt:hover` pinta a mesma borda e o mesmo fundo do
`[aria-checked="true"]`, a pergunta seguinte abre com uma opção parecendo já
escolhida. Deixe o hover atrás de um media query e dê ao selecionado um sinal a
mais (um anel interno, por exemplo), para os dois nunca serem idênticos nem no
desktop:
```css
@media (hover: hover) and (pointer: fine) {
  .opt:hover { /* ... */ }
}
```

**2. Nada de `white-space: nowrap` no `.btn` geral.** Serve só para botões
curtos que não podem quebrar (o "Voltar"). No `.btn` geral ele estoura os CTAs
do relatório: um texto de 361px dentro de um botão de 312px vaza para fora da
pílula. Ponha o nowrap na classe do botão curto, não na genérica.

**3. `.opt` é `<button>`:** sem `color` e `font: inherit` explícitos ele herda o
padrão do navegador e some no fundo escuro. E o fundo dele precisa destacar do
cartão, senão a caixa fica invisível.

## Verificação local (antes de publicar)
Rode um servidor estático e teste o fluxo: 1ª pergunta na tela, auto-avanço,
máscara, e-mail obrigatório, captura de UTM (abra com `/?utm_source=teste`),
relatório preenchido. Cheque o console (zero erros).

**Teste emulando celular, não só desktop.** Com Playwright, use um device com
touch (`devices['iPhone 13']`) e percorra as N perguntas conferindo que nenhuma
tela abre com opção marcada:
```js
const marcadas = await p.$$eval('.opt', e => e.filter(x => x.getAttribute('aria-checked') === 'true').length);
```
E meça o transbordo dos botões comparando `scrollWidth` com a largura real, nos
**três caminhos** de CTA (o texto mais longo é o que estoura).
