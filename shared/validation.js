import { THEMES, DEFAULT_THEME, CUSTOM_DEFAULTS } from './themes.js';

export const COLOR_KEYS = Object.keys(CUSTOM_DEFAULTS);
export const isColor = value => typeof value === 'string' && /^#[\da-fA-F]{6}$/.test(value);
export function validCustomTheme(value) {
  return value && typeof value === 'object' && !Array.isArray(value) && COLOR_KEYS.every(key => isColor(value[key]));
}
export function defaults() {
  return { enabled: true, theme: DEFAULT_THEME, customTheme: { ...CUSTOM_DEFAULTS }, editor: true };
}
export function validateSettings(value) {
  const result = defaults();
  if (!value || typeof value !== 'object' || Array.isArray(value)) return result;
  if (typeof value.enabled === 'boolean') result.enabled = value.enabled;
  if (typeof value.theme === 'string' && (Object.hasOwn(THEMES, value.theme) || value.theme === 'custom')) result.theme = value.theme;
  if (validCustomTheme(value.customTheme)) result.customTheme = Object.fromEntries(COLOR_KEYS.map(key => [key, value.customTheme[key].toLowerCase()]));
  if (typeof value.editor === 'boolean') result.editor = value.editor;
  return result;
}
export function isMessage(value) {
  return !!value && typeof value === 'object' && value.type === 'CODESHADE_SETTINGS' && !!value.settings && typeof value.settings === 'object';
}
