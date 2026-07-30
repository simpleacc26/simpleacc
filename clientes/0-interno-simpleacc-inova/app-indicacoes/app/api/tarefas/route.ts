import { NextResponse, type NextRequest } from "next/server";
import { SemBanco, sql } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function PATCH(req: NextRequest) {
  try {
    const s = await sql();
    const body = await req.json();
    const id = Number(body.id);
    if (!id) return NextResponse.json({ erro: "id_obrigatorio" }, { status: 400 });
    await s`update tarefas set feito = ${Boolean(body.feito)}::boolean where id = ${id}`;
    return NextResponse.json({ ok: true });
  } catch (e) {
    if (e instanceof SemBanco) return NextResponse.json({ erro: "sem_banco" }, { status: 503 });
    console.error(e);
    return NextResponse.json({ erro: "falha", detalhe: String(e) }, { status: 500 });
  }
}
