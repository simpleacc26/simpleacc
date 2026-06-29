import { ArrowRight, CheckCircle, XCircle } from "lucide-react";
import { LogoUnicos } from "../components/LogoUnicos";
import type { LeadData } from "../components/LeadCaptureForm";

interface AgendamentoPageProps {
  leadData?: LeadData | null;
}

const CTA_URL =
  import.meta.env.VITE_CTA_URL ||
  "https://wa.me/5500000000000?text=Ol%C3%A1%2C+quero+agendar+minha+sess%C3%A3o+estrat%C3%A9gica";

const NAVY = "#16314f";
const CARD = "#1e3d61";
const GOLD = "#a9802f";
const CREAM = "#f3eee2";

const serif: React.CSSProperties = {
  fontFamily: "'Playfair Display', Georgia, serif",
};
const sans: React.CSSProperties = {
  fontFamily: "'Inter', sans-serif",
};
const bodyText: React.CSSProperties = {
  ...sans,
  color: "rgba(243,238,226,0.8)",
  lineHeight: 1.7,
  fontSize: "0.97rem",
};

function SectionBadge({ n, title, goal }: { n: number; title: string; goal: string }) {
  return (
    <div
      className="flex items-center gap-3 flex-wrap"
      style={{ marginBottom: "20px" }}
    >
      <span
        style={{
          width: "32px",
          height: "32px",
          borderRadius: "8px",
          backgroundColor: "rgba(169,128,47,0.15)",
          border: "1px solid rgba(169,128,47,0.35)",
          color: "#d4a84b",
          ...serif,
          fontWeight: 700,
          fontSize: "0.9rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {n}
      </span>
      <span
        style={{ ...serif, fontWeight: 600, fontSize: "1rem", color: CREAM }}
      >
        {title}
      </span>
      <span
        style={{
          ...sans,
          fontSize: "0.7rem",
          fontWeight: 600,
          letterSpacing: "0.05em",
          textTransform: "uppercase",
          padding: "3px 10px",
          borderRadius: "20px",
          backgroundColor: "rgba(255,255,255,0.07)",
          border: "1px solid rgba(255,255,255,0.15)",
          color: "rgba(243,238,226,0.55)",
        }}
      >
        {goal}
      </span>
    </div>
  );
}

function CtaButton({ label, note }: { label: string; note?: string }) {
  return (
    <div>
      <a
        href={CTA_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-3 rounded-xl transition-all hover:opacity-90"
        style={{
          padding: "15px 30px",
          backgroundColor: GOLD,
          color: "#fff",
          ...sans,
          fontWeight: 700,
          fontSize: "0.95rem",
          letterSpacing: "0.03em",
          textDecoration: "none",
          boxShadow: "0 4px 18px rgba(169,128,47,0.35)",
          border: "1px solid rgba(169,128,47,0.7)",
        }}
      >
        {label}
        <ArrowRight className="w-4 h-4" />
      </a>
      {note && (
        <p
          style={{
            ...sans,
            fontSize: "0.78rem",
            color: "rgba(243,238,226,0.4)",
            marginTop: "8px",
          }}
        >
          {note}
        </p>
      )}
    </div>
  );
}

function PainCard({
  tag,
  title,
  desc,
}: {
  tag: string;
  title: string;
  desc: string;
}) {
  return (
    <div
      className="rounded-xl p-5"
      style={{
        backgroundColor: "rgba(169,128,47,0.07)",
        borderLeft: `4px solid ${GOLD}`,
        border: `1px solid rgba(169,128,47,0.2)`,
        borderLeftWidth: "4px",
        borderLeftColor: GOLD,
      }}
    >
      <p
        style={{
          ...sans,
          fontSize: "0.68rem",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: GOLD,
          fontWeight: 700,
          marginBottom: "4px",
        }}
      >
        {tag}
      </p>
      <h4
        style={{ ...serif, fontSize: "1rem", color: CREAM, marginBottom: "6px" }}
      >
        {title}
      </h4>
      <p style={{ ...sans, fontSize: "0.85rem", color: "rgba(243,238,226,0.65)", lineHeight: 1.55 }}>
        {desc}
      </p>
    </div>
  );
}

const PAINS = [
  {
    tag: "Refém da operação",
    title: "Tudo passa por você",
    desc: "Quase nenhuma decisão anda sem a sua aprovação. Se você tira três dias, a empresa começa a desandar. Você virou o gargalo do que construiu.",
  },
  {
    tag: "Time sem dono",
    title: "Ninguém assume a entrega",
    desc: "Você tem gente boa, mas ninguém cuida do resultado como você cuidaria. Toda decisão volta para a sua mesa e a sobrecarga só cresce.",
  },
  {
    tag: "Consolidado mas estagnado",
    title: "O crescimento travou",
    desc: "Você vê o concorrente avançar, reforça o comercial, coloca mais tráfego, e o resultado não vem na mesma proporção do esforço.",
  },
  {
    tag: "O frustrado",
    title: "Já tentou de tudo",
    desc: "Você fez mentoria, entrou em aceleradora, implantou ferramenta. Estuda, aplica, e mesmo assim nada engrena de verdade com o seu time.",
  },
];

const SESSION_DELIVERS = [
  "Qual é exatamente o gargalo que te mantém refém da operação, e quanto ele está custando em tempo e resultado.",
  "Por que o seu time ainda não assume responsabilidade, e como mudar isso com método, não com discurso.",
  "O que ajustar para ter mais tempo, menos correria e um crescimento que não dependa só de você empurrar.",
  "O caminho para deixar de ser o líder operacional e passar a ser o líder integrativo do seu negócio.",
];

const FAQ = [
  {
    q: "Quanto tempo dura a sessão?",
    a: "Em torno de 30 a 40 minutos, individual e online. A gente analisa a sua forma de liderar, o gargalo mais recorrente na sua gestão e o que está travando o negócio, com orientações claras sobre o que ajustar.",
  },
  {
    q: "Quem conduz a sessão?",
    a: "A conversa é feita pela Caroline ou por alguém do time formado por ela. Se em algum momento não for o que você esperava, você pode encerrar.",
  },
  {
    q: "Como me preparo?",
    a: "Tenha clareza sobre o seu faturamento atual, quantas pessoas estão sob a sua responsabilidade, como você decide hoje e qual gargalo mais te incomoda. Quanto mais honesto no diagnóstico, melhor a conversa.",
  },
  {
    q: "Essa sessão é para mim?",
    a: "É para o dono ou executivo que já tem escala e fatura a partir de R$ 200 mil por mês, e que continua refém da operação. Se você ainda está construindo a base ou não é o decisor do negócio, esse não é o momento.",
  },
];

const STOPS = [
  "Pare de aprovar cada decisão e ser o gargalo do que você construiu.",
  "Pare de apagar incêndio e perder o tempo que deveria ser da sua família.",
  "Pare de crescer o faturamento e continuar preso à operação.",
];

export function AgendamentoPage({ leadData }: AgendamentoPageProps) {
  const firstName = leadData?.name?.split(" ")[0] || "";

  return (
    <div className="min-h-screen" style={{ backgroundColor: NAVY }}>
      {/* Header */}
      <div
        style={{
          background: `linear-gradient(135deg, ${NAVY} 0%, #0f2138 60%, #10283f 100%)`,
          borderBottom: `3px solid ${GOLD}`,
          padding: "40px 22px 36px",
        }}
      >
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-center mb-8">
            <LogoUnicos size="md" />
          </div>

          {firstName && (
            <p
              style={{
                ...sans,
                fontSize: "0.85rem",
                color: "rgba(169,128,47,0.9)",
                marginBottom: "10px",
                textAlign: "center",
              }}
            >
              Diagnóstico gerado para {firstName}
            </p>
          )}

          <h1
            style={{
              ...serif,
              fontSize: "clamp(1.6rem, 4vw, 2.2rem)",
              fontWeight: 700,
              color: CREAM,
              lineHeight: 1.22,
              marginBottom: "16px",
              textAlign: "center",
            }}
          >
            Você levou a sua empresa aos 7 dígitos, mas ainda é você quem
            decide quase tudo, apaga incêndio e não consegue se afastar sem o
            negócio travar?
          </h1>
          <p
            style={{
              ...sans,
              fontSize: "1rem",
              color: "rgba(205,214,226,0.85)",
              lineHeight: 1.6,
              maxWidth: "680px",
              margin: "0 auto 24px",
              textAlign: "center",
            }}
          >
            Nesta sessão estratégica individual, você vai entender exatamente
            qual gargalo de liderança te mantém refém da operação, e o caminho
            para a sua empresa rodar sem depender de você.
          </p>
          <div className="flex justify-center">
            <CtaButton
              label="Quero agendar minha sessão"
              note="Vagas limitadas, abertura semanal"
            />
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-5 py-10 flex flex-col gap-6">

        {/* Seção 2: As 4 dores */}
        <div
          className="rounded-2xl overflow-hidden shadow-lg"
          style={{ backgroundColor: CARD }}
        >
          <div
            className="px-6 py-4"
            style={{
              background: "linear-gradient(90deg, #16314f, #1f4368)",
              borderBottom: `1px solid rgba(169,128,47,0.2)`,
            }}
          >
            <SectionBadge n={2} title="Identificação" goal="reconhecimento" />
          </div>
          <div className="p-6">
            <p
              style={{
                ...serif,
                fontSize: "1.05rem",
                color: CREAM,
                marginBottom: "18px",
                lineHeight: 1.4,
              }}
            >
              Se você já tem escala, mas sente que o negócio continua dependendo
              de você, provavelmente está vivendo uma destas situações:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
              {PAINS.map((p) => (
                <PainCard key={p.tag} {...p} />
              ))}
            </div>
            <p style={bodyText}>
              Se você se identificou com alguma delas, o problema não é falta de
              competência.{" "}
              <strong style={{ color: CREAM }}>
                Você já provou que sabe crescer.
              </strong>{" "}
              É que a forma como você lidera ainda é a mesma do dia em que fundou
              a empresa, quando tudo precisava passar por você.
            </p>
            <p style={{ ...bodyText, marginTop: "10px" }}>
              E se você não ajustar isso agora, vai continuar trabalhando demais,
              sem tempo para a família, com o crescimento preso ao limite da sua
              presença.
            </p>
            <div className="mt-5">
              <CtaButton label="Quero agendar minha sessão" />
            </div>
          </div>
        </div>

        {/* Seção 3: O que acontece na sessão */}
        <div
          className="rounded-2xl overflow-hidden shadow-lg"
          style={{ backgroundColor: CARD }}
        >
          <div
            className="px-6 py-4"
            style={{
              background: "linear-gradient(90deg, #16314f, #1f4368)",
              borderBottom: `1px solid rgba(169,128,47,0.2)`,
            }}
          >
            <SectionBadge n={3} title="A oferta" goal="clareza do entregável" />
          </div>
          <div className="p-6">
            <p
              style={{
                ...serif,
                fontSize: "1.05rem",
                color: CREAM,
                marginBottom: "12px",
                lineHeight: 1.4,
              }}
            >
              Nesta sessão estratégica, a gente analisa junto a sua forma de
              liderar hoje, onde a sua decisão está centralizada e o que falta
              para o negócio rodar sem você.
            </p>
            <p style={{ ...bodyText, marginBottom: "16px" }}>
              No final da conversa, você sai com clareza sobre:
            </p>
            <ul className="space-y-3 mb-5">
              {SESSION_DELIVERS.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle
                    className="w-5 h-5 flex-shrink-0 mt-0.5"
                    style={{ color: "#4db88a" }}
                  />
                  <span style={bodyText}>{item}</span>
                </li>
              ))}
            </ul>
            <p style={bodyText}>
              Você recebe um diagnóstico da sua liderança baseado em um método
              estruturado, construído em quase 20 anos formando donos e líderes
              individualmente.
            </p>
            <div className="mt-5">
              <CtaButton label="Quero agendar minha sessão" />
            </div>
          </div>
        </div>

        {/* Seção 4: Escassez + prova social */}
        <div
          className="rounded-2xl overflow-hidden shadow-lg"
          style={{ backgroundColor: CARD }}
        >
          <div
            className="px-6 py-4"
            style={{
              background: "linear-gradient(90deg, #16314f, #1f4368)",
              borderBottom: `1px solid rgba(169,128,47,0.2)`,
            }}
          >
            <SectionBadge n={4} title="Escassez e prova social" goal="confiança" />
          </div>
          <div className="p-6">
            <p style={bodyText}>
              Toda semana, a Caroline abre alguns horários para sessões
              estratégicas com donos e executivos que já têm escala, mas sentem
              que continuam reféns da própria operação.
            </p>
            <p style={{ ...bodyText, marginTop: "10px" }}>
              Por ser uma conversa individual e analisada caso a caso, as vagas
              são limitadas.
            </p>
            <p
              style={{
                ...serif,
                fontSize: "1.05rem",
                color: CREAM,
                marginTop: "18px",
                marginBottom: "12px",
              }}
            >
              Veja o que diz quem já passou pelo método:
            </p>
            <div
              className="rounded-xl p-5"
              style={{
                backgroundColor: "rgba(169,128,47,0.06)",
                border: "1px dashed rgba(169,128,47,0.3)",
              }}
            >
              <p
                style={{
                  ...sans,
                  fontSize: "0.82rem",
                  color: "rgba(243,238,226,0.45)",
                  fontStyle: "italic",
                }}
              >
                Espaço para depoimentos reais (prints de WhatsApp, vídeos curtos
                ou cards de resultado). Priorizar donos que saíram da
                centralização e voltaram a ter tempo.
              </p>
            </div>
            <div className="mt-5">
              <CtaButton label="Quero agendar minha sessão" />
            </div>
          </div>
        </div>

        {/* Seção 5: Autoridade */}
        <div
          className="rounded-2xl overflow-hidden shadow-lg"
          style={{ backgroundColor: CARD }}
        >
          <div
            className="px-6 py-4"
            style={{
              background: "linear-gradient(90deg, #16314f, #1f4368)",
              borderBottom: `1px solid rgba(169,128,47,0.2)`,
            }}
          >
            <SectionBadge n={5} title="Autoridade" goal="quem conduz e por quê" />
          </div>
          <div className="p-6">
            <div className="flex gap-5 flex-wrap">
              <div
                className="rounded-xl flex-shrink-0"
                style={{
                  width: "110px",
                  height: "130px",
                  background: "linear-gradient(135deg, #22405f, #16314f)",
                  border: "1px solid rgba(169,128,47,0.25)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.7rem",
                  color: "rgba(169,128,47,0.5)",
                  textAlign: "center",
                  padding: "8px",
                  ...sans,
                }}
              >
                foto da Caroline
              </div>
              <div className="flex-1 min-w-0">
                <h3
                  style={{
                    ...serif,
                    fontSize: "1.1rem",
                    color: CREAM,
                    marginBottom: "10px",
                  }}
                >
                  Sobre a Caroline Batista
                </h3>
                <p style={bodyText}>
                  A Caroline trabalha há quase 20 anos no desenvolvimento de
                  donos e líderes de empresa. São mais de 10 mil horas de
                  atendimento individual, 6 mil líderes formados e 40 empresas
                  acompanhadas de perto.
                </p>
                <p style={{ ...bodyText, marginTop: "8px" }}>
                  O método dela não atua em técnica nem em comportamento isolado.
                  Atua na{" "}
                  <strong style={{ color: CREAM }}>
                    estrutura de pensamento e na identidade estratégica do dono
                  </strong>
                  , tirando o líder do operacional e levando ao integrativo, sob
                  a base da segurança psicológica.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-5">
              {[
                "Quase 20 anos formando líderes",
                "Mais de 10 mil horas individuais",
                "6 mil líderes desenvolvidos",
                "40 empresas acompanhadas",
                "Método de liderança integrativa",
                "ÚNICOS Leadership Club",
              ].map((cred) => (
                <div
                  key={cred}
                  className="flex items-start gap-2"
                  style={{ ...sans, fontSize: "0.82rem", color: "rgba(243,238,226,0.7)" }}
                >
                  <span style={{ color: GOLD, flexShrink: 0 }}>•</span>
                  {cred}
                </div>
              ))}
            </div>
            <div className="mt-5">
              <CtaButton label="Quero agendar minha sessão" />
            </div>
          </div>
        </div>

        {/* Seção 6: FAQ */}
        <div
          className="rounded-2xl overflow-hidden shadow-lg"
          style={{ backgroundColor: CARD }}
        >
          <div
            className="px-6 py-4"
            style={{
              background: "linear-gradient(90deg, #16314f, #1f4368)",
              borderBottom: `1px solid rgba(169,128,47,0.2)`,
            }}
          >
            <SectionBadge n={6} title="Perguntas frequentes" goal="quebrar objeções" />
          </div>
          <div className="p-6 flex flex-col gap-5">
            {FAQ.map((item, i) => (
              <div key={i} style={{ borderBottom: i < FAQ.length - 1 ? "1px solid rgba(255,255,255,0.07)" : undefined, paddingBottom: i < FAQ.length - 1 ? "18px" : undefined }}>
                <p
                  style={{
                    ...serif,
                    fontSize: "0.97rem",
                    color: CREAM,
                    fontWeight: 600,
                    marginBottom: "6px",
                  }}
                >
                  {item.q}
                </p>
                <p style={bodyText}>{item.a}</p>
              </div>
            ))}
            <div className="mt-2">
              <CtaButton label="Quero agendar minha sessão" />
            </div>
          </div>
        </div>

        {/* Seção 7: Fechamento */}
        <div
          className="rounded-2xl overflow-hidden shadow-lg"
          style={{ backgroundColor: CARD }}
        >
          <div
            className="px-6 py-4"
            style={{
              background: "linear-gradient(90deg, #16314f, #1f4368)",
              borderBottom: `1px solid rgba(169,128,47,0.2)`,
            }}
          >
            <SectionBadge n={7} title="Fechamento" goal="decisão agora" />
          </div>
          <div className="p-6">
            <h3
              style={{
                ...serif,
                fontSize: "1.2rem",
                color: CREAM,
                marginBottom: "16px",
              }}
            >
              A hora de parar de ser refém da própria operação é agora.
            </h3>
            <ul className="space-y-3 mb-6">
              {STOPS.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <XCircle
                    className="w-5 h-5 flex-shrink-0 mt-0.5"
                    style={{ color: "#9d2f2f" }}
                  />
                  <span
                    style={{
                      ...sans,
                      fontSize: "0.97rem",
                      color: CREAM,
                      fontWeight: 600,
                    }}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
            <p style={bodyText}>
              Agende a sua sessão estratégica e descubra o caminho para liderar
              de um jeito novo, com o negócio rodando sem depender de você.
            </p>
            <div className="mt-6">
              <CtaButton
                label="Quero agendar minha sessão"
                note="Sessão individual e gratuita. Sem compromisso."
              />
            </div>
            <p
              style={{
                ...serif,
                fontWeight: 700,
                color: GOLD,
                fontSize: "1rem",
                marginTop: "22px",
                fontStyle: "italic",
              }}
            >
              Aqui não falta grana. Falta uma nova maneira de liderar.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        className="text-center py-8 px-5"
        style={{ borderTop: "1px solid rgba(169,128,47,0.15)" }}
      >
        <LogoUnicos size="sm" className="mx-auto mb-3" />
        <p
          style={{
            ...sans,
            fontSize: "0.78rem",
            color: "rgba(243,238,226,0.35)",
          }}
        >
          Caroline Batista e José · ÚNICOS Leadership Club · Fábrica de Quiz
          Simple Acc
        </p>
      </div>
    </div>
  );
}
