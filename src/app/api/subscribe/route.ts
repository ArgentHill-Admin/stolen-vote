import { NextRequest, NextResponse } from 'next/server'

const BEEHIIV_PUBLICATION_ID = 'pub_26ad28f1-7843-4f91-94f0-4cf2508be5ff'
const BEEHIIV_API_URL = `https://api.beehiiv.com/v2/publications/${BEEHIIV_PUBLICATION_ID}/subscriptions`

export async function POST(req: NextRequest) {
  const { email } = await req.json()

  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return NextResponse.json({ error: 'Valid email required.' }, { status: 400 })
  }

  const apiKey = process.env.BEEHIIV_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'Server configuration error.' }, { status: 500 })
  }

  try {
    const res = await fetch(BEEHIIV_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        reactivate_existing: false,
        send_welcome_email: true,
      }),
    })

    if (!res.ok) {
      const body = await res.text()
      console.error('Beehiiv error:', res.status, body)
      return NextResponse.json({ error: 'Subscription failed. Please try again.' }, { status: 502 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Subscribe route error:', err)
    return NextResponse.json({ error: 'Unexpected error. Please try again.' }, { status: 500 })
  }
}
