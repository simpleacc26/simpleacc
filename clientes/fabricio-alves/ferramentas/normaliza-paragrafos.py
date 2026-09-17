import io, re, sys

def normaliza(texto):
    linhas = texto.split('\n')
    out, buf = [], []
    def despeja():
        if buf:
            out.append(' '.join(x.strip() for x in buf))
            buf.clear()
    rotulo = re.compile(r'^\*\*[^*]{1,40}:\*\*')
    for l in linhas:
        s = l.rstrip()
        if not s.strip():
            despeja(); out.append(''); continue
        if rotulo.match(s):
            # rotulo abre um paragrafo proprio, mas a linha pode continuar embaixo
            despeja(); buf.append(s.strip()); continue
        if s.startswith('#') or s.startswith('- ') or s.startswith('---'):
            despeja(); out.append(s.strip()); continue
        buf.append(s)
    despeja()
    # rotulo sempre comeca paragrafo proprio: linha em branco antes dele
    comrot = []
    for l in out:
        if rotulo.match(l) and comrot and comrot[-1] != '':
            comrot.append('')
        comrot.append(l)
    out = comrot
    # no maximo uma linha em branco seguida
    limpo, anterior_vazia = [], False
    for l in out:
        vazia = (l == '')
        if vazia and anterior_vazia: continue
        limpo.append(l); anterior_vazia = vazia
    # garante linha em branco antes e depois de titulo e antes de lista
    final = []
    for i, l in enumerate(limpo):
        if l.startswith('#') and final and final[-1] != '':
            final.append('')
        if l.startswith('- ') and final and final[-1] != '' and not final[-1].startswith('- '):
            final.append('')
        final.append(l)
        if l.startswith('#'):
            final.append('')
    saida, anterior_vazia = [], False
    for l in final:
        vazia = (l == '')
        if vazia and anterior_vazia: continue
        saida.append(l); anterior_vazia = vazia
    return '\n'.join(saida).strip() + '\n'

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print('uso: python3 normaliza-paragrafos.py <arquivo.md> [outro.md ...]')
        raise SystemExit(1)
    for caminho in sys.argv[1:]:
        texto = io.open(caminho, encoding='utf-8').read()
        saida = caminho[:-3] + '-final.md' if caminho.endswith('.md') else caminho + '-final'
        io.open(saida, 'w', encoding='utf-8').write(normaliza(texto))
        print(saida, '->', len(normaliza(texto).split()), 'palavras')
