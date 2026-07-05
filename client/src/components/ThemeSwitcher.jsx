import { Icon } from '@iconify/react';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTheme } from '../context/ThemeContext';

function ThemeOptions({ themes, theme, onSelect }) {
  return (
    <>
      <p className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-xghoststroke">Theme</p>
      {themes.map((t) => (
        <button
          key={t.id}
          type="button"
          role="menuitem"
          onClick={() => onSelect(t.id)}
          className={`flex w-full items-center gap-3 rounded-xl px-2 py-2.5 text-left transition-colors hover:bg-xarrow active:bg-xarrow ${
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
    </>
  );
}

export default function ThemeSwitcher({ compact = false }) {
  const { theme, setTheme, themes } = useTheme();
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const sheetRef = useRef(null);

  function selectTheme(themeId) {
    setTheme(themeId);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return undefined;

    const mq = window.matchMedia('(max-width: 639px)');
    if (mq.matches) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }

    return undefined;
  }, [open]);

  useEffect(() => {
    function handlePointer(e) {
      if (rootRef.current?.contains(e.target)) return;
      if (sheetRef.current?.contains(e.target)) return;
      setOpen(false);
    }
    function handleKey(e) {
      if (e.key === 'Escape') setOpen(false);
    }

    document.addEventListener('mousedown', handlePointer);
    document.addEventListener('touchstart', handlePointer);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handlePointer);
      document.removeEventListener('touchstart', handlePointer);
      document.removeEventListener('keydown', handleKey);
    };
  }, []);

  const active = themes.find((t) => t.id === theme);

  const mobileSheet =
    open &&
    createPortal(
      <div className="fixed inset-0 z-[10000] sm:hidden" role="presentation">
        <button
          type="button"
          className="absolute inset-0 bg-xstroke/40 backdrop-blur-[2px]"
          aria-label="Close theme menu"
          onClick={() => setOpen(false)}
        />
        <div
          ref={sheetRef}
          role="menu"
          aria-label="Choose theme"
          className="absolute inset-x-3 bottom-3 max-h-[min(70dvh,520px)] overflow-y-auto rounded-2xl border border-xline bg-xsurface p-2 shadow-2xl"
          style={{ paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))' }}
        >
          <div className="mb-1 flex items-center justify-between px-2 py-1">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-xghoststroke">Choose theme</p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="flex h-8 w-8 items-center justify-center rounded-full text-xghoststroke transition-colors hover:bg-xarrow hover:text-xstroke"
            >
              <Icon icon="mdi:close" className="text-lg" />
            </button>
          </div>
          <ThemeOptions themes={themes} theme={theme} onSelect={selectTheme} />
        </div>
      </div>,
      document.body,
    );

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Change theme"
        aria-expanded={open}
        aria-haspopup="menu"
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
          aria-label="Choose theme"
          className="absolute right-0 top-full z-[10000] mt-2 hidden w-56 rounded-2xl border border-xline bg-xsurface p-2 shadow-lg backdrop-blur-md sm:block"
        >
          <ThemeOptions themes={themes} theme={theme} onSelect={selectTheme} />
        </div>
      )}

      {mobileSheet}
    </div>
  );
}