import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Timeline from '@/components/Timeline'
import Publications from '@/components/Publications'
import About from '@/components/About'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import StructuredData from '@/components/StructuredData'
import { getAllPapers, getAllDomains } from '@/lib/papers'
import ErrorBoundary from '@/components/ErrorBoundary'


export default function Home() {
  const papers = getAllPapers()
  const domains = getAllDomains()


   return (
    <>
      <StructuredData />
      <main>
        <Nav />
        
        <ErrorBoundary>
        <Hero />
        </ErrorBoundary>

        <ErrorBoundary>
         <Timeline papers={papers} />
        </ErrorBoundary>
          
        <ErrorBoundary>
        <Publications papers={papers} domains={domains} />
        </ErrorBoundary>

        <ErrorBoundary>
        <About />
        </ErrorBoundary>

        <ErrorBoundary>
        <Contact />
        </ErrorBoundary>

        <ErrorBoundary>
        <Footer />
        </ErrorBoundary>

      </main>
    </>
  )
}