# Quiz Etapa 1 — versão de produção

É esta a página que vai nos anúncios. **URL oficial:**

```
https://grokker-diagnostico.vercel.app
```

Projeto `grokker-diagnostico` na Vercel (conta simpleacc), sem proteção de
login, com `noindex` no HTML e no header `X-Robots-Tag`.

## Não edite o index.html daqui

Ele é **gerado**. A fonte da verdade da copy é o protótipo em
`../prototipo-quiz-lp/index.html`. Para publicar uma correção:

```
python3 build.py     # regenera index.html e copia dani.jpg
```

e depois republique na Vercel. Dois arquivos com a mesma copy divergem em uma
semana; por isso a build existe.

## O que a build faz

Tira o andaime de demonstração (a barra do topo, o painel "Dados capturados" e
o aviso de que as respostas vão para o CRM da Pulsar) e acrescenta o que só
produção precisa: `title` e `description` de página real, `noindex`, e a captura
de origem da campanha.

Toda remoção é conferida no fim. Se alguém reescrever um trecho do protótipo e
um recorte deixar de casar, a build falha em vez de publicar um arquivo
quebrado.

## Google Tag Manager

Contêiner `GTM-PHG5489R`, injetado pela build: o script no fim da head e o
noscript no início do body. A Etapa 2 usa o **mesmo** contêiner, porque o funil
é um só — separar obrigaria a casar duas propriedades na mão para ver a jornada
inteira.

O GTM não entra no protótipo. Protótipo é a URL de revisão; se disparasse tag, a
medição da campanha viria suja de visita interna.

## Os dois caminhos têm tamanhos diferentes

A pergunta 1 decide o caminho. Quem responde **Proprietário, Dono ou Sócio** vai
pelo A e responde **9 perguntas** (colaboradores, faturamento e margem no fim);
quem responde qualquer outra coisa vai pelo B e responde **8** (autonomia e
remuneração).

Por isso o rótulo "Pergunta N de M" é **calculado**, nunca escrito à mão. E a
primeira tela mostra só "Pergunta 1", sem total: o caminho ainda não foi
escolhido, e prometer 8 ali para mostrar 9 na tela seguinte é pior do que não
prometer.

Ao acrescentar ou tirar pergunta, mexa em `ordem()` e no dicionário `P` do
protótipo. Não existe número de pergunta guardado em lugar nenhum.

## Rastreio de campanha

A página lê da URL `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`,
`utm_term`, `fbclid`, `gclid` e `ttclid`, mais o `referrer`, e manda tudo no
webhook dentro de `rastreio`. Sem isso o lead chega no CRM sem origem e não dá
para dizer qual anúncio pagou por ele.

Nos anúncios, use o padrão:

```
https://grokker-diagnostico.vercel.app/?utm_source=meta&utm_medium=paid&utm_campaign=<campanha>&utm_content=<criativo>
```

O `fbclid` a Meta acrescenta sozinha.

## A foto da Dani

`vercel.json` tem um rewrite de `/dani.jpg` apontando para o projeto do
protótipo. É **temporário**: existe porque o publicador atual sobe arquivo
inline e binário não sobrevive a esse caminho. O arquivo de verdade está aqui na
pasta, e quando o deploy passar a sair do GitHub ele será servido direto — o
sistema de arquivos tem precedência sobre o rewrite, então nada precisa ser
desfeito, o rewrite só deixa de ser usado.

Enquanto o rewrite estiver valendo, **não apague o projeto
`grokker-quiz-diagnostico`**, senão a foto some da página de campanha.

## O que ainda não está resolvido

- **O domínio.** Os anúncios podem apontar para a URL da Vercel, mas
  `quiz.grokkeronline.com` continua servindo o funil antigo. Enquanto os dois
  estiverem no ar, existe funil velho recebendo gente.
- **Os webhooks da Pulsar.** Precisam estar publicados e com CORS liberado,
  senão o lead preenche, vê a página, e o dado não chega em lugar nenhum. Ver
  `estrategia/integracao-pulsar-webhooks.md`.
- **A automação antiga do WhatsApp**, que ainda manda a mensagem errada.
