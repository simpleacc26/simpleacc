# Telas de carregamento simuladas · funil do quiz · Thiago Menegão

> Especificação de copy e de comportamento das telas intersticiais do funil.
> Base: quiz Master Sales Script (mssquiz.fullsalessystem.com), capturado tela a
> tela em 01/09/2026. Personalização: canvas do cliente ideal, perfil do Thiago e
> as regras não negociáveis do projeto.
>
> Onde isso vira código: `funis/quiz-thiago-menegao/flow.js` (copy) e
> `styles.css` + `app.js` (animação).

---

## 1. Por que essas telas existem

Na referência elas não são espera. São **argumento com barra em cima**. São quatro
no meio do quiz, e cada uma carrega uma função diferente: prova social, reframe,
autoridade de quem analisa e antecipação da entrega. Elas dão respiro entre blocos
de pergunta e seguram a pessoa dentro do fluxo sem pedir nada em troca.

O que se aproveita é a mecânica. O conteúdo é 100% refeito, porque o avatar do
Thiago tem **consciência alta do problema e baixa da causa**, sofisticação de
mercado 4 a 5, e **acredita que conduzir é manipular**. Tela de espera que promete
resultado, ancora preço falso ou projeta futuro perde ele na hora.

Regra que atravessa as cinco telas: **entrar pela causa, nunca pela solução**, e
custo de adiar no lugar de projeção de futuro.

---

## 2. Onde cada tela entra no fluxo

```
Hero + P1 ......... o que você vende
P2 ................ ticket praticado
P3 ................ volume de reuniões por mês
        >>> C1 · ESPELHO DO VOLUME
P4 ................ o que acontece quando o preço aparece
P5 ................ leitura de perfil do lead
P6 ................ leitura de camada / maturidade
        >>> C2 · REFRAME DA CAUSA
P7 ................ porteira: estrutura comercial
P8 ................ porteira: prontidão
        >>> C3 · QUEM ASSINA A ANÁLISE
Captura ........... nome / e-mail / whatsapp (uma tela por campo)
        >>> C4 · PROCESSAMENTO REAL (a obrigatória da casa)
Diagnóstico ....... espelho, os 5 pontos, veredito
        >>> C5 · A CONTA
Oferta ............ PRIMAL PITCH
```

C1, C2, C3 e C5 são **simuladas**: existem para carregar argumento. C4 é a tela de
carregamento obrigatória do blueprint da casa, entre a captura e o relatório.

---

## 3. Regra de animação (vale para todas)

O usuário sinalizou o ponto certo: **na referência a barra sempre cresce até o
número, nunca aparece pronta.**

| Elemento | De | Até | Duração | Gatilho |
| --- | --- | --- | --- | --- |
| Barra das telas C1, C2, C3, C5 | 0% | 100% | 2,2s | entrada da tela |
| Barra da tela C4 | 0% | 100% | 4,7s | entrada da tela |
| Gauge de conversão (diagnóstico) | 0 | valor calculado | 900ms | IntersectionObserver |
| Barras dos 5 pontos (diagnóstico) | 0 | valor calculado | 900ms, 120ms de defasagem entre elas | IntersectionObserver |
| Contador da conta (diagnóstico) | 0 | valor em reais | 1,2s | IntersectionObserver |

- Curva `cubic-bezier(.22,.61,.36,1)` (ease-out). Cresce rápido e assenta devagar.
- **O número sobe junto com a barra.** Contador em `requestAnimationFrame`, não texto fixo.
- Cada elemento anima **uma vez só**. Voltar e avançar não repete.
- Auto-avanço quando a barra chega em 100%. Sem botão "continuar" nas telas de carregamento.
- A seta de voltar continua ativa durante a barra.
- `@media (prefers-reduced-motion: reduce)`: sem animação, valor final direto, avanço no mesmo tempo.
- Sem porcentagem escrita nas telas C1 a C5. A barra basta. (Número em tela de espera vira contador de paciência.)

---

## 4. As telas

### C1 · Espelho do volume
**Entra:** depois de P3 (volume de reuniões).
**Função:** devolver o próprio número do lead e matar a hipótese de que o problema é falta de oportunidade.

> **Você conduz cerca de {REUNIOES} reuniões por mês.**
>
> Então o seu gargalo não é volume de oportunidade. É o que acontece dentro delas.
>
> `[ barra ]` Organizando suas respostas

- `{REUNIOES}` vem da resposta de P3. Se a resposta for faixa, usar a faixa como está ("de 8 a 15").
- Fallback sem variável (se P3 for pulada): "Você já tem reunião acontecendo todo mês."
- Visual: sem ilustração. Fundo limpo, o número em destaque tipográfico.

**Por que assim:** é a tese inteira do funil dita em duas linhas, com o dado que a
própria pessoa acabou de dar. Não afirma nada sobre o mercado, não precisa de fonte,
e prepara a conta que aparece em C5.

---

### C2 · Reframe da causa
**Entra:** depois de P6 (camada do lead), fechando o bloco de problema.
**Função:** mover a consciência de "problema" para "causa". É a tela mais importante das cinco.

> **Reunião perdida quase nunca morre no preço.**
>
> Ela morre alguns minutos antes, quando a condução troca de lado da mesa e o preço
> vira a única coisa que sobrou para discutir.
>
> `[ barra ]` Cruzando com os 5 pontos críticos

- Visual: sem ilustração de alvo nem de dashboard. Uma linha do tempo horizontal
  simples com um ponto marcado antes do fim, se houver arte. Se não houver, só texto.

**Por que assim:** o avatar sabe que perde reunião (consciência alta do problema) e
não sabe por quê (consciência baixa da causa). "Troca de lado da mesa" é condução,
não domínio, então passa pela barreira do "conduzir é manipular". E é literalmente
o inimigo do método (Inversão de Camada) dito sem jargão.

---

### C3 · Quem assina a análise
**Entra:** depois de P8 (prontidão), imediatamente antes da captura.
**Função:** justificar por que vale a pena entregar o contato. É o lugar da autoridade, no mesmo ponto em que a referência põe G4 e V4.

> **Quem monta essa análise não veio de vendas.**
>
> Thiago Menegão é engenheiro de computação e passou cerca de 20 anos em estratégia,
> comunicação e comportamento dentro de marcas como Mercedes, Electrolux e Honda,
> antes de levar isso para a mesa de negociação. A leitura aqui é de comportamento
> e de decisão, não de técnica de fechamento.
>
> `[ barra ]` Preparando sua análise

- Visual: foto de palco, não talking head. Enquadramento aberto, pé-direito alto.
  O acervo de palco é o material de maior performance do perfil dele.

**Por que assim:** três funções em um bloco. Dá lastro corporativo verificável em
vez de volume de clientes que ele ainda não tem. Separa ele dos 12 concorrentes
mapeados, que disputam "ensinar o vendedor a falar". E "não veio de vendas" é a
frase que mais desarma o avatar, que despreza vendedor de técnica.

⚠️ **Confirmar com o Thiago antes de publicar:** citar Mercedes, Electrolux e Honda
nominalmente, e o número de anos. O contexto registra "bastidores de marcas grandes"
e cerca de 20 anos de mercado. Se ele não autorizar nome, a versão alternativa é
"dentro de montadoras e multinacionais de bens de consumo".

---

### C4 · Processamento real
**Entra:** depois da captura, antes do diagnóstico. É a tela obrigatória do blueprint da casa.
**Função:** dar peso ao relatório. É a única com três mensagens em sequência.

> `[ barra 0 a 100% em 4,7s ]`
>
> 1. Lendo suas respostas.
> 2. Localizando em qual dos 5 pontos a condução escapa.
> 3. Montando a sua análise.

- Uma mensagem por vez, troca a cada ~1,55s, fade curto entre elas.
- Sem porcentagem. Sem "aguarde".
- Se o envio do lead falhar, a tela **não** trava: segue para o diagnóstico e a
  falha vai para o log. Lead perdido em tela de espera é o pior desfecho possível.

---

### C5 · A conta
**Entra:** depois do bloco de diagnóstico, antes da oferta.
**Função:** ponte para a oferta pelo custo do que já passou, nunca pela projeção do que virá.

> **Falta uma conta.**
>
> Com o ticket e o volume que você informou, dá para calcular quanto ficou na mesa
> nos últimos 12 meses. É o próximo bloco.
>
> `[ barra ]` Calculando

- Visual: nenhum gráfico aqui. O gráfico é o que vem depois.

**Por que assim:** é a "conta da madrugada" do canvas, e é o único jeito de fazer
esta ponte sem violar as duas regras não negociáveis do projeto. A referência usa
aqui um antes/depois com "Após 6 meses", que é future pacing puro e está vetado.
Trocar futuro provável por passado inegável é a própria frase dele: *"quando você
vende o futuro, o futuro é provável; quando eu vendo o custo de você não agir, ele
é inegável."*

**A conta que aparece no bloco seguinte** (não é tela de carregamento, mas nasce daqui):
```
reuniões/mês (P3) x 12 x (taxa alvo menos taxa informada) x ticket (P2)
```
Exibida com contador animado subindo até o valor, e sempre acompanhada da linha
"cálculo feito com os números que você mesmo informou". Sem arredondar para cima.

---

## 5. O que foi vetado da referência

| Elemento da referência | Decisão | Motivo |
| --- | --- | --- |
| "Mais de 2000 empresas aumentaram 37%" | fora | Ele não tem esse volume. Claim sem lastro queima com público cético. |
| "validado por mais de 10 mil empresas" | fora | Mesmo motivo. |
| Antes/depois com "Após 6 meses" | fora | Future pacing. Veto absoluto no projeto. |
| "De R$ 297 por R$ 97" | fora | Ancoragem irreal. O comprador maduro desdenha. |
| "Oferta válida apenas pelas próximas 24 horas" | fora | Escassez artificial. Mesma leitura. |
| Cashback de 100% e pilha de bônus | fora | Gordura de oferta. Frase dele: *"todo excesso conota uma falta."* |
| Emoji nas opções e nas telas | fora | Regra da casa e do público. |
| Gênero e idade como perguntas de abertura | fora | Ele mesmo criticou isso na call. |
| Barra com porcentagem escrita | fora | Vira contador de paciência. Só a barra. |
| Barra que cresce até o número | **mantido** | É o que dá a sensação de processamento real. |
| Intersticial recorrente com argumento | **mantido** | O achado principal da referência. |
| Autoridade antes do resultado | **mantido** | Mesmo papel que o Daniel quer dar à VSL. |
| Captura fatiada, um campo por tela | **mantido** | Escada de microcompromisso. |

---

## 6. Pendências

1. **Autorização de nome** das marcas em C3 (Mercedes, Electrolux, Honda) e do número de anos.
2. **Taxa alvo da conta** em C5: definir se usa faixa fixa ou a diferença contra a média informada pelo próprio lead.
3. **Foto de palco** para C3, em WebP, largura máxima 520px.
