# Dashboard Financeiro — Innova / Simple Acc

Painel da saúde financeira da empresa em um único lugar: **caixa, indicadores,
DRE, folha de pagamento, inadimplência e alertas**. Página estática (HTML/JS),
na identidade da marca, **protegida por senha** e **atualizada automaticamente
1×/dia** a partir da planilha de DFC/DRE.

> Uso interno e confidencial. Pauta fixa da *Week de Gestão* (segundas).

## Segurança dos dados

Os números financeiros (com salários e nomes) **nunca trafegam em claro**:

- O `dados.json` (plaintext) **não** vai para o Git — é ignorado pelo `.gitignore`.
- O que é versionado e publicado é o **`dados.enc`**, cifrado em **AES-256-GCM**
  com chave derivada da senha via **PBKDF2-SHA256 (600k iterações)**.
- A página pede a senha e **descriptografa no navegador** (Web Crypto). Quem não
  tiver a senha vê apenas texto cifrado, mesmo baixando o arquivo direto.

A senha fica guardada como secret no GitHub (`DASHBOARD_PASSWORD`) e é usada na
cifragem diária. **Para trocar a senha:** rode `DASHBOARD_PASSWORD=novaSenha node
scripts/encrypt.js`, atualize o secret e publique.

## O que mostra

| Bloco | Conteúdo |
| --- | --- |
| **Indicadores** | Receita recebida, despesa paga, lucro realizado, margem (acumulado + mês, com variação vs. mês anterior). |
| **Caixa** | Entradas/saídas realizadas e previstas, saldo atual e saldo projetado. |
| **DRE Mensal** | Receita, despesas por categoria, lucro operacional e margem, mês a mês. |
| **Despesas por categoria** | Para onde o dinheiro saiu (pago, acumulado). |
| **Folha de pagamento** | Colaboradores (categoria *Pessoas*), pago acumulado, último pagamento, a pagar. |
| **Inadimplência** | Valor em aberto, em atraso, taxa e lista de cobranças (recebíveis com status *Previsto*). |
| **Alertas** | Vencimentos a pagar/receber nos próximos 15 dias. |
| **Movimentações** | Últimas 15 entradas e saídas. |

## Como rodar localmente

```bash
cd clientes/0-interno-simpleacc-inova/dashboard-financeiro
python3 -m http.server 8000
# abra http://localhost:8000 e informe a senha
```

A página lê o `dados.enc`. Os gráficos usam Chart.js via CDN (precisa de internet).

## Dados

Fonte: planilha **“DFC e DRE Financeiro Simple Acc - 2026.xlsm”** (Google Drive,
aba `Lancamentos` como fonte da verdade). O `dados.json`/`dados.enc` são
**derivados** — não edite à mão; edite a planilha.

Regenerar a partir de um arquivo local:

```bash
python3 scripts/extract.py /caminho/para/planilha.xlsm   # -> dados.json
DASHBOARD_PASSWORD=simpleacc26 node scripts/encrypt.js    # -> dados.enc
```

### Lançamentos previstos (inadimplência / contas a pagar / alertas)

Hoje todos os lançamentos estão como `Recebido`/`Pago`, então esses blocos
aparecem zerados — a estrutura já está pronta. Para ativá-los, lance na planilha
recebíveis/contas com **Status = `Previsto`** e a **Data** do vencimento:

- Receita + `Previsto` → *Entradas previstas*, *Inadimplência* (atraso se a data
  já passou) e *Alertas*.
- Despesa + `Previsto` → *Saídas previstas*, *Folha (a pagar)* e *Alertas*.

## Atualização diária (integração)

Roda no **GitHub Actions** (`.github/workflows/atualiza-dashboard-financeiro.yml`),
todo dia às **05:00 BRT**:

1. baixa a planilha do Drive (`scripts/sync.py`);
2. regenera `dados.json` (`scripts/extract.py`);
3. cifra em `dados.enc` (`scripts/encrypt.js`);
4. commita se mudou → a **Vercel redeploya sozinha**.

Também dá para disparar manualmente em *Actions → Atualiza Dashboard Financeiro
→ Run workflow*.

### Setup necessário (uma vez)

1. **Planilha acessível ao robô.** Modo rápido (atual): deixe a planilha como
   *“Qualquer pessoa com o link → Leitor”*. O job baixa por link, sem credencial.
   *(Modo privado alternativo: criar uma conta de serviço Google e definir o
   secret `GOOGLE_SERVICE_ACCOUNT_JSON`; aí a planilha pode seguir privada.)*
2. **Secret `DASHBOARD_PASSWORD`** no repositório (*Settings → Secrets →
   Actions*) — a senha do dashboard, usada para cifrar os dados.
3. *(Opcional)* `DRIVE_FILE_ID` — id da planilha; se omitido usa o atual
   (`1nJa5mKqcGDIdZCzzpb3Vf94DbzKl5frZ`).

## Deploy (Vercel)

Site estático; *root directory* = esta pasta. Projeto Vercel:
**`dashboard-financeiro-innova`** (time *Simpleacc*).

```bash
cd clientes/0-interno-simpleacc-inova/dashboard-financeiro
vercel --prod --scope simpleacc
```

Para o job diário redeployar sozinho, conecte o repositório na Vercel (*Root
Directory* = esta pasta); cada commit no `dados.enc` dispara um novo deploy.

## Estrutura

```
dashboard-financeiro/
├── index.html      # dashboard + tela de senha (autocontido)
├── dados.enc       # dados CIFRADOS (gerado; versionado)
├── dados.json      # dados em claro (gerado; NUNCA versionado)
├── vercel.json     # config de deploy
└── scripts/
    ├── extract.py        # planilha .xlsm -> dados.json
    ├── sync.py           # baixa do Drive + extract (job diário)
    ├── encrypt.js        # dados.json -> dados.enc (cifra)
    └── requirements.txt
```

## Contatos

- Líder do projeto: **Carlos** · Execução: **Clara** · Sponsor: CEO.
