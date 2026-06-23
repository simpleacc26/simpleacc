# Material para o Daniel — os 3 passos (Carol e José)

> Entrega da equipe (Carlos + Renan) para o Daniel **lapidar e enviar a Carol e
> José**. Contém só o que ele pediu: **(1) diagnóstico · (2) plano de caixa
> rápido · (3) nova ideia de funil**. Base de dados: lista autoritativa dos
> **76 MQLs**.

---

## Passo 1 — Diagnóstico

### O gap, em uma frase

O dinheiro não está vazando na geração de lead — está vazando **entre o quiz e o
comercial**. Entraram **76 MQLs reais (faturamento > R$ 1M), todos com nome,
e-mail e WhatsApp**, e eles **nunca chegaram ao GHL / nunca foram contatados**.

### A prova (lista dos 76, dados limpos)

- **76 MQLs**, todos > R$ 1M, **100% com contato completo** (nome + e-mail + WhatsApp).
- **66 dentro do ICP** (excluindo 10 de indústria, que a Carol não atende).
- **26 são ICP + decisor** (dono/sócio ou diretor com autonomia) — o alvo mais quente.

| Faturamento | Leads | Setor | Leads | Cargo | Leads |
| --- | ---: | --- | ---: | --- | ---: |
| Acima de R$ 5M | 33 | Serviços | 37 | Gestor c/ autonomia parcial | 27 |
| R$ 1M – 3M | 28 | Comércio | 29 | Promovido / pouca autonomia | 19 |
| R$ 3M – 5M | 15 | Indústria (excluir) | 10 | Diretor c/ autonomia | 15 |
| | | | | Dono ou sócio | 15 |

### Causa-raiz (verificar)

No arquivo dos 76, o contato está gravado nos campos `e02yKB/Oen6ic/UX3WQn` e
**nenhum** dos 76 usou o campo de contato primário. O formulário do público
> R$ 1M parece gravar o contato num **conjunto de campos não mapeado para o
GHL** — o que explica "leads que nunca receberam mensagem" e bate com a falha
InLead→GHL já vista em 17/06. **Verificação técnica nº 1 antes de subir qualquer
campanha.**

### Quem realmente compra (ICP, do canvas do cliente)

Dono de empresa consolidada, **fatura ~R$ 2M/ano**, retira ~R$ 30k/mês, eixo
**Sul-Sudeste**. Dores: é o "bombeiro de luxo" (apaga incêndio o dia todo),
**dependência total** dele, **margem magra**, sem tempo para a família. Quer
processos que rodem sem ele, margem maior sem dobrar faturamento e time com "olho
de dono". **Decisor** (dono/sócio), não funcionário.

### Ressalva honesta

Faturamento é autodeclarado e por faixa — parte de quem marca "> R$ 5M" é
funcionário reportando o faturamento da empresa ou perfil sem rastro. Por isso
**não usamos média/mediana** (não é significativa em dado declarado e enviesado);
priorizamos por **cargo** (decisor) e **validamos uma amostra** antes de escalar.

---

## Passo 2 — Plano de caixa rápido

Quatro frentes, da mais rápida para a mais estrutural:

1. **Reativar os 76 MQLs** (começar pelos **26 ICP + decisor**). Eles têm
   WhatsApp e e-mail e nunca foram trabalhados. Abordagem honesta de
   "reabertura" (sem fingir que é contato novo), com um motivo concreto para a
   conversa. Validar uma amostra de 8–10 antes de disparar para todos.
2. **Workshop com a base → curso gravado.** A Carol roda um workshop ao vivo com
   a base e transforma em produto gravado de ticket menor — entrada de caixa
   rápida e ativo reutilizável.
3. **Oferta de expansão de valor para clientes ativos.** Olhar a base de clientes
   de hoje e desenhar uma oferta personalizada de upsell/expansão (aumentar LTV
   de quem já confia).
4. **Indicação (modelo Fusseus).** Estruturar pedido de indicação com os clientes
   atuais, usando o modelo já mapeado.

> Frentes 1, 2 e 4 dependem da Carol no comercial; a Simple entrega a base
> tratada dos 76 no GHL e o suporte de automação/disparo.

---

## Passo 3 — Nova ideia de funil

### Princípio

O funil tem que **falar com o executivo/dono** e **entregar o contato dele ao
comercial**. Hoje falha nos dois: comunicação aberta demais e captura que não
chega ao GHL.

### O que muda

1. **Corrigir a captura (a base de tudo):** unificar o contato num **único campo
   mapeado** ao GHL e validar a integração ponta a ponta. Sem isso, qualquer
   tráfego novo repete o vazamento.
2. **Mirar no dono da empresa:** abertura do quiz que **exclui quem não é
   decisor** logo na primeira pergunta (ex.: "Você é dono/sócio, diretor ou
   funcionário?") — modelando o que os concorrentes que já vendem para esse
   público fazem.
3. **Ancorar o faturamento à posição:** perguntar o faturamento **do negócio do
   qual a pessoa é dona/decisora**, não "da empresa onde trabalha" — corta o
   funcionário que infla a faixa.
4. **Redirecionar < R$ 1M para a comunidade gratuita** (não polui o pixel, não
   gasta tempo do comercial) — decisão já tomada em 17/06.
5. **Reposicionar a comunicação** na dor real do ICP (do canvas): negócio
   dependente do dono, margem magra, sobrecarga — não "liderança" genérica.

### Pesquisa concorrencial (insumo)

Olhar a **biblioteca de anúncios** dos concorrentes que vendem para esse público
(Craft, G4, Empire Club, consultorias) e modelar gancho e narrativa a partir do
que já funciona com decisor de alto faturamento.

### 1ª versão do quiz (rascunho para o Daniel lapidar)

Direção proposta — "Diagnóstico de Maturidade do Negócio":

1. **Filtro de decisor:** "Qual é o seu papel no negócio?" → Dono/sócio ·
   Diretor com autonomia · Gestor · Funcionário *(funcionário → comunidade)*.
2. **Faturamento ancorado:** "Qual o faturamento anual **do seu negócio**?"
   *(< R$ 1M → comunidade)*.
3. **Setor:** Serviços · Comércio · Indústria *(indústria → trilha à parte)*.
4–8. **Dores de liderança** (já existentes no quiz atual, mantidas): dependência
   do dono, autonomia do time, margem vs. crescimento, gargalo, momento da
   empresa.
9. **Captura única e mapeada:** nome + WhatsApp + e-mail num só passo, com tag
   automática de faixa/cargo no GHL.
10. **Entrega:** diagnóstico personalizado por respostas + redirecionamento ao
    WhatsApp ao concluir.
