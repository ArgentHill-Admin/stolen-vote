'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/admin',           label: 'Dashboard',  exact: true },
  { href: '/admin/queue',     label: 'Queue',       badge: 'pending' },
  { href: '/admin/approved',  label: 'Approved' },
  { href: '/admin/published', label: 'Published' },
  { href: '/admin/archived',  label: 'Archived' },
  { href: '/admin/images',    label: 'Images' },
]

export function AdminNav() {
  const pathname = usePathname()

  return (
    <nav className="flex-1 px-3 py-4 space-y-0.5">
      {navItems.map(item => {
        const active = item.exact
          ? pathname === item.href
          : pathname.startsWith(item.href)

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`
              flex items-center px-3 py-2 rounded text-sm font-medium transition-colors
              ${active
                ? 'bg-gray-800 text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-800/50'}
            `}
          >
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}
