import { NextResponse, type NextRequest } from "next/server";
import { SemBanco, sql } from "@/lib/db";

export const dynamic = "force-dynamic";

function erro(e: unknown) {
  if (e instanceof SemBanco) return NextResponse.json({ erro: "sem_banco" }, { status: 503 });
  console.error(e);
  return NextResponse.json({ erro: "falha", detalhe: String(e) }, { status: 500 });
}

function opcional(body: Record<string, unknown>, campo: string) {
  return campo in body ? String(body[campo] ?? "") : null;
}

export async function POST(req: NextRequest) {
  try {
    const s = await sql();
    const body = await req.json();
    const nome = String(body.nome ?? "").trim();
    if (!nome) return NextResponse.json({ erro: "nome_obrigatorio" }, { status: 400 });

    const clienteId = body.cliente_id ? Number(body.cliente_id) : null;
    let clienteNome = String(body.cliente_nome ?? "");
    if (clienteId && !clienteNome) {
      const [c] = (await s`select nome from clientes where id = ${clienteId}`) as { nome: string }[];
      clienteNome = c?.nome ?? "";
    }

    const [nova] = (await s`
      insert into indicacoes (cliente_id, cliente_nome, nome, contato, responsavel, notas)
      values (${clienteId}, ${clienteNome}, ${nome}, ${String(body.contato ?? "")},
              ${String(body.responsavel ?? "")}, ${String(body.notas ?? "")})
      returning id`) as { id: number }[];

    // Quem indicou passa automaticamente para o status "Indicou".
    if (clienteId) {
      await s`update clientes set status = 'indicou',
                data_abordagem = coalesce(data_abordagem, current_date)
              where id = ${clienteId}`;
    }

    return NextResponse.json({ id: nova.id });
  } catch (e) {
    return erro(e);
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const s = await sql();
    const body = await req.json();
    const id = Number(body.id);
    if (!id) return NextResponse.json({ erro: "id_obrigatorio" }, { status: 400 });

    await s`
      update indicacoes set
        nome             = coalesce(${opcional(body, "nome")}::text, nome),
        contato          = coalesce(${opcional(body, "contato")}::text, contato),
        responsavel      = coalesce(${opcional(body, "responsavel")}::text, responsavel),
        status_comercial = coalesce(${opcional(body, "status_comercial")}::text, status_comercial),
        notas            = coalesce(${opcional(body, "notas")}::text, notas),
        convertido       = coalesce(${
          "convertido" in body ? Boolean(body.convertido) : null
        }::boolean, convertido)
      where id = ${id}`;

    return NextResponse.json({ ok: true });
  } catch (e) {
    return erro(e);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const s = await sql();
    const id = Number(req.nextUrl.searchParams.get("id"));
    if (!id) return NextResponse.json({ erro: "id_obrigatorio" }, { status: 400 });
    await s`delete from indicacoes where id = ${id}`;
    return NextResponse.json({ ok: true });
  } catch (e) {
    return erro(e);
  }
}
