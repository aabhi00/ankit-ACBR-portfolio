import dynamic from 'next/dynamic'
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Footer from '@/components/Footer'
import ErrorBoundary from '@/components/ErrorBoundary'
import StructuredData from '@/components/StructuredData'
import { getAllPapers, getAllDomains } from '@/lib/papers'

const Timeline = dynamic(() => import('@/components/Timeline'), {
  loading: () => <SectionSkeleton height="600px" bg="var(--parchment)" />,
})

const Publications = dynamic(() => import('@/components/Publications'), {
  loading: () => <SectionSkeleton height="800px" bg="var(--cream)" />,
})

const About = dynamic(() => import('@/components/About'), {
  loading: () => <SectionSkeleton height="600px" bg="var(--ink)" />,
})

const Contact = dynamic(() => import('@/components/Contact'), {
  loading: () => <SectionSkeleton height="500px" bg="var(--cream)" />,
})

function SectionSkeleton({ height, bg }: { height: string; bg: string }) {
  return (
    <div style={{
      height, background: bg,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{
        width: 40, height: 40, borderRadius: '50%',
        border: '3px solid rgba(196,118,42,0.3)',
        borderTopColor: '#c4762a',
        animation: 'spin 0.8s linear infinite',
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

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
        <Footer />
      </main>
    </>
  )
}