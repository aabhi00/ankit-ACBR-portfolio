

export interface Paper {
  id: string
  year: number
  title: string
  journal: string
  domain: 'Neuroscience' | 'Neurobiology'  
  impact: string
  problem: string
  method: string
  results: string
  impact_long: string
  tags: string[]
  link: string
  citations?: number
}