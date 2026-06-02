import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { type CertificationDto } from '../../types/portfolio'

interface Props {
  certifications: CertificationDto[]
}

const CertificationsSection = ({ certifications }: Props) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  if (certifications.length === 0) return null

  return (
    <section id="certifications" className="py-24 px-4 bg-gray-900/50" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <p className="text-pink-400 font-mono mb-2">// certifications</p>
          <h2 className="text-4xl font-black text-white">
            Chứng <span className="text-transparent bg-clip-text
                                   bg-gradient-to-r from-pink-400 to-purple-400">
              chỉ
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className="bg-gray-800/50 border border-gray-700/50
                         rounded-2xl overflow-hidden hover:border-pink-500/30
                         transition-all group"
            >
              {cert.imageUrl && (
                <div className="h-40 overflow-hidden">
                  <img
                    src={cert.imageUrl}
                    alt={cert.name}
                    className="w-full h-full object-cover
                               group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}
              <div className="p-5">
                <h3 className="text-white font-bold mb-1 line-clamp-2">
                  {cert.name}
                </h3>
                {cert.issuer && (
                  <p className="text-pink-400 text-sm mb-2">{cert.issuer}</p>
                )}
                <p className="text-gray-600 text-xs mb-4">
                  {new Date(cert.issuedAt).toLocaleDateString('vi-VN', {
                    month: 'long', year: 'numeric'
                  })}
                </p>
                {cert.certUrl && (
                  <a
                    href={cert.certUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-pink-400 hover:underline
                               flex items-center gap-1"
                  >
                    Xem chứng chỉ ↗
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CertificationsSection