import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { uploadToR2, buildImageKey } from '@/lib/r2'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'File must be JPG, PNG, or WebP' }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const r2Key = buildImageKey(file.name)
    const r2Url = await uploadToR2({ key: r2Key, body: buffer, contentType: file.type })

    const supabase = createServerClient()
    const { data, error } = await supabase
      .from('images')
      .insert({ filename: file.name, r2_key: r2Key, r2_url: r2Url })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (err) {
    console.error('Image upload error:', err)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
