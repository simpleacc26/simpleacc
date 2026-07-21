---
name: roadmap-estrategico-90-dias
description: >-
  Gera o Roadmap Estratégico de 90 dias de um cliente da Simple: PDF na
  identidade visual navy + dourado, seguindo a estrutura validada nos roadmaps
  do Rômulo Heleno e do Lucas Sobreiro (o melhor dos dois), a partir dos
  materiais de base do cliente (call de onboarding, canvas de produto e
  cliente ideal, anotações, call de vendas). Use sempre que alguém pedir
  "roadmap do cliente X", "monta o roadmap estratégico", "replica o roadmap do
  Lucas/Rômulo para o cliente X", "plano de ação de 90 dias", ou quando o
  onboarding de um cliente novo chegar na etapa de elaboração do roadmap.
  Personaliza tudo à realidade do cliente e valida travessões e paginação
  antes de entregar.
---

# Roadmap Estratégico de 90 dias: gerador por cliente

## O que esta skill faz

Transforma os **materiais de base de um cliente** (call de onboarding, canvas
do produto e do cliente ideal, anotações de reunião, call de vendas) no
**Roadmap Estratégico de 90 dias**: o PDF de apresentação que o time entrega
na call de roadmap, na identidade visual da Simple (navy + dourado), com
fases, passos numerados, metas numéricas, checkpoints e fechamento
personalizado.

A estrutura vem dos dois roadmaps validados e usa **o melhor dos dois**:

- **Do Rômulo Heleno** (cliente iniciante, executa sozinho): disciplina de
  foco (um público, uma promessa), matemática operacional da meta, aulas
  antes de executar, metas com alerta vermelho, tráfego só depois de vendas
  manuais.
- **Do Lucas Sobreiro** (cliente com produto validado, Simple implementa):
  estratégia de caixa rápido, esteira de produtos, divisão de
  responsabilidades Simple x cliente, funil de lead dinâmico implementado
  pela equipe, bônus com os ativos únicos do cliente.

Padrões inegociáveis do Daniel, já embutidos: **zero travessões** em qualquer
texto e **paginação perfeita** (nenhuma página cortada; validação automática
antes do PDF).

## Arquivos desta skill

- **`references/extracao-cliente.md`**: o que extrair dos materiais de base
  (mapa do cliente) e o que perguntar se faltar.
- **`references/estrutura-e-conteudo.md`**: o documento página a página, com
  as variantes Rômulo x Lucas e as regras para escolher entre elas.
- **`assets/modelo-roadmap.html`**: template HTML com a identidade visual, o
  CSS validado (altura A4 fixa) e o esqueleto das páginas com blocos
  comentados.
- **`references/validacao-e-pdf.md`**: validações obrigatórias e geração do
  PDF com fallbacks.
- **`references/exemplos-entregues.md`**: o padrão destilado dos roadmaps já
  entregues (o que se repete em todos), com ponteiro para cada exemplo.
- **`assets/exemplos/`**: roadmaps reais entregues, embutidos como base de
  calibragem (fonte HTML editável, funcionam em qualquer sessão):
  `roadmap-lucas-sobreiro.html`, `roadmap-joao-mendes.html`,
  `roadmap-ayla-rica.html`. **Leia pelo menos um por inteiro antes de
  redigir** (tom, granularidade, formato dos boxes e do fechamento).

Exemplos completos entregues (base de calibragem, todos Perfil B): os três
arquivos em **`assets/exemplos/`** acompanham a skill e servem em qualquer
sessão, sem depender do repositório. O de referência do Perfil A (cliente que
executa sozinho) é o roadmap do Rômulo Heleno; quando a pessoa enviar o PDF
dele na conversa, use como calibragem, senão a estrutura de
`references/estrutura-e-conteudo.md` basta. Se estiver no repositório da
Simple, as fontes vivas de cada cliente também existem em
`clientes/<cliente>/estrategia/`.

## O fluxo (siga nesta ordem)

```
1. EXTRAÇÃO     → ler TODOS os materiais e preencher o mapa do cliente
2. ARQUITETURA  → decidir as variantes (perfil executor x implementado, caixa
                  rápido, esteira, bônus) e a matemática da meta
3. REDAÇÃO      → escrever o documento no template, 100% na realidade do cliente
4. VALIDAÇÃO    → zero travessões + zero placeholders + paginação OK
5. PDF          → navegador headless (com fallbacks)
6. ENTREGA      → enviar o PDF + versionar fonte e PDF + aprendizados + commit/PR
```

### Passo 1: Extração

Leia **todos** os materiais de base antes de escrever qualquer coisa
(transcrições inteiras, não só resumos: os detalhes que personalizam o
roadmap moram nas falas). Preencha o mapa de
**`references/extracao-cliente.md`**: história e credencial, produto e
ticket, meta, conversão real, equipe, canais atuais, base existente, ativos
únicos, restrições do nicho, o que a Simple vendeu (escopo), teto de agenda,
tom de voz.

Se faltar dado crítico (ticket, meta, escopo do contrato), pergunte tudo de
uma vez à pessoa. Se estiver rodando de forma autônoma, assuma o padrão mais
provável, sinalize a premissa e siga. Não trave.

### Passo 2: Arquitetura

Com o mapa em mãos, decida a estrutura seguindo as regras de
**`references/estrutura-e-conteudo.md`**:

- **Perfil A (tipo Rômulo)**: cliente executa sozinho, oferta única, tráfego
  só depois de vendas manuais validadas.
- **Perfil B (tipo Lucas)**: Simple implementa o funil, esteira de produtos,
  caixa rápido financiando a mídia.
- A maioria dos clientes da Simple com contrato de implementação é Perfil B.
  Na dúvida, olhe o que foi vendido no onboarding.

Monte a **matemática da meta** (sempre): meta mensal ÷ ticket = vendas/mês →
vendas ÷ conversão real = sessões/mês → sessões viram abordagens/dia e leads
do funil. Os números do roadmap inteiro derivam dessa conta e precisam bater
entre si (matemática, metas de fase e checkpoints).

### Passo 3: Redação

Copie `assets/modelo-roadmap.html` para
`clientes/<cliente>/estrategia/AAAA-MM-DD-roadmap-estrategico-<cliente>.html`
e escreva seção a seção seguindo `references/estrutura-e-conteudo.md`. Regras:

- **Tudo na realidade do cliente.** Nada de texto genérico sobrando: cada
  box, exemplo, número e nome vem do mapa da extração. Se um bloco não se
  aplica, remova a página ou o bloco e rebalanceie.
- **Zero travessões.** Use vírgula, dois-pontos, ponto final ou parênteses.
  Separador de cabeçalhos e kickers: "·". Intervalos numéricos: "de 60 a
  100", "1 a 2 minutos" (nunca traço).
- A big idea, os exemplos das dores e a linguagem vêm do **vocabulário do
  cliente e do nicho dele** (o que ele falou nas calls vale mais que
  paráfrase de marketing).
- Fechamento (última página) é **pessoal**: usa a história dele (anos de
  carreira, credencial, conversão que ele já tem) no formato "não foi falta
  de X, foi falta de Y" + "Você tem A. Você tem B. O próximo passo é começar."
- Numeração de passos contínua ao longo do documento; páginas com altura
  fixa: se o conteúdo crescer, crie outra página da mesma fase (parte 1 e
  parte 2) em vez de espremer.

### Passo 4: Validação (obrigatória)

Siga **`references/validacao-e-pdf.md`**: placeholders (`grep -c '{{'` deve
dar 0), travessões (`grep -c '—'` deve dar 0) e o script de estouro de página
(resultado esperado: `TODAS-AS-PAGINAS-OK`). Se apertar, enxugue ou mova
blocos entre páginas; não reduza a fonte abaixo de 10pt.

### Passo 5: PDF

Comando e fallbacks em `references/validacao-e-pdf.md`. Sem navegador no
ambiente, entregue o HTML paginado com a instrução de imprimir em PDF pelo
Chrome (A4, sem margens, sem cabeçalho/rodapé).

### Passo 6: Entrega e memória

1. Envie o PDF na sessão (é o entregável da call de roadmap).
2. Salve **HTML + PDF** em `clientes/<cliente>/estrategia/`.
3. Registre em `clientes/<cliente>/aprendizados.md`: data + "roadmap criado"
   + decisões estruturais (perfil A ou B, esteira definida, meta).
4. Se o ticket ou a esteira mudarem no roadmap (ex.: Lucas passou de 21k para
   20k), **atualize os arquivos vivos do cliente** (CLAUDE.md, README,
   contexto/oferta.md) para não deixar divergência.
5. Commit na branch da sessão (padrão `cliente/<cliente>/<assunto>`) e PR.

## Checklist antes de entregar

- [ ] Todos os materiais de base lidos por inteiro; mapa de extração preenchido
- [ ] Perfil (A ou B) decidido pelo escopo vendido, não por suposição
- [ ] Matemática da meta consistente em todo o documento (contexto, fases, checkpoints)
- [ ] Estratégia de caixa rápido presente (base, novo serviço, indicações, antecipação de recebíveis) quando houver base para isso
- [ ] Big idea, exemplos e fechamento na linguagem real do cliente e do nicho
- [ ] Zero travessões; zero placeholders; separadores com "·"; intervalos com "a"
- [ ] Validação de paginação OK (TODAS-AS-PAGINAS-OK) e PDF gerado do HTML final
- [ ] PDF enviado + HTML/PDF versionados + aprendizados + arquivos vivos atualizados + commit/PR
