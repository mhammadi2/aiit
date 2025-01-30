export interface Post {
    id: string
    title: string
    content: string
    imageUrl?: string | null
    authorId: string
    author?: User
    published: boolean
    createdAt: Date
    updatedAt: Date
  }