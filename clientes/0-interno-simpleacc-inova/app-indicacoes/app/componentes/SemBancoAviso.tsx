export default function SemBancoAviso() {
  return (
    <div className="cartao max-w-2xl">
      <p className="rotulo">Falta um passo</p>
      <h2 className="mt-1.5 font-serif text-xl text-navy">Conectar o banco de dados</h2>
      <p className="mt-2 text-sm text-slate-600">
        O app está no ar, mas ainda sem banco — por isso nada é salvo. São dois minutos, uma vez só:
      </p>
      <ol className="mt-4 space-y-2 text-sm text-slate-700">
        <li>
          <strong>1.</strong> Abra o projeto na Vercel → aba <strong>Storage</strong>.
        </li>
        <li>
          <strong>2.</strong> <strong>Create Database</strong> → <strong>Neon (Postgres)</strong> →
          plano gratuito.
        </li>
        <li>
          <strong>3.</strong> Em <strong>Connect Project</strong>, escolha este projeto. A Vercel cria
          a variável <code className="rounded bg-gelo px-1">DATABASE_URL</code> sozinha.
        </li>
        <li>
          <strong>4.</strong> Aba <strong>Deployments</strong> → <strong>Redeploy</strong> no último
          deploy.
        </li>
      </ol>
      <p className="mt-4 text-sm text-slate-600">
        Ao recarregar, as tabelas e o cronograma são criados automaticamente.
      </p>
    </div>
  );
}
