import image_20f999df7b99af69ba305090d4717cfd3977d0d0 from 'figma:asset/20f999df7b99af69ba305090d4717cfd3977d0d0.png'
import { CheckCircle } from "lucide-react";
import imgVit from 'figma:asset/590b1057e89b9be1224aa089984bd015b7d9f010.png';

export function AboutExpert() {
  return (
    <section className="py-14 bg-transparent text-[#FAFAFA]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 flex flex-col lg:flex-row items-center gap-16">
        {/* Image - Visible only on Desktop to allow custom positioning on mobile */}
        <div className="hidden lg:block lg:w-1/2 relative">
             <div className="aspect-[3/4] rounded-[40px] overflow-hidden border border-[#222] shadow-2xl relative z-10">
                <img
                    src={image_20f999df7b99af69ba305090d4717cfd3977d0d0}
                    alt="Vitória Daniela"
                    className="w-full h-full object-cover"
                />
             </div>
             {/* Decorative Background */}
             <div className="absolute top-10 -left-10 w-full h-full border border-[#Cfb36e]/30 rounded-[40px] -z-0"></div>
        </div>

        {/* Text */}
        <div className="lg:w-1/2 space-y-8 lg:order-last">
            <h2 className="text-3xl md:text-4xl font-bold text-[#FAFAFA] uppercase border-l-8 border-[#Cfb36e] pl-6">
                SOBRE <span className="text-[#Cfb36e]">VITÓRIA DANIELA</span>:
            </h2>

            <div className="space-y-6 text-lg text-gray-300 leading-relaxed font-light">
                <p>
                    Com mais de 8 anos de experiência no marketing digital, já esteve à frente de mais de 300 projetos, ajudando empresas e profissionais a alcançarem faturamentos de 5, 6 e 7 dígitos, no Brasil e nos EUA, além disso construiu seu próprio faturamento de mais de R$600.000 vendendo serviços com um perfil com menos de 150 seguidores no Instagram.
                </p>
                <p>
                    Atendeu infoprodutores, empresas, agências e profissionais liberais: o que deu a ela uma visão completa do que realmente funciona (e do que não funciona) em vendas online.
                </p>

                {/* Mobile Image - Inserted here to appear above the card on mobile */}
                <div className="block lg:hidden w-full mb-8 relative max-w-[400px] mx-auto">
                    <div className="aspect-[3/4] rounded-[40px] overflow-hidden border border-[#222] shadow-2xl relative z-10">
                        <img
                            src={imgVit}
                            alt="Vitória Daniela"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                <div className="bg-[#111]/80 backdrop-blur-sm p-6 rounded-2xl border border-[#222]">
                    <p className="font-bold text-[#FAFAFA] mb-4 uppercase text-sm tracking-wider">O diferencial do trabalho dela está em três pontos:</p>
                    <ul className="space-y-4">
                        <li className="flex items-start gap-3">
                            <CheckCircle className="text-[#Cfb36e] shrink-0 mt-1" size={20} />
                            <span>Ensina o que vive na prática</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <CheckCircle className="text-[#Cfb36e] shrink-0 mt-1" size={20} />
                            <span>Tem uma visão de negócio completa do negócio, trazendo sua experiência como copywriter e empresária</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <CheckCircle className="text-[#Cfb36e] shrink-0 mt-1" size={20} />
                            <span>Se compromete com os resultados dos clientes com visão de dono e dedicação profunda</span>
                        </li>
                    </ul>
                </div>

                <p>
                    Hoje, além da Agência Krona, conduz conversas estratégicas para empresárias que já vendem e precisam de clareza estratégica para crescer com previsibilidade, sem perder tempo testando o que já foi validado.
                </p>
            </div>

            <div className="pt-4">
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
      </div>
    </section>
  );
}
