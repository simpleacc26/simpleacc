"use client";

import { useMemo, useState } from "react";
import {
  STATUS_COMERCIAL,
  type Dados,
  type Indicacao,
  type Salvar,
  type StatusComercial,
} from "@/lib/tipos";
import { baixarCsv, Caixa, CampoTexto, Seletor } from "./ui";

const TODOS = "todos";
const AVULSO = "0";

export default function Indicacoes({ dados, salvar }: { dados: Dados; salvar: Salvar }) {
  const [nova, setNova] = useState({ cliente_id: AVULSO, cliente_nome: "", nome: "", contato: "", responsavel: "" });
  const [filtro, setFiltro] = useState<string>(TODOS);
  const [enviando, setEnviando] = useState(false);

  const visiveis = useMemo(
    () => dados.indicacoes.filter((i) => filtro === TODOS || i.status_comercial === filtro),
    [dados.indicacoes, filtro]
  );

  const convertidas = dados.indicacoes.filter((i) => i.convertido).length;
  const emAndamento = dados.indicacoes.filter(
    (i) => !i.convertido && i.status_comercial !== "perdido"
  ).length;

  async function adicionar() {
    if (!nova.nome.trim()) return;
    setEnviando(true);
    try {
      await salvar("/api/indicacoes", "POST", {
        cliente_id: nova.cliente_id === AVULSO ? null : Number(nova.cliente_id),
        cliente_nome: nova.cliente_id === AVULSO ? nova.cliente_nome : "",
        nome: nova.nome,
        contato: nova.contato,
        responsavel: nova.responsavel,
      });
      setNova({ cliente_id: AVULSO, cliente_nome: "", nome: "", contato: "", responsavel: "" });
    } finally {
      setEnviando(false);
    }
  }

  function exportar() {
    baixarCsv(
      "indicacoes.csv",
      ["Indicado", "Contato", "Quem indicou", "Responsável", "Status comercial", "Convertido", "Notas"],
      dados.indicacoes.map((i) => [
        i.nome,
        i.contato,
        i.cliente_nome,
        i.responsavel,
        STATUS_COMERCIAL.find((s) => s.valor === i.status_comercial)?.rotulo ?? i.status_comercial,
        i.convertido ? "Sim" : "Não",
        i.notas,
      ])
    );
  }

  return (
    <div className="space-y-5">
      <section className="cartao">
        <h2 className="font-serif text-lg text-navy">Registrar indicação</h2>
        <p className="mt-1 text-xs text-slate-500">
          Ao escolher quem indicou, o cliente passa automaticamente para o status “Indicou”.
        </p>

        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <div>
            <p className="rotulo">Quem indicou</p>
            <Seletor
              valor={nova.cliente_id}
              onMudar={(v) => setNova({ ...nova, cliente_id: v })}
              opcoes={[
                { valor: AVULSO, rotulo: "Outro / fora da carteira" },
                ...dados.clientes.map((c) => ({ valor: String(c.id), rotulo: c.nome })),
              ]}
            />
          </div>
          {nova.cliente_id === AVULSO && (
            <div>
              <p className="rotulo">Nome de quem indicou (opcional)</p>
              <input
                value={nova.cliente_nome}
                onChange={(e) => setNova({ ...nova, cliente_nome: e.target.value })}
                className="campo"
              />
            </div>
          )}
          <div>
            <p className="rotulo">Nome do indicado</p>
            <input
              value={nova.nome}
              onChange={(e) => setNova({ ...nova, nome: e.target.value })}
              className="campo"
            />
          </div>
          <div>
            <p className="rotulo">Contato</p>
            <input
              value={nova.contato}
              onChange={(e) => setNova({ ...nova, contato: e.target.value })}
              placeholder="Telefone ou e-mail"
              className="campo"
            />
          </div>
          <div>
            <p className="rotulo">Responsável pelo atendimento</p>
            <input
              value={nova.responsavel}
              onChange={(e) => setNova({ ...nova, responsavel: e.target.value })}
              className="campo"
            />
          </div>
        </div>

        <button onClick={adicionar} disabled={enviando || !nova.nome.trim()} className="botao mt-3">
          {enviando ? "Salvando…" : "Adicionar indicação"}
        </button>
      </section>

      <section className="flex flex-wrap items-center gap-2">
        <Seletor
          valor={filtro}
          onMudar={setFiltro}
          descricao="Filtrar por status comercial"
          opcoes={[
            { valor: TODOS, rotulo: "Todos os status" },
            ...STATUS_COMERCIAL.map((s) => ({ valor: s.valor as string, rotulo: s.rotulo })),
          ]}
          className="w-auto"
        />
        <span className="text-xs text-slate-500">
          {dados.indicacoes.length} indicações · {emAndamento} em andamento · {convertidas} convertidas
        </span>
        <button onClick={exportar} className="botao-claro ml-auto">
          Baixar CSV
        </button>
      </section>

      <section className="space-y-2">
        {visiveis.map((i) => (
          <LinhaIndicacao key={i.id} indicacao={i} salvar={salvar} />
        ))}
        {dados.indicacoes.length === 0 && (
          <p className="text-sm text-slate-500">
            Nenhuma indicação registrada ainda. Elas também podem ser lançadas direto no cliente, na
            aba Carteira.
          </p>
        )}
        {dados.indicacoes.length > 0 && visiveis.length === 0 && (
          <p className="text-sm text-slate-500">Nenhuma indicação com esse status.</p>
        )}
      </section>
    </div>
  );
}

function LinhaIndicacao({ indicacao: i, salvar }: { indicacao: Indicacao; salvar: Salvar }) {
  const patch = (campos: Partial<Indicacao>) =>
    salvar("/api/indicacoes", "PATCH", { id: i.id, ...campos });

  return (
    <article className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
      <div className="grid gap-2 sm:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_180px_auto] sm:items-center">
        <div className="min-w-0">
          <CampoTexto
            valor={i.nome}
            onSalvar={(v) => patch({ nome: v })}
            rotulo="Nome do indicado"
            className="!border-transparent !px-1 font-medium hover:!border-slate-300"
          />
          <p className="px-1 text-xs text-slate-500">
            {i.cliente_nome ? `indicado por ${i.cliente_nome}` : "sem origem registrada"}
          </p>
        </div>
        <CampoTexto valor={i.contato} onSalvar={(v) => patch({ contato: v })} placeholder="Contato" />
        <Seletor
          valor={i.status_comercial}
          onMudar={(v) => patch({ status_comercial: v as StatusComercial })}
          opcoes={STATUS_COMERCIAL}
          descricao={`Status comercial de ${i.nome}`}
        />
        <label className="flex items-center gap-2 whitespace-nowrap text-sm text-navy">
          <Caixa
            marcado={i.convertido}
            onMudar={(convertido) => patch({ convertido })}
            descricao={`${i.nome} virou cliente`}
          />
          Convertido
        </label>
      </div>

      <div className="mt-2 grid gap-2 sm:grid-cols-[220px_minmax(0,1fr)_auto] sm:items-center">
        <CampoTexto
          valor={i.responsavel}
          onSalvar={(v) => patch({ responsavel: v })}
          placeholder="Responsável"
        />
        <CampoTexto valor={i.notas} onSalvar={(v) => patch({ notas: v })} placeholder="Observações" />
        <button
          onClick={() => {
            if (confirm(`Remover a indicação de ${i.nome}?`)) salvar(`/api/indicacoes?id=${i.id}`, "DELETE");
          }}
          className="justify-self-start text-xs text-[#A8433A] underline underline-offset-2"
        >
          Remover
        </button>
      </div>
    </article>
  );
}
