# Inventário de acessos — desligamento de Carlos Durães

**Data:** 11/09/2026 (último dia de trabalho do Carlos)
**Quem sai:** Carlos Durães — `carlos.duraes@simpleacc.com.br` (Workspace) e
`carlosfaduraes@gmail.com` (conta pessoal usada no ClickUp)
**Papel:** gestão de projeto / operação e entrega. Conduzia onboardings, roadmaps,
validação de copy com o cliente, liberação de acesso do cliente (área de membros,
Notion, Drive) e os encontros quinzenais.

## Como este inventário foi levantado

- **Verificado nesta conta:** Vercel, Make, ClickUp, Google Drive, GitHub e a lista
  de conectores do Claude — consultados direto pela API de cada um em 11/09/2026.
- **Levantado no repositório:** README/CLAUDE.md dos clientes, `aprendizados.md`,
  transcrições de onboarding e as skills.
- **Não está aqui, de propósito:** nenhuma senha, token, chave de API ou URL de
  webhook. Inventário serve para saber *o que existe e quem precisa assumir*; o
  segredo em si nunca entra no Git (regra do `docs/MANUAL.md`, seção 9).

> ⚠️ **Limite honesto deste documento.** As ferramentas conectadas nesta conta
> mostram quem criou o quê. **O Carlos não aparece como autor em nada dentro do
> Make, da Vercel ou do GitHub** — nessas três a operação inteira está sob o
> Daniel e o time de tráfego. O rastro do Carlos está no **ClickUp**, nas
> **calls/grupos com cliente** e nas ferramentas da seção B, que só ele pode
> confirmar. Por isso a seção B precisa ser preenchida por ele antes de encerrar
> o dia.

---

## A. Acessos verificados nesta conta (11/09/2026)

### A1. Claude Code / esta conta de trabalho

| Item | Estado hoje |
| --- | --- |
| Conta dona do ambiente | `daniel@simpleacc.com.br` |
| Conectores ativos | ClickUp, Figma, Google Drive, Make, Vercel |
| Conector incompleto | Canva (instalado, autenticação não concluída) |
| Ambiente | "Simple Acc", apontando para o repositório `simpleacc26/simpleacc` |

**Ponto de atenção:** quem entra nesta conta do Claude opera **em nome do Daniel**
em todos os conectores acima — Drive, Make, Vercel e ClickUp inclusive. Não existe
separação por pessoa. Se o Carlos tinha acesso a esta conta, isso equivale a acesso
a todas as ferramentas de uma vez.
**Ação:** trocar a senha da conta Google `daniel@simpleacc.com.br`, encerrar as
sessões ativas e revisar a lista de dispositivos conectados.

### A2. GitHub — `simpleacc26/simpleacc`

- **Colaboradores hoje:** 1 (`simpleacc26`, admin). Mais ninguém tem acesso direto.
- Histórico do repositório tem **3 identidades**: `simpleacc26 <daniel@simpleacc.com.br>`,
  `Daniel <daniel@simpleacc.com.br>` e `Claude <noreply@anthropic.com>`.
- **Consequência:** não dá para saber pelo Git quem fez o quê. Todo mundo commita
  como a mesma conta.
- **Ação:** confirmar se o Carlos tinha a senha da conta `simpleacc26`. Se tinha →
  trocar senha e rotacionar tokens/chaves SSH dela.

### A3. Vercel — time `Simpleacc`

- Time: **Simpleacc** (`team_bD5dst9eSAc4qVaaynXWifXr`), plano **Hobby**.
- **50 projetos** publicados, quase todos funis de cliente (`quiz-*`, `diagnostico-*`,
  `funil-*`) mais os internos (`simpleacc`, `csat-simple`, `simpleacc-indicacoes`,
  `dashboard-financeiro-innova`).
- **Ação:** abrir *Settings → Members* do time e remover qualquer conta pessoal do
  Carlos. Conferir também se algum funil de cliente está publicado fora deste time
  (a skill de deploy tem uma trava exatamente para isso).

### A4. Make — organização `Simple Acc`

| Item | Número |
| --- | --- |
| Organização | Simple Acc (`5039063`), zona `us2` |
| Time | Time Simple Acc (`1317940`) |
| Cenários | **103** — 54 ativos, 49 parados |
| Conexões | **67** — a maioria GoHighLevel (uma *location* por cliente, muitas duplicadas em v1/v2), + 6 OpenAI, 1 Google, 1 Z-API |
| Webhooks | mais de 50, **nenhum com chave de API configurada** |

**Pessoas que criaram cenários** (o Carlos não está na lista):

| Pessoa | Cenários criados |
| --- | --- |
| Daniel Souza · `ssouzadaniel.ads@gmail.com` | 54 |
| Pedro Lima · `pedroid1500@gmail.com` | 18 |
| Vinicius Vieira · `agenciavieira.suporte@gmail.com` | 17 |
| Renan Digital · `renandigital07@gmail.com` | 8 |
| Bruno Damaceno · `damaceno.gestordtrafego@gmail.com` | 4 |
| Renan Evangelista · `trafego@renanevangelista.com.br` | 2 |

**Ação:** revisar a lista de membros do time no Make e remover quem não opera mais
— o Pedro, o Bruno e o Renan Evangelista aparecem só em cenários antigos.

### A5. Google Workspace / Drive

- Domínio **`simpleacc.com.br`**: contas identificadas — `daniel@`, `renan.martini@`
  e `carlos.duraes@`.
- As **planilhas de leads dos clientes** pertencem a `daniel@simpleacc.com.br`
  (bom: não morrem com a saída de ninguém).
- Cada cliente tem sua pasta no Drive, com subpasta de documentos e a planilha de leads.
- **Ação no desligamento do Carlos:** suspender a conta (não excluir — excluir apaga
  o que ele é dono), transferir a propriedade dos arquivos dele para o Daniel,
  redirecionar o e-mail e sair dos grupos/eventos recorrentes de calendário.

### A6. ClickUp — **aqui o Carlos está, e é o único lugar verificável**

- Workspace `9014660089`, um único space: **Gestão de Tarefas**.
- **Membros hoje (6):**

| Nome | E-mail | Observação |
| --- | --- | --- |
| Daniel Souza | `ssouzadaniel.ads@gmail.com` | conta pessoal |
| **Carlos Durães** | **`carlosfaduraes@gmail.com`** | **remover** |
| Renan Martini | `renandigital07@gmail.com` | conta pessoal |
| Maria Cecília Souza Gomes | `ceciigomes.1210@gmail.com` | conta pessoal |
| Leonardo | `lr1761379@gmail.com` | conta pessoal |
| (sem nome) | `douradofariasclara@gmail.com` | conta pessoal, confirmar quem é |

**Ação:** antes de remover o Carlos, **reatribuir as tarefas abertas dele** — sair do
workspace com tarefas atribuídas deixa item órfão sem responsável.

### A7. Figma

Conector autenticado nesta conta. **Ação:** confirmar sob qual conta e se o Carlos
tem acesso ao arquivo/organização.

---

## B. Acessos citados na operação que **só o Carlos confirma**

Isto apareceu nas transcrições e nos documentos dos clientes, mas **não tem conector
aqui** — ou seja, ninguém consegue verificar sem ele. Cada linha precisa de uma
resposta antes do fim do dia.

| # | Ferramenta / acesso | O que se sabe pela base | Pergunta para o Carlos |
| --- | --- | --- | --- |
| 1 | **Notion** | Guarda os **playbooks de pré-vendas, closer e boas práticas**. O Carlos é quem envia os links e libera. | Quem é o dono do workspace? O que fica lá que não está no Git? |
| 2 | **Área de membros** | Ele libera o acesso do cliente novo no onboarding. | Qual plataforma, quem administra, como se cadastra um cliente novo? |
| 3 | **GoHighLevel** | Conta de **agência da Simple** (R$ 97/mês por cliente), ~59 *locations* ligadas ao Make. | Quem é o admin da conta de agência? O Carlos tinha login próprio? |
| 4 | **Meta Business Manager / Pixels** | Pixel `486556150328290` no funil da Luana; outros clientes têm os seus. | Ele é admin de algum BM de cliente? Precisa passar para quem? |
| 5 | **Fathom** | Todas as calls de venda e onboarding estão gravadas lá (links espalhados pelo repositório). | Em qual conta? Os links compartilhados continuam válidos depois que a conta sair? |
| 6 | **Canva** | 186 menções no repositório; conector instalado mas não autenticado. | Conta de time ou pessoal? |
| 7 | **Kiwify / Asaas** | Checkout do workshop e do André Donha. | Acesso de quem? |
| 8 | **Z-API (WhatsApp)** | 1 conexão no Make, usada no fluxo de boas-vindas do workshop. | Quem contratou e paga? |
| 9 | **Grupos de WhatsApp dos clientes** | Ele está em todos (ex.: `[Simple Acc] André Donha`). | Sai ou fica? Quem entra no lugar? |
| 10 | **Domínios / DNS** | `gesconsultoriamedica.com`, `musikalis.com.br` e outros aparecem nos funis. | Algum está registrado em conta dele? |
| 11 | **Gerenciador de senhas** | Não encontrei referência a nenhum. | Existe? Se não existe, onde estão as senhas compartilhadas hoje? |

---

## C. Clientes que ficam sem gestor nomeado

Estes arquivos do repositório apontam o Carlos como responsável. Depois de definido
o sucessor, eles precisam ser atualizados (é uma edição de 10 minutos):

| Cliente | Arquivos a atualizar |
| --- | --- |
| André Donha | `README.md` (linha 21), `CLAUDE.md` (linha 68) |
| Felipe Damasceno | `README.md` (linha 17) |
| Guilherme Eduardo (GES360) | `README.md` (linha 13), `CLAUDE.md` (linha 43) |
| Luana Isse | `README.md` (linha 17) |
| Walescka Bomfim | `README.md` (linha 27) |

Além do arquivo, cada um desses clientes tem **ritual com o Carlos**: a Luana tem
encontro individual a cada 15 dias com ele; o Guilherme tem reunião de revisão de
roadmap; o André tem o grupo de WhatsApp com ele dentro.

---

## D. Checklist de desligamento, em ordem

**Hoje (D0) — com o Carlos ainda presente**

- [ ] Carlos responde a **seção B** inteira (é a parte que só ele sabe).
- [ ] Carlos reatribui as tarefas abertas dele no **ClickUp**.
- [ ] Carlos lista os **grupos de WhatsApp** de cliente em que está.
- [ ] Carlos passa o que está **só na cabeça dele** sobre os 5 clientes da seção C.
- [ ] Definir **quem assume cada cliente** e avisar o cliente pelo grupo (não deixar
      o cliente descobrir sozinho).

**Amanhã (D+1) — revogação**

- [ ] Remover do **ClickUp** (`carlosfaduraes@gmail.com`).
- [ ] **Suspender** (não excluir) `carlos.duraes@simpleacc.com.br` no Workspace;
      transferir a propriedade dos arquivos; redirecionar o e-mail.
- [ ] Remover de **Vercel**, **Make**, **Figma**, **Notion**, **GoHighLevel**,
      **Canva**, **Fathom** e do que mais sair da seção B.
- [ ] Remover dos **BMs de cliente** onde for admin.
- [ ] Trocar a senha de qualquer conta **compartilhada** que ele usava — em especial
      `daniel@simpleacc.com.br` (esta conta do Claude) e `simpleacc26` (GitHub).
- [ ] Sair dos **grupos de WhatsApp** de cliente.

**Semana que vem (D+7) — confirmação**

- [ ] Conferir que nenhum funil parou de receber lead (ver seção E).
- [ ] Atualizar os arquivos da **seção C** com o novo responsável.
- [ ] Registrar em `aprendizados.md` de cada cliente a troca de gestor e a data.

---

## E. Pontas soltas que o levantamento encontrou

Não são culpa de ninguém — são coisas que a saída de uma pessoa torna mais perigosas.

1. **Toda a captação de lead depende de uma conta pessoal do Gmail.** A conexão
   Google do Make que alimenta ~80 cenários (todos os "→ Sheets") é da conta
   `ssouzadaniel.ads@gmail.com`, não de uma conta do domínio. Se essa conta cair,
   trocar de senha ou for desativada, **todos os funis param de gravar lead ao mesmo
   tempo, e em silêncio** — o Make devolve 200 mesmo quando descarta.
   *Sugestão: migrar a conexão para uma conta do domínio (`automacoes@simpleacc.com.br`).*
2. **Os webhooks do Make não têm autenticação.** O campo de chave (`x-make-apikey`)
   existe e está vazio em todos. Qualquer pessoa com a URL — que fica visível no
   JavaScript da página do funil — consegue injetar lead falso na planilha.
   *É uma escolha de arquitetura defensável; só precisa ser uma escolha consciente.*
3. **Existe um endereço de webhook fixo dentro do repositório.** Foi commitado junto
   com o código do funil. Não é senha, mas é endereço de gravação.
4. **49 cenários parados e dezenas de webhooks órfãos** no Make (sem cenário ligado),
   além de conexões GoHighLevel duplicadas em "v1/v2". Limpeza pendente — e cada
   conexão viva é uma porta aberta para a conta de um cliente.
5. **Quase todo mundo usa conta pessoal do Gmail** nas ferramentas (ClickUp, Make).
   Isso significa que desligar alguém é um trabalho manual, ferramenta por
   ferramenta — não existe "desligar no Workspace e acabou".
6. **O Git não distingue quem fez o quê:** todo commit sai como `simpleacc26` ou
   `Claude`. Numa auditoria, não há como reconstruir autoria.
7. **A Vercel está no plano Hobby** com 50 projetos de cliente em produção. Vale
   conferir se os termos do plano cobrem uso comercial.
