import { ArrowRight } from "lucide-react";
import { answerLabels } from "../data/questions";
import type { LeadData } from "./LeadCaptureForm";

const GOLD = "#c8b28b";
const CARD_BG = "#292859";
const CTA_URL = "https://lp.rafaelgranella.com.br";

interface ReportScreenProps {
  leadData: LeadData;
  answers: Record<number, string>;
}

const cardStyle: React.CSSProperties = {
  backgroundColor: CARD_BG,
};

const sectionTitleStyle: React.CSSProperties = {
  fontSize: "2rem",
  fontWeight: 500,
  letterSpacing: "-0.02em",
  fontFamily: "Fahkwang, sans-serif",
  textTransform: "uppercase",
  color: GOLD,
};

const bodyTextStyle: React.CSSProperties = {
  color: "rgba(255, 255, 255, 0.85)",
  lineHeight: 1.7,
};

const Gold = ({ children }: { children: React.ReactNode }) => (
  <strong style={{ color: GOLD }}>{children}</strong>
);

function CtaButton({ label, note }: { label: string; note: string }) {
  return (
    <>
      <a
        href={CTA_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="px-10 py-4 rounded-xl transition-all shadow-lg hover:shadow-xl hover:opacity-90 inline-flex items-center gap-3"
        style={{
          fontSize: "1.125rem",
          letterSpacing: "-0.01em",
          fontWeight: 500,
          backgroundColor: GOLD,
          color: "#1c1c42",
          textDecoration: "none",
        }}
      >
        {label}
        <ArrowRight className="w-5 h-5" />
      </a>
      <p className="mt-4 text-sm" style={{ color: "rgba(200, 178, 139, 0.8)" }}>
        {note}
      </p>
    </>
  );
}

const PILLARS = [
  {
    number: "01",
    title: "Método",
    description:
      "Seu conhecimento precisa deixar de estar na sua cabeça e passar a existir como um sistema. Quando o método está estruturado, a entrega deixa de depender exclusivamente da sua presença. O cliente recebe consistência — não a versão de você no seu melhor dia. E quando o método é um sistema, ele pode ser escalado sem perder profundidade.",
  },
  {
    number: "02",
    title: "Modelo de negócio",
    description:
      "A forma como você empacota, precifica e entrega sua mentoria determina o teto do seu negócio. Sessões avulsas têm um teto. Programas fechados têm um teto diferente. Clubes e grupos bem estruturados têm outro teto completamente. O modelo certo para o seu momento não é o mais comum — é o que alinha seu estágio atual com onde você quer chegar.",
  },
  {
    number: "03",
    title: "Processo de vendas",
    description:
      "Depender de indicação e networking não é uma estratégia. É uma aposta. Quando existe um processo estruturado de aquisição — que qualifica o lead antes da call, que prepara o prospect para a decisão, que tem uma cadência de follow-up profissional — o faturamento deixa de oscilar. Você passa a ter previsibilidade. E previsibilidade é poder.",
  },
  {
    number: "04",
    title: "Mentalidade",
    description:
      "Esse é o pilar que ninguém quer falar — mas que trava mais do que qualquer ferramenta. Cobrar R$115.000 por ano exige uma identidade diferente de cobrar R$15.000. Não é sobre autoconfiança vaga. É sobre crenças específicas que operam como teto invisível — sobre o que você merece cobrar, sobre quem você pode atender, sobre o que é possível para o seu negócio. Enquanto a mentalidade não acompanha o modelo, o crescimento sempre trava antes de chegar lá.",
  },
];

const NEXT_STEP_BY_PROBLEM: Record<string, string> = {
  "Escalar sem depender só de mim":
    "Reconstruir o modelo de entrega para que ele funcione com ou sem você em cada sessão — mantendo a profundidade que diferencia seu trabalho.",
  "Previsibilidade de aquisição de clientes":
    "Estruturar um processo de aquisição que gere leads qualificados de forma previsível — sem depender de indicação ou da sua presença constante nas redes sociais.",
  "Ticket médio abaixo do que meu trabalho vale":
    "Reposicionar sua oferta e ajustar o modelo de entrega para que o ticket reflita o real valor do que você entrega — com um processo de vendas que sustente esse posicionamento.",
  "Não tenho clareza sobre qual modelo de negócio faz sentido agora":
    "Mapear o modelo de negócio correto para o seu momento — e definir o próximo movimento estratégico com clareza, sem tentar resolver tudo ao mesmo tempo.",
};

export function ReportScreen({ leadData, answers }: ReportScreenProps) {
  const getAnswer = (questionIndex: number, value: string) => {
    const optionIndex = parseInt(value) - 1;
    return answerLabels[questionIndex]?.[optionIndex] || "";
  };

  const objective = getAnswer(5, answers[5]);
  const problem = getAnswer(2, answers[2]);
  const implication = getAnswer(3, answers[3]);
  const tried = getAnswer(4, answers[4]);

  const scenarioBox = (label: string, value: string) => (
    <div
      className="p-5 rounded-xl"
      style={{
        backgroundColor: "rgba(200, 178, 139, 0.08)",
        border: "1px solid rgba(200, 178, 139, 0.2)",
      }}
    >
      <div className="text-sm mb-1" style={{ color: GOLD }}>
        {label}
      </div>
      <div className="text-white">{value}</div>
    </div>
  );

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: "#1c1c42" }}>
      <div className="max-w-4xl mx-auto pb-12">
        {/* Header */}
        <div className="rounded-3xl p-12 mb-6 shadow-xl" style={cardStyle}>
          <h1
            className="mb-4"
            style={{
              fontSize: "2.5rem",
              fontWeight: 500,
              letterSpacing: "-0.02em",
              fontFamily: "Fahkwang, sans-serif",
              textTransform: "uppercase",
              lineHeight: 1.2,
              color: GOLD,
            }}
          >
            Diagnóstico do seu negócio de mentoria
          </h1>
          <p className="text-lg mb-2" style={{ color: "rgba(255, 255, 255, 0.7)" }}>
            Elaborado com base nas suas respostas · Rafael Granella
          </p>
        </div>

        {/* Intro */}
        <div className="rounded-3xl p-10 mb-6 shadow-xl" style={cardStyle}>
          <h2 className="mb-6" style={sectionTitleStyle}>
            Olá, {leadData.name}.
          </h2>
          <div className="space-y-4" style={bodyTextStyle}>
            <p>
              Analisei suas respostas no diagnóstico e tenho algumas observações
              importantes sobre o seu negócio.
            </p>
            <p>
              Você declarou que seu principal objetivo é <Gold>{objective}</Gold>
              . E que hoje o maior gargalo que enfrenta é <Gold>{problem}</Gold>.
            </p>
            <p>Isso não é coincidência. É um padrão.</p>
            <p>
              Nos últimos anos, acompanhei dezenas de mentores, coaches e
              consultores que chegaram exatamente onde você está — com resultado
              comprovado, autoridade no nicho, agenda razoavelmente cheia — e com
              aquela sensação clara de que dá pra ir muito mais longe. Mas algo
              trava.
            </p>
            <p>
              Este relatório foi montado a partir das suas respostas. Não é
              genérico. É uma leitura do seu momento — e do que está entre você e
              o próximo nível.
            </p>
            <p>
              Leia com atenção. O que você vai encontrar aqui provavelmente vai
              nomear algo que você já sentia, mas ainda não tinha conseguido
              colocar em palavras.
            </p>
          </div>
        </div>

        {/* Leitura do cenário atual */}
        <div className="rounded-3xl p-10 mb-6 shadow-xl" style={cardStyle}>
          <h2 className="mb-6" style={sectionTitleStyle}>
            Leitura do seu cenário atual
          </h2>
          <p className="mb-6" style={bodyTextStyle}>
            Com base no que você respondeu, esse é o retrato do seu negócio hoje:
          </p>
          <div className="space-y-4 mb-8">
            {scenarioBox("Você quer", objective)}
            {scenarioBox("Seu maior gargalo", problem)}
            {scenarioBox("O que esse gargalo está custando", implication)}
            {scenarioBox("O que você já tentou", tried)}
          </div>
          <div className="space-y-4" style={bodyTextStyle}>
            <p>Quando olho para esse conjunto, vejo algo muito específico:</p>
            <p>
              Você não tem um problema de capacidade. Não tem um problema de
              entrega. Não tem um problema de resultado.
            </p>
            <p>
              <Gold>Você tem um problema de modelo.</Gold>
            </p>
            <p>
              E esse é o tipo de problema mais silencioso que existe — porque o
              negócio continua funcionando. Continua pagando as contas. Continua
              gerando resultado para os clientes.
            </p>
            <p>Mas não cresce. Não escala. Não libera.</p>
            <p>E você começa a se perguntar se o teto é você.</p>
            <p>
              <Gold>Não é.</Gold>
            </p>
          </div>
        </div>

        {/* Comparação de cenários */}
        <div className="rounded-3xl p-10 mb-6 shadow-xl" style={cardStyle}>
          <h2 className="mb-6" style={sectionTitleStyle}>
            Comparação de cenários
          </h2>
          <p className="mb-6" style={bodyTextStyle}>
            Deixa eu te mostrar dois retratos lado a lado.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div
              className="p-6 rounded-xl"
              style={{
                backgroundColor: "rgba(200, 178, 139, 0.08)",
                border: "1px solid rgba(200, 178, 139, 0.2)",
              }}
            >
              <h3 className="text-xl mb-4" style={{ color: GOLD, fontWeight: 500 }}>
                Como seu negócio opera hoje
              </h3>
              <div className="space-y-3 text-white" style={{ lineHeight: 1.7 }}>
                <p>— Cada real que entra depende de você presente na entrega</p>
                <p>
                  — Novos clientes chegam por indicação ou networking — sem
                  previsibilidade
                </p>
                <p>— Quando você para, o negócio sente</p>
                <p>
                  — O faturamento oscila conforme a sua agenda e disposição
                </p>
                <p>
                  — Escalar significa trabalhar mais — e isso tem um limite
                  físico e emocional
                </p>
                <p>— O próximo passo não está claro</p>
              </div>
            </div>
            <div
              className="p-6 rounded-xl"
              style={{
                backgroundColor: "rgba(200, 178, 139, 0.15)",
                border: "2px solid rgba(200, 178, 139, 0.4)",
              }}
            >
              <h3 className="text-xl mb-4" style={{ color: GOLD, fontWeight: 500 }}>
                Como o negócio opera quando o modelo está certo
              </h3>
              <div className="space-y-3 text-white" style={{ lineHeight: 1.7 }}>
                <p>
                  — A entrega tem método — e o método pode ser replicado,
                  escalado e sistematizado
                </p>
                <p>
                  — Novos clientes chegam por um processo estruturado — com
                  previsibilidade real
                </p>
                <p>
                  — O negócio tem inércia própria — funciona com ou sem você em
                  cada detalhe
                </p>
                <p>
                  — O faturamento cresce sem crescer proporcionalmente a carga de
                  trabalho
                </p>
                <p>
                  — Escalar é uma decisão estratégica — não uma questão de
                  resistência física
                </p>
                <p>
                  — O próximo passo é claro — e você sabe exatamente qual alavanca
                  mover
                </p>
              </div>
            </div>
          </div>
          <p className="mt-6 text-center text-lg" style={bodyTextStyle}>
            A diferença entre os dois cenários não é talento. Não é nicho. Não é
            preço. Não é volume de seguidores. <Gold>É modelo.</Gold>
          </p>
        </div>

        {/* Mentor vs empresário */}
        <div className="rounded-3xl p-10 mb-6 shadow-xl" style={cardStyle}>
          <div className="space-y-4" style={bodyTextStyle}>
            <p>
              Aqui está o que está acontecendo na estrutura do seu negócio — e
              por que mais esforço não resolve.
            </p>
            <p>
              <Gold>
                Existe uma diferença fundamental entre mentor e empresário da
                educação.
              </Gold>
            </p>
            <p>
              O mentor entrega. O empresário da educação constrói sistemas de
              entrega.
            </p>
            <p>
              Quando um profissional começa a faturar com mentoria ou
              consultoria, ele naturalmente opera como mentor — está presente em
              cada sessão, cada detalhe, cada venda. Isso funciona no início. É
              até necessário.
            </p>
            <p>O problema é quando o negócio cresce e o modelo não muda.</p>
            <p>
              <Gold>Você começa a escalar o esforço — não o negócio.</Gold>
            </p>
            <p>
              Cada novo cliente significa mais horas. Mais sessões. Mais energia.
              O faturamento sobe, mas a margem real — de tempo, de liberdade, de
              lucro líquido — não acompanha.
            </p>
            <p>E aí vem o paradoxo:</p>
            <p>
              <Gold>Você está faturando bem. Mas está preso.</Gold>
            </p>
            <p>
              Isso não acontece por falta de competência. Acontece porque o
              modelo de entrega não foi desenhado para escalar. Acontece porque o
              processo de vendas ainda depende do seu networking e da sua
              presença. Acontece porque a mentalidade ainda opera no modo
              prestador de serviço — não no modo empresário.
            </p>
            <p>
              Esses quatro pilares — método, modelo, processo de vendas e
              mentalidade — precisam se mover juntos.
            </p>
            <p>
              Quando só um deles muda, o crescimento é parcial e temporário.
            </p>
            <p>
              Você aumenta o preço mas o modelo continua o mesmo — o teto volta.
              Você cria um grupo mas a entrega fica genérica — o ticket cai. Você
              investe em tráfego mas o modelo não converte — o lead some.
            </p>
            <p>
              É por isso que o que você tentou antes funcionou parcialmente — ou
              não funcionou.
            </p>
            <p>
              <Gold>Não era culpa sua. Era o modelo.</Gold>
            </p>
          </div>
        </div>

        {/* O custo de continuar aqui */}
        <div className="rounded-3xl p-10 mb-6 shadow-xl" style={cardStyle}>
          <h2 className="mb-6" style={sectionTitleStyle}>
            O custo de continuar aqui
          </h2>
          <div className="space-y-4 mb-8" style={bodyTextStyle}>
            <p>
              Preciso ser direto com você sobre o que acontece quando esse
              cenário se arrasta.
            </p>
            <p>
              <Gold>
                Cada mês que passa operando no modelo atual é um mês de receita
                que ficou na mesa.
              </Gold>
            </p>
            <p>
              Não porque você não se esforçou. Porque o esforço estava sendo
              aplicado no lugar errado.
            </p>
            <p>Deixa eu colocar em números para ficar concreto:</p>
            <div
              className="p-6 rounded-xl my-6"
              style={{
                backgroundColor: "rgba(200, 178, 139, 0.1)",
                border: "1px solid rgba(200, 178, 139, 0.3)",
              }}
            >
              <p className="mb-3">
                Se você fatura R$50.000 por mês hoje e esse modelo te limita a
                crescer 10% ao ano — em 3 anos você vai estar em{" "}
                <Gold>R$66.500</Gold>.
              </p>
              <p>
                Se você ajusta o modelo agora e passa a crescer 30% ao ano — em 3
                anos você está em <Gold>R$110.000 por mês</Gold>.
              </p>
              <p className="mt-3">
                <Gold>A diferença não é de esforço. É de estrutura.</Gold>
              </p>
            </div>
            <p>Mas tem um custo que não aparece em planilha:</p>
            <p>
              O custo de continuar sendo o gargalo do próprio negócio. De não
              conseguir tirar férias de verdade. De sentir que o crescimento
              depende da sua disposição física e emocional em cada mês.
            </p>
            <p>
              <Gold>Esse custo é real. E ele se acumula.</Gold>
            </p>
            <p>
              Mentores que chegam ao patamar que você está — e ficam anos
              operando no mesmo modelo — normalmente não saem dali por falta de
              capacidade. Saem por cansaço. Ou param de crescer e se convencem de
              que esse é o limite.
            </p>
            <p>
              <Gold>Não é.</Gold>
            </p>
          </div>
          <div className="text-center">
            <CtaButton
              label="Agendar minha sessão estratégica"
              note="Análise individual do seu negócio com o time do Rafael — sem pitch, sem fórmula genérica"
            />
          </div>
        </div>

        {/* Solução */}
        <div className="rounded-3xl p-10 mb-6 shadow-xl" style={cardStyle}>
          <h2 className="mb-6" style={sectionTitleStyle}>
            SOLUÇÃO
          </h2>
          <p className="mb-8" style={bodyTextStyle}>
            Existe um modelo diferente. E ele não é novo — é o que separa
            mentores que chegam a 100k, 200k, 500k por mês daqueles que ficam
            oscilando entre 30 e 80k por anos.
          </p>
          <p className="mb-8" style={bodyTextStyle}>
            A transição de mentor para empresário da educação acontece em quatro
            frentes simultâneas:
          </p>
          <div className="space-y-6">
            {PILLARS.map((pillar) => (
              <div
                key={pillar.number}
                className="p-6 rounded-xl"
                style={{
                  backgroundColor: "rgba(200, 178, 139, 0.08)",
                  border: "1px solid rgba(200, 178, 139, 0.2)",
                }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="text-2xl flex-shrink-0"
                    style={{
                      color: GOLD,
                      fontWeight: 600,
                      fontFamily: "Fahkwang, sans-serif",
                    }}
                  >
                    {pillar.number}
                  </div>
                  <div>
                    <h3
                      className="text-xl mb-3"
                      style={{
                        color: GOLD,
                        letterSpacing: "-0.01em",
                        fontWeight: 500,
                      }}
                    >
                      {pillar.title}
                    </h3>
                    <p style={bodyTextStyle}>{pillar.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-8" style={bodyTextStyle}>
            Quando esses quatro pilares se movem juntos — e só quando se movem
            juntos — o crescimento passa a ter uma lógica diferente. Não é mais
            sobre trabalhar mais. <Gold>É sobre operar de forma diferente.</Gold>
          </p>
        </div>

        {/* O que precisa acontecer */}
        <div className="rounded-3xl p-10 mb-6 shadow-xl" style={cardStyle}>
          <h2 className="mb-6" style={sectionTitleStyle}>
            O que precisa acontecer no seu negócio
          </h2>
          <div className="space-y-4" style={bodyTextStyle}>
            <p>Com base no seu cenário, o próximo passo lógico para você é:</p>
            <div
              className="p-6 rounded-xl my-6"
              style={{
                backgroundColor: "rgba(200, 178, 139, 0.1)",
                border: "1px solid rgba(200, 178, 139, 0.3)",
              }}
            >
              <p className="text-lg" style={{ color: GOLD, fontWeight: 500 }}>
                {NEXT_STEP_BY_PROBLEM[problem]}
              </p>
            </div>
            <p>O que eu não vou te dizer aqui é como implementar isso.</p>
            <p>
              Não porque quero esconder informação. Porque a implementação
              correta depende de variáveis específicas do seu negócio — seu
              nicho, seu estágio, seu modelo atual, seus recursos disponíveis.
            </p>
            <p>Uma orientação genérica aqui seria mais prejudicial do que útil.</p>
            <p>
              <Gold>É por isso que existe a sessão estratégica.</Gold>
            </p>
          </div>
          <div className="text-center mt-8">
            <CtaButton
              label="Agendar minha sessão estratégica"
              note="30 minutos. Análise do seu caso específico. Sem compromisso."
            />
          </div>
        </div>

        {/* Próximo passo */}
        <div className="rounded-3xl p-10 mb-6 shadow-xl" style={cardStyle}>
          <h2 className="mb-6" style={sectionTitleStyle}>
            Próximo passo
          </h2>
          <div className="space-y-4 mb-8" style={bodyTextStyle}>
            <p>
              {leadData.name}, com base no que você respondeu e no que analisei
              aqui — você está em um momento específico da jornada.
            </p>
            <p>
              <Gold>Não no início. Não no topo ainda. No ponto de inflexão.</Gold>
            </p>
            <p>
              É o estágio mais crítico — e o mais fértil. Porque você já tem o
              ativo mais difícil de construir: a capacidade de entregar resultado
              real.
            </p>
            <p>
              O que falta é o modelo que coloca esse ativo para trabalhar de
              forma diferente.
            </p>
            <p className="mt-6 mb-4">
              <Gold>Na sessão estratégica, o time do Rafael vai analisar:</Gold>
            </p>
            <div className="space-y-3">
              {[
                "Seu modelo atual de entrega e precificação",
                "O gargalo principal que está limitando seu crescimento",
                "O próximo movimento estratégico mais adequado para o seu momento",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <div
                    className="w-1.5 h-1.5 rounded-full mt-2.5 flex-shrink-0"
                    style={{ backgroundColor: GOLD }}
                  />
                  <p>{item}</p>
                </div>
              ))}
            </div>
            <p className="mt-6">
              Não é uma call de vendas. Não tem pitch no final. É uma análise
              real — do seu negócio, do seu momento, do seu próximo passo.
            </p>
            <p>
              <Gold>
                Com ou sem continuidade no Alivance, você sai da sessão com mais
                clareza do que entrou.
              </Gold>
            </p>
            <div
              className="p-6 rounded-xl mt-6"
              style={{
                backgroundColor: "rgba(200, 178, 139, 0.1)",
                border: "1px solid rgba(200, 178, 139, 0.3)",
              }}
            >
              <p className="text-sm" style={{ color: "rgba(255, 255, 255, 0.7)" }}>
                <Gold>Vagas disponíveis este mês:</Gold> o Rafael acompanha no
                máximo 12 novos membros por ciclo. Não por limitação operacional
                — por escolha. Cada membro recebe atenção individual. Quando as
                vagas fecham, fecham.
              </p>
            </div>
          </div>
          <div className="text-center">
            <CtaButton
              label="Quero agendar minha sessão estratégica"
              note="Clique no botão acima e escolha o melhor horário disponível. A sessão é gratuita. Sem compromisso. Sem pitch genérico."
            />
          </div>
        </div>

        {/* Footer */}
        <div
          className="text-center pt-8"
          style={{ borderTop: "1px solid rgba(200, 178, 139, 0.2)" }}
        >
          <p className="mb-2" style={{ color: "rgba(255, 255, 255, 0.7)" }}>
            Diagnóstico elaborado pelo time do Rafael Granella · Alivance Club
          </p>
          <p className="text-sm mb-4" style={{ color: "rgba(255, 255, 255, 0.5)" }}>
            Este relatório foi gerado com base nas suas respostas e é de uso
            exclusivo de {leadData.name}.
          </p>
          <p className="text-xs" style={{ color: "rgba(255, 255, 255, 0.4)" }}>
            © Alivance Club · Todos os direitos reservados
          </p>
        </div>
      </div>
    </div>
  );
}
