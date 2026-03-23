// JSON-LD Structured Data — Layer 3 of SEO
//
// This renders as a <script type="application/ld+json"> tag
// in your page's HTML. Google's crawler reads it to understand:
// - This page is about a PERSON
// - That person is a RESEARCHER
// - They work at THIS institution
// - They have THESE credentials
//
// This is what powers rich results in Google Search.
// Schema.org defines the vocabulary — it's a shared standard
// used by Google, Bing, Yahoo, and Yandex.

export default function StructuredData() {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Shashank Kumar Maurya',
    honorificPrefix: 'Dr.',
    jobTitle: 'Assistant Professor',
    description:
      'Neuroscientist specialising in Microglia Biology, Neuroimmunology, ' +
      'and Neurodegeneration at the University of Delhi.',
    url: 'https://shashank-portfolio-cg7p0viiu-aabhi00s-projects.vercel.app',
    sameAs: [
      // These tell Google that these external profiles
      // are all the SAME person as this page
      // Add real URLs here — Google uses them to build
      // the knowledge panel
      'https://scholar.google.com/citations?user=8B8nXyoAAAAJ',
      'https://www.du.ac.in',
    ],
    affiliation: {
      '@type': 'Organization',
      name: 'University of Delhi',
      url: 'https://www.du.ac.in',
      department: 'Department of Zoology',
    },
    alumniOf: [
      {
        '@type': 'Organization',
        name: 'University of Delhi',
      },
    ],
    knowsAbout: [
      'Neurobiology',
      'Microglia Biology',
      'Neuroimmunology',
      'Neurodegeneration',
      'Pax6 Transcription Factor',
      "Alzheimer's Disease",
      "Parkinson's Disease",
      'Molecular Docking',
      'Epigenetics',
    ],
    // Number of publications — helps establish authority
    numberOfPublications: 48,
  }

  // WebPage schema — tells Google what kind of page this is
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    name: 'Dr. Shashank Kumar Maurya — Research Portfolio',
    description:
      'Academic research portfolio of Dr. Shashank Kumar Maurya, ' +
      'Assistant Professor of Neurobiology at University of Delhi.',
    url: 'https://shashank-portfolio-cg7p0viiu-aabhi00s-projects.vercel.app',
    mainEntity: {
      '@type': 'Person',
      name: 'Shashank Kumar Maurya',
    },
    // dateModified helps Google know the content is fresh
    dateModified: new Date().toISOString().split('T')[0],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
    </>
  )
}