# modelo-lp — LP de aula ao vivo (referência)

Cópia fiel e autocontida da LP <https://marianagarrett.com.br/paciente-que-some/>
(agosto/2026), extraída do HTML publicado e desmontada em três arquivos:

| Arquivo | O que é |
| --- | --- |
| `index.html` | as 21 peças da estrutura, na ordem, com a copy original |
| `styles.css` | toda a identidade visual. Os 12 tokens de reskin ficam no `:root` |
| `app.js` | os 3 únicos comportamentos: contador, player de depoimento sob clique, reveal no scroll |

## ⚠️ Não publique este arquivo como está

É material de referência. A copy, as imagens, os vídeos e o checkout são da
Mariana Garrett. Para usar em outro cliente:

1. Leia `../../references/estrutura-invisivel-lp.md` inteiro.
2. Copie a pasta para `clientes/<cliente>/funis/<projeto>/`.
3. Troque os 12 tokens do `:root` em `styles.css`.
4. Reescreva **100%** da copy.
5. Troque a data-alvo do contador em `app.js` (com fuso explícito).
6. Troque o `href` dos 4 CTAs + sticky e o seletor de propagação de UTM.
7. Troque todas as imagens e os GUIDs dos vídeos.
8. Confira o resíduo:

```bash
grep -riE "paciente|clínica|cadeira|Mariana|marianagarrett|F107221464F|2026-09-08" .
# tem que voltar vazio
```

## Rodar localmente

```bash
python3 -m http.server 8000   # e abra http://localhost:8000
```

As imagens apontam para o domínio da Mariana e para o CDN de vídeo dela, então
carregam só com internet. Isso é proposital: o modelo existe para ser visto
inteiro, do jeito que está no ar.
