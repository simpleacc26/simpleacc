export const COOKIE = "simpleacc_indicacoes";

/** Hash da senha compartilhada — é o valor guardado no cookie. */
export async function hashSenha(senha: string) {
  const dados = new TextEncoder().encode(`simpleacc:${senha}`);
  const buf = await crypto.subtle.digest("SHA-256", dados);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
