---
name: gerar-canvas-produto-cliente
description: >-
  Gera o Canvas de Produto + Cliente Ideal de um cliente PRÉ-PREENCHIDO com IA
  (modelo Simple Acc, criado no projeto Lucas Álife) e entrega como Google Doc
  na pasta "Documentos" do cliente no Drive. Preenche só com DADOS REAIS
  extraídos das transcrições de onboarding/vendas e deixa em branco, com
  perguntas marcadas, o que só o cliente pode responder. Use sempre que alguém
  pedir para "preencher o canvas do cliente X", "gerar o canvas de produto /
  cliente ideal", "mandar o canvas pré-preenchido pro cliente completar", ou
  quando o processo de onboarding chegar na etapa de canvas — mesmo que não
  digam "canvas" explicitamente (ex.: "preencher o doc de produto e ICP com IA
  e mandar pro cliente detalhar").
---

# Canvas de Produto + Cliente Ideal — pré-preenchido com IA

## O que esta skill faz

Pega o material das reuniões de um cliente (call de vendas, call de onboarding
e anotações da IA que participou) e produz o **Canvas de Produto + Cliente
Ideal pré-preenchido**, entregue como **Google Doc** na pasta **"Documentos"**
do cliente no Drive — pronto para o time enviar ao cliente completar.

O combinado com o cliente é sempre o mesmo: **a IA preenche o máximo possível
com dados reais** e o cliente recebe o doc com **perguntas específicas** nos
pontos que só ele pode detalhar. O valor está em três regras que não podem ser
violadas:

1. **Nunca inventar.** Só entra no canvas o que tem fonte nas transcrições/notas.
2. **Deixar em branco o que importa.** Campo sem dado vira **pergunta explícita**
   para o cliente — não vira texto genérico de marketing.
3. **Marcar a procedência** de cada bloco (preenchido real × a validar × cliente
   precisa detalhar), para o cliente revisar rápido e corrigir o que errarmos.

## Insumos — peça o que faltar ANTES de começar

Peça à pessoa (e confira o que já existe em `clientes/<cliente>/contexto/`):

| Insumo | Obrigatório? | Observação |
| ------ | ------------ | ---------- |
| **Transcrição da call de onboarding** | Sim | PDF/texto; é a fonte mais rica |
| **Transcrição da call de vendas** | Sim | Traz oferta, preço discutido, decisão estratégica |
| **Anotações da IA das reuniões** (Gemini/Meet/Fireflies) | Sim (se existirem) | Resumo + action items; ótimo para checagem cruzada |
| **Nome do cliente** + slug da pasta (`clientes/<slug>/`) | Sim | Criar a pasta pelo `_modelo/cliente/` se for cliente novo |
| **Pasta "Documentos" do cliente no Drive** (link ou nome) | Sim | Se não informarem, procure com `search_files`; confirme antes de criar o Doc |
| Canvas template em branco (link do Doc) | Não | Se houver, use como referência de perguntas; senão use `references/estrutura-canvas.md` |
| Materiais extras (Instagram, site, docs de produto) | Não | Enriquecem, mas não substituem as transcrições |

**Se faltar transcrição obrigatória:** pare e peça. Um canvas pré-preenchido a
partir de "achismo" quebra a regra nº 1 e queima a confiança do cliente.

**PDFs:** extraia texto com `pdftotext -layout` (instale `poppler-utils` se
preciso). Salve as fontes brutas em `clientes/<cliente>/contexto/fontes/`
com nome datado (`AAAA-MM-DD-<descricao>.txt`) — é a memória de auditoria.

## O fluxo (siga nesta ordem)

```
1. INTAKE     → coletar insumos; ler contexto/ e aprendizados.md do cliente
2. EXTRAÇÃO   → ler TODO o material; mapear dados reais por pergunta do canvas
3. DECISÃO    → identificar QUAL produto é o foco do canvas (ver abaixo)
4. GERAÇÃO    → preencher o canvas com os marcadores; formular as perguntas ✍️
5. ENTREGA    → Google Doc na pasta "Documentos" do cliente no Drive
6. VERSIONAR  → salvar .md em clientes/<cliente>/estrategia/ + aprendizados + PR
```

### Passo 1 — Intake

Além dos insumos acima, leia `clientes/<cliente>/contexto/` e `aprendizados.md`
se existirem (regra do repo: ler antes de criar). Se o cliente ainda não tem
pasta no repo, crie a partir de `_modelo/cliente/` na mesma branch.

### Passo 2 — Extração (só dados reais)

Leia o material inteiro antes de escrever. Para cada uma das 15 perguntas do
canvas (8 de produto + 7 de cliente ideal — ver
`references/estrutura-canvas.md`), anote:

- **O que foi dito literalmente** (com quem disse e onde);
- **O que é inferência razoável** a partir do que foi dito → vira "🔸 a validar";
- **O que não existe no material** → vira campo em branco com pergunta ✍️.

Frases literais do cliente são ouro — reaproveite no canvas (e alimente
`contexto/mercado-e-linguagem.md`).

### Passo 3 — Decisão de foco (a pegadinha mais comum)

Muitos clientes têm **mais de um produto/público** (ex.: oferta high ticket +
produto de entrada). O canvas responde por **UM produto**. Critérios, em ordem:

1. O produto definido como foco da Fase 1 / do funil nas reuniões;
2. O produto sobre o qual o cliente respondeu quando perguntado "qual a grande
   transformação?";
3. Se ambíguo: preencha para o mais provável, **sinalize a decisão no topo do
   doc como pergunta nº 1** e resuma o outro produto num **apêndice** (nada se
   perde, e a confirmação vira tarefa do cliente).

### Passo 4 — Geração

Siga a estrutura e as convenções de `references/estrutura-canvas.md`:

- Perguntas do canvas são **fixas** (as 15 do template Simple). Não invente seções.
- Cabeçalho "Como usar este documento" explicando os marcadores ao cliente.
- Marcadores por bloco: **✅ dado real** · **✍️ CLIENTE precisa detalhar** ·
  **🔸 a validar/confirmar**. (⚠️ use só símbolos simples/BMP — ver Passo 5.)
- Campos ✍️ têm **pergunta específica e acionável** (com exemplos entre
  parênteses quando ajudar), nunca um "preencher aqui" seco.
- Feche com **"Perguntas prioritárias"**: lista numerada do que travou o
  preenchimento, apontando o item do canvas correspondente — é o resumo que o
  time manda no WhatsApp junto com o doc.
- Tom: direto, em português, falando **com** o cliente ("você"), sem juridiquês
  e sem jargão interno da Simple.

### Passo 5 — Entrega no Drive (pasta "Documentos" do cliente)

1. **Localize a pasta**: `search_files` do MCP Drive (ex.: `title contains
   '<Cliente>'`), ou pegue o `parentId` de um doc já existente do cliente via
   `get_file_metadata` (ex.: o canvas em branco que o time criou). Padrão das
   pastas: `Simple <> {Cliente} / {Ano} / 1. Documentos`. Na dúvida, confirme
   com a pessoa antes de criar.
2. **Crie o Doc**: `create_file` com `parentId` da pasta,
   `contentMimeType: "text/markdown"` e `textContent` = o canvas completo.
   **Testado (07/2026): markdown converte direto para Google Doc nativo
   formatado** (títulos, negrito, listas) — não precisa do fluxo HTML+navegador
   do playbook de estratégia.
   - ⚠️ **Emojis:** use apenas símbolos do plano básico Unicode (✅ ✍️ ⚠️ 🔸 ✔ ►).
     Emojis "novos"/non-BMP (🔎 🎯 📝 🚀…) **corrompem** na conversão (viram "ð").
3. **Título do Doc**: `Simple Acc & {Cliente} | Canvas do Produto + Cliente
   Ideal — PRÉ-PREENCHIDO (para o {Cliente} revisar) - DD/MM/AA`.
4. **Não sobrescreva o template em branco** do time — o doc pré-preenchido é um
   arquivo novo.
5. **Releia o Doc criado** (`read_file_content`) e confira: títulos ok, sem
   caracteres corrompidos, sem markdown cru. O MCP Drive **não apaga arquivos**;
   se sair errado, corrija a fonte e avise a pessoa qual arquivo descartar —
   não acumule tentativas na pasta do cliente.
6. Entregue o **link do Doc** (`https://docs.google.com/document/d/{ID}/edit`)
   junto com a lista de perguntas prioritárias.

### Passo 6 — Versionar no repositório (memória = Git)

1. Salve a fonte em
   `clientes/<cliente>/estrategia/AAAA-MM-DD-canvas-produto-e-cliente-ideal.md`,
   com nota no topo: data, link do Doc gerado, doc template de origem e a
   decisão de foco tomada.
2. Registre em `clientes/<cliente>/aprendizados.md`: canvas entregue + decisões
   pendentes do cliente.
3. Commit em branch `cliente/<cliente>/<assunto>` (ou a branch designada da
   sessão) + PR. Nunca commite as credenciais/segredos, e cuidado com dados
   sensíveis de saúde/financeiros nas transcrições — eles podem ficar nas
   `fontes/`, mas não devem virar copy sem autorização.

## Checklist antes de entregar

- [ ] Insumos obrigatórios recebidos e salvos em `contexto/fontes/`
- [ ] **Zero informação inventada** — cada ✅ tem fonte na transcrição
- [ ] Decisão de foco (qual produto) sinalizada no topo, com apêndice do 2º produto se houver
- [ ] Todos os campos sem dado viraram pergunta ✍️ específica
- [ ] Bloco final "Perguntas prioritárias" presente
- [ ] Doc criado na pasta **"Documentos" do cliente** (confirmada), template em branco intacto
- [ ] Doc relido: formatado, sem caracteres corrompidos (atenção a emojis non-BMP)
- [ ] Fonte .md versionada + `aprendizados.md` atualizado + commit/PR
- [ ] Link do Doc + perguntas prioritárias entregues à pessoa
