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
    liveLink: 'https://smart-analytics.demo',
    aiHighlight: 'Machine learning models for predictive analytics and anomaly detection'
  },
  {
    id: '3',
    slug: 'mobile-health-assistant',
    title: 'Mobile Health Assistant',
    subtitle: 'AI-powered personal health companion',
    description: 'A mobile application that helps users track their health metrics and provides personalized health recommendations using AI.',
    problem: 'People needed a simple way to monitor their health and get personalized advice without constant doctor visits.',
    solution: 'Developed a mobile app with symptom analysis, health tracking, and AI-powered recommendations for lifestyle improvements.',
    role: 'Mobile Developer & AI Specialist',
    timeline: '5 months',
    techStack: ['React Native', 'Node.js', 'TensorFlow Lite', 'Firebase', 'HealthKit'],
    tags: ['AI', 'Mobile', 'Open Source'],
    screenshot: '/uploads/mobile_health_assistant.webp',
    sourceCode: 'https://github.com/intelleeo/health-assistant',
    aiHighlight: 'On-device ML models for privacy-preserving health analysis'
  },
  {
    id: '4',
    slug: 'e-commerce-optimizer',
    title: 'E-commerce Optimizer',
    subtitle: 'Conversion rate optimization suite',
    description: 'An e-commerce optimization platform that uses AI to improve product recommendations and increase conversion rates.',
    problem: 'Online stores struggled with low conversion rates and poor product discovery.',
    solution: 'Built an intelligent recommendation engine with A/B testing capabilities and real-time optimization.',
    role: 'Full-Stack Developer',
    timeline: '6 months',
    techStack: ['Next.js', 'Python', 'Redis', 'Stripe API', 'AWS'],
    tags: ['AI', 'Web', 'Client'],
    screenshot: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=1200&fit=crop',
    liveLink: 'https://ecommerce-optimizer.demo',
    aiHighlight: 'Collaborative filtering and deep learning for personalized recommendations'
  },
  {
    id: '5',
    slug: 'developer-tools-suite',
    title: 'Developer Tools Suite',
    subtitle: 'AI-enhanced development environment',
    description: 'A comprehensive suite of development tools enhanced with AI to improve developer productivity and code quality.',
    problem: 'Developers needed better tools to write, test, and deploy code more efficiently.',
    solution: 'Created an integrated development environment with AI code completion, automated testing, and intelligent debugging.',
    role: 'Lead Engineer',
    timeline: '8 months',
    techStack: ['Electron', 'TypeScript', 'Docker', 'Kubernetes', 'OpenAI Codex'],
    tags: ['AI', 'Web', 'Open Source'],
    screenshot: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=1200&fit=crop',
    sourceCode: 'https://github.com/intelleeo/dev-tools-suite',
    aiHighlight: 'GPT-powered code completion and automated code review system'
  },
  {
    id: '6',
    slug: 'social-media-manager',
    title: 'Social Media Manager',
    subtitle: 'Automated social media orchestration',
    description: 'An intelligent social media management platform that automates content creation, scheduling, and engagement using AI.',
    problem: 'Content creators and businesses needed help managing multiple social media accounts efficiently.',
    solution: 'Built an AI-powered platform that generates content, optimizes posting times, and automates engagement.',
    role: 'Full-Stack Developer',
    timeline: '4 months',
    techStack: ['Vue.js', 'Laravel', 'MySQL', 'OpenAI', 'Social APIs'],
    tags: ['AI', 'Web', 'Client'],
    screenshot: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=1200&fit=crop',
    liveLink: 'https://social-manager.demo',
    aiHighlight: 'Natural language generation for automated content creation'
  }
];

export const getProjectBySlug = (slug: string): Project | undefined => {
  return projects.find(project => project.slug === slug);
};

export const getProjectsByTag = (tag: string): Project[] => {
  return projects.filter(project => project.tags.includes(tag as any));
};