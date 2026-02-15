import { createClient } from '@insforge/sdk';

const insforgeUrl = import.meta.env.VITE_INSFORGE_URL;
const insforgeAnonKey = import.meta.env.VITE_INSFORGE_ANON_KEY;

if (!insforgeUrl || !insforgeAnonKey) {
    console.warn('Missing InsForge environment variables. Check your .env file.');
    // Returning a dummy client or null might be safer depending on usage, 
    // but throwing ensures configuration is fixed early.
    // For now, let's just log a warning to avoid crashing the app immediately if variables aren't set yet.
}

export const insforge = createClient({
    baseUrl: insforgeUrl || '',
    anonKey: insforgeAnonKey || ''
});
