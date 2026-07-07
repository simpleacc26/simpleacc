import { useState } from "react";
import { ArrowRight, AlertTriangle } from "lucide-react";

const challenges = [
  {
    title: "Falta de clareza do caminho a seguir",
    description: "Você sabe que precisa estruturar sua presença online, mas não sabe por onde começar nem o que priorizar primeiro."
  },
  {
    title: "Já tentou sozinho ou com agências de marketing",
    description: "Você já investiu tempo ou dinheiro tentando resolver isso, mas não teve o resultado ou a organização que esperava."
  },
  {
    title: "Se sente abarrotado de informações",
    description: "Tanto conteúdo e tanta opinião diferente só deixam mais difícil saber o que realmente funciona para o seu negócio."
  }
];

export function Quiz() {
  const [selected, setSelected] = useState<number | null>(null);

  const getWhatsappLink = () => {
    const baseUrl = "https://api.whatsapp.com/send/?phone=5533997064731";
    const text = selected !== null
      ? `Ol%C3%A1%2C%20me%20identifiquei%20com%20o%20desafio%20\"${encodeURIComponent(challenges[selected].title)}\"%20e%20gostaria%20de%20agendar%20minha%20an%C3%A1lise.`
      : "Ol%C3%A1%2C+vim+pelo+site+e+gostaria+de+agendar+minha+an%C3%A1lise+estrat%C3%A9gica.";
    return `${baseUrl}&text=${text}&type=phone_number&app_absent=0`;
  };

  return (
    <section className="py-20 bg-transparent text-[#FAFAFA]">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12 space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold text-[#FAFAFA] leading-tight uppercase">
            SE VOCÊ JÁ VENDE UM SERVIÇO DE <span className="text-[#Cfb36e]">ALTO TICKET</span> E SENTE QUE PRECISA DE AJUDA PARA VENDER MAIS, TER ORGANIZAÇÃO E ARRUMAR SUA <span className="text-[#Cfb36e]">"VIDA ONLINE"</span>, PROVAVELMENTE VOCÊ ESTÁ ENFRENTANDO ESSES DESAFIOS:
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {challenges.map((item, index) => (
            <div
              key={index}
              onClick={() => setSelected(index)}
              className={`p-8 rounded-[24px] border cursor-pointer transition-all duration-300 flex flex-col gap-4 group h-full
                ${selected === index
                  ? "border-[#Cfb36e] bg-[#Cfb36e]/10 shadow-[0_0_20px_rgba(207,179,110,0.2)]"
                  : "border-[#222] bg-[#111]/80 backdrop-blur-sm hover:border-[#Cfb36e]/50 hover:bg-[#161616]"
                }`}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-colors
                  ${selected === index ? "bg-[#Cfb36e] text-black" : "bg-[#222] text-[#Cfb36e] group-hover:bg-[#Cfb36e]/20"}`}>
                  <AlertTriangle size={24} />
              </div>
              <div>
                  <h3 className={`text-xl font-bold mb-3 ${selected === index ? "text-[#Cfb36e]" : "text-[#FAFAFA]"}`}>
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {item.description}
                  </p>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-6 text-center max-w-4xl mx-auto">
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-medium">
                Se você se identificar com alguns desses cenários, provavelmente precisará de uma análise estratégica. Ou seja: investir em algo que realmente traga resultado.
            </p>
            <p className="text-base md:text-lg text-gray-400 leading-relaxed">
                Porque não adianta investir em agências tradicionais ou em métodos de "gurus" que tentam te empurrar métodos generalizados. O que você precisa é de alguém que olhe especificamente para o seu contexto e, considerando seus objetivos, crie um plano especialmente para você.
            </p>

            <div className="pt-8">
                <p className="text-xl font-bold text-[#FAFAFA] mb-8 uppercase">
                    Saia dessa conversa individual com o caminho para estruturar seu negócio no digital com clareza e de forma personalizada pro seu momento.
                </p>
                <a
                    href={getWhatsappLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#25D366] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#1ebc57] hover:scale-105 transition-all shadow-lg shadow-[#25D366]/20 uppercase tracking-wide"
                >
                    AGENDAR MINHA ANÁLISE ESTRATÉGICA
                    <ArrowRight size={20} />
                </a>
            </div>
        </div>
      </div>
    </section>
  );
}
