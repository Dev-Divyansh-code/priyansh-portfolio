import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import { FOOTER_SHELL } from '../styles/layout';

export default function Footer({ name }) {
  return (
    <footer className="flex w-full flex-col items-center justify-center overflow-hidden border-t border-dashed border-xline bg-xbg pb-20 sm:pb-0">
      <div className={`${FOOTER_SHELL} pt-8 sm:pt-12 md:pt-24`}>
        <div className="mt-6 w-full text-center font-title text-xs text-xghoststroke sm:mt-16 sm:text-sm">
          All rights reserved © {new Date().getFullYear()} {name || 'Priyansh'}
        </div>

        <a
          href="#top"
          className="mx-auto mt-4 block w-full text-center font-serif text-[10vw] leading-tight font-medium tracking-tighter text-xghoststroke/40 italic transition-colors duration-300 hover:text-xyellow sm:mt-16 sm:text-[8vw] md:text-[min(11.9vw,128px)]"
        >
          {name?.toUpperCase() || 'PRIYANSH'}
        </a>

        <div className="mt-8 flex justify-center pb-8 sm:mt-12 sm:pb-12">
          <Link
            to="/admin"
            className="inline-flex items-center gap-2 rounded-full border border-xline bg-xsurface px-5 py-2.5 font-title text-sm font-semibold text-xstroke shadow-sm transition-all hover:border-xblue hover:text-xblue active:scale-95"
          >
            <Icon icon="mdi:shield-account" className="text-base" />
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}