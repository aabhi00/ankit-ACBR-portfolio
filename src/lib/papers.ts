// Python equivalent:
// import json
// def get_papers():
//     with open('papers.json') as f:
//         return json.load(f)

import papersData from '@/data/papers.json'
import type { Paper } from '@/types'

export function getAllPapers(): Paper[] {
  return papersData as Paper[]
}

export function getPapersByDomain(domain: string): Paper[] {
  if (domain === 'All') return getAllPapers()
  return papersData.filter((p) => p.domain === domain) as Paper[]
}

export function getAllDomains(): string[] {
  const domains = papersData.map((p) => p.domain)
  return ['All', ...Array.from(new Set(domains))]
}

export function getAllYears(): number[] {
  const years = papersData.map((p) => p.year)
  return Array.from(new Set(years)).sort((a, b) => b - a)
}