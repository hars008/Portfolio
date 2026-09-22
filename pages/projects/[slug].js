import React from 'react';
import Link from 'next/link';
import { m } from 'framer-motion';
import { Navbar, Footer, SEO, Chip, ProjectMedia, ArrowIcon } from '../../components';
import projects, { featuredProjects } from '../../content/projects';
import { fadeUp, stagger, viewport } from '../../utils/motion';

const ProjectPage = ({ project, prev, next }) => (
  <>
    <SEO
      title={project.title}
      description={project.tagline}
      path={`/projects/${project.slug}`}
    />
    <Navbar standalone />
    <main id="main" className="mx-auto w-full max-w-content px-6 pb-24 pt-32 sm:px-10">
      <m.div variants={stagger()} initial="hidden" animate="show">
        <m.p variants={fadeUp()} className="section-label mb-4">
          Case study{project.period ? ` · ${project.period}` : ''}
        </m.p>

        <m.h1 variants={fadeUp()} className="text-h2 font-semibold">
          {project.title}
        </m.h1>

        <m.p variants={fadeUp()} className="mt-4 max-w-prose text-lead text-dim">
          {project.tagline}
        </m.p>

        <m.ul variants={fadeUp()} className="mt-6 flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <li key={tech}>
              <Chip>{tech}</Chip>
            </li>
          ))}
        </m.ul>

        <m.div
          variants={fadeUp()}
          className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm"
        >
          {project.links?.repo && (
            <a
              href={project.links.repo}
              target="_blank"
              rel="noreferrer noopener"
              className="group/link inline-flex items-center gap-1.5 text-accent transition-opacity hover:opacity-80"
            >
              View source <ArrowIcon />
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
        </m.div>

        {(project.media || project.image) && (
          <m.div variants={fadeUp()} className="mt-12">
            <ProjectMedia media={project.media} image={project.image} title={project.title} />
          </m.div>
        )}
      </m.div>

      <m.div
        variants={stagger()}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        className="mt-16 space-y-12"
      >
        <m.section variants={fadeUp()}>
          <h2 className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-mute">
            The problem
          </h2>
          <p className="max-w-prose text-lead text-dim">{project.caseStudy.problem}</p>
        </m.section>

        <m.section variants={fadeUp()}>
          <h2 className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-mute">
            Approach
          </h2>
          <ul className="max-w-prose space-y-4">
            {project.caseStudy.approach.map((step, i) => (
              <li key={step.slice(0, 40)} className="flex gap-4">
                <span className="mt-1 shrink-0 font-mono text-xs text-accent">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="leading-relaxed text-dim">{step}</span>
              </li>
            ))}
          </ul>
        </m.section>

        <m.section variants={fadeUp()}>
          <h2 className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-mute">
            Outcome
          </h2>
          <p className="max-w-prose text-lead text-dim">{project.caseStudy.outcome}</p>
        </m.section>
      </m.div>

      {(prev || next) && (
        <nav aria-label="More case studies" className="mt-16 grid gap-4 border-t border-line pt-8 sm:grid-cols-2">
          {[prev, next].map((item, i) => item && (
            <Link
              key={item.slug}
              href={`/projects/${item.slug}`}
              className={`card card-lift block p-5 ${i === 1 ? 'sm:text-right' : ''}`}
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-mute">
                {i === 0 ? 'Previous' : 'Next'}
              </span>
              <span className="mt-1.5 block text-base font-medium text-body">{item.title}</span>
            </Link>
          ))}
        </nav>
      )}

      <div className="mt-10 border-t border-line pt-8">
        <Link href="/#projects" className="link-underline text-sm">
          ← All projects
        </Link>
      </div>
    </main>
    <Footer />
  </>
);

export const getStaticPaths = async () => ({
  paths: featuredProjects.map((p) => ({ params: { slug: p.slug } })),
  fallback: false,
});

export const getStaticProps = async ({ params }) => {
  const project = projects.find((p) => p.slug === params.slug);
  // Neighbours are computed at build time so the page stays fully static.
  const i = featuredProjects.findIndex((p) => p.slug === params.slug);
  const brief = (p) => (p ? { slug: p.slug, title: p.title } : null);

  return {
    props: {
      project,
      prev: brief(featuredProjects[i - 1]),
      next: brief(featuredProjects[i + 1]),
    },
  };
};

export default ProjectPage;
