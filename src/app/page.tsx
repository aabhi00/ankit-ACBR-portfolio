import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Timeline from '@/components/Timeline'
import Publications from '@/components/Publications'
import About from '@/components/About'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import { getAllPapers, getAllDomains } from '@/lib/papers'

export default function Home() {
  const papers = getAllPapers()
  const domains = getAllDomains()

  return (
    <main>
      <Nav />
      <Hero />
      <Timeline papers={papers} />
      <Publications papers={papers} domains={domains} />
      <About />
      <Contact />
      <Footer />
    </main>
  )
}