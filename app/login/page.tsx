import { FC } from 'react'
import { LoginForm } from '@/components/auth/login-form'

const LoginPage: FC = () => {
  return (
    <div className='max-w-md mx-auto'>
      <h1 className='text-2xl font-bold mb-6'>Login</h1>
      <LoginForm />
    </div>
  )
}

export default LoginPage
