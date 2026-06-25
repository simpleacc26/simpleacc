#!/usr/bin/env python3
"""
Análise da base de MQLs do quiz (ÚNICOS Club).

BASE AUTORITATIVA: `leads-76-mqls.csv` — os 76 leads com faturamento > R$ 1M,
com contato completo. O export completo (`leads-organizados.csv`, 472 linhas)
tem muitos campos faltantes e NÃO é usado como base de conclusão — fica só como
material bruto.

Uso:
    python3 analise-leads.py
"""
import csv
import re
from collections import Counter

CSV = "leads-76-mqls.csv"


def g(row, key):
    return (row.get(key) or "").strip()


def main():
    with open(CSV, encoding="utf-8") as f:
        rows = list(csv.DictReader(f))

    print(f"Total de MQLs: {len(rows)}")

    # Completude de contato — campos do formulário dos >1M
    nome = sum(1 for r in rows if g(r, "field: e02yKB"))
    email = sum(1 for r in rows if g(r, "field: Oen6ic"))
    wpp = sum(1 for r in rows if g(r, "field: UX3WQn"))
    print(f"Com nome: {nome} | e-mail: {email} | WhatsApp: {wpp} (de {len(rows)})")
    print(f"Usaram o campo de contato PRIMÁRIO (field: nome): "
          f"{sum(1 for r in rows if g(r, 'field: nome'))}")

    for col, lab in [("options: faturamento", "FATURAMENTO"),
                     ("options: modelo_da_empresa", "SETOR"),
                     ("options: cargo", "CARGO")]:
        print(f"\n=== {lab} ===")
        for k, v in Counter(g(r, col) for r in rows).most_common():
            print(f"  {v:3d}  {k}")

    icp = [r for r in rows if g(r, "options: modelo_da_empresa") != "Indústria"]
    decisor = [r for r in rows if g(r, "options: cargo") in
               ("Dono ou sócio", "Diretor ou gerente com autonomia decisória")]
    icp_dec = [r for r in icp if g(r, "options: cargo") in
               ("Dono ou sócio", "Diretor ou gerente com autonomia decisória")]
    print(f"\nICP (não-indústria): {len(icp)}")
    print(f"Decisores (dono/sócio + diretor c/ autonomia): {len(decisor)}")
    print(f"ICP E decisor (alvo prioritário): {len(icp_dec)}")

    ddd = Counter()
    for r in rows:
        m = re.search(r"\((\d{2})\)", g(r, "field: UX3WQn"))
        if m:
            ddd[m.group(1)] += 1
    print(f"\nTop DDDs: {ddd.most_common(8)}")


if __name__ == "__main__":
    main()
