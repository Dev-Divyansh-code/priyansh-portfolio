import PortraitFlip from './PortraitFlip';
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
        <PortraitFlip
          portrait={profile?.portrait}
          portraitVideo={profile?.portraitVideo}
          name={profile?.name || 'Priyansh'}
        />

        {profile?.about?.map((paragraph) => (
          <p key={paragraph.slice(0, 24)} data-reveal-item className="text-xstroke">
            {paragraph}
          </p>
        ))}
      </div>
    </Section>
  );
}