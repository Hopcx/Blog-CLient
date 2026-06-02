import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { type ProjectDto } from '../../types/portfolio'

interface Props {
  projects: ProjectDto[]
}

const ProjectsSection = ({ projects }: Props) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const [selected, setSelected] = useState<ProjectDto | null>(null)
  const [showAll, setShowAll] = useState(false)

  const featured = projects.filter(p => p.isFeatured)
  const displayed = showAll ? projects : featured

  return (
    <section id="works" className="py-24 px-4" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <p className="text-pink-400 font-mono mb-2">// my works</p>
          <h2 className="text-4xl font-black text-white">
            Dự án <span className="text-transparent bg-clip-text
                                   bg-gradient-to-r from-pink-400 to-purple-400">
              nổi bật
            </span>
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {displayed.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              onClick={() => setSelected(project)}
              className="bg-gray-800/50 border border-gray-700/50 rounded-2xl
                         overflow-hidden hover:border-pink-500/40 transition-all
                         cursor-pointer group hover:-translate-y-1 hover:shadow-xl
                         hover:shadow-pink-500/10"
            >
              {/* Image */}
              <div className="h-48 overflow-hidden">
                {project.imageUrl ? (
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover
                               group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br
                                  from-pink-500/20 to-purple-500/20
                                  flex items-center justify-center text-5xl">
                    🚀
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-white font-bold text-lg mb-2
                               group-hover:text-pink-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                  {project.shortDescription || project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.slice(0, 3).map(tag => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 rounded-full
                                 bg-purple-500/10 text-purple-400
                                 border border-purple-500/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-3">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={e => e.stopPropagation()}
                      className="text-xs text-pink-400 hover:underline"
                    >
                      Live Demo ↗
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={e => e.stopPropagation()}
                      className="text-xs text-gray-400 hover:text-white
                                 hover:underline"
                    >
                      GitHub ↗
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Show all button */}
        {projects.length > featured.length && (
          <div className="text-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="border border-gray-700 text-gray-400 px-8 py-3
                         rounded-full hover:border-pink-500 hover:text-pink-400
                         transition-all"
            >
              {showAll ? 'Thu gọn' : `Xem thêm ${projects.length - featured.length} dự án`}
            </button>
          </div>
        )}
      </div>

      {/* Modal chi tiết */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50
                       flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="bg-gray-900 border border-gray-700 rounded-2xl
                         max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              {selected.imageUrl && (
                <img
                  src={selected.imageUrl}
                  alt={selected.title}
                  className="w-full h-64 object-cover rounded-t-2xl"
                />
              )}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-2xl font-bold text-white">
                    {selected.title}
                  </h3>
                  <button
                    onClick={() => setSelected(null)}
                    className="text-gray-500 hover:text-white text-2xl ml-4"
                  >
                    ✕
                  </button>
                </div>
                <p className="text-gray-400 leading-relaxed mb-6">
                  {selected.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {selected.tags.map(tag => (
                    <span
                      key={tag}
                      className="text-sm px-3 py-1 rounded-full
                                 bg-purple-500/10 text-purple-400
                                 border border-purple-500/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  {selected.liveUrl && (
                    <a
                      href={selected.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gradient-to-r from-pink-500 to-purple-600
                                 text-white px-6 py-2 rounded-full text-sm
                                 font-semibold hover:opacity-90"
                    >
                      Live Demo ↗
                    </a>
                  )}
                  {selected.githubUrl && (
                    <a
                      href={selected.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border border-gray-700 text-gray-400 px-6 py-2
                                 rounded-full text-sm hover:border-pink-500
                                 hover:text-pink-400 transition-all"
                    >
                      GitHub ↗
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default ProjectsSection