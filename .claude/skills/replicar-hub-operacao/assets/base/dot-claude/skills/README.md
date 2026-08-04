# Skills do time — {{EMPRESA}}

Cada subpasta aqui é uma **skill**: uma rotina completa que a IA aciona sozinha
quando a tarefa combina com a descrição dela.

```
.claude/skills/<nome-da-skill>/
├── SKILL.md          ← obrigatório. frontmatter (name + description) + instruções
├── references/       ← opcional. textos longos que a skill lê sob demanda
└── assets/           ← opcional. modelos (HTML, CSS, scripts) que a skill copia
```

## Regras

1. **Skill mora aqui, versionada.** Uma skill instalada só na conta pessoal de
   alguém não existe para o resto do time e vira uma segunda versão desatualizada
   do mesmo processo. Se melhorou numa sessão, commite aqui.
2. **`name` do frontmatter = nome da pasta.** Minúsculas, com hífen.
3. **`description` é o gatilho.** É por ela que a IA decide acionar. Escreva o que
   a skill faz **e** as frases que as pessoas usam para pedir aquilo.
4. **Skill não guarda segredo.** Nada de token, senha ou link privado dentro dela.
5. Quando criar ou mudar, atualize a tabela em `prompts/README.md` e em
   `docs/COMO-USAR.md`.

Modelo pronto para copiar: `_modelo/skill/`.
