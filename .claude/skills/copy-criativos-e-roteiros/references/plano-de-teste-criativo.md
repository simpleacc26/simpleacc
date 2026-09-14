# Plano de teste de criativo

Criativo sem plano de teste vira palpite caro. Este arquivo define quantas peças
subir, em que ordem, e **quando não mexer**.

---

## Parte 1 · A régua de verba manda no plano

A plataforma precisa de volume para sair do aprendizado. Abaixo de um certo
ponto, mais criativo não ajuda: divide o pouco sinal que existe.

| Verba diária | Peças no ar ao mesmo tempo | Ritmo de troca |
| --- | --- | --- |
| Até R$ 30 | 1 a 2 | Só troque com sinal claro, depois de 7 dias |
| R$ 30 a R$ 100 | 2 a 3 | Avalie semanalmente |
| R$ 100 a R$ 300 | 3 a 5 | Avalie a cada 3 a 4 dias |
| Acima de R$ 300 | 5+ | Leva nova a cada 2 semanas |

> **Aprendizado registrado (Luana Isse, 27/08/2026).** Com R$ 66/dia **não se
> otimiza por evento raro**. A Meta precisa de cerca de 50 conversões por semana
> por conjunto para sair do aprendizado, e a faixa mais quente rende talvez 7.
> Otimizar por evento raro mata o algoritmo por falta de sinal e encarece o lead.
> O certo nesse orçamento: **otimizar por `Lead`** e usar as conversões
> personalizadas **para medir**, decidindo na mão onde pôr dinheiro.

**Consequência para quem escreve criativo:** em verba baixa, entregue **menos
peças e mais variações de gancho** do mesmo ângulo. Ângulo novo consome
aprendizado; gancho novo, não.

## Parte 2 · Uma variável por teste

Nunca troque hook, imagem e CTA ao mesmo tempo. Se melhorar, você não sabe o quê
melhorou; se piorar, também não.

Ordem de teste, do mais barato ao mais caro:

1. **Gancho** (as 3 primeiras palavras / os 3 primeiros segundos)
2. **Headline**
3. **Ângulo** (peça nova, framework inteiro)
4. **Formato** (estática contra vídeo contra carrossel)
5. **Destino** (quiz contra WhatsApp direto)

## Parte 3 · Quando NÃO mexer

- **Nos primeiros 3 a 4 dias** de um conjunto novo. Editar o criativo reinicia o
  aprendizado e joga fora o que já foi aprendido.
- **Com menos de 1.000 impressões** na peça. Não há dado, só ruído.
- **Quando a métrica caiu num dia só.** Um dia ruim não é tendência.
- **No meio de um pico de sazonalidade** (ex.: todo cursinho do Brasil anunciando
  ENEM ao mesmo tempo). O leilão está caro para todo mundo, não é o seu criativo.

## Parte 4 · Sinais de que o criativo saturou

- Frequência subindo com CTR caindo, na mesma semana.
- Custo por lead subindo de forma consistente por 5 a 7 dias.
- Comentário do tipo "já vi esse anúncio umas dez vezes".
- Lead entrando, mas a qualificação piorando (olhe a coluna de qualificação na
  planilha de leads, não só o volume).

**Quando saturar, troque o gancho antes de trocar o ângulo.** Ângulo que
funcionou costuma ter mais de uma entrada.

## Parte 5 · O que medir por peça

Anote na matriz (`assets/matriz-de-testes.csv`):

| Campo | Por quê |
| --- | --- |
| Ângulo e gancho | Para saber o que ganhou, não só qual arquivo ganhou |
| Nível de consciência | Para não concluir "vídeo funciona melhor" quando o que mudou foi o público |
| Formato e duração | |
| Data de subida | Para respeitar a janela de aprendizado |
| Custo por lead | |
| **Qualificação dos leads que vieram** | **Lead barato e ruim é prejuízo, não vitória** |
| Decisão e data | Manter, pausar, iterar o gancho |

> A coluna de qualificação existe na planilha de leads de todos os funis da casa.
> Use. Ela é a diferença entre otimizar por volume e otimizar por cliente.

## Parte 6 · O link do anúncio

Responsabilidade de quem escreve o anúncio, não de quem sobe.

- Aponte sempre para a **raiz do funil com a query de UTM**:
  `https://<funil>/?utm_source=meta&utm_medium=cpc&utm_campaign=<campanha>`
- **Nunca** para `/index.html`: o servidor limpa a URL e derruba a query, e você
  perde a origem de todos os leads daquela campanha.
- **Nunca** para um endereço antigo do funil.

> **Caso GES360 (12/08/2026).** O funil mudou de endereço e o projeto antigo
> ficou no ar servindo a cópia daquele momento, **sem o endpoint de leads**. Quem
> entrava pelo link antigo respondia o quiz inteiro, via o diagnóstico
> normalmente e **o lead evaporava**. Nada quebrava na tela. Confirme o endereço
> oficial no `README.md` do funil antes de publicar o anúncio.

## Parte 7 · Registro

Ao fim da leva, escreva **uma linha no `aprendizados.md` do cliente**: quais
ângulos subiram, qual ganhou, qual saturou e o que não repetir. É o que impede a
próxima leva de recomeçar do zero.
