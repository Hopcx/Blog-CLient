import { usePortfolio } from '../hooks/usePortfolio'
import HeroSection from '../components/portfolio/HeroSection'
import AboutSection from '../components/portfolio/AboutSection'
import ProjectsSection from '../components/portfolio/ProjectsSection'
import ExperienceSection from '../components/portfolio/ExperienceSection'
import SkillsSection from '../components/portfolio/SkillsSection'
import CertificationsSection from '../components/portfolio/CertificationsSection'
import ReviewsSection from '../components/portfolio/ReviewsSection'
import ContactSection from '../components/portfolio/ContactSection'
import PortfolioHeader from '../components/portfolio/PortfolioHeader'
import { Skeleton } from 'antd'

const Portfolio = () => {
  const { data, isLoading } = usePortfolio()

  if (isLoading) return (
    <div className="max-w-6xl mx-auto px-4 py-20">
      <Skeleton active paragraph={{ rows: 10 }} />
    </div>
  )

  if (!data) return null

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <PortfolioHeader about={data.about} />

      <main>
        <HeroSection about={data.about} />
        <AboutSection about={data.about} />
        <ProjectsSection projects={data.projects} />
        <ExperienceSection experiences={data.experiences} />
        <SkillsSection
          skills={data.skills}
          categories={data.skillCategories}
        />
        <CertificationsSection certifications={data.certifications} />
        <ReviewsSection reviews={data.reviews} />
        <ContactSection about={data.about} />
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 text-center text-gray-500 text-sm">
        <p>© 2026 {data.about?.fullName}. Built with ❤️ using React + .NET</p>
      </footer>
    </div>
  )
}

export default Portfolio