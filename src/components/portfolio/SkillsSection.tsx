import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { type SkillDto } from '../../types/portfolio'

interface Props {
  skills: SkillDto[]
  categories: string[]
}

const SkillsSection = ({ skills, categories }: Props) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const [activeCategory, setActiveCategory] = useState<string>('All')

  const allCategories = ['All', ...categories]
  const filtered = activeCategory === 'All'
    ? skills
    : skills.filter(s => s.category === activeCategory)

  return (
    <section id="skills" className="py-24 px-4" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <p className="text-pink-400 font-mono mb-2">// tech stack</p>
          <h2 className="text-4xl font-black text-white">
            Công nghệ <span className="text-transparent bg-clip-text
                                       bg-gradient-to-r from-pink-400 to-purple-400">
              sử dụng
            </span>
          </h2>
        </motion.div>

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {allCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium
                          transition-all ${activeCategory === cat
                ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                : 'border border-gray-700 text-gray-400 hover:border-pink-500 hover:text-pink-400'}`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Skills grid */}
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4
                     lg:grid-cols-6 gap-4"
        >
          {filtered.map((skill, i) => (
            <motion.div
              key={skill.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.05 }}
              className="bg-gray-800/50 border border-gray-700/50
                         rounded-2xl p-4 flex flex-col items-center gap-3
                         hover:border-pink-500/40 hover:bg-gray-800
                         transition-all group cursor-default"
            >
              {skill.iconUrl ? (
                <img
                  src={skill.iconUrl}
                  alt={skill.name}
                  className="w-10 h-10 object-contain"
                />
              ) : (
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br
                                from-pink-500/20 to-purple-500/20
                                flex items-center justify-center
                                text-pink-400 font-bold text-lg">
                  {skill.name.charAt(0)}
                </div>
              )}
              <span className="text-gray-400 text-xs text-center
                               group-hover:text-white transition-colors font-medium">
                {skill.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default SkillsSection