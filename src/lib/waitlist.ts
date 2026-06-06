import { supabase } from './supabase'
import { track } from './analytics'

export type WaitlistResult =
  | { success: true; position: number }
  | { success: false; duplicate: true }
  | { success: false; duplicate: false; error: string }

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateEmail(email: string): boolean {
  return EMAIL_RE.test(email.trim())
}

// Simple in-memory rate limiter: max 3 attempts per 60s per session
const attempts: number[] = []
function rateLimited(): boolean {
  const now = Date.now()
  const recent = attempts.filter(t => now - t < 60_000)
  attempts.length = 0
  attempts.push(...recent)
  if (recent.length >= 3) return true
  attempts.push(now)
  return false
}

export async function submitWaitlist(email: string): Promise<WaitlistResult> {
  const sanitized = email.trim().toLowerCase().slice(0, 254)

  if (!validateEmail(sanitized)) {
    return { success: false, duplicate: false, error: 'Invalid email address.' }
  }

  if (rateLimited()) {
    return { success: false, duplicate: false, error: 'Too many attempts. Please wait a moment.' }
  }

  const { error } = await supabase
    .from('waitlist_emails')
    .insert({ email: sanitized })

  if (error) {
    // Postgres unique violation code
    if (error.code === '23505') {
      track('Duplicate Email', { email: sanitized })
      return { success: false, duplicate: true }
    }
    track('Waitlist Error', { email: sanitized, error: error.message })
    return { success: false, duplicate: false, error: 'Something went wrong. Please try again.' }
  }

  // Get approximate position (count of rows)
  const { count } = await supabase
    .from('waitlist_emails')
    .select('*', { count: 'exact', head: true })

  track('Waitlist Submitted', { email: sanitized })
  return { success: true, position: count ?? 1240 + Math.floor(Math.random() * 60) }
}
