/**
 * Cria os formulários do Workshop Funil de Lead Dinâmico (14/07) no Google Forms.
 *
 * COMO USAR (leva ~2 min):
 * 1. Acesse https://script.google.com  ->  Novo projeto
 * 2. Apague o conteúdo e cole TODO este arquivo
 * 3. Em cima, selecione a função "criarFormularios" e clique em Executar (Run)
 * 4. Autorize o acesso (é da sua conta Google)
 * 5. Veja o "Registro de execução" (View > Logs): saem os links de cada form
 *    (link de resposta e link de edição). Os forms também aparecem no seu Drive.
 *
 * Depois: em cada form, aba Respostas -> vincular a uma planilha (Sheets).
 * A lógica de etiqueta da Aplicação (verde/amarelo/vermelho) é aplicada na
 * planilha (ver aplicacao.md), não dentro do form.
 */

function criarFormularios() {
  criarPesquisa();
  criarAplicacao();
}

/** PESQUISA (4 perguntas) - segue o documento base do processo */
function criarPesquisa() {
  var form = FormApp.create('Pesquisa - Workshop Funil de Lead Dinâmico');
  form.setDescription(
    'Que bom ter você aqui. 🙌\n\n' +
    'Seu lugar no Workshop Funil de Lead Dinâmico (14/07) está garantido. Antes do ' +
    'dia, a gente quer te conhecer melhor.\n\n' +
    'São só 4 perguntas rápidas, e é com elas que preparamos o conteúdo pro seu ' +
    'momento. Assim você sai do workshop com o funil pensado pro SEU negócio.\n\n' +
    'Pode responder com tranquilidade: suas informações são 100% sigilosas.\n\n' +
    'Leva menos de 1 minuto. Bora? 👇'
  );
  form.setProgressBar(true);

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
    .setTitle('Você já investe em tráfego pago hoje?')
    .setChoiceValues([
      'Não invisto ainda',
      'Invisto pouco ou testando',
      'Invisto com constância e quero escalar'
    ])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('Qual seu maior desafio hoje pra atrair clientes?')
    .setChoiceValues([
      'Lead caro',
      'Lead desqualificado (chega gente errada na call)',
      'Não sei escalar ou travei no volume',
      'Não tenho previsibilidade de vendas'
    ])
    .setRequired(true);

  form.addTextItem()
    .setTitle('O que você vende, seu nicho?')
    .setRequired(true);

  Logger.log('PESQUISA criada.');
  Logger.log('  Responder: ' + form.getPublishedUrl());
  Logger.log('  Editar:    ' + form.getEditUrl());
}

/** APLICAÇÃO (10 perguntas) - filtro que qualifica quem vai pra call */
function criarAplicacao() {
  var form = FormApp.create('Aplicação - Workshop Funil de Lead Dinâmico');
  form.setDescription(
    'Aplicação para a call de estratégia do Funil de Lead Dinâmico.\n' +
    'Leva 2 minutos. Com base nas suas respostas, a gente vê se faz sentido pro ' +
    'seu momento e libera a agenda.'
  );
  form.setProgressBar(true);
  form.setCollectEmail(true);

  form.addTextItem().setTitle('Nome completo').setRequired(true);

  form.addTextItem().setTitle('WhatsApp com DDD').setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('Qual seu faturamento médio mensal hoje?')
    .setChoiceValues([
      'Até R$ 10 mil',
      'R$ 10 mil a R$ 50 mil',
      'R$ 50 mil a R$ 100 mil',
      'Acima de R$ 100 mil'
    ])
    .setRequired(true);

  form.addTextItem().setTitle('Qual seu nicho, o que você vende?').setRequired(true);

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

  form.addMultipleChoiceItem()
    .setTitle('Se fizer sentido, você tem condição de investir na implementação agora?')
    .setChoiceValues([
      'Sim, tenho verba',
      'Consigo me organizar em 30 dias',
      'Não neste momento'
    ])
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('Por que agora? O que te fez aplicar?')
    .setRequired(true);

  Logger.log('APLICAÇÃO criada.');
  Logger.log('  Responder: ' + form.getPublishedUrl());
  Logger.log('  Editar:    ' + form.getEditUrl());
}
