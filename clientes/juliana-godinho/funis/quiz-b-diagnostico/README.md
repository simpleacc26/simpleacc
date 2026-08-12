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

## Identidade

Extraída do quiz que ela já tem no ar em `quiz.julianagodinho.com.br`:
ouro **`#C9A84C`**, fundo quente claro, cartões brancos, Inter.

Aqui o tratamento é mais premium, sem virar cópia: fundo mais fechado
(`#F4F2ED`), chrome em espresso `#171412` com filete dourado, cantos de 4px no
lugar de 14px, ouro usado como filete e acento em vez de preenchimento, e
**Cormorant Garamond** nas perguntas com a pilha de sistema na interface. O
losango dourado substitui o radio redondo.

A fonte está **embutida como data URI** (variável, 37 KB, subset latino), para
respeitar a regra de zero dependência externa do playbook. Não há Google Fonts
nem CDN.

## Lógica implementada

| Ponto | Regra |
| --- | --- |
| **Corte de escopo** | P1 (carro-chefe). "Nenhuma dessas" encerra o quiz com a tela de fora do escopo. |
| **Quadro clínico** | P2 (cena da última semana) define Q1, Q2, Q3 ou Q4. |
| **Rota da oferta** | P6 (faturamento). Até R$ 10 mil vai para o EDP; acima de R$ 10 mil vai para a mentoria. |
| **Sinal, sem efeito na rota** | P3 (quem atende), P4 (margem) e P5 (o que já fez). Alimentam o laudo. |

A tela de resultado mostra um **bloco de teste** com o quadro, a rota e todas as
respostas, para conferir a lógica. Esse bloco não vai para a versão final.

## Como o laudo é personalizado

Segue o padrão da casa (`.claude/skills/gerar-quiz-diag-pag-pos-quiz`): **cada
opção carrega uma frase de laudo** no campo `r`, e o texto final é montado com
as respostas reais. Não são quatro laudos fixos.

| Bloco do laudo | De onde vem |
| --- | --- |
| Título, o gargalo nomeado | P2 (cena) define o quadro |
| "O que eu vi nas suas respostas" | P1 (carro-chefe) + P3 (quem atende) + P4 (margem), costurados numa frase |
| "Por que isso está acontecendo" | Texto do quadro |
| "Por que o que você já tentou não resolveu" | P5, um parágrafo por item marcado. Some se ela não marcar nada |
| "O que precisa mudar" | Caminho do quadro |
| "E não é falta de técnica" | Fixo, adaptado da VSL da Ju |
| "Os quatro pilares" | Fixos, da página de vendas. O pilar de partida vem do quadro |
| "O que acontece na sessão estratégica" | Fixo, da página de vendas |
| "O seu próximo passo" | P6 define mentoria ou EDP |

Combinando os eixos, são **mais de 3.800 laudos possíveis**, e nenhum lead lê o
mesmo texto que outro com respostas diferentes.

## Captura

Nome, WhatsApp e e-mail são **os três obrigatórios**. Máscara
`(XX) XXXXX-XXXX` no telefone, validação de formato no e-mail, mensagem de erro
por campo com `aria-live` e foco no primeiro campo inválido. As **UTMs** da URL
são capturadas e viajam junto do lead.

## O que ainda NÃO existe

- Integração com CRM ou planilha de leads. O formulário valida, mas não envia.
- `sessionStorage` para retomar de onde parou, que o playbook pede.
- **Logo** da Ju. A marca está como lockup tipográfico até chegar o arquivo.
- Página pós-quiz completa, PDF do laudo e disparo de WhatsApp.
- Pixel e rastreamento (as UTMs já são capturadas).

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
