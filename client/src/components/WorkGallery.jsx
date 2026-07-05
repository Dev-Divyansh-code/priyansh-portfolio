import { Icon } from '@iconify/react';
import { useSectionReveal } from '../hooks/useGsap';
import Section from './Section';

function Chip({ label }) {
  return (
    <span className="rounded-full bg-xghostwhite px-3 py-1 text-xs font-semibold uppercase transition-colors group-hover:bg-xblue group-hover:text-xaccent-text">
      {label}
    </span>
  );
}

function WorkCard({ work }) {
  return (
    <article className="group relative flex w-full flex-col gap-4 rounded-2xl bg-xbg p-4 transition-all duration-300 sm:flex-row sm:items-center sm:gap-6 sm:rounded-cxl sm:p-6 sm:hover:scale-[0.99] sm:hover:bg-xarrow sm:hover:shadow-sm">
      {/* Icon/Visual with rotating background */}
      <div className="relative mx-auto flex aspect-video w-full max-w-[180px] items-center justify-center sm:mx-0 sm:aspect-square sm:h-[120px] sm:w-[120px] sm:min-w-[120px] lg:h-[140px] lg:w-[140px]">
        
        {/* Blue box - visible by default, turns yellow + rotates on hover */}
        <div className="absolute inset-[-6px] rounded-2xl bg-xblue transition-all duration-500 group-hover:rotate-[180deg] group-hover:bg-xyellow sm:inset-[-8px] sm:rounded-3xl" />
        
        {/* Main thumbnail */}
        <div className="relative z-10 flex h-full w-full items-center justify-center overflow-hidden rounded-xl bg-xghostwhite transition-transform duration-300 group-hover:scale-[0.92] sm:rounded-2xl">
          <div
            className="absolute inset-0 transition-transform duration-500 group-hover:scale-110"
            style={{ background: `linear-gradient(135deg, ${work.accent}33, ${work.accent}66, ${work.accent}22)` }}
          />
          <Icon
            icon={work.icon}
            className="relative z-10 text-4xl text-xstroke transition-all duration-300 group-hover:scale-110 group-hover:text-xblue sm:text-5xl"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-2 text-center sm:text-left">
        <Chip label={work.category} />
        <h3 className="font-title text-base font-semibold leading-tight text-xstroke sm:text-lg lg:text-xl">
          {work.title}
        </h3>
        <p className="line-clamp-3 text-sm leading-relaxed text-xghoststroke">
          {work.description}
        </p>
        <time className="text-xs font-medium text-xghoststroke sm:text-sm">
          {new Date(work.date).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}
        </time>
      </div>
    </article>
  );
}

export default function WorkGallery({ works }) {
  const sectionRef = useSectionReveal();

  return (
    <Section
      sectionRef={sectionRef}
      id="work"
      title={
        <div data-section-header>
          What I <span className="text-xblue">Do</span>
        </div>
      }
      description="Wedding films, brand stories, reels, and everything in between."
      before={
        <div className="pointer-events-none absolute -top-4 left-1/2 hidden -translate-x-1/2 items-start gap-6 sm:flex xl:-top-6 xl:gap-10">
          {/* Welcome text */}
          <span className="mt-3 text-xs italic text-xghoststroke xl:text-sm">
            welcome to my creative studio! 🎬
          </span>

         
        </div>
      }
      icon={
        <img
          src="/assets/images/floral-yellow-blue.png"
          alt=""
          loading="lazy"
          className="h-full w-full rotate-45 transition-transform hover:scale-120 hover:-rotate-[20deg]"
          draggable={false}
        />
      }
    >
      <div className="grid w-full grid-cols-1 gap-4 sm:gap-6">
        {works.map((work) => (
          <div key={work._id} data-reveal-item>
            <WorkCard work={work} />
          </div>
        ))}
      </div>
    </Section>
  );
}