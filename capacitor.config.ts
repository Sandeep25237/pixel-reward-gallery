
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.369a17265dc346209b6073c0f0a0eca0',
  appName: 'pixel-reward-gallery',
  webDir: 'dist',
  server: {
    url: 'https://369a1726-5dc3-4620-9b60-73c0f0a0eca0.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  android: {
    buildOptions: {
      keystorePath: undefined,
      keystoreAlias: undefined,
      keystorePassword: undefined,
      keystoreAliasPassword: undefined,
      signingType: "apksigner"
    }
  }
};

export default config;
