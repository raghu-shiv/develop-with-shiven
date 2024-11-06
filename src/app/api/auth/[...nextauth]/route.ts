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

        try {
          const user = await User.findOne({ email: credentials?.email });

          if (!user) {
            throw new Error("No user found with this email");
          }

          // Compare the provided password with the hashed password
          const isPasswordValid = await bcrypt.compare(
            credentials?.password,
            user.password
          );

          if (!isPasswordValid) {
            throw new Error("Invalid password");
          }

          // Return the user with the correct type and role (e.g., "learner" or "instructor")
          return {
            id: user.id, // Cast MongoDB ObjectId to string
            name: user.name,
            email: user.email,
            role: user.role, // Return the actual role, either "learner" or "instructor"
          };
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }: { session: any; token: any }) {
      session.user.role = token.role;
      session.user.id = token.sub; // Attach the user ID to the session
      session.accessToken = token.accessToken; // Pass accessToken to the session for client-side use
      return session;
    },
    async jwt({ token, user }: { token: any; user?: any }) {
      if (user) {
        token.role = user.role;
        token.accessToken = generateAccessToken(user); // Add an access token (generated here) to the token
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

// Generate an access token (for example purposes, return user ID)
function generateAccessToken(user: any) {
  // Here, you could add logic to generate a secure token
  return user.id; // For now, using user ID as token. Replace with actual logic.
}

const handler = NextAuth(options);

export { handler as GET, handler as POST };
