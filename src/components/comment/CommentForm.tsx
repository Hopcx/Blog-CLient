import { useState } from 'react'
import { Button, Input, message } from 'antd'
import { useSelector } from 'react-redux'
import { type RootState } from '../../store'
import { useAddComment } from '../../hooks/useComments'

interface Props {
  postId: string
  parentId?: string
  onSuccess?: () => void
  placeholder?: string
}

const CommentForm = ({
  postId,
  parentId,
  onSuccess,
  placeholder = 'Viết bình luận...'
}: Props) => {
  const [content, setContent] = useState('')
  const { isAuthenticated, user } = useSelector((s: RootState) => s.auth)
  const { mutateAsync, isPending } = useAddComment(postId)

  const handleSubmit = async () => {
    if (!content.trim()) return
    if (!isAuthenticated || !user) {
      message.warning('Vui lòng đăng nhập để bình luận')
      return
    }

    try {
      await mutateAsync({
        postId,
        authorId: user.id,
        content: content.trim(),
        parentId,
      })
      setContent('')
      message.success('Đã thêm bình luận!')
      onSuccess?.()
    } catch {
      message.error('Có lỗi xảy ra!')
    }
  }

  return (
    <div className="flex gap-3">
      <Input.TextArea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={placeholder}
        autoSize={{ minRows: 2, maxRows: 5 }}
        className="flex-1"
      />
      <Button
        type="primary"
        onClick={handleSubmit}
        loading={isPending}
        disabled={!content.trim()}
      >
        Gửi
      </Button>
    </div>
  )
}

export default CommentForm