# Bugs que já quebraram em produção

Cada um destes custou lead perdido ou retrabalho em cliente real. Não são
hipóteses. **Leia antes de escrever a primeira linha do motor.**

---

## 1. O lead que evapora em silêncio (`mode: "no-cors"` + Make)

**O mais caro de todos.** O funil ficou no ar recebendo tráfego e **nenhum lead
chegava na planilha**. Sem erro no navegador, sem erro no Make, sem nada.

### O que acontece

```js
// ERRADO. Foi assim que o lead sumiu.
fetch(LEADS_ENDPOINT, {
  method: "POST", keepalive: true, mode: "no-cors",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(lead),
});
```

Em `mode: "no-cors"` o navegador **descarta silenciosamente** o header
`Content-Type: application/json`. Nesse modo só passam três tipos
(`application/x-www-form-urlencoded`, `multipart/form-data`, `text/plain`).

O POST chega no Make como `text/plain`. O Make responde **200 "Accepted"** e
**joga fora**. Nada na planilha, nada no histórico de execução.

Comprovado lado a lado, mesmo corpo e mesma URL:

| Content-Type | Make responde | Cai na planilha |
| --- | --- | --- |
| `application/json` | 200 | **sim** |
| `text/plain` | 200 `Accepted` | **não** |

### O certo

```js
// Sem mode. O webhook do Make responde ao preflight
// (access-control-allow-origin: * e allow-headers: content-type),
// entao CORS normal funciona e o content-type chega de verdade.
fetch(LEADS_ENDPOINT, {
  method: "POST", keepalive: true,
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(lead),
}).catch(() => {});
```

`keepalive: true` garante que o POST sobreviva ao redirect para o diagnóstico.

### A lição maior, que vale para qualquer integração

**Testar com curl NÃO testa o caminho do navegador.** A integração tinha sido
"validada" com curl e lendo a planilha, e passou, porque curl manda o
content-type certo e passa mesmo com o bug em pé.

> **Validação de integração é responder o quiz inteiro no navegador e depois ler
> a planilha.** Qualquer coisa menos que isso não é validação.

E **nunca valide por status HTTP**: o Make devolve 200 tanto para o que grava
quanto para o que descarta.

**Nota sobre Apps Script:** com Apps Script (`doPost`) o `text/plain` funciona,
e é por isso que o padrão antigo não quebrava. O problema aparece ao migrar para
Make sem tirar o `no-cors`. Se o cliente usa Make, a regra acima é obrigatória.

---

## 2. A máscara de telefone que perdia o número

Bug de produção. Chegava `(55) 11999-9120` na planilha, com o final do número
perdido e **sem conserto**: o lead virava lixo.

### O que acontece

O autofill do iPhone entrega **`+55 11 99991-2039` de uma vez só**. O
`maxLength` do campo cortava a string antes da máscara rodar, e o `55` do código
do país entrava como se fosse DDD.

### As cinco regras

1. **Tire o código do país ANTES de qualquer corte.**
2. **Nunca use `maxLength` em campo mascarado.** Remova no JS:
   `input.removeAttribute("maxlength")`.
3. **Ouça `input`, `change` e `blur`.** Autofill nem sempre dispara `input`.
4. **Normalize também o valor que vai no payload**, não só o que aparece na tela.
5. **Cuidado com o DDD 55** (Santa Maria/RS): é real. Por isso a regra é
   `length > 11 && startsWith("55")`, não `startsWith("55")` sozinho.

```js
function soDigitosTel(v) {
  let d = String(v || "").replace(/\D/g, "");
  if (d.length > 11 && d.startsWith("55")) d = d.slice(2);   // tira o pais ANTES
  return d.slice(0, 11);
}
```

### Teste obrigatório antes de publicar

Cole **`+55 11 99991-2039`** no campo e confirme **duas coisas**: que o campo
mostra `(11) 99991-2039` **e** que é isso que sai no payload. As duas, não só
o campo.

### Não confunda com bug: a validação barrar número é o esperado

Celular brasileiro tem 11 dígitos com 9 no nono. Um teste com `11111-1111` é
barrado **corretamente**. Foram testados 10 celulares reais de DDDs diferentes:
zero falso negativo.

Fica de fora **de propósito** telefone fixo (10 dígitos). Custa o lead raro que
usa WhatsApp Business em número fixo, e é uma troca consciente.

---

## 3. Placeholder de telefone com o DDD do cliente

Estava `(48) 99999-9999`, o DDD da cliente em Santa Catarina.

**O público é nacional.** DDD regional no campo sinaliza atendimento local e
afasta quem é de fora. Use sempre **`(11) 99999-9999`**.

---

## 4. Fonte externa travando a página inteira

`<link rel="stylesheet">` do Google Fonts **bloqueia a renderização**. Se o
Google Fonts demorar ou cair, a página de formulário não abre. Ponto único de
falha por nada.

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=..."
      media="print" onload="this.media='all'" />
<noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=..." /></noscript>
```

Com uma pilha local de fallback no `body`, a página abre igual mesmo sem a fonte
chegar. **Sempre declare o fallback.**

---

## 5. Imagem corrompida em deploy por base64

Deploy pelo MCP manda arquivo embutido em base64 e **pode sair com byte trocado**.
Aconteceu numa foto: **um único byte diferente**, a imagem abria normal no
navegador, e só o SHA256 pegou.

- **Encolha a imagem antes** (foto de bloco de autoridade: 160px basta).
- **Compare o SHA256 de TODOS os arquivos** depois de publicar, não só dos que
  você mexeu.
- Para **binário grande (vídeo), não use o MCP**: use a API REST. Ver
  `deploy-vercel.md`.

---

## 6. Publicação substitui a árvore inteira

A publicação **não faz merge**. Se você mandar 3 arquivos, os outros somem e
viram 404 mudo, sem erro em lugar nenhum.

**Sempre monte a lista com a árvore inteira** e **confira todos os assets com
curl** depois de cada deploy.

---

## 7. A aba da planilha chama "Untitled"

Planilha criada a partir de CSV nasce com a aba chamada **"Untitled"**. O módulo
`addRow` do Make referencia a aba **pelo nome**.

**Renomear quebra o cenário** com `400 Unable to parse range`, e o Make
**desativa o cenário sozinho**, em silêncio. O funil segue no ar, o lead segue
sendo enviado, e ninguém recebe nada.

Não renomeie. Deixe escrito no README do funil.

---

## 8. Data virando número na planilha

Com `valueInputOption: USER_ENTERED`, o Sheets converte `24/08/2026 19:05:33`
para o **serial de data** (`46258,79514`). Se a coluna não tiver formato de
data, é isso que a pessoa vê.

Formate a coluna como data e hora e a de índice como porcentagem. O valor fica
ordenável **e** legível. Confira **abrindo a planilha**, não pelo retorno da API,
que devolve o valor bruto.
