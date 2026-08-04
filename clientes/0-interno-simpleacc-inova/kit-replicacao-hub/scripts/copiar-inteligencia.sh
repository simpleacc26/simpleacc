#!/usr/bin/env bash
#
# copiar-inteligencia.sh — leva prompts, comandos e skills de um hub existente
#                          para um hub novo.
#
# Uso:
#   ./scripts/copiar-inteligencia.sh <hub-origem> <hub-destino> [--aplicar]
#
# Sem --aplicar, só mostra o que seria copiado (simulação).
#
# Só faz sentido quando a operação nova é do MESMO negócio. Se o nicho é outro,
# copie apenas a estrutura e reescreva o conteúdo — ver docs/09-prompts-e-skills.md.

set -euo pipefail

ORIGEM="${1:-}"
DESTINO="${2:-}"
APLICAR="${3:-}"

if [ -z "$ORIGEM" ] || [ -z "$DESTINO" ]; then
  echo "Uso: $0 <hub-origem> <hub-destino> [--aplicar]" >&2
  exit 1
fi

for d in "$ORIGEM" "$DESTINO"; do
  [ -d "$d" ] || { echo "ERRO: pasta não encontrada: $d" >&2; exit 1; }
done

PASTAS=("prompts" ".claude/commands" ".claude/skills")

echo "=============================================="
echo " Copiar inteligência"
echo "   de: $ORIGEM"
echo "  para: $DESTINO"
[ "$APLICAR" = "--aplicar" ] && echo "  modo: APLICAR" || echo "  modo: simulação (use --aplicar para valer)"
echo "=============================================="
echo

for p in "${PASTAS[@]}"; do
  if [ ! -d "$ORIGEM/$p" ]; then
    echo "· $p — não existe na origem, pulando"
    continue
  fi
  echo "· $p"
  (cd "$ORIGEM/$p" && find . -type f ! -name '.gitkeep' | sed 's|^\./|    |' | sort)
  if [ "$APLICAR" = "--aplicar" ]; then
    mkdir -p "$DESTINO/$p"
    cp -R "$ORIGEM/$p/." "$DESTINO/$p/"
  fi
  echo
done

# skills que existem só na conta pessoal desta máquina e NÃO estão no hub de origem
CONTA="$HOME/.claude/skills"
# genéricas (não são processo da operação); ignoradas no aviso
GENERICAS=" docx pdf pptx xlsx morning skill-creator session-start-hook dataviz "
if [ -d "$CONTA" ]; then
  soltas=""
  for dir in "$CONTA"/*/; do
    [ -f "$dir/SKILL.md" ] || continue
    nome="$(basename "$dir")"
    case "$GENERICAS" in *" $nome "*) continue ;; esac
    [ -d "$ORIGEM/.claude/skills/$nome" ] || soltas="$soltas $nome"
  done
  if [ -n "$soltas" ]; then
    echo "ATENÇÃO: skills instaladas na conta pessoal desta máquina que NÃO estão"
    echo "no hub de origem (então o time não as tem):"
    for s in $soltas; do echo "    $s"; done
    echo
    echo "Se alguma delas for processo da operação, traga para o repositório de"
    echo "origem antes de replicar. Ver docs/09-prompts-e-skills.md, seção 4."
    echo
  fi
fi

if [ "$APLICAR" != "--aplicar" ]; then
  echo "Nada foi copiado. Rode de novo com --aplicar para efetivar."
  exit 0
fi

cat <<'EOF'
✓ Copiado.

REVISE ANTES DE COMMITAR — item por item:

  [ ] Nome da empresa antiga trocado pelo novo (em todos os arquivos)
  [ ] Trava de conta da Vercel apontando para o time NOVO
  [ ] Referências a pasta do Drive apontando para o Drive NOVO
  [ ] Nomes de clientes da operação antiga virando exemplos genéricos
  [ ] Assets (logo, paleta, fontes) trocados pela marca nova
  [ ] Regras de estilo da casa ainda fazem sentido no nicho novo
  [ ] Tabelas de prompts/README.md e docs/COMO-USAR.md atualizadas

Busque o que ficou para trás:
  grep -ril "<nome-da-empresa-antiga>" prompts .claude
EOF
