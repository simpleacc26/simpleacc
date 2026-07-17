# Cliente: Pâmella Mello

Esta pasta é a **base de conhecimento** do cliente Pâmella Mello. Tudo que a SimpleAcc
faz para ela acumula aqui — e qualquer pessoa, de qualquer máquina, continua de
onde o outro parou (o Git é a memória compartilhada).

## Como se orientar nesta pasta

- `contexto/`   — dossiê da cliente, onboarding, canvas de cliente ideal, unit economics.
- `estrategia/` — Big Idea, copy do quiz/página/anúncios, cadência de follow-up (documento aprovado).
- `copy/`       — copy de páginas e de anúncios/criativos (fora do doc de estratégia, se houver).
- `roteiros/`   — roteiros de vídeo (datados).
- `funis/`      — funil de quiz + diagnóstico que está no ar (código-fonte + README de deploy).
- `aprendizados.md` — o que funciona/não funciona (atualize sempre).

## Ao trabalhar para este cliente

1. **Antes de criar**, leia `contexto/` e `aprendizados.md` para não recomeçar do zero.
2. Para gerar funil/página/anúncios, rode **`/prompt-mestre`** — ele já usa o contexto daqui.
3. Salve os entregáveis na pasta certa (acima) e **registre o aprendizado** em `aprendizados.md`.
4. Trabalhe numa branch `cliente/pamella-mello/<assunto>` e abra PR.
5. **Atenção:** o projeto do funil na Vercel não está conectado a este repositório Git
   (veja `funis/funil-pamella-mello/README.md`). Depois de editar o código do funil aqui,
   é preciso reimplantar manualmente na Vercel.

## Contexto rápido

- **Negócio:** Clínica de hipnoterapia clínica + neurociência (Contagem/BH-MG). Presencial
  (~70%, raio 40-50km) + online Brasil (~30%).
- **Carro-chefe:** protocolo terapêutico de 3 meses, ticket R$3.500-4.000. Porta de entrada:
  Sessão de Avaliação R$150.
- **Meta:** sair de ~R$30k/mês para R$80-90k/mês com previsibilidade (ver matemática da
  meta em `contexto/`).
- **Perfil da decisora:** racional, cética, conservadora financeiramente. Não compra hype —
  compra risco controlado. Argumentos em número e caminho lógico, nunca promessa.
- **Diagnóstico central:** o problema não é tráfego (R$2k/mês já gera ~R$45k contratados).
  É falta de qualificação de leads — ICP amplo demais atrai "curiosos", não quem pode/quer
  pagar o protocolo.
- **Links (site, páginas, Make, Drive):**
  - Funil: https://quiz.pamellamellohipnoterapia.com.br (alias: funil-pamella-mello.vercel.app)
  - Drive: pasta "Simple <> Pâmella Mello"
  - Leads: webhook do Make → planilha "Planilha de Leads - Pâmella Mello (Funil Hipnose)"
- **Contato principal:** Pâmella Mello (proprietária, sem sócios).
