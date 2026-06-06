import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')!
const FROM_EMAIL = 'Manifest Daily <onboarding@resend.dev>'

serve(async (req) => {
  // Only allow POST from Supabase webhook
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  const payload = await req.json()
  const email = payload?.record?.email

  if (!email) {
    return new Response('No email in payload', { status: 400 })
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: 'bepelofficial@gmail.com',
      subject: `New ManifestDaily signup: ${email}`,
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0;padding:0;background:#FBF3E7;font-family:'Georgia',serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#FBF3E7;padding:48px 24px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;">

          <!-- Logo / Wordmark -->
          <tr>
            <td align="center" style="padding-bottom:40px;">
              <p style="margin:0;font-family:'Georgia',serif;font-size:22px;color:#3A3028;letter-spacing:0.04em;">
                Manifest Daily
              </p>
            </td>
          </tr>

          <!-- Card -->
          <tr>
            <td style="background:rgba(255,253,249,0.8);border-radius:20px;padding:48px 40px;border:1px solid rgba(255,255,255,0.7);box-shadow:0 8px 40px rgba(58,48,40,0.08);">

              <p style="margin:0 0 24px;font-family:'Georgia',serif;font-size:28px;line-height:1.2;color:#3A3028;">
                You're on the list.
              </p>

              <p style="margin:0 0 20px;font-family:'Georgia',serif;font-style:italic;font-size:17px;line-height:1.7;color:#7A6B5D;">
                "The person you'll be in five years is being shaped by the thoughts you practice today."
              </p>

              <p style="margin:0 0 20px;font-size:15px;line-height:1.75;color:#7A6B5D;font-family:system-ui,sans-serif;font-weight:300;">
                Thank you for joining — you're one of the first people who'll experience Manifest Daily when it launches.
              </p>

              <p style="margin:0 0 32px;font-size:15px;line-height:1.75;color:#7A6B5D;font-family:system-ui,sans-serif;font-weight:300;">
                We're building something calm and intentional. Daily affirmations that feel like a ritual,
                focus sessions with ambient soundscapes, and a Vault — a sealed letter to your future self
                that unlocks only when you're ready.
              </p>

              <!-- Divider -->
              <hr style="border:none;border-top:1px solid #ECDFCE;margin:0 0 32px;" />

              <p style="margin:0;font-size:14px;line-height:1.7;color:#7A6B5D;font-family:system-ui,sans-serif;font-weight:300;">
                We'll reach out the moment early access opens. Until then — breathe, trust the process.
              </p>

              <p style="margin:24px 0 0;font-family:'Georgia',serif;font-size:15px;color:#3A3028;">
                — The Manifest Daily team
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding-top:32px;">
              <p style="margin:0;font-size:12px;color:#B8A898;font-family:system-ui,sans-serif;font-weight:300;">
                You're receiving this because you joined the Manifest Daily waitlist.<br/>
                No spam, ever.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `,
    }),
  })

  if (!res.ok) {
    const error = await res.text()
    console.error('Resend error:', error)
    return new Response(`Resend error: ${error}`, { status: 500 })
  }

  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' },
  })
})
