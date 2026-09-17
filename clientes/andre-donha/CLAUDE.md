# Cliente: André Donha (Musikalis)

Esta pasta é a **base de conhecimento** do cliente André Donha. Tudo que a Simple Acc
faz para ele acumula aqui — e qualquer pessoa, de qualquer máquina, continua de onde
o outro parou (o Git é a memória compartilhada).

## Como se orientar nesta pasta

- `contexto/`   — quem é, oferta, ICP, análise de mercado, linguagem do público.
- `estrategia/` — estratégias, planos e diagnósticos.
- `copy/`       — copy de páginas e de anúncios/criativos.
- `roteiros/`   — roteiros de vídeo (datados).
- `funis/`      — funis, landing pages e quizzes que publicam.
- `aprendizados.md` — o que funciona/não funciona (atualize sempre).

## Ao trabalhar para este cliente

1. **Antes de criar**, leia `contexto/` e `aprendizados.md` para não recomeçar do zero.
2. Para gerar funil/página/anúncios, rode **`/prompt-mestre`** — ele já usa o contexto daqui.
3. Salve os entregáveis na pasta certa (acima) e **registre o aprendizado** em `aprendizados.md`.
4. Trabalhe numa branch `cliente/andre-donha/<assunto>` e abra PR.

## Contexto rápido

- **Quem é:** André Donha, ~50 anos, São Paulo. Engenheiro de formação, mestrado na Espanha,
  passou por indústria de petróleo e Accenture. Sócio-fundador da **Vaartus** (consultoria B2B
  de estratégia, gestão e M&A — Porto Seguro, Steck/Schneider, Equatorial, Indra na carteira).
  A Musikalis é o negócio digital dele, movido a paixão pela música.
- **Produto (Musikalis):** ecossistema de **gestão de produção musical** — plataforma SaaS com
  IA proprietária + **Musikalis Academy** (cursos e certificações) + **rede de networking
  qualificada** + **metodologia D-90** (o PMBOK/PMI traduzido para produção musical: 10 áreas de
  conhecimento viram operação, orçamento, palco, marketing etc.).
  Certificações: **GPM** (Gestor de Produção Musikalis, 12h) e **MPM** (Mentor, +4h).
- **Dor central do mercado (a tese dele):** o gestor de produção **viabiliza o show inteiro e
  fica com a menor fatia do dinheiro**. Duas frases que ele usa como âncora: *"sempre que alguém
  toca, alguém ganha"* (John Kellogg, Berklee) × *"sempre que você tocar, você será pago"*
  (Daniel Ek, Spotify — que na prática diluiu o pagamento).
- **Big idea (definida no roadmap de 07/09):** **"A produção não quebra no dia do show. Ela quebra 90 dias antes."**
  Inimigo nomeado: **o custo do D-0**, a produção que só existe no dia. Virada: **de produtor D-0 a
  produtor D-90**. A frase "Como ganhar R$ 10 mil/mês como músico" continua válida no workshop e na
  conversa, mas **é proibida em anúncio pago** (a Meta lê como promessa de ganho).
- **Funil decidido (roadmap de 07/09):** anúncio → **Diagnóstico de Margem** (quiz gratuito de 9
  perguntas, devolve o índice D-90 de 0 a 100 e o elo dominante) → página de diagnóstico → **vaga no
  workshop** → oferta do GPM no fim da aula. O quiz **substitui o onboarding da plataforma** a partir
  do dia 45.
- **Esteira dos 90 dias:** carro-chefe **GPM, certificação de Gestor de Produção Musikalis, R$ 1.497**
  (12h ao vivo, turma de 10 a 12, certificado + 3 meses de Pro) · porta lateral **Mentoria de Produção,
  R$ 5 mil a R$ 20 mil** (só na conversa) · não ICP **Musikalis Pro, R$ 49,90/mês ou R$ 397/ano**.
  Nada de MPM, white label, marketplace, Intelligence ou plataforma Vaartus nos 90 dias.
  **O R$ 9,90 e o R$ 997 da call de vendas foram substituídos por essa esteira** (ver a justificativa
  na página 2 do roadmap: a R$ 180 a turma cheia não paga a mídia que a encheu).
- **Meta dos 90 dias:** 20 matrículas, perto de R$ 30 mil no trimestre, com o mês 3 rodando a R$ 20 mil.
  Régua de mídia: custo por matrícula abaixo de R$ 350.
- **Público / ICP:** o músico/produtor **"nível 1 e 2"** — quem hoje tira **R$ 200 por produção**
  e quer tirar R$ 2 mil; quem é músico e quer migrar para produção; quem já produz mas não
  destrava. **De propósito fora:** o produtor consagrado (quem já produz Jota Quest, Barão
  Vermelho) — não vê valor na ferramenta. Estimativa que ele cita: ~8 milhões de músicos no Brasil.
- **Sonho do avatar:** ser um gestor de produção reconhecido e concorrido, **vivendo só de música**.
  **Medo:** não conseguir viver de música, investir e não ter retorno, montar show que não se paga.
  **Como não quer ser visto:** como o profissional de baixo valor da produção.
- **Escopo da Simple:** **todo o tráfego pago** (copy + criativos + gestão), que é justamente a
  lacuna de execução dele. CRM: conta de agência da Simple no **GoHighLevel** (R$ 97/mês).
  **Bônus combinado:** consultoria para escalar a Vaartus no digital.
- **Comercial (fechado em 26/08):** setup **R$ 5 mil** (parcelado no cartão) + **R$ 2 mil/mês
  por 60 dias** + **R$ 6 mil** ao final dos 60 dias + **5% de participação nos lucros** da Musikalis.
- **Restrição real dele:** fluxo de caixa pessoal imprevisível — custo fixo alto e a faculdade de
  medicina da filha em Coimbra (€ 18 mil/ano). O modelo flexível de pagamento existe por causa disso.
- **Contato principal:** André Donha. Gestor do projeto pela Simple: Carlos Durães.

> **Antes de qualquer entrega, leia `contexto/2026-09-01-briefing-andre-donha.md`** — é a
> síntese com números, decisões e o que ainda está em aberto. As fontes brutas são
> `contexto/2026-08-26-call-de-vendas-resumo-e-transcricao.md` e
> `contexto/2026-08-27-canvas-produto-e-cliente-ideal.md`.
>
> **Como conduzir o André:** ele fala muito, gosta de conversa longa e detesta atendimento
> roteirizado/robô — pede explicitamente para ser ouvido. Em compensação, decide rápido e
> aceita direcionamento forte. Ele tende a **querer resolver o ecossistema inteiro de uma vez**;
> nosso papel é cortar escopo: uma oferta por vez, funil simples primeiro.
