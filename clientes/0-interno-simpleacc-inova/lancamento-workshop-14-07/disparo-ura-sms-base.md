# Disparo URA + SMS para a base — captação do Workshop (14/07)

> Objetivo: **ativar a base atual de leads (~2k)** e levar pro **checkout do
> ingresso**. É a camada de captação por voz/SMS, complementar ao WhatsApp+e-mail
> da base (ver `comunicacao.md` bloco B). Não confundir com o URA/SMS do **dia do
> evento** (bloco C do `comunicacao.md`), que é pra quem **já comprou** comparecer.

- **Público:** base de leads (quem ainda **não comprou**). Excluir quem já tem a
  tag `comprou ingresso` pra não gastar disparo com quem já é aluno.
- **CTA único:** comprar o ingresso → `{{link_checkout}}`.
- **Janela de campanha:** 08/07 (hoje) até 14/07 (dia do evento).
- **Placeholders:** `{{primeiro_nome}}`, `{{link_checkout}}` (usar **link curto**).

---

## Regras (pra não queimar a base nem levar bloqueio)

- **Horário:** disparar só entre **09h e 20h**; evitar domingo. URA de véspera até 20h.
- **Opt-out obrigatório (LGPD):** todo SMS termina com `Pare: SAIR`. URA: opção de
  sair da lista.
- **SMS sem acento e sem emoji:** mantém em GSM-7 (160 caracteres/segmento). Com
  acento vira Unicode e cai pra 70 — encarece e fragmenta.
- **Link curto:** encurtar o checkout (a ferramenta encurta, ou Bitly). Link longo
  na operadora aumenta chance de bloqueio.
- **Remetente:** identificar como **Simple** (nome/sender).
- **Deduplicar:** rodar contra a lista de compradores antes de cada disparo.
- **Cadência:** no máx. 1 toque por dia por lead. Não empilhar SMS + URA no mesmo dia
  cedo demais (deixe a URA da véspera + SMS do dia).

---

## Cronograma sugerido

| Dia | Hora | Canal | Peça |
|---|---|---|---|
| 08/07 (ter) | 10h | SMS | SMS 1 — abertura |
| 09/07 (qua) | 11h | URA | URA 1 — convite |
| 11/07 (sex) | 15h | SMS | SMS 2 — prova/mecanismo |
| 13/07 (dom→**seg 13 é dom? ajustar**) | 17h | SMS | SMS 3 — véspera |
| 13/07 | 18h | URA | URA 2 — véspera |
| 14/07 (ter) | 09h | SMS | SMS 4 — é hoje / últimas |

> ⚠️ 13/07 cai **domingo** — se preferir não disparar no domingo, junte a véspera
> no **sábado 12/07 à tarde** ou concentre no **14/07 de manhã**. Daniel decide.

---

## SMS (copy pronta — sem acento, ~160 caracteres)

### SMS 1 · Abertura (08/07)
```
Simple: 14/07 (ter) tem Workshop Funil de Lead Dinamico ao vivo. Faca o lead certo se qualificar antes da call, com CAC menor. Ingresso: {{link_checkout}} Pare: SAIR
```

### SMS 2 · Prova / mecanismo (11/07)
```
{{primeiro_nome}}, enquanto o mercado paga ~R$400 por lead, o Funil de Lead Dinamico entrega MQL a R$80. Terca (14/07) eu abro por dentro. Ingresso: {{link_checkout}} Pare: SAIR
```

### SMS 3 · Véspera (12 ou 13/07)
```
Simple: e amanha o Workshop Funil de Lead Dinamico, 14/07 as 14h ao vivo. Ultimas vagas do lote. Garanta agora: {{link_checkout}} Pare: SAIR
```

### SMS 4 · E hoje / ultimas (14/07, 09h)
```
{{primeiro_nome}}, e HOJE as 14h o Workshop Funil de Lead Dinamico. Da tempo de entrar: pegue seu ingresso agora: {{link_checkout}} Pare: SAIR
```

---

## URA (roteiro pra gravar — voz, ~20-25s)

> Gravar com voz clara, ritmo calmo, tom da marca (sóbrio e direto). Se a ferramenta
> tiver DTMF, oferecer "aperte 1" pra mandar o link no WhatsApp — sobe muito a conversão.

### URA 1 · Convite (09/07)
```
Oi {{primeiro_nome}}, aqui e da Simple.
No dia 14 de julho, uma terca-feira, a gente abre ao vivo o Workshop Funil de
Lead Dinamico: o mecanismo que faz o lead certo se qualificar antes da call, com
custo por lead bem menor.
As vagas do lote de abertura ja estao no ar.
Pra garantir o seu ingresso, e so acessar o link que enviamos no seu SMS.
[Se DTMF] Se quiser que a gente mande o link agora no seu WhatsApp, aperte 1.
Te espero la.
```

### URA 2 · Véspera (13/07, 18h)
```
Oi {{primeiro_nome}}, aqui e da Simple.
E amanha: o Workshop Funil de Lead Dinamico, dia 14, as 14 horas, ao vivo e online.
Sao as ultimas vagas do lote de abertura.
O link do ingresso esta no seu SMS e no seu WhatsApp.
[Se DTMF] Pra receber o link agora, aperte 1.
Nao fica de fora. Te espero amanha.
```

> Para sair da lista de ligacoes: incluir no fim "Para nao receber mais chamadas,
> aperte 9" (ou conforme a ferramenta).

---

## Checklist operacional

- [ ] Exportar a base e **remover quem tem a tag `comprou ingresso`**.
- [ ] Gerar **link curto** do checkout.
- [ ] Subir os **4 SMS** com `{{primeiro_nome}}` mapeado (fallback: sem nome).
- [ ] Gravar as **2 URAs** (ou TTS) e configurar DTMF (aperte 1 → WhatsApp).
- [ ] Agendar nos horários da tabela (respeitando 09h-20h e a decisão sobre domingo).
- [ ] Configurar **opt-out** (SAIR no SMS, tecla na URA).
- [ ] Teste com **1 número seu** antes do disparo em massa.

> Copy final é do Daniel — isto acelera, não substitui. Ajustes de tom/prova ficam
> a critério dele antes de agendar.
