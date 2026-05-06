import { useState } from 'react'
import { Pagination, Skeleton, Empty } from 'antd'
import { usePosts } from '../hooks/usePosts'
import PostCard from '../components/post/PostCard'

const Home = () => {
  const [page, setPage] = useState(1)
  const { data, isLoading } = usePosts(page, 9, 'Published')

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Bài viết mới nhất</h1>
        <p className="text-gray-500 mt-1">Khám phá những bài viết hay nhất</p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} active />
          ))}
        </div>
      ) : data?.items.length === 0 ? (
        <Empty description="Chưa có bài viết nào" />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.items.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>

          <div className="flex justify-center mt-10">
            <Pagination
              current={page}
              total={data?.total}
              pageSize={9}
              onChange={setPage}
              showTotal={(total) => `Tổng ${total} bài viết`}
            />
          </div>
        </>
      )}
    </div>
  )
}

export default Home