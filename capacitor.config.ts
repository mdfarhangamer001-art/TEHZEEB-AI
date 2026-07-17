import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.novanovax.app',
  appName: 'NOVA-X',
  webDir: 'dist',
  android: {
    // Keep the OS's own permission + mic/camera-in-use indicators visible.
    // Do not set allowMixedContent / webContentsDebuggingEnabled true for release builds.
    allowMixedContent: false
  }
};

export default config;
