'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function ImageUpload({
  value,
  onChange,
  onRemove,
}: {
  value: string
  onChange: (url: string) => void
  onRemove: () => void
}) {
  const [loading, setLoading] = useState(false)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) throw new Error('Upload failed')

      const { url } = await response.json()
      onChange(url)
    } catch (error) {
      console.error('Upload error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='space-y-4'>
      {value ? (
        <div className='relative'>
          <img
            src={value}
            alt='Upload'
            className='w-full h-48 object-cover rounded-md'
          />
          <Button
            variant='destructive'
            size='sm'
            className='absolute top-2 right-2'
            onClick={onRemove}
          >
            Remove
          </Button>
        </div>
      ) : (
        <div className='border-2 border-dashed rounded-md p-4'>
          <Input
            type='file'
            accept='image/*'
            onChange={handleUpload}
            disabled={loading}
          />
        </div>
      )}
    </div>
  )
}
