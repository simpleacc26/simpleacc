---
name: estrategia-completa-clientes
description: Gera o documento de estratégia completo de um cliente (modelo Simple Acc) a partir da transcrição ou das notas de uma reunião de onboarding, e entrega como PDF paginado na identidade da casa (navy + dourado), na pasta do cliente no Drive. Use sempre que alguém do time precisar montar a estratégia inicial de um cliente novo, "replicar o doc da Luana para o cliente X", transformar um onboarding em documento de estratégia, gerar copy de funil/quiz/anúncios/cadência para um cliente, ou criar o material que inicia um projeto, mesmo que não digam explicitamente "documento de estratégia". Cobre desde a extração das informações do onboarding até a entrega do PDF na pasta do cliente.
---

# Estratégia Completa para Clientes · gerador do documento no modelo Simple Acc

## O que esta skill faz

Pega o **levantamento de um onboarding** (transcrição, notas do Gemini/Meet,
áudio transcrito, ou um resumo escrito) e produz o **documento de estratégia
completo** do cliente, na estrutura validada, entregue como **PDF paginado na
identidade visual da Simple**, na pasta do cliente no Drive.

O valor está em três coisas que o time costuma errar quando faz na mão:
1. **Extrair a estratégia certa** do onboarding (não só transcrever: interpretar).
2. **Seguir a estrutura comprovada** de 6 seções, adaptada ao tipo de funil e ao público.
3. **Entregar no formato da casa** (PDF paginado navy + dourado), e não um textão.

## ⚠️ O formato mudou. Leia isto antes de qualquer coisa.

**A entrega é PDF paginado, igual ao roadmap. Não é Google Doc.**

Até 20/07/26 a estratégia saía como Google Doc convertido de markdown (João
Mendes, Lucas Sobreiro). **Esse formato está aposentado.** O padrão atual é o da
**Luana Isse (11/08/26)**: documento paginado A4, navy #1b2a4a + dourado #b8863b,
capa, cabeçalho e rodapé corridos, seções quebradas em partes, exportado em PDF.
É o mesmo sistema visual do roadmap de 90 dias, de propósito: o cliente recebe as
duas peças e elas conversam.

**Antes de escrever qualquer linha, leia
`assets/exemplos/estrategia-luana-isse-11.08.26.md`.** É o padrão-ouro e traz o
mapa de páginas, os componentes a copiar e o nível de profundidade esperado.

> **Como esse erro aconteceu** (13/08/26, Rafael Cobra): a skill ainda mandava
> entregar Google Doc, os exemplos no repo eram todos do formato antigo, e o PDF
> da Luana estava **só no Drive**. A sessão gerou markdown, subiu um Doc e
> entregou errado. Por isso o exemplo agora vive no repo: **se um entregável novo
> definir padrão, ele tem que ser commitado, não só compartilhado.**

## O fluxo (siga nesta ordem)

```
1. EXTRAÇÃO   → ler o onboarding e preencher o mapa estratégico
2. GERAÇÃO    → escrever as 6 seções em HTML paginado (modelo da casa)
3. VALIDAÇÃO  → travessões, placeholders e estouro de página
4. PDF        → exportar com o navegador headless
5. ENTREGA    → subir o PDF na pasta do cliente no Drive
6. VERSIONAR  → salvar o HTML fonte em clientes/<cliente>/estrategia/ no repo
```

Não pule a extração. Gerar copy sem entender o ICP, as frentes e o gargalo é o
caminho mais rápido pra refazer tudo. Se o onboarding não cobrir algum ponto
crítico, **assuma o padrão mais provável, sinalize a premissa na página 2** e
siga: não trave esperando informação.

---

### Passo 1 · Extração estratégica

Leia o material do onboarding inteiro antes de escrever qualquer coisa. O
objetivo é sair com um mapa claro de quem é o cliente, o que vende, pra quem, e
o que trava o crescimento.

Use o framework completo em **`references/extracao-onboarding.md`**: ele lista
exatamente o que procurar (ICP, dor, frentes/produtos, oferta, mecanismo único,
provas, ticket, origem de tráfego, gargalo operacional, geografia, destino do
lead) e como inferir o que faltar.

**Procure sempre a transcrição da call de vendas**, não só a de onboarding. É o
documento mais rico que existe de um cliente novo, e é onde estão os números.
Antes de declarar lacuna, confirme que leu essa call.

Ao final, escreva um **resumo de 8 a 12 linhas** do que extraiu e, se estiver
conversando com uma pessoa, confirme antes de gerar. Rodando sozinho, registre as
premissas na página 2 do documento.

### Passo 2 · Geração do documento

Escreva as **6 seções** seguindo **`references/estrutura-documento.md`**, que traz
o detalhe de cada uma, o mapa de páginas e como adaptar por tipo de funil e por
público. Parta de **`assets/modelo-estrategia.html`**, que já tem o CSS validado.

1. **Big Idea**: a tese central, a frase da transformação, o mecanismo e a régua de linguagem
2. **Copy do Quiz**: 8 perguntas SPIN, regra de segmentação e captura de dados
3. **Página pós-quiz**: os 9 blocos, com a copy escrita e as variáveis declaradas
4. **Copy dos anúncios**: 20 criativos (5 estáticos, 5 carrosséis, 10 vídeos roteirizados), 10 headlines, 5 hooks e a estrutura de largada
5. **Cadência de atendimento**: 12 dias na voz do cliente, mais os 5 níveis de lead
6. **Recomendações estratégicas**: gargalos, riscos e prioridades, cada um com régua

Antes da seção 1 vai a **página de contexto** ("Antes de ler a copy"): caminho do
lead, esteira, o que a copy precisa compensar e as premissas assumidas.

Princípios de copy (resposta direta, não "copy bonita"): linguagem do público,
não de marketeiro; mecanismo único claro; frases curtas e ritmo; zero promessa
vazia. Se o cliente pediu uma voz específica, respeite em todo texto,
especialmente na cadência.

**Clientes com mais de uma frente:** gere quiz, anúncios e página para cada
frente, respeitando o split de mídia definido no onboarding. A frente de maior
diferenciação costuma ser o carro-chefe de marca mesmo quando outra traz o
volume financeiro.

### Passo 3 · Validação (obrigatória)

As três checagens são as mesmas do roadmap, e valem aqui pelo mesmo motivo:

```bash
grep -c '—' <arquivo>.html        # travessões: tem que dar 0
grep -c '{{\|ADAPTAR' <arquivo>.html  # placeholders: tem que dar 0 fora das variáveis de funil
```

Atenção: nesta skill `{{nome}}`, `{{elo_dominante}}` e afins **são conteúdo**
(variáveis do funil, aparecem no documento de propósito). O que não pode sobrar é
placeholder do modelo. Confira caso a caso.

Estouro de página: use o script de validação de
`.claude/skills/roadmap-estrategico-90-dias/references/validacao-e-pdf.md`
(seção 3). O resultado esperado é `TODAS-AS-PAGINAS-OK`. Se apertar, **divida a
seção em parte 1 e parte 2** em vez de espremer: é o que a Luana faz em 5 das 6
seções.

### Passo 4 · PDF e entrega no Drive

Gere o PDF com o navegador headless (mesmo comando do roadmap) e suba **o PDF**
na pasta do cliente. O detalhe está em **`references/entrega-pdf.md`**, inclusive
o padrão de nome do arquivo e o fallback sem navegador.

Nome do arquivo, padrão da casa:
`Estratégia Completa + Copies <Tipo de Funil> <Nome do Cliente> - DD.MM.AA.pdf`

### Passo 5 · Versionar no repositório (memória = Git)

Além do PDF, **salve a fonte no repositório**, para que a estratégia fique
versionada junto com o resto do conhecimento do cliente.

1. Salve o **HTML** em `clientes/<cliente>/estrategia/AAAA-MM-DD-estrategia.html`
   (pasta do cliente em minúsculas, sem acento, com hífen). O PDF gerado fica ao
   lado, com o nome de entrega.
2. No topo do HTML, em comentário: data, autor, link do arquivo no Drive e as
   premissas assumidas.
3. Registre uma linha em `clientes/<cliente>/aprendizados.md` (data, "estratégia
   inicial criada", link).
4. Commit numa branch `cliente/<cliente>/estrategia` e abra PR.
5. **Se esta entrega mudar o padrão da casa, atualize esta skill e salve o novo
   exemplo em `assets/exemplos/`.** Padrão que vive só no Drive se perde.

---

## Checklist antes de entregar

- [ ] Li o exemplo da Luana antes de começar
- [ ] Resumo estratégico confirmado, com premissas na página 2
- [ ] As 6 seções presentes e adaptadas (nada genérico copiado de outro cliente)
- [ ] 20 criativos, com os 10 roteiros de vídeo escritos (hook, desenvolvimento, CTA)
- [ ] Frentes múltiplas cobertas, se aplicável, com split de mídia
- [ ] Voz e tom pedidos pelo cliente respeitados, principalmente na cadência
- [ ] Zero travessões · separador "·" · intervalos com "a"
- [ ] `TODAS-AS-PAGINAS-OK` na validação de paginação
- [ ] **PDF** gerado e subido na pasta certa do cliente no Drive
- [ ] **HTML fonte salvo em `clientes/<cliente>/estrategia/`** e aprendizado registrado
- [ ] Sem arquivo intermediário e sem duplicado de nome igual na pasta do Drive
- [ ] Link do PDF final informado à pessoa
