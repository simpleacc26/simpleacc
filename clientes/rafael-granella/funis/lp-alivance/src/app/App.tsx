import { useState, useEffect } from 'react';
import { ImageWithFallback } from './components/figma/ImageWithFallback';

const W = 'https://api.whatsapp.com/send/?phone=5554933002628&text=Ol%C3%A1%21+Vim+pelo+site+e+gostaria+de+saber+mais&type=phone_number&app_absent=0';
const T = "DE MENTOR PARA EMPRESÁRIO DA EDUCAÇÃO · MÉTODO + MODELO + VENDAS + MENTALIDADE · ALIVANCE CLUB · +R$100K/MÊS · ".repeat(10);

export default function App() {
  const [show, setShow] = useState(false);
  const [faq, setFaq] = useState<number | null>(null);

  useEffect(() => {
    const t = setTimeout(() => {
      const l = document.createElement('link');
      l.rel = 'stylesheet';
      l.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Fahkwang:wght@700&display=swap';
      document.head.appendChild(l);
      const s = document.createElement('script');
      s.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-MVWPJF6H');`;
      document.head.appendChild(s);
    }, 5000);
    const h = () => scrollY > 600 && setShow(true);
    addEventListener('scroll', h, { passive: true });
    return () => { removeEventListener('scroll', h); clearTimeout(t); };
  }, []);

  return (
    <div className="bg-[#0a0a0f] min-h-screen">
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[#292859] opacity-90"></div>
        <div className="relative z-10 max-w-[1100px] mx-auto px-6 py-20 text-center">
          <div className="mb-8">

            <ImageWithFallback
              src="/logo-alivance.png"
              alt="Alivance Club"
              className="h-16 md:h-20 mx-auto"
            />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">Mentores que operam como empresários da educação não disputam cliente. Eles constroem negócios.</h1>
          <p className="text-xl md:text-2xl text-[#c5c8d6] mb-12 max-w-4xl mx-auto leading-relaxed">O Alivance Club transforma mentores, coaches e consultores em empresários da educação que faturam +R$100k por mês — com método, modelo de negócio, processo de vendas e mentalidade integrados.</p>
          <button onClick={() => window.open(W, '_blank')} className="bg-[#c8b28b] text-white font-bold rounded-lg px-12 py-5 text-xl hover:bg-[#b39d75] transition-colors mb-8">Quero minha sessão estratégica</button>
          <p className="text-[#c5c8d6] font-medium mt-12">Mais de 40 mentores transformados</p>
        </div>
      </section>

      {/* CASOS RECENTES */}
      <section className="py-20 bg-[#0a0a0f]">
        <div className="max-w-[1100px] mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-16 text-center">Casos recentes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#111118] border border-[#c8b28b]/30 rounded-xl p-8">
              <div className="text-5xl font-bold text-[#c8b28b] mb-4">R$500.000</div>
              <div className="text-white font-bold text-xl mb-2">Greice</div>
              <div className="text-[#c5c8d6] mb-4">3 meses | em 3 meses</div>
              <div className="inline-block bg-[#c8b28b]/20 border border-[#c8b28b]/40 rounded-full px-4 py-2 text-sm text-[#c5c8d6]">Ajuste de ticket + trabalho de mentalidade</div>
            </div>
            <div className="bg-[#111118] border border-[#c8b28b]/30 rounded-xl p-8">
              <div className="text-5xl font-bold text-[#c8b28b] mb-4">R$600.000</div>
              <div className="text-white font-bold text-xl mb-2">Fabrício</div>
              <div className="text-[#c5c8d6] mb-4">6 meses | trabalhando 1 dia por semana</div>
              <div className="inline-block bg-[#c8b28b]/20 border border-[#c8b28b]/40 rounded-full px-4 py-2 text-sm text-[#c5c8d6]">Trabalhando 1 dia por semana com mentorias</div>
            </div>
            <div className="bg-[#111118] border border-[#c8b28b]/30 rounded-xl p-8">
              <div className="text-5xl font-bold text-[#c8b28b] mb-4">R$120.000</div>
              <div className="text-white font-bold text-xl mb-2">Camila</div>
              <div className="text-[#c5c8d6] mb-4">30 dias | primeira turma estruturada</div>
              <div className="inline-block bg-[#c8b28b]/20 border border-[#c8b28b]/40 rounded-full px-4 py-2 text-sm text-[#c5c8d6]">Primeira turma estruturada como empresária da educação</div>
            </div>
          </div>
        </div>
      </section>

      {/* DOR */}
      <section className="py-20 bg-[#111118]">
        <div className="max-w-[900px] mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-12">Você provavelmente está aqui porque:</h2>
          <div className="space-y-4 mb-12">
            {["Fatura de R$30k a R$80k por mês com consistência, mas o crescimento travou", "Sabe que pode cobrar mais — mas não sabe como justificar sem perder clientes", "Já tentou criar grupo, aumentar preço ou investir em tráfego. O resultado foi parcial", "Sua agenda está cheia, mas o faturamento não cresce proporcionalmente", "Depende de indicação e networking para fechar. Mês bom, mês ruim", "Não sabe exatamente qual é o próximo movimento certo"].map((t, i) => (
              <div key={i} className="flex items-start gap-4 py-3"><span className="text-[#c8b28b] text-xl font-bold mt-1">—</span><p className="text-[#c5c8d6] text-lg leading-relaxed">{t}</p></div>
            ))}
          </div>
          <p className="text-2xl font-bold text-[#00BFFF] text-center">Isso não é falta de capacidade. É falta de modelo.</p>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="bg-[#292859] py-4 overflow-hidden"><div className="animate-marquee whitespace-nowrap"><span className="text-white font-bold text-lg tracking-wide inline-block">{T}</span></div></div>

      {/* REFRAME */}
      <section className="py-20 bg-[#0a0a0f]">
        <div className="max-w-[1100px] mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-16 text-center">Existe uma diferença entre mentor e empresário da educação.</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-[#111118] border border-red-900/30 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-white mb-4">MENTOR</h3>
              <p className="text-[#c5c8d6] leading-relaxed">Seu negócio depende de você presente em cada entrega. Cada novo cliente = mais trabalho. O crescimento tem um teto — o tamanho da sua agenda.</p>
            </div>
            <div className="bg-[#111118] border border-[#c8b28b]/30 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-white mb-4">EMPRESÁRIO DA EDUCAÇÃO</h3>
              <p className="text-[#c5c8d6] leading-relaxed">Construiu método, modelo e processo. O negócio cresce sem ele ser o gargalo.</p>
            </div>
          </div>
          <div className="max-w-3xl mx-auto">
            <p className="text-[#c5c8d6] text-lg leading-relaxed mb-6 text-center">A maioria dos mentores que chegou ao seu patamar tentou resolver isso aumentando o preço. Ou criando um grupo genérico. Ou investindo em tráfego sem ajustar o modelo. Não funcionou porque o problema não está no volume. Está na estrutura.</p>
            <p className="text-2xl font-bold text-white text-center">O problema não está no volume. Está na estrutura.</p>
          </div>
        </div>
      </section>

      {/* 4 FRENTES */}
      <section className="py-20 bg-[#111118]">
        <div className="max-w-[1100px] mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-16 text-center">O olhar do Rafael atua em 4 frentes simultâneas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {[{n:"01",t:"Método",d:"Estrutura a forma de entrega para que você possa escalar sem perder profundidade. Seu cliente recebe mais — você trabalha menos por entrega."},{n:"02",t:"Modelo de negócio",d:"Constrói o formato que cresce sem depender da sua presença constante. Precificação, posicionamento e arquitetura da oferta alinhados ao próximo nível."},{n:"03",t:"Processo de vendas",d:"Previsibilidade de aquisição com o ticket que o seu trabalho realmente vale. Não é sobre vender mais — é sobre vender certo."},{n:"04",t:"Mentalidade",d:"Identidade de empresário, não de prestador de serviço. Crenças que travam o crescimento identificadas e quebradas com precisão cirúrgica."}].map((m,i)=>(
              <div key={i} className="bg-[#111118] border border-[#c8b28b]/30 rounded-xl p-8">
                <div className="text-6xl font-bold text-[#c8b28b] mb-6">{m.n}</div>
                <h3 className="text-white font-bold text-2xl mb-4">{m.t}</h3>
                <p className="text-[#c5c8d6] leading-relaxed">{m.d}</p>
              </div>
            ))}
          </div>
          <p className="text-xl text-[#c5c8d6] text-center max-w-3xl mx-auto">Nenhuma dessas frentes funciona isolada. Esse é o motivo pelo qual mentores que tentaram resolver um ponto só continuam no mesmo lugar.</p>
        </div>
      </section>

      {/* QUEM É RAFAEL */}
      <section className="py-20 bg-[#0a0a0f]">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

            <div className="aspect-square rounded-2xl overflow-hidden bg-[#1a1a2e] flex items-center justify-center">
              <ImageWithFallback
                src="/rafael.png"
                alt="Rafael Granella"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">Quem é Rafael Granella</h2>
              <p className="text-[#c5c8d6] text-lg leading-relaxed mb-6">Rafael Granella trabalha há mais de 11 anos com educação. Não entrou nesse mercado para fazer dinheiro rápido — entrou para construir um negócio de longo prazo que transforma profissionais de verdade.</p>
              <p className="text-[#c5c8d6] text-lg leading-relaxed mb-6">É mentor do Alivance Club dentro da MLS (Mentor League Society), sócio da MLS ao lado de Flávio Augusto Caio e Joel e já acompanhou mais de 40 mentores e consultores na transição de prestador de serviço para empresário da educação.</p>
              <p className="text-[#c5c8d6] text-lg leading-relaxed mb-6">O diferencial não está no volume de mentorados — está na profundidade do acompanhamento. Rafael atende poucos. E atende de perto.</p>
              <p className="text-[#c5c8d6] text-lg leading-relaxed mb-8">Tudo isso, dentro de um ecossistema de mentorias que faturou 1Bi em menos de 2 anos.</p>
              <div className="flex flex-wrap gap-4">
                {["11 anos de educação","+40 mentores acompanhados","Sócio da MLS","+1BI em 2 anos"].map((b,i)=>(
                  <span key={i} className="bg-[#c8b28b]/20 border border-[#c8b28b]/40 rounded-full px-4 py-2 text-[#c5c8d6]">{b}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RESULTADOS REAIS */}
      <section className="py-20 bg-[#111118]">
        <div className="max-w-[1400px] mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-16 text-center">Resultados reais</h2>

          <div className="overflow-hidden">
            <div className="flex gap-6 animate-marquee">
              {['/screenshot-1.jpg','/screenshot-2.jpg','/screenshot-3.jpg','/screenshot-1.jpg','/screenshot-2.jpg','/screenshot-3.jpg'].map((s,i)=>(
                <div key={i} className="flex-shrink-0 w-[350px] h-[440px] rounded-xl overflow-hidden border border-[#c8b28b]/20 bg-[#1a1a2e] flex items-center justify-center">
                  <ImageWithFallback src={s} alt="" className="w-full h-full object-contain"/>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* OFERTA */}
      <section className="py-20 bg-[#0a0a0f]">
        <div className="max-w-[900px] mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">O que você acessa no Alivance Club</h2>
          <div className="space-y-4 mb-12">
            {["Sessões individuais com Rafael — olhar direto no seu negócio, sem fórmula genérica","Imersões presenciais — aprofundamento estratégico com mentorados selecionados","Hotseats online — análise em tempo real com o grupo de alto nível","Acesso ao método completo regravado — sprint estruturado desde o primeiro dia","Comunidade de mentores e empresários que já operam no próximo nível"].map((t,i)=>(
              <div key={i} className="flex items-start gap-4 py-3"><span className="text-[#c8b28b] text-2xl font-bold">✓</span><p className="text-white text-lg leading-relaxed">{t}</p></div>
            ))}
          </div>
          <div className="bg-[#c8b28b]/10 border border-[#c8b28b]/30 rounded-xl p-8 mb-8">
            <p className="text-white text-lg leading-relaxed mb-2"><span className="font-bold">Vagas disponíveis este mês:</span> Rafael atende no máximo 12 novos membros por mês.</p>
            <p className="text-[#c5c8d6]">Não por limitação operacional — por escolha estratégica.</p>
          </div>
          <div className="text-center"><button onClick={() => window.open(W, '_blank')} className="bg-[#c8b28b] text-white font-bold rounded-lg px-12 py-5 text-xl hover:bg-[#b39d75] transition-colors">Quero minha sessão estratégica</button></div>
        </div>
      </section>

      {/* PARA QUEM É / NÃO É */}
      <section className="py-20 bg-[#0a0a0f]">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#111118] border border-green-900/30 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">PARA QUEM É</h3>
              <div className="space-y-4">
                {["Você já fatura de forma consistente com mentoria, consultoria ou coaching","Tem clientes reais e entrega resultado comprovado","Quer crescer sem aumentar proporcionalmente sua carga de trabalho","Está disposto a ajustar o modelo — não só empurrar mais volume"].map((t,i)=>(
                  <div key={i} className="flex items-start gap-3"><span className="text-green-500 text-xl">✓</span><p className="text-[#c5c8d6]">{t}</p></div>
                ))}
              </div>
            </div>
            <div className="bg-[#111118] border border-red-900/30 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">PARA QUEM NÃO É</h3>
              <div className="space-y-4">
                {["Ainda está construindo sua base de clientes do zero","Quer uma fórmula pronta para copiar e colar","Não está disposto a questionar o modelo que usa hoje","Busca resultado sem investimento proporcional"].map((t,i)=>(
                  <div key={i} className="flex items-start gap-3"><span className="text-red-500 text-xl">✗</span><p className="text-[#c5c8d6]">{t}</p></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-[#111118]">
        <div className="max-w-[900px] mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">Dúvidas frequentes</h2>
          <div className="space-y-4">
            {[{q:"Já tentei mentoria antes e não funcionou.",a:"A diferença não está em tentar novamente — está em ajustar o que você está construindo. A maioria das mentorias foca em uma frente só: ou é vendas, ou é mentalidade, ou é método. O Alivance Club integra as 4 frentes simultaneamente. E mais: não é uma fórmula pronta para todo mundo. É um olhar direto no seu negócio, com ajuste personalizado ao seu momento."},{q:"Não sei se tenho o perfil certo.",a:"Se você já fatura de forma consistente, tem clientes que confiam em você e entrega resultado comprovado, você tem o perfil. O próximo nível não é sobre capacidade técnica — é sobre modelo de negócio, processo de vendas e mentalidade. Se você está disposto a questionar o modelo atual e construir algo mais escalável, você tem exatamente o perfil que o Alivance Club foi desenhado para acompanhar."},{q:"O investimento é alto.",a:"Comparado a quê? Greice fez R$500.000 em 3 meses. Fabrício fez R$600.000 em 6 meses trabalhando 1 dia por semana. Camila fez R$120.000 em 30 dias na primeira turma estruturada como empresária da educação. O investimento não é alto quando você está construindo um negócio que cresce sem depender da sua presença constante. O que é realmente caro é continuar no mesmo lugar."},{q:"Não tenho tempo para mais uma mentoria.",a:"Exatamente. Você não tem tempo para mais uma mentoria genérica que vai te dar mais conteúdo sem aplicação direta. O Alivance Club não é isso. Você não vai assistir 40 horas de aula. Você vai ter sessões individuais diretas no seu negócio, com implementação real, em tempo real. E o resultado disso é justamente ter mais tempo — porque você vai construir um modelo que não depende de você estar presente em cada entrega."}].map((f,i)=>(
              <div key={i} className="bg-[#111118] border border-[#c8b28b]/20 rounded-xl overflow-hidden">
                <button onClick={()=>setFaq(faq===i?null:i)} className="w-full flex items-center justify-between p-6 text-left">
                  <span className="text-white font-bold text-lg pr-4">{f.q}</span>
                  <svg className={`w-6 h-6 text-[#c8b28b] flex-shrink-0 transition-transform ${faq===i?'rotate-180':''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
                </button>
                {faq===i&&<div className="p-6 pt-0 text-[#c5c8d6] leading-relaxed">{f.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#292859] opacity-90"></div>
        <div className="relative z-10 max-w-[900px] mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">O próximo nível do seu negócio começa com uma decisão.</h2>
          <p className="text-xl text-[#c5c8d6] mb-12 leading-relaxed">Não de comprar. De entender onde você está e o que está entre você e onde quer chegar. A sessão estratégica é gratuita, sem compromisso e sem pitch genérico. É uma análise real — do seu modelo, do seu momento e do seu próximo movimento.</p>
          <button onClick={() => window.open(W, '_blank')} className="bg-[#c8b28b] text-white font-bold rounded-lg px-12 py-5 text-xl hover:bg-[#b39d75] transition-colors mb-6">Agendar minha sessão estratégica</button>
          <p className="text-[#c5c8d6] text-sm mb-2">Vagas limitadas. Rafael atende no máximo 12 novos membros por mês.</p>
          <p className="text-[#c5c8d6] text-xs">🔒 Nenhuma cobrança nesta etapa. A sessão é gratuita. Ao enviar, você concorda com nossa Política de Privacidade.</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0a0a0f] border-t border-[#c8b28b]/20 py-8">
        <div className="max-w-[1100px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-white font-bold text-xl">ALIVANCE CLUB</div>
          <div className="text-[#c5c8d6] text-sm">© 2026 Alivance Club. Todos os direitos reservados.</div>
        </div>
      </footer>

      {/* CTA STICKY MOBILE */}
      {show && (
        <div className="fixed bottom-0 left-0 right-0 bg-[#0a0a0f] border-t border-[#c8b28b]/30 p-4 z-50 md:hidden">
          <button onClick={() => window.open(W, '_blank')} className="bg-[#c8b28b] text-white font-bold rounded-lg px-12 py-5 text-xl hover:bg-[#b39d75] transition-colors w-full">Quero minha sessão estratégica</button>
        </div>
      )}
    </div>
  );
}
