import fs from 'fs';
const RAIZ = '/home/user/simpleacc/clientes/fabricio-hodie';
const FUNIL = RAIZ + '/funis/quiz-hodie';
globalThis.window = {};
await import(FUNIL + '/flow.js');
const F = globalThis.window.FLOW;

// as strings do flow.js usam template literals com quebra e HTML inline
const limpa = s => String(s)
  .replace(/<strong>|<\/strong>/g, '**')
  .replace(/<[^>]+>/g, '')
  .replace(/\s+/g, ' ')
  .trim();

const L = [];
const p = (s='') => L.push(s);
const h1 = s => { p('# ' + s); p(); };
const h2 = s => { p('## ' + s); p(); };
const h3 = s => { p('### ' + s); p(); };
const h4 = s => { p('#### ' + s); p(); };
const txt = s => { p(s); p(); };

function secoes(arquivo, nivel) {
  const linhas = fs.readFileSync(arquivo, 'utf8').split('\n');
  const marca = '#'.repeat(nivel) + ' ';
  const out = []; let atual = null;
  for (const l of linhas) {
    if (/^#{1,3} /.test(l)) {
      atual = l.startsWith(marca) ? { titulo: l.slice(marca.length).trim(), corpo: [] } : null;
      if (atual) out.push(atual);
      continue;
    }
    if (atual) atual.corpo.push(l);
  }
  return out.map(s => ({ titulo: s.titulo, corpo: s.corpo.join('\n').replace(/\n?---\n?/g,'\n').trim() }));
}

h1('Copy completa do funil do Índice do Metabolismo da Fome');
txt('**HODIE · Dra. Lailla de Oliveira**');
txt('Documento de leitura. Reúne, em texto corrido, toda a copy que está no ar no funil do IMF: os anúncios, a leitura de nove perguntas e os relatórios que o funil entrega.');
txt('Funil no ar: https://quiz-hodie-simpleacc.vercel.app');
txt('Extraído dos arquivos do funil em 17/09/2026. **Nada foi reescrito para este documento.** O texto abaixo é exatamente o que a página mostra. Se algo for alterado aqui, o documento e a página passam a divergir, então use os comentários para apontar o que quer mudar, em vez de editar o texto.');
p('---'); p();

h1('Bloco A · Anúncios');
const ads = secoes(RAIZ + '/copy/2026-09-15-anuncios-quiz-imf.md', 2).filter(s => /^\d/.test(s.titulo));
if (!ads.length) { p('<<<ADS_HODIE>>>'); p(); }
txt('Cada peça entra por uma dor diferente e todas levam para a raiz do funil.');
// as linhas de "Ângulo" e "Atenção" são nota interna de quem escreve, não são o anúncio
const semNotaInterna = c => {
  const out = []; let pulando = false;
  for (const l of c.split('\n')) {
    if (/^\s*\*\*(Ângulo|Atenção):\*\*/.test(l)) { pulando = true; continue; }
    // a nota pode continuar na linha de baixo; ela termina numa linha vazia ou noutro rótulo
    if (pulando) {
      if (!l.trim() || /^\s*\*\*/.test(l)) pulando = false;
      else continue;
    }
    out.push(l);
  }
  return out.join('\n').replace(/\n{3,}/g, '\n\n').trim();
};
ads.forEach((s, i) => { h3('Anúncio ' + s.titulo.replace(/^(\d+)[\.\)]\s*/, '$1 · ')); txt(semNotaInterna(s.corpo)); });
p('---'); p();

h1('Bloco B · A leitura');
txt('São nove perguntas, uma tela de carregamento e a tela de captura.');

h2('Tela de abertura');
h3('Selo');
txt(F.hero.selo);
h3('Título');
txt(F.hero.titulo);
h3('Subtítulo');
txt(F.hero.subtitulo);
h3('Linha de apoio');
txt(F.hero.tempo);
h3('Botão');
txt(F.hero.cta);
h3('Linha de apoio da primeira pergunta');
txt('Toque na opção que mais combina. Avança sozinho.');
h3('Rodapé, em todas as telas do quiz');
txt('HODIE · Dra. Lailla de Oliveira · CRM-SP 239430 · Jundiaí-SP e atendimento on-line. Este conteúdo é educativo e não substitui consulta médica.');

F.steps.forEach((s, i) => {
  h2('Pergunta ' + (i + 1));
  txt('_Etapa: ' + s.etapa + '_');
  txt(s.pergunta);
  h3('Alternativas');
  s.options.forEach(o => p('- ' + o.label));
  p();
});

h2('Tela de carregamento');
h3('Chapéu');
txt('Quase lá');
h3('Título');
txt('Preparando a sua leitura');
h3('Frases, em sequência');
p('- Analisando as suas respostas...');
p('- Calculando o seu ' + F.indice.nome + '...');
p('- Montando a sua leitura personalizada...');
p();
h3('Linha de apoio');
txt('Estamos personalizando com base no que você respondeu.');

h2('Tela de captura');
h3('Título');
txt(F.captura.titulo);
h3('Subtítulo');
txt(F.captura.subtitulo);
h3('Campos');
F.captura.campos.forEach(c => p('- ' + c.label + ' (' + c.placeholder + ')'));
p();
h3('Botão');
txt(F.captura.cta);
h3('Privacidade');
txt(F.captura.privacidade);
p('---'); p();

h1('Bloco C · Os relatórios');
txt('A leitura entrega **um relatório por perfil**. São cinco perfis, e é o perfil que define os quatro trechos segmentados do relatório: a chamada, a explicação de por que não se resolveu, os dois caminhos e o que precisa acontecer agora. Os cinco estão escritos abaixo, um por um.');
txt('O resto do relatório é o mesmo para todas, e está escrito uma vez só, logo abaixo, na ordem em que aparece na tela. Dentro dele, três passagens mudam sem mudar o perfil:');
p('- **O ' + F.indice.nome + '**, que abre o relatório e diz quantos sinais apareceram. Três faixas.');
p('- **O bloco "o seu cenário hoje"**, montado com as respostas da própria pessoa.');
p('- **O convite do fim**, que muda conforme o momento dela. Três versões.');
p();

h2('C.1 · A parte que muda conforme o perfil');
const ordem = ['reganho','conducao','exames_normais','sem_medicacao','disciplina'];
ordem.forEach((k, i) => {
  const B = F.buckets[k];
  h3('Perfil ' + (i+1) + ' · ' + B.nome);
  h4('Selo, no topo do relatório');
  txt('Perfil identificado: **' + B.nome + '**');
  h4('Chamada, no fim do bloco "antes de tudo"');
  txt(limpa(B.chamada));
  h4('No bloco "por que não se resolveu até agora"');
  txt(limpa(B.porque));
  h4('Os dois caminhos');
  p('**' + B.caminhos.ruim.titulo + '**'); p();
  B.caminhos.ruim.itens.forEach(x => p('- ' + limpa(x))); p();
  p('**' + B.caminhos.bom.titulo + '**'); p();
  B.caminhos.bom.itens.forEach(x => p('- ' + limpa(x))); p();
  h4('No bloco "o que precisa acontecer agora"');
  txt(limpa(B.agora));
  h4('Fase destacada no método');
  txt('Neste perfil, a fase em destaque é **' + ({investigar:'Investigar', tratar:'Tratar', sustentar:'Sustentar'}[B.enfase] || B.enfase) + '**.');
});

p('---'); p();
h2('C.2 · O relatório, na ordem em que aparece na tela');

h3('Topo');
txt('_Selo:_ Leitura personalizada');
txt('**O seu ' + F.indice.nome + '**');
txt('_Em seguida vem o número em porcentagem e a faixa. São três faixas possíveis:_');
Object.values(F.indice.faixas).forEach(f => { p('**' + f.titulo + '**'); p(); txt(f.resumo); });
txt('_Abaixo entra o selo do perfil, que está na parte C.1._');
txt(F.indice.explicacao + ' ' + F.indice.ressalva);

h3('Antes de tudo');
txt('Oi, primeiro nome da pessoa. Eu li com atenção tudo o que você respondeu. E quero começar pela coisa que talvez ninguém tenha te dito nesses anos todos: **a sua fome não é fraqueza. Ela é um sintoma.** Fome que não passa, vontade de doce que aperta sempre no mesmo horário e peso que volta depois do esforço não são falha de caráter. São sinais de um metabolismo da fome que pode estar desregulado. E sintoma se investiga.');
txt('_Quando o nome não é informado, a frase abre só em "Oi."._');
txt('_Em seguida entra a chamada do perfil, que está na parte C.1._');

h3('O seu cenário hoje');
txt('Pelo que você me contou, a sua realidade é **(resposta da pergunta 1)**, e o que mais pesa no seu dia é **(resposta da pergunta 2)**. Isso acontece **(resposta da pergunta 3)**. Quando você imagina seguir assim, o que mais incomoda é **(resposta da pergunta 4)**. Sobre a medicação, o seu momento é **(resposta da pergunta 7)**. Esse conjunto se repete no consultório quase todas as semanas.');

h3('Por que não se resolveu até agora');
txt('Você já passou por **(resposta da pergunta 5)**, e mesmo assim continua no mesmo ponto. Faz sentido, e o motivo é específico do seu caso.');
txt('_Em seguida entra o texto do perfil, que está na parte C.1._');

h3('Dois caminhos daqui para a frente');
txt('_As duas colunas vêm do perfil, e estão na parte C.1._');

h3('Primeiro botão');
txt('_O texto do botão muda conforme o momento da pessoa. As três versões estão no fim deste bloco._');

h3('Como funciona o método da HODIE');
txt('O tratamento é conduzido pela Dra. Lailla em três fases, na ordem:');
p('**Investigar.** Consulta aprofundada sobre a sua história de peso, comportamento alimentar, sono e rotina, mais exames dirigidos. No retorno, os exames são explicados um a um e você recebe o seu laudo individual, o Mapa da Causa.'); p();
p('**Tratar.** Plano individualizado: regulação da fome com a classe de medicações quando indicada, plano alimentar e cuidado com a preservação de massa muscular, com retornos frequentes para ajuste de conduta.'); p();
p('**Sustentar.** A fase que o mercado geralmente não oferece. Reavaliações periódicas e monitoramento da composição corporal, pensados para o período em que o corpo tende a puxar o peso de volta.'); p();
txt('A medicação, quando entra, é ferramenta dentro da estrutura, com uso criterioso e supervisionado. Ela nunca é o tratamento inteiro.');
txt('_Uma das três fases aparece destacada, conforme o perfil. Qual é, está na parte C.1._');

h3('O que precisa acontecer agora');
txt('_Começa pelo texto do perfil, que está na parte C.1. Depois segue igual para todas:_');
txt('O formato é sempre o mesmo: a **consulta de investigação**, onde a sua história é ouvida por inteiro e os exames certos para o seu caso são definidos. No retorno você sai com a causa nomeada e o caminho recomendado.');
txt('O que você respondeu que mais quer, **(resposta da pergunta 6)**, começa por aí: por uma resposta. Não por mais uma tentativa.');

h3('Segundo botão');
txt('_O mesmo botão do primeiro, repetido aqui._');

h3('Casos do consultório');
txt('Relatos clínicos reais, anonimizados, contados pela médica. Cada caso é um caso: resultado de tratamento é individual e depende da causa encontrada e da adesão.');
txt('Uma paciente chegou depois de anos de dietas e da certeza de que o problema era falta de vontade. A investigação mostrou onde o metabolismo dela travava. Com o tratamento conduzido, incluindo um mês de pausa no meio do caminho, ela perdeu 18 quilos ao longo de quatro meses de acompanhamento, com tudo documentado em prontuário.');
txt('Outra paciente, de 39 anos, está com o tratamento em curso. Até aqui, 11,3 quilos em cerca de três meses e meio. O que ela mais comenta nos retornos não é o número: é ter parado de pensar em comida o dia inteiro.');
txt('Além do peso, o que acompanhamos de perto são os indicadores de saúde nos exames, como resistência à insulina e glicemia. É ali que o tratamento aparece primeiro.');

h3('Quem conduz o seu tratamento');
p('**Dra. Lailla de Oliveira**'); p();
txt('Médica · CRM-SP 239430');
txt('A Dra. Lailla atende mulheres com dificuldade crônica de emagrecimento: aquelas que já tentaram muitas vezes e não conseguiram manter o resultado. A convicção que organiza todo o consultório é simples e ela repete em toda consulta: a maioria dessas mulheres não falhou por falta de disciplina, e sim por uma desregulação do metabolismo da fome que nunca foi investigada nem tratada. É por isso que aqui o tratamento começa por escuta e investigação, nunca por prescrição.');
p('- **3 fases** Método próprio: investigar, tratar e sustentar');
p('- **Mapa da Causa** Laudo individual entregue na consulta de retorno');
p('- **Só mulheres** Atende apenas mulheres com dificuldade crônica de emagrecimento');
p('- **Brasil todo** Presencial em Jundiaí-SP ou on-line');
p();
txt('O que sustenta o cuidado');
p('- **Escuta** · consulta de investigação aprofundada');
p('- **Evidência** · conduta baseada em literatura atual');
p('- **Sigilo** · discrição é dever médico');
p();

h3('O convite do fim');
txt('**O próximo passo, primeiro nome da pessoa**');
txt('A saúde começa hoje. E começar, aqui, é simples.');
txt('O texto que vem depois muda conforme o momento da pessoa, e são três versões. Ninguém recebe porta na cara.');
h4('Para quem busca o tratamento conduzido');
txt('_Botão:_ Quero agendar a minha consulta de investigação');
txt('Atendimento individual e confidencial, presencial em Jundiaí ou on-line. A agenda da Dra. Lailla é limitada por semana.');
txt('Na consulta de investigação a Dra. Lailla escuta a sua história inteira e define quais exames pedir para o seu caso. No retorno, você recebe o seu Mapa da Causa.');
h4('Para quem ainda está se informando');
txt('_Botão:_ Quero entender melhor como funciona');
txt('Sem compromisso e no seu tempo. A equipe explica como é a consulta de investigação e o que ela envolve.');
txt('Não existe momento perfeito, existe informação suficiente para decidir. Quando quiser dar o passo, a porta está aberta.');
h4('Para quem não busca tratamento agora');
txt('_Botão:_ Falar com a equipe no WhatsApp');
txt('A equipe responde as suas dúvidas e te indica por onde começar, sem compromisso.');
txt('Mesmo que a consulta não seja para agora, entender o que move a sua fome já muda a forma como você escolhe o próximo passo. A equipe pode te orientar sobre o que investigar primeiro.');

h3('Rodapé da página do relatório');
txt('HODIE · Dra. Lailla de Oliveira · CRM-SP 239430 · Jundiaí-SP e atendimento on-line. Esta leitura é educativa, baseada apenas nas suas respostas, e não substitui consulta, diagnóstico ou prescrição médica. Resultados de tratamento são individuais.');

p('---'); p();
h2('Tela para quem chega sem responder');
txt('_Chapéu:_ Sua leitura');
txt('**Ainda não temos as suas respostas**');
txt('Parece que você chegou aqui sem responder. Leva cerca de 2 minutos.');
txt('_Botão:_ Responder agora');

fs.writeFileSync('./hodie.md', L.join('\n'));
console.log('gerado. anuncios encontrados:', ads.length, '| palavras:', L.join(' ').split(/\s+/).length);
