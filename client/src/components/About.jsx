import { useSectionReveal } from '../hooks/useGsap';
import Section from './Section';

export default function About({ profile }) {
  const sectionRef = useSectionReveal();

  return (
    <Section
      sectionRef={sectionRef}
      id="about"
      title={
        <div data-section-header>
          Behind the <span className="text-xblue">Edit</span>
        </div>
      }
      icon={
        <img
          src="/assets/images/x-yellow-blue.png"
          alt=""
          loading="lazy"
          className="h-[70%] w-[70%] translate-x-[10%] translate-y-[20%] rotate-[25deg] transition-transform hover:scale-120 hover:-rotate-[40deg]"
          draggable={false}
        />
      }
    >
      <div className="block h-full space-y-4 text-sm leading-relaxed sm:space-y-5 lg:text-base">
        {/* Portrait with cute arrow */}
        <div
          data-reveal-item
          className="group relative isolate mx-auto aspect-square size-[160px] sm:float-right sm:mx-0 sm:-mt-16 sm:mb-6 sm:ml-6 sm:size-[220px] md:ml-8 md:size-[250px]"
        >
          {/* Cute arrow with text */}
          <div className="absolute -top-12 -left-4 hidden rotate-[-8deg] sm:block md:-left-8 md:-top-14">
            <span className="font-title text-xs italic text-xghoststroke md:text-sm">
              Thats me! 🎬
            </span>
            {/* Hand-drawn style arrow */}
            <svg
              className="absolute -bottom-4 left-1/2 h-6 w-6 -translate-x-1/2 rotate-[140deg] text-xghoststroke md:h-8 md:w-8"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12c2 0 8-1 12-8" />
              <path d="M15 4l2 0l0 2" />
            </svg>
          </div>

          <img
            src={profile?.portrait || '/assets/images/portrait.webp'}
            alt={`${profile?.name} portrait`}
            loading="lazy"
            className="relative z-10 aspect-square h-full w-full rounded-full border-2 border-xbg object-cover shadow-lg transition-all duration-300 group-hover:scale-[0.98] group-hover:rotate-6 group-hover:shadow-2xl"
          />
          <div className="absolute top-[1%] -left-[5%] z-0 inline-block h-full w-full scale-[1.04] -rotate-24 rounded-full bg-xyellow/40 transition-all duration-300 group-hover:-rotate-45" />
        </div>

        {profile?.about?.map((paragraph) => (
          <p key={paragraph.slice(0, 24)} data-reveal-item className="text-xstroke">
            {paragraph}
          </p>
        ))}
      </div>
    </Section>
  );
}