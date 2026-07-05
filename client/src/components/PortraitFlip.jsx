import { Icon } from '@iconify/react';
import { useEffect, useRef, useState } from 'react';
import { parseVideoUrl } from '../utils/video';

export default function PortraitFlip({ portrait, portraitVideo, name }) {
  const [flipped, setFlipped] = useState(false);
  const videoRef = useRef(null);
  const video = parseVideoUrl(portraitVideo);
  const hasVideo = Boolean(video);

  useEffect(() => {
    if (!flipped && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [flipped]);

  function toggleFlip() {
    if (!hasVideo) return;
    setFlipped((prev) => !prev);
  }

  return (
    <div
      data-reveal-item
      className="group relative isolate mx-auto aspect-square size-[160px] sm:float-right sm:mx-0 sm:-mt-16 sm:mb-6 sm:ml-6 sm:size-[220px] md:ml-8 md:size-[250px]"
    >
      <div className="absolute -top-12 -left-4 hidden rotate-[-8deg] sm:block md:-left-8 md:-top-14">
        <span className="font-title text-xs italic text-xghoststroke md:text-sm">
          {hasVideo ? 'Tap to flip! 🎬' : 'Thats me! 🎬'}
        </span>
        <svg
          className="absolute -bottom-4 left-1/2 h-6 w-6 -translate-x-1/2 rotate-[140deg] text-xghoststroke md:h-8 md:w-8"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M5 12c2 0 8-1 12-8" />
          <path d="M15 4l2 0l0 2" />
        </svg>
      </div>

      <button
        type="button"
        onClick={toggleFlip}
        disabled={!hasVideo}
        aria-label={
          hasVideo ? (flipped ? `Show ${name} photo` : `Play ${name} video`) : `${name} portrait`
        }
        className={`portrait-flip relative z-10 h-full w-full rounded-full border-0 bg-transparent p-0 outline-none ${
          hasVideo ? 'cursor-pointer focus-visible:ring-2 focus-visible:ring-xblue focus-visible:ring-offset-2' : 'cursor-default'
        }`}
      >
        <div className={`portrait-flip-inner h-full w-full ${flipped ? 'is-flipped' : ''}`}>
          <div className="portrait-flip-face portrait-flip-front overflow-hidden rounded-full border-2 border-xbg shadow-lg">
            <img
              src={portrait || '/assets/images/portrait.webp'}
              alt={`${name} portrait`}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[0.98]"
            />
          </div>

          {hasVideo && (
            <div className="portrait-flip-face portrait-flip-back overflow-hidden rounded-full border-2 border-xblue bg-xstroke shadow-lg">
              {video.type === 'file' ? (
                <video
                  ref={videoRef}
                  src={video.src}
                  className="h-full w-full object-cover"
                  controls={flipped}
                  playsInline
                  preload="metadata"
                />
              ) : (
                flipped && (
                  <iframe
                    src={video.src}
                    title={`${name} showreel`}
                    className="h-full w-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                )
              )}
            </div>
          )}
        </div>

        {hasVideo && !flipped && (
          <span className="absolute bottom-2 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1 rounded-full bg-xstroke/80 px-2.5 py-1 text-[10px] font-semibold text-xbtn-text backdrop-blur-sm sm:text-xs">
            <Icon icon="mdi:play-circle" className="text-sm" />
            Play
          </span>
        )}
      </button>

      <div className="pointer-events-none absolute top-[1%] -left-[5%] z-0 inline-block h-full w-full scale-[1.04] -rotate-24 rounded-full bg-xyellow/40 transition-all duration-300 group-hover:-rotate-45" />
    </div>
  );
}