import { ArrowRight, Check, X, ShieldCheck } from "lucide-react";
import { answerLabels } from "../data/questions";
import type { LeadData } from "./LeadCaptureForm";

const ROSE = "#C87B75";
const CARD = "#2D1108";
const CARD2 = "#3A1510";
const BG = "#1A0900";
const CTA_URL = "https://pay.hotmart.com/X104749935I?bid=1778078139368";

interface ReportScreenProps {
  leadData: LeadData;
  answers: Record<number, string>;
}

function getLabel(qIdx: number, value: string): string {
  const idx = parseInt(value) - 1;
  return answerLabels[qIdx]?.[idx] || "";
}

// ─── CTA Button ──────────────────────────────────────────────────────────────

function CtaBlock({ note }: { note?: string }) {
  return (
    <div className="flex flex-col items-center gap-3 py-4">
      {/* Discount badge */}
      <div
        className="text-center px-5 py-2 rounded-full text-sm font-semibold"
        style={{ backgroundColor: "rgba(200,123,117,0.15)", color: ROSE, border: `1px solid ${ROSE}` }}
      >
        🎉 Cupom de desconto aplicado: ECONOMIZE R$ 100
      </div>
      {/* Price */}
      <div className="text-center">
        <div
          className="text-sm line-through"
          style={{ color: "rgba(251,241,238,0.4)" }}
        >
          De: R$ 197
        </div>
        <div
          className="text-4xl font-bold"
          style={{ color: "#FBF1EE", fontFamily: "Lora, Georgia, serif" }}
        >
          R$ 97
        </div>
        <div className="text-xs mt-0.5" style={{ color: "rgba(251,241,238,0.5)" }}>
          à vista · acesso imediato
        </div>
      </div>
      {/* Button */}
      <a
        href={CTA_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl w-full max-w-sm justify-center transition-all hover:opacity-90 shadow-lg"
        style={{
          backgroundColor: ROSE,
          color: "#fff",
          fontWeight: 700,
          fontSize: "1.05rem",
          textDecoration: "none",
          letterSpacing: "-0.01em",
        }}
      >
        ATIVAR MEU CONTEÚDO
        <ArrowRight className="w-5 h-5" />
      </a>
      {/* Payment icons placeholder */}
      <p className="text-xs text-center" style={{ color: "rgba(251,241,238,0.4)" }}>
        💳 Pix · Cartão de crédito · Boleto · Parcelamento disponível
      </p>
      {note && (
        <p className="text-xs text-center" style={{ color: "rgba(251,241,238,0.5)" }}>
          {note}
        </p>
      )}
    </div>
  );
}

// ─── Section wrapper ──────────────────────────────────────────────────────────

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

const Rose = ({ children }: { children: React.ReactNode }) => (
  <strong style={{ color: ROSE }}>{children}</strong>
);

// ─── PERSONALIZAÇÃO ───────────────────────────────────────────────────────────

const FRUSTRATION_BRIDGE: Record<string, string> = {
  "Falta de segurança técnica":
    "A insegurança técnica é exatamente o que impede a maioria das confeiteiras de cobrar mais — porque sem dominar a execução, fica impossível vender com confiança.",
  "Não saber cobrar preço":
    "Não saber cobrar não é um problema de autoestima — é um problema de produto. Quando o produto justifica visualmente o preço, a negociação some.",
  "Falta de padrão nos produtos":
    "A falta de padrão tem uma causa direta: não existe um método técnico consolidado. Com o método certo, cada bombom sai igual ao anterior.",
  "Medo de errar e perder material":
    "O medo de errar vem de não ter dominado a técnica completamente. Com o processo ensinado passo a passo, o desperdício cai drasticamente.",
};

const IMPEDIMENT_BRIDGE: Record<string, string> = {
  "Ter tempo de focar nas vendas, pois fico presa na produção":
    "Quando o produto tem alta percepção de valor, você vende menos unidades por mais dinheiro — e sai do ciclo de produção intensa por margem baixa.",
  "Falta de estrutura para crescer":
    "Estrutura começa com produto certo no portfólio. Um bombom artístico que se destaca vira o âncora que organiza toda a operação ao redor.",
  "Concorrência alta e desleal":
    "Concorrência só é problema quando você está jogando o mesmo jogo que as outras. Bombons artísticos criam uma categoria própria — sem concorrentes diretos.",
  "Imprevisibilidade nas vendas":
    "A imprevisibilidade cai quando você tem um produto que as pessoas pedem por indicação — porque viram, quiseram e não encontraram em outro lugar.",
  "Falta de demanda na minha região":
    "Demanda local pode ser limitada, mas demanda online não tem fronteira. Um produto fotogênico como o bombom artístico foi feito para vender pelo Instagram.",
  "Outro":
    "Independente do obstáculo específico, o ponto de alavanca é sempre o mesmo: ter um produto que se diferencia antes mesmo de você abrir a boca para vender.",
};

// ─── COMPONENTE PRINCIPAL ─────────────────────────────────────────────────────

export function ReportScreen({ leadData, answers }: ReportScreenProps) {
  const firstName = leadData.name.split(" ")[0];
  const frustration = getLabel(4, answers[4]);
  const impediment = getLabel(6, answers[6]);

  const frustrationBridge =
    FRUSTRATION_BRIDGE[frustration] ||
    "Isso que você sente é o sintoma mais claro de que o produto certo ainda não entrou no seu portfólio.";
  const impedimentBridge =
    IMPEDIMENT_BRIDGE[impediment] ||
    "O caminho para superar isso passa por um produto que faz o trabalho de atração e convencimento antes mesmo da venda.";

  return (
    <div className="min-h-screen" style={{ backgroundColor: BG }}>
      <div className="max-w-2xl mx-auto px-4 py-8 pb-16">

        {/* ── 1. Header personalizado ── */}
        <Section>
          <h1
            style={{ ...headlineStyle, fontSize: "clamp(1.5rem, 4vw, 2rem)", marginBottom: "1rem" }}
          >
            {firstName}, com base nas suas respostas, aqui está o que está
            travando seu negócio de chocolates — e o que você pode fazer{" "}
            <em style={{ color: ROSE }}>ainda essa semana.</em>
          </h1>
          <p style={bodyText}>
            {frustrationBridge}
          </p>
          <p className="mt-4" style={bodyText}>
            {impedimentBridge}
          </p>
        </Section>

        {/* ── 2. Headline do curso ── */}
        <Section bg={CARD2}>
          <h2
            style={{
              ...headlineStyle,
              fontSize: "clamp(1.3rem, 3.5vw, 1.75rem)",
              marginBottom: "0.75rem",
            }}
          >
            Aprenda a produzir bombons artísticos alto padrão e adicione ao seu
            cardápio um produto que pode render{" "}
            <span style={{ color: ROSE }}>até R$ 50 por caixa</span> — ou mais.
          </h2>
          <p style={{ ...bodyText, fontSize: "0.95rem" }}>
            Com base nas suas respostas, ficou claro que você não falta talento nem
            dedicação. O que falta é <Rose>um produto com percepção de valor alta o
            suficiente</Rose> para justificar preços que fazem diferença no seu
            faturamento.
          </p>
        </Section>

        {/* ── 3. Foto do Gustavo ── */}
        <Section className="!p-0 overflow-hidden">
          <img
            src="/fotos/gustavo.png"
            alt="Gustavo Ono — Chocolatier"
            className="w-full"
            style={{ display: "block", maxHeight: "480px", objectFit: "cover", objectPosition: "top" }}
          />
          <div className="p-6">
            <p
              className="text-center font-semibold"
              style={{ ...headlineStyle, fontSize: "1.1rem" }}
            >
              Gustavo Ono
            </p>
          </div>
        </Section>

        {/* ── 4. Foto do produto ── */}
        <Section className="!p-0 overflow-hidden">
          <img
            src="/fotos/produto.png"
            alt="Bombom Artístico de Morango, Baunilha, Cumaru e Praliné de Avelãs"
            className="w-full"
            style={{ display: "block", maxHeight: "440px", objectFit: "cover" }}
          />
          <div className="p-6 text-center">
            <p
              className="font-semibold"
              style={{ ...headlineStyle, fontSize: "1rem" }}
            >
              Bombom Artístico de Morango, Baunilha, Cumaru e Praliné de Avelãs
            </p>
          </div>
        </Section>

        {/* ── 5. Depoimentos ── */}
        <Section>
          <h2
            style={{
              ...headlineStyle,
              fontSize: "clamp(1.2rem, 3vw, 1.5rem)",
              marginBottom: "1.5rem",
              textAlign: "center",
            }}
          >
            Veja como nossas alunas estão{" "}
            <span style={{ color: ROSE }}>reagindo</span>
          </h2>
          <div className="space-y-4">
            <img src="/fotos/dep1.png" alt="Depoimento 1" className="w-full rounded-2xl" />
            <img src="/fotos/dep2.png" alt="Depoimento 2" className="w-full rounded-2xl" />
            <img src="/fotos/dep3.png" alt="Depoimento 3" className="w-full rounded-2xl" />
            <img src="/fotos/dep4.png" alt="Depoimento 4" className="w-full rounded-2xl" />
          </div>
        </Section>

        {/* ── 6. O que está incluso ── */}
        <Section bg={CARD2}>
          <h2
            style={{
              ...headlineStyle,
              fontSize: "clamp(1.2rem, 3vw, 1.5rem)",
              marginBottom: "1.25rem",
            }}
          >
            O que você vai aprender no treinamento
          </h2>
          <div className="space-y-3">
            {[
              "A produção completa do Bombom de Morango, Baunilha, Cumaru e Praliné de Avelã",
              "Técnica de temperagem correta que garante brilho e estabilidade no produto final",
              "Como pintar a casca por dentro — criando cores e arte sem sugar o chocolate",
              "Ganache de morango com equilíbrio perfeito de acidez e doçura",
              "Creme de baunilha suave e o toque exótico do cumaru",
              "Praliné de avelãs crocante que transforma a textura e o sabor",
              "Fechamento e acabamento em nível de chocolateria europeia",
              "Como precificar e posicionar o bombom artístico no seu cardápio",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <Check
                  className="w-4 h-4 mt-0.5 flex-shrink-0"
                  style={{ color: ROSE }}
                />
                <p style={{ color: "rgba(251,241,238,0.85)", fontSize: "0.9rem", lineHeight: 1.55 }}>
                  {item}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* ── 7. 1º CTA ── */}
        <Section>
          <CtaBlock note="Acesso imediato após a confirmação do pagamento" />
        </Section>

        {/* ── 8. O que o treinamento vai fazer na sua vida ── */}
        <Section bg={CARD2}>
          <h2
            style={{
              ...headlineStyle,
              fontSize: "clamp(1.2rem, 3vw, 1.6rem)",
              marginBottom: "1.25rem",
              textAlign: "center",
            }}
          >
            O que este treinamento é capaz de{" "}
            <span style={{ color: ROSE }}>fazer na sua vida</span>
          </h2>
          <div className="space-y-3">
            {[
              "Um bombom artístico premium no seu cardápio, do zero",
              "Produto com alto valor percebido que justifica preços sem negociação",
              "Fotos que geram compartilhamento e viralizam no Instagram",
              "Clientes pedindo por indicação porque viram e ficaram impressionados",
              "Mais margem com menos volume — saindo da corrida de produção intensa",
              "Confiança técnica para cobrar o que seu trabalho vale",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <Check
                  className="w-4 h-4 mt-0.5 flex-shrink-0"
                  style={{ color: ROSE }}
                />
                <p style={{ color: "rgba(251,241,238,0.85)", fontSize: "0.9rem", lineHeight: 1.55 }}>
                  {item}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* ── 9. 2º CTA ── */}
        <Section>
          <CtaBlock />
        </Section>

        {/* ── 10. Tabela comparativa ── */}
        <Section bg={CARD2}>
          <h2
            style={{
              ...headlineStyle,
              fontSize: "clamp(1.1rem, 3vw, 1.4rem)",
              marginBottom: "1.25rem",
              textAlign: "center",
            }}
          >
            Com o treinamento × sem o treinamento
          </h2>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div
              className="py-2 px-3 rounded-xl text-center text-sm font-semibold"
              style={{ backgroundColor: "rgba(200,123,117,0.15)", color: ROSE }}
            >
              Sem o treinamento
            </div>
            <div
              className="py-2 px-3 rounded-xl text-center text-sm font-semibold"
              style={{ backgroundColor: "rgba(200,123,117,0.25)", color: "#FBF1EE" }}
            >
              Com o treinamento
            </div>
          </div>
          {[
            ["Bombons genéricos sem identidade", "Chocolates técnicos, saborosos e especializados"],
            ["Produto que parece amador", "Bombons que vendem só pela foto"],
            ["Cliente questiona o preço", "Cliente paga sem negociar"],
            ["Depende de datas sazonais", "Vendas constantes o ano todo"],
            ["Copia o que vê no mercado", "Cria receitas com método próprio"],
            ["Margem apertada e muito trabalho", "Mais lucro com menos volume"],
          ].map(([sem, com], i) => (
            <div key={i} className="grid grid-cols-2 gap-3 mb-3">
              <div
                className="flex items-start gap-2 p-3 rounded-xl text-sm"
                style={{
                  backgroundColor: "rgba(255,80,80,0.06)",
                  border: "1px solid rgba(255,80,80,0.12)",
                  color: "rgba(251,241,238,0.6)",
                  lineHeight: 1.45,
                }}
              >
                <X className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-red-400" />
                {sem}
              </div>
              <div
                className="flex items-start gap-2 p-3 rounded-xl text-sm"
                style={{
                  backgroundColor: "rgba(200,123,117,0.08)",
                  border: "1px solid rgba(200,123,117,0.2)",
                  color: "rgba(251,241,238,0.85)",
                  lineHeight: 1.45,
                }}
              >
                <Check className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: ROSE }} />
                {com}
              </div>
            </div>
          ))}
        </Section>

        {/* ── 11. Urgência ── */}
        <div
          className="rounded-3xl p-7 md:p-10 mb-5 shadow-xl text-center"
          style={{ backgroundColor: ROSE }}
        >
          <h2
            style={{
              fontFamily: "Lora, Georgia, serif",
              fontWeight: 700,
              fontSize: "clamp(1.3rem, 4vw, 1.8rem)",
              color: "#fff",
              lineHeight: 1.25,
              marginBottom: "0.75rem",
            }}
          >
            Participe agora do Treinamento Bombom Artístico
          </h2>
          <p style={{ color: "rgba(255,255,255,0.85)", marginBottom: "1.5rem", fontSize: "0.95rem" }}>
            Coloque hoje mesmo em seu cardápio um produto que faz o cliente
            fechar sem questionar o preço.
          </p>
          <div className="flex flex-col items-center gap-3">
            <div className="text-sm line-through" style={{ color: "rgba(255,255,255,0.6)" }}>
              De: R$ 197
            </div>
            <div style={{ fontFamily: "Lora, serif", fontSize: "2.5rem", fontWeight: 700, color: "#fff" }}>
              R$ 97
            </div>
            <a
              href={CTA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl w-full max-w-xs justify-center transition-all hover:opacity-90 shadow-lg"
              style={{
                backgroundColor: "#fff",
                color: ROSE,
                fontWeight: 700,
                fontSize: "1rem",
                textDecoration: "none",
              }}
            >
              ATIVAR MEU CONTEÚDO
              <ArrowRight className="w-5 h-5" />
            </a>
            <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.8rem" }}>
              💳 Pix · Cartão · Boleto · Parcelamento disponível
            </p>
          </div>
        </div>

        {/* ── 12. Garantia ── */}
        <Section bg={CARD2}>
          <div className="flex flex-col items-center gap-4 text-center">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "rgba(200,123,117,0.12)", border: `2px solid ${ROSE}` }}
            >
              <ShieldCheck className="w-10 h-10" style={{ color: ROSE }} />
            </div>
            <h3
              style={{ ...headlineStyle, fontSize: "1.3rem" }}
            >
              Garantia incondicional de 7 dias
            </h3>
            <p style={{ ...bodyText, fontSize: "0.9rem", maxWidth: "480px" }}>
              Se por qualquer motivo você não ficar satisfeita com o treinamento nos primeiros 7 dias, basta
              enviar uma mensagem e devolvemos 100% do seu investimento — sem perguntas, sem burocracia.
            </p>
            <p style={{ ...bodyText, fontSize: "0.85rem", color: "rgba(251,241,238,0.5)" }}>
              O risco é zero. A decisão é sua.
            </p>
          </div>
        </Section>

        {/* ── 13. CTA final ── */}
        <Section>
          <CtaBlock note="Garantia de 7 dias · Sem risco" />
        </Section>

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
