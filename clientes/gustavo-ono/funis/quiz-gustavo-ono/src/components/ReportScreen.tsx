import { ArrowRight, CheckCircle2 } from "lucide-react";
import { answerLabels } from "../data/questions";
import type { LeadData } from "./LeadCaptureForm";

const ROSE = "#C87B75";
const CARD_BG = "#2D1108";
const CARD_BG_LIGHT = "#3A1510";
const CTA_URL =
  "https://pay.hotmart.com/X104749935I?bid=1778078139368";

interface ReportScreenProps {
  leadData: LeadData;
  answers: Record<number, string>;
}

const sectionTitle: React.CSSProperties = {
  fontFamily: "Lora, Georgia, serif",
  fontSize: "clamp(1.4rem, 3vw, 1.9rem)",
  fontWeight: 600,
  lineHeight: 1.25,
  color: "#FBF1EE",
};

const body: React.CSSProperties = {
  color: "rgba(251, 241, 238, 0.8)",
  lineHeight: 1.75,
};

const Rose = ({ children }: { children: React.ReactNode }) => (
  <strong style={{ color: ROSE }}>{children}</strong>
);

function ScenarioBox({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="p-4 rounded-xl"
      style={{
        backgroundColor: "rgba(200, 123, 117, 0.07)",
        border: "1px solid rgba(200, 123, 117, 0.2)",
      }}
    >
      <div className="text-xs mb-1 font-semibold tracking-wider uppercase" style={{ color: ROSE }}>
        {label}
      </div>
      <div style={{ color: "#FBF1EE", lineHeight: 1.5 }}>{value}</div>
    </div>
  );
}

function CtaButton({ label, note }: { label: string; note: string }) {
  return (
    <div className="flex flex-col items-center gap-3 mt-6">
      <a
        href={CTA_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl transition-all shadow-lg hover:shadow-xl hover:opacity-90"
        style={{
          backgroundColor: ROSE,
          color: "#fff",
          fontWeight: 600,
          fontSize: "1rem",
          letterSpacing: "-0.01em",
          textDecoration: "none",
        }}
      >
        {label}
        <ArrowRight className="w-5 h-5" />
      </a>
      <p className="text-sm text-center" style={{ color: "rgba(200, 123, 117, 0.7)" }}>
        {note}
      </p>
    </div>
  );
}

const FRUSTRATION_COPY: Record<string, string> = {
  "Não consigo cobrar o que meu trabalho realmente vale":
    "cobrar o que seu trabalho realmente vale — mas sem o produto certo para justificar esse preço, você fica presa em negociações que drenam sua energia e sua margem",
  "Meus produtos não têm aparência profissional suficiente":
    "elevar a aparência dos seus chocolates para um nível profissional — porque você sabe que a compra começa com os olhos, e o que você produz merece ser visto como arte",
  "Não tenho clientes em quantidade suficiente ou constante":
    "ter uma clientela consistente que volta e indica — porque sem isso, cada semana é uma incerteza e você nunca consegue planejar seu crescimento",
  "Não me diferencio das outras confeiteiras no mercado":
    "se destacar em um mercado saturado — porque hoje qualquer pessoa com um molde e chocolate derretido se chama confeiteira, e você precisa de algo que mostre claramente que o seu nível é diferente",
};

const IMPEDIMENT_COPY: Record<string, string> = {
  "Falta de técnica específica em bombons artísticos de alto padrão":
    "a técnica — a diferença entre um bombom que parece artesanal e um que parece de vitrine de chocolateria europeia está em detalhes que ninguém te ensinou ainda",
  "Não sei como precificar e posicionar meus produtos corretamente":
    "o posicionamento — você produz com cuidado e atenção, mas não sabe como comunicar esse valor de forma que o cliente entenda e pague sem questionar",
  "Não tenho tempo para aprender novas técnicas":
    "o tempo — e é exatamente por isso que o que você aprende precisa ser rápido de dominar e imediatamente aplicável, sem curvas longas de aprendizado",
  "Tenho medo de investir em algo novo e não ter retorno":
    "a incerteza — e eu entendo isso completamente. Por isso o primeiro passo precisa ser algo com risco próximo de zero e resultado visível no mesmo fim de semana",
};

const OBJECTIVE_COPY: Record<string, string> = {
  "Lançar uma coleção de bombons assinados com identidade própria":
    "lançar uma coleção de bombons com a sua identidade — produtos que quando alguém vê, sabe imediatamente que são seus",
  "Triplicar minha renda com chocolates artesanais":
    "triplicar sua renda — e isso começa com um produto de maior percepção de valor que justifica um ticket mais alto",
  "Ser reconhecida como referência na minha cidade":
    "ser a referência em chocolates finos na sua cidade — e isso começa com um produto que causa admiração imediata",
  "Criar um negócio de chocolates online escalável":
    "construir um negócio de chocolates online — e para isso você precisa de um produto fotogênico, exclusivo e de alto valor percebido",
};

export function ReportScreen({ leadData, answers }: ReportScreenProps) {
  const getLabel = (questionIndex: number, value: string) => {
    const idx = parseInt(value) - 1;
    return answerLabels[questionIndex]?.[idx] || "";
  };

  const profile = getLabel(0, answers[0]);
  const frustration = getLabel(4, answers[4]);
  const impediment = getLabel(6, answers[6]);
  const objective = getLabel(7, answers[7]);
  const revenue = getLabel(8, answers[8]);

  const frustrationCopy =
    FRUSTRATION_COPY[frustration] ||
    "elevar sua confeitaria para um nível profissional que você sabe que é possível";
  const impedimentCopy =
    IMPEDIMENT_COPY[impediment] ||
    "algo que está travando esse crescimento — e que é possível resolver";
  const objectiveCopy =
    OBJECTIVE_COPY[objective] || "conquistar o próximo nível no seu negócio de chocolates";

  const firstName = leadData.name.split(" ")[0];

  return (
    <div className="min-h-screen p-4 md:p-6" style={{ backgroundColor: "#1A0900" }}>
      <div className="max-w-3xl mx-auto pb-16">

        {/* Header */}
        <div
          className="rounded-3xl p-8 md:p-12 mb-5 shadow-2xl"
          style={{ backgroundColor: CARD_BG }}
        >
          <p
            className="text-xs font-semibold tracking-widest uppercase mb-3"
            style={{ color: ROSE, letterSpacing: "0.15em" }}
          >
            Gustavo Ono · Diagnóstico Personalizado
          </p>
          <h1
            className="mb-3"
            style={{
              fontFamily: "Lora, Georgia, serif",
              fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
              fontWeight: 700,
              lineHeight: 1.2,
              color: "#FBF1EE",
            }}
          >
            O diagnóstico do seu negócio de chocolates está aqui, {firstName}.
          </h1>
          <p style={{ color: "rgba(251, 241, 238, 0.6)", fontSize: "0.9rem" }}>
            Elaborado com base nas suas respostas · {new Date().toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" })}
          </p>
        </div>

        {/* Intro personalizada */}
        <div
          className="rounded-3xl p-8 md:p-10 mb-5 shadow-xl"
          style={{ backgroundColor: CARD_BG }}
        >
          <h2 className="mb-6" style={sectionTitle}>
            Olá, {firstName}.
          </h2>
          <div className="space-y-4" style={body}>
            <p>
              Analisei suas respostas e tenho algo importante para compartilhar com você — algo que a maioria das
              confeiteiras nunca ouve de forma clara.
            </p>
            <p>
              Você se definiu como: <Rose>{profile}</Rose>. E sua maior frustração hoje é{" "}
              <Rose>{frustrationCopy}</Rose>.
            </p>
            <p>
              O que está na frente dessa conquista? <Rose>{impedimentCopy}</Rose>.
            </p>
            <p>
              Isso não é coincidência. É um padrão que aparece repetidamente entre confeiteiras
              talentosas que ainda não descobriram o produto certo para dar o salto.
            </p>
            <p>
              Este diagnóstico foi montado especificamente para o seu momento. Leia com atenção —
              o que você vai encontrar aqui vai nomear algo que você já sentia, mas ainda não tinha
              conseguido colocar em palavras.
            </p>
          </div>
        </div>

        {/* Cenário atual */}
        <div
          className="rounded-3xl p-8 md:p-10 mb-5 shadow-xl"
          style={{ backgroundColor: CARD_BG }}
        >
          <h2 className="mb-6" style={sectionTitle}>
            Leitura do seu cenário atual
          </h2>
          <p className="mb-5" style={body}>
            Com base no que você respondeu, esse é o retrato do seu negócio hoje:
          </p>
          <div className="space-y-3 mb-8">
            <ScenarioBox label="Seu perfil" value={profile} />
            <ScenarioBox label="O que mais te frustra" value={frustration} />
            <ScenarioBox label="O que te impede de crescer" value={impediment} />
            <ScenarioBox label="Seu objetivo principal" value={objective} />
            {revenue && <ScenarioBox label="Sua renda mensal atual" value={revenue} />}
          </div>
          <div className="space-y-4" style={body}>
            <p>Quando olho para esse conjunto, vejo algo muito específico:</p>
            <p>
              Você não tem um problema de talento. Não tem um problema de dedicação. Não tem um problema de amor
              pelo que faz.
            </p>
            <p>
              <Rose>Você tem um problema de produto âncora.</Rose>
            </p>
            <p>
              Seu portfólio atual não tem um produto que cause admiração imediata — um produto que quando alguém
              vê na vitrine, nas fotos, na mesa de festa, não consegue ignorar. Um produto que justifica um preço
              premium sem que você precise explicar por quê.
            </p>
            <p>
              E sem esse produto, você fica presa numa guerra de preço com outras confeiteiras que cobram menos
              porque entregam menos — mas o cliente não sabe distinguir.
            </p>
            <p>
              <Rose>Até agora.</Rose>
            </p>
          </div>
        </div>

        {/* O problema raiz */}
        <div
          className="rounded-3xl p-8 md:p-10 mb-5 shadow-xl"
          style={{ backgroundColor: CARD_BG }}
        >
          <h2 className="mb-6" style={sectionTitle}>
            Por que o esforço sozinho não resolve
          </h2>
          <div className="space-y-4" style={body}>
            <p>
              Deixa eu te contar o que acontece no mercado de chocolates artesanais que ninguém fala abertamente:
            </p>
            <p>
              <Rose>
                Existe uma diferença fundamental entre a confeiteira que vende chocolate e a chocolateira que
                vende experiência.
              </Rose>
            </p>
            <p>
              A confeiteira vende produto. A chocolateira de alto padrão vende uma peça de arte comestível —
              algo que as pessoas fotografam antes de comer, que guardam a caixinha vazia, que pedem de presente
              em datas especiais.
            </p>
            <p>
              Essa diferença não está nos ingredientes. Não está nos equipamentos. Está na técnica de construção
              do produto — e especificamente, na técnica do bombom artístico.
            </p>
            <p>
              O bombom artístico é o produto mais fotografável, mais presenteável e com maior margem do mercado de
              chocolates finos. Mas ele exige uma combinação específica de habilidades que a maioria dos cursos
              genéricos nunca ensina de forma integrada:
            </p>
            <div className="space-y-2 pl-4 mt-4">
              {[
                "A temperagem perfeita que garante o brilho espelhado",
                "A técnica de pintura interna que cria a cor na casca sem sugar",
                "O recheio com textura e sabor que fazem as pessoas fecharem os olhos",
                "A combinação de flavors que surpreende e fica na memória",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <div
                    className="w-1.5 h-1.5 rounded-full mt-2.5 flex-shrink-0"
                    style={{ backgroundColor: ROSE }}
                  />
                  <p style={{ color: "rgba(251, 241, 238, 0.85)" }}>{item}</p>
                </div>
              ))}
            </div>
            <p className="mt-4">
              Quando esses elementos se combinam no mesmo produto, acontece algo diferente:{" "}
              <Rose>o cliente não questiona o preço.</Rose>
            </p>
            <p>
              E você para de competir. Começa a ser procurada.
            </p>
          </div>
        </div>

        {/* Comparação antes/depois */}
        <div
          className="rounded-3xl p-8 md:p-10 mb-5 shadow-xl"
          style={{ backgroundColor: CARD_BG }}
        >
          <h2 className="mb-6" style={sectionTitle}>
            Dois cenários — você escolhe em qual quer estar
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div
              className="p-6 rounded-2xl"
              style={{
                backgroundColor: "rgba(200, 123, 117, 0.06)",
                border: "1px solid rgba(200, 123, 117, 0.15)",
              }}
            >
              <h3 className="text-base font-semibold mb-4" style={{ color: "rgba(251,241,238,0.6)" }}>
                Sem o produto certo
              </h3>
              <div className="space-y-2.5" style={{ color: "rgba(251, 241, 238, 0.65)", lineHeight: 1.6, fontSize: "0.9rem" }}>
                <p>— Compete por preço com quem cobra menos</p>
                <p>— Produz muito, margem pequena</p>
                <p>— Cliente não percebe diferença no que você entrega</p>
                <p>— Precisa explicar por que seu chocolate vale mais</p>
                <p>— Cada venda depende de você convencer</p>
                <p>— Fotos bonitas, mas nada que cause impacto real</p>
              </div>
            </div>
            <div
              className="p-6 rounded-2xl"
              style={{
                backgroundColor: "rgba(200, 123, 117, 0.12)",
                border: "2px solid rgba(200, 123, 117, 0.35)",
              }}
            >
              <h3 className="text-base font-semibold mb-4" style={{ color: ROSE }}>
                Com o bombom artístico no portfólio
              </h3>
              <div className="space-y-2.5" style={{ color: "rgba(251, 241, 238, 0.85)", lineHeight: 1.6, fontSize: "0.9rem" }}>
                <p>— O produto fala por si só — sem precisar explicar</p>
                <p>— Ticket médio sobe sem aumentar o volume</p>
                <p>— Clientes pedem como presente para pessoas que importam</p>
                <p>— Fotos geram compartilhamento orgânico</p>
                <p>— Você vira referência — não por marketing, por produto</p>
                <p>— A diferença é visível. O preço premium é aceito.</p>
              </div>
            </div>
          </div>
          <p className="mt-6 text-center" style={{ ...body, fontSize: "1rem" }}>
            A diferença não está nos ingredientes, nos equipamentos nem nas redes sociais.{" "}
            <Rose>Está na técnica do produto.</Rose>
          </p>
        </div>

        {/* O custo de continuar */}
        <div
          className="rounded-3xl p-8 md:p-10 mb-5 shadow-xl"
          style={{ backgroundColor: CARD_BG }}
        >
          <h2 className="mb-6" style={sectionTitle}>
            O custo de continuar como está
          </h2>
          <div className="space-y-4 mb-8" style={body}>
            <p>
              Preciso ser honesto com você, {firstName}.
            </p>
            <p>
              <Rose>
                Cada semana que passa sem o produto certo no portfólio é uma semana de margem abaixo do que
                você poderia ter.
              </Rose>
            </p>
            <p>
              Não porque você não se esforça. Porque o esforço está sendo aplicado no produto errado para
              o posicionamento que você quer ter.
            </p>
            <div
              className="p-5 rounded-2xl my-6"
              style={{
                backgroundColor: "rgba(200, 123, 117, 0.08)",
                border: "1px solid rgba(200, 123, 117, 0.25)",
              }}
            >
              <p className="mb-3" style={{ color: "rgba(251, 241, 238, 0.9)" }}>
                Uma caixa de bombons artísticos de 6 unidades pode ser vendida entre <Rose>R$80 e R$180</Rose>,
                dependendo do posicionamento e acabamento.
              </p>
              <p style={{ color: "rgba(251, 241, 238, 0.9)" }}>
                Uma caixa de trufas convencionais do mesmo tamanho: entre <Rose>R$35 e R$60</Rose>.
              </p>
              <p className="mt-3" style={{ color: "rgba(251, 241, 238, 0.7)", fontSize: "0.9rem" }}>
                A diferença não é de custo de ingrediente. <Rose>É de técnica e percepção de valor.</Rose>
              </p>
            </div>
            <p>
              Mas tem um custo que não aparece em planilha: o custo de continuar competindo num mercado onde
              o cliente não te vê como referência. Onde você precisa se justificar. Onde o "tá caro"
              acontece com frequência.
            </p>
            <p>
              <Rose>Esse custo é invisível. Mas ele é real.</Rose>
            </p>
          </div>
          <CtaButton
            label="Quero aprender a técnica do bombom artístico"
            note="Acesso imediato · R$97 · Garantia de 7 dias"
          />
        </div>

        {/* A solução */}
        <div
          className="rounded-3xl p-8 md:p-10 mb-5 shadow-xl"
          style={{ backgroundColor: CARD_BG }}
        >
          <p
            className="text-xs font-semibold tracking-widest uppercase mb-4"
            style={{ color: ROSE, letterSpacing: "0.15em" }}
          >
            A solução
          </p>
          <h2 className="mb-6" style={sectionTitle}>
            Bombom Artístico de Morango, Baunilha, Cumaru e Praliné de Avelãs
          </h2>
          <div className="space-y-4 mb-8" style={body}>
            <p>
              O Gustavo Ono desenvolveu esse módulo para ensinar exatamente o que está entre você e o produto
              que transforma um portfólio comum em uma marca de confeitaria de alto padrão.
            </p>
            <p>
              Não é teoria genérica. É a receita completa — do zero — de um bombom artístico com quatro
              componentes de sabor que se complementam: a acidez do morango, a cremosidade da baunilha, o
              toque exótico do cumaru e a crocância do praliné de avelãs.
            </p>
            <p>
              Um produto com esse nível de construção de sabor e acabamento visual coloca você imediatamente
              num outro patamar — o das chocolateiras que as pessoas <Rose>procuram</Rose>, não das que precisam
              correr atrás de cliente.
            </p>
          </div>

          {/* O que você vai aprender */}
          <div
            className="p-6 rounded-2xl mb-8"
            style={{ backgroundColor: CARD_BG_LIGHT, border: `1px solid rgba(200,123,117,0.2)` }}
          >
            <h3 className="text-base font-semibold mb-5" style={{ color: ROSE }}>
              O que você vai dominar
            </h3>
            <div className="space-y-3">
              {[
                "Temperagem profissional e o segredo do brilho espelhado",
                "Técnica de pintura na casca — criando cor e arte sem sugar o chocolate",
                "Ganache de morango com equilíbrio perfeito de acidez e doçura",
                "Creme de baunilha suave e cremoso que complementa sem sobrepor",
                "Uso do cumaru — o ingrediente que faz as pessoas perguntarem o que é aquele sabor",
                "Praliné de avelãs crocante — textura que transforma a experiência de comer",
                "Fechamento e acabamento de nível profissional",
                "Precificação e posicionamento do bombom artístico no seu portfólio",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2
                    className="w-4 h-4 mt-0.5 flex-shrink-0"
                    style={{ color: ROSE }}
                  />
                  <p style={{ color: "rgba(251, 241, 238, 0.85)", fontSize: "0.9rem" }}>{item}</p>
                </div>
              ))}
            </div>
          </div>

          <CtaButton
            label="Quero acesso ao Bombom Artístico"
            note="Clique e garanta agora · R$97 · Acesso imediato na Hotmart"
          />
        </div>

        {/* Próximo passo */}
        <div
          className="rounded-3xl p-8 md:p-10 mb-5 shadow-xl"
          style={{ backgroundColor: CARD_BG }}
        >
          <h2 className="mb-6" style={sectionTitle}>
            {firstName}, o que precisa acontecer agora
          </h2>
          <div className="space-y-4 mb-8" style={body}>
            <p>
              Com base no diagnóstico, o próximo passo lógico para você é:{" "}
              <Rose>{objectiveCopy}</Rose>.
            </p>
            <p>
              E a forma mais direta de fazer isso é adicionando ao seu portfólio um produto que muda a conversa
              com o cliente — que ele compra sem questionar e que compartilha por vontade própria.
            </p>
            <p>
              O Bombom Artístico de Morango, Baunilha, Cumaru e Praliné de Avelãs é esse produto.
            </p>
            <p>
              Você vai aprender do zero — mesmo sem experiência prévia com técnicas avançadas — e vai poder
              aplicar no mesmo fim de semana em que assistir.
            </p>
            <div
              className="p-5 rounded-2xl mt-4"
              style={{
                backgroundColor: "rgba(200, 123, 117, 0.08)",
                border: "1px solid rgba(200, 123, 117, 0.25)",
              }}
            >
              <p className="text-sm" style={{ color: "rgba(251, 241, 238, 0.7)" }}>
                <Rose>Sobre a mentoria:</Rose> se além da técnica você quiser trabalhar o posicionamento do seu
                negócio de chocolates de forma estruturada — precificação, portfólio, aquisição de clientes —
                o time do Gustavo Ono vai entrar em contato pelo WhatsApp que você forneceu para apresentar
                as opções disponíveis.
              </p>
            </div>
          </div>
          <CtaButton
            label="Garantir o Bombom Artístico agora"
            note="R$97 · Acesso imediato · Garantia incondicional de 7 dias"
          />
        </div>

        {/* Footer */}
        <div
          className="text-center pt-8"
          style={{ borderTop: "1px solid rgba(200, 123, 117, 0.15)" }}
        >
          <p className="mb-2 text-sm" style={{ color: "rgba(251, 241, 238, 0.5)" }}>
            Diagnóstico elaborado pelo time de Gustavo Ono
          </p>
          <p className="text-xs mb-4" style={{ color: "rgba(251, 241, 238, 0.35)" }}>
            Este relatório foi gerado com base nas respostas de {leadData.name} e é de uso exclusivo.
          </p>
          <p className="text-xs" style={{ color: "rgba(251, 241, 238, 0.25)" }}>
            © Gustavo Ono · Todos os direitos reservados
          </p>
        </div>
      </div>
    </div>
  );
}
