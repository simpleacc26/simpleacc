# Quiz Diagnóstico Saúde · Vitória Daniela / Grupo Magna

Funil **Quiz → Análise → Diagnóstico** para empresárias da saúde (clínicas e
consultórios de alto padrão). HTML/CSS/JS puro, sem build, sem dependências
(fontes auto-hospedadas em `assets/fonts/`, via `fonts.css`).

**No ar:** https://diagnostico-magna-saude.vercel.app

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
- Barra de progresso com ponto pulsando (batimento) na ponta; micro-recompensa
  dentro do card seguinte ("Anotado. Essa é a resposta mais importante…",
  "Falta pouco…"). A barra fica oculta só na 1ª tela, para a pergunta 1
  aparecer na dobra.
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

## Navegação e robustez

- Voltar do navegador/celular volta uma pergunta (history API).
- Recarregar na análise ou voltar do diagnóstico mostra "Ver meu diagnóstico"
  / "Refazer".
- O diagnóstico recebe as respostas pela URL (só valores das opções e o
  primeiro nome, nunca WhatsApp/e-mail), então o link funciona em outra aba
  ou fora do navegador do Instagram. No navegador do Instagram/Facebook o
  "Baixar PDF" vira uma dica para abrir no navegador.
- WhatsApp: normaliza +55/0 do preenchimento automático e aceita fixo
  (WhatsApp Business da recepção).
- `tracking.js`: preencha `meta_pixel_id` / `ga4_id` e o Pixel/GA4 carregam
  sozinhos (evento padrão Lead / generate_lead na captura).

## Leads → planilha

`integracao-planilha.gs` é **um script só para os dois quizzes** (o mesmo
arquivo está em `../quiz-magna`). Grava o Genérico na aba "Genérico" e o Saúde
na aba "Saúde" da planilha "Leads | New Quizzes - Vitória Daniela".
Protege contra texto que viraria fórmula e grava a URL de entrada (com
fbclid) e o referrer. O passo a
passo está no topo do arquivo. Depois de implantado, a URL `/exec` vai em
`LEADS_ENDPOINT` no `app.js` dos dois funis.

## Deploy

Vercel, time da Simple, projeto `diagnostico-magna-saude`. Publicar só os
arquivos de runtime (html, css, js, fonts.css, assets) a partir de uma pasta
temporária, nunca a raiz do repositório.

## Pendências

- [ ] Implantar o Apps Script e ligar o `LEADS_ENDPOINT` (precisa de alguém
      com acesso de edição à planilha; ver topo do `.gs`).
- [ ] Confirmar se o lead do Saúde também precisa entrar no fluxo Make → GHL
      do SDR (hoje só a planilha). Se sim, o .gs pode chamar o webhook do Make.
- [ ] Depoimentos de clientes **da saúde**: hoje usa o print real de
      posicionamento (`depoimento-sessao.jpg`). Um depoimento de dentista,
      dermato ou clínica de estética aumentaria muito a identificação.
- [ ] IDs do Meta Pixel / GA4 em `tracking.js`.
