// PATCH /api/admin/items/[id]
// Update item status or fields

import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const supabase = createServerClient()

    // If publishing, set published_at
    if (body.status === 'published') {
      body.published_at = new Date().toISOString()
    }

    // If unpublishing, clear published_at
    if (body.status === 'approved' && !body.published_at) {
      body.published_at = null
    }

    const { data, error } = await supabase
      .from('items')
      .update(body)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (err) {
    console.error('Item update error:', err)
    return NextResponse.json({ error: 'Failed to update item' }, { status: 500 })
  }
}
