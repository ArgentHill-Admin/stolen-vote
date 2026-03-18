'use client'

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

export function ImportButton() {
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ text: string; ok: boolean } | null>(null)

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setLoading(true)
    setMessage(null)

    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await fetch('/api/admin/import', { method: 'POST', body: formData })
      const json = await res.json()

      if (!res.ok) {
        setMessage({ text: json.error ?? 'Import failed', ok: false })
      } else {
        setMessage({ text: json.message, ok: true })
        router.refresh()
      }
    } catch {
      setMessage({ text: 'Import failed — check console', ok: false })
    } finally {
      setLoading(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  return (
    <div className="flex items-center gap-3">
      <input
        ref={inputRef}
        type="file"
        accept=".md"
        className="hidden"
        onChange={handleFile}
      />
      <button
        onClick={() => inputRef.current?.click()}
        disabled={loading}
        className="px-4 py-2 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 text-gray-200 text-sm font-medium rounded transition-colors"
      >
        {loading ? 'Importing…' : '↑ Import ManHours file'}
      </button>
      {message && (
        <span className={`text-sm ${message.ok ? 'text-green-400' : 'text-red-400'}`}>
          {message.text}
        </span>
      )}
    </div>
  )
}
