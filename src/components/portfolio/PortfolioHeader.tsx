import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { type AboutInfoDto } from '../../types/portfolio'
import { Link } from 'react-router-dom'
interface Props {
  about?: AboutInfoDto
}

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Works', href: '#works' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact', href: '#contact' },
  { label: 'Blog', href: '/blog' }
]

const PortfolioHeader = ({ about }: Props) => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (href: string) => {
    const el = document.querySelector(href)
    el?.scrollIntoView({ behavior: 'smooth' })
    setMobileOpen(false)
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
      ${scrolled
        ? 'bg-gray-950/90 backdrop-blur-md border-b border-gray-800/50 py-3'
        : 'bg-transparent py-5'}`}
    >
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl font-black"
        >
          <span className="text-transparent bg-clip-text
                           bg-gradient-to-r from-pink-500 to-purple-500">
            {about?.fullName?.split(' ').pop() ?? 'Portfolio'}
          </span>
          <span className="text-white">.</span>
        </motion.div>

        {/* Desktop nav */}
       <nav className="hidden md:flex items-center gap-6">
  {navItems.map((item, i) => (
    item.href.startsWith('#') ? (
      <motion.button
        key={item.href}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.05 }}
        onClick={() => scrollTo(item.href)}
        className="text-gray-400 hover:text-white text-sm
                   transition-colors hover:text-pink-400"
      >
        {item.label}
      </motion.button>
    ) : (
      <motion.div
        key={item.href}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.05 }}
      >
        <Link
          to={item.href}
          className="text-gray-400 hover:text-pink-400 text-sm transition-colors"
        >
          {item.label}
        </Link>
      </motion.div>
    )
  ))}
</nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-gray-400 hover:text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-gray-900 border-t border-gray-800"
          >
            <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-3">
              {navItems.map(item => (
                    item.href.startsWith('#') ? (
                        <button
                        key={item.href}
                        onClick={() => scrollTo(item.href)}
                        className="text-gray-400 hover:text-pink-400
                                    text-left py-2 transition-colors"
                        >
                        {item.label}
                        </button>
                    ) : (
                        <Link
                        key={item.href}
                        to={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="text-gray-400 hover:text-pink-400
                                    text-left py-2 transition-colors"
                        >
                        {item.label}
                        </Link>
                    )
                    ))}
              <button
                onClick={() => scrollTo('#contact')}
                className="bg-gradient-to-r from-pink-500 to-purple-600
                           text-white px-5 py-2 rounded-full text-sm
                           font-semibold mt-2"
              >
                Let's Work 🚀
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default PortfolioHeader