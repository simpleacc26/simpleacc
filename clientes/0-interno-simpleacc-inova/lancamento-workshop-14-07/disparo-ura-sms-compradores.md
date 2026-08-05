# Disparo URA + SMS para COMPRADORES — dia do evento (14/07)

> Decisão (Daniel/Matheus): URA/SMS **só pra quem comprou o ingresso** — é onde
> funciona e sai mais barato. Objetivo: **comparecimento ao vivo**, levar pra sala.
> Substitui a ideia de disparar pra base fria.

- **Público:** contatos com a tag `comprou ingresso` (compradores). Nada de base fria.
- **CTA único:** entrar na sala do evento → `{{link_sala}}`.
- **Dia:** 14/07 (terça), evento 14h–17h.
- **Placeholders:** `{{primeiro_nome}}`, `{{link_sala}}` (usar link curto).

---

## Regras rápidas
- Público quente (já comprou), mas mantenha **opt-out** por boa prática (SMS: `Pare: SAIR`).
- **SMS sem acento e sem emoji** (GSM-7, 160 caracteres/segmento).
- **Link curto** da sala.
- **URA:** voz clara, curta. Se tiver DTMF, "aperte 1" pra reenviar o link no WhatsApp.
- Deduplicar contra quem já entrou na sala, se a ferramenta permitir (senão, tudo bem
  disparar pra todos os compradores).

---

## Cronograma (14/07)

| Hora | Canal | Peça |
|---|---|---|
| 09h00 | SMS | SMS 1 — é hoje |
| 12h00 | SMS | SMS 2 — faltam 2h |
| 13h45 | URA | URA — tá começando (ligação) |
| 14h05 | SMS | SMS 3 — começou, entra |
| 14h40 | SMS | SMS 4 — cadê você (opcional) |

---

## SMS (copy pronta — sem acento, ~160 caracteres)

### SMS 1 · É hoje (09h)
```
Simple: e HOJE as 14h o Workshop Funil de Lead Dinamico, ao vivo. Sua sala: {{link_sala}} Entra 5 min antes. Ate ja! Pare: SAIR
```

### SMS 2 · Faltam 2h (12h)
```
{{primeiro_nome}}, faltam 2h pro Workshop Funil de Lead Dinamico. Comeca as 14h. Guarda sua sala: {{link_sala}} Ate ja! Pare: SAIR
```

### SMS 3 · Começou (14h05)
```
Simple: comecou AGORA o Workshop Funil de Lead Dinamico. Entra na sala: {{link_sala}} Ainda da tempo de pegar o inicio. Pare: SAIR
```

### SMS 4 · Cadê você (14h40, opcional)
```
{{primeiro_nome}}, ja estamos ao vivo e voce ta fazendo falta. Da tempo de entrar: {{link_sala}} Pare: SAIR
```

---

## URA (roteiro pra gravar — voz, ~20s)

### URA · Tá começando (13h45, ligação)
```
Oi {{primeiro_nome}}, aqui e da Simple.
O Workshop Funil de Lead Dinamico comeca em 15 minutos, as 14 horas, ao vivo.
O link da sala esta no seu SMS e no seu WhatsApp.
Entra uns minutinhos antes pra nao perder o comeco.
[Se DTMF] Se quiser que a gente reenvie o link agora no seu WhatsApp, aperte 1.
Te espero la.
```

> (Opcional) 2ª URA às 14h10 pra quem não entrou: mesma base, trocando o começo por
> "O Workshop ja comecou, ao vivo. Ainda da tempo de pegar o inicio."

---

## Checklist operacional
- [ ] Exportar/segmentar só os contatos com a tag `comprou ingresso`.
- [ ] Gerar **link curto** da sala do evento.
- [ ] Subir os SMS com `{{primeiro_nome}}` mapeado (fallback: sem nome).
- [ ] Gravar a URA (ou TTS) e configurar DTMF (aperte 1 → reenvia link no WhatsApp).
- [ ] Agendar nos horários da tabela.
- [ ] Teste com **1 número seu** antes do disparo.

> Copy final é do Daniel — isto acelera, não substitui.
