import { NextResponse, type NextRequest } from "next/server";
import { SemBanco, sql } from "@/lib/db";

export const dynamic = "force-dynamic";

/** Textos livres da ação: pitch, mensagem_whatsapp, aprendizados. */
export async function PUT(req: NextRequest) {
  try {
    const s = await sql();
    const body = await req.json();
    const chave = String(body.chave ?? "");
    if (!chave) return NextResponse.json({ erro: "chave_obrigatoria" }, { status: 400 });
    await s`insert into notas (chave, valor) values (${chave}, ${String(body.valor ?? "")})
            on conflict (chave) do update set valor = excluded.valor`;
    return NextResponse.json({ ok: true });
  } catch (e) {
    if (e instanceof SemBanco) return NextResponse.json({ erro: "sem_banco" }, { status: 503 });
    console.error(e);
    return NextResponse.json({ erro: "falha", detalhe: String(e) }, { status: 500 });
  }
}
