import { AuthOptions } from "next-auth";
import bcrypt from "bcrypt";
import prisma from "./prismaDB";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { type: "email", value: "email" },
        password: { type: "password", value: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });

        if (!user || !user.hashedPassword) {
          throw new Error("User not found");
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials?.password,
          user.hashedPassword
        );

        if (!isCorrectPassword) {
          throw new Error("Password is incorrect");
        }

        return user;
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
  },
};
