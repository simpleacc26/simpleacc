/**
 * Configuração embutida no deploy — usada apenas quando as variáveis de
 * ambiente não estão definidas.
 *
 * ESTE ARQUIVO FICA VAZIO NO GIT, DE PROPÓSITO. Segredo não se commita.
 *
 * O projeto atual na Vercel foi publicado direto (sem ligação com o
 * repositório) e, por esse caminho, não dá para gravar variável de ambiente —
 * então a versão publicada tem estes campos preenchidos.
 *
 * O jeito certo, e que tem prioridade sobre este arquivo, é definir
 * `DATABASE_URL` e `APP_SENHA` em Settings → Environment Variables na Vercel.
 * Feito isso, este arquivo deixa de ter qualquer efeito.
 */
export const SEGREDOS: { DATABASE_URL?: string; APP_SENHA?: string } = {};
