import NextAuth from 'next-auth'
// @ts-ignore
import type { NextAuthOptions } from 'next-auth'
import GitHUbProvider from 'next-auth/providers/github'

const authOptions: NextAuthOptions = {
  callbacks: {
    signIn: async ({ profile }: { profile: { login: string } }) => {
      return profile.login === 'somewonderfulguy'
    }
  } as unknown as NextAuthOptions['callbacks'],
  providers: [
    GitHUbProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? ''
    })
  ] as NextAuthOptions['providers'],

  secret: process.env.SECRET
}

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions)
