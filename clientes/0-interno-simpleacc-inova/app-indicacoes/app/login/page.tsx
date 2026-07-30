"use client";

import { useState } from "react";

export default function Login() {
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [enviando, setEnviando] = useState(false);

  async function entrar(e: React.FormEvent) {
    e.preventDefault();
    setEnviando(true);
    setErro("");
    const res = await fetch("/api/entrar", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ senha }),
    });
    if (res.ok) {
      window.location.href = "/";
      return;
    }
    setErro("Senha incorreta.");
    setEnviando(false);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-navy px-5">
      <form onSubmit={entrar} className="w-full max-w-sm rounded-xl bg-white p-7 shadow-xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-aco">Simple Acc</p>
        <h1 className="mt-2 font-serif text-2xl text-navy">Levantamento de indicações</h1>
        <p className="mt-2 text-sm text-slate-500">Acesso restrito ao time.</p>
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder="Senha"
          autoFocus
          className="mt-5 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-navy outline-none focus:border-aco"
        />
        {erro && <p className="mt-2 text-sm text-[#A8433A]">{erro}</p>}
        <button
          type="submit"
          disabled={enviando}
          className="mt-4 w-full rounded-lg bg-navy py-2.5 font-medium text-white transition hover:bg-navy-2 disabled:opacity-50"
        >
          {enviando ? "Entrando…" : "Entrar"}
        </button>
      </form>
    </main>
  );
}
