/**
 * permissionGate.ts
 *
 * Every sensitive capability (camera, mic, files, contacts, sending a message, etc.)
 * goes through this file. Two layers, always both present:
 *
 *   1. The Android OS permission prompt (first time only, standard runtime permissions).
 *   2. An in-app confirm step, shown EVERY time the action is about to run
 *      (not just once) — "Nova wants to: open camera to take a photo. Allow?"
 *
 * Nothing in this app is allowed to skip layer 2, even if layer 1 was already
 * granted earlier. This is intentional: it's what keeps this an assistant the
 * user directs, instead of a background agent doing things on its own.
 *
 * Actions that themselves complete a send/publish step (e.g. sharing a message)
 * must hand off to the OS's native compose/share sheet, so the final "Send" tap
 * is always the user's own — this file never fires that tap for them.
 */

export type CapabilityId =
  | 'camera'
  | 'microphone'
  | 'storage'
  | 'contacts'
  | 'notifications'
  | 'location'
  | 'openApp'
  | 'composeMessage'

export interface CapabilityRequest {
  id: CapabilityId
  /** Plain-language description shown in the confirm dialog, e.g. "take a photo with the back camera" */
  description: string
}

export type ConfirmFn = (req: CapabilityRequest) => Promise<boolean>

let confirmImpl: ConfirmFn = async () => false

/** Wire this up once at app startup to your actual UI confirm dialog/sheet. */
export function registerConfirmHandler(fn: ConfirmFn) {
  confirmImpl = fn
}

/**
 * Ask the user, every single time, before running a sensitive action.
 * Returns false if they decline — callers MUST treat false as "do nothing".
 */
export async function requestConfirmation(req: CapabilityRequest): Promise<boolean> {
  return confirmImpl(req)
}

/** Wrap any sensitive action so it only runs after explicit per-call confirmation. */
export async function withConfirmation<T>(
  req: CapabilityRequest,
  action: () => Promise<T>
): Promise<{ ok: true; result: T } | { ok: false; reason: 'declined' }> {
  const allowed = await requestConfirmation(req)
  if (!allowed) return { ok: false, reason: 'declined' }
  const result = await action()
  return { ok: true, result }
}
