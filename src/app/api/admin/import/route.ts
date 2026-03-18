// POST /api/admin/import
// Accepts a ManHours .md file, parses it, inserts items into Supabase as 'pending'

import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { parseManHoursString } from '@/lib/parseManHoursString'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    if (!file.name.endsWith('.md')) {
      return NextResponse.json({ error: 'File must be a .md file' }, { status: 400 })
    }

    // Extract date from filename: YYYY-MM-DD_ManHours.md
    const dateMatch = file.name.match(/^(\d{4}-\d{2}-\d{2})/)
    const collectedAt = dateMatch
      ? new Date(`${dateMatch[1]}T07:00:00Z`).toISOString()
      : new Date().toISOString()

    const content = await file.text()
    const items = parseManHoursString(content, collectedAt)

    if (items.length === 0) {
      return NextResponse.json({ error: 'No items found in file' }, { status: 400 })
    }

    const supabase = createServerClient()

    const { data, error } = await supabase
      .from('items')
      .insert(items.map(item => ({ ...item, status: 'pending' })))
      .select('id')

    if (error) {
      console.error('Supabase insert error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({
      imported: data?.length ?? 0,
      message: `Imported ${data?.length ?? 0} items from ${file.name}`,
    })
  } catch (err) {
    console.error('Import error:', err)
    return NextResponse.json({ error: 'Failed to import file' }, { status: 500 })
  }
}
