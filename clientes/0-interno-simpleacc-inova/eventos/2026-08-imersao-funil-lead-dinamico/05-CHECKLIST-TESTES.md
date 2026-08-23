# CHECKLIST DE TESTES — rodar antes do broadcast de segunda

> Tempo: ~20 min de teste + 10 min de piloto. Não pule. Um fluxo com erro
> disparado pra 3.000 pessoas não tem desfazer.

---

## Antes de testar

- [ ] Fuso da conta ManyChat = **America/Sao_Paulo** (`Settings → General`)
- [ ] Todos os Custom Fields de link preenchidos, nenhum `[COLCHETE]` sobrando
- [ ] Os 4 templates com status **Approved** no WhatsApp Manager
- [ ] Conta ManyChat no plano **Pro**
- [ ] Seu próprio número cadastrado como contato de teste

---

## Os 6 caminhos

Teste cada um com um número real diferente (o seu, o do Victor, o do Renan).
Para repetir com o mesmo número, apague o contato no ManyChat antes.

### 1. Caminho do comprador
- [ ] Recebe T1
- [ ] Clica `SIM, CLARO` → tags `INTERESSADO` + `ORIGEM_DISPARO` aplicadas
- [ ] MSG 02, 03 e 04 chegam na ordem, com os delays certos
- [ ] `{{first_name}}` renderiza (teste também com um contato **sem** nome)
- [ ] Botão do checkout abre o Kiwify no valor certo: **R$9,90**
- [ ] Faz uma compra real de R$9,90 (estorne depois)
- [ ] Tag `COMPRADOR` aplicada em até 2 min
- [ ] C01 chega com o link do grupo VIP, e o link funciona
- [ ] **MSG 05 NÃO chega 3h depois** ← o teste mais importante do checklist

### 2. Caminho do interessado que não compra
- [ ] Clica `SIM, CLARO`, não compra
- [ ] MSG 05 chega ~3h depois
- [ ] MSG 06 chega ~8h depois
- [ ] Recebe T2 na terça e T3 na quarta

> Para não esperar 3h no teste, baixe os delays para 1 min, valide o caminho
> todo, e **volte os valores reais antes de agendar o broadcast**. Escreva isso
> num post-it. É o erro mais fácil de cometer.

### 3. Caminho do "agora não"
- [ ] Clica `AGORA NÃO` → tag `GRUPO_GRATUITO`
- [ ] Convite do grupo gratuito chega na hora
- [ ] Não entra na sequência de venda

### 4. Caminho do silêncio
- [ ] Não responde nada
- [ ] Não recebe MSG 02 a 06
- [ ] Recebe T4 na terça

### 5. Clicou no checkout e não pagou
- [ ] Tag `CHECKOUT` aplicada, `COMPRADOR` não
- [ ] Continua recebendo MSG 05, 06 e os templates — correto, ele não comprou

### 6. Comprador tardio
- [ ] Compra depois da MSG 05 ter saído
- [ ] MSG 06 **não** chega
- [ ] C01 chega normalmente

---

## Falha do webhook — teste obrigatório

- [ ] Desligue o cenário do Make e faça uma compra
- [ ] Confirme que a tag `COMPRADOR` **não** é aplicada (ou seja: você consegue
      detectar a falha)
- [ ] Religue o cenário

**Plano B se o webhook cair no meio do disparo:** exporte os compradores no
Kiwify (`Vendas → Exportar`), importe o CSV no ManyChat e aplique
`EVENTO_FL_COMPRADOR` em massa. Faça isso a cada 2h na segunda e terça se a
integração não estiver confiável. Coloque alarme no celular.

---

## Disparo-piloto

Antes da base inteira:

- [ ] Crie uma tag `TESTE_PILOTO` e aplique em 10–20 contatos (time, amigos,
      alunos próximos que você avisou antes)
- [ ] Dispare o T1 só pra essa tag
- [ ] Espere 30 min e confira: taxa de entrega, quantos clicaram, se alguém
      relatou algo estranho
- [ ] Só então dispare pra base

---

## Durante o disparo de segunda — monitorar

Nas primeiras 2 horas, olhe a cada 30 min:

- **Nota de qualidade do número** no WhatsApp Manager. Se cair pra amarelo,
  **pare o disparo** e reavalie. Vermelho = número restringido, e aí o
  lançamento morre.
- **Taxa de bloqueio/denúncia.** Se muita gente bloquear, é sinal de que a base
  não é tão quente quanto se supôs.
- **Entregas falhadas.** Número inválido ou sem WhatsApp é normal em alguma
  proporção; muito acima disso indica problema de formatação (DDI/9º dígito).

**Formato dos telefones:** todos precisam estar como `+55DDNÚMERO`. Celular
brasileiro tem 9 dígitos após o DDD. Base antiga costuma ter números de 8
dígitos, sem o 9 — esses falham. Vale rodar uma verificação na planilha antes
de importar.
