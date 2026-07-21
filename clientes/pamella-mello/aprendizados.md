# Aprendizados e decisões — Pâmella Mello

Registro vivo do que foi decidido, o que está no ar e o que ainda depende de
alguém. Leia antes de mexer. Atualize depois de cada rodada.

## Estado atual (checkpoint)

- **Funil no ar:** https://funil-pamella-mello.vercel.app (projeto Vercel
  `funil-hipnose`, time simpleacc). Estrutura estática padrão da casa
  (`funil-hipnose/`): hero + quiz SPIN + loading ~5s + captura + diagnóstico.
- **Leads caindo em planilha:** Make (webhook instant) → Google Sheets, aba
  "Leads". Dispara só quando chega lead (não consome crédito à toa). Data em
  horário de Brasília.
- **Meta Pixel ativo:** `328694529132563` no quiz e no diagnóstico. Eventos:
  PageView, InitiateCheckout (início do quiz), Lead (cadastro enviado),
  ViewContent (abre diagnóstico), Contact (clique no WhatsApp). Só esses vão
  pro Pixel; eventos internos ficam no console.

## Decisões que valem pra sempre

- **Sem travessões (traço longo)** em nenhum material (copy, site, docs,
  mensagens). Regra também no `CLAUDE.md` da raiz.
- **Identidade visual:** dourado/champagne + serifa (espresso), puxada do
  Instagram @pamellam.hipnoterapeuta. Favicon = "P" serifado dourado.
- **Qualificação por intenção**, não por pergunta crua de renda. Flags
  `foraDeArea` (geografia) e `nutrir` (prontidão) adaptam o CTA do diagnóstico.
- **Posicionamento das copies:** tratar a *causa* emocional, não o sintoma;
  "não é falta de força de vontade"; Hipnose Clínica + Neurociência + Leis
  Biológicas; resultados em até 3 meses. Destino do CTA = a leitura emocional
  gratuita (o quiz).
- **Conformidade Meta (saúde):** falar de forma geral ("se você sente..."),
  nunca afirmar que a pessoa "tem" um transtorno nem prometer "cura".
- **Tráfego não é o produto:** o combinado é instalar máquina comercial e
  métrica. O relatório de tráfego foi entrega contratual, com tom formal e
  factual (sem elogios), destacando a quebra entre "conversas reportadas" e
  leads reais.

## Aprendizados técnicos (pra não tropeçar de novo)

- **Make só estrutura lead em `application/json`.** `text/plain`/sendBeacon
  falha silencioso. O `app.js` envia `fetch` CORS + `application/json` +
  `keepalive`.
- **Renomear a aba da planilha quebra o `addRow` do Make** ("Unable to parse
  range"). Se renomear, atualizar o módulo do cenário.
- **Deploy Vercel:** o domínio automático do projeto é `funil-hipnose.vercel.app`;
  o público `funil-pamella-mello.vercel.app` é um alias separado que **não**
  atualiza sozinho no `--prod`. Depois de cada deploy, reaponte o alias:
  `vercel alias set <deployment> funil-pamella-mello.vercel.app`.
- **SAML/SSO do time:** o token deploya, mas operações de **domínio custom**
  exigem sessão SAML fresca. Adicionar domínio pelo painel (ou gerar token logo
  após login) resolve.
- **PDFs** (relatório, cadências) são gerados com Chromium headless
  (`headless_shell`, não o binário `chrome` que rejeita `--headless=old`).

## Entregáveis (nesta pasta)

- `funil-hipnose/` — o funil (código no ar).
- `materiais/copies-anuncios.md` — 3 estáticos, 3 carrosséis, 3 roteiros de
  vídeo + variações de gancho.
- `materiais/relatorio-trafego-junho-2026.(md|html|pdf)` — relatório de tráfego.
- `materiais/cadencia-3-leads-avaliacao-nao-fechou.(md|html|pdf)` — cadência
  comercial firme para quem fez avaliação e não fechou (com registro da dor).
- `materiais/cadencia-3b-leads-avaliacao-sem-registro.(md|html|pdf)` — mesma
  cadência sem depender do registro da dor (menu de dores genéricas).
- `materiais/onboarding-2026-06-12-notas-e-transcricao.md` — base do onboarding.

## Pendências e responsabilidades

### Simple Acc (nós)
- Subdomínio `quiz.pamellamellohipnoterapia.com.br`: CNAME já aponta pra
  Vercel; falta adicionar o domínio no projeto (bloqueado por SAML no token,
  ver acima). Concluir quando houver token/painel com SSO fresco.
- Quando a cliente liberar mensuração: instalar CAPI (server-side) e marcar os
  eventos de jornada; reconciliar conversas x leads x avaliações x fechamentos.

### Cliente / time dela (cobrar)
- **Tráfego (Bruno):** apontar anúncios pro funil (com UTMs), consolidar as 12
  campanhas em CBO, criar públicos personalizados e semelhantes, ajustar a
  linguagem à política do Meta (remover "cura"), revisar posicionamentos e
  faixa etária.
- **Base de leads:** organizar a lista de quem fez avaliação e não fechou (a
  Sheila mencionou ter isso) e **rodar as cadências** (3 e 3B).
- **Depoimentos:** confirmar liberação para usarmos mais provas sociais.
- **Decisão estratégica:** avaliar centralizar a gestão de tráfego com a
  Simple Acc (hoje com o Bruno, externo).

## Observações de repositório

- Existe um branch/PR paralelo mais antigo desta cliente (PR #46,
  `pamella-mello-site-config`) com **outra convenção de pastas**
  (`funis/`, `roteiros/`, base de conhecimento). O trabalho atual e completo
  está na estrutura `funil-hipnose/` + `materiais/`. Reconciliar antes de
  mergear os dois para não duplicar o funil na main.
