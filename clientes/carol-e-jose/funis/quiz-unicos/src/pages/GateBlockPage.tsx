import { LogoUnicos } from "../components/LogoUnicos";

const NAVY = "#16314f";
const GOLD = "#a9802f";
const serif: React.CSSProperties = { fontFamily: "'Playfair Display', Georgia, serif" };
const sans: React.CSSProperties = { fontFamily: "'Inter', sans-serif" };

const WHATSAPP_URL = "#whatsapp";

export function GateBlockPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#faf8f4" }}>
      {/* Logo header */}
      <div className="w-full flex justify-center pt-6 pb-5" style={{ borderBottom: "1px solid rgba(169,128,47,0.15)", backgroundColor: "#ffffff" }}>
        <LogoUnicos size="sm" />
      </div>

      {/* Banner */}
      <div style={{ backgroundColor: NAVY, padding: "32px 22px 28px", textAlign: "center" }}>
        <p style={{ ...sans, fontSize: "0.65rem", letterSpacing: "0.22em", textTransform: "uppercase", color: GOLD, fontWeight: 700, marginBottom: "8px" }}>
          ÚNICOS Leadership Club
        </p>
        <h1 style={{ ...serif, fontSize: "clamp(1.3rem, 4vw, 1.8rem)", color: "#ffffff", fontWeight: 700 }}>
          Você está no lugar certo.
        </h1>
      </div>

      <div className="max-w-2xl mx-auto px-5 py-8 flex flex-col gap-5">

        <div className="rounded-2xl p-6" style={{ backgroundColor: "#ffffff", border: "1px solid rgba(169,128,47,0.15)", boxShadow: "0 4px 20px rgba(22,49,79,0.06)" }}>
          <p style={{ ...serif, fontSize: "clamp(1.15rem, 3vw, 1.4rem)", fontWeight: 700, color: NAVY, lineHeight: 1.3, marginBottom: "16px" }}>
            Empresas que chegam aqui em fase de estruturação já têm uma vantagem enorme.
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", color: "rgba(22,49,79,0.68)", lineHeight: 1.75, fontSize: "0.95rem", marginBottom: "14px" }}>
            A maioria dos empresários só descobre o impacto da liderança depois que o crescimento começa a travar. Você está fazendo essa pergunta antes, e isso muda tudo.
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", color: "rgba(22,49,79,0.68)", lineHeight: 1.75, fontSize: "0.95rem" }}>
            Neste momento, o programa ÚNICOS foi desenhado para líderes que já ultrapassaram os R$ 1M anuais e precisam escalar sem virar reféns da própria operação. Mas o caminho até lá passa exatamente pela conversa que você já começou.
          </p>
        </div>

        <div className="rounded-2xl p-6" style={{ backgroundColor: "rgba(169,128,47,0.06)", border: "1px solid rgba(169,128,47,0.28)" }}>
          <p style={{ ...sans, fontWeight: 700, color: NAVY, fontSize: "0.97rem", marginBottom: "10px" }}>
            O próximo passo para você.
          </p>
          <p style={{ ...sans, color: "rgba(22,49,79,0.68)", lineHeight: 1.75, fontSize: "0.95rem", marginBottom: "20px" }}>
            Entre na comunidade gratuita da ÚNICOS e acesse conteúdo, encontros e conversas com líderes que estão construindo negócios sólidos — do jeito certo, desde o começo.
          </p>
          <div className="flex justify-center">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl transition-all hover:opacity-90"
              style={{ padding: "15px 30px", backgroundColor: GOLD, color: "#fff", ...sans, fontWeight: 700, fontSize: "0.95rem", letterSpacing: "0.03em", textDecoration: "none", boxShadow: "0 4px 18px rgba(169,128,47,0.3)" }}
            >
              Entrar na comunidade
            </a>
          </div>
        </div>

        {/* Assinatura */}
        <div className="rounded-2xl p-6" style={{ backgroundColor: "#ffffff", border: "1px solid rgba(169,128,47,0.15)", boxShadow: "0 4px 20px rgba(22,49,79,0.06)" }}>
          <p style={{ ...sans, fontWeight: 700, color: NAVY, fontSize: "0.95rem", marginBottom: "4px" }}>Caroline Batista</p>
          <p style={{ ...sans, fontSize: "0.88rem", color: "rgba(22,49,79,0.55)", lineHeight: 1.65 }}>
            Mais de 20 anos e 6 mil líderes desenvolvidos individualmente.
          </p>
          <p style={{ ...serif, fontStyle: "italic", color: GOLD, fontSize: "0.95rem", marginTop: "10px" }}>
            Aqui não falta grana. Falta uma nova maneira de liderar.
          </p>
        </div>

      </div>

      {/* Footer */}
      <div className="text-center py-8 px-5" style={{ borderTop: "1px solid rgba(169,128,47,0.15)", backgroundColor: "#ffffff" }}>
        <div className="flex justify-center mb-3">
          <LogoUnicos size="sm" />
        </div>
        <p style={{ ...sans, fontSize: "0.78rem", color: "rgba(22,49,79,0.35)" }}>
          Caroline Batista e José · ÚNICOS Leadership Club
        </p>
      </div>
    </div>
  );
}
