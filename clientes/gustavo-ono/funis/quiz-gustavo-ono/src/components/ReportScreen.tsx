import { useEffect } from "react";
import { ArrowRight, Check, AlertCircle, MessageCircle, ExternalLink } from "lucide-react";
import { answerLabels } from "../data/questions";
import { fbqTrack } from "../analytics";
import type { LeadData } from "./LeadCaptureForm";

const ROSE = "#C87B75";
const CARD = "#2D1108";
const CARD2 = "#3A1510";
const BG = "#1A0900";

// Preencha com o número do WhatsApp do Gustavo (formato internacional, sem + ou espaços)
const WHATSAPP_NUMBER = "5511XXXXXXXXX";
const LOW_TICKET_URL = "https://pay.hotmart.com/X104749935I?bid=1778078139368";

interface ReportScreenProps {
  leadData: LeadData;
  answers: Record<number, string>;
}

function getLabel(qIdx: number, value: string): string {
  const idx = parseInt(value) - 1;
  return answerLabels[qIdx]?.[idx] || "";
}

function buildWhatsAppUrl(name: string): string {
  const msg = encodeURIComponent(
    `Olá Gustavo! Me chamo ${name} e acabei de fazer o diagnóstico do seu quiz. Quero agendar a sessão gratuita para entender o que mudar primeiro no meu negócio.`
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
}

// ─── Layout helpers ──────────────────────────────────────────────────────────

function Section({
  children,
  className = "",
  bg = CARD,
}: {
  children: React.ReactNode;
  className?: string;
  bg?: string;
}) {
  return (
    <div
      className={`rounded-3xl p-7 md:p-10 mb-5 shadow-xl ${className}`}
      style={{ backgroundColor: bg }}
    >
      {children}
    </div>
  );
}

const bodyText: React.CSSProperties = {
  color: "rgba(251, 241, 238, 0.82)",
  lineHeight: 1.75,
};

const headlineStyle: React.CSSProperties = {
  fontFamily: "Lora, Georgia, serif",
  fontWeight: 700,
  color: "#FBF1EE",
  lineHeight: 1.25,
};

// ─── Diagnóstico por pilar ────────────────────────────────────────────────────

type PillarStatus = "critico" | "atencao" | "ok";

interface Pilar {
  name: string;
  status: PillarStatus;
  insight: string;
}

function buildPilares(answers: Record<number, string>): Pilar[] {
  const profile = answers[0]; // Q0 — combinação
  const frustration = getLabel(4, answers[4]); // Q4
  const obstacle = getLabel(6, answers[6]); // Q6
  const revenue = answers[8]; // Q8 — faturamento

  // Pilar Produto
  const productStatus: PillarStatus =
    frustration.includes("segurança técnica") || frustration.includes("padrão") || frustration.includes("errar")
      ? "critico"
      : "atencao";

  const productInsight =
    frustration.includes("segurança técnica")
      ? "Sua insegurança técnica está limitando o que você consegue cobrar. Produto sem domínio de execução não sustenta preço alto."
      : frustration.includes("padrão")
      ? "Falta de padrão indica ausência de método consolidado. Quando o processo é dominado, cada peça sai igual à anterior."
      : frustration.includes("errar")
      ? "O medo de desperdiçar material vem de não ter internalizado completamente a técnica. Com o processo certo, o erro cai quase a zero."
      : "Seu produto tem potencial, mas ainda não está posicionado para justificar preços premium sem negociação.";

  // Pilar Precificação
  const pricingStatus: PillarStatus =
    profile === "2" || frustration.includes("cobrar") || Number(revenue) <= 2
      ? "critico"
      : "atencao";

  const pricingInsight =
    frustration.includes("cobrar")
      ? "Não saber precificar não é falta de autoestima — é falta de método. Preço que o cliente aceita sem questionar é consequência de produto com percepção de valor clara."
      : profile === "2"
      ? "Margem baixa é sintoma direto de precificação no chute. Sem calcular custo, hora e posicionamento juntos, o lucro some no volume."
      : obstacle.includes("concorrência")
      ? "Concorrência de preço acontece quando o produto não se diferencia. Posicionamento correto elimina comparação direta com concorrentes mais baratos."
      : "Sua precificação tem espaço para crescer. O gargalo é criar justificativa de valor que chegue antes do preço.";

  // Pilar Estrutura de Venda
  const structureStatus: PillarStatus =
    profile === "3" || profile === "4" || obstacle.includes("Imprevisibilidade") || obstacle.includes("estrutura")
      ? "critico"
      : "atencao";

  const structureInsight =
    obstacle.includes("Imprevisibilidade") || profile === "3"
      ? "Venda sem constância é o sintoma mais claro de ausência de método. Resultado que depende de sorte ou de data especial não escala."
      : obstacle.includes("estrutura") || profile === "4"
      ? "Sem estrutura interna, crescimento gera caos ao invés de lucro. A base precisa estar antes do volume."
      : obstacle.includes("produção")
      ? "Presa na produção significa que o modelo operacional não está estruturado para crescer. Mais horas na cozinha não resolve — é o modelo que precisa mudar."
      : "Sua estrutura de venda ainda depende de variáveis externas. Com um método de captação e oferta definido, o resultado para de depender do mês.";

  return [
    { name: "Produto e posicionamento", status: productStatus, insight: productInsight },
    { name: "Precificação", status: pricingStatus, insight: pricingInsight },
    { name: "Estrutura de venda", status: structureStatus, insight: structureInsight },
  ];
}

const statusConfig: Record<PillarStatus, { label: string; color: string; bg: string; icon: React.ReactNode }> = {
  critico: {
    label: "Gargalo identificado",
    color: "#F87171",
    bg: "rgba(248, 113, 113, 0.08)",
    icon: <AlertCircle className="w-4 h-4 flex-shrink-0" style={{ color: "#F87171" }} />,
  },
  atencao: {
    label: "Precisa de atenção",
    color: ROSE,
    bg: "rgba(200, 123, 117, 0.08)",
    icon: <AlertCircle className="w-4 h-4 flex-shrink-0" style={{ color: ROSE }} />,
  },
  ok: {
    label: "Funcionando bem",
    color: "#6EE7B7",
    bg: "rgba(110, 231, 183, 0.08)",
    icon: <Check className="w-4 h-4 flex-shrink-0" style={{ color: "#6EE7B7" }} />,
  },
};

// ─── Componente Principal ─────────────────────────────────────────────────────

export function ReportScreen({ leadData, answers }: ReportScreenProps) {
  useEffect(() => {
    fbqTrack("PageView");
    fbqTrack("ViewContent", { content_name: "Relatório Quiz", content_category: "Chocolate" });
  }, []);

  const firstName = leadData.name.split(" ")[0];
  const pilares = buildPilares(answers);
  const criticos = pilares.filter((p) => p.status === "critico").length;
  const whatsappUrl = buildWhatsAppUrl(firstName);

  const handleWhatsAppClick = () => {
    fbqTrack("Contact", { content_name: "Sessão Diagnóstica Gratuita", content_category: "Mentoria" });
  };

  const handleLowTicketClick = () => {
    fbqTrack("InitiateCheckout", { value: 97, currency: "BRL", content_name: "Treinamento Bombom Artístico" });
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: BG }}>
      <div className="max-w-2xl mx-auto px-4 py-8 pb-16">

        {/* ── 1. Cabeçalho ── */}
        <Section>
          <p
            className="text-sm font-semibold uppercase tracking-widest mb-4"
            style={{ color: ROSE, letterSpacing: "0.12em" }}
          >
            Diagnóstico personalizado
          </p>
          <h1 style={{ ...headlineStyle, fontSize: "clamp(1.5rem, 4vw, 2rem)", marginBottom: "1rem" }}>
            {firstName}, analisamos suas respostas.{" "}
            <em style={{ color: ROSE }}>
              {criticos > 1
                ? `Encontramos ${criticos} pontos críticos no seu negócio.`
                : criticos === 1
                ? "Encontramos o principal ponto que está travando seu crescimento."
                : "Seu negócio tem base — o que falta é afinar os pontos certos."}
            </em>
          </h1>
          <p style={bodyText}>
            Com base nas suas respostas, mapeamos os três pilares que determinam
            o faturamento de uma chocolateria profissional — e identificamos onde
            está o gargalo no seu caso.
          </p>
        </Section>

        {/* ── 2. Os três pilares ── */}
        <Section bg={CARD2}>
          <h2
            style={{
              ...headlineStyle,
              fontSize: "clamp(1.1rem, 3vw, 1.4rem)",
              marginBottom: "1.5rem",
            }}
          >
            Os três pilares do seu negócio
          </h2>
          <div className="space-y-4">
            {pilares.map((pilar) => {
              const cfg = statusConfig[pilar.status];
              return (
                <div
                  key={pilar.name}
                  className="rounded-2xl p-5"
                  style={{ backgroundColor: cfg.bg, border: `1px solid ${cfg.color}22` }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    {cfg.icon}
                    <span
                      className="text-xs font-semibold uppercase tracking-wider"
                      style={{ color: cfg.color }}
                    >
                      {cfg.label}
                    </span>
                  </div>
                  <p
                    className="font-semibold mb-2"
                    style={{ color: "#FBF1EE", fontFamily: "Lora, Georgia, serif" }}
                  >
                    {pilar.name}
                  </p>
                  <p style={{ ...bodyText, fontSize: "0.88rem" }}>{pilar.insight}</p>
                </div>
              );
            })}
          </div>
        </Section>

        {/* ── 3. Foto do Gustavo + autoridade ── */}
        <Section className="!p-0 overflow-hidden">
          <img
            src="/fotos/gustavo.webp"
            alt="Gustavo Ono — Chocolatier"
            className="w-full"
            style={{ display: "block", maxHeight: "400px", objectFit: "cover", objectPosition: "top" }}
          />
          <div className="p-7">
            <p className="font-semibold mb-1" style={{ ...headlineStyle, fontSize: "1.1rem" }}>
              Gustavo Ono — Chocolatier
            </p>
            <p style={{ ...bodyText, fontSize: "0.9rem" }}>
              Especialista em chocolateria profissional. Já formou centenas de
              chocolateiras que passaram de produção artesanal sem método para
              negócios com cardápio estruturado, precificação calculada e vendas
              constantes.
            </p>
          </div>
        </Section>

        {/* ── 4. Proposta da sessão ── */}
        <Section>
          <h2
            style={{
              ...headlineStyle,
              fontSize: "clamp(1.2rem, 3vw, 1.6rem)",
              marginBottom: "0.75rem",
            }}
          >
            O próximo passo é uma{" "}
            <span style={{ color: ROSE }}>sessão diagnóstica gratuita</span> com
            o Gustavo
          </h2>
          <p style={{ ...bodyText, marginBottom: "1.25rem" }}>
            Em 30 minutos, o Gustavo analisa o seu caso específico — produto,
            precificação e estrutura — e te mostra exatamente o que mudar
            primeiro para começar a ver resultado diferente.
          </p>
          <div className="space-y-3 mb-6">
            {[
              "Diagnóstico personalizado com base no seu negócio real",
              "Clareza sobre qual dos pilares está custando mais faturamento agora",
              "O próximo passo prático para sair do ponto em que você está",
              "Sem jargão, sem genérico — conversa direta sobre o seu caso",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: ROSE }} />
                <p style={{ color: "rgba(251,241,238,0.85)", fontSize: "0.9rem", lineHeight: 1.55 }}>
                  {item}
                </p>
              </div>
            ))}
          </div>
          <div
            className="rounded-xl p-4 mb-6 text-center text-sm font-semibold"
            style={{ backgroundColor: "rgba(200,123,117,0.1)", color: ROSE, border: `1px solid ${ROSE}33` }}
          >
            Gratuito · Sem compromisso · 30 minutos pelo WhatsApp
          </div>

          {/* CTA principal — WhatsApp */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleWhatsAppClick}
            className="flex items-center justify-center gap-3 w-full py-4 px-6 rounded-2xl transition-all hover:opacity-90 shadow-lg"
            style={{
              backgroundColor: "#25D366",
              color: "#fff",
              fontWeight: 700,
              fontSize: "1.05rem",
              textDecoration: "none",
              letterSpacing: "-0.01em",
            }}
          >
            <MessageCircle className="w-5 h-5" />
            Quero agendar minha sessão gratuita
            <ArrowRight className="w-5 h-5" />
          </a>
          <p
            className="text-center text-xs mt-3"
            style={{ color: "rgba(251,241,238,0.35)" }}
          >
            Você será direcionada para o WhatsApp do Gustavo
          </p>
        </Section>

        {/* ── 5. Depoimentos ── */}
        <Section bg={CARD2}>
          <h2
            style={{
              ...headlineStyle,
              fontSize: "clamp(1.1rem, 3vw, 1.4rem)",
              marginBottom: "1.25rem",
              textAlign: "center",
            }}
          >
            O que dizem as alunas do Gustavo
          </h2>
          <div className="space-y-4">
            <img src="/fotos/dep2.webp" alt="Depoimento" className="w-full rounded-2xl" />
            <img src="/fotos/dep3.webp" alt="Depoimento" className="w-full rounded-2xl" />
            <img src="/fotos/dep4.webp" alt="Depoimento" className="w-full rounded-2xl" />
          </div>
        </Section>

        {/* ── 6. CTA principal repetido ── */}
        <Section>
          <h2
            style={{
              ...headlineStyle,
              fontSize: "clamp(1.1rem, 3vw, 1.4rem)",
              marginBottom: "0.75rem",
              textAlign: "center",
            }}
          >
            Pronta para entender o que mudar primeiro?
          </h2>
          <p
            className="text-center mb-6"
            style={{ ...bodyText, fontSize: "0.92rem" }}
          >
            A sessão é gratuita e dura 30 minutos. Você sai sabendo exatamente
            onde está o gargalo e qual é o próximo passo no seu caso.
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleWhatsAppClick}
            className="flex items-center justify-center gap-3 w-full py-4 px-6 rounded-2xl transition-all hover:opacity-90 shadow-lg"
            style={{
              backgroundColor: "#25D366",
              color: "#fff",
              fontWeight: 700,
              fontSize: "1.05rem",
              textDecoration: "none",
              letterSpacing: "-0.01em",
            }}
          >
            <MessageCircle className="w-5 h-5" />
            Agendar sessão gratuita com o Gustavo
            <ArrowRight className="w-5 h-5" />
          </a>
        </Section>

        {/* ── 7. Alternativa leve — R$97 ── */}
        <div
          className="rounded-3xl p-7 mb-5"
          style={{
            border: `1px solid rgba(200,123,117,0.2)`,
            backgroundColor: "rgba(200,123,117,0.04)",
          }}
        >
          <p
            className="text-xs uppercase tracking-widest mb-3 text-center"
            style={{ color: "rgba(251,241,238,0.4)" }}
          >
            Ou, se preferir começar pela prática
          </p>
          <p
            className="text-center mb-4"
            style={{ color: "rgba(251,241,238,0.75)", fontSize: "0.9rem", lineHeight: 1.6 }}
          >
            Conheça o Treinamento Bombom Artístico — aprenda a produzir um
            bombom de alto padrão e adicione ao cardápio um produto que pode
            render até R$ 50 por caixa.
          </p>
          <a
            href={LOW_TICKET_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleLowTicketClick}
            className="flex items-center justify-center gap-2 w-full py-3 px-5 rounded-xl transition-all hover:opacity-80"
            style={{
              border: `1px solid rgba(200,123,117,0.4)`,
              color: ROSE,
              fontWeight: 600,
              fontSize: "0.9rem",
              textDecoration: "none",
            }}
          >
            Ver o Treinamento Bombom Artístico — R$ 97
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Footer */}
        <div
          className="text-center pt-6"
          style={{ borderTop: "1px solid rgba(200,123,117,0.12)" }}
        >
          <p className="text-xs" style={{ color: "rgba(251,241,238,0.3)" }}>
            © Gustavo Ono · Todos os direitos reservados
          </p>
          <p className="text-xs mt-1" style={{ color: "rgba(251,241,238,0.2)" }}>
            Este diagnóstico foi gerado com base nas respostas de {leadData.name}.
          </p>
        </div>
      </div>
    </div>
  );
}
