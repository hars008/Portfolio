import React, { useState } from 'react';

/**
 * The two demo videos in public/ are 68 MB and 41 MB. Autoplaying them — or
 * even letting the browser preload metadata — would dominate page weight, so
 * nothing is fetched until the viewer presses play.
 */
const VideoMedia = ({ src, title }) => {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
       
      <video
        src={src}
        preload="none"
        controls
        autoPlay
        loop
        muted
        playsInline
        className="h-full w-full bg-black object-cover"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      className="group/play flex h-full w-full flex-col items-center justify-center gap-3 bg-surface-2 transition-colors duration-300 hover:bg-[#1d1d21]"
      aria-label={`Play the ${title} demo video`}
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-full border border-line-strong text-accent transition-colors duration-200 group-hover/play:border-accent">
        <svg width="14" height="16" viewBox="0 0 14 16" fill="currentColor" aria-hidden="true">
          <path d="M13 7.13a1 1 0 0 1 0 1.74l-11.5 6.5A1 1 0 0 1 0 14.5v-13a1 1 0 0 1 1.5-.87L13 7.13Z" />
        </svg>
      </span>
      <span className="font-mono text-xs text-mute">Play demo</span>
    </button>
  );
};

const ProjectMedia = ({ media, image, title }) => {
  const frame = 'relative aspect-video w-full overflow-hidden rounded-lg border border-line';

  if (media?.type === 'video') {
    return (
      <div className={frame}>
        <VideoMedia src={media.src} title={title} />
      </div>
    );
  }

  if (image) {
    // Accepts either a bare path or { src, alt, w, h }, so adding dimensions to
    // one project does not mean rewriting the others.
    const img = typeof image === 'string' ? { src: image } : image;

    return (
      <div className={`${frame} group/media`}>
        {/* Not next/image: there is no images block in next.config.js, and on
            Netlify adopting it pulls in the plugin's image CDN — a deploy-time
            moving part for a handful of author-controlled screenshots. CLS is
            already handled by the aspect-video frame, and width/height below
            close the gap when JS has not run. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={img.src}
          alt={img.alt || `${title} interface`}
          width={img.w}
          height={img.h}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-top transition-transform duration-500 ease-out-flex group-hover/media:scale-[1.03]"
        />
      </div>
    );
  }

  // No media and no screenshot: the card renders text-only, exactly as before.
  return null;
};

export default ProjectMedia;
