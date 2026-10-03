import { useMemo, useState, type ReactNode } from 'react'
import { AuthContext } from './AuthContext'
import type { Session } from './authTypes'

const KEY = 'fibank-front-end-task-session'

function loadSession(): Session | null {
  const raw = sessionStorage.getItem(KEY)
  if (!raw) return null

  try {
    return JSON.parse(raw) as Session
  } catch {
    sessionStorage.removeItem(KEY)
    return null
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(loadSession)

  const value = useMemo(
    () => ({
      session,
      isAuthenticated: Boolean(session),
      signIn: (username: string) => {
        const next: Session = {
          username,
          signedInAt: new Date().toISOString(),
        }
        sessionStorage.setItem(KEY, JSON.stringify(next))
        setSession(next)
      },
      signOut: () => {
        sessionStorage.removeItem(KEY)
        setSession(null)
      },
    }),
    [session],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
