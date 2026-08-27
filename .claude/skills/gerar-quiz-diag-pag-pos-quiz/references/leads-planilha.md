# Planilha de leads + integração pelo Make

Meta: cada lead cai sozinho numa planilha no Drive do cliente, na hora.
**Entregue só depois de testar pelo navegador.**

---

## 1. A planilha

Crie um Google Sheets na pasta do cliente (MCP do Drive, `create_file` com
`contentMimeType: text/csv` e o cabeçalho; o Drive converte).

Colunas, nesta ordem:

```
Data/Hora · Nome · WhatsApp · E-mail · Índice · Faixa · Pilar dominante ·
Resultado · Qualificação · [as 9 respostas por extenso] · Frente · Origem ·
Página · UTM Source · UTM Medium · UTM Campaign · UTM Content · UTM Term
```

**Resultado** e **Qualificação** não são opcionais: são o que transforma a
planilha em roteiro de atendimento. Ver `ajustes-validados.md`.

### Formate duas colunas depois de criar
- **Data/Hora** como data e hora. Sem isso, `USER_ENTERED` grava o serial e a
  pessoa vê `46258,79514`.
- **Índice** como porcentagem.

Confira **abrindo a planilha**, não pelo retorno da API, que devolve o bruto.

---

## 2. Cenário no Make

**Webhook instantâneo → Google Sheets `addRow`.** Só isso.

- **NUNCA** use gatilho de polling ou agendamento: queima crédito parado.
- Instantâneo custa **2 operações por lead**, sem varredura.
- Nomeie o cenário `[Cliente] <Frente> → Sheets`.

### Três coisas que quebram se alguém mexer

1. **A aba chama "Untitled"** (nome de nascença de planilha criada de CSV) e o
   `addRow` referencia a aba **pelo nome**. Renomear quebra com
   `400 Unable to parse range` e **o Make desativa o cenário sozinho**, em
   silêncio. Deixe escrito no README.
2. **O mapeamento é por posição**, não por cabeçalho. Inserir coluna no meio
   desalinha tudo.
3. **A conexão do Google precisa existir antes** no Make.

---

## 3. Ligar no funil

`const LEADS_ENDPOINT = "<url do webhook>";` no `app.js` e republicar.

```js
fetch(LEADS_ENDPOINT, {
  method: "POST", keepalive: true,
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(lead),
}).catch(() => {});
```

> ⚠️ **NUNCA ponha `mode: "no-cors"` aqui.** É o bug que faz o lead evaporar em
> silêncio. Leia `bugs-que-ja-quebraram.md`, item 1, antes de mexer nesta função.

---

## 4. Testar (o passo que não pode ser pulado)

**Responda o quiz inteiro no navegador**, de ponta a ponta, abrindo com UTMs:

```
https://<url>/?utm_source=teste&utm_medium=cpc&utm_campaign=teste
```

Depois **leia a planilha** e confirme que a linha apareceu, com nome, WhatsApp
formatado, e-mail, as 9 respostas, índice, resultado, qualificação e as 5 UTMs.

**Três coisas que NÃO são teste:**

- **Testar com curl.** Curl manda o content-type certo e passa mesmo com o bug
  em pé. Foi assim que o bug do `no-cors` sobreviveu à "validação".
- **Olhar o status HTTP.** O Make devolve 200 tanto para o que grava quanto para
  o que descarta.
- **Olhar o histórico do Make.** O que ele descarta no webhook não aparece lá.

Só diga "pronto" depois de ver a linha na planilha. **Apague a linha de teste**
antes de subir tráfego.

---

## Alternativa: Apps Script

Para cliente sem Make. `doPost(e)` grava, `ensureHeader()` corrige o cabeçalho.
A autorização do Google é do usuário, não sua: ele abre a planilha, cola o `.gs`,
implanta como App da Web com acesso "Qualquer pessoa", autoriza e te manda a URL
`/exec`.

Com Apps Script o `text/plain` funciona, então o `no-cors` não quebra. Mesmo
assim, **mantenha o padrão sem `no-cors`**: o dia em que migrar para Make, não
quebra.
