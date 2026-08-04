# 05 — Google Workspace e Drive: o que vive fora do Git

O Git guarda a **memória versionada** da operação. O Drive guarda o **material
vivo trocado com o cliente**: documentos que ele lê, planilhas que recebem lead,
arquivos que ele edita junto.

Os dois convivem. A regra de divisão é simples:

| Vai para o **Git** | Vai para o **Drive** |
| ------------------ | -------------------- |
| Contexto, estratégia, copy, roteiros (fonte `.md`) | O documento formatado que o cliente abre |
| Código dos funis | Planilha de leads (recebe dados em tempo real) |
| Aprendizados, decisões, histórico | Material que o cliente edita junto |
| Prompts e skills do time | Gravações de call, PDFs recebidos |

Em caso de dúvida: **a fonte fica no Git, a entrega fica no Drive** — e o link do
Drive é registrado no `README.md` ou no `CLAUDE.md` do cliente, para não se perder.

---

## 1. Plano: Business Standard ou superior

O Business **Starter não tem Drives Compartilhados**. Sem Drive Compartilhado,
todo arquivo pertence à conta de quem criou: a pessoa sai, o arquivo vai junto.
Para operação compartilhada, isso é inaceitável. **Business Standard ou acima.**

---

## 2. Estrutura de pastas no Drive

Espelhe a estrutura do repositório — quem sabe navegar em um sabe navegar no outro.

```
Drive Compartilhado: {{EMPRESA}}
├── 00 Interno/
│   ├── Marca/               (logo, brandbook, fontes)
│   ├── Comercial/           (propostas, contratos)
│   └── Processos/
└── Clientes/
    └── {{EMPRESA}} <> <Cliente>/
        ├── 1. Documentos/   ← estratégia, roadmap, canvas (os Docs entregues)
        ├── 2. Leads/        ← planilhas que recebem os leads dos funis
        ├── 3. Materiais/    ← logo, fotos, vídeos que o cliente enviou
        └── 4. Calls/        ← gravações e transcrições de onboarding
```

Crie a partir de um **modelo de pasta de cliente** — copiar leva 30 segundos e
garante que todo cliente tem a mesma gaveta.

---

## 3. Permissões

| Quem | Acesso |
| ---- | ------ |
| Time da operação | Gerenciador de conteúdo no Drive Compartilhado |
| Cliente | acesso **só à pasta dele**, nunca ao Drive inteiro |
| Contas de automação | acesso mínimo ao que precisam |

⚠️ Nunca compartilhe a raiz do Drive Compartilhado com um cliente. Um clique
errado e ele enxerga a pasta de todos os outros.

---

## 4. Entregar documento formatado (o caminho que funciona)

Entregar um "textão" cru passa impressão de rascunho. O documento formatado
(títulos, negrito, listas) é o que faz o cliente aprovar de imediato.

O caminho testado, quando o documento é gerado por uma sessão:

1. A sessão gera o conteúdo como **um arquivo HTML** (só `<h1> <h2> <h3> <p>
   <strong> <em> <ul> <ol> <hr>`).
2. Sobe o HTML na pasta do cliente via conector do Drive.
3. Abre o HTML no Drive com **"Abrir com → Google Docs"** — a importação converte
   `<h1>` em Título 1, `<strong>` em negrito, `<ul>` em lista.
4. Renomeia, move para `1. Documentos/` e apaga o HTML intermediário.

O que **não** funciona (já testado): subir texto puro vira Doc sem estilo; subir
Markdown ou HTML sem converter fica como arquivo solto; subir `.docx` em base64
estoura o limite de tokens.

> Guarde a fonte `.md` ou `.html` no Git, em `clientes/<cliente>/estrategia/`.
> O Doc é a entrega; a fonte é a memória.

---

## 5. Planilha de leads + integração do funil

Cada funil no ar precisa de um destino para os leads. O caminho mais simples e
gratuito é **Google Apps Script**:

**Colunas da planilha** (esta ordem, com as UTMs sempre no fim):

```
Data/Hora, Nome, WhatsApp, E-mail, [respostas do quiz...], Origem,
UTM Source, UTM Medium, UTM Campaign, UTM Content, UTM Term
```

**Montagem:**

1. Crie a planilha em `Clientes/<Cliente>/2. Leads/`.
2. Na planilha: **Extensões → Apps Script** → cole o script que recebe o `POST` e
   grava a linha → salvar.
3. **Implantar → App da Web** → *"Quem pode acessar: Qualquer pessoa"* → Autorizar.
4. Copie a URL `/exec`.
5. No funil, preencha o endpoint com essa URL e **republique**.

> A autorização do Google é **do humano**, não da IA — só quem tem a conta
> consegue autorizar. Reserve 2 minutos do responsável para isso.

**Teste obrigatório antes de dizer "pronto":**

```
Abra https://<url-do-funil>/?utm_source=teste&utm_medium=cpc&utm_campaign=teste
→ preencha e envie um lead
→ confirme que a linha caiu na planilha, COM as UTMs
```

Sem esse teste, você descobre que a integração está quebrada quando o cliente
reclamar que gastou verba e não recebeu lead nenhum.

**Alternativa com Make:** use gatilho **Webhook (instantâneo)** → módulo Google
Sheets "Add a Row". **Nunca** use gatilho de intervalo/polling: ele consome
operações mesmo parado. Apps Script costuma ser mais simples e 100% gratuito.

---

## 6. Checklist do Workspace

- [ ] Plano **Business Standard ou superior** (com Drives Compartilhados)
- [ ] Drive Compartilhado `{{EMPRESA}}` criado, com a estrutura acima
- [ ] Modelo de pasta de cliente pronto para copiar
- [ ] Cliente tem acesso **só à pasta dele**
- [ ] Link da pasta do Drive registrado no `CLAUDE.md` de cada cliente
- [ ] Planilha de leads de cada funil criada, com as UTMs
- [ ] Integração funil → planilha **testada de ponta a ponta**
