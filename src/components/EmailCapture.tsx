'use client'

import { useState } from 'react'

interface EmailCaptureProps {
  context?: 'homepage' | 'report' | 'subscribe'
}

export default function EmailCapture({ context = 'homepage' }: EmailCaptureProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const heading = context === 'subscribe'
    ? 'Subscribe to the stolen.vote newsletter'
    : 'Get the full picture in your inbox'

  const subtext = context === 'subscribe'
    ? 'Premium analysis, expanded reporting, and curated context — delivered at a frequency that matches the news cycle.'
    : 'Premium content — expanded reporting and editorial context not published on the site.'

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return

    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()

      if (res.ok && data.success) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
        setErrorMsg(data.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setStatus('error')
      setErrorMsg('Connection error. Please try again.')
    }
  }

  if (status === 'success') {
    return (
      <div style={{
        backgroundColor: '#161b22',
        border: '1px solid #1a4731',
        borderRadius: '8px',
        padding: context === 'subscribe' ? '40px' : '24px',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: '28px', marginBottom: '12px' }}>✓</div>
        <p style={{ color: '#3fb950', fontSize: '16px', fontWeight: '600', margin: '0 0 6px' }}>
          You&apos;re on the list.
        </p>
        <p style={{ color: '#484f58', fontSize: '14px', margin: 0 }}>
          Check your inbox to confirm your subscription.
        </p>
      </div>
    )
  }

  return (
    <div style={{
      backgroundColor: '#161b22',
      border: '1px solid #30363d',
      borderRadius: '8px',
      padding: context === 'subscribe' ? '40px' : '24px',
    }}>
      <h3 style={{
        color: '#e6edf3',
        fontSize: context === 'subscribe' ? '22px' : '16px',
        fontWeight: '700',
        margin: '0 0 8px',
        fontFamily: 'Georgia, serif',
      }}>
        {heading}
      </h3>
      <p style={{
        color: '#8b949e',
        fontSize: '14px',
        margin: '0 0 16px',
        lineHeight: '1.5',
      }}>
        {subtext}
      </p>

      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}
      >
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          disabled={status === 'loading'}
          style={{
            flex: '1',
            minWidth: '220px',
            backgroundColor: '#0d1117',
            border: '1px solid #30363d',
            borderRadius: '6px',
            padding: '10px 14px',
            color: '#e6edf3',
            fontSize: '14px',
            outline: 'none',
          }}
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          style={{
            backgroundColor: status === 'loading' ? '#21262d' : '#f85149',
            color: status === 'loading' ? '#8b949e' : '#ffffff',
            border: 'none',
            borderRadius: '6px',
            padding: '10px 20px',
            fontSize: '14px',
            fontWeight: '700',
            cursor: status === 'loading' ? 'not-allowed' : 'pointer',
            whiteSpace: 'nowrap',
            transition: 'background-color 0.15s',
          }}
        >
          {status === 'loading' ? 'Subscribing…' : 'Subscribe'}
        </button>
      </form>

      {status === 'error' && (
        <p style={{ color: '#f85149', fontSize: '13px', margin: '10px 0 0' }}>
          {errorMsg}
        </p>
      )}
    </div>
  )
}
