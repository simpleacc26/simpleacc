# Relatório do Quiz — v2 (reescrita para vender a sessão estratégica)

**Data:** 15/07/2026
**Objetivo:** aumentar a taxa de agendamento a partir do relatório (downstream do evento de conversão — NÃO afeta o baseline de tracking do topo). Ataca diretamente o "4 reuniões, 0 vendas": o relatório atual educa mas não vende a call, e não tem NENHUMA prova social.
**Como usar:** o relatório é uma SPA React personalizada por perfil (`previsibilidade`/`ticket`/`escala`/`modelo`) e pelas respostas (`{{objetivo}}`, `{{gargalo}}`, `{{custo}}`, `{{tentou}}`, `{{nome}}`). Esta copy preserva a estrutura atual e os tokens — as mudanças são: (1) **novo bloco de prova social**, (2) **future-pacing concreto**, (3) **CTAs mais fortes com o que acontece na call e por que agora**.

---

## O que MANTER do relatório atual (já está bom)
- Abertura personalizada ("Olá, {{nome}}. Analisei suas respostas...")
- "Leitura do seu cenário atual" (retrato personalizado)
- "Comparação de cenários" (colunas hoje vs modelo certo)
- Seção "diferença entre mentor e empresário da educação"
- Escassez ("12 novos membros por ciclo")

## O que MUDAR / ADICIONAR

### 🆕 NOVO BLOCO — Prova social (inserir logo após "Comparação de cenários", antes da seção SOLUÇÃO)

**Título:** Não é teoria. Já aconteceu — com gente que estava exatamente onde você está.

> O Fabrício faturava bem como mentor, mas cada real dependia da presença dele em cada sessão, cada entrega, cada venda. Ele não tinha um negócio — tinha um emprego bem remunerado. Em 6 meses, depois de ajustar o modelo (não o volume de trabalho), chegou a **R$600 mil de faturamento — trabalhando menos do que antes.**

> A Greice estava travada há mais de um ano no mesmo patamar. Mesmo gargalo que você descreveu: crescimento preso à agenda dela. Depois de reestruturar método, processo de vendas e modelo de negócio ao mesmo tempo, fez **R$500 mil em 3 meses.**

> A Camila aplicou o ajuste logo no começo e fez **R$120 mil no primeiro mês** — sem inflar a operação, sem trabalhar mais horas.

> O que os três têm em comum não é nicho, não é talento, não é sorte. É que pararam de operar como mentores e passaram a operar como empresários da educação. **O ponto de partida deles era o mesmo que o seu agora.**

*(Instrução de implementação: se houver prints reais de depoimento/resultado desses alunos, exibir ao lado de cada parágrafo — prova visual > texto.)*

---

### ✏️ AJUSTAR — Future-pacing concreto (adicionar ao final da seção "SOLUÇÃO", antes do CTA)

Depois do parágrafo que explica o modelo, adicionar:

> Imagina seu negócio daqui a 6 meses operando assim: os clientes chegando por um processo previsível — não por indicação e sorte. A entrega rodando com método, sem depender de você estar presente em cada detalhe. O faturamento subindo sem a sua agenda subir junto. E, pela primeira vez, o próximo passo claro — você sabendo exatamente qual alavanca mover.
>
> Não é fantasia. É o que muda quando o modelo muda. E o primeiro movimento cabe em uma conversa de 30 minutos.

---

### ✏️ AJUSTAR — CTAs (fortalecer o texto de apoio de cada botão "Agendar")

O botão pode continuar `Agendar minha sessão estratégica`, mas o texto de apoio (note) deve deixar claro **o que acontece na call, por que é diferente de uma call de vendas, e por que agora.** Sugestões por posição:

- **1º CTA (após prova social):**
  *"30 minutos, individual, com o time do Rafael. A gente analisa o seu caso específico e te mostra o gargalo real e o próximo movimento — mesmo que você não vire cliente. Sem pitch genérico."*

- **2º CTA (após a solução/future-pacing):**
  *"Você sai da call com clareza do que ajustar primeiro no SEU negócio. É uma análise, não uma call de vendas disfarçada."*

- **CTA final (com escassez):**
  *"O Rafael acompanha no máximo 12 novos membros por ciclo — por escolha, não por limitação. Quando as vagas do ciclo fecham, a próxima janela é só no próximo. Escolha seu horário agora enquanto há vaga."*

---

### ✏️ AJUSTAR — Reduzir atrito do handoff (recomendação estrutural, validar com dev)

Hoje o fluxo é: Relatório → **Página de Agendamento separada** → WhatsApp. Cada passo perde gente. Recomendação (testar): o botão do relatório levar **direto** para o agendamento (calendário embutido) ou **direto pro WhatsApp da SDR com mensagem pré-preenchida** ("Quero agendar minha sessão estratégica — perfil: {{perfil}}"), cortando a página intermediária. Menos portas = menos leads perdidos entre o interesse e a ação.

---

## Métrica de sucesso desta mudança
- Não mexe no nº de conversões de topo (`submit_application`) — mexe na **taxa relatório → agendamento** e **agendamento → comparecimento**.
- Acompanhar no Clarity (quantos chegam no relatório e clicam no CTA) e no CRM (quantos de fato agendam). Comparar 2 semanas antes vs depois.
