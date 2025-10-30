export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  problem: string;
  solution: string;
  role: string;
  timeline: string;
  techStack: string[];
  tags: ('AI' | 'Web' | 'Mobile' | 'Client' | 'Open Source')[];
  screenshot: string;
  images?: string[];
  demoVideo?: string;
  liveLink?: string;
  sourceCode?: string;
  aiHighlight?: string;
}

export const projects: Project[] = [
  {
    id: '1',
    slug: 'ai-content-optimizer',
    title: 'AI Content Optimizer',
    subtitle: 'Smart content enhancement platform',
    description: 'An intelligent content optimization platform that uses advanced NLP to analyze, enhance, and personalize content for maximum engagement.',
    problem: 'Content creators struggle to optimize their content for different audiences and platforms, leading to reduced engagement and reach.',
    solution: 'Built an AI-powered platform that analyzes content sentiment, readability, and engagement potential, then provides actionable recommendations for improvement.',
    role: 'Full-Stack Developer & AI Engineer',
    timeline: '3 months',
    techStack: ['React', 'Node.js', 'OpenAI GPT-4', 'MongoDB', 'TailwindCSS'],
    tags: ['AI', 'Web', 'Client'],
    screenshot: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=1200&fit=crop',
    liveLink: 'https://ai-content-optimizer.demo',
    sourceCode: 'https://github.com/intelleeo/ai-content-optimizer',
    aiHighlight: 'Custom RAG model with OpenAI for personalized content recommendations'
  },
  {
    id: '2',
    slug: 'smart-analytics-dashboard',
    title: 'Smart Analytics Dashboard',
    subtitle: 'Real-time business intelligence platform',
    description: 'A comprehensive analytics dashboard that transforms complex data into actionable insights using machine learning algorithms.',
    problem: 'Businesses needed a way to visualize and understand their data without requiring technical expertise.',
    solution: 'Created an intuitive dashboard with AI-powered insights, automated reporting, and predictive analytics capabilities.',
    role: 'Lead Developer',
    timeline: '4 months',
    techStack: ['React', 'TypeScript', 'Python', 'TensorFlow', 'PostgreSQL'],
    tags: ['AI', 'Web', 'Client'],
    screenshot: '/uploads/smart_analytics_dashboard.webp',
    images: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1543286386-713bdd548da4?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop'
    ],
    demoVideo: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    liveLink: 'https://smart-analytics.demo',
    aiHighlight: 'Machine learning models for predictive analytics and anomaly detection'
  },
  {
    id: '3',
    slug: 'citizen-lab-hospital',
    title: 'Citizen Lab Hospital',
    subtitle: 'Hospital management system',
    description: 'A comprehensive hospital management system that streamlines patient records, appointments, billing, and staff management.',
    problem: 'Hospitals needed an efficient way to manage patient data and streamline operations.',
    solution: 'Developed a system that automates patient record management, appointment scheduling, and billing processes.',
    role: 'Full-Stack Developer',
    timeline: '6 months',
    techStack: ['Django', 'React', 'PostgreSQL', 'Docker', 'REST APIs', 'VPS'],
    tags: ['Web', 'Client'],
    screenshot: '/uploads/DevNest/citizen-lab.jpg',
    liveLink: 'https://www.citizenlabbd.com'
  },
  {
    id: '4',
    slug: 'mariyam-traders',
    title: 'E-commerce Mariyam Traders',
    subtitle: 'An E-commerce for local variety store in Khulna, Bangladesh',
    description: 'Production e-commerce platform built for Mariyam Traders — a local variety store in Khulna. Supports catalog & inventory management, point-of-sale sync, localized checkout (cash-on-delivery and local payment gateways), order tracking, delivery zone management, and a compact admin dashboard for day-to-day operations.',
    problem: 'Local retailers lacked an easy-to-manage online storefront tailored to local payment methods, delivery constraints, and low-bandwidth mobile customers.',
    solution: 'Delivered a mobile-first, production-ready storefront with real-time inventory synchronization to the in-store POS, localized payment options, flexible delivery and pickup workflows, automated order notifications, and an admin panel for product, order, and promotion management. Deployed with CI/CD, monitoring, backups and performance optimizations to ensure reliable production usage.',
    role: 'Full-Stack Developer',
    timeline: '6 months',
    techStack: ['React', 'Laravel', 'MySQL', 'Tailwind', 'Payment API', 'VPS Hosting'],
    tags: ['Web', 'Client'],
    screenshot: '/uploads/DevNest/mariyamtraders.jpg',
    images: [
      'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=800&h=600&fit=crop'
    ],
    demoVideo: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    liveLink: 'http://mariyamtraders.com',
    aiHighlight: 'Real-time inventory sync, smart product recommendations, and optimized mobile UX for low-bandwidth environments'
  },
  {
    id: '5',
    slug: 'auto-glide-hub',
    title: 'Auto Glide Hub',
    subtitle: 'Car marketplace & finance management system',
    description: 'A unified car selling showcase and financing platform that lets buyers browse stock, calculate payments, place orders for specific models, and verify auction provenance — all with quick financing options.',
    problem: 'Buyers face fragmented experiences when shopping for cars and financing: unclear rates, slow approvals, no integrated payment tools, and limited auction verification.',
    solution: 'Built Auto Glide Hub — a web platform combining a searchable stock catalogue, per-model ordering, an integrated payment & loan calculator, and auction verification. Features include competitive rates starting from 4.99% APR for qualified buyers, flexible terms from 12 to 84 months, and pre-approval within 24–48 hours. The platform also provides real-time stock availability, model configurators, and auction provenance checks powered by automated verification workflows.',
    role: 'Full-Stack Engineer',
    timeline: '4 months',
    techStack: ['React', 'TypeScript', 'Docker', 'Kubernetes', 'OpenAI Codex'],
    tags: ['AI', 'Web', 'Open Source'],
    screenshot: '/uploads/DevNest/auto-glide-hub.jpg',
    liveLink: 'https://auto-glide-hub.vercel.app',
    sourceCode: 'https://github.com/intelleeo/auto-glide-hub',
    aiHighlight: 'GPT-powered automated conversational agents for customer support'
  },
  {
    id: '6',
    slug: 'global-chronicle-news',
    title: 'Global Chronicle News',
    subtitle: 'AI-first newsroom and personalization engine',
    description: 'An AI-driven news platform that ingests, verifies, summarizes, and personalizes breaking news in real time for readers and editors.',
    problem: 'Newsrooms struggle to curate trustworthy, multilingual content at speed while delivering personalized experiences that increase retention.',
    solution: 'Built a pipeline that ingests from RSS, wires, and social streams; de-duplicates and clusters stories with embeddings; runs citation-backed summaries, translation, and entity linking; flags bias/toxicity; and ranks feeds per reader using contextual bandits and vector profiles. Editors get an AI co-pilot for headline/SEO suggestions, timeline building, and fact-checking with source citations. Auto-generates newsletters and social posts with A/B testing.',
    role: 'Full-Stack Developer & AI Engineer',
    timeline: '5 months',
    techStack: ['Vue.js', 'Laravel', 'MySQL', 'OpenAI', 'LangChain', 'Meilisearch', 'Redis', 'Social APIs'],
    tags: ['AI', 'Web', 'Client'],
    screenshot: '/uploads/DevNest/globalcronicle.png',
    liveLink: 'https://globalcronicle.vercel.app/',
    aiHighlight: 'Real-time ingestion + RAG-backed fact-checking, multilingual summarization, and personalized ranking with contextual bandits and reader vectors'
  }
];

export const getProjectBySlug = (slug: string): Project | undefined => {
  return projects.find(project => project.slug === slug);
};

export const getProjectsByTag = (tag: string): Project[] => {
  return projects.filter(project => project.tags.includes(tag as any));
};