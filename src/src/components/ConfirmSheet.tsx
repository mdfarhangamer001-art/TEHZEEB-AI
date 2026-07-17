import { useEffect, useState } from 'react'
import { registerConfirmHandler, CapabilityRequest } from '../lib/permissionGate'

export default function ConfirmSheet() {
  const [pending, setPending] = useState<{
    req: CapabilityRequest
    resolve: (v: boolean) => void
  } | null>(null)

  useEffect(() => {
    registerConfirmHandler(
      (req) =>
        new Promise<boolean>((resolve) => {
          setPending({ req, resolve })
        })
    )
  }, [])

  if (!pending) return null

  const respond = (allow: boolean) => {
    pending.resolve(allow)
    setPending(null)
  }

  return (
    <div className="confirm-sheet-backdrop" role="dialog" aria-modal="true">
      <div className="confirm-sheet">
        <p className="confirm-sheet-title">Nova wants to:</p>
        <p className="confirm-sheet-desc">{pending.req.description}</p>
        <div className="confirm-sheet-actions">
          <button onClick={() => respond(false)} className="confirm-sheet-decline">
            Don't allow
          </button>
          <button onClick={() => respond(true)} className="confirm-sheet-allow">
            Allow
          </button>
        </div>
      </div>
    </div>
  )
}
