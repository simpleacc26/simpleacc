# WhatsApp — entrega do diagnóstico e recuperação do clique

**Data:** agosto/2026
**Onde entra:** logo depois do botão da página pós-quiz (`copy/pagina-pos-quiz-diagnostico.html`)
**Quem executa:** automação na Pulsar, com DS Voice

## Por que o fluxo começa com o lead mandando mensagem

O Meta bloqueia e limita a entrega de template para contato frio que nunca falou com a empresa. Quando **o lead manda a primeira mensagem**, abre uma janela gratuita de 24 horas: sem custo de template, sem risco de bloqueio, e com o DS Voice liberado para áudio e indicador de "gravando áudio".

Por isso o botão da página leva para o WhatsApp com mensagem pré-escrita, em vez de levar direto para uma agenda. Tudo o que está neste documento só funciona dentro dessa janela.

**Mensagem pré-preenchida do botão:** `Quero receber meu Diagnóstico de Liderança`

Esse texto precisa bater exatamente com o gatilho configurado na Pulsar. Se mudar em um lado e não no outro, o fluxo não dispara. É a única dependência externa da página.

## Sequência da entrega

Disparo automático, na ordem:

1. **Texto curto:** `Oi, tudo bem? Já tô separando aqui o seu diagnóstico.`
2. **Indicador de "gravando áudio"**, 4 a 6 segundos
3. **Áudio da Dani** (roteiro abaixo)
4. **PDF do diagnóstico** em anexo, sem texto junto
5. **Texto com o link da Etapa 2**, em mensagem separada

O link vai sempre **depois** do áudio. Se vier antes, o lead clica e o áudio não é ouvido. E vai em mensagem própria, para ficar como a última coisa na tela quando ele terminar de ler o PDF.

## Roteiro do áudio

Áudio único, gravado uma vez, igual para todos os leads independente do cenário. A personalização de cada caso já está no PDF. O papel do áudio é dar rosto e voz à entrega, dizer o que é aquele documento e conduzir para o próximo passo.

> Oi, tudo bem? Aqui é a Daniele Christensen.
>
> Você acabou de responder o diagnóstico de liderança, e eu te mandei aqui embaixo o documento com a leitura do seu cenário.
>
> Não é relatório automático, não viu? É o que as suas respostas mostram: onde a sua liderança tá travando, por que o que você já tentou não segurou, e qual é o caminho.
>
> Mas eu preciso te falar uma coisa: esse documento é o retrato da superfície. Para eu enxergar a sua gestão de verdade tem um segundo passo, leva menos de três minutos, e é o resultado dele que a gente lê junto na sessão.
>
> O link está indo logo aqui abaixo do relatório. E não é formulário de cadastro, não. São perguntas mais fundas, da mesma análise que eu uso dentro das empresas que eu acompanho. É o que me deixa chegar na nossa conversa já sabendo exatamente onde está o seu gargalo, em vez de gastar a sessão inteira te fazendo pergunta.
>
> Faz agora, enquanto o que você leu ainda está fresco, porque você sabe como é, a semana engole. Quando terminar, já aparece ali a agenda para você escolher o seu horário. Qualquer dúvida, me responde por aqui mesmo.

**Duração:** cerca de 70 segundos. Para ficar abaixo de um minuto, o corte é a frase da agenda, que já está no PDF e na mensagem de texto seguinte.

**O que o fecho faz:** mata a objeção de "é mais um cadastro"; transfere a credibilidade da metodologia para o questionário; dá o motivo real do clique, que é não desperdiçar a própria hora na sessão; e cria urgência pela realidade do lead ("a semana engole"), não por escassez inventada.

**Direção de gravação:** uma tomada só, sem ler, pelo celular, ambiente silencioso, sem fone. Áudio lido soa a locução e mata a proximidade, que é o motivo de o áudio existir. Pausa curta depois da abertura. Não citar quantidade de perguntas, só "menos de três minutos".

## Mensagem com o link

> Aqui tá o link do diagnóstico completo: [link]
>
> São menos de 3 minutos. Quando você terminar, aparece a agenda pra você escolher o horário.

E logo abaixo, o resumo em texto para quem não ouve áudio:

> Se preferir por escrito: o PDF acima é o retrato da superfície. O link é o diagnóstico completo da sua gestão, e é o resultado dele que a gente lê junto na sessão.

## Follow-ups dentro da janela de 24h

Objetivo único: recuperar quem recebeu o PDF e não clicou no link da Etapa 2. Mesma voz do áudio, disparo automático.

### Follow-up 1 — cerca de 3 horas depois

> Conseguiu ler o documento que te mandei?
>
> Se bateu com o que você vive aí, o próximo passo está nesse link: [link]. São menos de três minutos, e é o resultado dele que a gente lê junto na sessão.

Curto de propósito. O lead ainda lembra do áudio, então não precisa reexplicar nada, só reapresentar o link com um motivo.

### Follow-up 2 — cerca de 20 horas depois

> Vou ser direta com você: o documento sozinho não muda nada aí dentro. Ele te deu o nome do problema, e nome de problema não resolve problema.
>
> O que destrava é a leitura completa e a conversa em cima dela: [link]
>
> E se não for o momento, tudo bem, é só me dizer que eu não te mando mais nada.

A franqueza combina com o tom dela e com um público que não tolera enrolação. A saída aberta no fim faz o lead responder mesmo que seja para dizer não, o que reabre a janela de 24h e entrega o contato quente para o SDR.

## Regras da régua

- Para de disparar assim que o lead clicar no link **ou** responder qualquer coisa.
- Se o lead responder, o SDR assume e **se apresenta como parte do time da Dani**, nunca respondendo como se fosse ela.
- Passadas as 24h sem clique, qualquer nova mensagem vira template do Meta e volta o risco de bloqueio. Recomendação: não insistir por lá. Quem não clicou em 24h entra na nutrição e volta pelo remarketing.
- **Dependência técnica (Pulsar):** o link precisa ser rastreável por lead. Sem isso o CRM não sabe quem clicou e os follow-ups batem também em quem já preencheu.

## Ponto aberto para alinhar com a Dani

O áudio diz "a gente lê junto na sessão", em primeira pessoa, porque é assim que os 4 PDFs aprovados terminam. Mas o documento de Etapa 2 dela descreve o Closer conduzindo a leitura. Se quem faz a sessão for o time comercial e não ela, a frase precisa virar "é o resultado dele que vamos ler com você na sessão", e a mesma correção vale nos 4 PDFs. Como está hoje, promete a presença dela.
