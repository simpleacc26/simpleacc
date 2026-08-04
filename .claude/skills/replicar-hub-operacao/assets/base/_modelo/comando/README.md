# Modelo de comando + prompt mestre

Dois arquivos andam juntos:

| Copie | Para | O que é |
| ----- | ---- | ------- |
| `prompt.md.modelo` | `prompts/<nome>.md` | O texto do padrão (fonte de verdade) |
| `comando.md.modelo` | `.claude/commands/<nome>.md` | O atalho `/<nome>` que carrega o texto |

Use o **mesmo `<nome>`** nos dois. Depois, adicione a linha na tabela de
`prompts/README.md` e em `docs/COMO-USAR.md`.

Renomeie tirando o `.modelo` do final e apague os comentários do topo.
