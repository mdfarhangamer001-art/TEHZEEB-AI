# NOVA-X — Android

Android build of NOVA-X, using Capacitor as the native shell around the React UI.

## What's in this first slice
- App shell with bottom navigation (Chat / Settings)
- Performance tier switch (Low-end / High-end) — controls whether the 3D orb,
  particles, and blur effects render (`src/lib/performanceTier.tsx`)
- Central permission gate (`src/lib/permissionGate.ts`) — every sensitive action
  must call `withConfirmation(...)`, which shows an in-app "Nova wants to: ...
  Allow?" sheet **every time**, on top of Android's own one-time permission
  prompt. No action is allowed to skip this.
- Settings screen listing each permission and why it's used

## Intentionally left out
- The desktop app's "Phone" / ADB remote-control screen — that was for
  controlling a *separate* Android device from the desktop app; it doesn't
  apply once NOVA-X **is** the Android app.
- Hidden/global keystroke injection, camera capture without a visible
  indicator, and auto-sending messages without your own final tap. These
  aren't being ported — they cross from "assistant you direct" into
  "background agent controlling your phone/behalf without you seeing it,"
  which is the same shape as spyware regardless of who runs it.

## Next slices (not built yet)
Chat, Agents, Memory, Notes, Gallery screens — port from the desktop
`src/renderer/src/views/*` one at a time into this structure, each wrapped
with the permission gate where relevant.

## Building the APK
This repo can't be built into an APK locally without the Android SDK + network,
so the actual build happens in GitHub Actions:

1. Push this folder to a GitHub repo.
2. `.github/workflows/android-build.yml` runs on every push to `main`:
   installs deps, builds the web assets, adds/syncs the Android platform,
   assembles a debug APK, and attaches it to a new GitHub Release.
3. Download the APK from the repo's **Releases** tab.

To run/build locally instead (needs Node 20+, Android Studio/SDK, JDK 21):
```
npm install
npm run build
npx cap add android      # first time only
npx cap sync android
cd android && ./gradlew assembleDebug
```
