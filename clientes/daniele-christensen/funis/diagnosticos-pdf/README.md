# Diagnósticos em PDF (pós-quiz)

Os 4 documentos que o lead recebe por WhatsApp depois de tocar no botão da página
pós-quiz. Um por cenário identificado na pergunta que define o diagnóstico.

| Arquivo | Cenário |
| --- | --- |
| `Diagnostico-01-o-adiador.pdf` | O Adiador — decisão sobre pessoas que não sai |
| `Diagnostico-02-o-gargalo.pdf` | O Gargalo — tudo passa pelo dono antes de acontecer |
| `Diagnostico-03-time-que-nao-assume.pdf` | Time que não Assume — resultado sempre tem explicação externa |
| `Diagnostico-04-plano-que-nao-vira-execucao.pdf` | Plano que não Vira Execução — o estratégico perde para o urgente |

**Status:** aprovados pela Dani, com as alterações que ela pediu já aplicadas
(comunicação que serve para dono e para gestor não-dono, "Sessão Estratégica
Gratuita" e assinatura com CRA-RS 13.798).

## Como regerar

```bash
python3 gen.py
```

Gera o HTML intermediário e imprime os PDFs via Chromium headless. Requer o
Chromium do ambiente (`/opt/pw-browsers/chromium`). Duas páginas A4 por
documento, identidade escura da Grokker: fundo `#0b0b0b` com padrão de losangos,
laranja `#f18700`, degradê dourado `#f7d774 → #d99b1a`.

Todo o texto fica no dicionário `D` no topo do `gen.py`, com as constantes
compartilhadas `ABERTURA`, `QUEM` e `PROXIMO`. Para mudar a copy, edite ali e
rode de novo, nunca edite o PDF.

## Cuidado ao editar

O layout é de duas páginas fixas e o texto não reflui para uma terceira: se um
bloco crescer demais, o conteúdo é cortado silenciosamente. Depois de qualquer
alteração de copy, confira visualmente as duas páginas dos quatro PDFs antes de
entregar.

## O tempo e a quantidade de perguntas (resolvido em 25/08)

O bloco `PROXIMO` prometia "5 perguntas mais profundas" e "menos de 3 minutos",
enquanto a Etapa 2 tem 15 perguntas e as outras peças já falavam em 5 minutos. A
equipe da Dani pediu **"menos de 5 minutos e responda algumas perguntas"**, e é
o que está nos PDFs agora.

O "5" antigo vinha dos 5 blocos, não do número de perguntas. Por isso a peça não
volta a citar quantidade: a promessa se sustenta pelo tempo, e o tempo agora é o
mesmo em todo o funil — PDFs, página pós-quiz, áudio do WhatsApp e a própria
Etapa 2. Se um dia mudar, mudam os quatro juntos.
