import { ArrowRight, CheckCircle, XCircle, Star } from "lucide-react";
import { LogoUnicos } from "../components/LogoUnicos";
import type { LeadData } from "../components/LeadCaptureForm";

interface AgendamentoPageProps {
  leadData?: LeadData | null;
  isQualified?: boolean;
}

const CTA_URL_QUALIFIED =
  import.meta.env.VITE_CTA_URL ||
  "https://api.whatsapp.com/send/?phone=555591466065&text=Ol%C3%A1%21+Vim+pelo+site+e+gostaria+de+saber+mais+informa%C3%A7%C3%B5es&type=phone_number&app_absent=0";

const NAVY = "#16314f";
const GOLD = "#a9802f";

const serif: React.CSSProperties = { fontFamily: "'Playfair Display', Georgia, serif" };
const sans: React.CSSProperties = { fontFamily: "'Inter', sans-serif" };
const bodyText: React.CSSProperties = {
  ...sans,
  color: "rgba(22,49,79,0.65)",
  lineHeight: 1.7,
  fontSize: "0.97rem",
};

function CtaButton({ label, note, url }: { label: string; note?: string; url: string }) {
  return (
    <div>
      <a
        href={url}
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
          boxShadow: "0 4px 18px rgba(169,128,47,0.3)",
        }}
      >
        {label}
        <ArrowRight className="w-4 h-4" />
      </a>
      {note && (
        <p style={{ ...sans, fontSize: "0.78rem", color: "rgba(22,49,79,0.4)", marginTop: "8px" }}>
          {note}
        </p>
      )}
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="rounded-2xl p-6"
      style={{
        backgroundColor: "#ffffff",
        border: "1px solid rgba(169,128,47,0.15)",
        boxShadow: "0 4px 24px rgba(22,49,79,0.07)",
      }}
    >
      {children}
    </div>
  );
}

function PainCard({ tag, title, desc }: { tag: string; title: string; desc: string }) {
  return (
    <div
      className="rounded-xl p-5"
      style={{
        backgroundColor: "#faf8f4",
        borderLeft: `4px solid ${GOLD}`,
        border: `1px solid rgba(169,128,47,0.18)`,
        borderLeftWidth: "4px",
        borderLeftColor: GOLD,
      }}
    >
      <p style={{ ...sans, fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", color: GOLD, fontWeight: 700, marginBottom: "4px" }}>
        {tag}
      </p>
      <h4 style={{ ...serif, fontSize: "1rem", color: NAVY, marginBottom: "6px" }}>{title}</h4>
      <p style={{ ...sans, fontSize: "0.85rem", color: "rgba(22,49,79,0.6)", lineHeight: 1.55 }}>{desc}</p>
    </div>
  );
}

function StarsRow() {
  return (
    <div className="flex gap-1 mb-3">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} className="w-4 h-4" style={{ fill: GOLD, color: GOLD }} />
      ))}
    </div>
  );
}

function TestimonialCard({ quote, name, role }: { quote: string; name: string; role: string }) {
  return (
    <div
      className="rounded-xl p-5 flex flex-col justify-between"
      style={{
        backgroundColor: "#ffffff",
        border: "1px solid rgba(169,128,47,0.2)",
        boxShadow: "0 2px 12px rgba(22,49,79,0.06)",
      }}
    >
      <div>
        <StarsRow />
        <p style={{ ...sans, fontSize: "0.88rem", color: "rgba(22,49,79,0.75)", lineHeight: 1.6, fontStyle: "italic" }}>
          "{quote}"
        </p>
      </div>
      <p style={{ ...sans, fontSize: "0.8rem", color: NAVY, fontWeight: 600, marginTop: "16px" }}>
        — {name}{role ? `, ${role}` : ""}
      </p>
    </div>
  );
}

const PAINS = [
  { tag: "Refém da operação", title: "Tudo passa por você", desc: "Quase nenhuma decisão anda sem a sua aprovação. Se você tira três dias, a empresa começa a desandar. Você virou o gargalo do que construiu." },
  { tag: "Time sem dono", title: "Ninguém assume a entrega", desc: "Você tem gente boa, mas ninguém cuida do resultado como você cuidaria. Toda decisão volta para a sua mesa e a sobrecarga só cresce." },
  { tag: "Consolidado mas estagnado", title: "O crescimento travou", desc: "Você vê o concorrente avançar, reforça o comercial, coloca mais tráfego, e o resultado não vem na mesma proporção do esforço." },
  { tag: "O frustrado", title: "Já tentou de tudo", desc: "Você fez mentoria, entrou em aceleradora, implantou ferramenta. Estuda, aplica, e mesmo assim nada engrena de verdade com o seu time." },
];

const SESSION_DELIVERS = [
  "Qual é exatamente o gargalo que te mantém refém da operação, e quanto ele está custando em tempo e resultado.",
  "Por que o seu time ainda não assume responsabilidade, e como mudar isso com método, não com discurso.",
  "O que ajustar para ter mais tempo, menos correria e um crescimento que não dependa só de você empurrar.",
  "O caminho para deixar de ser o líder operacional e passar a ser o líder integrativo do seu negócio.",
];

const TESTIMONIALS = [
  { quote: "O treinamento foi enriquecedor para entender como estou sendo como líder e o que preciso mudar. Tenho aplicado os ensinamentos no dia a dia e os resultados são visíveis na equipe.", name: "Ligia Manica", role: "Gerente Administrativo Financeiro, Agência Sicredi" },
  { quote: "O programa me trouxe coragem pra fazer diferente, sair da mesmice. Foi um divisor de águas na minha forma de liderar.", name: "Rosane Brito", role: "Supervisora de Produção" },
  { quote: "A Carol está à frente de dois projetos aqui: transformação cultural e segurança psicológica. O nível de conhecimento dela faz com que dialogue com todos os níveis hierárquicos, reduzindo resistências e gerando adesão real. Estamos muito satisfeitos com os resultados conquistados.", name: "Francielle Reis", role: "Gerente de Relações Humanas, Bem Brasil" },
  { quote: "Estou há 15 anos em corporações de alto nível e já participei de muitos treinamentos de liderança. Este foi o melhor. Trouxe reflexões que permanecem — e transformam.", name: "Mayckon Aires Cardoso", role: "Coordenador de Logística, Mix Alimentos" },
];

const FAQ = [
  { q: "Quanto tempo dura a sessão?", a: "Em torno de 30 a 40 minutos, individual e online. A gente analisa a sua forma de liderar, o gargalo mais recorrente na sua gestão e o que está travando o negócio, com orientações claras sobre o que ajustar." },
  { q: "Quem conduz a sessão?", a: "A conversa é feita pela Caroline ou por alguém do time formado por ela. Se em algum momento não for o que você esperava, você pode encerrar." },
  { q: "Como me preparo?", a: "Tenha clareza sobre o seu faturamento atual, quantas pessoas estão sob a sua responsabilidade, como você decide hoje e qual gargalo mais te incomoda. Quanto mais honesto no diagnóstico, melhor a conversa." },
  { q: "Essa sessão é para mim?", a: "É para o dono ou executivo que já tem escala e fatura a partir de R$ 200 mil por mês, e que continua refém da operação. Se você ainda está construindo a base ou não é o decisor do negócio, esse não é o momento." },
];

const STOPS = [
  "Pare de aprovar cada decisão e ser o gargalo do que você construiu.",
  "Pare de apagar incêndio e perder o tempo que deveria ser da sua família.",
  "Pare de crescer o faturamento e continuar preso à operação.",
];

export function AgendamentoPage({ leadData, isQualified = true }: AgendamentoPageProps) {
  const firstName = leadData?.name?.split(" ")[0] || "";
  const ctaUrl = CTA_URL_QUALIFIED;
  const ctaLabel = "Quero agendar minha sessão";

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#faf8f4" }}>

      {/* Banner desqualificado */}
      {!isQualified && (
        <div
          style={{
            backgroundColor: "rgba(169,128,47,0.08)",
            borderBottom: "1px solid rgba(169,128,47,0.2)",
            padding: "12px 22px",
            textAlign: "center",
          }}
        >
          <p style={{ ...sans, fontSize: "0.82rem", color: "rgba(22,49,79,0.65)" }}>
            Com base no seu perfil, a sessão estratégica individual pode não ser
            o melhor próximo passo agora. Em breve você recebe uma indicação
            personalizada por WhatsApp.
          </p>
        </div>
      )}

      {/* Header hero */}
      <div
        style={{
          backgroundColor: "#ffffff",
          borderBottom: `3px solid ${GOLD}`,
          padding: "40px 22px 36px",
          boxShadow: "0 4px 24px rgba(22,49,79,0.06)",
        }}
      >
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-center mb-8 pb-6" style={{ borderBottom: "1px solid rgba(169,128,47,0.15)" }}>
            <LogoUnicos size="md" />
          </div>

          {firstName && (
            <p style={{ ...sans, fontSize: "0.85rem", color: GOLD, marginBottom: "10px", textAlign: "center", fontWeight: 500 }}>
              Diagnóstico gerado para {firstName}
            </p>
          )}

          <h1
            style={{
              ...serif,
              fontSize: "clamp(1.6rem, 4vw, 2.2rem)",
              fontWeight: 700,
              color: NAVY,
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
              color: "rgba(22,49,79,0.6)",
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
            <CtaButton label={ctaLabel} url={ctaUrl} note="Vagas limitadas, abertura semanal" />
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-5 py-10 flex flex-col gap-6">

        {/* As 4 dores */}
        <Card>
          <h2 style={{ ...serif, fontSize: "1.15rem", fontWeight: 700, color: NAVY, marginBottom: "6px" }}>
            Se você já tem escala mas o negócio continua dependendo de você...
          </h2>
          <p style={{ ...bodyText, marginBottom: "18px" }}>
            Provavelmente está vivendo uma destas situações:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
            {PAINS.map((p) => <PainCard key={p.tag} {...p} />)}
          </div>
          <p style={bodyText}>
            Se você se identificou com alguma delas, o problema não é falta de
            competência.{" "}
            <strong style={{ color: NAVY }}>Você já provou que sabe crescer.</strong>{" "}
            É que a forma como você lidera ainda é a mesma do dia em que fundou
            a empresa, quando tudo precisava passar por você.
          </p>
          <p style={{ ...bodyText, marginTop: "10px" }}>
            E se você não ajustar isso agora, vai continuar trabalhando demais,
            sem tempo para a família, com o crescimento preso ao limite da sua presença.
          </p>
          <div className="mt-5"><CtaButton label={ctaLabel} url={ctaUrl} /></div>
        </Card>

        {/* O que acontece na sessão */}
        <Card>
          <h2 style={{ ...serif, fontSize: "1.15rem", fontWeight: 700, color: NAVY, marginBottom: "12px" }}>
            O que acontece na sessão estratégica
          </h2>
          <p style={{ ...bodyText, marginBottom: "16px" }}>
            A gente analisa junto a sua forma de liderar hoje, onde a sua
            decisão está centralizada e o que falta para o negócio rodar sem
            você. No final da conversa, você sai com clareza sobre:
          </p>
          <ul className="space-y-3 mb-5">
            {SESSION_DELIVERS.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "#1f6b4f" }} />
                <span style={bodyText}>{item}</span>
              </li>
            ))}
          </ul>
          <p style={bodyText}>
            Você recebe um diagnóstico da sua liderança baseado em um método
            estruturado, construído em quase 20 anos formando donos e líderes individualmente.
          </p>
          <div className="mt-5"><CtaButton label={ctaLabel} url={ctaUrl} /></div>
        </Card>

        {/* Depoimentos */}
        <div>
          <h2
            style={{
              ...serif,
              fontSize: "1.3rem",
              fontWeight: 700,
              color: NAVY,
              textAlign: "center",
              marginBottom: "20px",
              textTransform: "uppercase",
              letterSpacing: "0.03em",
            }}
          >
            Veja os resultados de quem já passou por essa sessão:
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {TESTIMONIALS.map((t) => (
              <TestimonialCard key={t.name} {...t} />
            ))}
          </div>
          <div className="flex justify-center mt-6">
            <CtaButton label={ctaLabel} url={ctaUrl} />
          </div>
        </div>

        {/* Autoridade — Caroline */}
        <Card>
          <div className="flex gap-5 flex-wrap">
            <img
              src="/caroline.jpg"
              alt="Caroline Batista"
              className="rounded-xl flex-shrink-0 object-cover"
              style={{
                width: "130px",
                height: "160px",
                objectPosition: "top",
                border: "2px solid rgba(169,128,47,0.2)",
              }}
            />
            <div className="flex-1 min-w-0">
              <h3 style={{ ...serif, fontSize: "1.1rem", color: NAVY, marginBottom: "10px" }}>
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
                <strong style={{ color: NAVY }}>
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
              <div key={cred} className="flex items-start gap-2" style={{ ...sans, fontSize: "0.82rem", color: "rgba(22,49,79,0.65)" }}>
                <span style={{ color: GOLD, flexShrink: 0 }}>•</span>
                {cred}
              </div>
            ))}
          </div>
          <div className="mt-5"><CtaButton label={ctaLabel} url={ctaUrl} /></div>
        </Card>

        {/* FAQ */}
        <Card>
          <h2 style={{ ...serif, fontSize: "1.15rem", fontWeight: 700, color: NAVY, marginBottom: "20px" }}>
            Perguntas frequentes
          </h2>
          <div className="flex flex-col gap-5">
            {FAQ.map((item, i) => (
              <div
                key={i}
                style={{
                  borderBottom: i < FAQ.length - 1 ? "1px solid rgba(22,49,79,0.08)" : undefined,
                  paddingBottom: i < FAQ.length - 1 ? "18px" : undefined,
                }}
              >
                <p style={{ ...serif, fontSize: "0.97rem", color: NAVY, fontWeight: 600, marginBottom: "6px" }}>
                  {item.q}
                </p>
                <p style={bodyText}>{item.a}</p>
              </div>
            ))}
          </div>
          <div className="mt-6"><CtaButton label={ctaLabel} url={ctaUrl} /></div>
        </Card>

        {/* Fechamento */}
        <Card>
          <h2 style={{ ...serif, fontSize: "1.2rem", fontWeight: 700, color: NAVY, marginBottom: "16px" }}>
            A hora de parar de ser refém da própria operação é agora.
          </h2>
          <ul className="space-y-3 mb-6">
            {STOPS.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <XCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "#9d2f2f" }} />
                <span style={{ ...sans, fontSize: "0.97rem", color: NAVY, fontWeight: 600 }}>{item}</span>
              </li>
            ))}
          </ul>
          <p style={bodyText}>
            Agende a sua sessão estratégica e descubra o caminho para liderar
            de um jeito novo, com o negócio rodando sem depender de você.
          </p>
          <div className="mt-6">
            <CtaButton label={ctaLabel} url={ctaUrl} note="Sessão individual e gratuita. Sem compromisso." />
          </div>
          <p style={{ ...serif, fontWeight: 700, color: GOLD, fontSize: "1rem", marginTop: "22px", fontStyle: "italic" }}>
            Aqui não falta grana. Falta uma nova maneira de liderar.
          </p>
        </Card>

      </div>

      {/* Footer */}
      <div
        className="text-center py-8 px-5"
        style={{ borderTop: "1px solid rgba(169,128,47,0.15)", backgroundColor: "#ffffff" }}
      >
        <LogoUnicos size="sm" className="mx-auto mb-3" />
        <p style={{ ...sans, fontSize: "0.78rem", color: "rgba(22,49,79,0.35)" }}>
          Caroline Batista e José · ÚNICOS Leadership Club · Fábrica de Quiz Simple Acc
        </p>
      </div>
    </div>
  );
}
