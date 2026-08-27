# Ajustes validados: o que sempre é pedido

Lista fechada no projeto Thaina/Thiago e reaplicada na Luana Isse. **Aplique por
padrão, sem esperar pedirem.** Se um deles não couber no cliente, diga por quê.

---

## Estrutura da página

### 1. Barra de progresso sem número nenhum
Nem "Pergunta X de N", nem porcentagem. **Só a barra enchendo.**

Número ali faz o quiz parecer longo e medido, e derruba conclusão. Este é o
ajuste pedido com mais frequência, e é contraintuitivo: parece informação útil,
e atrapalha.

```js
function updateProgress(stepIdx) {
  const pct = Math.round((stepIdx / F.steps.length) * 100);
  document.getElementById("progress-bar").style.width = `${pct}%`;
}
```

### 2. Sem rodapé
Nas duas páginas do funil. Rodapé é saída, e a página não tem para onde mandar.

### 3. Nome completo do expert no topo
Não a sigla do método, não um apelido. O nome que a pessoa vai procurar depois.

### 4. Bloco de autoridade breve
**Foto, nome, o que a pessoa faz, @ do Instagram e uma fala dela.** Só isso.

Método, etapas e duração **não entram**, porque já aparecem no bloco do método
logo acima. Repetir ali dilui.

### 5. Grade de credenciais só com números reais
Só existe se os números forem **reais e já escritos no material do cliente**.
Nada de "centenas de alunos" inventado. Se não tem número escrito, não tem grade.

### 6. Puxar copy das páginas que o cliente já tem no ar
Antes de escrever do zero, olhe o que ele já publicou. A linguagem dele converte
melhor que paráfrase, e a validação é imediata porque ele reconhece a própria voz.

---

## O índice

### 7. Índice com nome e sigla próprios
Não "sua pontuação". Um nome que pertence ao cliente e amarra ao inimigo dele.
Exemplo: **IRV, Índice de Ruptura de Valor**, que mede a distância entre o valor
que o especialista tem e o que consegue comunicar.

O índice sai **só das perguntas de diagnóstico**. Tempo, objetivo e as duas
porteiras não pontuam.

### 8. Rodar TODAS as combinações de peso antes de publicar
**Obrigatório.** Não é opcional e não é exagero.

No primeiro corte do IRV, **89% das 1024 combinações caíam em "Alta"** e "Baixa"
era **matematicamente impossível**. O número era teatro: o lead recebia sempre o
mesmo diagnóstico com outra roupa.

Depois de baixar as alternativas mais leves para 0 e 1, ficou de 20% a 100%, com
distribuição de ~50% Alta, ~49% Média, ~1% Baixa.

```
Escreva um script que percorre o produto cartesiano de todas as opcoes
com peso, calcula o indice e imprime a distribuicao por faixa.
Se uma faixa for impossivel ou dominar, recalibre e rode de novo.
```

**Se mexer em qualquer peso depois, rode a distribuição de novo.**

Documente no `flow.js` a distribuição obtida. E note: se o quiz não tem
alternativa de "está tudo bem", a faixa baixa é rara **de propósito**, porque
quem responde já se reconhece no problema. Isso precisa estar escrito.

### 9. Resultado nomeado por perfil
Não só um número e uma faixa: um **nome** para o diagnóstico. Exemplos reais:
"Excelente na sombra", "Excelente sem causa", "Excelente e intercambiável",
"Excelente sem caminho de venda".

O resultado nomeado vai em **três lugares**: no topo do relatório, na **mensagem
de WhatsApp** e numa **coluna da planilha**.

É o que transforma a planilha em roteiro de atendimento: quem atende abre a
conversa já sabendo o diagnóstico da pessoa.

---

## Qualificação

### 10. As porteiras refletem o ICP real
As duas últimas perguntas (faturamento e prontidão) filtram de verdade. As faixas
de faturamento saem do ICP escrito no doc de estratégia, não de um padrão.

A opção de nutrir enquadra **momento**, nunca "algo mais barato":
"Ainda não é prioridade para mim agora", não "quero algo mais em conta".

### 11. Quatro faixas na planilha, três CTAs na página
`fila-quente`, `qualificado`, `nutrir`, `fora`.

A página mostra 3 CTAs (fila-quente e qualificado veem o mesmo botão), mas a
planilha recebe as 4. **A quarta existe para priorizar a fila do atendimento** e
para medir qualidade de criativo, não só volume.

### 12. A regra de corte cruzada vive no código
Em `classificarLead()`, não só no documento de estratégia. Documento não roda.

```js
function classificarLead(a) {
  const optFat = /* opcao de faturamento escolhida */;
  if (optFat && optFat.fora) return "fora";
  if (a.prontidao === "depois" || a.prontidao === "pesquisando") return "nutrir";
  const caixaBom = ["10a25", "25a50", "acima50"].indexOf(a.faturamento) > -1;
  if (a.prontidao === "sim" && caixaBom && calcularIRV(a).pct >= 66) return "fila-quente";
  return "qualificado";
}
```

---

## WhatsApp

### 13. A mensagem leva o resultado nomeado
Não só o nome da pessoa. Placeholders: `{nome}`, `{resultado}`, `{indice}`,
`{faixa}`, `{pilar}`.

### 14. Trava de WhatsApp mudo
Se `marca.whatsapp` estiver vazio ou com placeholder, **os CTAs não abrem nada e
a página mostra um aviso no topo**.

Evita publicar com botão morto e descobrir depois que o tráfego já rodou.

---

## Identidade

### 15. Identidade vem do manual oficial, não de inferência
Enquanto não existe manual, **infira e marque como provisório**. Quando chegar,
refaça.

Na Luana, a paleta inferida das artes dela estava perto no espírito e **errada
nos valores**. Só o manual oficial corrigiu.

Se a fonte do manual for paga, escolha uma substituta próxima e **deixe escrito
qual é a original e por que foi trocada**.
