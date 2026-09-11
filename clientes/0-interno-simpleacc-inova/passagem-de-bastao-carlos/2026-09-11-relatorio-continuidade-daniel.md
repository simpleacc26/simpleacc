# Relatório de continuidade — como a operação roda dentro desta conta

**Para:** Daniel Souza (CEO)
**De:** Carlos Durães, na saída — levantamento feito com o Claude Code em 11/09/2026
**Assunto:** padrões recorrentes, boas práticas e riscos do trabalho que eu e o Renan
fazemos aqui dentro

Este documento não é um resumo do que foi entregue — isso já está no Git, cliente por
cliente. É o **modelo mental**: por que a operação está montada assim, o que já
quebrou, e o que uma pessoa nova precisa saber para não repetir o mesmo erro.

---

## 1. A ideia que sustenta tudo: a memória é o Git, não a conversa

A sessão do Claude é **descartável**. Ela some. O que permanece são os arquivos
versionados. Quem entende isso opera bem aqui; quem não entende fica tentando
"voltar naquela conversa do cliente" e perde o trabalho.

Na prática, três hábitos fazem a diferença entre a base ficar viva ou apodrecer:

1. **Antes de criar qualquer coisa, ler `contexto/` e `aprendizados.md` do cliente.**
2. **Uma sessão = um assunto.** Nunca dois clientes na mesma conversa.
3. **Ao terminar, registrar o aprendizado** em `aprendizados.md` — uma linha com data,
   o que se aprendeu e de onde veio.

O terceiro é o que mais se perde quando o time está correndo, e é justamente o que
faz a base valer alguma coisa daqui a seis meses. Hoje a base tem **19 clientes** e
**521 linhas de aprendizado** acumuladas. Quase metade disso está em dois clientes
(Luana Isse e Felipe Damasceno); outros quatro têm alguma coisa; e **treze clientes
estão só com o cabeçalho do modelo, sem uma linha registrada.** Esse é o maior buraco
da base hoje.

---

## 2. O caminho padrão de um cliente

Este é o fluxo que se repetiu em todos os projetos deste ano:

```
call de vendas (Daniel)
   → call de onboarding (eu, com roteiro salvo em estrategia/)
      → canvas de produto + cliente ideal (cliente preenche)
         → roadmap estratégico de 90 dias (PDF navy + dourado)
            → documento de estratégia completa (Big Idea, quiz, copy, cadência)
               → funil de quiz no ar (Vercel) + planilha de leads (Drive via Make)
                  → tráfego + acompanhamento quinzenal
```

Cada etapa tem uma **skill** que a executa (seção 3). A ordem importa: pular o canvas
para "ganhar tempo" foi o que produziu os projetos que travaram depois.

**Gargalo conhecido e ainda aberto:** a aba de Cliente Ideal do canvas fica escondida
na lateral do Google Doc e **cerca de 80% dos clientes não a preenchem**. O Thiago
Menegão levantou isso em 06/08 e a sugestão dele — virar formulário — ficou comigo e
**não foi feita**. Recomendo que seja a primeira melhoria de processo depois da minha
saída, porque contamina todos os onboardings.

---

## 3. As skills são o ativo, não os documentos

O que tem mais valor nesta conta não são os funis entregues: é o conjunto de skills em
`.claude/skills/`, que transformou o trabalho de especialista em processo repetível.
São quatro, e cada uma carrega o aprendizado acumulado de vários clientes:

| Skill | O que faz |
| --- | --- |
| `estrategia-completa-clientes` | Onboarding → documento de estratégia formatado no Drive |
| `gerar-quiz-diag-pag-pos-quiz` | Copy aprovada → funil no ar + planilha de leads testada |
| `roadmap-estrategico-90-dias` | Materiais do cliente → roadmap em PDF na identidade da Simple |
| `leitura-pdf-whatsapp` | Diagnóstico genérico em PDF para o SDR mandar no WhatsApp |

**A regra que mantém isso funcionando:** quando um erro é descoberto num cliente, a
correção vai para a **skill**, não só para a pasta daquele cliente. Foi assim que os
aprendizados do GES360 e da Luana viraram regra para todo mundo. Se essa disciplina
cair, cada funil novo volta a ser artesanal e os mesmos bugs reaparecem.

A **estrutura invisível** dos funis (linhagem Pâmella Mello → Lucas Sobreiro → Felipe
Damasceno) está documentada em
`.claude/skills/gerar-quiz-diag-pag-pos-quiz/references/estrutura-invisivel.md`. Ela
não é estética: é a ordem SPIN das 9 perguntas, a qualificação no fim, a tela de
carregamento e a distribuição dos CTAs. **Quem mexer nisso sem ler o arquivo vai
baixar a conversão achando que está melhorando o layout.**

---

## 4. Os erros que já custaram caro — e a regra que ficou de cada um

Esta é a parte mais importante do documento. Cada item aconteceu de verdade, com
cliente e data. Todos têm em comum a mesma característica: **falharam em silêncio**.

### 4.1 O funil que engolia lead sem dar erro (Luana Isse, 24/08)

O funil estava no ar, nenhum lead chegava, e **nada acusava erro** — nem navegador,
nem Make, nem planilha. Causa: o `fetch` usava `mode: "no-cors"`, e nesse modo o
navegador descarta o cabeçalho `Content-Type: application/json` calado. O Make recebia
como texto puro, respondia **200 "Accepted"** e jogava fora.

> **Regra:** validar integração de funil é **responder o quiz inteiro no navegador** e
> depois abrir a planilha. `curl` **não** testa o caminho do navegador — ele manda o
> cabeçalho certo e passa mesmo com o bug em pé. E nunca confie em status HTTP do
> Make: ele devolve 200 para o que grava e para o que descarta.

### 4.2 O endereço antigo que continuou servindo uma cópia (GES360, 12/08)

O funil mudou de endereço e o projeto antigo ficou no ar servindo a cópia daquele
momento — uma cópia **sem o endpoint de leads**. Quem entrava pelo link antigo
respondia o quiz inteiro, via o diagnóstico normalmente e o lead evaporava. Foi
descoberto por acaso, num teste seu.

> **Regra:** ao trocar um funil de endereço, o endereço antigo **redireciona**,
> preservando as UTMs. Nunca continua servindo cópia. Cópia parada envelhece sozinha e
> vira armadilha.

### 4.3 Deploy que sobe imagem corrompida (GES360, 05/08)

Publicar funil com imagem pesada pela ferramenta de deploy embutida não funciona: o
arquivo vai codificado dentro da própria chamada e chega cortado.

> **Regra:** ligar o projeto da Vercel ao repositório, com o *Root Directory* apontando
> para a pasta do funil. Aí todo push publica sozinho, sem limite de tamanho. Em último
> caso, CLI com token — nunca o deploy embutido.

### 4.4 Integração de leads: Make, nunca Apps Script

O Apps Script exige que o **dono da conta Google do cliente** autorize a implantação.
Esse passo trava a entrega por dias e a integração fica "pronta" no papel sem gravar
nada.

> **Regra:** integração de leads é sempre `webhook do Make → Google Sheets`, com a
> conexão Google que já existe no time. A Simple resolve sozinha.
> **Duas armadilhas:** a aba de uma planilha importada de CSV nasce chamada
> `Untitled`, não `Página1`; e o módulo grava **por posição**, não por nome de coluna —
> se o cabeçalho tiver ordem diferente, os dados entram calados na coluna errada.

### 4.5 Checagem de sintaxe não substitui abrir a página (Luana, 26/08)

Uma função chamada no arquivo errado passou no `node --check` e teria quebrado o
relatório inteiro no navegador.

> **Regra:** antes de entregar, **abrir a página**. Verificação estática não pega
> referência indefinida.

### 4.6 Pixel: otimizar por lead bom, mas só quando dá (Luana, 26–27/08)

O evento `Lead` leva os parâmetros de qualificação (faixa, índice, resultado) — o dado
já existia no funil e não estava indo para o Pixel. Só que a Meta **não filtra
Conversão Personalizada por parâmetro**, só por URL. A saída é disparar um **evento
por faixa** (`LeadFilaQuente`, `LeadQualificado`…), em CamelCase.

> **Regra estratégica, que vale mais que a técnica:** com orçamento baixo (~R$ 66/dia)
> **não se otimiza por fila-quente**. A Meta precisa de ~50 conversões semanais por
> conjunto para sair do aprendizado, e fila-quente rende talvez 7. Otimiza-se por
> `Lead` e usa-se a conversão personalizada **para medir**. Trocar o evento de
> otimização só quando o volume justificar.
> **E nenhum dado pessoal vai para o Pixel — só qualificação.**

---

## 5. As regras que não se negocia

Estas não são preferências técnicas; são as que protegem a Simple e o cliente.

1. **Nunca inventar depoimento.** Nenhuma prova social entra sem existir de verdade.
2. **Print de conversa é documento — não se recria em HTML.** Quando a fala não tem
   print aprovado, ela entra como **citação atribuída**, com autor e data. Recriar a
   aparência de um print seria fabricar documento.
3. **Terceiro que aparece no enquadramento sai.** No GES360, 6 dos 22 prints ficaram de
   fora porque tinham **nome de paciente** visível, e um deles trazia dado clínico. O
   cliente autorizou a conversa dele; os pacientes dele não autorizaram nada. O
   caminho certo é pedir print novo, não borrar o antigo.
4. **Autorização de imagem fica registrada por escrito** no `CLAUDE.md` ou no
   `aprendizados.md` do cliente, com data e quem confirmou.
5. **Decisão do cliente que contraria nossa régua fica documentada como decisão dele.**
   O vídeo da Luana tem "47k em Mentoria" queimado na imagem, o que rompe a regra de
   não citar valor — levantei, ela decidiu publicar assim, e isso está anotado no
   código e no README para ninguém "consertar" depois achando que passou batido.
6. **Nunca commitar segredo.** `.env` fica fora do Git; segredo de produção mora na
   plataforma de deploy.
7. **Antes de publicar, confirmar que é a conta da Simple** — nunca uma conta pessoal.
   A skill de deploy tem essa trava justamente porque o risco é real.

---

## 6. Riscos de continuidade — por ordem de estrago

| # | Risco | Estrago se acontecer | Sugestão |
| --- | --- | --- | --- |
| 1 | A captação de lead de **todos os clientes** depende de uma única conexão Google, e de uma conta **pessoal** (`ssouzadaniel.ads@gmail.com`) | Todos os funis param de gravar lead **ao mesmo tempo e em silêncio** | Migrar para uma conta do domínio (ex.: `automacoes@simpleacc.com.br`) |
| 2 | Ninguém além do Daniel tem acesso administrativo real (GitHub tem **1 colaborador**) | Operação inteira parada se essa conta cair | Dar acesso nominal ao Renan; parar de usar conta compartilhada |
| 3 | 13 dos 19 clientes estão com `aprendizados.md` só no modelo, sem conteúdo | A base "existe" mas não ensina nada; cada sessão nova recomeça do zero | Cobrar a linha de aprendizado no fechamento de cada sessão |
| 4 | Os clientes que eu tocava perdem o ritual (Luana tem individual a cada 15 dias) | Cliente percebe o vácuo antes da Simple | Nomear o sucessor e **avisar o cliente**, não deixar descobrir sozinho |
| 5 | Webhooks do Make sem autenticação e URL visível no JavaScript da página | Lead falso injetado na planilha | Decisão consciente: aceitar ou ligar a chave `x-make-apikey` |
| 6 | O Git não distingue autoria (todo commit sai como a mesma conta) | Impossível auditar quem fez o quê | Contas nominais no GitHub |
| 7 | 49 cenários parados, webhooks órfãos e conexões duplicadas no Make | Cada conexão viva é porta aberta na conta de um cliente | Faxina trimestral |

---

## 7. Rotina que eu sugiro para manter isso vivo

**Toda sessão de trabalho**
- Começar dizendo o cliente: *"Trabalhar em `clientes/<cliente>`: [tarefa]"*.
- Pedir para ler `contexto/` e `aprendizados.md` antes de criar qualquer coisa.
- Fechar com commit + PR + **uma linha em `aprendizados.md`**.

**Toda semana**
- Abrir **uma planilha de leads** de cliente ativo e confirmar que entrou lead nos
  últimos 7 dias. É o teste mais barato que existe contra a falha silenciosa do item 1.

**Todo mês**
- Ler os `aprendizados.md` que mudaram e perguntar: *isto vale só para este cliente ou
  vira regra da casa?* O que vira regra, sobe para a skill.

**Todo trimestre**
- Faxina no Make (cenários parados, webhooks órfãos, conexões duplicadas) e na Vercel
  (projetos aposentados).
- Revisão de quem tem acesso a quê, em todas as ferramentas.

---

## 8. O que fica pendente comigo

1. **Canvas de Cliente Ideal virar formulário** — pendência de 06/08, ainda aberta,
   e afeta todos os onboardings.
2. **Verificar se os outros funis têm o mesmo `mode: "no-cors"`** que fez o lead
   evaporar na Luana. Só o funil dela foi corrigido; o molde era o mesmo para todos.
3. **Respostas da seção B do inventário de acessos** — Notion, área de membros,
   GoHighLevel, BMs, Fathom e os grupos de WhatsApp.
4. **Definir sucessor** para André Donha, Felipe Damasceno, Guilherme Eduardo,
   Luana Isse e Walescka Bomfim, e atualizar o `README.md`/`CLAUDE.md` de cada um.
