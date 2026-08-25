# Etapa 2 — versão de produção

É a página que a Pulsar manda no WhatsApp, depois do áudio e do PDF.

```
https://grokker-etapa2-diagnostico.vercel.app
```

O link real leva os parâmetros do lead. O contrato completo, com os dois
webhooks e a regra do telefone, está em
`estrategia/integracao-pulsar-webhooks.md`:

```
https://grokker-etapa2-diagnostico.vercel.app/?lead=<id>&nome=<nome>&email=<email>&telefone=<o mesmo da Etapa 1>&cenario=<cenário>
```

Projeto `grokker-etapa2-diagnostico` na Vercel, sem proteção de login, com
`noindex` no HTML e no header `X-Robots-Tag`. A página é confidencial: só deve
ser aberta por quem recebeu o link.

## Não edite o index.html daqui

Ele é **gerado**. A fonte da verdade da copy é `../prototipo-etapa2/index.html`.
Para publicar uma correção:

```
python3 build.py
```

e depois republique na Vercel.

## O que a build tira

A barra de demonstração, o painel "O que vai para o CRM" e os atalhos de
preenchimento. O lead nunca deve ver a nota dele nem o payload: a Etapa 2 é
diagnóstico para o Closer ler antes da call, não devolutiva na tela. Quem quiser
inspecionar o cálculo abre o protótipo do disco.

## O que a build põe

O Google Tag Manager (`GTM-PHG5489R`), o mesmo contêiner do quiz — o funil é um
só, e contêineres separados obrigariam a casar duas propriedades na mão para ver
a jornada inteira.

## Os dois disparos invisíveis

Nada disto aparece na tela, e é justamente por isso que some sem ninguém notar.
A build confere os dois no fim; se um recorte engolir o trecho, ela falha.

- **Na carga da página**, um `POST` para
  `pulsar.app.n8n.cloud/webhook/grokker-etapa2-iniciada` com o `lead_id`. É o que
  separa, no CRM, quem nunca abriu o link de quem abriu e desistiu no meio.
- **No link do Calendly**, `utm_content=<lead_id>`. É o que liga a reunião
  agendada ao lead que fez o quiz, sem depender de casar pelo nome.

Os dois só disparam quando a URL traz `?lead=` (ou um telefone). Abrir a página
sem parâmetro nenhum não avisa o CRM nem carimba a agenda — senão o protótipo e
qualquer visita solta entrariam como lead `demo-0001`.

## Antes de mexer

As 15 perguntas, a ordem dos blocos e a escala de pontuação são propriedade
intelectual da Grokker e a documentação proíbe alteração sem autorização por
escrito. Otimize a experiência à vontade; não reescreva pergunta.
