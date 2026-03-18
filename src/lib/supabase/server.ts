// Server-side Supabase client
// Use in Server Components, Route Handlers, Server Actions
// Uses service role key — bypasses Row Level Security
// NEVER import this in client components

import { createClient } from '@supabase/supabase-js'

export function createServerClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  )
}
