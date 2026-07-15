# Arquitetura do funil + padrões de conversão

Base de referência aprovada (já converteu) em `assets/funil-referencia/`.
**Duplique e adapte.** Stack: HTML/CSS/JS puro, sem dependências, sem build,
mobile-first. Abre direto no navegador.

## Arquivos
```
funil-<cliente>/
├── index.html        ← quiz (1ª pergunta já na 1ª tela)
├── styles.css        ← TEMA: bloco ":root  PALETA — TROQUE AQUI" + layout
├── flow.js           ← TODA a copy do quiz + dados da marca (whatsapp, hero, perguntas, captura). EDITAR AQUI.
├── app.js            ← motor: render, auto-avanço, validação, sessionStorage, tracking, UTMs, máscara, enviarLead()
├── diagnostico.html  ← página pós-quiz (relatório) + Baixar PDF + WhatsApp
├── diagnostico.js    ← monta o relatório com as respostas; TROCAR o texto do diagnóstico pela copy do cliente
├── integracao-planilha.gs ← Apps Script da planilha de leads (ver leads-planilha.md)
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
  (selo + título) aparece junto da pergunta 1, e o lead já responde. (No `app.js`,
  o estado inicia no passo 0 e o passo 0 renderiza o intro + a 1ª pergunta.)
- **Auto-avanço**: ao escolher a opção, vai pra próxima sozinho (sem botão
  "Continuar"). Maior conclusão/connect rate. Mantém botão "Voltar".
- **Uma pergunta por tela** + barra de progresso ("Começando", "Pergunta X de N").
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
- **Zero dependência externa** (sem Google Fonts/CDN) — regra de performance.

## Página pós-quiz (relatório) + PDF
- `diagnostico.html` + `diagnostico.js` leem as respostas do `sessionStorage` e
  montam um relatório personalizado (auto-preenchido). Botão **Baixar PDF** =
  `window.print()` com `@media print` (esconde botões/nav). Botão **WhatsApp**
  abre conversa pré-preenchida (`wa.me/<numero>?text=...`).
- O relatório também serve de PDF personalizado pra cadência de follow-up.

## Verificação local (antes de publicar)
Rode um servidor estático e teste o fluxo: 1ª pergunta na tela, auto-avanço,
máscara, e-mail obrigatório, captura de UTM (abra com `/?utm_source=teste`),
relatório preenchido, Baixar PDF. Cheque o console (zero erros).
