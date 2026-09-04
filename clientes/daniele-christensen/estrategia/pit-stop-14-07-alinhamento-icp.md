# Pit Stop 14/07/26 — desalinhamento de ICP no funil

> Origem: call "Simple & Daniele Christensen | Pit Stop Quinzenal" (14/07/26),
> com Renan Martini e Carlos Durães (Simple Acc) e Priscila (Grokker), Orlando
> Gomez (SDR) e Carolina Falci (closer/especialista) do lado da cliente.
> Anotações completas do Gemini fornecidas pelo Daniel; cruzadas aqui com os
> dados reais da `[Simple Acc] Grokker Desenvolvimento - Planilha de Leads`
> (176 respostas do quiz até 14/07/26).

## O que a equipe da Dani relatou

- **Orlando (SDR):** boa parte dos leads chega "fria" — preenche o quiz sem
  atenção, sem intenção real de avançar. Nas reuniões que aconteceram, a
  maioria foi desqualificada.
- **Carolina (closer/especialista):** os leads que ela atendeu tinham
  consciência e necessidade reais — mas descompasso financeiro claro. Exemplo
  citado: gerente de açougue ganhando R$3.000/mês + bonificação, outro
  ganhando R$5.500/mês com 12 dias de cargo. Ninguém tinha autonomia
  financeira própria para pagar ~R$2.000/mês (parcela do Intensity) — o
  padrão de resposta era "vocês fazem convênio com minha empresa?".
- **Priscila:** confirma que o padrão vem desde o início do projeto — cargos
  de gerência/liderança "mais iniciais", muita gente de supermercado, açougue
  e restaurante. O quiz pergunta sobre faturamento da **empresa**, não sobre
  remuneração da **pessoa** — e é aí que mora o problema.
- **Decisão do grupo:** (1) reformular a comunicação (copy + criativo) porque
  o Meta não permite mais segmentar com a precisão de cargo/faturamento que
  permitia há alguns anos — o filtro tem que acontecer na mensagem, não no
  público; (2) adicionar/ajustar pergunta do quiz para capturar remuneração
  pessoal, não só faturamento da empresa (Orlando ficou de sugerir as
  perguntas).

## O que os dados confirmam

Cruzando as 176 respostas do quiz (`Planilha de Leads`) por pergunta:

| Pergunta 1 — cargo | Qtde | % |
|---|---|---|
| Dono ou sócio | 12 | 6,8% |
| Diretor ou gerente com autonomia | 28 | 15,9% |
| **Tomador de decisão real (soma acima)** | **40** | **22,7%** |
| Gestor, autonomia parcial | 82 | 46,6% |
| Recém-promovido, quase sem autonomia | 54 | 30,7% |
| **Sem autonomia plena (soma acima)** | **136** | **77,3%** |

| Pergunta 6 — faturamento da empresa | Qtde | % |
|---|---|---|
| ≥ R$100 mil/mês | 124 | 70,5% |
| < R$100 mil/mês | 52 | 29,5% |

**Conclusão:** a pergunta de faturamento da empresa já filtra razoavelmente
bem (70% reportam ≥R$100k) — **o vazamento real está no cargo/autonomia**.
77% dos leads não têm autonomia decisória plena. É exatamente o perfil
"gerente de açougue/mercado/restaurante" que a Carol e a Priscila descreveram:
empresa pode faturar bem, mas quem responde o quiz é um gerente operacional
sem orçamento próprio nem poder de decisão — daí o "deixa eu pedir pra minha
empresa bancar".

## Gap adicional encontrado (fora da call): a LP contradiz o filtro desejado

A versão de anúncios/LP "18.05" (aprovada, em `copy/landing-page-sessao-diagnostica.md`)
tem este bloco de qualificação:

> ✅ Essa sessão é para você se: Você é dono, sócio, CEO, **Gerente, Supervisor
> ou Coordenador** de uma empresa...

Isso convida explicitamente o perfil que está sendo desqualificado na
prática. Se o anúncio filtrar bem, mas a página aceitar "Gerente, Supervisor
ou Coordenador" como público-alvo, a página anula o filtro do anúncio.
**Recomendação para o time:** restringir esse bloco da LP a dono/sócio/diretor
com responsabilidade direta sobre pessoas e resultado, tirando "Gerente,
Supervisor ou Coordenador" da lista de quem a sessão é para. Isso não foi
alterado neste PR (fica fora do escopo de mudar o funil ao vivo sem validação
do time da Dani) — só documentado para o próximo ajuste combinado na call.

## Ação tomada aqui

Nova leva de anúncios em `copy/anuncios-meta-v2-icp-diretor-socio.md`,
desenhada para pré-filtrar por cargo (dono/sócio/diretor) e porte
(empresa ≥R$100k/mês) diretamente no criativo/copy — já que o Meta não
permite mais esse nível de segmentação por interesse. Mantém a mesma
promessa do quiz/LP atuais (Diagnóstico de Liderança gratuito), só torna o
gancho mais seletivo.

## Sugestão de pergunta nova para o quiz (para validar com Orlando/Priscila)

Pergunta adicional (ou substituindo a atual pergunta 6, que já existe e
funciona bem para filtrar porte de empresa):

**"Qual é a sua remuneração média mensal (pró-labore/salário), sem contar o
faturamento da empresa?"**
- Até R$5.000
- De R$5.000 a R$10.000
- De R$10.000 a R$20.000
- Acima de R$20.000

Isso separa "empresa grande, mas eu ganho pouco e não decido sozinho" de
"eu tenho renda e autonomia pra decidir por mim". Ficou combinado que Orlando
traria sugestões de pergunta ao time; esta é uma proposta pronta para
avaliação — não foi implementada no quiz em produção.

## Outras ações operacionais combinadas (fora do escopo de copy, registradas para contexto)

- Cadência de ligação mais agressiva (3–4 tentativas seguidas nos primeiros
  dias — "estratégia de quem morreu").
- Criar grupo de WhatsApp (lead + Orlando + Carol) para reduzir no-show
  (~70% na semana da call).
- Migrar contato de WhatsApp Web para API oficial com templates aprovados —
  números pessoais estão sendo bloqueados como spam.
- Adotar Forcom (DDD dinâmico, sem custo fixo) como paliativo até o novo
  discador da Pulsar (previsto para o fim do mês).
