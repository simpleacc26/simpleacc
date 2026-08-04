#!/usr/bin/env bash
#
# criar-hub.sh — gera a estrutura de um hub novo a partir de base/
#
# Uso:
#   ./scripts/criar-hub.sh                      (modo interativo, pergunta tudo)
#   DESTINO=../novo-hub EMPRESA="Nova Op" ... ./scripts/criar-hub.sh
#
# O script copia base/ para o destino e troca os {{PLACEHOLDERS}} pelos valores
# da operação. Não cria contas nem repositórios: isso é manual, veja
# docs/01-contas-e-acessos.md e docs/02-github.md.

set -euo pipefail

KIT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BASE_DIR="$KIT_DIR/base"

if [ ! -d "$BASE_DIR" ]; then
  echo "ERRO: não encontrei $BASE_DIR" >&2
  exit 1
fi

# ---------------------------------------------------------------- perguntar --
perguntar() {
  # perguntar VAR "Texto da pergunta" "valor padrão"
  local __var="$1" __texto="$2" __padrao="${3:-}" __resposta=""
  if [ -n "${!__var:-}" ]; then
    return 0                       # já veio por variável de ambiente
  fi
  if [ ! -t 0 ]; then
    echo "ERRO: defina $__var por variável de ambiente (sem terminal interativo)." >&2
    exit 1
  fi
  if [ -n "$__padrao" ]; then
    read -r -p "$__texto [$__padrao]: " __resposta
    __resposta="${__resposta:-$__padrao}"
  else
    while [ -z "$__resposta" ]; do
      read -r -p "$__texto: " __resposta
    done
  fi
  printf -v "$__var" '%s' "$__resposta"
}

echo "=============================================="
echo " Criar hub novo"
echo "=============================================="
echo

perguntar DESTINO      "Pasta de destino (será criada se não existir)" "../hub-novo"
perguntar EMPRESA      "Nome da operação/empresa (ex.: Nova Operação)"
perguntar ORG_GITHUB   "Organização no GitHub (ex.: novaop)"
perguntar REPO         "Nome do repositório (ex.: novaop)"
perguntar TIME_VERCEL  "Slug do time na Vercel" "$ORG_GITHUB"
perguntar DOMINIO      "Domínio da operação (ex.: novaop.com.br)"
perguntar EMAIL_ADMIN  "E-mail do admin (ex.: admin@$DOMINIO)" "admin@$DOMINIO"

# slug da empresa, para a pasta interna
EMPRESA_SLUG="$(printf '%s' "$EMPRESA" \
  | tr '[:upper:]' '[:lower:]' \
  | iconv -f UTF-8 -t ASCII//TRANSLIT 2>/dev/null || printf '%s' "$EMPRESA" | tr '[:upper:]' '[:lower:]')"
EMPRESA_SLUG="$(printf '%s' "$EMPRESA_SLUG" | sed -e 's/[^a-z0-9]\+/-/g' -e 's/^-//' -e 's/-$//')"
perguntar PASTA_INTERNO "Pasta do interno em clientes/" "0-interno-$EMPRESA_SLUG"

echo
echo "Resumo:"
echo "  destino .......... $DESTINO"
echo "  empresa .......... $EMPRESA"
echo "  github ........... $ORG_GITHUB/$REPO"
echo "  time vercel ...... $TIME_VERCEL"
echo "  domínio .......... $DOMINIO"
echo "  admin ............ $EMAIL_ADMIN"
echo "  pasta interna .... clientes/$PASTA_INTERNO/"
echo
if [ -t 0 ]; then
  read -r -p "Confirma? [s/N] " ok
  case "$ok" in s|S|sim|SIM) ;; *) echo "Cancelado."; exit 0 ;; esac
fi

# ------------------------------------------------------------------- copiar --
mkdir -p "$DESTINO"
if [ -n "$(ls -A "$DESTINO" 2>/dev/null | grep -v '^\.git$' || true)" ]; then
  echo "ERRO: $DESTINO não está vazio. Escolha uma pasta vazia (ou só com .git)." >&2
  exit 1
fi

cp -R "$BASE_DIR/." "$DESTINO/"
echo "✓ estrutura base copiada"

# --------------------------------------------------------------- substituir --
escapar() { printf '%s' "$1" | sed -e 's/[\\&|]/\\&/g'; }

substituir() {
  local chave="$1" valor
  valor="$(escapar "$2")"
  # -print0/-0 para tolerar espaço no caminho; só arquivos de texto
  find "$DESTINO" -type f \
    \( -name '*.md' -o -name '*.modelo' -o -name '.gitignore' \) -print0 \
    | xargs -0 -r sed -i "s|{{$chave}}|$valor|g"
}

substituir EMPRESA        "$EMPRESA"
substituir ORG_GITHUB     "$ORG_GITHUB"
substituir REPO           "$REPO"
substituir TIME_VERCEL    "$TIME_VERCEL"
substituir DOMINIO        "$DOMINIO"
substituir EMAIL_ADMIN    "$EMAIL_ADMIN"
substituir PASTA_INTERNO  "$PASTA_INTERNO"
echo "✓ placeholders substituídos"

# ------------------------------------------------------------ pastas do hub --
mkdir -p "$DESTINO/clientes/$PASTA_INTERNO"
cat > "$DESTINO/clientes/$PASTA_INTERNO/README.md" <<EOF
# Interno — $EMPRESA

Ações e materiais da própria $EMPRESA (marca, comercial, processos, site).
Fica no topo da lista de clientes pelo prefixo \`0-\`.

## Estrutura sugerida

- \`marca/\`      — logo, brandbook, paleta, fontes
- \`comercial/\`  — propostas, apresentações, argumentário
- \`processos/\`  — documentos internos de operação
EOF
echo "✓ clientes/$PASTA_INTERNO/ criado"

# ------------------------------------------------------------------ conferir --
restantes="$(grep -rl '{{[A-Z_]*}}' "$DESTINO" 2>/dev/null || true)"
if [ -n "$restantes" ]; then
  echo
  echo "ATENÇÃO: sobraram placeholders nestes arquivos (revise à mão):"
  printf '%s\n' "$restantes"
fi

# -------------------------------------------------------------------- final --
cat <<EOF

==============================================
 Pronto. Estrutura criada em: $DESTINO
==============================================

Próximos passos:

  1. Criar a organização e o repositório no GitHub
     → docs/02-github.md

  2. Subir a estrutura:
       cd "$DESTINO"
       git init -b main
       git add -A
       git commit -m "Estrutura inicial do hub"
       git remote add origin https://github.com/$ORG_GITHUB/$REPO.git
       git push -u origin main

  3. Proteger a main, ligar secret scanning e instalar o app do Claude
     → docs/02-github.md, seções 5 a 7

  4. Criar o ambiente no Claude Code apontando para o repositório
     → docs/03-claude-code.md

  5. Criar o time na Vercel e o Drive Compartilhado
     → docs/04-vercel.md e docs/05-google-workspace.md

  6. Trazer os prompts e skills da operação existente (opcional):
       ./scripts/copiar-inteligencia.sh <hub-existente> "$DESTINO"

  7. Preencher as tabelas de comandos/skills em prompts/README.md
     e docs/COMO-USAR.md

EOF
