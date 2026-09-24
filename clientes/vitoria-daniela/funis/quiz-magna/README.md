# Quiz Diagnóstico · Vitória Daniela / Grupo Magna

Funil **Quiz → Diagnóstico** (sem LP/VSL separados). HTML/CSS/JS puro, sem
dependências, sem build. Abre direto no navegador.

## O que é

Reestruturação dos 2 quizzes que a Vitória escreveu (`estrategia/2026-09-08-revisao-quiz-metodo-ask.html`
documenta a proposta), aplicando o **Método ASK**: pergunta-chave de balde
(o que mais trava o negócio) e faturamento por último. **Texto de cada
pergunta e opção é exatamente o que a Vitória escreveu** — ela pediu
explicitamente para não mudar redação, só a ordem/estrutura.

Esta pasta implementa o **Quiz Genérico** (alto ticket, sem nicho). O
**Quiz Saúde** (mesma lógica, perguntas equivalentes voltadas a
clínica/consultório) ainda não foi implementado — é o próximo passo, se
quiserem os dois funis rodando em paralelo (era a ideia da call de 02/09:
teste A/B entre funil genérico e funil de nicho saúde).

## Arquivos
```
index.html               ← quiz (1ª pergunta já na 1ª tela, abaixo da promessa)
styles.css                ← identidade: dourado #C5A059 sobre fundo quase-preto premium
flow.js                   ← copy do quiz (perguntas/opções da Vitória) + lógica de balde/camada
app.js                     ← motor: render, auto-avanço, validação, UTMs, tela de análise, enviarLead()
diagnostico.html          ← página pós-quiz (relatório personalizado) + Baixar PDF + WhatsApp
diagnostico.js             ← monta o relatório por balde (4 variantes) e por camada (CTA)
integracao-planilha.gs    ← Apps Script (grava numa aba nova "Quiz Magna" na planilha já existente)
assets/                    ← foto da Vitória + 3 depoimentos reais (copiados de funis/relatorio/assets)
```

## Lógica de balde e camada (em `flow.js`)

**Balde** (o que mais trava, definido pela pergunta 3 "maior desafio"):
Sem Posicionamento · Marketing Sem Sistema · Refém da Operação · Sem Previsibilidade.
Cada balde tem um texto de diagnóstico diferente em `diagnostico.js`.

**Camada** (o quão pronta a pessoa está, cruza faturamento + ticket +
estrutura + urgência de investimento): A (Implementação Magna, CTA
assertivo) · B (Mentoria Magnetizze, CTA mais suave) · desqualificado
(nutrição, sem push de agendamento). Faixas escaladas a partir do
diagnóstico de `estrategia/2026-07-06-diagnostico-leads-desqualificados.md`
(piso do ICP ~R$20mil, ideal R$40-50mil+ com equipe e ticket R$3k+) —
**são uma primeira aproximação, ajustar depois de ver dados reais.**

## Tela de análise (transição quiz → diagnóstico)

Entre o envio do formulário e a página de diagnóstico, uma barra de
progresso anima de 0% a 100% em ~5s, com frases rotativas, ícone
animado e checklist "acendendo" progressivamente (`renderAnalisando()`
em `app.js`), antes de redirecionar pra `diagnostico.html`.

## Testado localmente (Playwright)
Fluxo completo rodado 2x (perfil desqualificado e perfil Camada A):
1ª pergunta na tela inicial, auto-avanço nas 7 perguntas, captura com
máscara de WhatsApp, tela de análise, redirecionamento, diagnóstico
personalizado por balde/camada. Zero erros de console nos dois casos.

## Pendências
- [ ] **Deploy na Vercel** — bloqueado: CLI sem login (`vercel whoami` → logged out).
      Precisa alguém logar com a conta/time da Simple antes de publicar
      (ver instrução no chat).
- [ ] **Ligar `LEADS_ENDPOINT`** em `app.js` com a URL `/exec` do Apps Script
      (ver `integracao-planilha.gs`) e testar um lead real caindo na
      aba "Quiz Magna" da planilha.
- [ ] Quiz Saúde (mesma lógica, ainda não implementado).
- [ ] Depoimentos: reaproveitados os 2 usados no relatório PDF
      (`depoimento-sessao.jpg`, `depoimento-marco.jpg`); dá pra trocar
      por outros/mais quando a Vitória tiver.
