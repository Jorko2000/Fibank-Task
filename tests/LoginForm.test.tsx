import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { afterEach, describe, expect, it } from 'vitest'
import { AuthProvider } from '@/features/auth/AuthProvider'
import { LoginForm } from '@/features/auth/LoginForm'

afterEach(() => {
  sessionStorage.clear()
})

describe('LoginForm', () => {
  it('disables sign in when fields are empty', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <LoginForm />
        </AuthProvider>
      </MemoryRouter>,
    )

    expect(screen.getByRole('button', { name: /sign in/i })).toBeDisabled()
  })

  it('enables sign in when both fields have values', async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter>
        <AuthProvider>
          <LoginForm />
        </AuthProvider>
      </MemoryRouter>,
    )

    await user.type(screen.getByLabelText(/username/i), 'demo')
    await user.type(screen.getByLabelText(/password/i), 'secret')

    expect(screen.getByRole('button', { name: /sign in/i })).toBeEnabled()
  })

  it('navigates to the table route after successful login', async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter initialEntries={['/']}>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/table" element={<p>Table page</p>} />
          </Routes>
        </AuthProvider>
      </MemoryRouter>,
    )

    await user.type(screen.getByLabelText(/username/i), 'demo')
    await user.type(screen.getByLabelText(/password/i), 'secret')
    await user.click(screen.getByRole('button', { name: /sign in/i }))

    expect(screen.getByText('Table page')).toBeInTheDocument()
  })
})
