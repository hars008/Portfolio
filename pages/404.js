import React from 'react';
import Link from 'next/link';
import { Navbar, Footer, SEO } from '../components';

const NotFound = () => (
  <>
    <SEO title="Page not found" path="/404" />
    <Navbar standalone />
    <main className="mx-auto flex min-h-[70vh] w-full max-w-content flex-col justify-center px-6 pt-24 sm:px-10">
      <p className="section-label mb-4">404</p>
      <h1 className="text-h2 font-semibold">This page doesn&apos;t exist</h1>
      <p className="mt-4 max-w-prose text-lead text-dim">
        The link may be out of date, or the page may have moved.
      </p>
      <Link
        href="/"
        className="btn btn-ghost mt-8 w-fit"
      >
        Back to the portfolio
      </Link>
    </main>
    <Footer />
  </>
);

export default NotFound;
