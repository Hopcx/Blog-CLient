import { useState } from 'react'
import { Pagination, Skeleton, Empty, Input, Select } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { usePosts } from '../hooks/usePosts'
import { useCategories } from '../hooks/useCategories'
import PostCard from '../components/post/PostCard'
import { type Category } from '../types/category'

const { Search } = Input

// Flatten category tree → options
const flattenCategories = (
  cats: Category[],
  prefix = ''
): { value: string; label: string }[] => {
  return cats.flatMap(cat => [
    { value: cat.id, label: `${prefix}${cat.name}` },
    ...flattenCategories(cat.children || [], `── `)
  ])
}

const Home = () => {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState<string | undefined>()
  const [categoryId, setCategoryId] = useState<string | undefined>()
  const [tag, setTag] = useState<string | undefined>()

  const { data, isLoading } = usePosts(page, 9, 'Published', search, categoryId, tag)
  const { data: categories } = useCategories()

  const categoryOptions = flattenCategories(categories || [])

  const handleSearch = (value: string) => {
    setSearch(value || undefined)
    setPage(1) // reset về trang 1 khi search
  }

  const handleCategoryChange = (value: string) => {
    setCategoryId(value || undefined)
    setPage(1)
  }

  const handleTagChange = (value: string) => {
    setTag(value || undefined)
    setPage(1)
  }

  const handleReset = () => {
    setSearch(undefined)
    setCategoryId(undefined)
    setTag(undefined)
    setPage(1)
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Bài viết mới nhất</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Khám phá những bài viết hay nhất</p>
      </div>

      {/* Search + Filter bar */}
      <div className="flex flex-wrap gap-3 mb-8 bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm dark:shadow-none">
        <Search
          placeholder="Tìm kiếm bài viết..."
          allowClear
          enterButton={<SearchOutlined />}
          size="large"
          className="flex-1 min-w-[200px]"
          onSearch={handleSearch}
        />

        <Select
          placeholder="Danh mục"
          allowClear
          size="large"
          className="min-w-[180px]"
          options={categoryOptions}
          onChange={handleCategoryChange}
          value={categoryId}
        />

        <Input
          placeholder="Tag (vd: react)"
          allowClear
          size="large"
          className="min-w-[150px] max-w-[180px]"
          value={tag || ''}
          onChange={(e) => handleTagChange(e.target.value)}
          onPressEnter={(e) => handleTagChange((e.target as HTMLInputElement).value)}
          prefix={<span className="text-gray-400">#</span>}
        />

        {/* Hiện nút reset nếu đang filter */}
        {(search || categoryId || tag) && (
          <button
            onClick={handleReset}
            className="text-sm text-red-400 hover:text-red-600 underline self-center"
          >
            Xoá bộ lọc
          </button>
        )}
      </div>

      {/* Kết quả search */}
      {(search || categoryId || tag) && !isLoading && (
        <p className="text-gray-500 dark:text-gray-400 mb-4 text-sm">
          Tìm thấy <span className="font-semibold text-gray-800 dark:text-gray-100">{data?.total ?? 0}</span> kết quả
          {search && <> cho "<span className="text-blue-600">{search}</span>"</>}
        </p>
      )}

      {/* Post grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} active avatar paragraph={{ rows: 3 }} />
          ))}
        </div>
      ) : data?.items.length === 0 ? (
        <Empty
          description={
            search || categoryId || tag
              ? 'Không tìm thấy bài viết phù hợp'
              : 'Chưa có bài viết nào'
          }
        />
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
              onChange={(p) => { setPage(p); window.scrollTo(0, 0) }}
              showTotal={(total) => `Tổng ${total} bài viết`}
              showSizeChanger={false}
            />
          </div>
        </>
      )}
    </div>
  )
}

export default Home