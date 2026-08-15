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
- `config.example.js` · modelo da config (versionado, sem chave)
- `config.local.js` · a chave real do webhook. **No `.gitignore`, nunca commitar.**
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

## A chave do webhook (`X-Api-Key`)
A chave **não entra no Git** (regra do manual). Ela vive no `config.local.js`,
que está no `.gitignore`. O par versionado é o `config.example.js`.

```
cp config.example.js config.local.js   # e cole a chave real dentro
```

O `index.html` carrega o `config.local.js` **antes** do `app.js` (ambos com
`defer`, que preserva a ordem). O `app.js` lê `window.HDM_CONFIG.crmApiKey`; se o
arquivo não existir, manda o lead **sem** o header e avisa no console. Testado em
navegador de verdade nos dois caminhos: com o arquivo a chave de 64 caracteres
chega ao motor; sem ele o quiz continua renderizando normalmente.

⚠️ **Ao publicar:** o `deploy_to_vercel` substitui o snapshot inteiro, então o
`config.local.js` precisa ir junto em toda publicação, senão a chave some do ar
em silêncio. Para recuperá-la depois:
`curl https://quiz-evandro-fernandes.vercel.app/config.local.js`

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
- [ ] **Religar a trava `X-Api-Key` junto com a nossa chave.** O HDM vai reativar
      a autenticação (tem que ser **Header Auth**, não Basic). No mesmo momento
      precisamos preencher a `CRM_API_KEY` e republicar: se só um lado virar, o
      funil volta a levar 403 e o lead para de chegar.
- [ ] **Onde guardar a `CRM_API_KEY`.** Decidir entre commitar no `app.js` (fica
      visível no navegador, que é o desenho de CORS que o HDM montou) ou um proxy
      serverless com env var.

**Melhora a entrega, não bloqueia:**
- [ ] **Logo oficial** em SVG/PNG para o topo da página (hoje wordmark "HDM" em
      texto). A paleta e o favicon já são os reais, tirados do site.
- [ ] **Aprovar com o Evandro as 4 citações** atribuídas a ele em `diagnostico.js`.
- [ ] **Prova visual real** (prints/vídeo) para além do case JusExpert.
- [ ] (Opcional) IDs de GA4 / Meta Pixel em `TRACKING_CONFIG` no `app.js`.

**Resolvido:** deploy público (200), identidade HDM, favicon oficial, WhatsApp
dos CTAs (`551151941273`, conta comercial DigiEnge), integridade conferida com
`curl`+`cmp`, tom formalizado para alto ticket.
