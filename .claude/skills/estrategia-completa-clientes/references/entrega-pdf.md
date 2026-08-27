# Entrega: PDF diagramado na identidade Simple

**Este é o formato atual da Estratégia Completa.** Validado no doc da Thaina
Elvira e repetido na Luana Isse (23 páginas). O caminho antigo, de Google Doc
formatado, está em `entrega-drive.md` e virou alternativa, não o padrão.

## Por que mudou

O Doc formatado resolve legibilidade, mas o documento é **material de venda e
de call**, não relatório interno. O cliente abre isso na frente da equipe dele.
Um PDF diagramado com capa, identidade e uma ideia por página muda a percepção
de valor do entregável inteiro, e elimina o problema de o cliente editar o
documento sem querer.

Ele também usa **o mesmo pipeline do roadmap** (HTML paginado → validação →
navegador headless → PDF), então quem sabe fazer um sabe fazer o outro.

## A forma

- **A4 retrato**, altura de página fixa, identidade Simple (navy + dourado).
- **Capa** com o nome do cliente, o nome do documento e a data.
- **Runhead** em toda página interna, com a seção corrente.
- **Uma ideia por página.** Seção que não cabe vira "parte 1" e "parte 2" (ex.:
  "Copy do Quiz" e "Copy do Quiz: perguntas 5 a 8"). **Nunca esprema para
  caber**, e nunca reduza a fonte abaixo de 10pt.
- **Boxes e chips** para destacar o que a pessoa vai reler: a big idea, a regra
  de corte, o aviso de risco.

## A sequência de páginas

```
1  Capa
2  O Funil em Uma Página        ← o mapa inteiro antes do detalhe
3  Big Idea
4+ As 6 seções de copy, quebradas em partes de uma página cada
   · Copy do Quiz
   · Página Pós-Quiz: a copy bloco a bloco
   · Copy dos Anúncios: os 3 ângulos
   · Os 20 criativos escritos
   · Cadência de Atendimento, 12 dias
   · Recomendações Estratégicas
N  Estrutura de largada da campanha
```

**"O Funil em Uma Página" na posição 2 não é enfeite.** É o que faz o cliente
entender o todo antes de mergulhar em copy, e é a página que ele vai printar e
mandar para a equipe.

## Os 20 criativos, escritos

Não é lista de ideia, é criativo pronto para produzir:

- **5 estáticos**: o texto da arte e a legenda.
- **5 carrosséis**: card a card.
- **10 vídeos**: roteiro com hook, desenvolvimento e CTA, agrupados por eixo
  (dor, mecanismo, autoridade).

Agrupe os roteiros por eixo e diga qual eixo é para testar primeiro. Um bloco de
**headlines e hooks para teste A/B** fecha a parte de anúncios.

## Validação antes do PDF (obrigatória)

Mesma régua do roadmap:

1. `grep -c '{{'` tem que dar **0** (zero placeholder esquecido).
2. `grep -c '—'` tem que dar **0** (zero travessão).
3. Script de estouro de página: resultado `TODAS-AS-PAGINAS-OK`.
4. **Leitura de gênero:** varra o documento procurando adjetivo que concorda com
   quem lê. Ver `regras-de-copy.md`, regra 1. Nenhum script pega isso, é leitura.

## Geração

Navegador headless a partir do HTML final, A4, sem margens e sem
cabeçalho/rodapé do navegador. Sem navegador no ambiente, entregue o HTML
paginado com a instrução de imprimir pelo Chrome nessas configurações.

## Versionamento

Salve **HTML e PDF** em `clientes/<cliente>/estrategia/`, com data no nome. O
HTML é a fonte editável: é ele que permite gerar a `-v2` sem refazer tudo quando
a oferta mudar. PDF sozinho no Drive não é memória, é arquivo morto.
