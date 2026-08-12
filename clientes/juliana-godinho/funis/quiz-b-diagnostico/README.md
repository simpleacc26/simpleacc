# Quiz B — Diagnóstico · Ju Godinho

Protótipo navegável do Quiz B, para validação interna e com a cliente antes da
implementação definitiva.

**No ar:**
- Quiz: https://quiz-ju-godinho.vercel.app
- Página do diagnóstico: https://quiz-ju-godinho.vercel.app/diagnostico.html

Dois arquivos. O quiz salva as respostas no `sessionStorage` e leva para a
página do diagnóstico, que monta o texto a partir delas. Quem abre a página
direto, sem ter respondido, cai numa tela que convida a responder.

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

## Estrutura da página do diagnóstico

Abre com o laudo personalizado e depois herda os blocos já validados na página
de vendas dela, nesta ordem:

1. **Cabeçalho escuro** com o gargalo nomeado
2. **O laudo** — o que vi nas respostas, por que acontece, por que o que ela
   já tentou não resolveu, e "não é falta de técnica" (adaptado da VSL)
3. **Os 4 pilares** em cards, com o pilar de partida dela destacado em dourado
4. **A sessão estratégica** em bloco escuro, com os 3 cards e o CTA
5. **Prova social** — os quatro prints reais de mentoradas, em duas colunas
6. **Autoridade** — retrato, bio, credenciais. É o bloco que faltava
7. **FAQ** — as 6 perguntas da página dela
8. **Fechamento** — os 3 "pare de" e o CTA final

**Seis CTAs**, um por quebra da página: depois do laudo, depois dos pilares,
dentro do bloco da sessão, depois da prova social, depois da autoridade e no
fechamento. Todos apontam para o mesmo WhatsApp, com rótulos diferentes para não
soarem repetitivos. No mobile viram botão de largura cheia.

A copy do laudo usa `<strong>` nas frases que carregam o diagnóstico e quebras
de parágrafo a cada ideia, para o texto não virar mancha no celular. Por isso a
copy própria não passa por `esc()` na montagem; só o dado do lead (nome,
telefone, e-mail) continua escapado.

> **Negrito em bloco escuro.** A regra global é `strong{color:var(--ink)}`, que é
> quase preto. Nos blocos escuros (`.head`, `.sessao`, `.fim`) o negrito precisa
> **clarear**, nunca escurecer, senão a frase destacada some no fundo. Já existe
> regra para os três blocos e para o `.kick`. **Ao criar um bloco escuro novo,
> inclua o `strong` dele nessa lista** e confira também no `@media print`, onde
> o fundo vira branco e a cor tem de voltar a ser escura.

## Prova social

Quatro prints reais de mentoradas (`prova-1` a `prova-4`), vindos da pasta do
Drive da conta. Foram **recortados** para tirar a margem morta da captura e, no
caso do `prova-4`, um pedaço de outra imagem que aparecia cortado no topo.

Cada print tem uma legenda curta com o resultado, para quem passa o olho sem
parar para ler a conversa, e um `alt` com o teor da mensagem. O layout é de duas
colunas explícitas (não `columns`, que desequilibrava), distribuídas para as
duas terminarem na mesma altura; no celular vira coluna única.

Tem botão **Baixar em PDF** (`window.print()` com `@media print` que esconde
chrome, FAQ e CTAs), então o mesmo laudo serve de anexo para a cadência da SDR.

## O que ainda NÃO existe

- Integração com CRM ou planilha de leads. O formulário valida, mas não envia.
- `sessionStorage` para retomar de onde parou, que o playbook pede.
- **Logo** da Ju. A marca está como lockup tipográfico até chegar o arquivo.
- **Foto em resolução maior.** A que está no ar (`ju.png`, 312x391) veio de uma
  captura de tela e serve bem no protótipo, mas fica macia em tela retina.
  Para produção, pedir o arquivo original e trocar o mesmo `ju.png`.
- **Acentos no display.** A Cormorant Garamond desenha os acentos muito altos e
  fora de eixo: "clínica" sai com o agudo sobre o "l" e "Você" sai com o
  circunflexo solto. Não é defeito do arquivo (o woff2 embutido é
  byte a byte o que o Google Fonts serve, e o desenho é igual em todos os pesos
  de 300 a 700), é o desenho da fonte. Numa página inteira em português isso
  aparece em quase todo título. **Decisão da conta:** trocar a fonte de display
  por uma com acentuação correta (EB Garamond fica no mesmo gênero) ou aceitar.
- **Conferir o número do WhatsApp.** Os CTAs apontam para
  `wa.me/553192744259`, montado a partir do número informado
  (+55 31 9274-4259). Esse número tem 8 dígitos depois do DDD, e celular no
  Brasil tem 9. Se for celular, o certo é `5531992744259`. **Abrir o link e
  confirmar antes de rodar tráfego.**
- Página pós-quiz completa, PDF do laudo e disparo de WhatsApp.
- Pixel e rastreamento (as UTMs já são capturadas).

## Assets

| Arquivo | O que é |
| --- | --- |
| `ju.png` | Retrato da Ju usado na seção de autoridade. Origem: pasta `2. Material Visual` no Drive da conta. Servido como arquivo, não embutido, para não inchar o HTML. |
| `prova-1.png` | Print: "batemos 100k mês passado", de quem vendia menos de 15k. |
| `prova-2.png` | Print: 50k numa cidade de 20 mil habitantes. |
| `prova-3.png` | Print: R$ 7 mil fechados em uma semana depois de voltar para a mentoria. |
| `prova-4.png` | Print: subiu o preço da limpeza de pele e do jato de plasma e ninguém desmarcou. |

Os quatro prints vieram da pasta do Drive da conta e estão recortados. **Os
originais sem recorte ficam no Drive** — se precisar refazer o corte, é de lá
que se puxa.

A fonte é o único recurso embutido no HTML, como data URI. Não há chamada a
domínio externo em nenhuma das duas páginas.

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
  "https://api.vercel.com/v13/deployments?teamId=team_bD5dst9eSAc4qVaaynXWifXr&skipAutoDetectionConfirmation=1&forceNew=1"
```

> **Atenção ao publicar.** Sem `forceNew=1`, a Vercel reaproveita um deploy
> anterior de mesmo conteúdo e o domínio limpo continua servindo a versão velha
> do CDN. Depois de publicar, reaponte os dois aliases para o novo deploy:
>
> ```bash
> for A in quiz-ju-godinho.vercel.app quiz-ju-godinho-simpleacc.vercel.app; do
>   curl -s -X POST -H "Authorization: Bearer $VERCEL_TOKEN" \
>     -H "Content-Type: application/json" -d "{\"alias\":\"$A\"}" \
>     "https://api.vercel.com/v2/deployments/<NOVO_DPL_ID>/aliases?teamId=team_bD5dst9eSAc4qVaaynXWifXr"
> done
> ```
>
> Confira o `etag` da resposta contra o `md5sum` do arquivo local antes de dar
> por publicado.

## Contatos

| Papel | Quem |
| --- | --- |
| Cliente | Juliana Godinho |
| Conta na Simple | Renan Martini |
| Comercial da cliente | 1 SDR + 1 closer |
