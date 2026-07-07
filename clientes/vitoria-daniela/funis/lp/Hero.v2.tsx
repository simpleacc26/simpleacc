import { ArrowRight } from "lucide-react";
import imgHero from "figma:asset/65a838286d95ba76681f066fc49273dbc2a11ee5.png";

export function Hero() {
  return (
    <section className="relative w-full max-w-[1440px] mx-auto px-6 md:px-10 py-12 md:py-20 flex flex-col md:flex-row items-center gap-12 bg-transparent">
      {/* Background Gradient Effect - Adjusted to feel more integrated */}
      <div className="absolute top-0 left-0 w-full h-full overflow-visible pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-[#Cfb36e]/10 rounded-full blur-[150px]"></div>
      </div>

      {/* Text Content - Order 1 on mobile (appearing first), Order 1 on desktop */}
      <div className="flex-1 space-y-8 max-w-2xl z-10 order-1">
        <h1 className="font-extrabold text-[#FAFAFA] leading-[1.15] uppercase text-[26px] md:text-[38px] lg:text-[46px] tracking-wide text-center md:text-left drop-shadow-sm">
          TENHA UMA PRESENÇA ONLINE QUE DEMONSTRE A <span className="text-[#Cfb36e]">AUTORIDADE</span> QUE VOCÊ JÁ TEM NO OFFLINE E ATRAIA CLIENTES DE <span className="text-[#Cfb36e]">ALTO VALOR</span>.
        </h1>
        <h2 className="md:text-xl font-medium text-gray-300 leading-relaxed text-[16px] text-center md:text-left">
            Tenha clareza do que é preciso para construir um canal de vendas organizado, assertivo e que faça sentido para o tamanho do seu negócio. Atraia o cliente que reconhece e paga pelo seu valor sem que você precise perder tempo com o que não gera resultado ou arriscar a reputação que levou anos para construir. Toque abaixo para agendar uma análise estratégica e desenhar o seu plano online.
        </h2>

        <div className="flex flex-col sm:flex-row items-center md:items-start gap-6 pt-4 justify-center md:justify-start">
            <div className="space-y-2">
                <a
                    href="https://api.whatsapp.com/send/?phone=5533997064731&text=Ol%C3%A1%2C+vim+pelo+site+e+gostaria+de+agendar+minha+an%C3%A1lise+estrat%C3%A9gica.&type=phone_number&app_absent=0"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-fit items-center gap-2 bg-[#25D366] text-white px-8 py-4 rounded-xl font-bold hover:scale-105 hover:bg-[#1ebc57] transition-all shadow-[0_0_20px_rgba(37,211,102,0.3)] uppercase text-sm tracking-wide"
                >
                    AGENDAR MINHA ANÁLISE ESTRATÉGICA
                    <ArrowRight size={20} />
                </a>
            </div>
        </div>
      </div>

      {/* Image Content - Order 2 on desktop (appearing second), implied order on mobile allows text to be first due to source order */}
      <div className="flex-1 relative w-full flex items-center justify-center z-10 order-1 md:order-2">
        <div className="relative w-full max-w-[400px] md:max-w-[500px] aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl border border-[#333]">
            <img
                src={imgHero}
                alt="Vitória Daniela - Especialista"
                className="w-full h-full object-cover"
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#090806]/80 via-transparent to-transparent"></div>
        </div>
      </div>
    </section>
  );
}
