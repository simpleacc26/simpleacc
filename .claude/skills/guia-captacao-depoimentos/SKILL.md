---
name: guia-captacao-depoimentos
description: >-
  Gera o Guia de Captação de Depoimentos de um cliente: PDF de 4 páginas na
  identidade visual da Simple (navy + dourado) com direcionamento simples para
  o cliente pedir e coletar depoimentos em vídeo dos clientes satisfeitos dele.
  Use sempre que alguém pedir "guia de depoimentos", "material para o cliente X
  captar depoimentos", "tópicos de direcionamento para depoimento", "como pedir
  depoimento para os clientes dele", ou quando um roadmap/onboarding incluir a
  tarefa de coletar prova social em vídeo. Mantém a estrutura validada e
  personaliza nome, segmento, exemplos e particularidades do nicho do cliente.
---

# Guia de Captação de Depoimentos: gerador por cliente

## O que esta skill faz

Produz o **Guia de Captação de Depoimentos** de um cliente: um PDF de 4
páginas (capa + 3 de conteúdo), na identidade visual da Simple (navy +
dourado), que o cliente usa para pedir depoimentos em vídeo aos clientes
satisfeitos dele.

A peça central é uma **mensagem pronta para encaminhar no WhatsApp** com 4
tópicos de direcionamento. A filosofia do material: **espontâneo com direção,
nunca decorado**. É um direcionamento simples para garantir que todo
depoimento chegue usável (história com antes/depois + qualidade técnica
mínima), sem roteiro engessado que atrapalhe a naturalidade.

O modelo validado está em **`assets/modelo-guia-depoimentos.html`**, e os dois
clientes já calibrados (Lucas Sobreiro, empresarial, e Rafael Cobra, com
sigilo) estão na tabela de `references/personalizacao.md`. A regra de uso é:

- **O que é genérico fica igual** (regra de ouro, estrutura dos 4 tópicos,
  dicas técnicas de gravação, os 5 erros, checklist, seção de prints, CSS).
- **O que é do cliente é personalizado** (nome, segmento dos clientes dele,
  exemplos dentro dos tópicos, retribuição, meta, particularidades). O mapa
  completo do que trocar está em **`references/personalizacao.md`**.

## O fluxo (siga nesta ordem)

```
1. CONTEXTO      → levantar os dados de personalização do cliente
2. PERSONALIZAR  → preencher os placeholders do modelo (nada genérico sobrando)
3. VALIDAR       → zero travessões + nenhuma página estourando a altura A4
4. GERAR PDF     → navegador headless (com fallbacks)
5. ENTREGAR      → enviar o PDF + guardar a fonte HTML onde o projeto versiona
```

### Passo 1: Contexto do cliente

Levante os dados de personalização na melhor fonte disponível, nesta ordem:

1. **Pasta/base de conhecimento do cliente** no projeto atual, se existir.
   No monorepo da Simple é `clientes/<cliente>/`: leia o `CLAUDE.md` do
   cliente, `contexto/` (quem é, oferta, ICP, linguagem) e `aprendizados.md`.
   O roadmap de 90 dias, se já existir, costuma trazer a meta de captação e o
   momento do projeto, que é o que calibra `{{META_CAPTACAO}}`.
2. **Documentos fornecidos na conversa** (onboarding, canvas, roadmap).
3. **Perguntando à pessoa.** Se faltar informação, faça as perguntas de uma
   vez só (não uma por mensagem):
   - Nome do cliente e como ele chama o produto (mentoria, consultoria,
     programa, curso)?
   - Quem são os clientes dele (segmento) e qual público é prioridade de
     prova social?
   - Que resultado concreto faz sentido no nicho (faturamento, pacientes,
     agenda, obra, processo)?
   - Que restrições o nicho tem (saúde, OAB, promessa de ganho)?
   - **Quem dá o depoimento é paciente, cliente de profissão regulamentada ou
     pessoa em situação sensível?** Se sim, o bloco de autorização é
     obrigatório (ver `references/personalizacao.md`), a retribuição não pode
     ser exposição, e o pedido já precisa citar o sigilo.
   - O que ele tem para retribuir o depoimento (evento, sessão bônus,
     destaque no Instagram)?
   - Para onde vai o material coletado (Drive, WhatsApp, pasta) e onde ele
     tira dúvidas com o time?
   - Tom de voz dele (informal/formal, "tu" ou "você")?

Se estiver rodando de forma autônoma e faltar algo, assuma o padrão mais
provável do nicho, sinalize a premissa na entrega e siga. Não trave.

### Passo 2: Personalização

Copie `assets/modelo-guia-depoimentos.html` para um arquivo de trabalho com o
nome `AAAA-MM-DD-guia-captacao-depoimentos-<cliente>.html` e substitua
**todos** os placeholders `{{...}}` seguindo `references/personalizacao.md`
(o arquivo tem a tabela completa com exemplos reais e calibragem por
segmento). Regras inegociáveis:

- **Não pode sobrar nenhum `{{`** no arquivo final (apague também o
  comentário de instrução do topo).
- **Zero travessões (—)** em qualquer texto novo. Padrão da Simple: usar
  vírgula, dois-pontos, ponto final ou parênteses no lugar.
- A mensagem pronta para encaminhar (página 3) fica na **voz do cliente**
  (informal ou formal, tu ou você, conforme o jeito dele), não na voz de
  agência.
- Os exemplos dentro dos 4 tópicos falam a língua do segmento (um arquiteto
  não fala em "pacientes"; um dentista não fala em "obra").
- Não mexa na estrutura das 4 páginas nem no CSS, salvo para resolver estouro
  de página (ver Passo 3).
- **`{{BLOCO_AUTORIZACAO}}` é o único componente opcional.** Em nicho com
  sigilo ou conselho de classe ele é obrigatório e entra inteiro; nos demais,
  substitua por string vazia. Quando ele entra, a página 2 estoura, e a
  correção validada (mover a retribuição para a página 3 e o bullet de áudio
  e print para a página 4) está em `references/personalizacao.md`.

### Passo 3: Validação (obrigatória antes do PDF)

```bash
# 1) Placeholders esquecidos (tem que retornar 0)
grep -c '{{' <arquivo>.html

# 2) Travessões (tem que retornar 0)
grep -c '—' <arquivo>.html
```

3) **Estouro de página**: nenhuma página pode passar da altura A4. Copie o
HTML para um arquivo temporário, acrescente o script abaixo antes de
`</html>` e abra com o navegador headless (`--dump-dom`); o resultado aparece
no `<title>`:

```html
<script>
var out = [];
document.querySelectorAll('.page').forEach(function(p, i) {
  var contentBottom = 0;
  Array.from(p.children).forEach(function(c){ if(!c.classList.contains('runfoot')) contentBottom = Math.max(contentBottom, c.offsetTop + c.offsetHeight); });
  if (contentBottom > 1032) out.push('PG' + (i+1) + ':APERTADO(' + Math.round(contentBottom) + 'px)');
});
document.title = out.length ? out.join(' ') : 'TODAS-AS-PAGINAS-OK';
</script>
```

```bash
<navegador> --headless --disable-gpu --no-sandbox \
  --dump-dom "file:///caminho/temp.html" 2>/dev/null | grep -o '<title>[^<]*</title>' | head -1
```

Se alguma página apertar: enxugue texto ou mova um box para a página vizinha.
Não reduza a fonte abaixo de 10pt e não deixe conteúdo encostar no rodapé.

### Passo 4: Gerar o PDF

Encontre um Chromium/Chrome no ambiente, testando nesta ordem (use o primeiro
que existir):

```bash
for BIN in "$PLAYWRIGHT_BROWSERS_PATH/chromium" /opt/pw-browsers/chromium \
  chromium chromium-browser google-chrome google-chrome-stable \
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"; do
  command -v "$BIN" >/dev/null 2>&1 || [ -x "$BIN" ] && { echo "$BIN"; break; }
done
```

```bash
<navegador> --headless --disable-gpu --no-sandbox --no-pdf-header-footer \
  --print-to-pdf="<mesmo-nome>.pdf" "file://<caminho-absoluto>/<arquivo>.html"
```

**Fallback sem navegador no ambiente:** entregue o HTML final e oriente a
pessoa a abri-lo no Chrome e imprimir em PDF (destino "Salvar como PDF",
margens "Nenhuma", tamanho A4, sem cabeçalho/rodapé). O HTML já está
paginado; o resultado é idêntico.

### Passo 5: Entrega e memória

1. Envie o PDF para a pessoa na sessão (é o entregável).
2. Guarde **HTML (fonte editável) e PDF** onde o projeto versiona material do
   cliente. No monorepo da Simple: `clientes/<cliente>/estrategia/`, com o HTML
   no padrão `AAAA-MM-DD-guia-captacao-depoimentos-<cliente>.html` e o PDF ao
   lado, com o nome de entrega. Se não houver repositório, entregue os dois
   arquivos juntos, porque o HTML é o que permite editar depois.
3. Se houver um log de aprendizados do cliente, registre uma linha (data +
   "guia de depoimentos criado" + particularidade relevante, se houver).
4. Se o projeto usa Git: commit em branch própria e PR, seguindo a convenção
   local.

## Checklist antes de entregar

- [ ] 4 páginas: capa, como pedir, mensagem pronta + qualidade, evitar + checklist + meta
- [ ] Nenhum `{{placeholder}}` sobrando; nenhum travessão; comentário de instrução removido
- [ ] Mensagem de pedido e mensagem dos 4 tópicos na voz do cliente e no vocabulário do segmento
- [ ] Segmento prioritário de prova social correto (identificação: igual assiste igual)
- [ ] Particularidades do nicho aplicadas (restrições legais/éticas, se houver)
- [ ] Bloco de autorização presente em nicho sensível, e retribuição sem exposição
- [ ] Validação de páginas OK (TODAS-AS-PAGINAS-OK) e PDF gerado do HTML final
- [ ] PDF entregue + fonte HTML guardada (e aprendizado/commit, se o projeto versionar)
