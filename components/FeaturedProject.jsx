import React from 'react';
import Link from 'next/link';
import Chip from './Chip';
import ProjectMedia from './ProjectMedia';
import ArrowIcon from './ArrowIcon';

/**
 * The card column is ~840px wide now that the Projects section carries a
 * sticky index rail, so the media sits above the text at full card width
 * rather than alternating sides. That also gives a screenshot a proper 16:9
 * stage instead of a half-width sliver.
 */
const FeaturedProject = ({ project }) => {
  const hasMedia = Boolean(project.media || project.image);

  return (
    <article className="card card-hover card-lift overflow-hidden p-6 sm:p-8">
      <div className="grid gap-8">
        {hasMedia && (
          <ProjectMedia media={project.media} image={project.image} title={project.title} />
        )}

        <div>
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="text-h3 font-semibold">{project.title}</h3>
            {project.period && (
              <span className="shrink-0 font-mono text-xs text-mute">{project.period}</span>
            )}
          </div>

          <p className="mt-3 text-sm leading-relaxed text-dim">{project.tagline}</p>

          <ul className="mt-5 space-y-2.5">
            {project.highlights.map((point) => (
              <li key={point.slice(0, 40)} className="flex gap-3 text-sm leading-relaxed text-dim">
                <span aria-hidden="true" className="mt-[9px] h-px w-3 shrink-0 bg-line-strong" />
                <span>{point}</span>
              </li>
            ))}
          </ul>

          <ul className="mt-6 flex flex-wrap gap-1.5">
            {project.stack.map((tech) => (
              <li key={tech}>
                <Chip>{tech}</Chip>
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line pt-6 text-sm">
            <Link
              href={`/projects/${project.slug}`}
              className="group/link inline-flex items-center gap-1.5 font-medium text-accent transition-opacity hover:opacity-80"
            >
              Read the case study <ArrowIcon />
            </Link>
            {project.links?.repo && (
              <a
                href={project.links.repo}
                target="_blank"
                rel="noreferrer noopener"
                className="group/link inline-flex items-center gap-1.5 text-dim transition-colors hover:text-body"
              >
                Source <ArrowIcon />
              </a>
            )}
            {project.links?.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noreferrer noopener"
                className="group/link inline-flex items-center gap-1.5 text-dim transition-colors hover:text-body"
              >
                Live demo <ArrowIcon />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default FeaturedProject;
