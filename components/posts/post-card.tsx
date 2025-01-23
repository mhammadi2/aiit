// components/posts/post-card.tsx
import Link from 'next/link'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { formatDate } from '@/lib/utils'

interface PostCardProps {
  post: {
    id: string
    title: string
    content: string
    imageUrl?: string
    createdAt: Date
    author: {
      name: string
    }
  }
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Card>
      {post.imageUrl && (
        <div className='aspect-video relative'>
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            className='object-cover'
          />
        </div>
      )}
      <CardHeader>
        <CardTitle>{post.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className='line-clamp-3'>{post.content}</p>
      </CardContent>
      <CardFooter className='flex justify-between'>
        <div className='text-sm text-muted-foreground'>
          By {post.author.name} on {formatDate(post.createdAt)}
        </div>
        <Link href={`/posts/${post.id}`}>
          <Button variant='secondary'>Read more</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
