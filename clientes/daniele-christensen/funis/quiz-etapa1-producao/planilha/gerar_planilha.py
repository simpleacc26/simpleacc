# -*- coding: utf-8 -*-
"""
Gera o CSV que vira a planilha de leads da Etapa 1 no Google Sheets.

    python3 gerar_planilha.py > etapa1-leads.csv

Mesma mecânica da planilha da Etapa 2: as colunas calculadas são ARRAYFORMULA
na linha 1, valem para a planilha inteira e não precisam ser arrastadas quando
o Make insere linha nova.

Separador de argumento é ";" porque a conta do Drive está em pt-BR, e as
porcentagens são montadas com ROUND(...)&"%" — a máscara do TEXT lê a vírgula
como separador de milhar e transformaria 12,5% em "125%".

A ordem das colunas A a AD é contrato com o cenário do Make. Mexer aqui sem
mexer lá desalinha tudo silenciosamente: o Make escreve por posição.
"""

import csv, sys

CENARIOS = ["O Adiador", "O Gargalo", "Time que não Assume",
            "Plano que não Vira Execução"]

# A..AD — o que o Make escreve, na ordem exata do payload da Etapa 1
CAMPOS = [
    "Carimbo", "Nome", "E-mail", "WhatsApp digitado", "Telefone (55)",
    "Cenário", "PDF enviado", "Caminho", "Cargo", "Setor",
    # só o caminho A responde colaboradores; para o caminho B a coluna fica
    # vazia, como já acontece com Faturamento e Margem
    "Colaboradores",
    "Faturamento", "Margem", "Autonomia", "Remuneração",
    "Pontuação", "Qualificado", "Motivo da reprovação",
    "O que mais se repetiu (P2)", "O que já tentou (P3)",
    "Decisões sem você (P4)", "O que incomoda imaginar (P5)",
    "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term",
    "fbclid", "gclid", "Veio de",
]

# Letras de coluna, e não posições calculadas: quem inserir coluna nova tem de
# vir corrigir aqui de propósito. Depois da entrada de Colaboradores em K, tudo
# à direita andou uma casa (Qualificado era P, utm_source era V).
CARIMBO, NOME, CEN, QUALIF = "A:A", "B:B", "F:F", "Q:Q"
MOTIVO = "R:R"
SOURCE, CAMPANHA = "W:W", "Y:Y"

# Contar lead tem duas armadilhas aqui, as duas descobertas na marra:
# COUNTA conta como preenchida a célula de texto vazio que o import de CSV
# deixa, e a planilha zerada marcaria 1 lead para sempre; e SUMPRODUCT volta
# #NAME? neste import. COUNTIF com "?*" conta só célula com pelo menos um
# caractere, e vai no Nome porque ele é sempre texto — o Carimbo pode ser
# convertido para data e deixar de casar com o curinga.
TOTAL = 'COUNTIF(B2:B;"?*")'


def af(titulo, corpo, guarda=CARIMBO):
    """ARRAYFORMULA que emite o cabeçalho na linha 1 e o cálculo nas demais."""
    return '=ARRAYFORMULA(IF(ROW(A:A)=1;"{t}";IF({g}="";"";{c})))'.format(
        t=titulo, g=guarda, c=corpo)


# AE, AF — calculadas
CALCULADAS = [
    # o carimbo chega em ISO (2026-08-17T13:05:00.000Z); o dia serve para agrupar
    af("Dia", 'LEFT({c};10)'.format(c=CARIMBO)),
    af("Origem", 'IF({s}="";"direto";{s})'.format(s=SOURCE)),
]

CABECALHO = CAMPOS + CALCULADAS

# painel de leitura, fora do caminho dos dados (colunas AH a AK)
#
# ATENÇÃO: este script é o molde de uma planilha NOVA, não um espelho da que
# está no ar. A planilha em uso ganhou depois as colunas de clique no WhatsApp
# e as 26 colunas de jornada da Etapa 2, e o painel saiu de lá. Rodar isto por
# cima da planilha viva escreveria painel em cima do clique.
PAINEL = [
    ["PAINEL — atualiza sozinho", "", "", ""],
    ["", "", "", ""],
    ["Números gerais", "", "", ""],
    ["Leads recebidos", "=" + TOTAL, "", ""],
    # o Make grava "sim"/"não", não booleano: true/false vira VERDADEIRO no
    # locale pt-BR e a contagem quebraria dependendo de como o valor entrou
    ["Qualificados", '=COUNTIF({q};"sim")'.format(q=QUALIF), "", ""],
    ["% qualificados",
     '=IF({t}=0;"—";ROUND(100*COUNTIF({q};"sim")/{t};1)&"%")'.format(t=TOTAL, q=QUALIF),
     "", "Dono ≥ R$ 200 mil/mês, ou executivo com autonomia"],
    ["", "", "", ""],
    ["Cenário", "Leads", "% do total", "PDF correspondente"],
]
for i, c in enumerate(CENARIOS, start=1):
    PAINEL.append([c, '=COUNTIF({f};"{c}")'.format(f=CEN, c=c),
                   '=IF({t}=0;"—";ROUND(100*COUNTIF({f};"{c}")/{t};1)&"%")'.format(t=TOTAL, f=CEN, c=c),
                   "Diagnostico-0%d" % i])
PAINEL += [
    ["", "", "", ""],
    ["Por que não qualificou", "Leads", "", "Só conta quem foi reprovado"],
]
for motivo in ["faturamento abaixo de R$ 200 mil",
               "cargo fora do ICP (só diretor qualifica)",
               "sem autonomia para decidir investimento",
               "remuneração abaixo de R$ 20 mil"]:
    PAINEL.append([motivo, '=COUNTIF(%s;"%s")' % (MOTIVO, motivo), "", ""])

COMO_LER = [
    "",
    "COMO LER",
    "Uma linha por lead que concluiu o quiz. Quem abandona no meio não aparece: o envio "
    "só acontece quando o formulário de contato é enviado.",
    "",
    "Telefone (55) é o número normalizado, e é ele que vai na URL da Etapa 2. WhatsApp digitado "
    "guarda o que o lead escreveu, para conferir quando algo não casar.",
    "Qualificado (sim/não) e Motivo já vêm calculados da página. Não recalcule aqui.",
    "As colunas de utm dizem de qual anúncio o lead veio. Vazias = tráfego direto ou link sem "
    "parâmetro.",
    "",
    "PARA QUEM FOR MEXER NA INTEGRAÇÃO",
    "O Make escreve as colunas A a AD POR POSIÇÃO. Se você inserir, remover ou reordenar coluna "
    "aqui, o cenário passa a gravar dado na coluna errada e não avisa.",
    "AE e AF são fórmula na linha 1 e valem para a planilha toda. Não digite por cima e não "
    "apague a linha 1.",
    "",
    "Esta planilha tem dado pessoal de lead. Não deixe o compartilhamento como "
    "'qualquer pessoa com o link'.",
]
for texto in COMO_LER:
    PAINEL.append([texto, "", "", ""])

VAZIO_ATE_PAINEL = [""] * (len(CABECALHO) + 1)   # A até AG

w = csv.writer(sys.stdout, lineterminator="\n")
w.writerow(CABECALHO + [""] + PAINEL[0])
for linha in PAINEL[1:]:
    w.writerow(VAZIO_ATE_PAINEL + linha)
