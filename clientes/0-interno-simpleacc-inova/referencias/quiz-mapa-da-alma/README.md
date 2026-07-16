# Quiz "O Mapa da Alma" — engenharia reversa completa (swipe interno)

> **O que é isto:** documentação da *estrutura invisível* de um quiz de vendas
> de terceiro (Raphael Tarso / "O Mapa da Alma"), reconstruída para servir de
> **modelo de replicação** interno da SimpleAcc. Não é um cliente — é
> referência/swipe. A URL analisada foi enviada pelo time:
> `https://quizmapa19.raphatarso.com.br/`.
>
> Toda a estrutura aqui foi extraída da **própria configuração do funil**
> (não de suposição visual): o quiz roda sobre a plataforma **inlead.digital**,
> que entrega a config do funil **ofuscada + criptografada (AES)** dentro do
> HTML. Decodificamos essa config — por isso o mapa abaixo é o "raio-x" real,
> não uma aproximação. O objeto completo está em
> [`quiz-config-decodificado.json`](./quiz-config-decodificado.json).

## Arquivos desta pasta

| Arquivo | Conteúdo |
|---|---|
| `README.md` | Este documento — o blueprint completo. |
| `quiz-config-decodificado.json` | Config **inteira** do funil, decodificada (fonte da verdade). |
| `copy-e-layers-por-etapa.txt` | Dump linear de todas as 39 etapas com cada camada e a copy. |
| `midias-usadas.txt` | Lista das 31 imagens/mídias (URLs `media.inlead.cloud`) para baixar/trocar. |

---

## 1. Resumo executivo

É um **quiz de diagnóstico → oferta** (VSL em formato quiz) de nicho
**cristão / desenvolvimento pessoal + dinheiro**. A promessa é descobrir um
"vínculo oculto"/"bloqueio" que impede a pessoa de prosperar, e a conversão é
uma oferta de **R$ 19,90** (de "R$ 97") para um evento ao vivo de 2 dias
("Desbloqueio ao Vivo").

A mecânica de persuasão é a de um **quiz de alta conversão clássico**:

1. **Micro-compromissos** — perguntas fáceis e segmentadoras no começo.
2. **Segmentação** (sexo → idade → cristão → casado → filhos) que tanto
   ramifica o fluxo quanto alimenta um "diagnóstico personalizado".
3. **Interstícios de autoridade** ("INSERÇÃO") com pseudo-ciência (Harvard,
   Stanford, McGill, Libet) entre blocos de perguntas para manter o embalo.
4. **Diagnóstico fabricado** — tela de loading "calculando" seguida de um
   resultado com % de bloqueio por área (financeiro/emocional/relacional/
   espiritual). Os números são **fixos na config**, não calculados.
5. **Prova social** (carrossel de prints de depoimentos) e **gráficos
   antes/depois**.
6. **Captura de lead** (nome, e-mail, WhatsApp) → dispara webhook.
7. **Pitch longo** com vídeo (VTurb), escassez (timer 10 min + "1º lote"),
   cupom personalizado com o nome, ancoragem de preço e CTA de checkout.

A "estrutura invisível" que interessa replicar está nas **seções 3 a 10**.

---

## 2. Ficha técnica

| Item | Valor |
|---|---|
| Plataforma / builder | **inlead.digital** (funil no-code; render Next.js em `inlead.digital/_next/...`) |
| Domínio publicado | `quizmapa19.raphatarso.com.br` (custom domain apontando pra Vercel/inlead) |
| ID do funil | `130427` · hash `FY8z49` · slug `o-mapa-da-alma-ingresso-19` |
| Título interno | `O Mapa da Alma - Oferta 19,90 [Onprofit] [T]` |
| Nº de etapas | **39** |
| Favicon | 💰 (money-bag) — `media.inlead.cloud/.../money-bag-1f4b0.png` |
| **Pixel Facebook** | `1888822511857048` |
| **Google Ads (gsv)** | `16495550759` |
| **UTMify** | script `cdn.utmify.com.br/scripts/utms/latest.js` (rastreio de UTM) |
| **Webhook** | `POST` p/ n8n `apps-n8n.cwbnhf.easypanel.host/webhook/fa4a347b-…` — trigger `onClick` no evento `initiate_checkout_01` |
| **Checkout** | Onprofit: `https://pay.onprofit.com.br/1Nik8Rsu?off=RCRllR` |
| Empresa (rodapé) | RT PRODUTOS DIGITAIS LTDA — CNPJ 55.168.722/0001-41 |
| Proteção de tráfego | `traffic: false` (sem cloaking/guard nesta versão) |

**Eventos de conversão:** o clique no preço/CTA dispara `initiate_checkout_01`
(nome interno do componente `Lo53M2`), que aciona o webhook e o pixel, e
redireciona pro checkout Onprofit.

---

## 3. Arquitetura invisível da plataforma (o modelo mental para replicar)

### 3.1 Modelo de dados: `funil → steps → layers`

O funil é um JSON com estas chaves de topo:

```
id, hash, title, slug, description, domain, origin, status,
steps[],        ← as 39 etapas
design{},       ← tema global (cores, fontes, container, header)
navigation{},   ← tabela global de roteamento (branching)
scripts{},      ← pixels/headers (facebook, gsv, utmify)
webhook{},      ← integração de lead/checkout
seo{}, traffic, version
```

Cada **step** (etapa/tela) tem: `id`, `title` (nome interno) e um array
**`layers`** (os blocos empilhados verticalmente na tela).

Cada **layer** tem `type`, `design` (estilo) e `content` (dados). Os tipos de
layer usados neste funil (o "kit de peças" da inlead) são:

| Tipo de layer | Função | Nº de usos |
|---|---|---|
| `text` | Bloco de texto rico (HTML/Quill) | 63 |
| `clear` | Espaçador vertical (ar entre blocos) | 55 |
| `alert` | Caixa colorida de destaque (success/danger/info/light) | 42 |
| `options` | **Pergunta** com alternativas (o coração do quiz) | 25 |
| `image` | Imagem | 24 |
| `metric` | Barra/indicador de % (usado no "diagnóstico") | 23 |
| `button` | Botão de avançar / CTA | 14 |
| `arguments` | Blocos comparativos lado a lado (grid) | 4 |
| `graphics` | Gráfico de barra/rosca com legenda | 4 |
| `charts` | Gráfico cartesiano (linha de progresso) | 3 |
| `field` | Campo de formulário (texto/e-mail/telefone) | 3 |
| `timer` | Contagem regressiva (escassez) | 3 |
| `price` | Bloco de preço com âncora + CTA | 3 |
| `loading` | **Tela de carregamento** temporizada | 2 |
| `video` | Player embed (VTurb/YouTube) | 2 |
| `carousel` | Carrossel de imagens (depoimentos) | 1 |

> **Para replicar:** pense em cada tela como uma pilha de blocos desses. Um
> quiz nada mais é que `text` (pergunta) + `options` (respostas); as telas de
> venda são combinações de `alert`, `metric`, `graphics`, `timer`, `price`.

### 3.2 Sistema de navegação e ramificação (branching)

O roteamento é definido em **dois lugares** que se combinam:

1. **`destination` por opção/botão** — cada alternativa aponta pra onde ir:
   - `"next"` → próxima etapa na ordem;
   - `"<id-da-etapa>"` → pula para uma etapa específica;
   - uma **URL** → redireciona pra fora (checkout).
2. **`navigation{}` (tabela global)** — mapeia `id de componente → destino`,
   permitindo sobrescrever/centralizar rotas (73 entradas neste funil).

**A ramificação principal é por sexo, logo no início:**

```
Etapa 1 (Identificação) — "Você é Homem ou mulher?"
   ├─ Homem  → etapa 0rhbzh (idade - trilha masculina)
   └─ Mulher → etapa wfeWkc (idade - trilha feminina)
```

Depois da idade, as duas trilhas **reconvergem** na etapa `5MNaBx`
("Você é cristão?") e seguem lineares até o fim. Há também um desvio
condicional em **"Você tem filhos?"**:

```
Sim → jnVytM (INSERÇÃO - FILHOS, interstício sobre transmissão p/ filhos)
Não → 6EMzPA (pula o interstício, vai direto pra situação financeira)
```

> **Observação técnica:** algumas opções trazem `destination: null` (cai no
> "next" padrão) e há dois destinos órfãos referenciados (`oj3g7f`, `2qT7Qv`)
> que não correspondem a nenhuma etapa existente — são links quebrados/legados
> que, na prática, avançam para a próxima etapa. Ao replicar, use sempre
> `next` para respostas que não devem ramificar.

### 3.3 Como a config é escondida (ofuscação + criptografia)

Isto é relevante caso a gente queira **inspecionar concorrentes** de novo.
A inlead não expõe o funil em texto: dentro do `<script id="__NEXT_DATA__">`
existem dois campos, `q` (payload) e `h` (hash da sessão). O `q` passa por:

1. **De-ofuscação por índice** — o 1º caractere de `q` escolhe 1 de 4 funções
   (`charCodeAt(0) % 4`). Cada função lê uma janela de 8 bytes em offset fixo
   (`[0,3,1,5]`), deriva parâmetros em base-36 e reconstrói uma **chave** com
   um deslocamento tipo César sobre o alfabeto `A-Za-z0-9`.
2. **AES (CryptoJS)** — o restante é `Salted__` + AES-CBC com aquela chave
   (derivação `EVP_BytesToKey`/MD5, padrão CryptoJS). O texto claro é o JSON
   do funil.

O script `decodificar-quiz.py` (ver seção 11) reproduz isso em Python. **Não
precisa navegar o quiz clicando** — a config já contém tudo.

---

## 4. Design / tema global (tokens)

Da chave `design{}` — use isto como base do tema ao recriar:

| Token | Valor | Observação |
|---|---|---|
| `themeColor` | `#fbbf24` | Amarelo/âmbar (destaques, spinner) |
| `titleColor` / `contentColor` | `#0f172a` | Quase-preto (slate-900) |
| `backgroundColor` | `#ffffff` | Fundo branco |
| `featuredFont` / `contentFont` | `inter` | Fonte única Inter |
| `titleSize` | `0.5` | Escala de título |
| `contentSize` | `16` | px do corpo |
| `rounded` | `rounded-3xl` | Cantos bem arredondados (Tailwind) |
| `elementSize` | `48px` | Altura de botões/campos |
| `container` | `max-w-[34rem]` | Largura máx. da coluna (~544px, mobile-first) |
| `header.progress` | `flat` | Barra de progresso no topo, estilo "flat" |
| `verticalAlign` | `justify-between` | Distribui conteúdo na altura |
| `gap` | `.2` | Espaçamento entre blocos |

Paleta funcional recorrente nos `alert`/`metric` (cores inline):
- **Vermelho/alarme** — texto `#b91c1c` sobre fundo `#ffe2e3`, borda `#ffcccc`.
- **Amarelo/atenção** — texto `#a16207` sobre `#fef9c3`, borda `#F0E895`.
- **Azul/info-positivo** — texto `#1d4ed8` sobre `#dbeafe`, borda `#c2d1fb`.
- **Verde/sucesso** — `#16a34a`.

Layout é **100% mobile** (`viewport` com `maximum-scale=1`, `user-scalable=no`).

---

## 5. Mapa de fluxo completo — as 39 etapas

Legenda de função: **Q** = pergunta · **INS** = interstício de autoridade ·
**LOAD** = carregamento · **RES** = resultado/diagnóstico · **VENDA** = bloco de venda.

| # | id | Nome interno | Função | Resumo |
|---|---|---|---|---|
| 0 | `mckhIS` | Etapa - Capa | Abertura | Headline "Você está carregando um vínculo oculto" + botão "Começar o teste". |
| 1 | `O4jw8W` | Identificação | Q (ramifica) | **Homem/Mulher** → separa trilhas. |
| 2 | `0rhbzh` | Idade - Homem | Q | 19-29 / 30-39 / 40-49 / 50+ (trilha masc.) → reconverge em `5MNaBx`. |
| 3 | `wfeWkc` | Idade - Mulher | Q | idem (trilha fem.). |
| 4 | `5MNaBx` | Cristão? | Q | Sim/Não (ponto de reconvergência). |
| 5 | `SMnazm` | Casado(a)? | Q | Sim/Não. |
| 6 | `gLUfjr` | Tem filhos? | Q (ramifica) | Sim→`jnVytM` · Não→`6EMzPA`. |
| 7 | `jnVytM` | INSERÇÃO - Filhos | INS | "67% dos pais transmitem bloqueios" (Harvard/Stanford). |
| 8 | `6EMzPA` | Situação financeira | Q | "Qual frase mais ressoa?" (4 opções de dor). |
| 9 | `FIEVNb` | Briga/dinheiro | Q | "No relacionamento, o que mais dói?" |
| 10 | `pjuTog` | Dinheiro | Q | "Com o dinheiro, o que mais frustra?" |
| 11 | `h8NpE5` | INSERÇÃO - Divórcio | INS | "brigas não são sobre dinheiro" + print de depoimento. |
| 12 | `iorQcV` | Emocional | Q | "Emocionalmente, o que mais drena?" |
| 13 | `UefhEj` | Propósito | Q | "No propósito/espiritualidade, o que mais pesa?" |
| 14 | `BQh3mo` | Impede | Q | "O que te impede de dar esse passo?" |
| 15 | `fu3kKr` | Diferente | Q | "Se acordasse amanhã com algo diferente…" |
| 16 | `RCYgNA` | INSERÇÃO - Impulso | INS | "criança que você foi foi silenciada" (arguments + alert). |
| 17 | `pQXjqw` | Parar de repetir | Q | "O que você quer parar de repetir?" |
| 18 | `6FL2vX` | Frases da casa | Q (múltipla) | Frases sobre dinheiro/igreja (seleção múltipla) + botão. |
| 19 | `awgmPI` | Julgado | Q | "Terminou relação e o próximo tinha os mesmos problemas?" |
| 20 | `0KNYu7` | Espiritual | Q | "Acreditou que sofrer é ser mais espiritual?" |
| 21 | `Yvcy8x` | INSERÇÃO | INS | Epigenética (McGill/Libet) + "vínculo oculto na raiz". |
| 22 | `pkGuwI` | Emociona | Q | "Esse peso emocional, há quanto tempo?" |
| 23 | `I61r55` | Vida financeira | Q | "Quando tenta avançar, o que acontece?" |
| 24 | `qHd98A` | Daqui 1 ano | Q | "Se daqui a 1 ano nada mudar, como se sente?" |
| 25 | `sscEfw` | Desejo 01 | Q | "O que mudaria se descobrisse o que te trava?" |
| 26 | `9kjufo` | Desejo 03 | Q | "Quanto tempo ainda disposto a carregar isso?" |
| 27 | `oZ4gUw` | Transformação | Q (múltipla) | Como quer se sentir (leve/claro/inteiro/presente) + botão. |
| 28 | `O9oj4Z` | **Diagnóstico** | LOAD | Loading 5s "Calculando o MAPA certo pra você…". |
| 29 | `hNyzc5` | Sintomas | RES | **Resultado fabricado:** % por área + alertas (ver §7). |
| 30 | `uI7Fe6` | Quão motivado | Q | Alerta de diagnóstico + "Quão motivado você está?" |
| 31 | `2VzKCh` | Comparação | VENDA | "Com vínculo oculto × quem rompe" (arguments + 10 metrics + graphics). |
| 32 | `lOYFbM` | Depoimento | VENDA | Carrossel + prints de resultados de alunas. |
| 33 | `mTU4MG` | Relato do desafio | VENDA | História + gráfico cartesiano "esforço × resultado". |
| 34 | `8MtQ41` | Depois do plano | VENDA | Barras "87% identificaram…" + reprogramação. |
| 35 | `a3cum3` | Depois do plano 2 | VENDA + Q | Gráfico de progresso (Início→Dia 3) + micro-sim "Você seria capaz?". |
| 36 | `TW1lft` | Loading final | LOAD | Texto "preparamos um caminho" + loading 5s "Carregando…". |
| 37 | `KY1ckD` | **Cadastro** | Lead | Nome + E-mail + WhatsApp → "RECEBER MEU CAMINHO". |
| 38 | `jtiAEf` | **Pitch** | VENDA | Página de oferta longa (94 camadas) — ver §9. |

---

## 6. A "estrutura invisível" — o esqueleto de persuasão (é isto que se replica)

Abstraindo o tema, o quiz segue este esqueleto — **replicável para qualquer
cliente**:

1. **Capa com promessa + curiosidade** (1 tela, 1 botão). Sem menu, sem
   distração. Promessa = "descubra X em menos de 2 minutos".
2. **Segmentação demográfica** (3–5 perguntas rápidas: sexo, idade, marcadores
   de nicho). Serve pra (a) ramificar imagens/linguagem e (b) criar sensação
   de personalização. **Respostas com imagem** aumentam engajamento.
3. **Perguntas de dor** agrupadas por área (financeiro, relacional, emocional,
   espiritual). Sempre 4 alternativas, todas descrevendo dores — a pessoa
   **se reconhece** em qualquer resposta.
4. **Interstícios de autoridade** a cada ~4 perguntas ("INSERÇÃO"): dado
   pseudo-científico + prova social curta + botão "Continuar". Quebram a
   monotonia e injetam credibilidade sem pedir resposta.
5. **Perguntas de projeção/futuro** ("se nada mudar…", "o que mudaria se…")
   para amplificar a dor e o desejo antes do diagnóstico.
6. **Tela de loading "calculando"** — cria expectativa e legitima o resultado
   como algo "processado".
7. **Diagnóstico personalizado (fabricado)** — resultado com números e cores
   de alerta. Nomeia o problema ("Bloqueio Ativo em Múltiplas Áreas").
8. **Ponte problema→solução** — comparação "antes×depois", prova social
   (depoimentos, gráficos), história do método.
9. **Captura de lead** logo antes do pitch (nome usado depois na copy).
10. **Segundo loading** ("preparando seu caminho") antes de revelar a oferta.
11. **Pitch com vídeo + escassez + ancoragem + cupom personalizado + CTA**.

> Ordem-chave: **segmenta → dói → prova autoridade → projeta futuro →
> diagnostica → oferece.** O lead entra "aquecido" no pitch porque já
> confessou as dores e recebeu um "diagnóstico".

---

## 7. Elementos personalizados (o "supostamente personalizado")

O quiz **parece** individualizado, mas a personalização é rasa e roteirizada.
Vale documentar exatamente o que é dinâmico e o que é fixo:

**Realmente dinâmico:**
- **`{{nome}}`** — capturado no cadastro (etapa 37) e injetado no pitch
  ("Ei {{nome}}… SEU MAPA DA ALMA ESTÁ AQUI!"), no alerta do vídeo e no
  **cupom** ("✅ {{nome}}_75%OFF").
- **`{{sexo}}`** — token disponível (da etapa 1), usado para linguagem/gênero.
- **Ramificação por sexo e por "tem filhos"** — muda quais telas a pessoa vê
  (imagens de idade masc./fem.; interstício de filhos só p/ quem tem).

**"Personalizado" mas na verdade FIXO (hard-coded na config):**
- O **diagnóstico** da etapa 29 é sempre o mesmo, independentemente das
  respostas. Os percentuais são constantes no JSON:

  | Área (metric `title`) | % fixo | Cor |
  |---|---|---|
  | 💰 FINANCEIRO | **34%** | vermelho (crítico) |
  | (autossabotagem) | 15% | amarelo |
  | (vínculos/relacional) | 28% | amarelo |
  | (fé × prática) | 22% | amarelo |
  | Índice geral | **89%** | — |

  Cada % vem acompanhado de um `alert` com o texto do "diagnóstico" daquela
  área. **Nada disso reage às respostas** — é a mesma tela pra todo mundo.
- Os gráficos de comparação (etapa 31: `19% × 83`, `14% × 95`, etc.),
  progresso e "satisfação 4.8★ de 1912 avaliações" também são estáticos.

> **Para replicar de forma honesta:** dá pra manter a *sensação* de
> personalização com os tokens (`{{nome}}`, `{{sexo}}`) e a ramificação, sem
> precisar computar score real. Se quisermos um diagnóstico de verdade
> reativo às respostas, é trabalho extra (somar pesos por opção) — a inlead
> aqui não faz isso.

---

## 8. Sessões de carregamento (loading)

São **2 telas** `loading`, ambas de **5 segundos**, com barra de progresso e
percentual visível:

| Etapa | Título exibido | Duração | Função |
|---|---|---|---|
| 28 `O9oj4Z` | "Calculando o MAPA certo pra você Romper…" | 5s | Legitima o diagnóstico que vem a seguir. |
| 36 `TW1lft` | "Carregando…" (após "preparamos um caminho pra você") | 5s | Suspense antes de revelar a oferta. |

Config do layer `loading`: `{ seconds, show_title, show_percent,
show_progress, destination:"next" }`. O spinner de carregamento inicial da
página usa a `themeColor` (#fbbf24).

Além dos loadings, há **timers de escassez** (layer `timer`) no pitch:
contagem regressiva de **600s (10 min)** com o texto "Seu cupom de desconto
foi aplicado! ✅ {{nome}}_75%OFF — reservado por: [10:00]". Reaparece 3× ao
longo da página, cada um junto de um bloco de preço.

---

## 9. Página de pitch (etapa 38 `jtiAEf`) — 94 camadas

A oferta é uma landing longa montada só com layers. Sequência (resumida):

1. **Saudação personalizada** — "Ei {{nome}}… SEU MAPA DA ALMA ESTÁ AQUI!"
2. **Antes × Depois** — 2 imagens + 8 `metric` (pares baixo→alto: 29→87,
   24→94, 31→97, 12→91).
3. **Vídeo de vendas** — embed **VTurb/ConverteAI** (`scripts.converteai.net`).
4. **O que é / não é** — "NÃO É UM CURSO. Não é gravado." + 3 benefícios
   (aplicação ao vivo / clareza imediata / transformação sentida).
5. **Gráfico de progresso esperado** (Hoje→Dia 3, "Bloqueado"→destravado).
6. **Bloco de oferta #1** — `timer` (cupom) + alert "1º LOTE LIBERADO" +
   `price` **R$ 19,90** (de R$ 97, selo "75% OFF") + datas "25 e 26 de Julho,
   15h" + selos de cartão/segurança + "4.8★ de 1912 avaliações" +
   **botão "Comprar Agora"** → `pay.onprofit.com.br/1Nik8Rsu?off=RCRllR`.
7. **Prova social em vídeo** — embed YouTube (depoimento).
8. **Prints de depoimentos** (imagens).
9. **Lista de transformações** — 7 `alert` verdes com "✅ …".
10. **Bloco de oferta #2** — repete timer + price + selos (reforço).
11. **Antes × Depois em lista** — 6 `alert` vermelhos "❌ …" (vida antes) →
    7 `alert` verdes "✅ …" (vida depois).
12. **Bloco de oferta #3** — timer + price + selos novamente.
13. **Rodapé** — CNPJ (RT PRODUTOS DIGITAIS LTDA) + Termos/Privacidade.

Padrão de venda: **3 blocos de preço idênticos** intercalados com prova e
benefícios (o clássico "repita a oferta ao longo da rolagem"). O preço tem
`redirect:true` → clicar leva ao checkout.

---

## 10. Checklist de replicação (para um cliente Simple Acc)

Ordem sugerida pra montar um quiz equivalente:

- [ ] **Definir o "vínculo oculto" do nicho** — o vilão/mecanismo único que o
      quiz vai revelar (aqui: "vínculo oculto/bloqueio").
- [ ] **Capa** com promessa + tempo ("descubra X em 2 min") + 1 botão.
- [ ] **Segmentação** (2–4 perguntas demográficas com imagem; ramifique por
      1 eixo, ex.: sexo).
- [ ] **12–16 perguntas de dor** em 4 áreas, 4 alternativas cada (todas dores).
- [ ] **3–4 interstícios de autoridade** intercalados (dado + prova + botão).
- [ ] **Loading "calculando"** (5s, com %).
- [ ] **Tela de diagnóstico** com métricas por área (decidir: fixo vs. reativo).
- [ ] **Prova/ponte** — comparação antes×depois, depoimentos, gráficos.
- [ ] **Captura de lead** (nome/e-mail/WhatsApp) + webhook pra planilha/n8n.
- [ ] **Loading final** (5s) antes da oferta.
- [ ] **Pitch** com vídeo + 3 blocos de preço + timer/cupom com `{{nome}}` +
      selos + CTA de checkout.
- [ ] **Tokens dinâmicos**: `{{nome}}`, `{{sexo}}` na copy e no cupom.
- [ ] **Rastreio**: pixel Facebook, Google Ads, UTMify; evento
      `initiate_checkout` no CTA.
- [ ] **Assets**: substituir as 31 mídias (`midias-usadas.txt`) pelas do
      cliente.

> Para a stack da Simple Acc, o esqueleto acima é o mesmo do skill
> `gerar-quiz-diag-pag-pos-quiz` (quiz → página pós-quiz → PDF, publicado na
> Vercel). Este documento serve de **referência de copy/estrutura** ao rodar
> aquele fluxo para um cliente novo.

---

## 11. Como reproduzir a extração (decodificar outro quiz inlead)

1. Baixar o HTML com **User-Agent de navegador** (o servidor bloqueia `curl`
   "pelado" com 403). Extrair o JSON de `<script id="__NEXT_DATA__">`.
2. Ler `props.pageProps.q` (payload ofuscado+cifrado) e `props.pageProps.h`.
3. Rodar o algoritmo de de-ofuscação (janela de 8 bytes em offset `[0,3,1,5]`
   escolhido por `q[0] % 4`, chave via shift base-62) e depois **AES-CBC
   CryptoJS** (`Salted__` + `EVP_BytesToKey`/MD5). Detalhes e a implementação
   estão descritos na §3.3; o resultado é o JSON completo do funil.

> A extração feita aqui usou exatamente esse método; a config recuperada está
> em `quiz-config-decodificado.json` (a fonte de tudo neste README).
