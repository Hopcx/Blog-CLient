import { useState } from 'react'
import { Avatar, Button } from 'antd'
import { UserOutlined, LikeOutlined } from '@ant-design/icons'
import { type Comment } from '../../types/comment'
import CommentForm from './CommentForm'

interface Props {
  comment: Comment
  postId: string
}

const CommentItem = ({ comment, postId }: Props) => {
  const [showReply, setShowReply] = useState(false)
  const [showAllReplies, setShowAllReplies] = useState(false)

  const visibleReplies = showAllReplies
    ? comment.replies
    : comment.replies.slice(0, 2)

  return (
    <div className="flex gap-3 mb-6">
      <Avatar
        icon={<UserOutlined />}
        src={comment.author.avatarUrl}
        className="flex-shrink-0"
      />

      <div className="flex-1">
        {/* Comment bubble */}
        <div className="bg-gray-50 dark:bg-slate-800 rounded-2xl px-4 py-3">
          <p className="font-semibold text-sm text-gray-800 dark:text-gray-100">
            {comment.author.displayName || comment.author.username}
          </p>
          <p className="text-gray-700 dark:text-gray-200 mt-1 leading-relaxed">
            {comment.content}
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-4 mt-1 px-2 items-center">
          <span className="text-xs text-gray-400 dark:text-gray-500">
            {new Date(comment.createdAt).toLocaleDateString('vi-VN')}
          </span>
          <Button
            type="link"
            size="small"
            className="p-0 h-auto text-xs font-semibold text-gray-500 hover:text-blue-600"
            onClick={() => setShowReply(!showReply)}
          >
            {showReply ? 'Huỷ' : 'Trả lời'}
          </Button>
          <Button
            type="link"
            size="small"
            icon={<LikeOutlined />}
            className="p-0 h-auto text-xs text-gray-400 hover:text-blue-600"
          >
            Thích
          </Button>
        </div>

        {/* Reply form */}
        {showReply && (
          <div className="mt-3 ml-2">
            <CommentForm
              postId={postId}
              parentId={comment.id}
              onSuccess={() => setShowReply(false)}
              placeholder={`Trả lời ${comment.author.displayName || comment.author.username}...`}
            />
          </div>
        )}

        {/* Replies */}
        {comment.replies.length > 0 && (
          <div className="ml-2 mt-3 space-y-3">
            {visibleReplies.map((reply) => (
              <div key={reply.id} className="flex gap-2">
                <Avatar
                  size="small"
                  icon={<UserOutlined />}
                  src={reply.author.avatarUrl}
                  className="flex-shrink-0 mt-1"
                />
                <div className="flex-1">
                  <div className="bg-gray-50 dark:bg-slate-800 rounded-2xl px-3 py-2">
                    <p className="font-semibold text-xs text-gray-800 dark:text-gray-100">
                      {reply.author.displayName || reply.author.username}
                    </p>
                    <p className="text-gray-700 dark:text-gray-200 text-sm mt-0.5">
                      {reply.content}
                    </p>
                  </div>
                  <div className="flex gap-3 mt-1 px-2">
                    <span className="text-xs text-gray-400">
                      {new Date(reply.createdAt).toLocaleDateString('vi-VN')}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {/* Xem thêm replies */}
            {comment.replies.length > 2 && (
              <Button
                type="link"
                size="small"
                className="text-xs text-blue-500 px-0"
                onClick={() => setShowAllReplies(!showAllReplies)}
              >
                {showAllReplies
                  ? 'Ẩn bớt'
                  : `Xem thêm ${comment.replies.length - 2} phản hồi`}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default CommentItem