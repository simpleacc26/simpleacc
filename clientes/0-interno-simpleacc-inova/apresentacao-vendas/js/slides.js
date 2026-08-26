/* =====================================================================
   Apresentação de Vendas - Simple (v8)
   Base: modelo Full Sales; nova estratégia com 5 pilares e
   oferta única de Implementação (R$5k setup + R$3k/mês protagonista).
   Copy verbatim das novas rodadas do CEO/closer.
   ===================================================================== */

const money = (n)=> 'R$ '+n.toLocaleString('pt-BR');

/* ============ PARTE COMUM ============ */
const COMMON = [

  // 1: CAPA
  { type:'cover', sec:'Abertura', label:'Capa', wordmark:'SIMPLE', tag:'Funil de Lead Dinâmico' },

  // 2: PROMESSA (nova headline, sem lead, com 3 cards)
  { type:'statement', sec:'Abertura', label:'Promessa principal',
    title:'Como você terá oportunidades mais qualificadas com investimento menor em tráfego para vender mentorias high ticket, através de um processo de aquisição inovador, simplificado, previsível e lucrativo',
    bullets:[
      'Para ter uma verdadeira máquina de vender high ticket e escalar',
      'Para que a empresa te sirva e não o contrário',
      'Através de equipe com 4 anos de experiência e resultado em vendas através do digital, sem precisar ter anos de experiência e gastar dinheiro em teste de tráfego para saber o que dá resultado',
    ]},

  // 3: SOBRE DANIEL
  { type:'bio', sec:'Autoridade', label:'Quem é Daniel Souza?',
    photo:'assets/daniel-luiz.jpg', photoNatural:true,
    title:'Quem é Daniel Souza?',
    paras:[
      'Daniel Souza é casado com Cecília, empresário, gestor de tráfego e estrategista de crescimento digital, responsável por milhões em faturamento através de campanhas com foco em performance, escala e lucratividade.',
      'Cristão, com fortes princípios e convicções, Daniel é movido pela missão de escalar negócios digitais com produtos transformadores, capazes de mudar a vida das pessoas.',
    ],
    marcos:[
      '+13M em faturamento gerados por campanhas de vendas online',
      '+150 projetos atendidos',
      'Aluno da Zion Legacy (mentoria do Luiz Filho)',
      'Foi sócio do Luiz Filho',
      'Aluno da Fernanda Face (ex-Nubank)',
      'Acelerado da Full Sales',
      'Faixa azul 4 graus de jiu-jitsu',
    ]},

  // 4: TRAJETÓRIA
  { type:'traj', sec:'Autoridade', label:'A trajetória da Simple',
    title:'A trajetória da Simple', photo:'assets/daniel-telao.jpg',
    marcos:[
      'Marca de 1.57 mi de faturamento no primeiro ano de atuação',
      'Escritório na Marçal Tower',
      '+40 negócios implementando nossa metodologia',
      'Marca de R$ 411 mil de faturamento na nossa própria operação',
    ]},

  // 5: INFERNO (vermelho vivo)
  { type:'list', sec:'Diagnóstico', label:'O contexto atual (Inferno)', theme:'red',
    title:'O contexto atual do mercado digital',
    bullets:[
      '<b>Lead caro e descomprometido:</b> chegam muitos, mas poucos compram',
      '<b>Sessão estratégica perdeu força:</b> o mercado foi saturado e o lead cansou',
      '<b>Concorrência explodiu após a onda high ticket:</b> todo mundo virou mentor',
      '<b>Conversão baixa:</b> você gera lead mas não fecha venda',
      '<b>Falta de previsibilidade:</b> um mês bom, dois ruins... sem controle sobre o próximo',
      '<b>CAC e CPL só aumentam:</b> tráfego mais caro, resultado menor',
      '<b>Marketing e vendas desalinhados:</b> o tráfego traz lead que o comercial não sabe fechar',
    ],
    foot:'O resultado disso é desânimo, exaustão e a sensação de que você está fazendo tudo certo, mas os números não respondem.' },

  // 6: CÉU
  { type:'list', sec:'Diagnóstico', label:'Solução para queda de ROI', tone:'good',
    title:'Solução para queda de ROI',
    lead:'Acoplar ofertas irresistíveis e Processos de Aquisição Inovador alinhado, com setters e closers em todas as etapas de contato com cliente, para:',
    bullets:[
      '<b>PREVISIBILIDADE:</b> você sabe o que vai fechar mês a mês',
      '<b>LEADS QUALIFICADOS:</b> esteira ativa entregando leads prontos para o comercial, todo dia',
      '<b>EMPRESA SÓLIDA:</b> negócio num patamar de referência no seu nicho',
      '<b>TICKET MAIS ALTO:</b> ofertas posicionadas corretamente, com ancoragem de valor',
      '<b>ROI DE X10 A X40:</b> cada real investido em tráfego retorna de forma previsível',
      '<b>SISTEMA REPLICÁVEL:</b> um processo de crescimento que você não precisa reinventar todo mês',
      '<b>INDEPENDÊNCIA:</b> tráfego pago lucrativo sem depender só de indicação ou orgânico',
    ]},

  // 7: RISCOS (vermelho vivo)
  { type:'cards', sec:'Diagnóstico', label:'Riscos de fazer sozinho', theme:'red', cols:3,
    title:'Riscos de fazer sozinho sem o conhecimento',
    cards:[
      {h:'Tentativa e erro constante', p:'Tempo e dinheiro investidos sem resultado previsível.'},
      {h:'Contratar um gestor de tráfego que não estrutura ponta a ponta', p:'Ele roda anúncio, mas não resolve o problema e você fica preso no mesmo ciclo.'},
      {h:'Não identificar onde está o gargalo real da sua operação', p:'Pode ser a oferta, o funil, o comercial ou os três ao mesmo tempo. E sem um diagnóstico, você trata o sintoma, enquanto a causa continua gerando problemas.'},
      {h:'Gerar lead mas não converter em receita', p:'Funil sem comercial estruturado é dinheiro escorrendo.'},
      {h:'Investir em tráfego sem saber o CAC real', p:'Você gasta sem saber se está tendo lucro ou prejuízo.'},
      {h:'Falta de sinergia entre marketing e vendas', p:'O tráfego precisa alimentar o comercial com lead com fit, não com volume.'},
    ]},

  // 8: BENEFÍCIOS / VENDA DO FUTURO
  { type:'cards', sec:'Diagnóstico', label:'Quanto valeria ter tudo isso', cols:3,
    title:'Quanto valeria para o seu negócio, hoje, ter tudo isso?',
    cards:[
      {h:'Leads qualificados chegando todos os dias', p:'Sem depender de indicação, produzir conteúdo em massa e nem fazer lives ou lançamentos.'},
      {h:'CAC previsível e controlado', p:'Você sabe exatamente quanto custa cada cliente antes de fechar o mês.'},
      {h:'Funil rodando de forma autônoma', p:'Sem você precisar estar no operacional para que o sistema funcione.'},
      {h:'Comercial com agenda lotada de MQL todos os dias', p:'Seu time vai ter oportunidades de vendas o tempo todo.'},
      {h:'Clareza total sobre os números', p:'CPL, CAC, taxa de agendamento e de fechamento, visíveis em tempo real.'},
      {h:'Receita gerada pela base que você já tem', p:'Sem precisar de lead novo para aumentar o faturamento.'},
    ]},

  // 9: TRANSIÇÃO (nova copy)
  { type:'statement', sec:'Metodologia', label:'O novo formato', titleClass:'xl',
    title:'O Funil de Lead Dinâmico é o novo formato de aquisição do mercado digital',
    lead:'É a metodologia que mais vai funcionar nos próximos meses e poucos mentores ainda estão usando.' },

  // 10: 5 PILARES (mandala com "seu processo de Vendas" no centro, só nomes)
  { type:'mandala5', sec:'Metodologia', label:'Os 5 pilares',
    title:'Os 5 pilares que escalam uma empresa',
    core:'O seu processo de Vendas',
    petals:[
      {n:'01', k:'Oferta Irresistível'},
      {n:'02', k:'Aquecimento e Implicação em Forma de Perguntas'},
      {n:'03', k:'Entrada Facilitada'},
      {n:'04', k:'Hub de Aquisição'},
      {n:'05', k:'Inteligência de Aquisição'},
    ]},

  // 11: PILAR 1 (copy nova)
  { type:'pillar', sec:'Metodologia', label:'Pilar 1: Oferta Irresistível', n:'01',
    illo:'oferta',
    title:'Oferta Irresistível',
    sub:'A venda começa antes da reunião: o lead entra por uma dor específica, não por uma call genérica',
    lead:'O funil que todo mundo usa chama o lead direto pra uma reunião. Vira commodity: o lead já viu essa oferta mil vezes e ignora. No Funil de Lead Dinâmico é diferente: eu chamo o lead por uma dor específica dele e ofereço ajuda personalizada com aquilo. É uma oferta que ele nunca viu, então ele enxerga muito mais valor.',
    bullets:[
      'O lead entra por algo que importa pra ele, não por "agende uma call"',
      'Oferta que o mercado não tem: você foge da guerra de commodity',
      'Como o valor percebido é maior, o tráfego custa menos e você cobra mais caro',
    ]},

  // 12: PILAR 2
  { type:'pillar', sec:'Metodologia', label:'Pilar 2: Aquecimento e Implicação em Forma de Perguntas', n:'02',
    illo:'quiz',
    title:'Aquecimento e Implicação em Forma de Perguntas',
    sub:'A venda começa antes da reunião',
    lead:'O lead na internet está anestesiado, passa por tudo no automático. As perguntas do quiz quebram isso: cada pergunta reacende a dor dele e mostra a implicação de não resolver. Quando ele chega na reunião, já está consciente e movido. O trabalho que o comercial levaria a call inteira pra fazer, o quiz já fez.',
    bullets:[
      'Cada resposta aquece o lead e traz a dor de volta à tona',
      'O lead chega na reunião decidido, não do zero',
      'Você não capta e depois aquece: capta e vende no mesmo passo',
    ]},

  // 13: PILAR 3
  { type:'pillar', sec:'Metodologia', label:'Pilar 3: Entrada Facilitada', n:'03',
    illo:'entrada',
    title:'Entrada Facilitada',
    sub:'Mais MQL entrando no CRM, custo menor por lead',
    lead:'Pedir reunião logo de cara é uma barreira alta. Um quiz é um primeiro passo fácil, e isso muda a matemática do funil: muito mais leads adquiridos. Com mais MQL entrando, o custo por lead despenca e o comercial tem volume de clientes para trabalhar.',
    bullets:[
      'Mais MQL no topo que gera custo por lead qualificado muito menor',
      'Volume pro comercial trabalhar, não uma agenda vazia',
      'Redução do CAC',
    ]},

  // 14: PILAR 4
  { type:'pillar', sec:'Metodologia', label:'Pilar 4: Hub de Aquisição', n:'04',
    illo:'hub',
    title:'Hub de Aquisição',
    sub:'Um funil só, vários destinos',
    lead:'Você concentra todo o investimento num funil só e manda o lead para caminhos completamente diferentes conforme ele responde. O mesmo tráfego alimenta high ticket, perpétuo e outros funis. Menos verba pulverizada, CAC menor, aquisição mais simples de tocar.',
    bullets:[
      'Um funil, um investimento em vez de vários funis competindo por verba',
      'O lead é roteado pro destino certo conforme responde',
      'Tráfego concentrado gerando CAC menor e operação mais leve',
    ]},

  // 15: PILAR 5 (novo)
  { type:'pillar', sec:'Metodologia', label:'Pilar 5: Inteligência de Aquisição', n:'05',
    illo:'inteligencia',
    title:'Inteligência de Aquisição',
    sub:'Você para de comprar lead no escuro',
    lead:'Cada lead que passa pelo quiz deixa um rastro. Você faz lead score de verdade, sabe exatamente que tipo de lead está entrando e qual criativo traz o melhor comprador, não o mais barato. E o seu SDR recebe o lead com informação na mão: sabe a dor, o contexto, o momento. A abordagem é certeira em vez de genérica.',
    bullets:[
      'Lead score real: você sabe quem está entrando e quem vale mais',
      'Descobre qual criativo traz comprador, não só clique barato',
      'O SDR aborda com contexto, tendo uma comunicação comercial mais assertiva',
    ]},

  // 16: FASES visão geral
  { type:'phases', sec:'Implementação', label:'Fases da implementação',
    title:'Fases da Implementação Simple',
    steps:[
      {n:'1', h:'Validação', p:'Encontrar o primeiro quiz que converte, validar a linha criativa e gerar as primeiras vendas'},
      {n:'2', h:'Otimização', p:'Estabilizar os custos, escalar o que funcionou, ganhar mercado'},
      {n:'3', h:'Escala e Consolidação', p:'Escalar o investimento, consolidar previsibilidade e lucro'},
    ]},

  // 17-19: FASES
  { type:'phase', sec:'Implementação', label:'Fase 1: Validação', n:'1', name:'VALIDAÇÃO',
    objetivo:'Encontrar o primeiro quiz que converte, validar a linha criativa e gerar as primeiras vendas',
    metas:['Encontrar o primeiro quiz e página que performam','Coletar 100 leads qualificados no mês','Gerar de 2 a 5 vendas no mês'] },
  { type:'phase', sec:'Implementação', label:'Fase 2: Otimização', n:'2', name:'OTIMIZAÇÃO',
    objetivo:'Estabilizar os custos, escalar o que funcionou, ganhar mercado e encontrar as alavancas de crescimento',
    metas:['Manter CPL estável dentro da meta (variação máxima de 20%, CPL máximo R$30)','Dobrar o investimento em mídia','Analisar e otimizar o CAC','Reunião comparativa com mês anterior via Growth Model'] },
  { type:'phase', sec:'Implementação', label:'Fase 3: Escala e Consolidação', n:'3', name:'ESCALA E CONSOLIDAÇÃO',
    objetivo:'Escalar o investimento, consolidar previsibilidade e lucro',
    metas:['Duplicar novamente o investimento em mídia','Chegar a +R$100k/mês de faturamento recorrente','Operação previsível, lucrativa e escalável'] },

  // 20: transição pro produto
  { type:'statement', sec:'Produto', label:'Transição para o produto', titleClass:'xl',
    title:'Agora eu quero te apresentar o programa que estrutura tudo isso',
    lead:'Da oferta ao comercial, do funil ao crescimento, implementado com você, não por você.' },

  // 21: CAPA DO PRODUTO
  { type:'divider', sec:'Produto', label:'Capa do produto',
    title:'Programa de Implementação Simple' },

  // 22: NO QUE CONSISTE (4 bullets novos)
  { type:'consists', sec:'Produto', label:'No que consiste o programa',
    title:'No que consiste o Programa de Implementação Simple',
    points:[
      'Ofertas irresistíveis que fazem os leads implorarem para comprar',
      'Funil de Lead Dinâmico que filtra lead ruim e reduz o custo de aquisição',
      'Um funil, vários destinos: o mesmo funil alimenta high ticket, perpétuo e low ticket',
      'Inteligência de aquisição: cada lead ensina você a comprar o próximo melhor, CAC caindo enquanto escala',
    ]},
];

/* ============ ENTREGÁVEIS (15 slides, 1 por entregável) ============ */
const ENTREGAVEIS = [
  { title:'Mapa Estratégico', sub:'Diagnóstico triplo antes de rodar tráfego',
    p:'Diagnóstico triplo: oferta + ICP + mercado / comercial / mídia paga. Antes de rodar qualquer tráfego, sabemos exatamente onde está o gargalo.',
    illo:'protocolo'},
  { title:'Roadmap Personalizado', sub:'Plano de ação de 90 dias com checkpoints',
    p:'Direcionamento prático e ultra específico para o seu negócio e momento para gerar valor de imediato, com plano de ação de 90 dias com objetivo de alavancar seu faturamento. Você nunca fica sem direção. Cada checkpoint garante que a rota está ajustada à sua realidade, com handoff documentado ao final de cada sessão.',
    illo:'roadmap'},
  { title:'Growth Model Personalizado', sub:'Projeção baseada nos seus números reais',
    p:'Projeção de onde você chega com o sistema rodando, baseado nos seus números reais. Custo de MQL projetado vs. atual, taxa de fechamento esperada vs. hoje, receita adicional mensal estimada.',
    illo:'growth'},
  { title:'Funil de Lead Dinâmico Completo e Validado', sub:'Quiz + página + integração + 12 copies',
    p:'Construção do quiz de qualificação, página de aplicação e integração com o tráfego. O mecanismo que filtra o lead ruim antes de chegar no comercial e reduz o custo de MQL. Inclui 12 copies produzidas pelo time da Simple para anúncios.',
    illo:'funil'},
  { title:'Setup de Trackeamento e Dashboard de Métricas', sub:'Tudo visível em tempo real',
    p:'CPL, custo de MQL, taxa de agendamento, taxa de fechamento, tudo visível em um lugar, em tempo real. Você para de achar e começa a saber.',
    illo:'tracking'},
  { title:'Pit-Stop Individual Mensal', sub:'Sessão estratégica a cada 30 dias com handoff documentado',
    p:'Sessão estratégica a cada 30 dias, de 30 a 45 minutos por videochamada com tela compartilhada mostrando métricas em tempo real. Toda sessão termina com handoff documentado: o que foi decidido, quem faz, até quando e o critério de sucesso.',
    illo:'pitstop'},

  { title:'Gestão de Tráfego', sub:'Especialista em transformar verba em leads qualificados com ROI previsível',
    illo:'trafego', p:'',
    bullets:[
      'Estrutura campanhas desde o zero',
      'Otimização seguindo a metodologia Simple Acc',
      'Testa múltiplos ângulos criativos: encontra os 3 a 5 criativos vencedores e escala apenas o que performa',
      'Controla métricas de perto: CPL, CAC, CPC, CTR, frequência, custo por agendamento e ROI final',
      'Escala com segurança: dobra investimento apenas quando CPL e CAC está estável e conversão validada',
      'Relatórios semanais de performance: você sabe exatamente onde cada real está indo e qual o retorno',
    ]},

  { title:'Copywriter dos Anúncios', sub:'Persuadir, qualificar e converter com gatilhos comprovados',
    illo:'copy', p:'Copy não é sobre "escrever bonito". É sobre persuadir, qualificar e converter usando gatilhos psicológicos comprovados.',
    bullets:[
      'Headlines que param o scroll: anúncios que geram CTR acima da média do mercado',
      'Copy de quiz que qualifica: perguntas estratégicas que separam curiosos de compradores reais',
      'Páginas de captura que convertem: estrutura de copy baseada em fórmulas validadas (PAS, AIDA, PASTOR)',
      'Iterações baseadas em dados: a cada fase, otimizamos a copy com base no que está performando',
    ]},

  { title:'Implementação Visual do Funil', sub:'Ciência visual aplicada, não decoração',
    illo:'design', p:'Design de conversão não é arte decorativa. É ciência visual aplicada para guiar o lead até a ação que você quer que ele tome.',
    bullets:[
      'Páginas de captura responsivas: layout otimizado para mobile (onde 70% dos leads vêm) com hierarquia visual clara',
      'Quiz visualmente intuitivo: interface limpa que reduz fricção e aumenta taxa de conclusão',
    ]},

  { title:'Comunidade Privada de Mentores', sub:'Networking entre quem está no mesmo nível',
    illo:'comunidade',
    p:'Grupo de WhatsApp de networking entre membros que estão construindo a mesma máquina. Não é grupo de dúvidas, é uma sala de troca entre quem está no mesmo nível.'},

  { title:'Check-in Diário Assíncrono', sub:'WhatsApp direto com sua empresa',
    illo:'checkin',
    p:'Grupo de WhatsApp individual com sua empresa. Você tira dúvida rápida e recebe atualização de campanha em tempo real, sem depender de uma call para saber o que está acontecendo.'},

  // BÔNUS
  { title:'Bônus: Auditoria de Social Selling', sub:'Perfil orgânico convertendo antes do quiz',
    illo:'b1', bonus:true,
    p:"Antes de rodar o quiz, garantimos que o seu perfil orgânico está convertendo também. Resolve a objeção: 'mas e o conteúdo, preciso investir nisso?'"},
  { title:'Bônus: Auditoria de Comercial e Negociação', sub:'Ponta a ponta: calls, scripts, apresentações',
    illo:'b5', bonus:true,
    p:'Análises de ponta a ponta do seu setor comercial em tudo que tange: calls de vendas, scripts, apresentações comerciais.'},
  { title:'Bônus: Playbook Comercial Completo e Ilimitado', sub:'O que faz o MQL virar receita',
    illo:'playbook', bonus:true,
    p:'Script de pré-venda, roteiro de call 1x1, templates de agendamento, processo de SDR e matriz de objeções. O que faz o MQL virar receita.'},
  { title:'Bônus: Área de Membros com Trilhas por Pilar', sub:'Conteúdo organizado, você acha o que precisa quando precisa',
    illo:'membros', bonus:true,
    p:'Conteúdo organizado por Oferta, Quiz, Comercial e Expansão. Você encontra o que precisa na hora que precisa, sem procurar em gravação de aula.'},
].map((e,i,arr)=>({ type:'entregavel', sec:'Programa: entregáveis', label:e.title, idx:i+1, total:arr.length, ...e }));

/* ============ CASES (padrão Full Sales: fundo escuro + callout vermelho) ============ */
const CASES_HEADER = { type:'divider', sec:'Cases', label:'Cases de resultado',
  title:'Cases de resultado', sub:'Empresários reais que já viveram o Sistema Simple' };

const CASES = [
  { name:'Lucas Sobreiro', niche:'Mentor de médicos',
    callout:'R$ 36.000', metric:'em 1 semana',
    detail:'Contrato de 36k fechado com a estratégia de caixa rápido do Sistema Simple, logo após o início da implementação.',
    proof:'"A estratégia de caixa rápido está funcionando, fechei um contrato de 36k."',
    who:'Lucas Sobreiro, WhatsApp interno' },
  { name:'Pâmella e Sheila (Psicóloga)', niche:'Clínica de saúde mental',
    callout:'16 tratamentos', metric:'de R$ 3.000 fechados no mês',
    detail:'35 avaliações realizadas, 16 tratamentos fechados. O mês seguinte começou com 4 avaliações já agendadas.',
    proof:'"Atualização referente ao mês de julho: 35 avaliações realizadas; 16 tratamentos fechados. Estamos iniciando o mês com 4 avaliações agendadas."',
    who:'Psicóloga Sheila Oliveira' },
  { name:'Rosana Rocco', niche:'Mentoria high ticket',
    callout:'R$ 14.000', metric:'na primeira semana',
    detail:'2 vendas de R$ 6k e 1 de R$ 2k na primeira semana rodando a estratégia de entrada inicial de R$ 1.000.',
    proof:'"Já foram 2 de 6k e 1 de 2k."',
    who:'Rosana Rocco' },
  { name:'Sabrina Cantarino', niche:'Mentoria',
    callout:'R$ 14.000', metric:'em 1 semana',
    detail:'Mais uma mentoria de R$ 7.000 fechada em call suada — negociou muito e deu certo.',
    proof:'"Vamos de novidade, fechei mais uma mentoria 7.000,00, essa foi suada para negociar, mas deu certo."',
    who:'Sabrina Cantarino' },
  { name:'Eliana Franz', niche:'Clínica',
    callout:'+ R$ 1 milhão', metric:'de faturamento no ano',
    detail:'Em janeiro voltou a trabalhar dia 10 e a clínica faturou R$ 80.000 só com o tráfego pago. Ano anterior fechou +1 milhão em faturamento.',
    proof:'"Em janeiro voltamos a trabalhar dia 10 e a clínica faturou 80 mil reais só com o tráfego pago. Ano passado faturamos em média 1 milhão no ano."',
    who:'Eliana Franz' },
  { name:'Dr. Dennis e Dra. Roberta Teran', niche:'Consultórios médicos',
    callout:'R$ 92.000', metric:'de faturamento no mês',
    detail:'Dr. Dennis 14 pacientes novos, Dra. Roberta 10 pacientes novos. Fechamento de protocolos e consultas.',
    proof:'"Faturamento do mês outubro: Dr Dennis 14 pacientes novos, Dra Roberta 10 pacientes novos, faturamento total 92 mil."',
    who:'Dr. Dennis' },
  { name:'Eliana Franz (Black Friday)', niche:'Clínica',
    callout:'R$ 40.000+', metric:'com menos de R$ 1k em tráfego',
    detail:'Black Friday da Eliana: mais de R$ 40 mil fechados investindo menos de R$ 1.000 em tráfego. Total do período: R$ 46.200.',
    proof:'"Fechei uma black por 4500. Total 46.200."',
    who:'Eliana Franz' },
  { name:'Guilherme Eduardo', niche:'Mentor de médicos',
    callout:'Empresário renomado', metric:'"Nenhuma me fez sentir especial igual a Simple"',
    detail:'Empresário renomado, contratou várias mentorias antes e reconhece que nenhuma entregou o mesmo nível de cuidado, comprometimento e qualidade que a Simple.',
    proof:'"Eu vejo o profissionalismo de vocês. Os materiais que vocês me entregam é de alta qualidade. Eu já contratei algumas mentorias, mas nenhuma me fez sentir especial e importante, igual vocês fazem."',
    who:'Guilherme Eduardo' },
  { name:'Rafael Granella', niche:'MLS · sócio de Caio Carneiro, Joel Jota e Flávio Augusto',
    callout:'R$ 10.000', metric:'fechado com lead do tráfego',
    detail:'Membro da MLS (Mentoria dos Líderes Sábios), sócio de Caio Carneiro, Joel Jota e Flávio Augusto. Fechou downsell de R$ 10k com lead que veio direto do tráfego. Feedback do lead Fabrizio Ortiz sobre o quiz: "Muito bom, me identifiquei muito."',
    proof:'"Fechamos um downsell com lead do tráfego, fechamos 10k por duas sessões de mentoria. Feedback do lead: muito bom o quiz, me identifiquei muito."',
    who:'Rafael Granella (MLS)' },
  { name:'Vitória Daniela', niche:'Mentoria',
    callout:'R$ 25.000', metric:'após aula com convidado especial',
    detail:'Venda de R$ 25.000 fechada logo após a aula do convidado especial (sócio do Daniel). Reunião marcada às 13h30, botou em prática o que aprendeu na aula que acabou às 13h20 e fechou.',
    proof:'"Sai da aula 13h20 e 13h30 tinha uma reunião marcada, botei o que entendi em prática. Venda de 25 mil e resultado imediato só colocando as epifanias em prática."',
    who:'Vitória Daniela' },
].map((c,i,arr)=>({ type:'case-fss', sec:'Cases', label:'Case: '+c.name, idx:i+1, total:arr.length, ...c }));

/* ============ FECHAMENTO ============ */
const CLOSE = [
  { type:'ask', sec:'Fechamento', label:'Dúvidas', title:'Dúvidas?',
    lead:'Seguimos só quando você estiver seguro de tudo que vai receber.' },

  { type:'vxp', sec:'Fechamento', label:'Valor x Preço' },

  // Preço de tabela: R$ 10 mil setup + R$ 4 mil / mês
  { type:'price-tabela', sec:'Fechamento', label:'Preço de tabela',
    title:'Programa de Implementação Simple',
    setup:{v:10000, l:'de Setup'}, mensal:{v:4000, l:'por mês'} },

  // Justificativa (nova)
  { type:'presenteia', sec:'Fechamento', label:'Presentear os decididos',
    title:'Nós presenteamos empresários decididos e que agem rápido em direção aos seus objetivos.' },

  // Preço protagonista: R$ 5 mil setup + R$ 3 mil / mês
  { type:'price-protagonista', sec:'Fechamento', label:'Preço em call',
    regular:{setup:10000, mensal:4000},
    hero:{setup:5000, mensal:3000},
    note:'Valor protagonista: válido apenas com a decisão na call.' },
];

/* ============ DECK ============ */
window.SLIDES = [].concat(COMMON, ENTREGAVEIS, [CASES_HEADER], CASES, CLOSE);
window.MONEY = money;
