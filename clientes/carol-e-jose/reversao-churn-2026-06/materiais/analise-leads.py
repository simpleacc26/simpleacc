#!/usr/bin/env python3
"""
Análise da base de leads do quiz (ÚNICOS Club) — diagnóstico de qualificação.

Roda sobre `leads-organizados.csv` (export do InLead/quiz) e responde à pergunta
central: por que o José só consegue contato com leads fora do ICP?

Uso:
    python3 analise-leads.py
"""
import csv
import statistics
from collections import Counter

CSV = "leads-organizados.csv"
ACIMA_1M = {"Entre R$ 1M e R$ 3M", "Entre R$ 3M e R$ 5M", "Acima de R$ 5M"}


def g(row, key):
    return row.get(key, "").strip()


def contatavel(row):
    """Deixou nome E whatsapp (= clicou para receber diagnóstico)."""
    return bool(g(row, "field: nome") and g(row, "field: whatsapp"))


def main():
    with open(CSV, encoding="utf-8") as f:
        rows = list(csv.DictReader(f))

    print(f"Total de leads: {len(rows)}")
    print(f"Contatáveis (nome + whatsapp): {sum(1 for r in rows if contatavel(r))}")

    print("\n=== Cruzamento Faturamento x Contatável ===")
    buckets = [
        "Até R$500 mil", "Entre R$500 mil e R$ 1M", "Entre R$ 1M e R$ 3M",
        "Entre R$ 3M e R$ 5M", "Acima de R$ 5M", "",
    ]
    for b in buckets:
        tot = [r for r in rows if g(r, "options: faturamento") == b]
        c = [r for r in tot if contatavel(r)]
        pct = (len(c) / len(tot) * 100) if tot else 0
        print(f"  {(b or '(em branco)'):28s} | total {len(tot):4d} | contatável {len(c):3d} | {pct:4.1f}%")

    icp = [r for r in rows
           if g(r, "options: faturamento") in ACIMA_1M
           and g(r, "options: modelo_da_empresa") not in ("Indústria", "")]
    print(f"\nICP (>1M e não-indústria): {len(icp)}")
    print(f"  desses, contatáveis: {sum(1 for r in icp if contatavel(r))}")

    # Proxy numérico (ponto médio de cada faixa, em R$ mil) p/ média/mediana/desvio
    mid = {"Até R$500 mil": 250, "Entre R$500 mil e R$ 1M": 750,
           "Entre R$ 1M e R$ 3M": 2000, "Entre R$ 3M e R$ 5M": 4000,
           "Acima de R$ 5M": 7000}
    vals = [mid[g(r, "options: faturamento")] for r in rows
            if g(r, "options: faturamento") in mid]
    print(f"\nFaturamento declarado (proxy ponto médio, N={len(vals)}):")
    print(f"  média   R$ {statistics.mean(vals):,.0f} mil")
    print(f"  mediana R$ {statistics.median(vals):,.0f} mil")
    print(f"  desvio  R$ {statistics.pstdev(vals):,.0f} mil")


if __name__ == "__main__":
    main()
