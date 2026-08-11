# Migrar o funil do Gustavo Ono (quiz + relatório) da Vercel pro GoHighLevel

Objetivo: hospedar as duas páginas dentro do GHL, no domínio próprio do Gustavo,
mantendo o **mesmo design**, a **lógica de diagnóstico por pilar** e o
**roteamento de rotas aprovado em 07/08** (proposta em
`estrategia/2026-08-07-proposta-ajustes-funil.html`).

Isso resolve duas coisas de uma vez: o **connect rate de 46,8%** (metade de quem
clica no anúncio nunca carrega a página, provavelmente por rodar num endereço
genérico da Vercel) e a **instabilidade do número de WhatsApp**, já que o
atendimento passa a sair do número oficial ligado ao CRM.

## Arquivos desta pasta

| Arquivo | O que é |
|---|---|
| `quiz-ghl-embed.html` | **Cole isto no GHL.** Passo 1 do funil. |
| `relatorio-ghl-embed.html` | **Cole isto no GHL.** Passo 2 do funil. |
| `src/quiz.html` | Fonte legível do quiz. É aqui que se edita. |
| `src/relatorio.html` | Fonte legível do relatório. É aqui que se edita. |
| `build-ascii.py` | Gera os dois embeds a partir de `src/`. |

Os embeds já vêm sem `<html>/<head>/<body>`: são `<link>` + `<style>` +
conteúdo + `<script>`, no formato que o elemento **Custom Code / HTML** do GHL
espera.

> **Nunca edite os `*-ghl-embed.html` na mão.** Edite os arquivos em `src/` e
> rode `python3 build-ascii.py`. O motivo está no final deste documento.

---

## Passo 1 — Criar o funil e os 2 passos

1. No GHL: **Sites → Funnels → New Funnel**. Nome sugerido: `Gustavo Ono - Quiz Diagnostico`.
2. Crie **2 steps**, nesta ordem, com estes paths:
   - Step 1 — path `quiz`
   - Step 2 — path `relatorio`
3. Em cada step, apague as seções padrão e deixe **uma seção full-width, sem
   padding** (Section settings → Width: Full, Padding: 0). Sem isso sobra
   margem em volta da página.

Os paths precisam ser exatamente `quiz` e `relatorio`: o código navega entre os
passos por caminho relativo, então funciona em qualquer domínio sem precisar
editar nada, mas depende desses dois nomes.

## Passo 2 — Colar o código

Para cada step: arraste um elemento **Custom Code** para dentro da seção, abra e
**cole o conteúdo inteiro** do arquivo correspondente. Cole de uma vez, não corte
no meio.

| Step | Arquivo |
|---|---|
| `/quiz` | `quiz-ghl-embed.html` |
| `/relatorio` | `relatorio-ghl-embed.html` |

> O GHL só executa o JavaScript na **página publicada**, não no preview do
> editor. Se no editor parecer parado, publique e teste na URL real.

## Passo 3 — Editar o que precisa ser editado

São três valores, todos no topo do `<script>` de cada arquivo (edite em `src/` e
regenere).

**Em `src/relatorio.html`:**

```js
var WHATSAPP = '55DDNUMEROAQUI';   // ← número do Gustavo, só dígitos
```

**Isto não é opcional.** A Rota A inteira depende dele: sem o número, o botão
"Quero agendar minha sessão gratuita" não abre conversa nenhuma e a lead
qualificada morre na página. Formato internacional, só dígitos, sem `+` nem
espaços: `5511987654321`.

**Em `src/quiz.html`:**

```js
var ENDPOINT_PRIMARIO = 'COLE_AQUI_O_INBOUND_WEBHOOK_DO_GHL';
var ENDPOINT_FALLBACK = 'https://hook.us2.make.com/SEU_WEBHOOK_AQUI';
```

Leia o Passo 4 antes de preencher.

## Passo 4 — Como o lead entra (a decisão que não pode ser copiada do Rafael)

No funil do Rafael Granella, o embed posta direto no webhook do Make. **Aqui não
dá para fazer isso**, e o motivo está registrado no `aprendizados.md` deste
cliente:

> 2026-07-22 — Ad blockers bloqueiam silenciosamente `fetch()` do browser para
> `hook.us2.make.com`. O Make registrou **zero execuções de 14 a 21 de julho** e
> os leads sumiram sem rastro, por uma semana, sem ninguém perceber.

Na Vercel isso foi contornado com uma função serverless (`/api/lead`) que recebe
o lead no servidor e repassa para o Make. **O GHL não tem função serverless**, e
o problema volta se apontarmos o navegador direto para o Make.

Por isso o envio aqui tem dois endpoints, nesta ordem:

1. **Primário: webhook de entrada do próprio GHL.** Em
   **Automations → Workflows → novo workflow → trigger "Inbound Webhook"**, copie
   a URL gerada (domínio `leadconnectorhq.com`) e cole em `ENDPOINT_PRIMARIO`.
   Como é o domínio da própria plataforma que hospeda a página, não está nas
   listas de bloqueio que derrubaram o Make.
2. **Fallback: o webhook do Make.** Só é chamado se o primeiro falhar. É a rede
   de segurança, não o caminho principal.

No workflow do GHL, use os campos recebidos para criar/atualizar o contato,
aplicar tag de rota e disparar o que já existe hoje (planilha, cadência). O
repasse para o Make, se for mantido, passa a acontecer **de dentro do GHL**, ou
seja, servidor para servidor, fora do alcance de qualquer ad blocker.

### Campos que chegam no webhook

Além de `nome`, `email`, `whatsapp` e os cinco `utm_*`, o payload traz:

| Campo | Conteúdo |
|---|---|
| `rota` | `A` ou `B`. **Campo novo.** É o que permite medir se a segmentação funcionou. |
| `curso_anterior` | Resposta da pergunta sobre curso pago anterior. **Campo novo**, substituiu `dominasse`. |
| `combinacao`, `carro_chefe`, `tempo`, `motivacao`, `frustracao`, `canal_de_vendas`, `impedimento`, `seguranca` | Iguais aos de hoje. |

**A planilha de leads precisa das duas colunas novas** (`rota` e
`curso_anterior`). Sem elas os dados chegam e são descartados em silêncio, e a
coluna `rota` é justamente o número que vai dizer se a mudança deu certo.

## Passo 5 — Pixel e GTM

Não vão dentro dos blocos de código. Vão uma vez só, no funil inteiro:

**Funnel → Settings → Tracking Code**, campo **Head**:

```html
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window,document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '413208557089573');
</script>
```

Campo **Body**:

```html
<noscript><img height="1" width="1" style="display:none"
src="https://www.facebook.com/tr?id=413208557089573&ev=PageView&noscript=1" /></noscript>
```

O código dispara os eventos sozinho, com os mesmos nomes de hoje:
`PageView`, `CompleteRegistration` (primeira resposta), `Lead` (envio do
formulário), `ViewContent` (relatório), `Contact` (clique no WhatsApp) e
`InitiateCheckout` (clique no treinamento). **Não crie pixel novo nem evento
novo**: é o mesmo ID de sempre, para a otimização da campanha não reiniciar.

> O GTM da Vercel está com `GTM-PLACEHOLDER` até hoje, ou seja, nunca foi
> configurado. Se quiserem GTM de verdade, é o momento de criar o container e
> colar aqui. Se não, o Pixel sozinho já cobre os eventos.

## Passo 6 — Domínio

**Funnel → Settings → Domain**: aponte para o domínio ou subdomínio do Gustavo
(ex.: `quiz.gustavoono.com.br`). É esta etapa que ataca o connect rate.

Não precisa voltar no Passo 2: os links internos são relativos e se ajustam
sozinhos ao domínio.

## Passo 7 — Testar ponta a ponta antes de trocar qualquer anúncio

1. Publique e abra `https://SEU-DOMINIO/quiz?utm_source=teste&utm_campaign=teste`.
2. Responda o quiz **duas vezes**, com perfis diferentes:
   - **Rota A:** "Sim, são meu carro-chefe" + faturamento "De R$ 10.000 até R$ 20.000".
     O relatório tem que terminar na **sessão diagnóstica**, com o treinamento
     como link secundário discreto.
   - **Rota B:** "Ainda quero começar a vender chocolates" + "Até R$ 5.000".
     O relatório tem que terminar no **treinamento**, com o bloco "Incluso no
     treinamento" citando a conversa com o Gustavo, e **sem** convite para a sessão.
3. Clique no botão verde na Rota A e confirme que abre a conversa com o número
   certo, com a mensagem já escrita.
4. No GHL, confirme que o contato entrou com a tag de rota e que os campos
   `rota` e `curso_anterior` chegaram.
5. Confirme os eventos no Gerenciador de Eventos da Meta (Eventos de Teste).

## Passo 8 — Virar a chave sem afetar as campanhas

Regra central: **os passos 1 a 7 não encostam em nada que o Meta usa.** O funil
GHL é construído e testado em paralelo, a Vercel continua no ar e as campanhas
rodam sem mudança.

- **Não edite a URL de destino dos anúncios ativos.** Isso pode reiniciar o
  aprendizado da campanha.
- Em vez disso, **redirect 302 na Vercel** apontando para a URL do GHL,
  preservando a query string (`?utm_...`). O anúncio continua com a mesma URL,
  o lead cai no GHL, o pixel dispara igual porque é o mesmo ID.
- **302, nunca 301**: permite rollback instantâneo sem cache travado no
  navegador. Se algo der errado, remover o redirect devolve o funil da Vercel na
  hora, e nenhum anúncio foi editado.
- Observe 24 a 48h antes de desligar a Vercel de vez.

### Checklist antes de virar

- [ ] Rotas A e B testadas na URL real do GHL.
- [ ] `WHATSAPP` preenchido e testado com clique real.
- [ ] Webhook de entrada do GHL configurado e recebendo.
- [ ] Colunas `rota` e `curso_anterior` criadas na planilha de leads.
- [ ] Eventos do Pixel confirmados nos Eventos de Teste da Meta.
- [ ] Imagens: ver observação abaixo.
- [ ] Redirect 302 com UTM preservada, testado com uma URL de anúncio real.

---

## Observações importantes

**Imagens.** Hoje apontam para `quiz-gustavo-ono.vercel.app/fotos/` (a foto do
Gustavo e os três depoimentos), definido na constante `IMG` no topo do
`src/relatorio.html`. Funciona enquanto a Vercel estiver no ar. Depois de
validar, suba as imagens na **Mídia do GHL** e troque a base em `IMG`, senão o
dia em que a Vercel sair do ar o relatório perde as imagens.

**A lógica continua no nosso JS.** O Survey nativo do GHL não faz o diagnóstico
por pilar nem o roteamento por perfil e faturamento, então o código é próprio de
propósito. A regra de roteamento é a mesma do app React
(`funis/quiz-gustavo-ono/src/lib/rota.ts`): **Rota A** = chocolate é carro-chefe
ou compõe menos de 50% das vendas, **e** faturamento acima de R$ 5 mil. Qualquer
outro caso, incluindo resposta faltando, cai na **Rota B**.

**Duas implementações do mesmo funil.** Enquanto a Vercel e o GHL estiverem no
ar, existem duas cópias da mesma lógica, e elas vão divergir. Já aconteceu uma
vez: a faixa "Acima de R$ 20.000" foi ajustada direto em produção e o
repositório ficou meses com "Acima de R$ 30.000". **Assim que o GHL for
validado, aposente a versão da Vercel** em vez de manter as duas.

## Por que os embeds são ASCII puro

Colando conteúdo com bytes acima de 127 no GHL, os acentos podem virar mojibake
("PRECIFICAÇÃO" vira "PRECIFICAÃ‡ÃƒO") porque em algum ponto do caminho os bytes
UTF-8 são lidos como se fossem de um byte só. O arquivo de origem fica correto, o
que torna o problema difícil de diagnosticar e fácil de repetir. Aconteceu no
projeto do Rafael Granella.

Em vez de tentar acertar a cópia, os embeds gerados **não têm nenhum byte acima
de 127**: os acentos viram entidades numéricas na marcação (`&#225;` = á) e
escapes `\uXXXX` dentro do JavaScript. O navegador renderiza exatamente o mesmo
texto, e nenhuma ferramenta consegue corromper o que não tem byte alto.

Para regenerar depois de editar `src/`:

```bash
cd clientes/gustavo-ono/funis/quiz-ghl
python3 build-ascii.py
```

Para conferir que ficou ASCII puro:

```bash
python3 -c "print(open('quiz-ghl-embed.html',encoding='utf-8').read().isascii())"
python3 -c "print(open('relatorio-ghl-embed.html',encoding='utf-8').read().isascii())"
```

Os dois devem imprimir `True`.

### Verificação feita nesta entrega

Os dois embeds foram servidos localmente e percorridos em navegador real, com
cinco combinações de perfil, incluindo os casos de fronteira (carro-chefe
faturando até R$ 5 mil vai para a B; menos de 50% das vendas faturando acima de
R$ 20 mil vai para a A). Todas rotearam para o destino certo. O texto renderizado
pela versão ASCII foi comparado caractere a caractere com o da fonte com acentos:
**idêntico**, sem mojibake.
