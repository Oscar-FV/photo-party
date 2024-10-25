import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import jwt from "jsonwebtoken";
import { URLSearchParams } from 'url';

const APIURL = process.env.NEXT_PUBLIC_API_URL;

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials) {
        try {
          // Crear el cuerpo de la solicitud en formato x-www-form-urlencoded
          const formBody = new URLSearchParams();
          formBody.append("username", credentials?.email || ""); // FastAPI espera el campo "username"
          formBody.append("password", credentials?.password || "");

          const res = await fetch(`${APIURL}/users/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: formBody.toString(),
          });

          const user = await res.json();

          if (res.ok && user) {
            return user; // Se retorna el usuario recibido del backend
          }

          return null;
        } catch (error) {
          console.error("Error en la autorización", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login", // Página personalizada para login
  },
  callbacks: {
    async jwt({ token, user }) {
      // Si el usuario inicia sesión por primera vez
      if (user) {
        token.accessToken = user.jwt; // Guarda el accessToken del backend
        token.refreshToken = user.refreshToken; // Guarda el refreshToken
        token.accessTokenExpires = Date.now() + 30 * 60 * 1000; // Configura la expiración (30 minutos)
      }

      // Si el token ha expirado, refresca el accessToken
      if (Date.now() > token.accessTokenExpires) {
        try {
          const response = await fetch(`${APIURL}/users/refresh-token`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              refreshToken: token.refreshToken,
            }),
          });

          const refreshedTokens = await response.json();
          token.accessToken = refreshedTokens.jwt;
          token.refreshToken = refreshedTokens.refreshToken;
          token.accessTokenExpires = Date.now() + 30 * 60 * 1000; // Nueva expiración del accessToken
        } catch (error) {
          console.error("Error al refrescar el token", error);
        }
      }

      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 60, // La sesión dura 30 minutos, lo mismo que el JWT
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
