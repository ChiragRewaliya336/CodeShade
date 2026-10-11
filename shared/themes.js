export const DEFAULT_THEME = 'midnight';

const make = (name, background, surface, raised, text, muted, border, accent, accentContrast = '#ffffff') => ({
  name, background, surface, raised, text, muted, border, accent, accentContrast,
  focus: accent, editor: background, keyword: accent, string: '#a3be8c', number: '#d08770', comment: muted
});

export const THEMES = Object.freeze({
  midnight: make('Midnight', '#121212', '#181818', '#1e1e1e', '#f5f5f5', '#b8b8b8', '#3a3a3a', '#f0b90b', '#121212'),
  dracula: make('Dracula', '#282a36', '#303241', '#383a4b', '#f8f8f2', '#bdc0d0', '#494b5e', '#ff79c6'),
  nord: make('Nord', '#2e3440', '#3b4252', '#434c5e', '#eceff4', '#c2cad5', '#4c566a', '#88c0d0', '#2e3440'),
  monokai: make('Monokai', '#272822', '#30312b', '#3a3b34', '#f8f8f2', '#c5c5b9', '#4b4c42', '#a6e22e', '#272822'),
  ocean: make('Ocean', '#0b1724', '#102235', '#173149', '#e2f2ff', '#a9c6dc', '#28435a', '#38bdf8', '#071522'),
  forest: make('Forest', '#101a16', '#17251e', '#203329', '#e3f0e7', '#adc2b4', '#354b3c', '#73c991', '#102018'),
  sunset: make('Sunset', '#211716', '#30211f', '#3b2926', '#fff0e8', '#d5b9af', '#563a35', '#ff9b72', '#281713'),
  'clean-light': make('Clean Light', '#ffffff', '#f5f5f5', '#eeeeee', '#171717', '#525252', '#d4d4d4', '#1769d2', '#ffffff'),
  'solarized-dark': make('Solarized Dark', '#002b36', '#073642', '#0b414d', '#fdf6e3', '#93a1a1', '#31545b', '#2aa198', '#002b36'),
  'high-contrast': make('High Contrast', '#000000', '#080808', '#151515', '#ffffff', '#ffffff', '#ffffff', '#ffff00', '#000000')
});

export const CUSTOM_DEFAULTS = Object.freeze({ background: '#121212', surface: '#181818', text: '#e6e6e6', muted: '#a0a0a0', accent: '#f0b90b', border: '#333333' });
