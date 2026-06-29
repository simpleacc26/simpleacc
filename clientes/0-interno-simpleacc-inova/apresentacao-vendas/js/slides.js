/* =====================================================================
   Conteúdo da apresentação de vendas — Simple Acc
   Fonte: copy aprovada (CEO/closer) + estrutura Full Sales (FSS).
   Edite aqui textos, entregáveis e preços. O render fica em deck.js.
   ===================================================================== */

/* ícones de linha sóbrios (substituem os emojis da copy) */
const I = {
  target:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/></svg>',
  pen:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 20h4L19 9l-4-4L4 16v4z"/><path d="M14 6l4 4"/></svg>',
  palette:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 3a9 9 0 100 18c1.5 0 2-1 2-2 0-1.5 1-2 2-2h1a4 4 0 004-4c0-4.5-4-8-9-8z"/><circle cx="7.5" cy="11" r="1.2" fill="currentColor"/><circle cx="12" cy="7.5" r="1.2" fill="currentColor"/><circle cx="16.5" cy="11" r="1.2" fill="currentColor"/></svg>',
  chart:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 20V4"/><path d="M4 20h16"/><rect x="7" y="12" width="3" height="5"/><rect x="12" y="8" width="3" height="9"/><rect x="17" y="5" width="3" height="12"/></svg>',
  bot:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="5" y="8" width="14" height="10" rx="2"/><path d="M12 4v4M9 13h.01M15 13h.01"/></svg>',
  cal:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="4" y="5" width="16" height="16" rx="2"/><path d="M4 9h16M9 3v4M15 3v4"/></svg>',
  doc:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M7 3h7l4 4v14H7z" /><path d="M14 3v4h4M9 12h6M9 16h6"/></svg>',
  rocket:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 15c-1 1-1 4-1 4s3 0 4-1M14 4c3 1 6 4 6 9 0 0-3 4-7 6-2-2-4-4-6-6 2-4 6-7 7-9z"/><circle cx="14.5" cy="9.5" r="1.5"/></svg>',
  layers:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 3l9 5-9 5-9-5 9-5z"/><path d="M3 13l9 5 9-5"/></svg>',
  shield:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 3l8 3v5c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6l8-3z"/></svg>',
  funnel:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 5h18l-7 8v6l-4-2v-4z"/></svg>',
  users:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="9" cy="8" r="3"/><path d="M3 20c0-3 3-5 6-5s6 2 6 5"/><path d="M16 5a3 3 0 010 6M21 20c0-2.5-1.5-4-4-4.5"/></svg>',
  check:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 13l4 4L19 7"/></svg>',
};

const money = (n)=> 'R$ '+n.toLocaleString('pt-BR');

/* --------- Builder de uma trilha de oferta --------- */
function offer(o){
  const s = [];
  s.push({ type:'divider', sec:o.sec, label:`◆ ${o.tag}`, diamond:'◆ ◆ ◆', title:o.tag, sub:o.subtitle||'' });

  o.coreGroups.forEach((g,i)=>{
    s.push({ type:'deliverable', sec:o.sec, label: i===0?'Entregáveis — Core':null,
      kicker:g.kicker||'A estrutura do sistema', title:g.title, lead:g.lead, cards:g.cards });
  });
  if(o.aceleradores) s.push({ type:'deliverable', sec:o.sec, label:'Aceleradores',
    kicker:'Aceleradores', title:'O que acelera o resultado', cards:o.aceleradores });
  if(o.suporte) s.push({ type:'deliverable', sec:o.sec, label:'Suporte',
    kicker:'Suporte', title:'O que garante que você não trava', cards:o.suporte });
  if(o.bonus) s.push({ type:'deliverable', sec:o.sec, label:'Bônus',
    kicker:'Bônus', title:'Bônus para quebrar objeções', cards:o.bonus });

  s.push({ type:'ask', sec:o.sec, label:'Dúvidas', q:'?', title:'Dúvidas?', lead:o.duvidasLead||'Seguimos só quando você estiver seguro de tudo que vai receber.' });
  s.push({ type:'vxp', sec:o.sec, label:'Valor x Preço' });
  s.push({ type:'anchor', sec:o.sec, label:'Ancoragem de valor', title:'Tudo que você recebe — e o valor de mercado de cada entrega',
    items:o.anchor, total:o.total, question:o.anchorQuestion||'Se você pudesse ter um desconto expressivo sobre tudo isso… você seria um cliente hoje?' });
  s.push({ type:'testimonials', sec:o.sec, label:'Depoimentos', items:o.testimonials||DEFAULT_TESTI });
  s.push({ type:'price-table', sec:o.sec, label:'Preço de tabela', title:'Programa de Aceleração Simple Acc',
    note:o.tableNote||'Programa completo, com possibilidade de parcelamento.', price:o.tablePrice });
  s.push({ type:'caf', sec:o.sec, label:'Justificativa' });
  s.push({ type:'hero-price', sec:o.sec, label:'Preço protagonista', regular:o.regular, hero:o.hero, instal:o.instal,
    note:'O valor protagonista só é válido com a decisão na call.' });
  return s;
}

const DEFAULT_TESTI = [
  {who:'Eliana Franz', ctx:'print de resultado'},
  {who:'Juliana Godinho', ctx:'print de resultado'},
  {who:'Rafael (ALIVANCE)', ctx:'print de resultado'},
  {who:'Carol & José', ctx:'print de resultado'},
  {who:'Sabrina', ctx:'print de resultado'},
  {who:'Daniele Christensen', ctx:'print de resultado'},
];

/* ===================== PARTE COMUM (1–24) ===================== */
const COMMON = [
  // 1 — Capa
  { type:'cover', sec:'Abertura', label:'Capa', wordmark:'SIMPLE ACC',
    tag:'Apresentação de uma oportunidade de marketing e vendas' },

  // 2 — Promessa principal
  { type:'statement', sec:'Abertura', label:'Promessa principal', grid:true, glow:true,
    kicker:'A oportunidade',
    title:'Venda mais e mais caro com um processo de aquisição inovador, simples, previsível e lucrativo',
    lead:'Você não precisa de mais tráfego. Precisa do funil certo: que descarta o lead errado, alimenta o comercial com quem vai comprar e faz o negócio crescer com previsibilidade.',
    bullets:[
      'Uma verdadeira máquina de vender high ticket e escalar',
      'Uma empresa que serve você — e não o contrário',
      'Equipe com 4 anos de experiência e resultado em vendas no digital, sem você gastar anos e dinheiro testando tráfego para descobrir o que funciona',
    ]},

  // 3 — Sobre Daniel
  { type:'bio', sec:'Autoridade', label:'Quem é Daniel Souza',
    kicker:'Quem está por trás', title:'Daniel Souza',
    lead:'Empresário, gestor de tráfego e estrategista de crescimento digital. Responsável por milhões em faturamento com campanhas focadas em performance, escala e lucratividade. Cristão, movido pela missão de escalar negócios digitais com produtos que transformam vidas.',
    marcos:[
      '+R$13M em faturamento gerados por campanhas online',
      '+150 projetos atendidos',
      'Aluno e ex-sócio de Luiz Filho (Zion Legacy)',
      'Aluno de Fernanda Face (ex-Nubank)',
      'Acelerado da Full Sales',
      'Faixa azul 4 graus de jiu-jitsu',
    ]},

  // 4 — Provas de credibilidade
  { type:'proof', sec:'Autoridade', label:'Provas de credibilidade',
    kicker:'Prova social', title:'Quem caminha junto',
    lead:'Palestras, equipe, resultados e proximidade com nomes de referência do mercado.',
    items:['Foto com Luiz Filho','Palco da mentoria','Equipe Simple Acc','Bastidores de evento','Resultados de clientes','Autoridades do mercado'] },

  // 5 — Trajetória
  { type:'statement', sec:'Autoridade', label:'Trajetória da Simple', grid:true, glow:true,
    kicker:'A empresa', title:'A trajetória da Simple',
    bullets:[
      'R$1,57 mi de faturamento no primeiro ano de atuação',
      'Escritório na Marçal Tower',
      '+40 negócios implementando nossa metodologia',
      'R$411 mil de faturamento na nossa própria operação',
    ]},

  // 6 — Cenário negativo (Inferno)
  { type:'list', sec:'Diagnóstico', label:'O cenário atual (Inferno)', tone:'bad',
    kicker:'O contexto atual do mercado', kickerWarn:true, title:'O "inferno" de quem só compra tráfego',
    bullets:[
      '<b>Lead caro e descomprometido:</b> chegam muitos, poucos compram',
      '<b>Sessão estratégica perdeu força:</b> o mercado saturou e o lead cansou',
      '<b>Concorrência explodiu:</b> depois da onda high ticket, todo mundo virou mentor',
      '<b>Conversão baixa:</b> você gera lead mas não fecha venda',
      '<b>Falta de previsibilidade:</b> um mês bom, dois ruins… sem controle do próximo',
      '<b>CAC e CPL só sobem:</b> tráfego mais caro, resultado menor',
      '<b>Marketing e vendas desalinhados:</b> o tráfego traz lead que o comercial não fecha',
    ],
    foot:'O resultado é desânimo, exaustão e a sensação de fazer tudo certo enquanto os números não respondem.' },

  // 7 — Cenário positivo (Céu)
  { type:'list', sec:'Diagnóstico', label:'O cenário ideal (Céu)', tone:'good',
    kicker:'Solução para a queda de ROI', title:'O "céu": oferta irresistível + aquisição inovadora',
    lead:'Ofertas irresistíveis e um processo de aquisição inovador alinhado, com setters e closers em todas as etapas de contato com o cliente.',
    bullets:[
      '<b>Previsibilidade:</b> você sabe o que vai fechar mês a mês',
      '<b>Leads qualificados:</b> esteira ativa entregando leads prontos, todo dia',
      '<b>Empresa sólida:</b> referência no seu nicho',
      '<b>Ticket mais alto:</b> ofertas posicionadas com ancoragem de valor',
      '<b>ROI de 10x a 40x:</b> cada real em tráfego retorna de forma previsível',
      '<b>Sistema replicável:</b> crescimento que não precisa reinventar todo mês',
      '<b>Independência:</b> tráfego pago lucrativo sem depender só de indicação',
    ]},

  // 8 — Riscos de fazer sozinho
  { type:'cards', sec:'Diagnóstico', label:'Riscos de fazer sozinho',
    kicker:'Por que não tentar sozinho', title:'Os riscos de fazer sozinho, sem o conhecimento',
    cols:3, cards:[
      {h:'Tentativa e erro constante', p:'Tempo e dinheiro investidos sem resultado previsível.'},
      {h:'Gestor que não estrutura ponta a ponta', p:'Roda anúncio, mas não resolve o problema. Você fica preso no mesmo ciclo.'},
      {h:'Não achar o gargalo real', p:'Pode ser a oferta, o funil, o comercial — ou os três. Sem diagnóstico, você trata o sintoma.'},
      {h:'Gerar lead e não converter', p:'Funil sem comercial estruturado é dinheiro escorrendo.'},
      {h:'Investir sem saber o CAC real', p:'Você gasta sem saber se está tendo lucro ou prejuízo.'},
      {h:'Marketing e vendas sem sinergia', p:'O tráfego precisa alimentar o comercial com fit, não com volume.'},
    ]},

  // 9 — Benefícios (vender o sonho)
  { type:'cards', sec:'Diagnóstico', label:'Quanto valeria ter tudo isso', glow:true,
    kicker:'Venda do futuro', title:'Quanto valeria, hoje, ter tudo isso?',
    cols:3, cards:[
      {h:'Leads qualificados todo dia', p:'Sem depender de indicação, conteúdo em massa, lives ou lançamentos.'},
      {h:'CAC previsível e controlado', p:'Você sabe quanto custa cada cliente antes de fechar o mês.'},
      {h:'Funil rodando sozinho', p:'Sem você no operacional para o sistema funcionar.'},
      {h:'Comercial com agenda cheia de MQL', p:'Oportunidades de venda o tempo todo.'},
      {h:'Clareza total dos números', p:'CPL, CAC, agendamento e fechamento visíveis em tempo real.'},
      {h:'Receita da base que já tem', p:'Mais faturamento sem precisar de lead novo.'},
    ]},

  // 10 — Transição para a metodologia
  { type:'statement', sec:'Metodologia', label:'A nova onda', grid:true, glow:true,
    kicker:'Transição', title:'O Funil de Lead Dinâmico é a nova onda do mercado digital',
    lead:'Enquanto a sessão estratégica tradicional perdeu força, o quiz qualifica automaticamente, reduz o custo do lead e entrega ao comercial só quem tem fit e poder de compra. É a metodologia que mais vai funcionar nos próximos meses — e poucos mentores ainda usam.' },

  // 11 — Os 4 pilares (mandala)
  { type:'mandala', sec:'Metodologia', label:'Os 4 pilares',
    kicker:'Visão geral', title:'Os 4 pilares que escalam uma empresa', core:'O seu ecossistema',
    petals:[
      {k:'Pilar 1 · Produto e Oferta', p:'Produto, benefícios e condições tão irresistíveis que dizer não parece um erro.'},
      {k:'Pilar 2 · Funil de Lead Dinâmico', p:'O mecanismo que filtra o lead antes do comercial.'},
      {k:'Pilar 3 · Comercial', p:'O processo que transforma leads qualificados em receita previsível.'},
      {k:'Pilar 4 · Expansão', p:'Mais lucro extraindo valor da base de clientes que você já tem.'},
    ]},

  // 12 — Core: implementação do funil
  { type:'statement', sec:'Metodologia', label:'O coração do sistema', grid:true, glow:true,
    kicker:'O core', title:'O coração do sistema é o Funil de Lead Dinâmico',
    lead:'É ele que filtra o lead ruim antes de chegar no comercial, reduz o custo de aquisição qualificado e cria um fluxo previsível de gente pronta para comprar.',
    bullets:[
      'A sessão estratégica saturou: o lead cansou de agendar',
      'O quiz qualifica automaticamente, 24h por dia',
      'Elimina o lead descomprometido antes da call',
      'Reduz o custo do MQL de forma consistente e mensurável',
    ]},

  // 13–16 — Pilares
  { type:'pillar', sec:'Metodologia', label:'Pilar 1 — Produto e Oferta', n:'01',
    title:'Produto e Oferta', sub:'O funil filtra quem compra, mas a oferta precisa ser irresistível',
    lead:'Oferta fraca com funil forte ainda é funil quebrado. Posicionamos sua oferta para o cliente certo, com a mensagem certa, no momento certo.',
    bullets:['Quem é seu cliente ideal e o que ele realmente quer comprar','Ancoragem de valor e posicionamento de preço','Upsells, downsells e ofertas complementares para maximizar o LTV','Comunicação da oferta alinhada ao mecanismo do funil'] },
  { type:'pillar', sec:'Metodologia', label:'Pilar 2 — Funil de Lead Dinâmico', n:'02',
    title:'Funil de Lead Dinâmico', sub:'Transforma tráfego frio em lead qualificado',
    lead:'Filtra o lead ruim antes do comercial, reduz o custo de aquisição e cria um fluxo previsível de pessoas prontas para comprar.',
    bullets:['A sessão estratégica concorre com mais de 10 mil mentores','O quiz aquece o lead automaticamente e o prepara para comprar','Elimina o lead descomprometido antes da call','Reduz o custo do MQL de forma mensurável'] },
  { type:'pillar', sec:'Metodologia', label:'Pilar 3 — Comercial', n:'03',
    title:'Comercial', sub:'Lead qualificado sem comercial estruturado é desperdício',
    lead:'O funil entrega o lead certo. O comercial transforma esse lead em receita. Não adianta funil perfeito se o comercial perde a venda boa por falta de processo.',
    bullets:['Script de pré-venda e roteiro de call validado para high ticket','Processo de SDR completo: cadência de follow-up e templates de agendamento','Matriz de objeções: resposta estruturada para cada resistência'] },
  { type:'pillar', sec:'Metodologia', label:'Pilar 4 — Expansão', n:'04',
    title:'Expansão — Funil Ampulheta', sub:'O negócio mais lucrativo começa na base que você já tem',
    lead:'A maior oportunidade de lucro está em quem já comprou. O Funil de Ampulheta inverte a lógica de gastar tudo atraindo cliente novo.',
    bullets:['Monetizar a base antes de precisar de lead novo','Upsell e downsell com base no que o ICP já comprou','Ofertas complementares que aumentam o valor por cliente sem subir o CAC','Reativação de leads que passaram pelo funil e ainda não compraram'] },

  // 17 — Fases (visão geral)
  { type:'phases', sec:'Implementação', label:'Fases da implementação',
    kicker:'Visão geral', title:'As fases da implementação Simple',
    steps:[
      {n:'1', h:'Validação', p:'Encontrar o quiz que converte e gerar as primeiras vendas'},
      {n:'2', h:'Otimização', p:'Estabilizar custos, escalar o que funcionou'},
      {n:'3', h:'Escala', p:'Consolidar previsibilidade e lucro'},
    ]},

  // 18–20 — Fases detalhe (tema claro, como no Figma)
  { type:'phase', sec:'Implementação', label:'Fase 1 — Validação', light:true, n:'01', name:'Validação', dur:'≈ 30 dias',
    objetivo:'Encontrar o primeiro quiz que converte, validar a linha criativa e gerar as primeiras vendas.',
    metas:['Encontrar o primeiro quiz e página que performam','Coletar 100 leads qualificados no mês','Gerar de 2 a 5 vendas no mês'] },
  { type:'phase', sec:'Implementação', label:'Fase 2 — Otimização', light:true, n:'02', name:'Otimização', dur:'≈ 30 dias',
    objetivo:'Estabilizar os custos, escalar o que funcionou, ganhar mercado e encontrar as alavancas de crescimento.',
    metas:['Manter CPL estável (variação máx. 20%, CPL máx. R$30)','Dobrar o investimento em mídia','Analisar e otimizar o CAC','Reunião comparativa via Growth Model'] },
  { type:'phase', sec:'Implementação', label:'Fase 3 — Escala', light:true, n:'03', name:'Escala e Consolidação', dur:'≈ 30 dias',
    objetivo:'Escalar o investimento, consolidar previsibilidade e lucro.',
    metas:['Duplicar novamente o investimento em mídia','Chegar a +R$250k/mês de faturamento recorrente','Operação previsível, lucrativa e escalável'] },

  // 21 — Cases
  { type:'cases', sec:'Implementação', label:'Cases de resultado',
    kicker:'Prova', title:'Resultados reais de quem já passou pelo processo',
    note:'Preencher com os dados reais de projetos (já existentes na apresentação original).',
    rows:[
      {p:'Projeto / Cliente', fat:'Faturamento', inv:'Investimento', cac:'CAC'},
    ]},

  // 22 — Transição para o produto
  { type:'statement', sec:'Produto', label:'Transição para o produto', grid:true, glow:true,
    kicker:'Agora sim', title:'Agora eu quero te apresentar o programa que estrutura tudo isso',
    lead:'Da oferta ao comercial, do funil ao crescimento — implementado COM você, não POR você.' },

  // 23 — Capa do produto
  { type:'divider', sec:'Produto', label:'Capa do produto', diamond:'IMPLEMENTAÇÃO',
    title:'Programa de Implementação Simple Acc', sub:'O sistema completo de aquisição e vendas' },

  // 24 — No que consiste
  { type:'consists', sec:'Produto', label:'No que consiste o programa',
    kicker:'O programa', title:'No que consiste o Programa de Implementação Simple Acc',
    points:[
      'Ofertas irresistíveis que fazem os leads implorarem para comprar',
      'Funil de Lead Dinâmico que filtra lead ruim e reduz o custo de aquisição',
      'Comercial pujante para converter MQL em receita',
      'Expansão de valor para crescer com a base que você já tem',
    ]},
];

/* ===================== OFERTAS ===================== */

// Helpers de entregáveis recorrentes
const D = {
  roadmap:(extra)=>({ico:I.target, h:'Roadmap Personalizado', p:`Direcionamento prático e ultraespecífico para o seu negócio${extra?' ('+extra+')':''}. Handoff documentado ao fim de cada sessão — você nunca fica sem direção.`}),
  protocolo:{ico:I.shield, h:'Protocolo Destrava Lucro', p:'Diagnóstico triplo (oferta + ICP + mercado / comercial / mídia). Antes de rodar tráfego, sabemos onde está o gargalo.'},
  growth:{ico:I.chart, h:'Growth Model Personalizado', p:'Projeção baseada nos seus números reais: custo de MQL projetado vs. atual, fechamento esperado e receita adicional mensal.'},
  funil:(copies)=>({ico:I.funnel, h:`Funil de Quiz Completo e Calibrado${copies?` + ${copies} copies`:''}`, p:`Quiz de qualificação, página de aplicação e integração com o tráfego. Filtra o lead ruim e reduz o custo de MQL.${copies?` Inclui ${copies} copies produzidas pelo time.`:''}`}),
  biblioteca:{ico:I.layers, h:'Biblioteca de Copy para Anúncios', p:'Formatos validados por nível de consciência do lead (topo, meio e fundo). O gestor usa sem depender de você.'},
  prompts:{ico:I.bot, h:'Prompts e Agentes de IA', p:'Copy de anúncio e quiz em ~20 minutos. Reduz a dependência de copywriter e mantém o sistema rodando.'},
  tracking:{ico:I.chart, h:'Setup de Trackeamento e Dashboard', p:'CPL, custo de MQL, taxa de agendamento e de fechamento — tudo em um lugar, em tempo real.'},
  ltv:{ico:I.rocket, h:'Mapa de Expansão de Oferta e LTV', p:'Como monetizar a base que você já tem: novas ofertas, upsells e downsells com base no que o ICP já comprou.'},
  playbook:(lim)=>({ico:I.doc, h:`Playbook Comercial ${lim||'Completo e Ilimitado'}`, p:'Script de pré-venda, roteiro de call 1x1, templates de agendamento, processo de SDR e matriz de objeções.'}),
  gestorCS:{ico:I.users, h:'Gestor de Performance Dedicado', p:'Um CS dedicado ao sucesso do seu projeto, com acompanhamento próximo durante toda a implementação.'},
};

const SUP = {
  pitQuinzenal:{ico:I.cal, h:'Pit-Stop Individual Quinzenal', p:'Sessão estratégica a cada 15 dias (30–45 min) com métricas em tempo real e handoff documentado.'},
  pitMensal:{ico:I.cal, h:'Pit-Stop Individual Mensal', p:'Sessão estratégica a cada 30 dias com métricas em tempo real e handoff documentado.'},
  checkin:{ico:I.bot, h:'Check-in Diário Assíncrono', p:'Grupo de WhatsApp individual com sua empresa. Dúvida rápida e atualização de campanha sem depender de call.'},
  encontros:{ico:I.users, h:'Encontros em Grupo Quinzenais', p:'Conteúdo técnico e hot seat: você apresenta o problema e o grupo + consultor resolvem juntos.'},
  comunidade:{ico:I.users, h:'Comunidade Privada de Mentores', p:'Networking entre quem está construindo a mesma máquina. Sala de troca entre quem está no mesmo nível.'},
  area:{ico:I.layers, h:'Área de Membros com Trilhas por Pilar', p:'Conteúdo organizado por Oferta, Quiz, Comercial e Expansão. Você acha o que precisa na hora que precisa.'},
};

const bonus = (n1,n5,extra2,extra)=>[
  {ico:I.check, h:`Bônus 1 · Auditoria de Social Selling${n1?` (${n1})`:''}`, p:'Garante que o perfil orgânico converte. Resolve a objeção "mas e o conteúdo?".'},
  {ico:I.check, h:`Bônus 2 · Auditoria de Produção de Conteúdo${extra2?` (${extra2})`:''}`, p:'O orgânico passa a trabalhar na mesma direção do tráfego pago.'},
  {ico:I.check, h:'Bônus 3 · Snapshot de Pipeline', p:'Visão completa do pipeline: onde estão os leads, o que está em negociação e onde estão as perdas.'},
  {ico:I.check, h:'Bônus 4 · Snapshot de Automações', p:'Diagnóstico das automações do funil: o que roda, o que trava e o que pode ser otimizado.'},
  {ico:I.check, h:`Bônus 5 · Auditoria de Comercial${n5?` (${n5})`:''}`, p:'Análise ponta a ponta do comercial: calls, scripts e apresentações comerciais.'},
];

/* ---- Oferta 1 — Implementação (R$35k) ---- */
const OFFER1 = offer({
  sec:'Oferta 1 — Implementação', tag:'Oferta 1 — Implementação', subtitle:'Done-with-you completo, com time dedicado',
  coreGroups:[
    { title:'A estrutura do sistema', lead:'Direção, diagnóstico, projeção e o funil completo — com time dedicado executando ao seu lado.',
      cards:[ D.roadmap('1 reunião + checkpoints'), D.protocolo, D.growth, D.funil() ]},
    { kicker:'O time dedicado', title:'Um time inteiro executando por você', lead:'Você não terá só um consultor: terá um time que conhece a fundo a operação e decide lado a lado.',
      cards:[
        {ico:I.target, h:'Estrategista', p:'Mapeia o ecossistema, constrói o mapa estratégico mensal e acompanha CPL, CAC, agendamento, conversão e ROI.'},
        {ico:I.pen, h:'Copywriter', p:'Headlines que param o scroll, copy de quiz que qualifica e páginas que convertem (PAS, AIDA, PASTOR).'},
        {ico:I.palette, h:'Designer de Alta Conversão', p:'Páginas responsivas (70% mobile) e quiz visualmente intuitivo que reduz fricção.'},
        {ico:I.chart, h:'Gestor de Tráfego', p:'Estrutura campanhas do zero, testa ângulos, escala só o que performa e controla todas as métricas.'},
        {ico:I.bot, h:'Gestor de Automação', p:'Dashboards em tempo real e automações do funil — nenhum lead se perde.'},
        {ico:I.doc, h:'Suporte no Processo Comercial', p:'O mesmo script e metodologia de pitch usados para fechar contratos de 5 dígitos em calls de 45 min.'},
      ]},
  ],
  aceleradores:[
    {ico:I.cal, h:'Reuniões de Pitstop Estratégicas', p:'Todo mês (dias 17–21), 30–45 min: revisão de métricas, gargalos, decisões rápidas e próximos passos.'},
    {ico:I.doc, h:'3 Debriefings de Transição de Fase', p:'A cada 60 dias: relatório completo, aprendizados, comparativo de evolução e plano da próxima fase.'},
    D.playbook(), D.ltv,
  ],
  suporte:[ SUP.encontros, SUP.area, SUP.comunidade, SUP.checkin ],
  bonus: bonus('6 auditorias','6 auditorias','6 auditorias'),
  anchor:[
    {nm:'Roadmap Personalizado (1 reunião + 4 checkpoints)', vl:8000},
    {nm:'Protocolo Destrava Lucro (diagnóstico triplo)', vl:15000},
    {nm:'Growth Model Personalizado', vl:12000},
    {nm:'Implementação de Funil de Lead Dinâmico', vl:30000, group:true},
    {nm:'Estrategista', vl:60000, sub:true},
    {nm:'Copywriter para Funil e Campanhas', vl:24000, sub:true},
    {nm:'Designer de Alta Conversão', vl:18000, sub:true},
    {nm:'Gestão de Tráfego Pago', vl:30000, sub:true},
    {nm:'Automação e Integração de CRM', vl:2000, sub:true},
    {nm:'Reuniões de Pitstop Estratégicas', vl:24000, sub:true},
    {nm:'3 Debriefings de Transição de Fase', vl:10000, sub:true},
    {nm:'Suporte de Estruturação do Comercial + Script', vl:10000, sub:true},
    {nm:'Mapa de Expansão de Oferta e LTV', vl:15000},
    {nm:'Playbook Comercial Completo e Ilimitado', vl:25000},
    {nm:'Encontros em Grupo Quinzenais', vl:6000},
    {nm:'Área de Membros com Trilhas por Pilar', vl:8000},
    {nm:'Comunidade Privada de Mentores', vl:4000},
    {nm:'Check-in Diário Assíncrono', vl:6000},
    {nm:'Bônus 1 · 6 Auditorias de Social Selling', vl:14000},
    {nm:'Bônus 2 · 6 Auditorias de Produção de Conteúdo', vl:8000},
    {nm:'Bônus 3 · Snapshot de Pipeline', vl:4000},
    {nm:'Bônus 4 · Snapshot de Automações', vl:4000},
    {nm:'Bônus 5 · 6 Auditorias de Comercial', vl:18000},
  ],
  total:355000, anchorQuestion:'Se você pudesse ter 70% de desconto sobre tudo isso… você seria um cliente hoje?',
  tablePrice:{full:40000, instal:'12x R$ 3.800'},
  regular:40000, hero:35000, instal:'12x R$ 3.500',
});

/* ---- Oferta Principal / Consultoria (R$20k) ---- */
const OFFERP = offer({
  sec:'Oferta Principal', tag:'Oferta Principal — Consultoria', subtitle:'O sistema completo com você no comando, guiado pela Simple',
  coreGroups:[
    { title:'A estrutura do sistema', lead:'Direção, diagnóstico, projeção e o funil completo calibrado — com 12 copies produzidas pelo time.',
      cards:[ D.roadmap('1 reunião + 4 checkpoints'), D.protocolo, D.growth, D.funil(12) ]},
  ],
  aceleradores:[ D.biblioteca, D.prompts, D.tracking, D.ltv, D.playbook() ],
  suporte:[ SUP.pitQuinzenal, SUP.checkin, SUP.encontros, SUP.comunidade, SUP.area, D.gestorCS ],
  bonus: bonus('4 auditorias','4 auditorias'),
  anchor:[
    {nm:'Roadmap Personalizado (1 reunião + 4 checkpoints)', vl:8000},
    {nm:'Protocolo Destrava Lucro (diagnóstico triplo)', vl:15000},
    {nm:'Growth Model Personalizado', vl:12000},
    {nm:'Funil de Quiz Completo + 12 copies', vl:60000},
    {nm:'Biblioteca de Copy para Anúncios', vl:8000},
    {nm:'Prompts e Agentes de IA para Copy e Quiz', vl:6000},
    {nm:'Setup de Trackeamento e Dashboard', vl:10000},
    {nm:'Mapa de Expansão de Oferta e LTV', vl:15000},
    {nm:'Playbook Comercial Completo e Ilimitado', vl:25000},
    {nm:'Pit-Stops Individuais Quinzenais', vl:18000},
    {nm:'Encontros em Grupo Quinzenais', vl:6000},
    {nm:'Área de Membros com Trilhas por Pilar', vl:8000},
    {nm:'Comunidade Privada de Mentores', vl:4000},
    {nm:'Check-in Diário Assíncrono', vl:6000},
    {nm:'Gestor de Performance Dedicado', vl:36000},
    {nm:'Bônus 1 · 4 Auditorias de Social Selling', vl:12000},
    {nm:'Bônus 2 · Auditoria de Produção de Conteúdo', vl:6000},
    {nm:'Bônus 3 · Snapshot de Pipeline', vl:4000},
    {nm:'Bônus 4 · Snapshot de Automações', vl:4000},
    {nm:'Bônus 5 · 4 Auditorias de Comercial', vl:16000},
  ],
  total:279000,
  tablePrice:{full:25000, instal:'12x R$ 2.500'},
  regular:25000, hero:20000, instal:'12x R$ 2.000',
});

/* ---- Oferta 2 — Downsell (R$15k) ---- */
const OFFER2 = offer({
  sec:'Oferta 2 — Downsell', tag:'Oferta 2 — Downsell', subtitle:'O sistema completo com suporte mensal',
  coreGroups:[
    { title:'A estrutura do sistema', lead:'O mesmo mecanismo, com 6 copies produzidas pelo time.',
      cards:[ D.roadmap('1 reunião + 2 checkpoints'), D.protocolo, D.growth, D.funil(6) ]},
  ],
  aceleradores:[ D.biblioteca, D.prompts, D.tracking, D.ltv, D.playbook('Completo e Ilimitado') ],
  suporte:[ SUP.pitMensal, SUP.checkin, SUP.encontros, SUP.comunidade, SUP.area, D.gestorCS ],
  bonus: bonus('2 auditorias','2 auditorias','2 auditorias'),
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
    {nm:'Pit-Stops Individuais', vl:12000},
    {nm:'Encontros em Grupo Quinzenais', vl:6000},
    {nm:'Área de Membros + Comunidade Privada', vl:12000},
    {nm:'Check-in Diário Assíncrono', vl:6000},
    {nm:'Gestor de Performance Dedicado', vl:36000},
    {nm:'Bônus 1 · 2 Auditorias de Social Selling', vl:6000},
    {nm:'Bônus 2 · Auditoria de Produção de Conteúdo', vl:6000},
    {nm:'Bônus 3 e 4 · Snapshots de Pipeline e Automações', vl:8000},
    {nm:'Bônus 5 · 2 Auditorias de Comercial', vl:8000},
  ],
  total:231000,
  tablePrice:{full:18000, instal:'12x R$ 1.800'},
  regular:18000, hero:15000, instal:'12x R$ 1.500',
});

/* ---- Oferta 3 (R$8k) ---- */
const OFFER3 = offer({
  sec:'Oferta 3', tag:'Oferta 3', subtitle:'O sistema com suporte enxuto',
  coreGroups:[
    { title:'A estrutura do sistema', lead:'Direção, diagnóstico, projeção e funil com 6 copies.',
      cards:[ D.roadmap('1 reunião'), D.protocolo, D.growth, D.funil(6) ]},
  ],
  aceleradores:[ D.biblioteca, D.prompts, D.tracking, D.ltv, D.playbook('Completo e Ilimitado') ],
  suporte:[ {ico:I.cal, h:'4 Pit-Stops', p:'Sessão estratégica a cada 30 dias (30–45 min) com métricas em tempo real e handoff documentado.'}, SUP.checkin, SUP.encontros, SUP.comunidade, SUP.area, D.gestorCS ],
  bonus: bonus('','','',''),
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
    {nm:'Bônus 1 · 2 Auditorias de Social Selling', vl:6000},
    {nm:'Bônus 2 · Auditoria de Produção de Conteúdo', vl:6000},
    {nm:'Bônus 3 e 4 · Snapshots', vl:6000},
    {nm:'Bônus 5 · 2 Auditorias de Comercial', vl:8000},
  ],
  total:181000,
  tablePrice:{full:10000, instal:'12x R$ 1.000'},
  regular:10000, hero:8000, instal:'12x R$ 800',
});

/* ---- Oferta 4 — Final / entrada (R$6k) ---- */
const OFFER4 = offer({
  sec:'Oferta 4 — Entrada', tag:'Oferta 4 — Entrada no Sistema', subtitle:'O ponto de entrada mais acessível do sistema',
  coreGroups:[
    { title:'A estrutura do sistema', lead:'O mesmo sistema — quiz, diagnóstico, playbook e aceleradores — com suporte mais pontual e o menor investimento possível.',
      cards:[ D.roadmap('1 reunião + 1 checkpoint em 45 dias'), D.funil(6) ]},
  ],
  aceleradores:[ D.biblioteca, D.prompts, D.tracking, D.ltv, D.playbook('Limitado') ],
  suporte:[ SUP.encontros, SUP.comunidade, SUP.area ],
  bonus: bonus('','',''),
  duvidasLead:'Esse é o ponto de entrada mais acessível do sistema. O que ainda não ficou claro?',
  anchor:[
    {nm:'Roadmap Personalizado', vl:18000},
    {nm:'Funil de Quiz Completo + 6 copies', vl:52000},
    {nm:'Biblioteca de Copy + Prompts de IA', vl:14000},
    {nm:'Setup de Trackeamento e Dashboard', vl:10000},
    {nm:'Mapa de Expansão de Oferta e LTV', vl:12000},
    {nm:'Playbook Comercial Limitado', vl:15000},
    {nm:'Suporte (Encontros em Grupo)', vl:8000},
    {nm:'Área de Membros + Comunidade Privada', vl:8000},
    {nm:'Bônus 1 · 2 Auditorias de Social Selling', vl:7000},
    {nm:'Bônus 2 · Auditoria de Produção de Conteúdo', vl:7000},
    {nm:'Bônus 3 e 4 · Snapshots', vl:6000},
    {nm:'Bônus 5 · 2 Auditorias de Comercial', vl:10000},
  ],
  total:172500,
  tableNote:'Entrada no Sistema Simple Acc.',
  tablePrice:{full:6000, instal:'12x R$ 600'},
  regular:6000, hero:6000, instal:'12x R$ 600',
});

/* ===================== DECK ===================== */
window.SLIDES = [].concat(COMMON, OFFER1, OFFERP, OFFER2, OFFER3, OFFER4);
window.MONEY = money;
