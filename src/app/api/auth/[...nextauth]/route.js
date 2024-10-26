import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { URLSearchParams } from 'url';

const APIURL = process.env.NEXT_PUBLIC_API_URL;
let event_id = ""

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
          event_id = credentials?.event_id

          const user = await res.json();

          if (res.ok && user) {
            return {
              accessToken: user.access_token,      
              refreshToken: user.refresh_token,
              tokenType: user.token_type,
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
    signIn: `/auth/login?event_id=${event_id}`,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.tokenType = user.tokenType;
        token.accessTokenExpires = Date.now() + 30 * 60 * 1000;
      }

      if (Date.now() > token.accessTokenExpires) {
        try {
          const response = await fetch(`${APIURL}/users/refresh-token`, {
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
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.tokenType = token.tokenType;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 60,
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
