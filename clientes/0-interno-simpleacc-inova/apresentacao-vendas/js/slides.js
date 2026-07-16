/* =====================================================================
   Conteúdo da apresentação de vendas — Simple
   Fonte: copy aprovada (CEO/closer), VERBATIM — não resumir.
   Estrutura: modelo Full Sales (FSS) — um slide por entregável/bônus/cargo.
   O render fica em deck.js; o visual (brandbook) em css/deck.css.
   ===================================================================== */

const money = (n)=> 'R$ '+n.toLocaleString('pt-BR');

/* ============ PARTE COMUM ============ */
const COMMON = [

  // 1 — CAPA
  { type:'cover', sec:'Abertura', label:'Capa', wordmark:'SIMPLE', tag:'Funil de Lead Dinâmico' },

  // 2 — PROMESSA PRINCIPAL (copy verbatim)
  { type:'statement', sec:'Abertura', label:'Promessa principal',
    title:'Como você vai vender mais e mais caro usando um processo de aquisição inovador, simples, previsível e lucrativo',
    lead:'Você não precisa de mais tráfego. Você precisa do funil certo, que descarta o lead errado, alimenta o comercial com quem vai comprar, e faz o seu negócio crescer com previsibilidade.',
    bullets:[
      'Para ter uma verdadeira máquina de vender high ticket e escalar',
      'Para que a empresa te sirva e não o contrário',
      'Através de equipe com 4 anos de experiência e resultado em vendas através do digital, sem precisar ter anos de experiência e gastar dinheiro em teste de tráfego para saber o que dá resultado',
    ]},

  // 3 — SOBRE DANIEL (verbatim, 2 parágrafos + 6 marcos)
  { type:'bio', sec:'Autoridade', label:'Quem é Daniel Souza?', photo:'assets/daniel-retrato.jpg',
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

  // 4 — PROVAS DE CREDIBILIDADE
  { type:'proof', sec:'Autoridade', label:'Provas de credibilidade',
    title:'Provas de credibilidade',
    items:[
      {img:'assets/daniel-palestra.jpg', label:'Palestra'},
      {img:'assets/daniel-trabalhando.jpg', label:'Operação'},
      {img:'assets/daniel-lifestyle.jpg', label:'Bastidores'},
      {label:'Foto com Luiz Filho'},
      {label:'Palco da mentoria com Luiz'},
      {label:'Resultados'},
    ]},

  // 5 — TRAJETÓRIA (foto com telão — interim: palestra; falta a foto do telão)
  { type:'traj', sec:'Autoridade', label:'A trajetória da Simple',
    title:'A trajetória da Simple', photo:'assets/daniel-palestra.jpg',
    marcos:[
      'Marca de 1.57 mi de faturamento no primeiro ano de atuação',
      'Escritório na Marçal Tower',
      '+40 negócios implementando nossa metodologia',
      'Marca de R$ 411 mil de faturamento na nossa própria operação',
    ]},

  // 6 — CENÁRIO NEGATIVO — INFERNO (tudo vermelho)
  { type:'list', sec:'Diagnóstico', label:'O contexto atual (Inferno)', theme:'red',
    title:'O contexto atual do mercado digital',
    bullets:[
      '<b>Lead caro e descomprometido:</b> chegam muitos, mas poucos compram',
      '<b>Sessão estratégica perdeu força:</b> o mercado foi saturado e o lead cansou',
      '<b>Concorrência explodiu após a onda high ticket:</b> todo mundo virou mentor',
      '<b>Conversão baixa:</b> você gera lead mas não fecha venda',
      '<b>Falta de previsibilidade:</b> um mês bom, dois ruins… sem controle sobre o próximo',
      '<b>CAC e CPL só aumentam:</b> tráfego mais caro, resultado menor',
      '<b>Marketing e vendas desalinhados:</b> o tráfego traz lead que o comercial não sabe fechar',
    ],
    foot:'O resultado disso é desânimo, exaustão e a sensação de que você está fazendo tudo certo, mas os números não respondem.' },

  // 7 — CENÁRIO POSITIVO — CÉU
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

  // 8 — RISCOS DE FAZER SOZINHO (tudo vermelho)
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

  // 9 — BENEFÍCIOS / VENDA DO FUTURO (headline verbatim conferida)
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

  // 10 — TRANSIÇÃO PARA A METODOLOGIA (título grande, texto reduzido)
  { type:'statement', sec:'Metodologia', label:'A nova onda', titleClass:'xl',
    title:'O Funil de Lead Dinâmico é a nova onda do mercado digital',
    lead:'É a metodologia que mais vai funcionar nos próximos meses e poucos mentores ainda estão usando.' },

  // 11 — OS 4 PILARES (ecossistema — mandala maior)
  { type:'mandala', sec:'Metodologia', label:'Os 4 pilares',
    title:'Os 4 pilares que escalam uma empresa', core:'O seu ecossistema',
    petals:[
      {k:'Pilar 1 — Produto e Oferta', p:'A combinação de produto, benefícios, condições e diferenciais tão irresistível que o cliente sente que seria um erro dizer não.'},
      {k:'Pilar 2 — Funil de Lead Dinâmico', p:'O mecanismo que filtra o lead antes do comercial.'},
      {k:'Pilar 3 — Comercial', p:'O processo que transforma leads qualificados em receita previsível e crescimento consistente.'},
      {k:'Pilar 4 — Expansão', p:'A estratégia que aumenta o lucro extraindo mais valor da base de clientes que você já possui, deixando o negócio mais lucrativo.'},
    ]},

  // 12 — CORE — O CORAÇÃO DO SISTEMA (verbatim)
  { type:'core', sec:'Metodologia', label:'O coração do sistema',
    title:'O coração do sistema',
    lead:'Tudo o que fazemos gira em torno de um mecanismo central: o Funil de Lead Dinâmico.',
    para:'É ele que filtra o lead ruim antes de chegar no seu comercial, reduz o custo de aquisição qualificado e cria um fluxo previsível de pessoas prontas para comprar.',
    subq:'Por que o quiz substitui a sessão estratégica tradicional?',
    bullets:[
      'A sessão estratégica saturou: lead cansou de agendar',
      'O quiz qualifica automaticamente, 24 horas por dia',
      'Elimina o lead descomprometido antes da call e antes de custar o seu tempo',
      'Reduz o custo do MQL de forma consistente e mensurável',
    ]},

  // 13–16 — PILARES (verbatim)
  { type:'pillar', sec:'Metodologia', label:'Pilar 1 — Produto e Oferta', n:'01', illo:'oferta',
    title:'Produto e Oferta',
    sub:'O funil filtra quem vai comprar, mas a oferta precisa ser irresistível',
    lead:'Antes de rodar qualquer tráfego, precisamos garantir que sua oferta esteja posicionada para o cliente certo, com a mensagem certa, no momento certo. Oferta fraca com funil forte ainda é funil quebrado.',
    listTitle:'O que estruturamos neste pilar:',
    bullets:[
      'Quem é seu cliente ideal e o que ele realmente quer comprar?',
      'Ancoragem de valor e posicionamento de preço',
      'Mapeamento de upsells, downsells e ofertas complementares para maximizar o LTV',
      'Alinhamento da comunicação da oferta com o mecanismo do funil',
    ]},
  { type:'pillar', sec:'Metodologia', label:'Pilar 2 — Funil de Lead Dinâmico', n:'02',
    img:'assets/processo-aquisicao.png',
    title:'Funil de Lead Dinâmico',
    sub:'O mecanismo que transforma tráfego frio em lead qualificado',
    lead:'É ele que filtra o lead ruim antes de chegar no seu comercial, reduz o custo de aquisição qualificado e cria um fluxo previsível de pessoas prontas para comprar.',
    bullets:[
      'A sessão estratégica saturou, concorre com outros 10 mil mentores',
      'O quiz aquece o lead automaticamente, e o prepara para comprar',
      'Elimina o lead descomprometido antes da call e antes de custar o seu tempo',
      'Reduz o custo do MQL de forma consistente e mensurável',
    ]},
  { type:'pillar', sec:'Metodologia', label:'Pilar 3 — Comercial', n:'03', illo:'comercial',
    title:'Comercial',
    sub:'Lead qualificado sem comercial estruturado é desperdício',
    lead:'O funil entrega para o comercial o lead certo. O comercial é o que transforma esse lead em receita. Não adianta ter funil perfeito se o comercial perde a venda boa por falta de processo.',
    bullets:[
      'Script de pré-venda e roteiro de call validado para high ticket',
      'Processo de SDR completo: cadência de follow-up e templates de agendamento',
      'Matriz de objeções: resposta estruturada para cada resistência do cliente',
    ]},
  { type:'pillar', sec:'Metodologia', label:'Pilar 4 — Expansão (Funil Ampulheta)', n:'04', illo:'ltv',
    title:'Expansão — Funil Ampulheta',
    sub:'O negócio mais lucrativo começa na base que você já tem',
    lead:'A maioria dos mentores gasta energia e dinheiro tentando atrair cliente novo, quando a maior oportunidade de lucro está em quem já comprou. O Funil de Ampulheta inverte essa lógica.',
    bullets:[
      'Monetizar a base antes de precisar de lead novo',
      'Identificação de oportunidades de upsell e downsell com base no que o ICP já comprou',
      'Criação de ofertas complementares que aumentam o valor por cliente sem aumentar o CAC',
      'Estratégia de reativação de leads que passaram pelo funil mas ainda não compraram',
    ]},

  // 17 — FASES — VISÃO GERAL
  { type:'phases', sec:'Implementação', label:'Fases da implementação',
    title:'Fases da Implementação Simple',
    steps:[
      {n:'1', h:'Validação', p:'Encontrar o primeiro quiz que converte, validar a linha criativa e gerar as primeiras vendas'},
      {n:'2', h:'Otimização', p:'Estabilizar os custos, escalar o que funcionou, ganhar mercado'},
      {n:'3', h:'Escala e Consolidação', p:'Escalar o investimento, consolidar previsibilidade e lucro'},
    ]},

  // 18–20 — FASES (layout da apresentação atual)
  { type:'phase', sec:'Implementação', label:'Fase 1 — Validação', n:'1', name:'VALIDAÇÃO',
    objetivo:'Encontrar o primeiro quiz que converte, validar a linha criativa e gerar as primeiras vendas',
    metas:['Encontrar o primeiro quiz e página que performam','Coletar 100 leads qualificados no mês','Gerar de 2 a 5 vendas no mês'] },
  { type:'phase', sec:'Implementação', label:'Fase 2 — Otimização', n:'2', name:'OTIMIZAÇÃO',
    objetivo:'Estabilizar os custos, escalar o que funcionou, ganhar mercado e encontrar as alavancas de crescimento',
    metas:['Manter CPL estável dentro da meta (variação máxima de 20%, CPL máximo R$30)','Dobrar o investimento em mídia','Analisar e otimizar o CAC','Reunião comparativa com mês anterior via Growth Model'] },
  { type:'phase', sec:'Implementação', label:'Fase 3 — Escala e Consolidação', n:'3', name:'ESCALA E CONSOLIDAÇÃO',
    objetivo:'Escalar o investimento, consolidar previsibilidade e lucro',
    metas:['Duplicar novamente o investimento em mídia','Chegar a +R$250k/mês de faturamento recorrente','Operação previsível, lucrativa e escalável'] },

  // 21 — CASES (slide da apresentação atual; cases da Ju/Dani/Carol entram depois)
  { type:'imgslide', sec:'Implementação', label:'Cases de resultado',
    img:'assets/resultados-simple.jpg', bg:'#191A1C' },

  // 21b–21d — CASES REAIS (dados das planilhas por cliente)
  { type:'case', sec:'Implementação', label:'Case — Ju Godinho',
    name:'Ju Godinho', brand:'Método ELA — saúde e estética',
    ig:'@eujugodinho · 54,5 mil seguidores · +5 mil mentoradas',
    contract:'Contrato de Implementação do Sistema Simple assinado',
    kpis:[ {v:'8,46', l:'ROAS'}, {v:'R$ 21.995', l:'Faturamento'}, {v:'3', l:'Vendas high ticket'} ],
    rows:[
      ['Valor investido','R$ 2.601,09'], ['Cliques no link','751'], ['CPC','R$ 3,46'],
      ['Connect rate','62,45%'], ['Leads','169'], ['Custo por lead','R$ 15,39'],
      ['Conversão de LP','36,03%'], ['Leads qualificados','32 (18,93%)'],
      ['Custo por MQL','R$ 81,28'], ['CAC','R$ 867,03'],
    ]},
  { type:'case', sec:'Implementação', label:'Case — Daniele (Grokker)',
    name:'Daniele — Grokker', brand:'Doutora de Líderes — liderança e gestão',
    ig:'@daniele.doutoradelideres · 8,4 mil seguidores · +3 mil alunos',
    contract:'Contrato de Implementação do Sistema Simple assinado',
    kpis:[ {v:'R$ 3,25', l:'Custo por lead'}, {v:'R$ 5,26', l:'Custo por MQL'}, {v:'179', l:'Leads qualificados'} ],
    rows:[
      ['Valor investido','R$ 940,68'], ['CTR','1,00%'], ['Cliques no link','1.485'],
      ['CPC','R$ 0,63'], ['Connect rate','72,86%'], ['Leads','289'],
      ['Conversão de LP','26,71%'], ['Taxa de qualificados','61,94%'],
    ]},
  { type:'case', sec:'Implementação', label:'Case — Carol Batista (Mindshift)',
    name:'Carol Batista — Mindshift', brand:'Liderança & cultura organizacional',
    ig:'@carolbatista · 10,6 mil seguidores',
    contract:'Contrato de Implementação do Sistema Simple assinado',
    kpis:[ {v:'R$ 32,35', l:'Custo por MQL'}, {v:'59,57%', l:'Taxa de qualificados'}, {v:'R$ 19,27', l:'Custo por lead'} ],
    rows:[
      ['Valor investido','R$ 905,85'], ['CTR','0,95%'], ['Cliques no link','493'],
      ['CPC','R$ 1,84'], ['Connect rate','66,13%'], ['Leads','47'],
      ['Conversão de LP','14,42%'], ['Leads qualificados','28'],
    ]},

  // 22 — TRANSIÇÃO PARA O PRODUTO (título grande, texto reduzido)
  { type:'statement', sec:'Produto', label:'Transição para o produto', titleClass:'xl',
    title:'Agora eu quero te apresentar o programa que estrutura tudo isso',
    lead:'Da oferta ao comercial, do funil ao crescimento — implementado com você, não por você.' },

  // 23 — CAPA DO PRODUTO
  { type:'divider', sec:'Produto', label:'Capa do produto',
    title:'Programa de Implementação Simple', sub:'Implementação' },

  // 24 — NO QUE CONSISTE
  { type:'consists', sec:'Produto', label:'No que consiste o programa',
    title:'No que consiste o Programa de Implementação Simple',
    points:[
      'Ofertas irresistíveis que fazem os leads implorarem para comprar',
      'Funil de Lead Dinâmico que filtra lead ruim e reduz o custo de aquisição',
      'Comercial pujante para converter MQL em receita',
      'Expansão de valor para crescer com a base que você já tem',
    ]},
];

/* ============ CARGOS DO TIME (um slide por cargo — copy verbatim) ============ */
const CARGOS = [
  { title:'Estrategista',
    lead:'Você não terá apenas um "consultor". Você terá um estrategista dedicado que conhece a fundo a nossa operação e toma decisões estratégicas lado a lado com o time.',
    listTitle:'O que o estrategista faz:',
    cards:[
      {h:'Mapeia todo o seu ecossistema', p:'Identifica oportunidades, gargalos e alavancas de crescimento'},
      {h:'Constrói seu mapa estratégico mensal', p:'Plano de ação personalizado com metas claras e prazos definidos para implementação do Sistema Simple'},
      {h:'Acompanha suas métricas semanalmente', p:'CPL, CAC, taxa de agendamento, conversão em vendas e ROI'},
      {h:'Reuniões mensais de ajuste de rota', p:'Revisão de resultados, realinhamento de metas e planejamento do próximo ciclo'},
    ]},
  { title:'Copywriter',
    lead:'Copy não é sobre "escrever bonito". É sobre persuadir, qualificar e converter usando gatilhos psicológicos comprovados.',
    listTitle:'O que o copywriter entrega:',
    cards:[
      {h:'Headlines que param o scroll', p:'Anúncios que geram CTR acima da média do mercado'},
      {h:'Copy de quiz que qualifica', p:'Perguntas estratégicas que separam curiosos de compradores reais'},
      {h:'Páginas de captura que convertem', p:'Estrutura de copy baseada em fórmulas validadas (PAS, AIDA, PASTOR)'},
      {h:'Iterações baseadas em dados', p:'A cada fase, otimizamos a copy com base no que está performando'},
    ]},
  { title:'Designer',
    lead:'Design de conversão não é arte decorativa. É ciência visual aplicada para guiar o lead até a ação que você quer que ele tome.',
    listTitle:'O que o designer cria:',
    cards:[
      {h:'Páginas de captura responsivas', p:'Layout otimizado para mobile (onde 70% dos leads vêm) com hierarquia visual clara'},
      {h:'Quiz visualmente intuitivo', p:'Interface limpa que reduz fricção e aumenta taxa de conclusão'},
    ]},
  { title:'Gestor de Tráfego',
    lead:'Especialista em transformar verba em leads qualificados com ROI previsível.',
    cards:[
      {h:'Estrutura campanhas desde o zero', p:'Segmentação avançada, públicos custom, lookalikes e retargeting inteligente'},
      {h:'Otimiza a cada 7 dias (CPL alto) ou 2–3 dias (CPL baixo)', p:'Seguindo a metodologia Simple'},
      {h:'Testa múltiplos ângulos criativos', p:'Encontra os 3-5 criativos vencedores e escala apenas o que performa'},
      {h:'Controla métricas de perto', p:'CPL, CAC, CPC, CTR, frequência, custo por agendamento e ROI final'},
      {h:'Escala com segurança', p:'Dobra investimento apenas quando CPL e CAC está estável e conversão validada'},
      {h:'Relatórios semanais de performance', p:'Você sabe exatamente onde cada real está indo e qual o retorno'},
    ]},
  { title:'Gestor de Automação',
    lead:'Quem garante que nenhum lead se perde e toda oportunidade é aproveitada.',
    cards:[
      {h:'Dashboards de acompanhamento', p:'Você vê em tempo real: leads captados, leads nutridos, leads agendados, leads convertidos'},
      {h:'Automações do funil', p:'Garante que todos os dados sejam trackeados e o funil rode com perfeição'},
    ]},
  { title:'Gerente de Projetos',
    lead:'Projetos complexos exigem coordenação ativa. O Gerente de Projetos é quem orquestra todo o time, alinha entregas e garante que nada fique para trás.',
    listTitle:'O que o Gerente de Projetos faz:',
    cards:[
      {h:'Coordena todos os entregáveis do projeto', p:'Funil, copy, design, tráfego, automação e comercial rodando em sincronia'},
      {h:'Garante cumprimento de prazos', p:'Acompanha cronograma de implementação e sinaliza gargalos antes que virem atraso'},
      {h:'Centraliza comunicação entre time e cliente', p:'Você tem um ponto focal claro para acompanhar o andamento de tudo'},
      {h:'Alinha expectativas e prioridades', p:'Define o que é urgente, o que é importante e o que pode esperar'},
      {h:'Resolve problemas operacionais', p:'Quando algo trava (aprovação pendente, integração com erro, ajuste de última hora), ele destrava'},
      {h:'Reporta status semanalmente', p:'Você sabe exatamente o que foi feito, o que está em andamento e o que vem depois'},
    ]},
  { title:'Suporte no Processo Comercial',
    lead:'Você recebe o mesmo script e metodologia de pitch que uso para fechar contratos de 5 dígitos em calls de 45 minutos.',
    para:'Não adianta gerar leads qualificados se o seu comercial não sabe como converter. Por isso, além de trazer leads prontos para comprar, ajudamos a estruturar todo o seu processo de vendas: cadência de follow-up, fluxo de nutrição, roteiro de call e o mesmo script de pitch que uso para fechar high ticket.',
    cards:[
      {h:'Cadência de follow-up', p:'Processo estruturado para nenhuma oportunidade esfriar'},
      {h:'Fluxo de nutrição', p:'O lead chega na call aquecido e consciente'},
      {h:'Roteiro de call', p:'Estrutura validada para conduzir a conversa até a decisão'},
      {h:'Script de pitch high ticket', p:'O mesmo script usado para fechar contratos de 5 dígitos'},
    ]},
].map((c,i)=>({ type:'cargo', sec:'O time envolvido', label:c.title, idx:i+1, ...c }));

/* ============ BUILDER DE OFERTA (estrutura FSS) ============ */
function offer(o){
  const s=[];
  s.push({ type:'divider', sec:o.sec, label:o.tag, title:o.tag, sub:o.subtitle||'' });

  // A estrutura do sistema — UM SLIDE POR ENTREGÁVEL
  o.core.forEach((d,i)=> s.push({ type:'solo', sec:o.sec, label:d.h,
    cat:'A estrutura do sistema', idx:i+1, total:o.core.length, ...d }));

  // Aceleradores — UM SLIDE POR ENTREGÁVEL
  (o.aceleradores||[]).forEach((d,i)=> s.push({ type:'solo', sec:o.sec, label:d.h,
    cat:'Aceleradores', idx:i+1, total:o.aceleradores.length, ...d }));

  // Suporte — agrupado (como no doc de copy)
  if(o.suporte) s.push({ type:'deliverable', sec:o.sec, label:'Suporte',
    title:'O que garante que você não trava', cards:o.suporte });

  // Bônus — UM SLIDE POR BÔNUS
  (o.bonus||[]).forEach((d,i)=> s.push({ type:'solo', sec:o.sec, label:d.h,
    cat:'Bônus', idx:i+1, total:o.bonus.length, bonus:true, ...d }));

  // Estrutura de preço — modelo Full Sales
  s.push({ type:'ask', sec:o.sec, label:'Dúvidas', title:'Dúvidas?', lead:o.duvidasLead||'' });
  if(o.leva) s.push({ type:'statement', sec:o.sec, label:'O que você leva', title:'O que você leva', lead:o.leva });
  s.push({ type:'vxp', sec:o.sec, label:'Valor x Preço' });
  s.push({ type:'anchor', sec:o.sec, label:'Ancoragem de valor',
    title:'Tudo que você vai receber — e o que cada entregável representa no mercado',
    items:o.anchor, total:o.total, question:o.anchorQuestion||'' });
  s.push({ type:'testimonials', sec:o.sec, label:'Depoimentos', items:o.testimonials||DEFAULT_TESTI });
  s.push({ type:'price-table', sec:o.sec, label:'Preço de tabela', title:o.productName,
    items:o.anchor, price:o.tablePrice });
  if(o.regular!=null){
    s.push({ type:'caf', sec:o.sec, label:'Justificativa' });
    s.push({ type:'hero-price', sec:o.sec, label:'Preço protagonista',
      regular:o.regular, hero:o.hero, instal:o.instal });
  }
  return s;
}

const DEFAULT_TESTI = [
  {who:'Ju Godinho', role:'Método ELA — saúde e estética', stat:'ROAS 8,46 · R$ 21.995 em vendas'},
  {who:'Daniele — Grokker', role:'Doutora de Líderes', stat:'MQL a R$ 5,26 · 179 qualificados'},
  {who:'Carol Batista — Mindshift', role:'Liderança & cultura', stat:'MQL a R$ 32,35 · 59,6% de qualificação'},
  {who:'Rafael — Alivance', role:'cliente Simple', ctx:'print de resultado'},
  {who:'Eliana Franz', role:'cliente Simple', ctx:'print de resultado'},
  {who:'Sabrina', role:'cliente Simple', ctx:'print de resultado'},
];

/* entregáveis (copy verbatim) */
const D = {
  roadmap:(det)=>({h:'Roadmap Personalizado', d:det, illo:'roadmap',
    p:'Direcionamento prático e ultra específico para o seu negócio e momento para gerar valor de imediato. Você nunca fica sem direção. Cada checkpoint garante que a rota está ajustada à sua realidade, com handoff documentado ao final de cada sessão.'}),
  protocolo:{h:'Protocolo Destrava Lucro', d:'Diagnóstico triplo', illo:'protocolo',
    p:'Diagnóstico triplo: oferta + ICP + mercado / comercial / mídia paga. Antes de rodar qualquer tráfego, sabemos exatamente onde está o gargalo.'},
  growth:{h:'Growth Model Personalizado', d:'Projeção com números reais', illo:'growth',
    p:'Projeção de onde você chega com o sistema rodando, baseado nos seus números reais. Custo de MQL projetado vs. atual, taxa de fechamento esperada vs. hoje, receita adicional mensal estimada.'},
  funil:(copies)=>({h:'Funil de Quiz Completo e Calibrado', d:`+ ${copies} copies`,
    p:`Construção do quiz de qualificação, página de aplicação e integração com o tráfego. O mecanismo que filtra o lead ruim antes de chegar no comercial e reduz o custo de MQL. Inclui ${copies} copies produzidas pelo time da Simple para anúncios.`,
    img:'assets/processo-aquisicao.png'}),
  biblioteca:{h:'Biblioteca de Copy para Anúncios', d:'Formatos validados', illo:'biblioteca',
    p:'Formatos validados separados por nível de consciência do lead: topo, meio e fundo. Seu gestor usa sem depender de você para criar do zero.'},
  prompts:{h:'Prompts e Agentes de IA para Copy e Quiz', d:'Copy em 20 minutos', illo:'prompts',
    p:'Seu gestor cria copy em 20 minutos. Reduz dependência de copywriter e mantém o sistema funcionando sem você parar para criar.'},
  tracking:{h:'Setup de Trackeamento e Dashboard de Métricas', d:'Tudo visível em tempo real', illo:'tracking',
    p:'CPL, custo de MQL, taxa de agendamento, taxa de fechamento, tudo visível em um lugar, em tempo real. Você para de achar e começa a saber.'},
  ltv:{h:'Mapa de Expansão de Oferta e LTV', d:'Monetizar a base', illo:'ltv',
    p:'Como monetizar a base que você já tem antes de precisar de lead novo. Novas ofertas, upsells e downsells mapeados com base no que o seu ICP já comprou.'},
  playbook:(nome)=>({h:`Playbook Comercial ${nome}`, d:'O que faz o MQL virar receita', illo:'playbook',
    p:'Script de pré-venda, roteiro de call 1x1, templates de agendamento, processo de SDR e matriz de objeções. O que faz o MQL virar receita.'}),
};

const SUP = {
  pitQuinzenal:{h:'Pit-Stop Individual Quinzenal', p:'Sessão estratégica a cada 15 dias, de 30 a 45 minutos por videochamada com tela compartilhada mostrando métricas em tempo real. Toda sessão termina com handoff documentado: o que foi decidido, quem faz, até quando e o critério de sucesso.'},
  pitMensal:{h:'Pit-Stop Individual Mensal', p:'Sessão estratégica a cada 30 dias, de 30 a 45 minutos por videochamada com tela compartilhada mostrando métricas em tempo real. Toda sessão termina com handoff documentado: o que foi decidido, quem faz, até quando e o critério de sucesso.'},
  pit4:{h:'4 Pit-Stops', p:'Sessão estratégica a cada 30 dias, de 30 a 45 minutos por videochamada com tela compartilhada mostrando métricas em tempo real. Toda sessão termina com handoff documentado: o que foi decidido, quem faz, até quando e o critério de sucesso.'},
  checkin:{h:'Check-in Diário Assíncrono', p:'Grupo de WhatsApp individual com sua empresa. Você tira dúvida rápida e recebe atualização de campanha em tempo real, sem depender de uma call para saber o que está acontecendo.'},
  encontros:{h:'Encontros em Grupo Quinzenais', p:'Alternando entre conteúdo técnico e hot seat. No hot seat você apresenta seu problema e o grupo mais o consultor resolvem juntos em um processo de aprendizado coletivo.'},
  comunidade:{h:'Comunidade Privada de Mentores', p:'Grupo de WhatsApp de networking entre membros que estão construindo a mesma máquina. Não é grupo de dúvidas, é uma sala de troca entre quem está no mesmo nível.'},
  area:{h:'Área de Membros com Trilhas por Pilar', p:'Conteúdo organizado por Oferta, Quiz, Comercial e Expansão. Você encontra o que precisa na hora que precisa, sem procurar em gravação de aula.'},
  gestorCS:{h:'Gestor de Performance Dedicado', p:'Um CS dedicado exclusivamente ao sucesso do seu projeto com acompanhamento próximo durante toda a implementação.'},
};

const BONUS = (n1,n2,n5)=>[
  {h:`Bônus 1 — Auditoria de Social Selling${n1?` (${n1})`:''}`, d:'Bônus 1', illo:'b1',
   p:"Antes de rodar o quiz, garantimos que o seu perfil orgânico está convertendo também. Resolve a objeção: 'mas e o conteúdo, preciso investir nisso?'"},
  {h:`Bônus 2 — Auditoria de Produção de Conteúdo${n2?` (${n2})`:''}`, d:'Bônus 2', illo:'b2',
   p:'Ajuste da comunicação para falar com quem está pronto para escalar, não com quem está começando. O orgânico passa a trabalhar na mesma direção que o tráfego pago.'},
  {h:'Bônus 3 — Snapshot de Pipeline', d:'Bônus 3', illo:'b3',
   p:'Visão completa do pipeline de vendas: onde estão os leads, quanto está em negociação e onde estão as perdas.'},
  {h:'Bônus 4 — Snapshot de Automações', d:'Bônus 4', illo:'b4',
   p:'Diagnóstico das automações do funil: o que está rodando, o que está travando e o que pode ser otimizado.'},
  {h:`Bônus 5 — Auditoria de Comercial${n5?` (${n5})`:''}`, d:'Bônus 5', illo:'b5',
   p:'Análises de ponta a ponta do seu setor comercial em tudo que tange: calls de vendas, scripts, apresentações comerciais.'},
];

/* ---- OFERTA PRINCIPAL (Consultoria) ---- */
const OFFER_PRINCIPAL = offer({
  sec:'Oferta Principal', tag:'Oferta Principal',
  subtitle:'Programa de Aceleração Simple',
  productName:'Programa de Aceleração Simple',
  core:[ D.roadmap('1 reunião + 4 checkpoints'), D.protocolo, D.growth, D.funil(12) ],
  aceleradores:[ D.biblioteca, D.prompts, D.tracking, D.ltv, D.playbook('Completo e Ilimitado') ],
  suporte:[ SUP.pitQuinzenal, SUP.checkin, SUP.encontros, SUP.comunidade, SUP.area, SUP.gestorCS ],
  bonus:BONUS('4 auditorias','', '4 auditorias'),
  anchor:[
    {nm:'Roadmap Personalizado (1 reunião + 4 checkpoints)', vl:8000},
    {nm:'Protocolo Destrava Lucro (diagnóstico triplo)', vl:15000},
    {nm:'Growth Model Personalizado', vl:12000},
    {nm:'Funil de Quiz Completo + 12 copies', vl:60000},
    {nm:'Biblioteca de Copy para Anúncios', vl:8000},
    {nm:'Prompts e Agentes de IA para Copy e Quiz', vl:6000},
    {nm:'Setup de Trackeamento e Dashboard de Métricas', vl:10000},
    {nm:'Mapa de Expansão de Oferta e LTV', vl:15000},
    {nm:'Playbook Comercial Completo e Ilimitado', vl:25000},
    {nm:'Pit-Stops Individuais Quinzenais (programa completo)', vl:18000},
    {nm:'Encontros em Grupo Quinzenais', vl:6000},
    {nm:'Área de Membros com Trilhas por Pilar', vl:8000},
    {nm:'Comunidade Privada de Mentores', vl:4000},
    {nm:'Check-in Diário Assíncrono', vl:6000},
    {nm:'Gestor de Performance Dedicado', vl:36000},
    {nm:'Bônus 1: 4 Auditorias de Social Selling', vl:12000},
    {nm:'Bônus 2: Auditoria de Produção de Conteúdo', vl:6000},
    {nm:'Bônus 3: Snapshot de Pipeline', vl:4000},
    {nm:'Bônus 4: Snapshot de Automações', vl:4000},
    {nm:'Bônus 5: 4 Auditorias de Comercial', vl:16000},
  ],
  total:279000,
  anchorQuestion:'Se você pudesse ter 70% de desconto sobre tudo isso… você seria um cliente hoje?',
  tablePrice:{full:25000, instal:'12x R$ 2.500'},
  regular:25000, hero:20000, instal:'12x R$ 2.000',
});

/* ---- OFERTA 2 — DOWNSELL ---- */
const OFFER_2 = offer({
  sec:'Oferta 2 — Downsell', tag:'Oferta 2',
  subtitle:'Programa de Aceleração Simple',
  productName:'Programa de Aceleração Simple',
  core:[ D.roadmap('1 reunião + 2 checkpoints'), D.protocolo, D.growth, D.funil(6) ],
  aceleradores:[ D.biblioteca, D.prompts, D.tracking, D.ltv, D.playbook('Completo e Ilimitado') ],
  suporte:[ SUP.pitMensal, SUP.checkin, SUP.encontros, SUP.comunidade, SUP.area, SUP.gestorCS ],
  bonus:BONUS('2 auditorias','2 auditorias','2 auditorias'),
  anchor:[
    {nm:'Roadmap Personalizado (1 reunião + 2 checkpoints)', vl:5000},
    {nm:'Protocolo Destrava Lucro (diagnóstico triplo)', vl:15000},
    {nm:'Growth Model Personalizado', vl:12000},
    {nm:'Funil de Quiz Completo + 6 copies', vl:42000},
    {nm:'Biblioteca de Copy para Anúncios', vl:8000},
    {nm:'Prompts e Agentes de IA', vl:6000},
    {nm:'Setup de Trackeamento e Dashboard', vl:10000},
    {nm:'Mapa de Expansão de Oferta e LTV', vl:15000},
    {nm:'Playbook Comercial Limitado', vl:18000},
    {nm:'8 Pit-Stops Individuais', vl:12000},
    {nm:'Encontros em Grupo Quinzenais', vl:6000},
    {nm:'Área de Membros + Comunidade Privada', vl:12000},
    {nm:'Check-in Diário Assíncrono', vl:6000},
    {nm:'Gestor de Performance Dedicado', vl:36000},
    {nm:'Bônus 1: 2 Auditorias de Social Selling', vl:6000},
    {nm:'Bônus 2: Auditoria de Produção de Conteúdo', vl:6000},
    {nm:'Bônus 3 e 4: Snapshots de Pipeline e Automações', vl:8000},
    {nm:'Bônus 5: 2 Auditorias de Comercial', vl:8000},
  ],
  total:231000,
  anchorQuestion:'Se você pudesse ter um desconto expressivo sobre tudo isso… você seria um cliente hoje?',
  tablePrice:{full:18000, instal:'12x R$ 1.800'},
  regular:18000, hero:15000, instal:'12x R$ 1.500',
});

/* ---- OFERTA 3 ---- */
const OFFER_3 = offer({
  sec:'Oferta 3', tag:'Oferta 3',
  subtitle:'Programa de Aceleração Simple',
  productName:'Programa de Aceleração Simple',
  core:[ D.roadmap('1 reunião'), D.protocolo, D.growth, D.funil(6) ],
  aceleradores:[ D.biblioteca, D.prompts, D.tracking, D.ltv, D.playbook('Completo e Ilimitado') ],
  suporte:[ SUP.pit4, SUP.checkin, SUP.encontros, SUP.comunidade, SUP.area, SUP.gestorCS ],
  bonus:BONUS('','',''),
  anchor:[
    {nm:'Roadmap Personalizado (1 reunião + checkpoints)', vl:5000},
    {nm:'Protocolo Destrava Lucro (diagnóstico triplo)', vl:15000},
    {nm:'Growth Model Personalizado', vl:12000},
    {nm:'Funil de Quiz Completo + 6 copies', vl:42000},
    {nm:'Biblioteca de Copy + Prompts de IA', vl:14000},
    {nm:'Setup de Trackeamento e Dashboard', vl:10000},
    {nm:'Mapa de Expansão de Oferta e LTV', vl:12000},
    {nm:'Playbook Comercial Limitado', vl:15000},
    {nm:'Pit-Stops + Encontros em Grupo', vl:9000},
    {nm:'Área de Membros + Comunidade', vl:8000},
    {nm:'Check-in Diário + Gestor de Performance', vl:13000},
    {nm:'Bônus 1: 2 Auditorias de Social Selling', vl:6000},
    {nm:'Bônus 2: Auditoria de Produção de Conteúdo', vl:6000},
    {nm:'Bônus 3 e 4: Snapshots', vl:6000},
    {nm:'Bônus 5: 2 Auditorias de Comercial', vl:8000},
  ],
  total:181000,
  tablePrice:{full:10000, instal:'12x R$ 1.000'},
  regular:10000, hero:8000, instal:'12x R$ 800',
});

/* ---- OFERTA 4 — FINAL ---- */
const OFFER_4 = offer({
  sec:'Oferta 4 — Entrada', tag:'Oferta 4',
  subtitle:'Entrada no Sistema Simple',
  productName:'Entrada no Sistema Simple',
  core:[ D.roadmap('1 reunião + 1 checkpoint após 45 dias'), D.funil(6) ],
  aceleradores:[ D.biblioteca, D.prompts, D.tracking, D.ltv, D.playbook('Limitado') ],
  suporte:[ SUP.encontros, SUP.comunidade, SUP.area ],
  bonus:BONUS('','',''),
  duvidasLead:'Esse é o ponto de entrada mais acessível do sistema. O que ainda não ficou claro?',
  leva:'O mesmo sistema: quiz, diagnóstico, playbook, aceleradores. Com suporte mais pontual, para quem quer o processo rodando com o menor investimento possível.',
  anchor:[
    {nm:'Roadmap Personalizado', vl:18000},
    {nm:'Funil de Quiz Completo + 6 copies', vl:52000},
    {nm:'Biblioteca de Copy + Prompts de IA', vl:14000},
    {nm:'Setup de Trackeamento e Dashboard', vl:10000},
    {nm:'Mapa de Expansão de Oferta e LTV', vl:12000},
    {nm:'Playbook Comercial Limitado', vl:15000},
    {nm:'Suporte (Encontros em Grupo)', vl:8000},
    {nm:'Área de Membros + Comunidade Privada', vl:8000},
    {nm:'Bônus 1: 2 Auditorias de Social Selling', vl:7000},
    {nm:'Bônus 2: Auditoria de Produção de Conteúdo', vl:7000},
    {nm:'Bônus 3 e 4: Snapshots', vl:6000},
    {nm:'Bônus 5: 2 Auditorias de Comercial', vl:10000},
  ],
  total:172500,
  tablePrice:{full:6000, instal:'12x R$ 600'},
  // oferta final: sem C.A.F. / preço protagonista (preço de tabela é o final)
});

/* ============ DECK ============ */
window.SLIDES = [].concat(COMMON, CARGOS, OFFER_PRINCIPAL, OFFER_2, OFFER_3, OFFER_4);
window.MONEY = money;
