import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import imgImage5 from "figma:asset/f4af2743c5f6565ba1e16d28aac2c0c0a3acea23.png";
import imgImage6 from "figma:asset/2530f655f9722159700c4e2cbf263b310e488bae.png";
import imgImage7 from "figma:asset/53802b531750af53a9b5cca8735cda8f0e00f4cc.png";
import imgImage8 from "figma:asset/4c0977c6be857ca8dcbba94255f89575253e591a.png";

const testimonials = [
    imgImage5, imgImage6, imgImage7, imgImage8
];

export function Testimonials() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2, // Default to 2 slides (Desktop)
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
    responsive: [
      {
        breakpoint: 768, // Max-width 768px (Mobile)
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false
        }
      }
    ]
  };

  return (
    <section className="bg-white py-14">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10">
        <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-[#090806] mb-4 leading-tight uppercase">
              <span className="text-[#Cfb36e]">RESULTADOS</span> DE QUEM PASSOU POR ESSE <span className="text-[#Cfb36e]">DIAGNÓSTICO</span>:
            </h2>
        </div>

        {/* Carousel Layout */}
        <div className="mb-10 px-4 w-full max-w-[820px] mx-auto block testimonial-slider [&_.slick-prev:before]:text-[#Cfb36e] [&_.slick-next:before]:text-[#Cfb36e] [&_.slick-dots_li.slick-active_button:before]:text-[#Cfb36e] [&_.slick-dots_li_button:before]:text-gray-400">
            <Slider {...settings}>
                {testimonials.map((img, idx) => (
                    <div key={idx} className="px-3 outline-none">
                        {/* Added max-w-[340px] and mx-auto to constrain image size on desktop */}
                        {/* Updated card styles for white background: lighter bg, border, and shadow */}
                        <div className="bg-white rounded-[20px] overflow-hidden border border-gray-200 shadow-xl hover:border-[#Cfb36e]/50 transition-all max-w-[340px] mx-auto">
                            <img src={img} alt={`Resultado ${idx + 1}`} className="w-full h-auto block" />
                        </div>
                    </div>
                ))}
            </Slider>
        </div>

        <div className="text-center">
             <p className="text-gray-600 font-medium mb-6 uppercase tracking-wide text-lg">Aperte no botão abaixo para garantir sua vaga:</p>
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
