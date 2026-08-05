# Disparos WhatsApp (API / GHL) — venda do ingresso + aviso aos compradores

> Evento remarcado para **28/07 (terça)**, ao vivo e online. *(confirmar horário — base: 14h–17h.)*
> Rascunho pra **validar com o Daniel**. Copy final é dele.

## ⚠️ Importante (técnico, antes de agendar)
Disparo em massa pela **API do WhatsApp** (GHL) para leads que estão **fora da janela de
24h** exige **template aprovado pela Meta**. Então cada uma das 4 mensagens abaixo precisa:
1. Ser **cadastrada como template** no GHL (WhatsApp → Templates).
2. Os 3 de venda entram provavelmente como **Marketing**; o de compradores como **Utility**
   (é aviso de mudança de data) — aprova mais rápido.
3. Variável `{{1}}` = primeiro nome. Links ficam **fixos** no corpo.
4. Submeter **hoje** pra dar tempo da aprovação antes dos disparos.

**Segmentação:**
- Disparos de venda (1, 2, 3): **todos os leads do GHL, EXCETO** quem tem a tag `comprou ingresso`.
- Mensagem de compradores: **só** quem tem a tag `comprou ingresso`.

---

# PARTE 1 — 3 disparos de venda (pegada dor → desejo → resultado)

## Disparo 1 · HOJE · ângulo DOR
> Todos os leads (menos compradores).
```
{{primeiro_nome}}, deixa eu te fazer uma pergunta sincera 👇

Quanto você está pagando por lead que *não fecha*? Tráfego caro, agenda cheia de call desqualificada e aquela sensação de depender da sessão 1:1 que já saturou.

Esse é o jogo velho do high ticket — e ele está cada vez mais caro.

No dia *28/07 (terça)*, ao vivo, eu te mostro como sair dele: o *Funil de Lead Dinâmico*, o mecanismo que faz o lead certo se qualificar sozinho *antes* da call.

Garanta seu ingresso: {{link_checkout}}
```

## Disparo 2 · QUARTA (4ª) · ângulo DESEJO
```
{{primeiro_nome}}, imagina o seu funil assim 👇

O lead certo chega, *se qualifica sozinho* e só marca a call quando já está pronto pra comprar. Lead mais barato, CAC menor e a sua agenda só com quem tem perfil.

Isso é o *Funil de Lead Dinâmico*: o novo jogo do high ticket, previsível e escalável no tráfego frio, sem depender da sessão saturada.

No dia *28/07 (terça)*, ao vivo, eu monto ele com você.

Seu ingresso: {{link_checkout}}
```

## Disparo 3 · SEXTA (6ª) · ângulo RESULTADO / PROVA
```
{{primeiro_nome}}, resultado fala mais alto 👇

Enquanto o mercado paga ~*R$400* por lead qualificado, o Funil de Lead Dinâmico entrega *MQL a R$80* e *ROAS acima de 8x* — no tráfego frio.

No dia *28/07 (terça)*, ao vivo, eu abro o mecanismo por dentro e você sai com ele montado pra aplicar no seu negócio.

Últimas vagas do lote: {{link_checkout}}
```

---

# PARTE 2 — Mensagem para quem JÁ COMPROU (mudança de data + bônus)
> Só quem tem a tag `comprou ingresso`.
```
{{primeiro_nome}}, novidade boa pra você que já garantiu seu ingresso 🎉

O *Workshop Funil de Lead Dinâmico mudou de data*: agora é dia *28/07 (terça)*, ao vivo e online.

E porque você comprou antecipado, você ganhou *dois bônus*:
🎁 A *gravação* completa do workshop (em formato de aulas)
🎁 A *apostila* digital (guia de implementação)

Não precisa fazer nada: seu acesso continua garantido e os bônus entram na sua área de membros. Qualquer dúvida, é só responder aqui.

Te espero dia 28! 🚀
```

---

## Checklist
- [ ] Daniel valida as 4 copies.
- [ ] Confirmar **horário** do dia 28.
- [ ] Cadastrar os 4 templates no GHL (`{{1}}` = primeiro nome) e submeter à Meta.
- [ ] Segmentar: venda = todos menos `comprou ingresso`; aviso = só `comprou ingresso`.
- [ ] Agendar: Disparo 1 hoje, 2 na quarta, 3 na sexta; aviso de compradores assim que aprovar.
- [ ] Encurtar `{{link_checkout}}`.
- [ ] Teste com 1 número antes do disparo em massa.
