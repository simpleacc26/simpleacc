# Quiz · Diagnóstico da Mecha (Rômulo Heleno)

Funil de quiz da Mentoria Cabelo de Segunda. Anúncio ou bio → quiz de 9 passos →
captura → tela de carregamento → diagnóstico personalizado com CTA de WhatsApp.

**No ar:** https://romulo-heleno.vercel.app

> O projeto na Vercel chama `romulo-heleno` e o nome do projeto vira a URL, que
> não dá para renomear. Trocar para o padrão novo (`quiz-romulo-heleno`) exige
> projeto novo mais redirect do endereço antigo. Não vale enquanto o link já
> circula com o cliente.

## O que é

Segue o blueprint `references/estrutura-invisivel.md` da skill
`gerar-quiz-diag-pag-pos-quiz`, na **versão fechada no funil da Luana Isse**
(mesmo motor, mesma ordem de blocos, mesmas travas), com a copy, o índice e a
identidade do Rômulo por cima.

- **Índice:** IIM, Índice de Improviso na Mecha. Só as perguntas de diagnóstico
  pontuam. Faixas: ≥ 66% Alto · 33 a 65% Médio · < 33% Baixo.
- **Resultado nomeado**, por pilar: Refém da tonalidade · Mão boa, método nenhum ·
  Uma receita para todo tipo de cabelo · Trabalho de especialista, preço de
  iniciante. Vai no topo do relatório, na mensagem de WhatsApp e na planilha.
- **Pilar dominante:** sai da pergunta de problema e mapeia para Leitura,
  Execução, Adaptação ou Posicionamento. É o que personaliza a leitura e o
  "o que precisa acontecer agora".
- **Qualificação em 4 faixas** na planilha (fila-quente, qualificado, nutrir,
  fora) e **3 CTAs** na página: fila-quente e qualificado veem o mesmo botão.
- **3 CTAs de WhatsApp distribuídos** no diagnóstico, não um só no fim.
- **Identidade:** navy `#14233D` + dourado `#B98A3E` sobre marfim `#F5F1EA`,
  Lora no corpo e nos títulos. É a mesma paleta e a mesma tipografia dos documentos de estratégia e do checkpoint que o cliente já
  recebeu, para o funil parecer a mesma marca. **Não veio de manual de marca:
  o cliente não tem um.**

## Arquivos

| Arquivo | O que é |
|---|---|
| `index.html` | Casca do quiz (marca + barra de progresso) |
| `flow.js` | **Toda a copy, os pesos e os resultados nomeados.** Mexer aqui |
| `app.js` | Motor: render, validação, persistência, tracking, envio do lead |
| `diagnostico.html` | Casca do relatório |
| `diagnostico.js` | Monta o diagnóstico personalizado |
| `styles.css` | Identidade visual |
| `logo.svg` | Monograma oficial dele, navy sobre transparente. Topo das duas páginas e caixa do bloco de autoridade |
| `favicon.svg` | O mesmo monograma em marfim sobre o navy, para a aba do navegador. Reaproveita **o mesmo base64 do `logo.svg`**, repintado por `feColorMatrix` |

## Decisões desta conta

1. **A porteira de caixa é ticket praticado na mecha, nunca faturamento.** O
   documento de estratégia é explícito ("o filtro é por intenção e momento,
   nunca por pergunta crua de renda") e o aprendizado do Thiago Menegão diz o
   mesmo. Isso diverge da Luana, que pergunta faturamento, e é de propósito.
2. **Só uma alternativa filtra para fora:** quem não atende cliente e não tem
   previsão de atender, que é o "para quem não é" do documento. Quem atende
   outros serviços e ainda não faz mecha continua no funil, porque é o
   "quero começar do jeito certo", que é ICP.
3. **Sem depoimento no ar, e sem placeholder.** O cliente não tem case com
   autorização. O documento de estratégia marca isso como o risco número um do
   projeto. O bloco existe no código (`DEPOIMENTOS` em `diagnostico.js`) e passa
   a renderizar sozinho quando o array for preenchido. **Não invente e não
   coloque `[DEPOIMENTO]` no ar.**
4. **O bloco de autoridade só usa o que está escrito no material dele:**
   especialista em mecha, ex-técnico de marca, 2024 dentro de dezenas de salões.
   Sem grade de números, porque anos de cadeira, marcas e nº de profissionais
   treinados ainda não foram confirmados. A "fala" dele é a tese do método,
   rotulada como tese, não como citação: ninguém colocou aspas em algo que ele
   não disse.
5. **Barra de progresso sem número nenhum**, nem "Pergunta X de N" nem
   porcentagem. Número ali faz o quiz parecer longo e derruba conclusão.
6. **Sem rodapé** nas páginas do funil.
7. **Instagram opcional na captura.** No mercado de beleza o perfil é o
   portfólio: quem atende abre a conversa já tendo visto o trabalho da pessoa.
8. **Placeholder de telefone com DDD 11**, não o 51 do Rômulo. O público é
   nacional; DDD regional no campo sinaliza atendimento local.
9. **Linguagem neutra em gênero.** O público é majoritariamente feminino mas tem
   homens na cadeira. Nenhum adjetivo concorda com quem lê, e nada de
   "cabeleireira(o)" no meio da frase.
10. **Títulos em Lora, não em Playfair.** A Playfair tem contraste alto e
    hairlines finas, que somem no celular e deixam a pergunta cansativa de ler.
    Lora tem contraste baixo, foi desenhada para tela, e já é a fonte do corpo
    e dos documentos dele. A hierarquia vem do peso e do tamanho.
11. **Marca: o monograma dele, embutido como data URI dentro do SVG.** O
    original é o avatar do Instagram (JPG 320px, fundo preto), guardado em
    `contexto/marca/`. Saiu o quadrado e o círculo, sobrou o traço, limpo do
    artefato de JPEG e recortado no traço. Data URI de propósito: o funil segue
    100% texto e nenhum arquivo passa pelo transporte base64 do MCP.
12. **Só `favicon.svg`, sem PNG.** Os três favicons PNG foram removidos porque
    **binário sobe corrompido pelo MCP da Vercel**: no deploy de 26/08,
    `favicon-32.png` voltou com 1 byte trocado e o `apple-touch-icon.png` com 9,
    ambos abrindo normalmente e só pegos pelo SHA256. Sem binário na árvore, o
    deploy inteiro é texto e nunca mais corrompe.
13. **O `favicon.svg` não tem cópia própria do monograma.** Ele carrega o
    **mesmo base64 do `logo.svg`**, byte a byte, e vira marfim por um filtro
    `feColorMatrix`. Duas transcrições do mesmo desenho já deram divergência de
    1 byte entre repositório e produção; com uma só, isso não tem como
    acontecer. Trocando a logo, extraia o data URI do `logo.svg` novo e cole nos
    dois arquivos pelo mesmo script, nunca à mão.

## Pesos e calibração

**Rodamos as 1024 combinações antes de publicar.** Amplitude de 20% a 100%, com
45,9% Alto, 53,3% Médio e 0,8% Baixo. A faixa Baixa é rara de propósito: o quiz
não tem alternativa de "está tudo certo". **Se mexer em qualquer peso, rode a
distribuição de novo:**

```bash
node -e '
global.window={};require("./flow.js");
const F=window.FLOW, sc=F.steps.filter(s=>s.options.some(o=>typeof o.peso==="number"));
const max=sc.reduce((a,s)=>a+Math.max(...s.options.map(o=>o.peso||0)),0);
let c={Alto:0,"Médio":0,Baixo:0},ps=[];
(function rec(i,sum){if(i===sc.length){const p=Math.round(sum/max*100);ps.push(p);
 c[p>=66?"Alto":(p>=33?"Médio":"Baixo")]++;return;}
 sc[i].options.forEach(o=>rec(i+1,sum+(o.peso||0)));})(0,0);
const t=ps.length;console.log("amplitude",Math.min(...ps)+"% a "+Math.max(...ps)+"%");
for(const k in c)console.log(k,(c[k]/t*100).toFixed(1)+"%");'
```

## Planilha e integração

**Leads · Diagnóstico da Mecha · Rômulo Heleno**, no Drive dele:
https://docs.google.com/spreadsheets/d/15s28IxbnLJFLyIayFx11ozfI1Czs-Pa60eWkyFjhqU0/edit

27 colunas: data, contato (com Instagram), IIM, faixa, pilar, **resultado**,
qualificação, as 9 respostas por extenso, frente, origem, página e as 5 UTMs.

Cenário no Make (time Simple Acc):
**[Rômulo Heleno] Diagnóstico da Mecha → Sheets**, id `5560422`, webhook
instantâneo. Só roda quando chega lead: 2 operações por lead, sem varredura e
sem agendamento.

Detalhes que quebram se alguém mexer:

- A aba da planilha chama **"Untitled"** (nome de nascença de planilha criada a
  partir de CSV). O `addRow` do Make referencia a aba pelo **nome**:
  **renomear quebra o cenário** com "400 Unable to parse range" e o Make
  desativa sozinho. Não renomeie.
- O mapeamento é **por posição**, não por cabeçalho. Inserir coluna no meio
  desalinha tudo.
- A planilha antiga (`15-nIdcgFgZ...`, 22 colunas, esquema velho com
  `answers.q1`) foi **substituída**, não migrada. Ela só tinha linha de teste.
- O POST vai em `application/json` com `keepalive`. **Validar sempre lendo a
  planilha**, nunca pelo status HTTP: o Make responde "Accepted" antes de gravar.

## Teste obrigatório antes de qualquer publicação

Cole `+55 11 99991-2039` no campo de WhatsApp e confirme que o campo mostra
`(11) 99991-2039` **e** que é isso que sai no payload. Os dois, não só o campo.

## Pendências

- [ ] **Depoimentos reais com autorização.** É o gargalo do funil, não um
      detalhe: sem prova social o relatório fecha só na autoridade.
- [ ] **Credenciais do Rômulo:** anos de cadeira, marcas em que foi técnico e
      nº de profissionais treinados. Com os números reais, entra a grade de
      credenciais do bloco de autoridade.
- [ ] **Foto do Rômulo** para o bloco de autoridade (hoje é o monograma).
- [ ] **Confirmar o WhatsApp** `(51) 99799-0520` com ele antes de mandar tráfego.
- [ ] Pixel da Meta e GA4 em `app.js > TRACKING_CONFIG`, quando o tráfego pago
      for liberado (hoje está travado até as primeiras vendas manuais).
- [ ] **Pacote de logo em vetor.** O que está no ar foi extraído do avatar do
      Instagram, que é raster. Chegando o SVG de verdade, troque `logo.svg` e
      `favicon.svg`.

## Como rodar e publicar

Site estático puro, sem build e sem dependência. Para ver local, sirva a pasta
(`python3 -m http.server 8000`) e abra `http://localhost:8000/?utm_source=teste`.

Deploy na Vercel, **time Simpleacc**, projeto `romulo-heleno`, target production.
Nunca publicar em conta pessoal. Publicação **substitui a árvore inteira**:
mande os 8 arquivos sempre, e **confira o SHA256 de cada um contra o local
depois de cada deploy**, porque arquivo faltando vira 404 mudo.

```bash
for f in index.html diagnostico.html styles.css flow.js app.js diagnostico.js logo.svg favicon.svg; do
  L=$(sha256sum "$f" | cut -c1-12)
  R=$(curl -s "https://romulo-heleno.vercel.app/$f" | sha256sum | cut -c1-12)
  [ "$L" = "$R" ] && echo "$f OK" || echo "$f DIFERE"
done
```
