import { Link } from 'react-router-dom'
import { Tag } from 'antd'
import { type Post } from '../../types/post'

interface Props {
  post: Post
}

const PostCard = ({ post }: Props) => {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6">
      {post.thumbnailUrl && (
        <img
          src={post.thumbnailUrl}
          alt={post.title}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
      )}

      <div className="flex gap-2 mb-3 flex-wrap">
        {post.categories.map((cat) => (
          <Tag color="blue" key={cat}>{cat}</Tag>
        ))}
      </div>

      <Link to={`/posts/${post.slug}`}>
        <h2 className="text-xl font-semibold text-gray-800 hover:text-blue-600 mb-2 line-clamp-2">
          {post.title}
        </h2>
      </Link>

      {post.excerpt && (
        <p className="text-gray-500 text-sm line-clamp-3 mb-4">{post.excerpt}</p>
      )}

      <div className="flex items-center justify-between text-xs text-gray-400 mt-4">
        <span>✍️ {post.author.displayName || post.author.username}</span>
        <span>👁 {post.viewCount}</span>
        <span>{new Date(post.createdAt).toLocaleDateString('vi-VN')}</span>
      </div>

      <div className="flex gap-1 mt-3 flex-wrap">
        {post.tags.map((tag) => (
          <Tag key={tag}>#{tag}</Tag>
        ))}
      </div>
    </div>
  )
}

export default PostCard