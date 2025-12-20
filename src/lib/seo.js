// SEO utility functions for BellyBuys Enterprise

export const generatePageMetadata = (page) => {
  const baseUrl = 'https://bellybuys.com';
  const businessName = 'BellyBuys Enterprise';
  
  const pages = {
    home: {
      title: `${businessName} | Premium Catering & Food Services in Ile-Ife`,
      description: 'Experience exceptional culinary services in Ile-Ife. Weekend meals, event catering, private chef, and logistics services. Order now!',
      keywords: ['catering services Nigeria', 'Ile-Ife food', 'weekend meals', 'private chef', 'Nigerian cuisine'],
      url: baseUrl,
    },
    about: {
      title: `About Us | ${businessName}`,
      description: 'Learn about BellyBuys Enterprise - our story, values, and commitment to delivering exceptional culinary experiences in Ile-Ife.',
      keywords: ['about BellyBuys', 'our story', 'catering company', 'food service'],
      url: `${baseUrl}/about`,
    },
    services: {
      title: `Our Services | ${businessName}`,
      description: 'Explore our premium services: weekend meals, event catering, private chef, logistics, utensils rental, and more.',
      keywords: ['catering services', 'food delivery', 'private chef', 'event catering', 'logistics'],
      url: `${baseUrl}/services`,
    },
    menu: {
      title: `Menu | ${businessName}`,
      description: 'Browse our delicious menu featuring authentic Nigerian cuisine, jollof rice, soups, pasta, and more. View prices and order online.',
      keywords: ['Nigerian food menu', 'jollof rice', 'Nigerian soups', 'food prices', 'order food'],
      url: `${baseUrl}/menu`,
    },
    blog: {
      title: `Blog | ${businessName}`,
      description: 'Read our latest recipes, cooking tips, event highlights, and culinary stories from BellyBuys Enterprise.',
      keywords: ['food blog', 'recipes', 'cooking tips', 'Nigerian recipes', 'food stories'],
      url: `${baseUrl}/blog`,
    },
    contact: {
      title: `Contact Us | ${businessName}`,
      description: 'Get in touch with BellyBuys Enterprise. Order food, book catering services, or inquire about our offerings in Ile-Ife.',
      keywords: ['contact', 'order food', 'book catering', 'Ile-Ife contact', 'phone number'],
      url: `${baseUrl}/contact`,
    },
  };

  return pages[page] || pages.home;
};

export const generateStructuredData = (type, data = {}) => {
  const baseData = {
    '@context': 'https://schema.org',
  };

  switch (type) {
    case 'organization':
      return {
        ...baseData,
        '@type': 'Organization',
        name: 'BellyBuys Enterprise',
        url: 'https://bellybuys.com',
        logo: 'https://bellybuys.com/images/logo.png',
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+234-814-228-7713',
          contactType: 'customer service',
          areaServed: 'NG',
          availableLanguage: ['en', 'yo'],
        },
        sameAs: [
          'https://instagram.com/belly__buys',
        ],
      };

    case 'localBusiness':
      return {
        ...baseData,
        '@type': 'FoodEstablishment',
        name: 'BellyBuys Enterprise',
        image: 'https://bellybuys.com/images/logo.png',
        '@id': 'https://bellybuys.com',
        url: 'https://bellybuys.com',
        telephone: '+234-814-228-7713',
        priceRange: '₦₦',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Aji Bamidili',
          addressLocality: 'Ile-Ife',
          addressRegion: 'Osun State',
          addressCountry: 'NG',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 7.4905,
          longitude: 4.5521,
        },
        servesCuisine: ['Nigerian', 'African'],
        acceptsReservations: 'True',
      };

    case 'article':
      return {
        ...baseData,
        '@type': 'Article',
        headline: data.title,
        description: data.description,
        image: data.image,
        datePublished: data.datePublished,
        dateModified: data.dateModified || data.datePublished,
        author: {
          '@type': 'Person',
          name: data.author || 'BellyBuys Enterprise',
        },
        publisher: {
          '@type': 'Organization',
          name: 'BellyBuys Enterprise',
          logo: {
            '@type': 'ImageObject',
            url: 'https://bellybuys.com/images/logo.png',
          },
        },
      };

    case 'breadcrumb':
      return {
        ...baseData,
        '@type': 'BreadcrumbList',
        itemListElement: data.items?.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: item.url,
        })),
      };

    default:
      return baseData;
  }
};

export const generateSitemap = () => {
  const baseUrl = 'https://bellybuys.com';
  const pages = [
    { url: '/', priority: 1.0, changefreq: 'daily' },
    { url: '/about', priority: 0.8, changefreq: 'monthly' },
    { url: '/services', priority: 0.9, changefreq: 'weekly' },
    { url: '/menu', priority: 0.9, changefreq: 'weekly' },
    { url: '/blog', priority: 0.7, changefreq: 'daily' },
    { url: '/contact', priority: 0.8, changefreq: 'monthly' },
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages.map(page => `
    <url>
      <loc>${baseUrl}${page.url}</loc>
      <changefreq>${page.changefreq}</changefreq>
      <priority>${page.priority}</priority>
    </url>
  `).join('')}
</urlset>`;

  return sitemap;
};