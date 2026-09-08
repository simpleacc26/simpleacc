#!/usr/bin/env bash
# Publica o funil na Vercel (projeto quiz-ju-godinho, time Simple Acc).
#
#   export VERCEL_TOKEN=...        # token da conta da Simple. NUNCA commitar.
#   ./deploy.sh                    # produção
#   ./deploy.sh preview            # URL de preview, não mexe no domínio limpo
#
# Envia a pasta inteira. O snippet antigo do README mandava só o index.html —
# como cada deploy da Vercel é um snapshot completo e imutável, aquilo apagava
# o diagnostico.html e as cinco imagens do ar.

set -euo pipefail

TEAM="team_bD5dst9eSAc4qVaaynXWifXr"
PROJECT="quiz-ju-godinho"
TARGET="${1:-production}"

cd "$(dirname "$0")"

if [ -z "${VERCEL_TOKEN:-}" ]; then
  echo "erro: exporte VERCEL_TOKEN antes de rodar." >&2
  exit 1
fi

PAYLOAD="$(mktemp)"
trap 'rm -f "$PAYLOAD"' EXIT

python3 - "$PROJECT" "$TARGET" > "$PAYLOAD" <<'PY'
import base64, json, pathlib, sys

projeto, target = sys.argv[1], sys.argv[2]
# tudo que o site precisa; o que é ferramenta de repo fica de fora
ignorar = {"README.md", "deploy.sh"}
arquivos = []

for p in sorted(pathlib.Path(".").iterdir()):
    if not p.is_file() or p.name in ignorar or p.name.startswith("."):
        continue
    dados = p.read_bytes()
    if p.suffix.lower() in {".html", ".css", ".js", ".json", ".svg", ".txt"}:
        arquivos.append({"file": p.name, "data": dados.decode("utf-8"),
                         "encoding": "utf-8"})
    else:
        arquivos.append({"file": p.name,
                         "data": base64.b64encode(dados).decode("ascii"),
                         "encoding": "base64"})

if not any(a["file"] == "index.html" for a in arquivos):
    sys.exit("erro: index.html não encontrado na pasta.")

print(json.dumps({"name": projeto, "target": target,
                  "projectSettings": {"framework": None},
                  "files": arquivos}))
PY

echo "enviando $(python3 -c 'import json,sys; print(len(json.load(open(sys.argv[1]))["files"]))' "$PAYLOAD") arquivos para $TARGET..."

# forceNew=1: sem isso a Vercel reaproveita um deploy anterior de mesmo
# conteúdo e o domínio limpo continua servindo a versão velha.
RESP="$(curl -sS -X POST \
  -H "Authorization: Bearer $VERCEL_TOKEN" \
  -H "Content-Type: application/json" \
  --data-binary @"$PAYLOAD" \
  "https://api.vercel.com/v13/deployments?teamId=$TEAM&skipAutoDetectionConfirmation=1&forceNew=1")"

python3 - "$RESP" <<'PY'
import json, sys
r = json.loads(sys.argv[1])
if "error" in r:
    sys.exit("falhou: " + r["error"].get("message", str(r["error"])))
print("ok:", r.get("url", "?"))
print("acompanhe em https://vercel.com/simpleacc/quiz-ju-godinho")
PY
