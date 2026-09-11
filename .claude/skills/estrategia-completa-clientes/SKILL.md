---
name: estrategia-completa-clientes
description: >-
  Gera o documento de estratégia completo de um cliente (modelo Simple Acc ·
  Funil de Lead Dinâmico) a partir da transcrição ou das notas de uma reunião de
  onboarding, e entrega como Google Doc FORMATADO no Drive. Use sempre que
  alguém do time precisar montar a estratégia inicial de um cliente novo,
  "replicar o doc do Rafael para o cliente X", transformar um onboarding em
  documento de estratégia, gerar copy de funil/quiz/anúncios/cadência para um
  cliente, ou criar o material que inicia um projeto — mesmo que não digam
  explicitamente "documento de estratégia". Cobre desde a extração das
  informações do onboarding até a entrega do Doc formatado na pasta do cliente.
---

# Estratégia Completa para Clientes — gerador de documento no modelo Simple Acc

## O que esta skill faz

Pega o **levantamento de um onboarding** (transcrição, notas do Gemini/Meet,
áudio transcrito, ou um resumo escrito) e produz o **documento de estratégia
completo** do cliente, no modelo atual **Estratégia Completa · Funil de Lead
Dinâmico** (referência viva: Lucas Sobreiro, 20/07/26), entregue como **Google
Doc nativo e formatado** na pasta do cliente no Drive.

O valor está em três coisas que o time costuma errar quando faz na mão:
1. **Extrair a estratégia certa** do onboarding (não só transcrever — interpretar).
2. **Seguir a estrutura comprovada** de 6 seções, adaptada ao tipo de funil e ao público.
3. **Entregar formatado** (títulos, negrito, listas) — e não um "textão" cru.

> **O documento de estratégia e o roadmap são complementos, não o mesmo doc.**
> Esta skill entrega as copies do funil (as 6 seções abaixo). O plano de ação
> (tarefas, fases, divisão de responsabilidades, checkpoints) vive no roadmap,
> gerado pela skill `roadmap-estrategico-90-dias`. Por isso o modelo atual não
> tem mais as seções antigas de "Relatório de Diagnóstico" e "Tarefas /
> Onboarding": o diagnóstico é a página de resultado do quiz (entregue na
> implementação do funil) e as tarefas são o roadmap.

## O fluxo (siga nesta ordem)

```
1. EXTRAÇÃO   → ler o onboarding e preencher o mapa estratégico
2. GERAÇÃO    → escrever as 6 seções no modelo, adaptadas ao cliente
3. ENTREGA    → virar Google Doc formatado na pasta do cliente no Drive
4. VERSIONAR  → salvar a fonte (.md/.html) em clientes/<cliente>/estrategia/ no repo
```

Não pule a extração. Gerar copy sem entender o ICP, as frentes e o gargalo é o
caminho mais rápido pra refazer tudo. Se o onboarding não cobrir algum ponto
crítico, **assuma o padrão mais provável, sinalize a premissa no documento** e
siga — não trave esperando informação.

---

### Passo 1 — Extração estratégica

Leia o material do onboarding inteiro antes de escrever qualquer coisa. O
objetivo é sair com um mapa claro de quem é o cliente, o que vende, pra quem, e
o que trava o crescimento.

Use o framework completo em **`references/extracao-onboarding.md`** — ele lista
exatamente o que procurar (ICP, dor, frentes/produtos, oferta, mecanismo único,
provas, ticket, origem de tráfego, gargalo operacional, geografia, destino do
lead, etc.) e como inferir o que faltar.

Ao final, escreva um **resumo de 8–12 linhas** do que você extraiu e, se estiver
conversando com uma pessoa, confirme antes de gerar. Se estiver rodando de forma
autônoma, registre as premissas assumidas numa nota no topo do documento.

### Passo 2 — Geração do documento

Escreva as **6 seções** seguindo **`references/estrutura-documento.md`**, que traz
o detalhe de cada seção, exemplos do modelo e como adaptar por tipo de funil
(aplicação/call, VSL, low ticket, lead magnet, etc.) e por público (B2B x B2C).

As 6 seções são:

1. **Big Idea** — a tese central / virada de chave (uma por frente, se houver mais de uma)
2. **Copy do Quiz** — perguntas no padrão SPIN + regra de segmentação + captura de dados
3. **Copy — Página de Aplicação** — headline, dor/espelho do ICP, reframe, mecanismo, autoridade, oferta, para quem é/não é, FAQ, CTA
4. **Copy dos Anúncios** — 3 ângulos (dor, mecanismo, autoridade), cada um vira 1 conjunto de 10 anúncios (hook + curta/média/longa) + 10 headlines + 5 hooks
5. **Cadência de Follow-up — 12 dias** — na voz do cliente, não mecânica, com níveis N1 a N5
6. **Recomendações Estratégicas** — gargalos, riscos e prioridades (o olhar crítico da Simple)

> **Capa e cabeçalho (modelo Funil de Lead Dinâmico):** a capa traz o wordmark
> `SIMPLE`, o kicker `ESTRATÉGIA · FUNIL DE LEAD DINÂMICO`, o título `Estratégia
> Completa`, o subtítulo que lista as 6 entregas, e Cliente / Estrategista +
> ano. Logo abaixo, o cabeçalho: `Estrategista: X · Expert: Y`, o negócio em uma
> linha, a frente única (ou frentes + split de mídia) e as premissas assumidas.

Princípios de copy (resposta direta, não "copy bonita"): linguagem do público —
não de marketeiro; mecanismo único claro; frases curtas e ritmo; zero promessa
vazia. Se o cliente pediu uma "voz" específica (ex: acolhedora, sem tom
mecânico), respeite em todo texto, especialmente na cadência.

**Clientes com mais de uma frente** (ex: Sabrina = inclusão + implantes): gere
Quiz, Anúncios e Diagnóstico para cada frente, respeitando o split de mídia
definido no onboarding. A frente de maior diferenciação costuma ser o
carro-chefe de marca mesmo quando outra traz o volume financeiro.

### Passo 3 — Entrega formatada no Drive

**Esta é a parte com pegadinha.** A integração de Drive cria Doc nativo a partir
de texto puro — sem estilos de título. Pra entregar **formatado** (Heading 1/2,
negrito, listas — como o cliente aprova de imediato), siga o playbook em
**`references/entrega-drive.md`**.

Resumo do caminho que funciona: gerar o conteúdo como **um arquivo HTML**, subir
na pasta do cliente, e usar **"Abrir com Google Docs"** no navegador — a
importação de HTML aplica a formatação real. Depois, limpar os arquivos
intermediários. O playbook tem o passo a passo, os comandos e os erros a evitar
(não tente subir `.docx` local — é rejeitado/grande demais).

### Passo 4 — Versionar no repositório (memória = Git)

Além do Google Doc, **salve a fonte do documento no repositório**, para que a
estratégia fique versionada junto com o resto do conhecimento do cliente (a
memória que permanece é o Git, não o Drive).

1. Salve o conteúdo em Markdown em:
   `clientes/<cliente>/estrategia/AAAA-MM-DD-estrategia.md`
   (use o `<cliente>` no padrão de pasta — minúsculas, sem acento, com hífen;
   ex.: `clientes/sense-clinic/estrategia/2026-06-25-estrategia.md`).
2. No topo do arquivo, inclua: data, autor, link do Google Doc gerado e as
   premissas assumidas.
3. Registre uma linha em `clientes/<cliente>/aprendizados.md` (data + "estratégia
   inicial criada" + link do Doc).
4. Faça commit numa branch `cliente/<cliente>/estrategia` e abra um PR.

> Assim, da próxima vez que alguém for evoluir a estratégia, lê a versão anterior
> no repo e cria a próxima (`-v2`), em vez de recomeçar do zero.

---

## Checklist antes de entregar

- [ ] Capa e cabeçalho no modelo Funil de Lead Dinâmico (Cliente/Estrategista, negócio em uma linha, frente, premissas)
- [ ] As 6 seções presentes e adaptadas ao cliente (nada genérico copiado de outro cliente)
- [ ] Frentes múltiplas cobertas (se aplicável), com split de mídia
- [ ] Voz/tom pedidos pelo cliente respeitados (principalmente na cadência)
- [ ] Entregue como **Google Doc formatado** (títulos, negrito, listas) — não texto cru
- [ ] Doc na **pasta certa** do cliente no Drive
- [ ] **Fonte (.md) salva em `clientes/<cliente>/estrategia/`** e aprendizado registrado (memória no Git)
- [ ] Arquivos intermediários (HTML/teste) removidos; sem duplicado de nome igual
- [ ] Link do Doc final informado à pessoa
