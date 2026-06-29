import { ArrowRight } from "lucide-react";
import { LogoUnicos } from "../components/LogoUnicos";
import type { LeadData } from "../components/LeadCaptureForm";

const NAVY = "#16314f";
const GOLD = "#a9802f";
const serif: React.CSSProperties = { fontFamily: "'Playfair Display', Georgia, serif" };
const sans: React.CSSProperties = { fontFamily: "'Inter', sans-serif" };
const bodyText: React.CSSProperties = { ...sans, color: "rgba(22,49,79,0.68)", lineHeight: 1.75, fontSize: "0.95rem" };

// Placeholder — URL da página de vendas para leads desqualificados (a ser preenchida)
const CTA_SALES_URL = "#vendas";

interface DiagnosisData {
  slug: string;
  gargaloTitle: string;
  subtitle: string;
  significa: string;
  naoResolveu: string;
  caminho: string;
}

export const DIAGNOSES: Record<string, DiagnosisData> = {
  "Refém da Operação": {
    slug: "refem-da-operacao",
    gargaloTitle: "Você virou o ponto de aprovação de quase tudo.",
    subtitle: "O negócio cresceu, passou dos 7 dígitos, mas continua dependendo da sua cabeça para cada decisão importante.",
    significa: "A forma como você lidera ainda é a mesma do dia em que fundou a empresa. Quando você não está presente, tudo desacelera. O custo disso não aparece no balanço. Aparece na sua agenda que nunca abre e nas vezes em que você tentou se afastar e o negócio começou a travar.",
    naoResolveu: "Você provavelmente já investiu em processo, em ferramenta e até em consultoria. Nada disso muda o eixo da decisão. Enquanto cada aprovação passar por você, o gargalo continua sendo a centralização, e não a ferramenta.",
    caminho: "Sair de líder operacional para líder integrativo. Distribuir decisão com critério, sob segurança psicológica, para que o negócio rode sem depender da sua presença. Isso não é treinamento de equipe. É uma mudança na forma como você lidera.",
  },
  "Time sem Dono": {
    slug: "time-sem-dono",
    gargaloTitle: "O seu time ainda não assume ownership de verdade.",
    subtitle: "Você tem gente boa, mas toda decisão volta para a sua mesa. Tem turnover, tem esforço, e mesmo assim ninguém é dono da entrega como você é.",
    significa: "O problema não é a sua equipe, e também não é falta de gente. Você já contratou, já treinou, já trocou pessoas. O que acontece é que a sua liderança ainda não formou líderes com alçada para decidir sem você. Enquanto isso não muda, você continua sendo o único dono de tudo, e a sua sobrecarga cresce junto com o negócio.",
    naoResolveu: "Contratar mais gente, dar mais ferramenta ou cobrar mais perto não cria dono. Cria mais dependência da sua presença. O ponto não é a competência técnica do time, é a ausência de uma estrutura de liderança que faça as pessoas pensarem e decidirem como donos.",
    caminho: "Formar liderança com alçada, sob segurança psicológica, para que a equipe passe a assumir a entrega de ponta a ponta. É a mudança que finalmente libera a sua agenda e sustenta o crescimento.",
  },
  "Consolidado mas Estagnado": {
    slug: "estagnado",
    gargaloTitle: "A sua empresa estagnou, e o problema atacado é o errado.",
    subtitle: "Você já passou dos 7 dígitos, vê o concorrente avançar, e a sua reação tem sido reforçar comercial, tráfego e time de vendas. O resultado não vem na mesma proporção.",
    significa: "Na maioria das vezes, o que trava o próximo salto não é venda. É gestão, e a pessoa certa no lugar certo. O negócio cresceu, e a sua forma de liderar não acompanhou esse novo tamanho. Isso não é falta de capacidade. É que o modelo de gestão que te trouxe até aqui não é o que te leva ao próximo nível.",
    naoResolveu: "Colocar mais venda em cima de uma estrutura que já está no limite só aumenta o atrito. Mais leads chegam, mas a operação não dá conta, e o crescimento não se sustenta. O gargalo está na liderança e na estrutura, não no topo do funil.",
    caminho: "Destravar a sua liderança e a estrutura que sustenta o crescimento, para voltar a crescer com previsibilidade. É colocar a pessoa certa no lugar certo e liderar de um jeito que aguente o próximo patamar.",
  },
  "O Frustrado": {
    slug: "frustrado",
    gargaloTitle: "Você tem consciência de gestão, mas nada engrena com o time.",
    subtitle: "Você já fez mentoria, já entrou em programa, já implantou ferramenta. Estuda, aplica, se dedica. E o resultado não aparece como deveria.",
    significa: "O seu problema não é falta de conhecimento. É que as ferramentas que você está usando já estão ultrapassadas para a realidade do seu time hoje. Você está buscando a solução, mas no lugar errado, e isso é frustrante justamente porque você se esforça.",
    naoResolveu: "A maioria dos programas te entrega mais método e mais ferramenta. Só que ferramenta não muda o motorista. Enquanto a forma de liderar for a mesma, o conteúdo não engrena com as pessoas e o negócio volta a depender de você.",
    caminho: "Mudar o eixo da sua liderança, para que tudo o que você já aprendeu finalmente engrene com a equipe. Não é mais um curso. É instalar a liderança que faz o conhecimento virar resultado.",
  },
};

const SLUG_TO_BUCKET: Record<string, string> = {
  "refem-da-operacao": "Refém da Operação",
  "time-sem-dono": "Time sem Dono",
  "estagnado": "Consolidado mas Estagnado",
  "frustrado": "O Frustrado",
};

export function getBucketFromSlug(slug: string): string | null {
  return SLUG_TO_BUCKET[slug] ?? null;
}

export function getSlugFromBucket(bucket: string): string {
  return DIAGNOSES[bucket]?.slug ?? "refem-da-operacao";
}

interface DiagnosticoPageProps {
  bucket: string;
  isQualified: boolean;
  leadData?: LeadData | null;
  onSchedule: () => void;
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p style={{ ...sans, fontSize: "0.65rem", letterSpacing: "0.16em", textTransform: "uppercase", color: GOLD, fontWeight: 700, marginBottom: "8px" }}>
        {label}
      </p>
      <p style={bodyText}>{children}</p>
    </div>
  );
}

export function DiagnosticoPage({ bucket, isQualified, leadData, onSchedule }: DiagnosticoPageProps) {
  const d = DIAGNOSES[bucket] ?? DIAGNOSES["Refém da Operação"];
  const firstName = leadData?.name?.split(" ")[0] ?? "";

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#faf8f4" }}>
      {/* Logo header */}
      <div className="w-full flex justify-center pt-6 pb-5" style={{ borderBottom: "1px solid rgba(169,128,47,0.15)", backgroundColor: "#ffffff" }}>
        <LogoUnicos size="sm" />
      </div>

      {/* Diagnóstico banner */}
      <div style={{ backgroundColor: NAVY, padding: "32px 22px 28px", textAlign: "center" }}>
        <p style={{ ...sans, fontSize: "0.65rem", letterSpacing: "0.22em", textTransform: "uppercase", color: GOLD, fontWeight: 700, marginBottom: "8px" }}>
          ÚNICOS Leadership Club
        </p>
        <h1 style={{ ...serif, fontSize: "clamp(1.3rem, 4vw, 1.8rem)", color: "#ffffff", fontWeight: 700, marginBottom: firstName ? "8px" : "0" }}>
          Diagnóstico de Liderança
        </h1>
        {firstName && (
          <p style={{ ...sans, fontSize: "0.85rem", color: "rgba(255,255,255,0.55)", marginTop: "6px" }}>
            Resultado gerado para {firstName}
          </p>
        )}
      </div>

      <div className="max-w-2xl mx-auto px-5 py-8 flex flex-col gap-5">

        {/* Intro */}
        <div className="rounded-2xl p-6" style={{ backgroundColor: "#ffffff", border: "1px solid rgba(169,128,47,0.15)", boxShadow: "0 4px 20px rgba(22,49,79,0.06)" }}>
          <p style={bodyText}>
            Olá{firstName ? `, ${firstName}` : ""}! Você acabou de concluir o Diagnóstico de Liderança da ÚNICOS. Abaixo está o resultado da sua avaliação, com base nas suas respostas.
          </p>
        </div>

        {/* Gargalo + seções */}
        <div className="rounded-2xl p-6" style={{ backgroundColor: "#ffffff", border: "1px solid rgba(169,128,47,0.15)", boxShadow: "0 4px 20px rgba(22,49,79,0.06)" }}>
          <p style={{ ...sans, fontSize: "0.65rem", letterSpacing: "0.16em", textTransform: "uppercase", color: GOLD, fontWeight: 700, marginBottom: "10px" }}>
            O SEU GARGALO
          </p>
          <h2 style={{ ...serif, fontSize: "clamp(1.25rem, 3.5vw, 1.6rem)", fontWeight: 700, color: NAVY, lineHeight: 1.28, marginBottom: "12px" }}>
            {d.gargaloTitle}
          </h2>
          <p style={{ ...bodyText, marginBottom: "20px" }}>{d.subtitle}</p>

          <div style={{ borderTop: "1px solid rgba(169,128,47,0.12)", marginBottom: "20px" }} />

          <div className="flex flex-col gap-6">
            <Section label="O QUE ISSO SIGNIFICA">{d.significa}</Section>
            <Section label="POR QUE O QUE VOCÊ JÁ TENTOU NÃO RESOLVEU">{d.naoResolveu}</Section>
            <Section label="O CAMINHO">{d.caminho}</Section>
          </div>
        </div>

        {/* O próximo passo */}
        <div className="rounded-2xl p-6" style={{ backgroundColor: "rgba(169,128,47,0.06)", border: "1px solid rgba(169,128,47,0.28)" }}>
          <p style={{ ...sans, fontSize: "0.97rem", color: NAVY, lineHeight: 1.75, marginBottom: "20px" }}>
            <strong>O próximo passo.</strong> Em uma sessão estratégica individual, a gente mapeia exatamente onde está o seu gargalo e desenha o primeiro passo para destravar.
          </p>
          <div className="flex justify-center">
            {isQualified ? (
              <button
                onClick={onSchedule}
                className="inline-flex items-center gap-3 rounded-xl transition-all hover:opacity-90"
                style={{ padding: "15px 30px", backgroundColor: GOLD, color: "#fff", ...sans, fontWeight: 700, fontSize: "0.95rem", letterSpacing: "0.03em", border: "none", cursor: "pointer", boxShadow: "0 4px 18px rgba(169,128,47,0.3)" }}
              >
                Quero agendar minha sessão
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <a
                href={CTA_SALES_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 rounded-xl transition-all hover:opacity-90"
                style={{ padding: "15px 30px", backgroundColor: GOLD, color: "#fff", ...sans, fontWeight: 700, fontSize: "0.95rem", letterSpacing: "0.03em", textDecoration: "none", boxShadow: "0 4px 18px rgba(169,128,47,0.3)" }}
              >
                Quero dar o próximo passo
                <ArrowRight className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        {/* Assinatura Caroline */}
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
