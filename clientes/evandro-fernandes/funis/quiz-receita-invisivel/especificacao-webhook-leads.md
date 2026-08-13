# Especificação técnica do webhook de leads
## Funil "Diagnóstico de Receita Invisível" · Evandro Fernandes (HDM)

Documento para o time técnico do HDM implementar o endpoint que vai receber os
leads do quiz direto no CRM.

---

## STATUS DA CONEXÃO (13/08/2026)

**Endpoint recebido:** `https://n8n.digienge.ai/webhook/quizzreceitainvisivel`

| Verificação | Resultado |
| ----------- | --------- |
| CORS (preflight `OPTIONS`) | **OK.** Responde 204 liberando a origem `https://quiz-evandro-fernandes.vercel.app` e o header `x-api-key`. |
| `POST` com `X-Api-Key` (o curl de exemplo do HDM) | **403** `Authorization data is wrong!` |
| `POST` com `Authorization: Bearer` | 403 |
| `POST` com Basic Auth (chave como usuário ou senha) | 403 |
| `POST` sem autenticação | 403 |

**Diagnóstico:** a resposta vem com o header `www-authenticate: Basic realm="Webhook"`.
Isso indica que o nó de Webhook do n8n está configurado como **Basic Auth**,
enquanto a chave enviada é de **Header Auth**. Por isso nenhuma forma de
autenticação passa, **inclusive o curl de exemplo do próprio HDM**.

**O que resolve, do lado do HDM (qualquer uma das três):**
1. Trocar o nó para **Header Auth** com nome `X-Api-Key` e o valor da chave enviada; ou
2. Manter **Basic Auth** e informar o par usuário e senha; ou
3. Desligar a autenticação do nó (a origem já está travada por CORS).

Assim que ajustarem, a chave entra no funil, republicamos e fazemos o disparo de
teste. O funil já está preparado para os dois formatos.

---

- **Funil:** https://quiz-evandro-fernandes.vercel.app
- **Quem envia:** o próprio funil (JavaScript no navegador do lead)
- **Quando:** no momento em que o lead conclui o formulário final (nome, WhatsApp,
  e-mail), logo antes de ser redirecionado para a página de diagnóstico
- **Volume:** 1 requisição por lead concluído

---

## 1. A requisição

| Item | Valor |
| ---- | ----- |
| Método | `POST` |
| Content-Type | `application/json` (UTF-8) |
| Corpo | JSON único, plano (sem aninhamento) |
| Autenticação | nenhuma por padrão (ver seção 6 se quiser token) |
| Retry | não há. É "fire and forget" |

O envio usa `fetch(..., { keepalive: true })`, então a requisição sobrevive ao
redirecionamento da página. Basta o endpoint responder rápido (qualquer `2xx`).

---

## 2. ATENÇÃO: CORS (é aqui que essa integração costuma quebrar)

A chamada parte do **navegador do lead**, não do nosso servidor. Como o
`Content-Type` é `application/json`, o navegador dispara antes um **preflight
`OPTIONS`**. Se esse preflight falhar, **o POST nunca chega no servidor de
vocês**, silenciosamente.

O endpoint precisa responder ao `OPTIONS` com:

```
Access-Control-Allow-Origin: https://quiz-evandro-fernandes.vercel.app
Access-Control-Allow-Methods: POST, OPTIONS
Access-Control-Allow-Headers: Content-Type
Access-Control-Max-Age: 86400
```

(`Access-Control-Allow-Origin: *` também serve.)

E responder ao `POST` com o mesmo `Access-Control-Allow-Origin` e status `2xx`.

### Alternativa, se preferirem não mexer em CORS

Se for mais simples do lado de vocês, a gente troca o envio para
`Content-Type: text/plain;charset=utf-8`. Nesse caso o navegador **não faz
preflight** e o POST chega sempre, independente de CORS. O corpo continua sendo
exatamente o mesmo JSON: basta o endpoint fazer o parse do body como JSON,
ignorando o header. É só avisar qual das duas opções vocês preferem.

---

## 3. Payload (exemplo real)

```json
{
  "data": "2026-07-29T23:55:28.700Z",
  "nome": "Carlos Mendes",
  "whatsapp": "(11) 98888-7777",
  "email": "carlos@empresa.com.br",
  "situacao": "Cada área trabalha com o próprio número, em ferramentas separadas",
  "problema": "Oportunidade que morre no comercial sem follow-up",
  "implicacao": "Com a margem apertando e o CAC subindo",
  "necessidade": "Mais tráfego ou trocar de gestor",
  "objetivo": "Reduzir o custo de aquisição sem perder volume",
  "perfil": "Dono ou CEO",
  "qualificacao": "De R$ 300 mil a 1 milhão por mês",
  "qualificado": "qualificado",
  "frente": "Receita Invisível",
  "origem": "https://quiz-evandro-fernandes.vercel.app/?utm_source=meta",
  "utm_source": "meta",
  "utm_medium": "cpc",
  "utm_campaign": "receita-invisivel",
  "utm_content": "criativo-dor",
  "utm_term": "3-funis"
}
```

Todos os campos são **string**. Campos sem valor chegam como **string vazia**
(`""`), nunca como `null` e nunca ausentes. Ou seja, a estrutura é sempre a
mesma, com as 19 chaves.

---

## 4. Dicionário de campos

| Campo | Descrição | Exemplo |
| ----- | --------- | ------- |
| `data` | Data/hora do envio, ISO 8601 em **UTC** | `2026-07-29T23:55:28.700Z` |
| `nome` | Nome digitado pelo lead | `Carlos Mendes` |
| `whatsapp` | Telefone **com máscara brasileira** | `(11) 98888-7777` |
| `email` | E-mail (validado no formulário) | `carlos@empresa.com.br` |
| `situacao` | Resposta P1 (como os dados conversam hoje) | ver seção 5 |
| `problema` | Resposta P2 (o que trava o resultado) | ver seção 5 |
| `implicacao` | Resposta P3 (cenário em 12 meses) | ver seção 5 |
| `necessidade` | Resposta P4 (o que já tentou) | ver seção 5 |
| `objetivo` | Resposta P5 (meta para 6 meses) | ver seção 5 |
| `perfil` | Resposta P6 (papel na empresa) | ver seção 5 |
| `qualificacao` | Resposta P7 (faturamento mensal) | ver seção 5 |
| `qualificado` | Classificação automática: `qualificado` ou `nutrir` | `qualificado` |
| `frente` | Identificador do funil (fixo) | `Receita Invisível` |
| `origem` | Referrer ou URL completa de onde o lead veio | URL |
| `utm_source` | UTM capturada da URL do anúncio | `meta` |
| `utm_medium` | UTM | `cpc` |
| `utm_campaign` | UTM | `receita-invisivel` |
| `utm_content` | UTM | `criativo-dor` |
| `utm_term` | UTM | `3-funis` |

**Sobre o `whatsapp`:** vai formatado como o lead digitou, com máscara
(`(11) 98888-7777`). Se o CRM precisar de E.164 (`+5511988887777`), basta
normalizar removendo os não dígitos e prefixando `55`. Se preferirem, a gente já
manda normalizado do nosso lado: é só pedir.

---

## 5. Valores possíveis de cada resposta

Os campos de resposta chegam com o **texto exato** da alternativa escolhida. São
sempre uma destas quatro opções por pergunta:

**`situacao`** (como Marketing, Comercial e CS conversam hoje)
1. `Cada área trabalha com o próprio número, em ferramentas separadas`
2. `Tenho um CRM, mas marketing e CS ficam de fora`
3. `Junto na mão, com planilhas e WhatsApp`
4. `Não sei ao certo onde estão os dados`

**`problema`** (o que mais trava o resultado)
1. `Lead caro que chega e não vira cliente`
2. `Oportunidade que morre no comercial sem follow-up`
3. `Cliente que cancela no CS sem aviso`
4. `Sei que perco receita, mas não sei onde`

**`implicacao`** (cenário em 12 meses se nada mudar)
1. `Investindo mais em tráfego para o mesmo resultado`
2. `Com a margem apertando e o CAC subindo`
3. `Não sei, e isso me incomoda`
4. `Crescendo, mas queimando caixa que não precisava`

**`necessidade`** (o que já tentou)
1. `Mais tráfego ou trocar de gestor`
2. `Implantar um CRM ou ferramenta de dados`
3. `Consultoria ou treinamento de vendas`
4. `Ainda não tentei nada estruturado`

**`objetivo`** (o que mais quer nos próximos 6 meses)
1. `Reduzir o custo de aquisição sem perder volume`
2. `Aumentar a conversão do comercial`
3. `Reduzir o churn e aumentar o LTV`
4. `Previsibilidade e decidir por dado, não por achismo`

**`perfil`** (papel na empresa)
1. `Dono ou CEO`
2. `Sócio`
3. `Diretor comercial ou de marketing`
4. `Gestor ou coordenador`

**`qualificacao`** (faturamento mensal)
1. `Até R$ 100 mil por mês`
2. `De R$ 100 a 300 mil por mês`
3. `De R$ 300 mil a 1 milhão por mês`
4. `Acima de R$ 1 milhão por mês`

### Regra do campo `qualificado`

| Resposta em `qualificacao` | `qualificado` | Destino comercial |
| -------------------------- | ------------- | ----------------- |
| Até R$ 100 mil por mês | `nutrir` | plataforma / entrada |
| De R$ 100 a 300 mil por mês | `nutrir` | plataforma / entrada |
| De R$ 300 mil a 1 milhão por mês | `qualificado` | sessão estratégica |
| Acima de R$ 1 milhão por mês | `qualificado` | sessão estratégica |

> **Recomendação técnica:** o CRM deve fazer o roteamento pelo campo
> `qualificado`, **não** pelo texto do `qualificacao`. O texto é copy e pode ser
> ajustado em testes de conversão; o `qualificado` é contrato estável.

---

## 6. Opcionais (é só pedir que a gente ajusta)

Nada disso está ativo hoje. Todos são rápidos de implementar do nosso lado:

1. **Códigos estáveis além do texto.** Podemos enviar junto um objeto com os
   códigos internos de cada resposta (ex.: `"problema_cod": "morre-comercial"`),
   que nunca mudam mesmo se a copy for reescrita. **Recomendado** se o CRM for
   fazer automação em cima das respostas.
2. **Token de autenticação.** Header fixo (ex.: `X-Api-Key: <token>`) ou o token
   na query string da URL do webhook. Lembrando: como a chamada sai do
   navegador, o token fica visível no código da página, então ele serve para
   filtrar ruído, não como segredo forte.
3. **`lead_id` único** (UUID por envio) para deduplicação do lado de vocês.
4. **Telefone normalizado** em E.164 (`+5511988887777`).
5. **Envio duplo:** mandar o mesmo lead para o CRM de vocês **e** para a nossa
   planilha de backup, em paralelo. Recomendado no começo, para conferência.

---

## 7. Como ligar

1. Vocês criam o endpoint e mandam a **URL completa** (`https://...`).
2. A gente troca a URL no funil e republica (leva minutos).
3. Fazemos **um lead de teste juntos** e vocês confirmam que caiu no CRM, com as
   respostas e as UTMs preenchidas.
4. Só depois disso o tráfego sobe.

**Contato técnico do nosso lado:** Simple Acc (Daniel Souza).

---

## 8. Observação de LGPD

O quiz coleta nome, WhatsApp e e-mail com consentimento explícito na tela de
captura, informando que os dados serão usados para enviar o diagnóstico e o
contato comercial. O tratamento a partir do recebimento no CRM fica sob
responsabilidade do controlador (HDM).
