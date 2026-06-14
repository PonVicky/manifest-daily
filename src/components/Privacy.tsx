export default function Privacy() {
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
          Privacy Policy
        </h1>
        <p className="text-sm mb-8" style={{ color: '#8A7B66' }}>
          Last updated: June 14, 2026
        </p>

        <p className="text-base leading-relaxed mb-6">
          ManifestDaily ("the App"), operated by Bepel ("we," "us," or "our"), is committed to
          protecting your privacy. This Privacy Policy explains how the App handles information.
          The short version: ManifestDaily does not collect, store, or share your personal data.
        </p>

        <Section title="Data We Collect">
          None. ManifestDaily does not require an account, and we do not collect, store, or
          transmit any personal information about you.
        </Section>

        <Section title="How the App Works">
          All content you create in ManifestDaily — including affirmations, journal entries, Vault
          letters, streaks, and statistics — is stored locally on your device. This information
          never leaves your device and is not transmitted to us or any third party. If you delete
          the App, this local data is removed with it.
        </Section>

        <Section title="Analytics and Tracking">
          ManifestDaily does not use analytics tools, advertising identifiers, or third-party
          tracking technologies. We do not build profiles, run ads, or share information with data
          brokers.
        </Section>

        <Section title="Subscriptions and Payments">
          ManifestDaily offers optional auto-renewable subscriptions and a one-time lifetime
          purchase. All payments are processed by Apple through your App Store account. We never
          see or store your payment card details or billing information. Apple may collect and
          process payment data under its own privacy policy. The App only receives your
          subscription status (active or inactive) from Apple in order to unlock premium features.
        </Section>

        <Section title="Third-Party Services">
          Apart from Apple's In-App Purchase system described above, ManifestDaily does not
          integrate third-party services that collect your data.
        </Section>

        <Section title="Children's Privacy">
          ManifestDaily is not directed at children under the age of 13, and we do not knowingly
          collect any information from children.
        </Section>

        <Section title="Your Privacy Choices">
          Because we do not collect personal data, there is nothing for us to access, correct, or
          delete on our servers. You remain in full control of your information, which lives only
          on your device.
        </Section>

        <Section title="Changes to This Policy">
          If our data practices change in the future — for example, if we add optional analytics —
          we will update this policy and revise the "Last updated" date above. Continued use of
          the App after changes means you accept the updated policy.
        </Section>

        <Section title="Contact">
          If you have any questions about this Privacy Policy, contact us at:
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
