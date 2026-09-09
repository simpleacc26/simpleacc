# Identidade visual do cliente

**Use a marca REAL do cliente, não uma paleta genérica inventada.** Puxe as cores
e o tom do **Instagram / brandbook** do cliente (peça os HEX ou o arquivo). Uma
paleta de exemplo/placeholder serve **só até o brandbook chegar**; assim que vier
o material real, troque. Cor inventada dá cara de template.

A identidade é **100% tokenizada** no `:root` do `styles.css` (bloco marcado
"PALETA, TROQUE AQUI"). Trocar a marca = trocar os HEX e o logo. Nada de cor
hardcoded fora do `:root`.

> **Vars que o relatório usa** (mantenha esses nomes ao trocar a paleta):
> `--primary`, `--primary-700` e `--accent-soft`. O `diagnostico.html` referencia
> essas três diretamente (títulos das etapas, destaques e blocos de realce).

## Passos
1. **Cores**: substitua os tokens pela paleta do cliente (peça os hex ou o
   brandbook). Tokens usados: `--bg`, `--surface`, `--text`, `--muted`,
   cor principal/realce, `--action` (botão), `--border`, `--err`.
   - **Acessibilidade**: o botão (`--action`) precisa de contraste AA com o texto
     (≥ 4.5:1). Cor de marca clara (ex.: dourado) funciona como **realce**
     (bordas, seleção, progresso), mas o botão deve ser uma versão escura o
     suficiente. Ex.: marca dourada → botão em bronze escuro.
2. **Logo**: troque o slot/wordmark por `<img class="logo-img" src="logo.png" alt="...">`.
   Peça PNG (fundo transparente) ou SVG. Foto/mockup não serve, use wordmark
   provisório até o arquivo chegar.
3. **Fontes**: por padrão, **stack de sistema** (sem dependência externa). Para
   um ar premium/elegante, use uma stack serifada de sistema nos títulos
   (ex.: `"Iowan Old Style", Palatino, Georgia, serif`) e sans no corpo. Não
   importe Google Fonts (regra de performance).
4. **Tom**: respeite o tom pedido (acolhedor, premium, direto…) em espaçamento,
   raio de borda e microcopy.

## Exemplo de paleta (placeholder até o brandbook, dourado/marfim)
Use como referência de COMO uma paleta fica bem, **não como cor padrão**. Enquanto
não vier a marca real, um exemplo de tokens (a cor principal mapeia em `--primary`
/ `--primary-700`, e o realce claro em `--accent-soft`):
```
--bg #F4EDDF ; --surface #FFFDF8 ; --text #3B3026 ; --muted #8A7A66 ;
--primary #B68A3E ; --primary-700 #8C6A2C ; --accent-soft #F3E7CE ;
--action #6E5430 ; --action-700 #574125 ; --border #E6D8BF ; --err #B4452B ;
títulos: serifada de sistema ; botão: bronze escuro (contraste AA) ;
logo: wordmark + tagline espaçada (até ter o arquivo do logo).
```

## Se o cliente não tiver identidade
Ofereça propor uma paleta + tom coerentes com o nicho (ex.: saúde/inclusão →
quente e acolhedor; jurídico → sóbrio; fitness → energético) e siga após o ok.
Mantenha tudo tokenizado para trocar fácil depois.
