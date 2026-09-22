import React from 'react';
import Head from 'next/head';
import profile from '../content/profile';

const DEFAULT_DESCRIPTION = `${profile.name} — ${profile.role} at ${profile.company}. Backend engineer building Node.js and NestJS microservices, secure authentication, and KYC and banking integrations for fintech.`;

/**
 * The previous site shipped a <title> and nothing else, so sharing the link
 * anywhere produced a blank preview card.
 */
const SEO = ({
  title,
  description = DEFAULT_DESCRIPTION,
  path = '/',
  image = '/og-image.png',
}) => {
  const fullTitle = title
    ? `${title} · ${profile.name}`
    : `${profile.name} — ${profile.role}`;
  const url = `${profile.siteUrl}${path}`;
  const imageUrl = `${profile.siteUrl}${image}`;

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    url: profile.siteUrl,
    email: `mailto:${profile.email}`,
    jobTitle: profile.role,
    worksFor: { '@type': 'Organization', name: profile.company },
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Indian Institute of Information Technology, Jabalpur',
    },
    knowsAbout: ['Node.js', 'NestJS', 'Microservices', 'TypeScript', 'Redis', 'React', 'System Design'],
    sameAs: profile.socials.map((s) => s.link),
  };

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#0a0a0b" />
      <link rel="canonical" href={url} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={profile.name} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      <script
        type="application/ld+json"
         
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
    </Head>
  );
};

export default SEO;
