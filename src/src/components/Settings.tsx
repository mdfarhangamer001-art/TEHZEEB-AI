import { usePerformanceTier } from '../lib/performanceTier'

const PERMISSIONS = [
  { id: 'camera', label: 'Camera', hint: 'Only used when you ask Nova to take or attach a photo' },
  { id: 'microphone', label: 'Microphone', hint: 'Only active while you\'re speaking to Nova' },
  { id: 'storage', label: 'Files & Media', hint: 'To open/save files you ask about' },
  { id: 'notifications', label: 'Notifications', hint: 'For Nova\'s replies and reminders' },
  { id: 'contacts', label: 'Contacts', hint: 'Only when you ask Nova to look up someone' }
]

export default function Settings() {
  const { tier, setTier } = usePerformanceTier()

  return (
    <div className="settings-screen">
      <h1>Settings</h1>

      <section>
        <h2>Performance mode</h2>
        <p className="settings-hint">
          Pick "Low-end" on older or budget phones to keep NOVA-X smooth — this turns off the 3D
          orb and heavy animations. You can switch any time.
        </p>
        <div className="tier-toggle">
          <button
            className={tier === 'low' ? 'tier-btn active' : 'tier-btn'}
            onClick={() => setTier('low')}
          >
            Low-end device
          </button>
          <button
            className={tier === 'high' ? 'tier-btn active' : 'tier-btn'}
            onClick={() => setTier('high')}
          >
            High-end device
          </button>
        </div>
      </section>

      <section>
        <h2>Permissions</h2>
        <p className="settings-hint">
          Nova asks again each time before using any of these — granting it here just means
          Android will let it ask, not that it can act without confirming with you first.
        </p>
        <ul className="permission-list">
          {PERMISSIONS.map((p) => (
            <li key={p.id}>
              <div>
                <strong>{p.label}</strong>
                <p>{p.hint}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
