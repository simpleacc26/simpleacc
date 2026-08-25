/* ============================================================
   PROXY DO LEAD · função serverless na Vercel

   Por que existe: a chamada saía do navegador do lead direto para o n8n do HDM.
   Isso obrigava a chave X-Api-Key a viajar no JavaScript da página, onde
   qualquer visitante lê no devtools, e deixava a entrega refém do CORS do
   cliente. Aqui o navegador chama /api/lead (mesma origem, sem CORS) e ESTA
   função anexa a chave e encaminha.

   A chave vive na variável de ambiente HDM_CRM_API_KEY, cadastrada no painel da
   Vercel. Não está no Git e não chega ao navegador.

   Conferir sem expor a chave:
     curl https://quiz-evandro-fernandes.vercel.app/api/lead
   Responde { chaveConfigurada: true|false }, sem devolver o valor.
   ============================================================ */

const crypto = require("crypto");

const DESTINO = "https://n8n.digienge.ai/webhook/quizzreceitainvisivel";

module.exports = async (req, res) => {
  // GET = diagnóstico. Serve para saber se a variável de ambiente chegou,
  // sem precisar disparar um lead de teste no CRM do cliente.
  if (req.method === "GET") {
    const chave = process.env.HDM_CRM_API_KEY || "";
    return res.status(200).json({
      ok: true,
      destino: DESTINO,
      chaveConfigurada: Boolean(chave),
      // Impressão digital, não a chave. Enquanto a trava do HDM estiver
      // desligada o endpoint aceita qualquer coisa, então um POST 200 NÃO prova
      // que a chave está certa: um espaço colado junto passaria despercebido até
      // ligarem a trava e os leads sumirem. Estes três campos comparam com o
      // valor esperado sem nunca devolver o segredo.
      tamanho: chave.length,
      temEspacoNasPontas: chave !== chave.trim(),
      digital: chave
        ? crypto.createHash("sha256").update(chave).digest("hex").slice(0, 12)
        : null,
    });
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", "GET, POST");
    return res.status(405).json({ erro: "Método não permitido" });
  }

  const headers = { "Content-Type": "application/json" };
  // Sem a variável, encaminha sem autenticação: é o que o endpoint do HDM
  // aceita enquanto a trava dele estiver desligada. Assim ligar a chave e
  // ligar a trava podem acontecer em momentos diferentes, sem perder lead.
  if (process.env.HDM_CRM_API_KEY) {
    headers["X-Api-Key"] = process.env.HDM_CRM_API_KEY;
  }

  try {
    const resposta = await fetch(DESTINO, {
      method: "POST",
      headers,
      body: JSON.stringify(req.body || {}),
    });
    const corpo = await resposta.text();
    // Repassa o status real do n8n. Se o HDM religar a trava e a chave aqui
    // estiver errada, isso aparece como 403 no log da Vercel em vez de sumir.
    return res.status(resposta.status).send(corpo);
  } catch (erro) {
    console.error("[lead] falha ao encaminhar para o CRM do HDM:", erro);
    return res.status(502).json({ erro: "Falha ao encaminhar para o CRM" });
  }
};
