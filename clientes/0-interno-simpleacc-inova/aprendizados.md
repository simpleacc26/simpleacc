# Aprendizados — Interno Simple Acc

## Disparo WhatsApp / ManyChat

Registrado em 23/08/2026, na montagem do disparo da Imersão Funil de Lead
Dinâmico. Vale para qualquer lançamento por WhatsApp daqui pra frente.

### A janela de 24h decide a arquitetura inteira

Só dá pra mandar mensagem livre até 24h depois da **última mensagem de entrada**
do contato. Fora disso, só template aprovado pela Meta. Isso não é detalhe de
implementação — é o que define o desenho do funil.

Consequência prática: num lançamento em que o disparo é na segunda e o evento na
quarta, **nenhum lembrete de evento cabe no 1:1**. Ao planejar, monte a linha do
tempo de cada mensagem contra a janela antes de escrever qualquer copy.

### Clique em botão de link não renova a janela

Só Quick Reply e resposta de texto renovam. Botão de URL (checkout, página) não
gera mensagem de entrada. Erro fácil de cometer e invisível: as mensagens
seguintes simplesmente não são entregues, sem erro aparente.

### Grupo de WhatsApp é a saída para lembretes

Grupo não tem janela, não tem template, não tem custo por mensagem e não tem
limite de tier. Para qualquer evento, o padrão deve ser: 1:1 leva a pessoa até o
grupo, e o grupo carrega todos os avisos. Isso trocou ~7 templates por zero no
lançamento de agosto.

Contrapartida: a mensagem que entrega o link do grupo vira ponto único de falha.
Monitorar taxa de entrada no grupo.

### Template sem variável aprova mais rápido e não quebra

`{{first_name}}` vira `{{1}}` na Meta, exige exemplo no cadastro e **falha o
envio** se o contato não tiver nome. Em base importada isso é uma fatia
relevante. Deixe o template inicial sem variável e personalize da segunda
mensagem em diante, que é livre.

### Messaging tier é o limite real, não o tamanho da base

Conta nova ou não verificada começa em **250 contatos únicos por 24h**. Checar
em WhatsApp Manager → Visão geral da conta antes de prometer volume. Não adianta
ter 5.000 contatos se o tier é 250. O tier sobe conforme volume + qualidade.

### Nota de qualidade cai rápido com excesso de mensagem comercial

Planejar 5 mensagens na janela, não 7. Monitorar a nota a cada 30 min nas
primeiras 2h de disparo. Amarelo = parar e reavaliar. Vermelho = número
restringido no meio do lançamento.

### Formato de telefone quebra base antiga

Tudo precisa estar `+55DDNÚMERO` com 9 dígitos no celular. Base antiga tem
número de 8 dígitos sem o 9 — falham silenciosamente. Normalizar antes de
importar, e normalizar também no webhook de compra, senão a busca do contato não
acha ninguém e a tag de comprador nunca é aplicada.

### Supressão do comprador não é opcional

Bloco de condição verificando a tag de comprador **antes de cada** follow-up de
venda. Sem isso, quem pagou recebe "ainda dá tempo de garantir sua vaga" e pede
reembolso. Sempre testar esse caminho especificamente: comprar de verdade e
confirmar que a mensagem seguinte não chega.

### Sempre ter o plano B manual

Exportar CSV de compradores da plataforma de checkout e aplicar tag em massa no
ManyChat leva 5 minutos. Para volume baixo (dezenas), é mais confiável que
webhook montado às pressas. Não trave o lançamento esperando integração ficar
pronta.

---

## Naming de produto

A apresentação comercial oficial chama de **"Implementação de Funil de Lead
Dinâmico"** um projeto de 105 dias feito para o cliente, em 3 fases. O evento de
agosto usou o mesmo nome e vendeu o **Estrategista de Quiz (R$2.997)**, que é o
cliente construindo com acompanhamento em grupo.

São ofertas diferentes com o mesmo nome. Quem viu a apresentação comercial
assume que está comprando os 105 dias por R$2.997. Em qualquer material que
misture os dois, deixar a distinção explícita — ou renomear um dos dois.
