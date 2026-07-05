import { Icon } from '@iconify/react';
import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeSwitcher({ compact = false }) {
  const { theme, setTheme, themes } = useTheme();
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (!rootRef.current?.contains(e.target)) setOpen(false);
    }
    function handleKey(e) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKey);
    };
  }, []);

  const active = themes.find((t) => t.id === theme);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Change theme"
        aria-expanded={open}
        className={`flex items-center justify-center gap-1.5 rounded-full font-title text-sm font-semibold text-xstroke transition-all hover:text-xblue active:scale-95 ${
          compact ? 'px-2 py-2' : 'px-3 py-2'
        }`}
      >
        <Icon icon="mdi:palette" className="text-base" />
        {!compact && <span className="hidden sm:inline">{active?.name}</span>}
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 bottom-full z-[10000] mb-2 w-56 rounded-2xl border border-xline bg-xsurface p-2 shadow-lg backdrop-blur-md sm:bottom-auto sm:top-full sm:mt-2"
        >
          <p className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-xghoststroke">Theme</p>
          {themes.map((t) => (
            <button
              key={t.id}
              type="button"
              role="menuitem"
              onClick={() => {
                setTheme(t.id);
                setOpen(false);
              }}
              className={`flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left transition-colors hover:bg-xarrow ${
                theme === t.id ? 'bg-xarrow' : ''
              }`}
            >
              <span className="flex shrink-0 gap-0.5">
                {t.preview.map((color) => (
                  <span
                    key={color}
                    className="h-4 w-4 rounded-full border border-xline/50"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-xstroke">{t.name}</span>
                <span className="block truncate text-[11px] text-xghoststroke">{t.description}</span>
              </span>
              {theme === t.id && <Icon icon="mdi:check" className="shrink-0 text-xblue" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}