import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { type AboutInfoDto } from '../../types/portfolio'

interface Props {
  about?: AboutInfoDto
}

const AboutSection = ({ about }: Props) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  const whyItems = [
    { icon: '🎯', title: 'Clean Code', desc: 'Viết code sạch, dễ maintain theo chuẩn Clean Architecture' },
    { icon: '⚡', title: 'Performance', desc: 'Tối ưu hiệu năng từ DB query đến FE rendering' },
    { icon: '🔒', title: 'Security', desc: 'Bảo mật JWT, validate input, chống SQL injection' },
    { icon: '📱', title: 'Responsive', desc: 'UI đẹp trên mọi thiết bị từ mobile đến desktop' },
  ]

  return (
    <section id="about" className="py-24 px-4 bg-gray-900/50">
      <div className="max-w-6xl mx-auto" ref={ref}>
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <p className="text-pink-400 font-mono mb-2">// about me</p>
          <h2 className="text-4xl font-black text-white">
            Về <span className="text-transparent bg-clip-text
                                bg-gradient-to-r from-pink-400 to-purple-400">
              tôi
            </span>
          </h2>
        </motion.div>

        {/* 2 columns */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          {/* Avatar */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative">
              {about?.avatarUrl ? (
                <img
                  src={about.avatarUrl}
                  alt={about.fullName}
                  className="w-72 h-72 object-cover rounded-2xl
                             border border-pink-500/30"
                />
              ) : (
                <div className="w-72 h-72 rounded-2xl bg-gradient-to-br
                                from-pink-500/20 to-purple-500/20
                                border border-pink-500/30 flex items-center
                                justify-center text-8xl">
                  👨‍💻
                </div>
              )}
              {/* Decoration */}
              <div className="absolute -bottom-4 -right-4 w-72 h-72
                              rounded-2xl border border-purple-500/20 -z-10" />
              <div className="absolute -top-4 -left-4 w-72 h-72
                              rounded-2xl border border-pink-500/20 -z-10" />
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-2xl font-bold text-white mb-4">
              {about?.fullName}
            </h3>

            <p className="text-gray-400 leading-relaxed mb-6">
              {about?.bio}
            </p>

            {/* Info list */}
            <div className="space-y-3 mb-8">
              {about?.location && (
                <div className="flex items-center gap-3 text-gray-400">
                  <span className="text-pink-400">📍</span>
                  {about.location}
                </div>
              )}
              {about?.email && (
                <div className="flex items-center gap-3 text-gray-400">
                  <span className="text-pink-400">📧</span>
                  <a href={`mailto:${about.email}`}
                    className="hover:text-pink-400 transition-colors">
                    {about.email}
                  </a>
                </div>
              )}
              {about?.githubUrl && (
                <div className="flex items-center gap-3 text-gray-400">
                  <span className="text-pink-400">💻</span>
                  <a href={about.githubUrl} target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-pink-400 transition-colors">
                    GitHub
                  </a>
                </div>
              )}
              {about?.linkedinUrl && (
                <div className="flex items-center gap-3 text-gray-400">
                  <span className="text-pink-400">🔗</span>
                  <a href={about.linkedinUrl} target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-pink-400 transition-colors">
                    LinkedIn
                  </a>
                </div>
              )}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {about?.titleTags?.map(tag => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-sm font-medium
                             bg-pink-500/10 text-pink-400 border border-pink-500/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Why work with me */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold text-white text-center mb-10">
            Tại sao chọn tôi?
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyItems.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="bg-gray-800/50 border border-gray-700/50
                           rounded-2xl p-6 hover:border-pink-500/30
                           hover:bg-gray-800 transition-all group"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h4 className="text-white font-bold mb-2
                               group-hover:text-pink-400 transition-colors">
                  {item.title}
                </h4>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default AboutSection