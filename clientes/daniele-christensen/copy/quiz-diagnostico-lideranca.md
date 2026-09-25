# Copy — Quiz de Diagnóstico de Liderança

> Origem: "Cópia de [Daniele Christensen] Copies 2026" (Drive:
> `18S4YfnvVRVdY3ztxZB2EcYX3tYLP-QLGMEPaVN584ec`). Live em
> `https://quiz.grokkeronline.com/quiz`.

## Headline de entrada

**Descubra onde a sua liderança pode estar comprometendo desempenho, cultura
e resultado financeiro da empresa por ausência de critério.**

Responda 6 perguntas e receba um plano com os ajustes necessários para elevar
seu padrão decisório e a performance da sua equipe.

## Perguntas

1. **Hoje você é:** *(contexto)*
   - Dono ou sócio com responsabilidade direta sobre resultados
   - Diretor ou gerente com autonomia para decidir sobre pessoas
   - Gestor, com autonomia parcial
   - Fui promovido recentemente à liderança e não tenho quase autonomia
2. **Quantas pessoas estão sob sua responsabilidade direta hoje?** *(contexto)*
   - 1 a 3 / 4 a 10 / 11 a 25 / 26 a 50 / Mais de 50
3. **Hoje, sua liderança é guiada principalmente por:** *(contexto)*
   - Critérios claros e método estruturado / Experiência e bom senso / Intuição e tentativa/erro / Reação às situações conforme surgem
4. **Na sua avaliação, qual tem sido o risco mais recorrente na sua gestão?** *(gap)*
   - Manutenção de profissionais abaixo do padrão esperado / Decisões tardias sobre pessoas / Queda de engajamento e performance / Desalinhamento entre metas e execução / Sobrecarga concentrada na liderança
5. **Se sua liderança estivesse operando em alto padrão nos próximos 12 meses, qual impacto seria mais relevante para a empresa?** *(desejo)*
   - Aumento consistente de performance / Redução de conflitos e ruídos internos / Maior previsibilidade nos resultados / Equipe mais autônoma e responsável / Decisões difíceis tomadas no tempo certo
6. **Qual é o faturamento médio mensal da empresa sob sua responsabilidade?** *(faturamento)*
   - Até R$15.000 / R$15–30 mil / R$30–50 mil / R$50–100 mil / R$100–300 mil / Acima de R$300 mil

## Tela final (captura)

**Seu diagnóstico está pronto. Agora é só me dizer pra onde enviar.**
*Seus dados não serão compartilhados com terceiros.*

Campos: Nome, E-mail, WhatsApp → botão **[Receber meu diagnóstico]**

## Notas de UX (por que converte bem — ver `funis/` para o código-fonte)

- Auto-avanço após clique (~400ms), sem botão "próxima pergunta" — reduz fricção.
- Feedback visual imediato na seleção (cor de destaque + ícone de check).
- Só 6 perguntas + 1 formulário — curto o bastante pra não abandonar, longo o
  bastante pra qualificar.
- Captura UTMs automaticamente e salva em localStorage.
- Em caso de erro no webhook, redireciona mesmo assim (não perde o lead).
- +55 pré-preenchido no campo de WhatsApp.

Checklist completo de replicação para outros quizzes está documentado no doc
"Código-Fonte" do Drive (`14BJec8YkERi6D_dtbYEc4tAsbBXrdmVXUT4GoUEAbE8`).
