# Funil de Quiz · Lucas Sobreiro (clínicas / saúde)

Funil de diagnóstico (quiz → página de aplicação) para donos de clínica e
profissionais da saúde. Gera lead qualificado antes da Sessão Estratégica.

**Estrutura:** espelhada no funil validado da Pâmella Mello (o que vem tendo bom
resultado). **Copy e identidade:** do Lucas (estratégia aprovada em
`../../estrategia/2026-07-20-estrategia.md`; identidade navy + dourado).

## O que é

- **`index.html`** + `flow.js` + `app.js`: o quiz. Hero + 9 passos SPIN
  (situação, problema, tempo, impacto, o que tentou, objetivo, área,
  faturamento, prontidão) + captura (nome, WhatsApp, e-mail). Barra de
  progresso, auto-avanço, "continuar de onde parou", tela de loading (~5s).
- **`diagnostico.html`** + `diagnostico.js`: a página de aplicação. Monta o
  diagnóstico personalizado a partir das respostas (espelho do cenário →
  reframe do gargalo comercial → dois caminhos → método em 3 pilares → sessão
  estratégica → depoimentos → CTA). O CTA adapta por qualificação:
  - **Qualificado** (faturamento 30k+ e pronto para investir): "Quero agendar
    minha Sessão Estratégica".
  - **Nutrir** (faturamento até 30k ou só pesquisando): "Quero entender melhor
    o próximo passo" (caminho de menor compromisso / produto de entrada).
- **`depoimentos/`**: prints reais dos clientes do Lucas (baixados do Drive). O
  `01-paula-xavier-dentista` é o case-estrela da saúde.
- Toda a copy do quiz e do relatório vive em `flow.js` e `diagnostico.js`.

## Como rodar local

Servidor estático (não abra via `file://`, o sessionStorage entre páginas
funciona melhor por http). Ex.:

```
cd clientes/lucas-sobreiro/funis/funil-quiz-clinica
python3 -m http.server 8000
# abra http://localhost:8000
```

## Pendências antes de publicar (time)

1. **WhatsApp do Lucas** em `flow.js` (`marca.whatsapp`, formato internacional).
2. **Cenário do Make** (webhook instant → Google Sheets) e colar a URL em
   `app.js` (`LEADS_ENDPOINT`). Criar a planilha de leads no Drive do cliente.
   Testar o lead caindo na planilha ponta a ponta.
3. **Meta Pixel do Lucas**: descomentar o bloco no `<head>` do `index.html` e do
   `diagnostico.html` e preencher o ID (hoje está com placeholder).
4. **Deploy (Vercel):** projeto estático, framework "Other", Root Directory
   apontando para esta pasta. Documentar o link aqui.
5. (Opcional) Logo do Lucas: trocar o `.brand-name`/`.brand-tag` por
   `<img class="logo-img">` quando houver arquivo.

## Deploy

`vercel deploy --prod --yes` a partir desta pasta (ver DEPLOY.md do template da
skill `criar-funil-quiz` para detalhes de scope/SSO). Link de produção: _(a preencher)_

## Identidade

Navy `#14213D` + dourado `#B8863B` sobre azul-cinza claro. Paleta provisória de
marca (consistente com os PDFs de estratégia/roadmap do Lucas); ajustar ao
brand kit oficial quando existir.
