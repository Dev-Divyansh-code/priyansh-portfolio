import { useHeroAnimation } from '../hooks/useGsap';
import { SHELL } from '../styles/layout';

export default function Hero({ profile }) {
  const ref = useHeroAnimation();

  return (
    <header
      ref={ref}
      className={`${SHELL} h-[420px] items-center justify-center border-b px-4 sm:h-[520px] sm:px-5 md:h-[584px]`}
    >
      <span data-hero-greeting className="text-center text-base text-xghoststroke sm:text-lg xl:text-xl">
        Hello, I'm
      </span>
      <h1
        data-hero-name
        className="mt-1 text-center font-serif text-4xl leading-none text-xstroke italic transition-colors hover:text-xyellow sm:text-6xl md:text-7xl xl:text-8xl xl:leading-tight"
      >
        {profile?.name || 'Priyansh'}
      </h1>
      <p data-hero-tagline className="mt-4 max-w-[320px] text-center text-sm leading-relaxed sm:mt-6 sm:max-w-[500px] sm:text-lg xl:text-xl">
        Dedicated <span className="font-semibold text-xblue/90">{profile?.title || 'Video Editor'}</span>{' '}
        {profile?.tagline?.replace(/^Dedicated Video Editor\s*/i, '') ||
          'crafting cinematic stories. I help brands, creators, and filmmakers bring their vision to life.'}
      </p>

      {/* Decorative elements - Hidden on mobile, lazy loaded */}
      <img
        data-hero-floral
        src="/assets/images/floral-yellow-blue.png"
        alt=""
        loading="lazy"
        className="absolute hidden select-none sm:block sm:left-0 sm:size-[18vw] sm:-translate-x-1/2 sm:-translate-y-[100px] xl:size-[220px]"
        draggable={false}
      />
      <img
        data-hero-floral
        src="/assets/images/x-pink-blue.png"
        alt=""
        loading="lazy"
        className="absolute hidden select-none sm:block sm:right-0 sm:size-[15vw] sm:translate-x-1/2 sm:translate-y-[100px] xl:size-[170px]"
        draggable={false}
      />

      {/* Badges - Desktop only */}
      <div
        data-hero-badge
        className="absolute left-0 hidden -translate-x-1/2 translate-y-[120px] rotate-[-7deg] md:block"
      >
        <div className="mt-2 rotate-[-2deg] text-center drop-shadow-[4px_4px_0px_var(--color-xyellow)]">
          <h2 className="inline rounded-2xl bg-xyellow px-3 pb-3 pt-2 font-mono text-sm leading-snug text-xblue xl:text-xl">
            video_
            <br />
            editor();
          </h2>
        </div>
      </div>
      <div
        data-hero-badge
        className="absolute right-0 hidden translate-x-1/2 -translate-y-[120px] rotate-[-7deg] md:block"
      >
        <div className="mt-2 text-center drop-shadow-[4px_4px_0px_var(--color-xyellow)]">
          <h2 className="inline rounded-2xl bg-xstroke px-4 py-2 text-center font-title text-sm font-light whitespace-nowrap text-xyellow xl:text-xl">
            based in{' '}
            <span className="rounded-md bg-xsurface-muted px-1 font-mono text-[0.9em] font-bold tracking-tighter text-xblue uppercase">
              {profile?.location || 'IND'}
            </span>{' '}
            🇮🇳
          </h2>
        </div>
      </div>
    </header>
  );
}