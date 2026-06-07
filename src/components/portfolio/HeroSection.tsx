import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { type AboutInfoDto } from '../../types/portfolio'
import avtImage from '../../assets/avt.jpg'

interface Props {
  about?: AboutInfoDto
}

const HeroSection = ({ about }: Props) => {
  const typeSequence = about?.titleTags?.flatMap(tag => [tag, 2000]) ?? []

  return (
    <section className="min-h-screen flex items-center justify-center
                        relative overflow-hidden px-4">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br
                      from-gray-950 via-purple-950/20 to-gray-950" />

      {/* Glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96
                      bg-pink-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96
                      bg-purple-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Avatar */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', duration: 0.8 }}
          className="mb-8 flex justify-center"
        >
          <div className="relative">
            <img
              src={avtImage}
              alt={about?.fullName || 'Avatar'}
              className="w-32 h-32 rounded-full object-cover
                         border-4 border-pink-500/50"
            />
            <div className="absolute inset-0 rounded-full
                            bg-gradient-to-br from-pink-500/20 to-purple-500/20" />
            {/* Online indicator */}
            <div className="absolute bottom-2 right-2 w-4 h-4
                            bg-green-400 rounded-full border-2 border-gray-950" />
          </div>
        </motion.div>

        {/* Greeting */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-pink-400 font-mono text-lg mb-4"
        >
          👋 Xin chào, tôi là
        </motion.p>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-5xl md:text-7xl font-black mb-6"
        >
          <span className="text-white">{about?.fullName ?? 'Developer'}</span>
        </motion.h1>

        {/* Type animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-2xl md:text-3xl font-bold mb-8 h-10"
        >
          <span className="text-transparent bg-clip-text
                           bg-gradient-to-r from-pink-400 to-purple-400">
            {typeSequence.length > 0 ? (
              <TypeAnimation
                sequence={typeSequence as (string | number)[]}
                wrapper="span"
                cursor={true}
                repeat={Infinity}
              />
            ) : 'Full Stack Developer'}
          </span>
        </motion.div>

        {/* Bio short */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-gray-400 text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {about?.bio}
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex justify-center gap-8 mb-12"
        >
          {[
            { value: `${about?.yearsExperience ?? 0}+`, label: 'Năm kinh nghiệm' },
            { value: `${about?.projectsCompleted ?? 0}+`, label: 'Dự án' },
            { value: `${about?.clientsSatisfied ?? 0}+`, label: 'Khách hàng' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-black text-transparent bg-clip-text
                            bg-gradient-to-r from-pink-400 to-purple-400">
                {stat.value}
              </p>
              <p className="text-gray-500 text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <button
            onClick={() => document.querySelector('#works')
              ?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-gradient-to-r from-pink-500 to-purple-600
                       text-white px-8 py-3 rounded-full font-semibold
                       hover:opacity-90 transition-all hover:scale-105"
          >
            Xem dự án 🚀
          </button>

          {about?.githubUrl && (
            <a
              href={about.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-gray-700 text-gray-300 px-8 py-3
                         rounded-full font-semibold hover:border-pink-500
                         hover:text-white transition-all"
            >
              GitHub ⭐
            </a>
          )}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2
                     text-gray-600 text-2xl cursor-pointer"
          onClick={() => document.querySelector('#about')
            ?.scrollIntoView({ behavior: 'smooth' })}
        >
          ↓
        </motion.div>
      </div>
    </section>
  )
}

export default HeroSection