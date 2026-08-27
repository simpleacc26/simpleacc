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
├── depoimentos/      ← vídeos e prints do relatório (ver prova-social.md)
├── integracao-planilha.gs ← Apps Script, SÓ para cliente sem Make (ver leads-planilha.md)
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
- **Uma pergunta por tela** + barra de progresso **sem número nenhum**. Nem
  "Pergunta X de N", nem porcentagem: número ali faz o quiz parecer longo e
  medido, e derruba conclusão. Só a barra enchendo. Ver `ajustes-validados.md`.
- **Captura no fim**: peça o mínimo. Nome, **WhatsApp** e **E-mail**. Enquadre
  como acesso: "Deixe o seu contato para acessar o diagnóstico agora e receber
  uma cópia no WhatsApp."
- **Máscara de WhatsApp**: leia `bugs-que-ja-quebraram.md`, item 2, ANTES de
  escrever. Já perdeu lead em produção. Placeholder com DDD **nacional (11)**,
  nunca o DDD do cliente.
- **Captura de UTMs** da URL (`utm_source/medium/campaign/content/term`) e envio
  junto do lead. O anúncio aponta pra **raiz com query** (`/?utm_...`), nunca
  `/index.html` (servidor limpa a URL e derruba a query).
- **sessionStorage**: salva progresso; oferece "continuar de onde parou".
- **Acessibilidade**: navegação por teclado, foco visível, `aria-live` em erros,
  `prefers-reduced-motion`.
- **Fonte externa entra sem bloquear a renderização** (`media="print"` +
  `onload="this.media='all'"` + `<noscript>` de fallback). Google Fonts fora do
  ar não pode travar uma página de formulário. Sempre declare a pilha local de
  fallback. Nenhuma outra dependência externa.

## Página pós-quiz (relatório)
- `diagnostico.html` + `diagnostico.js` leem as respostas do `sessionStorage` e
  montam o relatório personalizado.
- **Topo:** resultado nomeado + o índice com a faixa. Ver `ajustes-validados.md`.
- **3 CTAs de WhatsApp distribuídos** ao longo do relatório, não um só no fim,
  com a mensagem já carregando o resultado nomeado.
- **Prova social** antes do CTA final: vídeo e print. Ver `prova-social.md`.
- **Sem rodapé.**
- O PDF genérico para o SDR mandar no WhatsApp é outra entrega, da skill
  `leitura-pdf-whatsapp`. Não é este relatório.

## Verificação local (antes de publicar)
Sirva a pasta e teste o fluxo inteiro: 1ª pergunta na tela, auto-avanço, máscara
(cole `+55 11 99991-2039`), e-mail obrigatório, UTM (`/?utm_source=teste`),
relatório preenchido. Console com zero erro.

Renderize em **430px e 900px**. Ver `deploy-vercel.md` para o atalho de injetar
respostas no `sessionStorage` e cair direto no relatório.
