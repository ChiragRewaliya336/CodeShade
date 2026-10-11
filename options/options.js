import { resetSettings, loadSettings, saveSettings } from '../shared/storage.js';
import { defaults, validateSettings } from '../shared/validation.js';
import { THEMES } from '../shared/themes.js';

const $ = id => document.getElementById(id);
let settings = defaults();
let saveTimer;
let saveQueue = Promise.resolve();

function setStatus(message, kind = 'success') {
  const status = $('status');
  status.textContent = message;
  status.dataset.success = String(kind === 'success');
  status.dataset.error = String(kind === 'error');
}

function currentThemeLabel() {
  return settings.theme === 'custom' ? 'Custom' : (THEMES[settings.theme]?.name || THEMES.midnight.name);
}

function render() {
  $('theme').value = settings.theme === 'custom' ? 'midnight' : settings.theme;
  $('current-theme').textContent = currentThemeLabel();
}

function persistSoon() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(persist, 220);
}

function persist() {
  clearTimeout(saveTimer);
  const snapshot = validateSettings(settings);
  saveQueue = saveQueue.catch(() => {}).then(() => saveSettings(snapshot));
  saveQueue.then(() => {
    $('current-theme').textContent = currentThemeLabel();
    setStatus('Changes saved on this device.');
  }).catch(error => {
    console.error('CodeShade could not save settings.', error);
    setStatus('Could not save changes. Free local storage space and try again.', 'error');
  });
}

$('theme').addEventListener('change', () => {
  settings.theme = $('theme').value;
  render();
  setStatus('Saving theme…', 'pending');
  persist();
});

$('reset-all').addEventListener('click', async () => {
  clearTimeout(saveTimer);
  try {
    await saveQueue.catch(() => {});
    settings = await resetSettings();
    render();
    setStatus('All preferences reset to defaults.');
  } catch (error) {
    console.error('CodeShade could not reset preferences.', error);
    setStatus('Could not reset preferences. Please try again.', 'error');
  }
});

try {
  $('version').textContent = `Version ${chrome.runtime.getManifest().version}`;
  settings = await loadSettings();
  render();
  setStatus('Preferences loaded. Changes save automatically.');
} catch (error) {
  console.error('CodeShade settings page initialization failed.', error);
  setStatus('Could not load CodeShade settings.', 'error');
}

window.addEventListener('beforeunload', () => clearTimeout(saveTimer));
