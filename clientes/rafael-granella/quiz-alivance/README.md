# Quiz | ALIVANCE CLUB

Quiz de diagnóstico para mentores, coaches e consultores (Rafael Granella /
Alivance Club). Migração do app originalmente publicado no **Figma Make**
(`quiz.rafaelgranella.com.br`) para um app **React + Vite** pronto para deploy
na **Vercel**.

## Fluxo

1. **Landing** — headline + primeira pergunta (perfil).
2. **Perguntas** — 7 perguntas no total, com barra de progresso e botão "Voltar".
3. **Captura de lead** — nome, WhatsApp (com máscara) e e-mail, com validação.
   No envio, os dados + respostas + UTMs são enviados via `POST` para o webhook
   do Make.
4. **Relatório** — diagnóstico personalizado gerado a partir das respostas, com
   CTAs para a sessão estratégica (`lp.rafaelgranella.com.br`).

## Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS
- lucide-react (ícones)

## Rastreamento

Configurado em `index.html` / `src/analytics.ts`:

- Google Tag Manager (`GTM-MVWPJF6H`)
- Microsoft Clarity (`wv9oirj7do`)
- Facebook Pixel (eventos `PageView`, `CompleteRegistration`, `ViewContent`,
  `InitiateCheckout`, `Lead`) — o `fbq` é carregado via GTM.

## Desenvolvimento

```bash
npm install
npm run dev      # ambiente local em http://localhost:5173
npm run build    # gera a build de produção em dist/
npm run preview  # pré-visualiza a build
```

## Variáveis de ambiente

| Variável            | Descrição                                      |
| ------------------- | ---------------------------------------------- |
| `VITE_WEBHOOK_URL`  | URL do webhook do Make (opcional; há fallback) |

Veja `.env.example`.

## Deploy na Vercel

> ⚠️ **Atenção (monorepo):** este projeto agora vive em
> `clientes/rafael-granella/quiz-alivance/` dentro do repositório-hub. No projeto
> da Vercel, ajuste o **Root Directory** para
> `clientes/rafael-granella/quiz-alivance`. Sem isso, o deploy não encontra o
> `package.json`.

O projeto já vem com `vercel.json` (preset `vite` + rewrite de SPA). Basta:

1. Importar o repositório na Vercel e definir o **Root Directory** acima.
2. Framework detectado automaticamente: **Vite**.
   - Build command: `npm run build`
   - Output directory: `dist`
3. (Opcional) Definir `VITE_WEBHOOK_URL` em *Environment Variables*.
4. Deploy.
