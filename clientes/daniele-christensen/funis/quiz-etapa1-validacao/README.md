# Quiz Etapa 1 — link de validação

Cópia do Quiz de produção **com a promessa de abertura**, para a Dra. Daniele
aprovar antes de a mudança entrar no link que está rodando na campanha.

Não edite nada aqui. Este diretório é **gerado**:

    cd ../quiz-etapa1-producao
    python3 build.py --sem-tags --sem-envio --saida=quiz-etapa1-validacao

## O que difere do link de produção

| | Produção | Validação |
|---|---|---|
| Promessa na primeira tela | sim (aprovada em 04/09) | sim |
| Google Tag Manager e Meta Pixel | sim | **não** |
| Webhooks (Pulsar e Make) | sim | **não** |
| Aviso de clique no WhatsApp | sim | **não** |
| Etapas seguintes (pós-quiz, WhatsApp, Etapa 2) | iguais | iguais |

As tags e os webhooks saem de propósito. A autópsia de 04/09 mostrou que teste
feito em página com tag ativa vira conversão no Pixel, infla o relatório que a
cliente lê e ensina o algoritmo a procurar o perfil errado. Quem responder este
link não gera lead na planilha nem no CRM, e não conta como conversão.

## Estado

A Dani aprovou em 04/09 e o lote inteiro subiu para o link da campanha: a
promessa de abertura, a marca movida para o pós-quiz e a ordem nova do caminho B
(remuneração 7, colaboradores 8, autonomia 9).

Este link continua existindo para validar a **próxima** mudança antes de ela
tocar a campanha. As duas builds saem do mesmo protótipo; a diferença é só
medição e envio.
