import { useState } from 'react'
import Settings from './components/Settings'
import ConfirmSheet from './components/ConfirmSheet'

// NOTE: this is the first working slice — chat/agents/memory/gallery/notes
// screens from the desktop app get ported next, one at a time, into this
// same structure (each sensitive action wrapped with withConfirmation from
// lib/permissionGate.ts). The ADB "Phone" remote-control screen from the
// desktop app is intentionally not included here — it doesn't apply once
// NOVA-X *is* the Android app.

export default function App() {
  const [tab, setTab] = useState<'chat' | 'settings'>('chat')

  return (
    <div className="app-shell">
      <main>{tab === 'settings' ? <Settings /> : <ChatPlaceholder />}</main>
      <nav className="bottom-nav">
        <button className={tab === 'chat' ? 'active' : ''} onClick={() => setTab('chat')}>
          Chat
        </button>
        <button className={tab === 'settings' ? 'active' : ''} onClick={() => setTab('settings')}>
          Settings
        </button>
      </nav>
      <ConfirmSheet />
    </div>
  )
}

function ChatPlaceholder() {
  return (
    <div className="chat-placeholder">
      <p>Chat UI ports in next — this build establishes the Android shell, permission gate, and performance tiers first.</p>
    </div>
  )
}
