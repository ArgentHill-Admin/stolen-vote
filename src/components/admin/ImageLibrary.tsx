'use client'

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Image } from '@/lib/supabase/types'

export function ImageLibrary({ images }: { images: Image[] }) {
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ text: string; ok: boolean } | null>(null)

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setLoading(true)
    setMessage(null)

    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await fetch('/api/admin/images/upload', { method: 'POST', body: formData })
      const json = await res.json()

      if (!res.ok) {
        setMessage({ text: json.error ?? 'Upload failed', ok: false })
      } else {
        setMessage({ text: 'Image uploaded', ok: true })
        router.refresh()
      }
    } catch {
      setMessage({ text: 'Upload failed', ok: false })
    } finally {
      setLoading(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  return (
    <div>
      {/* Upload bar */}
      <div className="flex items-center gap-3 mb-8">
        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          className="hidden"
          onChange={handleUpload}
        />
        <button
          onClick={() => inputRef.current?.click()}
          disabled={loading}
          className="px-4 py-2 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 text-gray-200 text-sm font-medium rounded transition-colors"
        >
          {loading ? 'Uploading…' : '↑ Upload image'}
        </button>
        <span className="text-xs text-gray-500">PNG, JPG, WebP</span>
        {message && (
          <span className={`text-sm ${message.ok ? 'text-green-400' : 'text-red-400'}`}>
            {message.text}
          </span>
        )}
      </div>

      {/* Grid */}
      {images.length === 0 ? (
        <div className="text-center py-16 text-gray-600 text-sm border border-dashed border-gray-800 rounded-lg">
          No images yet. Upload your first image above.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {images.map(image => (
            <div key={image.id} className="group relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image.r2_url}
                alt={image.alt_text ?? image.filename}
                className="w-full aspect-video object-cover rounded bg-gray-800"
              />
              <div className="mt-1 text-xs text-gray-500 truncate">{image.filename}</div>
              <div className="text-xs text-gray-600">
                {new Date(image.created_at).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
