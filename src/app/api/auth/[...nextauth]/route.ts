import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/lib/mongodb";
import User from "@/models/user";
import bcrypt from "bcrypt";

const options = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        // Connect to the database
        await dbConnect();

        // Find user by email
        const user = await User.findOne({ email: credentials?.email });

        if (!user) {
          // No user found
          return null;
        }

        // Compare the provided password with the hashed password
        const isPasswordValid = await bcrypt.compare(
          credentials?.password,
          user.password
        );

        if (!isPasswordValid) {
          // Invalid password
          return null;
        }

        // Return the user with the correct type and role (e.g., "learner" or "instructor")
        return {
          id: user.id, // Cast MongoDB ObjectId to string
          name: user.name,
          email: user.email,
          role: user.role, // Return the actual role, either "learner" or "instructor"
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, token }: { session: any; token: any }) {
      session.user.role = token.role;
      session.user.id = token.sub; // Attach the user ID to the session
      return session;
    },
    async jwt({ token, user }: { token: any; user?: any }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/signin", // Optional custom sign-in page
    error: "/auth/error", // Optional error page
  },
};

const handler = NextAuth(options);

export { handler as GET, handler as POST };
