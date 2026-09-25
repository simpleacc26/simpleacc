# Quiz Diagnóstico Genérico · Vitória Daniela / Grupo Magna

Funil **Quiz → Análise (5s) → Diagnóstico com a VSL no topo**. HTML/CSS/JS
puro, sem dependências, sem build.

**No ar:** https://diagnostico-magna.vercel.app (quiz + diagnóstico) e
https://diagnostico-magna.vercel.app/analise.html (LP com a VSL, fora do fluxo
por enquanto).

Fluxo (25/09, pedido do Daniel): quiz → análise (5s) → diagnóstico, que abre
com a VSL antes da capa → botão final "Quero agendar minha análise
estratégica" e "Falar no WhatsApp" do topo → WhatsApp. A LP `analise.html`
continua publicada (com o teste A/B do atraso), mas nenhum botão leva até ela.

## Copy (atualização da Vitória em 25/09/2026)

Texto e ordem **exatamente** como ela deixou no doc "QUIZ" (aba QUIZ GENÉRICO),
conferido por comparação automática (0 diferenças):

1. Qual seu segmento de atuação? (**nova**)
2. Qual vem sendo o maior desafio do seu negócio? (pergunta de balde)
3. Qual dessas opções descreve o seu momento?
4. Como está desenhada a estrutura da sua empresa hoje?
5. Meu faturamento mensal é de:
6. Qual seu momento de urgência em resolver isso?
7. Você quer que um especialista analise o seu cenário…

A pergunta de ticket médio saiu (ela não manteve no doc) e o faturamento
voltou para antes da urgência. Única mudança de texto no quiz, a pedido do
Daniel (25/09): na pergunta 7, "pacientes premium" virou "clientes premium"
(o genérico não fala de clínica nem de pacientes; a única menção a clínica é
dentro da opção de segmento "Estética, beleza e bem-estar").

A pedido do Daniel (25/09) a 1ª tela não mostra selo, tempo nem rótulos de
etapa, e a barra de progresso só aparece a partir da 2ª pergunta.

## Diagnóstico (diagnostico.html + diagnostico.js + diagnostico.css)

As 11 "páginas" do doc (Capa, Carta, 3 vazamentos, 3 pilares, Por onde
começar, Recapitulando, Próximo passo, Sobre a Vitória, Prova real, Pra quem
é, O que fazer agora), texto dela. Na web cada página é um cartão; no **Baixar
PDF** cada uma vira uma página A4 no mesmo visual escuro/dourado.

Correções de texto: na página 3, item 02, o doc veio cortado ("Só que quem
compra um serviço de R200."). Ficou "Só que quem compra um serviço de R$10.000
não decide do mesmo jeito que quem compra um de R$200.". Na página 7, "quem
vende um protocolo numa clínica" virou "quem vende um projeto de arquitetura"
(genérico sem clínica).

A VSL aparece no topo do diagnóstico, antes da capa (some no PDF). O CTA
final ("Quero agendar minha análise estratégica") vai para o WhatsApp.

## Player da VSL (vsl.js + vsl.css)

Componente único, usado no diagnóstico e na LP. Começa mudo em autoplay com
"Seu vídeo já começou / Clique para ouvir"; no 1º clique volta ao início, liga
o som e o aviso some de vez. Depois: clique no vídeo pausa/continua, play
grande no meio quando pausado, barra com play/pausa, volume (mudo + controle
deslizante, que no celular fica oculto porque o volume é o do aparelho) e tela
cheia. Os controles somem sozinhos com o vídeo rodando e o mouse parado.
Barra de progresso "rápida no começo, lenta no fim", sem permitir pular.
(Bug corrigido: o aviso tinha `display:flex` no CSS, que anulava o `hidden`,
então nunca sumia e cada clique recomeçava o vídeo.)

## LP da análise estratégica + VSL (analise.html / analise.js / analise.css)

Dobras 1 a 6 do doc, texto dela. Na dobra 5, "sua clínica" virou "seu
negócio" e "pacientes" virou "clientes" (genérico sem clínica).

- **Player:** em `analise.js`, `VSL.vturb` recebe o código de incorporação do
  VTurb (preferência dela) **ou** `VSL.src` recebe o caminho de um mp4
  hospedado (tocado pelo `vsl.js`).
- **Teste A/B do atraso de 2 min** (pedido no doc): variante A mostra a página
  toda; variante B esconde texto, botões e o resto da página até 2 min de
  vídeo assistido. A variante fica salva no navegador e muda a mensagem do
  WhatsApp: A = "Quero agendar minha análise estratégica.", B = "Assisti o
  vídeo e quero agendar…". Assim a SDR sabe de qual variante veio cada
  conversa. Forçar uma variante para teste: `analise.html?v=a` ou `?v=b`.

### Arquivo da VSL (fora do Git)

Original: `vsl.mp4` no Drive (ID 1xpnXrGs2D3UeUBwg7R5ga1c0jSFZoYBL, 11min37,
1080p, 166MB). Publicado em `assets/vsl/` (ignorado pelo Git) como versão web
720p (~70MB, abaixo do limite de 100MB por arquivo da Vercel) + capa:

```
ffmpeg -ss 1 -i vsl.mp4 -frames:v 1 -vf scale=1280:-2 -q:v 4 assets/vsl/poster.jpg
ffmpeg -i vsl.mp4 -vf scale=-2:720 -c:v libx264 -preset medium -profile:v high \
  -b:v 750k -maxrate 1000k -bufsize 1500k -pix_fmt yuv420p -c:a aac -b:a 96k \
  -movflags +faststart assets/vsl/vsl-720.mp4
```

## Lógica de balde e camada (flow.js)

Balde pela pergunta de maior desafio. Camada: desqualificado se respondeu
"Não" na pergunta 7, se não pode investir agora ou se fatura até R$20 mil; B se
fatura 20 a 40 mil (ou 40 mil+ fazendo tudo sozinha); A se fatura 40 mil+ com
equipe. Sem o ticket médio, a camada A ficou mais aberta: ajustar com dados.

## Leads → planilha

`integracao-planilha.gs` (o mesmo do Quiz Saúde) grava o Genérico na aba
"Genérico" da planilha "Leads | New Quizzes - Vitória Daniela", com a coluna
Segmento. Falta implantar e ligar `LEADS_ENDPOINT` no `app.js`.

## Deploy

Vercel, time Simpleacc, projeto `diagnostico-magna`. Publicar só os arquivos
de runtime a partir de uma pasta temporária, nunca a raiz do repositório.
Em 25/09 o token da CLI perdeu acesso ao time (a Vercel pediu nova
autenticação); a publicação desse dia foi feita pelo conector da Vercel e
conferida arquivo por arquivo.

## Pendências

- [ ] Implantar o Apps Script e ligar `LEADS_ENDPOINT`.
- [ ] Confirmar com a Vitória a frase completada na página 3 do diagnóstico.
- [ ] VTurb: se ela preferir o player do VTurb, colar o código em `VSL.vturb`
      no `analise.js` (substitui o vídeo hospedado).
