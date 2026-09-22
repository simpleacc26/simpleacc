# Planilha de leads — contrato de dados

Combinado na call de 22/09: a Simple envia a planilha (ou o endpoint) e o André
cria a rotina no Lovable para o quiz alimentá-la automaticamente a cada lead.

Este arquivo é o contrato. Ele existe para que a planilha da Simple e a saída do
quiz do André tenham exatamente as mesmas colunas, na mesma ordem, com os mesmos
nomes. Se a planilha que a Simple já usa tiver cabeçalho diferente, **alinhe a
planilha a este contrato antes de enviar o link ao André**, não o contrário: o
quiz que está no ar e o prompt do Lovable já falam nestes nomes.

## Colunas

| # | Coluna | Tipo | Exemplo |
| --- | --- | --- | --- |
| 1 | `data_hora` | ISO 8601 com fuso | `2026-09-23T14:32:10-03:00` |
| 2 | `nome` | texto | `Fulano de Tal` |
| 3 | `whatsapp` | só dígitos, com DDD | `11990000000` |
| 4 | `email` | texto | `fulano@email.com` |
| 5 | `cidade` | texto | `São Paulo` |
| 6 | `indice_d90` | inteiro 0 a 100 | `28` |
| 7 | `faixa` | texto | `Produção sem método` |
| 8 | `elo_dominante` | texto | `Orçamento e Resultados` |
| 9 | `orcamento_faixa` | texto | `De R$ 5 mil a R$ 20 mil` |
| 10 | `orcamento_referencia` | número | `12000` |
| 11 | `vazamento_min` | número | `2400` |
| 12 | `vazamento_max` | número | `4200` |
| 13 | `p1_papel` | texto | `Sou produtor: monto shows e eventos para artistas e casas` |
| 14 | `p2_producoes_ano` | texto | `De 4 a 10` |
| 15 | `p3_antecedencia` | texto | `Na semana do evento, no grito` |
| 16 | `p4_onde_escapa` | texto | `Orçamento e Resultados` |
| 17 | `p5_custo` | texto | `A margem sumiu: o show aconteceu e eu não ganhei nada` |
| 18 | `p6_controle` | texto | `Grupo de WhatsApp e áudio` |
| 19 | `p7_tentativa` | texto | `Nada estruturado, vou aprendendo no tranco` |
| 20 | `p8_objetivo` | texto | `Fechar produção sabendo a margem antes de assinar` |
| 21 | `p9_orcamento` | texto | `De R$ 5 mil a R$ 20 mil` |
| 22 | `conta_criada` | booleano | `TRUE` |
| 23 | `origem` | texto | `quiz-plataforma` ou `quiz-vercel` |
| 24 | `utm_source` | texto | `ig` |
| 25 | `utm_campaign` | texto | `diagnostico-d90-set` |
| 26 | `utm_content` | texto | `criativo-03-rockinrio` |

O arquivo `planilha-leads-cabecalho.csv`, nesta pasta, tem exatamente este
cabeçalho e uma linha de exemplo. Importar no Google Sheets já deixa a planilha
pronta.

## Como o quiz escreve

Duas opções, e a escolha é do André, porque quem constrói no Lovable é ele:

**A. Webhook simples (recomendado).** A Simple cria um Google Apps Script
publicado como Web App na própria planilha, que aceita POST em JSON e anexa uma
linha. O André só precisa da URL. É o caminho mais curto e não depende de
credencial de API no Lovable.

**B. Integração nativa.** O Lovable escreve direto no Google Sheets via
integração ou via Make/Zapier. Mais robusto, mais peças para manter.

Em qualquer um dos dois, valem as mesmas regras:

- **Não travar o usuário.** Mostrar o diagnóstico primeiro, gravar depois.
- **Repetir em caso de falha**, com fila local, para não perder lead.
- **Gravar abandono também**, com os campos preenchidos até a desistência e
  `conta_criada` falso. Saber em que pergunta as pessoas param vale ouro.

## O ponto que ainda não está resolvido

**O formulário da página que está no ar hoje não persiste nada.** Ele valida os
quatro campos e avança para o diagnóstico, e o lead morre ali. Enquanto a
versão do Lovable não estiver no ar, todo tráfego que rodar para
`musikalis-diagnostico.vercel.app` gera diagnóstico e não gera lead.

Duas saídas, e as duas cabem:

1. Ligar o mesmo webhook na página da Vercel, que é uma alteração pequena e
   resolve hoje.
2. Só rodar tráfego depois que a versão dentro da plataforma estiver de pé.

**Não rodar mídia com o formulário como está.**

## Pendências

- [ ] Simple: alinhar o cabeçalho da planilha existente a este contrato
- [ ] Simple: publicar o Apps Script e gerar a URL do webhook
- [ ] Simple: enviar a URL ao André e substituir `{{URL_WEBHOOK_PLANILHA}}` no prompt
- [ ] Simple: ligar o webhook na página da Vercel enquanto ela for o destino
- [ ] André: criar a rotina de escrita no Lovable
- [ ] Os dois: teste ponta a ponta com um lead real antes de subir campanha
