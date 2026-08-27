# Prova social no relatório: vídeo e print

O relatório pós-quiz é onde a prova social trabalha, porque a pessoa acabou de
receber um diagnóstico e está decidindo se fala com o cliente.

**Use vídeo E print.** Nem todo mundo aperta play, então a prova precisa existir
também num formato que se lê de relance.

---

## Vídeo

### Compressão
Original de WhatsApp vem com dezenas de MB. Comprima para 540p, CRF 31, áudio
AAC 56k mono, com `faststart` para começar a tocar antes de baixar tudo. Três
vídeos de 1min30 cabem em 5 MB somados.

### `preload="none"` é obrigatório
```html
<video src="..." poster="..." controls playsinline preload="none"></video>
```
Sem isso, o relatório abre puxando megabytes de quem não vai assistir.

### Pôster nunca no primeiro quadro
Vídeo de celular quase sempre começa com a pessoa de olho fechado ou virando o
rosto. **Escolha um quadro do meio**, com o rosto aberto.

### Marca d'água do CapCut
Vídeo editado no CapCut costuma vir com **cerca de 8 segundos de marca d'água no
fim**. Confira o fim de todo vídeo que o cliente manda, e corte.

Para achar o corte, varra o brilho médio dos últimos segundos: a marca d'água é
uma tela preta, e o brilho despenca no quadro exato.

### Layout com três vídeos verticais
Faixa flex com scroll horizontal: no desktop os três cabem lado a lado sem
rolagem; no celular cada um ocupa ~64% e vira carrossel com snap, então o
próximo aparece cortado na borda e a pessoa entende que arrasta.

---

## Print

**Suba o print original, não transcreva.** Print de conversa converte mais porque
é verificável: a pessoa reconhece a interface do WhatsApp.

Duas regras ao subir um:

1. **Corte terceiros que aparecem no enquadramento.** Print de grupo pega nomes
   de gente que não tem relação com o depoimento e não autorizou nada.
2. **Transcreva o conteúdo no `alt`**, para leitor de tela e para quando a
   imagem não carrega.

Cada print **abre em tamanho real ao tocar** (`<a href>` na imagem), porque no
celular print largo encolhe e fica ilegível.

Prints de proporções diferentes desalinham as legendas. Iguale a caixa com
`aspect-ratio` e `object-fit: contain`, **nunca `cover`**: print cortado é print
ilegível.

---

## A régua de valor em reais

**Default: não sobe depoimento com valor em reais.** Dois motivos:

1. Vários clientes têm regra própria de não prometer resultado financeiro.
2. **A Meta lê a página de destino do anúncio.** Alegação de ganho é motivo
   clássico de reprovação de anúncio e de restrição de conta.

**Esse default pode ser derrubado pelo cliente**, e já foi. Quando for:

- **Registre a decisão em três lugares**: no `aprendizados.md` do cliente, no
  README do funil e num comentário no código, dizendo que foi decisão do cliente
  e em que data. Sem isso, alguém "conserta" isso seis meses depois achando que
  passou batido.
- **Avise o gestor de tráfego.** Ele precisa saber antes de subir a campanha,
  não depois da reprovação.

### Letreiro queimado no vídeo não tem conserto por filtro

Tentamos `delogo` para apagar um "47k em Mentoria" queimado. **Não funciona**
quando o texto cai sobre pessoa ou textura: o filtro só interpola a partir das
bordas da caixa e sobra um borrão pior que o problema. Sobre fundo liso dá para
tentar.

**Pedir reexport ao cliente sai mais barato que tentar limpar.**

---

## Duas checagens que NÃO são suas

Viram **pendência nomeada** no README até alguém confirmar:

1. **Assistir os vídeos inteiros, com áudio.** Você consegue ler quadros ao longo
   da duração, mas não consegue ouvir. Pode ter valor em reais falado.
2. **Autorização de quem aparece** no vídeo ou no print, para uso em página
   pública.

Nunca marque como resolvido por conta própria. Peça, e registre quem confirmou
e quando.
