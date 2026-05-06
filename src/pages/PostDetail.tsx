import { useParams } from 'react-router-dom'
import { Skeleton, Tag } from 'antd'
import { usePostDetail } from '../hooks/usePostDetail'
import CommentList from '../components/comment/CommentList'

const PostDetail = () => {
  const { slug } = useParams<{ slug: string }>()
  const { data: post, isLoading } = usePostDetail(slug!)

  if (isLoading) return <Skeleton active paragraph={{ rows: 10 }} />

  if (!post) return <div className="text-center py-20 text-gray-400">Bài viết không tồn tại</div>

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex gap-2 mb-3 flex-wrap">
          {post.categories.map((cat) => (
            <Tag color="blue" key={cat}>{cat}</Tag>
          ))}
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>

        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span>✍️ {post.author.displayName || post.author.username}</span>
          <span>📅 {new Date(post.createdAt).toLocaleDateString('vi-VN')}</span>
          <span>👁 {post.viewCount} lượt xem</span>
        </div>

        <div className="flex gap-1 mt-3">
          {post.tags.map((tag) => <Tag key={tag}>#{tag}</Tag>)}
        </div>
      </div>

      {/* Thumbnail */}
      {post.thumbnailUrl && (
        <img
          src={post.thumbnailUrl}
          alt={post.title}
          className="w-full rounded-xl mb-8 max-h-96 object-cover"
        />
      )}

      {/* Content */}
      <div
        className="prose max-w-none text-gray-800 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <hr className="my-10" />

      {/* Comments */}
      <CommentList postId={post.id} />
    </div>
  )
}

export default PostDetail