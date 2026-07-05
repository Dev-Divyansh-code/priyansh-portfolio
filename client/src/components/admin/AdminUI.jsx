export function AdminCard({ title, children, className = '' }) {
  return (
    <div className={`rounded-2xl border border-xline bg-xsurface p-6 shadow-sm ${className}`}>
      {title && <h2 className="mb-4 font-title text-lg font-semibold text-xstroke">{title}</h2>}
      {children}
    </div>
  );
}

export function AdminLabel({ children }) {
  return <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-xghoststroke">{children}</label>;
}

export function AdminInput({ className = '', ...props }) {
  return (
    <input
      className={`w-full rounded-xl border border-xline bg-xblank px-4 py-2.5 text-sm outline-none transition-colors focus:border-xblue ${className}`}
      {...props}
    />
  );
}

export function AdminTextarea({ className = '', ...props }) {
  return (
    <textarea
      className={`w-full rounded-xl border border-xline bg-xblank px-4 py-2.5 text-sm outline-none transition-colors focus:border-xblue ${className}`}
      {...props}
    />
  );
}

export function AdminButton({ variant = 'primary', className = '', children, ...props }) {
  const variants = {
    primary: 'bg-xbtn text-xbtn-text hover:bg-xblue hover:text-xaccent-text',
    danger: 'bg-xred text-white hover:opacity-90',
    ghost: 'border border-xline bg-xsurface text-xstroke hover:bg-xbg',
  };

  return (
    <button
      type="button"
      className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function AdminAlert({ type = 'error', children }) {
  const styles = {
    error: 'border-xred/30 bg-xred/10 text-xred',
    success: 'border-xline bg-xarrow text-xstroke',
  };

  return <div className={`rounded-xl border px-4 py-3 text-sm ${styles[type]}`}>{children}</div>;
}

export function AdminStat({ label, value }) {
  return (
    <div className="rounded-2xl border border-xline bg-xsurface p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-xghoststroke">{label}</p>
      <p className="mt-2 font-serif text-3xl text-xstroke">{value}</p>
    </div>
  );
}