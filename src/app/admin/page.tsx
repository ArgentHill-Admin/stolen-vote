import Link from 'next/link'
import { createServerClient } from '@/lib/supabase/server'

async function getStats() {
  const supabase = createServerClient()

  const [pending, approved, published, archived] = await Promise.all([
    supabase.from('items').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
    supabase.from('items').select('id', { count: 'exact', head: true }).eq('status', 'approved'),
    supabase.from('items').select('id', { count: 'exact', head: true }).eq('status', 'published'),
    supabase.from('items').select('id', { count: 'exact', head: true }).eq('status', 'archived'),
  ])

  return {
    pending:   pending.count   ?? 0,
    approved:  approved.count  ?? 0,
    published: published.count ?? 0,
    archived:  archived.count  ?? 0,
  }
}

export default async function AdminDashboard() {
  const stats = await getStats()

  const statCards = [
    { label: 'Pending review', value: stats.pending,   href: '/admin/queue',     urgent: stats.pending > 0 },
    { label: 'Approved',       value: stats.approved,  href: '/admin/approved',  urgent: false },
    { label: 'Published',      value: stats.published, href: '/admin/published', urgent: false },
    { label: 'Archived',       value: stats.archived,  href: '/admin/archived',  urgent: false },
  ]

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Stolen.Vote editorial overview</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {statCards.map(card => (
          <Link
            key={card.href}
            href={card.href}
            className="block bg-gray-900 border border-gray-800 hover:border-gray-600 rounded-lg p-5 transition-colors group"
          >
            <div className={`text-3xl font-bold mb-1 ${card.urgent ? 'text-red-400' : 'text-white'}`}>
              {card.value}
            </div>
            <div className="text-sm text-gray-500 group-hover:text-gray-400 transition-colors">
              {card.label}
            </div>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Quick actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/queue"
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded transition-colors"
          >
            Review queue →
          </Link>
          <Link
            href="/admin/images"
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-200 text-sm font-medium rounded transition-colors"
          >
            Image library
          </Link>
          <Link
            href="/"
            target="_blank"
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-200 text-sm font-medium rounded transition-colors"
          >
            ↗ Public site
          </Link>
        </div>
      </div>
    </div>
  )
}
