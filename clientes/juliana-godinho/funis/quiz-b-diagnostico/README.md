# Quiz B — Diagnóstico · Ju Godinho

Protótipo navegável do Quiz B, para validação interna e com a cliente antes da
implementação definitiva.

**No ar:** https://quiz-ju-godinho.vercel.app

## O que é

As seis perguntas do Quiz B com o roteamento funcionando de ponta a ponta:
corte de escopo, definição do quadro clínico e escolha da oferta.

A especificação completa (por que cada pergunta existe, os quadros, os laudos e
a copy dos anúncios) está em
`../../estrategia/2026-08-10-reestruturacao-quiz-b-v2.html`.

## Lógica implementada

| Ponto | Regra |
| --- | --- |
| **Corte de escopo** | P1 (carro-chefe). "Nenhuma dessas" encerra o quiz com a tela de fora do escopo. |
| **Quadro clínico** | P2 (cena da última semana) define Q1, Q2, Q3 ou Q4. |
| **Rota da oferta** | P6 (faturamento). Até R$ 10 mil vai para o EDP; acima de R$ 10 mil vai para a mentoria. |
| **Sinal, sem efeito na rota** | P3 (quem atende), P4 (margem) e P5 (o que já fez). Alimentam o laudo. |

A tela de resultado mostra um **bloco de teste** com o quadro, a rota e todas as
respostas, para conferir a lógica. Esse bloco não vai para a versão final.

## O que ainda NÃO existe

- Integração com CRM ou planilha de leads. O formulário não envia nada.
- Identidade visual da Ju. Está com a paleta do documento de proposta
  (porcelana e eucalipto) como placeholder, aguardando logo, cores e fontes.
- Página pós-quiz completa, PDF do laudo e disparo de WhatsApp.
- Pixel, UTMs e rastreamento.

## Como rodar local

Arquivo único, sem build e sem dependência.

```bash
cd clientes/juliana-godinho/funis/quiz-b-diagnostico
python3 -m http.server 8000
# abre http://localhost:8000
```

## Deploy

Vercel, projeto `quiz-ju-godinho`, na conta/time **Simple Acc**
(`team_bD5dst9eSAc4qVaaynXWifXr`). Deploy feito por API a partir desta pasta.

Para republicar depois de editar o `index.html`, use um token da Vercel por
variável de ambiente. **Nunca** coloque token em arquivo do repositório.

```bash
export VERCEL_TOKEN=...   # token da conta da Simple, nunca commitado
python3 - <<'PY' > /tmp/payload.json
import json
html = open('index.html', encoding='utf-8').read()
print(json.dumps({
  "name": "quiz-ju-godinho",
  "target": "production",
  "projectSettings": {"framework": None},
  "files": [{"file": "index.html", "data": html, "encoding": "utf-8"}],
}))
PY
curl -s -X POST -H "Authorization: Bearer $VERCEL_TOKEN" \
  -H "Content-Type: application/json" --data-binary @/tmp/payload.json \
  "https://api.vercel.com/v13/deployments?teamId=team_bD5dst9eSAc4qVaaynXWifXr&skipAutoDetectionConfirmation=1"
```

## Contatos

| Papel | Quem |
| --- | --- |
| Cliente | Juliana Godinho |
| Conta na Simple | Renan Martini |
| Comercial da cliente | 1 SDR + 1 closer |
