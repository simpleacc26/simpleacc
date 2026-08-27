# Regras de copy que não são negociáveis

Tudo aqui saiu de erro cometido em cliente real, não de teoria. Cada regra
custou uma rodada de revisão ou um bug em produção.

## 1. Linguagem neutra em gênero

**Nenhum adjetivo pode concordar com quem lê.** Este foi o erro mais caro do
projeto Luana Isse: o quiz saiu inteiro no feminino ("sou muito boa", "ser
lembrada", "quero virar mentora") porque a cliente é mulher. Só que o ICP dela
tem médicos, advogados, coaches e nutricionistas homens. **Metade do público
lia uma frase que não era sobre ele.**

O gênero do cliente não é o gênero do público. Confundir os dois é o default
silencioso, e ele passa despercebido porque cada frase isolada soa natural.

**Teste obrigatório ao escrever qualquer alternativa, headline ou bullet:** leia
em voz alta como homem e como mulher. Se soar errado numa das duas, reescreva.

| Não | Sim |
| --- | --- |
| Sou muito boa no que faço | Faço um trabalho muito bom |
| Quero ser lembrada | Quero ser lembrado por quem importa / Quero que me lembrem |
| Cansada de ser invisível | Cansei de ser invisível |
| Preparada para escalar | Pronto para escalar / Com estrutura para escalar |

Saídas que sempre funcionam: verbo na primeira pessoa ("faço", "cansei",
"quero"), substantivo no lugar do adjetivo ("um trabalho muito bom" em vez de
"sou boa"), e oração em vez de particípio.

Vale para **todo** texto do documento: quiz, página, anúncios, relatório e
cadência. Se o cliente atende só um gênero de verdade, aí sim concorde, mas
confirme antes: quase nunca é o caso.

## 2. Promessa: o que o cliente se recusa a prometer, você não promete

Extraia isso no onboarding e trate como trava. A Luana **se recusa a prometer
resultado financeiro** porque ela mesma ainda não está no número que prometeria.
A promessa do funil dela é autoridade e fim da invisibilidade, nunca faturamento.

Isso muda copy inteira: headline, hook de anúncio, CTA e depoimento. Se você
escrever "chegue aos 50k" para um cliente assim, o material volta inteiro.

## 3. Proibições de linguagem do cliente entram na extração

Clientes maduros têm termos que não querem ver em anúncio. A Luana proibiu
"resgatar/restaurar identidade" solto, porque **isso é entrega, não anúncio**.
A mesma ideia entra em copy pela virada concreta: "de especialista técnico a
especialista percebido".

Lição geral que vale para qualquer cliente: **o mecanismo interno raramente é a
promessa que vende.** Pergunte sempre "o que você NÃO quer que apareça em
anúncio" e registre no mapa da extração.

## 4. Peça a frase do cliente antes de escrever do zero

Alguns clientes produzem narrativa melhor que a maioria dos redatores. Na Luana,
três frases dela entraram no material aprovado sem edição, e o inimigo nomeado
do funil inteiro ("Ruptura de Valor Percebido") foi criação dela.

Quando for esse o caso, o trabalho muda: **menos escrever do zero, mais
organizar, nomear onde usa e proteger de risco.** Sai melhor e a validação é
imediata, porque o cliente reconhece a própria voz.

## 5. Inimigo nomeado é a âncora da narrativa

Um problema com nome próprio faz o documento inteiro fechar: o quiz mede o
tamanho dele, o anúncio o acusa, o método o elimina. "Ruptura de Valor
Percebido" foi a peça que faltava na Luana e destravou copy que estava travada
havia semanas.

Se o cliente não tem um, proponha. Se ele tem palavra própria para o problema,
use a palavra dele.

## 6. Prova social sem valor em reais, salvo decisão explícita do cliente

Depoimento que mostra faturamento briga com a regra 2 e arrisca o anúncio,
porque **a Meta lê a página de destino**. O default é: entra transformação e
valor percebido, não entra print de valor em reais.

Esse default **pode ser derrubado pelo cliente**, e foi na Luana em 24/08. Se
for derrubado, registre a decisão no README do funil e num comentário no código,
para ninguém "consertar" isso seis meses depois achando que passou batido.

Duas checagens que não são suas para fazer, e que viram pendência nomeada até
alguém confirmar: **assistir os vídeos inteiros com áudio** e **autorização de
quem aparece** no vídeo ou no print.

## 7. Zero travessões, sem emoji

Vírgula, dois-pontos, ponto final ou parênteses. Separador de cabeçalho e
kicker: "·". Intervalo numérico: "de 60 a 100", "1 a 2 minutos", nunca traço.
Validação automática antes de gerar o PDF: `grep -c '—'` tem que dar 0.
