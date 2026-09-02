# Copies de Aquisição (PDF formatado)

Fonte do PDF `Copies_Aquisicao__Romulo_Heleno.pdf` (pasta acima).

**20 criativos escritos:** 5 estáticos, 5 carrosséis, 10 roteiros de vídeo.
Formato e estrutura espelhados do documento do **Delphis Fonseca (28/08)**:
capa navy, régua de linguagem em duas colunas, ângulos em cards, peças em
blocos com gancho, desenvolvimento, virada e CTA, mais as notas de produção.

## Como re-renderizar

```bash
node render.cjs   # gera o PDF a partir de copies-aquisicao.html
```

Requer Node com Playwright e as fontes `.woff2` desta pasta (mesmos subsets
estáticos de Playfair Display e Lora do documento de estratégia). O `render.cjs`
usa header e footer nativos do Chromium, margens Letter 64/56/56/56.

O `_style.html` é o bloco de estilo copiado do documento de estratégia, para as
duas peças ficarem idênticas. O `_corpo.html` é o conteúdo. O
`copies-aquisicao.html` é a junção dos dois, gerada por script: **edite o corpo,
nunca o arquivo final.**

## Regras que o conteúdo obedece

- Destino sempre o quiz, nunca a sessão e nunca a mentoria. **Nenhuma peça cita preço.**
- Curso não é categoria do produto: a palavra entra para ser derrubada.
- Não acusa quem lê. Descreve a cena e cita a frase que a pessoa mesma diz.
- **Nenhum número que ainda não foi confirmado.** Anos de cadeira, marcas e nº de
  treinados estão fora: só entra o que está documentado (ex-técnico de marca,
  2024 dentro de dezenas de salões, as fotos com autorização).
- Sem depoimento de aluno enquanto não houver autorização.
- Plural em "mechas", linguagem neutra em gênero, zero travessões.
