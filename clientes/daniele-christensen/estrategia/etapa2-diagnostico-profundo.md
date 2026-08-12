# Etapa 2 — Diagnóstico completo (especificação para produção)

**Data:** agosto/2026
**Base:** documentos `Etapa2_Diagnostico` e `Etapa2_Disparo` (Grokker) + transcrição da
reunião com a Pulsar (`estrategia/transcricao-reuniao-pulsar.txt`)
**Protótipo:** `funis/prototipo-etapa2/`

Este documento existe porque a documentação da Grokker e a reunião com a Pulsar
descrevem **fluxos diferentes** para a mesma peça. Aqui está o que foi mantido de
cada lado e por quê, para que quem implementar não precise escolher no escuro.

## O que é

O formulário de 15 perguntas que o lead responde **entre** receber o PDF do
diagnóstico no WhatsApp e escolher o horário da sessão estratégica. Ele mede o
tamanho do gap de gestão em cinco blocos e entrega ao Closer, antes da call, a
nota de cada bloco e o Total Diagnóstico.

Para o lead é um passo curto. Para o comercial é a pauta da conversa.

## As divergências e o que vale

### 1. Quando o link é disparado

**Documentação:** no instante em que o lead confirma o agendamento. Primeiro
agenda, depois preenche.
**Call:** o link vai junto com a entrega do PDF, e a agenda aparece no fim do
formulário. Foi a ordem que o Graziano recapitulou no fechamento da reunião:
*"ele recebe o áudio, recebe o PDF e recebe o link"*, com a Dani presente.

**Vale a ordem da call.** Não só por ser mais recente: a documentação justifica a
ordem dela com o argumento de que pedir *"um formulário longo de 15 minutos"*
antes do agendamento derrubaria a conversão. Esse argumento cai junto com a
premissa, porque o formulário não tem 15 minutos (ver adiante). Com 3 minutos, o
esforço pedido é menor que o de abrir uma agenda e escolher um horário.

O compromisso psicológico que a documentação queria proteger continua existindo,
só muda de fonte: em vez de vir do horário reservado, vem do áudio da Dani e do
PDF que o lead acabou de receber. Ele preenche em cima da leitura, não frio.

### 2. Quanto tempo leva

**Documentação:** 15 minutos, em dois trechos.
**Call:** 3 minutos, calculado pela própria Dani ao vivo (*"em 3 minutos ela
responde, eu calculei"*), e o Graziano pediu que entrasse na copy como *"mais 3
minutinhos"*.

**Vale 3 minutos.** São 15 perguntas de toque único numa escala de quatro pontos.
O protótipo confirma a conta. O número aparece na abertura do formulário, no
áudio e nos PDFs.

> **Pendência:** a página pós-quiz hoje promete **5 minutos**, e o resto do
> material promete 3. É a mesma peça anunciada com dois números para o mesmo
> lead. Falta decidir qual vale e uniformizar.

### 3. Quem recebe

**Documentação:** só quem agendou. Quem não agenda vai para nutrição e nunca vê a
Etapa 2, *"porque pedir esforço sem recompensa derruba a experiência"*.
**Call:** todo mundo que chamou no WhatsApp recebe, porque o formulário é o
caminho até a agenda.

**Vale a regra da call**, por consequência da ordem nova. A recompensa que a
documentação procurava passa a estar do outro lado do formulário: quem preenche
sai com o horário marcado.

A nutrição não some, muda de gatilho. Antes era para quem não agendou; agora é
para quem recebeu o link e não preencheu dentro da janela de 24 horas.

### 4. O que deixa de fazer sentido

Três mecanismos da documentação existiam só para sustentar a ordem antiga e saem:

- Lembretes automáticos 24h e 4h antes da call para quem agendou e não preencheu.
  Na ordem nova não existe agendado sem preenchimento. O que fica no lugar são os
  dois follow-ups dentro da janela de 24h já descritos em
  `copy/whatsapp-entrega-diagnostico.md`.
- A prerrogativa de o Closer **reagendar** quem chega à call sem ter preenchido.
- O SDR cobrando o preenchimento de quem já agendou.

## O que foi mantido da documentação, sem alteração

O instrumento em si é propriedade intelectual da Grokker e a documentação proíbe
mexer na redação das perguntas, na ordem dos blocos e na escala. **Nada disso foi
tocado.** O que segue é transcrição fiel.

### Escala

Quatro pontos, com pontuação **invertida**:

| Resposta | Pontos |
|---|---|
| Sempre | 0 |
| Geralmente | 4 |
| Às vezes | 8 |
| Nunca | 10 |

As perguntas são escritas na forma positiva e a pontuação é invertida de
propósito: **nota alta significa gap maior**. Quem lê o resultado precisa saber
disso, porque interpretar nota alta como bom desempenho inverte o sentido da call
inteira.

### Blocos e perguntas

| Bloco | Nome | Perguntas | Cálculo |
|---|---|---|---|
| A | Exigência e Responsabilização | A1, A2 | (A1+A2)/2 |
| B | Autonomia da Equipe e Execução | B1, B2 | (B1+B2)/2 |
| C | Reuniões e Prazos | C1, C2 | (C1+C2)/2 |
| D | Delegação e Maturidade do Time | D1 a D4 | soma/4 |
| E | Cultura, Alinhamento e Retenção | E1 a E5 | soma/5 |

**Total Diagnóstico:** `TD = (A + B + C + D + E) / 5`

O texto das 15 perguntas está no protótipo, em `funis/prototipo-etapa2/index.html`,
copiado palavra por palavra do documento original.

### Régua de leitura

- **TD** é o índice de caos de gestão. Quanto mais perto de 10, mais urgente.
- **Bloco dominante** é o de maior nota. É por ele que o Closer abre a conversa,
  mesmo quando o TD é médio: um TD 5 com bloco A em 10 vende mais que um TD 6
  distribuído por igual.
- **Lead Hot:** TD acima de 8,0 **ou** nota 10 em A, B ou D. Entra no CRM com
  etiqueta de prioridade.

### Ponte com o cenário da Etapa 1

| Cenário da Etapa 1 | Blocos correspondentes |
|---|---|
| O Adiador | A (Exigência) e E4 (medo de ser impopular) |
| O Gargalo | B (Autonomia e "o que fazemos agora?") |
| Time que não Assume | D (Delegação) e A2 (culpabilização externa) |
| Plano que não Vira Execução | C (Reuniões e Prazos) e D2 (confiança na meta) |

Serve para o Closer amarrar as duas etapas: *"no quiz você caiu em O Adiador;
agora, olhando o bloco A, dá para ver exatamente por quê"*.

### Régua financeira

Continua sendo a da Etapa 1 (dono ≥ R$ 200 mil/mês; executivo ≥ R$ 10 mil com
autonomia), sempre em base **mensal**. A Etapa 2 qualifica o problema, não o
bolso.

### Confidencialidade

A página leva `noindex` e não deve ser indexada nem acessível fora do fluxo. O
lead é informado de que as respostas são confidenciais — está na abertura do
formulário, e não é só cortesia: resposta socialmente aceitável mascara a dor e
estraga o diagnóstico.

## O que precisa existir do lado técnico

### O link

Precisa carregar a identificação do lead, senão o CRM não sabe quem preencheu e
os follow-ups batem em quem já respondeu. O protótipo lê três parâmetros:

```
/etapa2?lead=<id>&nome=<primeiro nome>&cenario=<cenário da Etapa 1>
```

`nome` personaliza a abertura. `cenario` é o que permite mostrar a ponte ao
Closer. Ambos são opcionais; `lead` não.

### O envio ao CRM

Um webhook único, disparado quando as 15 perguntas terminam, com tudo calculado
do nosso lado. O Closer não deve receber respostas cruas para somar na mão.

```json
{
  "lead_id": "...",
  "etapa": 2,
  "cenario_etapa1": "O Gargalo",
  "respostas": { "A1": 10, "A2": 4, "...": "..." },
  "blocos": { "A": 7, "B": 9, "C": 7, "D": 8, "E": 8 },
  "td": 7.8,
  "bloco_dominante": "B",
  "lead_hot": false
}
```

São 15 campos de resposta, 5 de bloco, o TD, o bloco dominante e a etiqueta de
Lead Hot. A documentação pede que o dado esteja no CRM em até 5 minutos; sendo
webhook na conclusão, é imediato.

### A agenda

A última tela do formulário é onde o calendário aparece. É o único ponto em que
dependemos da Pulsar para fechar a etapa: ou embutimos o widget da agenda deles,
ou redirecionamos para ela levando o `lead_id`. Precisa ser definido antes de a
implementação começar.

## Pendências

1. **3 ou 5 minutos.** Decidir e uniformizar página, áudio, PDFs e formulário.
2. **A agenda da última tela.** Widget embutido ou redirecionamento.
3. **Quem hospeda.** A recomendação é a Simple, pelo mesmo motor da Etapa 1, com
   a Pulsar recebendo um webhook só. Não foi fechado na reunião.
4. **"A gente lê junto".** O material fala em primeira pessoa, como se a Dani
   conduzisse a sessão; a documentação descreve o Closer conduzindo. O texto da
   última tela do formulário está neutro (*"quem conduz a sua sessão"*) para não
   prometer a presença dela, mas o áudio e os 4 PDFs ainda prometem.
