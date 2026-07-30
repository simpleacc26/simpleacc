import { NextResponse, type NextRequest } from "next/server";
import { COOKIE, hashSenha } from "./lib/auth";

// Se APP_SENHA não estiver configurada, o app fica aberto (útil em dev).
export async function middleware(req: NextRequest) {
  const senha = process.env.APP_SENHA;
  if (!senha) return NextResponse.next();

  const { pathname } = req.nextUrl;
  if (pathname === "/login" || pathname === "/api/entrar") return NextResponse.next();

  const cookie = req.cookies.get(COOKIE)?.value;
  if (cookie && cookie === (await hashSenha(senha))) return NextResponse.next();

  if (pathname.startsWith("/api/")) {
    return NextResponse.json({ erro: "nao_autorizado" }, { status: 401 });
  }
  const url = req.nextUrl.clone();
  url.pathname = "/login";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
