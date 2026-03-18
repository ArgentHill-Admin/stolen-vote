import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'

export async function POST(request: NextRequest) {
  const supabase = createServerClient()

  // Invalidate the session on Supabase's side
  await supabase.auth.signOut()

  // Clear sb-* auth cookies from the response
  const cookieStore = await cookies()
  const origin = new URL(request.url).origin
  const response = NextResponse.redirect(`${origin}/admin/login`, { status: 303 })

  cookieStore.getAll().forEach(cookie => {
    if (cookie.name.startsWith('sb-')) {
      response.cookies.delete(cookie.name)
    }
  })

  return response
}
