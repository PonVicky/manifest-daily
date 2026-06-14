export default function Terms() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FBF3E7', color: '#3A3028' }}>
      <div className="max-w-2xl mx-auto px-6 py-12 pb-20">

        <a
          href="/"
          className="inline-block mb-8 text-sm hover:underline"
          style={{ color: '#7A6A55' }}
        >
          ← Back to ManifestDaily
        </a>

        <h1 className="text-4xl font-semibold mb-2" style={{ fontFamily: 'Georgia, serif' }}>
          Terms of Service
        </h1>
        <p className="text-sm mb-8" style={{ color: '#8A7B66' }}>
          Last updated: June 14, 2026
        </p>

        <p className="text-base leading-relaxed mb-6">
          Welcome to ManifestDaily ("the App"), provided by Bepel ("we," "us," or "our"). By
          downloading or using the App, you agree to these Terms of Service. If you do not agree,
          please do not use the App.
        </p>

        <Section title="The Service">
          ManifestDaily is a wellness and self-growth app offering daily affirmations, journaling,
          and related features intended to support reflection and personal motivation.
        </Section>

        <Section title="Not Medical or Professional Advice">
          ManifestDaily is provided for personal growth and entertainment purposes only. It is not
          a substitute for professional medical, psychological, financial, or other advice. If you
          are experiencing a health or mental-health concern, please consult a qualified
          professional. Do not disregard professional advice because of anything in the App.
        </Section>

        <div className="mt-8">
          <h2
            className="text-xl font-semibold mb-3"
            style={{ fontFamily: 'Georgia, serif', color: '#3A3028' }}
          >
            Subscriptions and Payments
          </h2>
          <p className="text-base leading-relaxed mb-4" style={{ color: '#3A3028' }}>
            ManifestDaily offers optional paid subscriptions and a one-time lifetime purchase:
          </p>
          <ul className="list-disc pl-5 mb-4 space-y-1 text-base" style={{ color: '#3A3028' }}>
            <li>Weekly — $3.99</li>
            <li>Monthly — $9.99</li>
            <li>Annual — $49.99</li>
            <li>Lifetime — $149.99 (one-time payment)</li>
          </ul>
          <p className="text-base leading-relaxed mb-4" style={{ color: '#3A3028' }}>
            Subscriptions are auto-renewable. Payment is charged to your Apple ID account at
            confirmation of purchase. Your subscription automatically renews at the end of each
            billing period unless you cancel at least 24 hours before the period ends.
          </p>
          <p className="text-base leading-relaxed mb-4" style={{ color: '#3A3028' }}>
            You can manage or cancel your subscription at any time in your Apple ID account
            settings (Settings → your name → Subscriptions). Deleting the App does not cancel
            your subscription. Prices are listed in US dollars and may vary by region; applicable
            taxes may apply.
          </p>
          <p className="text-base leading-relaxed" style={{ color: '#3A3028' }}>
            Refunds are handled by Apple under the App Store terms; we are unable to process
            refunds directly.
          </p>
        </div>

        <Section title="License">
          We grant you a personal, non-exclusive, non-transferable, revocable license to use the
          App for your own personal, non-commercial purposes, subject to these Terms and the App
          Store Terms of Service.
        </Section>

        <Section title="Intellectual Property">
          The App and its content, design, and branding are owned by Bepel and protected by
          applicable laws. The personal content you create within the App belongs to you.
        </Section>

        <Section title="Acceptable Use">
          You agree not to misuse the App, including attempting to reverse-engineer, copy, resell,
          or interfere with its operation, except where permitted by law.
        </Section>

        <Section title="Disclaimer of Warranties">
          The App is provided "as is" and "as available" without warranties of any kind, whether
          express or implied. We do not guarantee that the App will be uninterrupted, error-free,
          or that it will meet your expectations.
        </Section>

        <Section title="Limitation of Liability">
          To the fullest extent permitted by law, Bepel will not be liable for any indirect,
          incidental, or consequential damages arising from your use of the App.
        </Section>

        <Section title="Changes to These Terms">
          We may update these Terms from time to time. Material changes will be reflected by
          updating the "Last updated" date above. Continued use of the App after changes means
          you accept the revised Terms.
        </Section>

        <Section title="Governing Law">
          These Terms are governed by the laws of India, without regard to conflict-of-law
          principles.
        </Section>

        <Section title="Contact">
          Questions about these Terms? Contact us at:
          <br />
          <br />
          Bepel —{' '}
          <a
            href="mailto:bepeloffical@gmail.com"
            className="underline"
            style={{ color: '#3A3028' }}
          >
            bepeloffical@gmail.com
          </a>
        </Section>

      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-8">
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
