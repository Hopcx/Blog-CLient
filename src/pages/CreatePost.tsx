import { useState } from 'react'
import {
  Form, Input, Button, Select, message, Card, Switch
} from 'antd'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { type RootState } from '../store'
import { useCreatePost } from '../hooks/usePosts'
import { useCategories } from '../hooks/useCategories'
import { type Category } from '../types/category'

const { TextArea } = Input

// ← Định nghĩa rõ type thay vì any
interface CreatePostFormValues {
  title: string
  content: string
  excerpt?: string
  thumbnailUrl?: string
  tags?: string
  categoryIds?: string[]
}

interface CategoryOption {
  value: string
  label: string
}

const CreatePost = () => {
  const [form] = Form.useForm<CreatePostFormValues>()
  const navigate = useNavigate()
  const { user } = useSelector((s: RootState) => s.auth)
  const { mutateAsync, isPending } = useCreatePost()
  const { data: categories } = useCategories()
  const [isPublished, setIsPublished] = useState(false)

  // Flatten category tree → options cho Select
  const flattenCategories = (
    cats: Category[],
    prefix = ''
  ): CategoryOption[] => {
    return cats.flatMap(cat => [
      { value: cat.id, label: `${prefix}${cat.name}` },
      ...flattenCategories(cat.children || [], `${prefix}${cat.name} / `)
    ])
  }

  const categoryOptions = flattenCategories(categories || [])

  const onFinish = async (values: CreatePostFormValues) => {
    if (!user) return

    try {
      const result = await mutateAsync({
        title: values.title,
        content: values.content,
        excerpt: values.excerpt,
        thumbnailUrl: values.thumbnailUrl,
        status: isPublished ? 'Published' : 'Draft',
        authorId: user.id,
        tagNames: values.tags
          ? values.tags.split(',').map((t: string) => t.trim()).filter(Boolean)
          : [],
        categoryIds: values.categoryIds || [],
      })

      message.success('Tạo bài viết thành công!')
      navigate(`/posts/${result.slug}`)
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } }
      message.error(error?.response?.data?.message || 'Có lỗi xảy ra!')
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Card>
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          ✍️ Tạo bài viết mới
        </h1>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            label="Tiêu đề"
            name="title"
            rules={[{ required: true, message: 'Vui lòng nhập tiêu đề' }]}
          >
            <Input
              placeholder="Tiêu đề bài viết..."
              size="large"
              className="text-lg"
            />
          </Form.Item>

          <Form.Item
            label="Mô tả ngắn (Excerpt)"
            name="excerpt"
          >
            <TextArea
              placeholder="Mô tả ngắn về bài viết..."
              autoSize={{ minRows: 2, maxRows: 4 }}
            />
          </Form.Item>

          <Form.Item
            label="Nội dung"
            name="content"
            rules={[{ required: true, message: 'Vui lòng nhập nội dung' }]}
          >
            <TextArea
              placeholder="Nội dung bài viết..."
              autoSize={{ minRows: 10, maxRows: 30 }}
              className="font-mono"
            />
          </Form.Item>

          <Form.Item
            label="Thumbnail URL"
            name="thumbnailUrl"
          >
            <Input placeholder="https://example.com/image.jpg" />
          </Form.Item>

          <Form.Item
            label="Tags (phân cách bằng dấu phẩy)"
            name="tags"
          >
            <Input placeholder="react, dotnet, cleanarchitecture" />
          </Form.Item>

          <Form.Item
            label="Danh mục"
            name="categoryIds"
          >
            <Select
              mode="multiple"
              placeholder="Chọn danh mục..."
              options={categoryOptions}
              allowClear
            />
          </Form.Item>

          <Form.Item label="Xuất bản ngay">
            <Switch
              checked={isPublished}
              onChange={setIsPublished}
              checkedChildren="Published"
              unCheckedChildren="Draft"
            />
          </Form.Item>

          <div className="flex gap-3 mt-4">
            <Button
              type="primary"
              htmlType="submit"
              loading={isPending}
              size="large"
            >
              {isPublished ? '🚀 Xuất bản' : '💾 Lưu nháp'}
            </Button>
            <Button
              size="large"
              onClick={() => navigate('/')}
            >
              Huỷ
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  )
}

export default CreatePost