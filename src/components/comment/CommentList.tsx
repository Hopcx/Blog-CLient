import { useComments } from '../../hooks/useComments'
import CommentItem from './CommentItem'
import CommentForm from './CommentForm'
import { Skeleton } from 'antd'

interface Props {
  postId: string
}

const CommentList = ({ postId }: Props) => {
  const { data: comments, isLoading } = useComments(postId)

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-4">
        Bình luận ({comments?.length ?? 0})
      </h3>

      <CommentForm postId={postId} />

      <div className="mt-6">
        {isLoading ? (
          <Skeleton active avatar paragraph={{ rows: 2 }} />
        ) : comments?.length === 0 ? (
          <p className="text-gray-400 text-center py-8">
            Chưa có bình luận nào. Hãy là người đầu tiên!
          </p>
        ) : (
          comments?.map((comment) => (
            <CommentItem key={comment.id} comment={comment} postId={postId} />
          ))
        )}
      </div>
    </div>
  )
}

export default CommentList