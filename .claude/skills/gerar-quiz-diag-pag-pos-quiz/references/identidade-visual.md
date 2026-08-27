# Identidade visual do cliente

A identidade é **100% tokenizada** no `:root` do `styles.css` (bloco marcado
"PALETA — TROQUE AQUI"). Trocar a marca = trocar os HEX e o logo. Nada de cor
hardcoded fora do `:root`.

## Passos
1. **Cores**: substitua os tokens pela paleta do cliente (peça os hex ou o
   brandbook). Tokens usados: `--bg`, `--surface`, `--text`, `--muted`,
   cor principal/realce, `--action` (botão), `--border`, `--err`.
   - **Acessibilidade**: o botão (`--action`) precisa de contraste AA com o texto
     (≥ 4.5:1). Cor de marca clara (ex.: dourado) funciona como **realce**
     (bordas, seleção, progresso), mas o botão deve ser uma versão escura o
     suficiente. Ex.: marca dourada → botão em bronze escuro.
2. **Logo**: troque o slot/wordmark por `<img class="logo-img" src="logo.png" alt="...">`.
   Peça PNG (fundo transparente) ou SVG. Foto/mockup não serve — use wordmark
   provisório até o arquivo chegar.
3. **Fontes**: por padrão, **stack de sistema** (sem dependência externa). Para
   um ar premium/elegante, use uma stack serifada de sistema nos títulos
   (ex.: `"Iowan Old Style", Palatino, Georgia, serif`) e sans no corpo. Não
   importe Google Fonts (regra de performance).
4. **Tom**: respeite o tom pedido (acolhedor, premium, direto…) em espaçamento,
   raio de borda e microcopy.

## Exemplo aprovado (cliente Sabrina — odontologia humanizada, dourado/marfim)
Use como referência de COMO ficou bom, não como cor padrão. Tokens:
```
--bg #F4EDDF ; --surface #FFFDF8 ; --text #3B3026 ; --muted #8A7A66 ;
--gold #B68A3E ; --gold-light #D8B566 ; --gold-deep #8C6A2C ; --gold-soft #F3E7CE ;
--action #6E5430 ; --action-700 #574125 ; --border #E6D8BF ; --err #B4452B ;
títulos: serifada de sistema ; botão: bronze escuro (contraste AA) ;
logo: wordmark dourado + tagline espaçada (até ter o arquivo do logo).
```

## Se o cliente não tiver identidade
Ofereça propor uma paleta + tom coerentes com o nicho (ex.: saúde/inclusão →
quente e acolhedor; jurídico → sóbrio; fitness → energético) e siga após o ok.
Mantenha tudo tokenizado para trocar fácil depois.

## Manual de marca oficial vence inferência

Enquanto o cliente não manda o manual, **infira a paleta das artes que ele já
publicou e marque como provisório** no README do funil. Quando o manual chegar,
**refaça**.

Na Luana, a paleta inferida das artes da conferência dela estava perto no
espírito e **errada nos valores**. Só o manual oficial corrigiu.

Se a fonte do manual for paga, escolha uma substituta próxima e deixe escrito
qual é a original e por que foi trocada.

## Logo

Peça o pacote em **SVG ou PNG transparente**. Extrair do PDF do manual funciona
como quebra-galho, mas fica registrado como pendência.

## Fontes não bloqueiam a renderização

Ver `bugs-que-ja-quebraram.md`, item 4.
