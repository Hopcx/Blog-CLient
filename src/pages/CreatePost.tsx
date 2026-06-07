import { useState } from 'react'
import { Form, Input, Button, Select, message, Card, Switch } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { type RootState } from '../store'
import { useCreatePost } from '../hooks/usePosts'
import { useCategories } from '../hooks/useCategories'
import { type Category } from '../types/category'
import ImageUpload from '../components/common/ImageUpload'
import RichTextEditor from '../components/common/RichTextEditor'  // ← thêm

const { TextArea } = Input

interface CreatePostFormValues {
  title: string
  excerpt?: string
  thumbnailUrl?: string
  tags?: string
  categoryIds?: string[]
}

interface CategoryOption {
  value: string
  label: string
}

const flattenCategories = (
  cats: Category[],
  prefix = ''
): CategoryOption[] => {
  return cats.flatMap(cat => [
    { value: cat.id, label: `${prefix}${cat.name}` },
    ...flattenCategories(cat.children || [], `── `)
  ])
}

const CreatePost = () => {
  const [form] = Form.useForm<CreatePostFormValues>()
  const navigate = useNavigate()
  const { user } = useSelector((s: RootState) => s.auth)
  const { mutateAsync, isPending } = useCreatePost()
  const { data: categories } = useCategories()
  const [isPublished, setIsPublished] = useState(false)
  const [content, setContent] = useState('')       // ← state riêng cho editor
  const [contentError, setContentError] = useState('')

  const categoryOptions = flattenCategories(categories || [])

  const onFinish = async (values: CreatePostFormValues) => {
    if (!user) return

    // Validate content
    if (!content || content === '<p><br></p>') {
      setContentError('Vui lòng nhập nội dung bài viết!')
      return
    }
    setContentError('')

    try {
      const result = await mutateAsync({
        title: values.title,
        content,                    // ← HTML từ editor
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
    <div className="max-w-4xl mx-auto">
      <Card className="dark:bg-slate-900">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          ✍️ Tạo bài viết mới
        </h1>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={() => message.error('Vui lòng điền đầy đủ!')}
        >
          <Form.Item
            label="Tiêu đề"
            name="title"
            rules={[{ required: true, message: 'Vui lòng nhập tiêu đề' }]}
          >
            <Input
              placeholder="Tiêu đề bài viết..."
              size="large"
              className="text-xl font-semibold"
            />
          </Form.Item>

          <Form.Item label="Mô tả ngắn" name="excerpt">
            <TextArea
              placeholder="Mô tả ngắn hiển thị ở trang chủ..."
              autoSize={{ minRows: 2, maxRows: 4 }}
            />
          </Form.Item>

          {/* Rich Text Editor */}
          <Form.Item label="Nội dung bài viết" required>
            <RichTextEditor
              value={content}
              onChange={(val) => {
                setContent(val)
                if (val && val !== '<p><br></p>') {
                  setContentError('')
                }
              }}
              placeholder="Viết nội dung bài viết tại đây..."
            />
            {contentError && (
              <p className="text-red-500 text-sm mt-1">{contentError}</p>
            )}
          </Form.Item>

          <Form.Item label="Ảnh thumbnail" name="thumbnailUrl">
            <ImageUpload
              type="image"
              placeholder="Upload ảnh thumbnail"
              onChange={(url) => form.setFieldValue('thumbnailUrl', url)}
              value={form.getFieldValue('thumbnailUrl')}
            />
          </Form.Item>

          <Form.Item label="Tags (phân cách bằng dấu phẩy)" name="tags">
            <Input placeholder="react, dotnet, cleanarchitecture" />
          </Form.Item>

          <Form.Item label="Danh mục" name="categoryIds">
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

          <div className="flex gap-3 mt-6">
            <Button
              type="primary"
              htmlType="submit"
              loading={isPending}
              size="large"
            >
              {isPublished ? '🚀 Xuất bản' : '💾 Lưu nháp'}
            </Button>
            <Button size="large" onClick={() => navigate('/')}>
              Huỷ
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  )
}

export default CreatePost