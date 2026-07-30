# App — Levantamento de indicações da base

Aplicativo interno para **executar e acompanhar** o plano de ação de levantamento
de indicações junto à carteira de clientes ativos (Carlos Durães, 28/07/2026).

Substitui a planilha da ação: o mapeamento da carteira, a classificação por
prioridade, a abordagem, as indicações levantadas e o cronograma ficam num só
lugar, com banco de dados — o Carlos lança, o Daniel acompanha, os dois veem o
mesmo estado hoje e nos próximos dias.

O plano que originou o app está em
[`../estrategia/2026-07-28-plano-acao-levantamento-indicacoes.md`](../estrategia/2026-07-28-plano-acao-levantamento-indicacoes.md).

## No ar

- **App:** https://simpleacc-indicacoes.vercel.app
- **Projeto na Vercel:** `simpleacc-indicacoes` (time Simpleacc)
- **Acesso:** senha compartilhada (variável `APP_SENHA` na Vercel).

## O que dá para fazer

| Aba | Serve para |
| --- | --- |
| **Painel** | Números da ação (carteira, abordados, indicações, convertidos, taxa de indicação) e o cronograma com prazos — tarefa vencida aparece marcada como atrasada. |
| **Carteira** | Etapa 1. Colar a lista dos clientes ativos, classificar por prioridade, registrar o motivo, o status da abordagem, a resposta e lançar a indicação do cliente. |
| **Indicações** | Etapas 3 e 4. Cada indicado com contato, quem indicou, responsável, status comercial e se virou cliente. |
| **Abordagem** | Etapas 2 e 5. Pitch, mensagem base de WhatsApp, fila de contato em ordem de prioridade e os aprendizados. |

Detalhes práticos:

- **Inserir em massa:** um cliente por linha. Para trazer mais dados, use ponto e
  vírgula: `Maria Souza; Clínica X; 41999998888`.
- **Botão WhatsApp:** abre a conversa com a mensagem base já preenchida, trocando
  `{{nome}}` pelo primeiro nome do cliente. Precisa do telefone cadastrado.
- **Salvamento:** seleções e caixas salvam na hora; campos de texto salvam quando
  você clica fora (ou aperta Enter).
- **Automatismos:** registrar uma indicação já muda o cliente para “Indicou”, e
  mudar o status preenche a data da abordagem se estiver vazia.
- **Baixar CSV:** exporta a carteira e as indicações para fechar a planilha da ação.
- **Aba na URL:** `#carteira`, `#indicacoes`, `#abordagem` — dá para mandar o link
  direto para a tela certa.

## Rodar localmente

```bash
cd clientes/0-interno-simpleacc-inova/app-indicacoes
npm install
cp .env.example .env.local   # preencha DATABASE_URL (e APP_SENHA, se quiser senha)
npm run dev                  # http://localhost:3000
```

Sem `DATABASE_URL`, o app abre e explica na tela como conectar o banco.
Sem `APP_SENHA`, ele não pede senha (conveniente em desenvolvimento).

## Banco de dados

Postgres. Na Vercel: **Storage → Create Database → Neon → Connect Project** — a
variável `DATABASE_URL` é injetada automaticamente. Funciona com qualquer
Postgres (Neon, Supabase, Railway).

As tabelas (`clientes`, `indicacoes`, `notas`, `tarefas`) e o conteúdo inicial
(cronograma, rascunho do pitch e da mensagem) são criados **na primeira
requisição** — não há migration para rodar à mão. Ver `lib/db.ts`.

## Deploy

Projeto autocontido nesta subpasta. Ao ligar o repositório na Vercel, aponte o
**Root Directory** para `clientes/0-interno-simpleacc-inova/app-indicacoes`.

Variáveis de ambiente na Vercel:

| Variável | Para quê |
| --- | --- |
| `DATABASE_URL` | Conexão com o Postgres (a Neon preenche sozinha). |
| `APP_SENHA` | Senha compartilhada de acesso. Vazia = app aberto. |

## Stack

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind · Postgres (`pg`).
Cores da marca conforme `../marca/brandbook.html`.

## Contatos

- Dono da ação: Carlos Durães
- Acompanhamento: Daniel (daniel@simpleacc.com.br)
