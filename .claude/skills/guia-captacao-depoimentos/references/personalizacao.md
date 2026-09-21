# Mapa de personalização do Guia de Depoimentos

Regra geral: **a estrutura, as dicas técnicas e os princípios são genéricos e
ficam iguais**. O que muda é tudo que identifica o cliente, o segmento dos
clientes dele e as particularidades do nicho. Este arquivo lista cada
placeholder do modelo, o que colocar e o valor usado no exemplo validado
(Lucas Sobreiro, mentor de empresários da saúde), para calibrar o tom.

## O que NUNCA muda (genérico)

- Identidade visual (CSS navy + dourado) e estrutura de 4 páginas.
- Filosofia "espontâneo com direção, nunca decorado" e a lógica dos 4 tópicos.
- Dicas técnicas de gravação (vertical, luz de frente, áudio limpo, celular
  apoiado, 1 a 2 minutos, enviar sem compressão).
- Pedir por ligação/áudio, prazo curto de 2 a 3 dias, plano B de gravar em
  chamada, aproveitar áudio + print quando não sai vídeo.
- Os 5 erros que inutilizam, a seção de prints de WhatsApp e o checklist de
  conferência.
- Zero travessões em qualquer texto.

## Placeholders (todos obrigatórios)

| Placeholder | O que é | Exemplo (Lucas Sobreiro) |
| ----------- | ------- | ------------------------ |
| `{{NOME_CLIENTE}}` | Nome do cliente da Simple (capa e cabeçalhos) | Lucas Sobreiro |
| `{{EQUIPE_SIMPLE}}` | Quem da Simple assina/acompanha | Daniel Souza · Carlos Durães |
| `{{SEGMENTO_PRIORIDADE_1}}` | Quem dá o depoimento prioritário (o público de prova social mais estratégico) | clientes da área da saúde (dentistas, médicos, donos de clínica) |
| `{{EXEMPLO_IDENTIFICACAO}}` | Frase curta de identificação no nicho | dentista assiste dentista |
| `{{EXEMPLOS_RESULTADO_CURTO}}` | 3 a 4 tipos de resultado mensurável do nicho, separados por vírgula | faturamento, agenda, equipe, tempo |
| `{{MODELO_PEDIDO}}` | O pedido de depoimento na voz do cliente (1ª pessoa, informal, com o produto dele nomeado) | Fulano, tô montando uma campanha nova e teu resultado é um dos que mais me orgulho. Consegue me gravar um vídeo de 1 a 2 minutos contando tua experiência? Te mando 4 pontos pra te guiar, é rapidinho e pode ser no celular mesmo. |
| `{{DESTINO_MATERIAL_CURTO}}` | Para onde vai o arquivo, em 3 a 6 palavras (repete em 3 lugares) | pro Drive |
| `{{DESTINO_MATERIAL_FRASE}}` | Instrução completa de envio | Sobe no link do Drive que o Carlos enviou |
| `{{RETRIBUICAO}}` | 2 a 3 retribuições concretas que o cliente TEM como dar | um convite para o próximo evento, uma sessão bônus, um destaque no seu Instagram marcando a clínica dele |
| `{{TOPICO_1_QUEM_E}}` | O que a pessoa fala de si, no vocabulário do nicho | teu nome, tua profissão e tua clínica/negócio |
| `{{NOME_PRODUTO_INFORMAL}}` | Como os clientes chamam o produto na conversa | da mentoria |
| `{{TOPICO_2_EXEMPLOS_ANTES}}` | 3 a 4 dores típicas do "antes" no nicho | agenda, vendas, rotina, cabeça |
| `{{TOPICO_3_EXEMPLOS_RESULTADO}}` | 3 exemplos de número concreto no nicho | faturamento, pacientes, tempo livre |
| `{{TOPICO_4_PERFIL}}` | Perfil de quem deveria comprar, no vocabulário do nicho | profissional da saúde |
| `{{EXEMPLO_ELOGIO_VAZIO}}` | Elogio raso típico, com o nome do cliente | o Lucas é fera, recomendo |
| `{{EXEMPLO_PROMESSA_EXAGERADA}}` | Promessa proibida típica do nicho | você vai triplicar em 1 mês |
| `{{RESTRICAO_LEGAL_EXTRA}}` | Restrição extra do nicho, começando com " e com..." ou vazio se não houver | (saúde: e com os conselhos de classe, que vetam promessa de resultado) |
| `{{EXEMPLOS_TERCEIROS}}` | Terceiros que não podem ser citados no nicho | nome de paciente, de concorrente, de outra empresa |
| `{{EXEMPLO_NOME_ARQUIVO}}` | Nome de arquivo exemplo com perfil real do nicho | depoimento-dra-ana-dentista.mp4 |
| `{{META_CAPTACAO}}` | Quantidade + prazo + prioridade, combinados com o momento do projeto | De 3 a 5 depoimentos em vídeo nos próximos 15 dias, priorizando a saúde |
| `{{CANAL_DUVIDAS}}` | Onde o cliente tira dúvida com a Simple | manda no grupo |
| `{{BLOCO_AUTORIZACAO}}` | **Componente opcional.** Bloco inteiro de autorização, obrigatório em nicho com sigilo ou conselho de classe. Vazio nos demais. Ver a seção abaixo | (vazio no Lucas; preenchido no Rafael Cobra) |

## Como calibrar por segmento (exemplos)

- **Saúde (médico, dentista, clínica):** nunca citar paciente; conselhos de
  classe vetam promessa de resultado; resultados em faturamento, agenda,
  pacientes/mês, equipe.
- **Advogados:** OAB restringe publicidade e promessa de êxito; resultado em
  organização do escritório, carteira de clientes, processos, receita.
- **Arquitetos/engenheiros:** resultado em obras fechadas, ticket por projeto,
  prazo de entrega; terceiros = cliente da obra, construtora.
- **Infoprodutores/mentores:** resultado em faturamento, alunos, lançamentos;
  cuidado redobrado com promessa de ganho (política da Meta).
- **B2B/serviços:** o depoente muitas vezes representa uma empresa; confirmar
  se pode citar a marca do próprio negócio dele (normalmente sim, e ajuda).

## Tom da mensagem pronta (página 3)

A mensagem entre aspas é o cliente falando com o cliente DELE. Respeite o
regionalismo e a informalidade de quem fala (ex.: gaúcho usa "tu"; outros usam
"você"). Se o tom do cliente for mais formal (advocacia, consultoria sênior),
formalize levemente sem perder a naturalidade. Nunca deixe a mensagem com cara
de comunicado de agência.


## O componente de autorização (`{{BLOCO_AUTORIZACAO}}`)

**Quando usar:** sempre que quem dá o depoimento for **paciente, cliente de
profissão regulamentada ou pessoa em situação sensível**. Casos típicos:
psicanálise e psicologia, medicina e odontologia, advocacia, terapias, saúde
mental, finanças pessoais, e qualquer nicho onde ser cliente já revela algo
íntimo sobre a pessoa (dívida, vício, separação, doença).

**Quando deixar vazio:** cliente empresarial comum, onde aparecer no
depoimento não expõe nada além da opinião dele. Nesse caso substitua o
placeholder por string vazia e não deixe linha em branco sobrando.

**O que o bloco tem que dizer** (adapte o texto ao nicho, mantenha as 3 ideias):

1. **Autorização escrita**, listando o que a pessoa permite: imagem, voz,
   primeiro nome, profissão e em quais canais pode aparecer. Um "pode usar" no
   áudio do WhatsApp não basta.
2. **Pedida no convite, não depois de gravar.** Isso não afasta, tranquiliza:
   mostra que o cliente protege quem confia nele.
3. **Direito de desistir a qualquer momento**, inclusive com o vídeo pronto, e
   a regra de perguntar antes em caso duvidoso. Se houver conselho de classe,
   citar que valem também as regras de publicidade dele.

Exemplo aplicado (Rafael Cobra, psicanalista):

> **Antes de tudo: a autorização.** Você é psicanalista, e isso muda a ordem
> das coisas. Nenhum depoimento vai para o ar sem autorização escrita da
> paciente, dizendo o que ela permite: imagem, voz, primeiro nome, profissão e
> em que canais pode aparecer. Um "pode usar" no áudio do WhatsApp não basta.

**Duas coisas mudam junto com esse bloco:**

- **`{{MODELO_PEDIDO}}` termina com a promessa de sigilo.** No Rafael: "E fica
  tranquila: você decide o que fala e o que não fala, e nada vai para o ar sem
  a sua autorização por escrito." Sem isso, a pessoa fica com a pergunta na
  cabeça e não responde.
- **`{{RETRIBUICAO}}` não pode ser exposição.** O padrão sugere "destaque no
  Instagram marcando o cliente", o que num nicho com sigilo significa expor um
  paciente. Troque por retribuição privada (sessão bônus, prioridade na próxima
  turma, desconto) e ofereça o crédito público **só se a pessoa pedir**.

**Reflow conhecido:** inserir esse bloco estoura a página 2 (fica em torno de
1220px, contra o teto de 1032). A correção validada, nesta ordem:

1. Mover o box **"Retribuição elegante"** para o fim da página 3, que costuma
   ter folga de uns 280px.
2. Mover o bullet **"não conseguiu vídeo, manda áudio e print"** da página 2
   para a seção de prints da página 4, onde o assunto já existe.
3. Enxugar o próprio bloco de autorização para 2 parágrafos.

Com os três, a página 2 volta para perto de 1000px e a validação passa.

## Calibragem por cliente (dois exemplos reais)

| | Lucas Sobreiro | Rafael Cobra |
| --- | --- | --- |
| Nicho | mentoria para donos de clínica | psicanálise, relacionamentos |
| Depoente | empresário da saúde | paciente (mulher) |
| Prioridade de prova | dentista assiste dentista | executiva se reconhece em executiva |
| Resultado citado | faturamento, agenda, equipe | tempo presa no padrão, a decisão que tomou |
| Bloco de autorização | vazio | obrigatório |
| Retribuição | evento, sessão bônus, destaque no Instagram | sessão bônus, prioridade na turma, crédito só se ela pedir |
| Promessa proibida | "você vai triplicar em 1 mês" | "em 3 meses você encontra a pessoa certa" |
| Meta | 3 a 5 em 15 dias | 2 a 3 em 15 dias, todos com autorização escrita |
