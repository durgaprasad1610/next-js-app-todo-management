import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "@/src/models/User";
import { connectDB } from "@/src/lib/db";

type AuthOptions = any;

export const authOptions = {
  session: {
    strategy: "jwt" as const,
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        try {
          await connectDB();

          if (!credentials?.email || !credentials?.password) {
            console.error("❌ Missing credentials");
            return null;
          }

          const email = credentials.email.toLowerCase().trim();
          console.log("🔍 Looking for user with email:", email);

          const user = await User.findOne({ email });
          
          if (!user) {
            console.error("❌ User not found:", email);
            return null;
          }

          console.log("✅ User found:", user.email);

          const valid = await bcrypt.compare(
            credentials.password,
            user.password
          );
          
          if (!valid) {
            console.error("❌ Invalid password for user:", email);
            return null;
          }

          console.log("✅ Password valid, returning user data");

          return {
            id: user._id.toString(),
            email: user.email,
            role: user.role,
          };
        } catch (error: any) {
          console.error("❌ Authorization error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }: { token: any; user?: any }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }: { session: any; token: any }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth",
    error: "/auth",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions as AuthOptions);
export { handler as GET, handler as POST };

