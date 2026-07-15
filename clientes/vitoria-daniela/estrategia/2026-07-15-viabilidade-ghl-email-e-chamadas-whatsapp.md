# Viabilidade no Go High Level (GHL): e-mail marketing de nutrição + chamadas por WhatsApp

**Data:** 2026-07-15
**Origem:** dúvidas levantadas pela cliente Vitória Daniela

Resumo objetivo das duas dúvidas, com base na documentação oficial do HighLevel.

---

## 1. Fluxos de e-mail marketing para nutrição de leads — **Viável ✅**

Sim, é totalmente viável montar fluxos de nutrição de leads por e-mail dentro do
próprio GHL — é um dos usos centrais da plataforma, sem precisar de ferramenta externa.

**O que dá pra fazer:**

- **Construtor visual de workflows** (arrastar e soltar) para criar sequências de
  e-mail (drip), disparadas por gatilhos.
- **Gatilhos de automação:** envio de formulário, agendamento, mudança de etapa no
  pipeline, resposta do lead, aplicação de tag, etc. — o e-mail certo dispara no
  momento certo, sem intervenção manual.
- **Segmentação avançada:** listas por etapa do funil, origem do lead, localização,
  tags, campos personalizados e comportamento.
- **Multicanal no mesmo fluxo:** o mesmo workflow pode combinar e-mail + SMS +
  WhatsApp + ligação/voicemail, criando o efeito "surround sound" na nutrição.
- **Editor de e-mail** próprio, com templates, personalização (campos dinâmicos),
  além de broadcasts e campanhas pontuais.

**Conclusão:** recomendável. O GHL cobre desde a captação (formulário/funil) até a
nutrição automatizada por e-mail, tudo numa ferramenta só. É um caminho seguro para a Vitória.

---

## 2. Chamadas (voz) diretamente pelo WhatsApp na plataforma — **Tecnicamente possível ✅ (com pré-requisitos)**

Sim, é tecnicamente possível. O HighLevel lançou o **WhatsApp Voice Calling**, que
já saiu do beta e está **Generally Available** (disponível para todos), tanto no
**app web quanto no mobile**.

**O que o recurso faz:**

- Fazer e receber chamadas de voz **dentro da própria conversa do WhatsApp**, sem
  discador externo e sem precisar trocar de app ou compartilhar outro número.
- Suporta **chamadas de entrada (inbound)** e **de saída / iniciadas pela empresa
  (outbound)**.
- Botões de chamada na visão de conversa e opção de o cliente pedir retorno
  (callback) após chamada perdida.

**Brasil:** as chamadas **iniciadas pela empresa (outbound) são permitidas no Brasil.**
A restrição de chamada outbound existe só em: **EUA, Canadá, Turquia, Egito, Vietnã
e Nigéria** — o Brasil **não** está nessa lista. (Chamadas inbound funcionam em
qualquer lugar onde o WhatsApp está disponível.)

**Pré-requisitos para habilitar (por sub-conta):**

1. O número de WhatsApp precisa estar **conectado** na plataforma.
2. A conta do WhatsApp Business (**WABA**) precisa estar no **tier de mensagens de
   2.000 ou superior**.
3. O número **não pode** estar usando **WhatsApp Coexistence** (modo em que o mesmo
   número é usado no app do WhatsApp e na API ao mesmo tempo) — nesse caso o recurso
   de voz não fica disponível.

**Conclusão:** É possível fazer chamadas por WhatsApp direto na plataforma, no
Brasil, inclusive iniciadas pela empresa — desde que a conta atenda aos 3 pré-requisitos
acima (número conectado, WABA no tier 2.000+, sem coexistence).

> **Observação sobre a "confirmação com o suporte":** as respostas acima estão
> confirmadas pela **documentação e changelog oficiais do HighLevel** (links nas
> fontes). Se a cliente quiser uma confirmação formal por escrito do próprio suporte
> — ou validação de algum caso específico da conta dela (ex.: o tier atual da WABA) —
> vale abrir um ticket com o suporte do GHL levando esses pontos já mapeados.

---

## Fontes

- [WhatsApp Voice Calling in HighLevel — Support Portal](https://help.gohighlevel.com/support/solutions/articles/155000007989-whatsapp-voice-calling-in-highlevel)
- [WhatsApp Calling is now Generally Available (Web + Mobile) — HighLevel Changelog](https://ideas.gohighlevel.com/changelog/whatsapp-calling-is-now-generally-available-web-mobile)
- [WhatsApp Calling — Support Portal](https://help.gohighlevel.com/support/solutions/articles/155000007253-whatsapp-calling)
- [Getting Started — Automatic Email and SMS Followup — Support Portal](https://help.gohighlevel.com/support/solutions/articles/155000005060-getting-started-automatic-email-and-sms-followup)
- [Email Automation With GoHighLevel — 2026 Strategy Guide](https://getautomized.com/email-automation-with-gohighlevel/)
