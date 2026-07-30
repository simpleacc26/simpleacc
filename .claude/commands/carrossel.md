---
description: Cria um carrossel de Instagram 4:5 (preview em HTML + slides exportados em PNG 1080x1350)
---

Use a skill `carrossel-instagram` deste repositório e siga o fluxo dela na
ordem, sem pular etapas: intake da marca, sistema visual, roteiro em texto
aprovado antes do código, build a partir do template, revisão slide a slide e
exportação dos PNGs.

Tema e contexto do operador (cliente, tema, objetivo do post, tom), se houver: $ARGUMENTS

Regras que valem sempre nesta tarefa:

- **Pergunte os dados de marca antes de desenhar** (nome, @, cor primária,
  logo, fontes, tom, imagens). Não invente identidade visual.
- Se a tarefa for de um cliente do repo, leia antes `clientes/<cliente>/CLAUDE.md`,
  `contexto/` e `aprendizados.md`, e chegue nas perguntas já sabendo o que a
  Simple sabe sobre ele. Se o cliente já tem funil publicado, reaproveite a
  paleta e as fontes de lá.
- **Mostre o roteiro dos slides em texto e espere aprovação** antes de gerar o HTML.
- **Zero travessões** na copy dos slides e da legenda.
- Salve a entrega em
  `clientes/<cliente>/copy/carrosseis/<AAAA-MM-DD>-<tema-em-slug>/`
  (`carrossel.html` + a pasta `slides/`), e registre o aprendizado em
  `clientes/<cliente>/aprendizados.md` no fim.
