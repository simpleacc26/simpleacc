import { NextResponse, type NextRequest } from "next/server";
import { COOKIE, hashSenha } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const { senha } = await req.json();
  const esperada = process.env.APP_SENHA;
  if (!esperada) return NextResponse.json({ ok: true });
  if (String(senha ?? "") !== esperada) {
    return NextResponse.json({ erro: "senha_invalida" }, { status: 401 });
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE, await hashSenha(esperada), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 90,
  });
  return res;
}
