# Por que o relatório não chega no WhatsApp (e como consertar)

**Data:** 31/07/2026
**Origem:** cliente relatou que, no Quiz A e no Quiz B, o lead recebe só a
primeira mensagem automática do GHL, sem o relatório personalizado.

## O diagnóstico

O relatório é personalizado por **pilar** (Método, Modelo de negócio, Processo
de vendas, Mentalidade). Pra automação do GHL escolher qual relatório mandar,
ela precisa saber qual pilar o lead tirou.

**Ela não sabe. O pilar nunca chega no GHL.**

Rastreando o caminho do dado nos dois funis:

| Etapa | Quiz A | Quiz B |
| --- | --- | --- |
| Quiz calcula o pilar | sim (no bundle de produção) | sim (`diagnose()`) |
| Quiz envia o pilar pro Make | **não** | sim (campo `pilar`) |
| Make grava o pilar na planilha | **não** | sim (coluna L) |
| Make grava o pilar no contato do GHL | **não** | **não** |
| Automação do GHL escolhe o PDF | **não tem como** | **não tem como** |

O cenário do Make manda pro GHL apenas nome, e-mail, telefone, UTMs e as 7
respostas cruas. O pilar (que é a conclusão do quiz) morre no meio do caminho.

Por isso a primeira mensagem chega "pelada": o template do GHL não tem um campo
de pilar pra referenciar nem um anexo pra escolher. Não é falha de disparo, é
falta do dado.

Um detalhe que reforça: o texto atual da MENSAGEM 1 (no doc `[Rafael Granella]
Copies 2026`) diz *"esse mecanismo não está no relatório"*, ou seja, foi escrito
assumindo que o lead **já tinha lido o relatório na tela** ao final do quiz. A
mensagem era follow-up, não entrega. A expectativa do cliente hoje é outra:
entregar o relatório em PDF pelo WhatsApp.

## Bug adicional encontrado no caminho (Quiz A)

No cenário `4936072` (Quiz A), o mapeamento das respostas pros campos
personalizados do GHL está **deslocado em uma posição**. Confirmado cruzando a
planilha de leads (que está correta) com o blueprint do Make:

| Campo no GHL (nome) | Recebe hoje | Deveria receber |
| --- | --- | --- |
| 1 - Como você estrutura a entrega | `resposta_1` = "Qual das opções melhor descreve você" | `resposta_2` |
| 2 - Qual é o maior gargalo | `resposta_2` = "Como você estrutura a entrega" | `resposta_3` |
| 3 - E como isso está impactando | `resposta_3` = "maior gargalo" | `resposta_4` |
| 4 - O que você já tentou | `resposta_4` = "impactando" | `resposta_5` |
| 5 - Qual é o objetivo principal | `resposta_5` = "o que já tentou" | `resposta_6` |
| 6 - Qual das opções melhor descreve você | `resposta_6` = "objetivo" | `resposta_1` |
| 7 - Faturamento | `resposta_7` | correto |

Efeito: quem abre o contato no GHL lê as respostas trocadas, e qualquer
automação que ramifique por esses campos ramifica pelo dado errado. A planilha
não sofre disso, o erro é só no módulo do GHL.

## O plano de correção

### 1. Os 4 PDFs (feito)

Estão em `funis/relatorio-pdf/`, com o mesmo conteúdo, estrutura e identidade
visual da página de relatório que já roda hoje. Um por pilar.

### 2. Criar o campo personalizado no GHL (manual, ~2 min)

Em **Settings → Custom Fields → Add Field**:

- Object: Contact
- Field type: **Single Line Text** (não usar Dropdown, evita quebrar se o texto mudar)
- Name: `Pilar diagnosticado`

Depois de criar, abrir o campo e copiar o **ID** dele. Sem esse ID o Make não
consegue escrever nele.

### 3. Passar o pilar no Make

**Quiz B (cenário `5744483`)** — já recebe o pilar pronto. No módulo 2
(*HighLevel → Create a Contact*), em Custom Fields, adicionar o campo novo e
mapear:

```
{{1.pilar}}
```

**Quiz A (cenário `4936072`)** — não recebe o pilar. O bundle de produção do
Quiz A está fora deste repositório (projeto Vercel sem Git conectado), então não
dá pra alterar o código dele daqui. A saída é **derivar o pilar dentro do Make**
a partir da resposta de gargalo, que mapeia 1 pra 1 nos 4 pilares:

| Resposta de "Qual é o maior gargalo" (`resposta_3`) | Pilar |
| --- | --- |
| Previsibilidade de aquisição de clientes | Processo de vendas |
| Ticket médio abaixo do que meu trabalho vale | Modelo de negócio |
| Escalar sem depender só de mim | Método |
| Não tenho clareza sobre qual modelo de negócio faz sentido agora | Mentalidade |

Fórmula pra colar no campo `Pilar diagnosticado` do módulo 2:

```
{{switch(1.resposta_3;
  "Previsibilidade de aquisição de clientes"; "Processo de vendas";
  "Ticket médio abaixo do que meu trabalho vale"; "Modelo de negócio";
  "Escalar sem depender só de mim"; "Método";
  "Não tenho clareza sobre qual modelo de negócio faz sentido agora"; "Mentalidade";
  "Modelo de negócio")}}
```

O último valor é o padrão, usado se a resposta vier vazia ou diferente. É o
mesmo padrão que a página de relatório já adota hoje.

Aproveitar a mesma edição para corrigir o deslocamento dos campos descrito acima.

### 4. Subir os PDFs no GHL

**Media Library → Upload**, os 4 arquivos. O GHL gera uma URL pra cada um.

### 5. Montar a ramificação no workflow

No workflow que dispara a primeira mensagem, entre o gatilho e o envio, inserir
um **If/Else** com 4 caminhos, testando `Pilar diagnosticado`:

- `is` `Método` → envia a mensagem com `relatorio-metodo.pdf`
- `is` `Modelo de negócio` → `relatorio-modelo-de-negocio.pdf`
- `is` `Processo de vendas` → `relatorio-processo-de-vendas.pdf`
- `is` `Mentalidade` → `relatorio-mentalidade.pdf`

No bloco **Send WhatsApp Message**, usar o campo de anexo (*Add Attachment*) e
escolher o PDF da Media Library correspondente àquele caminho.

### 6. Reescrever a MENSAGEM 1

O texto atual assume que o lead já leu o relatório. Agora a mensagem **entrega**
o relatório, então precisa mudar. Sugestão, com o campo de pilar embutido:

> Oi, {{contact.first_name}}! Tudo bem? Aqui é a [nome], da equipe do Rafael Granella.
>
> Acabei de analisar as suas respostas e o seu diagnóstico ficou pronto. Está em anexo aqui.
>
> Pelo que você respondeu, o que está travando o seu próximo salto é **{{contact.pilar_diagnosticado}}**. O relatório explica o porquê e qual é o próximo movimento.
>
> Dá uma olhada e me diz o que fez mais sentido pra você. Se quiser, eu te mostro como isso se aplica no seu caso específico numa conversa de 30 minutos.

Substituir `{{contact.pilar_diagnosticado}}` pelo merge tag real que o GHL gerar
ao criar o campo.

### 7. Testar ponta a ponta

Rodar um lead de teste em cada quiz escolhendo respostas que caiam em pilares
diferentes, e conferir: contato criado no GHL com o campo preenchido, workflow
entrando no caminho certo, PDF certo chegando no WhatsApp.

## Ordem de execução

O passo 2 é o bloqueio: sem o ID do campo personalizado, os passos 3 e 5 não
saem do lugar. Tudo o mais já está pronto ou é configuração de tela no GHL.
