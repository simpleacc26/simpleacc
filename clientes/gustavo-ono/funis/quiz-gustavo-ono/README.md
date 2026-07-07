# Quiz Gustavo Ono

Funil de quiz para geração de leads e venda do low-ticket (Bombom Artístico).

**Stack:** React 18 + Vite + TypeScript + Tailwind CSS  
**Deploy:** Vercel  
**Domínio:** `gustavoono.com.br`

## Fluxo

```
Landing (Q0) → Perguntas (Q1–Q8) → Captura de lead → Relatório + CTA
```

- **Landing:** mostra a Q0 de perfil imediatamente — selecionar avança.
- **Perguntas:** Q1–Q8 com barra de progresso e botão Voltar.
- **Captura:** nome, WhatsApp (DDD+9 dígitos), e-mail.
- **Relatório:** diagnóstico personalizado pelas Q4 (frustração) e Q6 (obstáculo) + CTA para Hotmart.

## Variáveis de ambiente

```bash
cp .env.example .env
# editar VITE_WEBHOOK_URL com o webhook do Make
```

| Variável | Descrição |
|---|---|
| `VITE_WEBHOOK_URL` | Endpoint do Make → Google Sheets + GHL |

## Rodar localmente

```bash
npm install
npm run dev
```

## Build & deploy

```bash
npm run build      # produz dist/
# ou via Vercel CLI:
vercel --prod
```

## Deploy na Vercel

1. Criar projeto na Vercel apontando para este diretório.
2. Adicionar variável `VITE_WEBHOOK_URL` nas Settings → Environment Variables.
3. Apontar domínio `gustavoono.com.br` em Settings → Domains.

## Analytics

Substituir os placeholders no `index.html`:

- `GTM-PLACEHOLDER` → ID do Google Tag Manager
- `CLARITY_PLACEHOLDER` → ID do Microsoft Clarity

O Pixel do Facebook é disparado via GTM (configurar lá).

## Integrações

- **Make webhook:** recebe todos os campos + UTMs e distribui para Google Sheets e GHL (CRM).
- **GHL:** SDR recebe lead para abordagem via WhatsApp (venda da mentoria R$5k).
- **Hotmart:** CTA do relatório aponta para `https://pay.hotmart.com/X104749935I`.

## Contatos

- **Renan Martini** — gestão de tráfego
- **Carlos Durães** — responsável pelo cliente na SimpleAcc
