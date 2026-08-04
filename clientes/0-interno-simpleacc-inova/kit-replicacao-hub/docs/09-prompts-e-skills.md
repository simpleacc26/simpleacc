# 09 — Prompts mestres e skills: a inteligência reutilizável

Esta é a parte que transforma "usar IA" em **ativo da empresa**. Sem ela, cada
pessoa reinventa o processo em cada conversa e a qualidade oscila. Com ela, o
melhor jeito de fazer cada coisa fica escrito, versionado e disponível para todos.

---

## 1. As três camadas

| Camada | Onde | O que é | Quem aciona |
| ------ | ---- | ------- | ----------- |
| **Contexto** | `CLAUDE.md` (raiz e por cliente) | O que a IA precisa saber sempre | automático |
| **Comando** | `prompts/<nome>.md` + `.claude/commands/<nome>.md` | Um padrão de conversa guiada (`/nome`) | a pessoa digita |
| **Skill** | `.claude/skills/<nome>/` | Um processo completo, com modelos e regras | a IA reconhece sozinha |

---

## 2. Comando ou skill?

| Use **comando** quando… | Use **skill** quando… |
| ----------------------- | --------------------- |
| O padrão é uma conversa: pergunta → aprofunda → gera | O padrão é um processo com etapas fixas |
| Cabe num arquivo de texto | Precisa de arquivos-modelo junto (HTML, CSS, script) |
| Você decide na hora de puxar | Você quer que a IA reconheça a tarefa sozinha |
| Ex.: "gerar copy de anúncio no nosso framework" | Ex.: "montar, publicar e integrar o funil completo" |

Na dúvida, comece como **comando**. Quando ele virar um processo com modelos e
regras de qualidade, promova para **skill**.

---

## 3. Anatomia de uma skill

```
.claude/skills/<nome-da-skill>/
├── SKILL.md          ← obrigatório: frontmatter + fluxo (~150 linhas)
├── references/       ← textos longos, lidos sob demanda
│   └── <assunto>.md
└── assets/           ← modelos que a skill copia (HTML, CSS, scripts)
    └── <modelo>
```

**O frontmatter é o que faz a skill ser acionada:**

```yaml
---
name: nome-igual-ao-da-pasta
description: >-
  O que a skill faz, e as frases que as pessoas usam para pedir isso.
  Use sempre que alguém pedir "monta o funil", "cria o quiz", "sobe a página".
---
```

A `description` é o gatilho. Se ela não contiver as palavras que o time
realmente usa, a skill nunca dispara e vira um arquivo morto.

**Por que separar `references/`:** a IA só carrega a referência quando chega
naquela etapa. Isso mantém o `SKILL.md` enxuto e a sessão rápida. Se o `SKILL.md`
está passando de ~150 linhas, mova detalhe para `references/`.

**Por que `assets/`:** modelo já validado (o HTML do funil que converteu, o CSS
da identidade) é copiado, não recriado. Recriar do zero toda vez é onde a
qualidade escorrega.

---

## 4. ⚠️ A armadilha das duas fontes de verdade

**Este é o problema mais caro de uma operação compartilhada, e ele é silencioso.**

Uma skill pode viver em dois lugares:

| Local | Vale para | Versionado | Sobrevive à saída da pessoa |
| ----- | --------- | ---------- | --------------------------- |
| `{{REPO}}/.claude/skills/` | **todo o time** | ✅ Git | ✅ |
| Conta pessoal de quem instalou | **só ela** | ❌ | ❌ |

Quando a mesma skill existe nos dois lugares, elas **desandam**: alguém melhora a
versão pessoal numa sessão, a versão do repositório fica para trás, e duas
pessoas passam a entregar coisas diferentes com o mesmo nome. Ninguém percebe
até um cliente comparar.

**As regras:**

1. **Toda skill de processo da operação mora em `.claude/skills/`, no repositório.**
2. Skill genérica (gerar PDF, ler planilha, montar apresentação) pode ficar na
   conta — não é processo da casa, não desanda.
3. Melhorou uma skill numa sessão? **Commite a melhoria no repositório**, no mesmo PR.
4. Antes de desligar alguém, confira se sobrou processo só na conta dela.
5. Se precisar distribuir uma skill fora do repositório, escreva-a **portátil**:
   sem caminho fixo do repositório, dizendo "salve onde o projeto versionar".

> **Vale conferir na operação atual:** o hub da SimpleAcc hoje tem 3 skills
> versionadas em `.claude/skills/` e outras cinco de processo que existem só na
> conta pessoal — e duas delas já divergiram da versão do repositório. É
> exatamente o cenário descrito acima. Na operação nova, comece certo.

---

## 5. Como criar um comando novo

1. `cp _modelo/comando/prompt.md.modelo prompts/<nome>.md` → escreva o padrão
2. `cp _modelo/comando/comando.md.modelo .claude/commands/<nome>.md` → aponte para o arquivo acima
3. Atualize a tabela em `prompts/README.md` e em `docs/COMO-USAR.md`
4. Commit + PR

O comando **não** contém o prompt: ele só aponta para `prompts/<nome>.md`. Assim
melhorar o prompt é editar **um** arquivo, e a melhoria vale para todos os
clientes de uma vez.

---

## 6. Como criar uma skill nova

1. `cp -r _modelo/skill/ .claude/skills/<nome-da-skill>/`
2. Renomeie `SKILL.md.modelo` → `SKILL.md`, preencha `name` e `description`
3. Coloque texto longo em `references/`, modelos em `assets/`
4. Apague o `README.md` do modelo dentro da skill nova
5. Atualize `prompts/README.md` e `docs/COMO-USAR.md`
6. Commit + PR

---

## 7. O que trazer da operação atual

Se a operação nova é do mesmo negócio, a inteligência já validada vale ouro.
Use `scripts/copiar-inteligencia.sh` para copiar `prompts/`, `.claude/commands/`
e `.claude/skills/` do hub existente para o novo.

**Depois de copiar, revise item por item:**

| Revisar | O quê |
| ------- | ----- |
| Nomes | trocar o nome da empresa antiga pelo novo |
| Caminhos | `clientes/<cliente>/...` continua valendo; conferir referências a pastas específicas |
| Contas | trava de conta da Vercel, pasta do Drive, time — tudo aponta para a operação nova? |
| Exemplos | nomes de clientes da operação antiga viram exemplos genéricos ou clientes novos |
| Assets | logo, paleta e fontes da marca nova |
| Regras de estilo | as regras de escrita da casa continuam valendo? |

Se a operação nova é de **outro nicho**, copie só a **estrutura** (o esqueleto do
`SKILL.md`, a divisão em `references/` e `assets/`) e reescreva o conteúdo. Prompt
mestre de nicho errado entrega copy de nicho errado.

---

## 8. Quando criar um ativo novo

**Regra prática: repetiu três vezes, vira ativo.**

Se você fez a mesma coisa manualmente para três clientes diferentes, o quarto
merece um comando ou uma skill. É o item da rotina semanal em
`08-operacao-diaria.md`.

---

## 9. Checklist

- [ ] `prompts/README.md` com a tabela de comandos e skills preenchida
- [ ] `docs/COMO-USAR.md` com a mesma tabela, em linguagem para quem chega
- [ ] Toda skill de processo da operação está em `.claude/skills/`, commitada
- [ ] Nenhuma skill de processo vive só numa conta pessoal
- [ ] Cada `SKILL.md` com `name` = nome da pasta e `description` com os gatilhos reais
- [ ] Modelos validados em `assets/`, não recriados a cada uso
- [ ] Rotina semanal olhando o que se repetiu três vezes
