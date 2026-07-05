import { Icon } from '@iconify/react';
import { useNavbarAnimation } from '../hooks/useGsap';
import ThemeSwitcher from './ThemeSwitcher';

function NavItem({ href, children, external, ariaLabel, onClick }) {
  const className =
    'flex cursor-pointer items-center justify-center whitespace-nowrap rounded-full px-3 py-2 font-title text-sm font-semibold text-xstroke transition-all duration-300 hover:text-xblue active:scale-95';

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
        className={className}
      >
        {children}
      </a>
    );
  }

  return (
    <a href={href} aria-label={ariaLabel} className={className} onClick={onClick}>
      {children}
    </a>
  );
}

export default function Navbar({ socials = {} }) {
  const navRef = useNavbarAnimation();

  const scrollTo = (id) => (e) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-4 left-0 right-0 z-[9999] flex justify-center px-4"
    >
      <div className="flex h-11 items-center gap-1 rounded-full border border-xline bg-xsurface/90 px-2 shadow-md backdrop-blur-md">
        <NavItem href="#top" onClick={scrollTo('top')} ariaLabel="Home">
          <Icon icon="mingcute:home-6-fill" className="text-base" />
        </NavItem>

        <NavItem href="#work" onClick={scrollTo('work')} ariaLabel="Work">
          Work
        </NavItem>

        <NavItem href="#projects" onClick={scrollTo('projects')} ariaLabel="Projects">
          Projects
        </NavItem>

        {socials.instagram && (
          <NavItem href={socials.instagram} external ariaLabel="Instagram">
            <Icon icon="mdi:instagram" className="text-base" />
          </NavItem>
        )}

        {socials.youtube && (
          <NavItem href={socials.youtube} external ariaLabel="YouTube">
            <Icon icon="mdi:youtube" className="text-base" />
          </NavItem>
        )}

        <ThemeSwitcher compact />
      </div>
    </nav>
  );
}