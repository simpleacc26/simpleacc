#!/usr/bin/env bash
#
# empacotar.sh — gera o zip instalável da skill.
#
# Uso:
#   assets/scripts/empacotar.sh [pasta-de-saida]
#
# O zip resultante sobe direto em:
#   claude.ai   → Configurações → Capacidades/Skills → Enviar skill
#   Claude Code → descompactar em <repo>/.claude/skills/ ou ~/.claude/skills/

set -euo pipefail

SKILL_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
SKILL_NOME="$(basename "$SKILL_DIR")"

# por padrão, publica em clientes/0-interno-*/pacotes/ do repositório, se existir
PADRAO="$PWD"
REPO_RAIZ="$(cd "$SKILL_DIR/../../.." && pwd)"
for d in "$REPO_RAIZ"/clientes/0-interno-*/; do
  [ -d "$d" ] && PADRAO="$d/pacotes" && break
done
SAIDA="${1:-$PADRAO}"

command -v zip >/dev/null 2>&1 || { echo "ERRO: 'zip' não encontrado." >&2; exit 1; }
[ -f "$SKILL_DIR/SKILL.md" ] || { echo "ERRO: SKILL.md não encontrado em $SKILL_DIR" >&2; exit 1; }

mkdir -p "$SAIDA"
SAIDA="$(cd "$SAIDA" && pwd)"
ZIP="$SAIDA/$SKILL_NOME.zip"

rm -f "$ZIP"

# zipa a pasta da skill inteira, a partir do pai, para o zip conter
# replicar-hub-operacao/... na raiz (formato que o upload espera)
( cd "$SKILL_DIR/.." && zip -qr "$ZIP" "$SKILL_NOME" -x '*.DS_Store' -x '__MACOSX/*' )

echo "✓ $ZIP"
echo "  $(unzip -l "$ZIP" | tail -1 | awk '{print $2}') arquivos · $(du -h "$ZIP" | cut -f1)"
