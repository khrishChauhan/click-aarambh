export interface Author {
  name: string;
  role: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: 'Engineering' | 'Digital Marketing' | 'Automation' | 'Venture Growth' | 'Case Studies';
  date: string;
  readTime: string;
  image: string;
  author: Author;
  featured?: boolean;
}

export const BLOG_CATEGORIES = [
  'All',
  'Engineering',
  'Digital Marketing',
  'Automation',
  'Venture Growth',
  'Case Studies',
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

export const FEATURED_POST: BlogPost = {
  slug: 'architecting-scalable-growth-engines',
  title: 'Architecting Scalable Growth Engines: Beyond Traditional Marketing',
  excerpt:
    'Modern venture scale isn’t solved by simply spending more ad dollars. It is unlocked through unified telemetry, autonomous distribution loops, and systematic software engineering built directly into the core product.',
  category: 'Venture Growth',
  date: 'September 14, 2026',
  readTime: '6 min read',
  image:
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1600',
  author: {
    name: 'Aarav Roy',
    role: 'Founding Partner & CTO',
  },
  featured: true,
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'zero-latency-frontend-architecture',
    title: 'Zero-Latency Frontend Architecture for High-Conversion Web Apps',
    excerpt:
      'How we benchmark Next.js, Edge runtime caching, and reactive micro-state trees to consistently maintain sub-100ms user interaction speeds.',
    category: 'Engineering',
    date: 'September 10, 2026',
    readTime: '5 min read',
    image:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200',
    author: {
      name: 'Ankit Sharma',
      role: 'Lead Systems Architect',
    },
  },
  {
    slug: 'automating-the-revenue-engine-lead-pipelines',
    title: 'Automating the Revenue Engine: Event-Driven Lead Pipelines',
    excerpt:
      'Connecting raw inbound webhook signals directly into CRM intelligence layers without human latency or data degradation.',
    category: 'Automation',
    date: 'September 06, 2026',
    readTime: '4 min read',
    image:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200',
    author: {
      name: 'Kabir Mehta',
      role: 'Growth Engineer',
    },
  },
  {
    slug: 'cinematic-storytelling-paid-acquisition',
    title: 'Cinematic Storytelling Meets Algorithmic Performance Acquisition',
    excerpt:
      'Why high-fidelity studio-grade video assets outperform generic template creatives by 3.4x when engineered around verified audience retention hooks.',
    category: 'Digital Marketing',
    date: 'August 30, 2026',
    readTime: '7 min read',
    image:
      'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=1200',
    author: {
      name: 'Priya Varma',
      role: 'Head of Creative Strategy',
    },
  },
  {
    slug: 'the-60-30-10-aesthetic-rule-for-modern-software',
    title: 'The 60-30-10 Rule: Designing Interfaces That Command Authority',
    excerpt:
      'A deep-dive into surgical color calibration, spatial layout rhythms, and why intentional minimalist contrast instills instantaneous user trust.',
    category: 'Venture Growth',
    date: 'August 22, 2026',
    readTime: '5 min read',
    image:
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=1200',
    author: {
      name: 'Aarav Roy',
      role: 'Founding Partner & CTO',
    },
  },
  {
    slug: 'scaling-regional-healthcare-brand-digital-powerhouse',
    title: 'Case Study: Scaling a Regional Healthcare Brand into a Market Leader',
    excerpt:
      'How Click Aarambh re-architected digital acquisition, localized SEO funnels, and real-time patient booking workflows for a 4.2x verified ROI.',
    category: 'Case Studies',
    date: 'August 15, 2026',
    readTime: '8 min read',
    image:
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1200',
    author: {
      name: 'Rohit Nair',
      role: 'Venture Strategist',
    },
  },
  {
    slug: 'designing-resilient-data-schemas-high-velocity-ingestion',
    title: 'Designing Resilient Data Schemas for High-Velocity Ingestion',
    excerpt:
      'PostgreSQL connection pooling, distributed asynchronous job workers, and edge validation paradigms for zero data loss during traffic spikes.',
    category: 'Engineering',
    date: 'August 08, 2026',
    readTime: '6 min read',
    image:
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1200',
    author: {
      name: 'Ankit Sharma',
      role: 'Lead Systems Architect',
    },
  },
  {
    slug: 'context-aware-llms-daily-operational-workflows',
    title: 'Integrating Context-Aware LLMs into Daily Business Operations',
    excerpt:
      'Practical architectures for turning probabilistic generative AI into verifiable, deterministic tooling that accelerates executive workflows.',
    category: 'Automation',
    date: 'July 29, 2026',
    readTime: '5 min read',
    image:
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200',
    author: {
      name: 'Kabir Mehta',
      role: 'Growth Engineer',
    },
  },
];
