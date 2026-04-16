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
    name: 'Ankit Singh',
    jobTitle: 'Research Scholar',
    description:
      'Research Scholar in Neuroscience at Dr. B.R. Ambedkar Center for Biomedical Research (ACBR), ' +
      'University of Delhi, specializing in Neuropharmacology, 3D-QSAR modeling, and Astrocyte Biology.',
    url: 'https://shashank-portfolio-cg7p0viiu-aabhi00s-projects.vercel.app', // Update this to your live URL when deployed
    sameAs: [
      // These tell Google that these external profiles
      // are all the SAME person as this page.
      // NOTE: Replace YOUR_SCHOLAR_ID_HERE with your actual Google Scholar ID
      'https://scholar.google.com/citations?user=yRtQFQUAAAAJ&hl=en',
      'http://acbrdu.edu/',
    ],
    affiliation: {
      '@type': 'Organization',
      name: 'Dr. B.R. Ambedkar Center for Biomedical Research (ACBR), University of Delhi',
      url: 'http://acbrdu.edu/',
      department: 'Neuroscience',
    },
    alumniOf: [
      {
        '@type': 'Organization',
        name: 'Banaras Hindu University',
      },
    ],
    knowsAbout: [
      'Neuropharmacology',
      '3D-QSAR Modeling',
      "Parkinson's Disease",
      'Astrocyte Biology',
      'Drug Discovery',
      'Neuroprotection',
      'Stem Cell Research',
      'Computational Biology',
    ],
    // Number of publications — helps establish authority
    numberOfPublications: 4,
  }

  // WebPage schema — tells Google what kind of page this is
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    name: 'Ankit Singh — Research Portfolio',
    description:
      'Academic research portfolio of Ankit Singh, ' +
      'Research Scholar in Neuroscience at ACBR, University of Delhi.',
    url: 'https://shashank-portfolio-cg7p0viiu-aabhi00s-projects.vercel.app', // Update this to your live URL when deployed
    mainEntity: {
      '@type': 'Person',
      name: 'Ankit Singh',
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