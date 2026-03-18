import Link from 'next/link'
import { AdminNav } from '@/components/admin/AdminNav'

export const metadata = {
  title: 'Admin — Stolen.Vote',
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-950 flex">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 bg-gray-900 border-r border-gray-800 flex flex-col">
        <div className="px-5 py-4 border-b border-gray-800">
          <Link href="/admin" className="block">
            <span className="text-lg font-bold text-white tracking-tight">
              Stolen<span className="text-red-500">.Vote</span>
            </span>
            <span className="block text-xs text-gray-500 mt-0.5">Editorial Admin</span>
          </Link>
        </div>

        <AdminNav />

        <div className="mt-auto px-5 py-4 border-t border-gray-800">
          <Link
            href="/"
            className="block text-xs text-gray-500 hover:text-gray-300 transition-colors mb-2"
            target="_blank"
          >
            ↗ View public site
          </Link>
          <form action="/api/admin/signout" method="POST">
            <button
              type="submit"
              className="text-xs text-gray-500 hover:text-red-400 transition-colors"
            >
              Sign out
            </button>
          </form>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}
