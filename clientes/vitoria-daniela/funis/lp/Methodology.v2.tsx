import { Search, Target, TrendingUp, AlertCircle } from "lucide-react";

export function Methodology() {
  return (
    <section className="py-14 max-w-[1440px] mx-auto px-6 md:px-10 bg-transparent">
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#FAFAFA] mb-6 leading-tight uppercase max-w-5xl mx-auto">
            NESSA <span className="text-[#Cfb36e]">CONVERSA ESTRATÉGICA</span>, VOCÊ VAI ENTENDER EXATAMENTE O QUE ESTÁ IMPEDINDO SEU NEGÓCIO DE <span className="text-[#Cfb36e]">CRESCER COM PREVISIBILIDADE</span>, E SAIR COM UM <span className="text-[#Cfb36e]">PLANO DE AÇÃO CLARO</span> DO PRÓXIMO PASSO.
        </h2>
        <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Vamos analisar seu negócio atual, sua oferta, seu posicionamento, sua forma de atrair audiência e seu método de vendas. Assim, vamos fazer um raio-x completo do seu negócio, identificando exatamente o que você precisa fazer para escalar seus resultados.
        </p>
      </div>

      <div className="max-w-4xl mx-auto mb-10">
          <h3 className="text-xl md:text-2xl font-bold text-[#Cfb36e] mb-8 text-center uppercase">
              Ao final, você sai com clareza sobre:
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#111]/80 backdrop-blur-sm p-6 rounded-xl border border-[#222] flex gap-4 items-start hover:border-[#Cfb36e]/30 transition-colors">
                  <div className="mt-1 text-[#Cfb36e]">
                      <AlertCircle size={24} />
                  </div>
                  <p className="text-gray-200 font-medium text-lg">
                      O que está impedindo suas vendas de serem previsíveis
                  </p>
              </div>

              <div className="bg-[#111]/80 backdrop-blur-sm p-6 rounded-xl border border-[#222] flex gap-4 items-start hover:border-[#Cfb36e]/30 transition-colors">
                  <div className="mt-1 text-[#Cfb36e]">
                      <Target size={24} />
                  </div>
                  <p className="text-gray-200 font-medium text-lg">
                      Se sua oferta está alinhada com o público certo e como ela deveria ser comunicada
                  </p>
              </div>

              <div className="bg-[#111]/80 backdrop-blur-sm p-6 rounded-xl border border-[#222] flex gap-4 items-start hover:border-[#Cfb36e]/30 transition-colors">
                  <div className="mt-1 text-[#Cfb36e]">
                      <Search size={24} />
                  </div>
                  <p className="text-gray-200 font-medium text-lg">
                      Onde está a falha da sua estratégia de vendas
                  </p>
              </div>

              <div className="bg-[#111]/80 backdrop-blur-sm p-6 rounded-xl border border-[#222] flex gap-4 items-start hover:border-[#Cfb36e]/30 transition-colors">
                  <div className="mt-1 text-[#Cfb36e]">
                      <TrendingUp size={24} />
                  </div>
                  <p className="text-gray-200 font-medium text-lg">
                      O que fazer para escalar seu negócio
                  </p>
              </div>
          </div>
      </div>

      <div className="mt-10 text-center max-w-3xl mx-auto space-y-8">
         <p className="text-lg text-gray-300 font-medium">
            Você vai receber um diagnóstico estratégico baseado na realidade do seu negócio e no que funciona para vendas de serviços e produtos de alto ticket.
         </p>
         <a
            href="https://api.whatsapp.com/send/?phone=5533999476324&text=Ol%C3%A1%2C+vim+pelo+site+e+gostaria+de+agendar+minha+an%C3%A1lise+estrat%C3%A9gica.&type=phone_number&app_absent=0"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] text-white px-10 py-4 rounded-xl font-bold hover:scale-105 hover:bg-[#1ebc57] transition-all shadow-[0_0_20px_rgba(37,211,102,0.3)] uppercase tracking-wide inline-block"
         >
            QUERO AGENDAR MINHA ANÁLISE ESTRATÉGICA
         </a>
      </div>
    </section>
  );
}
