"use client";

import { useMemo, useState } from "react";
import {
  PRIORIDADES,
  STATUS_ABORDAGEM,
  corPrioridade,
  rotuloPrioridade,
  rotuloStatus,
  type Cliente,
  type Dados,
  type Prioridade,
  type Salvar,
  type StatusAbordagem,
} from "@/lib/tipos";
import { baixarCsv, CampoTexto, linkWhatsapp, Ponto, Seletor } from "./ui";

const TODOS = "todos";

export default function Carteira({ dados, salvar }: { dados: Dados; salvar: Salvar }) {
  const [busca, setBusca] = useState("");
  const [filtroPrioridade, setFiltroPrioridade] = useState<string>(TODOS);
  const [filtroStatus, setFiltroStatus] = useState<string>(TODOS);
  const [aberto, setAberto] = useState<number | null>(null);
  const [lista, setLista] = useState("");
  const [prioridadeLista, setPrioridadeLista] = useState<Prioridade>("media");
  const [mostrarCriterios, setMostrarCriterios] = useState(false);
  const [enviandoLista, setEnviandoLista] = useState(false);

  const visiveis = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    return dados.clientes.filter((c) => {
      if (filtroPrioridade !== TODOS && c.prioridade !== filtroPrioridade) return false;
      if (filtroStatus !== TODOS && c.status !== filtroStatus) return false;
      if (!termo) return true;
      return `${c.nome} ${c.empresa}`.toLowerCase().includes(termo);
    });
  }, [dados.clientes, busca, filtroPrioridade, filtroStatus]);

  async function adicionarLista() {
    const texto = lista.trim();
    if (!texto) return;
    setEnviandoLista(true);
    try {
      await salvar("/api/clientes", "POST", { lista: texto, prioridade: prioridadeLista });
      setLista("");
    } finally {
      setEnviandoLista(false);
    }
  }

  function exportar() {
    baixarCsv(
      "carteira-indicacoes.csv",
      ["Cliente", "Empresa", "Telefone", "Prioridade", "Motivo", "Status", "Data da abordagem", "Responsável", "Notas"],
      dados.clientes.map((c) => [
        c.nome,
        c.empresa,
        c.telefone,
        rotuloPrioridade(c.prioridade),
        c.motivo,
        rotuloStatus(c.status),
        c.data_abordagem ?? "",
        c.responsavel,
        c.notas,
      ])
    );
  }

  return (
    <div className="space-y-5">
      {/* Etapa 1 — inserir os clientes */}
      <section className="cartao">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="font-serif text-lg text-navy">Inserir clientes</h2>
          <button
            onClick={() => setMostrarCriterios((v) => !v)}
            className="text-xs font-medium text-aco underline underline-offset-2"
          >
            {mostrarCriterios ? "esconder critérios" : "ver critérios de classificação"}
          </button>
        </div>
        <p className="mt-1 text-xs text-slate-500">
          Um cliente por linha. Se quiser, informe também empresa e telefone separados por ponto e
          vírgula: <code className="rounded bg-gelo px-1">Maria Souza; Clínica X; 41999998888</code>
        </p>

        {mostrarCriterios && (
          <ul className="mt-3 space-y-2 rounded-lg bg-gelo p-3">
            {PRIORIDADES.map((p) => (
              <li key={p.valor} className="flex gap-2 text-xs text-slate-700">
                <span className="mt-1">
                  <Ponto cor={p.cor} />
                </span>
                <span>
                  <strong className="text-navy">{p.rotulo}:</strong> {p.criterio}
                </span>
              </li>
            ))}
          </ul>
        )}

        <textarea
          value={lista}
          onChange={(e) => setLista(e.target.value)}
          rows={4}
          placeholder={"João Pereira\nMaria Souza; Clínica X; 41999998888"}
          className="campo mt-3 font-mono text-[13px]"
        />
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-500">Entram como:</span>
          <Seletor
            valor={prioridadeLista}
            onMudar={setPrioridadeLista}
            descricao="Prioridade dos clientes desta lista"
            opcoes={PRIORIDADES.map((p) => ({ valor: p.valor, rotulo: p.rotulo }))}
            className="w-auto"
          />
          <button onClick={adicionarLista} disabled={enviandoLista || !lista.trim()} className="botao">
            {enviandoLista ? "Adicionando…" : "Adicionar à carteira"}
          </button>
          <button onClick={exportar} className="botao-claro ml-auto">
            Baixar CSV
          </button>
        </div>
      </section>

      {/* Filtros */}
      <section className="flex flex-wrap items-center gap-2">
        <input
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Buscar cliente"
          aria-label="Buscar cliente"
          className="campo w-auto min-w-[180px] flex-1"
        />
        <Seletor
          valor={filtroPrioridade}
          onMudar={setFiltroPrioridade}
          descricao="Filtrar por prioridade"
          opcoes={[
            { valor: TODOS, rotulo: "Todas as prioridades" },
            ...PRIORIDADES.map((p) => ({ valor: p.valor as string, rotulo: p.rotulo })),
          ]}
          className="w-auto"
        />
        <Seletor
          valor={filtroStatus}
          onMudar={setFiltroStatus}
          descricao="Filtrar por status"
          opcoes={[
            { valor: TODOS, rotulo: "Todos os status" },
            ...STATUS_ABORDAGEM.map((s) => ({ valor: s.valor as string, rotulo: s.rotulo })),
          ]}
          className="w-auto"
        />
        <span className="text-xs text-slate-500">
          {visiveis.length} de {dados.clientes.length}
        </span>
      </section>

      {/* Lista */}
      <section className="space-y-2">
        {visiveis.map((c) => (
          <LinhaCliente
            key={c.id}
            cliente={c}
            dados={dados}
            salvar={salvar}
            aberto={aberto === c.id}
            alternar={() => setAberto(aberto === c.id ? null : c.id)}
          />
        ))}
        {visiveis.length === 0 && dados.clientes.length > 0 && (
          <p className="text-sm text-slate-500">Nenhum cliente com esses filtros.</p>
        )}
      </section>
    </div>
  );
}

function LinhaCliente({
  cliente: c,
  dados,
  salvar,
  aberto,
  alternar,
}: {
  cliente: Cliente;
  dados: Dados;
  salvar: Salvar;
  aberto: boolean;
  alternar: () => void;
}) {
  const [novaIndicacao, setNovaIndicacao] = useState({ nome: "", contato: "" });
  const minhas = dados.indicacoes.filter((i) => i.cliente_id === c.id);
  const modelo = dados.notas.mensagem_whatsapp ?? "";
  const zap = linkWhatsapp(c.telefone, c.nome, modelo);

  const patch = (campos: Partial<Cliente>) => salvar("/api/clientes", "PATCH", { id: c.id, ...campos });

  async function registrarIndicacao() {
    if (!novaIndicacao.nome.trim()) return;
    await salvar("/api/indicacoes", "POST", { cliente_id: c.id, ...novaIndicacao });
    setNovaIndicacao({ nome: "", contato: "" });
  }

  return (
    <article data-cliente={c.nome} className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="grid gap-2 p-3 sm:grid-cols-[minmax(0,1fr)_160px_200px_auto] sm:items-center">
        <div className="flex min-w-0 items-center gap-2">
          <Ponto cor={corPrioridade(c.prioridade)} />
          <div className="min-w-0">
            <CampoTexto
              valor={c.nome}
              onSalvar={(v) => patch({ nome: v })}
              rotulo="Nome do cliente"
              className="!border-transparent !px-1 font-medium hover:!border-slate-300"
            />
            {c.empresa && <p className="px-1 text-xs text-slate-500">{c.empresa}</p>}
          </div>
        </div>

        <Seletor
          valor={c.prioridade}
          onMudar={(v) => patch({ prioridade: v as Prioridade })}
          opcoes={PRIORIDADES.map((p) => ({ valor: p.valor, rotulo: p.rotulo }))}
          descricao={`Prioridade de ${c.nome}`}
        />
        <Seletor
          valor={c.status}
          onMudar={(v) => patch({ status: v as StatusAbordagem })}
          opcoes={STATUS_ABORDAGEM}
          descricao={`Status da abordagem de ${c.nome}`}
        />

        <div className="flex items-center gap-1.5">
          {zap ? (
            <a
              href={zap}
              target="_blank"
              rel="noopener noreferrer"
              title="Abrir conversa no WhatsApp com a mensagem base"
              className="botao-claro whitespace-nowrap"
            >
              WhatsApp
            </a>
          ) : (
            <span className="px-1 text-xs text-slate-400" title="Cadastre o telefone para liberar">
              sem telefone
            </span>
          )}
          <button onClick={alternar} className="botao-claro whitespace-nowrap">
            {aberto ? "Fechar" : "Detalhes"}
            {minhas.length > 0 && (
              <span className="ml-1.5 rounded bg-navy px-1.5 py-0.5 text-[11px] text-white">
                {minhas.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {aberto && (
        <div className="border-t border-slate-200 bg-gelo/60 p-3">
          <div className="grid gap-3 sm:grid-cols-3">
            <div>
              <p className="rotulo">Empresa</p>
              <CampoTexto valor={c.empresa} onSalvar={(v) => patch({ empresa: v })} />
            </div>
            <div>
              <p className="rotulo">Telefone (com DDD)</p>
              <CampoTexto
                valor={c.telefone}
                onSalvar={(v) => patch({ telefone: v })}
                placeholder="41999998888"
              />
            </div>
            <div>
              <p className="rotulo">Responsável pelo contato</p>
              <CampoTexto valor={c.responsavel} onSalvar={(v) => patch({ responsavel: v })} />
            </div>
            <div>
              <p className="rotulo">Data da abordagem</p>
              <input
                type="date"
                value={c.data_abordagem ?? ""}
                onChange={(e) => patch({ data_abordagem: e.target.value })}
                className="campo"
              />
            </div>
            <div className="sm:col-span-2">
              <p className="rotulo">Motivo da classificação</p>
              <CampoTexto
                valor={c.motivo}
                onSalvar={(v) => patch({ motivo: v })}
                placeholder="Por que este cliente está nessa prioridade"
              />
            </div>
            <div className="sm:col-span-3">
              <p className="rotulo">Resposta / observações</p>
              <CampoTexto
                valor={c.notas}
                onSalvar={(v) => patch({ notas: v })}
                multilinha
                rows={2}
                placeholder="O que o cliente respondeu, combinados, retorno agendado…"
              />
            </div>
          </div>

          <div className="mt-4 border-t border-slate-200 pt-3">
            <p className="rotulo">Indicações deste cliente</p>
            {minhas.length > 0 && (
              <ul className="mt-2 space-y-1">
                {minhas.map((i) => (
                  <li key={i.id} className="text-sm text-navy">
                    {i.nome}
                    {i.contato && <span className="text-slate-500"> · {i.contato}</span>}
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-2 flex flex-wrap gap-2">
              <input
                value={novaIndicacao.nome}
                onChange={(e) => setNovaIndicacao({ ...novaIndicacao, nome: e.target.value })}
                placeholder="Nome do indicado"
                className="campo w-auto min-w-[160px] flex-1"
              />
              <input
                value={novaIndicacao.contato}
                onChange={(e) => setNovaIndicacao({ ...novaIndicacao, contato: e.target.value })}
                placeholder="Contato"
                className="campo w-auto min-w-[140px] flex-1"
              />
              <button onClick={registrarIndicacao} disabled={!novaIndicacao.nome.trim()} className="botao">
                Registrar indicação
              </button>
            </div>
          </div>

          <button
            onClick={() => {
              if (confirm(`Remover ${c.nome} da carteira?`)) salvar(`/api/clientes?id=${c.id}`, "DELETE");
            }}
            className="mt-4 text-xs text-[#A8433A] underline underline-offset-2"
          >
            Remover cliente
          </button>
        </div>
      )}
    </article>
  );
}
