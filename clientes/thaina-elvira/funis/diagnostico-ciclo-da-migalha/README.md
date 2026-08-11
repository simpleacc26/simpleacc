# Diagnóstico do Ciclo · Mulher que Escolhe (Thiago)

Funil de quiz do produto de relacionamento do Thiago (cliente Thaina Elvira).
Transforma a copy aprovada (`clientes/thaina-elvira/estrategia/2026-08-04-estrategia-thaina-elvira.pdf`)
em páginas no ar: quiz de 9 perguntas → captura → tela de carregamento →
página pós-quiz personalizada que nomeia o padrão dela → CTAs de WhatsApp
distribuídos.

Stack: HTML/CSS/JS puro, sem build, sem dependências. **Estrutura invisível
espelhada do quiz de alta conversão da Pâmella Mello**, no mesmo padrão já
ajustado no funil do Felipe Damasceno (SPIN de 9 passos, qualificação no fim,
tela de loading, relatório com espelho do cenário, reframe, lacuna, método,
CTAs distribuídos e CTA final adaptado à qualificação).

## ⚠️ A regra que define este funil

**A página pós-quiz não vende. Ela sobe o nível de consciência e leva ao WhatsApp.**
Sem preço, sem checkout, sem pré-agendamento pago. A venda da Sessão Mapa do
Ciclo (R$ 1.000) acontece na conversa. Decisão da call de 04/08 com a Thaina.
Se alguém pedir para colocar o preço na página, é mudança de estratégia, não
ajuste de copy.

## Arquivos

- `index.html`: quiz (uma pergunta por tela, sem título repetido em cima, auto-avanço, barra de progresso).
- `diagnostico.html` + `diagnostico.js`: página pós-quiz (nomeia o padrão, aponta o elo dominante, 3 CTAs de WhatsApp).
- `flow.js`: **toda a copy** (config, marca, hero, 9 perguntas com pesos, captura). Editar aqui.
- `styles.css`: identidade (tema dark vinho + rosé, proposto).
- `app.js`: motor do funil (render, validação, tela de loading, UTMs, sessionStorage, POST dos leads).
- `integracao-planilha.gs`: Google Apps Script da planilha de leads (plano B do Make).

## Estrutura do quiz (9 passos, ordem SPIN)

situação → **gatilho (elo 1)** → **reação (elo 2)** → há quanto tempo →
implicação → o que já tentou → objetivo → **perfil** (qualificação de ICP) →
**prontidão** (qualificação de intenção). As duas últimas ficam no fim, como no
quiz da Pâmella.

São as 8 perguntas da estratégia aprovada mais o passo "há quanto tempo esse
padrão se repete", incluído no padrão do funil do Felipe: enriquece a leitura do
relatório e não entra em nenhum cálculo.

Cada pergunta alimenta um elo do Mapa do Ciclo, então o quiz é ao mesmo tempo
captação e **pré-work da sessão**: o Thiago abre a conversa já sabendo o caso.

## Como o padrão é nomeado

O nome vem da resposta de **reação** (elo 2), que é onde o ciclo dela se
sustenta:

| Resposta | Padrão |
| -------- | ------ |
| Fico olhando o celular esperando resposta | **Ciclo da Espera** |
| Mando uma mensagem longa explicando como me sinto | **Ciclo da Explicação** |
| Cobro, discuto e depois me arrependo | **Ciclo da Cobrança** |
| Finjo indiferença e espero que ele venha atrás | **Ciclo do Afastamento** |

O nome aparece no selo do topo, no corpo do texto e **na mensagem
pré-preenchida do WhatsApp**, então o atendimento já começa sabendo o resultado.

A **intensidade do ciclo** (Leve, Moderada, Intensa) sai dos pesos de situação,
gatilho, reação, implicação e tentativas (máximo 15 pontos: ≥12 Intensa, 9 a 11
Moderada, abaixo disso Leve). Tempo, objetivo, perfil e prontidão não entram.
Escolha deliberada: a intensidade descreve **o ciclo**, nunca a pessoa, que é a
régua de compliance deste nicho.

## Qualificação e CTA adaptado

`classificarLead()` roteia o lead em quatro faixas (a coluna "Classificação" da
planilha), e a página troca o CTA final:

- **fora**: casada ou em relação fixa **sem** indicar falta de valorização. CTA vira conteúdo primeiro. (regra de cruzamento P7 x P1 da estratégia)
- **nutrir**: "não neste momento, quero só entender melhor" → CTA "entender melhor como funciona".
- **fila-quente**: prontidão a ou b → prioridade máxima de atendimento.
- **qualificado**: "só dependendo do valor" → atender normalmente, com o 12x já na conversa.

fila-quente e qualificado veem o mesmo CTA na página (a diferença é só na fila
do atendimento, porque a página não fala de preço).

## Estrutura da página pós-quiz

Os 9 blocos da estratégia, com o CTA repetido 3 vezes (depois do bloco 3,
depois do bloco 6 e no fim), sempre com o mesmo destino:

1. o resultado dela (padrão nomeado + gatilho + reação)
2. a dor e o custo (personalizado com situação, tempo e implicação)
3. o ciclo completo, os 5 elos, com os elos dela preenchidos → **CTA 1**
4. por que o que ela tentou não funcionou (personalizado com as tentativas)
5. quem é o Thiago
6. o método e a sessão → **CTA 2**
7. para quem é e para quem não é
8. FAQ (acordeão)
9. **CTA 3**, adaptado à qualificação

## Pendências para publicar

1. **WhatsApp de atendimento** (bloqueante): preencher `flow.js → marca.whatsapp`
   com o número em formato internacional, só dígitos. Enquanto tiver "X", os
   CTAs não abrem o WhatsApp e a página mostra um aviso de configuração no topo.
2. **Planilha de leads**: criar a planilha e o cenário no Make (mesmo padrão do
   Felipe e da Pâmella) e colar a URL do webhook em `app.js → LEADS_ENDPOINT`.
   O POST precisa ir com `Content-Type: application/json`. Com `text/plain` o
   webhook do Make não parseia o corpo e a linha cai vazia, sem erro nenhum.
3. **Logo oficial**: hoje usa o emblema de ciclo aberto em SVG + marca em texto.
   Quando vier o arquivo, colocar `logo.png` e ativar `<img class="logo-img">`.
4. **Foto do Thiago**: hoje o bloco de autoridade usa a inicial. Quando vier a
   foto, trocar `.autor-ini` por `<img class="autor-foto" src="thiago.webp">`
   (a classe já existe no CSS).
5. **Prova social**: assim que os primeiros depoimentos chegarem (ver
   `estrategia/2026-07-21-guia-captacao-depoimentos.pdf`), somar ao bloco 5.
6. **Pixel da Meta e GA4**: preencher `app.js → TRACKING_CONFIG`.

## Deploy

Publicar **apenas esta pasta** na Vercel da Simple (mesmo padrão do funil do
Felipe). Rodar tráfego com `?utm_source=...&utm_campaign=...` na URL para as
UTMs caírem na planilha.
