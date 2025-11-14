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
}

export function getAllBlogPosts(): BlogPost[] {
  return blogPostsData as BlogPost[];
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return (blogPostsData as BlogPost[]).find((post) => post.slug === slug);
}

