import { createServerClient } from '@/lib/supabase/server'
import { ItemTable } from '@/components/admin/ItemTable'
import { ImportButton } from '@/components/admin/ImportButton'

export const dynamic = 'force-dynamic'

export default async function QueuePage() {
  const supabase = createServerClient()
  const { data: items } = await supabase
    .from('items')
    .select('*')
    .eq('status', 'pending')
    .order('collected_at', { ascending: false })

  return (
    <div className="p-8">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Queue</h1>
          <p className="text-gray-500 text-sm mt-1">
            {items?.length ?? 0} item{items?.length !== 1 ? 's' : ''} pending review
          </p>
        </div>
        <ImportButton />
      </div>
      <ItemTable items={items ?? []} mode="pending" />
    </div>
  )
}
