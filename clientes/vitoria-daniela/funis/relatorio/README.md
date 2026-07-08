# Relatório (Diagnóstico Estratégico) — Vitória Daniela

Item 3 da ordem de execução. A cliente decidiu manter **um único relatório
genérico** (não por balde) — então este é o escopo final do item 3, não uma
etapa intermediária.

## Por que isso existe fora do Figma

O relatório original vive em Figma Make
(`https://www.figma.com/make/fiASU8LAlKiSqhhEqt4iI2/Relatorio-Vitoria--Copy-`),
mas o Daniel só tem acesso de **visualização** nesse arquivo (não é dono, e o
dono não pode dar acesso de edição no momento). Sem edição, também não dá
pra ler o código-fonte por API (o mesmo `get_design_context` que funcionou
pro quiz e pra LP devolveu "sem acesso de edição" aqui).

Por pedido do Daniel, recriei o relatório **fora do Figma**, em HTML puro,
pra dar autonomia total de edição sem depender de acesso a esse arquivo.

## Como foi recriado

O conteúdo (texto) veio 1:1 do PDF que já é enviado hoje pros leads
("Diagnóstico Estratégico Personalizado - Vitória Daniela.pdf", na pasta do
cliente no Drive) — 10 blocos ("slides"): capa, carta de abertura, os 3
motivos, por que já tentou de tudo, prova social, os 4 passos da sessão,
sobre a Vitória, pra quem é/não é, recapitulando, e a chamada final com as 2
opções.

O visual (fundo preto/dourado `#Cfb36e`, cards com borda `#222`, tipografia
Montserrat) segue a **mesma identidade** já usada no quiz e na LP — não tive
acesso ao visual exato do arquivo original do Figma, então recriei com o
sistema visual que a Vitória já aprovou nos outros dois funis, pra manter
tudo consistente. As duas fotos usadas (capa e seção "sobre") são as mesmas
já em uso na LP (`Hero.tsx` e `AboutExpert.tsx`). Não há nenhum botão no
documento (ver rodada 2 abaixo).

## Arquivos

- `Diagnostico-Estrategico-Vitoria-Daniela.html` — versão HTML, autocontida
  (fotos embutidas em base64, abre em qualquer navegador sem depender de
  internet nem de arquivos externos). É o arquivo "fonte" pra editar texto.
- `Diagnostico-Estrategico-Vitoria-Daniela.pdf` — versão PDF gerada a partir
  do HTML, uma página por bloco/"slide", pronta pra enviar como está hoje.
- `template.html` — mesmo HTML, mas com placeholders no lugar das fotos e do
  link do WhatsApp (usado para gerar o HTML final; editar aqui se for trocar
  foto/link, depois re-gerar).
- `assets/` — as 2 fotos usadas, em PNG.

## Rodada 2 — realinhamento com o quiz v2 e a LP nova (2026-07-08)

Depois da primeira versão (recriação 1:1 do relatório antigo), a Vitória
pediu para revisar a comunicação e alinhar com o gancho novo do quiz e da
LP ("autoridade que você já tem no offline → presença online → clientes de
alto valor"). Mudanças aplicadas:

1. **Capa e carta de abertura** reescritas em cima do gancho novo (autoridade
   offline → digital), em vez do gancho antigo ("quanto lucro... com
   previsibilidade").
2. **"Os 3 motivos" virou "Os 4 motivos"**, um pra cada balde real do quiz v2
   (Sem Previsibilidade, Marketing Sem Sistema, Refém da Operação, e o que
   faltava: **Sem Posicionamento**). Assim, seja qual for a resposta da
   pessoa na pergunta-chave do quiz, ela reconhece o próprio gargalo aqui.
3. **Nova seção — Método Magna**, com as 3 fases (presença digital,
   captação, organização nas vendas) que hoje são o mecanismo central da LP,
   mas não apareciam em lugar nenhum do relatório.
4. **"Por que já tentou de tudo"** ajustado pra reforçar autoridade/presença
   online em vez de só "diagnóstico do negócio" genérico.
5. **"Pra quem é"** ganhou um critério a mais: já ter alguma estrutura
   rodando (equipe, ainda que pequena) — reflete o filtro que também existe
   no quiz v2.
6. **Todos os botões foram removidos.** A Vitória esclareceu que o relatório
   é a entrega de valor dentro da conversa de WhatsApp, não uma página com
   CTA — o convite pra sessão acontece na conversa, não no documento. Os
   trechos que levavam ao botão foram reescritos como fechamento (sem pedir
   clique em nada).
7. **Sem travessão em lugar nenhum** (troquei por "·" nos títulos com
   numeração) e revisado pra fugir de linguagem de guru/IA, batendo direto
   na dor — seguindo o feedback de tom já registrado em `contexto/README.md`
   e o histórico de feedback de copy da própria Vitória (`[Vitória] COPY
   2026`, Drive).

## Pendências / próximos passos

- **Confirmar com a Vitória** se a nova comunicação do relatório está de
  acordo antes de considerar o item 3 fechado de vez.
- Publicar: como esse HTML não está hospedado em lugar nenhum ainda (ao
  contrário do quiz/LP, que são o site ao vivo), falta decidir onde ele vai
  morar de fato — pode virar um projeto Vercel próprio dentro dessa mesma
  pasta, ou ser o arquivo que a automação do GHL manda como anexo.
