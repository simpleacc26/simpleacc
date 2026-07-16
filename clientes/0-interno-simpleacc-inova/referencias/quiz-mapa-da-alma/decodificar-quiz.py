#!/usr/bin/env python3
"""Decodifica a config de um funil inlead.digital a partir da URL pública.

A inlead entrega o funil ofuscado + cifrado (AES/CryptoJS) dentro de
<script id="__NEXT_DATA__">. Este script reproduz a de-ofuscação e a
decifragem para recuperar o JSON completo do funil.

Uso:
    python3 decodificar-quiz.py https://quizmapa19.raphatarso.com.br/ > funil.json

Requer: pycryptodome  (pip install pycryptodome)
"""
import sys, json, re, base64, hashlib, urllib.request
from Crypto.Cipher import AES

UA = ("Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) "
      "AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1")

# Constantes do de-ofuscador (extraídas do bundle da inlead).
ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
OFFSETS  = [0, 3, 1, 5]   # d
G        = [1, 2, 3, 1]
F        = [0, 7, 13, 31]
SIGN     = [1, -1, 1, -1] # p


def deobfuscate(payload: str):
    """q -> (conteudo_base64, chave_aes). Espelha w[q[0]%4](q.slice(1))."""
    fn = ord(payload[0]) % len(OFFSETS)
    e = payload[1:]
    t = OFFSETS[fn]
    r = e[t:t + 8]
    a = int(r[0], 36)
    o = int(r[1], 36)
    l = int(r[2:4], 36)
    u = sum(ord(c) for c in r[4:8])
    i = l + a * o + (u % 5 + 2)
    c = e[t + 8:t + 8 + i]
    key = ""
    for x in range(a):
        tt = l + (x if SIGN[fn] > 0 else a - 1 - x) * o
        rr = (u + x * G[fn] + F[fn]) % 62
        key += ALPHABET[((ALPHABET.index(c[tt]) - rr) % 62 + 62) % 62]
    return e[t + 8 + i:], key


def crypto_js_decrypt(b64: str, passphrase: str) -> bytes:
    raw = base64.b64decode(b64)
    assert raw[:8] == b"Salted__", "payload não é CryptoJS Salted__"
    salt, body = raw[8:16], raw[16:]
    d = b""
    prev = b""
    while len(d) < 48:  # 32 bytes key + 16 bytes IV via MD5 (EVP_BytesToKey)
        prev = hashlib.md5(prev + passphrase.encode() + salt).digest()
        d += prev
    key, iv = d[:32], d[32:48]
    pt = AES.new(key, AES.MODE_CBC, iv).decrypt(body)
    return pt[:-pt[-1]]  # remove PKCS7 padding


def main(url: str):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    html = urllib.request.urlopen(req, timeout=30).read().decode("utf-8")
    m = re.search(r'<script id="__NEXT_DATA__"[^>]*>(.*?)</script>', html, re.S)
    data = json.loads(m.group(1))
    pp = data["props"]["pageProps"]
    content, key = deobfuscate(pp["q"])
    funnel = json.loads(crypto_js_decrypt(content, key))
    json.dump(funnel, sys.stdout, ensure_ascii=False, indent=2)


if __name__ == "__main__":
    if len(sys.argv) != 2:
        sys.exit("uso: python3 decodificar-quiz.py <URL do funil inlead>")
    main(sys.argv[1])
