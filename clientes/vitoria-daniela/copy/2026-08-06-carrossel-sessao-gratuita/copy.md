# Carrossel: onde o dinheiro do tráfego vaza

**Data:** 2026-08-06 · **Formato:** carrossel 4 cards, 1080x1350 · **Identidade:** preto e dourado
**Arquivos:** `carrossel.html` (fonte editável) · `slides/slide_1..4.png` (prontos pra postar)

---

## Os 4 cards

### Card 1 · preto
**Tag:** TRÁFEGO
**Título:** De cada 10 empresários que eu converso, 8 já queimaram dinheiro em tráfego.
**Corpo:** E quase nunca o problema estava no tráfego, estava em tudo que vinha depois dele.

### Card 2 · creme
**Tag:** ONDE O DINHEIRO SOME
**Título:** Anúncio sem estrutura é torneira aberta em cano furado.
**Corpo:** O dinheiro entra pelo anúncio e vaza no caminho, no perfil que promete uma coisa e mostra outra, na mensagem que fica três dias sem resposta, na proposta que foi enviada e ninguém retomou.
**Remate:** *Você paga pela água que nunca chega no balde.*

### Card 3 · preto — duas versões

**Versão A (padrão, `slide_3.png`), analogia original dela:**
**Título:** Ninguém estanca um sangramento treinando condicionamento.
**Corpo:** No hospital a prioridade é parar o sangue, estabilizar, e só então pensar em deixar o corpo mais forte.
Com o seu negócio é igual, colocar mais verba em cima de estrutura furada não corrige nada, só acelera o prejuízo.

**Versão B (`slide_3-alternativo-pneu.png`), sem a palavra sangue:**
**Título:** Ninguém pisa no acelerador com o pneu furado.
**Corpo:** Primeiro se troca o pneu, depois se pensa em velocidade, e com o seu negócio funciona igual.
Colocar mais verba em cima de estrutura furada não corrige nada, só acelera o prejuízo.

Trocar entre as duas: a constante `CARD3` no topo do `carrossel.html` (`'hospital'` ou
`'pneu'`), e reexportar.

### Card 4 · dourado
**Tag:** O PRÓXIMO PASSO
**Título:** Antes de investir mais, vale saber por onde o seu dinheiro está saindo.
**Corpo:** Eu analiso pessoalmente cada aplicação e devolvo o direcionamento em menos de 24h, olhando o seu momento e o que precisa ser resolvido primeiro.
**CTA:** Clique em Saiba Mais

---

## Legenda do post

> De cada 10 empresários que eu converso, 8 já queimaram dinheiro em tráfego, e quase nunca o problema estava no tráfego.
>
> O mercado vendeu a ideia de que bastava rodar anúncio ou postar todo dia, então a pessoa aumenta a verba, o alcance sobe, o custo por lead até melhora, e a venda continua não vindo.
>
> É que o dinheiro não some no anúncio, ele vaza depois dele, no perfil que promete uma coisa e mostra outra, na mensagem que fica três dias sem resposta, na proposta que foi enviada e ninguém retomou.
>
> Anúncio sem estrutura é torneira aberta em cano furado, você paga pela água que nunca chega no balde, e a saída não passa por abrir mais a torneira.
>
> Ninguém estanca um sangramento treinando condicionamento, no hospital a prioridade é parar o sangue, estabilizar, e só então pensar em deixar o corpo mais forte, e com negócio funciona exatamente igual.
>
> Tenho cliente que gastou 20 mil em tráfego e não teve uma venda, e o problema nunca esteve na plataforma.
>
> Antes de investir mais, vale saber por onde o seu dinheiro está saindo, e é isso que eu faço em cada aplicação que chega, com o direcionamento de volta em menos de 24h.
>
> PS: se o alcance subiu e o caixa não mudou, você já tem a resposta.

---

## De onde veio cada peça

A **estrutura narrativa** é a da referência (gancho de opinião contrária, analogia,
princípio, CTA). O **conteúdo** é todo dela, tirado da página do Método Magna:

| Elemento | Origem literal no site |
| --- | --- |
| "De cada 10 empresários, 8" | "De 10 empresários que converso, 8 já gastaram horrores em profissionais meia boca, ou eles próprios já investiram rios de dinheiro em tráfego pago e só queimaram dinheiro" |
| Torneira e vazamentos (card 2) | "Se as peças não se conectam, você está com uma torneira aberta (de tempo e dinheiro) enquanto tem vários vazamentos no meio do caminho" |
| Sangramento e condicionamento (card 3) | "se uma pessoa chega no hospital com o braço sangrando muito, a prioridade absoluta do médico é estancar o sangue... Primeiro você resolve a urgência. Depois que o corpo está estabilizado, aí sim você foca em deixá-lo mais forte" |
| 20 mil sem uma venda (legenda) | "Tenho um cliente que gastou 20 mil em tráfego e não teve UMA venda" |
| Corpo do card 4 | "Eu pessoalmente quero analisar, te direcionar e planejarmos os proximos passos, em menos de 24h" |

**Descartado da referência:** a analogia da loja de doces (não é dela) e a promessa numérica
"seis dígitos por mês".

---

## Revisão de 07/08 (feedback da cliente)

Três apontamentos dela, e o que foi feito:

**1. Excesso de ponto no lugar de vírgula.** Procede, e a regra está no Guia 1 dela:
*"Nunca quebre uma ideia em frases curtas separadas por ponto quando ela flui como uma coisa
só, use vírgula e escreva do jeito que a Vitória fala, frases mais corridas, conectadas por
vírgula, sem parar toda hora."* A versão anterior tinha ponto no meio de raciocínio que era
um só.

**2. Frases que denunciam IA.** A causa era o mesmo problema: o padrão "Não é X. É Y."
repetido em três cards. Reescrito:

| Antes | Agora |
| --- | --- |
| Grátis não filtra. Grátis convoca. | (removido, era da versão anterior) |
| Primeiro se estanca. Depois se escala. | Ninguém estanca um sangramento treinando condicionamento. |
| O primeiro passo não é investir mais. É saber onde está vazando. | Antes de investir mais, vale saber por onde o seu dinheiro está saindo. |
| Você não tem problema de volume. Você tem vazamento. | Você não tem problema de volume, você tem vazamento. |
| E quase nunca o problema estava no tráfego. | E quase nunca o problema estava no tráfego, estava em tudo que vinha depois dele. |

**3. Layout não otimizado.** Os cards 2 e 3 tinham o texto colado embaixo com um vazio
grande em cima, e os cards 1 e 4 tinham o bloco jogado no rodapé. Agora **os quatro cards
usam o mesmo princípio**: lockup no topo (quando existe) e bloco de texto centralizado no
espaço restante, com folga igual em cima e embaixo. O carrossel inteiro ficou com o mesmo
ritmo de composição.

> Nota: "Clique em Saiba Mais" é imperativo, o que a Diretriz dela normalmente evita. Foi
> pedido direto dela, e faz sentido se a peça for veiculada como anúncio, já que remete ao
> botão nativo do Instagram.

### Segunda rodada

**Remate do card 2.** *"Você não tem problema de volume, você tem vazamento"* ainda era o
padrão X/Y, só que com vírgula no lugar do ponto. Trocado por *"Você paga pela água que
nunca chega no balde"*, que estende a metáfora e nomeia a perda em vez de contrapor.

**Palavra "sangue" no tráfego.** Verificado na política oficial do Meta
([Violent and Graphic Content](https://transparency.meta.com/policies/ad-standards/objectionable-content/violent-graphic-content/)).
A política é escrita **exclusivamente sobre `imagery`**: proíbe imagens com "visible
innards, such as exposed organs, bones, or muscle tissue" e armas apontadas para o
espectador. **A palavra "blood" não aparece no texto da política, e não há restrição
textual.** Pela letra da política, não há violação.

O risco residual não é de política, é de operação: como o texto está dentro da imagem, a
revisão automatizada faz OCR e os classificadores são conservadores, então existe chance de
cair em revisão manual e atrasar a subida da campanha. Por isso a versão B existe, para
usar quando a peça for veiculada como anúncio pago e não se queira nenhum atrito.

**Recomendação:** versão A (hospital) no orgânico, já que é a analogia original dela e está
no site. Versão B (pneu) no tráfego pago. A B ainda ganha coerência com o card 2, porque
"pneu furado" conversa com "cano furado" e "acelerador" com "acelera o prejuízo".

---

## Checklist da Diretriz (validado)

- [x] Frases corridas conectadas por vírgula, sem ponto cortando raciocínio contínuo
- [x] Nenhum padrão "Não é X. É Y."
- [x] Gancho é dado específico, não pergunta genérica
- [x] Analogia vinda de negócio, dinheiro e corpo, nunca de cura, alma ou sombra
- [x] Especificidade em vez de categoria genérica (os vazamentos são nomeados um a um)
- [x] Nenhuma promessa de resultado
- [x] Nenhuma palavra da lista proibida, nenhum travessão
- [x] Fala com profissional experiente que já investe, não com iniciante
- [x] Último card sem seta, barra em 100%

---

## Pendências

- **Confirmar o dourado oficial.** Usei `#C9A24C` sobre preto `#0E0D0B`. Se existir hex de
  marca, troco no objeto `BRAND` e reexporto.
- **Confirmar o @ dela.** Só aparece no preview, não sai nos PNGs.

## A foto

`foto-vitoria.jpg` é a **DSC_2820 (2)** do ensaio (pasta "Fotos" no Drive), recortada em
quadrado (lado 860 do original, centrado em 545x610) e reduzida para 460px, 30KB. O fundo
original é preto, então no card escuro ela se funde e sobra o rosto dentro do anel dourado.

Para trocar a foto, basta substituir o arquivo mantendo o nome e reexportar. Se o arquivo
não existir, o `onerror` remove a img e o lockup cai sozinho na inicial "V", então a peça
nunca quebra.
