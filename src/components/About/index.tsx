
const EDUCATION = [
  { degree: 'Ph.D. Scholar, Neuroscience', institution: 'Dr. B.R. Ambedkar Center for Biomedical Research, DU · Present' },
  { degree: "Master's Degree", institution: 'Banaras Hindu University · 2019–2021' },
  { degree: "Bachelor's Degree", institution: 'Banaras Hindu University · 2016–2019' },
]

const INTERESTS = [
  'Neuropharmacology', '3D-QSAR Modeling', "Parkinson's Disease",
  'Astrocyte Biology', 'Drug Discovery', 'Neuroprotection',
  'Stem Cell Research', 'Computational Biology'
]

const STATS = [
  { value: '4', label: 'Publications' },
  { value: '21', label: 'Citations' },
  { value: '3', label: 'h-index' },
  { value: '0', label: 'i10-index' },
]

export default function About() {
  return (
    <section id="about" style={{ padding: '5rem 0', background: 'var(--ink)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 2rem' }}>

        <span style={{ fontSize: '.7rem', letterSpacing: '.2em', textTransform: 'uppercase',
          color: 'var(--amber2)', marginBottom: '.8rem', display: 'block' }}>
          The Researcher
        </span>
        <h2 style={{ fontFamily: 'Playfair Display, serif',
          fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', fontWeight: 400,
          color: 'var(--cream)', marginBottom: '3rem' }}>
          About Ankit Singh
        </h2>

        <div style={{ display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '4rem', alignItems: 'start' }}>

          <div>
            <div style={{ color: 'rgba(250,246,238,0.72)', fontSize: '.95rem', lineHeight: 1.9 }}>
              <p>
                Ankit Singh is a Research Scholar in Neuroscience at the Dr. B.R. Ambedkar Center for Biomedical Research (ACBR), University of Delhi. His research bridges the gap between computational chemistry and neurobiology, with a strong focus on discovering targeted therapies for neurodegenerative disorders.
              </p>
              <p style={{ marginTop: '1rem' }}>
                His recent work leverages advanced 3D-QSAR pharmacophore modeling to identify novel A2AR antagonists, demonstrating significant neuroprotective effects in models of Parkinson's disease. Furthermore, his research investigates the resilience and functional maintenance of fetal neural stem cell-derived astrocytes under hypoxic conditions.
              </p>
              <p style={{ marginTop: '1rem' }}>
                With a growing body of work published in peer-reviewed journals such as Neurotoxicology, Molecular Diversity, and Genes, his findings contribute valuable insights into oxidative stress, apoptotic modulation, and early-stage drug discovery.
              </p>
            </div>

            <p style={{ fontSize: '.7rem', letterSpacing: '.18em', textTransform: 'uppercase',
              color: 'var(--amber2)', marginTop: '2rem', marginBottom: '.8rem' }}>
              Education & Positions
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
              borderRadius: 14, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
               <img
                  src="/ankit.jpeg"   // <-- put your image path here
                  
                  style={{
                      width: '100%',     // 🔥 ADD THIS
                          height: '100%',
                          objectFit: 'cover',
                          display: 'block' 
                  }}
                />
              {/* <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '5rem',
                color: 'rgba(250,246,238,0.25)', fontStyle: 'italic' }}>
                AS
              </span> */}
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

            {/* Note: Update the href below with your actual Google Scholar ID */}
            <a  href="https://scholar.google.com/citations?user=yRtQFQUAAAAJ&hl=en"
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