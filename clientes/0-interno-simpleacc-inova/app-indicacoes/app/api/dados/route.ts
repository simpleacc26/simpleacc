import { NextResponse } from "next/server";
import { SemBanco, sql } from "@/lib/db";
import type { Cliente, Indicacao, Tarefa } from "@/lib/tipos";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const s = await sql();

    const clientes = (await s`
      select id, nome, empresa, telefone, prioridade, motivo, status,
             to_char(data_abordagem, 'YYYY-MM-DD') as data_abordagem,
             responsavel, notas
      from clientes
      order by case prioridade
                 when 'alta' then 1 when 'media' then 2
                 when 'baixa' then 3 else 4 end,
               nome`) as Cliente[];

    const indicacoes = (await s`
      select id, cliente_id, cliente_nome, nome, contato, responsavel,
             status_comercial, convertido, notas
      from indicacoes
      order by id desc`) as Indicacao[];

    const tarefas = (await s`
      select id, titulo, etapa, to_char(prazo, 'YYYY-MM-DD') as prazo, feito, ordem
      from tarefas
      order by ordem`) as Tarefa[];

    const linhas = (await s`select chave, valor from notas`) as { chave: string; valor: string }[];
    const notas = Object.fromEntries(linhas.map((l) => [l.chave, l.valor]));

    return NextResponse.json({ clientes, indicacoes, tarefas, notas });
  } catch (e) {
    if (e instanceof SemBanco) return NextResponse.json({ erro: "sem_banco" }, { status: 503 });
    console.error(e);
    return NextResponse.json({ erro: "falha", detalhe: String(e) }, { status: 500 });
  }
}
