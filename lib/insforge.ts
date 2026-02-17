import { createClient } from '@insforge/sdk';

const insforgeUrl = import.meta.env.VITE_INSFORGE_URL;
const insforgeAnonKey = import.meta.env.VITE_INSFORGE_ANON_KEY;

if (!insforgeUrl || !insforgeAnonKey) {
    console.warn('Missing InsForge environment variables. Check your .env file.');
}

export const insforge = createClient({
    baseUrl: insforgeUrl || '',
    anonKey: insforgeAnonKey || ''
});
