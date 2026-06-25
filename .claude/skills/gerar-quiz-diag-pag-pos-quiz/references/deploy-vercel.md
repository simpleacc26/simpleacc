# Publicar na Vercel (escopado, URL limpa, público)

Objetivo: funil no ar numa **URL limpa e pública**, na conta/time Vercel do
cliente (geralmente o time da empresa). Entregue o link no final.

## Regras de segurança
- **NUNCA** deploye a raiz do workspace (tem dados de outros clientes). Publique
  **só a subpasta do funil**.
- Você não consegue (nem deve) autenticar a conta Vercel por ninguém. Se o CLI
  não tiver acesso ao time certo, **peça pro usuário logar/dar acesso**.

## 0. Confirmar acesso — TRAVA OBRIGATÓRIA (conta da Simple)
**Antes de qualquer deploy, confirme que vai publicar na conta/time da Simple,
nunca numa conta pessoal.** Esta verificação é obrigatória e não pode ser pulada.
```
vercel whoami        # quem está logado — NÃO pode ser uma conta pessoal
vercel teams ls      # precisa listar o time da Simple (o alvo do deploy)
```
Regras da trava:
- Se o `whoami` mostrar uma **conta pessoal**, ou se o **time da Simple não
  aparecer** em `teams ls` → **PARE. Não deploye.** Peça ao usuário para logar
  com a conta da Simple ou dar acesso ao time.
- Faça o deploy sempre com `--scope` no **TEAM_ID da Simple** (`team_...`), nunca
  na Personal Account.
- Na dúvida sobre qual é o time da Simple, **pergunte ao usuário e confirme**
  antes de subir — não adivinhe.

Se o time não aparecer: peça pro usuário rodar `vercel login` com a conta que tem
o time (login é interativo, só o usuário conclui no navegador). Dica: se o
`vercel` não for encontrado no terminal dele, é PATH — passe o caminho completo
do binário (ex.: `~/.nvm/versions/node/<versão>/bin/vercel`) ou
`export PATH="$HOME/.nvm/versions/node/<versão>/bin:$PATH" && vercel login`.

## 1. Deploy só da subpasta, com nome de projeto limpo
O nome do projeto vira o domínio de produção (`<projeto>.vercel.app`), que é
**público**. Para uma URL branded, deploye a partir de uma pasta com o nome
desejado:
```
# copie só os arquivos de runtime (sem .gs/README) p/ uma pasta nomeada bonito
DST=/tmp/<nome-limpo-do-cliente>
mkdir -p "$DST"; cp <funil>/{index.html,diagnostico.html,styles.css,app.js,flow.js,diagnostico.js} "$DST/"
vercel deploy "$DST" --prod --yes --scope <TEAM_ID>
```
- Use o **TEAM_ID** (`team_...`) no `--scope`, não o slug — slug pode colidir com
  o nome da conta pessoal e dar "You cannot set your Personal Account as the scope".
- Em modo não-interativo o Vercel **exige** `--scope` explícito.
- Pegue o TEAM_ID com `vercel teams ls` ou no `.vercel/project.json` (orgId).

## 2. Proteção de deploy (times) — atenção ao 401
Times costumam vir com **Deployment Protection ("Vercel Authentication") ligada**.
Sintoma: a URL do deploy dá **401**. Só o **domínio de produção** do projeto fica
público. Por isso, dar um nome de projeto limpo (passo 1) já resolve: o domínio
`<nome-limpo>.vercel.app` é o de produção e fica público.
- Confira sempre com curl: `curl -s -o /dev/null -w "%{http_code}\n" https://<nome>.vercel.app/`
  Tem que dar **200**. Se der 401 na URL que você vai entregar, ou use o domínio
  de produção do projeto, ou peça pro usuário desligar a proteção
  (Project → Settings → Deployment Protection) — funil público não pode exigir login.
- Se o nome limpo estiver preso em OUTRA conta (ex.: deploy anterior na conta
  pessoal), o time recebe um sufixo (`-xyz`). Para liberar o nome limpo, remova
  o projeto antigo da outra conta (ou escolha outro nome limpo, ex.: sem hifens).

## 3. Religar a pasta + redeploys
Depois, religue a pasta REAL do funil ao projeto para os próximos deploys:
```
rm -rf <funil>/.vercel
vercel link --yes --project <nome-limpo> --scope <TEAM_ID> --cwd "<funil>"
```
Redeploy (logo/whatsapp/integração): `vercel deploy "<funil>" --prod --yes --scope <TEAM_ID>`.
A mesma URL atualiza sozinha.

## 4. Limpeza
- Remova projetos intermediários/lixo do time: `printf 'y\n' | vercel project rm <nome> --scope <TEAM_ID>` (o `project rm` não aceita `--yes`; confirme com `y`).
- Apague /tmp.

## 5. Entrega
Confirme por curl que a URL final é **200** e serve o conteúdo. Entregue:
`https://<nome-limpo>.vercel.app` e lembre: **anúncio aponta pra raiz com `?utm_...`**.
