import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import posthog from 'posthog-js'

posthog.init('phc_kJXDidAJviSTthKevJfELwv6pnqHcJ2TQL6pLFuRoGS3', {
  api_host: 'https://us.i.posthog.com'
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
