import { useState, useEffect, useMemo } from 'react'
import { Form, Input, Button, Select, message, Card, Switch, Skeleton } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { type RootState } from '../store'
import { useCategories } from '../hooks/useCategories'
import { usePostDetail } from '../hooks/usePostDetail'
import { postService } from '../services/postService'
import { type Category } from '../types/category'

const { TextArea } = Input

interface EditPostFormValues {
  title: string
  content: string
  excerpt?: string
  thumbnailUrl?: string
  tags?: string
  categoryIds?: string[]
  isPublished: boolean   // ← đưa vào form luôn
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

const EditPost = () => {
  const { slug } = useParams<{ slug: string }>()
  const [form] = Form.useForm<EditPostFormValues>()
  const navigate = useNavigate()
  const { user } = useSelector((s: RootState) => s.auth)
  const { data: post, isLoading: postLoading } = usePostDetail(slug!)
  const { data: categories } = useCategories()
  const [submitting, setSubmitting] = useState(false)

  const categoryOptions = useMemo(
    () => flattenCategories(categories || []),
    [categories]
  )

  // ← Gộp tất cả setFieldsValue vào 1 useEffect, không gọi setState riêng
  useEffect(() => {
    if (!post || !categories) return

    const matchedCategoryIds = categories
      .flatMap(c => [c, ...(c.children || [])])
      .filter(c => post.categories.includes(c.name))
      .map(c => c.id)

    form.setFieldsValue({
      title: post.title,
      content: post.content,
      excerpt: post.excerpt,
      thumbnailUrl: post.thumbnailUrl,
      tags: post.tags.join(', '),
      categoryIds: matchedCategoryIds,
      isPublished: post.status === 'Published', // ← đưa vào form
    })
  }, [post, categories, form])

  // Kiểm tra quyền
  useEffect(() => {
    if (post && user && post.author.id !== user.id) {
      message.error('Bạn không có quyền chỉnh sửa bài viết này!')
      navigate('/')
    }
  }, [post, user, navigate])

  const onFinish = async (values: EditPostFormValues) => {
    if (!post || !user) return
    setSubmitting(true)

    try {
      const result = await postService.updatePost(post.id, {
        title: values.title,
        content: values.content,
        excerpt: values.excerpt,
        thumbnailUrl: values.thumbnailUrl,
        status: values.isPublished ? 'Published' : 'Draft', // ← đọc từ form
        authorId: user.id,
        tagNames: values.tags
          ? values.tags.split(',').map((t: string) => t.trim()).filter(Boolean)
          : [],
        categoryIds: values.categoryIds || [],
      })

      message.success('Cập nhật bài viết thành công!')
      navigate(`/posts/${result.slug}`)
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } }
      message.error(error?.response?.data?.message || 'Có lỗi xảy ra!')
    } finally {
      setSubmitting(false)
    }
  }

  if (postLoading) return <Skeleton active paragraph={{ rows: 10 }} />

  if (!post) return (
    <div className="text-center py-20 text-gray-400">
      Bài viết không tồn tại
    </div>
  )

  return (
    <div className="max-w-3xl mx-auto">
      <Card>
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          ✏️ Chỉnh sửa bài viết
        </h1>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={() => message.error('Vui lòng điền đầy đủ thông tin!')}
        >
          <Form.Item
            label="Tiêu đề"
            name="title"
            rules={[{ required: true, message: 'Vui lòng nhập tiêu đề' }]}
          >
            <Input placeholder="Tiêu đề bài viết..." size="large" />
          </Form.Item>

          <Form.Item label="Mô tả ngắn" name="excerpt">
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

          <Form.Item label="Thumbnail URL" name="thumbnailUrl">
            <Input placeholder="https://example.com/image.jpg" />
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

          {/* ← dùng Form.Item với name="isPublished" thay vì useState */}
          <Form.Item
            label="Trạng thái"
            name="isPublished"
            valuePropName="checked"
          >
            <Switch
              checkedChildren="Published"
              unCheckedChildren="Draft"
            />
          </Form.Item>

          <div className="flex gap-3 mt-4">
            <Button
              type="primary"
              htmlType="submit"
              loading={submitting}
              size="large"
            >
              💾 Lưu thay đổi
            </Button>
            <Button
              size="large"
              onClick={() => navigate(`/posts/${slug}`)}
            >
              Huỷ
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  )
}

export default EditPost