# Imersão Funil de Lead Dinâmico — 26 e 27/08/2026

Evento pago interno da Simple Acc. Ação de aquisição para a mentoria
**Estrategista de Quiz (R$2.997)**.

| | |
|---|---|
| **Datas** | Quarta 26 e quinta 27 de agosto de 2026, 20h–22h30 |
| **Plataforma** | Google Meet |
| **Ingresso** | R$9,90 · checkout Kiwify |
| **Disparo de abertura** | Segunda 24/08, 09h · ManyChat / WhatsApp Cloud API |
| **Dono** | Daniel Souza |
| **Automação e copy** | Carlos Durães |
| **Apoio técnico (API/WABA)** | Victor — PLX |

## Meta

15 a 50 ingressos (base ativa de 3–5k). O caixa do ingresso é irrelevante
(R$148 a R$495) — o objetivo é encher as duas noites e converter 10–15% em
Estrategista de Quiz, ou seja **1 a 7 vendas = R$2.997 a R$20.979**.

## Por onde começar

**Leia `00-ACOES-DE-HOJE.md` primeiro.** Ele diz o que trava o disparo e em que
ordem resolver.

| Arquivo | O que tem |
|---|---|
| `00-ACOES-DE-HOJE.md` | Plano de execução, riscos, papéis, o que falta receber |
| `01-TEMPLATES-META.md` | Os 4 templates prontos pra submeter à Meta — **é o que trava tudo** |
| `02-FLUXO-MANYCHAT.md` | Os furos da árvore original, árvore corrigida, montagem passo a passo |
| `03-COPY-COMPLETA.md` | Toda a copy final, pronta pra colar |
| `04-MENSAGENS-TIME.md` | Mensagens prontas pra Daniel, Victor e Renan |
| `05-CHECKLIST-TESTES.md` | Os 6 caminhos a testar antes do broadcast |
| `06-INTEGRACAO-KIWIFY.md` | Kiwify → ManyChat via Make, com plano B manual |

## Estado atual

🔴 **Bloqueado em acesso.** A copy e a arquitetura estão 100% prontas. O que
falta é acesso ao ManyChat e ao Meta Business, a aprovação dos templates pela
Meta (submeter hoje) e os links do Daniel (checkout, grupos, Meet).

## Decisão de arquitetura que vale registrar

Todos os lembretes das duas noites vão pelo **grupo VIP do WhatsApp**, não no
1:1. Motivo: a janela de 24h da API fecha antes do evento para quem comprou na
segunda, o que derrubaria 7 das 8 mensagens de antecipação. O grupo não tem
janela, template, custo por mensagem nem limite de tier.

Consequência: o link do grupo VIP na mensagem de confirmação (C01) é o ponto
único de falha do fluxo de comprador. Monitorar quantos compradores entram.

## Aprendizados pra próxima

Ver `../../aprendizados.md` — seção "Disparo WhatsApp / ManyChat".
