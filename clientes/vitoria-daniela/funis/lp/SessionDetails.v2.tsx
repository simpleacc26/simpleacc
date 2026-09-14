import { Clock } from "lucide-react";

export function SessionDetails() {
  return (
    <section className="py-14 bg-transparent text-[#FAFAFA] relative overflow-visible">
        {/* Decorative Background - Adjusted positioning to blend */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#Cfb36e]/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-10 relative z-10">
        {/* Scarcity Section */}
        <div className="max-w-4xl mx-auto bg-[#111]/80 backdrop-blur-sm text-[#FAFAFA] p-8 md:p-12 rounded-[24px] text-center border border-[#Cfb36e]/30 shadow-[0_0_40px_rgba(207,179,110,0.15)] relative">
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#Cfb36e] text-black px-6 py-2 rounded-full font-bold text-sm uppercase tracking-wider shadow-lg flex items-center gap-2">
                <Clock size={16} />
                Atenção
            </div>
            <p className="text-xl leading-relaxed mb-6 font-medium text-white">
                Semanalmente, disponibilizo alguns horários para realizar sessões diagnósticas focadas em empresárias e empreendedores que já vendem, mas sentem que poderiam estar faturando mais com o que já têm.
            </p>
            <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                Nesta análise individual, você terá acesso a um diagnóstico estratégico do seu negócio e clareza sobre o que precisa ser ajustado para crescer com previsibilidade.
            </p>

            <div className="flex justify-center">
                 <div className="animate-bounce p-2 bg-[#Cfb36e]/10 rounded-full text-[#Cfb36e]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 5v14M19 12l-7 7-7-7"/>
                    </svg>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}
