---
name: estrategia-completa-clientes
description: >-
  Gera o documento de estratégia completo de um cliente (modelo Simple Acc /
  Rafael ALIVANCE) a partir da transcrição ou das notas de uma reunião de
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
completo** do cliente, na mesma estrutura que já deu certo (Rafael / ALIVANCE
CLUB → Sabrina / Instituto Sabrina Siqueira), entregue como **Google Doc nativo
e formatado** na pasta do cliente no Drive.

O valor está em três coisas que o time costuma errar quando faz na mão:
1. **Extrair a estratégia certa** do onboarding (não só transcrever — interpretar).
2. **Seguir a estrutura comprovada** de 8 seções, adaptada ao tipo de funil e ao público.
3. **Entregar formatado** (títulos, negrito, listas) — e não um "textão" cru.

## O fluxo (siga nesta ordem)

```
1. EXTRAÇÃO   → ler o onboarding e preencher o mapa estratégico
2. GERAÇÃO    → escrever as 8 seções no modelo, adaptadas ao cliente
3. ENTREGA    → virar Google Doc formatado na pasta do cliente no Drive
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

Escreva as **8 seções** seguindo **`references/estrutura-documento.md`**, que traz
o detalhe de cada seção, exemplos do modelo e como adaptar por tipo de funil
(aplicação/call, VSL, low ticket, lead magnet, etc.) e por público (B2B x B2C).

As 8 seções são:

1. **Big Idea** — a tese central / virada de chave (uma por frente, se houver mais de uma)
2. **Copy do Quiz** — perguntas no padrão SPIN + captura de dados
3. **Copy — Página de Aplicação** — headline, dor/espelho do ICP, mecanismo, autoridade, oferta, FAQ, CTA
4. **Copy dos Anúncios** — 3 ângulos (hook + curta/média/longa) + 10 headlines + 5 hooks
5. **Relatório de Diagnóstico** — entregue após o quiz, com campos `{{variável}}`
6. **Cadência de Follow-up — 12 dias** — na voz do cliente, não mecânica
7. **Tarefas — Onboarding & Primeiros Movimentos** — o que o time executa pra subir o projeto
8. **Recomendações Estratégicas** — gargalos, riscos e prioridades (o olhar crítico da Simple)

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

---

## Checklist antes de entregar

- [ ] Resumo estratégico no topo (ou confirmado com a pessoa), com premissas sinalizadas
- [ ] As 8 seções presentes e adaptadas ao cliente (nada genérico copiado do Rafael)
- [ ] Frentes múltiplas cobertas (se aplicável), com split de mídia
- [ ] Voz/tom pedidos pelo cliente respeitados (principalmente na cadência)
- [ ] Entregue como **Google Doc formatado** (títulos, negrito, listas) — não texto cru
- [ ] Doc na **pasta certa** do cliente no Drive
- [ ] Arquivos intermediários (HTML/teste) removidos; sem duplicado de nome igual
- [ ] Link do Doc final informado à pessoa
