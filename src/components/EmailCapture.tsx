'use client'

import { useState } from 'react'

interface EmailCaptureProps {
  context?: 'homepage' | 'report' | 'subscribe'
}

export default function EmailCapture({ context = 'homepage' }: EmailCaptureProps) {
  const [email, setEmail]   = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const heading = context === 'subscribe'
    ? 'Subscribe to the Stolen.Vote Newsletter'
    : 'The Full Picture In Your Inbox'

  const subtext = context === 'subscribe'
    ? 'Premium analysis, expanded reporting, and curated context — delivered at a frequency that matches the news cycle.'
    : 'Expanded reporting and editorial context not published on the site.'

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    setErrorMsg('')
    try {
      const res  = await fetch('/api/subscribe', {
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
        border: '1px solid #D5D5D7',
        borderTop: '3px solid #9F2236',
        backgroundColor: '#FFFFFF',
        padding: context === 'subscribe' ? '36px' : '20px',
        textAlign: 'center',
      }}>
        <p style={{
          fontFamily: 'var(--font-playfair), Georgia, serif',
          color: '#2D5A1B',
          fontSize: '16px',
          fontWeight: '700',
          margin: '0 0 6px',
        }}>
          You&apos;re on the list.
        </p>
        <p style={{
          fontFamily: 'var(--font-lora), Georgia, serif',
          fontStyle: 'italic',
          color: '#646667',
          fontSize: '13px',
          margin: 0,
        }}>
          Check your inbox to confirm.
        </p>
      </div>
    )
  }

  return (
    <div style={{
      border: '1px solid #D5D5D7',
      borderTop: '3px solid #9F2236',
      backgroundColor: '#FFFFFF',
      padding: context === 'subscribe' ? '36px' : '20px',
    }}>
      <h3 style={{
        fontFamily: 'var(--font-playfair), Georgia, serif',
        color: '#1C1C1C',
        fontSize: context === 'subscribe' ? '22px' : '17px',
        fontWeight: '700',
        margin: '0 0 8px',
        lineHeight: '1.3',
      }}>
        {heading}
      </h3>
      <p style={{
        fontFamily: 'var(--font-lora), Georgia, serif',
        fontStyle: 'italic',
        color: '#646667',
        fontSize: '13px',
        margin: '0 0 16px',
        lineHeight: '1.55',
      }}>
        {subtext}
      </p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          disabled={status === 'loading'}
          style={{
            flex: '1',
            minWidth: '200px',
            backgroundColor: '#F0EFEB',
            border: '1px solid #D5D5D7',
            padding: '9px 12px',
            color: '#1C1C1C',
            fontSize: '14px',
            fontFamily: 'var(--font-lora), Georgia, serif',
            outline: 'none',
            borderRadius: 0,
          }}
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          style={{
            backgroundColor: status === 'loading' ? '#646667' : '#9F2236',
            color: '#F0EFEB',
            border: 'none',
            padding: '9px 18px',
            fontSize: '12px',
            fontFamily: 'var(--font-lora), Georgia, serif',
            fontWeight: '700',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            cursor: status === 'loading' ? 'not-allowed' : 'pointer',
            whiteSpace: 'nowrap',
            borderRadius: 0,
          }}
        >
          {status === 'loading' ? 'Subscribing…' : 'Subscribe'}
        </button>
      </form>

      {status === 'error' && (
        <p style={{
          fontFamily: 'var(--font-lora), Georgia, serif',
          color: '#9F2236',
          fontSize: '12px',
          margin: '10px 0 0',
          fontStyle: 'italic',
        }}>
          {errorMsg}
        </p>
      )}
    </div>
  )
}
