---
name: roadmap-estrategico-90-dias
description: >-
  Gera o Roadmap Estratégico de 90 dias de um cliente da Simple: PDF diagramado
  na identidade navy + dourado, com a narrativa do projeto (inimigo, virada e
  régua de linguagem), a matemática da meta montada a partir do volume de
  abordagem, fases com passos numerados, metas por fase e checkpoints, a partir
  dos materiais de base do cliente (call de vendas, call de onboarding, canvas,
  anotações). É o documento irmão da Estratégia Completa. Use sempre que alguém
  pedir "roadmap do cliente X", "monta o roadmap estratégico", "plano de ação de
  90 dias", ou quando o onboarding de um cliente novo chegar na etapa de
  elaboração do roadmap. Personaliza tudo à realidade do cliente e valida
  travessões e paginação antes de entregar.
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

**Referências vivas** (exemplos completos entregues, em ordem de atualidade):
André Donha (09/2026, o mais recente e o que trouxe a página de Narrativa),
Adriana Brunelly (09/2026), Lucas Sobreiro (07/2026) e Rômulo Heleno. Se a
pessoa enviar os PDFs na conversa, use como calibragem de tom; se não enviar, a
estrutura embutida aqui basta.

**Documento irmão:** a skill `estrategia-completa-clientes` escreve a copy do
funil que este roadmap manda implementar. Os dois usam o mesmo CSS e **nenhum
número pode divergir entre eles**: esteira, ticket, meta, conversão e verba são
os mesmos. Quem for gerado depois se ajusta ao primeiro.

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

Decida também **a narrativa**, que vira a página 4 e é obrigatória: o inimigo
com nome próprio, a virada, a abertura na palavra do cliente e a régua de
linguagem. Sem ela, cada criativo do projeto inventa a própria linguagem.

Monte a **matemática da meta** (sempre). E monte no sentido certo: **comece pelo
volume de abordagem**, que é a única variável 100% do cliente, e não pela meta
de faturamento, que é consequência.

> abordagens/dia × dias úteis → respostas → conversas → **sessões agendadas** →
> **sessões comparecidas** → vendas × ticket = meta

Não esqueça o **comparecimento**: é o erro mais comum e ele infla a projeção em
uns 40%. As taxas de referência e a régua de volume estão em
`references/estrutura-e-conteudo.md`. Os números do roadmap inteiro derivam
dessa conta e precisam bater entre si (matemática, metas de fase e checkpoints).

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
- [ ] Página 4 (A Narrativa) presente: inimigo com nome, virada, abertura citada e régua de linguagem
- [ ] Matemática montada a partir do volume, com comparecimento na conta
- [ ] Régua de volume ambiciosa (de 50 a 100 abordagens por dia) e passo de prospecção semanal presente
- [ ] Teto de agenda declarado
- [ ] Alerta vermelho com os três gatilhos separados
- [ ] Matemática da meta consistente em todo o documento (contexto, fases, checkpoints)
- [ ] Estratégia de caixa rápido presente (base, novo serviço, indicações, antecipação de recebíveis) quando houver base para isso
- [ ] Big idea, exemplos e fechamento na linguagem real do cliente e do nicho
- [ ] Zero travessões; zero placeholders; separadores com "·"; intervalos com "a"
- [ ] Validação de paginação OK (TODAS-AS-PAGINAS-OK) e PDF gerado do HTML final
- [ ] PDF enviado + HTML/PDF versionados + aprendizados + arquivos vivos atualizados + commit/PR
