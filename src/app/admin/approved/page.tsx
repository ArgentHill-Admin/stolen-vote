import { createServerClient } from '@/lib/supabase/server'
import { ItemTable } from '@/components/admin/ItemTable'

export const dynamic = 'force-dynamic'

export default async function ApprovedPage() {
  const supabase = createServerClient()
  const { data: items } = await supabase
    .from('items')
    .select('*')
    .eq('status', 'approved')
    .order('collected_at', { ascending: false })

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Approved</h1>
        <p className="text-gray-500 text-sm mt-1">
          {items?.length ?? 0} item{items?.length !== 1 ? 's' : ''} ready to publish
        </p>
      </div>
      <ItemTable items={items ?? []} mode="approved" />
    </div>
  )
}
