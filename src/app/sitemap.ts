// A sitemap tells Google exactly what pages exist on your site
// and how recently they were updated.
// Google uses this to prioritise crawling.
// Python parallel: like an index.html that lists all your routes.

import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://shashank-portfolio-cg7p0viiu-aabhi00s-projects.vercel.app',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,   // 1.0 = highest priority
    },
  ]
}