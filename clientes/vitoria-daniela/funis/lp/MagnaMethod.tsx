import { Globe2, Target, ClipboardList } from "lucide-react";

const phases = [
  {
    number: "01",
    icon: Globe2,
    title: "Presença digital nas redes sociais",
    description: "É a estrutura completa necessária para o seu negócio estar posicionado dentro da internet de forma séria. Envolve alinhar o seu posicionamento, seus conteúdos e sua mensagem para que o mercado enxergue a sua autoridade."
  },
  {
    number: "02",
    icon: Target,
    title: "Captação de novos clientes",
    description: "É a implementação de funis de venda estratégicos desenhados para trazer clientes qualificados, assumindo o controle comercial para você parar de depender apenas de indicações e tenha previsibilidade."
  },
  {
    number: "03",
    icon: ClipboardList,
    title: "Organização nas vendas",
    description: "É a organização do dia a dia da sua operação comercial. Envolve estruturar as suas estratégias de venda, fornecer suporte comercial, melhorar o fluxo de atendimento e os processos necessários para garantir a conversão dos leads que chegam."
  }
];

export function MagnaMethod() {
  return (
    <section className="py-20 bg-transparent text-[#FAFAFA] relative overflow-visible">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#Cfb36e]/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-10 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#FAFAFA] mb-6 leading-tight uppercase max-w-5xl mx-auto">
            PARA CRESCER COM CONSISTÊNCIA E PREVISIBILIDADE, O <span className="text-[#Cfb36e]">MÉTODO MAGNA</span> ORGANIZA A SUA OPERAÇÃO ATRAVÉS DE UMA ENGRENAGEM DE 3 FASES:
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {phases.map((phase) => {
            const Icon = phase.icon;
            return (
              <div
                key={phase.number}
                className="bg-[#111]/80 backdrop-blur-sm p-8 rounded-[24px] border border-[#222] flex flex-col gap-4 hover:border-[#Cfb36e]/30 transition-colors h-full"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#Cfb36e]/10 flex items-center justify-center text-[#Cfb36e] shrink-0">
                    <Icon size={24} />
                  </div>
                  <span className="text-[#Cfb36e] font-bold text-sm tracking-widest">{phase.number}</span>
                </div>
                <h3 className="text-xl font-bold text-[#FAFAFA]">{phase.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{phase.description}</p>
              </div>
            );
          })}
        </div>

        <div className="text-center max-w-3xl mx-auto space-y-8">
          <p className="text-lg text-gray-300 font-medium">
            Toque abaixo para agendar sua Análise Estratégica. Nessa conversa, nós vamos mapear a sua estrutura atual para identificar exatamente o que falta para implementar essa engrenagem de forma personalizada no seu momento.
          </p>
          <a
            href="https://api.whatsapp.com/send/?phone=5533997064731&text=Ol%C3%A1%2C+vim+pelo+site+e+gostaria+de+agendar+minha+an%C3%A1lise+estrat%C3%A9gica.&type=phone_number&app_absent=0"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] text-white px-10 py-4 rounded-xl font-bold hover:scale-105 hover:bg-[#1ebc57] transition-all shadow-[0_0_20px_rgba(37,211,102,0.3)] uppercase tracking-wide inline-block"
          >
            AGENDAR MINHA ANÁLISE ESTRATÉGICA
          </a>
        </div>
      </div>
    </section>
  );
}
