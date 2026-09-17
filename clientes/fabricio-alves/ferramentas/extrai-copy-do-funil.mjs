import fs from 'fs';
const RAIZ = '/home/user/simpleacc/clientes/fabricio-alves';
const FUNIL = RAIZ + '/funis/prova-de-carga';

// carrega a copy do funil, os mesmos arquivos que estao no ar
globalThis.window = {};
await import(FUNIL + '/flow.js');
const F = globalThis.window.FLOW;

const L = [];
const p = (s='') => L.push(s);
const h1 = s => { p('# ' + s); p(); };
const h2 = s => { p('## ' + s); p(); };
const h3 = s => { p('### ' + s); p(); };
const h4 = s => { p('#### ' + s); p(); };
const txt = s => { p(s); p(); };

/* ---------------------------------------------------- extrator dos anuncios */
function secoes(arquivo, nivel, de, ate) {
  const linhas = fs.readFileSync(arquivo, 'utf8').split('\n');
  const marca = '#'.repeat(nivel) + ' ';
  const out = [];
  let atual = null;
  for (const l of linhas) {
    if (l.startsWith('# ') || l.startsWith('## ')) {
      if (l.startsWith(marca)) {
        atual = { titulo: l.slice(marca.length).trim(), corpo: [] };
        out.push(atual);
      } else { atual = null; }
      continue;
    }
    if (atual) atual.corpo.push(l);
  }
  return out
    .filter(s => (!de || out.indexOf(s) >= 0))
    .map(s => ({
      titulo: s.titulo,
      // tira nota interna da casa (citação) e ponteiro de arquivo
      corpo: s.corpo
        .filter(l => !l.trim().startsWith('>'))
        .join('\n').replace(/\n?---\n?/g, '\n').replace(/\n{3,}/g, '\n\n').trim(),
    }));
}

/* ------------------------------------------------------------------ cabeca */
h1('Copy completa do funil Prova de Carga');
txt('**Fabrício Alves · Arquiteto de Ofertas**');
txt('Documento de leitura. Reúne, em texto corrido, toda a copy que está no ar no funil Prova de Carga: os anúncios, a medição de dez perguntas e os relatórios que o funil entrega.');
txt('Funil no ar: https://prova-de-carga.vercel.app');
txt('Extraído dos arquivos do funil em 17/09/2026. **Nada foi reescrito para este documento.** O texto abaixo é exatamente o que a página mostra. Se algo for alterado aqui, o documento e a página passam a divergir, então use os comentários para apontar o que quer mudar, em vez de editar o texto.');
p('---'); p();

/* ------------------------------------------------------------- BLOCO A ADS */
h1('Bloco A · Anúncios');
txt('Seis peças estáticas e três roteiros de vídeo. Cada peça usa um gancho diferente e nenhuma repete a prova da outra. Todas levam para a raiz do funil.');

h2('Peças estáticas');
const estaticas = secoes(RAIZ + '/copy/2026-09-16-anuncios-prova-de-carga-estrato-7.md', 2)
  .filter(s => /^\d\./.test(s.titulo));
estaticas.forEach(s => {
  h3('Anúncio ' + s.titulo.replace(/^(\d)\.\s*/, '$1 · '));
  txt(s.corpo);
});

h2('Roteiros de vídeo');
const roteiros = secoes(RAIZ + '/roteiros/2026-09-16-roteiros-prova-de-carga-estrato-7.md', 2)
  .filter(s => /^Roteiro/.test(s.titulo));
roteiros.forEach(s => {
  h3(s.titulo);
  txt(s.corpo);
});

p('---'); p();

/* ------------------------------------------------------------ BLOCO B QUIZ */
h1('Bloco B · A medição');
txt('A medição tem dez perguntas, três telas de implicação intercaladas, uma tela de carregamento e a tela de captura. A ordem sobe de dificuldade: primeiro o que a pessoa responde de cabeça, os números só depois.');

h2('Tela de abertura');
h3('Chapéu');
txt(F.hero.eyebrow);
h3('Título');
txt(F.hero.titulo);
h3('Subtítulo');
txt(F.hero.subtitulo);

const nomesImp = { leilao: 'Tela de implicação 1', terco: 'Tela de implicação 2', ajustes: 'Tela de implicação 3' };
let np = 0;
for (const s of F.steps) {
  if (s.implicacao) {
    const bloco = F.implicacoes[s.implicacao];
    h2(nomesImp[s.implicacao] + ' (depois da pergunta ' + np + ')');
    h3('Chapéu');
    txt(bloco.eyebrow);
    if (bloco.linhas) {
      h3('Texto');
      bloco.linhas.forEach(l => txt(l));
      h3('Remate');
      txt(bloco.remate);
    } else {
      txt('Esta tela muda conforme o último ajuste que a pessoa marcou na pergunta 2. São quatro versões.');
      const rot = {
        geral: 'Versão padrão (quando o ajuste foi subir ou baixar a verba e esperar)',
        desejo: 'Versão para quem trocou criativo, copy ou público',
        oferta: 'Versão para quem mexeu em preço, bônus, garantia ou parcelamento',
        caminho: 'Versão para quem mexeu na página, no formulário, na agenda ou no comercial',
      };
      for (const k of ['geral', 'desejo', 'oferta', 'caminho']) {
        if (!bloco[k]) continue;
        h3(rot[k]);
        bloco[k].linhas.forEach(l => txt(l));
        h4('Remate');
        txt(bloco[k].remate);
      }
    }
    continue;
  }
  np++;
  h2('Pergunta ' + np);
  txt(s.pergunta);
  h3('Alternativas');
  s.opcoes.forEach(o => p('- ' + o.label));
  p();
}

h2('Tela de carregamento');
txt('As três frases aparecem em sequência enquanto a leitura é montada.');
F.loading.mensagens.forEach(m => p('- ' + m));
p();

h2('Tela de captura');
h3('Chapéu');
txt(F.captura.eyebrow);
h3('Título');
txt(F.captura.titulo);
h3('Subtítulo');
txt(F.captura.subtitulo);
h3('Campos');
p('- Nome'); p('- WhatsApp'); p('- E-mail'); p();
h3('Consentimento');
txt(F.captura.consentimento);
h3('Botão');
txt(F.captura.botao);

p('---'); p();

/* -------------------------------------------------------- BLOCO C LAUDOS */
h1('Bloco C · Os relatórios');
txt('A medição entrega **um relatório por eixo**: Desejo, Oferta ou Caminho. O eixo é o diagnóstico, e é ele que define os trechos segmentados do relatório. Os três estão escritos abaixo, na íntegra e um por um.');
txt('O resto do relatório é o mesmo para os três, e está escrito uma vez só, logo depois, na ordem em que aparece na tela. Dentro dele, três passagens mudam sem mudar o diagnóstico:');
p('- **O Índice de Sustentação**, que diz quão intensa é a leitura. Três versões.');
p('- **O dialeto**, que muda o vocabulário conforme o que a pessoa vende. Duas versões.');
p('- **O fechamento**, que muda conforme a fase da operação. Duas versões.');
p();
txt('Há ainda um quarto resultado possível, a Página 0, para quem responde que a operação ainda não recebeu carga. Ela não é um relatório e está no fim deste bloco.');

h2('C.1 · A parte que muda conforme o eixo');
const rotFase = { desejo: 'Desejo, mensagem e acordo', oferta: 'Lastro', caminho: 'Caminho e implantação comandada' };
let ne = 0;
for (const [id, E] of Object.entries(F.eixos)) {
  ne++;
  h3('Eixo ' + ne + ' · ' + E.nome);
  h4('Veredito, no topo do relatório');
  txt('**' + E.nome + '**');
  txt(E.selo);
  h4('Título do bloco "antes de tudo"');
  txt(E.chamada);
  h4('Fecho do bloco "antes de tudo"');
  txt(E.papel);
  h4('No bloco "por que isso não se resolveu até agora"');
  txt(E.causa);
  h4('Sintomas listados nesse mesmo bloco');
  E.sintomas.forEach(x => p('- ' + x));
  p();
  h4('Parágrafo do segundo eixo, que só aparece quando ele fica a um ponto de distância');
  txt('Conforme qual eixo ficar em segundo, é uma destas duas versões.');
  Object.values(F.eixos).filter(x => x.nome !== E.nome).forEach(o => {
    txt('**Segundo eixo em observação: ' + o.nome + '.** A diferença entre os dois é de um ponto só, o que quase nunca significa dois problemas. Significa que o eixo ' + o.nome + ' está absorvendo parte da pressão que nasce no eixo ' + E.nome + '. A ordem de conserto continua sendo a de cima para baixo: causa antes de sintoma.');
  });
  h4(E.naoAdianta.titulo);
  txt(E.naoAdianta.texto);
  h4('No bloco do método');
  txt('A fase em destaque neste eixo é **' + rotFase[id] + '**, marcada na tela como "o seu ponto de partida".');
  txt(E.faseTexto);
}

p('---'); p();
h2('C.2 · O relatório, na ordem em que aparece na tela');

h3('Abertura');
txt('Primeiro nome da pessoa, esta leitura foi montada com as suas respostas.');
txt('_Quando o nome não é informado, a frase abre em "Esta leitura foi montada com as suas respostas."_');

h3('Veredito');
txt('_Chapéu:_ O eixo que cede primeiro');
txt('_Em seguida vem o nome do eixo e o selo, que estão na parte C.1. Depois o Índice de Sustentação, numa das três versões:_');
for (const S of Object.values(F.sustentacao)) { p('**' + S.nome + '**'); p(); txt(S.leitura); }

h3('Bloco 1 · Antes de tudo');
txt('_Começa pelo título do eixo, que está na parte C.1. Depois:_');
txt('Antes de qualquer coisa: o que esta medição encontrou não é falta de capacidade nem falta de esforço. Você fez o que se faz. Testou, trocou, investiu, montou time. O que a medição encontrou é uma camada abaixo disso, e ela não responde a esforço, responde a estrutura.');
txt('_E fecha com o parágrafo do eixo, que está na parte C.1._');

h3('Bloco 2 · O que você me contou');
txt('_Chapéu:_ O seu cenário, nas suas respostas');
txt('Este parágrafo é montado com as respostas da própria pessoa, uma frase por pergunta, em texto corrido. As frases seguem este molde:');
p('- Você vende (resposta da pergunta 1).');
p('- Nos últimos seis a doze meses, o custo por venda (resposta da pergunta 8). Quando a resposta é "não subiu, ou não sei", a frase vira: Quanto o custo por venda subiu nos últimos meses, você ainda não sabe dizer.');
p('- A oferta principal faz (resposta da pergunta 6), a um custo de mídia (resposta da pergunta 7). Quando não mede o custo: e o custo de cada uma ainda não é medido. Quando não faz tráfego pago: sem mídia paga rodando hoje.');
p('- O último movimento para segurar esse custo foi (resposta da pergunta 2).');
p('- Sobre quem disputa o mesmo clique: (resposta da pergunta 3).');
p('- No fechamento, quem chega interessado costuma (resposta da pergunta 4).');
p('- Quem se perde, se perde (resposta da pergunta 5).');
p('- Na execução: (resposta da pergunta 10).');
p();
h4('Fecho do bloco, uma das duas versões conforme o que a pessoa vende');
txt('**Para quem vende curso ou programa com esteira:** ' + F.dialetos.operador.exemplo);
txt('**Para quem vende serviço premium, clínica ou agenda:** ' + F.dialetos.expert.exemplo);

h3('Bloco 3 · Por que isso não se resolveu até agora');
txt('_Chapéu:_ A causa, com nome');
txt('_Começa pelo texto do eixo, que está na parte C.1. Depois:_');
txt('O nome disso é **erosão estrutural**: o mercado copia a oferta até ela perder distinção e deixar de sustentar a decisão sozinha. Não é um defeito do que você construiu. É o que acontece com toda estrutura que ficou boa o bastante para ser copiada, e nenhuma operação escapa disso por esforço. Escapa por recomposição.');
txt('_Em seguida, quando é o caso, o parágrafo do segundo eixo, e por fim a lista de sintomas. Os dois estão na parte C.1._');

h3('Bloco 4 · O que a estrutura em erosão já custa');
txt('_Chapéu:_ A sua conta, com os seus números');
txt('O número em destaque é calculado com as faixas que a pessoa marcou nas perguntas 6, 7 e 8. Sai como faixa (de um valor a outro) ou, quando as três faixas marcadas são abertas para cima, como número único.');
txt('**(valor) por mês, pelo mesmo resultado**');
txt('Com o volume e a alta que você marcou, é o que a sua operação já paga a mais hoje, todo mês, para vender o mesmo que vendia.');
txt('_Só quando sai como número único, acrescenta-se:_ As três faixas que você marcou são abertas para cima, então esta conta usa o piso de cada uma: o número real é maior, nunca menor.');
txt('Faixa, não número mágico, e você pode refazer com os valores exatos: (custo por venda atual menos custo por venda anterior) vezes vendas do mês. A conservadora usa o piso das faixas que você marcou; a realista usa o ponto médio. O Exame usa o seu extrato.');
h4('Versão para quem respondeu que não mede o custo por venda');
txt('A medição não é executável com os dados que você informou.');
txt('Isso também é um resultado. Uma operação que não mede o custo por venda está subindo verba no escuro, e a primeira coisa que a estrutura devolve quando é medida é a possibilidade de conferir a própria conta.');
txt('A fórmula serve para você fazer a conta esta semana: (custo por venda atual menos custo por venda anterior) vezes vendas do mês. O eixo abaixo continua valendo, e o Exame refaz a conta com o seu extrato.');

h3('Bloco 5 · A mesma operação sob três cargas');
txt('_Chapéu:_ A pergunta-controle, respondida');
h4('Hoje');
txt('**Para quem vende curso ou programa com esteira:** A estrutura sustenta parte da decisão, e o resto é compensado por ' + F.dialetos.operador.verba + ', por desconto ou pela sua presença na conversa.');
txt('**Para quem vende serviço premium, clínica ou agenda:** A estrutura sustenta parte da decisão, e o resto é compensado por ' + F.dialetos.expert.verba + ', por desconto ou pela sua presença na conversa.');
h4('Com o dobro');
txt('**Para quem vende curso ou programa com esteira:** A mesma estrutura recebendo o dobro de carga. Entra mais ' + F.dialetos.operador.publico + ', e ' + F.dialetos.operador.publico + ' decide pela estrutura, não pela sua autoridade. O que hoje é compensado passa a ser compensado em dobro, e a faixa acima acompanha na mesma proporção.');
txt('**Para quem vende serviço premium, clínica ou agenda:** A mesma estrutura recebendo o dobro de carga. Entra mais ' + F.dialetos.expert.publico + ', e ' + F.dialetos.expert.publico + ' decide pela estrutura, não pela sua autoridade. O que hoje é compensado passa a ser compensado em dobro, e a faixa acima acompanha na mesma proporção.');
h4('Recomposta');
txt('O eixo que cede volta a sustentar a decisão sozinho. A verba deixa de ser aposta e passa a ser decisão, porque o número que cada venda custa passa a ser o número que a estrutura foi desenhada para custar.');
txt('_Nota ao pé:_ Nenhuma dessas linhas é uma promessa de faturamento. São três estados da mesma estrutura sob cargas diferentes.');

h3('Bloco 6 · O que não adianta mexer');
txt('_O texto é o do eixo, e está na parte C.1._');

h3('Primeiro botão');
txt('**Para quem tem fase e equipe:** ' + F.rotas.aplicacao.botao);
txt(F.rotas.aplicacao.micro);
txt('**Para quem ainda não tem:** ' + F.rotas.diagnostico.botao);
txt(F.rotas.diagnostico.micro);
txt('_Enquanto o canal de atendimento não estiver configurado, o segundo botão mostra este aviso:_ O canal de atendimento ainda está em configuração. Se você chegou até aqui, me chame no perfil e diga que fez a medição: eu respondo pessoalmente.');

h3('Bloco 7 · ' + F.metodo.titulo);
txt('_Chapéu:_ ' + F.metodo.eyebrow);
txt(F.metodo.texto);
h4('As três fases');
[['Desejo, mensagem e acordo', 'Análise de concorrência promessa por promessa, mensagem recomposta e oferta canônica.'],
 ['Lastro', 'Arquitetura de preço e risco, e o inventário do que já é crível hoje e do que falta construir.'],
 ['Caminho e implantação comandada', 'As peças do anúncio ao pagamento escritas, implantadas pela sua equipe e testadas de ponta a ponta.']]
  .forEach(([nome, corpo]) => { p('**' + nome + '**'); p(); txt(corpo); });
txt('_Uma das três aparece destacada, conforme o eixo, seguida do parágrafo do eixo. Os dois estão na parte C.1._');
txt(F.metodo.remate);

h3('Bloco 8 · Medir com o extrato, não com faixas');
txt('_Chapéu:_ O que precisa acontecer agora');
h4('Versão para quem tem fase e equipe');
txt('O próximo passo não é uma call de vendas. É uma aplicação escrita, que eu leio e respondo em 24 horas. Se o caso tiver sinal de falha relevante neste eixo e a sua operação tiver quem execute, o passo seguinte é o Exame: a mesma medição, feita com o seu extrato em vez das faixas que você marcou.');
h4('Versão para quem ainda não tem');
txt('O próximo passo é o Exame Estrutural: a mesma medição, feita com os seus números reais em vez das faixas que você marcou. Ele termina em um de três vereditos, e um deles é «não é caso estrutural agora». Nesse cenário a conversa encerra ali, você fica com a medição e não paga mais nada.');
h4('Nas duas versões');
txt('O raio-x grátis termina em pitch. Este exame pode terminar em «não é caso». É a diferença entre um instrumento e uma isca, e é por isso que o exame é pago: ele vale por si, e o valor é integralmente creditado se você seguir para a intervenção.');

h3('Segundo botão');
txt('_O mesmo botão do primeiro, repetido aqui._');

h3('Bloco 9 · Dois números, com nome');
txt('_Chapéu:_ Quem já passou pelo instrumento');
F.casos.forEach(c => {
  p('**' + c.numero + ' ' + c.janela + '**'); p();
  p('**' + c.nome + ' · ' + c.marca + '**'); p();
  txt(c.texto);
});
txt('_Nota ao pé:_ ' + F.casosNota);

h3('Bloco 10 · Quem assina a medição');
p('**' + F.autoridade.nome + '**'); p();
txt(F.autoridade.cargo);
txt(F.autoridade.origem);
F.autoridade.credenciais.forEach(c => p('- **' + c.num + '** ' + c.ctx));
p();

h3('Bloco 11 · Fechamento');
h4('Versão para quem tem fase e equipe');
txt('**A sua operação tem carga e tem quem execute.**');
txt('É o perfil que o Comando atende: decisão que ainda mora no dono, tráfego rodando e uma equipe que implanta. A aplicação é escrita e leva dez minutos. Eu leio e respondo em 24 horas, e a resposta é uma mensagem, não uma reunião.');
h4('Versão para quem ainda não tem');
txt('**A sua operação tem carga. O que falta é a medição com os seus números.**');
txt('O Exame mede os três eixos com o seu extrato, nomeia o gargalo dominante, converte o vazamento em reais e entrega a ordem de conserto. Se não entregar os três, não é cobrado.');
txt('_Seguido do terceiro e último botão, o mesmo das duas vezes anteriores._');

h3('Rodapé da página');
txt('Esta leitura foi montada com as respostas que você deu, e vale para a sua operação. Os seus números não são publicados nem comparados.');

p('---'); p();
h2('C.3 · Página 0, para quem ainda não recebeu carga');
txt('Não é um relatório. É a página que aparece quando a pessoa responde que a operação ainda não vende pela internet ou ainda não chegou à faixa de faturamento em que a medição faz sentido. Não tem oferta, não tem preço e não tem lista de espera disfarçada.');
// A Página 0 é HTML estático. Quebra por bloco, não por linha, e trata à parte:
// o cabeçalho e o rodapé da marca, que não são copy da página, e o aviso do
// botão, que fica oculto por CSS até o clique e só existe enquanto o perfil não
// estiver configurado.
const html = fs.readFileSync(FUNIL + '/fora-de-fase.html', 'utf8');
const main = html.slice(html.indexOf('<main'), html.indexOf('</main>'));
const limpaBloco = b => b.replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
const avisoIg = (main.match(/<div class="aviso" id="aviso-ig">([\s\S]*?)<\/div>/) || [])[1];
main
  .replace(/<div class="aviso" id="aviso-ig">[\s\S]*?<\/div>/, '')
  .replace(/<h([123])([^>]*)>/g, '\u0001')          // marca início de título
  .replace(/<\/(p|li|h1|h2|h3|div)>/g, '\u0000')
  .split('\u0000')
  .map(b => {
    const titulo = b.includes('\u0001');
    const t = limpaBloco(b.replace(/\u0001/g, ''));
    return t && titulo ? '**' + t + '**' : t;
  })
  .filter(Boolean)
  .filter(b => {
    // cabeçalho e rodapé da marca não são copy da página
    const so = b.toLowerCase().replace(/[·|]/g, ' ').replace(/\s+/g, ' ').trim();
    const marca = (F.marca.nome + ' ' + F.marca.assinatura).toLowerCase();
    return so !== marca && so !== F.marca.nome.toLowerCase();
  })
  .forEach(b => {
    // o botão e a sua linha de apoio vêm no mesmo bloco; separa para leitura
    if (b.startsWith('Acompanhar o conteúdo')) {
      h3('Botão');
      txt('Acompanhar o conteúdo');
      txt(b.slice('Acompanhar o conteúdo'.length).trim());
      return;
    }
    txt(b);
  });
if (avisoIg) {
  h3('Aviso do botão, enquanto o perfil não estiver configurado');
  txt(limpaBloco(avisoIg));
}

p('---'); p();
h2('Uma observação sobre o que não está aqui');
txt('Este documento cobre os três blocos pedidos: anúncios, medição e relatórios. A página de aplicação ao Comando, que é para onde o relatório manda quem tem fase e equipe, tem copy própria e ficou de fora. Se quiser lê-la também, é só pedir e ela entra como um bloco D.');

fs.writeFileSync('./fabricio.md', L.join('\n'));
console.log('gerado. linhas:', L.length, '| palavras:', L.join(' ').split(/\s+/).length);
