/* ============================================================
   CONFIG · modelo versionado. NÃO tem chave de verdade.

   Para rodar/publicar com a chave: copie este arquivo para
   `config.local.js` e cole o valor real. O `config.local.js` está no
   .gitignore e nunca entra no Git (regra do manual da Simple).

       cp config.example.js config.local.js

   Onde pegar a chave: com o Evandro (grupo do WhatsApp), ou baixando o
   arquivo que já está publicado:

       curl https://quiz-evandro-fernandes.vercel.app/config.local.js

   O `index.html` carrega este arquivo ANTES do `app.js`. Se ele não
   existir, o funil continua funcionando e manda o lead sem o header de
   autenticação (que é o que o endpoint do HDM aceita hoje), e avisa no
   console do navegador.
   ============================================================ */
window.HDM_CONFIG = {
  // Header X-Api-Key do webhook do HDM (n8n). Vazio = envia sem autenticação.
  crmApiKey: "",
};
