# Instalação da skill Guia de Captação de Depoimentos

Pacote portável da skill da Simple que gera o **Guia de Captação de
Depoimentos** de um cliente (PDF de 4 páginas, identidade navy + dourado,
mensagem pronta com 4 tópicos, dicas de gravação, erros a evitar e checklist).

## O que tem no pacote

```
guia-captacao-depoimentos/
├── SKILL.md                              → instruções que o Claude segue
├── README-INSTALACAO.md                  → este arquivo (pode apagar depois)
├── assets/
│   └── modelo-guia-depoimentos.html      → template com 21 placeholders
└── references/
    └── personalizacao.md                 → mapa do que personalizar, com exemplos
```

## Opção 1: Claude Code / Cowork (recomendado)

Copie a pasta `guia-captacao-depoimentos/` inteira para:

- **Um projeto específico:** `<projeto>/.claude/skills/guia-captacao-depoimentos/`
  (vale para todo mundo que usa o repositório; faça commit).
- **A conta toda (qualquer projeto da máquina/conta):**
  `~/.claude/skills/guia-captacao-depoimentos/`

Pronto. Na sessão, é só pedir "gera o guia de depoimentos do cliente X" que a
skill é acionada (ou invocar pelo nome `guia-captacao-depoimentos`).

## Opção 2: claude.ai (Skills / Capacidades)

1. Compacte a pasta `guia-captacao-depoimentos/` num `.zip` (o zip deste
   pacote já serve).
2. No claude.ai: **Configurações → Capacidades/Skills → Enviar skill** e suba
   o zip.
3. A skill fica disponível nas conversas da conta; peça "gera o guia de
   captação de depoimentos do cliente X".

Observação: no claude.ai a skill funciona melhor em conversas com execução de
código habilitada (para validar e gerar o PDF). Sem isso, o Claude entrega o
HTML pronto e orienta a impressão em PDF pelo Chrome (resultado idêntico).

## O que a skill entrega

- PDF de 4 páginas na identidade visual dos roadmaps da Simple:
  1. Capa personalizada com o nome do cliente.
  2. Regra de ouro (espontâneo com direção), quem pedir primeiro, o pedido
     que funciona (modelo na voz do cliente) e retribuição.
  3. Mensagem pronta para encaminhar no WhatsApp (os 4 tópicos) + qualidade
     mínima de gravação.
  4. Os 5 erros que inutilizam, prints de WhatsApp, checklist de conferência
     e meta de captação.
- Fonte HTML editável (para ajustes futuros sem refazer).

## Regras de qualidade embutidas

- Zero travessões em qualquer texto (padrão de escrita da Simple).
- Nenhum placeholder pode sobrar; validação automática antes do PDF.
- Verificação de paginação (nenhuma página estourando o A4).
- Personalização por segmento com restrições de nicho (saúde não cita
  paciente, OAB restringe promessa, política da Meta etc.), detalhada em
  `references/personalizacao.md`.

## Dados que o Claude vai precisar do cliente

Nome, produto (como ele chama), segmento dos clientes dele e prioridade de
prova social, tipos de resultado concreto do nicho, restrições do nicho,
retribuições possíveis, destino do material (Drive etc.), canal de dúvidas e
tom de voz. Se houver base de conhecimento do cliente no projeto, a skill lê
de lá; senão, pergunta tudo de uma vez.
