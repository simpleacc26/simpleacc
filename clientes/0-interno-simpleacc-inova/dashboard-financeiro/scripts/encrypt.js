#!/usr/bin/env node
/**
 * Cifra o dados.json -> dados.enc com a senha do dashboard (AES-256-GCM).
 *
 * Só o arquivo cifrado (dados.enc) vai para o repositório e para a Vercel; o
 * plaintext nunca sai daqui. O navegador descriptografa com a senha via Web
 * Crypto (PBKDF2-SHA256 + AES-GCM, mesmos parâmetros).
 *
 * Uso:  DASHBOARD_PASSWORD=... node scripts/encrypt.js
 */
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const ITER = 600000;
const HERE = __dirname;

const pw = (process.env.DASHBOARD_PASSWORD || '').trim();
if (!pw) {
  console.error('ERRO: defina DASHBOARD_PASSWORD (senha do dashboard).');
  process.exit(1);
}

const plaintext = fs.readFileSync(path.join(HERE, '..', 'dados.json'));
const salt = crypto.randomBytes(16);
const iv = crypto.randomBytes(12);
const key = crypto.pbkdf2Sync(pw, salt, ITER, 32, 'sha256');

const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
const ct = Buffer.concat([cipher.update(plaintext), cipher.final()]);
const tag = cipher.getAuthTag();
const ctTag = Buffer.concat([ct, tag]); // Web Crypto espera ciphertext||tag

const out = {
  v: 1,
  iter: ITER,
  salt: salt.toString('base64'),
  iv: iv.toString('base64'),
  ct: ctTag.toString('base64'),
};
fs.writeFileSync(path.join(HERE, '..', 'dados.enc'), JSON.stringify(out));
console.log('OK: dados.enc cifrado (' + plaintext.length + ' bytes, ' + ITER + ' iteracoes)');
