import { ArrowRight } from "lucide-react";
import { answerLabels } from "../data/questions";
import { COLORS, accentSoft, displayHeading } from "../theme";
import type { LeadData } from "./LeadCaptureForm";

const WHATSAPP_URL =
  import.meta.env.VITE_WHATSAPP_URL || "https://wa.me/5531000000000";

interface ReportScreenProps {
  leadData: LeadData;
  answers: Record<number, string>;
}

const cardStyle: React.CSSProperties = { backgroundColor: COLORS.card };
const sectionTitleStyle: React.CSSProperties = {
  ...displayHeading,
  fontSize: "clamp(1.4rem, 3vw, 1.85rem)",
};
const bodyTextStyle: React.CSSProperties = {
  color: COLORS.textBody,
  lineHeight: 1.75,
};

const Gold = ({ children }: { children: React.ReactNode }) => (
  <strong style={{ color: COLORS.accent }}>{children}</strong>
);

function waLink(message: string): string {
  const sep = WHATSAPP_URL.includes("?") ? "&" : "?";
  return `${WHATSAPP_URL}${sep}text=${encodeURIComponent(message)}`;
}

function CtaButton({ label, note, message }: { label: string; note: string; message: string }) {
  return (
    <>
      <a
        href={waLink(message)}
        target="_blank"
        rel="noopener noreferrer"
        className="px-9 py-4 rounded-xl transition-all shadow-lg hover:shadow-xl hover:opacity-90 inline-flex items-center gap-3"
        style={{
          fontSize: "1.075rem",
          letterSpacing: "-0.01em",
          fontWeight: 500,
          backgroundColor: COLORS.accent,
          color: COLORS.bg,
          textDecoration: "none",
        }}
      >
        {label}
        <ArrowRight className="w-5 h-5" />
      </a>
      <p className="mt-4 text-sm" style={{ color: accentSoft(0.85) }}>
        {note}
      </p>
    </>
  );
}

const SOLUTION_STEPS = [
  {
    number: "01",
    title: "Investigação da origem",
    description:
      "Identificamos os gatilhos, memórias e crenças inconscientes que sustentam o padrão — com hipnoterapia clínica, neurociência e análise dos padrões emocionais.",
  },
  {
    number: "02",
    title: "Consciência",
    description:
      "Você passa a enxergar com clareza os padrões automáticos que antes operavam no escuro.",
  },
  {
    number: "03",
    title: "Ressignificação",
    description:
      "Acessamos e reorganizamos as experiências emocionais que alimentam o sofrimento atual.",
  },
  {
    number: "04",
    title: "Reprogramação emocional",
    description:
      "Desenvolvemos novas respostas emocionais e comportamentais — para que o padrão pare de se repetir, de forma sustentável.",
  },
];

export function ReportScreen({ leadData, answers }: ReportScreenProps) {
  const label = (questionIndex: number) => {
    const value = answers[questionIndex];
    if (!value) return "";
    return answerLabels[questionIndex]?.[parseInt(value) - 1] || "";
  };

  const situacao = label(0);
  const problema = label(1);
  const tempo = label(2);
  const area = label(3);
  const tentativa = label(4);
  const objetivo = label(5);

  const geografia = answers[7]; // 7b
  const prontidao = answers[8]; // 7c

  // Lógica de qualificação (doc de Estratégia):
  // 7c (A/B) + 7b (A/B/C) = qualificado; 7c (C/D) = nutrição; 7b (D) = fora do escopo.
  const isOutOfBrazil = geografia === "4";
  const isReady = prontidao === "1" || prontidao === "2";
  const isQualified = isReady && (geografia === "1" || geografia === "2" || geografia === "3");

  const modality = geografia === "1" ? "presencial em Contagem/BH" : "online";

  const scenarioBox = (boxLabel: string, value: string) => (
    <div
      className="p-5 rounded-xl"
      style={{ backgroundColor: accentSoft(0.08), border: `1px solid ${accentSoft(0.2)}` }}
    >
      <div className="text-sm mb-1" style={{ color: COLORS.accent }}>
        {boxLabel}
      </div>
      <div className="text-white">{value}</div>
    </div>
  );

  // CTA adaptado ao nível de qualificação.
  let cta: { label: string; note: string; message: string };
  if (isOutOfBrazil) {
    cta = {
      label: "Falar com a equipe da clínica",
      note: "Atualmente o atendimento é presencial em Contagem/BH e online para todo o Brasil.",
      message: `Olá! Fiz a leitura emocional no site (meu nome é ${leadData.name}) e gostaria de entender as opções de atendimento.`,
    };
  } else if (isQualified) {
    cta = {
      label: "Quero agendar minha Sessão de Avaliação",
      note: `Atendimento ${modality}, individual e confidencial. A avaliação já te entrega clareza — sem compromisso de seguir.`,
      message: `Olá! Fiz a leitura emocional no site (meu nome é ${leadData.name}) e quero agendar minha Sessão de Avaliação.`,
    };
  } else {
    cta = {
      label: "Quero entender melhor como funciona",
      note: "Sem compromisso. Nossa equipe te explica o método e tira suas dúvidas no seu tempo.",
      message: `Olá! Fiz a leitura emocional no site (meu nome é ${leadData.name}) e gostaria de entender melhor como funciona o acompanhamento.`,
    };
  }

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: COLORS.bg }}>
      <div className="max-w-4xl mx-auto pb-12">
        {/* Header */}
        <div className="rounded-3xl p-10 sm:p-12 mb-6 shadow-xl" style={cardStyle}>
          <h1 className="mb-3" style={{ ...displayHeading, fontSize: "clamp(1.8rem, 4vw, 2.4rem)" }}>
            Sua leitura emocional
          </h1>
          <p className="text-lg" style={{ color: COLORS.textMuted }}>
            Elaborada com base nas suas respostas · Clínica Pâmella Mello
          </p>
        </div>

        {/* Abertura personalizada */}
        <div className="rounded-3xl p-8 sm:p-10 mb-6 shadow-xl" style={cardStyle}>
          <h2 className="mb-6" style={sectionTitleStyle}>
            {leadData.name}, obrigada por olhar pra dentro.
          </h2>
          <div className="space-y-4" style={bodyTextStyle}>
            <p>
              Pelo que você respondeu, seu momento hoje é de <Gold>{situacao.toLowerCase()}</Gold>,
              e o que mais pesa é: <Gold>{problema.toLowerCase()}</Gold>.
            </p>
            <p>
              Você não está sozinho(a) nisso — e, mais importante, isso tem uma
              explicação que vai além de "força de vontade".
            </p>
          </div>
        </div>

        {/* Leitura do cenário */}
        <div className="rounded-3xl p-8 sm:p-10 mb-6 shadow-xl" style={cardStyle}>
          <h2 className="mb-6" style={sectionTitleStyle}>
            Leitura do seu cenário
          </h2>
          <div className="space-y-4 mb-8">
            {scenarioBox("Seu momento hoje", situacao)}
            {scenarioBox("O que mais pesa", problema)}
            {scenarioBox("Há quanto tempo", tempo)}
            {scenarioBox("O que isso já afetou", area)}
            {scenarioBox("O que você já tentou", tentativa)}
          </div>
          <div className="space-y-4" style={bodyTextStyle}>
            <p>
              Você convive com isso há <Gold>{tempo.toLowerCase()}</Gold> e já
              percebeu o impacto em <Gold>{area.toLowerCase()}</Gold>. Quando um
              padrão emocional se mantém por esse tempo, ele deixa de parecer um
              problema e passa a parecer "o seu jeito".
            </p>
            <p>
              <Gold>Não é.</Gold> É um padrão aprendido — e o que é aprendido
              pode ser ressignificado.
            </p>
          </div>
        </div>

        {/* O mecanismo do problema */}
        <div className="rounded-3xl p-8 sm:p-10 mb-6 shadow-xl" style={cardStyle}>
          <h2 className="mb-6" style={sectionTitleStyle}>
            Por que ainda não resolveu
          </h2>
          <div className="space-y-4" style={bodyTextStyle}>
            <p>
              Você já tentou <Gold>{tentativa.toLowerCase()}</Gold>. Faz todo
              sentido não ter resolvido por completo: a maioria das abordagens
              trabalha o que você sente <em>hoje</em>.
            </p>
            <p>
              O alívio vem — e por isso parece estar funcionando. Mas a origem
              emocional (os gatilhos e memórias guardados no inconsciente)
              continua intacta. Por isso o padrão volta.
            </p>
            <p>
              <Gold>Não é recaída sua; é a causa que não foi acessada.</Gold>
            </p>
          </div>
        </div>

        {/* Dois cenários */}
        <div className="rounded-3xl p-8 sm:p-10 mb-6 shadow-xl" style={cardStyle}>
          <h2 className="mb-6" style={sectionTitleStyle}>
            Dois caminhos a partir daqui
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div
              className="p-6 rounded-xl"
              style={{ backgroundColor: accentSoft(0.08), border: `1px solid ${accentSoft(0.2)}` }}
            >
              <h3 className="text-xl mb-4" style={{ color: COLORS.accent, fontWeight: 500 }}>
                Continuar tratando o sintoma
              </h3>
              <div className="space-y-3 text-white" style={{ lineHeight: 1.7 }}>
                <p>— Alívios temporários, recomeços</p>
                <p>— A sensação de andar em círculos</p>
                <p>— O mesmo padrão voltando meses depois</p>
              </div>
            </div>
            <div
              className="p-6 rounded-xl"
              style={{ backgroundColor: accentSoft(0.15), border: `2px solid ${accentSoft(0.4)}` }}
            >
              <h3 className="text-xl mb-4" style={{ color: COLORS.accent, fontWeight: 500 }}>
                Tratar a causa
              </h3>
              <div className="space-y-3 text-white" style={{ lineHeight: 1.7 }}>
                <p>— Um processo estruturado que acessa a origem</p>
                <p>— Ressignifica e reprograma o padrão</p>
                <p>— Com começo, meio e fim — para não precisar voltar</p>
              </div>
            </div>
          </div>
        </div>

        {/* O custo de continuar */}
        <div className="rounded-3xl p-8 sm:p-10 mb-6 shadow-xl" style={cardStyle}>
          <h2 className="mb-6" style={sectionTitleStyle}>
            O custo de adiar
          </h2>
          <div className="space-y-4" style={bodyTextStyle}>
            <p>
              {leadData.name}, o que mais custa caro não é o investimento num
              tratamento. É mais um ano vivendo <Gold>{situacao.toLowerCase()}</Gold>,
              com isso pesando sobre <Gold>{area.toLowerCase()}</Gold>.
            </p>
            <p>
              O tempo passa do mesmo jeito — a diferença é onde você vai estar no
              fim dele.
            </p>
          </div>
        </div>

        {/* O mecanismo da solução */}
        <div className="rounded-3xl p-8 sm:p-10 mb-6 shadow-xl" style={cardStyle}>
          <h2 className="mb-6" style={sectionTitleStyle}>
            Como o método trabalha
          </h2>
          <p className="mb-8" style={bodyTextStyle}>
            Hipnoterapia clínica + neurociência, num acompanhamento individual e
            estruturado, em quatro etapas. É por isso que o resultado costuma ser
            mais rápido e mais profundo do que você já viveu.
          </p>
          <div className="space-y-5">
            {SOLUTION_STEPS.map((step) => (
              <div
                key={step.number}
                className="p-6 rounded-xl"
                style={{ backgroundColor: accentSoft(0.08), border: `1px solid ${accentSoft(0.2)}` }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="text-2xl flex-shrink-0"
                    style={{ color: COLORS.accent, fontWeight: 600, fontFamily: "Fraunces, serif" }}
                  >
                    {step.number}
                  </div>
                  <div>
                    <h3 className="text-xl mb-2" style={{ color: COLORS.accent, fontWeight: 500 }}>
                      {step.title}
                    </h3>
                    <p style={bodyTextStyle}>{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* O próximo passo + CTA */}
        <div className="rounded-3xl p-8 sm:p-10 mb-6 shadow-xl" style={cardStyle}>
          <h2 className="mb-6" style={sectionTitleStyle}>
            Seu próximo passo
          </h2>
          <div className="space-y-4 mb-8" style={bodyTextStyle}>
            <p>
              O primeiro passo é uma <Gold>Sessão de Avaliação</Gold>: um
              mapeamento completo do seu histórico e dos seus padrões, com a
              definição de um plano individual. Você sai dela entendendo
              exatamente o que está acontecendo — decida ou não seguir.
            </p>
            {objetivo === "Entender de uma vez por que eu sinto o que sinto" && (
              <p>
                <Gold>
                  É exatamente o que a avaliação entrega: clareza sobre a origem.
                </Gold>
              </p>
            )}
          </div>
          <div className="text-center">
            <CtaButton label={cta.label} note={cta.note} message={cta.message} />
          </div>
        </div>

        {/* Footer */}
        <div className="text-center pt-8" style={{ borderTop: `1px solid ${accentSoft(0.2)}` }}>
          <p className="mb-2" style={{ color: COLORS.textMuted }}>
            Leitura inicial elaborada com base nas suas respostas — não é um
            diagnóstico clínico.
          </p>
          <p className="text-sm mb-4" style={{ color: "rgba(255,255,255,0.45)" }}>
            A avaliação {modality} é o passo que aprofunda o seu caso. De uso
            exclusivo de {leadData.name}.
          </p>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
            © Clínica Pâmella Mello · Hipnoterapia Clínica + Neurociência
          </p>
        </div>
      </div>
    </div>
  );
}
