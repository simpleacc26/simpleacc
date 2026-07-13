# Lançamento: Workshop Funil de Lead Dinâmico (14/07)

Estrutura de captação e comunicação do lançamento pago do **Workshop Funil de
Lead Dinâmico** (evento **terça, 14/07, 14h-17h**, ao vivo e online).

**A corrente que a gente blinda:** anúncio → compra do ingresso → entra no grupo →
régua aquece → comparece ao vivo → aplica → aparece na call → fecha mentoria (R$20k).
Cada elo que arrebenta derruba os seguintes. Comparecimento no grupo governa
comparecimento no evento, que governa aplicação, que governa caixa.

- **Responsável (PM):** Carlos Durães · `carlos.duraes@simpleacc.com.br`
- **Estratégia/copy final:** Daniel Souza
- **Tráfego / criativos:** Renan
- **Prazo da estrutura no ar:** 12h (captação abre 07/07)

## O que é cada arquivo

| Arquivo | O quê |
| --- | --- |
| `checkout-ofertas.md` | Bloco 1, checkout + order bumps + área de membros (Kiwify) |
| `torre-de-controle.md` | Planilha-cockpit (modelo Rapha, 5 abas): toda a régua datada |
| `torre/*.csv` | 1 CSV por aba (SOS Links · Grupos · Troca de Nome · API · URA/SMS) pra colar na cópia da planilha |
| `comunicacao.md` | Régua do grupo + disparo base (~2k) + URA/SMS, datados, com rascunho de copy |
| `sequencia-copys-grupo.md` | Sequência completa de copys do grupo (D-7 → D+7), modelo Tarso adaptado |
| `pesquisa.md` | Formulário de pesquisa (4 perguntas), segmenta o lead |
| `aplicacao.md` | Formulário de aplicação (10 perguntas + lógica 🟢🟡🔴) |
| `automacao-make.md` | Blueprint da automação Make (webhook Kiwify → grupo + pesquisa + tag) |
| `criativos/banner-checkout.html` / `.png` | Banner do topo do checkout (marca Simple) |
| `apostila/` | Workbook (order bump), casca na marca + esqueleto |

## Ferramentas

- **Checkout + área de membros:** Kiwify (tudo num lugar só)
- **Automação:** Make (webhook Kiwify → WhatsApp)
- **Pesquisa + Aplicação:** Typeform ou Google Forms (o que subir mais rápido)
- **Cockpit:** Google Sheets (Torre de Controle)
- **Agendamento da call:** Calendly / agenda do SDR

## Materiais de referência (modelar, não copiar)

- Torre de Controle modelo (Tarso): `https://docs.google.com/spreadsheets/d/1hSnQckIm7Aml8eNMOv_WXJaV6Hay3w0OkO5BMpkUz40/edit?gid=450551978`
- Doc de mensagens (Tarso, OneDrive): `https://onedrive.live.com/:w:/g/personal/9fd233285803cf2b/IQDWNckRMaZYR6OgyDev0sN4AaAqpmE47tgBpyK8RaqLfsk`
- Checkout/bump referência (Luiz): `https://lps.luizfilho.com/v3`
- Brandbook Simple: `../marca/brandbook.html`
- **Torre de Controle (Sheet, no ar):** `https://docs.google.com/spreadsheets/d/1nqxcwMP24aYLz-FSUReSXIleKbq-6q_A9QZ_OsLogto/edit`
- Cockpit-referência (modelo Autoconhecimento): `https://docs.google.com/spreadsheets/d/1JlzK4piSOyyy57-pWtKKOrnNfq8uSZ5YPMVMWTJ6AHE/edit`

### Entregas no Drive
- **Doc. Sequência de copys do grupo:** `https://docs.google.com/document/d/1CEOWsVLZyxoNkNBY1-9rANNMlGAIBwv9F_vNKq0KlII/edit`
- **Form. Pesquisa (vazio, colar perguntas):** `https://docs.google.com/forms/d/1MDvIggqA-IxM_JFm7k15F_O169XKreoGrifr9uFsNKk/edit`
- **Torre v2 (Sheet):** `https://docs.google.com/spreadsheets/d/1nqxcwMP24aYLz-FSUReSXIleKbq-6q_A9QZ_OsLogto/edit`

## Ordem de execução (o que trava o quê)

1. **Trava venda** → Checkout + ofertas (Kiwify) + automação de grupo (Make)
2. **Trava comparecimento** → Régua do grupo + URA/SMS + disparo base
3. **Trava a call** → Pesquisa + Aplicação + agendamento

## Status

- [x] Estrutura de arquivos + kit de execução (este repo)
- [x] Banner do checkout (marca Simple). `criativos/banner-checkout.png`
- [x] Spec do checkout + ofertas + área de membros
- [x] Torre de Controle (cadência datada)
- [x] Régua de comunicação (grupo + base + URA/SMS), rascunho de copy
- [x] Pesquisa (4 perguntas) + Aplicação (10 perguntas + lógica)
- [x] **Automação Make CRIADA**, webhook (id 2542253) + cenário boas-vindas (id 5584763, **inativo**), Z-API + copy adaptada. Ver `automacao-make.md`.
- [ ] **Conta Kiwify** (`carlos.duraes@simpleacc.com.br`) + acesso liberado pelo Daniel *(mão do Carlos/Daniel)*
- [ ] Checkout + bumps montados na Kiwify *(mão do Carlos)*
- [ ] Grupo de WhatsApp novo + link *(mão do Carlos)*
- [ ] **Ativar automação:** ligar webhook na Kiwify, compra-teste, mapear telefone, colar 2 links, ativar cenário *(mão do Carlos. 5 passos em `automacao-make.md`)*
- [ ] Forms no ar (Typeform/Forms) *(mão do Carlos)*
- [ ] **Apostila:** conteúdo do método (gravação do workshop) *(pendência com Daniel)*
- [ ] Copy final de cada peça *(Daniel)*

## Pendências que dependem de terceiros

- **Gravação do workshop** (p/ conteúdo da apostila). Daniel.
- **Copy final** das mensagens e dos blocos do checkout. Daniel.
- **Cases com print** p/ prova social. Daniel (brandbook aponta como pendência).
