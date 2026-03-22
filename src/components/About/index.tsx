const EDUCATION = [
  { degree: 'Ph.D. in Neuroscience', institution: 'University of Delhi' },
  { degree: 'Postdoctoral Research', institution: 'Advanced Neurobiology Program' },
  { degree: 'Assistant Professor, Zoology', institution: 'University of Delhi · Present' },
]

const INTERESTS = [
  'Microglia biology', 'Neuroinflammation', 'Pax6 transcription factor',
  'Epigenetic regulation', "Alzheimer's disease", 'Gut-brain axis',
  'Natural product therapeutics', 'Neuroimmunology',
]

const STATS = [
  { value: '48', label: 'Publications' },
  { value: '395', label: 'Citations' },
  { value: '12', label: 'h-index' },
  { value: '13', label: 'i10-index' },
]

export default function About() {
  return (
    <section id="about" style={{ padding: '5rem 0', background: 'var(--ink)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 2rem' }}>

        <span style={{ fontSize: '.7rem', letterSpacing: '.2em', textTransform: 'uppercase',
          color: 'var(--amber2)', marginBottom: '.8rem', display: 'block' }}>
          The Scientist
        </span>
        <h2 style={{ fontFamily: 'Playfair Display, serif',
          fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', fontWeight: 400,
          color: 'var(--cream)', marginBottom: '3rem' }}>
          About Dr. Shashank Kumar Maurya
        </h2>

        <div style={{ display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '4rem', alignItems: 'start' }}>

          <div>
            <div style={{ color: 'rgba(250,246,238,0.72)', fontSize: '.95rem', lineHeight: 1.9 }}>
              <p>
                Dr. Shashank Kumar Maurya is an Assistant Professor in the Department of Zoology
                at the University of Delhi, whose research spans
  neuroimmunology, microglial biology, neurodegeneration, and computational
  pharmacology. Her work investigates how transcription factors, epigenetic
  regulators, and natural bioactive compounds govern brain immunity and
  disease progression.
              </p>
              <p style={{ marginTop: '1rem' }}>
  With over 48 publications spanning journals including Nature Neuroscience,
  Cell Reports, Frontiers in Immunology, and Experimental Neurology, her lab
  has built a comprehensive body of work connecting molecular mechanisms to
  translational therapeutic strategies for Alzheimer's, Parkinson's, and
  vascular dementia.
</p>
<p style={{ marginTop: '1rem' }}>
  Her research has been supported by national funding bodies and has been
  cited across clinical trials, drug discovery programs, and public health
  policy frameworks internationally.
</p>
              <p style={{ marginTop: '1rem' }}>
                With over 395 citations and an h-index of 12, Dr. Maurya's work is published in
                leading journals including Frontiers in Immunology, Journal of Neuroscience
                Research, Life Sciences, and Nature conference proceedings. He holds a verified
                affiliation at zoology.du.ac.in.
              </p>
            </div>

            <p style={{ fontSize: '.7rem', letterSpacing: '.18em', textTransform: 'uppercase',
              color: 'var(--amber2)', marginTop: '2rem', marginBottom: '.8rem' }}>
              Positions
            </p>
            {EDUCATION.map((item) => (
              <div key={item.degree} style={{ display: 'flex', gap: '.8rem', marginBottom: '.9rem' }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%',
                  background: 'var(--moss3)', marginTop: '.5rem', flexShrink: 0 }} />
                <div>
                  <p style={{ fontSize: '.88rem', color: 'var(--cream)', fontWeight: 500 }}>
                    {item.degree}
                  </p>
                  <p style={{ fontSize: '.8rem', color: 'rgba(250,246,238,0.45)' }}>
                    {item.institution}
                  </p>
                </div>
              </div>
            ))}

            <p style={{ fontSize: '.7rem', letterSpacing: '.18em', textTransform: 'uppercase',
              color: 'var(--amber2)', marginTop: '1.8rem', marginBottom: '.8rem' }}>
              Research Interests
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.4rem' }}>
              {INTERESTS.map((interest) => (
                <span key={interest} style={{
                  background: 'rgba(250,246,238,0.07)',
                  border: '1px solid rgba(250,246,238,0.12)',
                  color: 'rgba(250,246,238,0.65)',
                  padding: '.25rem .7rem', borderRadius: 5, fontSize: '.78rem',
                }}>
                  {interest}
                </span>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <div style={{
              width: '100%', maxWidth: 320, aspectRatio: '3/4',
              background: 'linear-gradient(135deg, var(--moss) 0%, var(--ink) 100%)',
              borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '5rem',
                color: 'rgba(250,246,238,0.25)', fontStyle: 'italic' }}>
                SM
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr',
              gap: '.7rem', maxWidth: 320 }}>
              {STATS.map((stat) => (
                <div key={stat.label} style={{
                  background: 'rgba(250,246,238,0.06)',
                  border: '1px solid rgba(250,246,238,0.1)',
                  borderRadius: 8, padding: '.9rem 1rem',
                }}>
                  <p style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.6rem',
                    fontWeight: 300, color: 'var(--amber3)' }}>
                    {stat.value}
                  </p>
                  <p style={{ fontSize: '.72rem', color: 'rgba(250,246,238,0.4)',
                    letterSpacing: '.08em', textTransform: 'uppercase' }}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Google Scholar link */}
            
            <a  href="https://scholar.google.com/citations?hl=en&tzom=-330&user=8B8nXyoAAAAJ"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '.6rem',
                padding: '.7rem 1.2rem', borderRadius: 8, maxWidth: 320,
                background: 'rgba(250,246,238,0.07)',
                border: '1px solid rgba(250,246,238,0.15)',
                color: 'var(--amber2)', textDecoration: 'none',
                fontSize: '.85rem', fontWeight: 500, transition: 'all .2s',
              }}
            >
              🎓 View Google Scholar Profile
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}