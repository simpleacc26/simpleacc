# Intake: o que perguntar antes de desenhar qualquer slide

Nunca gere um carrossel com marca inventada. Sem estes sete pontos fechados, o
carrossel sai bonito e inútil (não parece do cliente). Pergunte tudo de uma vez,
numa lista curta, e só então comece.

## As 7 perguntas

| # | O que | Por que precisa |
|---|-------|-----------------|
| 1 | **Nome da marca** | Aparece no lockup do slide 1 e do slide final. |
| 2 | **@ do Instagram** | Cabeçalho da moldura de preview e legenda do post. |
| 3 | **Cor principal (hex)** | É a semente dos 6 tokens. Se a pessoa descrever ("um verde escuro sério"), proponha um hex e confirme. |
| 4 | **Logo** | SVG/PNG com fundo transparente, inicial da marca, ou sem logo. Define se cabe marca d'água. |
| 5 | **Fontes** | Serifada no título + sans no corpo (editorial), tudo sans (moderno), ou par específico do Google Fonts. |
| 6 | **Tom** | Profissional, casual, provocativo, minimalista, acolhedor. Muda a copy, não só o visual. |
| 7 | **Imagens** | Foto de perfil, prints do produto, fotos do cliente. Pergunte sempre: print real é a prova mais forte do slide 1. |

Além disso, para escrever a copy: **tema do carrossel, público e a ação que o
post precisa gerar** (salvar, comentar, chamar no direct, clicar no link).

## Atalhos legítimos

- **Site ou brandbook**: se a pessoa mandar a URL ou os arquivos, extraia daí
  cor, tipografia e tom, e **mostre a paleta derivada para confirmar** antes de
  gerar. Uma pergunta de confirmação vale mais que sete de intake.
- **Cliente que já existe no repo**: leia `clientes/<cliente>/CLAUDE.md`,
  `contexto/` e `aprendizados.md` antes de perguntar qualquer coisa. Muita
  resposta já está salva (ICP, voz, ângulos que já rodaram, identidade do funil).
  Pergunte só o que faltar.
- **Cliente sem identidade fechada**: proponha paleta e par de fontes coerentes
  com o nicho (saúde e inclusão: quente e acolhedor; jurídico: sóbrio; fitness:
  energético) e siga depois do ok. Deixe tudo tokenizado para trocar fácil.

## Imagens: como embutir

Toda imagem entra **em base64, dentro do HTML**. O arquivo entregue tem que
abrir sozinho, sem pasta de assets do lado, e o navegador headless do export só
renderiza o que está embutido.

```bash
file foto.png                 # confira o formato REAL antes
base64 -w0 foto.png > foto.b64
```

`file` é obrigatório: é comum receber JPEG com extensão `.png`. MIME errado
(`data:image/png` num JPEG) some com a imagem no export sem dar erro nenhum.

```html
<img src="data:image/jpeg;base64,/9j/4AAQ..." alt="" style="width:100%;border-radius:12px;">
```

Prints de tela funcionam melhor cortados no essencial e com `border-radius:12px`
mais uma borda de 1px na cor da divisória do slide.

## Antes de escrever a copy

Confirme numa frase o que você entendeu: **tema, ângulo, público e CTA**. Se a
sessão for autônoma (sem ninguém para responder), assuma o mais provável,
**registre a premissa** na entrega e siga. Não trave.
