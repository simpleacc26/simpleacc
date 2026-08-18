import { useEffect } from "react";
import { ArrowRight, Check, AlertCircle, MessageCircle, ExternalLink } from "lucide-react";
import { answerLabels } from "../data/questions";
import { fbqTrack } from "../analytics";
import { getRota } from "../lib/rota";
import type { LeadData } from "./LeadCaptureForm";

const ROSE = "#B08D57";
const CARD = "#1E120C";
const CARD2 = "#26160E";
const BG = "#120A06";

// Número do WhatsApp do Gustavo, formato internacional, só dígitos (ex.: 5511987654321).
// Definido em VITE_WHATSAPP_NUMBER (.env local e Environment Variables na Vercel).
const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER ?? "";
const LOW_TICKET_URL = "https://pay.hotmart.com/X104749935I?bid=1778078139368";

/**
 * Monta o link do checkout carregando a origem da venda.
 *
 * A Hotmart mostra os parâmetros `src` e `sck` no relatório de vendas, então é
 * por aqui que se descobre quais compras do treinamento vieram do quiz, e de
 * qual rota e campanha. Sem isso a venda entra sem origem e não dá para
 * reconstruir depois.
 *
 *   src = quiz-rotaA | quiz-rotaB
 *   sck = a utm_campaign que trouxe a lead, quando existir
 */
function buildLowTicketUrl(rota: string): string {
  const url = new URL(LOW_TICKET_URL);
  url.searchParams.set("src", `quiz-rota${rota}`);
  try {
    const utms = JSON.parse(sessionStorage.getItem("quizUtms") || "{}");
    const campanha = utms.utm_campaign || utms.utm_content || "";
    if (campanha) url.searchParams.set("sck", String(campanha).slice(0, 100));
  } catch (e) {
    /* sem storage: segue só com o src */
  }
  return url.toString();
}

if (!/^\d{12,13}$/.test(WHATSAPP_NUMBER)) {
  // A Rota A inteira depende deste número. Sem ele o botão de agendamento não
  // abre conversa nenhuma, e a lead qualificada morre na página.
  console.error(
    "[quiz] VITE_WHATSAPP_NUMBER ausente ou inválido:",
    JSON.stringify(WHATSAPP_NUMBER),
    "— o CTA de agendamento da Rota A não vai funcionar."
  );
}

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
  color: "rgba(242, 232, 217, 0.82)",
  lineHeight: 1.75,
};

const headlineStyle: React.CSSProperties = {
  fontFamily: "Cormorant Garamond, Georgia, serif",
  fontWeight: 600,
  letterSpacing: "-0.01em",
  color: "#F2E8D9",
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
      ? "Quando você ainda não tem certeza se o brilho vai pegar ou se a peça vai soltar direito da forma, essa dúvida acaba entrando no preço sem que você perceba, porque quem produz na insegurança tende a cobrar na insegurança também."
      : frustration.includes("padrão")
      ? "Uma peça linda todo mundo consegue fazer uma vez, e o que separa quem vende de vez em quando de quem vende o ano inteiro é conseguir repetir aquela mesma peça na terceira, na décima e na centésima encomenda sem precisar torcer para dar certo."
      : frustration.includes("errar")
      ? "Esse medo de perder material tem um custo que quase ninguém coloca na conta, porque ele faz você produzir menos do que poderia, testar menos do que gostaria e às vezes recusar encomenda que daria conta de entregar."
      : "O seu produto tem potencial, mas ainda chega ao cliente sem aquilo que faz alguém aceitar o preço sem pedir desconto, que é entender de cara por que aquele chocolate custa o que custa.";

  // Pilar Precificação
  const pricingStatus: PillarStatus =
    profile === "2" || frustration.includes("cobrar") || Number(revenue) <= 2
      ? "critico"
      : "atencao";

  const pricingInsight =
    frustration.includes("cobrar")
      ? "Na hora em que o cliente pergunta quanto custa, o que decide o número que sai da sua boca é o quanto você confia na conta que fez antes. Sem essa conta pronta sobra o chute, e o chute quase sempre puxa o valor para baixo, porque o medo de perder a venda acaba pesando mais do que a margem."
      : profile === "2"
      ? "Margem apertada costuma nascer de uma conta incompleta, aquela que soma o chocolate e a embalagem mas deixa de fora as suas horas, a energia, o deslocamento e o material que se perdeu no caminho. Aí o dinheiro entra no mês e mesmo assim não sobra nada no fim dele."
      : obstacle.includes("concorrência")
      ? "Quando o cliente coloca o seu preço lado a lado com o de outra pessoa, o que costuma faltar é ele ter enxergado alguma diferença antes de chegar no valor. Um posicionamento bem construído tira você dessa comparação antes mesmo dela acontecer."
      : "A sua precificação tem espaço para subir, e o caminho passa por fazer o cliente entender o valor do que está comprando antes de ele ouvir o número, e não depois.";

  // Pilar Estrutura de Venda
  const structureStatus: PillarStatus =
    profile === "3" || profile === "4" || obstacle.includes("Imprevisibilidade") || obstacle.includes("estrutura")
      ? "critico"
      : "atencao";

  const structureInsight =
    obstacle.includes("Imprevisibilidade") || profile === "3"
      ? "Depender da Páscoa e do Natal para salvar o ano é o que mais cansa, porque você vive dois meses de correria seguidos de dez meses de espera, sem conseguir planejar nada no meio do caminho. A constância aparece no dia em que o cliente passa a ter um motivo para procurar você em maio e em agosto, do mesmo jeito que procura em abril."
      : obstacle.includes("estrutura") || profile === "4"
      ? "Crescer sem organização por dentro costuma piorar a rotina antes de melhorar o faturamento, porque o volume chega acompanhado de retrabalho, prazo apertado e aquela sensação de estar sempre correndo atrás do próprio pedido."
      : obstacle.includes("produção")
      ? "Passar o dia inteiro dentro da cozinha e ainda sentir que faltou tempo para vender é o sinal mais claro de que a produção ocupou o espaço que deveria ser do negócio, e acrescentar mais horas na bancada não devolve esse espaço para você."
      : "Hoje o seu resultado ainda depende bastante do que vem de fora, de quem lembrou de você, da data no calendário ou da indicação que apareceu. Com um caminho definido para atrair e ofertar, o mês para de ser surpresa.";

  return [
    { name: "Produto e posicionamento", status: productStatus, insight: productInsight },
    { name: "Precificação", status: pricingStatus, insight: pricingInsight },
    { name: "Estrutura de venda", status: structureStatus, insight: structureInsight },
  ];
}

const statusConfig: Record<PillarStatus, { label: string; color: string; bg: string; icon: React.ReactNode }> = {
  critico: {
    label: "Gargalo identificado",
    color: "#A8324B",
    bg: "rgba(168, 50, 75, 0.10)",
    icon: <AlertCircle className="w-4 h-4 flex-shrink-0" style={{ color: "#A8324B" }} />,
  },
  atencao: {
    label: "Precisa de atenção",
    color: ROSE,
    bg: "rgba(176, 141, 87, 0.08)",
    icon: <AlertCircle className="w-4 h-4 flex-shrink-0" style={{ color: ROSE }} />,
  },
  ok: {
    label: "Funcionando bem",
    color: "#8A9279",
    bg: "rgba(138, 146, 121, 0.10)",
    icon: <Check className="w-4 h-4 flex-shrink-0" style={{ color: "#8A9279" }} />,
  },
};

// ─── Componente Principal ─────────────────────────────────────────────────────

export function ReportScreen({ leadData, answers }: ReportScreenProps) {
  const rota = getRota(answers);

  // Toda medição do relatório carrega a rota, porque as duas páginas são
  // diferentes: a Rota A vê a sessão como oferta principal e o treinamento
  // como segunda opção, a Rota B só vê o treinamento. Sem esse parâmetro,
  // taxa de clique no low ticket vira uma média de duas coisas distintas.
  useEffect(() => {
    fbqTrack("PageView");
    fbqTrack("ViewContent", { content_name: "Relatório Quiz", content_category: "Chocolate", rota });
  }, [rota]);

  const firstName = leadData.name.split(" ")[0];
  const pilares = buildPilares(answers);
  const criticos = pilares.filter((p) => p.status === "critico").length;
  const whatsappUrl = buildWhatsAppUrl(firstName);
  const lowTicketUrl = buildLowTicketUrl(rota);

  const handleWhatsAppClick = () => {
    fbqTrack("Contact", {
      content_name: "Sessão Diagnóstica Gratuita",
      content_category: "Mentoria",
      rota,
    });
  };

  const handleLowTicketClick = () => {
    fbqTrack("InitiateCheckout", {
      value: 97,
      currency: "BRL",
      content_name: "Treinamento Bombom Artístico",
      rota,
    });
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
                : "Seu negócio já tem base, e o que falta agora é afinar alguns pontos."}
            </em>
          </h1>
          <p style={bodyText}>
            O que você respondeu diz bastante coisa sobre o momento em que o seu
            negócio está, e foi isso que organizamos aqui embaixo. São três
            pilares, os mesmos que costumam decidir quanto uma chocolateria
            consegue faturar todo mês, e em cada um deles dá para ver se o seu
            está sustentando o negócio ou puxando ele para trás.
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
                    style={{ color: "#F2E8D9", fontFamily: "Cormorant Garamond, Georgia, serif" }}
                  >
                    {pilar.name}
                  </p>
                  <p style={{ ...bodyText, fontSize: "0.88rem" }}>{pilar.insight}</p>
                </div>
              );
            })}
          </div>
        </Section>

        {/* ── 2b. O mecanismo: por que estes três pilares ── */}
        <Section>
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ color: ROSE, letterSpacing: "0.14em" }}
          >
            Por que estes três
          </p>
          <h2 style={{ ...headlineStyle, fontSize: "clamp(1.15rem, 3vw, 1.5rem)", marginBottom: "1rem" }}>
            Porque <span style={{ color: ROSE }}>nenhum dos três se sustenta
            sozinho</span>
          </h2>
          <p style={{ ...bodyText, marginBottom: "0.9rem" }}>
            Dá para dominar a temperagem como pouca gente domina e ainda assim
            fechar o mês no vermelho, porque um preço mal calculado consegue
            transformar trabalho bem feito em prejuízo. Do mesmo jeito, dá para
            ter a conta do custo redondinha e mesmo assim viver de mês bom
            seguido de mês vazio, quando não existe nada trazendo cliente fora
            das datas comemorativas.
          </p>
          <p style={{ ...bodyText, marginBottom: 0 }}>
            É por isso que olhamos os três juntos. Mexer em um só costuma trazer
            aquele alívio que dura algumas semanas e some no mês seguinte,
            enquanto a virada de patamar acontece quando produto, preço e vendas
            param de puxar cada um para um lado.
          </p>
        </Section>

        {/* ── 3. Quem é o Gustavo ── */}
        <Section className="!p-0 overflow-hidden">
          <img
            src="/fotos/gustavo.webp"
            alt="Gustavo Ono, chocolatier"
            className="w-full"
            style={{ display: "block", maxHeight: "400px", objectFit: "cover", objectPosition: "top" }}
          />
          <div className="p-7 md:p-10">
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-3"
              style={{ color: ROSE, letterSpacing: "0.14em" }}
            >
              Quem vai olhar o seu caso
            </p>
            <h2 style={{ ...headlineStyle, fontSize: "clamp(1.15rem, 3vw, 1.45rem)", marginBottom: "1rem" }}>
              O Gustavo começou vendendo chocolate para completar a renda,
              trabalhando de auxiliar administrativo.
            </h2>
            <p style={{ ...bodyText, fontSize: "0.95rem", marginBottom: "0.85rem" }}>
              Ainda no ensino médio, sem cozinha profissional, sem estrutura e
              sem ninguém para dizer o que fazer primeiro. A mesma cozinha de
              casa de onde a maioria das nossas alunas começa.
            </p>
            <p style={{ ...bodyText, fontSize: "0.95rem", marginBottom: "0.85rem" }}>
              Anos depois entrou no <strong style={{ color: "#F2E8D9" }}>Que Seja
              Doce, da GNT</strong>, competindo contra profissionais formados,
              sem nunca ter trabalhado numa cozinha de restaurante.{" "}
              <strong style={{ color: "#F2E8D9" }}>Venceu.</strong> Depois disso
              passou pelas cozinhas de Paola Carosella e Morena Leite, virou{" "}
              <strong style={{ color: "#F2E8D9" }}>Granchef Cordon Noir</strong>,
              foi capa da revista Padaria 2000 e levou suas receitas para a TV
              Gazeta.
            </p>
            <p style={{ ...bodyText, fontSize: "0.95rem", marginBottom: "0.85rem" }}>
              Só que o método que ele ensina hoje não nasceu em nenhum desses
              lugares. Nasceu dando aula dentro da cozinha das próprias alunas,
              com o que elas tinham em casa. Foi ali que ficou claro o que este
              diagnóstico mostra: técnica sozinha não tira ninguém do lugar.
            </p>
            <p style={{ ...bodyText, fontSize: "0.95rem", marginBottom: "1.25rem" }}>
              São <strong style={{ color: "#F2E8D9" }}>10 anos de chocolataria</strong>,
              milhares de alunas formadas no Brasil e no exterior, e um livro
              publicado, o <em>Arte em Chocolate</em>.
            </p>

            <div
              className="grid grid-cols-2 gap-3 pt-5"
              style={{ borderTop: `1px solid ${ROSE}33` }}
            >
              {[
                ["Que Seja Doce", "vencedor, GNT"],
                ["Granchef", "Cordon Noir"],
                ["Padaria 2000", "capa da revista"],
                ["Arte em Chocolate", "livro publicado"],
              ].map(([titulo, sub]) => (
                <div key={titulo}>
                  <p
                    className="font-semibold"
                    style={{ ...headlineStyle, fontSize: "0.98rem", lineHeight: 1.3 }}
                  >
                    {titulo}
                  </p>
                  <p style={{ color: "rgba(242,232,217,0.5)", fontSize: "0.78rem" }}>{sub}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* ── 4. Oferta principal, por rota ── */}
        {rota === "A" ? (
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
              Você acabou de ver onde estão os gargalos. Em 30 minutos, o Gustavo
              olha o seu caso específico, produto, precificação e estrutura, e te
              diz o que mudar primeiro e em que ordem.
            </p>
            <div className="space-y-3 mb-6">
              {[
                "O porquê de cada pilar do seu diagnóstico estar onde está",
                "Qual deles está custando mais faturamento agora",
                "O próximo passo prático, aplicável já na sua próxima produção",
                "Conversa direta sobre o seu negócio, sem conteúdo genérico",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: ROSE }} />
                  <p style={{ color: "rgba(242,232,217,0.85)", fontSize: "0.9rem", lineHeight: 1.55 }}>
                    {item}
                  </p>
                </div>
              ))}
            </div>
            <div
              className="rounded-xl p-4 mb-6 text-center text-sm font-semibold"
              style={{ backgroundColor: "rgba(176,141,87,0.1)", color: ROSE, border: `1px solid ${ROSE}33` }}
            >
              Gratuito · Sem compromisso · 30 minutos pelo WhatsApp
            </div>

            {/* CTA principal: a conversa parte dela */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWhatsAppClick}
              className="flex items-center justify-center gap-3 w-full py-4 px-6 rounded-2xl transition-all hover:opacity-90 shadow-lg"
              style={{
                backgroundColor: "#8E2841",
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
              style={{ color: "rgba(242,232,217,0.35)" }}
            >
              Ao tocar no botão, a conversa abre direto com o Gustavo, com a sua
              mensagem já escrita.
            </p>
          </Section>
        ) : (
          <Section>
            <h2
              style={{
                ...headlineStyle,
                fontSize: "clamp(1.2rem, 3vw, 1.6rem)",
                marginBottom: "0.75rem",
              }}
            >
              {firstName}, o seu próximo passo é ter{" "}
              <span style={{ color: ROSE }}>um produto que se vende sozinho</span>
            </h2>
            <p style={{ ...bodyText, marginBottom: "1.25rem" }}>
              Antes de organizar preço, cardápio e constância, existe uma etapa
              que vem primeiro: ter na mão um produto que a cliente prova, elogia
              e volta para comprar. É por aí que começa quem constrói uma
              chocolateria que dá lucro de verdade.
            </p>
            <p style={{ ...bodyText, marginBottom: "1.25rem" }}>
              O Treinamento Bombom Artístico é exatamente esse começo. Você
              aprende a produzir um bombom de alto padrão do zero ao acabamento,
              com o método que o Gustavo usa nos próprios produtos.
            </p>
            <div className="space-y-3 mb-6">
              {[
                "A técnica completa do bombom artístico, do zero ao acabamento",
                "O passo a passo que elimina o medo de errar e perder material",
                "Como precificar esse produto para vender com margem real",
                "Um item pronto para entrar no seu cardápio ainda este mês",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: ROSE }} />
                  <p style={{ color: "rgba(242,232,217,0.85)", fontSize: "0.9rem", lineHeight: 1.55 }}>
                    {item}
                  </p>
                </div>
              ))}
            </div>

            <a
              href={lowTicketUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleLowTicketClick}
              className="flex items-center justify-center gap-3 w-full py-4 px-6 rounded-2xl transition-all hover:opacity-90 shadow-lg"
              style={{
                backgroundColor: ROSE,
                color: "#1A0F09",
                fontWeight: 700,
                fontSize: "1.05rem",
                textDecoration: "none",
                letterSpacing: "-0.01em",
              }}
            >
              Quero o Treinamento Bombom Artístico
              <ArrowRight className="w-5 h-5" />
            </a>
            <p
              className="text-center text-xs mt-3"
              style={{ color: "rgba(242,232,217,0.35)" }}
            >
              Acesso imediato ao treinamento completo por R$ 97.
            </p>
          </Section>
        )}

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

        {/* ── 6. CTA repetido, por rota ── */}
        <Section>
          <h2
            style={{
              ...headlineStyle,
              fontSize: "clamp(1.1rem, 3vw, 1.4rem)",
              marginBottom: "0.75rem",
              textAlign: "center",
            }}
          >
            {rota === "A"
              ? "Pronta para entender o que mudar primeiro?"
              : "Pronta para começar pelo produto certo?"}
          </h2>
          <p
            className="text-center mb-6"
            style={{ ...bodyText, fontSize: "0.92rem" }}
          >
            {rota === "A"
              ? "A sessão é gratuita e dura 30 minutos. Você sai sabendo exatamente onde está o gargalo e qual é o próximo passo no seu caso."
              : "São R$ 97 pelo treinamento completo. Você sai com uma técnica dominada e um produto novo para entrar no seu cardápio."}
          </p>
          {rota === "A" ? (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWhatsAppClick}
              className="flex items-center justify-center gap-3 w-full py-4 px-6 rounded-2xl transition-all hover:opacity-90 shadow-lg"
              style={{
                backgroundColor: "#8E2841",
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
          ) : (
            <a
              href={lowTicketUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleLowTicketClick}
              className="flex items-center justify-center gap-3 w-full py-4 px-6 rounded-2xl transition-all hover:opacity-90 shadow-lg"
              style={{
                backgroundColor: ROSE,
                color: "#1A0F09",
                fontWeight: 700,
                fontSize: "1.05rem",
                textDecoration: "none",
                letterSpacing: "-0.01em",
              }}
            >
              Garantir minha vaga no treinamento
              <ArrowRight className="w-5 h-5" />
            </a>
          )}
        </Section>

        {/* ── 7. Alternativa secundária: só na Rota A ── */}
        {rota === "A" && (
          <div
            className="rounded-3xl p-7 mb-5"
            style={{
              border: `1px solid rgba(176,141,87,0.2)`,
              backgroundColor: "rgba(176,141,87,0.04)",
            }}
          >
            <p
              className="text-xs uppercase tracking-widest mb-3 text-center"
              style={{ color: "rgba(242,232,217,0.4)" }}
            >
              Ou, se preferir começar pela prática
            </p>
            <p
              className="text-center mb-4"
              style={{ color: "rgba(242,232,217,0.75)", fontSize: "0.9rem", lineHeight: 1.6 }}
            >
              Conheça o Treinamento Bombom Artístico e adicione ao cardápio um
              produto de alto padrão, que pode render até R$ 50 por caixa.
            </p>
            <a
              href={lowTicketUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleLowTicketClick}
              className="flex items-center justify-center gap-2 w-full py-3 px-5 rounded-xl transition-all hover:opacity-80"
              style={{
                border: `1px solid rgba(176,141,87,0.4)`,
                color: ROSE,
                fontWeight: 600,
                fontSize: "0.9rem",
                textDecoration: "none",
              }}
            >
              Ver o Treinamento Bombom Artístico por R$ 97
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        )}

        {/* Footer */}
        <div
          className="text-center pt-6"
          style={{ borderTop: "1px solid rgba(176,141,87,0.12)" }}
        >
          <p className="text-xs" style={{ color: "rgba(242,232,217,0.3)" }}>
            © Gustavo Ono · Todos os direitos reservados
          </p>
          <p className="text-xs mt-1" style={{ color: "rgba(242,232,217,0.2)" }}>
            Este diagnóstico foi gerado com base nas respostas de {leadData.name}.
          </p>
        </div>
      </div>
    </div>
  );
}
