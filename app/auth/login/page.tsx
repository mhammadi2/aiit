'use client'

import { FC } from 'react'
import { LoginForm } from '@/components/auth/login-form'

const LoginPage: FC = () => {
  return (
    <div className='min-h-screen flex items-center justify-center px-4 py-12'>
      <div className='max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md'>
        <div>
          <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
            Sign in to your account
          </h2>
          <p className='mt-2 text-center text-sm text-gray-600'>
            Or{' '}
            <a
              href='/auth/signup'
              className='font-medium text-blue-600 hover:text-blue-500'
            >
              create a new account
            </a>
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}

export default LoginPage
