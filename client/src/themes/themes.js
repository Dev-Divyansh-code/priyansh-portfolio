export const THEMES = [
  {
    id: 'classic',
    name: 'Classic',
    description: 'Warm cream & bold blue',
    preview: ['#f6f5f1', '#0b1215', '#0015d4', '#fbcb41'],
  },
  {
    id: 'midnight',
    name: 'Midnight',
    description: 'Dark cinematic studio',
    preview: ['#0d1117', '#e6edf3', '#58a6ff', '#d4a72c'],
  },
  {
    id: 'noir',
    name: 'Noir',
    description: 'Black & gold film look',
    preview: ['#0a0a0a', '#f5f5f0', '#c9a227', '#e8c547'],
  },
  {
    id: 'ocean',
    name: 'Ocean',
    description: 'Cool blues & teal accents',
    preview: ['#e8f4f8', '#0a2540', '#0077b6', '#48cae4'],
  },
  {
    id: 'sunset',
    name: 'Sunset',
    description: 'Warm purples & coral glow',
    preview: ['#1a1025', '#fff0e6', '#ff6b35', '#ffc857'],
  },
];

export const DEFAULT_THEME = 'ocean';
export const STORAGE_KEY = 'priyansh-theme';

export function isValidTheme(id) {
  return THEMES.some((t) => t.id === id);
}