(() => {
  'use strict';
  const DEFAULTS = { enabled:true, theme:'midnight', editor:true, customTheme:{background:'#121212',surface:'#181818',text:'#e6e6e6',muted:'#a0a0a0',accent:'#f0b90b',border:'#333333'} };
  const THEMES = {
    midnight:['#121212','#181818','#1e1e1e','#f5f5f5','#b8b8b8','#f0b90b','#3a3a3a'], dracula:['#282a36','#303241','#383a4b','#f8f8f2','#bdc0d0','#ff79c6','#494b5e'], nord:['#2e3440','#3b4252','#434c5e','#eceff4','#c2cad5','#88c0d0','#4c566a'], monokai:['#272822','#30312b','#3a3b34','#f8f8f2','#c5c5b9','#a6e22e','#4b4c42'], ocean:['#0b1724','#102235','#173149','#e2f2ff','#a9c6dc','#38bdf8','#28435a'], forest:['#101a16','#17251e','#203329','#e3f0e7','#adc2b4','#73c991','#354b3c'], sunset:['#211716','#30211f','#3b2926','#fff0e8','#d5b9af','#ff9b72','#563a35'], 'clean-light':['#ffffff','#f5f5f5','#eeeeee','#171717','#525252','#1769d2','#d4d4d4'], 'solarized-dark':['#002b36','#073642','#0b414d','#fdf6e3','#93a1a1','#2aa198','#31545b'], 'high-contrast':['#000000','#080808','#151515','#ffffff','#ffffff','#ffff00','#ffffff']
  };
  const DESCRIPTION_SELECTOR = globalThis.CodeShadeSelectors?.description || '[data-track-load="description_content"]';
  const trackedPanels = new Set();
  let currentSettings = DEFAULTS;
  let activeProblemRoute = false;
  const validColor = value => typeof value === 'string' && /^#[\da-fA-F]{6}$/.test(value);
  const contrastText = hex => {
    const channels = hex.slice(1).match(/../g).map(pair => parseInt(pair,16)/255).map(value => value <= 0.04045 ? value/12.92 : ((value+0.055)/1.055)**2.4);
    return (0.2126*channels[0]+0.7152*channels[1]+0.0722*channels[2]) > 0.42 ? '#10141d' : '#ffffff';
  };
  function isProblemRoute(pathname = globalThis.location?.pathname || '') {
    return /^\/problems\/[^/]+(?:\/.*)?\/?$/.test(pathname);
  }
  function clearPageTheme(root = document.documentElement) {
    root?.removeAttribute('data-codeshade-theme');
    root?.removeAttribute('data-codeshade-editor');
    for (const node of trackedPanels) node.removeAttribute('data-codeshade-problem-surface');
    trackedPanels.clear();
    for (const key of ['background','surface','surface-secondary','text','text-secondary','border','accent','accent-contrast','focus-ring','editor-background','scrollbar']) root?.style.removeProperty(`--cs-${key}`);
  }
  function clean(value) {
    if (!value || typeof value !== 'object' || Array.isArray(value)) return {...DEFAULTS};
    const s = {...DEFAULTS, ...value};
    if (!['midnight','dracula','nord','monokai','ocean','forest','sunset','clean-light','solarized-dark','high-contrast','custom'].includes(s.theme)) s.theme = 'midnight';
    if (typeof s.enabled !== 'boolean') s.enabled = true;
    if (typeof s.editor !== 'boolean') s.editor = true;
    const keys = Object.keys(DEFAULTS.customTheme);
    if (!s.customTheme || !keys.every(k => validColor(s.customTheme[k]))) s.customTheme = {...DEFAULTS.customTheme};
    delete s.backgroundImage;
    return s;
  }
  function apply(settings) {
    const root = document.documentElement;
    const s = clean(settings);
    if (!root || !s.enabled || !isProblemRoute()) {
      clearPageTheme(root);
      return;
    }
    const t = s.theme === 'custom' ? [s.customTheme.background,s.customTheme.surface,s.customTheme.surface,s.customTheme.text,s.customTheme.muted,s.customTheme.accent,s.customTheme.border] : THEMES[s.theme];
    const vars = {background:t[0],surface:t[1],'surface-secondary':t[2],text:t[3],'text-secondary':t[4],accent:t[5],border:t[6],'focus-ring':t[5],'editor-background':t[0],scrollbar:t[6],'accent-contrast':contrastText(t[5])};
    root.setAttribute('data-codeshade-theme', s.theme);
    root.setAttribute('data-codeshade-editor', String(s.editor));
    for (const [key,val] of Object.entries(vars)) root.style.setProperty(`--cs-${key}`, val);
  }
  function syncProblemPanel(root = document.documentElement) {
    if (!root?.querySelectorAll) return 0;
    for (const node of trackedPanels) node.removeAttribute('data-codeshade-problem-surface');
    trackedPanels.clear();
    const descriptions = root.querySelectorAll(DESCRIPTION_SELECTOR);
    for (const description of descriptions) {
      let node = description;
      let depth = 0;
      while (node && node !== root && depth < 7) {
        if (node.setAttribute) {
          node.setAttribute('data-codeshade-problem-surface', node === description ? 'content' : 'panel');
          trackedPanels.add(node);
        }
        if (node.matches?.('main, [role="main"]')) break;
        node = node.parentElement;
        depth += 1;
      }
    }
    return descriptions.length;
  }
  function refreshRoute() {
    const shouldBeActive = isProblemRoute();
    if (!shouldBeActive) {
      activeProblemRoute = false;
      clearPageTheme();
      return;
    }
    activeProblemRoute = true;
    apply(currentSettings);
    syncProblemPanel();
  }
  function setCurrentSettings(settings) {
    currentSettings = clean(settings);
    if (activeProblemRoute) apply(currentSettings);
    else clearPageTheme();
  }
  function observePageRoute() {
    const root = document.documentElement;
    if (!root || typeof MutationObserver === 'undefined') return;
    let scheduled = false;
    const containsDescription = node => node.nodeType === 1 && (node.matches(DESCRIPTION_SELECTOR) || node.querySelector(DESCRIPTION_SELECTOR));
    const observer = new MutationObserver(records => {
      const markerChanged = records.some(record => [...record.addedNodes, ...record.removedNodes].some(containsDescription));
      if (!markerChanged && isProblemRoute() === activeProblemRoute) return;
      if (scheduled) return;
      scheduled = true;
      requestAnimationFrame(() => {
        scheduled = false;
        if (isProblemRoute() !== activeProblemRoute) refreshRoute();
        else if (activeProblemRoute && markerChanged) syncProblemPanel(root);
      });
    });
    observer.observe(root, {childList:true,subtree:true});
    const onHistoryNavigation = () => refreshRoute();
    const onInternalNavigation = event => {
      const link = event.target.closest?.('a[href]');
      if (!link || link.origin !== globalThis.location.origin) return;
      requestAnimationFrame(() => requestAnimationFrame(refreshRoute));
    };
    const onPageHide = () => {
      observer.disconnect();
      globalThis.removeEventListener?.('popstate', onHistoryNavigation);
      globalThis.removeEventListener?.('hashchange', onHistoryNavigation);
      document.removeEventListener('click', onInternalNavigation, true);
      globalThis.removeEventListener?.('pagehide', onPageHide);
    };
    globalThis.addEventListener?.('popstate', onHistoryNavigation);
    globalThis.addEventListener?.('hashchange', onHistoryNavigation);
    globalThis.addEventListener?.('pagehide', onPageHide, {once:true});
    document.addEventListener('click', onInternalNavigation, true);
  }
  function start() {
    observePageRoute();
    refreshRoute();
    if (!globalThis.chrome?.storage?.local) return;
    chrome.storage.local.get('codeshadeSettings').then(({codeshadeSettings}) => setCurrentSettings(codeshadeSettings)).catch(() => setCurrentSettings(DEFAULTS));
    chrome.storage.onChanged.addListener((changes, area) => {
      if (area !== 'local' || !changes.codeshadeSettings) return;
      setCurrentSettings(changes.codeshadeSettings.newValue);
    });
  }
  start();
  if (typeof module !== 'undefined') module.exports = {apply,clean,syncProblemPanel,isProblemRoute,clearPageTheme,refreshRoute,setCurrentSettings,DEFAULTS};
})();
