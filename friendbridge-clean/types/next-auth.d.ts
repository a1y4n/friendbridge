import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
      isVerified: boolean
      studentId?: string | null
      university?: string | null
    }
  }

  interface User {
    isVerified: boolean
    studentId?: string | null
    university?: string | null
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    isVerified: boolean
    studentId?: string | null
    university?: string | null
  }
}
