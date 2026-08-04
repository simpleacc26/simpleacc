# 06 — Conectores (integrações da sessão)

Conectores são as ferramentas externas que a sessão do Claude consegue operar
sozinha: ler o Drive, publicar na Vercel, criar tarefa no ClickUp.

---

## 1. Os conectores da operação atual

Esta é a lista real do hub em produção hoje, para você replicar:

| Conector | Para quê na operação | Prioridade |
| -------- | -------------------- | ---------- |
| **Google Drive** | achar a pasta do cliente, subir o Doc de estratégia, criar a planilha de leads | **Essencial** |
| **Vercel** | publicar o funil, conferir deploy, ler log de erro e analytics | **Essencial** |
| **GitHub** | ler/criar PR, comentar, checar CI (vem com a integração do Claude Code) | **Essencial** |
| **ClickUp** | tarefas, prazos, quem está com o quê, comentários por cliente | Recomendado |
| **Make** | automações entre funil, planilha, CRM e WhatsApp | Recomendado |
| **Figma** | identidade visual, telas, diagramas | Opcional |
| **Canva** | peças de anúncio e materiais rápidos | Opcional |

---

## 2. Como conectar

Nas configurações da conta Claude → **Conectores** → conecte cada um com a
**conta da operação** (e-mail do domínio), autorizando o acesso mínimo necessário.

Dois níveis, e a diferença importa:

| Nível | Vale para | Quando usar |
| ----- | --------- | ----------- |
| **Organização** | todo o time de uma vez | ferramentas da operação (Drive, Vercel, ClickUp) |
| **Conta pessoal** | só aquela pessoa | ferramenta que é mesmo individual |

Sempre que a ferramenta for da operação, conecte **no nível da organização**.
Conector pessoal cria o mesmo problema das skills pessoais: funciona para uma
pessoa e falha silenciosamente para as outras.

---

## 3. Habilitado ≠ conectado

Um conector pode estar **conectado na conta** e **desligado naquela conversa**.
Nesse caso a sessão simplesmente não enxerga as ferramentas dele, e uma skill que
depende do Drive falha sem explicação óbvia.

Se algo que depende de conector não funcionar, o primeiro diagnóstico é: **esse
conector está ligado nesta conversa?**

---

## 4. Cuidados

| Cuidado | Por quê |
| ------- | ------- |
| Autorize com a conta da operação, não com a pessoal | senão o acesso morre quando a pessoa sai |
| Dê o escopo mínimo | conector com acesso total ao Drive enxerga a pasta de todos os clientes |
| Revise a lista a cada trimestre | conector esquecido é porta aberta |
| Ao desligar alguém: revogue os conectores dela | junto com GitHub, Vercel e Workspace |

---

## 5. Automações no Make: a regra de ouro

Se usar Make, **nunca** use gatilho de **polling/intervalo**. Ele executa de
tempos em tempos mesmo quando não há nada para fazer, e queima o plano à toa.

Use **Webhook (instantâneo)**: roda só quando o evento acontece.

```
✅ Webhook (instantâneo)  → Google Sheets "Add a Row"
❌ Watch rows (a cada 15 min) → qualquer coisa
```

---

## 6. Checklist dos conectores

- [ ] Drive, Vercel e GitHub conectados com a conta da operação
- [ ] Conectores da operação no nível da **organização**, não pessoal
- [ ] Escopo mínimo em cada um
- [ ] Time sabe checar se o conector está ligado na conversa
- [ ] Nenhuma automação do Make usando gatilho de intervalo
- [ ] Rotina trimestral de revisão de acessos
