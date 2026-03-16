import fs from 'fs'
import path from 'path'

// ─── Types ───────────────────────────────────────────────────────────────────

export interface ManHoursLink {
  text: string
  url: string
}

export interface ManHoursSource {
  name: string
  url: string
  bias: string
}

export interface ManHoursItem {
  number: number
  category: string
  headline: string
  claimant: string
  sources: ManHoursSource[]
  documentation: ManHoursLink[]
  coverageSpread: ManHoursSource[]
  coverageGap: string
  coverageGapNotable: boolean
  documentationQuality: 'STRONG' | 'MODERATE' | 'WEAK'
  documentationQualityNote: string
  notes: string
}

export interface EditorNote {
  label: string
  content: string
}

export interface RunSummary {
  itemsCollected: number
  strongCount: number
  moderateCount: number
  weakCount: number
  coverageGapsCount: number
  editorNotes: EditorNote[]
}

export interface ManHoursReport {
  date: string
  displayDate: string
  items: ManHoursItem[]
  runSummary: RunSummary
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function extractLinks(text: string): ManHoursLink[] {
  const links: ManHoursLink[] = []
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g
  let match
  while ((match = regex.exec(text)) !== null) {
    links.push({ text: match[1], url: match[2] })
  }
  return links
}

// Parse: [Name](url) | Bias: Center | [Name2](url2) | Bias: Left
function parseSources(text: string): ManHoursSource[] {
  const sources: ManHoursSource[] = []
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
  const links: Array<{ text: string; url: string; index: number }> = []

  let match
  while ((match = linkRegex.exec(text)) !== null) {
    links.push({ text: match[1], url: match[2], index: match.index })
  }

  for (let i = 0; i < links.length; i++) {
    const link = links[i]
    const nextIndex = links[i + 1] ? links[i + 1].index : text.length
    const segment = text.slice(link.index, nextIndex)
    const biasMatch = segment.match(/Bias:\s*([^|[\n]+)/)
    sources.push({
      name: link.text,
      url: link.url,
      bias: biasMatch ? biasMatch[1].trim() : '',
    })
  }

  return sources
}

// Parse: [Name](url) (bias label), [Name2](url2) (bias label)
function parseCoverageSpread(text: string): ManHoursSource[] {
  const sources: ManHoursSource[] = []
  // Match [text](url) (bias) — bias in parentheses immediately after the link
  const regex = /\[([^\]]+)\]\(([^)]+)\)\s*\(([^)]+)\)/g
  let match
  while ((match = regex.exec(text)) !== null) {
    sources.push({ name: match[1], url: match[2], bias: match[3] })
  }
  // Fallback: just extract links without bias if pattern not found
  if (sources.length === 0) {
    return extractLinks(text).map(l => ({ name: l.text, url: l.url, bias: '' }))
  }
  return sources
}

function parseQuality(text: string): {
  quality: 'STRONG' | 'MODERATE' | 'WEAK'
  note: string
} {
  const upper = text.toUpperCase()
  let quality: 'STRONG' | 'MODERATE' | 'WEAK' = 'MODERATE'
  if (upper.startsWith('STRONG')) quality = 'STRONG'
  else if (upper.startsWith('WEAK')) quality = 'WEAK'

  const dashIndex = text.indexOf(' — ')
  const note = dashIndex >= 0 ? text.slice(dashIndex + 3).trim() : ''

  return { quality, note }
}

function getFieldValue(lines: string[], fieldName: string): string {
  const prefix = `**${fieldName}:**`
  const line = lines.find(l => l.trimStart().startsWith(prefix))
  if (!line) return ''
  return line.slice(line.indexOf(prefix) + prefix.length).trim()
}

// ─── Item Parser ─────────────────────────────────────────────────────────────

function parseItem(itemText: string): ManHoursItem | null {
  const headerMatch = itemText.match(/##\s*ITEM\s*(\d+)\s*—\s*\[([^\]]+)\]/)
  if (!headerMatch) return null

  const lines = itemText.split('\n')

  const headline = getFieldValue(lines, 'Headline')
  const claimant = getFieldValue(lines, 'Claimant')
  const sourceText = getFieldValue(lines, 'Source')
  const documentationText = getFieldValue(lines, 'Documentation')
  const coverageSpreadText = getFieldValue(lines, 'Coverage spread')
  const coverageGap = getFieldValue(lines, 'Coverage gap')
  const qualityText = getFieldValue(lines, 'Documentation quality')
  const notes = getFieldValue(lines, 'Notes')

  const { quality, note } = parseQuality(qualityText)

  return {
    number: parseInt(headerMatch[1]),
    category: headerMatch[2],
    headline,
    claimant,
    sources: parseSources(sourceText),
    documentation: extractLinks(documentationText),
    coverageSpread: parseCoverageSpread(coverageSpreadText),
    coverageGap,
    coverageGapNotable: coverageGap.toUpperCase().includes('NOTABLE'),
    documentationQuality: quality,
    documentationQualityNote: note,
    notes,
  }
}

// ─── Run Summary Parser ───────────────────────────────────────────────────────

function parseRunSummary(summaryText: string): RunSummary {
  const itemsMatch = summaryText.match(/Items collected:\s*(\d+)/)
  const strongMatch = summaryText.match(/Strong documentation:\s*(\d+)/)
  const moderateMatch = summaryText.match(/Moderate documentation:\s*(\d+)/)
  const weakMatch = summaryText.match(/Weak documentation:\s*(\d+)/)
  const gapsMatch = summaryText.match(/Coverage gaps identified:\s*(\d+)/)

  const editorNotes: EditorNote[] = []
  const notesSection = summaryText.split('### Editor Notes')[1] || ''
  const noteRegex = /- \*\*([^:*]+)(?::\*\*|\*\*:)\s*(.+)/g
  let match
  while ((match = noteRegex.exec(notesSection)) !== null) {
    editorNotes.push({
      label: match[1].trim(),
      content: match[2].trim(),
    })
  }

  return {
    itemsCollected: itemsMatch ? parseInt(itemsMatch[1]) : 0,
    strongCount: strongMatch ? parseInt(strongMatch[1]) : 0,
    moderateCount: moderateMatch ? parseInt(moderateMatch[1]) : 0,
    weakCount: weakMatch ? parseInt(weakMatch[1]) : 0,
    coverageGapsCount: gapsMatch ? parseInt(gapsMatch[1]) : 0,
    editorNotes,
  }
}

// ─── Main Parse Function ──────────────────────────────────────────────────────

export function parseManHoursFile(content: string): ManHoursReport | null {
  const dateMatch = content.match(/# Man Hours Report — (\d{4}-\d{2}-\d{2})/)
  if (!dateMatch) return null
  const date = dateMatch[1]

  const [year, month, day] = date.split('-').map(Number)
  const dateObj = new Date(year, month - 1, day)
  const displayDate = dateObj.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  // Split on hr lines
  const sections = content.split(/\n---\n/)

  const items: ManHoursItem[] = []
  for (const section of sections) {
    if (/##\s*ITEM\s*\d+/.test(section)) {
      const item = parseItem(section)
      if (item) items.push(item)
    }
  }

  const summarySection =
    sections.find(s => s.includes('## RUN SUMMARY')) || ''
  const runSummary = parseRunSummary(summarySection)

  return { date, displayDate, items, runSummary }
}

// ─── File System Helpers ──────────────────────────────────────────────────────

const APPROVED_DIR = path.join(process.cwd(), 'content', 'approved')

export function getApprovedFileNames(): string[] {
  try {
    return fs
      .readdirSync(APPROVED_DIR)
      .filter(f => f.endsWith('.md') && f !== '.gitkeep')
      .sort()
      .reverse()
  } catch {
    return []
  }
}

export function getReport(date: string): ManHoursReport | null {
  const filePath = path.join(APPROVED_DIR, `${date}_ManHours.md`)
  try {
    const content = fs.readFileSync(filePath, 'utf-8')
    return parseManHoursFile(content)
  } catch {
    return null
  }
}

export function getAllReports(): ManHoursReport[] {
  const files = getApprovedFileNames()
  const reports: ManHoursReport[] = []
  for (const file of files) {
    try {
      const content = fs.readFileSync(path.join(APPROVED_DIR, file), 'utf-8')
      const report = parseManHoursFile(content)
      if (report) reports.push(report)
    } catch {
      // skip unparseable files
    }
  }
  return reports
}

export function getAllDates(): string[] {
  return getApprovedFileNames().map(f => f.replace('_ManHours.md', ''))
}
