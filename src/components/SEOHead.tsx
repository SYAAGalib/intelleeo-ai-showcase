import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
}

export const SEOHead = ({
  title = 'intelleeo | AI Software Studio',
  description = 'Build Smart. Build Human. intelleeo is an AI Software Studio creating intelligent solutions that bridge the gap between technology and human needs.',
  keywords = 'AI development, software studio, machine learning, web development, mobile apps, artificial intelligence, custom software',
  image = '/uploads/intelleeo_full_logo.png',
  url = 'https://intelleeo.com',
  type = 'website',
}: SEOHeadProps) => {
  const fullTitle = title.includes('intelleeo') ? title : `${title} | intelleeo`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="intelleeo" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="intelleeo" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'intelleeo',
          description: description,
          url: url,
          logo: image,
          sameAs: [
            'https://github.com/SYAAGalib',
            'https://twitter.com/SYAAGalib',
            'https://linkedin.com/in/SYAAGalib',
          ],
          contactPoint: {
            '@type': 'ContactPoint',
            email: 'intelleeo.inteligence@gmail.com',
            contactType: 'customer service',
          },
        })}
      </script>
    </Helmet>
  );
};
