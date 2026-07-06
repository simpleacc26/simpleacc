# Apostila / Workbook — order bump (Funil de Lead Dinâmico)

Material do order bump **"Apostila digital — lançamento pago"** (R$ 37 / R$ 39,90).
Copy de referência do checkout:

> Acesse os principais insights dos 2 dias de Workshop em um material prático, com
> resumos, checklists e referências para modelar. Um guia de implementação pra
> aproveitar o melhor da nossa estratégia.

## Status: casca pronta, conteúdo pendente

- ✅ **Casca visual** na identidade Simple: `apostila.html` (mesma paleta/tipografia
  do brandbook — navy/azul, Inter).
- ⛔ **Conteúdo do método:** depende da **gravação do workshop** ("minha gravação
  do workshop para o leandro" — HANDOFF). **Não invento conteúdo do método.**
  Assim que o Daniel mandar a gravação/transcrição, eu preencho as seções.

## Esqueleto proposto (a preencher com a gravação)
1. Capa + o novo jogo do high ticket (contexto)
2. O mecanismo: Funil de Lead Dinâmico (como o lead se qualifica sozinho)
3. Passo a passo do quiz-diagnóstico (perguntas e roteamento)
4. Tráfego pro público frio (estrutura de campanha, criativos roteirizados)
5. Da aplicação à call: filtro 🟢🟡🔴 e agenda
6. Métricas que importam (MQL R$80, CAC, ROAS 8x) + checklist de implementação
7. Modelos/templates para modelar (páginas, mensagens, aplicação)

## Como gerar o PDF (quando o conteúdo estiver no HTML)
```bash
# na pasta apostila/
/opt/pw-browsers/chromium --headless --no-sandbox --print-to-pdf=apostila.pdf \
  --no-pdf-header-footer "file://$PWD/apostila.html"
```

> Dica: dá pra usar a skill `/prompt-mestre` ou gerar a partir da transcrição da
> gravação assim que o Daniel disponibilizar.
