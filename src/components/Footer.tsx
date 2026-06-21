export default function Footer() {
  return (
    <footer
      className="relative w-full"
      style={{
        zIndex: 6,
        borderTop: '1px solid rgba(58,48,40,0.08)',
        background: 'rgba(255,253,249,0.55)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
      }}
    >
      <div
        className="max-w-2xl mx-auto px-6 py-8 flex flex-col items-center gap-5 text-center
                   sm:flex-row sm:justify-between sm:text-left"
      >
        {/* Navigation */}
        <nav
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 sm:justify-start"
          style={{ fontSize: '0.9rem', color: '#7A6B5D' }}
        >
          <a href="/" className="hover:underline" style={{ color: '#7A6B5D' }}>
            Home
          </a>
          <a href="/support" className="hover:underline" style={{ color: '#7A6B5D' }}>
            Support
          </a>
          <a href="/privacy" className="hover:underline" style={{ color: '#7A6B5D' }}>
            Privacy Policy
          </a>
          <a href="/terms" className="hover:underline" style={{ color: '#7A6B5D' }}>
            Terms
          </a>
          <a
            href="https://instagram.com/trymanifestdaily"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
            style={{ color: '#7A6B5D' }}
          >
            @trymanifestdaily
          </a>
        </nav>

        {/* Copyright */}
        <p style={{ fontSize: '0.82rem', fontWeight: 300, color: '#8A7B66' }}>
          © 2026 Bepel. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
