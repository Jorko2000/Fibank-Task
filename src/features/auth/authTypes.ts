export interface Session {
  username: string
  signedInAt: string
}

export interface AuthContextValue {
  session: Session | null
  isAuthenticated: boolean
  signIn: (username: string) => void
  signOut: () => void
}
