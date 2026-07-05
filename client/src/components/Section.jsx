import { SHELL, SHELL_INNER, SECTION_ICON } from '../styles/layout';

export default function Section({ id, title, description, icon, children, className = '', sectionRef, before }) {
  return (
    <section ref={sectionRef} id={id} className={`${SHELL} py-10 sm:py-12 md:py-24 ${className}`}>
      {before}

      <div className={SHELL_INNER}>
        {icon && <div className={SECTION_ICON}>{icon}</div>}

        {title && (
          <header className="mb-6 sm:mb-8">
            <h2 className="font-serif text-2xl font-light leading-tight tracking-tight text-xghoststroke sm:text-3xl md:text-[36px]">
              {title}
            </h2>
            {description && (
              <p className="mt-2 mb-6 text-sm leading-relaxed sm:mt-4 sm:mb-10 sm:text-base">{description}</p>
            )}
          </header>
        )}

        {children}
      </div>
    </section>
  );
}