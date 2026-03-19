const EDUCATION = [
  { degree: 'Ph.D. in Neuroscience', institution: 'NIMHANS, Bengaluru · 2014' },
  { degree: 'M.Sc. Zoology — Cell Biology', institution: 'Delhi University · 2009' },
  { degree: 'Postdoctoral Fellow, Glial Biology', institution: 'University of Edinburgh · 2014–2017' },
]

const INTERESTS = [
  'Microglial senescence', 'Neuroinflammation', 'Single-cell RNA-seq',
  'In vivo imaging', "Alzheimer's disease", 'Synaptic pruning', 'Glial heterogeneity',
]

const STATS = [
  { value: '47', label: 'Publications' },
  { value: '1.8k', label: 'Citations' },
  { value: '21', label: 'h-index' },
  { value: '8', label: 'PhD Students' },
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
          About Dr. Nair
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '4rem', alignItems: 'start' }}>

          {/* Left — Bio + Education + Interests */}
          <div>
            <div style={{ color: 'rgba(250,246,238,0.72)', fontSize: '.95rem', lineHeight: 1.9 }}>
              <p>Dr. Priya Nair is a neuroscientist whose work stands at the crossroads of immunology
                and neurodegeneration. Her lab investigates how microglia — the brain's resident immune
                sentinels — change character as we age, and how those changes seed the conditions for
                Alzheimer's, Parkinson's, and related dementias.</p>
              <p style={{ marginTop: '1rem' }}>
                Trained in classical zoology before pivoting to cellular neuroscience, she brings an
                ecological lens to brain biology: viewing the aging neural environment as a shifting
                habitat in which glial and neuronal populations compete, cooperate, and collapse.
              </p>
              <p style={{ marginTop: '1rem' }}>
                Her research has been supported by DBT, ICMR, and international collaborations
                across three continents. She mentors a team of eight doctoral students and two
                postdoctoral researchers.
              </p>
            </div>

            {/* Education */}
            <p style={{ fontSize: '.7rem', letterSpacing: '.18em', textTransform: 'uppercase',
              color: 'var(--amber2)', marginTop: '2rem', marginBottom: '.8rem' }}>
              Education
            </p>
            {EDUCATION.map((item) => (
              <div key={item.degree} style={{ display: 'flex', gap: '.8rem', marginBottom: '.9rem' }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--moss3)',
                  marginTop: '.5rem', flexShrink: 0 }} />
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

            {/* Interests */}
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

          {/* Right — Portrait placeholder + Stats */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <div style={{
              width: '100%', maxWidth: 320, aspectRatio: '3/4',
              background: 'linear-gradient(135deg, var(--moss) 0%, var(--ink) 100%)',
              borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '5rem',
                color: 'rgba(250,246,238,0.25)', fontStyle: 'italic' }}>
                PN
              </span>
            </div>

            {/* Stats grid */}
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
          </div>
        </div>
      </div>
    </section>
  )
}