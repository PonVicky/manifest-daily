type WaitlistEvent = 'Waitlist Submitted' | 'Waitlist Error' | 'Duplicate Email'

interface EventProps {
  email?: string
  error?: string
}

export function track(event: WaitlistEvent, props?: EventProps) {
  if (import.meta.env.DEV) {
    console.log(`[Analytics] ${event}`, props)
  }
  // Wire up your analytics provider here (PostHog, Mixpanel, etc.)
  // Example: posthog.capture(event, props)
}
