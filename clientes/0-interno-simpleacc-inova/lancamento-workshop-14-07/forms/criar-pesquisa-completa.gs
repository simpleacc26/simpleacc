/**
 * Cria a PESQUISA COMPLETA do Workshop Funil de Lead Dinâmico num ÚNICO Google Form,
 * seguindo a base do form do Rafa/Tarso (identificação -> perfil -> atribuição ->
 * qualificação -> perguntas abertas), adaptada pro nosso público B2B (mentores e
 * experts high ticket).
 *
 * COMO USAR (~2 min):
 * 1. Acesse https://script.google.com  ->  Novo projeto
 * 2. Apague tudo e cole este arquivo
 * 3. Selecione a função "criarPesquisaCompleta" e clique em Executar (Run)
 * 4. Autorize o acesso (sua conta Google)
 * 5. Em Ver > Registros (Logs) saem os links (responder e editar). O form também
 *    aparece no seu Drive.
 *
 * Depois: aba Respostas -> vincular a uma planilha (Sheets).
 */

function criarPesquisaCompleta() {
  var form = FormApp.create('Pesquisa - Workshop Funil de Lead Dinâmico');
  form.setDescription(
    'Workshop Funil de Lead Dinâmico\n\n' +
    'Que bom ter você aqui. Antes do dia 14, responda essas perguntas rápidas: é ' +
    'com elas que a gente prepara o conteúdo pro seu momento e nível de ' +
    'faturamento. Suas respostas são sigilosas. Leva menos de 2 minutos.'
  );
  form.setProgressBar(true);

  // ---------- IDENTIFICAÇÃO ----------
  form.addSectionHeaderItem().setTitle('Sobre você');
  form.addTextItem().setTitle('Nome completo').setRequired(true);
  form.addTextItem().setTitle('WhatsApp com DDD').setRequired(true);
  form.addTextItem().setTitle('E-mail').setRequired(true);

  // ---------- PERFIL DE NEGÓCIO ----------
  form.addSectionHeaderItem().setTitle('Seu negócio hoje');

  form.addMultipleChoiceItem()
    .setTitle('Como você se define hoje?')
    .setChoiceValues([
      'Mentor(a) ou consultor(a)',
      'Expert ou infoprodutor(a)',
      'Prestador(a) de serviço',
      'Dono(a) de negócio ou agência',
      'Ainda estou começando'
    ])
    .showOtherOption(true)
    .setRequired(true);

  form.addTextItem().setTitle('O que você vende, seu nicho?').setRequired(true);

  form.addListItem()
    .setTitle('Em qual estado você mora?')
    .setChoiceValues([
      'AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB',
      'PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO','Fora do Brasil'
    ])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('Há quanto tempo você atua nesse mercado?')
    .setChoiceValues(['Menos de 1 ano', 'De 1 a 3 anos', 'Mais de 3 anos'])
    .setRequired(true);

  // ---------- FATURAMENTO E MATURIDADE ----------
  form.addSectionHeaderItem().setTitle('Faturamento e estrutura');

  form.addMultipleChoiceItem()
    .setTitle('Qual seu faturamento médio mensal hoje?')
    .setChoiceValues([
      'Ainda não faturo ou até R$ 10 mil',
      'R$ 10 mil a R$ 50 mil',
      'R$ 50 mil a R$ 100 mil',
      'Acima de R$ 100 mil'
    ])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('Qual o ticket do seu produto principal?')
    .setChoiceValues([
      'Até R$ 2 mil',
      'R$ 2 mil a R$ 10 mil',
      'R$ 10 mil a R$ 50 mil',
      'Acima de R$ 50 mil'
    ])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('Você já vende no high ticket (call ou aplicação) hoje?')
    .setChoiceValues(['Sim, com constância', 'Sim, esporádico', 'Ainda não'])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('Quanto você investe em tráfego pago por mês?')
    .setChoiceValues(['Nada', 'Até R$ 3 mil', 'R$ 3 mil a R$ 10 mil', 'Acima de R$ 10 mil'])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('Você tem equipe ou estrutura comercial (SDR ou closer)?')
    .setChoiceValues(['Sim', 'Só eu', 'Terceirizado'])
    .setRequired(true);

  // ---------- ATRIBUIÇÃO ----------
  form.addSectionHeaderItem().setTitle('Como você chegou aqui');

  form.addMultipleChoiceItem()
    .setTitle('Como você chegou até o Workshop?')
    .setChoiceValues([
      'Anúncio no Instagram',
      'Anúncio no Facebook',
      'Anúncio no YouTube',
      'Indicação',
      'Já acompanhava a Simple'
    ])
    .showOtherOption(true)
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('Você já comprou algum outro treinamento de marketing, tráfego ou vendas?')
    .setChoiceValues(['Sim', 'Não'])
    .setRequired(true);

  // ---------- QUALIFICAÇÃO E ABERTAS ----------
  form.addSectionHeaderItem().setTitle('Seu momento');

  form.addMultipleChoiceItem()
    .setTitle('Qual seu maior desafio hoje pra atrair clientes?')
    .setChoiceValues([
      'Lead caro',
      'Lead desqualificado (chega gente errada na call)',
      'Não sei escalar ou travei no volume',
      'Não tenho previsibilidade de vendas'
    ])
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('Qual seu objetivo com o Funil de Lead Dinâmico? O que você quer que mude no seu negócio?')
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('Você já tentou resolver isso de outras formas? Como foi?');

  form.addScaleItem()
    .setTitle('De 1 a 5, o quanto você acredita que o seu gargalo hoje é a qualificação do lead (e não só o volume de tráfego)?')
    .setBounds(1, 5)
    .setLabels('Discordo', 'Concordo total')
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('Se você resolvesse isso, o que mudaria no seu negócio nos próximos 6 meses?');

  Logger.log('PESQUISA COMPLETA criada.');
  Logger.log('  Responder: ' + form.getPublishedUrl());
  Logger.log('  Editar:    ' + form.getEditUrl());
}
