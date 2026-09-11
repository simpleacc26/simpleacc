# Relatório em PDF por pilar (entrega no WhatsApp via GHL)

O lead responde o quiz, o diagnóstico aponta **1 dos 4 pilares**, e o GHL deve
enviar no WhatsApp o PDF correspondente àquele pilar.

## Os 4 arquivos

| Pilar (código) | Nome que aparece pro lead | Arquivo |
| --- | --- | --- |
| `M` | Método               | `relatorio-metodo.pdf` |
| `N` | Modelo de negócio    | `relatorio-modelo-de-negocio.pdf` |
| `V` | Processo de vendas   | `relatorio-processo-de-vendas.pdf` |
| `T` | Mentalidade          | `relatorio-mentalidade.pdf` |

Conteúdo, textos, casos e identidade visual são os mesmos da página de relatório
que já roda hoje (`../2026-07-15-relatorio-B-web.html`). A diferença é que o PDF
é estático: **não tem o nome do lead**, porque é um arquivo só por pilar,
reaproveitado para todos os leads daquele balde.

## Como regerar

Editou o texto em `relatorio-pdf.html`? Rode:

```bash
node gerar-pdfs.mjs      # precisa do playwright + chromium
```

As fontes da marca (Fahkwang e Inter) estão embutidas em base64 em
`fontes-embed.css`, então o PDF renderiza igual em qualquer máquina, sem internet.

## O que falta pra isso chegar no WhatsApp

Ver `../../estrategia/2026-07-31-relatorio-no-whatsapp-diagnostico.md`.
Resumo: hoje o pilar do lead **não chega no GHL**, então a automação não tem
como escolher qual PDF enviar.
