# Templates de WhatsApp no GHL (Delphis)

Fase 2 da automação: primeira mensagem e follow-up disparados pelo CRM.
Status: **texto pronto, aguardando a conexão do WhatsApp.**

---

## A regra que define tudo: a janela de 24 horas

A API oficial do WhatsApp separa as mensagens em duas categorias, e isso muda o que dá
para fazer em cada caso.

**Dentro de 24 horas depois de a pessoa mandar mensagem:** texto livre. Personalização
total, sem aprovação de ninguém, muda quando a gente quiser.

**Fora dessa janela, ou quando a gente fala primeiro:** só com **template aprovado pela
Meta**. O texto é submetido, revisado e aprovado antes de poder ser usado. Aprovação leva
de algumas horas a alguns dias. As variáveis são posicionais, `{{1}}`, `{{2}}`, e cada
mudança de texto exige nova aprovação.

### O que isso significa no funil do Delphis

| Situação | Quem é | O que dá para mandar |
| --- | --- | --- |
| **Porta A**, a pessoa clica no botão do diagnóstico e chama | Minoria dos leads | Texto livre, personalizado com todos os campos do quiz |
| **Porta B**, a pessoa responde o quiz e nunca chama | Maioria dos leads | Template aprovado pela Meta |

A automação da primeira abordagem que o Delphis pediu é a **Porta B**. Então ela depende
de template aprovado, e o texto abaixo é o que vai ser submetido.

---

## Por que os textos citam a resposta em vez de encaixar na frase

Os campos do CRM guardam a opção exata que a pessoa marcou, na primeira pessoa:
`Ensaio a frase na cabeça e não falo`, `Mais de 10 anos, em fases diferentes da carreira`.

Encaixar isso no meio de uma frase quebra a gramática dependendo da opção escolhida. Citar
a resposta resolve, e tem um efeito melhor: prova que alguém leu de verdade, que é
exatamente o que a primeira mensagem precisa fazer.

---

## Templates para submeter à Meta

Idioma `pt_BR`, categoria **Marketing**. As variáveis são posicionais.

### T1 · Primeira abordagem

Variáveis: `{{1}}` primeiro nome · `{{2}}` há quanto tempo · `{{3}}` o que já custou

```
{{1}}, aqui é o Delphis.

Acabei de ler as suas respostas no Diagnóstico AUTOFOCO. Teve duas que eu não consegui deixar passar:

Há quanto tempo isso se repete: {{2}}
O que isso já te custou: {{3}}

Posso te devolver a leitura do que eu vi? É rápido.
```

### T2 · Segundo toque, dia 2

Variáveis: `{{1}}` primeiro nome · `{{2}}` padrão

```
{{1}}, sem pressa nenhuma para me responder.

Vou te adiantar uma coisa que talvez te poupe tempo. O seu resultado deu {{2}}, e esse é o que mais engana. Quem tem esse padrão costuma achar que precisa treinar mais, e treinar mais é justamente o que mantém o problema em pé.

Quando puder, me responde uma coisa só: isso aparece só no trabalho ou já começou a aparecer em outros lugares também?
```

### T3 · Dia 4, saída digna

Variáveis: `{{1}}` primeiro nome

```
{{1}}, me responde só com 1 ou 2 para eu saber o que fazer:

1, quero conversar sobre isso
2, agora não é o meu momento

Qualquer uma das duas resolve para mim, eu só não gosto de ficar insistindo com quem não quer.
```

### T4 · Dia 8, encerramento

Variáveis: `{{1}}` primeiro nome · `{{2}}` padrão

```
Vou encerrar o seu atendimento aqui, {{1}}, para não te incomodar mais.

Deixo só isto: da próxima vez que acontecer de novo, e vai acontecer, você já sabe o nome disso. Está no seu diagnóstico, é {{2}}.

Quando quiser tratar, me chama aqui mesmo que eu te encaixo.
```

### T5 · Lead do lote inicial

Para os 24 leads que já estavam na planilha antes da integração. Eles responderam o quiz
há alguns dias e nunca foram procurados, então a mensagem não pode soar como se tivessem
acabado de responder.

Variáveis: `{{1}}` primeiro nome · `{{2}}` data do quiz

```
{{1}}, aqui é o Delphis, e peço desculpa pela demora.

Você respondeu o Diagnóstico AUTOFOCO em {{2}} e eu só agora consegui olhar as respostas com calma. Olhei as suas.

Se ainda fizer sentido, eu te devolvo a leitura do que encontrei. Quer?
```

---

## Mensagens de texto livre

Não precisam de aprovação. Valem para quem chamou primeiro, e para qualquer resposta
dentro de 24 horas depois de a pessoa escrever.

As chaves de personalização do GHL:

| Campo | Chave |
| --- | --- |
| Primeiro nome | `{{contact.first_name}}` |
| Classificação | `{{contact.autofoco__classificacao}}` |
| Padrão | `{{contact.autofoco__padro}}` |
| Onde a comunicação pesa | `{{contact.autofoco__onde_a_comunicao_pesa}}` |
| Momento profissional | `{{contact.autofoco__momento_profissional}}` |
| O que se repete | `{{contact.autofoco__o_que_se_repete}}` |
| O que acontece depois | `{{contact.autofoco__o_que_acontece_depois}}` |
| Há quanto tempo | `{{contact.autofoco__h_quanto_tempo}}` |
| O que já custou | `{{contact.autofoco__o_que_j_custou}}` |
| O que já tentou | `{{contact.autofoco__o_que_j_tentou}}` |
| Objetivo em 3 meses | `{{contact.autofoco__objetivo_em_3_meses}}` |
| Prontidão | `{{contact.autofoco__prontido}}` |
| Data do quiz | `{{contact.autofoco__data_do_quiz}}` |

> As chaves saem com os acentos removidos pelo próprio GHL, por isso `padro` e `prontido`.
> Não são erro de digitação e não devem ser corrigidas na mão.

### L1 · Resposta a quem chamou primeiro

```
{{contact.first_name}}, que bom te ver por aqui. Já estou com as suas respostas abertas na minha frente.

Você marcou duas coisas:

"{{contact.autofoco__o_que_se_repete}}"
"{{contact.autofoco__o_que_acontece_depois}}"

É isso mesmo que acontece com você?
```

### L2 · Depois que a pessoa confirma

```
É isso mesmo que eu esperava ler, e eu vou te dizer por quê.

Não é falta de preparo e não é falta de conteúdo. Você marcou que já tentou "{{contact.autofoco__o_que_j_tentou}}", e continua acontecendo. Não continua porque você fez pouco, continua porque o trabalho foi feito no lugar errado.

Vou te fazer duas perguntas rápidas antes de te dizer qual é o caminho, pode ser?
```

### L3 · A pergunta que mais importa

```
Você tem alguma reunião, gravação, apresentação ou conversa importante marcada para os próximos dias?
```

---

## Regras de disparo

- **Nunca automatizar depois que a pessoa responde.** O gatilho para tudo isso é silêncio.
  Assim que ela escrever, a régua para e o Delphis assume. Conversa automática com alguém
  que já está falando com você é o jeito mais rápido de queimar o lead.
- **Janela de horário.** Nada antes das 8h nem depois das 21h, horário de São Paulo. Este
  público é executivo e profissional liberal, e mensagem fora de hora incomoda.
- **Parar na resposta e na sessão agendada.** Duas condições de saída, as duas obrigatórias.
- **Limite de quatro toques.** T1, T2, T3 e T4, e acabou. O manual de pré-vendas é explícito
  sobre não perseguir lead.

## O que ainda não está definido

O número. Ver `contexto/integracao-ghl-make.md`, seção do WhatsApp.
