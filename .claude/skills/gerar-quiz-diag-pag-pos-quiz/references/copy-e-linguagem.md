# Copy e linguagem do funil

## 1. Linguagem neutra em gênero

**Nenhum adjetivo pode concordar com quem lê.**

Foi o erro mais caro de copy que a gente cometeu. O quiz da Luana saiu inteiro
no feminino ("sou muito boa", "ser lembrada", "quero virar mentora") **porque a
cliente é mulher**. Só que o ICP dela tem médicos, advogados, coaches e
nutricionistas homens. **Metade do público lia uma frase que não era sobre ele.**

> O gênero do cliente não é o gênero do público. Confundir os dois é o default
> silencioso, e passa despercebido porque cada frase isolada soa natural.

**Teste obrigatório ao escrever qualquer alternativa:** leia em voz alta como
homem e como mulher. Se soar errado numa das duas, reescreva.

| Não | Sim |
| --- | --- |
| Sou muito boa no que faço | Faço um trabalho muito bom |
| Quero ser lembrada | Quero que me lembrem |
| Cansada de ser invisível | Cansei de ser invisível |
| Preparada para escalar | Com estrutura para escalar |

Saídas que sempre funcionam: **verbo na primeira pessoa** ("faço", "cansei"),
**substantivo no lugar do adjetivo** ("um trabalho muito bom"), e oração em vez
de particípio.

Vale para o quiz, o relatório, a mensagem de WhatsApp e os avisos de erro. O
risco é maior nas alternativas do quiz, que são escritas na primeira pessoa.

Deixe a regra escrita **no cabeçalho do `flow.js`**, para quem editar depois.

## 2. Nunca prometer resultado financeiro, se o cliente recusa

Extraia isso no intake e trate como trava. Alguns clientes se recusam a prometer
número **porque eles mesmos ainda não estão nesse número**. A promessa vira
autoridade, fim da invisibilidade, valor percebido. Nunca faturamento.

## 3. Termos proibidos em anúncio

Pergunte ao cliente **o que ele não quer ver em anúncio** e registre. Exemplo
real: "resgatar identidade" foi proibido porque **é entrega, não anúncio**.

> O mecanismo interno raramente é a promessa que vende.

## 4. Zero travessões, sem emoji

Vírgula, dois-pontos, ponto final ou parênteses. Separador de kicker: "·".
Intervalo: "de 60 a 100", "1 a 2 minutos". Nunca traço.

Validação antes de publicar: `grep -c '—'` nos arquivos de copy tem que dar 0.

## 5. A ordem das 9 perguntas

SPIN, baixa fricção no começo, **as duas porteiras no fim**:

1. **Situação** · fácil, pressupõe contexto
2. **Problema** · o gargalo principal. **É desta que sai o pilar dominante**
3. **Há quanto tempo** · dá peso sem cobrar nada. Não pontua
4. **Impacto** · o custo de não resolver. Faz sentir
5. **O que já tentou** · qualifica sem parecer qualificação
6. **Objetivo** · o que quer. Não pontua
7. **Perfil** · qual frase representa a pessoa hoje
8. **PORTEIRA 1** · faturamento ou orçamento
9. **PORTEIRA 2** · prontidão para um processo estruturado

Quatro alternativas por pergunta, cada uma já segmentando o lead. Cada opção
carrega um campo `report`: a frase que o relatório usa para devolver a resposta
na voz do diagnóstico.

## 6. A captura

Peça o mínimo: **nome, WhatsApp e e-mail**. Enquadre como acesso, não como
cobrança:

> "Deixe o seu contato para acessar o diagnóstico agora e receber uma cópia no
> WhatsApp."

Evite tom professoral ou informal demais. "Vê" e "dá uma olhada" não passam;
"acesse" e "confira" passam.
