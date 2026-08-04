# Modelo de skill

Copie **esta pasta inteira** para `.claude/skills/<nome-da-skill>/` e:

1. Renomeie `SKILL.md.modelo` → `SKILL.md`.
2. Preencha o frontmatter: `name` igual ao nome da pasta, `description` com o que
   a skill faz **e** as frases que as pessoas usam para pedir aquilo.
3. Crie `references/` para textos longos (a IA lê sob demanda, economiza contexto)
   e `assets/` para arquivos-modelo que a skill copia (HTML, CSS, scripts).
4. Apague este README dentro da skill nova.
5. Atualize as tabelas em `prompts/README.md` e `docs/COMO-USAR.md`.
6. **Commite.** Skill fora do repositório não existe para o time.

## Estrutura final esperada

```
.claude/skills/<nome-da-skill>/
├── SKILL.md
├── references/
│   └── <assunto>.md
└── assets/
    └── <modelo>
```

## Dica de escrita

O `SKILL.md` deve caber em ~150 linhas. Se estiver crescendo, mova detalhe para
`references/` e deixe no SKILL.md só o fluxo e os ponteiros. A IA só carrega a
referência quando chega naquela etapa.
