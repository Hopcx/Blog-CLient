import { useDispatch, useSelector } from 'react-redux'
import { type RootState } from '../store'
import {  Card, Tag, Tabs, message } from 'antd'
//import { UserOutlined } from '@ant-design/icons'
import { usePosts } from '../hooks/usePosts'
import PostCard from '../components/post/PostCard'
import { Navigate } from 'react-router-dom'
import ImageUpload from '../components/common/ImageUpload'
import { setCredentials } from '../store/slices/authSlice'
//import axiosInstance from '../api/axiosInstance'

const Profile = () => {
  const dispatch = useDispatch()
  const { user, isAuthenticated, token } = useSelector((s: RootState) => s.auth)

  const { data: publishedPosts } = usePosts(1, 100, 'Published')
  const { data: draftPosts } = usePosts(1, 100, 'Draft')

  if (!isAuthenticated || !user) return <Navigate to="/login" replace />

  const myPublished = publishedPosts?.items.filter(
    p => p.author.id === user.id
  ) || []

  const myDrafts = draftPosts?.items.filter(
    p => p.author.id === user.id
  ) || []

  const handleAvatarChange = async (url: string) => {
    try {
      // Cập nhật avatar lên BE (sẽ làm sau)
      // Tạm thời update Redux store
      dispatch(setCredentials({
        user: { ...user, avatarUrl: url },
        token: token!
      }))
      message.success('Cập nhật avatar thành công!')
    } catch {
      message.error('Cập nhật thất bại!')
    }
  }

  const tabItems = [
    {
      key: 'published',
      label: `Đã xuất bản (${myPublished.length})`,
      children: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {myPublished.length === 0 ? (
            <p className="text-gray-400 col-span-2 text-center py-8">
              Chưa có bài viết nào được xuất bản
            </p>
          ) : (
            myPublished.map(post => (
              <PostCard key={post.id} post={post} />
            ))
          )}
        </div>
      )
    },
    {
      key: 'draft',
      label: `Bản nháp (${myDrafts.length})`,
      children: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {myDrafts.length === 0 ? (
            <p className="text-gray-400 col-span-2 text-center py-8">
              Không có bản nháp nào
            </p>
          ) : (
            myDrafts.map(post => (
              <PostCard key={post.id} post={post} />
            ))
          )}
        </div>
      )
    }
  ]

  return (
    <div className="max-w-4xl mx-auto">
      {/* Profile card */}
      <Card className="mb-8">
        <div className="flex items-center gap-6">
          {/* Avatar upload */}
          <ImageUpload
            type="avatar"
            value={user.avatarUrl}
            onChange={handleAvatarChange}
          />

          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-800">
              {user.displayName || user.username}
            </h1>
            <p className="text-gray-500 mt-1">{user.email}</p>
            <div className="flex gap-2 mt-2">
              <Tag color={user.role === 'Admin' ? 'red' : 'blue'}>
                {user.role}
              </Tag>
              <Tag color="green">
                {myPublished.length} bài viết
              </Tag>
            </div>
          </div>
        </div>
      </Card>

      {/* My posts */}
      <Card>
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          Bài viết của tôi
        </h2>
        <Tabs items={tabItems} />
      </Card>
    </div>
  )
}

export default Profile