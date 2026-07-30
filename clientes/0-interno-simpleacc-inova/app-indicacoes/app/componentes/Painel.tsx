"use client";

import { PRIORIDADES, type Dados, type Salvar } from "@/lib/tipos";
import { Barra, Caixa, Numero, Ponto } from "./ui";

function hoje() {
  return new Date().toISOString().slice(0, 10);
}

function formatarPrazo(prazo: string | null) {
  if (!prazo) return "";
  const [a, m, d] = prazo.split("-");
  return `${d}/${m}/${a.slice(2)}`;
}

export default function Painel({
  dados,
  salvar,
  irPara,
}: {
  dados: Dados;
  salvar: Salvar;
  irPara: (aba: "carteira" | "indicacoes" | "abordagem") => void;
}) {
  const { clientes, indicacoes, tarefas } = dados;

  const elegiveis = clientes.filter((c) => c.prioridade !== "nao_abordar");
  const abordados = elegiveis.filter((c) => c.status !== "pendente");
  const indicaram = clientes.filter((c) => c.status === "indicou");
  const depois = clientes.filter((c) => c.status === "indicar_depois");
  const convertidos = indicacoes.filter((i) => i.convertido);
  const taxa = abordados.length > 0 ? Math.round((indicaram.length / abordados.length) * 100) : 0;

  const etapas = [...new Set(tarefas.map((t) => t.etapa))];
  const hojeStr = hoje();

  return (
    <div className="space-y-6">
      {clientes.length === 0 && (
        <div className="cartao border-aco/40 bg-white">
          <p className="rotulo">Comece por aqui</p>
          <h2 className="mt-1.5 font-serif text-xl text-navy">Etapa 1 — mapear a carteira</h2>
          <p className="mt-2 text-sm text-slate-600">
            Ainda não há nenhum cliente na base. Vá em <strong>Carteira</strong>, cole a lista dos
            clientes ativos e classifique cada um por potencial de indicação.
          </p>
          <button onClick={() => irPara("carteira")} className="botao mt-4">
            Abrir a carteira
          </button>
        </div>
      )}

      <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Numero
          rotulo="Carteira mapeada"
          valor={clientes.length}
          apoio={`${elegiveis.length} elegíveis para abordar`}
        />
        <Numero
          rotulo="Abordados"
          valor={`${abordados.length}/${elegiveis.length}`}
          apoio={`${elegiveis.length - abordados.length} ainda pendente${
            elegiveis.length - abordados.length === 1 ? "" : "s"
          }`}
        />
        <Numero
          rotulo="Indicações levantadas"
          valor={indicacoes.length}
          apoio={
            indicaram.length === 1 ? "1 cliente indicou" : `${indicaram.length} clientes indicaram`
          }
        />
        <Numero
          rotulo="Clientes convertidos"
          valor={convertidos.length}
          apoio={`taxa de indicação: ${taxa}%`}
        />
      </section>

      <section className="cartao">
        <div className="flex items-baseline justify-between">
          <h2 className="font-serif text-lg text-navy">Progresso da abordagem</h2>
          <p className="text-xs text-slate-500">
            {abordados.length} de {elegiveis.length} clientes elegíveis
          </p>
        </div>
        <div className="mt-3">
          <Barra parte={abordados.length} total={elegiveis.length} />
        </div>

        <div className="mt-5 space-y-3">
          {PRIORIDADES.map((p) => {
            const doGrupo = clientes.filter((c) => c.prioridade === p.valor);
            const feitos = doGrupo.filter((c) => c.status !== "pendente");
            return (
              <div key={p.valor} className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1">
                <div className="flex items-center gap-2">
                  <Ponto cor={p.cor} />
                  <span className="text-sm text-navy">{p.rotulo}</span>
                </div>
                <span className="text-sm tabular-nums text-slate-500">
                  {p.valor === "nao_abordar"
                    ? `${doGrupo.length} cliente${doGrupo.length === 1 ? "" : "s"}`
                    : `${feitos.length}/${doGrupo.length} abordados`}
                </span>
                {/* "Não abordar" não tem progresso a acompanhar — só a contagem. */}
                {p.valor !== "nao_abordar" && (
                  <div className="col-span-2">
                    <Barra parte={feitos.length} total={doGrupo.length} cor={p.cor} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {depois.length > 0 && (
          <p className="mt-5 border-t border-slate-200 pt-3 text-sm text-slate-600">
            <strong>{depois.length}</strong> cliente{depois.length === 1 ? "" : "s"} pediu para
            indicar depois — vale um retorno na próxima semana.
          </p>
        )}
      </section>

      <section className="cartao">
        <h2 className="font-serif text-lg text-navy">Cronograma</h2>
        <p className="mt-1 text-xs text-slate-500">Marque conforme for concluindo.</p>

        <div className="mt-4 space-y-5">
          {etapas.map((etapa) => (
            <div key={etapa}>
              <p className="rotulo">{etapa}</p>
              <ul className="mt-2 space-y-1.5">
                {tarefas
                  .filter((t) => t.etapa === etapa)
                  .map((t) => {
                    const atrasada = !t.feito && t.prazo && t.prazo < hojeStr;
                    return (
                      <li key={t.id} className="flex items-start gap-2.5">
                        <Caixa
                          marcado={t.feito}
                          onMudar={(feito) => salvar("/api/tarefas", "PATCH", { id: t.id, feito })}
                          descricao={t.titulo}
                          className="mt-0.5"
                        />
                        <span
                          className={`text-sm ${
                            t.feito ? "text-slate-400 line-through" : "text-navy"
                          }`}
                        >
                          {t.titulo}
                        </span>
                        {t.prazo && (
                          <span
                            className={`ml-auto shrink-0 whitespace-nowrap text-xs ${
                              atrasada ? "font-medium text-[#A8433A]" : "text-slate-500"
                            }`}
                          >
                            {atrasada ? "atrasada · " : ""}
                            {formatarPrazo(t.prazo)}
                          </span>
                        )}
                      </li>
                    );
                  })}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
