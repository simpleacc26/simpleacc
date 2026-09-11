# Relatório do Quiz B em PDF (gerado por lead)

Os 4 PDFs estáticos da pasta acima (`relatorio-metodo.pdf` etc.) são um arquivo
por pilar, reaproveitados para todos os leads daquele balde, e por isso **não
têm o nome do lead**. Aqui o PDF é gerado por lead, com o nome dele.

## Por que sai idêntico à tela

Não existe template separado. O gerador abre a **própria página de relatório que
está no ar** (`../../2026-07-15-relatorio-B-web.html`, conferida como idêntica ao
que roda em `relatorio-alivance-b.vercel.app`) com o `?pilar=` e o `&nome=` do
lead, e imprime. É a mesma página, só que em PDF.

## Gerar um PDF

```bash
node gerar.mjs saida.pdf "João Carlos" "Mentalidade"
```

O pilar aceita o nome que aparece pro lead, que é o mesmo texto que o Make grava
no campo `Pilar diagnosticado` do GHL e na coluna L da planilha:

| Pilar | Código na URL da página |
| --- | --- |
| Método | `M` |
| Modelo de negócio | `N` |
| Processo de vendas | `V` |
| Mentalidade | `T` |

## Diferença para o Quiz A

No Quiz B o conteúdo do relatório é definido **só pelo pilar**, então bastam o
pilar e o nome. No Quiz A o relatório encaixa 4 respostas do lead dentro do
texto, por isso o gerador de lá (`../quiz-a/`) recebe mais campos.
