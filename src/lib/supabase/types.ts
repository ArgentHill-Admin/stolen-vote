// TypeScript types matching the Supabase schema

export type ItemStatus = 'pending' | 'approved' | 'published' | 'archived'
export type ItemStrength = 'STRONG' | 'MODERATE' | 'WEAK'

export interface CoverageSpreadEntry {
  outlet: string
  url: string
  bias: string
}

export interface DocumentationEntry {
  label: string
  url: string
}

export interface Image {
  id: string
  filename: string
  r2_key: string
  r2_url: string
  alt_text: string | null
  created_at: string
}

export interface Item {
  id: string
  collected_at: string
  status: ItemStatus

  // Content
  category: string | null
  strength: ItemStrength | null
  headline: string | null
  claimant: string | null
  source_name: string | null
  source_url: string | null
  source_bias: string | null
  coverage_gap: string | null
  notes: string | null
  coverage_spread: CoverageSpreadEntry[] | null
  documentation: DocumentationEntry[] | null
  editor_notes: string | null

  // Media
  hero_image_id: string | null
  hero_image?: Image | null   // joined when fetched with hero

  // Carousel
  in_carousel: boolean
  carousel_order: number | null

  // Timestamps
  published_at: string | null
  created_at: string
  updated_at: string
}

export type ItemInsert = Omit<Item, 'id' | 'created_at' | 'updated_at' | 'hero_image'>
export type ItemUpdate = Partial<ItemInsert>
