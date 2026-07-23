# Diagnóstico Executivo (IDE) · Felipe Damasceno

Funil de quiz do cliente Felipe Damasceno (Governo Empresarial). Transforma a
copy aprovada (ver `clientes/felipe-damasceno/estrategia/`) em páginas no ar:
quiz de 9 perguntas → captura → tela de carregamento → relatório personalizado
com o **IDE (Índice de Dependência Empresarial)** → CTAs de WhatsApp distribuídos.

Stack: HTML/CSS/JS puro, sem build, sem dependências. **Estrutura invisível
espelhada do quiz de alta conversão da Pâmella Mello** (SPIN de 9 passos,
qualificação no fim, tela de loading, relatório com espelho do cenário, reframe,
dois caminhos, método, CTAs distribuídos e depoimentos, com CTA final adaptado à
qualificação). Identidade visual e copy 100% do Felipe; o **% do IDE** é a
personalização exclusiva dele.

## Arquivos
- `index.html` — quiz (uma pergunta por tela, sem título repetido em cima, auto-avanço, barra de progresso).
- `diagnostico.html` + `diagnostico.js` — relatório pós-quiz (calcula o IDE, monta o diagnóstico, CTAs de WhatsApp distribuídos).
- `flow.js` — **toda a copy** (config, marca, hero, 9 perguntas com pesos do IDE, captura). Editar aqui.
- `styles.css` — identidade (tema dark navy + dourado, proposto).
- `app.js` — motor do funil (render, validação, tela de loading, UTMs, sessionStorage, POST dos leads).
- `integracao-planilha.gs` — Google Apps Script da planilha de leads.

## Estrutura do quiz (9 passos, ordem SPIN)
situação → problema → há quanto tempo → implicação → o que já tentou → objetivo →
perfil → **faturamento** (qualificação de ICP) → **prontidão** (qualificação de
intenção). As duas últimas ficam no fim, como no quiz da Pâmella.

## Como o IDE é calculado
Pesos por resposta (0 a 3) nas perguntas situação, problema, implicação,
necessidade e perfil. `IDE% = soma / máximo`. ≥66% = Alto, 33 a 65% = Médio,
<33% = Baixo. As perguntas de tempo, objetivo, faturamento e prontidão **não**
entram no cálculo (só na leitura e na qualificação).

## Qualificação e CTA adaptado
`classificarLead()` roteia o lead em três faixas, e o relatório troca o CTA final:
- **fora** (faturamento até R$ 50 mil ou R$ 50 a 100 mil): fora do ICP → conteúdo + plataforma.
- **nutrir** (prontidão "não é prioridade" ou "só pesquisando"): "entender melhor como funciona".
- **qualificado** (ICP + pronto): "agendar Sessão Estratégica".

## No ar (preview)
Publicado no time da Simple na Vercel (produção do projeto
`diagnostico-executivo-felipe`): **https://diagnostico-executivo-felipe.vercel.app**
Ainda com as pendências abaixo (WhatsApp, logo/cores e planilha).

## Pendências para publicar (o que falta do cliente)
1. **WhatsApp do Felipe** (CTA): trocar `marca.whatsapp` em `flow.js` (hoje `5500000000000`).
2. **Logo + cores oficiais**: hoje usa marca em texto e o tema dark navy + dourado
   proposto. Trocar o logo (colocar `logo.png` e ativar `<img class="logo-img">`)
   e ajustar os HEX no `:root` do `styles.css` quando vier o manual de marca.
3. **Depoimentos**: a seção "Quem já viveu isso" está com um placeholder. Quando
   houver prints/vídeos de empresários, é só trocar o bloco `.depo` por uma
   galeria `.depo-gallery` com `<img class="depo-shot" src="depoimentos/01.jpg">`
   (a mesma estrutura usada no funil da Pâmella).
4. **Planilha de leads**: criar no Drive do cliente, colar o `integracao-planilha.gs`
   no Apps Script, implantar como App da Web, colar a URL `/exec` em
   `app.js → LEADS_ENDPOINT`, republicar e testar um lead de ponta a ponta.

## Deploy (resumo)
Publicar **apenas esta pasta** na Vercel da Simple. Rodar tráfego com
`?utm_source=...&utm_campaign=...` na URL para as UTMs caírem na planilha.
