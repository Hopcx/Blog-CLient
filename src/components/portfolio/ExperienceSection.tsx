import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { type ExperienceDto } from '../../types/portfolio'

interface Props {
  experiences: ExperienceDto[]
}

const ExperienceSection = ({ experiences }: Props) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="experience" className="py-24 px-4 bg-gray-900/50" ref={ref}>
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <p className="text-pink-400 font-mono mb-2">// experience</p>
          <h2 className="text-4xl font-black text-white">
            Kinh <span className="text-transparent bg-clip-text
                                  bg-gradient-to-r from-pink-400 to-purple-400">
              nghiệm
            </span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 top-0 bottom-0 w-px
                          bg-gradient-to-b from-pink-500 to-purple-500
                          opacity-30" />

          <div className="space-y-8">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.15 }}
                className="relative pl-20"
              >
                {/* Dot */}
                <div className={`absolute left-6 top-6 w-4 h-4 rounded-full
                                 border-2 border-pink-500 -translate-x-1/2
                                 ${exp.isCurrent
                                   ? 'bg-pink-500 shadow-lg shadow-pink-500/50'
                                   : 'bg-gray-900'}`}
                />

                {/* Card */}
                <div className="bg-gray-800/50 border border-gray-700/50
                                rounded-2xl p-6 hover:border-pink-500/30
                                transition-all">
                  <div className="flex flex-wrap items-start
                                  justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-white font-bold text-xl">
                        {exp.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        {exp.companyUrl ? (
                          <a
                            href={exp.companyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-pink-400 font-semibold
                                       hover:underline"
                          >
                            {exp.company}
                          </a>
                        ) : (
                          <span className="text-pink-400 font-semibold">
                            {exp.company}
                          </span>
                        )}
                        {exp.location && (
                          <span className="text-gray-600">•</span>
                        )}
                        {exp.location && (
                          <span className="text-gray-500 text-sm">
                            📍{exp.location}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {exp.isCurrent && (
                        <span className="bg-green-500/10 text-green-400
                                         text-xs px-3 py-1 rounded-full
                                         border border-green-500/20">
                          Hiện tại
                        </span>
                      )}
                      <span className="text-gray-500 text-sm bg-gray-700/50
                                       px-3 py-1 rounded-full">
                        {exp.period}
                      </span>
                    </div>
                  </div>

                  {/* Bullets */}
                  <ul className="space-y-2">
                    {exp.bullets.map((bullet, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-3 text-gray-400 text-sm"
                      >
                        <span className="text-pink-500 mt-1 flex-shrink-0">▹</span>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ExperienceSection