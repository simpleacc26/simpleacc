"use client";

import { useCallback, useEffect, useState } from "react";
import type { Dados } from "@/lib/tipos";
import Painel from "./componentes/Painel";
import Carteira from "./componentes/Carteira";
import Indicacoes from "./componentes/Indicacoes";
import Abordagem from "./componentes/Abordagem";
import SemBancoAviso from "./componentes/SemBancoAviso";

const ABAS = [
  { id: "painel", rotulo: "Painel" },
  { id: "carteira", rotulo: "Carteira" },
  { id: "indicacoes", rotulo: "Indicações" },
  { id: "abordagem", rotulo: "Abordagem" },
] as const;

type Aba = (typeof ABAS)[number]["id"];

export default function Home() {
  const [dados, setDados] = useState<Dados | null>(null);
  const [estado, setEstado] = useState<"carregando" | "ok" | "sem_banco" | "erro">("carregando");
  const [pendentes, setPendentes] = useState(0);
  const [aba, setAba] = useState<Aba>("painel");

  // A aba fica na URL: recarregar ou mandar o link não perde o lugar.
  useEffect(() => {
    const daUrl = window.location.hash.replace("#", "");
    if (ABAS.some((a) => a.id === daUrl)) setAba(daUrl as Aba);
  }, []);

  function trocarAba(nova: Aba) {
    setAba(nova);
    history.replaceState(null, "", `#${nova}`);
  }

  const recarregar = useCallback(async () => {
    try {
      const res = await fetch("/api/dados", { cache: "no-store" });
      if (res.status === 503) return setEstado("sem_banco");
      if (!res.ok) return setEstado("erro");
      setDados(await res.json());
      setEstado("ok");
    } catch {
      setEstado("erro");
    }
  }, []);

  useEffect(() => {
    recarregar();
  }, [recarregar]);

  // Recarrega ao voltar para a aba do navegador — assim quem abriu de manhã
  // vê o que a outra pessoa lançou.
  useEffect(() => {
    function aoVoltar() {
      if (document.visibilityState === "visible") recarregar();
    }
    document.addEventListener("visibilitychange", aoVoltar);
    return () => document.removeEventListener("visibilitychange", aoVoltar);
  }, [recarregar]);

  /** Executa uma alteração e recarrega os dados. */
  const salvar = useCallback(
    async (caminho: string, metodo: string, corpo?: unknown) => {
      setPendentes((n) => n + 1);
      try {
        await fetch(caminho, {
          method: metodo,
          headers: corpo ? { "content-type": "application/json" } : undefined,
          body: corpo ? JSON.stringify(corpo) : undefined,
        });
        await recarregar();
      } finally {
        setPendentes((n) => n - 1);
      }
    },
    [recarregar]
  );

  return (
    <div className="min-h-screen">
      <header className="bg-navy">
        <div className="mx-auto max-w-6xl px-4 pt-5 pb-0 sm:px-6">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-aco-claro">
                Simple Acc · ação interna
              </p>
              <h1 className="mt-1 font-serif text-xl text-white sm:text-2xl">
                Levantamento de indicações da base
              </h1>
            </div>
            <p className="text-xs text-aco-claro">
              {pendentes > 0 ? "Salvando…" : estado === "ok" ? "Tudo salvo" : ""}
            </p>
          </div>

          <nav className="mt-4 flex gap-1 overflow-x-auto">
            {ABAS.map((a) => (
              <button
                key={a.id}
                onClick={() => trocarAba(a.id)}
                className={`shrink-0 rounded-t-lg px-3 py-2.5 text-sm font-medium transition sm:px-4 ${
                  aba === a.id
                    ? "bg-gelo text-navy"
                    : "text-aco-claro hover:bg-navy-2 hover:text-white"
                }`}
              >
                {a.rotulo}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        {estado === "carregando" && <p className="text-sm text-slate-500">Carregando…</p>}
        {estado === "sem_banco" && <SemBancoAviso />}
        {estado === "erro" && (
          <div className="cartao">
            <p className="text-sm text-[#A8433A]">
              Não foi possível carregar os dados. Recarregue a página; se continuar, avise no grupo.
            </p>
          </div>
        )}

        {estado === "ok" && dados && (
          <>
            {aba === "painel" && <Painel dados={dados} salvar={salvar} irPara={trocarAba} />}
            {aba === "carteira" && <Carteira dados={dados} salvar={salvar} />}
            {aba === "indicacoes" && <Indicacoes dados={dados} salvar={salvar} />}
            {aba === "abordagem" && <Abordagem dados={dados} salvar={salvar} />}
          </>
        )}
      </main>

      <footer className="mx-auto max-w-6xl px-4 pb-8 text-xs text-slate-400 sm:px-6">
        Plano de ação de 28/07/2026 · os dados ficam no banco, atualize hoje e nos próximos dias.
      </footer>
    </div>
  );
}
