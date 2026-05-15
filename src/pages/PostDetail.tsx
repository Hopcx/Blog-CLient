import { useParams, useNavigate } from 'react-router-dom'
import { Skeleton, Tag, Button, Popconfirm, message } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { usePostDetail } from '../hooks/usePostDetail'
import { useDeletePost } from '../hooks/usePosts'
import { useSelector } from 'react-redux'
import { type RootState } from '../store'
import CommentList from '../components/comment/CommentList'

const PostDetail = () => {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const { data: post, isLoading } = usePostDetail(slug!)
  const { user } = useSelector((s: RootState) => s.auth)
  const { mutateAsync: deletePost, isPending: deleting } = useDeletePost()

  const isAuthor = user && post && user.id === post.author.id

  const handleDelete = async () => {
    if (!post) return
    try {
      await deletePost(post.id)
      message.success('Đã xoá bài viết!')
      navigate('/')
    } catch {
      message.error('Xoá thất bại, thử lại!')
    }
  }

  if (isLoading) return <Skeleton active paragraph={{ rows: 10 }} />

  if (!post) return (
    <div className="text-center py-20 text-gray-400">
      Bài viết không tồn tại
    </div>
  )

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex gap-2 mb-3 flex-wrap">
          {post.categories.map((cat) => (
            <Tag color="blue" key={cat}>{cat}</Tag>
          ))}
        </div>

        <div className="flex items-start justify-between gap-4">
          <h1 className="text-4xl font-bold text-gray-900 flex-1">
            {post.title}
          </h1>

          {/* Nút Edit + Delete — chỉ hiện với author */}
          {isAuthor && (
            <div className="flex gap-2 flex-shrink-0 mt-1">
              <Button
                icon={<EditOutlined />}
                onClick={() => navigate(`/posts/${slug}/edit`)}
              >
                Sửa
              </Button>
              <Popconfirm
                title="Xoá bài viết?"
                description="Hành động này không thể hoàn tác!"
                onConfirm={handleDelete}
                okText="Xoá"
                cancelText="Huỷ"
                okButtonProps={{ danger: true, loading: deleting }}
              >
                <Button danger icon={<DeleteOutlined />}>
                  Xoá
                </Button>
              </Popconfirm>
            </div>
          )}
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-500 mt-4">
          <span>✍️ {post.author.displayName || post.author.username}</span>
          <span>📅 {new Date(post.createdAt).toLocaleDateString('vi-VN')}</span>
          <span>👁 {post.viewCount} lượt xem</span>
          <Tag color={post.status === 'Published' ? 'green' : 'orange'}>
            {post.status}
          </Tag>
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