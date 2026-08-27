---
name: gerar-quiz-diag-pag-pos-quiz
description: >-
  Implementa e PUBLICA o funil de quiz de um cliente (Simple Acc): o quiz de 9
  passos, a página pós-quiz com o diagnóstico personalizado, a publicação na
  Vercel, a planilha de leads no Drive do cliente e a integração pelo Make,
  feita e testada pelo navegador. Aplica a identidade visual do cliente e os
  ajustes validados (barra sem número, índice calibrado, resultado nomeado,
  qualificação em 4 faixas). Use sempre que alguém pedir para "montar/implementar
  o funil", "criar o quiz", "subir a página do cliente", "publicar o funil na
  Vercel", "fazer a página pós-quiz", ou transformar a copy/estratégia aprovada
  em páginas no ar. Pergunte ao usuário o que faltar do cliente (identidade,
  logo, WhatsApp, pasta do Drive, conta Vercel) — não invente.
---

# Gerar quiz + diagnóstico: implementar, publicar e integrar

## O que esta skill faz

Transforma a **copy/estratégia já aprovada** em páginas no ar:

1. **Quiz de 9 passos**, uma pergunta por tela, as duas porteiras no fim
2. **Página pós-quiz** com diagnóstico personalizado, resultado nomeado, prova
   social e CTAs de WhatsApp
3. **Publicação na Vercel**, no time da Simple, com URL limpa e pública
4. **Planilha de leads** no Drive do cliente e **integração pelo Make**, feita e
   **testada pelo navegador**

HTML, CSS e JS puro. Sem build, sem dependência.

---

## Leia isto antes de escrever a primeira linha

Três referências não são opcionais. Pular qualquer uma delas já custou lead
perdido ou retrabalho em cliente real:

- **`references/bugs-que-ja-quebraram.md`** · oito bugs de produção, com o
  sintoma, a causa e a correção. O primeiro deles fazia **o lead evaporar em
  silêncio**, com o funil no ar recebendo tráfego.
- **`references/ajustes-validados.md`** · os 15 ajustes que sempre são pedidos.
  Aplique por padrão, sem esperar pedirem.
- **`references/copy-e-linguagem.md`** · linguagem neutra em gênero e as travas
  de promessa. O erro de copy mais caro que já cometemos está aqui.

Demais referências: `arquitetura-funil.md`, `intake-cliente.md`,
`identidade-visual.md`, `leads-planilha.md`, `deploy-vercel.md`,
`prova-social.md`.

O motor em **`assets/funil-referencia/app.js`** já carrega todas as correções.
**Copie inteiro e mexa o mínimo.** Os comentários em caixa alta marcam trechos
que já quebraram em produção: não os apague.

---

## Regra de ouro: pergunte o que falta, não invente

Sem copy aprovada não há o que publicar. O essencial a levantar:

- A **copy aprovada** (doc de estratégia)
- **Identidade visual**: manual de marca oficial, ou autorização para inferir e
  marcar como provisório
- **WhatsApp** do cliente, só dígitos, com o país
- **Pasta do cliente no Drive** e **conta Vercel** (time da Simple)
- **O gênero real do público**, as **travas de promessa** e os **termos
  proibidos em anúncio**

Lista completa em `references/intake-cliente.md`.

---

## Fluxo

```
1. INTAKE      → copy, identidade, assets, contas, travas de linguagem
2. BUILD       → copiar a base, escrever a copy, calibrar os pesos
3. CALIBRAGEM  → rodar TODAS as combinações do índice e documentar
4. LOCAL       → renderizar em 430px e 900px, testar a máscara
5. DEPLOY      → Vercel, time da Simple, e conferir SHA256 de tudo
6. LEADS       → planilha + Make, e TESTAR pelo navegador
7. ENTREGA     → links + pendências nomeadas + aprendizados + PR
```

### Passo 2: Build

Copie `assets/funil-referencia/` para `clientes/<cliente>/funis/quiz-<cliente>/`.

- **`flow.js`**: toda a copy, os pesos e os resultados nomeados. É o arquivo que
  se edita. Deixe a regra de gênero escrita no cabeçalho.
- **`diagnostico.js`**: o texto do relatório e a prova social.
- **`styles.css`**: tokens do manual de marca.
- **`app.js`**: o motor. **Mexa o mínimo.**

### Passo 3: Calibragem do índice (obrigatória)

**Rode todas as combinações de peso antes de publicar.** Não é opcional.

No primeiro corte de um índice real, 89% das 1024 combinações caíam em "Alta" e
"Baixa" era **matematicamente impossível**: o número era teatro.

Documente a distribuição obtida no `flow.js`. Se mexer em qualquer peso depois,
**rode de novo**. Detalhe em `ajustes-validados.md`.

### Passo 6: Leads (o passo onde se erra)

Webhook instantâneo do Make → `addRow`. **2 operações por lead**, sem polling.

> **Validação é responder o quiz inteiro no navegador e depois ler a planilha.**
> Testar com curl não vale: curl manda o content-type certo e passa mesmo com o
> bug em pé. Status HTTP não vale: o Make devolve 200 para o que grava e para o
> que descarta.

### Passo 7: Entrega

Link do funil, link da planilha, e a confirmação de que o teste passou. Liste as
**pendências nomeadas** (rastreamento, autorização de depoimento, logo em SVG) e
registre os aprendizados no `aprendizados.md` do cliente. Commit e PR.

---

## Checklist antes de publicar

**Copy**
- [ ] Copy 100% do cliente, zero texto da base de referência
- [ ] **Leitura de gênero feita**: nenhum adjetivo concorda com quem lê
- [ ] Nenhuma promessa de resultado financeiro, se o cliente recusa
- [ ] Zero travessões (`grep -c '—'` = 0), sem emoji

**Estrutura**
- [ ] Barra de progresso **sem número nenhum**; sem rodapé
- [ ] 9 passos, as 2 porteiras no fim, porteiras refletindo o ICP real
- [ ] Índice com nome e sigla próprios; **distribuição rodada e documentada**
- [ ] Resultado nomeado no topo, no WhatsApp e na planilha
- [ ] 4 faixas de qualificação; regra de corte cruzada em `classificarLead()`
- [ ] Bloco de autoridade breve; grade de credenciais só com número real
- [ ] Trava de WhatsApp mudo ativa

**Formulário**
- [ ] `+55 11 99991-2039` colado mostra `(11) 99991-2039` **e sai assim no payload**
- [ ] Sem `maxLength` no campo mascarado; ouve `input`, `change` e `blur`
- [ ] Placeholder com DDD nacional (11)

**Publicação**
- [ ] Time da Simple confirmado, nunca conta pessoal
- [ ] Vercel Authentication desligada; raiz responde 200
- [ ] **SHA256 do publicado conferido contra o local em TODOS os arquivos**
- [ ] Fontes carregando sem bloquear a renderização

**Integração**
- [ ] `fetch` **sem** `mode: "no-cors"`, com `application/json` e `keepalive`
- [ ] Quiz respondido inteiro **no navegador** e linha conferida na planilha
- [ ] Linha de teste apagada; aba "Untitled" não renomeada
- [ ] Colunas de data e de índice formatadas

**Entrega**
- [ ] Links entregues, pendências nomeadas, aprendizados registrados, PR aberto
