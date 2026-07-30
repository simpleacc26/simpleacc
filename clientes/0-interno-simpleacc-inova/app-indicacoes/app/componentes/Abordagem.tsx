"use client";

import { PRIORIDADES, corPrioridade, rotuloPrioridade, type Dados, type Salvar } from "@/lib/tipos";
import { CampoTexto, linkWhatsapp, Ponto } from "./ui";

const ORDEM: Record<string, number> = { alta: 1, media: 2, baixa: 3, nao_abordar: 4 };

export default function Abordagem({ dados, salvar }: { dados: Dados; salvar: Salvar }) {
  const salvarNota = (chave: string, valor: string) => salvar("/api/notas", "PUT", { chave, valor });

  // Etapa 2: sequência de contato conforme prioridade da carteira.
  const fila = dados.clientes
    .filter((c) => c.prioridade !== "nao_abordar" && c.status === "pendente")
    .sort((a, b) => ORDEM[a.prioridade] - ORDEM[b.prioridade] || a.nome.localeCompare(b.nome));

  const modelo = dados.notas.mensagem_whatsapp ?? "";

  return (
    <div className="space-y-5">
      <section className="cartao">
        <h2 className="font-serif text-lg text-navy">Mensagem base de WhatsApp</h2>
        <p className="mt-1 text-xs text-slate-500">
          Use <code className="rounded bg-gelo px-1">{"{{nome}}"}</code> onde entra o primeiro nome do
          cliente. É esta mensagem que abre já preenchida ao clicar em “WhatsApp” na carteira. Sempre
          que fizer sentido, troque o texto por um <strong>áudio personalizado</strong>.
        </p>
        <CampoTexto
          valor={modelo}
          onSalvar={(v) => salvarNota("mensagem_whatsapp", v)}
          multilinha
          rows={9}
          className="mt-3 text-[13px]"
        />
        <p className="mt-1 text-xs text-slate-400">O texto salva quando você clica fora do campo.</p>
      </section>

      <section className="cartao">
        <h2 className="font-serif text-lg text-navy">Pitch de abordagem</h2>
        <p className="mt-1 text-xs text-slate-500">
          O roteiro do que falar — principalmente nos áudios e nas conversas por telefone.
        </p>
        <CampoTexto
          valor={dados.notas.pitch ?? ""}
          onSalvar={(v) => salvarNota("pitch", v)}
          multilinha
          rows={14}
          className="mt-3 text-[13px]"
        />
      </section>

      <section className="cartao">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="font-serif text-lg text-navy">Fila de contato</h2>
          <p className="text-xs text-slate-500">
            {fila.length} cliente{fila.length === 1 ? "" : "s"} pendente
            {fila.length === 1 ? "" : "s"}, em ordem de prioridade
          </p>
        </div>
        <p className="mt-1 text-xs text-slate-500">
          Comece de cima. Ao registrar a resposta na carteira, o cliente sai desta fila.
        </p>

        {fila.length === 0 ? (
          <p className="mt-3 text-sm text-slate-500">
            Nenhum cliente pendente — ou a carteira ainda não foi mapeada.
          </p>
        ) : (
          <ol className="mt-3 divide-y divide-slate-100">
            {fila.map((c, idx) => {
              const zap = linkWhatsapp(c.telefone, c.nome, modelo);
              return (
                <li key={c.id} className="flex items-center gap-3 py-2">
                  <span className="w-6 shrink-0 text-right text-xs tabular-nums text-slate-400">
                    {idx + 1}
                  </span>
                  <Ponto cor={corPrioridade(c.prioridade)} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-navy">{c.nome}</p>
                    <p className="truncate text-xs text-slate-500">
                      {rotuloPrioridade(c.prioridade)}
                      {c.empresa ? ` · ${c.empresa}` : ""}
                    </p>
                  </div>
                  {zap ? (
                    <a
                      href={zap}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="botao-claro shrink-0"
                    >
                      WhatsApp
                    </a>
                  ) : (
                    <span className="shrink-0 text-xs text-slate-400">sem telefone</span>
                  )}
                </li>
              );
            })}
          </ol>
        )}
      </section>

      <section className="cartao">
        <h2 className="font-serif text-lg text-navy">Aprendizados</h2>
        <p className="mt-1 text-xs text-slate-500">
          Etapa 5 — o que funcionou, o que não funcionou e o que muda na próxima rodada.
        </p>
        <CampoTexto
          valor={dados.notas.aprendizados ?? ""}
          onSalvar={(v) => salvarNota("aprendizados", v)}
          multilinha
          rows={8}
          className="mt-3 text-[13px]"
        />
      </section>

      <section className="cartao">
        <h2 className="font-serif text-lg text-navy">Critérios de classificação</h2>
        <ul className="mt-3 space-y-2">
          {PRIORIDADES.map((p) => (
            <li key={p.valor} className="flex gap-2 text-sm text-slate-700">
              <span className="mt-1.5">
                <Ponto cor={p.cor} />
              </span>
              <span>
                <strong className="text-navy">{p.rotulo}:</strong> {p.criterio}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
