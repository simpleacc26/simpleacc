# Mensagem automática pós-quiz (GHL / WhatsApp API)

**O que é:** a primeira mensagem que sai automaticamente para o lead **assim que ele
termina o quiz** (`quiz.vitoriadaniela.com.br`) e deixa Nome / E-mail / WhatsApp.
O próprio quiz promete: *"Seu diagnóstico está pronto. Agora é só me dizer pra onde
enviar"* → botão **"Receber meu diagnóstico"**. **A entrega do diagnóstico acontece aqui,
no WhatsApp.**

**Objetivos da mensagem (nesta ordem):**
1. **Entregar o diagnóstico** prometido — cumprir o que o quiz prometeu.
2. **Provocar uma resposta do lead** para **abrir a janela de 24h** do WhatsApp.
3. Conduzir para o próximo passo do funil: a **Análise / Conversa Estratégica** (sessão
   de ~40 min — é o que a LP `lp.vitoriadaniela.com.br` vende) e/ou a qualificação dos
   scripts comerciais.

**Tom (regra de ouro da Vitória — confirmada na LP atual):** firme, confiante, de quem
entende do negócio. **Não pode parecer guru, marketeiro nem promessa mirabolante.**
A própria LP diz: *"não adianta método de 'guru' que empurra fórmula batida — você precisa
de alguém que olhe pro SEU contexto"*. Público de alto ticket compra **confiança**, não
empolgação. Foco em *"tem lucro escapando e dá pra estruturar"* — sem desespero.

---

## ⚠️ Como o WhatsApp/GHL trata essa mensagem (ler antes de configurar)

- O lead **acabou de preencher um formulário** — ele **não iniciou** uma conversa.
  Logo, é mensagem **business-initiated**: no WhatsApp Cloud API ela **só pode sair como
  um *Template* (HSM) previamente aprovado**. Texto livre fora de janela é bloqueado.
- A **janela de 24h** (texto livre, áudio, etc.) **só abre quando o LEAD responde**.
  Por isso a mensagem **termina sempre com uma pergunta** — a resposta dele é o que
  destrava a conversa.
- **O "diagnóstico":** hoje ele é entregue na conversa (não é página). Pode ser
  **(a)** um PDF no header do template, **(b)** o resumo/diagnóstico em texto, ou **(c)**
  um link. Defina com a Vitória qual formato (ver "Decisões pendentes" no fim).
- **Categoria do template:** **Marketing** (entrega de material + convite). Evite
  linguagem de spam para não reprovar na revisão da Meta.
- **Variáveis:** `{{1}} = primeiro nome`. (Opcional `{{2}} = perfil do quiz`: *Em
  estruturação / Em tração / Pronto para escala* — dá pra personalizar o gancho.)

> Resumo do fluxo: template aprovado dispara ao converter → lead responde →
> abre a janela de 24h → SDR/Vitória assume com os scripts comerciais e leva à
> Análise Estratégica.

---

## ⭐ VERSÃO FINAL (aprovada) — cadastrar no WhatsApp Manager / GHL

**Decisões da Vitória:** assina como **time/SDR** · diagnóstico = **PDF no cabeçalho do
template** · **genérico** (o diagnóstico é único, sem personalizar por perfil do quiz).

**Configuração do template (WhatsApp Cloud API / Meta):**

- **Categoria:** Marketing
- **Idioma:** Português (BR)
- **Header:** **Documento (PDF)** → anexar o arquivo do diagnóstico
  (sugestão de nome: `Diagnostico-Estrategico-Vitoria-Daniela.pdf`)
- **Body:** texto abaixo, com **1 variável** `{{1}} = primeiro nome`
- **Botão (opcional, recomendado):** *Resposta rápida* com o texto **"Pode perguntar 👍"**
  — ao tocar, o lead manda uma mensagem e **abre a janela de 24h** num clique.

**Corpo do template (Body):**

> Oi, {{1}}, tudo bem? Aqui é a [Nome], faço parte do time da **Vitória Daniela** 💜
>
> Esse é o seu **diagnóstico**, gerado a partir das respostas que você deu no quiz — tá
> aqui no PDF acima 👆
>
> Ele já aponta onde tem **lucro escapando** do seu negócio hoje. Pra te mostrar o que dá
> pra destravar primeiro, preciso entender um pouco do seu cenário.
>
> **Posso te fazer 2 ou 3 perguntas rápidas?** Leva uns 2 minutinhos 🙂

> Trocar `[Nome]` pelo nome real de quem opera o WhatsApp (texto fixo — definir antes de
> enviar para aprovação, pois template aprovado não permite editar o corpo).

**Lembrete (template separado, p/ quem não respondeu — também precisa ser aprovado):**

> Oi, {{1}}! Só passando pra saber se você conseguiu ver o seu diagnóstico 👀
> Tem um ponto ali que costuma ser o que mais trava o crescimento — quer que eu te mostre
> qual é no seu caso? Me chama aqui que eu te explico.

> Disparar ~3–4h depois e, se ainda sem resposta, de novo no dia seguinte. Quando o lead
> responder, seguir com os **scripts comerciais** (`copy/scripts-comerciais.md`) e levar à
> **Análise Estratégica**.

---

## Variações de referência (não usadas — mantidas como histórico)

## ✅ Versão A — Voz da Vitória (1ª pessoa)

Consistente com os scripts comerciais (todos em 1ª pessoa) e com o tom da LP.

> Oi, {{1}}! Que bom que você respondeu 🙌
>
> Seu **diagnóstico** ficou pronto — ele é montado em cima das **suas respostas** no quiz.
> Tá aqui 👇
>
> Ele já aponta onde o seu negócio provavelmente está deixando **lucro na mesa** hoje.
> Mas o diagnóstico é a primeira camada: o que de fato destrava previsibilidade é cruzar
> isso com o **seu** contexto — sua oferta, seu posicionamento e como você vende.
>
> Me conta rapidinho: **qual é o seu objetivo hoje — o que você está buscando resolver?**

*(Anexo/abaixo: o diagnóstico — PDF, resumo em texto ou link)*

---

## ✅ Versão B — Voz do time / SDR (modelo Dra. Daniele, melhorado)

Use se quem opera o WhatsApp for um SDR/atendimento, não a própria Vitória.

> Oi, {{1}}, tudo bem? Aqui é a [Nome], faço parte do time da **Vitória Daniela** 💜
>
> Seu **diagnóstico** ficou pronto — gerado com base nas respostas que você deu no quiz.
> Tá aqui 👇
>
> Ele já mostra onde tem lucro escapando do seu negócio hoje. Pra te apontar o que dá pra
> destravar primeiro (e se faz sentido a Vitória olhar o seu caso numa **análise
> estratégica**), preciso entender um pouco do seu cenário.
>
> **Posso te fazer 2 ou 3 perguntas rápidas?** Leva uns 2 minutinhos.

*(Anexo/abaixo: o diagnóstico)*

---

## Versão C — Curta (fallback / SMS ou template enxuto)

> {{1}}, seu diagnóstico do quiz tá pronto 👇 Ele mostra quanto seu negócio pode estar
> deixando na mesa em 2026. Pra te mostrar o que destravar primeiro, me diz: **qual seu
> objetivo hoje?**

---

## Versão D — Com personalização pelo perfil do quiz (opcional)

Usa `{{2}}` = perfil segmentado (*Em estruturação / Em tração / Pronto para escala*).

> Oi, {{1}}! Seu diagnóstico ficou pronto 👇
>
> Pelas suas respostas, hoje o seu negócio está no estágio **{{2}}** — e isso muda
> bastante o que faz sentido priorizar agora.
>
> Quer que eu te mostre **qual é o primeiro gargalo a resolver** no seu caso? Me responde
> aqui que eu te explico.

---

## Lembrete (caso o lead NÃO responda)

Se o lead não responder, a janela de 24h não abriu → o lembrete também precisa ser um
**template aprovado**. Sugestão (disparar ~3–4h depois, e de novo no dia seguinte):

> Oi, {{1}}! Só passando pra saber se você conseguiu ver o seu diagnóstico 👀
> Tem um ponto ali que costuma ser o que mais trava o crescimento — quer que eu te mostre
> qual é no seu caso? Me chama aqui que eu te explico.

> Depois que o lead responde, **siga com os scripts comerciais**
> (`copy/scripts-comerciais.md`): objetivo → perguntas de prospecção → convite pra
> ligação de 5 min → **agendamento da Análise Estratégica**.

---

## Checklist de implementação no GHL

- [ ] Definir o `[Nome]` de quem assina (time/SDR) e travar no corpo.
- [ ] Subir o PDF do diagnóstico e criar o template **com header de Documento** (Body
      com `{{1}}` = primeiro nome) → enviar para **aprovação da Meta**.
- [ ] (Opcional) Adicionar botão de resposta rápida **"Pode perguntar 👍"**.
- [ ] Criar o template de **lembrete** (sem resposta) e enviar para aprovação.
- [ ] Workflow GHL: gatilho = formulário do quiz enviado → enviar o template final.
- [ ] Mapear `{{1}}` (primeiro nome) e o PDF (header) no workflow.
- [ ] Lembrete automático se não houver resposta em ~3–4h e em +24h.
- [ ] Ao receber resposta, atribuir a conversa ao responsável (abre janela de 24h).

## Decisões (definidas com a Vitória — 2026-06-26)

1. **Assinatura:** time/SDR (Versão Final). ✅
2. **Diagnóstico:** **PDF no cabeçalho** do template aprovado pela Meta. ✅
3. **Personalização:** **genérico** — o diagnóstico é único. ✅
