---
name: leitura-pdf-whatsapp
description: >-
  Gera o PDF da leitura emocional / diagnóstico GENÉRICO (sem personalização de
  nome, o mesmo para todos os leads) que o SDR envia no WhatsApp, a partir da
  leitura que sai depois do quiz do cliente. É uma página única contínua
  formatada para leitura no celular, na identidade visual do cliente, com botões
  de CTA clicáveis (links wa.me que já abrem a conversa com mensagem pronta pra
  agendar) e os depoimentos reais embutidos. Use sempre que alguém pedir "o PDF
  da leitura pro SDR mandar no zap", "versão genérica do diagnóstico em PDF",
  "leitura emocional em PDF sem nome", "material do pós-quiz pra enviar no
  WhatsApp", ou quando um funil de quiz precisar de uma peça de leitura/diagnóstico
  para envio manual pelo time comercial. Modelo validado no cliente Pâmella Mello.
---

# Leitura emocional em PDF (pro SDR enviar no WhatsApp)

## O que esta skill faz

Produz o **PDF da leitura emocional genérica** de um cliente: a mesma leitura que
sai depois do quiz do funil, só que **sem personalização de nome** (serve igual
para todos os leads) e formatada para o time comercial enviar manualmente no
WhatsApp.

Ela é o "irmão estático" da página de diagnóstico do funil. Onde o funil
personaliza com as respostas do lead, aqui a copy é reescrita numa linguagem que
serve para qualquer lead ("se você sente...", "muitas pessoas...").

## As particularidades que fazem essa peça funcionar (não perca nenhuma)

Isso aqui é o coração da skill. Foram todas validadas com a cliente:

1. **Página única contínua.** Nada de A4 paginado. O PDF é UMA página só, tão
   alta quanto o conteúdo, que rola no celular como um app. Isso mata os espaços
   em branco que a paginação deixa. O gerador (`assets/gerar-pdf-leitura.mjs`)
   mede a altura real e cria uma página desse tamanho.
2. **Largura de celular (~400px).** Faz o texto sair grande quando o leitor de
   PDF do celular ajusta à largura. Fonte base ~16.5px.
3. **Margens laterais folgadas** (padding ~30px). Texto não encosta na borda.
4. **Abertura com saudação** ("Olá! Que bom que você chegou até aqui 💛"). Calor
   humano antes de qualquer conteúdo.
5. **Botões de CTA clicáveis (wa.me).** 3 botões distribuídos pela leitura. Cada
   botão é um link `https://wa.me/<numero>?text=<mensagem pronta>`. O lead toca e
   já cai na conversa do WhatsApp com a mensagem de agendamento escrita. O
   gerador monta esses links a partir do atributo `data-wa` de cada botão.
6. **SEM `box-shadow`.** Alguns leitores de PDF no celular rasterizam sombra como
   um retângulo cinza feio em volta do botão. O modelo já vem sem sombra. Não
   adicione.
7. **Depoimentos reais embutidos.** As imagens de depoimento entram como
   `data:` URI (o gerador faz isso), pra o PDF ficar self-contained.
8. **Sem nome do lead.** É a mesma peça pra todos. Nunca use `{nome}` nem
   campos personalizados.
9. **Zero travessões (traço longo).** Padrão da SimpleAcc.

## O fluxo (siga nesta ordem)

```
1. CONTEXTO      → ler a pasta do cliente + a leitura do funil (diagnostico.js)
2. PERSONALIZAR  → preencher {{placeholders}} do modelo + adaptar a copy ao nicho
3. VALIDAR       → sem {{ sobrando, sem travessão, sem box-shadow
4. GERAR PDF     → node assets/gerar-pdf-leitura.mjs (página única + wa.me + imgs)
5. ENTREGAR      → enviar o PDF + salvar HTML/PDF em materiais/ + commit/PR
```

### Passo 1 — Contexto do cliente

Na pasta `clientes/<cliente>/`, leia: `README.md`, `aprendizados.md`, e sobretudo
o funil (`<pasta-do-funil>/diagnostico.js` e `flow.js`). Você precisa sair
sabendo:

- **Marca e tagline** (ex.: "Pâmella Mello" / "Hipnoterapia & Neurociência").
- **Identidade visual** (paleta). Puxe as cores do `styles.css` do funil.
- **A dor e o método do nicho**: qual é o problema central, por que as tentativas
  anteriores falham, como o método do cliente resolve. Copie o espírito da
  leitura do `diagnostico.js`, sem os campos personalizados.
- **Número de WhatsApp** do canal que atende os leads (só dígitos, com DDI 55).
  Confirme com a pessoa se o número do funil é o mesmo que o SDR usa.
- **Depoimentos**: as imagens já usadas no funil (`<funil>/depoimentos/*.jpeg`).

Se faltar algo, pergunte. Se estiver autônomo, assuma o mais provável e sinalize
a premissa na entrega. Não trave.

### Passo 2 — Personalização

Copie `assets/modelo-leitura-emocional.html` para
`clientes/<cliente>/materiais/leitura-emocional-generica.html` e ajuste:

- **Placeholders `{{...}}`** (mapa completo em `references/personalizacao.md`):
  `{{MARCA}}`, `{{TAGLINE}}`, `{{SELO}}`, `{{TITULO}}`, `{{SUBTITULO}}`.
- **Paleta** no `:root` (comentários indicam o que é a cor da marca). Puxe do
  `styles.css` do funil pra ficar idêntico.
- **Copy das seções** adaptada ao nicho do cliente (a estrutura fica; as palavras
  falam a língua do problema dele). Mantenha o tom acolhedor e honesto.
- **Botões**: em cada `<a class="btn" data-wa="...">`, ajuste o texto do botão e a
  mensagem pronta do `data-wa` (o gerador transforma em link wa.me). Não coloque
  número na mão; ele entra pelo gerador.
- **Depoimentos**: no bloco marcado, aponte os `<img src="...">` para as imagens
  reais do funil do cliente (caminho relativo à pasta `materiais/`, ex.:
  `../<pasta-do-funil>/depoimentos/01.jpeg`).

Regras inegociáveis: **nenhum `{{` sobrando**, **zero travessões**, **nenhum
`box-shadow`**, **nenhum `{nome}`/campo personalizado**.

### Passo 3 — Validação (antes de gerar)

```bash
A=clientes/<cliente>/materiais/leitura-emocional-generica.html
grep -c '{{' "$A"          # placeholders esquecidos  -> tem que dar 0
grep -c '—' "$A"           # travessões               -> tem que dar 0
grep -c 'box-shadow *:' "$A"  # sombra (some no mobile) -> tem que dar 0
grep -c 'data-wa' "$A"     # botões de CTA             -> tem que dar >= 1
```

### Passo 4 — Gerar o PDF

O gerador faz três coisas que o `--print-to-pdf` sozinho não faz: **página única**
(mede a altura do conteúdo), **links wa.me** (a partir de `data-wa` + o número) e
**embute as imagens**. É Node puro + o Chromium do ambiente (sem dependência npm).

```bash
SRC=clientes/<cliente>/materiais/leitura-emocional-generica.html \
OUT=clientes/<cliente>/materiais/leitura-emocional-generica.pdf \
WHATSAPP=5531993196471 \
WIDTH=400 \
node .claude/skills/leitura-pdf-whatsapp/assets/gerar-pdf-leitura.mjs
```

- `WHATSAPP`: só dígitos, com DDI (55). **Obrigatório** (é o que monta os botões).
- `WIDTH`: 400 é o padrão validado. Não precisa mexer.
- O gerador acha o Chromium do ambiente sozinho (usa `headless_shell`, que evita
  o erro de `--headless=old`). Dá pra forçar com `EXEC=<caminho>`.

Confira o resultado renderizando uma prévia (largura 400) e olhando: abertura com
saudação, botões escuros limpos (sem retângulo cinza), depoimentos aparecendo, sem
espaço em branco no fim.

### Passo 5 — Entrega e memória (Git)

1. Envie o PDF para a pessoa na sessão.
2. Deixe HTML (fonte editável) e PDF em `clientes/<cliente>/materiais/`.
3. Registre uma linha em `clientes/<cliente>/aprendizados.md`.
4. Commit na branch de trabalho e PR, conforme o manual.

## Checklist antes de entregar

- [ ] Página única contínua (sem espaço em branco no fim), largura ~400px
- [ ] Abertura com saudação ("Olá...")
- [ ] 3 botões de CTA, todos com `data-wa`, virando links wa.me clicáveis
- [ ] Número do WhatsApp confirmado como o que o SDR usa
- [ ] Depoimentos reais embutidos (aparecem no PDF)
- [ ] Sem `box-shadow`, sem travessão, sem `{{placeholder}}`, sem `{nome}`
- [ ] Copy adaptada ao nicho do cliente, tom acolhedor
- [ ] PDF enviado + HTML/PDF em `materiais/` + aprendizado + commit/PR

## Referência viva

Instância real e aprovada: **`references/exemplo-pamella/`** (o HTML final da
Pâmella Mello). Use como espelho de qualidade quando estiver em dúvida.
