import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { URLSearchParams } from 'url';

const APIURL = process.env.NEXT_PUBLIC_API_URL;

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials) {
        try {
          const formBody = new URLSearchParams();
          formBody.append("username", credentials?.email || "");
          formBody.append("password", credentials?.password || "");

          const res = await fetch(`${APIURL}/users/login?event_id=${credentials?.event_id}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: formBody.toString(),
          });

          const user = await res.json();

          if (res.ok && user) {
            return {
              accessToken: user.access_token,
              refreshToken: user.refresh_token,
              tokenType: user.token_type,
              event_id: credentials.event_id, // Guardar event_id en el token de usuario
            };
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
    signIn: "/auth/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      // Al inicio de sesión, guarda el event_id junto con los tokens
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.tokenType = user.tokenType;
        token.event_id = user.event_id; // Guardar event_id en el token
        token.accessTokenExpires = Date.now() + 30 * 60 * 1000; // Expira en 30 minutos
      }

      // Si el token ha expirado, refrescar el accessToken
      if (Date.now() > token.accessTokenExpires) {
        try {
          const response = await fetch(`${APIURL}/users/refresh-token?event_id=${token.event_id}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              refresh_token: token.refreshToken,
            }),
          });

          const refreshedTokens = await response.json();
          token.accessToken = refreshedTokens.access_token;
          token.refreshToken = refreshedTokens.refresh_token;
          token.tokenType = refreshedTokens.token_type;
          token.accessTokenExpires = Date.now() + 30 * 60 * 1000;
        } catch (error) {
          console.error("Error al refrescar el token", error);
        }
      }

      return token;
    },
    async session({ session, token }) {
      // Pasar event_id al objeto de sesión
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.tokenType = token.tokenType;
      session.event_id = token.event_id; // Incluir event_id en la sesión
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 60, // La sesión dura 30 minutos, igual que el JWT
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
