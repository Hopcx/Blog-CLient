import { Avatar, Button } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import type { Comment } from '../../types/comment'
import { useState } from 'react'
import CommentForm from './CommentForm'

interface Props {
  comment: Comment
  postId: string
}

const CommentItem = ({ comment, postId }: Props) => {
  const [showReply, setShowReply] = useState(false)

  return (
    <div className="flex gap-3 mb-4">
      <Avatar icon={<UserOutlined />} src={comment.author.avatarUrl} />
      <div className="flex-1">
        <div className="bg-gray-50 rounded-lg px-4 py-3">
          <p className="font-semibold text-sm text-gray-800">
            {comment.author.displayName || comment.author.username}
          </p>
          <p className="text-gray-700 mt-1">{comment.content}</p>
        </div>

        <div className="flex gap-4 mt-1 px-2">
          <span className="text-xs text-gray-400">
            {new Date(comment.createdAt).toLocaleDateString('vi-VN')}
          </span>
          <Button
            type="link"
            size="small"
            className="p-0 h-auto text-xs"
            onClick={() => setShowReply(!showReply)}
          >
            Trả lời
          </Button>
        </div>

        {showReply && (
          <div className="mt-2">
            <CommentForm
              postId={postId}
              parentId={comment.id}
              onSuccess={() => setShowReply(false)}
              placeholder={`Trả lời ${comment.author.username}...`}
            />
          </div>
        )}

        {/* Replies */}
        {comment.replies.length > 0 && (
          <div className="ml-4 mt-3 border-l-2 border-gray-100 pl-4">
            {comment.replies.map((reply) => (
              <div key={reply.id} className="flex gap-3 mb-3">
                <Avatar size="small" icon={<UserOutlined />} />
                <div className="bg-gray-50 rounded-lg px-3 py-2 flex-1">
                  <p className="font-semibold text-xs text-gray-800">
                    {reply.author.displayName || reply.author.username}
                  </p>
                  <p className="text-gray-700 text-sm mt-1">{reply.content}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default CommentItem