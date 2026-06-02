import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { type ReviewDto } from '../../types/portfolio'

interface Props {
  reviews: ReviewDto[]
}

const ReviewsSection = ({ reviews }: Props) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  if (reviews.length === 0) return null

  return (
    <section id="reviews" className="py-24 px-4" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <p className="text-pink-400 font-mono mb-2">// testimonials</p>
          <h2 className="text-4xl font-black text-white">
            Đánh giá từ{' '}
            <span className="text-transparent bg-clip-text
                             bg-gradient-to-r from-pink-400 to-purple-400">
              khách hàng
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className="bg-gray-800/50 border border-gray-700/50
                         rounded-2xl p-6 hover:border-pink-500/30
                         transition-all flex flex-col"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, j) => (
                  <span
                    key={j}
                    className={j < review.rating
                      ? 'text-yellow-400'
                      : 'text-gray-700'}
                  >
                    ★
                  </span>
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-400 leading-relaxed mb-6 flex-1 italic">
                "{review.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4
                              border-t border-gray-700/50">
                {review.clientAvatarUrl ? (
                  <img
                    src={review.clientAvatarUrl}
                    alt={review.clientName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br
                                  from-pink-500/30 to-purple-500/30
                                  flex items-center justify-center
                                  text-pink-400 font-bold">
                    {review.clientName.charAt(0)}
                  </div>
                )}
                <div>
                  <p className="text-white font-semibold text-sm">
                    {review.clientName}
                  </p>
                  <p className="text-gray-500 text-xs">
                    {[review.clientTitle, review.clientCompany]
                      .filter(Boolean).join(' @ ')}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ReviewsSection