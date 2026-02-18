import { useMemo, useState } from 'react'
import './App.css'

function App() {
  const [website, setWebsite] = useState('www.example.com')
  const [activeView, setActiveView] = useState('qr')

  const cleanedWebsite = website.trim() || 'www.example.com'

  const qrUrl = useMemo(() => {
    return `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(cleanedWebsite)}`
  }, [cleanedWebsite])

  const previewHref = cleanedWebsite.startsWith('http')
    ? cleanedWebsite
    : `https://${cleanedWebsite}`

  return (
    <main className="page">
      <section className="panel left">
        <header className="brand">CodeLink</header>

        <div className="card">
          <h2>Enter your website address</h2>
          <p className="subtitle">Type in the website to link with your QR Code</p>

          <label className="field-label" htmlFor="website">Website</label>
          <input
            id="website"
            type="text"
            placeholder="www.example.com"
            value={website}
            onChange={(event) => setWebsite(event.target.value)}
          />
          <p className="hint">Include https:// if you want a secure link.</p>
        </div>
      </section>

      <section className="panel right">
        <div className="toggle">
          <button
            className={`toggle-btn ${activeView === 'preview' ? 'active' : 'inactive'}`}
            type="button"
            onClick={() => setActiveView('preview')}
          >
            Preview
          </button>
          <button
            className={`toggle-btn ${activeView === 'qr' ? 'active' : 'inactive'}`}
            type="button"
            onClick={() => setActiveView('qr')}
          >
            QR Code
          </button>
        </div>

        <div className="qr-box">
          {activeView === 'qr' ? (
            <img src={qrUrl} alt="QR Code" />
          ) : (
            <div className="preview">
              <p className="preview-label">Link preview</p>
              <a className="preview-link" href={previewHref} target="_blank" rel="noreferrer">
                {previewHref}
              </a>
              <p className="preview-note">Opens in a new tab</p>
            </div>
          )}
        </div>

        <p className="info">
          Scan this QR Code to preview
          <span>You can customize the design of your QR Code in the next step.</span>
        </p>
      </section>
    </main>
  )
}

export default App
