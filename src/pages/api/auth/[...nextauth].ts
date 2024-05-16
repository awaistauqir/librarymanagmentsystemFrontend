import { LOGIN } from "@/api";

import { NextApiRequest, NextApiResponse } from "next";
import nextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "abc@vu.edu.pk",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials, req) {
        // Validate email and password presence
        if (!credentials?.email || !credentials?.password) {
          return null; // Indicate failed credentials
        }

        const { email, password } = credentials;

        try {
          const response = await fetch(LOGIN, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }), // Send credentials in body
          });

          if (!response.ok) {
            // Check for HTTP errors
            const error: Error = await response.json();
            throw new Error(error.message);
          }

          const data = await response.json(); // Parse JSON response

          // Check for successful login based on your backend API's response structure
          if (response.ok && data?.user) {
            return data;
          } else {
            throw new Error(data.message as string);
          }
        } catch (error) {
          throw new Error(error as string);
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/500",
  },

  callbacks: {
    async jwt({ token, user, account }) {
      // console.log("token-> ", token);
      // console.log("user-> ", user);
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session = token as any;
      // console.log("session-> ", session);
      if (!session.access_token) {
        return {
          ...session,
          error: "Session expired, please log in again.", // Optionally you can provide an error message
          redirect: {
            destination: "/login",
            permanent: false, // Set to true if you want to use a 301 redirect instead of a 302
          },
        };
      }

      return session;
    },
  },
};

export default (req: NextApiRequest, res: NextApiResponse) =>
  nextAuth(req, res, authOptions);
