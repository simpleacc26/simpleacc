/* ============================================================
   DIAGNÓSTICO — conteúdo das 11 "páginas" que a Vitória escreveu no
   doc "QUIZ" (aba QUIZ GENÉRICO, seção dIAGNÓSTICO, atualização de
   25/09/2026). Texto dela, sem reescrita. Única correção: o item 02 da
   página 3 veio cortado no doc ("quem compra um serviço de R200.") e foi
   completado (ver README).
   No "Baixar PDF", cada seção vira uma página.
   ============================================================ */
const STORE_KEY = "magna_quiz_diagnostico";
const F = window.FLOW;
const report = document.getElementById("report");

function getState() { try { return JSON.parse(sessionStorage.getItem(STORE_KEY)) || {}; } catch (e) { return {}; } }
const a = getState().answers || {};

const ICON = {
  cadeado: '<rect x="5" y="10.5" width="14" height="10" rx="2.2"/><path d="M8.5 10.5V7.8a3.5 3.5 0 0 1 6.8-1.2"/><circle cx="12" cy="15.5" r="1.3"/>',
  check: '<path d="M6 12.5l4 4 8-9"/>',
  x: '<path d="M7.5 7.5l9 9M16.5 7.5l-9 9"/>',
  relogio: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
  chat: '<path d="M20.5 11.6a8.4 8.4 0 0 1-12.4 7.4L3.5 20.5l1.5-4.4a8.4 8.4 0 1 1 15.5-4.5z"/>',
};
function icon(name) {
  return `<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICON[name]}</svg>`;
}
const lista = (itens, ic = "check") => `<ul class="dg-list dg-${ic}">${itens.map(t => `<li>${icon(ic)}<span>${t}</span></li>`).join("")}</ul>`;
const itemNum = (n, titulo, texto) => `<div class="dg-item"><span class="dg-n">${n}</span><div><h3>${titulo}</h3><p>${texto}</p></div></div>`;

const PAGINAS = [
  /* PÁGINA 1 · CAPA */
  `<section class="dg-page dg-capa">
    <span class="selo dg-selo">${icon("cadeado")}DIAGNÓSTICO ESTRATÉGICO LIBERADO</span>
    <h1>O QUE ESTÁ TRAVANDO A CHEGADA DE CLIENTES DE ALTO PODER AQUISITIVO E A PREVISIBILIDADE DE VENDAS NO SEU NEGÓCIO</h1>
    <p class="lead">Você vai entender por que o seu melhor cliente ainda chega quase sempre por indicação. Vai ver onde o seu tempo e o seu dinheiro estão vazando. E vai saber qual é o próximo movimento certo pro seu momento.</p>
    <p class="dg-tempo">${icon("relogio")}TEMPO DE LEITURA: 5 MINUTOS</p>
  </section>`,

  /* PÁGINA 2 · CARTA */
  `<section class="dg-page dg-carta">
    <p class="dg-ola">Olá, aqui é a Vitória Daniela.</p>
    <p>Se você chegou até aqui, provavelmente conhece essa cena.</p>
    <p>O cliente que mais valoriza o seu trabalho chegou por indicação. É aquele que fecha sem pechinchar e ainda te indica pra outras pessoas.</p>
    <p>O que chega pelo digital é outra história. Pede preço no direct. Some depois do orçamento. Marca avaliação e não fecha.</p>
    <p>Isso não é coincidência. E não é falta de esforço seu.</p>
    <p>Indicação funciona porque alguém emprestou a confiança dele pra você. O cliente já chega sabendo que você é bom antes mesmo de te conhecer.</p>
    <p>O digital não empresta confiança pra ninguém. Ela precisa ser construída, com intenção, com ordem e com um caminho que leve a pessoa certa até a decisão.</p>
    <p>Quando isso não existe, você fica refém de duas coisas: do boca a boca e da sorte.</p>
    <p>E o faturamento vira montanha-russa. Um mês cheio. No outro, você fica pensando de onde vai vir o próximo cliente.</p>
    <p>Nas próximas páginas eu vou te mostrar onde isso está travando no seu negócio. Sem fórmula pronta e sem hack de algoritmo.</p>
    <p class="dg-assina"><strong>Vitória Daniela | Grupo Magna</strong><span>Estrategista de Vendas para Negócios de Alto Ticket</span></p>
  </section>`,

  /* PÁGINA 3 · O QUE ESTÁ TRAVANDO VOCÊ */
  `<section class="dg-page">
    <p class="eyebrow">O que está travando você</p>
    <h2>OS 3 VAZAMENTOS QUE NINGUÉM TE MOSTROU</h2>
    <p>Negócio de alto ticket raramente perde dinheiro por falta de trabalho. Perde por vazamento.</p>
    <p>E vazamento não aparece no fim do mês como erro. Aparece como "mês fraco".</p>
    ${itemNum("01", "Você atrai gente, mas não a gente certa", "Conteúdo, tráfego e perfil bonito trazem movimento. Mas movimento não é cliente. Quando a comunicação não foi pensada pra quem paga alto ticket, ela atrai curioso, caçador de preço e quem só queria saber quanto é.")}
    ${itemNum("02", "Você não sabe qual caminho seguir", "Existem umas 100 formas de vender, e cada pessoa te diz que a dela é a certa. Só que quem compra um serviço de R$10.000 não decide do mesmo jeito que quem compra um de R$200. Sem um caminho desenhado pro seu público e pro seu ticket, cada semana vira uma tentativa nova.")}
    ${itemNum("03", "Você gasta energia no que não volta", "Mais um freelancer. Mais uma agência. Mais uma estratégia que deu certo pra alguém. Cada ação isolada consome tempo, dinheiro e equipe. E como nada conversa com nada, você nunca sabe o que funcionou e o que foi desperdício.")}
    <blockquote class="dg-quote">Fazer mais do que não funciona é como passar batom em quem está sangrando.</blockquote>
  </section>`,

  /* PÁGINA 4 · COMO ISSO SE RESOLVE */
  `<section class="dg-page">
    <p class="eyebrow">Como isso se resolve</p>
    <h2>OS 3 PILARES DA PREVISIBILIDADE</h2>
    <p>O mercado vende a ideia de que existe uma ação que resolve tudo: mais vídeo, mais tráfego, um script novo.</p>
    <p>Não existe. Uma ação isolada não constrói empresa. O que constrói é um sistema onde atração, venda e equipe trabalham na mesma direção.</p>
    ${itemNum("01", "Inteligência de Atração High Ticket", "Redesenhamos o seu posicionamento e a sua comunicação pra falar com quem tem poder aquisitivo pra pagar pelo seu serviço. É aqui que o curioso para de chegar e o cliente certo começa a te encontrar.")}
    ${itemNum("02", "Modelagem do Caminho Comercial", "Desenhamos a jornada do seu cliente até o fechamento, respeitando como quem compra alto ticket decide: pontos de contato, conversa e follow-up. Pra avaliação virar contrato, e não \"vou pensar\".")}
    ${itemNum("03", "Direcionamento e Processos Internos", "Organizamos fluxos e metas e treinamos quem trabalha com você pra conduzir o cliente até a venda. Sem depender de você em cada etapa e sem improviso.")}
    <blockquote class="dg-quote">Quando as três áreas conversam, o seu faturamento deixa de depender de sorte e passa a depender de processo.</blockquote>
  </section>`,

  /* PÁGINA 5 · POR ONDE COMEÇAR */
  `<section class="dg-page">
    <p class="eyebrow">Por onde começar</p>
    <h2>A ORDEM IMPORTA MAIS DO QUE A TÁTICA</h2>
    <p>A mesma ação que faz um negócio crescer pode travar outro. Tudo depende do momento.</p>
    <p>Por isso o primeiro passo nunca é fazer mais. É entender onde você está.</p>
    ${itemNum("01", "Encontrar o vazamento mais urgente", "Onde você está perdendo mais hoje: na atração, na conversão ou na operação?")}
    ${itemNum("02", "Cortar o que não serve pro seu momento", "Se você bate cabeça e o resultado não vem, provavelmente está fazendo algo que funcionou pra outra pessoa, com outro público e outro ticket.")}
    ${itemNum("03", "Estruturar o que já existe", "Você não precisa começar do zero. Precisa organizar o que já tem pra funcionar como sistema.")}
    <blockquote class="dg-quote">O próximo passo não é criar mais tarefa. É saber exatamente o que fazer, e em qual ordem.</blockquote>
  </section>`,

  /* PÁGINA 6 · RECAPITULANDO */
  `<section class="dg-page">
    <p class="eyebrow">Recapitulando</p>
    <h2>O QUE VOCÊ DESCOBRIU AQUI</h2>
    ${lista([
      "O cliente de alto valor não chega por acaso. Ele chega quando a comunicação foi feita pra ele.",
      "Indicação é ótima. Depender só dela é um risco.",
      "Ação isolada gasta energia e não constrói previsibilidade.",
      "Sem um caminho comercial desenhado, até o cliente certo escapa entre a avaliação e o fechamento.",
      "O plano certo depende do seu segmento, do seu ticket e do seu momento. Não do que funcionou pra outra pessoa.",
    ])}
    <blockquote class="dg-quote">Cada mês sem processo não é um mês neutro. É cliente de alto ticket fechando com quem comunicou melhor do que você.</blockquote>
  </section>`,

  /* PÁGINA 7 · O PRÓXIMO PASSO */
  `<section class="dg-page">
    <p class="eyebrow">O próximo passo</p>
    <h2>A SUA ANÁLISE ESTRATÉGICA</h2>
    <p>Este diagnóstico mostrou os padrões. Mas o plano pro seu negócio precisa ser individual. O caminho de quem vende um contrato de consultoria não é o mesmo de quem vende um projeto de arquitetura.</p>
    <p>Na análise estratégica, nós vamos:</p>
    ${lista([
      "<strong>Diagnosticar o seu cenário atual.</strong> Olhamos seus dados, sua equipe e sua estrutura comercial pra identificar onde você está perdendo dinheiro e clientes qualificados.",
      "<strong>Desenhar o seu ecossistema de vendas.</strong> É o caminho específico pro seu público, seu ticket e sua margem.",
      "<strong>Entregar um plano claro.</strong> Você sai sabendo o que fazer, em qual ordem, e o impacto disso no seu faturamento nos próximos meses.",
    ])}
    <p class="dg-nota">Trabalhamos com poucos clientes por vez. Por isso a agenda de análises é limitada.</p>
  </section>`,

  /* PÁGINA 8 · QUEM VAI TE CONDUZIR */
  `<section class="dg-page dg-sobre">
    <p class="eyebrow">Quem vai te conduzir</p>
    <h2>SOBRE A VITÓRIA DANIELA</h2>
    <img class="dg-foto" src="assets/vitoria-daniela.jpg" width="1349" height="2048" alt="Vitória Daniela, fundadora do Grupo Magna" decoding="async">
    <p>Há mais de 8 anos nos bastidores de marketing e vendas, com mais de 300 projetos liderados no Brasil e nos EUA.</p>
    <p>Só no ano passado, a Magna vendeu mais de R$1 milhão. Pros nossos clientes, foram mais de R$10 milhões.</p>
    <p>O que eu vi em todos esses projetos é simples. Quem trata o próprio serviço como empresa cresce. Quem trata como perfil de Instagram oscila.</p>
    <p>Meu papel é ser a cabeça estratégica que conecta atração, vendas e equipe. Assim você volta a focar no que estudou anos pra fazer.</p>
  </section>`,

  /* PÁGINA 9 · PROVA REAL */
  `<section class="dg-page">
    <p class="eyebrow">Prova real</p>
    <h2>RESULTADOS DE QUEM PASSOU PELA ANÁLISE</h2>
    <div class="dg-prints">
      <div class="depo-img"><img src="assets/depoimento-sessao.jpg" width="607" height="879" alt="Mensagens de cliente no WhatsApp: depois da primeira sessão fechou dois contratos de R$5 mil ajustando o posicionamento" decoding="async"></div>
      <div class="depo-img"><img src="assets/depoimento-marco.jpg" alt="Mensagem de cliente: entrou em março com um resultado que não existia no ano anterior" decoding="async"></div>
    </div>
    <p>Na sua análise estratégica, você começa a trilhar o mesmo caminho.</p>
  </section>`,

  /* PÁGINA 10 · PRA QUEM É */
  `<section class="dg-page">
    <p class="eyebrow">Pra quem é</p>
    <h2>ESSA ANÁLISE É PRA VOCÊ SE:</h2>
    ${lista([
      "Já vende um serviço de alto ticket no 1x1, presencial ou online.",
      "Já fatura, mas vive entre meses bons e meses que preocupam.",
      "Depende de indicação pra trazer o cliente que mais vale.",
      "Tem pelo menos uma pessoa na equipe (marketing e/ou comercial).",
      "Já investiu em agência, freelancer ou curso e não viu o resultado aparecer.",
      "Quer construir uma empresa sólida, com previsibilidade no longo prazo.",
    ])}
    <h3 class="dg-nao">E NÃO É PRA VOCÊ SE:</h3>
    ${lista([
      "Procura solução milagrosa ou resultado do dia pra noite.",
      "Não quer ajustar processo, treinar equipe nem colocar a mão em nada.",
      "Não está disposta a investir no crescimento do seu negócio.",
    ], "x")}
  </section>`,

  /* PÁGINA 11 · O QUE FAZER AGORA */
  `<section class="dg-page dg-final">
    <p class="eyebrow">O que fazer agora</p>
    <h2>Você tem duas opções:</h2>
    <div class="dg-opcoes">
      <div class="col bad">
        <h4>Opção 1 · Continuar como está</h4>
        ${lista([
          "Depender de indicação pra trazer o cliente que mais vale",
          "Atrair curioso e caçador de preço",
          "Testar mais uma tática que não foi pensada pro seu caso",
          "Viver na montanha-russa do faturamento",
        ], "x")}
      </div>
      <div class="col good">
        <span class="dg-reco">RECOMENDADO</span>
        <h4>Opção 2 · Agendar sua análise estratégica</h4>
        ${lista([
          "Descobrir onde o seu negócio está vazando dinheiro e clientes",
          "Entender o caminho pra atrair quem tem poder aquisitivo pra pagar pelo seu serviço",
          "Sair com um plano claro, em ordem de prioridade",
        ])}
      </div>
    </div>
    <a class="btn btn-primary btn-block dg-cta" id="cta-analise" href="#" target="_blank" rel="noopener">${icon("chat")}Quero agendar minha análise estratégica</a>
    <p class="dg-copy">© Vitória Daniela · Grupo Magna</p>
  </section>`,
];

const temRespostas = !!a._completedAt;
const nome = (a.nomeResp || "").trim().split(/\s+/)[0] || "";
const msg = `Oi! Sou ${nome || "eu"}, li meu diagnóstico e quero agendar minha análise estratégica.`;
const waUrl = `https://wa.me/${F.marca.whatsapp}?text=${encodeURIComponent(msg)}`;

if (!temRespostas) {
  report.innerHTML = `
    <section class="dg-page dg-capa">
      <p class="eyebrow">Diagnóstico</p>
      <h1>Ainda não temos as suas respostas</h1>
      <p class="lead">Parece que você chegou aqui sem responder o diagnóstico. Leva cerca de 2 minutos.</p>
      <div class="actions" style="justify-content:center"><a class="btn btn-primary" href="index.html">Fazer o diagnóstico agora</a></div>
    </section>`;
  document.querySelector(".toolbar")?.remove();
} else {
  report.innerHTML = PAGINAS.join("");
  /* VSL no topo do diagnóstico (antes da capa) */
  const vslSec = document.getElementById("vsl-sec");
  if (vslSec && window.montarVSL) {
    vslSec.hidden = false;
    window.montarVSL(document.getElementById("vsl"), {
      src: "assets/vsl/vsl-720.mp4", poster: "assets/vsl/poster.jpg",
      onEvento: (nome, dados) => { try { if (typeof fbq === "function") fbq("trackCustom", nome, dados); if (typeof gtag === "function") gtag("event", nome, dados); } catch (e) {} },
    });
  }
}

["whatsapp", "cta-analise"].forEach((id) => document.getElementById(id)?.setAttribute("href", waUrl));
document.getElementById("pdf")?.addEventListener("click", () => window.print());
