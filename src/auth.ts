import NextAuth, { type NextAuthConfig } from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'

const authOptions: NextAuthConfig = {
  callbacks: {
    async signIn({ profile }) {
      return profile?.login === 'somewonderfulguy'
    }
  },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? ''
    })
  ],
  secret: process.env.SECRET
}

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions)
