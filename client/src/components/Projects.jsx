import { Icon } from '@iconify/react';
import { useSectionReveal } from '../hooks/useGsap';
import Section from './Section';

const tagIcons = {
  premiere: 'simple-icons:adobepremierepro',
  aftereffects: 'simple-icons:adobeaftereffects',
  davinci: 'simple-icons:davinciresolve',
  wedding: 'mdi:heart',
  corporate: 'mdi:office-building',
  reel: 'mdi:instagram',
  react: 'simple-icons:react',
  nextjs: 'simple-icons:nextdotjs',
  typescript: 'simple-icons:typescript',
  javascript: 'simple-icons:javascript',
};

function linkIcon(url) {
  if (url.includes('youtube')) return 'mdi:youtube';
  if (url.includes('instagram')) return 'mdi:instagram';
  if (url.includes('vimeo')) return 'mdi:vimeo';
  if (url.includes('github')) return 'mdi:github';
  if (url.includes('npm')) return 'simple-icons:npm';
  return 'mdi:open-in-new';
}

function linkLabel(url) {
  if (url.includes('youtube')) return 'YouTube';
  if (url.includes('instagram')) return 'Instagram';
  if (url.includes('vimeo')) return 'Vimeo';
  if (url.includes('github')) return 'GitHub';
  if (url.includes('npm')) return 'npm';
  return 'Visit';
}

function ProjectCard({ project, isReversed }) {
  return (
    <article
      className={`group/card flex flex-col gap-4 sm:gap-6 lg:flex-row lg:items-center lg:gap-8 ${
        isReversed ? 'lg:flex-row-reverse' : ''
      }`}
    >
      {/* Thumbnail with animated borders */}
      <div className="relative mx-auto w-full max-w-[320px] sm:max-w-[400px] lg:mx-0 lg:w-[45%] lg:max-w-none">
        <div className="relative aspect-video w-full">
          {/* Pink border - visible by default, diagonal */}
          <div className="absolute inset-0 -rotate-3 rounded-2xl bg-xpink transition-all duration-500 group-hover/card:rotate-3 group-hover/card:scale-105 sm:rounded-3xl" />
          
          {/* Yellow border - appears on hover */}
          <div className="absolute inset-0 rotate-3 rounded-2xl bg-xyellow opacity-0 transition-all duration-500 group-hover/card:-rotate-6 group-hover/card:opacity-100 sm:rounded-3xl" />
          
          {/* Main thumbnail */}
          <img
            src={project.thumbnail}
            alt={project.title}
            loading="lazy"
            className="relative z-10 aspect-video w-full rounded-2xl border border-xline bg-xghostwhite object-cover shadow-sm transition-transform duration-300 group-hover/card:scale-[0.97] sm:rounded-3xl"
          />
        </div>
      </div>

      {/* Content + Links */}
      <div className="flex flex-1 flex-col gap-4 sm:flex-row sm:gap-6 lg:flex-col xl:flex-row">
        {/* Info Card */}
        <div className="flex flex-1 flex-col gap-2 rounded-2xl bg-xbg p-4 sm:rounded-3xl sm:p-6">
          {/* Tags */}
          <div className="flex flex-row gap-2">
            {project.tags?.map((tag) => (
              <Icon
                key={tag}
                icon={tagIcons[tag] || 'mdi:movie-open'}
                className="text-base text-xghoststroke sm:text-lg"
              />
            ))}
          </div>
          
          {/* Title */}
          <h3 className="font-title text-base font-semibold leading-tight text-xstroke sm:text-lg lg:text-xl">
            {project.title}
          </h3>
          
          {/* Description */}
          <p className="line-clamp-3 text-sm leading-relaxed text-xghoststroke">
            {project.description}
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-row gap-2 sm:flex-col sm:gap-3">
          {project.links?.slice(0, 2).map((link) => (
            <a
              key={link}
              href={link}
              target="_blank"
              rel="noreferrer"
              className="group/link flex flex-1 items-center justify-center gap-2 rounded-xl bg-xghostwhite px-4 py-3 transition-all duration-300 hover:bg-xarrow hover:shadow-sm active:scale-95 sm:flex-col sm:gap-1 sm:rounded-2xl sm:px-6 sm:py-4"
            >
              <Icon
                icon={linkIcon(link)}
                className="text-xl text-xstroke transition-colors group-hover/link:text-xblue sm:text-2xl"
              />
              <span className="text-xs font-semibold text-xstroke sm:text-sm">
                {linkLabel(link)} <span className="text-xblue">↗</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}

export default function Projects({ projects }) {
  const sectionRef = useSectionReveal();

  return (
    <Section
      sectionRef={sectionRef}
      id="projects"
      title={
        <div data-section-header>
          <span className="text-xblue">Projects</span> to Explore
        </div>
      }
      description="Featured edits and showreels — the work I'm most proud of."
     
      icon={
        <img
          src="/assets/images/x-pink-blue.png"
          alt=""
          loading="lazy"
          className="h-[70%] w-[70%] translate-x-[10%] translate-y-[20%] rotate-[25deg] transition-transform hover:scale-120 hover:-rotate-[40deg]"
          draggable={false}
        />
      }
    >
      <div className="grid w-full grid-cols-1 gap-10 sm:gap-14 lg:gap-16">
        {projects.map((project, idx) => (
          <div key={project._id} data-reveal-item>
            <ProjectCard project={project} isReversed={idx % 2 !== 0} />
          </div>
        ))}
      </div>
    </Section>
  );
}