import { THEMES, CUSTOM_DEFAULTS } from '../shared/themes.js';
import { validateSettings, COLOR_KEYS } from '../shared/validation.js';
import { loadSettings, saveSettings, resetSettings } from '../shared/storage.js';

const $ = id => document.getElementById(id);
const labels = {background:'Page',surface:'Surface',text:'Text',muted:'Secondary',accent:'Accent',border:'Border'};
let settings = await loadSettings();

function renderThemes() {
  const host = $('themes'); host.replaceChildren();
  for (const [key, theme] of Object.entries(THEMES)) {
    const button = document.createElement('button'); button.type='button'; button.className='theme'; button.dataset.theme=key; button.setAttribute('aria-pressed', String(settings.theme===key));
    const swatches=document.createElement('span'); swatches.className='swatches';
    for (const color of [theme.background,theme.surface,theme.accent]) { const dot=document.createElement('i'); dot.style.backgroundColor=color; swatches.append(dot); }
    const name=document.createElement('span'); name.textContent=theme.name; button.append(swatches,name);
    button.addEventListener('click',()=>update({theme:key})); host.append(button);
  }
  $('current-theme').textContent = settings.theme==='custom'?'Custom':(THEMES[settings.theme]?.name ?? 'Midnight');
}
function renderColors() {
  const host=$('colors'); host.replaceChildren();
  for (const key of COLOR_KEYS) {
    const label=document.createElement('label'); label.className='color-control'; label.append(document.createTextNode(labels[key]));
    const input=document.createElement('input'); input.type='color'; input.dataset.color=key; input.value=settings.customTheme[key] || CUSTOM_DEFAULTS[key]; input.setAttribute('aria-label',`${labels[key]} color`);
    input.addEventListener('input',()=>{ settings.customTheme[key]=input.value; settings.theme='custom'; renderThemes(); preview(); }); label.append(input); host.append(label);
  }
}
async function persist() { settings=validateSettings(settings); await saveSettings(settings); }
function preview() { chrome.storage.local.set({codeshadeSettings:validateSettings(settings)}).catch(error=>showError(error)); }
async function update(patch) { settings=validateSettings({...settings,...patch}); try { await persist(); render(); announce('Theme updated.'); } catch(error) { showError(error); } }
function render() { $('enabled').checked=settings.enabled; $('editor').checked=settings.editor; renderThemes(); renderColors(); }
function announce(message) { $('status').textContent=message; }
function showError(error) { console.error('CodeShade settings update failed.',error); announce('Could not save settings. Please try again.'); }

$('enabled').addEventListener('change',()=>update({enabled:$('enabled').checked}));
$('editor').addEventListener('change',()=>update({editor:$('editor').checked}));
$('save-custom').addEventListener('click',()=>update({theme:'custom'}));
$('reset').addEventListener('click',async()=>{ try { settings=await resetSettings(); render(); announce('Settings reset to defaults.'); } catch(error) { showError(error); } });
$('settings').addEventListener('click',()=>chrome.runtime.openOptionsPage());
render();
