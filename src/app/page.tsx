import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Timeline from '@/components/Timeline'
import { getAllPapers } from '@/lib/papers'

export default function Home() {
  // This runs on the SERVER — like a Python function fetching data
  // before sending the HTML response. Zero loading spinner needed.
  const papers = getAllPapers()

  return (
    <main>
      <Nav />
      <Hero />
      <Timeline papers={papers} />
    </main>
  )
}