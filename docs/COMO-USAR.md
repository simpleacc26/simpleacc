# Como usar o hub da Simple

Guia rápido para qualquer pessoa do time trabalhar no nosso repositório de forma
remota, de qualquer máquina. Versão visual (bonita) em **`COMO-USAR.html`** —
abra no navegador.

> Resumo de tudo: o nosso trabalho mora no **GitHub** (um "armário online"),
> organizado em **pastas por cliente**. Você trabalha em **sessões** do Claude
> Code, e o que vale fica **salvo nos arquivos** (a memória é o Git, não a conversa).

---

## 1. Os níveis (o que cada nome significa)

| Nível | É tipo… | O que é |
| ----- | ------- | ------- |
| **Ambiente** | a sala equipada | "Simple Acc" — traz as ferramentas e acessos prontos. Quase nunca se mexe. |
| **Repositório** | o armário | `simpleacc` — guarda **tudo** versionado (com histórico). |
| **Branch** | uma cópia de trabalho | `main` é a **versão oficial**. Cada tarefa cria uma cópia e, quando aprova, junta na `main`. |
| **Pasta** | a gaveta | cada cliente e cada tipo de material (contexto, copy, roteiros…). |
| **Sessão** | uma reunião de trabalho | a conversa onde você dá a tarefa. **É descartável** — o que vale fica nos arquivos. |

Termos rápidos:
- **Commit** = salvar um ponto do trabalho · **Push** = enviar pro GitHub.
- **PR (Pull Request)** = pedido de aprovação antes de juntar na versão oficial.
- **Merge** = juntar o trabalho aprovado na `main`.

---

## 2. Como acessar os arquivos

**Os arquivos não ficam "dentro do chat".** Moram no GitHub. Duas formas:

### Para VER / LER (como um Google Drive)
1. Acesse **https://github.com/simpleacc26/simpleacc**
2. Clique nas pastas: `clientes/` → `sense-clinic/` → `estrategia/` → abre o documento.
3. Deixe a branch em **`main`** (versão oficial).

### Para CRIAR / ALTERAR (trabalhar de verdade)
1. **New session** (Nova sessão), no modo **Code**.
2. No seletor: **Simple Acc → simpleacc → main**.
3. Primeira mensagem, diga o cliente: *"Trabalhar em `clientes/sense-clinic`: [a tarefa]"*.
4. No fim, a IA salva tudo e abre um **PR** — alguém revisa e dá **merge**.

> GitHub = ver/ler. Sessão do Claude Code = criar/alterar.

---

## 3. Estrutura de pastas

```
simpleacc/                      ← o armário (repositório) da Simple
├── clientes/                   ← uma pasta por cliente
│   ├── 0-interno-simpleacc-inova/   (coisas da Simple, fica no topo)
│   ├── sense-clinic/
│   │   ├── CLAUDE.md           ← "ficha" do cliente (a IA lê sozinha)
│   │   ├── contexto/           ← quem é, oferta, público, análise de mercado
│   │   ├── estrategia/         ← estratégias e diagnósticos
│   │   ├── copy/               ← textos de páginas e anúncios
│   │   ├── roteiros/           ← roteiros de vídeo
│   │   ├── funis/              ← páginas, quizzes, landing pages
│   │   └── aprendizados.md     ← o que funciona / não funciona
│   └── ...(os outros clientes, mesma estrutura)
├── prompts/                    ← prompts mestres (ex.: o do /prompt-mestre)
├── docs/                       ← manual e este guia
└── _modelo/                    ← modelo para criar cliente novo
```

---

## 4. Passo a passo para começar uma tarefa

1. **New session** no modo **Code**.
2. Selecione **Simple Acc → simpleacc → main**.
3. Diga o cliente e a tarefa na 1ª mensagem.
4. Peça para **ler `contexto/` e `aprendizados.md`** do cliente antes de criar nada.
5. Para gerar funil / página / anúncios, use o comando **`/prompt-mestre`**.
6. Ao terminar, a IA salva e abre um **PR** → revisar → **merge**.
7. **Registre o aprendizado** em `aprendizados.md` do cliente.

---

## 5. O comando `/prompt-mestre`

Em qualquer sessão, digite **`/prompt-mestre`**. Ele assume o papel do nosso prompt mestre
e conduz: **diagnóstico → aprofundamento → resumo → geração** (página em HTML puro
ou copy de anúncios). Dentro da pasta de um cliente, ele já usa o contexto dele.

Outros comandos virão (ex.: `/roteiro`, `/copy`) conforme formos cadastrando os
prompts mestres em `prompts/`.

---

## 6. Onde colocar cada coisa

| O que é | Onde vai |
| ------- | -------- |
| Estratégia, diagnóstico | `clientes/<cliente>/estrategia/` |
| Copy de página ou anúncio | `clientes/<cliente>/copy/` |
| Roteiro de vídeo | `clientes/<cliente>/roteiros/` |
| Funil, landing, quiz | `clientes/<cliente>/funis/` |
| Contexto / pesquisa de mercado | `clientes/<cliente>/contexto/` |
| Coisa da própria Simple | `clientes/0-interno-simpleacc-inova/` |
| Documento/playbook geral | `docs/` |

---

## 7. Regras de ouro

1. **Uma sessão = um cliente/assunto.** Nunca misturar dois clientes na mesma conversa.
2. **Sempre `main` no seletor.** É a versão oficial.
3. **Leia antes de criar.** `contexto/` e `aprendizados.md` do cliente.
4. **Salve e registre.** Commit/push + aprendizado no `aprendizados.md`.
5. **Nunca commitar segredos** (senhas, tokens). Use `.env` (que é ignorado).
6. **Em dúvida, leia o [Manual](MANUAL.md).**
