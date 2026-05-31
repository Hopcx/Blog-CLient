import { useEditor, EditorContent } from '@tiptap/react'

import { BubbleMenu } from '@tiptap/react/menus'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import Highlight from '@tiptap/extension-highlight'
import { uploadService } from '../../services/uploadService'

interface Props {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
}

// Toolbar button component
const ToolbarBtn = ({
  onClick,
  active = false,
  title,
  children,
  disabled = false
}: {
  onClick: () => void
  active?: boolean
  title: string
  children: React.ReactNode
  disabled?: boolean
}) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    title={title}
    className={`px-2 py-1.5 rounded text-sm transition-colors
      ${active
        ? 'bg-blue-600 text-white'
        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}
      ${disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}
  >
    {children}
  </button>
)

const RichTextEditor = ({
  value = '',
  onChange,
  placeholder = 'Viết nội dung bài viết...'
}: Props) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
        codeBlock: { languageClassPrefix: 'language-' },
      }),
      Underline,
      Highlight.configure({ multicolor: false }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { class: 'text-blue-600 underline cursor-pointer' },
      }),
      Image.configure({
        inline: false,
        HTMLAttributes: { class: 'rounded-xl my-4 max-w-full' },
      }),
      Placeholder.configure({ placeholder }),
    ],
    editorProps: {
      attributes: {
        class: 'focus:outline-none',
        spellCheck: 'true',
      },
    },
    content: value,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML())
    },
  })

  // Upload ảnh vào editor
  const handleImageUpload = async () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.click()

    input.onchange = async () => {
      const file = input.files?.[0]
      if (!file || !editor) return

      try {
        const result = await uploadService.uploadImage(file)
        editor.chain().focus().setImage({ src: result.url }).run()
      } catch {
        console.error('Upload ảnh thất bại')
      }
    }
  }

  // Thêm link
  const handleSetLink = () => {
    const url = window.prompt('Nhập URL:')
    if (!url || !editor) return
    editor.chain().focus().setLink({ href: url }).run()
  }

  if (!editor) return null

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden
                    focus-within:border-blue-400 transition-colors">

      {/* ===== Toolbar ===== */}
      <div className="flex flex-wrap gap-1 p-2 bg-gray-50 border-b
                      border-gray-200 sticky top-16 z-10">

        {/* Heading */}
        <select
          className="px-2 py-1 text-sm border border-gray-200 rounded
                     bg-white text-gray-700 cursor-pointer"
          onChange={(e) => {
            const val = e.target.value
            if (val === 'p') {
              editor.chain().focus().setParagraph().run()
            } else {
              editor.chain().focus()
                .toggleHeading({ level: Number(val) as 1 | 2 | 3 })
                .run()
            }
          }}
          value={
            editor.isActive('heading', { level: 1 }) ? '1' :
            editor.isActive('heading', { level: 2 }) ? '2' :
            editor.isActive('heading', { level: 3 }) ? '3' : 'p'
          }
        >
          <option value="p">Đoạn văn</option>
          <option value="1">Heading 1</option>
          <option value="2">Heading 2</option>
          <option value="3">Heading 3</option>
        </select>

        <div className="w-px bg-gray-200 mx-1" />

        {/* Text format */}
        <ToolbarBtn
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive('bold')}
          title="Bold"
        >
          <strong>B</strong>
        </ToolbarBtn>

        <ToolbarBtn
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive('italic')}
          title="Italic"
        >
          <em>I</em>
        </ToolbarBtn>

        <ToolbarBtn
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          active={editor.isActive('underline')}
          title="Underline"
        >
          <span className="underline">U</span>
        </ToolbarBtn>

        <ToolbarBtn
          onClick={() => editor.chain().focus().toggleStrike().run()}
          active={editor.isActive('strike')}
          title="Strikethrough"
        >
          <span className="line-through">S</span>
        </ToolbarBtn>

        <ToolbarBtn
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          active={editor.isActive('highlight')}
          title="Highlight"
        >
          <span className="bg-yellow-200 px-0.5">H</span>
        </ToolbarBtn>

        <div className="w-px bg-gray-200 mx-1" />

        {/* Lists */}
        <ToolbarBtn
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive('bulletList')}
          title="Bullet List"
        >
          ≡
        </ToolbarBtn>

        <ToolbarBtn
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive('orderedList')}
          title="Ordered List"
        >
          1.
        </ToolbarBtn>

        <div className="w-px bg-gray-200 mx-1" />

        {/* Align */}
        <ToolbarBtn
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          active={editor.isActive({ textAlign: 'left' })}
          title="Align Left"
        >
          ←
        </ToolbarBtn>

        <ToolbarBtn
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          active={editor.isActive({ textAlign: 'center' })}
          title="Align Center"
        >
          ↔
        </ToolbarBtn>

        <ToolbarBtn
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          active={editor.isActive({ textAlign: 'right' })}
          title="Align Right"
        >
          →
        </ToolbarBtn>

        <div className="w-px bg-gray-200 mx-1" />

        {/* Block */}
        <ToolbarBtn
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          active={editor.isActive('blockquote')}
          title="Blockquote"
        >
          ❝
        </ToolbarBtn>

        <ToolbarBtn
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          active={editor.isActive('codeBlock')}
          title="Code Block"
        >
          {'</>'}
        </ToolbarBtn>

        <ToolbarBtn
          onClick={() => editor.chain().focus().toggleCode().run()}
          active={editor.isActive('code')}
          title="Inline Code"
        >
          {' ` '}
        </ToolbarBtn>

        <div className="w-px bg-gray-200 mx-1" />

        {/* Link + Image */}
        <ToolbarBtn
          onClick={handleSetLink}
          active={editor.isActive('link')}
          title="Insert Link"
        >
          🔗
        </ToolbarBtn>

        <ToolbarBtn
          onClick={handleImageUpload}
          title="Upload Image"
        >
          🖼️
        </ToolbarBtn>

        <div className="w-px bg-gray-200 mx-1" />

        {/* Undo / Redo */}
        <ToolbarBtn
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          title="Undo"
        >
          ↩
        </ToolbarBtn>

        <ToolbarBtn
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          title="Redo"
        >
          ↪
        </ToolbarBtn>
      </div>

      {/* ===== Bubble Menu — hiện khi select text ===== */}
      <BubbleMenu
        editor={editor}
        //options={{ duration: 100 }}
        className="flex gap-1 bg-gray-900 text-white rounded-lg px-2 py-1 shadow-xl"
      >
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-2 py-1 rounded text-sm font-bold transition-colors
            ${editor.isActive('bold') ? 'bg-blue-500' : 'hover:bg-gray-700'}`}
        >
          B
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-2 py-1 rounded text-sm italic transition-colors
            ${editor.isActive('italic') ? 'bg-blue-500' : 'hover:bg-gray-700'}`}
        >
          I
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`px-2 py-1 rounded text-sm underline transition-colors
            ${editor.isActive('underline') ? 'bg-blue-500' : 'hover:bg-gray-700'}`}
        >
          U
        </button>
        <button
          type="button"
          onClick={handleSetLink}
          className={`px-2 py-1 rounded text-sm transition-colors
            ${editor.isActive('link') ? 'bg-blue-500' : 'hover:bg-gray-700'}`}
        >
          🔗
        </button>
      </BubbleMenu>

      {/* ===== Editor Content ===== */}
      <EditorContent
        editor={editor}
        className="tiptap-editor"
        onClick={() => editor.chain().focus().run()}
      />
    </div>
  )
}

export default RichTextEditor