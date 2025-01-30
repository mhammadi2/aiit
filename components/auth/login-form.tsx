// src/components/auth/login-form.tsx
'use client'

import { FC, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useToast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Icons } from '@/components/ui/icons' // Import Icons from the separate file

interface LoginFormData {
  email: string
  password: string
}

export const LoginForm: FC = () => {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      })

      if (result?.error) {
        toast({
          title: 'Error',
          description: 'Invalid email or password',
          variant: 'destructive',
        })
        return
      }

      toast({
        title: 'Success',
        description: 'Logged in successfully',
      })
      router.push('/dashboard')
      router.refresh()
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className='w-full max-w-md mx-auto'>
      <form onSubmit={handleSubmit}>
        <CardHeader className='space-y-1'>
          <CardTitle className='text-2xl text-center'>Welcome back</CardTitle>
          <CardDescription className='text-center'>
            Enter your email and password to login
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          {/* Email Field */}
          <div className='space-y-2'>
            <Label htmlFor='email'>Email</Label>
            <Input
              id='email'
              placeholder='name@example.com'
              type='email'
              autoCapitalize='none'
              autoComplete='email'
              autoCorrect='off'
              disabled={isLoading}
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>

          {/* Password Field */}
          <div className='space-y-2'>
            <div className='flex items-center justify-between'>
              <Label htmlFor='password'>Password</Label>
              <Link
                href='/auth/forgot-password'
                className='text-sm text-blue-600 hover:text-blue-500'
              >
                Forgot password?
              </Link>
            </div>
            <Input
              id='password'
              placeholder='••••••••'
              type='password'
              autoCapitalize='none'
              autoComplete='current-password'
              autoCorrect='off'
              disabled={isLoading}
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
          </div>
        </CardContent>
        <CardFooter className='flex flex-col space-y-4'>
          <Button type='submit' className='w-full' disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
            )}
            {isLoading ? 'Signing in...' : 'Sign in'}
          </Button>

          {/* Social Login Buttons */}
          <div className='relative'>
            <div className='absolute inset-0 flex items-center'>
              <span className='w-full border-t' />
            </div>
            <div className='relative flex justify-center text-xs uppercase'>
              <span className='bg-background px-2 text-muted-foreground'>
                Or continue with
              </span>
            </div>
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <Button variant='outline' type='button' disabled={isLoading}>
              <Icons.gitHub className='mr-2 h-4 w-4' />
              Github
            </Button>
            <Button variant='outline' type='button' disabled={isLoading}>
              <Icons.google className='mr-2 h-4 w-4' />
              Google
            </Button>
          </div>

          {/* Sign Up Link */}
          <div className='text-center text-sm'>
            Don't have an account?{' '}
            <Link
              href='/auth/signup'
              className='font-medium text-blue-600 hover:text-blue-500'
            >
              Create an account
            </Link>
          </div>

          {/* Terms and Privacy */}
          <p className='px-8 text-center text-sm text-muted-foreground'>
            By clicking continue, you agree to our{' '}
            <Link
              href='/terms'
              className='underline underline-offset-4 hover:text-primary'
            >
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link
              href='/privacy'
              className='underline underline-offset-4 hover:text-primary'
            >
              Privacy Policy
            </Link>
            .
          </p>
        </CardFooter>
      </form>
    </Card>
  )
}
