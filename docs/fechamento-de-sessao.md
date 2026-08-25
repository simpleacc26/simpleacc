# Fechamento de sessão (deixar tudo durável)

Sessão é descartável. O que sobrevive e vira "history" usável em outras sessões
são **3 canais**, e nada vai pra eles sozinho:

1. **Git na `main`** — uma sessão nova clona da `main`. Commit + push numa branch
   **não basta**; só aparece em outra sessão depois do **merge do PR na main**.
2. **Skills da conta** (claude.ai → Customize → Skills) — funcionam em **toda**
   sessão, até fora do repo. Só a pessoa sobe (é UI); o Claude entrega o `.zip`.
3. **Drive** — entregáveis do cliente (Docs, PDFs) ficam na pasta dele.

A conversa em si não passa; os **artefatos** passam. "Fechar tudo" = escrever
nesses 3 canais.

## Mensagem pra colar no fim de qualquer sessão

```
Fecha esta sessão deixando tudo durável e usável em outras sessões. Faça nesta ordem e me devolva um resumo com links:

1. GIT: deixe git status limpo (nada solto/untracked), tudo commitado, e push na branch da sessão.
2. MAIN: abra ou atualize o PR pra main, tire do draft e, se o trabalho estiver concluído, faça o MERGE na main (é o que faz aparecer em sessões novas). Se não estiver pronto, deixe o PR "ready" e me diga o que falta.
3. SKILLS: se criei ou usei alguma skill que ainda não está na main, vendore ela em .claude/skills/ (pra entrar na main pelo PR) E me gere um .zip dela pra eu subir como skill da conta. Liste quais skills precisam desse upload manual meu.
4. CLIENTE: atualize clientes/<cliente>/aprendizados.md com as decisões e pendências, e confirme que os entregáveis estão na pasta do Drive do cliente.
5. RESUMO: me liste (a) o que entrou na main + link do PR, (b) links dos entregáveis no Drive, (c) a checklist do que SÓ eu preciso fazer na mão (ex.: subir .zip de skill na conta, apagar arquivo no Drive).
```

## O único passo que fica sempre com a pessoa

Subir/atualizar **skill na conta** (Customize → Skills → Add). O Claude não faz
isso por ferramenta, só empacota o `.zip`. Todo o resto (git, merge, Drive,
aprendizados) o Claude faz.
