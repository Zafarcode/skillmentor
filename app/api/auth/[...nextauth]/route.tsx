import axiosInstance from "@/lib/axios";
import { CustomUser } from "@/types/next-auth";
import NextAuth, { AuthOptions, Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null; // If credentials are not provided, return null
        }

        try {
          const response = await axiosInstance.post("/auth/login", credentials);

          const data = response.data;

          if (response.status === 200 && data.access) {
            return {
              ...data.user,
              accessToken: data.access,
              refreshToken: data.refresh,
            };
          } else {
            throw new Error("Invalid credentials");
          }
        } catch (error) {
          console.error("Error during login:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: CustomUser | User | undefined }) {
      if (user && (user as CustomUser).accessToken) {
        token.accessToken = (user as CustomUser).accessToken;
        token.refreshToken = (user as CustomUser).refreshToken;
        token.user = user as CustomUser;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      session.user = token.user as CustomUser; // Assuming `user` exists on `token`
      session.accessToken = token.accessToken; // Assuming `accessToken` exists on `token`
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

// The NextAuth handler function
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
