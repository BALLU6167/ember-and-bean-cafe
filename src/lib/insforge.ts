import { createClient } from '@insforge/sdk';

const insforgeUrl = import.meta.env.VITE_INSFORGE_URL || '';
const insforgeAnonKey = import.meta.env.VITE_INSFORGE_ANON_KEY || '';

export const isInsForgeConfigured = Boolean(insforgeUrl && insforgeAnonKey);

export const insforge = isInsForgeConfigured
  ? createClient({
      baseUrl: insforgeUrl,
      anonKey: insforgeAnonKey,
    })
  : null;
