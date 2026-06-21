import Footer from '../components/Footer';

export default function Support() {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: '#FBF3E7', color: '#3A3028' }}
    >
      <div className="flex-1 w-full">
        <div className="max-w-2xl mx-auto px-6 py-12 pb-20">

          <a
            href="/"
            className="inline-block mb-8 text-sm hover:underline"
            style={{ color: '#7A6A55' }}
          >
            ← Back to ManifestDaily
          </a>

          <h1 className="text-4xl font-semibold mb-2" style={{ fontFamily: 'Georgia, serif' }}>
            Support
          </h1>
          <p className="text-base leading-relaxed mb-8" style={{ color: '#8A7B66' }}>
            We're here to help you keep manifesting with ease. However we can support your
            practice, we'd love to hear from you.
          </p>

          <Section title="Get in Touch">
            For help, questions, or feedback, send us a note at{' '}
            <a
              href="mailto:ponvicky@icloud.com"
              className="underline"
              style={{ color: '#3A3028' }}
            >
              ponvicky@icloud.com
            </a>
            . We read every message and aim to reply within a couple of days. Whether something
            isn't working as expected or you simply have an idea to share, your words help
            ManifestDaily grow calmer and kinder.
          </Section>

          <div className="mt-12">
            <h2
              className="text-2xl font-semibold mb-5"
              style={{ fontFamily: 'Georgia, serif', color: '#3A3028' }}
            >
              Frequently Asked Questions
            </h2>

            <Faq question="How do subscriptions and free trials work?">
              ManifestDaily is free to download, with optional subscriptions that unlock premium
              features. If a free trial is offered, you enjoy full access during the trial and
              won't be charged until it ends. Subscriptions are auto-renewable and billed to your
              Apple ID — you can switch or cancel anytime before the next renewal.
            </Faq>

            <Faq question="How do I cancel my subscription?">
              Subscriptions are managed by Apple, so cancelling takes just a moment: open the{' '}
              <strong>Settings</strong> app on your iPhone, tap your name (
              <strong>Apple ID</strong>) at the top, then tap <strong>Subscriptions</strong>.
              Select ManifestDaily and choose <strong>Cancel Subscription</strong>. You'll keep
              access until the end of your current billing period.
            </Faq>

            <Faq question="How do I restore my purchases?">
              If you've reinstalled the app or switched devices, open ManifestDaily and tap{' '}
              <strong>Restore Purchases</strong> on the subscription or settings screen. As long
              as you're signed in with the same Apple ID used for the original purchase, your
              premium access will return right away.
            </Faq>

            <Faq question="How do I manage my notification reminders?">
              You can adjust your daily reminders inside ManifestDaily under{' '}
              <strong>Settings → Reminders</strong>, where you can choose the time and frequency
              that fit your routine. To turn notifications on or off entirely, visit the{' '}
              <strong>Settings</strong> app on your iPhone → <strong>Notifications</strong> →{' '}
              <strong>ManifestDaily</strong>.
            </Faq>

            <Faq question="Where is my data stored?">
              Everything you create — affirmations, journal entries, Vault letters, streaks, and
              stats — lives privately on your device. We don't collect or store your personal
              data. For the full details, see our{' '}
              <a href="/privacy" className="underline" style={{ color: '#3A3028' }}>
                Privacy Policy
              </a>
              .
            </Faq>
          </div>

          <Section title="Privacy & Terms">
            For more on how we handle your information and the terms of using ManifestDaily, please
            read our{' '}
            <a href="/privacy" className="underline" style={{ color: '#3A3028' }}>
              Privacy Policy
            </a>{' '}
            and{' '}
            <a href="/terms" className="underline" style={{ color: '#3A3028' }}>
              Terms of Service
            </a>
            .
          </Section>

        </div>
      </div>

      <Footer />
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-10">
      <h2
        className="text-xl font-semibold mb-3"
        style={{ fontFamily: 'Georgia, serif', color: '#3A3028' }}
      >
        {title}
      </h2>
      <p className="text-base leading-relaxed" style={{ color: '#3A3028' }}>
        {children}
      </p>
    </div>
  );
}

function Faq({ question, children }: { question: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <h3
        className="text-lg font-semibold mb-2"
        style={{ fontFamily: 'Georgia, serif', color: '#3A3028' }}
      >
        {question}
      </h3>
      <p className="text-base leading-relaxed" style={{ color: '#3A3028' }}>
        {children}
      </p>
    </div>
  );
}
