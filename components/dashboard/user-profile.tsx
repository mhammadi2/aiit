'use client'

import { FC, useState } from 'react'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/toast'

const profileSchema = z.object({
  name: z.string().min(2).max(50),
  bio: z.string().max(500).optional(),
  avatar: z.string().url().optional(),
})

type ProfileFormData = z.infer<typeof profileSchema>

interface UserProfileProps {
  user: {
    id: string
    name: string | null
    email: string
    profile: {
      bio: string | null
      avatar: string | null
    } | null
  }
}

export const UserProfile: FC<UserProfileProps> = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user.name || '',
      bio: user.profile?.bio || '',
      avatar: user.profile?.avatar || '',
    },
  })

  const onSubmit = async (data: ProfileFormData) => {
    try {
      const response = await fetch('/api/user/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) throw new Error('Failed to update profile')

      toast.success('Profile updated successfully')
      setIsEditing(false)
    } catch (error) {
      toast.error('Failed to update profile')
    }
  }

  return (
    <div className='bg-white dark:bg-gray-800 rounded-lg shadow p-6'>
      <div className='flex items-center justify-between mb-6'>
        <h2 className='text-2xl font-bold'>Profile</h2>
        <Button variant='outline' onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </Button>
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          <div>
            <label className='block text-sm font-medium mb-1'>Name</label>
            <Input {...register('name')} />
            {errors.name && (
              <p className='text-red-500 text-sm mt-1'>{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className='block text-sm font-medium mb-1'>Bio</label>
            <Textarea {...register('bio')} />
            {errors.bio && (
              <p className='text-red-500 text-sm mt-1'>{errors.bio.message}</p>
            )}
          </div>

          <div>
            <label className='block text-sm font-medium mb-1'>Avatar URL</label>
            <Input {...register('avatar')} />
            {errors.avatar && (
              <p className='text-red-500 text-sm mt-1'>
                {errors.avatar.message}
              </p>
            )}
          </div>

          <Button type='submit'>Save Changes</Button>
        </form>
      ) : (
        <div className='space-y-4'>
          <div className='flex items-center space-x-4'>
            {user.profile?.avatar && (
              <Image
                src={user.profile.avatar}
                alt={user.name || ''}
                width={64}
                height={64}
                className='rounded-full'
              />
            )}
            <div>
              <h3 className='text-xl font-medium'>{user.name}</h3>
              <p className='text-gray-500 dark:text-gray-400'>{user.email}</p>
            </div>
          </div>
          {user.profile?.bio && (
            <p className='text-gray-600 dark:text-gray-300'>
              {user.profile.bio}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
