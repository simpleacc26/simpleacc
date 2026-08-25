# Funil · Diagnóstico de Receita Invisível · Evandro Fernandes

Quiz de aplicação + página pós-quiz (diagnóstico) do Evandro Fernandes (HDM),
gerado pela skill `gerar-quiz-diag-pag-pos-quiz` a partir da Estratégia Completa
aprovada (`../../estrategia/2026-07-22-estrategia-completa-evandro-fernandes.*`).

Stack: HTML/CSS/JS puro, sem dependências, sem build. Mobile-first.

## Arquivos
- `index.html` · quiz (1ª pergunta já na 1ª tela, auto-avanço)
- `flow.js` · toda a copy do quiz (marca, hero, 7 perguntas SPIN, captura)
- `app.js` · motor (render, validação, máscara, UTMs, sessionStorage, envio do lead)
- `styles.css` · identidade (tokens no `:root`)
- `diagnostico.html` + `diagnostico.js` · relatório auto-preenchido + Baixar PDF + WhatsApp
- `favicon.png` · ícone oficial do HDM, 64px
- `api/lead.js` · proxy serverless: anexa a `X-Api-Key` e encaminha ao CRM
- `integracao-planilha.gs` · Apps Script da planilha de leads

## Como rodar local
```
cd clientes/evandro-fernandes/funis/quiz-receita-invisivel
python3 -m http.server 8099
# abra http://localhost:8099/index.html?utm_source=teste
```

## Identidade visual (HDM)
Paleta extraída do site oficial (`hdmfy.com.br/assets/css/style.css`), não
inventada: fundo `#030507`, realce `#00E3BB` para `#30B9FF`, texto `#eef2ff`,
cartões translúcidos, raio 20px. Fonte da marca é Inter (usada se existir na
máquina; sem Google Fonts, por performance). Tema escuro com `@media print`
invertendo para claro, para o "Salvar em PDF" sair legível.

**Favicon:** `favicon.png` é o ícone oficial do HDM (`img/HDM_ICONE_ROXO@2x.png`
do site), recortado no bounding box e reduzido para 64px. Servido junto com o
funil, e não linkado do site do cliente, para a aba não quebrar se ele trocar o
caminho da imagem. O logo não foi redesenhado, é o arquivo dele (roxo `#806ACE`).

## Publicação (Vercel · time Simpleacc)
- **Projeto:** `quiz-evandro-fernandes` (`prj_9gwlLW8TG5yVauoDFe1714KyjhAq`), time Simpleacc (`team_bD5dst9eSAc4qVaaynXWifXr`).
- **URL de produção:** https://quiz-evandro-fernandes-simpleacc.vercel.app (deploy READY).
- ✅ **Público:** o domínio limpo responde **200** (13/08/2026). A URL com sufixo do time (`...-simpleacc.vercel.app`) segue atrás da Vercel Authentication e dá 302: **entregue sempre o domínio limpo**.
- Integridade conferida com `curl` + `cmp`: os 6 arquivos no ar são idênticos ao repo.
- Anúncio deve apontar pra raiz com query (`/?utm_source=...`), nunca `/index.html`.

## A chave do webhook (`X-Api-Key`) e o proxy `/api/lead`
O navegador **não** fala mais direto com o n8n do HDM. Ele posta em `/api/lead`,
uma função serverless (`api/lead.js`) na própria Vercel, e ela anexa o header
`X-Api-Key` e encaminha. Três ganhos:

1. A chave **nunca chega ao navegador do lead.** Se ela viajasse no JS da página,
   qualquer visitante leria no devtools, e a proteção que o Evandro criou para o
   webhook dele seria pública.
2. A chave **não entra no Git**: fica na variável de ambiente `HDM_CRM_API_KEY`,
   cadastrada no painel da Vercel.
3. **Some o CORS.** Mesma origem, sem preflight. Some junto toda uma classe de
   falha silenciosa que já custou horas nesse funil.

**Como cadastrar a chave** (uma vez, no painel da Vercel):
Project `quiz-evandro-fernandes` → Settings → Environment Variables →
nome `HDM_CRM_API_KEY`, valor = a chave que o Evandro passou, ambiente Production.
Depois é preciso **republicar** para a função pegar o valor novo.

**Conferir sem expor a chave:**
```bash
curl https://quiz-evandro-fernandes.vercel.app/api/lead
# {"chaveConfigurada":true,"tamanho":64,"temEspacoNasPontas":false,"digital":"a236dc3cb61e"}
```
Nenhum desses campos devolve o segredo. `digital` é o sha256 truncado: compare
com o esperado e você sabe que a chave está byte a byte certa.

**Por que a impressão digital importa:** enquanto a trava do HDM estiver
desligada, o endpoint aceita qualquer coisa, então **um POST 200 não prova que a
chave está certa**. Uma chave com um espaço colado junto passaria no teste e só
falharia quando ligassem a trava, com os leads sumindo em silêncio. `tamanho` e
`temEspacoNasPontas` pegam exatamente esse erro.

Enquanto `chaveConfigurada` for `false`, a função encaminha **sem** autenticação.
Por isso cadastrar a chave e o HDM religar a trava podem acontecer em momentos
diferentes, sem perder lead.

**Conferido em 16/08/2026:** tamanho 64, sem espaços, digital `a236dc3cb61e`,
igual ao valor que o Evandro enviou. Pode religar a trava.

## Estado da integração (13/08/2026, 19h40)
**Conectado.** O HDM desligou a trava do nó e o lead passou a cair no CRM dele.
Conferido por curl: `POST` sem auth volta 200 `{"message":"Workflow was started"}`.
Falta religar a autenticação (`X-Api-Key`, Header Auth) e corrigir o mapeamento
dos campos do lado deles. Ver `especificacao-webhook-leads.md`.

## Destino dos leads: só o CRM do cliente
Decisão de 13/08/2026: **sem backup em planilha**. O lead vai direto para o
webhook do HDM (`CRM_ENDPOINT` no `app.js`), sem passar por Make/Sheets, para não
gerar custo de operações.

- O cenário Make `[Evandro Fernandes] ... → Sheets` (id 5805664) está **inativo** e
  o `LEADS_ENDPOINT` está vazio. Nada consome operação.
- A planilha criada (`docs.google.com/spreadsheets/d/1A1xFuIldVeAM7S0HQfza4hj-GZRZxAqahlFRqoJc1Gk`)
  ficou sem uso. Pode ser apagada ou guardada para outro fim.
- **Consequência a vigiar:** enquanto a autenticação do webhook não for corrigida,
  o funil não tem destino nenhum para lead. Não subir tráfego antes disso.
- Para reativar o backup um dia: colar a URL do webhook em `LEADS_ENDPOINT` e
  reativar o cenário no Make.

## PENDÊNCIAS

**Bloqueia subir tráfego:**
- [ ] **Mapeamento dos campos no CRM do HDM.** O lead chega, mas o CRM lê o texto
      `"De R$ 300 mil a 1 milhão por mês"` como **R$ 3.001,00**, ignora o campo
      `qualificado` (o que serve para rotear) e descarta 4 das 7 respostas. Subir
      tráfego assim inverte a qualificação. Detalhe e o que pedir ao time deles em
      `especificacao-webhook-leads.md`.
- [ ] **HDM religar a trava como Header Auth**, não Basic (foi Basic que travou
      tudo na primeira tentativa). Do nosso lado já está tudo pronto e conferido.

**Melhora a entrega, não bloqueia:**
- [ ] **Logo oficial** em SVG/PNG para o topo da página (hoje wordmark "HDM" em
      texto). A paleta e o favicon já são os reais, tirados do site.
- [ ] **Aprovar com o Evandro as 4 citações** atribuídas a ele em `diagnostico.js`.
- [ ] **Prova visual real** (prints/vídeo) para além do case JusExpert.
- [ ] (Opcional) IDs de GA4 / Meta Pixel em `TRACKING_CONFIG` no `app.js`.

**Resolvido:** deploy público (200), identidade HDM, favicon oficial, WhatsApp
dos CTAs (`551151941273`, conta comercial DigiEnge), integridade conferida com
`curl`+`cmp`, tom formalizado para alto ticket.
