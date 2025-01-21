import NextAuth from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'

const handler = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role as 'USER' | 'ADMIN' // Add role to session
      }
      return session
    },
    async jwt({ token }) {
      // You can add custom logic here to set the user role
      // For example, checking against a database
      token.role = 'USER' // Default role
      return token
    },
  },
})

export { handler as GET, handler as POST }
