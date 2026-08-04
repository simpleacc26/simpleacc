#!/usr/bin/env bash
# Gera o site estático oficial do funil ÚNICOS a partir dos fragmentos do GHL.
# Os ghl/*.html são fragmentos (entram num bloco de código do GHL, sem <head>).
# Para rodar sozinhos (Vercel), cada um é embrulhado num HTML completo com
# charset/viewport/title. O quiz aponta POS_URL para /agendamento (mesma origem).
#
# Uso:  ./build-site.sh [PASTA_DE_SAIDA]   (default: ./site)
set -euo pipefail
DIR="$(cd "$(dirname "$0")" && pwd)"
OUT="${1:-$DIR/site}"
rm -rf "$OUT"; mkdir -p "$OUT"

wrap() { # title  src_fragment  dest  [pos_url]
  local title="$1" src="$2" dest="$3" posurl="${4:-}"
  {
    printf '%s\n' '<!DOCTYPE html><html lang="pt-BR"><head>'
    printf '%s\n' '<meta charset="utf-8">'
    printf '%s\n' '<meta name="viewport" content="width=device-width,initial-scale=1">'
    printf '<title>%s</title>\n' "$title"
    printf '%s\n' '</head><body>'
    if [ -n "$posurl" ]; then
      sed "s#PREENCHER_URL_DA_PAGINA_POS_DIAGNOSTICO#${posurl}#" "$src"
    else
      cat "$src"
    fi
    printf '%s\n' '</body></html>'
  } > "$dest"
}

wrap "Diagnóstico de Maturidade do Negócio — ÚNICOS" \
     "$DIR/diagnostico.html" "$OUT/index.html" "/agendamento"
wrap "Sua Sessão Estratégica — ÚNICOS" \
     "$DIR/pos-diagnostico.html" "$OUT/agendamento.html"

# Páginas de validação (docs já são HTML completo) — preserva os links que já
# foram compartilhados com o cliente: /funil, /proposta, /quiz.
DOCS="$DIR/../docs"
[ -f "$DOCS/teste-funil-completo.html" ] && cp "$DOCS/teste-funil-completo.html" "$OUT/funil.html"
[ -f "$DOCS/proposta-v3-pronta.html" ]   && cp "$DOCS/proposta-v3-pronta.html"   "$OUT/proposta.html"
[ -f "$DOCS/quiz-v3-detalhado.html" ]    && cp "$DOCS/quiz-v3-detalhado.html"    "$OUT/quiz.html"

# Documento do diagnóstico (Estágio 2) enviado no 1º contato do WhatsApp (GHL).
[ -f "$DOCS/diagnostico-estagio-2.pdf" ] && cp "$DOCS/diagnostico-estagio-2.pdf" "$OUT/diagnostico-estagio-2.pdf"

cat > "$OUT/vercel.json" <<'JSON'
{ "cleanUrls": true, "trailingSlash": false }
JSON

echo "Site gerado em: $OUT"
ls -la "$OUT"
