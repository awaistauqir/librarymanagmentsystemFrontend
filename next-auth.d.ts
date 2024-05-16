//next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      username: string;
      phone: string;
      roles: Array<{ name: string; id: string }>;
    };
    access_token: string;
  }
}
