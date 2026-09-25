# Quiz Diagnóstico Genérico · Vitória Daniela / Grupo Magna

Funil **Quiz → Análise (5s) → Diagnóstico**, com a **LP da análise estratégica
(VSL)** pronta para entrar depois do diagnóstico. HTML/CSS/JS puro, sem
dependências, sem build.

**No ar:** https://diagnostico-magna.vercel.app (quiz + diagnóstico).
A LP (`analise.html`) **ainda não foi publicada**: falta o vídeo (ver
Pendências).

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
voltou para antes da urgência. **Atenção:** a pergunta 7 diz "converter
**pacientes** premium", palavra da área da saúde num quiz genérico. Está como
ela escreveu; confirmar com ela se deve ser "clientes".

A pedido do Daniel (25/09) a 1ª tela não mostra selo, tempo nem rótulos de
etapa, e a barra de progresso só aparece a partir da 2ª pergunta.

## Diagnóstico (diagnostico.html + diagnostico.js + diagnostico.css)

As 11 "páginas" do doc (Capa, Carta, 3 vazamentos, 3 pilares, Por onde
começar, Recapitulando, Próximo passo, Sobre a Vitória, Prova real, Pra quem
é, O que fazer agora), texto dela. Na web cada página é um cartão; no **Baixar
PDF** cada uma vira uma página A4 no mesmo visual escuro/dourado.

Única correção de texto: na página 3, item 02, o doc veio cortado ("Só que quem
compra um serviço de R200."). Ficou "Só que quem compra um serviço de R$10.000
não decide do mesmo jeito que quem compra um de R$200.", no espírito da VSL
dela. Confirmar com ela.

CTA final ("Quero agendar minha análise estratégica") abre o WhatsApp da
equipe. Quando a LP com VSL for ao ar, dá para apontar esse botão para ela.

## LP da análise estratégica + VSL (analise.html / analise.js / analise.css)

Dobras 1 a 6 do doc, texto dela. Na dobra 5 o texto fala em "sua clínica" e
"pacientes" (herdado da LP Saúde); está como ela escreveu, confirmar.

- **Player:** em `analise.js`, `VSL.vturb` recebe o código de incorporação do
  VTurb (preferência dela) **ou** `VSL.src` recebe o caminho de um mp4
  hospedado. Player próprio no estilo VTurb: começa mudo com "Seu vídeo já
  começou / Clique para ouvir", barra de progresso rápida no início.
- **Teste A/B do atraso de 2 min** (pedido no doc): variante A mostra a página
  toda; variante B esconde texto, botões e o resto da página até 2 min de
  vídeo assistido. A variante fica salva no navegador e muda a mensagem do
  WhatsApp: A = "Quero agendar minha análise estratégica.", B = "Assisti o
  vídeo e quero agendar…". Assim a SDR sabe de qual variante veio cada
  conversa. Forçar uma variante para teste: `analise.html?v=a` ou `?v=b`.

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

- [ ] **VSL:** o `vsl.mp4` (166MB, conta grupomagnaoficial) é privado no
      Drive e grande demais para baixar pela integração. Precisa: o código de
      incorporação do VTurb **ou** o arquivo compartilhado como "qualquer
      pessoa com o link". Com ele: comprimir, publicar a LP e apontar o CTA
      do diagnóstico para `analise.html`.
- [ ] Token novo da Vercel com acesso ao time Simpleacc (o atual perdeu).
- [ ] Implantar o Apps Script e ligar `LEADS_ENDPOINT` (republicar `app.js`,
      que já tem o payload novo com segmento).
- [ ] Confirmar com a Vitória: "pacientes" na pergunta 7 e na dobra 5 da LP,
      e a frase completada na página 3 do diagnóstico.
