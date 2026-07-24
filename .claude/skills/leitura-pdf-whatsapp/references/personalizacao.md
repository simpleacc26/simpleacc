# Mapa de personalização do modelo

Cada `{{PLACEHOLDER}}` do `assets/modelo-leitura-emocional.html` e o que colocar.
Nada de `{{` pode sobrar no arquivo final.

## Marca e topo

| Placeholder | O que é | Exemplo (Pâmella) |
| --- | --- | --- |
| `{{MARCA}}` | Nome da marca | Pâmella Mello |
| `{{TAGLINE}}` | Descritor curto (aparece no topo e no rodapé) | Hipnoterapia & Neurociência |
| `{{SELO}}` | Pílula acima do título | Leitura emocional |
| `{{TITULO}}` | Título principal | Sua leitura emocional |
| `{{SUBTITULO}}` | Linha abaixo do título | Uma leitura do que você sente, e do caminho para resolver de vez. |

## Paleta (no `:root`)

Não é `{{placeholder}}`, é edição direta dos hex. Puxe do `styles.css` do funil
do cliente pra ficar idêntico. As variáveis que importam: `--bg`, `--surface`,
`--text`, `--muted`, `--primary`, `--primary-700`, `--accent-soft`, `--border`,
`--action`, `--on-action`. Mantenha bom contraste (texto escuro sobre fundo claro,
botão escuro com texto creme).

## Copy das seções (adaptar ao nicho)

A **estrutura** fica igual. As **palavras** falam a língua do problema do cliente.
Espelhe o espírito da leitura do funil (`diagnostico.js`), sem os campos
personalizados (nada de `${situacao}`, `${nome}` etc.).

- **O seu cenário hoje**: o cenário comum do lead, em linguagem geral ("se você
  sente...", "muitas pessoas...").
- **Por que não resolveu até agora**: por que as tentativas anteriores falham no
  nicho.
- **Dois caminhos**: ajuste os bullets de "sintoma" x "causa" à realidade do
  cliente (o modelo já traz um par forte e neutro).
- **Como o método trabalha**: `{{METODO_INTRO}}`, as 4 etapas
  (`{{ETAPA_N_TITULO}}` / `{{ETAPA_N_TEXTO}}`) e `{{METODO_NOTA}}` (ex.: prazo
  típico de resultado).
- **O que precisa acontecer agora**: `{{OFERTA_PRIMEIRO_PASSO}}` (ex.: "Sessão de
  Avaliação", "Consulta inicial", "Diagnóstico") e `{{OFERTA_DESCRICAO}}`.

## Botões de CTA (viram links wa.me)

Cada botão tem um texto visível e um `data-wa` (a mensagem que já vem escrita na
conversa quando o lead toca). Não coloque número aqui: o número entra pelo gerador
(variável `WHATSAPP`).

| Placeholder | O que é | Exemplo |
| --- | --- | --- |
| `{{BOTAO_1}}` | Texto do 1º botão | Quero dar o próximo passo |
| `{{WA_MSG_1}}` | Mensagem pronta do 1º botão | Olá! Fiz a leitura e quero agendar minha Sessão de Avaliação. |
| `{{BOTAO_2}}` | Texto do 2º botão | Quero agendar minha Sessão de Avaliação |
| `{{WA_MSG_2}}` | Mensagem pronta do 2º botão | Olá! Quero agendar minha Sessão de Avaliação. |
| `{{CTA_2_LINHA}}` | Micro-linha abaixo do 2º botão | Atendimento presencial e online. |
| `{{BOTAO_3}}` | Texto do 3º botão (caixa final) | Falar com a equipe e agendar |
| `{{WA_MSG_3}}` | Mensagem pronta do 3º botão | Olá! Fiz a leitura e quero agendar minha Sessão de Avaliação. |

Escreva as mensagens em texto normal (com acento). O gerador faz o
URL-encode. Mantenha curtas e com intenção clara de agendar.

## Depoimentos

| Placeholder | O que é | Exemplo |
| --- | --- | --- |
| `{{DEPO_PATH}}` | Pasta das imagens de depoimento, relativa a `materiais/` | ../funil-hipnose/depoimentos |

Coloque de 4 a 8 `<img>`. Use as mesmas imagens do funil do cliente. O gerador
embute como `data:` URI (não precisa copiar as imagens para `materiais/`).

## Rodapé

| Placeholder | O que é | Exemplo |
| --- | --- | --- |
| `{{RODAPE_ATENDIMENTO}}` | Linha de atendimento | Contagem/BH e online para todo o Brasil |

## Variáveis do gerador (não vão no HTML)

- `WHATSAPP` (obrigatório): número do canal que atende, só dígitos, com DDI 55.
  Ex.: `5531993196471`. Confirme que é o número que o SDR usa, não só o do funil.
- `WIDTH` (opcional): largura em px. Padrão 400 (validado). Não precisa mexer.
- `EXEC` (opcional): caminho do Chromium, se a detecção automática falhar.
