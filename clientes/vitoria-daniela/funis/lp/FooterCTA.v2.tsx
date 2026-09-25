import { ArrowRight } from "lucide-react";

export function FooterCTA() {
  return (
    <section className="py-16 bg-transparent relative overflow-visible text-center">
       {/* Decorative Background - Adjusted positioning to blend */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#Cfb36e]/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold text-[#FAFAFA] mb-8 leading-tight uppercase">
            Tenha em mãos o <span className="text-[#Cfb36e]">plano de ação</span> para <span className="text-[#Cfb36e]">escalar as vendas</span> do seu produto de <span className="text-[#Cfb36e]">alto ticket</span>, com um posicionamento alinhado, consistência e <span className="text-[#Cfb36e]">previsibilidade</span>.
        </h2>

        <p className="text-[#Cfb36e] text-xl font-medium mb-8">
            Agende sua conversa estratégica e descubra o caminho claro:
        </p>

        <a
            href="https://api.whatsapp.com/send/?phone=5533999476324&text=Ol%C3%A1%2C+vim+pelo+site+e+gostaria+de+agendar+minha+an%C3%A1lise+estrat%C3%A9gica.&type=phone_number&app_absent=0"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] text-white px-12 py-5 rounded-xl font-bold hover:scale-105 transition-transform shadow-[0px_0px_30px_0px_rgba(37,211,102,0.4)] uppercase text-lg tracking-wide animate-pulse inline-flex items-center gap-2"
        >
            QUERO AGENDAR MINHA ANÁLISE ESTRATÉGICA
            <ArrowRight />
        </a>
      </div>
    </section>
  );
}
