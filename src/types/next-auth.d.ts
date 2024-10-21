import NextAuth, { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user?: {
      id: string
      role: 'instructor' | 'learner'
    } & DefaultSession['user']
  }

  interface User {
    id: string
    role: 'instructor' | 'learner'
  }
}
