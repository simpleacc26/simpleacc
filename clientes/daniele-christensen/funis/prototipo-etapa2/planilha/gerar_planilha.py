# -*- coding: utf-8 -*-
"""
Gera o CSV que vira a planilha de respostas da Etapa 2 no Google Sheets.

    python3 gerar_planilha.py > etapa2-respostas.csv

O arquivo é importado no Drive como Google Sheets. As colunas calculadas
(V a AE) são ARRAYFORMULA na linha 1: valem para a planilha inteira e não
precisam ser arrastadas quando entram linhas novas.

Separador de argumento é ";" porque a conta do Drive está em pt-BR. Pelo mesmo
motivo as porcentagens são montadas com ROUND(...)&"%": a máscara do TEXT lê a
vírgula como separador de milhar e transformaria 12,5% em "125%".
"""

import csv, sys

PERGUNTAS = ["A1","A2","B1","B2","C1","C2","D1","D2","D3","D4","E1","E2","E3","E4","E5"]
NOMES = {"A":"Exigência e Responsabilização", "B":"Autonomia da Equipe e Execução",
         "C":"Reuniões e Prazos", "D":"Delegação e Maturidade do Time",
         "E":"Cultura, Alinhamento e Retenção"}
PONTE = [("O Adiador", "Bloco A (Exigência) e E4 (medo de ser impopular)"),
         ("O Gargalo", "Bloco B (Autonomia e o que fazemos agora?)"),
         ("Time que não Assume", "Bloco D (Delegação) e A2 (culpabilização externa)"),
         ("Plano que não Vira Execução", "Bloco C (Reuniões e Prazos) e D2 (confiança na meta)")]

# V W X Y Z = blocos | AA = TD | AB dominante | AC gargalo | AD hot | AE ponte
V, W, X, Y, Z, TD, DOM = "V:V", "W:W", "X:X", "Y:Y", "Z:Z", "AA:AA", "AB:AB"
ID, CEN = "B:B", "F:F"


def af(titulo, corpo, guarda=ID):
    """ARRAYFORMULA que emite o cabeçalho na linha 1 e o cálculo nas demais."""
    return '=ARRAYFORMULA(IF(ROW(A:A)=1;"{t}";IF({g}="";"";{c})))'.format(
        t=titulo, g=guarda, c=corpo)


def encadeia(campo, pares, senao='"—"'):
    if not pares:
        return senao
    valor, resultado = pares[0]
    return 'IF({c}="{v}";"{r}";{resto})'.format(
        c=campo, v=valor, r=resultado, resto=encadeia(campo, pares[1:], senao))


# maior nota entre os cinco blocos, comparando dois a dois (elementwise)
def maior():
    e = '"E"'
    def par(a, letra, b):   # a >= b ? letra : E
        return 'IF({a}>={b};"{l}";{e})'.format(a=a, b=b, l=letra, e=e)
    de = par(Y, "D", Z)
    ce = 'IF({x}>={y};{cz};{de})'.format(x=X, y=Y, cz=par(X, "C", Z), de=de)
    be = 'IF({w}>={x};IF({w}>={y};{bz};{de});{ce})'.format(
        w=W, x=X, y=Y, bz=par(W, "B", Z), de=de, ce=ce)
    ae = 'IF({v}>={x};IF({v}>={y};{az};{de});{ce})'.format(
        v=V, x=X, y=Y, az=par(V, "A", Z), de=de, ce=ce)
    return 'IF({v}>={w};{ae};{be})'.format(v=V, w=W, ae=ae, be=be)


CALCULADAS = [
    af("Bloco A", "ROUND((G:G+H:H)/2;2)"),
    af("Bloco B", "ROUND((I:I+J:J)/2;2)"),
    af("Bloco C", "ROUND((K:K+L:L)/2;2)"),
    af("Bloco D", "ROUND((M:M+N:N+O:O+P:P)/4;2)"),
    af("Bloco E", "ROUND((Q:Q+R:R+S:S+T:T+U:U)/5;2)"),
    af("TD", "ROUND(({v}+{w}+{x}+{y}+{z})/5;2)".format(v=V, w=W, x=X, y=Y, z=Z)),
    af("Bloco dominante", maior()),
    af("Onde está o gargalo", encadeia(DOM, [(l, NOMES[l]) for l in "ABCDE"])),
    af("Lead Hot", 'IF(({td}>8)+({v}=10)+({w}=10)+({y}=10)>0;"SIM";"não")'.format(
        td=TD, v=V, w=W, y=Y)),
    af("Abrir a call por", encadeia(CEN, PONTE), guarda=CEN),
]

CABECALHO = (["Carimbo", "ID do lead", "Nome", "WhatsApp", "E-mail", "Cenário (Etapa 1)"]
             + PERGUNTAS + CALCULADAS)

# duas linhas de exemplo, iguais aos atalhos "misto" e "dor alta" do protótipo
EXEMPLOS = [
    ["12/08/2026 14:30", "EXEMPLO-1", "APAGUE ESTA LINHA", "(11) 99999-0001",
     "exemplo@empresa.com.br", "O Adiador"] + [10,8,4,4,8,8,4,0,4,10,8,4,10,10,4],
    ["12/08/2026 15:10", "EXEMPLO-2", "APAGUE ESTA LINHA", "(11) 99999-0002",
     "exemplo2@empresa.com.br", "O Gargalo"] + [10,10,10,8,8,10,10,8,10,10,8,8,10,10,8],
]

# painel de leitura, fora do caminho dos dados (colunas AG a AJ)
PAINEL = [
    ["PAINEL — atualiza sozinho", "", "", ""],
    ["", "", "", ""],
    ["Números gerais", "", "", ""],
    ["Respostas recebidas", "=COUNT(AA:AA)", "", ""],
    ["TD médio", '=IF(COUNT(AA:AA)=0;"—";ROUND(AVERAGE(AA:AA);2))', "", ""],
    ["TD mais alto", '=IF(COUNT(AA:AA)=0;"—";MAX(AA:AA))', "", ""],
    ["TD mais baixo", '=IF(COUNT(AA:AA)=0;"—";MIN(AA:AA))', "", ""],
    ["Leads Hot", '=COUNTIF(AD:AD;"SIM")', "", ""],
    ["% de Leads Hot",
     '=IF(COUNT(AA:AA)=0;"—";ROUND(100*COUNTIF(AD:AD;"SIM")/COUNT(AA:AA);1)&"%")', "", ""],
    ["", "", "", ""],
    ["Média por bloco", "Nota", "", "Quanto mais alto, maior o gap"],
]
for l in "ABCDE":
    col = {"A": "V", "B": "W", "C": "X", "D": "Y", "E": "Z"}[l]
    PAINEL.append(["Bloco %s" % l,
                   '=IF(COUNT({c}:{c})=0;"—";ROUND(AVERAGE({c}:{c});2))'.format(c=col),
                   "", NOMES[l]])
PAINEL += [["", "", "", ""], ["Bloco dominante", "Leads", "% do total", "Por onde a call abre"]]
for l in "ABCDE":
    PAINEL.append(["Bloco %s" % l, '=COUNTIF(AB:AB;"%s")' % l,
                   '=IF(COUNT(AA:AA)=0;"—";ROUND(100*COUNTIF(AB:AB;"%s")/COUNT(AA:AA);1)&"%%")' % l,
                   NOMES[l]])
FAIXAS = [("Até 4,0", '=COUNTIFS(AA:AA;">=0";AA:AA;"<=4")', "Gestão sob controle. Venda difícil."),
          ("De 4,0 a 6,0", '=COUNTIFS(AA:AA;">4";AA:AA;"<=6")', "Incômodo real, sem urgência."),
          ("De 6,0 a 8,0", '=COUNTIFS(AA:AA;">6";AA:AA;"<=8")', "Dor clara. É o miolo do funil."),
          ("Acima de 8,0", '=COUNTIF(AA:AA;">8")', "Colapso operacional. Prioridade máxima.")]
PAINEL += [["", "", "", ""], ["Faixa de TD", "Leads", "", "O que significa"]]
for rot, f, obs in FAIXAS:
    PAINEL.append([rot, f, "", obs])
PAINEL += [["", "", "", ""], ["Cenário da Etapa 1", "Leads", "TD médio", "Blocos correspondentes"]]
for cen, ponte in PONTE:
    PAINEL.append([cen, '=COUNTIF(F:F;"%s")' % cen,
                   '=IFERROR(ROUND(AVERAGEIF(F:F;"%s";AA:AA);2);"—")' % cen, ponte])

COMO_LER = [
    "",
    "COMO LER",
    "ATENÇÃO: a escala é invertida. NOTA ALTA = PROBLEMA GRAVE.",
    "Sempre = 0 · Geralmente = 4 · Às vezes = 8 · Nunca = 10.",
    "As perguntas são positivas e a pontuação é invertida de propósito: ler nota alta como bom "
    "desempenho inverte o sentido da conversa inteira.",
    "",
    "TD = média dos cinco blocos. Bloco dominante = o de maior nota, e é por ele que a call abre, "
    "mesmo com TD médio: TD 5 com bloco A em 10 vende mais que TD 6 distribuído por igual.",
    "Lead Hot = TD acima de 8,0 OU nota 10 nos blocos A, B ou D.",
    "",
    "PARA QUEM FOR LIGAR O FORMULÁRIO AQUI",
    "O formulário escreve só as colunas A a U: identificação e as 15 notas.",
    "As colunas V a AE são fórmula na linha 1 e valem para a planilha toda. Não digite por cima "
    "e não apague a linha 1.",
    "As 15 notas precisam chegar como número (0, 4, 8 ou 10). Texto quebra o cálculo.",
    "O Cenário (Etapa 1) precisa vir escrito igual a um dos quatro, senão a última coluna fica vazia.",
    "",
    "As 15 perguntas, a ordem dos blocos e a escala são da Grokker. Não altere sem autorização.",
]
for texto in COMO_LER:
    PAINEL.append([texto, "", "", ""])

VAZIO_ATE_AG = [""] * 32          # A até AF

w = csv.writer(sys.stdout, lineterminator="\n")
w.writerow(CABECALHO + [""] + PAINEL[0])
for i, linha in enumerate(EXEMPLOS):
    resto = PAINEL[i + 1] if i + 1 < len(PAINEL) else ["", "", "", ""]
    w.writerow([str(c) for c in linha] + [""] * 11 + resto)
for linha in PAINEL[len(EXEMPLOS) + 1:]:
    w.writerow(VAZIO_ATE_AG + linha)
