import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { message } from 'antd'
import { type AboutInfoDto } from '../../types/portfolio'

interface Props {
  about?: AboutInfoDto
}

interface ContactForm {
  name: string
  email: string
  subject: string
  message: string
}

const ContactSection = ({ about }: Props) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const [form, setForm] = useState<ContactForm>({
    name: '', email: '', subject: '', message: ''
  })
  const [sending, setSending] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) {
      message.error('Vui lòng điền đầy đủ thông tin!')
      return
    }

    setSending(true)
    try {
      // Formspree endpoint — thay YOUR_FORM_ID bằng ID thật
      const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })

      if (res.ok) {
        message.success('Gửi thành công! Tôi sẽ phản hồi sớm nhất 🎉')
        setForm({ name: '', email: '', subject: '', message: '' })
      } else {
        throw new Error('Send failed')
      }
    } catch {
      message.error('Gửi thất bại, thử lại sau!')
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="contact" className="py-24 px-4 bg-gray-900/50" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <p className="text-pink-400 font-mono mb-2">// contact</p>
          <h2 className="text-4xl font-black text-white mb-4">
            Liên hệ{' '}
            <span className="text-transparent bg-clip-text
                             bg-gradient-to-r from-pink-400 to-purple-400">
              với tôi
            </span>
          </h2>
          <p className="text-gray-400">
            Có dự án thú vị? Hãy để chúng ta cùng nhau tạo ra điều gì đó tuyệt vời!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-bold text-white">
              Thông tin liên hệ
            </h3>

            {[
              { icon: '📧', label: 'Email', value: about?.email, href: `mailto:${about?.email}` },
              { icon: '📍', label: 'Location', value: about?.location },
              { icon: '💻', label: 'GitHub', value: 'GitHub Profile', href: about?.githubUrl },
              { icon: '🔗', label: 'LinkedIn', value: 'LinkedIn Profile', href: about?.linkedinUrl },
            ].filter(item => item.value).map(item => (
              <div key={item.label} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-pink-500/10
                                border border-pink-500/20 flex items-center
                                justify-center text-xl flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <p className="text-gray-600 text-xs mb-1">{item.label}</p>
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-pink-400 transition-colors"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-white">{item.value}</p>
                  )}
                </div>
              </div>
            ))}

            {/* Available badge */}
            <div className="flex items-center gap-3 mt-8 p-4
                            bg-green-500/10 border border-green-500/20
                            rounded-xl">
              <div className="w-3 h-3 bg-green-400 rounded-full
                              animate-pulse flex-shrink-0" />
              <p className="text-green-400 text-sm font-medium">
                Hiện đang nhận dự án mới
              </p>
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            {[
              { name: 'name', label: 'Tên của bạn', type: 'text', placeholder: 'Nguyễn Văn A' },
              { name: 'email', label: 'Email', type: 'email', placeholder: 'email@example.com' },
              { name: 'subject', label: 'Chủ đề', type: 'text', placeholder: 'Tôi muốn hợp tác...' },
            ].map(field => (
              <div key={field.name}>
                <label className="text-gray-400 text-sm mb-1 block">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  value={form[field.name as keyof ContactForm]}
                  onChange={e => setForm(prev => ({
                    ...prev, [field.name]: e.target.value
                  }))}
                  className="w-full bg-gray-800/50 border border-gray-700
                             rounded-xl px-4 py-3 text-white placeholder-gray-600
                             focus:outline-none focus:border-pink-500
                             transition-colors"
                />
              </div>
            ))}

            <div>
              <label className="text-gray-400 text-sm mb-1 block">
                Nội dung
              </label>
              <textarea
                rows={5}
                placeholder="Mô tả dự án của bạn..."
                value={form.message}
                onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
                className="w-full bg-gray-800/50 border border-gray-700
                           rounded-xl px-4 py-3 text-white placeholder-gray-600
                           focus:outline-none focus:border-pink-500
                           transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={sending}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600
                         text-white py-3 rounded-xl font-semibold
                         hover:opacity-90 transition-all disabled:opacity-50
                         disabled:cursor-not-allowed"
            >
              {sending ? 'Đang gửi...' : 'Gửi tin nhắn 🚀'}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}

export default ContactSection