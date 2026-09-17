#!/usr/bin/env python3
"""Sincronizacao diaria do dashboard financeiro.

Baixa a planilha 'DFC e DRE Financeiro Simple Acc' do Google Drive e regenera o
dados.json. Pensado para rodar no GitHub Actions
(.github/workflows/atualiza-dashboard-financeiro.yml), mas tambem roda local.

Dois modos de download:

1) LINK PUBLICO (padrao, sem credencial) — a planilha precisa estar como
   "qualquer pessoa com o link pode ver". Baixa via export=download.
   Variavel: DRIVE_FILE_ID (default: o da planilha atual).

2) CONTA DE SERVICO (privado) — se GOOGLE_SERVICE_ACCOUNT_JSON estiver definido,
   usa a Drive API e a planilha pode continuar privada (compartilhada com a
   conta de servico). Requer google-api-python-client/google-auth.

Depois do download, gera dados.json. A cifragem (dados.enc) e feita em
scripts/encrypt.js (Node), chamado pelo workflow.
"""
import os, sys, json, io, datetime, urllib.request

DEFAULT_FILE_ID = '1nJa5mKqcGDIdZCzzpb3Vf94DbzKl5frZ'
HERE = os.path.dirname(__file__)


def baixar_publico(file_id, dest):
    url = 'https://drive.google.com/uc?export=download&id=' + file_id
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req, timeout=60) as r:
        data = r.read()
    # planilhas pequenas baixam direto; se vier HTML de confirmacao, falha claro
    if data[:15].lower().startswith(b'<!doctype html') or data[:6] == b'<html>':
        sys.exit('ERRO: download retornou HTML. A planilha esta como '
                 '"qualquer pessoa com o link pode ver"? (id=%s)' % file_id)
    with open(dest, 'wb') as f:
        f.write(data)
    print('Baixado (link publico): %d bytes' % len(data))


def baixar_conta_servico(file_id, dest):
    from google.oauth2 import service_account
    from googleapiclient.discovery import build
    from googleapiclient.http import MediaIoBaseDownload
    info = json.loads(os.environ['GOOGLE_SERVICE_ACCOUNT_JSON'])
    creds = service_account.Credentials.from_service_account_info(
        info, scopes=['https://www.googleapis.com/auth/drive.readonly'])
    svc = build('drive', 'v3', credentials=creds)
    buf = io.BytesIO()
    dl = MediaIoBaseDownload(buf, svc.files().get_media(fileId=file_id))
    done = False
    while not done:
        _, done = dl.next_chunk()
    with open(dest, 'wb') as f:
        f.write(buf.getvalue())
    print('Baixado (conta de servico): %d bytes' % buf.tell())


def main():
    sys.path.insert(0, HERE)
    from extract import extrair

    file_id = os.environ.get('DRIVE_FILE_ID', DEFAULT_FILE_ID)
    tmp = os.path.join(HERE, 'dfc_dre.xlsm')

    if os.environ.get('GOOGLE_SERVICE_ACCOUNT_JSON', '').strip():
        baixar_conta_servico(file_id, tmp)
    else:
        baixar_publico(file_id, tmp)

    out = extrair(tmp, gerado_em=datetime.date.today().isoformat())
    dest = os.path.join(HERE, '..', 'dados.json')
    with open(dest, 'w', encoding='utf-8') as f:
        json.dump(out, f, ensure_ascii=False, indent=1)
    print('OK: %d lancamentos -> dados.json (%s)' % (len(out['lancamentos']), out['gerado_em']))

    try:
        os.remove(tmp)
    except OSError:
        pass


if __name__ == '__main__':
    main()
