import React from 'react';
import { useRebootKey } from '../utils/intro';
import { Navbar, Sidebar, Footer, SEO, Intro, AmbientIcons } from '../components';
import {
  Hero,
  About,
  Experience,
  Skills,
  Projects,
  MoreProjects,
  Achievements,
  Contact,
} from '../sections';

const Home = () => {
  // Bumped by the reboot buttons, so the hero remounts and replays its
  // entrance behind the replayed intro.
  const rebootKey = useRebootKey();

  return (
    <>
      <SEO />
      <Intro />
      {/* Keyed with the hero so a reboot replays the tiles' pop-in too. */}
      <AmbientIcons key={`ambient-${rebootKey}`} />
      <a
        href="#main"
        className="sr-only rounded-md bg-accent px-4 py-2 text-sm font-medium text-bg focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60]"
      >
        Skip to content
      </a>
      <Navbar />
      <Sidebar />
      <main id="main" className="lg:px-12">
        <Hero key={rebootKey} />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <MoreProjects />
        <Achievements />
        <Contact />
      </main>
      <Footer home />
    </>
  );
};

export default Home;
