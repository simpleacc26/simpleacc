# Quiz · Diagnóstico de Autoridade (Luana Isse)

Funil de quiz da Luana Isse. Anúncio ou bio → quiz de 9 passos → captura →
tela de carregamento → diagnóstico personalizado com CTA de WhatsApp.

**No ar:** https://quiz-luana-isse.vercel.app

> O link público é o curto. O alias com sufixo do time
> (`quiz-luana-isse-simpleacc.vercel.app`) também responde, mas é o interno.
> O nome do projeto na Vercel vira a URL e não dá para renomear: trocar de
> domínio exige projeto novo e remover o antigo no painel.

## O que é

Segue o blueprint `references/estrutura-invisivel.md` da skill
`gerar-quiz-diag-pag-pos-quiz`, com os ajustes validados no projeto
Thaina/Thiago aplicados por cima, e com a copy, o índice e a identidade
visual da Luana.

- **Índice:** IRV, Índice de Ruptura de Valor. Só as perguntas de diagnóstico
  pontuam. Faixas: ≥ 66% Alta · 33 a 65% Média · < 33% Baixa.
- **Resultado nomeado**, por pilar: Excelente e escondida · Excelente sem causa ·
  Excelente e intercambiável · Excelente sem caminho de venda. Vai no topo do
  relatório, na mensagem de WhatsApp e na planilha.
- **Pilar dominante:** sai da pergunta de problema e mapeia para um dos quatro
  pilares do MMPV. É o que personaliza a leitura e o "o que precisa acontecer".
- **Qualificação em 4 faixas** na planilha (fila-quente, qualificado, nutrir,
  fora) e **3 CTAs** na página: fila-quente e qualificado veem o mesmo botão.
  A quarta faixa serve para priorizar a fila do atendimento.
- **3 CTAs de WhatsApp distribuídos** no diagnóstico, não um só no fim.

## Arquivos

| Arquivo | O que é |
|---|---|
| `index.html` | Casca do quiz (marca + barra de progresso) |
| `flow.js` | **Toda a copy, os pesos e os resultados nomeados.** Mexer aqui |
| `app.js` | Motor: render, validação, persistência, tracking, envio do lead |
| `diagnostico.html` | Casca do relatório |
| `diagnostico.js` | Monta o diagnóstico personalizado |
| `styles.css` | Identidade visual (marfim, dourado, serifada) |

## Decisões que valem para o próximo funil

1. **Barra de progresso sem número nenhum.** Nem "Pergunta X de N", nem
   porcentagem. Número ali faz o quiz parecer longo e medido, e derruba
   conclusão. Só a barra enchendo.
2. **Sem rodapé** nas páginas do funil.
3. **Pesos calibrados sobre as 1024 combinações antes de publicar.** Na
   primeira versão, 89% caíam em "Alta" e "Baixa" era impossível: o número era
   teatro. Recalibrando com 0 e 1 nas alternativas mais leves, ficou 20% a 100%
   com ~50% Alta, ~49% Média, ~1% Baixa. A faixa Baixa é rara de propósito,
   porque o quiz não tem alternativa de "está tudo bem".
   **Se mexer em qualquer peso, rode a distribuição de novo.**
4. **Regra de corte cruzada vive no código**, em `classificarLead()`, não só no
   documento de estratégia.
5. **Mensagem de WhatsApp leva o resultado nomeado**, não só o nome. Quem
   atende abre a conversa já sabendo o diagnóstico.
6. **Trava no código:** se `marca.whatsapp` estiver vazio ou inválido, os CTAs
   não abrem nada e a página mostra um aviso no topo. Evita publicar mudo.
7. **Máscara de telefone: tire o +55 antes de cortar, e nunca use `maxLength`
   num campo mascarado.** O autofill do iPhone entrega `+55 11 99991-2039` de
   uma vez, o código do país entrava como DDD e o final do número se perdia,
   sem conserto. Ouça `input`, `change` e `blur`, porque autofill nem sempre
   dispara `input`, e normalize também o valor enviado, não só o da tela.
   Cuidado com o DDD 55 (Santa Maria/RS): é real, por isso a regra é
   `length > 11 && startsWith("55")`.
8. **Bloco de autoridade é breve:** foto (aqui, monograma), nome, o que ela faz,
   @ do Instagram e uma fala dela. Método e etapas não entram, porque já estão
   no bloco do método logo acima. A grade de credenciais só existe porque os
   quatro números são reais e estão escritos no material dela.

## Planilha e integração

**Leads · Diagnóstico de Autoridade · Luana Isse**, no Drive dela, pasta
"3. Estratégia e Tráfego":
https://docs.google.com/spreadsheets/d/14QWEtzfTYxLcImWQW_Pcw0BJtNK1BY14jthvCUKhxLo/edit

26 colunas: data, contato, IRV, faixa, pilar, **resultado**, qualificação, as 9
respostas por extenso, frente, origem, página e as 5 UTMs.

Cenário no Make (time Simple Acc):
**[Luana Isse] Diagnóstico de Autoridade → Sheets**, id `5982387`, webhook
instantâneo. Só roda quando chega lead: **2 operações por lead, sem varredura
e sem agendamento**. Nada de crédito queimando à toa.

Detalhes que quebram se alguém mexer:

- A aba da planilha chama **"Untitled"** (nome de nascença de planilha criada a
  partir de CSV). O `addRow` do Make referencia a aba pelo **nome**:
  **renomear quebra o cenário** com "400 Unable to parse range" e o Make
  desativa sozinho. Não renomeie.
- O mapeamento é **por posição**, não por cabeçalho. Inserir coluna no meio
  desalinha tudo.
- O POST vai em `application/json` com `keepalive`. **Validar sempre lendo a
  planilha**, nunca pelo status HTTP: com `no-cors` o navegador devolve 0
  mesmo quando gravou.

## Teste obrigatório antes de qualquer publicação

Cole `+55 11 99991-2039` no campo de WhatsApp e confirme que o campo mostra
`(11) 99991-2039` **e** que é isso que sai no payload. Os dois, não só o campo.

## Pendências

- [ ] **Foto da Luana** para o bloco de autoridade. Hoje está o monograma LI.
      Se for pelo deploy do MCP da Vercel, encolha antes (~224px, poucos KB) e
      confira o SHA256 do arquivo publicado contra o local.
- [ ] Pixel da Meta e GA4 em `app.js > TRACKING_CONFIG`, se for rodar tráfego pago.

## Como rodar e publicar

Site estático puro, sem build e sem dependência. Para ver local, abra
`index.html` no navegador ou sirva a pasta (`python3 -m http.server`).

Deploy na Vercel, **time Simpleacc**, projeto `quiz-luana-isse`, target
production. Nunca publicar em conta pessoal. Publicação substitui a árvore
inteira: **confira todos os assets com curl depois de cada deploy**, porque
arquivo faltando vira 404 mudo.
