# Funil de Hipnose — Pâmella Mello

Funil de aquisição da clínica: **Landing → Quiz (leitura emocional) → Captura de
lead → Relatório de diagnóstico personalizado**, com CTA para a Sessão de
Avaliação no WhatsApp. Implementa a **Estratégia aprovada** pela cliente (Big
Idea, copy do quiz, lógica de qualificação e relatório) — ver
[`../materiais/`](../materiais/) e o doc de Estratégia no Drive.

## Fluxo

1. **Landing** — hero da Big Idea + 1ª pergunta (Situação).
2. **Quiz** — 9 perguntas na ordem SPIN: situação → problema → tempo → impacto →
   tentativas → objetivo → e qualificação por último (para quem é · onde está ·
   prontidão/investimento). Barra de progresso e botão "Voltar".
3. **Captura** — Nome\* + WhatsApp\* (com máscara) + e-mail (opcional). No envio,
   dados + respostas + UTMs vão via `POST` para o webhook (`VITE_WEBHOOK_URL`).
4. **Relatório** — leitura personalizada gerada a partir das respostas, com CTA
   adaptado ao nível de qualificação (ver abaixo) levando ao WhatsApp da clínica.

## Lógica de qualificação (do doc de Estratégia)

- **Qualificado** (prontidão = "resolver de vez" / "entender antes" **e** está no
  Brasil) → CTA forte: *Quero agendar minha Sessão de Avaliação*.
- **Nutrição** (prontidão = "algo pontual" / "só pesquisando") → CTA suave:
  *Quero entender melhor como funciona*.
- **Fora do Brasil** → mensagem respeitosa + *Falar com a equipe*.

A qualificação é feita por **intenção e prontidão**, não por pergunta crua de
renda — respeitando a sensibilidade do público (premissa do doc).

## Stack

- React 18 + TypeScript · Vite · Tailwind CSS · lucide-react (ícones)
- Tipografia: Fraunces (títulos) + Inter (corpo)

## Como rodar

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # build de produção em dist/
npm run preview  # pré-visualiza a build
```

## Variáveis de ambiente

Copie `.env.example` para `.env` e preencha. (Nunca commitar `.env`.)

| Variável            | Descrição                                                        |
| ------------------- | ---------------------------------------------------------------- |
| `VITE_WEBHOOK_URL`  | Webhook (Make/GHL) que recebe lead + respostas + UTMs. Se vazio, o envio é ignorado (funil segue funcionando). |
| `VITE_WHATSAPP_URL` | Link `wa.me` do WhatsApp comercial para os CTAs. Ex.: `https://wa.me/5531999999999` |

## Rastreamento

`index.html` tem um bloco comentado para colar **GTM / Clarity / Facebook Pixel**
quando a cliente liberar os IDs. O helper `src/analytics.ts` (`fbqTrack`) já
dispara os eventos `PageView`, `CompleteRegistration`, `ViewContent`,
`InitiateCheckout` e `Lead` — e é no-op enquanto o pixel não estiver instalado.

## Deploy (Vercel)

Cada projeto é uma subpasta do monorepo. Ao criar o projeto na Vercel, aponte o
**Root Directory** para `clientes/pamella-mello/funil-hipnose`. O `vercel.json`
já define framework Vite + rewrites de SPA. Configure as env vars
(`VITE_WHATSAPP_URL`, `VITE_WEBHOOK_URL`) no painel da Vercel.

- **URL de produção:** _a definir_

## Status e próximos passos

- [x] Funil completo (landing → quiz → captura → relatório) buildando e testado.
- [ ] Preencher `VITE_WHATSAPP_URL` (WhatsApp comercial) e `VITE_WEBHOOK_URL`.
- [ ] Colar GTM/Pixel/Clarity quando a cliente liberar.
- [ ] Inserir provas sociais reais (depoimentos/prints) no relatório.
- [ ] Conectar na Vercel e apontar o domínio.
- [ ] Ajustar paleta/tipografia ao brand kit oficial da clínica (atual é provisória).
