import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { ArrowRight, LockKeyhole } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { TABLE_ROUTE } from '@/lib/constants'
import { useAuth } from './useAuth'
import { loginSchema, type LoginValues } from './schema'

export function LoginForm() {
  const navigate = useNavigate()
  const { signIn } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  })

  const handleLogin = ({ username }: LoginValues) => {
    signIn(username.trim())
    navigate(TABLE_ROUTE, { replace: true })
  }

  return (
    <form className="login-form" onSubmit={handleSubmit(handleLogin)} noValidate>
      <div className="login-icon">
        <LockKeyhole size={22} />
      </div>
      <p className="eyebrow">FIBANK FRONT-END TASK</p>
      <h1>Welcome back</h1>
      <p className="muted">Sign in to continue to the Star Wars people table.</p>

      <Input
        label="Username"
        placeholder="Enter username"
        autoComplete="username"
        error={errors.username?.message}
        {...register('username')}
      />

      <Input
        label="Password"
        type="password"
        placeholder="Enter password"
        autoComplete="current-password"
        error={errors.password?.message}
        {...register('password')}
      />

      <Button type="submit" fullWidth disabled={!isValid}>
        Sign in <ArrowRight size={18} />
      </Button>

      <small className="login-hint">
        Task scope: any non-empty credentials are accepted because no authentication API was supplied.
      </small>
    </form>
  )
}
