---
name: copy-criativos-e-roteiros
description: >-
  Gera o pacote de criativos de um cliente da Simple Acc: copies estáticas de
  anúncio (3 ângulos, cada um em curta, média e longa), headlines para teste,
  ganchos e ROTEIROS DE VÍDEO prontos para gravar, na voz real do cliente e
  seguindo as regras da casa (sem travessão, sem emoji não autorizado, sem prova
  inventada, sem promessa de ganho que a Meta reprova). Usa o framework de
  storytelling Hormozi (hook de identidade, problema reformulado, custo de
  continuar, virada de crença, prova, CTA construído) com filtro de ICP embutido
  no meio do texto. Use sempre que alguém pedir "cria as copies dos anúncios",
  "criativos para o cliente X", "roteiro de vídeo", "roteiro para o cliente
  gravar", "ganchos/hooks para Reels", "headlines para testar", "copy do
  carrossel", "os criativos saturaram, preciso de novos", ou quando o roadmap ou
  a estratégia de um cliente chegar na etapa de produção de criativo. Entrega em
  clientes/<cliente>/copy/ e clientes/<cliente>/roteiros/, com plano de teste e
  briefing para quem edita.
---

# Copy de criativos e roteiros de vídeo

Transforma a estratégia aprovada de um cliente em **peças prontas para subir e
para gravar**: copy de anúncio, headlines, ganchos e roteiros de vídeo.

Esta skill é a etapa que vem **depois** da estratégia (`estrategia-completa-clientes`)
e **em paralelo** ao funil (`gerar-quiz-diag-pag-pos-quiz`). Ela não inventa
posicionamento: ela pega o que já foi decidido e vira peça.

---

## O que ela entrega

| Entregável | Onde salva |
| --- | --- |
| **Copies estáticas**: 3 ângulos, cada um em curta (~50 palavras), média (~120) e longa (~250) | `clientes/<cliente>/copy/AAAA-MM-DD-copies-<assunto>.md` |
| **10 headlines** curtas para teste | mesmo arquivo |
| **Roteiros de vídeo**: 5 ganchos + os roteiros completos pedidos | `clientes/<cliente>/roteiros/AAAA-MM-DD-roteiros-<assunto>.md` |
| **Plano de teste** (o que sobe primeiro, quando trocar) | mesmo arquivo da copy |
| **Briefing de produção** para quem grava/edita | `clientes/<cliente>/copy/AAAA-MM-DD-briefing-criativo.md` |
| **Linha em `aprendizados.md`** com os ângulos usados | `clientes/<cliente>/aprendizados.md` |

---

## Sequência obrigatória

```
LER A BASE → DIAGNÓSTICO (só o que faltou) → DECIDIR ÂNGULOS → GERAR → VALIDAR → SALVAR E REGISTRAR
```

Não gere nenhuma peça antes de ler a base do cliente. Copy escrita sem ler
`contexto/` sai genérica, e genérico é exatamente o que o cliente reprova.

---

## Passo 1 · Ler a base do cliente (nesta ordem)

Dentro de `clientes/<cliente>/`, leia:

1. `CLAUDE.md`: big idea, ICP, oferta, ticket, o que é proibido falar.
2. `aprendizados.md`: **ângulos e provas já usados**, e as regras que o cliente
   já impôs. É aqui que mora o "não repetir".
3. `contexto/`: perfil, ICP, canvas e, quando existir, o arquivo de
   **linguagem do público** (frases reais). Ver `references/voz-do-cliente.md`.
4. `estrategia/`: a estratégia completa aprovada (big idea, mecanismo, prova).
5. `copy/` e `roteiros/`: o que já foi entregue, para não repetir gancho.

Se o cliente ainda não tem base montada, **pare e diga isso**. A ordem da casa é
estratégia antes de criativo; escrever anúncio antes de ter big idea definida
produz peça que o cliente reprova e que ninguém consegue defender.

## Passo 2 · Diagnóstico (pergunte só o que a base não respondeu)

Nunca repita uma pergunta cuja resposta já está no repositório. Confirme o que
faltar, de uma vez, com opções prontas:

1. **Objetivo desta leva.** Lead novo, retargeting, evento/aula, venda direta?
2. **Destino do clique.** Quiz, WhatsApp, formulário, página de vendas? **Qual é
   o link exato, com UTM?** (ver regra do link no Passo 6)
3. **Verba diária e fase.** Define quantas peças fazem sentido e o ritmo de troca.
4. **Quantidade e formato.** Quantas copies estáticas, quantos roteiros, duração
   mínima dos vídeos, quem aparece no vídeo (o dono, cliente, sem rosto)?
5. **Provas disponíveis agora.** Números, casos, prints autorizados, depoimentos
   gravados. **Sem prova disponível, a peça se apoia em mecanismo, não em
   resultado** (nunca inventar: ver `references/regras-da-casa.md`).
6. **Restrições do cliente.** Emoji, gênero, jargão, promessa proibida, palavras
   vetadas, quem ele não quer parecer.
7. **Ângulos já saturados.** O que já rodou e cansou.

## Passo 3 · Decidir os ângulos antes de escrever

Escolha **3 ângulos diferentes entre si**, não três variações do mesmo texto.
A régua e a biblioteca de ângulos estão em `references/framework-e-angulos.md`.

Antes de escrever, escreva uma linha por ângulo no formato:

```
Ângulo 1 · <nome> · Para quem: <nível de consciência> · Aposta: <o que testa>
```

Se dois ângulos couberem na mesma frase, eles são o mesmo ângulo. Troque um.

## Passo 4 · Gerar as copies estáticas

Cada peça segue os 6 movimentos do framework (hook de identidade → problema
reformulado → custo de continuar → virada de crença → prova → CTA construído),
**como texto corrido, sem rótulos visíveis**, com o filtro de ICP embutido no
meio do texto. Detalhamento e exemplos: `references/framework-e-angulos.md`.

Formato do entregável: `assets/modelo-copies-estaticas.md`.

Padrão da casa por leva: **3 ângulos × 3 tamanhos + 10 headlines**.

## Passo 5 · Gerar os roteiros de vídeo

Roteiro de vídeo não é copy estática com quebra de linha. Tem régua própria:
estrutura por segundo, fala que a pessoa consegue falar em voz alta, e direção
de gravação separada do texto.

**Leia `references/roteiros-de-video.md` antes de escrever o primeiro roteiro.**

Regra de duração: fala natural em português fica em torno de **150 palavras por
minuto**. Um roteiro de 60 segundos tem ~150 palavras. Conte antes de entregar.

Formato do entregável: `assets/modelo-roteiros-video.md`.

## Passo 6 · Plano de teste e briefing de produção

Criativo sem plano de teste vira palpite caro. Monte:

- **O que sobe primeiro** e o que fica na reserva.
- **Quando trocar** (e quando NÃO trocar: mexer no criativo antes de sair do
  aprendizado é o erro mais caro e mais comum).
- **Uma variável por teste.**

Régua completa e a régua de verba: `references/plano-de-teste-criativo.md`.

> ⚠️ **O link do anúncio é responsabilidade de quem escreve o anúncio.**
> O criativo aponta sempre para a **raiz do funil com a query de UTM**
> (`https://<funil>/?utm_source=meta&utm_medium=cpc&utm_campaign=...`),
> **nunca** para `/index.html` (o servidor limpa a URL e derruba a query) e
> **nunca** para um endereço antigo do funil. Já aconteceu de um endereço velho
> continuar no ar servindo uma cópia sem integração: o lead respondia tudo e
> evaporava em silêncio. Confirme o endereço oficial no `README.md` do funil.

Briefing para quem grava/edita: `assets/modelo-briefing-criativo.md`.

## Passo 7 · Validar antes de entregar

Rode o checklist de `references/checklist-de-entrega.md` inteiro. Ele pega os
erros que já custaram retrabalho aqui: travessão, emoji não autorizado, prova
inventada, promessa que a Meta reprova, jargão com cliente leigo, resíduo de
copy de outro cliente, roteiro curto demais para a duração pedida.

Busca rápida de travessão antes de fechar:

```bash
grep -n '—' clientes/<cliente>/copy/*.md clientes/<cliente>/roteiros/*.md
```

Travessão em cabeçalho de seção do documento é aceitável. **Em qualquer linha de
copy ou de fala, não.**

## Passo 8 · Salvar e registrar

1. Salve os arquivos nos caminhos da tabela de entregáveis, com data no nome.
2. Acrescente **uma linha em `clientes/<cliente>/aprendizados.md`** dizendo quais
   ângulos e provas foram usados nesta leva. É o que impede a próxima sessão de
   repetir o mesmo gancho.
3. Commit + push + PR, um PR por assunto (padrão do `docs/MANUAL.md`).

---

## As regras que nunca se quebram

Resumo. O detalhe, com os casos reais que geraram cada regra, está em
`references/regras-da-casa.md`.

1. **Sem travessão.** Regra fixa da casa: "fica com cara de IA".
2. **Emoji só com autorização.** O padrão é sem.
3. **Nunca inventar prova.** Nem depoimento, nem número, nem autoridade. Objeto
   que aparece numa arte é cenário, não é fonte.
4. **Terceiro que aparece em print sai.** Quem autorizou foi o cliente, não as
   pessoas que aparecem na conversa dele.
5. **Promessa de ganho financeiro é proibida em anúncio pago.** A Meta lê o
   criativo **e a página de destino**.
6. **Fale do que a pessoa ganha, não do que a gente faz.**
7. **Fale com o decisor**, nunca com o funcionário dele.
8. **Sem promessa de prazo rígido** quando o cliente não garante o prazo.
9. **Zero jargão de mídia** quando quem lê é leigo. Nada de CPM, CPA, ROAS,
   "fase de aprendizado" na copy ou em mensagem para o cliente leigo.
10. **Reescreva 100% da copy** ao partir de um modelo de outro cliente. Resíduo
    do molde é o erro mais comum da casa.

---

## Arquivos desta skill

| Arquivo | Quando ler |
| --- | --- |
| `references/regras-da-casa.md` | **Sempre**, antes de escrever a primeira linha |
| `references/framework-e-angulos.md` | Ao decidir ângulos e escrever as estáticas |
| `references/roteiros-de-video.md` | **Sempre**, antes do primeiro roteiro |
| `references/voz-do-cliente.md` | Quando houver transcrição ou call disponível |
| `references/plano-de-teste-criativo.md` | Ao montar a leva e definir troca |
| `references/checklist-de-entrega.md` | Antes de entregar, sem exceção |
| `assets/modelo-copies-estaticas.md` | Formato do entregável de copy |
| `assets/modelo-roteiros-video.md` | Formato do entregável de roteiro |
| `assets/modelo-briefing-criativo.md` | Briefing para quem grava e edita |
| `assets/matriz-de-testes.csv` | Planilha de acompanhamento da leva |
