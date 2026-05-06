export interface CommentAuthor {
  id: string
  username: string
  displayName?: string
  avatarUrl?: string
}

export interface Comment {
  id: string
  content: string
  isApproved: boolean
  createdAt: string
  parentId?: string
  author: CommentAuthor
  replies: Comment[]
}

export interface AddCommentRequest {
  postId: string
  authorId: string
  content: string
  parentId?: string
}