import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  // const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // // Si el token no existe y la ruta es protegida, redirigir al login
  // if (!token && req.nextUrl.pathname.startsWith("/guests")) {
  //   const loginUrl = new URL("/auth/login", req.url);
  //   return NextResponse.redirect(loginUrl);
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/guests/:path*"], // Aplica el middleware a todas las rutas bajo /guests
};
