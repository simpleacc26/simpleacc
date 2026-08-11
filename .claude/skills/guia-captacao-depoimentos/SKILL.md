---
name: guia-captacao-depoimentos
description: >-
  Gera o Guia de Captação de Depoimentos de um cliente da Simple: PDF de 4
  páginas na identidade visual dos roadmaps (navy + dourado) com direcionamento
  simples para o cliente pedir e coletar depoimentos em vídeo dos clientes
  satisfeitos dele. Use sempre que alguém do time pedir "guia de depoimentos",
  "material para o cliente X captar depoimentos", "tópicos de direcionamento
  para depoimento", "como pedir depoimento para os clientes dele", ou quando o
  roadmap/onboarding de um cliente incluir a tarefa de coletar prova social em
  vídeo. Mantém a estrutura validada (modelo Lucas Sobreiro) e personaliza
  nome, segmento, exemplos e particularidades do cliente.
---

# Guia de Captação de Depoimentos — gerador por cliente

## O que esta skill faz

Produz o **Guia de Captação de Depoimentos** de um cliente da Simple: um PDF de
4 páginas (capa + 3 de conteúdo), na identidade visual dos roadmaps, que o
cliente usa para pedir depoimentos em vídeo aos clientes satisfeitos dele.

A peça central é uma **mensagem pronta para encaminhar no WhatsApp** com 4
tópicos de direcionamento. A filosofia do material: **espontâneo com direção,
nunca decorado**. É um direcionamento simples para garantir que todo depoimento
chegue usável (conteúdo com antes/depois + qualidade técnica mínima), sem
roteiro engessado que atrapalhe a naturalidade.

O modelo validado está em **`assets/modelo-guia-depoimentos.html`** (estrutura
aprovada no cliente Lucas Sobreiro). A regra de uso é:

- **O que é genérico fica igual** (regra de ouro, estrutura dos 4 tópicos,
  dicas técnicas de gravação, os 5 erros, checklist, seção de prints, CSS).
- **O que é do cliente é personalizado** (nome, segmento dos clientes dele,
  exemplos dentro dos tópicos, retribuição, meta, particularidades). O mapa
  completo do que trocar está em **`references/personalizacao.md`**.

## O fluxo (siga nesta ordem)

```
1. CONTEXTO      → ler a pasta do cliente e levantar os dados de personalização
2. PERSONALIZAR  → preencher os placeholders do modelo (nada genérico sobrando)
3. VALIDAR       → zero travessões + nenhuma página estourando a altura A4
4. GERAR PDF     → chromium headless
5. ENTREGAR      → enviar o PDF + salvar HTML e PDF em estrategia/ + commit/PR
```

### Passo 1 — Contexto do cliente

Leia, na pasta `clientes/<cliente>/`: `CLAUDE.md`, `contexto/` (quem é, oferta,
ICP, linguagem) e `aprendizados.md`. Você precisa sair daqui sabendo:

- Nome do cliente e como ele chama o produto (mentoria, consultoria, programa).
- **Segmento dos clientes dele** (quem dá o depoimento) e qual público é
  prioridade de prova social.
- Que tipo de **resultado concreto** faz sentido no nicho (faturamento,
  pacientes, agenda, obra entregue, processo ganho...).
- Particularidades: restrições do nicho (ex.: saúde não cita paciente; advogado
  tem regras da OAB sobre promessa), tom de voz do cliente, o que ele tem para
  retribuir (evento, sessão bônus, destaque no Instagram).
- Para onde vai o material coletado (link do Drive, grupo) e quem da Simple
  acompanha.

Se algo não estiver na pasta, pergunte à pessoa na sessão. Se estiver rodando
de forma autônoma, assuma o padrão mais provável e sinalize a premissa na
entrega. Não trave.

### Passo 2 — Personalização

Copie `assets/modelo-guia-depoimentos.html` para
`clientes/<cliente>/estrategia/AAAA-MM-DD-guia-captacao-depoimentos.html` e
substitua **todos** os placeholders `{{...}}` seguindo
`references/personalizacao.md`. Regras inegociáveis:

- **Não pode sobrar nenhum `{{`** no arquivo final.
- **Zero travessões (—)** em qualquer texto novo (padrão da SimpleAcc; use
  vírgula, dois-pontos, ponto ou parênteses).
- A mensagem pronta para encaminhar (página 3) fica na **voz do cliente**
  (informal, tu/você conforme o jeito dele), não na voz da Simple.
- Os exemplos dentro dos 4 tópicos falam a língua do segmento (um arquiteto não
  fala em "pacientes"; um dentista não fala em "obra").

### Passo 3 — Validação (obrigatória antes do PDF)

```bash
# 1) Placeholders esquecidos (tem que retornar 0)
grep -c '{{' <arquivo>.html

# 2) Travessões (tem que retornar 0)
grep -c '—' <arquivo>.html

# 3) Estouro de página: nenhuma página pode passar da altura A4
cp <arquivo>.html /caminho/do/scratchpad/check.html
cat >> /caminho/do/scratchpad/check.html <<'EOF'
<script>
var out = [];
document.querySelectorAll('.page').forEach(function(p, i) {
  var contentBottom = 0;
  Array.from(p.children).forEach(function(c){ if(!c.classList.contains('runfoot')) contentBottom = Math.max(contentBottom, c.offsetTop + c.offsetHeight); });
  if (contentBottom > 1032) out.push('PG' + (i+1) + ':APERTADO(' + Math.round(contentBottom) + 'px)');
});
document.title = out.length ? out.join(' ') : 'TODAS-AS-PAGINAS-OK';
</script>
EOF
/opt/pw-browsers/chromium --headless --disable-gpu --no-sandbox \
  --dump-dom "file:///caminho/do/scratchpad/check.html" 2>/dev/null \
  | grep -o '<title>[^<]*</title>' | head -1
```

Se alguma página apertar: enxugue texto ou mova um box para a página vizinha.
Não reduza a fonte abaixo de 10pt e não deixe conteúdo encostar no rodapé.

### Passo 4 — Gerar o PDF

```bash
/opt/pw-browsers/chromium --headless --disable-gpu --no-sandbox --no-pdf-header-footer \
  --print-to-pdf="<mesmo-nome>.pdf" "file://<caminho-absoluto>/<arquivo>.html"
```

### Passo 5 — Entrega e memória (Git)

1. Envie o PDF para a pessoa na sessão.
2. Deixe HTML (fonte editável) e PDF em `clientes/<cliente>/estrategia/`.
3. Registre uma linha em `clientes/<cliente>/aprendizados.md` (data + "guia de
   depoimentos criado" + particularidade relevante, se houver).
4. Commit em branch `cliente/<cliente>/<assunto>` (ou a branch de trabalho da
   sessão) e PR, conforme o manual.

## Checklist antes de entregar

- [ ] 4 páginas: capa, como pedir, mensagem pronta + qualidade, evitar + checklist + meta
- [ ] Nenhum `{{placeholder}}` sobrando; nenhum travessão
- [ ] Mensagem de pedido e mensagem dos 4 tópicos na voz do cliente e no vocabulário do segmento
- [ ] Segmento prioritário de prova social correto (identificação: igual assiste igual)
- [ ] Particularidades do nicho aplicadas (restrições legais/éticas, se houver)
- [ ] Validação de páginas OK (TODAS-AS-PAGINAS-OK) e PDF gerado do HTML final
- [ ] PDF enviado + HTML/PDF salvos em `estrategia/` + aprendizado registrado + commit/PR
