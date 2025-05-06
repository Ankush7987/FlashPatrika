/**
 * Mock data for news API
 * Used as fallback when the real API fails
 */

// Mock news articles
export const mockArticles = [
  {
    _id: 'mock-1',
    title: 'Technology Trends Shaping the Future of Industries',
    description: 'Exploring how AI, blockchain, and IoT are transforming businesses across sectors.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc eu nisl.',
    url: 'https://example.com/tech-trends',
    imageUrl: '/images/default-news.jpg',
    source: 'Tech Insights',
    category: 'Technology',
    publishedAt: new Date().toISOString()
  },
  {
    _id: 'mock-2',
    title: 'Global Economic Outlook Shows Signs of Recovery',
    description: 'Analysts predict steady growth in emerging markets despite ongoing challenges.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc eu nisl.',
    url: 'https://example.com/economic-outlook',
    imageUrl: '/images/default-news.jpg',
    source: 'Business Daily',
    category: 'Business',
    publishedAt: new Date(Date.now() - 3600000).toISOString()
  },
  {
    _id: 'mock-3',
    title: 'Sports Championship Finals Set to Begin Next Week',
    description: 'Top teams prepare for the ultimate showdown after a season of upsets and surprises.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc eu nisl.',
    url: 'https://example.com/sports-finals',
    imageUrl: '/images/default-news.jpg',
    source: 'Sports Network',
    category: 'Sports',
    publishedAt: new Date(Date.now() - 7200000).toISOString()
  },
  {
    _id: 'mock-4',
    title: 'Health Researchers Announce Breakthrough in Medical Treatment',
    description: 'New approach shows promising results in early clinical trials.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc eu nisl.',
    url: 'https://example.com/health-breakthrough',
    imageUrl: '/images/default-news.jpg',
    source: 'Health Today',
    category: 'Health',
    publishedAt: new Date(Date.now() - 10800000).toISOString()
  },
  {
    _id: 'mock-5',
    title: 'Entertainment Industry Adapts to Changing Consumer Preferences',
    description: 'Streaming platforms and content creators explore new formats and distribution models.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc eu nisl.',
    url: 'https://example.com/entertainment-trends',
    imageUrl: '/images/default-news.jpg',
    source: 'Entertainment Weekly',
    category: 'Entertainment',
    publishedAt: new Date(Date.now() - 14400000).toISOString()
  }
];

// Generate more mock articles for different categories
export const generateMockArticles = (category, count = 3) => {
  const result = [];
  
  for (let i = 0; i < count; i++) {
    result.push({
      _id: `mock-${category}-${i}`,
      title: `${category}: ${i + 1} - Lorem ipsum dolor sit amet consectetur`,
      description: 'Exploring the latest developments and trends in this exciting field.',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc eu nisl.',
      url: `https://example.com/${category.toLowerCase()}-${i}`,
      imageUrl: '/images/default-news.jpg',
      source: `${category} News`,
      category: category,
      publishedAt: new Date(Date.now() - (i * 3600000)).toISOString()
    });
  }
  
  return result;
};

// Generate mock data for a specific source
export const generateMockSourceArticles = (source, count = 3) => {
  const result = [];
  
  for (let i = 0; i < count; i++) {
    result.push({
      _id: `mock-${source.replace(/\s+/g, '-').toLowerCase()}-${i}`,
      title: `${source} Headline ${i + 1}: Lorem ipsum dolor sit amet`,
      description: 'Breaking news and analysis from a trusted source.',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc eu nisl.',
      url: `https://example.com/${source.replace(/\s+/g, '-').toLowerCase()}-${i}`,
      imageUrl: '/images/default-news.jpg',
      source: source,
      category: ['World', 'Business', 'Technology', 'Sports', 'Entertainment'][Math.floor(Math.random() * 5)],
      publishedAt: new Date(Date.now() - (i * 3600000)).toISOString()
    });
  }
  
  return result;
};