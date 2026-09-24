# Quiz Diagnóstico Saúde · Vitória Daniela / Grupo Magna

Funil **Quiz → Análise → Diagnóstico** para empresárias da saúde (clínicas e
consultórios de alto padrão). HTML/CSS/JS puro, sem build, sem dependências
(só as fontes do Google Fonts).

Irmão do Quiz Genérico (`../quiz-magna`), com a mesma arquitetura e uma
identidade própria para o público da saúde.

## Copy e ordem das perguntas

- **Texto da headline, da subheadline, das perguntas e das opções: exatamente
  como a Vitória escreveu** no doc "QUIZ" (aba QUIZ SAUDE), inclusive a ordem
  das opções dentro de cada pergunta. Ela pediu para não mudar a redação.
- **Ordem das perguntas = Método ASK** (revisão validada em
  `estrategia/2026-09-08-revisao-quiz-metodo-ask.html`):
  1. Tipo de contato que chega no WhatsApp (abertura, não sensível)
  2. Estrutura da clínica (**nova**, validada na revisão)
  3. Maior desafio (**pergunta-chave de balde**)
  4. Ticket médio do procedimento (**nova**, validada na revisão)
  5. Momento de urgência
  6. Faturamento mensal (movido para o fim)
  7. Quer a análise de um especialista? (fecha como convite)

## Identidade (styles.css)

Tema claro "consultório de alto padrão": porcelana marfim `#F6F0E8`, dourado
champanhe `#B8914E` (derivado do `#C5A059` da marca), café escuro `#2B211A`
nos botões e nude rosé `#EAD8CB`. Títulos em **Cormorant Garamond**, texto em
**Manrope**. Ícones em traço fino (SVG), sem emojis.

## Elementos dopaminérgicos

- Opção escolhida: letra que vira selo escuro, check que se desenha, onda
  dourada e vibração curta no celular.
- Barra de progresso com ponto pulsando (batimento) na ponta; micro-mensagens
  ("Anotado. Essa é a resposta mais importante…", "Falta pouco…").
- Captura com selo "7 de 7 respostas registradas".
- Tela de análise (0→100% em 5s): medalhão com anel girando e ícone que troca
  a cada etapa, linha de "sinais vitais" (eletrocardiograma) correndo, frases
  rotativas com o nome da pessoa, checklist que acende e explosão de brilho
  dourado no 100%.
- Diagnóstico: seções que surgem ao rolar, "Raio-X das suas respostas",
  pilar prioritário destacado.

## Personalização do diagnóstico (diagnostico.js)

- **Balde** (pergunta 3): texto de cenário, raiz e caminho diferente para
  Posicionamento, Atração sem sistema, Clínica que depende só de você e
  Previsibilidade.
- **Tipo de contato** (pergunta 1): frase própria no "O que suas respostas
  revelam".
- **Pilar prioritário** entre os 3 Pilares de Previsibilidade (da VSL Saúde).
- **Camada** (A / B / desqualificado): muda o CTA, a mensagem do WhatsApp e
  mostra ou não "O custo de esperar". Quem responde "Não" na pergunta 7 vai
  para desqualificado. Faixas iguais às do Genérico (primeira aproximação,
  ajustar com dados reais).
- "Dra. Camila Souza" vira "Dra. Camila" na personalização.

## Leads → planilha

`integracao-planilha.gs` é **um script só para os dois quizzes** (o mesmo
arquivo está em `../quiz-magna`). Grava o Genérico na aba "Genérico" e o Saúde
na aba "Saúde" da planilha "Leads | New Quizzes - Vitória Daniela". O passo a
passo está no topo do arquivo. Depois de implantado, a URL `/exec` vai em
`LEADS_ENDPOINT` no `app.js` dos dois funis.

## Deploy

Vercel, time da Simple, projeto `diagnostico-magna-saude`. Publicar só os
arquivos de runtime (html, css, js, assets), nunca a raiz do repositório.

## Pendências

- [ ] Implantar o Apps Script e ligar o `LEADS_ENDPOINT` (precisa de alguém
      com acesso de edição à planilha; ver topo do `.gs`).
- [ ] Depoimentos de clientes **da saúde**: hoje usa o print real de
      posicionamento (`depoimento-sessao.jpg`). Um depoimento de dentista,
      dermato ou clínica de estética aumentaria muito a identificação.
