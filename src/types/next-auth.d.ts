import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string; // Add accessToken to the Session type
    user?: {
      id: string;
      name: string;
      email: string;
      image?: string;
      role: "instructor" | "learner";
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    role: "instructor" | "learner";
  }
}
