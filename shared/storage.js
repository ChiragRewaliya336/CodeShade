import { validateSettings, defaults } from './validation.js';

export async function loadSettings(area = chrome.storage.local) {
  try {
    const stored = (await area.get('codeshadeSettings')).codeshadeSettings;
    const safe = validateSettings(stored);
    if (stored && typeof stored === 'object' && Object.hasOwn(stored, 'backgroundImage')) {
      await area.set({ codeshadeSettings: safe });
    }
    return safe;
  }
  catch (error) { console.error('CodeShade could not load settings.', error); return defaults(); }
}
export async function saveSettings(settings, area = chrome.storage.local) {
  const safe = validateSettings(settings);
  await area.set({ codeshadeSettings: safe });
  return safe;
}
export async function resetSettings(area = chrome.storage.local) {
  const safe = defaults();
  await area.set({ codeshadeSettings: safe });
  return safe;
}
