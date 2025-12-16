import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
    tags?: string[];
  };
  breadcrumbs?: { name: string; url: string }[];
  faqItems?: { question: string; answer: string }[];
}

export const SEOHead = ({
  title = 'intelleeo | AI Software Studio',
  description = 'Build Smart. Build Human. intelleeo is an AI Software Studio creating intelligent solutions that bridge the gap between technology and human needs.',
  keywords = 'AI development, software studio, machine learning, web development, mobile apps, artificial intelligence, custom software',
  image = '/uploads/intelleeo_full_logo.png',
  url = 'https://intelleeo.com',
  type = 'website',
  article,
  breadcrumbs,
  faqItems,
}: SEOHeadProps) => {
  const fullTitle = title.includes('intelleeo') ? title : `${title} | intelleeo`;

  // Organization Schema
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'intelleeo',
    description: description,
    url: 'https://intelleeo.com',
    logo: 'https://intelleeo.com/uploads/intelleeo_full_logo.png',
    foundingDate: '2020',
    founders: [{ '@type': 'Person', name: 'intelleeo Team' }],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Dhaka',
      addressCountry: 'BD',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'intelleeo.inteligence@gmail.com',
      telephone: '+880-1946-303020',
      contactType: 'customer service',
    },
    sameAs: [
      'https://github.com/SYAAGalib',
      'https://twitter.com/SYAAGalib',
      'https://linkedin.com/in/SYAAGalib',
    ],
  };

  // Website Schema
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'intelleeo',
    url: 'https://intelleeo.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://intelleeo.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  // Breadcrumb Schema
  const breadcrumbSchema = breadcrumbs && {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  // FAQ Schema
  const faqSchema = faqItems && faqItems.length > 0 && {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  // Article Schema
  const articleSchema = article && {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    image: image,
    datePublished: article.publishedTime,
    dateModified: article.modifiedTime || article.publishedTime,
    author: {
      '@type': 'Person',
      name: article.author || 'intelleeo Team',
    },
    publisher: {
      '@type': 'Organization',
      name: 'intelleeo',
      logo: {
        '@type': 'ImageObject',
        url: 'https://intelleeo.com/uploads/intelleeo_full_logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  };

  // Professional Service Schema
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'intelleeo',
    description: 'AI Software Studio specializing in custom AI solutions, web development, and mobile applications.',
    url: 'https://intelleeo.com',
    telephone: '+880-1946-303020',
    email: 'intelleeo.inteligence@gmail.com',
    priceRange: '$$',
    areaServed: 'Worldwide',
    serviceType: ['AI Development', 'Web Development', 'Mobile App Development', 'Machine Learning Solutions'],
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="intelleeo" />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="intelleeo" />
      <meta property="og:locale" content="en_US" />
      
      {/* Article specific OG tags */}
      {article && (
        <>
          <meta property="article:published_time" content={article.publishedTime} />
          {article.modifiedTime && <meta property="article:modified_time" content={article.modifiedTime} />}
          {article.author && <meta property="article:author" content={article.author} />}
          {article.section && <meta property="article:section" content={article.section} />}
          {article.tags?.map((tag) => <meta property="article:tag" content={tag} key={tag} />)}
        </>
      )}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@SYAAGalib" />
      <meta name="twitter:creator" content="@SYAAGalib" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(serviceSchema)}
      </script>
      {breadcrumbSchema && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      )}
      {faqSchema && (
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      )}
      {articleSchema && (
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
      )}
    </Helmet>
  );
};
