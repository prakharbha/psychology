import blogPostsData from '@/data/blog-posts.json';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  publishedDate: string;
  author: string;
  category: string;
  tags: string[];
  content?: string;
  seoTitle?: string;
  metaDescription?: string;
  focusKeywords?: string[];
  secondaryKeywords?: string[];
  image?: string;
}

// Mapping of blog post slugs to their image files
const blogImageMap: Record<string, string> = {
  'how-adjustment-shapes-young-adult-success': '/images/blog/prakhar-psychological-testing-young-adults-success.jpg',
  '5-dimensions-mental-health': '/images/blog/prakhar-psychological-testing-mental-health-dimensions.jpg',
  'hidden-stressors-students-face': '/images/blog/prakhar-psychological-testing-student-stress.jpg',
  'introvert-or-extrovert-personality-type': '/images/blog/prakhar-psychological-testing-personality-types.jpg',
  'psychology-achievement-motivation': '/images/blog/prakhar-psychological-testing-achievement-motivation.jpg',
  '7-elements-satisfying-life': '/images/blog/prakhar-psychological-testing-life-satisfaction.jpg',
  'academic-pressure-performance-wellbeing': '/images/blog/prakhar-psychological-testing-academic-pressure.jpg',
  'understanding-swadharma-psychology-duty-balance': '/images/blog/prakhar-psychological-testing-wellbeing.jpg',
  'parental-expectations-shape-child-future': '/images/blog/prakhar-psychological-testing-wellbeing.jpg',
  'science-personal-wellbeing-complete-guide': '/images/blog/prakhar-psychological-testing-wellbeing.jpg',
  'what-defines-quality-of-life-practical-breakdown': '/images/blog/prakhar-psychological-testing-wellbeing.jpg',
  'workplace-climate-productivity-happiness': '/images/blog/prakhar-psychological-testing-workplace-climate.jpg',
  'home-environment-emotional-health-foundation': '/images/blog/prakhar-psychological-testing-wellbeing.jpg',
  'power-altruism-helping-others-transforms': '/images/blog/prakhar-psychological-testing-wellbeing.jpg',
  'four-psychological-resources-build-resilience': '/images/blog/prakhar-psychological-testing-wellbeing.jpg',
  'value-system-shapes-personality-decisions': '/images/blog/prakhar-psychological-testing-personality-types.jpg',
  'identity-styles-explained': '/images/blog/prakhar-psychological-testing-personality-types.jpg',
  '8-types-anxiety-adults-overlook': '/images/blog/prakhar-psychological-testing-student-stress.jpg',
  'understanding-depression-modern-psychological-lens': '/images/blog/prakhar-psychological-testing-mental-health-dimensions.jpg',
  'karma-yoga-daily-life-practical-framework': '/images/blog/prakhar-psychological-testing-wellbeing.jpg',
  '10-core-personality-traits-influence-success': '/images/blog/prakhar-psychological-testing-achievement-motivation.jpg',
  'eco-friendly-living-small-actions-big-impact': '/images/blog/prakhar-psychological-testing-wellbeing.jpg',
  'couples-build-balanced-supportive-marriage': '/images/blog/prakhar-psychological-testing-wellbeing.jpg',
};

export function getAllBlogPosts(): BlogPost[] {
  const posts = blogPostsData as BlogPost[];
  return posts.map(post => ({
    ...post,
    image: blogImageMap[post.slug] || post.image,
  }));
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  const post = (blogPostsData as BlogPost[]).find((post) => post.slug === slug);
  if (post) {
    return {
      ...post,
      image: blogImageMap[slug] || post.image,
    };
  }
  return undefined;
}

