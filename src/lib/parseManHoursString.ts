// Parse a ManHours .md file string into individual item records
// Used by the admin import API route

import type { ItemInsert } from './supabase/types'

function extractField(block: string, fieldName: string): string {
  const regex = new RegExp(`\\*\\*${fieldName}:\\*\\*\\s*(.+)`, 'i')
  const match = block.match(regex)
  return match ? match[1].trim() : ''
}

function parseSource(sourceStr: string) {
  if (!sourceStr) return { source_name: '', source_url: '', source_bias: '' }
  // Format: [Name](url) | Bias: Center
  const linkMatch = sourceStr.match(/\[([^\]]+)\]\(([^)]+)\)/)
  const biasMatch = sourceStr.match(/Bias:\s*(.+)/)
  return {
    source_name: linkMatch ? linkMatch[1] : sourceStr,
    source_url:  linkMatch ? linkMatch[2] : '',
    source_bias: biasMatch ? biasMatch[1].trim() : '',
  }
}

function parseCoverageSpread(spreadStr: string) {
  if (!spreadStr) return []
  // Format: [Outlet](url) (bias), [Outlet2](url) (bias)
  const entries: { outlet: string; url: string; bias: string }[] = []
  const pattern = /\[([^\]]+)\]\(([^)]+)\)\s*\(([^)]+)\)/g
  let match
  while ((match = pattern.exec(spreadStr)) !== null) {
    entries.push({ outlet: match[1], url: match[2], bias: match[3] })
  }
  return entries
}

function parseDocumentation(docStr: string) {
  if (!docStr) return []
  // Format: [Label](url) | [Label2](url)
  const entries: { label: string; url: string }[] = []
  const pattern = /\[([^\]]+)\]\(([^)]+)\)/g
  let match
  while ((match = pattern.exec(docStr)) !== null) {
    entries.push({ label: match[1], url: match[2] })
  }
  return entries
}

function parseStrength(qualityStr: string): 'STRONG' | 'MODERATE' | 'WEAK' | null {
  if (!qualityStr) return null
  const upper = qualityStr.toUpperCase()
  if (upper.includes('STRONG')) return 'STRONG'
  if (upper.includes('MODERATE')) return 'MODERATE'
  if (upper.includes('WEAK')) return 'WEAK'
  return null
}

export function parseManHoursString(
  content: string,
  collectedAt?: string
): Omit<ItemInsert, 'status'>[] {
  // Split on ## ITEM headings
  const itemBlocks = content.split(/(?=^## ITEM \d+)/m).filter(b =>
    b.trim().startsWith('## ITEM') && !b.trim().startsWith('## RUN')
  )

  return itemBlocks.map(block => {
    // Extract category from heading: ## ITEM 01 — CATEGORY
    const headingMatch = block.match(/^## ITEM \d+\s*[—-]\s*(.+)/m)
    const category = headingMatch ? headingMatch[1].trim() : ''

    const headline    = extractField(block, 'Headline')
    const claimant    = extractField(block, 'Claimant')
    const sourceStr   = extractField(block, 'Source')
    const qualityStr  = extractField(block, 'Documentation quality')
    const coverageGap = extractField(block, 'Coverage gap')
    const notes       = extractField(block, 'Notes')
    const spreadStr   = extractField(block, 'Coverage spread')
    const docStr      = extractField(block, 'Documentation')

    const { source_name, source_url, source_bias } = parseSource(sourceStr)

    return {
      category,
      headline,
      claimant,
      source_name,
      source_url,
      source_bias,
      strength:        parseStrength(qualityStr),
      coverage_gap:    coverageGap || null,
      notes:           notes || null,
      coverage_spread: parseCoverageSpread(spreadStr),
      documentation:   parseDocumentation(docStr),
      editor_notes:    null,
      hero_image_id:   null,
      in_carousel:     false,
      carousel_order:  null,
      published_at:    null,
      collected_at:    collectedAt ?? new Date().toISOString(),
    }
  })
}
