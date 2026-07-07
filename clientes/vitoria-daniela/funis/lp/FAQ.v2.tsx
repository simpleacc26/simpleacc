import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

const faqs = [
  {
    question: "1 - Quanto tempo dura a análise estratégica?",
    answer: "A análise tem duração aproximada de 40 minutos e inclui análise do seu negócio atual, da oferta, do posicionamento e da estrutura de vendas, com diagnóstico claro dos gargalos e próximos passos."
  },
  {
    question: "2 - Quem realiza a análise?",
    answer: "A análise é realizada 100% online pela Vitória Daniela."
  },
  {
    question: "3 - Como devo me preparar para a conversa?",
    answer: "Para aproveitar ao máximo, recomendamos que você traga clareza sobre faturamento mensal médio, ticket do serviço/produto, como vende hoje (orgânico, indicação, anúncios) e suas principais frustrações (falta de previsibilidade, marketing que não vira venda, dependência de você para fechar)."
  },
  {
    question: "4 - Posso fazer a análise mesmo se meu negócio já funciona bem?",
    answer: "Sim! A análise é para quem quer escalar de forma estruturada, não apenas para quem está travado. Se você sente que pode faturar mais com o que já tem, o diagnóstico vai mostrar onde está a oportunidade."
  },
  {
    question: "5 - A análise é personalizada para o meu negócio?",
    answer: "Sim. Realizamos uma análise específica da sua realidade, do seu ticket, do seu mercado e do seu modelo atual, ajudando você a enxergar com clareza o que precisa ser ajustado."
  }
];

export function FAQ() {
  return (
    <section className="py-14 bg-transparent">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-[#FAFAFA] mb-8 text-center uppercase">PERGUNTAS FREQUENTES</h2>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="bg-[#111]/80 backdrop-blur-sm border border-[#222] px-6 rounded-2xl data-[state=open]:border-[#Cfb36e]/50 transition-colors">
              <AccordionTrigger className="text-left font-semibold text-[#FAFAFA] hover:text-[#Cfb36e] py-6 [&[data-state=open]>svg]:text-[#Cfb36e]">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-400 leading-relaxed pb-6 text-lg">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-8 text-center">
            <a
                href="https://api.whatsapp.com/send/?phone=5533997064731&text=Ol%C3%A1%2C+vim+pelo+site+e+gostaria+de+agendar+minha+an%C3%A1lise+estrat%C3%A9gica.&type=phone_number&app_absent=0"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] text-white px-10 py-4 rounded-xl font-bold hover:scale-105 hover:bg-[#1ebc57] transition-all shadow-[0_0_20px_rgba(37,211,102,0.3)] uppercase tracking-wide inline-block"
            >
                QUERO AGENDAR MINHA ANÁLISE ESTRATÉGICA
            </a>
        </div>
      </div>
    </section>
  );
}
