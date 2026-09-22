import React from 'react';
import Chip from './Chip';
import ArrowIcon from './ArrowIcon';

/**
 * Source and live demo are separate links rather than one card-wide anchor, so
 * a project with a working demo is actually reachable — by mouse and by tab.
 */
const MoreProjectCard = ({ project }) => {
  const { repo, demo } = project.links || {};

  return (
    <div className="card card-hover card-lift flex h-full flex-col p-5">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-medium text-body">{project.title}</h3>
        {demo && (
          <span className="mt-1 inline-flex shrink-0 items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-accent">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
            Live
          </span>
        )}
      </div>

      {project.role && (
        <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-mute">
          {project.role}
        </p>
      )}

      <p className="mt-2.5 flex-1 text-sm leading-relaxed text-dim">{project.tagline}</p>

      <ul className="mt-4 flex flex-wrap gap-1.5">
        {project.stack.map((tech) => (
          <li key={tech}>
            <Chip>{tech}</Chip>
          </li>
        ))}
      </ul>

      <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line pt-4 text-sm">
        {demo && (
          <a
            href={demo}
            target="_blank"
            rel="noreferrer noopener"
            className="group/link inline-flex items-center gap-1.5 font-medium text-accent transition-opacity hover:opacity-80"
          >
            Live demo <ArrowIcon />
          </a>
        )}
        {repo && (
          <a
            href={repo}
            target="_blank"
            rel="noreferrer noopener"
            className="group/link inline-flex items-center gap-1.5 text-dim transition-colors hover:text-body"
          >
            Source <ArrowIcon />
          </a>
        )}
      </div>
    </div>
  );
};

export default MoreProjectCard;
