# Quiz ÚNICOS Leadership Club

Quiz de diagnóstico de liderança para a Caroline Batista e José (ÚNICOS Leadership Club).

**Tipo:** Killer (revela o maior gargalo do lead)  
**Paleta:** Navy `#16314f` + Dourado `#a9802f`  
**Deploy:** Vercel

## Como rodar localmente

```bash
npm install
npm run dev
```

## Variáveis de ambiente (Vercel)

| Variável | Descrição |
|---|---|
| `VITE_WEBHOOK_URL` | URL do webhook Make.com para receber os leads |
| `VITE_CTA_URL` | Link do CTA da página de agendamento (WhatsApp ou Calendly) |

Copie `.env.example` para `.env` e preencha antes de rodar localmente.

## Fluxo do quiz

1. **Landing (Tela 0):** Enquadramento + P1 (Setor)
2. **P2 a P7:** Perguntas sequenciais com barra de progresso
3. **Captura:** Nome, WhatsApp, e-mail — webhook disparado ao Make.com com balde identificado
4. **Agendamento:** Página de sessão estratégica com CTA

## Payload enviado ao webhook

```
nome, email, whatsapp, balde (Refém da Operação | Time sem Dono | Consolidado mas Estagnado | O Frustrado),
pergunta_1..7, resposta_1..7, utm_source, utm_medium, utm_campaign, utm_content, utm_term
```

## Deploy na Vercel

1. Conectar o repositório `simpleacc26/simpleacc` na Vercel
2. Definir o **Root Directory** como `clientes/carol-e-jose/funis/quiz-unicos`
3. Framework: Vite (detectado automaticamente)
4. Adicionar as variáveis de ambiente no painel da Vercel
5. Deploy

## Pendências

- [ ] Substituir o logo SVG pelo PNG real da ÚNICOS (colocar em `public/logo.png` e atualizar `LogoUnicos.tsx`)
- [ ] Preencher `VITE_WEBHOOK_URL` com o hook do Make.com
- [ ] Preencher `VITE_CTA_URL` com o link do WhatsApp ou Calendly
- [ ] Inserir foto real da Caroline na seção de autoridade
- [ ] Adicionar depoimentos reais na seção 4
- [ ] Configurar domínio personalizado na Vercel
