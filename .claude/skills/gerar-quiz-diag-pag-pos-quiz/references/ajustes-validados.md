# Ajustes validados em produção

Decisões tomadas com o Daniel durante funis reais, que **corrigem ou apertam** o
padrão descrito nos outros arquivos. Quando este arquivo divergir de outro,
**este vale**, e a divergência está marcada aqui.

Origem: funil do **Thiago Vitório** (quiz-thiagovitorio.vercel.app, cliente
Thaina Elvira), agosto de 2026. Antes dele: Pâmella Mello, Lucas Sobreiro,
Rômulo Heleno, Felipe Damasceno.

---

## 1. Tela e progresso

**Barra de progresso sem número nenhum.** Nem contador "Pergunta X de N", nem
percentual. Só a barra enchendo.

> ⚠️ Isto **substitui** o que está em `arquitetura-funil.md` sobre mostrar
> "Pergunta X de N". Número ali faz o quiz parecer longo e medido, e derruba a
> conclusão. Foi pedido explícito do Daniel, em duas rodadas: primeiro saiu o
> contador, depois o percentual.

**Sem rodapé** nas páginas do funil. Assinatura repetida no fim não ajuda em
nada e rouba atenção do CTA.

**Topo com o nome completo do especialista**, não o primeiro nome.

## 2. Bloco de autoridade (onde mais se erra)

O bloco existe para **apresentar a pessoa brevemente**: foto, nome, o que ela
faz, @ do Instagram e uma fala dela. Só isso.

**Não é lugar de método, etapas, duração da sessão nem número de encontros.**
Isso já apareceu no bloco do método, logo acima, e repetir ali deixa o bloco
sem sentido. Foi exatamente a correção do Daniel: *"é pra apresentar ele
brevemente, não pra falar de método, de fases e etc"*.

**Grade de credenciais só se existirem credenciais reais e escritas** no
material do cliente. Se o especialista ainda não tem histórico na área, **não
invente grade**: quatro parágrafos curtos com a história dele sustentam melhor
do que números que não dizem nada. Uma grade montada com fatos do produto
("5 elos", "4 etapas", "60 min") parece credencial e não é.

**Puxe a copy das páginas que o cliente já tem no ar** (site, LPs, bio do
Instagram). É a voz dele, já aprovada, e evita claim inventado. Peça os links
no intake.

## 3. Índice do diagnóstico

Índice com nome e sigla próprios, como já manda o blueprint.

**Antes de publicar, rode todas as combinações de peso e olhe a distribuição.**
Na primeira calibragem deste funil, **95% das combinações davam "Alto"** e o
número virava teatro: duas mulheres em situações bem diferentes recebiam o
mesmo resultado. Recalibrando os pesos (usando 0 e 1 nas alternativas mais
leves), a amplitude foi de 53%-100% para **27%-100%**.

```js
// roda as combinações e mostra a distribuição por faixa
let combos=[[]]; steps.forEach(s=>{const n=[];combos.forEach(c=>
  s.options.forEach(o=>n.push([...c,o.peso||0])));combos=n;});
const pcts=combos.map(c=>Math.round(c.reduce((a,b)=>a+b,0)/max*100));
```

Se o quiz não tem alternativa de "está tudo bem" (o normal, porque quem clica
no anúncio já está no problema), assuma que a faixa baixa quase não acontece e
**documente isso no README do funil** em vez de forçar.

## 4. Porteiras e qualificação

**As duas porteiras nem sempre são faturamento + prontidão.** Use o que define
o ICP de verdade. Neste funil foram **momento de vida + prontidão**, porque o
produto não é B2B.

**Regra de corte cruzada vira código**, em `classificarLead()`, não fica só no
documento de estratégia. Ex.: "casada só segue se a resposta da situação
indicar falta de valorização".

**Vale ter 4 faixas na planilha** (`fila-quente`, `qualificado`, `nutrir`,
`fora`) mesmo que a página mostre só 3 CTAs. A quarta serve para priorizar a
fila do atendimento, e não muda nada na página.

## 5. WhatsApp

**A mensagem pré-preenchida leva o resultado nomeado**, não só o nome do lead:

```js
whatsappMsg: "Oi! Sou {nome}, acabei de fazer o diagnóstico e meu resultado foi
{padrao}. Quero entender melhor como funciona a sessão."
```

O atendimento abre a conversa já sabendo o diagnóstico. É o que transforma o
quiz em pré-work da sessão.

**Trava obrigatória:** se o número estiver vazio ou ainda com `X`, os CTAs
**não abrem** o WhatsApp e a página mostra um aviso no topo. Evita publicar com
botão mudo, que é um erro silencioso e caro.

```js
const WPP_OK = /^\d{12,13}$/.test(String(F.marca.whatsapp || ""));
```

## 6. Planilha de leads

**Some a coluna do resultado nomeado**, além da classificação. É o que
transforma a planilha em roteiro de atendimento: antes de responder, a pessoa
olha a linha e já sabe o padrão, o gatilho, a reação, há quanto tempo se repete,
o que a lead já tentou e o que ela quer.

Entregue ao cliente um **resumo do que cada coluna significa**, principalmente
as faixas de classificação. Ele vai operar a planilha todo dia.

## 6.1 UTMs (furo real, já corrigido no motor)

**Guarde as UTMs no `sessionStorage`, não confie só na URL.** O motor lia
`location.search` uma vez, no carregamento. Se a lead recarregasse ou voltasse
pelo histórico numa URL sem os parâmetros e aceitasse o "continuar de onde
parou", o lead caía na planilha **sem origem nenhuma**. Confirmado rodando o
funil antes e depois da correção.

```js
const UTM_KEY = (((window.FLOW||{}).config||{}).storeKey || "funil") + "_utms";
// se a URL tem UTM, ela manda e é regravada; se não tem, usa a guardada
```

**Para o gestor de tráfego**, entregue por escrito:
- apontar o anúncio para a **raiz com a query** (`/?utm_source=...`);
- na Meta, deixar o Website URL limpo e usar o campo **"Parâmetros de URL"** com
  macros (`{{campaign.name}}`, `{{adset.name}}`, `{{ad.name}}`), **nunca nos
  dois lugares**, senão duplica;
- **nome de campanha, conjunto e anúncio sem acento e sem espaço**: a macro
  copia o nome literal e a planilha recebe `%20` e `|`;
- fixar `utm_source` e `utm_medium` na mão, macro só para os nomes;
- **testar com um lead real antes de subir verba** e conferir as 5 colunas.

Lembre o cliente de que **só entra na planilha quem termina o quiz**: visita não
vira linha, então a conta de CPL sai por lead completo, não por clique.

> Conferido na Vercel: `/index.html?utm_...` **também preserva a query** (serve
> 200, sem redirect). O `arquitetura-funil.md` sugere que o servidor derruba a
> query nesse caminho: não foi o caso aqui. Use a raiz assim mesmo, por
> convenção, mas não trate como bug se alguém usar o /index.html.

## 7. Deploy

**Trocar de domínio exige projeto novo.** O nome do projeto na Vercel vira a
URL e não dá para renomear. O projeto antigo continua respondendo: **peça para
remover no painel**, senão alguém divulga o link errado.

**O alias com o sufixo do time responde 302** (fica atrás do SSO), mesmo em
produção. O link público é sempre o curto (`<projeto>.vercel.app`). Teste os
dois com `curl` antes de entregar.

**Se não houver CLI disponível e o deploy tiver que sair pelo MCP** (que o
`deploy-vercel.md` desaconselha para funil com imagem, com razão): encolha a
imagem ao mínimo que a tela usa (aqui: 224px, 4 KB, exibida a 104px) e
**confira o sha256 do arquivo publicado contra o local**. Foi o que provou que
o base64 chegou íntegro.

```bash
curl -s "$BASE/foto.webp" | sha256sum && sha256sum <funil>/foto.webp
```

## 8. Identidade visual

Tirar das páginas que o cliente **já tem no ar**, não inventar paleta nem
propor uma "identidade sugerida" quando existe material publicado. Neste funil,
a paleta rosé que eu tinha proposto foi descartada e substituída pelo preto
quente + dourado champanhe copiado do site e das LPs dele.

No intake, peça os **links das páginas ativas**, não só o logo.
