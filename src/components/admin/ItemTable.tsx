'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useState } from 'react'
import type { Item } from '@/lib/supabase/types'

interface ItemTableProps {
  items: Item[]
  mode: 'pending' | 'approved' | 'published' | 'archived'
}

const STRENGTH_COLORS: Record<string, string> = {
  STRONG:   'text-green-400',
  MODERATE: 'text-yellow-400',
  WEAK:     'text-red-400',
}

export function ItemTable({ items, mode }: ItemTableProps) {
  const router = useRouter()
  const [loading, setLoading] = useState<string | null>(null)

  async function updateStatus(id: string, status: string) {
    setLoading(`${id}-${status}`)
    await fetch(`/api/admin/items/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    setLoading(null)
    router.refresh()
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-16 text-gray-600 text-sm">
        No items here.
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-800 text-left">
            <th className="pb-3 pr-4 text-gray-500 font-medium">Headline</th>
            <th className="pb-3 pr-4 text-gray-500 font-medium w-32">Category</th>
            <th className="pb-3 pr-4 text-gray-500 font-medium w-24">Strength</th>
            <th className="pb-3 pr-4 text-gray-500 font-medium w-32">Claimant</th>
            <th className="pb-3 pr-4 text-gray-500 font-medium w-24">Collected</th>
            <th className="pb-3 text-gray-500 font-medium w-40 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-900">
          {items.map(item => (
            <tr key={item.id} className="group hover:bg-gray-900/40 transition-colors">
              <td className="py-3 pr-4">
                <Link
                  href={`/admin/items/${item.id}`}
                  className="text-gray-200 hover:text-white line-clamp-2 leading-snug"
                >
                  {item.headline ?? '—'}
                </Link>
              </td>
              <td className="py-3 pr-4">
                <span className="text-gray-400 text-xs uppercase tracking-wide">
                  {item.category ?? '—'}
                </span>
              </td>
              <td className="py-3 pr-4">
                <span className={`text-xs font-medium ${STRENGTH_COLORS[item.strength ?? ''] ?? 'text-gray-500'}`}>
                  {item.strength ?? '—'}
                </span>
              </td>
              <td className="py-3 pr-4 text-gray-400 text-xs">
                {item.claimant ?? '—'}
              </td>
              <td className="py-3 pr-4 text-gray-500 text-xs whitespace-nowrap">
                {new Date(item.collected_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </td>
              <td className="py-3 text-right">
                <div className="flex items-center justify-end gap-2">
                  <Link
                    href={`/admin/items/${item.id}`}
                    className="text-xs text-gray-500 hover:text-gray-300 transition-colors px-2 py-1"
                  >
                    Edit
                  </Link>

                  {mode === 'pending' && (
                    <>
                      <button
                        onClick={() => updateStatus(item.id, 'approved')}
                        disabled={loading === `${item.id}-approved`}
                        className="text-xs px-3 py-1 bg-green-900/50 hover:bg-green-800 text-green-400 rounded transition-colors disabled:opacity-50"
                      >
                        {loading === `${item.id}-approved` ? '…' : 'Approve'}
                      </button>
                      <button
                        onClick={() => updateStatus(item.id, 'archived')}
                        disabled={loading === `${item.id}-archived`}
                        className="text-xs px-3 py-1 bg-gray-800 hover:bg-gray-700 text-gray-400 rounded transition-colors disabled:opacity-50"
                      >
                        {loading === `${item.id}-archived` ? '…' : 'Archive'}
                      </button>
                    </>
                  )}

                  {mode === 'approved' && (
                    <>
                      <button
                        onClick={() => updateStatus(item.id, 'published')}
                        disabled={loading === `${item.id}-published`}
                        className="text-xs px-3 py-1 bg-red-900/50 hover:bg-red-800 text-red-400 rounded transition-colors disabled:opacity-50"
                      >
                        {loading === `${item.id}-published` ? '…' : 'Publish'}
                      </button>
                      <button
                        onClick={() => updateStatus(item.id, 'archived')}
                        disabled={loading === `${item.id}-archived`}
                        className="text-xs px-3 py-1 bg-gray-800 hover:bg-gray-700 text-gray-400 rounded transition-colors disabled:opacity-50"
                      >
                        {loading === `${item.id}-archived` ? '…' : 'Archive'}
                      </button>
                    </>
                  )}

                  {mode === 'published' && (
                    <button
                      onClick={() => updateStatus(item.id, 'approved')}
                      disabled={loading === `${item.id}-approved`}
                      className="text-xs px-3 py-1 bg-gray-800 hover:bg-gray-700 text-gray-400 rounded transition-colors disabled:opacity-50"
                    >
                      {loading === `${item.id}-approved` ? '…' : 'Unpublish'}
                    </button>
                  )}

                  {mode === 'archived' && (
                    <button
                      onClick={() => updateStatus(item.id, 'approved')}
                      disabled={loading === `${item.id}-approved`}
                      className="text-xs px-3 py-1 bg-gray-800 hover:bg-gray-700 text-gray-400 rounded transition-colors disabled:opacity-50"
                    >
                      {loading === `${item.id}-approved` ? '…' : 'Restore'}
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
