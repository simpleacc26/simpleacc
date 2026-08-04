# 08 — Operação diária: o ciclo de trabalho

Como um dia de trabalho acontece dentro dessa estrutura.

---

## 1. O ciclo de uma entrega

```
1. ABRIR      sessão nova · ambiente → repo → main
2. ENQUADRAR  "Trabalhar em clientes/<cliente>: <tarefa>"
3. LER        contexto/ + aprendizados.md do cliente
4. PRODUZIR   comando, skill ou conversa direta
5. SALVAR     arquivo na subpasta certa
6. REGISTRAR  aprendizado no aprendizados.md
7. VERSIONAR  branch → commit → push → PR
8. REVISAR    outra pessoa aprova → merge na main
```

Os passos 3 e 6 são os que fazem a operação **acumular inteligência** em vez de
só produzir. São também os dois mais pulados. Cobre.

---

## 2. Ciclo de vida de um cliente novo

| Etapa | O que acontece | Onde fica |
| ----- | -------------- | --------- |
| **1. Entrada** | copia `_modelo/cliente/` para `clientes/<cliente>/` e preenche o `CLAUDE.md` | Git |
| **2. Onboarding** | call gravada, transcrição, materiais | Drive `4. Calls/` |
| **3. Contexto** | quem é, oferta, ICP, mercado, linguagem | Git `contexto/` |
| **4. Estratégia** | documento de estratégia entregue ao cliente | fonte no Git `estrategia/`, Doc no Drive |
| **5. Produção** | copy, roteiros, criativos | Git `copy/` e `roteiros/` |
| **6. Funil** | quiz/landing construído e publicado | Git `funis/`, no ar na Vercel |
| **7. Leads** | planilha recebendo, integração testada | Drive `2. Leads/` |
| **8. Otimização** | o que funcionou e o que não funcionou | Git `aprendizados.md` |

A etapa 8 alimenta a etapa 3 do **próximo** cliente. É esse laço que faz a
operação ficar melhor com o tempo, em vez de só ficar maior.

---

## 3. Rotina semanal (30 minutos, admin)

- [ ] PRs abertos: revisar e mergear (PR parado é trabalho invisível)
- [ ] Branches já mergeadas: apagar
- [ ] `aprendizados.md` dos clientes ativos: foi alimentado esta semana?
- [ ] Funis no ar: `curl` retornando 200? planilha recebendo?
- [ ] Algum padrão se repetiu 3 vezes esta semana? → virar prompt mestre ou skill
- [ ] Alguma skill ficou só na conta de alguém? → trazer para o repositório

O penúltimo item é o motor da operação. **Repetiu três vezes, vira ativo.**

---

## 4. Rotina trimestral

- [ ] Revisar acessos: todo mundo que tem acesso ainda deveria ter?
- [ ] Revisar conectores autorizados
- [ ] Revisar `docs/MANUAL.md` e `docs/COMO-USAR.md`: ainda descrevem a realidade?
- [ ] Limpar projetos de teste na Vercel
- [ ] Conferir custos das ferramentas

---

## 5. Problemas comuns e o que fazer

| Sintoma | Causa provável | Solução |
| ------- | -------------- | ------- |
| "Perdi o trabalho da sessão" | fechou sem commit/push | Regra: toda sessão termina com push. Não tem recuperação. |
| Funil retorna **401** | Deployment Protection do time na Vercel | Entregar o domínio de **produção**, ou desligar a proteção. Ver `04-vercel.md`. |
| Build quebra na Vercel | **Root Directory** não configurado | Apontar para `clientes/<cliente>/funis/<projeto>`. |
| Lead não cai na planilha | endpoint errado, implantação não pública, ou funil não republicado | Refazer o teste de ponta a ponta de `05-google-workspace.md`. |
| Conflito de merge | duas pessoas no mesmo arquivo | `git pull origin main` na sua branch, resolver, seguir. |
| "A skill não apareceu para mim" | skill está na conta pessoal do outro | Trazer para `.claude/skills/` e commitar. |
| IA entregou algo genérico | `contexto/` vazio ou desatualizado | Alimentar o `contexto/` antes de produzir. |
| PR gigante, impossível de revisar | misturou clientes/assuntos | Um PR por assunto. Sempre. |

---

## 6. Sinais de que a estrutura está saudável

- Qualquer pessoa consegue continuar o trabalho de outra **sem perguntar nada**
- `aprendizados.md` dos clientes ativos cresce toda semana
- Nenhum PR fica aberto mais de 3 dias
- Nenhuma skill importante existe só na conta de uma pessoa
- Todo funil no ar tem URL registrada no `README.md` e integração testada
- Cliente novo entra em produção usando `_modelo/` sem improviso
