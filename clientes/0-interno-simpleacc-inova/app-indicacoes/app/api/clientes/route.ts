import { NextResponse, type NextRequest } from "next/server";
import { SemBanco, sql } from "@/lib/db";

export const dynamic = "force-dynamic";

function erro(e: unknown) {
  if (e instanceof SemBanco) return NextResponse.json({ erro: "sem_banco" }, { status: 503 });
  console.error(e);
  return NextResponse.json({ erro: "falha", detalhe: String(e) }, { status: 500 });
}

/** Campo ausente no corpo = não mexe; string vazia = limpa. */
function opcional(body: Record<string, unknown>, campo: string) {
  return campo in body ? String(body[campo] ?? "") : null;
}

/**
 * Cria um cliente ({ nome, ... }) ou vários de uma vez ({ lista }).
 * Na lista, cada linha é "Nome; empresa; telefone" — só o nome é obrigatório.
 */
export async function POST(req: NextRequest) {
  try {
    const s = await sql();
    const body = await req.json();

    if (typeof body.lista === "string") {
      const linhas: string[] = body.lista
        .split("\n")
        .map((l: string) => l.trim())
        .filter(Boolean);
      let criados = 0;
      for (const linha of linhas) {
        const partes = linha.split(/[;\t|]/).map((p) => p.trim());
        const nome = partes[0];
        if (!nome) continue;
        await s`insert into clientes (nome, empresa, telefone, prioridade)
                values (${nome}, ${partes[1] ?? ""}, ${partes[2] ?? ""},
                        ${String(body.prioridade ?? "media")})`;
        criados++;
      }
      return NextResponse.json({ criados });
    }

    const nome = String(body.nome ?? "").trim();
    if (!nome) return NextResponse.json({ erro: "nome_obrigatorio" }, { status: 400 });
    const [cliente] = (await s`
      insert into clientes (nome, empresa, telefone, prioridade, motivo, responsavel)
      values (${nome}, ${String(body.empresa ?? "")}, ${String(body.telefone ?? "")},
              ${String(body.prioridade ?? "media")}, ${String(body.motivo ?? "")},
              ${String(body.responsavel ?? "")})
      returning id`) as { id: number }[];
    return NextResponse.json({ id: cliente.id });
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
      update clientes set
        nome        = coalesce(${opcional(body, "nome")}::text, nome),
        empresa     = coalesce(${opcional(body, "empresa")}::text, empresa),
        telefone    = coalesce(${opcional(body, "telefone")}::text, telefone),
        prioridade  = coalesce(${opcional(body, "prioridade")}::text, prioridade),
        motivo      = coalesce(${opcional(body, "motivo")}::text, motivo),
        status      = coalesce(${opcional(body, "status")}::text, status),
        responsavel = coalesce(${opcional(body, "responsavel")}::text, responsavel),
        notas       = coalesce(${opcional(body, "notas")}::text, notas)
      where id = ${id}`;

    if ("data_abordagem" in body) {
      const valor = body.data_abordagem ? String(body.data_abordagem) : null;
      await s`update clientes set data_abordagem = ${valor}::date where id = ${id}`;
    }

    // Ao marcar como abordado, registra a data automaticamente se estiver vazia.
    if (body.status && body.status !== "pendente") {
      await s`update clientes set data_abordagem = current_date
              where id = ${id} and data_abordagem is null`;
    }

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
    await s`delete from clientes where id = ${id}`;
    return NextResponse.json({ ok: true });
  } catch (e) {
    return erro(e);
  }
}
